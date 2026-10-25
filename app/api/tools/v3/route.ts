import { AiError, completeJson, takeSlot } from "@/lib/tools/v3/openrouter";
import { SPECS, SYSTEM, cleanInput } from "@/lib/tools/v3/specs";

// AI endpoint for the six tools added in October 2026. One model call per request, no retries.
// Inputs and results are never logged or stored. Rate limits: lib/tools/v3/openrouter.ts plus the
// Vercel Firewall rule on /api/tools.

export const maxDuration = 60;

const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
const BUSY = "Lots of people are using the free tools right now. Give it a minute and try again.";
const LIMIT = "You've reached the free limit for now. Try again in a few minutes.";
const INVALID = "We couldn't get a usable result that time. Try again, or change your details a little.";
const DOWN = "The AI service didn't respond. Your answers are still here, so try again in a moment.";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: DOWN }, 400);
  }
  const slug = String(body.slug ?? "");
  const spec = SPECS[slug];
  if (!spec) return json({ error: "That tool doesn't exist." }, 404);
  const cleaned = cleanInput(slug, body.input);
  if ("error" in cleaned) return json({ error: cleaned.error, code: "validation" }, 400);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const slot = takeSlot(ip);
  if (slot) return json({ error: slot === "visitor" ? LIMIT : BUSY, code: "rate_limit" }, 429);

  const previous = typeof body.previous === "string" ? body.previous.slice(0, 200) : "";
  const user = `${spec.task}

<user_input>
${JSON.stringify(cleaned.input)}
</user_input>${previous ? `\n\nThe visitor asked for a different result. Do not repeat this one: ${JSON.stringify(previous)}` : ""}`;

  try {
    const raw = await completeJson({ system: SYSTEM, user, schemaName: slug.replace(/-/g, "_"), schema: spec.schema, maxTokens: spec.maxTokens, signal: request.signal });
    const checked = spec.validate(raw, cleaned.input);
    if (!checked.ok) {
      console.warn("Tools v3: result failed validation.", slug, checked.reason);
      return json({ error: INVALID, code: "invalid" }, 502);
    }
    return json({ result: checked.value });
  } catch (e) {
    if (e instanceof AiError) {
      console.warn("Tools v3:", slug, e.kind, e.message);
      if (e.kind === "busy") return json({ error: BUSY, code: "rate_limit" }, 503);
      if (e.kind === "invalid") return json({ error: INVALID, code: "invalid" }, 502);
      return json({ error: DOWN, code: "down" }, e.kind === "config" ? 500 : 502);
    }
    console.error("Tools v3: unexpected error.", slug, e instanceof Error ? e.name : "unknown");
    return json({ error: DOWN, code: "down" }, 500);
  }
}
