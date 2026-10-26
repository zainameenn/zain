import { createHash } from "node:crypto";
import { AiError, MESSAGES, logOutcome, runAi, sensitiveIn, visitorId } from "@/lib/tools/ai/gateway";
import { SPECS, SYSTEM, cleanInput } from "@/lib/tools/v3/specs";

// AI endpoint for the OpenRouter tools. Everything goes through lib/tools/ai/gateway.ts: shared rate
// limits, the model fallback chain, duplicate protection and output validation.
// Inputs and results are never logged or stored.

export const maxDuration = 60;

// UK, EU and EEA countries. Gemini's free tier isn't offered there, so those visitors skip Google.
const EU = new Set("GB AT BE BG HR CY CZ DK EE FI FR DE GR HU IE IT LV LT LU MT NL PL PT RO SK SI ES SE IS LI NO CH".split(" "));

const json = (body: unknown, status = 200, headers: Record<string, string> = {}) => Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

export async function POST(request: Request) {
  const started = Date.now();
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: MESSAGES.down, code: "bad_request" }, 400);
  }
  const slug = String(body.slug ?? "");
  const spec = SPECS[slug];
  if (!spec) return json({ error: "That tool doesn't exist." }, 404);
  const cleaned = cleanInput(slug, body.input);
  if ("error" in cleaned) return json({ error: cleaned.error, code: "validation" }, 400);

  // Free AI endpoints aren't for private data. Catch the obvious cases before anything is sent.
  const found = sensitiveIn(Object.values(cleaned.input).join("\n"));
  if (found) return json({ error: `It looks like you included ${found}. Please remove it: this tool uses a free AI service that isn't meant for private information.`, code: "sensitive" }, 400);

  const previous = typeof body.previous === "string" ? body.previous.slice(0, 200) : "";
  const user = `${spec.task}

<user_input>
${JSON.stringify(cleaned.input)}
</user_input>${previous ? `\n\nThe visitor asked for a different result. Do not repeat this one: ${JSON.stringify(previous)}` : ""}`;

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const dedupeKey = createHash("sha256").update(`${slug}|${user}`).digest("hex").slice(0, 16);

  try {
    const out = await runAi({
      system: SYSTEM,
      user,
      schemaName: slug.replace(/-/g, "_"),
      schema: spec.schema,
      maxTokens: spec.maxTokens,
      signal: request.signal,
      visitor: visitorId(ip),
      dedupeKey,
      skipProviders: EU.has((request.headers.get("x-vercel-ip-country") ?? "").toUpperCase()) ? ["google"] : [],
      validate: (raw) => {
        const checked = spec.validate(raw, cleaned.input);
        return checked.ok ? checked.value : null;
      },
    });
    logOutcome(slug, "success", out.model, out.attempts, Date.now() - started);
    return json({ result: out.value });
  } catch (e) {
    if (e instanceof AiError) {
      logOutcome(slug, e.kind, undefined, undefined, Date.now() - started);
      const status = { busy: 503, visitor_limit: 429, invalid: 502, down: 502, config: 503, duplicate: 409, sensitive: 400 }[e.kind];
      const code = e.kind === "busy" || e.kind === "visitor_limit" ? "rate_limit" : e.kind;
      return json({ error: MESSAGES[e.kind] || MESSAGES.down, code, retryAfter: e.retryAfter }, status, e.retryAfter ? { "Retry-After": String(e.retryAfter) } : {});
    }
    logOutcome(slug, "error", undefined, undefined, Date.now() - started);
    return json({ error: MESSAGES.down, code: "down" }, 500);
  }
}
