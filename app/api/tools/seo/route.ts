import { visitorId } from "@/lib/tools/ai/gateway";
import { counterStore } from "@/lib/tools/ai/store";
import { checkPage, extractFacts, parseSitemap, resolveUrl } from "@/lib/tools/seo/html";
import { braveSuggest, cruxRecord } from "@/lib/tools/seo/providers";
import { MARKETS, cleanDomain, keywordGap, keywordIdeas, keywordMetrics, localSerp, organicKeywords, paaQuestions, rankCheck, seoCompetitors, serpCheck, serpFeatures, trafficEstimate, type Outcome } from "@/lib/tools/seo/paid";
import { fetchError, safeRequest, urlProblem, type Fetched } from "@/lib/tools/v3/safe-fetch";

// Public SEO tools (October 2026 wave). Page fetches go through lib/tools/v3/safe-fetch.ts: public
// addresses only, checked at connect time, redirects re-checked hop by hop, capped size and time.
// Data provider calls go through lib/tools/seo/providers.ts, which enforces the monthly quota ledger.
// Nothing a visitor enters is stored or logged.

export const runtime = "nodejs";
// Some DataForSEO Labs reports (competitors) take up to about 45 seconds.
export const maxDuration = 60;

const MAX_HOPS = 6;
const LINK_CAP = 40;
const SITEMAP_URL_CAP = 25;
const POOL = 5;

// Per visitor daily caps, per tool family, plus one global per minute cap for outgoing fetches.
const DAILY = { page: 40, crawl: 8, suggest: 15, crux: 20, paid: Number(process.env.SEO_PAID_DAILY ?? 8) } as const;
const GLOBAL_MINUTE = Number(process.env.SEO_GLOBAL_MINUTE ?? 120);

const json = (body: unknown, status = 200) => Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
const withScheme = (u: string) => (/^https?:\/\//i.test(u) ? u : `https://${u}`);

async function allowed(visitor: string, family: keyof typeof DAILY, cost = 1): Promise<string | null> {
  const store = counterStore();
  const day = new Date().toISOString().slice(0, 10);
  const [mine, minute] = await Promise.all([store.incr(`seo:${family}:${visitor}:${day}`, 90_000, 1), store.incr(`seo:m:${new Date().toISOString().slice(0, 16)}`, 120, cost)]);
  if (mine > DAILY[family]) return "You've reached today's free checks for this tool. Come back tomorrow.";
  if (minute > GLOBAL_MINUTE) return "The checker is busy right now. Try again in a minute.";
  return null;
}

/** Follows server redirects safely and returns the final response with its body. */
async function fetchPage(start: string, maxBytes = 1_500_000): Promise<{ final: string; page: Fetched; redirects: number }> {
  let url = start;
  for (let i = 0; i <= MAX_HOPS; i++) {
    const problem = urlProblem(url);
    if (problem) throw new Error(problem);
    const page = await safeRequest(url, { method: "GET", maxBytes, timeoutMs: 8000 });
    if (page.status >= 300 && page.status < 400 && page.location) {
      url = new URL(page.location, url).href;
      continue;
    }
    return { final: url, page, redirects: i };
  }
  throw new Error(`Stopped after ${MAX_HOPS} redirects.`);
}

/** Status of one link: HEAD first, GET when the server refuses HEAD, one redirect hop followed per step. */
async function linkStatus(url: string): Promise<{ status: number | null; final: string; error?: string; redirects: number }> {
  let current = url;
  for (let i = 0; i <= 4; i++) {
    const problem = urlProblem(current);
    if (problem) return { status: null, final: current, error: problem, redirects: i };
    try {
      let r = await safeRequest(current, { method: "HEAD", maxBytes: 1, timeoutMs: 6000 });
      if (r.status === 405 || r.status === 501 || r.status === 403) r = await safeRequest(current, { method: "GET", maxBytes: 1, timeoutMs: 6000 });
      if (r.status >= 300 && r.status < 400 && r.location) {
        current = new URL(r.location, current).href;
        continue;
      }
      return { status: r.status, final: current, redirects: i };
    } catch (e) {
      return { status: null, final: current, error: fetchError(e), redirects: i };
    }
  }
  return { status: null, final: current, error: "Too many redirects.", redirects: 5 };
}

async function pool<T, R>(items: T[], fn: (x: T) => Promise<R>): Promise<R[]> {
  const out: R[] = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(POOL, items.length) }, async () => {
    while (next < items.length) {
      const i = next++;
      out[i] = await fn(items[i]);
    }
  }));
  return out;
}

