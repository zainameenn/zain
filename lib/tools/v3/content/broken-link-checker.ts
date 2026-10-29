import type { NewToolContent } from "../content-types";

export default {
  slug: "broken-link-checker",
  name: "Broken Link Checker",
  keyword: "broken link checker",
  metaTitle: "Broken Link Checker (100% FREE)",
  metaDescription: "Broken link checker that tests the links on a public page and shows each destination, its response and anchor text, so you know what to repair.",
  lede: "This broken link checker tests the links on a public webpage and shows which ones fail. See the destination URL, the observed response and the anchor text, so you know exactly what to fix.",
  sub: "Find broken links and the pages that contain them.",
  trust: "Free, no signup. Our server reads the page once and requests up to 40 of its links. Nothing is stored.",
  steps: [
    { title: "Choose what to check", text: "Enter a public page URL and choose all links or internal links only." },
    { title: "Read the returned information", text: "Review each failed link with its status, redirects and anchor text." },
    { title: "Use the result", text: "Update the links or add relevant redirects, then check the page again." },
  ],
  examples: {
    heading: "Link checks,",
    accent: "and what they mean.",
    items: [
      { title: "An old case study link", input: "A service page linking to a case study that moved.", output: "Broken (404), anchor text \"See the results\".", why: "Update the link on the page, or redirect the old URL if it's linked from elsewhere too." },
      { title: "A site that blocks bots", input: "An external link to a site behind bot protection.", output: "Couldn't reach: the server refused the connection.", why: "Reported separately from a 404, because it may work fine in a browser." },
      { title: "A redirect", input: "An http link to a page that now lives on https.", output: "Redirects (301), to the https URL.", why: "Works, but linking straight to the final URL saves a hop." },
    ],
  },
  guidance: {
    heading: "Your results,",
    accent: "explained.",
    items: [
      { title: "Prioritise what people use", text: "Fix broken links in navigation and popular content first. A broken internal link can usually be pointed at the correct live page." },
      { title: "Don't redirect everything home", text: "An intentionally removed page may need a relevant replacement or a proper 404 or 410, not an automatic redirect to the homepage." },
      { title: "What this tool can't tell you", text: "It checks the links on one page, up to 40 of them, and says how many it skipped. Some sites block automated requests, so a timeout or refusal isn't proof a link is broken." },
      { title: "What to do next", text: "Repair links that interrupt important journeys first, then recheck the page to confirm the new responses." },
    ],
  },
  faqs: [
    { q: "What counts as a broken link?", a: "A link whose destination returns an error such as 404 or 410 under the tested conditions. Timeouts and blocked requests are reported separately." },
    { q: "Can this find broken external links?", a: "Yes. Choose all links to test external destinations as well as internal ones." },
    { q: "Should I redirect every 404 to the homepage?", a: "No. Redirect to a genuinely relevant replacement when one exists. Otherwise a clear 404 or 410 can be more appropriate." },
    { q: "Can I download the list?", a: "Yes. The CSV includes the source page, link, anchor text, result, status, final URL and check time." },
    { q: "Does it check every page on my site?", a: "No. It checks the links on the one page you enter, up to 40 unique links, and tells you how many it skipped." },
    { q: "Why does a working link show as couldn't reach?", a: "Some servers block automated requests or answer slowly. Open the link in a browser before changing it." },
  ],
  related: [
    { slug: "redirect-chain-checker", text: "Trace a redirect that looks long." },
    { slug: "website-seo-checker", text: "Check the same page's SEO basics." },
    { slug: "internal-link-opportunity-finder", text: "Find better internal links to add." },
  ],
  cta: { heading: "Broken links across the site?", accent: "Let's tidy them up.", copy: "I find and fix the technical issues that waste visitors' time and crawl budget.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Test the links on a page and see which ones fail, with status and anchor text.", cta: "Check links" },
  sources: [{ label: "Google: HTTP status codes and Search", url: "https://developers.google.com/search/docs/crawling-indexing/http-network-errors", checked: "October 2026" }],
} satisfies NewToolContent;
