// The one place the new tools talk to an AI model. Server only: the key never reaches the browser.
// Provider: OpenRouter, model from OPENROUTER_MODEL (default NVIDIA Nemotron 3.5 Super VL, free).
// Swapping models later means changing this file or the env var, nothing else.
//
// Rules: one request per generation, no retry loops (free requests are limited), no silent switch to a
// paid model, and prompts or results are never logged.

const ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";
const TIMEOUT_MS = Number(process.env.OPENROUTER_TIMEOUT_MS) || 45_000;

export class AiError extends Error {
  constructor(
    /** busy: rate limited or out of capacity. invalid: the model returned something unusable. down: provider error or timeout. config: missing key. */
    public kind: "busy" | "invalid" | "down" | "config",
    message: string,
    /** A network or gateway hiccup worth one retry. */
    public transient = false,
  ) {
    super(message);
  }
}

export function aiModel() {
  return process.env.OPENROUTER_MODEL || "nvidia/nemotron-3.5-super-vl:free";
}

// The free endpoint returns 502s or cut off bodies when requests overlap, so calls run at most two at a
// time per server, and a transport failure (not a bad answer, not a rate limit) gets one retry.
const MAX_PARALLEL = 2;
let running = 0;
const waiting: (() => void)[] = [];

async function withSlot<T>(fn: () => Promise<T>): Promise<T> {
  if (running >= MAX_PARALLEL) await new Promise<void>((resolve) => waiting.push(resolve));
  running++;
  try {
    return await fn();
  } finally {
    running--;
    waiting.shift()?.();
  }
}

/** One structured completion. Returns the parsed JSON object, or throws AiError. */
export async function completeJson(opts: Parameters<typeof completeOnce>[0]): Promise<unknown> {
  return withSlot(async () => {
    try {
      return await completeOnce(opts);
    } catch (e) {
      if (!(e instanceof AiError) || !e.transient || opts.signal?.aborted) throw e;
      await new Promise((r) => setTimeout(r, 1200));
      return completeOnce(opts);
    }
  });
}

async function completeOnce(opts: { system: string; user: string; schemaName: string; schema: object; maxTokens: number; signal?: AbortSignal }): Promise<unknown> {
  const key = process.env.OPENROUTER_API_KEY;
  if (!key) throw new AiError("config", "OPENROUTER_API_KEY is not set");
  const model = aiModel();
  // Guard against a paid model being configured by accident.
  if (!model.endsWith(":free") && process.env.OPENROUTER_ALLOW_PAID !== "true") throw new AiError("config", "Only free models are allowed");

  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://www.zainameen.com/tools",
        "X-Title": "Zain Ul Abdin free tools",
      },
      body: JSON.stringify({
        model,
        reasoning: { enabled: false },
        temperature: 0.8,
        max_tokens: opts.maxTokens,
        messages: [
          { role: "system", content: opts.system },
          { role: "user", content: opts.user },
        ],
        response_format: { type: "json_schema", json_schema: { name: opts.schemaName, strict: true, schema: opts.schema } },
      }),
      signal: opts.signal ? AbortSignal.any([opts.signal, AbortSignal.timeout(TIMEOUT_MS)]) : AbortSignal.timeout(TIMEOUT_MS),
    });
  } catch {
    throw new AiError("down", "timeout or network error", true);
  }
  if (res.status === 429) throw new AiError("busy", "provider rate limit");
  if (res.status === 402) throw new AiError("busy", "provider credit limit");
  if (!res.ok) throw new AiError("down", `provider status ${res.status}`, res.status >= 500);

  let body: { choices?: { message?: { content?: string | null } }[]; error?: { code?: number } };
  try {
    // OpenRouter may send keep-alive padding (blank lines or ": OPENROUTER PROCESSING") before the JSON body.
    const raw = (await res.text()).split("\n").filter((l) => !l.startsWith(":")).join("\n").trim();
    body = JSON.parse(raw);
  } catch {
    throw new AiError("invalid", "unreadable provider response", true);
  }
  if (body.error) throw new AiError(body.error.code === 429 ? "busy" : "down", `provider error ${body.error.code ?? ""}`);
  const text = body.choices?.[0]?.message?.content?.trim();
  if (!text) throw new AiError("invalid", "empty response");
  try {
    return JSON.parse(text.replace(/^```(?:json)?\s*|\s*```$/g, ""));
  } catch {
    throw new AiError("invalid", "malformed JSON");
  }
}

// ---------- Rate limiting ----------
// In memory, per server instance. It protects the shared free quota from one visitor using it all;
// the Vercel Firewall rule on /api/tools adds a second, global layer.

type Bucket = { minute: number[]; day: number[] };
const visitors = new Map<string, Bucket>();
const global: Bucket = { minute: [], day: [] };

const PER_VISITOR = { minute: 6, day: 40 };
const PER_INSTANCE = { minute: 18, day: 900 };

function prune(b: Bucket, now: number) {
  b.minute = b.minute.filter((t) => now - t < 60_000);
  b.day = b.day.filter((t) => now - t < 86_400_000);
}

/** Returns null when the request may go ahead (and counts it), or a reason when it must wait. */
export function takeSlot(visitor: string): "visitor" | "global" | null {
  const now = Date.now();
  prune(global, now);
  if (global.minute.length >= PER_INSTANCE.minute || global.day.length >= PER_INSTANCE.day) return "global";
  let b = visitors.get(visitor);
  if (!b) {
    b = { minute: [], day: [] };
    visitors.set(visitor, b);
  }
  prune(b, now);
  if (b.minute.length >= PER_VISITOR.minute || b.day.length >= PER_VISITOR.day) return "visitor";
  b.minute.push(now);
  b.day.push(now);
  global.minute.push(now);
  global.day.push(now);
  // Keep the map from growing forever on a long lived instance.
  if (visitors.size > 5000) for (const [k, v] of visitors) if (!v.day.length) visitors.delete(k);
  return null;
}
