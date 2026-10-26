// Tools 41 to 60 that run without AI: pure functions, shared by the browser components, the URL
// checker route and the tests. Nothing here fetches anything.

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
const attr = (s: string) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Parses one CSV line, honouring quotes and doubled quotes. */
export function csvRow(line: string): string[] {
  const out: string[] = [];
  let cur = "";
  let q = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (q) {
      if (c === '"' && line[i + 1] === '"') {
        cur += '"';
        i++;
      } else if (c === '"') q = false;
      else cur += c;
    } else if (c === '"') q = true;
    else if (c === ",") {
      out.push(cur.trim());
      cur = "";
    } else cur += c;
  }
  out.push(cur.trim());
  return out;
}

const httpUrl = (s: string): URL | null => {
  try {
    const u = new URL(s);
    return u.protocol === "http:" || u.protocol === "https:" ? u : null;
  } catch {
    return null;
  }
};

// ---------- 41. XML sitemap generator ----------

export const SITEMAP_MAX_URLS = 50_000;
export const SITEMAP_MAX_BYTES = 50 * 1024 * 1024;
export const SITEMAP_INPUT_MAX = 200_000;
const W3C_DATE = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])(T([01]\d|2[0-3]):[0-5]\d(:[0-5]\d(\.\d+)?)?(Z|[+-]([01]\d|2[0-3]):[0-5]\d))?$/;

export type SitemapFile = { name: string; xml: string; urls: number };
export type SitemapBuild = { files: SitemapFile[]; index: string | null; errors: { row: number; message: string }[]; count: number; duplicates: number; otherDomain: number; invalid: number };

export function buildSitemap(text: string, opts: { domain?: string; dropFragments?: boolean; allowOtherHosts?: boolean; sort?: boolean; exclude?: string[]; maxPerFile?: number } = {}): SitemapBuild {
  const errors: { row: number; message: string }[] = [];
  let base: URL | null = null;
  if (opts.domain?.trim()) {
    base = httpUrl(/^https?:\/\//i.test(opts.domain.trim()) ? opts.domain.trim() : `https://${opts.domain.trim()}`);
    if (!base) errors.push({ row: 0, message: "The website domain isn't a valid http or https address." });
  }
  const seen = new Set<string>();
  const entries: { loc: string; lastmod?: string }[] = [];
  let duplicates = 0;
  let otherDomain = 0;
  let invalid = 0;
  let host: string | null = base?.host ?? null;
  const lines = text.slice(0, SITEMAP_INPUT_MAX * 200).split(/\r?\n/);
  lines.forEach((line, i) => {
    const row = i + 1;
    if (!line.trim()) return;
    const cells = line.includes(",") || line.startsWith('"') ? csvRow(line) : [line.trim()];
    const raw = cells[0];
    if (i === 0 && /^(url|loc|address|page)s?$/i.test(raw)) return; // header row
    let u = httpUrl(raw);
    if (!u && raw.startsWith("/") && base) u = new URL(raw, base);
    if (!u) {
      invalid++;
      errors.push({ row, message: raw.startsWith("/") ? `"${raw}" is a path. Add your website domain to turn paths into full URLs.` : `"${raw.slice(0, 80)}" isn't a valid http or https URL.` });
      return;
    }
    if (opts.dropFragments !== false) u.hash = "";
    if (host === null) host = u.host;
    if (u.host !== host && !opts.allowOtherHosts) {
      otherDomain++;
      errors.push({ row, message: `${u.href} is on ${u.host}, not ${host}. A sitemap should only list URLs from one site.` });
      return;
    }
    if (opts.exclude?.some((p) => p && u!.href.includes(p))) return;
    const loc = u.href;
    if (seen.has(loc)) {
      duplicates++;
      return;
    }
    seen.add(loc);
    const lastmod = cells[1]?.trim();
    if (lastmod && !W3C_DATE.test(lastmod)) errors.push({ row, message: `"${lastmod}" isn't a W3C date like 2026-10-26, so no lastmod was added for this URL.` });
    entries.push({ loc, lastmod: lastmod && W3C_DATE.test(lastmod) ? lastmod : undefined });
  });
  if (opts.sort) entries.sort((a, b) => a.loc.localeCompare(b.loc));

  const per = Math.min(opts.maxPerFile ?? SITEMAP_MAX_URLS, SITEMAP_MAX_URLS);
  const head = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  const urlXml = (e: { loc: string; lastmod?: string }) => `  <url>\n    <loc>${esc(e.loc)}</loc>\n${e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>\n` : ""}  </url>\n`;
  const files: SitemapFile[] = [];
  let chunk: string[] = [];
  let bytes = 0;
  const enc = new TextEncoder();
  const flush = () => {
    if (!chunk.length) return;
    files.push({ name: "", xml: `${head}${chunk.join("")}</urlset>\n`, urls: chunk.length });
    chunk = [];
    bytes = 0;
  };
  for (const e of entries) {
    const x = urlXml(e);
    const b = enc.encode(x).length;
    if (chunk.length >= per || bytes + b + 200 > SITEMAP_MAX_BYTES) flush();
    chunk.push(x);
    bytes += b;
  }
  flush();
  files.forEach((f, i) => (f.name = files.length === 1 ? "sitemap.xml" : `sitemap-${i + 1}.xml`));
  let index: string | null = null;
  if (files.length > 1) {
    const origin = base?.origin ?? (entries[0] ? new URL(entries[0].loc).origin : "https://example.com");
    index = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${files.map((f) => `  <sitemap>\n    <loc>${esc(`${origin}/${f.name}`)}</loc>\n  </sitemap>\n`).join("")}</sitemapindex>\n`;
  }
  return { files, index, errors, count: entries.length, duplicates, otherDomain, invalid };
}

