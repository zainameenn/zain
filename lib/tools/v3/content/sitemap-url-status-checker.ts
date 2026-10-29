import type { NewToolContent } from "../content-types";

export default {
  slug: "sitemap-url-status-checker",
  name: "Sitemap URL Status Checker",
  keyword: "sitemap url status checker",
  metaTitle: "Sitemap URL Status Checker (100% FREE)",
  metaDescription: "Sitemap URL status checker that tests the URLs listed in your XML sitemap for redirects, errors, noindex and canonicals pointing elsewhere.",
  lede: "This sitemap URL status checker reads your XML sitemap and tests the URLs it lists. See HTTP responses, redirects and indexability clues, so you can find sitemap entries worth fixing.",
  sub: "Check the URLs listed in your XML sitemap.",
  trust: "Free, no signup. Our server reads the sitemap and requests up to 25 listed URLs. Nothing is stored.",
  steps: [
    { title: "Choose what to check", text: "Enter the URL of an XML sitemap or sitemap index." },
    { title: "Read the returned information", text: "Review the status, redirect and canonical clues for each tested URL." },
    { title: "Use the result", text: "Update the sitemap to list the canonical URLs you want indexed, then check again." },
  ],
  examples: {
    heading: "Sitemap checks,",
    accent: "and what they mean.",
    items: [
      { title: "An old article URL", input: "A sitemap listing a post that now redirects.", output: "Redirects (301), to the new URL.", why: "List the final canonical URL instead of the redirect source." },
      { title: "A page that disappeared", input: "A product removed from the store but left in the sitemap.", output: "Returns 404.", why: "Remove it from the sitemap, or restore the page if it was removed by mistake." },
      { title: "A noindex page", input: "A thank you page included by a plugin.", output: "Marked noindex.", why: "Mixed signals: either index it or take it out of the sitemap." },
    ],
  },
  guidance: {
    heading: "Your results,",
    accent: "explained.",
    items: [
      { title: "Valid XML isn't enough", text: "A sitemap can be perfectly valid and still list broken, redirected or unintended URLs. This checker tests the listed URLs; the XML Sitemap Validator checks the file's structure." },
      { title: "Clues, not verdicts", text: "A canonical pointing elsewhere or a noindex directive suggests the entry deserves review. A URL returning 200 is not proof Google has indexed it." },
      { title: "What this tool can't tell you", text: "It tests the first 25 listed URLs (for an index, from its first three sitemaps) and reports how many it skipped. Large sitemaps need a fuller crawl." },
      { title: "What to do next", text: "Remove outdated redirect sources and errors from the sitemap and keep the canonical URLs you want indexed." },
    ],
  },
  faqs: [
    { q: "Is a valid sitemap enough for Google indexing?", a: "No. A sitemap helps discovery. Google makes indexing decisions separately." },
    { q: "Should redirected URLs be in a sitemap?", a: "Normally no. List the canonical URLs you want indexed, not old redirect sources." },
    { q: "Can you check every URL in a large sitemap?", a: "Not in one free check. It tests the first 25 URLs and tells you how many it skipped." },
    { q: "What's the difference from sitemap validation?", a: "Validation checks the XML structure and fields. This audit requests the listed pages and inspects their responses." },
    { q: "Does it work with a sitemap index?", a: "Yes. It reads up to the first three sitemaps listed in the index and tests URLs from them." },
    { q: "Why is a canonical pointing elsewhere flagged?", a: "A sitemap should list the URLs you want indexed. If a page's canonical points to another URL, one of the two signals is probably wrong." },
  ],
  related: [
    { slug: "xml-sitemap-validator", text: "Validate the sitemap's XML structure." },
    { slug: "xml-sitemap-generator", text: "Rebuild a clean sitemap." },
    { slug: "redirect-chain-checker", text: "Trace where a listed URL redirects." },
  ],
  cta: { heading: "Sitemap full of old URLs?", accent: "Let's clean it up.", copy: "I fix the technical SEO basics so search engines spend their time on the pages that matter.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Test the URLs in your XML sitemap for errors, redirects, noindex and stray canonicals.", cta: "Audit a sitemap" },
  sources: [{ label: "Google: Build and submit a sitemap", url: "https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap", checked: "October 2026" }],
} satisfies NewToolContent;
