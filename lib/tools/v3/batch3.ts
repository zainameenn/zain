// Code only logic for tools 21 to 40: YouTube chapters, robots.txt generator, XML sitemap validator,
// LocalBusiness schema, break-even ROAS and LTV to CAC. No AI. Client safe and covered by tests.

const r2 = (n: number) => Math.round(n * 100) / 100;

// ---------- YouTube chapters ----------

export type ChapterRow = { startSeconds: number; title: string };
export type Cue = { startSeconds: number; text: string };

const TIME = /(?:(\d{1,2}):)?(\d{1,2}):(\d{2})(?:[.,]\d{1,3})?/;

export function toSeconds(t: string): number | null {
  const m = t.trim().match(new RegExp(`^${TIME.source}$`));
  if (!m) return null;
  const [h, mm, ss] = [Number(m[1] ?? 0), Number(m[2]), Number(m[3])];
  if (ss > 59 || (m[1] && mm > 59)) return null;
  return h * 3600 + mm * 60 + ss;
}

export function formatTime(s: number): string {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = String(s % 60).padStart(2, "0");
  return h ? `${h}:${String(m).padStart(2, "0")}:${sec}` : `${m}:${sec}`;
}

/**
 * Reads timestamps from plain lines ("01:20 The problem", "[1:20] The problem"), SRT or WebVTT.
 * Returns cues in the order given. Never makes up a time: lines without one are ignored.
 */
export function parseTimestamps(text: string): { cues: Cue[]; kind: "lines" | "subtitles"; ignored: number } {
  const src = text.replace(/\r\n?/g, "\n").replace(/^WEBVTT[^\n]*\n/, "");
  if (/-->/.test(src)) {
    const cues: Cue[] = [];
    for (const block of src.split(/\n{2,}/)) {
      const lines = block.split("\n").filter((l) => l.trim());
      const i = lines.findIndex((l) => l.includes("-->"));
      if (i < 0) continue;
      const start = toSeconds(lines[i].split("-->")[0].trim().replace(/^(\d{2}:\d{2}:\d{2})[.,]\d+$/, "$1"));
      const body = lines.slice(i + 1).join(" ").replace(/<[^>]+>/g, "").trim();
      if (start !== null && body) cues.push({ startSeconds: start, text: body });
    }
    return { cues, kind: "subtitles", ignored: 0 };
  }
  const cues: Cue[] = [];
  let ignored = 0;
  for (const raw of src.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const m = line.match(new RegExp(`^[\\[(]?(${TIME.source})[\\])]?\\s*[-:|]?\\s*(.*)$`));
    const start = m ? toSeconds(m[1]) : null;
    if (start === null) {
      ignored++;
      continue;
    }
    cues.push({ startSeconds: start, text: (m![m!.length - 1] ?? "").trim() || "Untitled" });
  }
  return { cues, kind: "lines", ignored };
}

export type ChapterCheck = { ok: boolean; message: string };

/** YouTube's rules: first chapter at 0:00, at least three, ascending, each at least 10 seconds long. */
export function checkChapters(rows: ChapterRow[], durationSeconds?: number | null): ChapterCheck[] {
  const checks: ChapterCheck[] = [];
  checks.push({ ok: rows[0]?.startSeconds === 0, message: "First chapter starts at 0:00" });
  checks.push({ ok: rows.length >= 3, message: "At least three chapters" });
  const ascending = rows.every((r, i) => i === 0 || r.startSeconds > rows[i - 1].startSeconds);
  checks.push({ ok: ascending, message: "Times go up in order" });
  const short = rows.findIndex((r, i) => i > 0 && r.startSeconds - rows[i - 1].startSeconds < 10);
  checks.push({ ok: short < 0, message: short < 0 ? "Every chapter is at least 10 seconds long" : `Chapter at ${formatTime(rows[short - 1].startSeconds)} is shorter than 10 seconds` });
  if (durationSeconds) {
    const last = rows[rows.length - 1];
    checks.push({ ok: Boolean(last) && durationSeconds - last.startSeconds >= 10 && last.startSeconds < durationSeconds, message: "Last chapter is at least 10 seconds before the video ends" });
  }
  checks.push({ ok: rows.every((r) => r.title.trim().length > 0), message: "Every chapter has a title" });
  return checks;
}

export const chaptersText = (rows: ChapterRow[]) => rows.map((r) => `${formatTime(r.startSeconds)} ${r.title.trim()}`).join("\n");

// ---------- Robots.txt generator ----------

export type RobotsGroupInput = { agent: string; disallow: string[]; allow: string[] };

