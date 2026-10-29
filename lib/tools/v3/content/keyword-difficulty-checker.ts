import type { NewToolContent } from "../content-types";

export default {
  slug: "keyword-difficulty-checker",
  name: "Keyword Difficulty Checker",
  keyword: "keyword difficulty checker",
  metaTitle: "Keyword Difficulty Checker (100% FREE)",
  metaDescription: "Keyword difficulty checker that shows a sourced 0 to 100 organic difficulty estimate for up to 20 keywords, with volume and intent, and explains its limits.",
  lede: "This keyword difficulty checker shows a sourced estimate of how hard it may be to rank organically for each keyword. Read it next to the actual results page to see why a keyword could be challenging.",
  sub: "Understand how competitive a keyword may be.",
  trust: "Free, no signup. Each check sends your keywords to a paid data source. Nothing is stored.",
  steps: [{ title: "Choose what to check", text: "Paste up to 20 keywords and choose a country." }, { title: "Read the returned information", text: "Read each difficulty estimate with its volume and main intent." }, { title: "Use the result", text: "Decide whether you can make a genuinely useful competing page." }],
  examples: {
    heading: "Examples,",
    accent: "and what they mean.",
    intro: "Illustrative. Real results depend on what the data source returns on the day.",
    items: [
      { title: "A head term", input: "\"project management software\".", output: "High difficulty.", why: "A narrower angle may be a more realistic place to start." },
      { title: "A niche term", input: "\"project management for architects\".", output: "Lower difficulty, smaller volume.", why: "Worth it if you can genuinely serve that audience." },
      { title: "No estimate", input: "A rare phrase.", output: "No data.", why: "The source has no estimate for it. Check the results page instead." },
    ],
  },
  guidance: {
    heading: "Your results,",
    accent: "explained.",
    items: [
      { title: "One provider's estimate", text: "Difficulty here is DataForSEO's 0 to 100 estimate. It isn't a Google score, and other tools' numbers aren't on the same scale." },
      { title: "Not ad competition", text: "Google Ads competition describes paid advertising, not organic ranking difficulty." },
      { title: "What this tool can't tell you", text: "A single number hides competitor quality, search intent and how good your page could be." },
      { title: "What to do next", text: "Inspect the actual ranking pages before choosing a keyword. Relevance comes before any difficulty score." },
    ],
  },
  faqs: [
    { q: "What is keyword difficulty?", a: "A provider specific estimate of how challenging it may be to rank organically for a query." },
    { q: "Does low difficulty guarantee an easy ranking?", a: "No. It can't account for every difference between your page, competitors and search intent." },
    { q: "Is Google Ads competition an SEO difficulty score?", a: "No. It describes paid advertising and is labelled separately." },
    { q: "Should I avoid all high difficulty keywords?", a: "Not necessarily. Some harder topics are worth building toward over time." },
    { q: "Why does this differ from Ahrefs or Semrush?", a: "Each tool calculates difficulty its own way, so the numbers aren't interchangeable." },
    { q: "Is there a limit?", a: "Yes. This tool uses a paid data source with a monthly cap, and each visitor gets a few checks a day. If the cap is reached, the tool says so and when it renews." },
  ],
  related: [
    { slug: "keyword-search-volume-checker", text: "Check the volume behind each keyword." },
    { slug: "serp-checker", text: "Look at what actually ranks." },
    { slug: "seo-search-intent-classifier", text: "Check the intent first." },
  ],
  cta: { heading: "Want help turning data into decisions?", accent: "Let's talk.", copy: "I use this kind of research to decide what to fix, write and build first.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "See a sourced organic difficulty estimate for up to 20 keywords.", cta: "Check difficulty" },
  sources: [{ label: "DataForSEO and Serper API documentation", url: "https://docs.dataforseo.com/v3/", checked: "October 2026" }],
} satisfies NewToolContent;
