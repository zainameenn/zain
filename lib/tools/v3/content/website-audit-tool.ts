import type { NewToolContent } from "../content-types";

export default {
  slug: "website-audit-tool",
  name: "Website Audit Tool",
  keyword: "website audit tool",
  metaTitle: "Website Audit Tool (100% FREE)",
  metaDescription: "Website audit tool that crawls up to 15 public pages of a site to find errors, redirects, missing or duplicate titles and descriptions, missing H1s and noindex.",
  lede: "This website audit tool crawls up to 15 public pages of your site to find repeated technical issues. See errors, redirects, missing or duplicate titles and descriptions, H1 problems and noindex pages, page by page.",
  sub: "Find SEO issues across multiple pages.",
  trust: "Free, no signup. Our server follows internal links from the page you enter and checks up to 15 public pages. Nothing is stored.",
  steps: [{ title: "Choose what to check", text: "Enter the start URL of the site you want to audit." }, { title: "Read the returned information", text: "Review each page's status and findings, with duplicates counted across pages." }, { title: "Use the result", text: "Fix high impact issues first, then run the audit again." }],
  examples: {
    heading: "Examples,",
    accent: "and what they mean.",
    intro: "Illustrative. Real results depend on what the data source returns on the day.",
    items: [
      { title: "A small service site", input: "The homepage of a 12 page site.", output: "Two duplicate titles and one page marked noindex.", why: "Check whether the noindex is a staging leftover." },
      { title: "Old internal links", input: "A site after a redesign.", output: "Several links that redirect.", why: "Point links straight at the final URL." },
      { title: "A missing page", input: "A link to a deleted page.", output: "Returns 404.", why: "Update the link or redirect to a relevant replacement." },
    ],
  },
  guidance: {
    heading: "Your results,",
    accent: "explained.",
    items: [
      { title: "Patterns, not just pages", text: "A single page check can't spot duplicates. This audit compares titles and descriptions across the pages it checks." },
      { title: "A bounded crawl", text: "It checks up to 15 pages and says how many links it found but didn't check. It never crawls private addresses." },
      { title: "What this tool can't tell you", text: "It reads the HTML each page returns, so content added by JavaScript isn't seen, and it isn't a full crawl of large sites." },
      { title: "What to do next", text: "Start with errors, noindex mistakes and broken journeys before cosmetic warnings, then audit again." },
    ],
  },
  faqs: [
    { q: "What's the difference between a site audit and a page checker?", a: "A page checker inspects one URL. A site audit checks several pages and finds patterns across them." },
    { q: "How many pages can I audit for free?", a: "Up to 15 pages per audit, starting from the page you enter." },
    { q: "Can the audit tell me which fixes matter most?", a: "It flags concrete issues per page; errors and noindex usually come first, but judgment is still needed." },
    { q: "Will fixing every warning make my site rank first?", a: "No. Technical fixes remove obstacles, but rankings depend on relevance and useful content." },
    { q: "Does it follow links to other websites?", a: "No. It only follows links within the same site." },
    { q: "Is anything stored?", a: "No. The pages are read once and nothing is saved." },
  ],
  related: [
    { slug: "website-seo-checker", text: "Check one page in depth." },
    { slug: "broken-link-checker", text: "Test every link on a page." },
    { slug: "sitemap-url-status-checker", text: "Check the URLs in your sitemap." },
  ],
  cta: { heading: "Want help turning data into decisions?", accent: "Let's talk.", copy: "I use this kind of research to decide what to fix, write and build first.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Crawl up to 15 pages of a site to find errors, duplicates and missing tags.", cta: "Audit a website" },
  sources: [{ label: "DataForSEO and Serper API documentation", url: "https://docs.dataforseo.com/v3/", checked: "October 2026" }],
} satisfies NewToolContent;
