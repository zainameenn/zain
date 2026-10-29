import { adjust, cached, once, remember, reserve, type ProviderId } from "./quota";

// Server only. Paid data sources (Serper for Google results, DataForSEO Labs for keyword and domain
// metrics), approved for public use under the monthly caps in quota.ts. Every tool returns the same
// table shape so one interface can show it. Values the provider didn't return are null, never zero.

export type Cell = string | number | null;
export type DataResult = {
  heading: string;
  summary?: [string, string][];
  columns: string[];
  rows: Cell[][];
  notes: string[];
  source: string;
  checkedAt: string;
  cached?: boolean;
};
export type Outcome = { ok: true; data: DataResult } | { ok: false; message: string; renews?: string };

export const MARKETS: Record<string, { name: string; dfs: number; lang: string }> = {
  US: { name: "United States", dfs: 2840, lang: "en" },
  GB: { name: "United Kingdom", dfs: 2826, lang: "en" },
  CA: { name: "Canada", dfs: 2124, lang: "en" },
  AU: { name: "Australia", dfs: 2036, lang: "en" },
  IN: { name: "India", dfs: 2356, lang: "en" },
  IE: { name: "Ireland", dfs: 2372, lang: "en" },
  NZ: { name: "New Zealand", dfs: 2554, lang: "en" },
  SG: { name: "Singapore", dfs: 2702, lang: "en" },
  ZA: { name: "South Africa", dfs: 2710, lang: "en" },
  AE: { name: "United Arab Emirates", dfs: 2784, lang: "en" },
  PK: { name: "Pakistan", dfs: 2586, lang: "en" },
  DE: { name: "Germany", dfs: 2276, lang: "de" },
  FR: { name: "France", dfs: 2250, lang: "fr" },
  ES: { name: "Spain", dfs: 2724, lang: "es" },
  IT: { name: "Italy", dfs: 2380, lang: "it" },
  NL: { name: "Netherlands", dfs: 2528, lang: "nl" },
  BR: { name: "Brazil", dfs: 2076, lang: "pt" },
  MX: { name: "Mexico", dfs: 2484, lang: "es" },
  JP: { name: "Japan", dfs: 2392, lang: "ja" },
};
const market = (cc: string) => MARKETS[cc] ?? MARKETS.US;

