import type { NewToolContent } from "../content-types";

export default {
  slug: "xml-sitemap-validator",
  name: "XML Sitemap Validator",
  keyword: "xml sitemap validator",
  metaTitle: "XML Sitemap Validator (100% FREE)",
  metaDescription: "Check an XML sitemap for formatting problems, duplicate URLs, incorrect dates, and sitemap limits. Paste XML or upload a file and see actionable fixes.",
  lede: "This XML sitemap validator checks the sitemap you paste or upload and shows exactly what's valid, what's broken, and which URLs need another look.",
  sub: "Find sitemap problems before search engines do.",
  trust: "Free, no signup. Runs in your browser, nothing is sent anywhere.",
  steps: [
    { title: "Add your sitemap", text: "Paste sitemap content or choose a file." },
    { title: "Run validation", text: "Review the grouped errors and warnings." },
    { title: "Fix and recheck", text: "Fix the source and regenerate the sitemap, then validate again." },
  ],
  examples: {
    heading: "Sitemap checks,",
    accent: "and what they find.",
    intro: "Illustrative files only, using example.com. None of the results is a claim about indexing.",
    items: [
      { title: "Duplicate URL and bad date", input: "A file lists https://example.com/a twice and has <lastmod>tomorrow</lastmod>.", output: "One duplicate URL warning and one invalid date error.", why: "Both are formatting problems the file itself shows, with no fake indexing claims." },
      { title: "Relative URL", input: "A <loc> entry contains /pricing instead of https://example.com/pricing.", output: "One error: the URL must be absolute.", why: "Sitemap URLs need the full address, including the protocol and host." },
      { title: "Clean sitemap", input: "Twelve unique absolute URLs with dates like 2026-10-01.", output: "Valid. No errors or warnings.", why: "Valid syntax only. It doesn't prove each page is live or indexed." },
    ],
  },
  guidance: {
    heading: "What sitemap validation",
    accent: "can and can't tell you.",
    items: [
      { title: "What a validator can actually test", text: "It checks whether the document parses and whether fields follow the sitemap structure, and finds duplicate, malformed or badly formatted URLs and dates. It can't prove a page is canonical, crawlable or indexed." },
      { title: "The limits that matter", text: "Google says one sitemap can hold at most 50,000 URLs and be no more than 50MB uncompressed. Larger sites split into several and use a sitemap index. lastmod should reflect meaningful changes, not the latest build." },
      { title: "Sources", text: "Limits come from [Google's guide to building a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), checked October 2026." },
    ],
  },
  faqs: [
    { q: "What is an XML sitemap?", a: "A machine readable list of preferred URLs, optionally with meaningful modification dates." },
    { q: "What's the difference between a sitemap and a sitemap index?", a: "A sitemap lists pages. A sitemap index points to multiple sitemaps." },
    { q: "How many URLs can one sitemap contain?", a: "Up to 50,000, and up to 50MB uncompressed per file." },
    { q: "Can a valid sitemap still contain broken pages?", a: "Yes. Syntax checks don't test server responses, redirects, canonicals or noindex." },
    { q: "Does submitting a sitemap guarantee indexing?", a: "No." },
    { q: "Should I update lastmod every day?", a: "Only for meaningful content changes." },
  ],
  related: [
    { slug: "robots-txt-generator", text: "Point crawlers to the sitemap." },
    { slug: "robots-txt-tester", text: "Check your crawl rules." },
    { slug: "llms-txt-generator", text: "Create an llms.txt file too." },
  ],
  cta: { heading: "Want a site", accent: "search engines love?", copy: "I fix technical SEO and content for SaaS companies so the right pages get found.", button: "See SEO for SaaS", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Check an XML sitemap for parse errors, duplicate URLs, bad dates and size limits.", cta: "Validate a sitemap" },
  sources: [
    { label: "Google: build and submit a sitemap", url: "https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap", checked: "October 2026" },
  ],
} satisfies NewToolContent;
