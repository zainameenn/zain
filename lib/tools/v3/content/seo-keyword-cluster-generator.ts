import type { NewToolContent } from "../content-types";

export default {
  slug: "seo-keyword-cluster-generator",
  name: "SEO Keyword Cluster Generator",
  keyword: "seo keyword cluster generator",
  metaTitle: "SEO Keyword Cluster Generator (100% FREE)",
  metaDescription: "Group your keyword list into related topics and suggested page types. Review clusters, spot overlapping queries, and download your results as CSV.",
  lede: "This SEO keyword cluster generator groups similar searches into topics, so you can see which terms might belong on the same page and export the plan.",
  sub: "Turn a messy keyword list into a clearer content plan.",
  trust: "Free, no signup. Similar wording runs in your browser. Topic + intent mode sends your keywords to an AI provider and doesn't store them.",
  steps: [
    { title: "Paste a list of keywords", text: "One per line, or a cleaned export from your research tool. Volumes after a tab or comma are kept." },
    { title: "Choose grouping depth", text: "Similar wording is instant. AI considers meaning and what the searcher wants to do." },
    { title: "Review each cluster", text: "Rename clusters, move keywords around, and decide whether one page can really answer them." },
  ],
  examples: {
    heading: "Clusters,",
    accent: "from a real looking list.",
    intro: "Illustrative grouping. It doesn't imply rankings or search volume.",
    items: [
      { title: "Etsy seller fees", input: "etsy listing fee, how much does etsy charge per listing, etsy transaction fee, etsy fees calculator", output: "One cluster: Etsy seller fees. Primary: etsy fees calculator.", why: "Same need, even though the page type behind each query can vary." },
      { title: "Etsy shop naming", input: "how to name an etsy shop, etsy shop name ideas", output: "A separate cluster: Etsy shop naming.", why: "A different topic entirely, so it gets its own page." },
      { title: "Where wording misleads", input: "how to price handmade jewelry, buy gold earrings", output: "Two different clusters in AI mode.", why: "Similar subject, different intent: one wants a guide, the other a product page." },
    ],
  },
  guidance: {
    heading: "Clustering",
    accent: "done carefully.",
    items: [
      { title: "What is keyword clustering?", text: "Grouping related searches so you plan pages around topics and searcher needs, instead of one page per phrase. \"How to price handmade jewelry\" and \"handmade jewelry pricing formula\" may share an educational page. \"Buy gold earrings\" wants something else, likely a product or category page. Group by the task, not just shared words." },
      { title: "Word matching, AI grouping and SERP clustering", text: "Word matching looks for shared meaningful words. It's fast and transparent but misses synonyms and can lump different intents together. AI grouping reasons about meaning, but can be wrong or overconfident. SERP overlap clustering compares the actual results for each query and needs live search data. **This tool doesn't check live Google results.**" },
      { title: "Don't make one page per keyword", text: "Several long tail phrases often describe one need, and thin pages for each create duplication. The opposite mistake is cramming different intents onto one page. Treat clusters as a planning aid: search a few representative queries, look at the kinds of pages ranking, and adjust." },
    ],
  },
  faqs: [
    { q: "What is a keyword cluster?", a: "A group of related searches that one page or section can serve well. Good clusters share a user need, not just a word." },
    { q: "Can I paste keywords from Ahrefs or Semrush?", a: "Yes. Paste plain text or columns copied from an export. If a volume follows the keyword after a tab or comma, it's kept and used to pick the primary keyword, and labelled as your data." },
    { q: "Does this tool check live Google results?", a: "No. It uses wording, and AI if you choose it. True SERP overlap grouping needs live result data, which this tool doesn't have." },
    { q: "What's the difference between keyword grouping and clustering?", a: "People use them interchangeably. Basic grouping usually matches shared words; clustering can also consider meaning, intent or SERP overlap." },
    { q: "How many keywords should belong in one cluster?", a: "As many as one well built page can reasonably answer. A small cluster can be right, and a very big one may need splitting." },
    { q: "Should every cluster become a separate page?", a: "No. Check whether the topic deserves a new page, would strengthen an existing one, or fits as a section of another page." },
    { q: "How do I choose the primary keyword?", a: "Pick the query that best represents the page's main need, considering verified demand and business relevance. Without real volume data, don't assume the shortest or longest keyword is best." },
    { q: "Can this tool estimate search volume or difficulty?", a: "No. It never invents search volume, CPC or difficulty. Any volume you see is the number you pasted." },
    { q: "Can AI clustering replace SERP research?", a: "No. It's a useful first pass, but check real search results yourself, especially for ambiguous or commercial queries." },
  ],
  related: [
    { slug: "seo-search-intent-classifier", text: "Check the intent of each keyword." },
    { slug: "seo-title-generator", text: "Write the title for each page." },
    { slug: "meta-description-generator", text: "Write the meta description." },
    { slug: "marketing-plan-generator", text: "Turn clusters into a plan." },
  ],
  cta: { heading: "Want the content plan", accent: "done for you?", copy: "I plan and write SEO content that ranks on Google and shows up in AI answers.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Group a keyword list into topics and page types, move keywords around, and export the plan as CSV.", cta: "Cluster keywords" },
  sources: [
    { label: "Keyword clustering tool (competitor reference)", url: "https://meelu.tech/tools/keyword-clustering-tool", checked: "October 2026" },
    { label: "Keyword grouper (competitor reference)", url: "https://joinsignalforge.com/tools/keyword-grouper", checked: "October 2026" },
  ],
} satisfies NewToolContent;
