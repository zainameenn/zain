// Shared counters for AI rate limits. Uses Upstash Redis (or Vercel KV, which is Upstash) over its REST
// API when configured, so every serverless instance sees the same numbers. Without it, falls back to
// process memory, which only limits per instance: fine locally, not enough in production.
//
// Env: UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN, or KV_REST_API_URL + KV_REST_API_TOKEN.

export interface CounterStore {
  readonly shared: boolean;
  /** Atomically adds `by` and returns the new value. The key expires `ttlSeconds` after it's first created. */
  incr(key: string, ttlSeconds: number, by?: number): Promise<number>;
  get(key: string): Promise<number>;
  /** Sets a key only if it doesn't exist yet. Returns true when it was set. */
  setIfAbsent(key: string, value: string, ttlSeconds: number): Promise<boolean>;
  ttl(key: string): Promise<number>;
}

class MemoryStore implements CounterStore {
  readonly shared = false;
  private data = new Map<string, { v: number; exp: number }>();
  private live(key: string) {
    const e = this.data.get(key);
    if (e && e.exp <= Date.now()) {
      this.data.delete(key);
      return undefined;
    }
    return e;
  }
  async incr(key: string, ttlSeconds: number, by = 1) {
    const e = this.live(key);
    const next = (e?.v ?? 0) + by;
    this.data.set(key, { v: next, exp: e?.exp ?? Date.now() + ttlSeconds * 1000 });
    if (this.data.size > 20000) for (const k of this.data.keys()) this.live(k);
    return next;
  }
  async get(key: string) {
    return this.live(key)?.v ?? 0;
  }
  async setIfAbsent(key: string, _value: string, ttlSeconds: number) {
    if (this.live(key)) return false;
    this.data.set(key, { v: 1, exp: Date.now() + ttlSeconds * 1000 });
    return true;
  }
  async ttl(key: string) {
    const e = this.live(key);
    return e ? Math.ceil((e.exp - Date.now()) / 1000) : -2;
  }
}

class UpstashStore implements CounterStore {
  readonly shared = true;
  constructor(
    private url: string,
    private token: string,
  ) {}
  private async pipeline(cmds: (string | number)[][]): Promise<unknown[]> {
    const res = await fetch(`${this.url}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${this.token}`, "Content-Type": "application/json" },
      body: JSON.stringify(cmds),
      signal: AbortSignal.timeout(3000),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`store ${res.status}`);
    const out = (await res.json()) as { result?: unknown; error?: string }[];
    return out.map((r) => {
      if (r.error) throw new Error("store error");
      return r.result;
    });
  }
  async incr(key: string, ttlSeconds: number, by = 1) {
    // INCRBY then EXPIRE NX: atomic per command, and the expiry is only set when the key is new.
    const [v] = await this.pipeline([["INCRBY", key, by], ["EXPIRE", key, ttlSeconds, "NX"]]);
    return Number(v);
  }
  async get(key: string) {
    const [v] = await this.pipeline([["GET", key]]);
    return Number(v ?? 0);
  }
  async setIfAbsent(key: string, value: string, ttlSeconds: number) {
    const [v] = await this.pipeline([["SET", key, value, "NX", "EX", ttlSeconds]]);
    return v === "OK";
  }
  async ttl(key: string) {
    const [v] = await this.pipeline([["TTL", key]]);
    return Number(v);
  }
}

let store: CounterStore | null = null;

export function counterStore(): CounterStore {
  if (store) return store;
  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
  store = url && token ? new UpstashStore(url.replace(/\/$/, ""), token) : new MemoryStore();
  return store;
}

/** For tests: swap in a fresh store. */
export function setCounterStore(s: CounterStore | null) {
  store = s;
}

export { MemoryStore };