export function cleanDomain(raw: string): string | null {
  const d = raw.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/[/?#].*$/, "");
  return /^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(d) ? d : null;
}

const DAY = 86_400_000;
const now = () => new Date().toISOString();
const busy = "The data source didn't answer. Try again in a few minutes.";

async function guarded(provider: ProviderId, key: string, ttl: number, estimate: number, run: () => Promise<{ data: DataResult; actual: number } | { error: string }>): Promise<Outcome> {
  const hit = cached<DataResult>(key, ttl);
  if (hit) return { ok: true, data: { ...hit, cached: true } };
  return once(key, async () => {
    const r = await reserve(provider, estimate);
    if (!r.ok) return { ok: false, message: r.message, renews: r.renews };
    try {
      const out = await run();
      if ("error" in out) {
        await adjust(provider, -estimate);
        return { ok: false, message: out.error };
      }
      await adjust(provider, out.actual - estimate);
      remember(key, out.data);
      return { ok: true, data: out.data };
    } catch {
      return { ok: false, message: busy };
    }
  });
}

// ---------- Serper: Google results ----------

type SerperOrganic = { title?: string; link?: string; snippet?: string; position?: number };
type SerperResponse = {
  organic?: SerperOrganic[];
  peopleAlsoAsk?: { question?: string; snippet?: string; title?: string; link?: string }[];
  relatedSearches?: { query?: string }[];
  answerBox?: unknown;
  knowledgeGraph?: unknown;
  topStories?: unknown[];
  images?: unknown[];
  videos?: unknown[];
  places?: { title?: string; address?: string; rating?: number; ratingCount?: number; category?: string; website?: string }[];
  shopping?: unknown[];
  credits?: number;
};

async function serper(endpoint: "search" | "places", body: Record<string, unknown>): Promise<{ res: SerperResponse; credits: number } | { error: string }> {
  const res = await fetch(`https://google.serper.dev/${endpoint}`, { method: "POST", headers: { "X-API-KEY": process.env.SERPER_API_KEY ?? "", "Content-Type": "application/json" }, body: JSON.stringify(body), signal: AbortSignal.timeout(15000), cache: "no-store" });
  if (res.status === 401 || res.status === 403) return { error: "This data source isn't connected yet." };
  if (res.status === 429) return { error: "The data source is busy. Try again in a minute." };
  if (!res.ok) return { error: busy };
  const json = (await res.json()) as SerperResponse;
  return { res: json, credits: Number(json.credits ?? 1) };
}

const host = (u?: string) => {
  try {
    return new URL(u ?? "").hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

export async function serpCheck(q: string, cc: string, device: "desktop" | "mobile"): Promise<Outcome> {
  const key = `serp:${cc}:${device}:${q.toLowerCase()}`;
  return guarded("serper", key, DAY / 4, 1, async () => {
    const r = await serper("search", { q, gl: cc.toLowerCase(), num: 10, ...(device === "mobile" ? { device: "mobile" } : {}) });
    if ("error" in r) return r;
    const organic = r.res.organic ?? [];
    return {
      actual: r.credits,
      data: {
        heading: `Top ${organic.length} organic results for "${q}"`,
        columns: ["Position", "Page", "Domain"],
        rows: organic.map((o) => [o.position ?? null, `${o.title ?? ""}\n${o.link ?? ""}`, host(o.link)]),
        summary: [["Market", market(cc).name], ["Device", device], ["Other result types returned", features(r.res).join(", ") || "None"]],
        notes: ["Organic results only. Ads, maps and other features are listed separately and are not given a position."],
        source: "Google results via Serper",
        checkedAt: now(),
      },
    };
  });
}

function features(r: SerperResponse): string[] {
  const out: string[] = [];
  if (r.answerBox) out.push("Featured snippet or answer box");
  if (r.knowledgeGraph) out.push("Knowledge panel");
  if (r.peopleAlsoAsk?.length) out.push(`People Also Ask (${r.peopleAlsoAsk.length})`);
  if (r.topStories?.length) out.push("Top stories");
  if (r.images?.length) out.push("Images");
  if (r.videos?.length) out.push("Videos");
  if (r.places?.length) out.push("Local pack");
  if (r.shopping?.length) out.push("Shopping");
  if (r.relatedSearches?.length) out.push("Related searches");
  return out;
}

export async function serpFeatures(q: string, cc: string, device: "desktop" | "mobile"): Promise<Outcome> {
  const key = `feat:${cc}:${device}:${q.toLowerCase()}`;
  return guarded("serper", key, DAY / 4, 1, async () => {
    const r = await serper("search", { q, gl: cc.toLowerCase(), num: 10, ...(device === "mobile" ? { device: "mobile" } : {}) });
    if ("error" in r) return r;
    const all = ["Featured snippet or answer box", "Knowledge panel", "People Also Ask", "Top stories", "Images", "Videos", "Local pack", "Shopping", "Related searches"];
    const found = features(r.res);
    return {
      actual: r.credits,
      data: {
        heading: `${found.length} result types besides ordinary links for "${q}"`,
        columns: ["Result type", "In this sample"],
        rows: all.map((f) => [f, found.find((x) => x.startsWith(f)) ? `Detected${found.find((x) => x.startsWith(f))!.slice(f.length)}` : "Not detected"]),
        summary: [["Market", market(cc).name], ["Device", device], ["Organic results", String(r.res.organic?.length ?? 0)]],
        notes: ["Not detected means it wasn't in this sampled result or the source didn't return that type. It doesn't prove Google never shows it.", "AI Overviews aren't reported by this source, so they aren't listed."],
        source: "Google results via Serper",
        checkedAt: now(),
      },
    };
  });
}

export async function paaQuestions(q: string, cc: string): Promise<Outcome> {
  const key = `paa:${cc}:${q.toLowerCase()}`;
  return guarded("serper", key, DAY, 1, async () => {
    const r = await serper("search", { q, gl: cc.toLowerCase(), num: 10 });
    if ("error" in r) return r;
    const paa = r.res.peopleAlsoAsk ?? [];
    return {
      actual: r.credits,
      data: {
        heading: paa.length ? `${paa.length} People Also Ask questions for "${q}"` : `No People Also Ask box for "${q}" in this sample`,
        columns: ["Question", "Answer shown from"],
        rows: paa.map((p) => [p.question ?? "", p.link ? `${p.title ?? host(p.link)}\n${p.link}` : null]),
        summary: [["Market", market(cc).name], ["Related searches", (r.res.relatedSearches ?? []).map((x) => x.query).filter(Boolean).slice(0, 8).join(" · ") || "None returned"]],
        notes: ["Observed questions from one sampled results page. The box varies by location and time, and answering a question doesn't guarantee a place in it."],
        source: "Google results via Serper",
        checkedAt: now(),
      },
    };
  });
}

/** Google no longer serves 100 results per page, so the check pages through up to three pages (top 30). */
export const RANK_PAGES = 3;

export async function rankCheck(q: string, domain: string, cc: string, device: "desktop" | "mobile"): Promise<Outcome> {
  const key = `rank:${cc}:${device}:${domain}:${q.toLowerCase()}`;
  return guarded("serper", key, DAY / 4, RANK_PAGES, async () => {
    const organic: SerperOrganic[] = [];
    let credits = 0;
    for (let page = 1; page <= RANK_PAGES; page++) {
      const r = await serper("search", { q, gl: cc.toLowerCase(), page, ...(device === "mobile" ? { device: "mobile" } : {}) });
      if ("error" in r) {
        if (page === 1) return r;
        break;
      }
      credits += r.credits;
      const items = r.res.organic ?? [];
      // Positions restart on each page, so number them across pages.
      items.forEach((o) => organic.push({ ...o, position: organic.length + 1 }));
      if (!items.length || items.some((o) => host(o.link) === domain || host(o.link).endsWith(`.${domain}`))) break;
    }
    const hits = organic.filter((o) => host(o.link) === domain || host(o.link).endsWith(`.${domain}`));
    return {
      actual: credits,
      data: {
        heading: hits.length ? `${domain} found at position ${hits[0].position} for "${q}"` : `${domain} not found in the first ${organic.length} results for "${q}"`,
        columns: ["Position", "Ranking URL"],
        rows: hits.map((o) => [o.position ?? null, `${o.title ?? ""}\n${o.link ?? ""}`]),
        summary: [["Market", market(cc).name], ["Device", device], ["Depth searched", `${organic.length} organic results`]],
        notes: ["A point in time snapshot of up to the top 30 results. Not found within this depth is not the same as not indexed. Search Console average position is a different, historical measure."],
        source: "Google results via Serper",
        checkedAt: now(),
      },
    };
  });
}

export async function localSerp(q: string, location: string, cc: string): Promise<Outcome> {
  const key = `local:${cc}:${location.toLowerCase()}:${q.toLowerCase()}`;
  return guarded("serper", key, DAY / 4, 2, async () => {
    const [web, maps] = await Promise.all([serper("search", { q, gl: cc.toLowerCase(), location, num: 10 }), serper("places", { q, gl: cc.toLowerCase(), location })]);
    if ("error" in web) return web;
    const places = "error" in maps ? [] : (maps.res.places ?? []).slice(0, 10);
    const organic = web.res.organic ?? [];
    return {
      actual: web.credits + ("error" in maps ? 0 : maps.credits),
      data: {
        heading: `Local results for "${q}" near ${location}`,
        columns: ["Type", "Position", "Result"],
        rows: [
          ...places.map((p, i) => ["Map listing", i + 1, `${p.title ?? ""}${p.category ? ` (${p.category})` : ""}\n${p.address ?? ""}${p.rating ? `\nRating ${p.rating} from ${p.ratingCount ?? "?"} reviews` : ""}`] as Cell[]),
          ...organic.map((o) => ["Website", o.position ?? null, `${o.title ?? ""}\n${o.link ?? ""}`] as Cell[]),
        ],
        summary: [["Location", location], ["Map listings", String(places.length)], ["Organic results", String(organic.length)]],
        notes: ["Map listings and website results are separate rankings and are numbered separately. One location sample isn't a full geo grid."],
        source: "Google results and Maps via Serper",
        checkedAt: now(),
      },
    };
  });
}

// ---------- DataForSEO Labs: keyword and domain metrics ----------

type DfsTask = { status_code?: number; status_message?: string; cost?: number; result?: { items?: Record<string, unknown>[] | null; total_count?: number }[] | null };
const MICRO = 1_000_000;
const EST = 0.03 * MICRO;

async function dfs(path: string, task: Record<string, unknown>): Promise<{ items: Record<string, unknown>[]; total: number | null; cost: number } | { error: string }> {
  const auth = Buffer.from(`${process.env.DATAFORSEO_LOGIN ?? ""}:${process.env.DATAFORSEO_PASSWORD ?? ""}`).toString("base64");
  const res = await fetch(`https://api.dataforseo.com/v3/${path}`, { method: "POST", headers: { Authorization: `Basic ${auth}`, "Content-Type": "application/json" }, body: JSON.stringify([task]), signal: AbortSignal.timeout(55000), cache: "no-store" });
  if (res.status === 401) return { error: "This data source isn't connected yet." };
  if (!res.ok) return { error: busy };
  const body = (await res.json()) as { status_code?: number; tasks?: DfsTask[] };
  const t = body.tasks?.[0];
  if (!t) return { error: busy };
  if (t.status_code === 40200 || t.status_code === 40210) return { error: "This data source has reached its current allowance. Try again when it renews." };
  if (t.status_code !== 20000) return { error: t.status_code === 40501 || t.status_code === 40503 ? "The data source rejected that input. Check it and try again." : busy };
  return { items: t.result?.[0]?.items ?? [], total: t.result?.[0]?.total_count ?? null, cost: Math.round((t.cost ?? 0.03) * MICRO) };
}

const get = (o: unknown, path: string): unknown => path.split(".").reduce<unknown>((x, k) => (x && typeof x === "object" ? (x as Record<string, unknown>)[k] : undefined), o);
const num = (v: unknown): number | null => (typeof v === "number" && Number.isFinite(v) ? v : null);
const str = (v: unknown): string | null => (typeof v === "string" && v ? v : null);
const money = (v: unknown) => (num(v) === null ? null : `$${num(v)!.toFixed(2)}`);
const loc = (cc: string) => ({ location_code: market(cc).dfs, language_code: market(cc).lang });

export async function keywordMetrics(keywords: string[], cc: string, focus: "volume" | "difficulty"): Promise<Outcome> {
  const list = [...new Set(keywords.map((k) => k.trim().toLowerCase()).filter(Boolean))].slice(0, 20);
  const key = `kwm:${cc}:${list.join("|")}`;
  return guarded("dataforseo", `${key}:${focus}`, DAY * 3, EST, async () => {
    const r = await dfs("dataforseo_labs/google/keyword_overview/live", { keywords: list, ...loc(cc), include_serp_info: false });
    if ("error" in r) return r;
    const by = new Map(r.items.map((i) => [String(i.keyword ?? "").toLowerCase(), i]));
    const rows = list.map((k) => {
      const i = by.get(k);
      const vol = num(get(i, "keyword_info.search_volume"));
      const kd = num(get(i, "keyword_properties.keyword_difficulty"));
      const intent = str(get(i, "search_intent_info.main_intent"));
      return focus === "volume" ? [k, vol, money(get(i, "keyword_info.cpc")), str(get(i, "keyword_info.competition_level"))?.toLowerCase() ?? null] : [k, kd, vol, intent];
    });
    return {
      actual: r.cost,
      data: {
        heading: focus === "volume" ? `Monthly search volume in ${market(cc).name}` : `Organic keyword difficulty in ${market(cc).name}`,
        columns: focus === "volume" ? ["Keyword", "Avg. monthly searches", "CPC", "Ad competition"] : ["Keyword", "Difficulty (0 to 100)", "Avg. monthly searches", "Main intent"],
        rows,
        notes:
          focus === "volume"
            ? ["Volumes are modelled estimates averaged over the last 12 months. Blank means the source has no estimate, not zero searches.", "Ad competition describes advertisers in Google Ads. It is not SEO difficulty."]
            : ["Difficulty is DataForSEO's own 0 to 100 estimate of organic ranking difficulty. It isn't a Google score and isn't comparable with other tools' numbers. Look at the actual results page too."],
        source: "DataForSEO Labs (Google)",
        checkedAt: now(),
      },
    };
  });
}

export async function keywordIdeas(seed: string, cc: string): Promise<Outcome> {
  const key = `ideas:${cc}:${seed.toLowerCase()}`;
  return guarded("dataforseo", key, DAY * 3, EST, async () => {
    const r = await dfs("dataforseo_labs/google/keyword_suggestions/live", { keyword: seed, ...loc(cc), limit: 50, include_seed_keyword: true, order_by: ["keyword_info.search_volume,desc"] });
    if ("error" in r) return r;
    return {
      actual: r.cost,
      data: {
        heading: `${r.items.length} keyword ideas containing "${seed}"`,
        columns: ["Keyword", "Avg. monthly searches", "Difficulty", "CPC", "Main intent"],
        rows: r.items.map((i) => [str(i.keyword), num(get(i, "keyword_info.search_volume")), num(get(i, "keyword_properties.keyword_difficulty")), money(get(i, "keyword_info.cpc")), str(get(i, "search_intent_info.main_intent"))]),
        summary: [["Market", market(cc).name], ["Ideas in the source", r.total === null ? "Unknown" : r.total.toLocaleString()]],
        notes: ["Ideas that contain your seed, sorted by estimated volume. Blank cells are values the source doesn't have.", "Difficulty is DataForSEO's own estimate, not a Google score."],
        source: "DataForSEO Labs (Google)",
        checkedAt: now(),
      },
    };
  });
}

export async function organicKeywords(domain: string, cc: string): Promise<Outcome> {
  const key = `ranked:${cc}:${domain}`;
  return guarded("dataforseo", key, DAY * 3, EST, async () => {
    const r = await dfs("dataforseo_labs/google/ranked_keywords/live", { target: domain, ...loc(cc), limit: 50, order_by: ["keyword_data.keyword_info.search_volume,desc"] });
    if ("error" in r) return r;
    return {
      actual: r.cost,
      data: {
        heading: r.items.length ? `Top ${r.items.length} organic keywords for ${domain}` : `No organic keywords on record for ${domain} in ${market(cc).name}`,
        columns: ["Keyword", "Position", "Avg. monthly searches", "Ranking URL"],
        rows: r.items.map((i) => [str(get(i, "keyword_data.keyword")), num(get(i, "ranked_serp_element.serp_item.rank_absolute")), num(get(i, "keyword_data.keyword_info.search_volume")), str(get(i, "ranked_serp_element.serp_item.url"))]),
        summary: [["Market", market(cc).name], ["Keywords on record", r.total === null ? "Unknown" : r.total.toLocaleString()]],
        notes: ["From DataForSEO's ranking database, which samples searches. It isn't every query the site appears for. For your own site, compare with Search Console."],
        source: "DataForSEO Labs (Google)",
        checkedAt: now(),
      },
    };
  });
}

export async function trafficEstimate(domain: string, cc: string): Promise<Outcome> {
  const key = `traffic:${cc}:${domain}`;
  return guarded("dataforseo", key, DAY * 3, EST, async () => {
    const r = await dfs("dataforseo_labs/google/domain_rank_overview/live", { target: domain, ...loc(cc) });
    if ("error" in r) return r;
    const m = get(r.items[0], "metrics.organic");
    const etv = num(get(m, "etv"));
    const count = num(get(m, "count"));
    return {
      actual: r.cost,
      data: {
        heading: etv === null ? `No organic estimate for ${domain} in ${market(cc).name}` : `About ${Math.round(etv).toLocaleString()} estimated organic visits a month`,
        columns: ["Measure", "Value"],
        rows: [
          ["Estimated monthly organic visits", etv === null ? null : Math.round(etv)],
          ["Ranking keywords on record", count],
          ["Keywords in position 1", num(get(m, "pos_1"))],
          ["Keywords in positions 2 to 3", num(get(m, "pos_2_3"))],
          ["Keywords in positions 4 to 10", num(get(m, "pos_4_10"))],
          ["Keywords in positions 11 to 20", num(get(m, "pos_11_20"))],
        ],
        summary: [["Market", market(cc).name], ["Domain", domain]],
        notes: ["Organic search only: an estimate from rankings, search volumes and click through assumptions. It is not total traffic, not sessions and not Search Console clicks. Treat it as directional."],
        source: "DataForSEO Labs (Google)",
        checkedAt: now(),
      },
    };
  });
}

export async function seoCompetitors(domain: string, cc: string): Promise<Outcome> {
  const key = `comp:${cc}:${domain}`;
  return guarded("dataforseo", key, DAY * 3, EST, async () => {
    const r = await dfs("dataforseo_labs/google/competitors_domain/live", { target: domain, ...loc(cc), limit: 20, exclude_top_domains: true });
    if ("error" in r) return r;
    const rows = r.items.filter((i) => str(i.domain) !== domain).map((i) => [str(i.domain), num(i.intersections), num(i.avg_position) === null ? null : Number(num(i.avg_position)!.toFixed(1)), num(get(i, "full_domain_metrics.organic.count"))]);
    return {
      actual: r.cost,
      data: {
        heading: rows.length ? `${rows.length} sites competing with ${domain} in search` : `No search competitors on record for ${domain}`,
        columns: ["Domain", "Shared keywords", "Their avg. position on shared keywords", "Their total ranking keywords"],
        rows,
        summary: [["Market", market(cc).name]],
        notes: ["Search competitors share ranking keywords with you. Some will be publishers or directories rather than business rivals. Very large sites are left out."],
        source: "DataForSEO Labs (Google)",
        checkedAt: now(),
      },
    };
  });
}

export async function keywordGap(you: string, rival: string, cc: string): Promise<Outcome> {
  const key = `gap:${cc}:${you}:${rival}`;
  return guarded("dataforseo", key, DAY * 3, EST, async () => {
    const r = await dfs("dataforseo_labs/google/domain_intersection/live", { target1: rival, target2: you, intersections: false, ...loc(cc), limit: 50, order_by: ["keyword_data.keyword_info.search_volume,desc"] });
    if ("error" in r) return r;
    return {
      actual: r.cost,
      data: {
        heading: r.items.length ? `${r.items.length} keywords ${rival} ranks for and ${you} doesn't` : `No keyword gap on record between ${rival} and ${you}`,
        columns: ["Keyword", "Avg. monthly searches", `${rival} position`, `${rival} URL`],
        rows: r.items.map((i) => [str(get(i, "keyword_data.keyword")), num(get(i, "keyword_data.keyword_info.search_volume")), num(get(i, "first_domain_serp_element.rank_absolute")), str(get(i, "first_domain_serp_element.url"))]),
        summary: [["Market", market(cc).name], ["Gaps on record", r.total === null ? "Unknown" : r.total.toLocaleString()]],
        notes: ["Keywords where the competitor appears in the source's ranking data and your domain doesn't. Filter out anything outside your offer before planning content."],
        source: "DataForSEO Labs (Google)",
        checkedAt: now(),
      },
    };
  });
}
