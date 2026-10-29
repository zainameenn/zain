import { counterStore, type CounterStore } from "@/lib/tools/ai/store";

// Monthly allowance ledger for metered data providers. Server only.
//
// Rules (see the SEO tools brief):
// - Every provider has its own monthly counter. A request is reserved BEFORE it is sent; once the
//   counter passes the safety stop (90% of the allowance by default) the provider is closed until
//   the next calendar month (UTC). Unused allowance never rolls over.
// - Public mode only ever uses providers marked `publicFree`. Paid providers need owner mode.
// - In production the counter must be shared across serverless instances (Upstash). Without a
//   shared store a metered provider fails closed, because per instance memory could overspend.
// - Allowances come from env so they can be corrected from the provider dashboard without a deploy.

export type ProviderId = "brave-suggest" | "brave-search" | "google-crux";

export type Provider = {
  id: ProviderId;
  label: string;
  envKey: string;
  /** Free requests per calendar month. */
  monthlyAllowance: number;
  /** Fraction of the allowance after which requests stop. */
  stopAt: number;
  /** Safe for anonymous public visitors because it only uses a free allowance. */
  publicFree: boolean;
};

const envNum = (name: string, fallback: number) => {
  const n = Number(process.env[name]);
  return Number.isFinite(n) && n > 0 ? n : fallback;
};

export const PROVIDERS: Record<ProviderId, Provider> = {
  // Brave Search API free plans. Confirm the allowance in the Brave dashboard and set the env if it differs.
  "brave-suggest": { id: "brave-suggest", label: "Brave Search suggestions", envKey: "BRAVE_AUTOSUGGEST_KEY", monthlyAllowance: envNum("BRAVE_SUGGEST_MONTHLY", 2000), stopAt: 0.9, publicFree: true },
  "brave-search": { id: "brave-search", label: "Brave Search", envKey: "BRAVE_SEARCH_KEY", monthlyAllowance: envNum("BRAVE_SEARCH_MONTHLY", 2000), stopAt: 0.9, publicFree: true },
  // The CrUX API has no billing, only rate limits. The cap keeps one busy day from hitting them.
  "google-crux": { id: "google-crux", label: "Chrome UX Report", envKey: "GOOGLE_API_KEY", monthlyAllowance: envNum("CRUX_MONTHLY", 20000), stopAt: 0.9, publicFree: true },
};

export const QUOTA_MESSAGE = "This free data source has reached its current allowance. Try again when it renews.";

export const monthKey = (d = new Date()) => d.toISOString().slice(0, 7);

/** First day of next month (UTC), as YYYY-MM-DD. The providers above renew by calendar month. */
export function renewsOn(d = new Date()): string {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth() + 1, 1)).toISOString().slice(0, 10);
}

export const stopLimit = (p: Provider) => Math.floor(p.monthlyAllowance * p.stopAt);

export type Reservation = { ok: true } | { ok: false; reason: "no-key" | "no-shared-store" | "exhausted" | "not-public"; message: string; renews?: string };

/** Reserves `n` requests for a provider. Call once per uncached outgoing request, before sending it. */
export async function reserve(id: ProviderId, n = 1, opts: { mode?: "public" | "owner"; store?: CounterStore; production?: boolean; now?: Date } = {}): Promise<Reservation> {
  const p = PROVIDERS[id];
  const mode = opts.mode ?? "public";
  if (mode === "public" && !p.publicFree) return { ok: false, reason: "not-public", message: "This data source isn't available on the free tools." };
  if (!process.env[p.envKey]) return { ok: false, reason: "no-key", message: "This data source isn't connected yet." };
  const store = opts.store ?? counterStore();
  // A local preview build (TOOLS_PREVIEW=1) may use the per instance counter; Vercel never sets it.
  const production = opts.production ?? (process.env.NODE_ENV === "production" && process.env.TOOLS_PREVIEW !== "1");
  if (production && !store.shared) return { ok: false, reason: "no-shared-store", message: "This data source is switched off until usage tracking is connected." };
  const now = opts.now ?? new Date();
  const used = await store.incr(`quota:${id}:${monthKey(now)}`, 40 * 86400, n);
  if (used > stopLimit(p)) return { ok: false, reason: "exhausted", message: QUOTA_MESSAGE, renews: renewsOn(now) };
  return { ok: true };
}

/** Requests used this month, for the owner. */
export async function usage(id: ProviderId, store: CounterStore = counterStore(), now = new Date()) {
  const p = PROVIDERS[id];
  const used = await store.get(`quota:${id}:${monthKey(now)}`);
  return { provider: p.label, used, stopAt: stopLimit(p), allowance: p.monthlyAllowance, renews: renewsOn(now) };
}

/** Small per instance cache so a repeated query never spends a second request. */
const CACHE = new Map<string, { at: number; value: unknown }>();
export function cached<T>(key: string, ttlMs: number): T | undefined {
  const hit = CACHE.get(key);
  if (!hit) return undefined;
  if (Date.now() - hit.at > ttlMs) {
    CACHE.delete(key);
    return undefined;
  }
  return hit.value as T;
}
export function remember(key: string, value: unknown) {
  if (CACHE.size > 2000) CACHE.delete(CACHE.keys().next().value as string);
  CACHE.set(key, { at: Date.now(), value });
}

/** Concurrent identical requests share one promise, so a double click never costs twice. */
const INFLIGHT = new Map<string, Promise<unknown>>();
export function once<T>(key: string, run: () => Promise<T>): Promise<T> {
  const live = INFLIGHT.get(key) as Promise<T> | undefined;
  if (live) return live;
  const p = run().finally(() => INFLIGHT.delete(key));
  INFLIGHT.set(key, p);
  return p;
}
