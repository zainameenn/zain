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

// Providers, all on free plans. A model id is "provider:model"; a bare id means OpenRouter.
// A provider whose key isn't set is skipped.
export type Provider = "openrouter" | "or2" | "groq" | "nvidia" | "google";

const PROVIDERS: Record<Provider, { url: string; keyEnv: string }> = {
  openrouter: { url: "https://openrouter.ai/api/v1/chat/completions", keyEnv: "OPENROUTER_API_KEY" },
  // A second OpenRouter account: its own free daily allowance, written "or2:model".
  or2: { url: "https://openrouter.ai/api/v1/chat/completions", keyEnv: "OPENROUTER_API_KEY_2" },
  groq: { url: "https://api.groq.com/openai/v1/chat/completions", keyEnv: "GROQ_API_KEY" },
  nvidia: { url: "https://integrate.api.nvidia.com/v1/chat/completions", keyEnv: "NVIDIA_API_KEY" },
  google: { url: "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions", keyEnv: "GEMINI_API_KEY" },
};

type ModelConfig = { id: string; provider: Provider; model: string; extra: Record<string, unknown>; reasoningTokens: number };

/** Per model request settings. Flint can't switch reasoning off, so it runs with low effort. */
function settings(provider: Provider, model: string): Pick<ModelConfig, "extra" | "reasoningTokens"> {
  if (provider === "groq") return { extra: { reasoning_effort: "low" }, reasoningTokens: 800 };
  if (provider === "nvidia") return { extra: {}, reasoningTokens: 0 };
  if (provider === "google") return { extra: { reasoning_effort: "low" }, reasoningTokens: 1000 };
  if (model === "recursive/flint-v1.0:free") return { extra: { reasoning: { effort: "low" } }, reasoningTokens: 1200 };
  return { extra: { reasoning: { enabled: false } }, reasoningTokens: 0 };
}

/** Best first. Models that fail or hit a limit move to the back of the line for a while (see runAi). */
export const DEFAULT_MODELS = [
  "groq:openai/gpt-oss-120b",
  "google:gemini-3.6-flash",
  "google:gemini-3.8-flash",
  "nvidia/nemotron-3.5-super-vl:free",
  "or2:nvidia/nemotron-3.5-super-vl:free",
  "groq:qwen/qwen3.8-27b",
  "google:gemini-3.5-flash-lite",
  "nvidia:z-ai/glm-5.2",
  "xingchen-agi/xing4.0-29b-a4b:free",
  "or2:xingchen-agi/xing4.0-29b-a4b:free",
  "recursive/flint-v1.0:free",
  "or2:recursive/flint-v1.0:free",
];

export function aiModels(): ModelConfig[] {
  const ids = (process.env.AI_MODELS || process.env.OPENROUTER_MODELS || DEFAULT_MODELS.join(","))
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  const allowPaid = process.env.OPENROUTER_ALLOW_PAID === "true";
  const out: ModelConfig[] = [];
  for (const id of ids) {
    const m = id.match(/^(or2|groq|nvidia|google):(.+)$/);
    const provider: Provider = m ? (m[1] as Provider) : "openrouter";
    const model = m ? m[2] : id;
    if (provider !== "openrouter" && !process.env[PROVIDERS[provider].keyEnv]) continue;
    // OpenRouter bills non :free models, so those need an explicit opt in.
    if ((provider === "openrouter" || provider === "or2") && !allowPaid && !model.endsWith(":free")) continue;
    out.push({ id, provider, model, ...settings(provider, model) });
  }
  return out;
}

const num = (v: string | undefined, d: number) => (v && Number.isFinite(Number(v)) && Number(v) >= 0 ? Number(v) : d);

export function aiLimits() {
  return {
    /** Successful generations per visitor per UTC day. */
    visitorDaily: num(process.env.AI_VISITOR_DAILY, 2),
    /** Provider attempts per UTC day across the whole site, per provider, kept under each free allowance. */
    daily: {
      openrouter: num(process.env.AI_GLOBAL_DAILY, 40),
      or2: num(process.env.AI_DAILY_OR2, 40),
      groq: num(process.env.AI_DAILY_GROQ, 800),
      nvidia: num(process.env.AI_DAILY_NVIDIA, 200),
      google: num(process.env.AI_DAILY_GOOGLE, 400),
    } as Record<Provider, number>,
    /** Provider attempts per minute across the site, per provider, under each one's per minute limit. */
    minute: {
      openrouter: num(process.env.AI_GLOBAL_MINUTE, 15),
      or2: num(process.env.AI_MINUTE_OR2, 15),
      groq: num(process.env.AI_MINUTE_GROQ, 20),
      nvidia: num(process.env.AI_MINUTE_NVIDIA, 20),
      google: num(process.env.AI_MINUTE_GOOGLE, 10),
    } as Record<Provider, number>,
    /** Models tried per request at most. */
    maxAttempts: num(process.env.AI_MAX_ATTEMPTS, 5),
    /** Longest wait for one model, and for the whole request (the route allows 60 seconds). */
    timeoutMs: num(process.env.AI_TIMEOUT_MS, 25_000),
    totalMs: num(process.env.AI_TOTAL_MS, 52_000),
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
    /** True when the limit covers the whole account, not just this model. */
    public accountWide = false,
  ) {
    super(`provider ${status}`);
  }
}