// ---------- 42. Hreflang ----------

const LANGS = new Set("aa ab af ak am ar as ay az ba be bg bh bi bm bn bo br bs ca ce co cs cy da de dv dz ee el en eo es et eu fa ff fi fj fo fr fy ga gd gl gn gu gv ha he hi hr ht hu hy ia id ig is it iu ja jv ka kk kl km kn ko ks ku ky la lb lg ln lo lt lv mg mi mk ml mn mr ms mt my nb ne nl nn no ny oc om or pa pl ps pt qu rm rn ro ru rw sa sd se sg si sk sl sm sn so sq sr ss st su sv sw ta te tg th ti tk tl tn to tr ts tt tw ug uk ur uz ve vi wo xh yi yo za zh zu fil".split(" "));
const REGION = /^[A-Z]{2}$|^\d{3}$/;

/** Checks an hreflang value: an ISO 639-1 language, optional script, optional ISO 3166-1 region, or x-default. */
export function checkLocale(code: string): string | null {
  const c = code.trim();
  if (c.toLowerCase() === "x-default") return null;
  const parts = c.split(/[-_]/);
  if (!LANGS.has(parts[0].toLowerCase())) return /^[A-Za-z]{2}$/.test(parts[0]) && REGION.test(parts[0].toUpperCase()) ? `"${c}" looks like a country on its own. Hreflang needs a language first, like en-${parts[0].toUpperCase()}.` : `"${parts[0]}" isn't an ISO 639-1 language code.`;
  const rest = parts.slice(1);
  if (rest.length && /^[A-Za-z]{4}$/.test(rest[0])) rest.shift();
  if (rest.length > 1 || (rest.length && !REGION.test(rest[0].toUpperCase()))) return `"${c}" has a region that isn't an ISO 3166-1 code, like GB or US.`;
  return null;
}

export const normLocale = (c: string) => {
  if (c.trim().toLowerCase() === "x-default") return "x-default";
  const p = c.trim().split(/[-_]/);
  return [p[0].toLowerCase(), ...p.slice(1).map((x) => (x.length === 4 ? x[0].toUpperCase() + x.slice(1).toLowerCase() : x.toUpperCase()))].join("-");
};

export type HreflangOut = { tags: string; variants: { url: string; locale: string }[]; xml: string; warnings: string[]; errors: string[] };