const isHtml = (p: Fetched) => !p.headers["content-type"] || /html|xml/i.test(p.headers["content-type"]);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ error: "Send something to check." }, 400);
  }
  const visitor = visitorId(request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown");
  const action = String(body.action ?? "");
  const rawUrl = String(body.url ?? "").trim().slice(0, 2000);

  // Metadata extractor and single page SEO checker: one page fetch.
  if (action === "metadata" || action === "page-check") {
    const start = withScheme(rawUrl);
    const p = rawUrl ? urlProblem(start) : "Enter a page URL.";
    if (p) return json({ error: p }, 400);
    const limited = await allowed(visitor, "page");
    if (limited) return json({ error: limited }, 429);
    try {
      const { final, page, redirects } = await fetchPage(start);
      if (!isHtml(page)) return json({ error: `That URL returned ${page.headers["content-type"]?.split(";")[0]}, not an HTML page.` }, 200);
      const facts = extractFacts(page.body, final);
      const xRobots = page.headers["x-robots-tag"] ?? null;
      const base = { requestedUrl: start, finalUrl: final, httpStatus: page.status, redirects, xRobots, checkedAt: new Date().toISOString() };
      if (action === "metadata") return json({ ...base, facts: { ...facts, links: undefined, images: undefined, linkCount: facts.links.length, imageCount: facts.images.length } });
      return json({ ...base, findings: checkPage(facts, { status: page.status, xRobots, finalUrl: final, keyword: typeof body.keyword === "string" ? body.keyword.slice(0, 100) : undefined }), headings: facts.headings.slice(0, 40) });
    } catch (e) {
      return json({ error: e instanceof Error && !("code" in e) ? e.message : fetchError(e) }, 200);
    }
  }

  // Broken link checker: the links on one page, capped.
  if (action === "links") {
    const start = withScheme(rawUrl);
    const p = rawUrl ? urlProblem(start) : "Enter a page URL.";
    if (p) return json({ error: p }, 400);
    const limited = await allowed(visitor, "crawl", LINK_CAP);
    if (limited) return json({ error: limited }, 429);
    try {
      const { final, page } = await fetchPage(start);
      if (!isHtml(page)) return json({ error: "That URL isn't an HTML page, so it has no links to check." }, 200);
      const scope = body.scope === "internal" ? "internal" : "all";
      const seen = new Map<string, string>();
      for (const l of extractFacts(page.body, final).links) {
        const href = l.href.replace(/#.*$/, "");
        if (!/^https?:\/\//i.test(href) || seen.has(href)) continue;
        if (scope === "internal" && !l.internal) continue;
        seen.set(href, l.text);
      }
      const all = [...seen.entries()];
      const tested = all.slice(0, LINK_CAP);
      const results = await pool(tested, async ([href, text]) => ({ href, text: text.slice(0, 120), ...(await linkStatus(href)) }));
      return json({ pageUrl: final, found: all.length, tested: tested.length, skipped: all.length - tested.length, results, checkedAt: new Date().toISOString() });
    } catch (e) {
      return json({ error: e instanceof Error && !("code" in e) ? e.message : fetchError(e) }, 200);
    }
  }

  // Sitemap URL status: read a sitemap (or the first child sitemaps of an index), then test listed URLs.
  if (action === "sitemap-status") {
    const start = withScheme(rawUrl);
    const p = rawUrl ? urlProblem(start) : "Enter a sitemap URL.";
    if (p) return json({ error: p }, 400);
    const limited = await allowed(visitor, "crawl", SITEMAP_URL_CAP);
    if (limited) return json({ error: limited }, 429);
    try {
      const { final, page } = await fetchPage(start, 5_000_000);
      if (page.status >= 400) return json({ error: `The sitemap returned ${page.status}.` }, 200);
      let parsed = parseSitemap(page.body);
      const children: string[] = [];
      if (parsed.index) {
        const locs: string[] = [];
        for (const child of parsed.locs.slice(0, 3)) {
          children.push(child);
          try {
            const c = await fetchPage(child, 5_000_000);
            locs.push(...parseSitemap(c.page.body).locs);
          } catch {}
          if (locs.length >= SITEMAP_URL_CAP) break;
        }
        parsed = { index: true, locs };
      }
      if (!parsed.locs.length) return json({ error: "No <loc> entries were found. Is this an XML sitemap?" }, 200);
      const tested = parsed.locs.slice(0, SITEMAP_URL_CAP);
      const results = await pool(tested, async (loc) => {
        const problem = urlProblem(loc);
        if (problem) return { url: loc, status: null, error: problem };
        try {
          const r = await safeRequest(loc, { method: "GET", maxBytes: 300_000, timeoutMs: 6000 });
          if (r.status >= 300 && r.status < 400) return { url: loc, status: r.status, redirectTo: r.location ? resolveUrl(r.location, loc) : null };
          const facts = r.status < 300 && isHtml(r) ? extractFacts(r.body, loc) : null;
          const canonical = facts?.canonicals[0] ?? null;
          const noindex = [...(facts?.robots ?? []), r.headers["x-robots-tag"] ?? ""].some((v) => /\bnoindex\b|\bnone\b/i.test(v));
          return { url: loc, status: r.status, canonical, canonicalElsewhere: canonical ? canonical.replace(/\/$/, "") !== loc.replace(/\/$/, "") : false, noindex };
        } catch (e) {
          return { url: loc, status: null, error: fetchError(e) };
        }
      });
      return json({ sitemapUrl: final, index: parsed.index, children, listed: parsed.locs.length, tested: tested.length, skipped: parsed.locs.length - tested.length, results, checkedAt: new Date().toISOString() });
    } catch (e) {
      return json({ error: e instanceof Error && !("code" in e) ? e.message : fetchError(e) }, 200);
    }
  }

  // Keyword suggestions (long tail and question generators): one Brave request per run.
  if (action === "suggest") {
    const seed = String(body.seed ?? "").trim().slice(0, 100);
    if (seed.length < 2) return json({ error: "Enter a topic or keyword." }, 400);
    const limited = await allowed(visitor, "suggest");
    if (limited) return json({ error: limited }, 429);
    const prefix = String(body.prefix ?? "").trim().slice(0, 30);
    const suffix = String(body.suffix ?? "").trim().slice(0, 30);
    const query = [prefix, seed, suffix].filter(Boolean).join(" ");
    const r = await braveSuggest(query, String(body.country ?? "US"));
    if (!r.ok) return json({ error: r.message, renews: r.renews, quota: true }, 200);
    return json({ query, country: String(body.country ?? "US"), suggestions: r.data, source: r.source, checkedAt: r.checkedAt, cached: r.cached });
  }

  // Core Web Vitals field data.
  if (action === "cwv") {
    const start = withScheme(rawUrl);
    const p = rawUrl ? urlProblem(start) : "Enter a page URL.";
    if (p) return json({ error: p }, 400);
    const limited = await allowed(visitor, "crux");
    if (limited) return json({ error: limited }, 429);
    const r = await cruxRecord(start, body.device === "desktop" ? "DESKTOP" : "PHONE");
    if (!r.ok) return json({ error: r.message, renews: r.renews, quota: true }, 200);
    return json({ url: start, record: r.data, source: r.source, checkedAt: r.checkedAt });
  }

  // Paid data tools (Serper and DataForSEO), each behind the monthly ledger and a small daily cap per visitor.
  if (action === "data") {
    const tool = String(body.tool ?? "");
    const cc = MARKETS[String(body.country ?? "US")] ? String(body.country) : "US";
    const device = body.device === "mobile" ? "mobile" : "desktop";
    const q = String(body.keyword ?? "").trim().replace(/\s+/g, " ").slice(0, 120);
    const needQ = () => (q.length < 2 ? "Enter a keyword." : null);
    const dom = (v: unknown) => cleanDomain(String(v ?? ""));
    let run: (() => Promise<Outcome>) | null = null;
    let problem: string | null = null;
    switch (tool) {
      case "serp": problem = needQ(); run = () => serpCheck(q, cc, device); break;
      case "features": problem = needQ(); run = () => serpFeatures(q, cc, device); break;
      case "paa": problem = needQ(); run = () => paaQuestions(q, cc); break;
      case "rank": {
        const d = dom(body.domain);
        problem = needQ() ?? (d ? null : "Enter a domain like example.com.");
        run = () => rankCheck(q, d!, cc, device);
        break;
      }
      case "local": {
        const where = String(body.location ?? "").trim().slice(0, 80);
        problem = needQ() ?? (where.length < 2 ? "Enter a city, for example Austin, Texas." : null);
        run = () => localSerp(q, where, cc);
        break;
      }
      case "volume":
      case "difficulty": {
        const list = String(body.keywords ?? "").split(/[\n,]/).map((k) => k.trim()).filter(Boolean);
        problem = !list.length ? "Enter at least one keyword." : list.length > 20 ? "Up to 20 keywords at a time." : null;
        run = () => keywordMetrics(list, cc, tool);
        break;
      }
      case "ideas": problem = needQ(); run = () => keywordIdeas(q, cc); break;
      case "organic":
      case "traffic":
      case "competitors": {
        const d = dom(body.domain);
        problem = d ? null : "Enter a domain like example.com.";
        run = () => (tool === "organic" ? organicKeywords(d!, cc) : tool === "traffic" ? trafficEstimate(d!, cc) : seoCompetitors(d!, cc));
        break;
      }
      case "gap": {
        const a = dom(body.domain);
        const b = dom(body.competitor);
        problem = a && b ? (a === b ? "Use two different domains." : null) : "Enter both domains, like example.com.";
        run = () => keywordGap(a!, b!, cc);
        break;
      }
      default:
        return json({ error: "Unknown check." }, 400);
    }
    if (problem) return json({ error: problem }, 400);
    const limited = await allowed(visitor, "paid");
    if (limited) return json({ error: limited }, 429);
    const r = await run!();
    if (!r.ok) return json({ error: r.message, renews: r.renews, quota: true }, 200);
    return json(r.data);
  }

  return json({ error: "Unknown check." }, 400);
}
