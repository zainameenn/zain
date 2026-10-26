import type { NewToolContent } from "../content-types";

export default {
  slug: "redirect-chain-checker",
  name: "Redirect Chain Checker",
  keyword: "redirect chain checker",
  metaTitle: "Redirect Chain Checker (100% FREE)",
  metaDescription: "Redirect chain checker that traces 301, 302, 307 and 308 redirects, spots loops and broken destinations, and shows every hop to the final URL.",
  lede: "This redirect chain checker shows every stop between an old URL and its destination. Enter a public URL and see each server redirect, its response code, and any loops, failures or long chains.",
  sub: "See every stop between an old URL and its destination.",
  trust: "Free, no signup. The public URL you enter is fetched by our server to read its response. Nothing is stored.",
  steps: [
    { title: "Paste the URL", text: "Paste the original URL you want to test." },
    { title: "Follow the chain", text: "Read each hop from start to finish, with its status code." },
    { title: "Shorten it", text: "If redirects are unnecessary, point the old URL straight at the right destination." },
  ],
  examples: {
    heading: "Redirect chains,",
    accent: "traced.",
    intro: "Illustrative chains to show how results read.",
    items: [
      { title: "HTTP to HTTPS, then a moved page", input: "http://example.com/old", output: "301 to https://example.com/old, 301 to https://example.com/new, then 200. Two hops.", why: "Consider redirecting the first URL straight to /new." },
      { title: "A loop", input: "https://example.com/a", output: "301 to /b, 301 back to /a. Loop detected.", why: "Visitors and crawlers never reach a page." },
      { title: "A broken destination", input: "https://example.com/promo", output: "302 to /spring-sale, which returns 404.", why: "The redirect works but the target is gone." },
    ],
  },
  guidance: {
    heading: "Reading",
    accent: "redirects.",
    items: [
      { title: "Permanent versus temporary moves", text: "301 and 308 say a page has moved permanently. 302 and 307 usually mean a temporary redirect. The right one depends on your intent. A site migration usually needs permanent redirects, but there are good reasons for temporary ones too." },
      { title: "What a long chain tells you", text: "Long chains add requests, can slow navigation and make migrations harder to debug. Fix the source redirect where you can, and don't change redirects you don't control. A 403 can mean bot protection rather than a broken page." },
    ],
  },
  faqs: [
    { q: "What is a redirect chain?", a: "A sequence of one or more redirects before reaching the final URL." },
    { q: "What is a redirect loop?", a: "When URLs keep pointing back to each other, so the request never reaches a destination." },
    { q: "Which codes are permanent?", a: "301 and 308 generally mean a permanent redirect. 302 and 307 are normally temporary." },
    { q: "Can redirects hurt SEO?", a: "Valid redirects are normal. Unnecessary chains, loops and broken targets can cause crawling and user problems." },
    { q: "Does the tool follow JavaScript redirects?", a: "No. It traces HTTP redirects only, so redirects done in page scripts won't appear." },
    { q: "Why might the checker show a 403 when the website works?", a: "The site may block automated requests. Check the page in a browser before treating it as broken." },
  ],
  related: [
    { slug: "canonical-url-checker", text: "Check the final page's canonical." },
    { slug: "xml-sitemap-generator", text: "List final URLs, not redirects, in your sitemap." },
    { slug: "robots-txt-tester", text: "Make sure the destination can be crawled." },
  ],
  cta: { heading: "Planning a migration?", accent: "Keep your rankings.", copy: "I plan redirects and technical SEO so moves don't cost you traffic.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Trace every redirect hop to the final URL and spot loops, long chains and broken targets.", cta: "Check redirects" },
  sources: [{ label: "Google: Redirects and Google Search", url: "https://developers.google.com/search/docs/crawling-indexing/301-redirects", checked: "October 2026" }],
} satisfies NewToolContent;