export function buildHreflang(rows: { url: string; locale: string }[], xDefault?: string): HreflangOut {
  const errors: string[] = [];
  const warnings: string[] = [];
  const variants: { url: string; locale: string }[] = [];
  const locales = new Map<string, string>();
  const urls = new Set<string>();
  for (const r of rows) {
    if (!r.url.trim() && !r.locale.trim()) continue;
    const u = httpUrl(r.url.trim());
    if (!u) {
      errors.push(`"${r.url.trim() || "(empty)"}" isn't a full http or https URL.`);
      continue;
    }
    const bad = checkLocale(r.locale);
    if (bad) {
      errors.push(bad);
      continue;
    }
    const loc = normLocale(r.locale);
    if (locales.has(loc) && locales.get(loc) !== u.href) errors.push(`${loc} is used for two different URLs. Each language or region needs exactly one URL.`);
    if (urls.has(u.href)) warnings.push(`${u.href} is listed more than once.`);
    locales.set(loc, u.href);
    urls.add(u.href);
    variants.push({ url: u.href, locale: loc });
  }
  if (xDefault?.trim()) {
    const u = httpUrl(xDefault.trim());
    if (!u) errors.push("The x-default URL isn't a full http or https URL.");
    else variants.push({ url: u.href, locale: "x-default" });
  }
  const real = variants.filter((v) => v.locale !== "x-default");
  if (real.length < 2) errors.push("Add at least two language or region versions.");
  const hosts = new Set(real.map((v) => new URL(v.url).protocol));
  if (hosts.size > 1) warnings.push("Some URLs use http and others https. Use the final https URLs.");
  for (const v of real) if (v.locale.includes("-") && !real.some((o) => o.locale === v.locale.split("-")[0]) && !variants.some((o) => o.locale === "x-default")) {
    warnings.push(`Consider a fallback for ${v.locale.split("-")[0]} speakers outside ${v.locale.split("-")[1]}: a plain "${v.locale.split("-")[0]}" version or an x-default.`);
    break;
  }
  const tags = variants.map((v) => `<link rel="alternate" hreflang="${attr(v.locale)}" href="${attr(v.url)}" />`).join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${real
    .map((v) => `  <url>\n    <loc>${esc(v.url)}</loc>\n${variants.map((o) => `    <xhtml:link rel="alternate" hreflang="${esc(o.locale)}" href="${esc(o.url)}" />\n`).join("")}  </url>\n`)
    .join("")}</urlset>\n`;
  return { tags, variants, xml, warnings, errors };
}

// ---------- 43. Canonical URL checker (pure part) ----------

export type CanonicalCheck = { label: string; status: "ok" | "warn" | "bad" | "info"; basis: "Observed" | "Inferred" | "Not checked"; text: string };

/** Reads every rel=canonical link from HTML without running it. */
export function findCanonicals(html: string): { href: string; inHead: boolean }[] {
  const out: { href: string; inHead: boolean }[] = [];
  const headEnd = html.search(/<\/head\s*>/i);
  for (const m of html.matchAll(/<link\b[^>]*>/gi)) {
    const tag = m[0];
    const rel = tag.match(/\brel\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    const relv = (rel?.[1] ?? rel?.[2] ?? rel?.[3] ?? "").toLowerCase().split(/\s+/);
    if (!relv.includes("canonical")) continue;
    const href = tag.match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i);
    out.push({ href: (href?.[1] ?? href?.[2] ?? href?.[3] ?? "").replace(/&amp;/g, "&").trim(), inHead: headEnd < 0 || (m.index ?? 0) < headEnd });
  }
  return out;
}

export function headerCanonical(link: string | null): string | null {
  if (!link) return null;
  for (const part of link.split(/,(?=\s*<)/)) {
    const m = part.match(/<([^>]+)>\s*;(.*)/);
    if (m && /rel\s*=\s*"?canonical"?/i.test(m[2])) return m[1].trim();
  }
  return null;
}

export function checkCanonical(input: { html: string; pageUrl?: string; expected?: string; linkHeader?: string | null; status?: number; live: boolean }): { canonicals: string[]; resolved: string | null; checks: CanonicalCheck[] } {
  const found = findCanonicals(input.html);
  const header = headerCanonical(input.linkHeader ?? null);
  const checks: CanonicalCheck[] = [];
  const base = input.pageUrl ? httpUrl(input.pageUrl) : null;
  const abs = (h: string) => {
    try {
      return new URL(h, base ?? undefined).href;
    } catch {
      return null;
    }
  };
  const resolvedAll = found.map((f) => abs(f.href));
  const resolved = resolvedAll[0] ?? (header ? abs(header) : null);
  const noindex = /<meta\b[^>]*name\s*=\s*["']?robots["']?[^>]*content\s*=\s*["'][^"']*noindex/i.test(input.html);

  if (!found.length && !header) checks.push({ label: "Canonical tag", status: "warn", basis: "Observed", text: "No rel=canonical was found. Search engines will pick a preferred URL themselves." });
  else checks.push({ label: "Canonical tag", status: "ok", basis: "Observed", text: `Found ${found.length} in the HTML${header ? " and one in the HTTP Link header" : ""}.` });
  if (new Set(resolvedAll.filter(Boolean)).size > 1) checks.push({ label: "Conflicting canonicals", status: "bad", basis: "Observed", text: "The page declares more than one different canonical URL. Search engines may ignore all of them." });
  else if (found.length > 1) checks.push({ label: "Repeated canonical", status: "warn", basis: "Observed", text: "The same canonical appears more than once. Harmless, but worth tidying." });
  if (header && resolved && abs(header) !== resolved) checks.push({ label: "Header and HTML disagree", status: "bad", basis: "Observed", text: "The HTTP Link header and the HTML point to different canonical URLs." });
  if (found.some((f) => !f.inHead)) checks.push({ label: "Outside <head>", status: "bad", basis: "Observed", text: "A canonical link sits outside the <head>. Google ignores canonicals in the body." });
  if (found.some((f) => !f.href)) checks.push({ label: "Empty href", status: "bad", basis: "Observed", text: "A canonical link has no URL." });
  if (found.some((f) => f.href && !/^https?:\/\//i.test(f.href))) checks.push({ label: "Relative URL", status: "warn", basis: "Observed", text: "The canonical uses a relative path. Google accepts it, but a full absolute URL is safer." });
  if (resolved && base) {
    const r = new URL(resolved);
    if (r.href === base.href) checks.push({ label: "Self-referencing", status: "ok", basis: "Inferred", text: "The canonical points to this same URL." });
    else if (r.host !== base.host) checks.push({ label: "Points to another host", status: "warn", basis: "Inferred", text: `The canonical points to ${r.host}. Fine for syndicated content, but check it's intended.` });
    else if (r.pathname === base.pathname) checks.push({ label: "Same page, cleaner URL", status: "info", basis: "Inferred", text: "The canonical drops query parameters or changes the protocol. Usually intentional." });
    else checks.push({ label: "Points to a different page", status: "warn", basis: "Inferred", text: `The canonical points to ${r.pathname}. Make sure that page really is the preferred version.` });
    if (r.protocol === "http:" && base.protocol === "https:") checks.push({ label: "http canonical", status: "warn", basis: "Observed", text: "The canonical uses http while the page is on https." });
  }
  if (input.expected?.trim()) {
    const e = abs(input.expected.trim());
    checks.push(e && e === resolved ? { label: "Expected canonical", status: "ok", basis: "Observed", text: "Matches the URL you expected." } : { label: "Expected canonical", status: "bad", basis: "Observed", text: `You expected ${input.expected.trim()}, but the page declares ${resolved ?? "none"}.` });
  }
  if (noindex && resolved && base && resolved !== base.href) checks.push({ label: "noindex with a canonical elsewhere", status: "warn", basis: "Observed", text: "The page is noindex and also canonicalised to another URL. These send mixed signals." });
  if (input.live && input.status && input.status >= 400) checks.push({ label: "Page status", status: "bad", basis: "Observed", text: `The page returned HTTP ${input.status}.` });
  if (!input.live) checks.push({ label: "Live status and redirects", status: "info", basis: "Not checked", text: "Pasted HTML can't show the live status code or redirects. Check the public URL for that." });
  checks.push({ label: "Google's chosen canonical", status: "info", basis: "Not checked", text: "Only Search Console's URL Inspection shows the canonical Google actually selected." });
  return { canonicals: found.map((f) => f.href), resolved, checks };
}

