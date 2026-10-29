import { cached, once, remember, reserve, type Reservation } from "./quota";

// Server only. Clients for the free data sources the public SEO tools may use. Each call checks the
// cache first, then reserves allowance in the quota ledger, then makes exactly one request. No retries
// on 4xx; one attempt only, so a failure never spends twice. Only the fields the tools show are returned.

const DAY = 86_400_000;

export type Sourced<T> = { ok: true; data: T; source: string; checkedAt: string; cached: boolean } | { ok: false; message: string; renews?: string };

const fail = (r: Exclude<Reservation, { ok: true }>): Sourced<never> => ({ ok: false, message: r.message, renews: r.renews });

// ---------- Brave Search suggestions ----------

export const BRAVE_COUNTRIES = ["US", "GB", "CA", "AU", "IN", "DE", "FR", "ES", "IT", "NL", "BR", "MX", "JP", "PK", "AE", "ZA", "NZ", "IE", "SG"] as const;

export async function braveSuggest(query: string, country: string): Promise<Sourced<string[]>> {
  const q = query.trim().replace(/\s+/g, " ").toLowerCase().slice(0, 120);
  const cc = (BRAVE_COUNTRIES as readonly string[]).includes(country) ? country : "US";
  const key = `brave-suggest:${cc}:${q}`;
  const hit = cached<{ data: string[]; checkedAt: string }>(key, DAY);
  if (hit) return { ok: true, ...hit, source: "Brave Search suggestions", cached: true };
  return once(key, async () => {
    const r = await reserve("brave-suggest");
    if (!r.ok) return fail(r);
    const url = `https://api.search.brave.com/res/v1/suggest/search?q=${encodeURIComponent(q)}&country=${cc}&count=20`;
    try {
      const res = await fetch(url, { headers: { Accept: "application/json", "X-Subscription-Token": process.env.BRAVE_AUTOSUGGEST_KEY ?? "" }, signal: AbortSignal.timeout(8000), cache: "no-store" });
      if (res.status === 429) return { ok: false, message: "The suggestion source is busy. Try again in a minute." };
      if (res.status === 400 || res.status === 401 || res.status === 403) return { ok: false, message: "This data source isn't connected yet." };
      if (!res.ok) return { ok: false, message: "The suggestion source didn't answer. Try again later." };
      const body = (await res.json()) as { results?: { query?: string }[] };
      const data = [...new Set((body.results ?? []).map((x) => (x.query ?? "").trim()).filter(Boolean))];
      const checkedAt = new Date().toISOString();
      remember(key, { data, checkedAt });
      return { ok: true, data, checkedAt, source: "Brave Search suggestions", cached: false };
    } catch {
      return { ok: false, message: "The suggestion source didn't answer. Try again later." };
    }
  });
}

// ---------- Chrome UX Report (field data) ----------

export type CruxMetric = { p75: number | null; good: number | null; ni: number | null; poor: number | null };
export type CruxRecord = { scope: "url" | "origin"; key: string; formFactor: string; period: { first: string; last: string } | null; metrics: Record<"lcp" | "inp" | "cls" | "fcp" | "ttfb", CruxMetric | null> };

const METRIC_KEYS = { lcp: "largest_contentful_paint", inp: "interaction_to_next_paint", cls: "cumulative_layout_shift", fcp: "first_contentful_paint", ttfb: "experimental_time_to_first_byte" } as const;

type CruxApi = {
  record?: {
    key?: { url?: string; origin?: string; formFactor?: string };
    metrics?: Record<string, { histogram?: { density?: number }[]; percentiles?: { p75?: number | string } }>;
    collectionPeriod?: { firstDate?: { year: number; month: number; day: number }; lastDate?: { year: number; month: number; day: number } };
  };
};

const ymd = (d?: { year: number; month: number; day: number }) => (d ? `${d.year}-${String(d.month).padStart(2, "0")}-${String(d.day).padStart(2, "0")}` : "");

function toRecord(body: CruxApi, scope: "url" | "origin"): CruxRecord {
  const r = body.record ?? {};
  const metrics = Object.fromEntries(
    Object.entries(METRIC_KEYS).map(([k, apiKey]) => {
      const m = r.metrics?.[apiKey];
      if (!m) return [k, null];
      const h = m.histogram ?? [];
      const p = m.percentiles?.p75;
      return [k, { p75: p === undefined ? null : Number(p), good: h[0]?.density ?? null, ni: h[1]?.density ?? null, poor: h[2]?.density ?? null }];
    }),
  ) as CruxRecord["metrics"];
  const cp = r.collectionPeriod;
  return { scope, key: r.key?.url ?? r.key?.origin ?? "", formFactor: r.key?.formFactor ?? "ALL_FORM_FACTORS", period: cp ? { first: ymd(cp.firstDate), last: ymd(cp.lastDate) } : null, metrics };
}

/** URL level field data, falling back to the origin (labelled as such) when the URL has too little data. */
export async function cruxRecord(pageUrl: string, formFactor: "PHONE" | "DESKTOP"): Promise<Sourced<CruxRecord | null>> {
  const u = new URL(pageUrl);
  const key = `crux:${formFactor}:${u.origin}${u.pathname}`;
  const hit = cached<{ data: CruxRecord | null; checkedAt: string }>(key, DAY / 2);
  if (hit) return { ok: true, ...hit, source: "Chrome UX Report (CrUX)", cached: true };
  return once(key, async () => {
    const ask = async (body: Record<string, string>) => {
      const r = await reserve("google-crux");
      if (!r.ok) return r;
      const res = await fetch(`https://chromeuxreport.googleapis.com/v1/records:queryRecord?key=${process.env.GOOGLE_API_KEY ?? ""}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...body, formFactor }), signal: AbortSignal.timeout(8000), cache: "no-store" });
      return res;
    };
    try {
      let res = await ask({ url: `${u.origin}${u.pathname}` });
      if (!(res instanceof Response)) return fail(res);
      let scope: "url" | "origin" = "url";
      if (res.status === 404) {
        res = await ask({ origin: u.origin });
        if (!(res instanceof Response)) return fail(res);
        scope = "origin";
      }
      const checkedAt = new Date().toISOString();
      if (res.status === 404) {
        remember(key, { data: null, checkedAt });
        return { ok: true, data: null, checkedAt, source: "Chrome UX Report (CrUX)", cached: false };
      }
      if (res.status === 429) return { ok: false, message: "Google's field data service is busy. Try again in a minute." };
      if (!res.ok) return { ok: false, message: "Google's field data service didn't answer. Try again later." };
      const data = toRecord((await res.json()) as CruxApi, scope);
      remember(key, { data, checkedAt });
      return { ok: true, data, checkedAt, source: "Chrome UX Report (CrUX)", cached: false };
    } catch {
      return { ok: false, message: "Google's field data service didn't answer. Try again later." };
    }
  });
}
