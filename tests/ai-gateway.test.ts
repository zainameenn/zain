import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";
import { AiError, aiModels, runAi, sensitiveIn, visitorId } from "../lib/tools/ai/gateway";
import { MemoryStore, setCounterStore } from "../lib/tools/ai/store";

// The AI gateway with a fake provider: no real requests are made. Run with: npm test

type Reply = { status?: number; body?: unknown; raw?: string; headers?: Record<string, string> };
let replies: Reply[] = [];
let calls: string[] = [];

const realFetch = globalThis.fetch;
globalThis.fetch = (async (_url: string, init: RequestInit) => {
  const model = JSON.parse(String(init.body)).model as string;
  calls.push(model);
  const r = replies.shift() ?? { body: { choices: [{ message: { content: '{"name":"Fine"}' } }] } };
  return new Response(r.raw ?? JSON.stringify(r.body ?? {}), { status: r.status ?? 200, headers: r.headers });
}) as typeof fetch;
process.on("exit", () => (globalThis.fetch = realFetch));

const ok = (content: string): Reply => ({ body: { choices: [{ message: { content } }] } });
const base = { system: "s", user: "u", schemaName: "x", schema: {}, maxTokens: 50, validate: (raw: unknown) => ((raw as { name?: string })?.name ? raw : null) };

beforeEach(() => {
  setCounterStore(new MemoryStore());
  replies = [];
  calls = [];
  process.env.OPENROUTER_API_KEY = "test";
  delete process.env.OPENROUTER_MODEL;
  delete process.env.AI_MODELS;
  process.env.GROQ_API_KEY = "test";
  delete process.env.NVIDIA_API_KEY;
  process.env.OPENROUTER_MODELS = "a:free,b:free,c:free";
  process.env.AI_VISITOR_DAILY = "2";
  process.env.AI_GLOBAL_DAILY = "40";
  process.env.AI_GLOBAL_MINUTE = "15";
});

test("falls back to the next model on busy, broken or unusable answers", async () => {
  replies = [{ status: 503 }, ok('{"nope":1}'), ok('{"name":"Good"}')];
  const out = await runAi({ ...base, visitor: "v1" });
  assert.deepEqual(calls, ["a:free", "b:free", "c:free"]);
  assert.equal(out.model, "c:free");
  assert.equal(out.attempts, 3);
});

test("empty and malformed responses move on, and all failing gives invalid or down", async () => {
  replies = [ok(""), { raw: "not json" }, ok("{bad json")];
  await assert.rejects(runAi({ ...base, visitor: "v2" }), (e: AiError) => e.kind === "invalid");
  replies = [{ status: 500 }, { status: 502 }, { status: 504 }];
  await assert.rejects(runAi({ ...base, visitor: "v3" }), (e: AiError) => e.kind === "down");
});

test("keep alive padding before the JSON is fine", async () => {
  replies = [{ raw: '\n   \n: OPENROUTER PROCESSING\n{"choices":[{"message":{"content":"{\\"name\\":\\"Ok\\"}"}}]}' }];
  assert.equal(((await runAi({ ...base, visitor: "v4" })).value as { name: string }).name, "Ok");
});

test("429 with Retry-After pauses everyone without retrying", async () => {
  replies = [{ status: 429, headers: { "retry-after": "30" } }];
  await assert.rejects(runAi({ ...base, visitor: "v5" }), (e: AiError) => e.kind === "busy" && e.retryAfter === 30);
  assert.equal(calls.length, 1, "no automatic retry");
  await assert.rejects(runAi({ ...base, visitor: "v6" }), (e: AiError) => e.kind === "busy");
  assert.equal(calls.length, 1, "cooldown blocks the next request before it reaches the provider");
});

test("the account's free daily limit pauses until its reset instead of trying other models", async () => {
  const reset = Date.now() + 3_600_000;
  replies = [{ status: 429, raw: JSON.stringify({ error: { message: "Rate limit exceeded: free-models-per-day", code: 429, metadata: { headers: { "X-RateLimit-Reset": String(reset) } } } }) }];
  await assert.rejects(runAi({ ...base, visitor: "q" }), (e: AiError) => e.kind === "busy" && Number(e.retryAfter) > 3500);
  assert.equal(calls.length, 1);
});

test("a bad key stops at once instead of trying every model", async () => {
  replies = [{ status: 401 }];
  await assert.rejects(runAi({ ...base, visitor: "v7" }), (e: AiError) => e.kind === "config");
  assert.equal(calls.length, 1);
});

