import type { NewToolContent } from "../content-types";

export default {
  slug: "keyword-trends-tool",
  name: "Keyword Trends Tool",
  keyword: "keyword trends tool",
  metaTitle: "Keyword Trends Tool (100% FREE)",
  metaDescription: "Keyword trends tool that compares relative search interest for up to 5 keywords over the past 12 months by country, labelled clearly as interest, not volume.",
  lede: "This keyword trends tool compares how interest in up to five keywords changed over the past 12 months in the country you choose. Spot seasonal patterns without confusing a trend line with monthly searches.",
  sub: "Explore how interest in a keyword changes over time.",
  trust: "Free, no signup. Each check sends your keywords to a paid data source. Nothing is stored.",
  steps: [{ title: "Choose what to check", text: "Enter up to five keywords and choose a country." }, { title: "Read the returned information", text: "Read the 0 to 100 interest values month by month." }, { title: "Use the result", text: "Plan content timing without treating the values as search volume." }],
  examples: {
    heading: "Examples,",
    accent: "and what they mean.",
    intro: "Illustrative. Real results depend on what the data source returns on the day.",
    items: [
      { title: "A seasonal topic", input: "\"black friday deals\" and \"cyber monday deals\".", output: "Both peak in late November.", why: "Prepare pages well before the peak." },
      { title: "A steady topic", input: "\"accounting software\".", output: "Fairly flat all year.", why: "Timing matters less than quality here." },
      { title: "A rising topic", input: "A new product category.", output: "Values climbing month after month.", why: "Worth watching, but check real volumes before investing." },
    ],
  },
  guidance: {
    heading: "Your results,",
    accent: "explained.",
    items: [
      { title: "Relative, not absolute", text: "Values run from 0 to 100, where 100 is the peak within this comparison only. They aren't counts of searches." },
      { title: "Comparing keywords", text: "Keywords checked together share one scale, so you can compare them. Values from separate checks aren't comparable." },
      { title: "What this tool can't tell you", text: "A trend shows past interest. It doesn't guarantee next month's demand or tell you how many people search." },
      { title: "What to do next", text: "Use seasonal patterns to decide when to publish, and check real volumes with the Keyword Search Volume Checker." },
    ],
  },
  faqs: [
    { q: "Is Google Trends search volume?", a: "No. It's relative interest, not a count of monthly searches." },
    { q: "Can I compare two keywords?", a: "Yes. Up to five keywords are compared on one shared scale." },
    { q: "Why do trends differ between countries?", a: "Search behaviour and interest vary by location." },
    { q: "Can a trend predict next month's demand?", a: "A historical pattern helps with planning but doesn't guarantee what people will search." },
    { q: "Why one row per month?", a: "The data is weekly; each month shows its highest weekly value, so short peaks stay visible." },
    { q: "Is there a limit?", a: "Yes. This tool uses a paid data source with a monthly cap, and each visitor gets a few checks a day. If the cap is reached, the tool says so and when it renews." },
  ],
  related: [
    { slug: "keyword-search-volume-checker", text: "Check the actual volumes." },
    { slug: "keyword-research-tool", text: "Find related keyword ideas." },
    { slug: "seo-content-brief-generator", text: "Plan the seasonal page." },
  ],
  cta: { heading: "Want help turning data into decisions?", accent: "Let's talk.", copy: "I use this kind of research to decide what to fix, write and build first.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Compare relative search interest for up to 5 keywords over 12 months.", cta: "Explore trends" },
  sources: [{ label: "DataForSEO and Serper API documentation", url: "https://docs.dataforseo.com/v3/", checked: "October 2026" }],
} satisfies NewToolContent;
