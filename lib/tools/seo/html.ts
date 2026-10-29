// Reads the SEO relevant facts out of a page's HTML. Pure functions with no DOM, so the browser
// (pasted HTML) and the server (fetched pages) give the same answers. Everything reported here is
// observed in the HTML supplied; nothing is guessed or scored.

export type Attrs = Record<string, string>;

const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&apos;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)));

const clean = (html: string) => html.replace(/<!--[\s\S]*?-->/g, "").replace(/<(script|style|noscript|template)\b[\s\S]*?<\/\1>/gi, (m) => (/^<script[^>]+application\/ld\+json/i.test(m) ? m : ""));

export function parseAttrs(tag: string): Attrs {
  const out: Attrs = {};
  const re = /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  const body = tag.replace(/^<\s*[\w:-]+/, "").replace(/\/?>$/, "");
  let m: RegExpExecArray | null;
  while ((m = re.exec(body))) out[m[1].toLowerCase()] = decode(m[2] ?? m[3] ?? m[4] ?? "");
  return out;
}

const tagsOf = (html: string, name: string): Attrs[] => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map((m) => parseAttrs(m[0]));
const text = (s: string) => decode(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const blocks = (html: string, name: string) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>([\\s\\S]*?)<\\/${name}>`, "gi"))].map((m) => text(m[1]));

export function resolveUrl(href: string, base?: string): string | null {
  try {
    return new URL(href, base).href;
  } catch {
    return null;
  }
}

export type PageFacts = {
  title: string[];
  description: string[];
  canonicals: string[];
  robots: string[];
  googlebot: string[];
  lang: string | null;
  viewport: string | null;
  charset: string | null;
  og: [string, string][];
  twitter: [string, string][];
  hreflang: { lang: string; href: string }[];
  headings: { level: number; text: string }[];
  links: { href: string; text: string; rel: string; internal: boolean | null }[];
  images: { src: string; alt: string | null }[];
  jsonLdBlocks: number;
  wordCount: number;
};

export function extractFacts(rawHtml: string, pageUrl?: string): PageFacts {
  const html = clean(rawHtml);
  const metas = tagsOf(html, "meta");
  const meta = (key: string) => metas.filter((m) => (m.name ?? "").toLowerCase() === key).map((m) => m.content ?? "");
  const links = tagsOf(html, "link");
  const host = pageUrl ? safeHost(pageUrl) : null;
  const body = html.match(/<body\b[^>]*>([\s\S]*)<\/body>/i)?.[1] ?? html;
  const bodyText = text(body.replace(/<script\b[\s\S]*?<\/script>/gi, ""));
  const anchors = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)].map((m) => ({ attrs: parseAttrs(`<a ${m[1]}>`), text: text(m[2]) }));
  return {
    title: blocks(html, "title"),
    description: meta("description"),
    canonicals: links.filter((l) => (l.rel ?? "").toLowerCase().split(/\s+/).includes("canonical")).map((l) => (l.href && pageUrl ? (resolveUrl(l.href, pageUrl) ?? l.href) : (l.href ?? ""))),
    robots: meta("robots"),
    googlebot: meta("googlebot"),
    lang: tagsOf(html, "html")[0]?.lang ?? null,
    viewport: meta("viewport")[0] ?? null,
    charset: metas.find((m) => m.charset)?.charset ?? null,
    og: metas.filter((m) => (m.property ?? "").toLowerCase().startsWith("og:")).map((m) => [m.property.toLowerCase(), m.content ?? ""]),
    twitter: metas.filter((m) => (m.name ?? m.property ?? "").toLowerCase().startsWith("twitter:")).map((m) => [(m.name ?? m.property).toLowerCase(), m.content ?? ""]),
    hreflang: links.filter((l) => (l.rel ?? "").toLowerCase() === "alternate" && l.hreflang).map((l) => ({ lang: l.hreflang, href: l.href ?? "" })),
    headings: [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => ({ level: Number(m[1]), text: text(m[2]) })),
    links: anchors
      .filter((a) => a.attrs.href && !/^(#|javascript:|mailto:|tel:|data:)/i.test(a.attrs.href))
      .map((a) => {
        const abs = pageUrl ? resolveUrl(a.attrs.href, pageUrl) : null;
        return { href: abs ?? a.attrs.href, text: a.text || a.attrs["aria-label"] || "", rel: a.attrs.rel ?? "", internal: abs && host ? safeHost(abs) === host : null };
      }),
    images: tagsOf(html, "img").map((i) => ({ src: i.src ?? "", alt: "alt" in i ? i.alt : null })),
    jsonLdBlocks: (rawHtml.match(/<script[^>]+application\/ld\+json/gi) ?? []).length,
    wordCount: bodyText ? bodyText.split(/\s+/).length : 0,
  };
}

function safeHost(u: string): string | null {
  try {
    return new URL(u).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return null;
  }
}

export type Finding = { label: string; status: "ok" | "warn" | "bad" | "info"; text: string; evidence?: string };

const noindex = (vals: string[]) => vals.some((v) => /\bnoindex\b|\bnone\b/i.test(v));

/**
 * Single page checks. Each finding names what was observed. "warn" means worth a look, not a ranking
 * penalty; "bad" is reserved for things that stop a page being indexed or understood.
 */
export function checkPage(f: PageFacts, ctx: { status?: number; xRobots?: string | null; finalUrl?: string; keyword?: string } = {}): Finding[] {
  const out: Finding[] = [];
  if (ctx.status !== undefined) out.push(ctx.status >= 400 ? { label: "HTTP status", status: "bad", text: `The page returned ${ctx.status}.` } : { label: "HTTP status", status: "ok", text: `The page returned ${ctx.status}.` });

  const title = f.title[0] ?? "";
  if (!f.title.length) out.push({ label: "Title", status: "bad", text: "No <title> element was found." });
  else if (f.title.length > 1) out.push({ label: "Title", status: "warn", text: `${f.title.length} <title> elements were found. Keep one.`, evidence: f.title.join(" | ") });
  else if (!title) out.push({ label: "Title", status: "bad", text: "The <title> element is empty." });
  else out.push({ label: "Title", status: title.length > 65 ? "info" : "ok", text: title.length > 65 ? `${title.length} characters. Long titles are often shortened in results; check the important words come first.` : `${title.length} characters.`, evidence: title });

  const desc = f.description[0];
  if (!f.description.length) out.push({ label: "Meta description", status: "info", text: "No meta description. Search engines will build a snippet from the page text, which is sometimes fine." });
  else if (f.description.length > 1) out.push({ label: "Meta description", status: "warn", text: `${f.description.length} meta descriptions were found. Keep one.` });
  else out.push({ label: "Meta description", status: desc ? "ok" : "warn", text: desc ? `${desc.length} characters.` : "The meta description is empty.", evidence: desc || undefined });

  const h1 = f.headings.filter((h) => h.level === 1);
  out.push(!h1.length ? { label: "H1", status: "warn", text: "No H1 was found in the HTML. It may be added by JavaScript, or the page may be missing a main heading." } : h1.length > 1 ? { label: "H1", status: "info", text: `${h1.length} H1 headings were found. One clear main heading is easier to follow.`, evidence: h1.map((h) => h.text).join(" | ") } : { label: "H1", status: "ok", text: "One H1 was found.", evidence: h1[0].text });

  if (!f.canonicals.length) out.push({ label: "Canonical", status: "info", text: "No canonical tag. Not required, but useful when the same content is reachable at more than one URL." });
  else if (new Set(f.canonicals).size > 1) out.push({ label: "Canonical", status: "bad", text: "Conflicting canonical tags were found. Search engines may ignore them.", evidence: f.canonicals.join(" | ") });
  else {
    const c = f.canonicals[0];
    const same = ctx.finalUrl && c.replace(/\/$/, "") === ctx.finalUrl.replace(/[?#].*$/, "").replace(/\/$/, "");
    out.push({ label: "Canonical", status: ctx.finalUrl && !same ? "warn" : "ok", text: ctx.finalUrl && !same ? "The canonical points to a different URL. Fine for duplicates, a mistake on an original page." : "A single canonical was found.", evidence: c });
  }

  const robotsVals = [...f.robots, ...f.googlebot];
  if (noindex(robotsVals) || (ctx.xRobots && noindex([ctx.xRobots]))) out.push({ label: "Indexing directives", status: "bad", text: "A noindex directive was found, so search engines are asked to leave this page out.", evidence: [...robotsVals, ctx.xRobots ?? ""].filter(Boolean).join(" | ") });
  else out.push({ label: "Indexing directives", status: "ok", text: robotsVals.length || ctx.xRobots ? "Robots directives found, none of them noindex." : "No robots meta tag or X-Robots-Tag header. Pages are indexable by default.", evidence: [...robotsVals, ctx.xRobots ?? ""].filter(Boolean).join(" | ") || undefined });

  out.push(f.lang ? { label: "Language", status: "ok", text: `<html lang="${f.lang}">.` } : { label: "Language", status: "info", text: "No lang attribute on <html>. Adding one helps browsers and assistive technology." });
  out.push(f.viewport ? { label: "Mobile viewport", status: "ok", text: "A viewport meta tag was found.", evidence: f.viewport } : { label: "Mobile viewport", status: "warn", text: "No viewport meta tag. The page may not scale on phones." });

  const noAlt = f.images.filter((i) => i.alt === null);
  if (f.images.length) out.push({ label: "Image alt text", status: noAlt.length ? "info" : "ok", text: noAlt.length ? `${noAlt.length} of ${f.images.length} images have no alt attribute. Decorative images can use alt="".` : `All ${f.images.length} images have an alt attribute.` });

  const internal = f.links.filter((l) => l.internal).length;
  out.push({ label: "Links", status: "info", text: `${f.links.length} links: ${internal} internal, ${f.links.length - internal} external.` });
  out.push({ label: "Structured data", status: "info", text: f.jsonLdBlocks ? `${f.jsonLdBlocks} JSON-LD block${f.jsonLdBlocks === 1 ? "" : "s"} found. Validate them with the JSON-LD Schema Validator.` : "No JSON-LD found. Not required on every page." });
  out.push({ label: "Text in the HTML", status: f.wordCount < 100 ? "info" : "ok", text: f.wordCount < 100 ? `About ${f.wordCount} words in the HTML. If the page renders more, it may be loaded by JavaScript.` : `About ${f.wordCount} words in the HTML.` });

  const kw = ctx.keyword?.trim().toLowerCase();
  if (kw) {
    const where = [title.toLowerCase().includes(kw) && "title", h1.some((h) => h.text.toLowerCase().includes(kw)) && "H1", (desc ?? "").toLowerCase().includes(kw) && "meta description"].filter(Boolean) as string[];
    out.push({ label: `"${ctx.keyword!.trim()}"`, status: "info", text: where.length ? `Exact phrase found in the ${where.join(", ")}.` : "The exact phrase isn't in the title, H1 or description. That's fine if the page uses natural variations that match the same intent." });
  }
  return out;
}

/** <loc> values from a sitemap, and whether it is an index of other sitemaps. */
export function parseSitemap(xml: string): { index: boolean; locs: string[] } {
  const index = /<sitemapindex\b/i.test(xml);
  const locs = [...xml.matchAll(/<loc>\s*(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?\s*<\/loc>/gi)].map((m) => decode(m[1].trim())).filter(Boolean);
  return { index, locs };
}
