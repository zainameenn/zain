import type { NewToolContent } from "../content-types";

export default {
  slug: "robots-txt-tester",
  name: "Robots.txt Tester",
  keyword: "robots.txt tester",
  metaTitle: "Robots.txt Tester (100% FREE)",
  metaDescription: "Test whether a crawler can access a URL under robots.txt rules. See the matching Allow or Disallow directive and understand what it means.",
  lede: "This robots.txt tester checks whether your rules let a crawler request a URL, and shows which rule applies and why.",
  sub: "Paste your robots.txt, choose a crawler, and test a URL path.",
  trust: "Free, no signup. Runs in your browser, nothing is sent anywhere. It checks the rules you paste, not a live crawl.",
  steps: [
    { title: "Paste your rules", text: "Copy the text from your site's /robots.txt file." },
    { title: "Select a crawler and URL", text: "Try Googlebot or the exact user agent you want to check." },
    { title: "Read the matched rule", text: "The tester shows whether the rules allow that path, not whether the page will be indexed or rank." },
  ],
  examples: {
    heading: "How the rules",
    accent: "actually resolve.",
    intro: "Rules: User-agent: *, Disallow: /drafts/, Allow: /drafts/public/, Disallow: /*.pdf$",
    items: [
      { title: "A more specific Allow", input: "Googlebot, /drafts/public/guide", output: "Allowed by Allow: /drafts/public/", why: "The longer, more specific rule wins over Disallow: /drafts/." },
      { title: "Still blocked", input: "Googlebot, /drafts/secret/", output: "Disallowed by Disallow: /drafts/", why: "Only the Disallow rule matches this path." },
      { title: "The end anchor", input: "Googlebot, /files/report.pdf?v=2", output: "Allowed", why: "Disallow: /*.pdf$ only matches URLs that end in .pdf, and this one ends in a query string." },
    ],
  },
  guidance: {
    heading: "Robots.txt,",
    accent: "explained plainly.",
    items: [
      { title: "What robots.txt does", text: "It tells compliant crawlers which paths they may request. It lives at the root of a site, like https://example.com/robots.txt, and applies to that scheme, host and port. It controls crawling, not access: it's not a password and won't reliably hide files. A blocked URL can still appear in search results without its content." },
      { title: "How Allow and Disallow are evaluated", text: "A crawler finds the user agent group that matches it most specifically, or the * group, then compares the path with that group's rules. Under the Robots Exclusion Protocol (RFC 9309) the most specific matching rule wins, and Allow wins a tie. Wildcards (*) and the end marker ($) change what matches. A test that just looks for the first Disallow line is wrong." },
      { title: "Robots.txt, noindex and sitemaps are different", text: "Robots.txt controls crawl requests. A noindex directive asks search engines not to index a page, but the crawler has to be allowed in to see it. A sitemap lists URLs you want discovered; it doesn't override a Disallow. To protect private content, require a login." },
      { title: "Methodology", text: "The tester follows [RFC 9309](https://www.rfc-editor.org/rfc/rfc9309.html) and [Google's robots.txt documentation](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec): case insensitive user agent matching, merged groups, case sensitive paths, * and $, longest match with Allow winning ties, and /robots.txt always allowed." },
    ],
  },
  faqs: [
    { q: "How do I test a URL in robots.txt?", a: "Paste your site's rules, pick the crawler and enter the path. The tester applies the matching rules and shows the line responsible for the result." },
    { q: "Does Disallow: / block my entire site?", a: "For the matching user agent group, it blocks crawling of every path unless a more specific Allow rule applies. Test a few paths before you deploy it." },
    { q: "Can I block Google from indexing with robots.txt?", a: "Not reliably. A blocked URL can still be indexed from links elsewhere, without its content. Use a noindex directive or put the page behind a login, depending on your goal." },
    { q: "What is the difference between robots.txt and a meta robots tag?", a: "Robots.txt is a site level file about crawling. A meta robots tag sits in a page and tells search engines about indexing, once they're allowed to crawl it." },
    { q: "Should I add my sitemap to robots.txt?", a: "You can add a Sitemap: line with the full URL. It helps discovery but doesn't override Disallow rules." },
    { q: "Does a robots.txt tester show if Google has indexed my page?", a: "No. It checks permissions. Use Google Search Console's URL inspection for indexing status." },
    { q: "Why is Googlebot allowed but another bot blocked?", a: "Different user agent groups can have different rules. The tester uses the group that matches the crawler you pick." },
    { q: "What if robots.txt is missing?", a: "Under the standard, a missing file means no crawl restrictions. Some fetch errors are treated differently by crawlers, so don't assume every error means allowed." },
    { q: "Is robots.txt a way to protect private files?", a: "No. The file is public and crawlers don't enforce access. Use authentication and server permissions." },
  ],
  related: [
    { slug: "llms-txt-generator", text: "Create an llms.txt file too." },
    { slug: "seo-search-intent-classifier", text: "Plan pages by search intent." },
    { slug: "seo-title-generator", text: "Write better title tags." },
  ],
  cta: { heading: "Technical SEO", accent: "giving you trouble?", copy: "I fix crawling, indexing and site structure problems as part of ongoing SEO.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Check whether robots.txt lets a crawler request a URL, and see exactly which rule decides it.", cta: "Test robots.txt" },
  sources: [
    { label: "RFC 9309: Robots Exclusion Protocol", url: "https://www.rfc-editor.org/rfc/rfc9309.html", checked: "October 2026" },
    { label: "Google: how Google interprets robots.txt", url: "https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec", checked: "October 2026" },
  ],
} satisfies NewToolContent;
