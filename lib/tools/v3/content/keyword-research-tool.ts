import type { NewToolContent } from "../content-types";

export default {
  slug: "keyword-research-tool",
  name: "Keyword Research Tool",
  keyword: "keyword research tool",
  metaTitle: "Keyword Research Tool (100% FREE)",
  metaDescription: "Keyword research tool that finds up to 50 related keywords for a seed, with sourced volume, difficulty, CPC and intent where available, ready to export.",
  lede: "This keyword research tool finds related keywords for a topic in the country you choose. Start with a seed and get ideas with sourced volume, difficulty and intent, with no made up numbers.",
  sub: "Find keywords people actually search for.",
  trust: "Free, no signup. Each check sends your seed keyword to a paid data source. Nothing is stored.",
  steps: [{ title: "Choose what to check", text: "Enter a seed keyword and choose a country." }, { title: "Read the returned information", text: "Review the ideas and group them by search intent." }, { title: "Use the result", text: "Export the relevant ideas or move them into the Keyword Cluster Generator." }],
  examples: {
    heading: "Examples,",
    accent: "and what they mean.",
    intro: "Illustrative. Real results depend on what the data source returns on the day.",
    items: [
      { title: "A SaaS category", input: "\"appointment scheduling software\".", output: "Ideas about pricing, industries, integrations and alternatives.", why: "Group close variations around one useful page." },
      { title: "A service", input: "\"bookkeeping services\".", output: "Local and pricing variations.", why: "Decide which deserve their own page and which belong together." },
      { title: "A small niche", input: "A very specific seed.", output: "Only a few ideas.", why: "Try a broader seed." },
    ],
  },
  guidance: {
    heading: "Your results,",
    accent: "explained.",
    items: [
      { title: "Ideas with real numbers", text: "Each idea contains your seed and is sorted by estimated volume. Metrics appear only when the source has them; blank means no data." },
      { title: "Relevance before volume", text: "Compare relevance and intent before prioritising volume. A smaller keyword that matches your offer is often worth more." },
      { title: "What this tool can't tell you", text: "It shows ideas containing your seed, not every possible related search, and it doesn't research competitor websites." },
      { title: "What to do next", text: "Group the most relevant ideas by intent, then decide which belong together on one page." },
    ],
  },
  faqs: [
    { q: "Can I research keywords from a website?", a: "Not in this tool. Use the Organic Keywords Finder to see what a domain already ranks for." },
    { q: "Are these the same as autocomplete suggestions?", a: "No. These come with sourced metrics. Use the Long Tail Keyword Generator for suggestion style ideas." },
    { q: "How do I find long tail keywords?", a: "Look for ideas with specific use cases, audiences and problems. Longer doesn't always mean easier." },
    { q: "How many keywords should one page target?", a: "Build each page around one clear intent, with natural variations that serve that same intent." },
    { q: "Can I export the ideas?", a: "Yes. Download the table as a CSV with the source and date." },
    { q: "Is there a limit?", a: "Yes. This tool uses a paid data source with a monthly cap, and each visitor gets a few checks a day. If the cap is reached, the tool says so and when it renews." },
  ],
  related: [
    { slug: "seo-keyword-cluster-generator", text: "Group your ideas into pages." },
    { slug: "keyword-to-page-mapper", text: "Map keywords to pages." },
    { slug: "keyword-difficulty-checker", text: "Check difficulty for a shortlist." },
  ],
  cta: { heading: "Want help turning data into decisions?", accent: "Let's talk.", copy: "I use this kind of research to decide what to fix, write and build first.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Find related keywords for a seed with sourced volume, difficulty and intent.", cta: "Find keyword ideas" },
  sources: [{ label: "DataForSEO and Serper API documentation", url: "https://docs.dataforseo.com/v3/", checked: "October 2026" }],
} satisfies NewToolContent;
