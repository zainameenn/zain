import type { NewToolContent } from "../content-types";

export default {
  slug: "people-also-ask-tool",
  name: "People Also Ask Tool",
  keyword: "people also ask tool",
  metaTitle: "People Also Ask Tool (100% FREE)",
  metaDescription: "People Also Ask tool that shows the questions Google displays for a keyword in a chosen country, taken from a live results page, with the page answering each.",
  lede: "This people also ask tool shows the People Also Ask questions Google displays for a keyword in the country you choose. Use real search result questions to see what people want clarified.",
  sub: "Find the questions appearing in search results.",
  trust: "Free, no signup. Each check makes one live Google results request through a paid data source. Nothing is stored.",
  steps: [{ title: "Choose what to check", text: "Enter a search term and choose a country." }, { title: "Read the returned information", text: "Review the observed questions and the pages Google used to answer them." }, { title: "Use the result", text: "Group related questions into helpful answers or supporting guides." }],
  examples: {
    heading: "Examples,",
    accent: "and what they mean.",
    intro: "Illustrative. Real results depend on what the data source returns on the day.",
    items: [
      { title: "A process question", input: "\"how to set up employee scheduling\".", output: "Questions about rotating shifts, templates and tools.", why: "Group them by task before deciding where answers belong." },
      { title: "A definition", input: "\"what is churn rate\".", output: "Questions about calculation, good benchmarks and causes.", why: "One clear guide can answer most of them." },
      { title: "No box", input: "A very niche phrase.", output: "No People Also Ask box in this sample.", why: "Not every query shows the box. Nothing is invented to fill the gap." },
    ],
  },
  guidance: {
    heading: "Your results,",
    accent: "explained.",
    items: [
      { title: "Observed, not generated", text: "Every question shown was in the sampled results page. The tool never adds AI written questions." },
      { title: "Not a complete list", text: "The box is one set of questions Google chose to show, not everything people search. It varies by location and time." },
      { title: "What this tool can't tell you", text: "A question in the box doesn't come with a search volume, and answering it doesn't guarantee a place in the box." },
      { title: "What to do next", text: "Organise the questions by intent and answer the ones that help your readers complete the task." },
    ],
  },
  faqs: [
    { q: "What is People Also Ask on Google?", a: "A search feature showing related questions with expandable answers on some results pages." },
    { q: "Are PAA questions the same as keywords with search volume?", a: "No. A question can appear in the box without a verified monthly volume." },
    { q: "Will answering a PAA question get me featured?", a: "There's no guarantee. Write clear, accurate answers because they help readers." },
    { q: "Why does the tool show no questions?", a: "The sampled results didn't include the box for that query, location or time." },
    { q: "Where do the answer pages come from?", a: "They're the pages Google showed under each question in the sample." },
    { q: "Is there a limit?", a: "Yes. This tool uses a paid data source with a monthly cap, and each visitor gets a few checks a day. If the cap is reached, the tool says so and when it renews." },
  ],
  related: [
    { slug: "seo-question-generator", text: "Find more question style searches." },
    { slug: "seo-content-brief-generator", text: "Turn the questions into a brief." },
    { slug: "serp-checker", text: "See the full results page." },
  ],
  cta: { heading: "Want help turning data into decisions?", accent: "Let's talk.", copy: "I use this kind of research to decide what to fix, write and build first.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "See the People Also Ask questions Google shows for a keyword.", cta: "Find search questions" },
  sources: [{ label: "DataForSEO and Serper API documentation", url: "https://docs.dataforseo.com/v3/", checked: "October 2026" }],
} satisfies NewToolContent;
