// A small Reddit flavoured Markdown renderer for the post formatter preview.
// Safety model: every piece of user text is HTML escaped before any formatting is added, the only tags ever
// produced are the fixed ones below, and links keep only http(s) addresses. So pasted <script>, onerror=,
// javascript: or data: URLs can't run: they come out as plain text. No dependency, no dangerouslySetInnerHTML
// of anything that wasn't built here.
// It approximates new Reddit's Markdown editor. It is not pixel identical to every Reddit client.

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

/** Only absolute http and https URLs survive. Anything else (javascript:, data:, relative) is refused. */
export function safeUrl(raw: string): string | null {
  const u = raw.trim().replace(/^<|>$/g, "");
  if (!/^https?:\/\//i.test(u)) return null;
  try {
    const parsed = new URL(u);
    return parsed.protocol === "http:" || parsed.protocol === "https:" ? parsed.href : null;
  } catch {
    return null;
  }
}

/** Inline formatting on one line of raw text. Returns safe HTML. */
export function inline(raw: string): string {
  // Pull out code spans and links first so their contents aren't formatted.
  const slots: string[] = [];
  const keep = (html: string) => `\u0000${slots.push(html) - 1}\u0000`;
  let s = raw.replace(/`([^`]+)`/g, (_, c) => keep(`<code>${esc(c)}</code>`));
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (m, text, url) => {
    const ok = safeUrl(url);
    return ok ? keep(`<a href="${esc(ok)}" rel="nofollow noopener noreferrer" target="_blank">${inline(text)}</a>`) : keep(esc(m));
  });
  s = s.replace(/(^|\s)(https?:\/\/[^\s<]+[^\s<.,;:!?)])/g, (_, pre, url) => {
    const ok = safeUrl(url);
    return pre + (ok ? keep(`<a href="${esc(ok)}" rel="nofollow noopener noreferrer" target="_blank">${esc(url)}</a>`) : esc(url));
  });
  // Spoilers: Reddit's >!text!< syntax. Captured before escaping, rendered as a reveal on click.
  s = s.replace(/>!(.+?)!</g, (_, t) => keep(`<span class="md-spoiler" tabindex="0" role="button" aria-label="Spoiler, select to reveal">${inline(t)}</span>`));
  s = esc(s);
  s = s
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/__(.+?)__/g, "<strong>$1</strong>")
    .replace(/(^|[^*\w])\*(?!\s)(.+?)(?<!\s)\*(?!\*)/g, "$1<em>$2</em>")
    .replace(/(^|[^_\w])_(?!\s)(.+?)(?<!\s)_(?!\w)/g, "$1<em>$2</em>")
    .replace(/~~(.+?)~~/g, "<del>$1</del>")
    .replace(/\^\(([^)]+)\)/g, "<sup>$1</sup>")
    .replace(/\^(\S+)/g, "<sup>$1</sup>")
    .replace(/\\([*_~`>#^\\[\]()])/g, "$1");
  return s.replace(/\u0000(\d+)\u0000/g, (_, n) => slots[Number(n)]);
}

const isTableSep = (l: string) => /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)*\|?\s*$/.test(l);
const cells = (l: string) => l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim());

/** Renders a whole post. Blocks: headings, paragraphs, quotes, lists, code, tables, rules. */
export function renderMarkdown(src: string): string {
  const lines = src.replace(/\r\n?/g, "\n").split("\n");
  const out: string[] = [];
  let i = 0;
  const para: string[] = [];
  const flush = () => {
    if (para.length) out.push(`<p>${para.map(inline).join("<br>")}</p>`);
    para.length = 0;
  };
  while (i < lines.length) {
    const l = lines[i];
    if (!l.trim()) { flush(); i++; continue; }
    // Fenced code
    if (/^\s*```/.test(l)) {
      flush();
      const body: string[] = [];
      i++;
      while (i < lines.length && !/^\s*```/.test(lines[i])) body.push(lines[i++]);
      i++;
      out.push(`<pre><code>${esc(body.join("\n"))}</code></pre>`);
      continue;
    }
    // Indented code (four spaces or a tab), only at the start of a block
    if (/^( {4}|\t)/.test(l) && !para.length) {
      const body: string[] = [];
      while (i < lines.length && (/^( {4}|\t)/.test(lines[i]) || !lines[i].trim())) body.push(lines[i++].replace(/^( {4}|\t)/, ""));
      out.push(`<pre><code>${esc(body.join("\n").replace(/\n+$/, ""))}</code></pre>`);
      continue;
    }
    const h = l.match(/^(#{1,6})\s+(.*)$/);
    if (h) { flush(); out.push(`<h${h[1].length}>${inline(h[2].replace(/\s#+\s*$/, ""))}</h${h[1].length}>`); i++; continue; }
    if (/^\s*([-*_])(\s*\1){2,}\s*$/.test(l)) { flush(); out.push("<hr>"); i++; continue; }
    // Quote (but not a spoiler line)
    if (/^\s*>(?!!)/.test(l)) {
      flush();
      const body: string[] = [];
      while (i < lines.length && /^\s*>(?!!)/.test(lines[i])) body.push(lines[i++].replace(/^\s*>\s?/, ""));
      out.push(`<blockquote>${renderMarkdown(body.join("\n"))}</blockquote>`);
      continue;
    }
    // Lists
    const bullet = /^\s*[-*+]\s+/, number = /^\s*\d+[.)]\s+/;
    if (bullet.test(l) || number.test(l)) {
      flush();
      const ordered = number.test(l);
      const re = ordered ? number : bullet;
      const items: string[] = [];
      while (i < lines.length && re.test(lines[i])) items.push(`<li>${inline(lines[i++].replace(re, ""))}</li>`);
      out.push(ordered ? `<ol>${items.join("")}</ol>` : `<ul>${items.join("")}</ul>`);
      continue;
    }
    // Tables: a header row followed by a separator row
    if (l.includes("|") && i + 1 < lines.length && isTableSep(lines[i + 1])) {
      flush();
      const head = cells(l);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].includes("|") && lines[i].trim()) rows.push(cells(lines[i++]));
      out.push(`<div class="md-table"><table><thead><tr>${head.map((c) => `<th>${inline(c)}</th>`).join("")}</tr></thead><tbody>${rows.map((r) => `<tr>${head.map((_, k) => `<td>${inline(r[k] ?? "")}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
      continue;
    }
    // Reddit joins single newlines into one paragraph unless the line ends with two spaces or a backslash.
    if (para.length && !/( {2}|\\)$/.test(lines[i - 1])) para[para.length - 1] += " " + l.trim();
    else para.push(l.replace(/( {2}|\\)$/, "").trim());
    if (/( {2}|\\)$/.test(l)) para[para.length - 1] = para[para.length - 1].replace(/\\$/, "");
    i++;
  }
  flush();
  return out.join("\n");
}

/** Plain text version: Markdown symbols removed, links kept as "text (url)". */
export function toPlainText(src: string): string {
  return src
    .replace(/\r\n?/g, "\n")
    .replace(/^\s*```.*$/gm, "")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*>\s?(?!!)/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "• ")
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, "$1 ($2)")
    .replace(/>!(.+?)!</g, "$1")
    .replace(/(\*\*\*|\*\*|__|~~)(.+?)\1/g, "$2")
    .replace(/(^|[^*\w])\*(.+?)\*/g, "$1$2")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^\s*\|?\s*:?-{3,}.*$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
