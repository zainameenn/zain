import type { NewToolContent } from "../content-types";

export default {
  slug: "canonical-url-checker",
  name: "Canonical URL Checker",
  keyword: "canonical url checker",
  metaTitle: "Canonical URL Checker (100% FREE)",
  metaDescription: "Canonical URL checker that reads a page's canonical tag, compares it with the requested URL and flags missing, duplicate or conflicting signals.",
  lede: "This canonical url checker finds out which URL your page asks search engines to prefer. Check a public page or paste its HTML to see the canonical tag, where it points and anything worth reviewing.",
  sub: "Find out which URL your page asks search engines to prefer.",
  trust: "Free, no signup. The public URL you enter is fetched by our server to read its response. Nothing is stored.",
  steps: [
    { title: "Enter a URL or HTML", text: "Enter a public page URL, or paste the page's HTML source." },
    { title: "Read the result", text: "Review the declared canonical and the page's fetch status." },
    { title: "Fix and recheck", text: "Fix accidental conflicts, then check the deployed page again." },
  ],
  examples: {
    heading: "Canonical checks,",
    accent: "and what they mean.",
    intro: "Illustrative results. Each finding is labelled as observed, inferred or not checked.",
    items: [
      { title: "A tracking parameter", input: "Requested /products/mat?utm_source=ig, canonical /products/mat.", output: "Canonical points to the clean product URL.", why: "This is usually intentional and fine." },
      { title: "A product pointing home", input: "Requested /products/lamp, canonical https://example.com/.", output: "Warning: canonical points to a different page, the homepage.", why: "Often a template mistake that hides the product from search." },
      { title: "Two canonical tags", input: "Pasted HTML with two rel=canonical links to different URLs.", output: "Warning: conflicting canonicals found.", why: "Search engines may ignore both when they disagree." },
    ],
  },
  guidance: {
    heading: "Canonical tags,",
    accent: "explained.",
    items: [
      { title: "Canonical URL basics", text: "The canonical tag is a preference signal that helps search engines consolidate duplicate or very similar pages. Google may pick a different canonical based on other signals. A self referencing tag is often sensible on original pages, but not required on every site." },
      { title: "When canonical problems matter", text: "Look closer when a valuable product page points to the homepage, pagination points to the wrong page, HTTP and HTTPS versions disagree, or a canonical target redirects. Keep internal links and sitemaps aligned with your intended canonical URLs." },
    ],
  },
  faqs: [
    { q: "What is a canonical tag?", a: "An HTML rel=\"canonical\" link that names the preferred URL among duplicates or very similar pages." },
    { q: "Does Google always follow it?", a: "No. Google combines it with other signals and can choose a different URL." },
    { q: "Should every page have a self canonical?", a: "It's often recommended, but check your framework and duplicate URL setup rather than adding one blindly." },
    { q: "Can a canonical point to a different domain?", a: "Yes. That can be right for syndicated content, but it deserves careful checking." },
    { q: "Are canonical and noindex the same?", a: "No. Noindex asks for a page to be left out of the index. Canonical says which version you prefer." },
    { q: "Can this tool tell me Google's selected canonical?", a: "No. It checks the signals on the page, not Search Console's indexing decisions." },
  ],
  related: [
    { slug: "redirect-chain-checker", text: "Check where the canonical target redirects." },
    { slug: "xml-sitemap-generator", text: "List only canonical URLs in your sitemap." },
    { slug: "hreflang-tag-generator", text: "Pair canonicals with hreflang on translated pages." },
  ],
  cta: { heading: "Duplicate pages competing?", accent: "Let's clean it up.", copy: "I fix the technical SEO issues that split rankings across duplicate URLs.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "See a page's canonical tag, where it points and any duplicate or conflicting signals.", cta: "Check a canonical" },
  sources: [{ label: "Google: Canonical URLs", url: "https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls", checked: "October 2026" }],
} satisfies NewToolContent;
