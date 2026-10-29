import type { NewToolContent } from "../content-types";

export default {
  slug: "local-serp-checker",
  name: "Local SERP Checker",
  keyword: "local serp checker",
  metaTitle: "Local SERP Checker (100% FREE)",
  metaDescription: "Local SERP checker that shows map listings and website results for a search in a chosen city, listed and numbered separately, from a live Google sample.",
  lede: "This local SERP checker shows what a customer could see when they search in a specific city. See map listings and ordinary website results side by side, numbered separately.",
  sub: "Check local search results in your target area.",
  trust: "Free, no signup. Each check makes two live requests (web and Maps) through a paid data source. Nothing is stored.",
  steps: [{ title: "Choose what to check", text: "Enter a local search phrase and a city." }, { title: "Read the returned information", text: "Compare map listings and website results, which are ranked separately." }, { title: "Use the result", text: "Review local relevance before changing location pages." }],
  examples: {
    heading: "Examples,",
    accent: "and what they mean.",
    intro: "Illustrative. Real results depend on what the data source returns on the day.",
    items: [
      { title: "A trade in one city", input: "\"emergency plumber\" in Austin, Texas.", output: "Ten map listings and ten websites.", why: "Check whether your service pages clearly describe the areas you serve." },
      { title: "A competitor's area", input: "The same search in a neighbouring city.", output: "Different map listings.", why: "Local results depend heavily on where the search happens." },
      { title: "A service you don't offer there", input: "A city outside your area.", output: "You don't appear.", why: "Don't add city names for places you don't actually serve." },
    ],
  },
  guidance: {
    heading: "Your results,",
    accent: "explained.",
    items: [
      { title: "Two different rankings", text: "A map listing position and a website position are separate observations, so they're numbered separately." },
      { title: "One location, one sample", text: "Results change a few streets away. One city check isn't a substitute for a full geo grid campaign." },
      { title: "What this tool can't tell you", text: "It doesn't measure a business's distance from every searcher or guarantee where someone will see it." },
      { title: "What to do next", text: "Improve genuinely relevant location information on your pages and keep your Business Profile accurate." },
    ],
  },
  faqs: [
    { q: "Can I check rankings for a city instead of a country?", a: "Yes. Enter the city; the result shows the location used." },
    { q: "What's the difference between a local pack and organic results?", a: "The local pack shows business listings from Maps. Organic results are ordinary webpages, measured separately." },
    { q: "Why do local rankings change a few streets away?", a: "Proximity, relevance and prominence all influence local results." },
    { q: "Does appearing in the local pack guarantee calls?", a: "No. Visibility is one step; accurate details and good service still matter." },
    { q: "Are ratings shown?", a: "Yes, when Maps returns them for a listing." },
    { q: "Is there a limit?", a: "Yes. This tool uses a paid data source with a monthly cap, and each visitor gets a few checks a day. If the cap is reached, the tool says so and when it renews." },
  ],
  related: [
    { slug: "local-seo-keyword-modifier-generator", text: "Find local keyword variations." },
    { slug: "local-business-schema-generator", text: "Add local business structured data." },
    { slug: "serp-checker", text: "Check national results too." },
  ],
  cta: { heading: "Want help turning data into decisions?", accent: "Let's talk.", copy: "I use this kind of research to decide what to fix, write and build first.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "See map listings and website results for a search in a chosen city.", cta: "Check local results" },
  sources: [{ label: "DataForSEO and Serper API documentation", url: "https://docs.dataforseo.com/v3/", checked: "October 2026" }],
} satisfies NewToolContent;
