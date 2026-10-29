import type { NewToolContent } from "../content-types";

export default {
  slug: "ai-overview-checker",
  name: "AI Overview Checker",
  keyword: "ai overview checker",
  metaTitle: "AI Overview Checker (100% FREE)",
  metaDescription: "AI Overview checker that shows whether Google displayed an AI Overview for a query in a chosen country, with the cited sources and the check time.",
  lede: "This AI Overview checker shows whether Google displayed an AI Overview for a query in the country you choose. See the pages it cited, with the date, so you know what was actually observed.",
  sub: "Check whether an AI Overview appears for a query.",
  trust: "Free, no signup. Each check makes a live Google results request through a data source with a small monthly allowance. Nothing is stored.",
  steps: [{ title: "Choose what to check", text: "Enter a keyword and choose a country." }, { title: "Read the returned information", text: "See whether an AI Overview appeared and which pages it cited." }, { title: "Use the result", text: "Repeat comparable checks over time if variability matters to your research." }],
  examples: {
    heading: "Examples,",
    accent: "and what they mean.",
    intro: "Illustrative. Real results depend on what the data source returns on the day.",
    items: [
      { title: "An informational question", input: "\"what is a good churn rate for saas\".", output: "AI Overview present, with five cited pages.", why: "See which kinds of sources Google chose to cite." },
      { title: "A brand search", input: "A company name.", output: "No AI Overview in this sample.", why: "Navigational searches often don't get one." },
      { title: "The same query a week later", input: "A repeated check.", output: "Different citations.", why: "AI answers change, so one check is a snapshot." },
    ],
  },
  guidance: {
    heading: "Your results,",
    accent: "explained.",
    items: [
      { title: "One dated observation", text: "An overview can appear in one check and not the next. The result is labelled with the market and check time." },
      { title: "Presence versus citation", text: "Whether an overview appears and whether your page is cited are different questions. Both are shown separately." },
      { title: "What this tool can't tell you", text: "No tool can force inclusion or predict future overviews. Not present here doesn't mean Google never shows one." },
      { title: "What to do next", text: "Read the cited pages and make sure your own page answers the question clearly and accurately." },
    ],
  },
  faqs: [
    { q: "Does every Google search have an AI Overview?", a: "No. Google shows them selectively." },
    { q: "Can I force my website into an AI Overview?", a: "No. Google applies its normal quality systems and doesn't guarantee inclusion." },
    { q: "Is an AI Overview citation the same as ranking first?", a: "No. It's a separate presentation and is tracked separately." },
    { q: "Why did the result change between checks?", a: "AI answers vary with time, wording and location." },
    { q: "Where does the data come from?", a: "From a live Google results page retrieved through SerpApi." },
    { q: "Is there a limit?", a: "Yes. This tool uses a paid data source with a monthly cap, and each visitor gets a few checks a day. If the cap is reached, the tool says so and when it renews." },
  ],
  related: [
    { slug: "serp-features-checker", text: "See every result type on the page." },
    { slug: "serp-checker", text: "See the organic results too." },
    { slug: "people-also-ask-tool", text: "See the questions Google shows." },
  ],
  cta: { heading: "Want help turning data into decisions?", accent: "Let's talk.", copy: "I use this kind of research to decide what to fix, write and build first.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "See whether Google showed an AI Overview for a query, and what it cited.", cta: "Check AI Overview" },
  sources: [{ label: "DataForSEO and Serper API documentation", url: "https://docs.dataforseo.com/v3/", checked: "October 2026" }],
} satisfies NewToolContent;