test("visitor allowance counts successes only", async () => {
  replies = [{ status: 503 }, { status: 503 }, { status: 503 }];
  await assert.rejects(runAi({ ...base, visitor: "same" }));
  await runAi({ ...base, visitor: "same" });
  await runAi({ ...base, visitor: "same" });
  await assert.rejects(runAi({ ...base, visitor: "same" }), (e: AiError) => e.kind === "visitor_limit" && Number(e.retryAfter) > 0);
});

test("global daily budget counts every provider attempt, including failures", async () => {
  process.env.AI_GLOBAL_DAILY = "4";
  process.env.AI_VISITOR_DAILY = "100";
  replies = [{ status: 503 }, { status: 503 }, ok('{"name":"x"}')];
  await runAi({ ...base, visitor: "g1" }); // 3 attempts
  await runAi({ ...base, visitor: "g2" }); // 1 attempt, budget now 4
  await assert.rejects(runAi({ ...base, visitor: "g3" }), (e: AiError) => e.kind === "busy");
  assert.equal(calls.length, 4);
});

test("concurrent requests can't overshoot the minute budget", async () => {
  process.env.AI_GLOBAL_MINUTE = "5";
  process.env.AI_VISITOR_DAILY = "100";
  const results = await Promise.allSettled(Array.from({ length: 12 }, (_, i) => runAi({ ...base, visitor: `c${i}` })));
  assert.equal(results.filter((r) => r.status === "fulfilled").length, 5);
  assert.equal(calls.length, 5);
});

test("duplicate clicks are refused while the first is running", async () => {
  process.env.AI_VISITOR_DAILY = "100";
  await runAi({ ...base, visitor: "d", dedupeKey: "same" });
  await assert.rejects(runAi({ ...base, visitor: "d", dedupeKey: "same" }), (e: AiError) => e.kind === "duplicate");
  await runAi({ ...base, visitor: "d", dedupeKey: "other" });
});

test("a resting or broken provider hands over to the next provider", async () => {
  process.env.AI_MODELS = "groq:g1,groq:g2,a:free";
  replies = [{ status: 429, headers: { "retry-after": "20" } }, ok('{"name":"From OpenRouter"}')];
  const out = await runAi({ ...base, visitor: "p1" });
  assert.deepEqual(calls, ["g1", "g2"], "Groq limits are per model, so its next model still gets a go");
  assert.equal(out.model, "groq:g2");
  replies = [{ status: 401 }, ok('{"name":"x"}')];
  calls = [];
  setCounterStore(new MemoryStore());
  assert.equal((await runAi({ ...base, visitor: "p2" })).model, "a:free");
  assert.deepEqual(calls, ["g1", "a:free"]);
});

test("providers without a key are left out, and NVIDIA joins when its key is set", () => {
  process.env.AI_MODELS = "groq:g1,nvidia:z-ai/glm-5.2,a:free";
  assert.deepEqual(aiModels().map((m) => m.id), ["groq:g1", "a:free"]);
  process.env.NVIDIA_API_KEY = "test";
  assert.deepEqual(aiModels().map((m) => m.provider), ["groq", "nvidia", "openrouter"]);
});

test("only free models unless paid is explicitly allowed", () => {
  process.env.OPENROUTER_MODELS = "x/paid,y:free";
  assert.deepEqual(aiModels().map((m) => m.id), ["y:free"]);
  process.env.OPENROUTER_MODELS = "recursive/flint-v1.0:free";
  assert.deepEqual(aiModels()[0].extra, { reasoning: { effort: "low" } }, "Flint needs reasoning on");
});

test("sensitive data is caught before it's sent", () => {
  assert.equal(sensitiveIn("Our key is sk-or-v1-abcdefabcdefabcdef1234"), "an API key");
  assert.equal(sensitiveIn("Card 4242 4242 4242 4242 please"), "a payment card number");
  assert.equal(sensitiveIn("email me at jane@example.com"), "an email address");
  assert.equal(sensitiveIn("password: hunter2"), "a password");
  assert.equal(sensitiveIn("Roof repair in Denver, call 303 555 0100"), null, "a public business phone is fine");
  assert.equal(sensitiveIn("Order 1234 5678 shipped"), null);
  assert.notEqual(visitorId("1.2.3.4"), "1.2.3.4");
});
