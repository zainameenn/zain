import registry from "./prompts.json";
import { buildUtmUrl, computeCalendarSlots } from "./shared";
import { fetchPageContent } from "./page-fetch";
import { runAi } from "../ai/gateway";

// Free tools v2 generation pipeline. Server only: the Gemini key never reaches the browser.
// One result per request. Prompts, fields, limits and schemas all come from prompts.json (the registry).
// Gemini is called over REST generateContent with systemInstruction, a JSON schema and a thinking level.
// No temperature, top_p, top_k or candidate_count: newer Gemini models ignore or reject them.

export type Mode = "GENERATE" | "REGENERATE" | "REFINE";
export type MediaPart = { kind: "image" | "pdf" | "text_file"; mimeType: string; base64?: string; text?: string };
export type GenerateRequest = {
  toolId: string;
  input: Record<string, unknown>;
  mode?: Mode;
  customInstruction?: string;
  previousOutputs?: string[];
  previousOutput?: string;
  regenCount?: number;
  media?: MediaPart[];
  /** UK and EU visitors go to OpenRouter instead of Gemini, which can't be used on the free tier there. */
  eu?: boolean;
  /** Salted visitor id, used only when a request falls back to the shared OpenRouter gateway. */
  visitor?: string;
};
export type CalendarPost = { slot_id: string; date: string; platform: string; pillar?: string; format?: string; topic?: string; hook?: string; details?: string; cta?: string; asset_needed?: string };
export type GenerateResult = { content: string; tip: string; warnings: string[]; model: string; posts?: CalendarPost[]; calendar_name?: string; notice?: string };

/* eslint-disable @typescript-eslint/no-explicit-any */
const REG = registry as any;
export const TOOLS_V2 = REG.tools as Record<string, any>;
const SHARED = REG.shared_system_instruction as string;
const TEMPLATE = REG.user_turn_template as string;

// Model order. Override with TOOLS_MODELS="a,b,c" in Vercel without a code change.
const MODELS: string[] = (process.env.TOOLS_MODELS?.split(",").map((s) => s.trim()).filter(Boolean) ?? []).length
  ? process.env.TOOLS_MODELS!.split(",").map((s) => s.trim()).filter(Boolean)
  : [REG.model.primary, ...REG.model.fallbacks];
/** A model that hasn't answered by then is treated like a busy one and the next model is tried. */
const CALL_TIMEOUT_MS = Number(process.env.TOOLS_MODEL_TIMEOUT_MS) || 25_000;

export class ToolError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

// ---------- Counting and input clean up ----------

const segmenter = new Intl.Segmenter(undefined, { granularity: "grapheme" });
const EMOJI = /\p{Extended_Pictographic}/u;
export function countChars(text: string, emojiWeight = 1): number {
  let n = 0;
  for (const { segment } of segmenter.segment(text)) n += EMOJI.test(segment) ? emojiWeight : 1;
  return n;
}

export function stripEmpty(obj: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) {
    if (v === null || v === undefined || v === false) continue;
    if (typeof v === "string" && !v.trim()) continue;
    if (Array.isArray(v) && v.length === 0) continue;
    out[k] = typeof v === "string" ? v.trim() : v;
  }
  return out;
}

export function hardCap(tool: any, input: Record<string, unknown>): number | undefined {
  const byField = tool.limits?.hard_max_chars_by_field;
  if (byField) return byField[String(input.profile_kind)] ?? Math.min(...(Object.values(byField) as number[]));
  return tool.limits?.hard_max_chars;
}

function serverConfig(toolId: string, tool: any, input: Record<string, unknown>, extra: Record<string, unknown> = {}) {
  const cfg: Record<string, unknown> = { tool_id: toolId, output_count: 1, language: input.language ?? "English" };
  const cap = hardCap(tool, input);
  if (cap) cfg.max_chars = cap;
  for (const k of ["soft_target_chars", "soft_min_chars", "soft_max_words", "feed_visible_chars", "preview_chars", "soft_front_chars", "max_hashtags"]) {
    if (tool.limits?.[k]) cfg[k] = tool.limits[k];
  }
  return { ...cfg, ...extra };
}

const block = (tag: string, body?: string) => (body && body.trim() ? `\n<${tag}>\n${body.trim()}\n</${tag}>\n` : "");

export function pickAngle(tool: any, regenCount = 1): string {
  const angles: string[] = tool.variation_angles ?? [];
  if (!angles.length) return "Take a clearly different approach from the previous outputs.";
  return angles[(Math.max(1, regenCount) - 1) % angles.length];
}

