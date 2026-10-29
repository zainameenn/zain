import type { NewToolContent } from "../content-types";

export default {
  slug: "competitor-keyword-gap",
  name: "Competitor Keyword Gap",
  keyword: "competitor keyword gap",
  metaTitle: "Competitor Keyword Gap (100% FREE)",
  metaDescription: "Competitor keyword gap tool that finds keywords a competitor ranks for and your domain doesn't, with volume, their position and ranking URL, in one market.",
  lede: "This competitor keyword gap tool compares your domain with a competitor and finds keywords they rank for that you don't. See their ranking page for each so you can decide what deserves content.",
  sub: "Find keywords competitors rank for that you may be missing.",
  trust: "Free, no signup. Each check sends both domains to a paid data source. Nothing is stored.",
  steps: [{ title: "Choose what to check", text: "Enter your domain, one competitor and a country." }, { title: "Read the returned information", text: "Review the missing keywords with the competitor's ranking URL." }, { title: "Use the result", text: "Update an existing page or plan a new topic only when it's justified." }],
  examples: {
    heading: "Examples,",
    accent: "and what they mean.",
    intro: "Illustrative. Real results depend on what the data source returns on the day.",
    items: [
      { title: "A missing topic", input: "Your invoicing app against a rival.", output: "They rank for \"invoice reminder email examples\".", why: "You may need a focused examples section or guide." },
      { title: "Branded terms", input: "Two SaaS products.", output: "Their brand name appears in the gap.", why: "Filter out navigational searches you can't serve." },
      { title: "Off topic gaps", input: "A competitor with a broader offer.", output: "Keywords about products you don't sell.", why: "A gap isn't automatically an opportunity." },
    ],
  },
  guidance: {
    heading: "Your results,",
    accent: "explained.",
    items: [
      { title: "Not every gap matters", text: "Filter out irrelevant topics, branded searches and phrases outside your offer." },
      { title: "Same source, same market", text: "Both domains are compared within one market and one database, so the comparison is fair." },
      { title: "What this tool can't tell you", text: "It shows where you're absent, not how hard each keyword is or whether your offer fits." },
      { title: "What to do next", text: "Open the competitor's page behind a gap and decide whether you need a clearer section, a refresh or a new page." },
    ],
  },
  faqs: [
    { q: "What is a keyword gap?", a: "A search query where a competitor has observed visibility and your domain doesn't, in the same dataset." },
    { q: "Should I create a new page for every missing keyword?", a: "No. Group terms by intent and improve existing pages where they already cover the topic." },
    { q: "Can I compare more than two domains?", a: "Not in this tool. One competitor at a time keeps the report clear." },
    { q: "How is this different from the Content Gap Planner?", a: "The planner organises research you already have. This one measures a ranking gap from real data." },
    { q: "Why are some gaps irrelevant?", a: "Competitors rank for things outside your offer. Filter those out." },
    { q: "Is there a limit?", a: "Yes. This tool uses a paid data source with a monthly cap, and each visitor gets a few checks a day. If the cap is reached, the tool says so and when it renews." },
  ],
  related: [
    { slug: "seo-competitor-finder", text: "Find which competitor to compare." },
    { slug: "seo-content-gap-planner", text: "Plan content for the gaps." },
    { slug: "keyword-difficulty-checker", text: "Check difficulty for the gaps you keep." },
  ],
  cta: { heading: "Want help turning data into decisions?", accent: "Let's talk.", copy: "I use this kind of research to decide what to fix, write and build first.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Find keywords a competitor ranks for that your domain doesn't.", cta: "Find keyword gaps" },
  sources: [{ label: "DataForSEO and Serper API documentation", url: "https://docs.dataforseo.com/v3/", checked: "October 2026" }],
} satisfies NewToolContent;