// ---------- 44. Redirect chain (pure part) ----------

export type Hop = { url: string; status: number | null; location: string | null; timeMs: number; error?: string };

export function summariseChain(hops: Hop[]): { redirects: number; loop: boolean; finalStatus: number | null; notes: string[] } {
  const notes: string[] = [];
  const redirects = hops.filter((h) => h.status !== null && h.status >= 300 && h.status < 400 && h.location).length;
  const urls = hops.map((h) => h.url);
  const loop = new Set(urls).size !== urls.length;
  const last = hops[hops.length - 1];
  if (loop) notes.push("The redirects loop back to a URL already visited, so the page never loads.");
  if (redirects >= 2) notes.push(`${redirects} redirects before the final page. Point the first URL straight at the final one where you can.`);
  if (hops.some((h) => h.status === 302 || h.status === 307)) notes.push("A temporary redirect (302 or 307) is in the chain. Use 301 or 308 if the move is permanent.");
  if (hops.length > 1 && hops[0].url.startsWith("http:") && last?.url.startsWith("https:")) notes.push("The chain upgrades http to https. Link to the https URL directly.");
  if (last?.status === 403 || last?.status === 429) notes.push(`The final response was ${last.status}. The site may be blocking automated checks, so open it in a browser before treating it as broken.`);
  else if (last?.status && last.status >= 400) notes.push(`The chain ends in an error (${last.status}). Redirect to a page that loads.`);
  if (last?.error) notes.push(last.error);
  if (!redirects && last?.status && last.status < 300) notes.push("No redirects. The URL loads directly.");
  return { redirects, loop, finalStatus: last?.status ?? null, notes };
}

// ---------- 45. JSON-LD validator ----------

export const JSONLD_MAX = 500_000;
export type JsonLdIssue = { level: "error" | "warning"; path: string; message: string };
export type JsonLdReport = { validJson: boolean; blocks: number; types: string[]; ids: string[]; issues: JsonLdIssue[] };

const RULES: Record<string, { required: string[]; recommended: string[] }> = {
  Product: { required: ["name"], recommended: ["image", "description", "offers", "brand", "sku"] },
  Offer: { required: ["price", "priceCurrency"], recommended: ["availability", "url"] },
  Organization: { required: ["name"], recommended: ["url", "logo", "sameAs"] },
  LocalBusiness: { required: ["name", "address"], recommended: ["telephone", "openingHoursSpecification", "url"] },
  Article: { required: ["headline"], recommended: ["image", "datePublished", "author"] },
  BlogPosting: { required: ["headline"], recommended: ["image", "datePublished", "author"] },
  NewsArticle: { required: ["headline"], recommended: ["image", "datePublished", "author"] },
  FAQPage: { required: ["mainEntity"], recommended: [] },
  Question: { required: ["name", "acceptedAnswer"], recommended: [] },
  BreadcrumbList: { required: ["itemListElement"], recommended: [] },
  Event: { required: ["name", "startDate", "location"], recommended: ["endDate", "image", "description"] },
  Recipe: { required: ["name", "image"], recommended: ["recipeIngredient", "recipeInstructions", "author"] },
  WebSite: { required: ["name", "url"], recommended: [] },
  Person: { required: ["name"], recommended: ["url", "sameAs"] },
  Review: { required: ["itemReviewed", "reviewRating", "author"], recommended: [] },
  AggregateRating: { required: ["ratingValue"], recommended: ["reviewCount", "ratingCount"] },
};
const ISO_CURRENCY = /^[A-Z]{3}$/;
const AVAIL = /^(https?:\/\/schema\.org\/)?(InStock|OutOfStock|PreOrder|BackOrder|Discontinued|InStoreOnly|LimitedAvailability|OnlineOnly|SoldOut|PreSale|Reserved|MadeToOrder)$/;

/** Where a JSON.parse error happened, as a line and column. */
function errorPosition(text: string, e: unknown): string {
  const m = String((e as Error)?.message ?? "").match(/position (\d+)/);
  if (!m) return "";
  const pos = Number(m[1]);
  const before = text.slice(0, pos);
  return ` (line ${before.split("\n").length}, column ${pos - before.lastIndexOf("\n")})`;
}

