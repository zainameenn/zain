import type { NewToolContent } from "../content-types";

export default {
  slug: "seo-question-generator",
  name: "SEO Question Generator",
  keyword: "seo question generator",
  metaTitle: "SEO Question Generator (100% FREE)",
  metaDescription: "SEO question generator that finds real question style search suggestions for your topic, so you can plan answers people are actually looking for.",
  lede: "This SEO question generator finds question style search suggestions for your topic. Use the list to improve an existing page, plan a helpful guide, or spot the next thing your readers need.",
  sub: "Find the questions worth answering about your topic.",
  trust: "Free, no signup. Each run makes one request to Brave Search suggestions. Nothing you enter is stored.",
  steps: [
    { title: "Choose what to check", text: "Enter your topic and pick a question word such as how, what or why." },
    { title: "Read the returned information", text: "Review the question suggestions the source returned for that country." },
    { title: "Use the result", text: "Choose the questions your page can answer usefully, then copy or download them." },
  ],
  examples: {
    heading: "Question research,",
    accent: "and how to use it.",
    intro: "Illustrative. Results depend on what the suggestion source returns on the day.",
    items: [
      { title: "A guide topic", input: "\"keyword research\" with \"how\".", output: "How style questions about choosing seeds, checking volume and matching intent.", why: "Group them into one useful guide rather than four thin articles." },
      { title: "A buying question", input: "\"crm\" with \"which\".", output: "Which style questions comparing options.", why: "Comparison questions often need a comparison page." },
      { title: "No questions returned", input: "A very specific phrase with \"why\".", output: "No question style suggestions.", why: "Try another question word or a broader topic. The tool never fills the gap with invented questions." },
    ],
  },
  guidance: {
    heading: "Your results,",
    accent: "explained.",
    items: [
      { title: "Observed, not generated", text: "Every question shown was returned by the suggestion source. This tool doesn't invent questions or present AI ideas as searches." },
      { title: "Group by task", text: "Not every question deserves its own page. People ask for definitions, comparisons, processes, examples and fixes. Group related questions around the task someone wants to complete." },
      { title: "What this tool can't tell you", text: "A suggestion shows a question is suggested, not how many people ask it. It's also not the same as Google's People Also Ask box." },
      { title: "What to do next", text: "Turn the selected questions into clear answers with real examples. Avoid a long FAQ that repeats itself." },
    ],
  },
  faqs: [
    { q: "Where do the questions come from?", a: "From Brave Search suggestions for your query and country. The source and check time are shown with every result." },
    { q: "Are all these questions searched on Google?", a: "Not necessarily. They're suggestions from Brave Search, which is good evidence of real phrasing but not a Google measurement." },
    { q: "How many questions should I answer on one page?", a: "Answer the ones that genuinely help someone complete the main task. Don't add unrelated FAQs just for keywords." },
    { q: "Can I export the question list?", a: "Yes. Copy all, copy selected questions, or download a CSV with the source and date." },
    { q: "Why do I only see questions starting with my question word?", a: "Each run asks the source for suggestions that begin with that word, so you get question shaped results. Try a few words to cover more." },
    { q: "Is there a limit?", a: "Yes. The free suggestion source has a monthly allowance, and each visitor gets a few checks a day. If the allowance runs out, the tool says so and when it renews." },
  ],
  related: [
    { slug: "long-tail-keyword-generator", text: "Find longer keyword variations." },
    { slug: "seo-content-brief-generator", text: "Turn the questions into a brief." },
    { slug: "seo-keyword-cluster-generator", text: "Group related questions." },
  ],
  cta: { heading: "Want content that answers real questions?", accent: "Let's plan it.", copy: "I build content plans around what customers actually ask, not keyword lists.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Find real question style search suggestions for your topic.", cta: "Find questions" },
  sources: [{ label: "Brave Search API", url: "https://api-dashboard.search.brave.com/app/documentation/suggest/get-started", checked: "October 2026" }],
} satisfies NewToolContent;