/** Builds robots.txt text from explicit choices. Strips line breaks so nothing can inject extra directives. */
export function buildRobotsTxt(groups: RobotsGroupInput[], sitemap?: string): { text: string; warnings: string[] } {
  const warnings: string[] = [];
  const clean = (s: string) => s.replace(/[\r\n]+/g, "").trim();
  const path = (p: string) => {
    const v = clean(p);
    if (!v) return "";
    return v.startsWith("/") || v.startsWith("*") ? v : `/${v}`;
  };
  const out: string[] = [];
  for (const g of groups) {
    const agent = clean(g.agent) || "*";
    const disallow = [...new Set(g.disallow.map(path).filter(Boolean))];
    const allow = [...new Set(g.allow.map(path).filter(Boolean))];
    if (disallow.includes("/")) warnings.push(`"Disallow: /" blocks every page for ${agent === "*" ? "all crawlers" : agent}. Only use it if that's really what you want.`);
    if (disallow.some((d) => /\.(js|css)\b|\/(assets|static|_next)\//i.test(d))) warnings.push("Blocking scripts, styles or assets can stop search engines rendering your pages properly.");
    out.push(`User-agent: ${agent}`);
    for (const a of allow) out.push(`Allow: ${a}`);
    for (const d of disallow) out.push(`Disallow: ${d}`);
    // An empty Disallow states clearly that nothing is blocked for this group.
    if (!allow.length && !disallow.length) out.push("Disallow:");
    out.push("");
  }
  const sm = clean(sitemap ?? "");
  if (sm) {
    try {
      const u = new URL(sm);
      if (!/^https?:$/.test(u.protocol)) throw new Error();
      out.push(`Sitemap: ${u.href}`);
    } catch {
      warnings.push("The sitemap must be a full URL, like https://example.com/sitemap.xml. It was left out.");
    }
  }
  return { text: out.join("\n").trim() + "\n", warnings };
}

// ---------- XML sitemap validator ----------

export type SitemapIssue = { severity: "error" | "warning"; code: string; message: string; url?: string };
export type SitemapReport = { valid: boolean; type: "urlset" | "sitemapindex" | "unknown"; count: number; sizeBytes: number; hosts: string[]; issues: SitemapIssue[] };

const NS = "http://www.sitemaps.org/schemas/sitemap/0.9";
const W3C_DATE = /^\d{4}(-\d{2}(-\d{2}(T\d{2}:\d{2}(:\d{2}(\.\d+)?)?(Z|[+-]\d{2}:\d{2}))?)?)?$/;
const FREQ = new Set(["always", "hourly", "daily", "weekly", "monthly", "yearly", "never"]);
const decodeXml = (s: string) => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&amp;/g, "&");

/**
 * Checks sitemap XML with plain text parsing (no XML entity expansion, so no XML bomb risk).
 * `parseError` is the browser's DOMParser result, when available, for full well formedness.
 */
export function validateSitemap(xml: string, parseError?: string | null, today = new Date()): SitemapReport {
  const issues: SitemapIssue[] = [];
  const sizeBytes = new TextEncoder().encode(xml).length;
  const add = (severity: SitemapIssue["severity"], code: string, message: string, url?: string) => issues.push({ severity, code, message, url });
  if (parseError) add("error", "xml", `The XML doesn't parse: ${parseError.slice(0, 160)}`);
  if (/<!DOCTYPE|<!ENTITY/i.test(xml)) add("error", "doctype", "Sitemaps shouldn't contain a DOCTYPE or entity declarations.");
  const body = xml.replace(/<!--[\s\S]*?-->/g, "");
  const root = body.match(/<(urlset|sitemapindex)\b([^>]*)>/);
  const type = (root?.[1] as SitemapReport["type"]) ?? "unknown";
  if (!root) add("error", "root", "No <urlset> or <sitemapindex> root element found.");
  else if (!root[2].includes(NS)) add("error", "namespace", `The root element should declare xmlns="${NS}".`);
  if (sizeBytes > 50 * 1024 * 1024) add("error", "size", "The file is over 50MB uncompressed. Split it and use a sitemap index.");

  const entryTag = type === "sitemapindex" ? "sitemap" : "url";
  const entries = [...body.matchAll(new RegExp(`<${entryTag}\\b[^>]*>([\\s\\S]*?)</${entryTag}>`, "g"))].map((m) => m[1]);
  if (root && !entries.length) add("error", "empty", `No <${entryTag}> entries found.`);
  if (entries.length > 50000) add("error", "count", `${entries.length.toLocaleString()} entries. One sitemap can hold at most 50,000.`);

  const seen = new Set<string>();
  const hosts = new Set<string>();
  const tag = (e: string, t: string) => e.match(new RegExp(`<${t}>([\\s\\S]*?)</${t}>`))?.[1]?.trim();
  entries.forEach((e, i) => {
    const rawLoc = tag(e, "loc");
    if (!rawLoc) return add("error", "loc-missing", `Entry ${i + 1} has no <loc>.`);
    if (/&(?!amp;|lt;|gt;|quot;|apos;|#\d+;)/.test(rawLoc)) add("error", "escape", "A URL contains an unescaped &. Write it as &amp;.", rawLoc);
    const loc = decodeXml(rawLoc);
    let u: URL | null = null;
    try {
      u = new URL(loc);
    } catch {}
    if (!u || !/^https?:$/.test(u.protocol)) add("error", "loc-invalid", "Not a full http or https URL.", loc);
    else hosts.add(u.host);
    if (loc.length > 2048) add("error", "loc-long", "URLs must be under 2,048 characters.", loc);
    if (seen.has(loc)) add("warning", "duplicate", "Listed more than once.", loc);
    seen.add(loc);
    const lastmod = tag(e, "lastmod");
    if (lastmod !== undefined) {
      if (!W3C_DATE.test(lastmod) || Number.isNaN(Date.parse(lastmod))) add("error", "lastmod", `lastmod "${lastmod.slice(0, 40)}" isn't a valid W3C date (e.g. 2026-10-26).`, loc);
      else if (Date.parse(lastmod) > today.getTime() + 86_400_000) add("warning", "lastmod-future", `lastmod ${lastmod} is in the future.`, loc);
    }
    const freq = tag(e, "changefreq");
    if (freq !== undefined && !FREQ.has(freq)) add("error", "changefreq", `changefreq "${freq}" isn't an allowed value. Google ignores this field anyway.`, loc);
    const pr = tag(e, "priority");
    if (pr !== undefined && !(Number(pr) >= 0 && Number(pr) <= 1)) add("error", "priority", `priority "${pr}" must be between 0.0 and 1.0. Google ignores this field anyway.`, loc);
  });
  if (hosts.size > 1) add("warning", "hosts", `URLs use ${hosts.size} different hosts (${[...hosts].slice(0, 3).join(", ")}). A sitemap normally lists one host, and www and non www count as different.`);
  return { valid: !issues.some((i) => i.severity === "error"), type, count: entries.length, sizeBytes, hosts: [...hosts], issues };
}

// ---------- LocalBusiness schema ----------

export const LOCAL_TYPES = ["LocalBusiness", "AutoRepair", "BeautySalon", "Bakery", "CafeOrCoffeeShop", "Restaurant", "Dentist", "Physician", "Electrician", "Plumber", "HVACBusiness", "RoofingContractor", "GeneralContractor", "HousePainter", "Locksmith", "MovingCompany", "LegalService", "AccountingService", "RealEstateAgent", "Store", "BikeStore", "ClothingStore", "Florist", "HairSalon", "HealthClub", "Optician", "VeterinaryCare", "ProfessionalService"] as const;

export type SchemaInput = {
  type: string;
  name: string;
  url: string;
  street?: string;
  locality?: string;
  region?: string;
  postalCode?: string;
  country?: string;
  phone?: string;
  hours?: string;
  priceRange?: string;
  image?: string;
  sameAs?: string;
  lat?: string;
  lng?: string;
};

const DAYS: Record<string, string> = { mo: "Mo", tu: "Tu", we: "We", th: "Th", fr: "Fr", sa: "Sa", su: "Su" };

/** "Mo-Fr 09:00-17:00, Sa 10:00-14:00" style hours, validated. Returns null for anything unparseable. */
export function parseHours(text: string): string[] | null {
  const parts = text.split(/[,;\n]/).map((p) => p.trim()).filter(Boolean);
  const out: string[] = [];
  for (const p of parts) {
    const m = p.match(/^([A-Za-z]{2})(?:\s*-\s*([A-Za-z]{2}))?\s+(\d{2}):(\d{2})\s*-\s*(\d{2}):(\d{2})$/);
    if (!m) return null;
    const a = DAYS[m[1].toLowerCase()];
    const b = m[2] ? DAYS[m[2].toLowerCase()] : null;
    if (!a || (m[2] && !b) || Number(m[3]) > 24 || Number(m[5]) > 24 || Number(m[4]) > 59 || Number(m[6]) > 59) return null;
    out.push(`${a}${b ? `-${b}` : ""} ${m[3]}:${m[4]}-${m[5]}:${m[6]}`);
  }
  return out;
}

export function buildLocalBusiness(i: SchemaInput): { json: string; errors: string[]; missing: string[] } {
  const errors: string[] = [];
  const missing: string[] = [];
  const v = (s?: string) => (s ?? "").trim();
  const isUrl = (s: string) => {
    try {
      return /^https?:$/.test(new URL(s).protocol);
    } catch {
      return false;
    }
  };
  if (!v(i.name)) errors.push("Add the business name.");
  if (!isUrl(v(i.url))) errors.push("Add the full website URL, starting with https://.");
  const type = (LOCAL_TYPES as readonly string[]).includes(i.type) ? i.type : "LocalBusiness";
  const obj: Record<string, unknown> = { "@context": "https://schema.org", "@type": type, name: v(i.name), url: v(i.url) };
  const address = Object.fromEntries(
    [
      ["streetAddress", v(i.street)],
      ["addressLocality", v(i.locality)],
      ["addressRegion", v(i.region)],
      ["postalCode", v(i.postalCode)],
      ["addressCountry", v(i.country).toUpperCase()],
    ].filter(([, x]) => x),
  );
  if (Object.keys(address).length) obj.address = { "@type": "PostalAddress", ...address };
  else missing.push("address (recommended if customers visit you)");
  if (v(i.country) && !/^[A-Za-z]{2}$/.test(v(i.country))) errors.push("Use a two letter country code, like US or GB.");
  if (v(i.phone)) obj.telephone = v(i.phone);
  else missing.push("telephone");
  if (v(i.hours)) {
    const h = parseHours(v(i.hours));
    if (!h) errors.push('Write hours like "Mo-Fr 09:00-17:00, Sa 10:00-14:00".');
    else obj.openingHours = h.length === 1 ? h[0] : h;
  } else missing.push("opening hours");
  if (v(i.priceRange)) obj.priceRange = v(i.priceRange);
  if (v(i.image)) {
    if (isUrl(v(i.image))) obj.image = v(i.image);
    else errors.push("The image must be a full URL.");
  }
  const same = v(i.sameAs).split(/[\s,]+/).filter(Boolean);
  if (same.length) {
    const bad = same.filter((s) => !isUrl(s));
    if (bad.length) errors.push(`These profile links aren't full URLs: ${bad.join(", ")}`);
    else obj.sameAs = same;
  }
  if (v(i.lat) || v(i.lng)) {
    const lat = Number(v(i.lat));
    const lng = Number(v(i.lng));
    if (!(lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) || !v(i.lat) || !v(i.lng)) errors.push("Latitude must be -90 to 90 and longitude -180 to 180.");
    else obj.geo = { "@type": "GeoCoordinates", latitude: lat, longitude: lng };
  }
  // JSON.stringify escapes everything, and "<" is escaped too so the snippet is safe inside a script tag.
  return { json: JSON.stringify(obj, null, 2).replace(/</g, "\\u003c"), errors, missing };
}

// ---------- Break-even ROAS ----------

export type RoasResult = { contribution: number; margin: number; breakEvenRoas: number | null; allowableAdSpend: number; targetRoas: number | null; currentProfitPerOrder: number | null };

export function breakEvenRoas(revenue: number, variableCosts: number, targetProfit = 0, currentRoas = 0): RoasResult {
  const contribution = revenue - variableCosts;
  const ok = revenue > 0 && contribution > 0;
  const forTarget = contribution - targetProfit;
  return {
    contribution: r2(contribution),
    margin: revenue > 0 ? r2((contribution / revenue) * 100) : 0,
    breakEvenRoas: ok ? r2(revenue / contribution) : null,
    allowableAdSpend: r2(Math.max(0, contribution)),
    targetRoas: ok && targetProfit > 0 && forTarget > 0 ? r2(revenue / forTarget) : null,
    // At the current ROAS, ad spend per order is revenue / ROAS.
    currentProfitPerOrder: ok && currentRoas > 0 ? r2(contribution - revenue / currentRoas) : null,
  };
}

// ---------- LTV to CAC ----------

export type LtvResult = { ltv: number | null; ratio: number | null; lifetimeMonths: number | null; paybackMonths: number | null; monthlyGrossProfit: number };

export function ltvCac(monthlyRevenue: number, marginPct: number, churnPct: number, cacValue: number): LtvResult {
  const gp = monthlyRevenue * (marginPct / 100);
  const churn = churnPct / 100;
  const ltv = churn > 0 ? gp / churn : null;
  return {
    ltv: ltv === null ? null : r2(ltv),
    ratio: ltv !== null && cacValue > 0 ? r2(ltv / cacValue) : null,
    lifetimeMonths: churn > 0 ? r2(1 / churn) : null,
    paybackMonths: gp > 0 && cacValue > 0 ? r2(cacValue / gp) : null,
    monthlyGrossProfit: r2(gp),
  };
}
