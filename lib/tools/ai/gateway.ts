import { createHash } from "node:crypto";
import { counterStore } from "./store";

// The one gateway every OpenRouter powered tool goes through. Server only.
//
// - Models are tried in order (OPENROUTER_MODELS). A busy, failing or unusable answer moves on to the next.
// - Every provider attempt is counted against a global daily and per minute budget before it's made,
//   because failed calls can still use up the shared free quota.
// - Each visitor gets a daily allowance of successful generations.
// - A 429 with Retry-After pauses everyone until then, so we don't keep hitting the provider.
// - Free models only, unless OPENROUTER_ALLOW_PAID=true. Prompts and results are never logged.

export type AiFailure = "busy" | "visitor_limit" | "invalid" | "down" | "config" | "duplicate" | "sensitive";

export class AiError extends Error {
  constructor(
    public kind: AiFailure,
    message: string,
    /** Seconds until the visitor can try again, when it's known. */
    public retryAfter?: number,
  ) {
    super(message);
  }
}

type ModelConfig = { id: string; reasoning: Record<string, unknown> };

/** Per model request settings. Flint can't switch reasoning off, so it runs with low effort. */
const REASONING: Record<string, Record<string, unknown>> = {
  "recursive/flint-v1.0:free": { effort: "low" },
};

export const DEFAULT_MODELS = ["nvidia/nemotron-3.5-super-vl:free", "xingchen-agi/xing4.0-29b-a4b:free", "recursive/flint-v1.0:free"];

export function aiModels(): ModelConfig[] {
  const ids = (process.env.OPENROUTER_MODELS || process.env.OPENROUTER_MODEL || DEFAULT_MODELS.join(","))
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const allowPaid = process.env.OPENROUTER_ALLOW_PAID === "true";
  return ids.filter((id) => allowPaid || id.endsWith(":free")).map((id) => ({ id, reasoning: REASONING[id] ?? { enabled: false } }));
}

const num = (v: string | undefined, d: number) => (v && Number.isFinite(Number(v)) && Number(v) >= 0 ? Number(v) : d);

export function aiLimits() {
  return {
    /** Successful generations per visitor per UTC day. */
    visitorDaily: num(process.env.AI_VISITOR_DAILY, 2),
    /** Provider attempts per UTC day across the whole site, kept under OpenRouter's free allowance. */
    globalDaily: num(process.env.AI_GLOBAL_DAILY, 40),
    /** Provider attempts per minute across the site, under OpenRouter's 20 a minute. */
    globalMinute: num(process.env.AI_GLOBAL_MINUTE, 15),
    /** Models tried per request at most. */
    maxAttempts: num(process.env.AI_MAX_ATTEMPTS, 3),
    timeoutMs: num(process.env.OPENROUTER_TIMEOUT_MS, 45_000),
  };
}

export const MESSAGES = {
  busy: "Our free AI generator is busy right now. Your information is still here, so you can try again later.",
  visitor_limit: "You've used today's free generations. You can come back when your allowance resets at midnight UTC.",
  invalid: "We couldn't get a usable result that time. Try again, or change your details a little.",
  down: "The AI service didn't respond. Your information is still here, so try again in a moment.",
  config: "The AI generator isn't available right now. Please try again later.",
  duplicate: "That request is already running. Give it a moment.",
  sensitive: "",
} satisfies Record<AiFailure, string>;

const day = () => new Date().toISOString().slice(0, 10);
const secondsToMidnight = () => {
  const now = new Date();
  return Math.ceil((Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1) - now.getTime()) / 1000);
};
/** Visitors are counted by a salted daily hash of their IP, never the IP itself. */
export const visitorId = (ip: string) => createHash("sha256").update(`${ip}|${day()}|${process.env.AI_RATE_SALT ?? "zainameen-tools"}`).digest("hex").slice(0, 24);

// ---------- Sensitive data ----------

