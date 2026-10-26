import type { NewToolContent } from "../content-types";

export default {
  slug: "internal-link-opportunity-finder",
  name: "Internal Link Opportunity Finder",
  keyword: "internal link opportunity finder",
  metaTitle: "Internal Link Opportunity Finder (100% FREE)",
  metaDescription: "Internal link opportunity finder that compares your page titles, topics and URLs to suggest relevant internal links. Review anchors before editing.",
  lede: "This internal link opportunity finder finds pages that could link to each other more naturally. Upload a list of your pages and topics, see possible internal links with suggested anchor themes, then review the matches yourself.",
  sub: "Find pages that could link to each other more naturally.",
  trust: "Free, no signup. Runs in your browser, nothing is sent anywhere.",
  steps: [
    { title: "Add your pages", text: "Paste or upload page URLs, titles and topics." },
    { title: "Review the suggestions", text: "Check which pages the tool thinks are related and why." },
    { title: "Link where it helps", text: "Read the source page and add a descriptive link only where it genuinely helps readers." },
  ],
  examples: {
    heading: "Link suggestions,",
    accent: "worth reviewing.",
    intro: "Illustrative page lists. Suggestions come from matching your titles and topics, not from reading your pages.",
    items: [
      { title: "A guide and a tool", input: "Source How to set up an Etsy store, target Etsy Fee Calculator.", output: "Suggested link, anchor theme: Etsy seller fees.", why: "Link it where the guide explains fees, if that section exists." },
      { title: "Two related posts", input: "Choosing a CRM for a bakery, and Tracking wholesale orders.", output: "Suggested both ways, anchor theme: wholesale orders.", why: "Shared topic terms in both titles." },
      { title: "Already linked", input: "The same pair, with an existing links CSV that includes it.", output: "Not suggested.", why: "Supplied existing links are skipped." },
    ],
  },
  guidance: {
    heading: "Internal linking,",
    accent: "for readers first.",
    items: [
      { title: "Link for the reader first", text: "Internal links help people move to relevant pages and help crawlers discover content. A useful link supports what the sentence around it is saying. Don't force exact match anchors into every paragraph." },
      { title: "What this tool has not checked", text: "It works only from the titles and topics you supply. It doesn't read paragraphs, measure authority, check Search Console or find every existing link. The score is a matching heuristic, not an SEO metric." },
    ],
  },
  faqs: [
    { q: "What is internal linking?", a: "Links between pages on the same website that help visitors and crawlers find their way around." },
    { q: "Will this tool crawl my site?", a: "No. It works with the URLs, titles and topics you supply." },
    { q: "Can it prove a link is missing?", a: "Only if the existing links you supply are complete. Otherwise the results are candidate connections." },
    { q: "How many internal links should a page have?", a: "There's no universal number. Add links where they genuinely help visitors." },
    { q: "Should every anchor match the exact keyword?", a: "No. Natural, descriptive anchor text is generally better than repeating the same keyword." },
    { q: "Can I import my website sitemap?", a: "You can use it as a source of URLs, but URLs alone don't carry enough topic information for good matches. Add titles or topics." },
  ],
  related: [
    { slug: "keyword-to-page-mapper", text: "Decide which page owns each keyword." },
    { slug: "seo-keyword-cluster-generator", text: "Group keywords into topics." },
    { slug: "xml-sitemap-generator", text: "Build a sitemap from the same page list." },
  ],
  cta: { heading: "Want a site structure", accent: "that ranks?", copy: "I plan internal linking and content architecture for SaaS sites.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Find relevant internal link ideas from your page titles and topics, with anchor themes to review.", cta: "Find internal links" },
  sources: [],
} satisfies NewToolContent;