/** The text turn. Blocks that don't apply to the mode are left out entirely. */
export function buildUserTurn(req: GenerateRequest, tool: any, cfg: Record<string, unknown>, pageContent?: string): string {
  const mode: Mode = req.mode ?? "GENERATE";
  const media = req.media ?? [];
  const mediaNote = media.length ? `<attached_media>${media.length} file(s) attached above: ${media.map((m) => m.kind).join(", ")}. Treat them as source material.</attached_media>\n\n` : "";
  const prevs = (req.previousOutputs ?? []).slice(-3);
  return TEMPLATE.replace("{media_note}", mediaNote)
    .replace("{server_config_json}", JSON.stringify(cfg))
    .replace("{user_input_json}", JSON.stringify(stripEmpty(req.input)))
    .replace("{page_content_block}", block("page_content", pageContent?.slice(0, 20000)))
    .replace("{custom_instruction_block}", block("custom_instruction", req.customInstruction?.slice(0, 500)))
    .replace("{previous_outputs_block}", mode === "REGENERATE" ? block("previous_outputs", prevs.map((p, i) => `[${i + 1}]\n${p}`).join("\n\n")) : "")
    .replace("{previous_output_block}", mode === "REFINE" ? block("previous_output", req.previousOutput) : "")
    .replace("{mode}", mode)
    .replace("{variation_angle_block}", mode === "REGENERATE" ? block("variation_angle", pickAngle(tool, req.regenCount)) : "")
    .replace("{tool_name}", String(tool.display_name).replace(/ Generator$| Builder$/, ""));
}

/** generateContent parts: media first, instructions last. */
function mediaParts(media: MediaPart[] = []) {
  return media.map((m) => (m.kind === "text_file" ? { text: `<attached_file>\n${(m.text ?? "").slice(0, 60000)}\n</attached_file>` } : { inlineData: { mimeType: m.mimeType, data: m.base64 ?? "" } }));
}

// ---------- Validation ----------