const SENSITIVE: [RegExp, string][] = [
  [/\b(?:sk|pk|rk)[-_](?=[A-Za-z0-9_-]*\d)[A-Za-z0-9_-]{20,}/, "an API key"],
  [/\bAKIA[0-9A-Z]{16}\b|\bgh[pousr]_[A-Za-z0-9]{30,}\b|\bxox[abpr]-[A-Za-z0-9-]{10,}/, "an access token"],
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----/, "a private key"],
  [/\b(?:password|passwd|pwd)\s*[:=]\s*\S+/i, "a password"],
  [/\b[A-Z]{2}\d{2}(?:\s?[A-Z0-9]{4}){3,7}\b/, "a bank account number (IBAN)"],
  [/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/, "an email address"],
];

function luhnCard(text: string): boolean {
  for (const m of text.matchAll(/\b(?:\d[ -]?){13,19}\b/g)) {
    const digits = m[0].replace(/\D/g, "");
    if (digits.length < 13 || digits.length > 19) continue;
    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
      let d = Number(digits[digits.length - 1 - i]);
      if (i % 2) {
        d *= 2;
        if (d > 9) d -= 9;
      }
      sum += d;
    }
    if (sum % 10 === 0) return true;
  }
  return false;
}

/** Catches obvious private data before it goes to a free AI endpoint. Not exhaustive, and the page says so. */
export function sensitiveIn(text: string): string | null {
  for (const [re, what] of SENSITIVE) if (re.test(text)) return what;
  if (luhnCard(text)) return "a payment card number";
  return null;
}

// ---------- Provider call ----------

type Attempt = { system: string; user: string; schemaName: string; schema: object; maxTokens: number; signal?: AbortSignal };

class ProviderError extends Error {
  constructor(
    public status: number,
    public retryAfter?: number,
  ) {
    super(`provider ${status}`);
  }
}

