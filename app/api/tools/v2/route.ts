import { BUSY_MESSAGE } from "@/lib/tools/links";
import { TOOLS_V2, ToolError, generateV2, type MediaPart, type Mode } from "@/lib/tools/v2/generate";

// Free tools v2 endpoint: one result per request. Rate limiting happens in the Vercel Firewall rule on /api/tools.
// Uploads are passed straight to Gemini and dropped. They are never stored, and their contents are never logged.

export const maxDuration = 60;

const BY_SLUG = new Map(Object.entries(TOOLS_V2).map(([id, t]) => [t.slug as string, id]));
const IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MB = 1024 * 1024;
// UK, EU and EEA countries. Vercel sets x-vercel-ip-country on every request.
const EU = new Set("GB AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE IS LI NO CH".split(" "));
const FAIL = "Something broke on our side. Your answers are still here, so try again in a moment.";

const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });

function readMedia(raw: unknown, accepts: string[], maxFiles: number): MediaPart[] | string {
  if (!Array.isArray(raw) || !raw.length) return [];
  if (raw.length > maxFiles) return `You can attach up to ${maxFiles} file${maxFiles === 1 ? "" : "s"}.`;
  const out: MediaPart[] = [];
  for (const m of raw as Record<string, unknown>[]) {
    const kind = m?.kind;
    if (kind === "text_file" && accepts.includes("text_file") && typeof m.text === "string") {
      out.push({ kind, mimeType: "text/plain", text: m.text.slice(0, 60000) });
    } else if (kind === "image" && accepts.includes("image") && IMAGE_TYPES.has(String(m.mimeType)) && typeof m.base64 === "string" && m.base64.length < 8 * MB) {
      out.push({ kind, mimeType: String(m.mimeType), base64: m.base64 });
    } else if (kind === "pdf" && accepts.includes("pdf") && m.mimeType === "application/pdf" && typeof m.base64 === "string" && m.base64.length < 7 * MB) {
      out.push({ kind, mimeType: "application/pdf", base64: m.base64 });
    } else {
      return "That file type isn't supported here.";
    }
  }
  return out;
}

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length") ?? 0) > 18 * MB) return json({ error: "Those files are too big. Try a smaller image or PDF." }, 413);
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: FAIL }, 400);
  }
  const toolId = BY_SLUG.get(String(body.slug)) ?? String(body.toolId ?? "");
  const tool = TOOLS_V2[toolId];
  if (!tool) return json({ error: "That tool doesn't exist." }, 404);

  const input = body.input && typeof body.input === "object" ? (body.input as Record<string, unknown>) : {};
  const mode = (["GENERATE", "REGENERATE", "REFINE"].includes(String(body.mode)) ? body.mode : "GENERATE") as Mode;
  const media = readMedia(body.media, tool.media?.accepts ?? [], tool.media?.max_files ?? 0);
  if (typeof media === "string") return json({ error: media }, 400);
  const str = (v: unknown, max: number) => (typeof v === "string" ? v.slice(0, max) : undefined);

  try {
    const result = await generateV2({
      toolId,
      input,
      mode,
      media,
      customInstruction: str(body.customInstruction, 500),
      previousOutput: str(body.previousOutput, 12000),
      previousOutputs: Array.isArray(body.previousOutputs) ? body.previousOutputs.slice(-3).map((p) => String(p).slice(0, 12000)) : undefined,
      regenCount: Number(body.regenCount) || 1,
      eu: EU.has((request.headers.get("x-vercel-ip-country") ?? "").toUpperCase()),
    });
    return json(result);
  } catch (error) {
    if (error instanceof ToolError) {
      if (error.status === 400) return json({ error: error.message }, 400);
      if ([429, 500, 503, 504].includes(error.status)) return json({ error: BUSY_MESSAGE }, 503);
    }
    if (error instanceof Error && /required|URL|Invalid/.test(error.message)) return json({ error: error.message }, 400);
    console.error("Tools v2: generation failed.", error instanceof ToolError ? error.status : error instanceof Error ? error.name : "unknown");
    return json({ error: FAIL }, 502);
  }
}
