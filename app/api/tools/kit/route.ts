import { createHash } from "node:crypto";
import { AiError, MESSAGES, logOutcome, runAi, sensitiveIn, visitorId } from "@/lib/tools/ai/gateway";
import { KIT_SPECS, cleanKitInput, type KitAiSlug } from "@/lib/tools/kit/ai-specs";

// AI route for the November 2026 tools batch (title rewrite, elevator pitch, pricing page review, launch checklist).
// Goes through the shared gateway, so the shared visitor allowance, provider budgets and duplicate guard apply.
// Rate limiting also happens before this route, in the Vercel Firewall rule on /api/tools.
// Nothing about the request or the answer is logged except the outcome.

export const maxDuration = 60;

/** Nemotron on OpenRouter, with the second key as the backup for the same model. */
const MODELS = ["nvidia/nemotron-3.5-super-vl:free", "or2:nvidia/nemotron-3.5-super-vl:free"];

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) => Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

export async function POST(request: Request) {
  const started = Date.now();
  let body: { tool?: string; input?: unknown; previous?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: MESSAGES.down, code: "bad_request" }, 400);
  }
  const slug = body.tool as KitAiSlug;
  const spec = KIT_SPECS[slug];
  if (!spec) return json({ error: "That tool doesn't exist." }, 404);
  const cleaned = cleanKitInput(spec, body.input);
  if ("error" in cleaned) return json({ error: cleaned.error, code: "validation" }, 400);
  const found = sensitiveIn(Object.values(cleaned.input).join("\n"));
  if (found) return json({ error: `It looks like you included ${found}. Please remove it: this tool uses a free AI service that isn't meant for private information.`, code: "sensitive" }, 400);

  const previous = typeof body.previous === "string" ? body.previous.slice(0, 600) : "";
  const user = `<user_input>\n${JSON.stringify(cleaned.input)}\n</user_input>${previous ? `\n\nThe visitor asked for a different result. Do not repeat this one: ${JSON.stringify(previous)}` : ""}`;
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  try {
    const out = await runAi({
      system: spec.system,
      user,
      schemaName: slug.replace(/-/g, "_"),
      schema: spec.schema,
      maxTokens: spec.maxTokens,
      signal: request.signal,
      visitor: visitorId(ip),
      dedupeKey: createHash("sha256").update(`${slug}|${user}`).digest("hex").slice(0, 16),
      only: MODELS,
      validate: (raw) => spec.validate(raw, cleaned.input),
    });
    logOutcome(slug, "success", out.model, out.attempts, Date.now() - started);
    return json({ result: out.value });
  } catch (e) {
    if (e instanceof AiError) {
      const status = { busy: 503, visitor_limit: 429, invalid: 502, down: 502, config: 503, duplicate: 409, sensitive: 400 }[e.kind];
      logOutcome(slug, e.kind);
      return json({ error: MESSAGES[e.kind] || MESSAGES.down, code: e.kind, retryAfter: e.retryAfter }, status, e.retryAfter ? { "Retry-After": String(e.retryAfter) } : {});
    }
    logOutcome(slug, "error");
    return json({ error: MESSAGES.down, code: "down" }, 500);
  }
}
