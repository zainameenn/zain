// Turns a rendered page into Markdown for AI agents that send "Accept: text/markdown".
// It reads the page's own HTML, so the Markdown always matches what people see.

export const SITE_URL = "https://www.zainameen.com";

const ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", hellip: "…", middot: "·", rarr: "→", larr: "←", uarr: "↑", darr: "↓", times: "×" };

function decode(s: string) {
  return s.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e: string) => {
    if (e[0] === "#") return String.fromCodePoint(e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10));
    return ENTITIES[e.toLowerCase()] ?? m;
  });
}

const attr = (attrs: string, name: string) => {
  const m = attrs.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, "i"));
  return m ? decode(m[2] ?? m[3] ?? "") : undefined;
};

/** Absolute URL, unwrapping next/image URLs back to the original file. */
function absolute(href: string) {
  try {
    const u = new URL(href, SITE_URL);
    if (u.pathname === "/_next/image" && u.searchParams.get("url")) return new URL(u.searchParams.get("url")!, SITE_URL).href;
    return u.href;
  } catch {
    return href;
  }
}

const SKIP = new Set(["script", "style", "svg", "noscript", "template", "head", "button", "form", "iframe", "select", "textarea", "input"]);
const VOID = new Set(["img", "br", "hr", "input", "meta", "link", "source", "wbr", "area", "base", "col", "embed", "param", "track"]);
const BLOCK = new Set(["p", "div", "section", "article", "aside", "header", "footer", "main", "nav", "ul", "ol", "dl", "dt", "dd", "figure", "figcaption", "blockquote", "table", "tr"]);

/** Converts an HTML fragment to Markdown. Handles headings, paragraphs, lists, links, emphasis, images and quotes. */
export function htmlToMarkdown(html: string): string {
  const out: string[] = [];
  let skipDepth = 0;
  const skipStack: string[] = [];
  const links: { href: string; start: number }[] = [];
  let listDepth = 0;
  let inBlockquote = 0;
  let spaceNext = false;
  const re = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][a-zA-Z0-9-]*)([^>]*?)(\/?)>|([^<]+)/g;
  let m: RegExpExecArray | null;
  const nl = (n = 2) => out.push("\n".repeat(n));

  while ((m = re.exec(html))) {
    const [, closing, rawTag, attrs = "", selfClose, text] = m;
    if (m[0].startsWith("<!--")) continue;
    if (text !== undefined) {
      if (skipDepth) continue;
      const t = decode(text).replace(/\s+/g, " ");
      // After a closing inline element, keep the next words from running into it ("Anna" + "Etsy buyer").
      if (t.trim() && spaceNext && out.length && !/\s$/.test(out[out.length - 1]) && !/^[\s.,:;!?)]/.test(t)) out.push(" ");
      spaceNext = false;
      if (t.trim() || (t === " " && out.length && !/\s$/.test(out[out.length - 1]))) out.push(t);
      continue;
    }
    const tag = rawTag.toLowerCase();
    if (closing && tag === "span" && !skipDepth) spaceNext = true;

    if (skipDepth) {
      if (!VOID.has(tag) && !selfClose) {
        if (!closing && tag === skipStack[skipStack.length - 1]) { skipDepth++; skipStack.push(tag); }
        else if (closing && tag === skipStack[skipStack.length - 1]) { skipDepth--; skipStack.pop(); }
      }
      continue;
    }
    if (!closing && (SKIP.has(tag) || /aria-hidden\s*=\s*"true"/i.test(attrs) || /\shidden(\s|=|$)/i.test(attrs)) && !VOID.has(tag) && !selfClose) {
      skipDepth = 1; skipStack.length = 0; skipStack.push(tag);
      continue;
    }

    if (/^h[1-6]$/.test(tag)) {
      if (!closing) { nl(); out.push("#".repeat(Number(tag[1])) + " "); } else nl();
    } else if (tag === "li") {
      if (!closing) { nl(1); out.push("  ".repeat(Math.max(0, listDepth - 1)) + "- "); }
    } else if (tag === "ul" || tag === "ol") {
      listDepth += closing ? -1 : 1; nl(1);
    } else if (tag === "blockquote") {
      inBlockquote += closing ? -1 : 1; nl(); if (!closing) out.push("> ");
    } else if (tag === "br") {
      out.push(inBlockquote ? "\n> " : "  \n");
    } else if (tag === "strong" || tag === "b") {
      out.push("**");
    } else if (tag === "em" || tag === "i") {
      out.push("*");
    } else if (tag === "a") {
      if (!closing) links.push({ href: attr(attrs, "href") ?? "", start: out.length });
      else {
        const l = links.pop();
        if (l) {
          const label = out.splice(l.start).join("").replace(/\s+/g, " ").trim();
          // Keep neighbouring links and buttons from running together.
          if (label && out.length && !/\s$/.test(out[out.length - 1])) out.push(" ");
          if (label && l.href && !l.href.startsWith("#")) out.push(`[${label}](${absolute(l.href)})`);
          else out.push(label);
        }
      }
    } else if (tag === "img") {
      const alt = attr(attrs, "alt");
      const src = attr(attrs, "src");
      if (alt && src) { nl(1); out.push(`![${alt}](${absolute(src)})`); nl(1); }
    } else if (tag === "dt") {
      if (closing) out.push(": ");
    } else if (BLOCK.has(tag)) {
      nl(tag === "dd" || tag === "figcaption" ? 1 : 2);
    }
  }

  return out
    .join("")
    .replace(/\*\*\s*\*\*/g, "")
    .replace(/[ \t]+\n/g, "\n")
    // Drop stray leading spaces, but keep the indent on nested list items.
    .replace(/\n[ \t]+(?![ \t]*- )/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

/** Builds the Markdown document for a page: title, description, canonical URL, then the main content. */
export function pageToMarkdown(html: string, path: string): string {
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "").trim();
  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "").trim();
  const main = html.match(/<main\b[^>]*>([\s\S]*)<\/main>/i)?.[1] ?? html;
  const body = htmlToMarkdown(main);
  return [`---`, `title: ${title}`, desc && `description: ${desc}`, `url: ${SITE_URL}${path === "/" ? "/" : path}`, `---`, "", body, ""].filter((l) => l !== "").join("\n").replace(/---\n\n?#/, "---\n\n#");
}

/** Short Markdown body for pages that don't exist. */
export function notFoundMarkdown(path: string): string {
  return [
    "# Page not found",
    "",
    `There's no page at \`${path}\` on zainameen.com. It may have moved, or the link has a typo.`,
    "",
    "Try one of these instead:",
    "",
    `- [Homepage](${SITE_URL}/)`,
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    `- [llms.txt](${SITE_URL}/llms.txt)`,
    "",
  ].join("\n");
}