export function extractJsonLd(input: string): string[] {
  if (!/<script/i.test(input)) return [input];
  return [...input.matchAll(/<script\b[^>]*type\s*=\s*["']?application\/ld\+json["']?[^>]*>([\s\S]*?)<\/script\s*>/gi)].map((m) => m[1]);
}

export function validateJsonLd(input: string): JsonLdReport {
  const issues: JsonLdIssue[] = [];
  const types = new Set<string>();
  const ids = new Set<string>();
  if (input.length > JSONLD_MAX) return { validJson: false, blocks: 0, types: [], ids: [], issues: [{ level: "error", path: "", message: `That's over ${JSONLD_MAX / 1000} KB. Paste one page's structured data at a time.` }] };
  const blocks = extractJsonLd(input).filter((b) => b.trim());
  if (!blocks.length) return { validJson: false, blocks: 0, types: [], ids: [], issues: [{ level: "error", path: "", message: 'No JSON-LD found. Paste the JSON, or HTML with <script type="application/ld+json"> blocks.' }] };
  let validJson = true;

  const walk = (node: unknown, path: string, depth: number) => {
    if (depth > 40) {
      issues.push({ level: "error", path, message: "Nested too deeply to check." });
      return;
    }
    if (Array.isArray(node)) return node.forEach((n, i) => walk(n, `${path}[${i}]`, depth + 1));
    if (!node || typeof node !== "object") return;
    const o = node as Record<string, unknown>;
    if (o["@graph"]) walk(o["@graph"], `${path}.@graph`, depth + 1);
    const t = o["@type"];
    const tlist = (Array.isArray(t) ? t : t ? [t] : []).map(String);
    if (typeof o["@id"] === "string") ids.add(o["@id"] as string);
    for (const ty of tlist) {
      types.add(ty);
      const rule = RULES[ty];
      if (!rule) continue;
      for (const k of rule.required) if (o[k] === undefined || o[k] === "" || (Array.isArray(o[k]) && !(o[k] as unknown[]).length)) issues.push({ level: "error", path: `${path}`, message: `${ty} is missing "${k}".` });
      for (const k of rule.recommended) if (o[k] === undefined) issues.push({ level: "warning", path, message: `${ty} has no "${k}". Recommended where it's genuinely available.` });
      if (ty === "Offer") {
        if (o.priceCurrency !== undefined && !ISO_CURRENCY.test(String(o.priceCurrency))) issues.push({ level: "error", path, message: `priceCurrency "${o.priceCurrency}" isn't a three letter ISO 4217 code like USD.` });
        if (o.price !== undefined && !/^\d+(\.\d+)?$/.test(String(o.price))) issues.push({ level: "error", path, message: `price "${o.price}" should be a plain number like 35.00, without currency symbols.` });
        if (o.availability !== undefined && !AVAIL.test(String(o.availability))) issues.push({ level: "warning", path, message: `availability "${o.availability}" isn't a schema.org ItemAvailability value like https://schema.org/InStock.` });
      }
      if (ty === "AggregateRating" || ty === "Review") issues.push({ level: "warning", path, message: `${ty} found. Only use ratings and reviews that are real and visible on the page.` });
    }
    for (const [k, v] of Object.entries(o)) if (k !== "@graph" && v && typeof v === "object") walk(v, `${path}.${k}`, depth + 1);
  };

  blocks.forEach((b, i) => {
    const label = blocks.length > 1 ? `Block ${i + 1}` : "Block";
    let data: unknown;
    try {
      data = JSON.parse(b);
    } catch (e) {
      validJson = false;
      issues.push({ level: "error", path: label, message: `Not valid JSON${errorPosition(b, e)}. Check for trailing commas, missing quotes or smart quotes.` });
      return;
    }
    const roots = Array.isArray(data) ? data : [data];
    for (const r of roots) {
      const ctx = (r as Record<string, unknown>)?.["@context"];
      if (!ctx) issues.push({ level: "error", path: label, message: 'Missing "@context". Use "https://schema.org".' });
      else if (typeof ctx === "string" && !/^https?:\/\/schema\.org\/?$/.test(ctx)) issues.push({ level: "warning", path: label, message: `"@context" is "${ctx}". Use "https://schema.org".` });
      if (!(r as Record<string, unknown>)?.["@type"] && !(r as Record<string, unknown>)?.["@graph"]) issues.push({ level: "error", path: label, message: 'No "@type" at the top level.' });
    }
    walk(data, label, 0);
  });
  return { validJson, blocks: blocks.length, types: [...types], ids: [...ids], issues };
}

// ---------- 46. Open Graph ----------

export type OgInput = { title: string; url: string; description?: string; image?: string; imageAlt?: string; siteName?: string; type?: string; locale?: string; card?: string; twitterSite?: string };

export function buildOpenGraph(v: OgInput): { html: string; warnings: string[]; errors: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  const url = httpUrl(v.url.trim());
  if (!v.title.trim()) errors.push("Add the page title.");
  if (!url) errors.push("The page URL must be a full http or https URL.");
  const image = v.image?.trim() ? httpUrl(v.image.trim()) : null;
  if (v.image?.trim() && !image) errors.push("The image URL must be a full, public http or https URL.");
  if (!v.image?.trim()) warnings.push("No preview image. Platforms may pick their own or show a plain link.");
  if (image && image.protocol === "http:") warnings.push("The image uses http. Some platforms only show https images.");
  if (v.title.length > 90) warnings.push("The title is long and will likely be cut off in previews.");
  if ((v.description ?? "").length > 200) warnings.push("The description is long. Most previews show far less.");
  if (!v.description?.trim()) warnings.push("No description. Add a short one so previews explain the page.");
  const type = v.type === "article" ? "article" : "website";
  const lines: [string, string, string][] = [
    ["property", "og:title", v.title.trim()],
    ["property", "og:type", type],
    ["property", "og:url", url?.href ?? v.url.trim()],
  ];
  if (v.description?.trim()) lines.push(["property", "og:description", v.description.trim()]);
  if (image) lines.push(["property", "og:image", image.href]);
  if (image && v.imageAlt?.trim()) lines.push(["property", "og:image:alt", v.imageAlt.trim()]);
  if (v.siteName?.trim()) lines.push(["property", "og:site_name", v.siteName.trim()]);
  if (v.locale?.trim()) {
    if (!/^[a-z]{2}_[A-Z]{2}$/.test(v.locale.trim())) warnings.push('Locale should look like en_US, with an underscore.');
    else lines.push(["property", "og:locale", v.locale.trim()]);
  }
  lines.push(["name", "twitter:card", v.card === "summary" || !image ? "summary" : "summary_large_image"]);
  if (v.twitterSite?.trim()) lines.push(["name", "twitter:site", v.twitterSite.trim().startsWith("@") ? v.twitterSite.trim() : `@${v.twitterSite.trim()}`]);
  const html = lines.map(([k, n, c]) => `<meta ${k}="${n}" content="${attr(c)}" />`).join("\n");
  return { html, warnings, errors };
}

// ---------- 47. Product schema ----------

export const AVAILABILITY = ["", "InStock", "OutOfStock", "PreOrder", "BackOrder", "Discontinued", "LimitedAvailability", "SoldOut"] as const;
export const CONDITION = ["", "NewCondition", "UsedCondition", "RefurbishedCondition", "DamagedCondition"] as const;
export type ProductInput = { name: string; url: string; image?: string; description?: string; brand?: string; sku?: string; gtin?: string; price?: string; currency?: string; availability?: string; condition?: string; seller?: string };

export function buildProductSchema(v: ProductInput): { json: string; errors: string[]; missing: string[]; warnings: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  const missing: string[] = [];
  const url = httpUrl(v.url.trim());
  if (!v.name.trim()) errors.push("Add the product name.");
  if (!url) errors.push("The product URL must be a full http or https URL.");
  const o: Record<string, unknown> = { "@context": "https://schema.org", "@type": "Product", name: v.name.trim() };
  if (url) o.url = url.href;
  const images = (v.image ?? "").split(/[\s,]+/).filter(Boolean);
  const okImages = images.map(httpUrl).filter(Boolean).map((u) => u!.href);
  if (images.length !== okImages.length) errors.push("Every image must be a full http or https URL.");
  if (okImages.length) o.image = okImages.length === 1 ? okImages[0] : okImages;
  else missing.push("image");
  if (v.description?.trim()) o.description = v.description.trim();
  if (v.brand?.trim()) o.brand = { "@type": "Brand", name: v.brand.trim() };
  if (v.sku?.trim()) o.sku = v.sku.trim();
  if (v.gtin?.trim()) {
    if (!/^\d{8}$|^\d{12,14}$/.test(v.gtin.trim())) errors.push("GTIN should be 8, 12, 13 or 14 digits.");
    else o.gtin = v.gtin.trim();
  }
  const price = v.price?.trim().replace(/,/g, "");
  if (price) {
    const offer: Record<string, unknown> = { "@type": "Offer" };
    if (!/^\d+(\.\d{1,2})?$/.test(price)) errors.push("Price must be a plain number like 35.00.");
    else offer.price = Number(price).toFixed(2);
    const cur = (v.currency ?? "").trim().toUpperCase();
    if (!ISO_CURRENCY.test(cur)) errors.push("Currency must be a three letter ISO 4217 code like USD.");
    else offer.priceCurrency = cur;
    if (v.availability) offer.availability = `https://schema.org/${v.availability}`;
    else missing.push("availability");
    if (v.condition) offer.itemCondition = `https://schema.org/${v.condition}`;
    if (url) offer.url = url.href;
    if (v.seller?.trim()) offer.seller = { "@type": "Organization", name: v.seller.trim() };
    o.offers = offer;
  } else missing.push("offers (price, currency, availability)");
  if (!v.description?.trim()) warnings.push("No description. Add one if the page has it.");
  return { json: JSON.stringify(o, null, 2).replace(/</g, "\\u003c"), errors, missing, warnings };
}

// ---------- 48. Internal link opportunities ----------

const STOP = new Set("a an and are as at be best by can do does for free from get guide how i in into is it its my of on or our the to tool tools top use vs what when where which who why with you your".split(" "));
const terms = (s: string) => {
  const w = s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter((x) => x.length > 2 && !STOP.has(x)).map((x) => x.replace(/(ies)$/, "y").replace(/([^s])s$/, "$1"));
  return new Set(w);
};

export type PageRow = { url: string; title: string; topic: string };
export type LinkSuggestion = { source: string; sourceTitle: string; target: string; targetTitle: string; shared: string[]; anchor: string; score: number };

export function parsePages(text: string): { pages: PageRow[]; errors: string[] } {
  const pages: PageRow[] = [];
  const errors: string[] = [];
  text.split(/\r?\n/).forEach((line, i) => {
    if (!line.trim()) return;
    const [url = "", title = "", topic = ""] = line.includes("\t") ? line.split("\t").map((x) => x.trim()) : csvRow(line);
    if (i === 0 && /^url$/i.test(url)) return;
    if (!url) return;
    if (!title && !topic) {
      errors.push(`Row ${i + 1}: ${url} has no title or topic, so it can't be matched. Add them as columns: url, title, topic.`);
      return;
    }
    pages.push({ url, title, topic });
  });
  return { pages, errors };
}

export function findLinkOpportunities(pages: PageRow[], existing: [string, string][] = [], opts: { focus?: string[]; minScore?: number; max?: number } = {}): LinkSuggestion[] {
  const have = new Set(existing.map(([a, b]) => `${a.trim()}|${b.trim()}`));
  const t = pages.map((p) => ({ p, title: terms(p.title), all: terms(`${p.title} ${p.topic}`) }));
  const out: LinkSuggestion[] = [];
  for (const s of t)
    for (const g of t) {
      if (s.p.url === g.p.url || have.has(`${s.p.url}|${g.p.url}`)) continue;
      if (opts.focus?.length && !opts.focus.includes(g.p.url)) continue;
      const shared = [...g.all].filter((x) => s.all.has(x));
      if (!shared.length) continue;
      const titleHits = [...g.title].filter((x) => s.all.has(x)).length;
      const score = Math.round((shared.length / Math.sqrt(s.all.size * g.all.size)) * 70 + Math.min(30, titleHits * 10));
      if (score < (opts.minScore ?? 25)) continue;
      out.push({ source: s.p.url, sourceTitle: s.p.title, target: g.p.url, targetTitle: g.p.title, shared, anchor: g.p.title.replace(/\s*[|:].*$/, "").toLowerCase(), score: Math.min(100, score) });
    }
  return out.sort((a, b) => b.score - a.score).slice(0, opts.max ?? 200);
}

// ---------- 53. Shopify SKU ----------

export const SKU_MAX_ROWS = 500;
const code = (s: string, len: number) => s.normalize("NFKD").replace(/[^\x20-\x7E]/g, "").toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, len);

export type SkuRow = { variant: string; sku: string; clash: boolean };

export function buildSkus(input: { prefix: string; brand?: string; options: string[][]; separator?: string; abbreviation?: number; sequence?: boolean; start?: number; width?: number; maxLength?: number; existing?: string[] }): { rows: SkuRow[]; warnings: string[]; errors: string[] } {
  const errors: string[] = [];
  const warnings: string[] = [];
  const sep = input.separator === "_" ? "_" : input.separator === "" ? "" : "-";
  const prefix = code(input.prefix, 8);
  if (!prefix) errors.push("Add a short product prefix using letters or numbers, like MAT.");
  const opts = input.options.map((o) => o.map((x) => x.trim()).filter(Boolean)).filter((o) => o.length);
  const total = opts.reduce((n, o) => n * o.length, 1);
  if (total > SKU_MAX_ROWS) errors.push(`That's ${total.toLocaleString()} combinations. Up to ${SKU_MAX_ROWS} at a time.`);
  if (errors.length) return { rows: [], warnings, errors };
  let combos: string[][] = [[]];
  for (const o of opts) combos = combos.flatMap((c) => o.map((x) => [...c, x]));
  const len = input.abbreviation ?? 3;
  const abbr = new Map<string, string>();
  for (const o of opts)
    for (const v of o) {
      const a = code(v, len) || "X";
      for (const [other, ab] of abbr) if (ab === a && other.toLowerCase() !== v.toLowerCase()) warnings.push(`"${v}" and "${other}" both shorten to ${a}. Rename one, or use a longer abbreviation.`);
      abbr.set(v, a);
    }
  const existing = new Set((input.existing ?? []).map((x) => x.trim().toUpperCase()).filter(Boolean));
  const width = Math.max(1, Math.min(6, input.width ?? 3));
  const seen = new Set<string>();
  const rows = combos.map((c, i) => {
    const parts = [code(input.brand ?? "", 6), prefix, ...c.map((v) => abbr.get(v)!)].filter(Boolean);
    if (input.sequence) parts.push(String((input.start ?? 1) + i).padStart(width, "0"));
    const sku = parts.join(sep);
    const clash = seen.has(sku) || existing.has(sku);
    seen.add(sku);
    return { variant: c.join(" / ") || "Default", sku, clash };
  });
  if (rows.some((r) => r.clash)) warnings.push("Some SKUs repeat or already exist in your store list. They're marked below.");
  const max = input.maxLength ?? 0;
  if (max && rows.some((r) => r.sku.length > max)) warnings.push(`Some SKUs are longer than your ${max} character limit.`);
  return { rows, warnings: [...new Set(warnings)], errors };
}

// ---------- 56. Local SEO keyword modifiers ----------

export const MODIFIER_GROUPS = {
  "Service and location": (s: string, l: string) => [`${s} ${l}`, `${s} in ${l}`, `${l} ${s}`, `best ${s} in ${l}`, `${s} near ${l}`],
  "Questions": (s: string, l: string) => [`how much does ${s} cost in ${l}`, `who offers ${s} in ${l}`, `how to choose ${s} in ${l}`],
  "Cost and pricing": (s: string, l: string) => [`${s} cost ${l}`, `${s} prices ${l}`, `affordable ${s} ${l}`, `${s} quote ${l}`],
  "Comparison": (s: string, l: string) => [`${s} reviews ${l}`, `top rated ${s} ${l}`, `${s} companies in ${l}`],
  "Urgency": (s: string, l: string) => [`emergency ${s} ${l}`, `same day ${s} ${l}`, `24 hour ${s} ${l}`],
  "Near me": (s: string) => [`${s} near me`, `${s} open now near me`],
} as const;
export type ModifierGroup = keyof typeof MODIFIER_GROUPS;
export const LOCAL_KEYWORD_MAX = 500;

export function localKeywords(services: string[], areas: string[], groups: ModifierGroup[], extra: string[] = []): { group: string; keywords: string[] }[] {
  const clean = (x: string) => x.toLowerCase().replace(/\s+/g, " ").trim();
  const s = [...new Set(services.map(clean).filter(Boolean))];
  const l = [...new Set(areas.map(clean).filter(Boolean))];
  const seen = new Set<string>();
  let total = 0;
  const out: { group: string; keywords: string[] }[] = [];
  const add = (group: string, list: string[]) => {
    const kws: string[] = [];
    for (const k of list.map(clean)) {
      if (total >= LOCAL_KEYWORD_MAX || seen.has(k)) continue;
      seen.add(k);
      kws.push(k);
      total++;
    }
    if (kws.length) out.push({ group, keywords: kws });
  };
  for (const g of groups) add(g, s.flatMap((sv) => (g === "Near me" ? MODIFIER_GROUPS[g](sv) : l.flatMap((ar) => MODIFIER_GROUPS[g](sv, ar)))));
  if (extra.length) add("Your modifiers", s.flatMap((sv) => l.flatMap((ar) => extra.map(clean).filter(Boolean).map((m) => `${m} ${sv} ${ar}`))));
  return out;
}

// ---------- 58. MRR (money in cents to avoid floating point errors) ----------

export type Plan = { name: string; price: number; interval: "month" | "year"; customers: number; discount?: number };

export function mrr(plans: Plan[]): { rows: { name: string; monthly: number; mrr: number }[]; mrr: number; arr: number; errors: string[] } {
  const errors: string[] = [];
  const rows = plans.map((p, i) => {
    const name = p.name.trim() || `Plan ${i + 1}`;
    if (!(p.price >= 0) || !(p.customers >= 0)) errors.push(`${name}: price and customers can't be negative.`);
    if (!Number.isInteger(p.customers)) errors.push(`${name}: customers must be a whole number.`);
    const disc = Math.min(100, Math.max(0, p.discount ?? 0));
    const cents = Math.round(p.price * 100 * (1 - disc / 100));
    const monthlyCents = p.interval === "year" ? cents / 12 : cents;
    return { name, monthly: Math.round(monthlyCents) / 100, mrr: Math.round(monthlyCents * Math.max(0, p.customers)) / 100 };
  });
  const total = Math.round(rows.reduce((n, r) => n + r.mrr * 100, 0)) / 100;
  return { rows, mrr: total, arr: Math.round(total * 1200) / 100, errors: [...new Set(errors)] };
}

// ---------- 59. Customer retention ----------

export function retention(start: number, added: number, end: number): { rate: number | null; retained: number; lost: number; warning: string | null } {
  if (!(start > 0)) return { rate: null, retained: 0, lost: 0, warning: "Customers at the start must be more than zero." };
  if (added < 0 || end < 0) return { rate: null, retained: 0, lost: 0, warning: "Counts can't be negative." };
  const retained = end - added;
  const rate = Math.round((retained / start) * 10000) / 100;
  if (retained < 0) return { rate, retained, lost: start - retained, warning: "More new customers than customers at the end. Check that all three numbers use the same period and definition." };
  if (retained > start) return { rate, retained, lost: 0, warning: "Retention is over 100%, which usually means reactivated customers or mismatched definitions. Check how you count new and returning customers." };
  return { rate, retained, lost: start - retained, warning: null };
}

// ---------- 60. A/B test sample size (two sided z test for two proportions) ----------

/** Inverse of the standard normal CDF (Acklam's algorithm, accurate to about 1e-9). */
export function normInv(p: number): number {
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239];
  const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572];
  const c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
  const lo = 0.02425;
  if (p < lo) {
    const q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
  }
  if (p > 1 - lo) return -normInv(1 - p);
  const q = p - 0.5;
  const r = q * q;
  return ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
}