const DASHES = /[–—]/;
const BANNED = /\b(unlock|unleash|elevate|supercharge|game[ -]?changer|look no further|in today's fast[ -]?paced|delve|tapestry|stop scrolling|let that sink in)\b/i;

export function validateContent(tool: any, input: Record<string, unknown>, parsed: any): { errors: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  const keys = Object.keys(parsed ?? {}).sort().join(",");
  if (keys !== "content,tip") errors.push("Return exactly the fields content and tip.");
  const content: string = typeof parsed?.content === "string" ? parsed.content : "";
  if (!content.trim()) return { errors, warnings };
  const cap = hardCap(tool, input);
  const len = countChars(content, tool.limits?.emoji_weight ?? 1);
  if (cap && len > cap) errors.push(`The result is ${len} characters. The hard limit is ${cap}. Shorten it.`);
  const tags = content.match(/(^|\s)#[\p{L}\p{N}_]+/gu) ?? [];
  const maxTags = tool.limits?.max_hashtags;
  const wanted = Number.parseInt(String(input.hashtags), 10);
  if (maxTags && tags.length > maxTags) errors.push(`Use at most ${maxTags} hashtags.`);
  if (Number.isFinite(wanted) && tags.length > wanted) errors.push(`Use at most ${wanted} hashtags.`);
  if (String(input.hashtags) === "None" && tags.length) errors.push("Remove all hashtags.");
  if (DASHES.test(content)) errors.push("Replace every em dash and en dash with a comma, period, or colon.");
  if (BANNED.test(content)) warnings.push("Contains stock phrasing.");
  if (tool.limits?.soft_max_words && content.split(/\s+/).length > tool.limits.soft_max_words) warnings.push("Longer than the recommended word count.");
  if (/```|^\s*(Option|Version)\s*\d/im.test(content)) errors.push("Return one plain result with no labels or code fences.");
  return { errors, warnings };
}

export function validateCalendar(parsed: any, slots: { slot_id: string }[]): string[] {
  const errors: string[] = [];
  const ids = new Set(slots.map((s) => s.slot_id));
  const got: string[] = Array.isArray(parsed?.posts) ? parsed.posts.map((p: any) => p.slot_id) : [];
  const missing = [...ids].filter((id) => !got.includes(id));
  const extra = got.filter((id) => !ids.has(id));
  if (missing.length) errors.push(`Missing slot_ids: ${missing.join(", ")}.`);
  if (extra.length) errors.push(`Unknown slot_ids: ${extra.join(", ")}.`);
  if (new Set(got).size !== got.length) errors.push("Each slot_id must appear exactly once.");
  return errors;
}

// ---------- Gemini call with fallback ----------

const ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";
const RETRYABLE = new Set([429, 500, 503, 504]);

async function callModel(model: string, system: string, parts: object[], schema: object, thinking: string, maxTokens: number): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new ToolError(500, "missing key");
  let res: Response;
  try {
    res = await fetch(`${ENDPOINT}/${encodeURIComponent(model)}:generateContent`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": key },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: system }] },
        contents: [{ role: "user", parts }],
        generationConfig: { responseMimeType: "application/json", responseJsonSchema: schema, thinkingConfig: { thinkingLevel: thinking }, maxOutputTokens: maxTokens },
      }),
      signal: AbortSignal.timeout(CALL_TIMEOUT_MS),
    });
  } catch {
    throw new ToolError(504, "timeout"); // treated like a busy model, so the next one is tried
  }
  if (!res.ok) throw new ToolError(res.status, `Gemini ${res.status}`);
  const body: any = await res.json();
  const text = (body?.candidates?.[0]?.content?.parts ?? [])
    .filter((p: any) => !p.thought)
    .map((p: any) => p.text ?? "")
    .join("");
  if (!text) throw new ToolError(503, "empty response");
  return text;
}

// UK and EU visitors: Gemini's free tier isn't allowed there, so these requests go to OpenRouter.
const OPENROUTER_MODEL = process.env.TOOLS_EU_MODEL || "nvidia/nemotron-3.5-super-vl:free";

async function callOpenRouter(system: string, parts: any[], schema: object, maxTokens: number): Promise<string> {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new ToolError(500, "missing OpenRouter key");
  const content = parts.map((p) =>
    p.inlineData
      ? p.inlineData.mimeType === "application/pdf"
        ? { type: "file", file: { filename: "upload.pdf", file_data: `data:application/pdf;base64,${p.inlineData.data}` } }
        : { type: "image_url", image_url: { url: `data:${p.inlineData.mimeType};base64,${p.inlineData.data}` } }
      : { type: "text", text: p.text ?? "" },
  );
  let res: Response;
  try {
    res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}`, "HTTP-Referer": "https://www.zainameen.com/tools", "X-Title": "Zain Ameen free tools" },
      body: JSON.stringify({
        model: OPENROUTER_MODEL,
        messages: [
          { role: "system", content: system },
          { role: "user", content },
        ],
        response_format: { type: "json_schema", json_schema: { name: "result", strict: true, schema } },
        max_tokens: maxTokens,
      }),
      signal: AbortSignal.timeout(Math.max(CALL_TIMEOUT_MS, 45_000)),
    });
  } catch {
    throw new ToolError(504, "timeout");
  }
  if (!res.ok) throw new ToolError(res.status, `OpenRouter ${res.status}`);
  const body: any = await res.json();
  const text = body?.choices?.[0]?.message?.content ?? "";
  if (!text) throw new ToolError(503, "empty response");
  return text;
}

async function callWithFallback(system: string, parts: object[], schema: object, thinking: string, maxTokens: number, eu = false, visitor = "v2") {
  // Until OPENROUTER_API_KEY is set, UK and EU visitors use Gemini like everyone else.
  // Off until TOOLS_EU_ROUTING=on, even though the OpenRouter key now exists for the newer tools.
  if (eu && process.env.TOOLS_EU_ROUTING === "on" && process.env.OPENROUTER_API_KEY) return { text: await callOpenRouter(system, parts, schema, maxTokens), model: OPENROUTER_MODEL };
  let last: unknown;
  for (const model of MODELS) {
    try {
      return { text: await callModel(model, system, parts, schema, thinking, maxTokens), model };
    } catch (e) {
      last = e;
      if (!(e instanceof ToolError) || !RETRYABLE.has(e.status)) throw e;
    }
  }
  // Every Gemini model is busy or down: text only requests fall back to the shared OpenRouter free models
  // (same budgets and rate limits as the newer tools). Uploads stay on Gemini, which can read them.
  const textOnly = parts.every((p) => "text" in (p as Record<string, unknown>));
  if (textOnly && process.env.OPENROUTER_API_KEY) {
    try {
      const out = await runAi({ system, user: parts.map((p) => (p as { text: string }).text).join("\n\n"), schemaName: "result", schema, maxTokens, visitor, validate: (raw) => (raw && typeof raw === "object" ? raw : null) });
      return { text: JSON.stringify(out.value), model: out.model };
    } catch {
      // Report the original Gemini error, which the route already maps to a friendly message.
    }
  }
  throw last;
}

