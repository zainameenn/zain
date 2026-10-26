import type { NewToolContent } from "../content-types";

export default {
  slug: "robots-txt-generator",
  name: "Robots.txt Generator",
  keyword: "robots.txt generator",
  metaTitle: "Robots.txt Generator (100% FREE)",
  metaDescription: "Generate a robots.txt file for common website crawling rules. Configure allowed and blocked paths, preview the file, and understand indexing limitations.",
  lede: "This robots.txt generator lets you choose which public paths crawlers may access, add your sitemap, and copy a clean file with a readable explanation of each rule.",
  sub: "Create a robots.txt file you can actually understand.",
  trust: "Free, no signup. Runs in your browser, nothing is sent anywhere. Robots.txt does not password protect pages and is not a reliable way to prevent URLs from being indexed.",
  steps: [
    { title: "Add your site and paths", text: "Enter your site and the paths crawlers should avoid." },
    { title: "Review the rules", text: "Check the exact allow and block rules and the warning about private information." },
    { title: "Upload and test", text: "Save the file as robots.txt at the website root and check it with the Robots.txt Tester." },
  ],
  examples: {
    heading: "Robots.txt files,",
    accent: "rule by rule.",
    intro: "Illustrative setups only, using example.com. Your paths will differ.",
    items: [
      { title: "Block a staging folder", input: "Site https://example.com, block /staging/, sitemap /sitemap.xml.", output: "User-agent: * / Disallow: /staging/ / Sitemap: https://example.com/sitemap.xml", why: "Crawlers skip the staging copy and still find the sitemap." },
      { title: "Skip internal search", input: "Site https://example.com, block /search, sitemap /sitemap.xml.", output: "User-agent: * / Disallow: /search / Sitemap: https://example.com/sitemap.xml", why: "Stops crawlers wasting time on endless internal search result URLs." },
      { title: "Allow everything", input: "Site https://example.com, no blocked paths, sitemap /sitemap.xml.", output: "User-agent: * / Allow: / / Sitemap: https://example.com/sitemap.xml", why: "A simple open file that still points crawlers to the sitemap." },
    ],
  },
  guidance: {
    heading: "What robots.txt does,",
    accent: "and what it doesn't.",
    items: [
      { title: "Robots.txt controls crawling, not confidentiality", text: "The file tells cooperating crawlers which paths they may request. It is public and anyone can read it. Never put confidential folder names or secrets in it to hide them. Private content needs real authentication." },
      { title: "Common mistakes", text: "Blocking the entire site can stop search engines reaching pages you want indexed. Blocking JavaScript, images or CSS needed for rendering causes problems. A URL can still show in results when crawling is disallowed, so use an accessible noindex when preventing indexing is the goal." },
      { title: "Sources", text: "Rules follow Google's guides on [creating a robots.txt file](https://developers.google.com/crawling/docs/robots-txt/create-robots-txt) and [the robots.txt specification](https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec), checked October 2026." },
    ],
  },
  faqs: [
    { q: "What is robots.txt?", a: "A public text file at the root of a host that gives cooperative crawlers instructions about paths they may crawl." },
    { q: "Where should I upload it?", a: "At the root, such as https://example.com/robots.txt." },
    { q: "Can robots.txt block Google from indexing a URL?", a: "A Disallow blocks crawling but the URL can still appear in results. Use indexing controls for that." },
    { q: "Should I block login or admin pages?", a: "Use authentication and proper security. Robots.txt alone doesn't protect them." },
    { q: "How do I include a sitemap?", a: "Add a Sitemap: line followed by its full absolute URL." },
    { q: "Can I create rules for a particular bot?", a: "Yes. Add a User-agent group for it and check how that crawler interprets rules." },
  ],
  related: [
    { slug: "robots-txt-tester", text: "Test the file before you upload it." },
    { slug: "xml-sitemap-validator", text: "Check the sitemap you point to." },
    { slug: "llms-txt-generator", text: "Create an llms.txt file too." },
  ],
  cta: { heading: "Want a site", accent: "search engines love?", copy: "I fix technical SEO and content for SaaS companies so the right pages get found.", button: "See SEO for SaaS", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Build a clean robots.txt file with allowed and blocked paths, a sitemap line and a plain explanation of each rule.", cta: "Generate robots.txt" },
  sources: [
    { label: "Google: create a robots.txt file", url: "https://developers.google.com/crawling/docs/robots-txt/create-robots-txt", checked: "October 2026" },
    { label: "Google: robots.txt specification", url: "https://developers.google.com/crawling/docs/robots-txt/robots-txt-spec", checked: "October 2026" },
  ],
} satisfies NewToolContent;
