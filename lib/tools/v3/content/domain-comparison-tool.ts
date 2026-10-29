import type { NewToolContent } from "../content-types";

export default {
  slug: "domain-comparison-tool",
  name: "Domain Comparison Tool",
  keyword: "domain comparison tool",
  metaTitle: "Domain Comparison Tool (100% FREE)",
  metaDescription: "Domain comparison tool that puts the organic search metrics of 2 to 4 domains side by side, from the same source and market, without inventing a combined score.",
  lede: "This domain comparison tool puts the organic search metrics of two to four domains side by side. Every column comes from the same source, market and check time, and there's no made up overall score.",
  sub: "Compare domain metrics side by side.",
  trust: "Free, no signup. Each check sends the domains to a paid data source. Nothing is stored.",
  steps: [{ title: "Choose what to check", text: "Enter two to four domains and choose a country." }, { title: "Read the returned information", text: "Compare estimated organic visits and how each domain's rankings are spread." }, { title: "Use the result", text: "Pick a follow up question to investigate rather than a winner." }],
  examples: {
    heading: "Examples,",
    accent: "and what they mean.",
    intro: "Illustrative. Real results depend on what the data source returns on the day.",
    items: [
      { title: "Two local competitors", input: "Two service businesses in one city.", output: "One has more ranking keywords, the other more in position 1.", why: "Look at which pages earn those top positions." },
      { title: "A market leader", input: "Your domain next to the biggest player.", output: "A large gap in estimated visits.", why: "Compare a narrower topic instead of the whole site." },
      { title: "A new site", input: "A recently launched domain.", output: "No data in its column.", why: "The source has too little data yet." },
    ],
  },
  guidance: {
    heading: "Your results,",
    accent: "explained.",
    items: [
      { title: "Fair by design", text: "Each domain uses the same metrics, market, source and check time. Missing data stays blank instead of becoming zero." },
      { title: "No combined score", text: "Visits, ranking counts and positions measure different things, so they aren't averaged into one number." },
      { title: "What this tool can't tell you", text: "Backlink metrics aren't included, and the figures don't explain why one site outranks another." },
      { title: "What to do next", text: "Choose the metric that answers your question and inspect the actual pages behind it." },
    ],
  },
  faqs: [
    { q: "Can I compare DR and DA here?", a: "No. Those are other providers' scores and aren't included or interchangeable." },
    { q: "What does a domain comparison tell me?", a: "It gives context about search visibility, not a verdict on site quality." },
    { q: "Can I compare competitors in different countries?", a: "Run one check per country. Each check uses one market for every domain." },
    { q: "Why is a value missing?", a: "The source doesn't have data for that domain in that market." },
    { q: "Are backlinks included?", a: "Not yet. Only organic search metrics are compared." },
    { q: "Is there a limit?", a: "Yes. This tool uses a paid data source with a monthly cap, and each visitor gets a few checks a day. If the cap is reached, the tool says so and when it renews." },
  ],
  related: [
    { slug: "website-traffic-checker", text: "Check one domain in detail." },
    { slug: "seo-competitor-finder", text: "Find who to compare with." },
    { slug: "competitor-keyword-gap", text: "See the keywords behind the gap." },
  ],
  cta: { heading: "Want help turning data into decisions?", accent: "Let's talk.", copy: "I use this kind of research to decide what to fix, write and build first.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Compare the organic search metrics of 2 to 4 domains side by side.", cta: "Compare domains" },
  sources: [{ label: "DataForSEO and Serper API documentation", url: "https://docs.dataforseo.com/v3/", checked: "October 2026" }],
} satisfies NewToolContent;
