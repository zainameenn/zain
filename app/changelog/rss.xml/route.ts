import { CHANGELOG_CATEGORIES, publishedEntries } from "@/lib/changelog";

// RSS 2.0 feed of published changelog entries, newest first. Built at deploy time, so it
// always matches the published content files. Drafts never appear.

export const dynamic = "force-static";

const SITE = "https://www.zainameen.com";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const rfc822 = (iso: string) => new Date(`${iso}T12:00:00Z`).toUTCString();

export function GET() {
  const entries = publishedEntries().slice(0, 50);
  const items = entries
    .map((e) => {
      const url = `${SITE}/changelog/${e.slug}`;
      return `    <item>
      <title>${esc(e.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(e.publishedAt!)}</pubDate>
      <category>${esc(CHANGELOG_CATEGORIES[e.category])}</category>
      <description>${esc(e.summary)}</description>
    </item>`;
    })
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Zain Ul Abdin changelog</title>
    <link>${SITE}/changelog</link>
    <atom:link href="${SITE}/changelog/rss.xml" rel="self" type="application/rss+xml" />
    <description>New free marketing tools, improvements, fixes and website updates from zainameen.com.</description>
    <language>en-us</language>
${entries[0] ? `    <lastBuildDate>${rfc822(entries[0].publishedAt!)}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