async function callModel(model: ModelConfig, a: Attempt, timeoutMs: number): Promise<unknown> {
  const p = PROVIDERS[model.provider];
  const key = process.env[p.keyEnv];
  if (!key) throw new ProviderError(401);
  let res: Response;
  try {
    res = await fetch(p.url, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json", "HTTP-Referer": "https://www.zainameen.com/tools", "X-Title": "Zain Ul Abdin free tools" },
      body: JSON.stringify({
        model: model.model,
        ...model.extra,
        temperature: 0.8,
        max_tokens: a.maxTokens + model.reasoningTokens,
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
    let accountWide = false;
    // The account wide free daily limit is shared by every free model, so wait for its reset.
    if (res.status === 429 && !(ra > 0)) {
      const text = await res.text().catch(() => "");
      const reset = Number(text.match(/"X-RateLimit-Reset":"?(\d+)/)?.[1]);
      if (/free-models-per-day|openrouter_free_tier_daily/.test(text) && reset > Date.now()) {
        ra = Math.ceil((reset - Date.now()) / 1000);
        accountWide = true;
      }
    }
    throw new ProviderError(res.status, Number.isFinite(ra) && ra > 0 ? Math.min(ra, 86_400) : undefined, accountWide);
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
    return JSON.parse(text.replace(/<think>[\s\S]*?<\/think>/g, "").trim().replace(/^```(?:json)?\s*|\s*```$/g, ""));
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
  /** Providers to leave out for this request, e.g. Google for UK and EU visitors. */
  skipProviders?: Provider[];
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

  const used = await store.get(`ai:v:${req.visitor}:${d}`);
  if (used >= L.visitorDaily) throw new AiError("visitor_limit", "visitor allowance used", secondsToMidnight());

  if (req.dedupeKey && !(await store.setIfAbsent(`ai:dup:${req.visitor}:${req.dedupeKey}`, "1", 20))) throw new AiError("duplicate", "duplicate request");

  let attempts = 0;
  let sawInvalid = false;
  let sawDown = false;
  let wait = Infinity;
  const skip = new Set<Provider>(req.skipProviders);
  // Models that recently failed or hit a limit go to the back of the line, so healthy ones take their place.
  const benched = await Promise.all(models.map((m) => store.ttl(`ai:bench:${m.id}`)));
  const ordered = models.map((m, i) => ({ m, b: benched[i] > 0 })).sort((x, y) => Number(x.b) - Number(y.b)).map((x) => x.m);
  const bench = (id: string, seconds: number) => store.setIfAbsent(`ai:bench:${id}`, "1", seconds);
  const started = Date.now();
  for (const model of ordered) {
    if (attempts >= Math.max(1, L.maxAttempts)) break;
    const left = L.totalMs - (Date.now() - started);
    if (left < 4_000) break;
    const p = model.provider;
    if (skip.has(p)) continue;
    // A provider or model that told us to back off is skipped by everyone until then.
    const [providerRest, modelRest] = await Promise.all([store.ttl(`ai:cooldown:${p}`), store.ttl(`ai:cooldown:${model.id}`)]);
    if (providerRest > 0 || modelRest > 0) {
      wait = Math.min(wait, Math.max(providerRest, modelRest));
      if (providerRest > 0) skip.add(p);
      continue;
    }
    // Reserve the attempt in the provider's shared budget first, so parallel requests can't overshoot it.
    const dayKey = `ai:g:${p}:${d}`;
    const minuteKey = `ai:m:${p}:${new Date().toISOString().slice(0, 16)}`;
    const [dayCount, minuteCount] = await Promise.all([store.incr(dayKey, 90_000), store.incr(minuteKey, 120)]);
    if (dayCount > L.daily[p] || minuteCount > L.minute[p]) {
      await Promise.all([store.incr(dayKey, 90_000, -1), store.incr(minuteKey, 120, -1)]);
      wait = Math.min(wait, dayCount > L.daily[p] ? secondsToMidnight() : 60);
      skip.add(p);
      continue;
    }
    attempts++;
    try {
      const raw = await callModel(model, req, Math.min(L.timeoutMs, left));
      const value = req.validate(raw);
      if (value === null) {
        if (process.env.AI_DEBUG === "1") console.error(`[ai] ${model.id} answer rejected by the validator`);
        await bench(model.id, 300);
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
      // Whatever went wrong, this model waits at the back of the line for a while.
      await bench(model.id, err.status === 429 ? Math.max(err.retryAfter ?? 0, 120) : 600);
      // A rate limit with a known wait: pause it for everyone and move on. OpenRouter's free limits are
      // shared by the whole account, so they pause every OpenRouter model; Groq's are per model.
      if (err.status === 429 && err.retryAfter) {
        const wide = err.accountWide || p === "openrouter" || p === "or2";
        await store.setIfAbsent(`ai:cooldown:${wide ? p : model.id}`, "1", err.retryAfter);
        wait = Math.min(wait, err.retryAfter);
        if (wide) skip.add(p);
        continue;
      }
      // 401/403 mean this provider's key is wrong: its other models won't do better.
      if (err.status === 401 || err.status === 403) {
        console.error(`[ai] ${p} rejected the API key (${err.status})`);
        skip.add(p);
        continue;
      }
      // Anything else (429 without Retry-After, 400 for an unsupported setting, 5xx, timeout, empty): next model.
      sawDown = true;
    }
  }
  if (sawInvalid) throw new AiError("invalid", "all models failed");
  if (sawDown) throw new AiError("down", "all models failed");
  if (wait < Infinity) throw new AiError("busy", "every provider is resting", wait);
  throw new AiError("config", "no provider accepted the request");
}

/** Safe usage counters for the logs: no prompts, no results, no IPs. */
export function logOutcome(tool: string, outcome: string, model?: string, attempts?: number, ms?: number) {
  console.info(JSON.stringify({ event: "ai_tool", tool, outcome, model, attempts, ms }));
}