async function callModel(model: ModelConfig, a: Attempt, timeoutMs: number): Promise<unknown> {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new AiError("config", "OPENROUTER_API_KEY is not set");
  let res: Response;
  try {
    res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "HTTP-Referer": "https://www.zainameen.com/tools", "X-Title": "Zain Ul Abdin free tools" },
      body: JSON.stringify({
        model: model.id,
        reasoning: model.reasoning,
        temperature: 0.8,
        max_tokens: a.maxTokens + (model.reasoning.effort ? 1200 : 0),
        messages: [
          { role: "system", content: a.system },
          { role: "user", content: a.user },
        ],
        response_format: { type: "json_schema", json_schema: { name: a.schemaName, strict: true, schema: a.schema } },
      }),
      signal: a.signal ? AbortSignal.any([a.signal, AbortSignal.timeout(timeoutMs)]) : AbortSignal.timeout(timeoutMs),
      cache: "no-store",
    });
  } catch {
    if (a.signal?.aborted) throw new AiError("down", "visitor cancelled");
    throw new ProviderError(504);
  }
  if (!res.ok) {
    let ra = Number(res.headers.get("retry-after"));
    // The account wide free daily limit is shared by every free model, so wait for its reset.
    if (res.status === 429 && !(ra > 0)) {
      const text = await res.text().catch(() => "");
      const reset = Number(text.match(/"X-RateLimit-Reset":"?(\d+)/)?.[1]);
      if (/free-models-per-day|openrouter_free_tier_daily/.test(text) && reset > Date.now()) ra = Math.ceil((reset - Date.now()) / 1000);
    }
    throw new ProviderError(res.status, Number.isFinite(ra) && ra > 0 ? Math.min(ra, 86_400) : undefined);
  }
  let body: { choices?: { message?: { content?: string | null } }[]; error?: { code?: number } };
  try {
    // OpenRouter may send keep alive padding before the JSON body.
    const raw = (await res.text()).split("\n").filter((l) => !l.startsWith(":")).join("\n").trim();
    body = JSON.parse(raw);
  } catch {
    throw new ProviderError(502);
  }
  if (body.error) throw new ProviderError(body.error.code === 429 ? 429 : 502);
  const text = body.choices?.[0]?.message?.content?.trim();
  if (!text) throw new ProviderError(204);
  try {
    return JSON.parse(text.replace(/^```(?:json)?\s*|\s*```$/g, ""));
  } catch {
    throw new ProviderError(422);
  }
}

// ---------- Gateway ----------

export type RunRequest<T> = Attempt & {
  /** Salted visitor id (see visitorId). */
  visitor: string;
  /** Stable key for the request's content, to stop duplicate clicks. */
  dedupeKey?: string;
  /** Checks and cleans the model's answer. Return null to reject it and try the next model. */
  validate: (raw: unknown) => T | null;
};

export type RunResult<T> = { value: T; model: string; attempts: number };

export async function runAi<T>(req: RunRequest<T>): Promise<RunResult<T>> {
  const models = aiModels();
  if (!models.length) throw new AiError("config", "no models configured");
  const L = aiLimits();
  const store = counterStore();
  const d = day();

  // Everyone waits while the provider has told us to back off.
  const cooldown = await store.ttl("ai:cooldown");
  if (cooldown > 0) throw new AiError("busy", "provider cooldown", cooldown);

  const used = await store.get(`ai:v:${req.visitor}:${d}`);
  if (used >= L.visitorDaily) throw new AiError("visitor_limit", "visitor allowance used", secondsToMidnight());

  if (req.dedupeKey && !(await store.setIfAbsent(`ai:dup:${req.visitor}:${req.dedupeKey}`, "1", 20))) throw new AiError("duplicate", "duplicate request");

  let attempts = 0;
  let sawInvalid = false;
  for (const model of models.slice(0, Math.max(1, L.maxAttempts))) {
    // Reserve the attempt in the shared budget first, so parallel requests can't overshoot it.
    const minuteKey = `ai:m:${new Date().toISOString().slice(0, 16)}`;
    const [dayCount, minuteCount] = await Promise.all([store.incr(`ai:g:${d}`, 90_000), store.incr(minuteKey, 120)]);
    if (dayCount > L.globalDaily || minuteCount > L.globalMinute) {
      await Promise.all([store.incr(`ai:g:${d}`, 90_000, -1), store.incr(minuteKey, 120, -1)]);
      throw new AiError("busy", dayCount > L.globalDaily ? "global daily budget used" : "global minute budget used", dayCount > L.globalDaily ? secondsToMidnight() : 60);
    }
    attempts++;
    try {
      const raw = await callModel(model, req, L.timeoutMs);
      const value = req.validate(raw);
      if (value === null) {
        if (process.env.AI_DEBUG === "1") console.error(`[ai] ${model.id} answer rejected by the validator`);
        sawInvalid = true;
        continue;
      }
      await store.incr(`ai:v:${req.visitor}:${d}`, 90_000);
      return { value, model: model.id, attempts };
    } catch (e) {
      if (e instanceof AiError) throw e;
      const err = e as ProviderError;
      if (process.env.AI_DEBUG === "1") console.error(`[ai] ${model.id} failed: ${err.status}`);
      if (err.status === 422) sawInvalid = true;
      // A rate limit with a known wait: pause everyone, don't retry now.
      if (err.status === 429 && err.retryAfter) {
        await store.setIfAbsent("ai:cooldown", "1", err.retryAfter);
        throw new AiError("busy", "provider rate limited", err.retryAfter);
      }
      // 401/403 mean the key is wrong: no other model will do better.
      if (err.status === 401 || err.status === 403) throw new AiError("config", `provider ${err.status}`);
      // Anything else (429 without Retry-After, 400 for an unsupported setting, 5xx, timeout, empty): next model.
    }
  }
  throw new AiError(sawInvalid ? "invalid" : "down", "all models failed");
}

/** Safe usage counters for the logs: no prompts, no results, no IPs. */
export function logOutcome(tool: string, outcome: string, model?: string, attempts?: number, ms?: number) {
  console.info(JSON.stringify({ event: "ai_tool", tool, outcome, model, attempts, ms }));
}
