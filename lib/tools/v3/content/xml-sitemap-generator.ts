import type { NewToolContent } from "../content-types";

export default {
  slug: "xml-sitemap-generator",
  name: "XML Sitemap Generator",
  keyword: "xml sitemap generator",
  metaTitle: "XML Sitemap Generator (100% FREE)",
  metaDescription: "XML sitemap generator that turns URLs or a CSV into a valid sitemap.xml. Check duplicates, add genuine modification dates and download it free.",
  lede: "This xml sitemap generator turns the URLs you paste or upload into a correctly formatted sitemap.xml file, flags problems and lets you download it. No account, no invented pages, no AI call.",
  sub: "Build a sitemap from the pages you actually have.",
  trust: "Free, no signup. Runs in your browser, nothing is sent anywhere.",
  steps: [
    { title: "Add your URLs", text: "Paste your canonical URLs, one per line, or upload a URL export as CSV or TXT." },
    { title: "Review the report", text: "Correct anything invalid, duplicated or on another domain." },
    { title: "Download and submit", text: "Download sitemap.xml, upload it to your site and submit its URL in Search Console." },
  ],
  examples: {
    heading: "Sitemaps,",
    accent: "built from real lists.",
    intro: "Illustrative inputs to show what the generator does. Your output only ever contains the URLs you give it.",
    items: [
      { title: "A small site with relative paths", input: "Domain https://example.com, then /, /about and /products/desk-mat.", output: "One urlset with three absolute loc entries and no lastmod dates.", why: "No dates were supplied, so none are invented." },
      { title: "A CSV export with dates", input: "A CSV with url and lastmod columns for 40 blog posts, two rows repeated.", output: "38 URLs with their own lastmod dates. 2 duplicates removed.", why: "Dates come from your file, not from today's date." },
      { title: "A mixed list", input: "URLs from example.com plus two from shop.example.net.", output: "The two other domain URLs are listed separately and left out of the file.", why: "A sitemap should only list URLs on the host it is published for." },
    ],
  },
  guidance: {
    heading: "What belongs",
    accent: "in a sitemap.",
    items: [
      { title: "Only the pages you want found", text: "Include the canonical, public URLs you want crawled and considered for search. Leave out drafts, login pages, duplicates, URLs returning errors, redirected pages and pages you have set to noindex. This generator formats the list you provide. It does **not** confirm Google will index any URL." },
      { title: "What a sitemap can and cannot do", text: "A sitemap helps search engines discover preferred URLs. It is not a ranking boost or an indexing guarantee. Keep it current, publish it at an accessible URL and link it from robots.txt. If your website already creates a sitemap automatically, use that built in system instead of uploading a static replacement." },
      { title: "Limits per file", text: "One sitemap can hold up to **50,000 URLs and 50 MB uncompressed**. Bigger lists are split into several files with a sitemap index that points to each one." },
    ],
  },
  faqs: [
    { q: "What is an XML sitemap?", a: "An XML document listing URLs you want search engines to discover. It can optionally include accurate modification dates." },
    { q: "Does this tool crawl my whole website?", a: "No. It only includes the pages you paste or upload. It doesn't visit your site." },
    { q: "Should every URL include lastmod?", a: "No. Add it only when you know the page was meaningfully updated. Leaving it out is better than guessing." },
    { q: "How many URLs fit in one sitemap?", a: "Up to 50,000 URLs and 50 MB uncompressed per sitemap. Larger sets need multiple files and a sitemap index." },
    { q: "Where do I upload sitemap.xml?", a: "Usually to your site's root, such as https://example.com/sitemap.xml, or another accessible location you reference in robots.txt and Search Console." },
    { q: "Will a sitemap make Google index every page?", a: "No. A valid sitemap helps discovery. Indexing still depends on crawl access, canonicalization, page content and Google's own decisions." },
  ],
  related: [
    { slug: "xml-sitemap-validator", text: "Check the file you just made." },
    { slug: "robots-txt-generator", text: "Point robots.txt at your sitemap." },
    { slug: "canonical-url-checker", text: "Make sure the URLs are the canonical ones." },
  ],
  cta: { heading: "Pages not getting indexed?", accent: "Let's find out why.", copy: "I help SaaS teams fix the technical SEO that stops good pages from being found.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Turn a list of URLs or a CSV into a valid sitemap.xml, with duplicates and off domain URLs flagged.", cta: "Generate a sitemap" },
  sources: [{ label: "Google: Build and submit a sitemap", url: "https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap", checked: "October 2026" }],
} satisfies NewToolContent;