function safeJson(text: string): any {
  try {
    return JSON.parse(text);
  } catch {
    try {
      return JSON.parse(text.replace(/```json|```/g, "").trim());
    } catch {
      return null;
    }
  }
}

// ---------- Entry point ----------

export async function generateV2(req: GenerateRequest): Promise<GenerateResult> {
  const tool = TOOLS_V2[req.toolId];
  if (!tool) throw new ToolError(404, "unknown tool");
  if (tool.output_contract === "deterministic_url") {
    const { url, warnings } = buildUtmUrl(req.input as never);
    return { content: url, tip: "", warnings, model: "none" };
  }
  const mode = req.mode ?? "GENERATE";
  if (mode === "REFINE" && (!req.previousOutput || !req.customInstruction)) throw new ToolError(400, "Tell us what to change about this result.");

  const input = stripEmpty(req.input);
  let extra: Record<string, unknown> = {};
  let slots: CalendarPost[] = [];
  if (tool.output_contract === "calendar") {
    slots = computeCalendarSlots({
      startDate: String(input.start_date ?? new Date().toISOString().slice(0, 10)),
      platforms: Array.isArray(input.platforms) ? (input.platforms as string[]) : [String(input.platforms ?? "Instagram")],
      postsPerWeek: Number.parseInt(String(input.posts_per_week ?? 3), 10) || 3,
      weeks: String(input.duration ?? "4 weeks").startsWith("2") ? 2 : 4,
    });
    extra = { slots };
  }
  const cfg = serverConfig(req.toolId, tool, input, extra);

  let pageContent: string | undefined;
  let notice: string | undefined;
  if (typeof input.page_url === "string" && input.page_url) {
    pageContent = await fetchPageContent(input.page_url).catch(() => undefined);
    if (!pageContent) {
      cfg.page_fetch = "failed: write from page_about only";
      notice = "We couldn't read that page, so this is based on your description.";
    }
  }

  const system = `${SHARED}\n\n${tool.tool_spec}`;
  const schema = tool.output_contract === "calendar" ? REG.schemas.calendar : REG.schemas.content;
  const userTurn = buildUserTurn({ ...req, input }, tool, cfg, pageContent);
  const thinking = tool.thinking_level ?? "low";
  const media = mediaParts(req.media);

  let { text, model } = await callWithFallback(system, [...media, { text: userTurn }], schema, thinking, tool.max_output_tokens, req.eu, req.visitor);
  let parsed = safeJson(text);

  // One focused repair pass at most. Never a hidden batch of alternatives.
  const errors = !parsed ? ["Return valid JSON that matches the schema."] : tool.output_contract === "calendar" ? validateCalendar(parsed, slots) : validateContent(tool, input, parsed).errors;
  if (errors.length) {
    const repair = `${userTurn}\n\n<repair>\nYour last answer was:\n${text}\n\nFix only these problems and return the corrected single result as JSON:\n- ${errors.join("\n- ")}\n</repair>`;
    try {
      const fixed = await callWithFallback(system, [...media, { text: repair }], schema, thinking, tool.max_output_tokens, req.eu, req.visitor);
      const p2 = safeJson(fixed.text);
      if (p2) ({ text, model, parsed } = { text: fixed.text, model: fixed.model, parsed: p2 });
    } catch {
      // Keep the first answer; the UI shows the warnings instead of an error.
    }
  }
  if (!parsed) throw new ToolError(502, "unreadable response");

  if (tool.output_contract === "calendar") {
    const byId = new Map<string, any>((parsed.posts ?? []).map((p: any) => [p.slot_id, p]));
    const posts = slots.map((s) => ({ ...s, ...(byId.get(s.slot_id) ?? {}) }));
    return { content: "", tip: parsed.tip ?? "", warnings: validateCalendar(parsed, slots), model, posts, calendar_name: parsed.calendar_name ?? "Content calendar", notice };
  }

  let content: string = typeof parsed.content === "string" ? parsed.content : "";
  const { errors: finalErrors, warnings } = validateContent(tool, input, parsed);
  if (DASHES.test(content)) content = content.replace(/\s*[–—]\s*/g, ", ");
  return { content, tip: typeof parsed.tip === "string" ? parsed.tip : "", warnings: [...warnings, ...finalErrors.filter((e) => !e.startsWith("Replace every em dash"))], model, notice };
}
