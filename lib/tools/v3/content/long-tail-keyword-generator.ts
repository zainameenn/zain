import type { NewToolContent } from "../content-types";

export default {
  slug: "long-tail-keyword-generator",
  name: "Long Tail Keyword Generator",
  keyword: "long tail keyword generator",
  metaTitle: "Long Tail Keyword Generator (100% FREE)",
  metaDescription: "Long tail keyword generator that turns a broad topic into longer, more specific search suggestions from a real source, without inventing volumes or difficulty.",
  lede: "This long tail keyword generator turns a broad topic into longer, more focused search suggestions. Add a modifier, choose a country, then copy the phrases you want to investigate.",
  sub: "Turn a broad topic into more specific keyword ideas.",
  trust: "Free, no signup. Each run makes one request to Brave Search suggestions. Nothing you enter is stored.",
  steps: [
    { title: "Choose what to check", text: "Enter a broad topic, and optionally a modifier and country." },
    { title: "Read the returned information", text: "Compare the longer suggestions by problem, modifier and intent." },
    { title: "Use the result", text: "Copy the relevant phrases into your keyword clustering workflow." },
  ],
  examples: {
    heading: "Long tail ideas,",
    accent: "and how to read them.",
    intro: "Illustrative. Results depend on what the suggestion source returns on the day.",
    items: [
      { title: "A software category", input: "\"time tracking software\" with the modifier \"for\".", output: "Longer suggestions naming specific teams or industries.", why: "Each audience variant may deserve a section or a page, depending on intent." },
      { title: "A comparison angle", input: "\"project management tool\" with \"alternative\".", output: "Suggestions naming specific alternatives.", why: "Comparison intent usually needs a comparison page, not a product page." },
      { title: "Nothing longer came back", input: "A very niche phrase.", output: "No longer phrases returned.", why: "Try a broader topic. Few suggestions doesn't mean nobody searches for it." },
    ],
  },
  guidance: {
    heading: "Your results,",
    accent: "explained.",
    items: [
      { title: "Suggestions aren't volumes", text: "Suggestions are phrases returned by a suggestion source, not verified search volume or difficulty. Some longer phrases are very competitive; others have little demand. Check intent and the real results page before choosing a target." },
      { title: "Specific beats long", text: "A long tail keyword expresses a narrower need, but word count isn't the point. Look for modifiers such as \"for teams\", \"pricing\", \"without\" and \"alternative\" that describe a real job someone wants done." },
      { title: "What this tool can't tell you", text: "It shows what Brave Search suggests for your query and country. It doesn't add made up variations, volumes or difficulty scores." },
      { title: "What to do next", text: "Cluster close variations before opening new pages. A specific phrase doesn't always need its own URL." },
    ],
  },
  faqs: [
    { q: "How long is a long tail keyword?", a: "It's usually a more specific search phrase. Specificity and intent matter more than an exact word count." },
    { q: "Are long tail keywords always easy to rank for?", a: "No. Competitive niche terms can still be hard, and low competition never guarantees a ranking." },
    { q: "Do the suggestions have search volume?", a: "No. They show a phrase is suggested, not how often it's searched. Use a volume source if you need that number." },
    { q: "Should every variation become a page?", a: "No. Combine variations that share intent, and create separate pages only for genuinely different needs." },
    { q: "Which country are the suggestions for?", a: "The country you pick. Suggestions can differ a lot between markets." },
    { q: "Is there a limit?", a: "Yes. The free suggestion source has a monthly allowance, and each visitor gets a few checks a day. If the allowance runs out, the tool says so and when it renews." },
  ],
  related: [
    { slug: "seo-question-generator", text: "Find question style searches too." },
    { slug: "seo-keyword-cluster-generator", text: "Group the phrases you picked." },
    { slug: "seo-search-intent-classifier", text: "Check what each phrase is looking for." },
  ],
  cta: { heading: "Too many keyword ideas?", accent: "Let's pick the right ones.", copy: "I turn keyword research into a content plan built around what your customers actually need.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Turn a broad topic into longer, more specific search suggestions from a real source.", cta: "Find long tail keywords" },
  sources: [{ label: "Brave Search API", url: "https://api-dashboard.search.brave.com/app/documentation/suggest/get-started", checked: "October 2026" }],
} satisfies NewToolContent;
