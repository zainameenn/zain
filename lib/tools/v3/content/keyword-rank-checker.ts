import type { NewToolContent } from "../content-types";

export default {
  slug: "keyword-rank-checker",
  name: "Keyword Rank Checker",
  keyword: "keyword rank checker",
  metaTitle: "Keyword Rank Checker (100% FREE)",
  metaDescription: "Keyword rank checker that finds where a domain appears in the top 30 Google results for a keyword, with the ranking URL, depth searched and check time.",
  lede: "This keyword rank checker finds where your website appears in Google for a keyword. See the matching URL, its position in the top 30 and the market and device it was checked in.",
  sub: "Find your website's ranking for a keyword.",
  trust: "Free, no signup. Each check searches up to the top 30 Google results through a paid data source. Nothing is stored.",
  steps: [{ title: "Choose what to check", text: "Enter the keyword, your domain, a country and a device." }, { title: "Read the returned information", text: "See the ranking URL and position, or how deep the search went." }, { title: "Use the result", text: "Compare like for like checks over time, or with your Search Console history." }],
  examples: {
    heading: "Examples,",
    accent: "and what they mean.",
    intro: "Illustrative. Real results depend on what the data source returns on the day.",
    items: [
      { title: "The wrong page ranks", input: "A guide about invoice reminders, checked in the UK.", output: "The pricing page ranks at 18 instead of the guide.", why: "Look at intent and internal links before rewriting titles." },
      { title: "Not in the top 30", input: "A new page checked a week after launch.", output: "Not found in the first 30 results.", why: "It may be too new, or not indexed yet. This check can't tell which." },
      { title: "Mobile versus desktop", input: "The same keyword checked on both devices.", output: "Position 7 on desktop, 9 on mobile.", why: "Small differences between devices are normal." },
    ],
  },
  guidance: {
    heading: "Your results,",
    accent: "explained.",
    items: [
      { title: "Read the depth and market", text: "Always read the depth searched and the market beside the result. Not found in the first 30 results is not the same as not indexed." },
      { title: "Different from Search Console", text: "Search Console average position is a historical average over many impressions. This is a single point in time snapshot." },
      { title: "What this tool can't tell you", text: "It doesn't predict tomorrow's ranking and doesn't explain why a page ranks where it does." },
      { title: "What to do next", text: "If the wrong URL appears, check the page's intent and internal links before changing titles or adding another page." },
    ],
  },
  faqs: [
    { q: "Can I check my ranking without Search Console?", a: "Yes. This tool checks live Google results. For your own site, Search Console adds first party performance data." },
    { q: "Why am I not found in the top 30?", a: "Your page may rank lower, not rank for that query, or be missing from that particular snapshot. It doesn't prove an indexing problem." },
    { q: "Why did my ranking change today?", a: "Positions shift with location, device, competing pages and search system updates. Compare equivalent checks." },
    { q: "Can I check mobile and desktop rankings?", a: "Yes. Switch the device and compare the two observations separately." },
    { q: "Does it count subdomains?", a: "Yes. Results on subdomains of the domain you enter count as a match." },
    { q: "Is there a limit?", a: "Yes. This tool uses a paid data source with a monthly cap, and each visitor gets a few checks a day. If the cap is reached, the tool says so and when it renews." },
  ],
  related: [
    { slug: "serp-checker", text: "See everything that ranks for the keyword." },
    { slug: "keyword-to-page-mapper", text: "Decide which page should target it." },
    { slug: "seo-search-intent-classifier", text: "Check the intent behind the keyword." },
  ],
  cta: { heading: "Want help turning data into decisions?", accent: "Let's talk.", copy: "I use this kind of research to decide what to fix, write and build first.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Find where a domain appears in the top 30 Google results for a keyword.", cta: "Check a ranking" },
  sources: [{ label: "DataForSEO and Serper API documentation", url: "https://docs.dataforseo.com/v3/", checked: "October 2026" }],
} satisfies NewToolContent;