export type SampleSize = { control: number; treatment: number; total: number; baseline: number; variant: number; days: number | null; warnings: string[]; error: string | null };

/**
 * Per arm sample size for a two sided test of two independent proportions (normal approximation,
 * pooled variance under the null, no continuity correction). `ratio` is treatment size ÷ control size.
 */
export function abSampleSize(baselinePct: number, relativeMdePct: number, opts: { alpha?: number; power?: number; ratio?: number; daily?: number } = {}): SampleSize {
  const alpha = opts.alpha ?? 0.05;
  const power = opts.power ?? 0.8;
  const k = opts.ratio ?? 1;
  const p1 = baselinePct / 100;
  const p2 = p1 * (1 + relativeMdePct / 100);
  const empty = { control: 0, treatment: 0, total: 0, baseline: p1, variant: p2, days: null, warnings: [] as string[] };
  if (!(p1 > 0 && p1 < 1)) return { ...empty, error: "The baseline conversion rate must be between 0% and 100%." };
  if (!(relativeMdePct !== 0)) return { ...empty, error: "The minimum detectable effect can't be zero." };
  if (!(p2 > 0 && p2 < 1)) return { ...empty, error: `A ${relativeMdePct}% relative change takes the rate to ${(p2 * 100).toFixed(2)}%, outside 0% to 100%.` };
  if (!(alpha > 0 && alpha < 1) || !(power > 0 && power < 1) || !(k > 0)) return { ...empty, error: "Check the significance level, power and split." };
  const za = normInv(1 - alpha / 2);
  const zb = normInv(power);
  const pbar = (p1 + k * p2) / (1 + k);
  const n1 = Math.pow(za * Math.sqrt(pbar * (1 - pbar) * (1 + 1 / k)) + zb * Math.sqrt(p1 * (1 - p1) + (p2 * (1 - p2)) / k), 2) / Math.pow(p2 - p1, 2);
  const control = Math.ceil(n1);
  const treatment = Math.ceil(n1 * k);
  const total = control + treatment;
  const warnings: string[] = [];
  if (Math.min(control * p1, control * (1 - p1), treatment * p2, treatment * (1 - p2)) < 10) warnings.push("Very few expected conversions. The normal approximation behind this estimate may be unreliable.");
  const days = opts.daily && opts.daily > 0 ? Math.ceil(total / opts.daily) : null;
  if (days !== null && days < 7) warnings.push("Under a week. Run for at least one full week so weekday and weekend behaviour are both included.");
  return { control, treatment, total, baseline: p1, variant: p2, days, warnings, error: null };
}
