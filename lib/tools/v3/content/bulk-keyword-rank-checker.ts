import type { NewToolContent } from "../content-types";

export default {
  slug: "bulk-keyword-rank-checker",
  name: "Bulk Keyword Rank Checker",
  keyword: "bulk keyword rank checker",
  metaTitle: "Bulk Keyword Rank Checker (100% FREE)",
  metaDescription: "Bulk keyword rank checker that checks up to 10 keywords at once and shows which ones a domain ranks for in Google's top 10, with position and URL.",
  lede: "This bulk keyword rank checker checks up to 10 keywords at once and shows where your domain appears in Google's top 10 for each. Every row carries its own status, so a failed check is never mistaken for not ranking.",
  sub: "Check keyword rankings in bulk.",
  trust: "Free, no signup. Each keyword makes one live Google results request through a paid data source. Nothing is stored.",
  steps: [{ title: "Choose what to check", text: "Enter your domain, up to 10 keywords and a country." }, { title: "Read the returned information", text: "See the position and URL for each keyword, or its status." }, { title: "Use the result", text: "Download the CSV and look into keywords where the wrong page ranks." }],
  examples: {
    heading: "Examples,",
    accent: "and what they mean.",
    intro: "Illustrative. Real results depend on what the data source returns on the day.",
    items: [
      { title: "A product launch", input: "Ten keywords for a new landing page.", output: "Found for three, not in the top 10 for seven.", why: "Check whether one page or several are trying to rank." },
      { title: "Two pages, one topic", input: "Keywords for a guide and a product page.", output: "Different URLs rank for similar keywords.", why: "Clarify which page serves which intent." },
      { title: "A failed check", input: "One keyword that timed out.", output: "Check failed.", why: "Rerun it; it's not the same as not ranking." },
    ],
  },
  guidance: {
    heading: "Your results,",
    accent: "explained.",
    items: [
      { title: "Each row is its own snapshot", text: "Every keyword is checked separately, with its own result and status." },
      { title: "Top 10 only", text: "Each keyword checks the first page of Google. Not in the top 10 doesn't mean not indexed or not ranking further down." },
      { title: "What this tool can't tell you", text: "It isn't scheduled tracking; it's a one time batch check." },
      { title: "What to do next", text: "Start with keywords where you already have an appropriate page, and investigate mismatched URLs one cluster at a time." },
    ],
  },
  faqs: [
    { q: "How many keywords can I check at once?", a: "Up to 10 per check." },
    { q: "Can I export the results?", a: "Yes. Download a CSV with position, URL, status, market and date." },
    { q: "Is not in the top 10 the same as not ranking?", a: "No. The domain may rank lower; this check only reads the first page." },
    { q: "Can I schedule daily ranking updates?", a: "Not yet. This is a one time batch check." },
    { q: "Does it count subdomains?", a: "Yes. Results on subdomains of your domain count as a match." },
    { q: "Is there a limit?", a: "Yes. This tool uses a paid data source with a monthly cap, and each visitor gets a few checks a day. If the cap is reached, the tool says so and when it renews." },
  ],
  related: [
    { slug: "keyword-rank-checker", text: "Check one keyword to the top 30." },
    { slug: "keyword-to-page-mapper", text: "Map keywords to pages." },
    { slug: "serp-checker", text: "See what ranks instead." },
  ],
  cta: { heading: "Want help turning data into decisions?", accent: "Let's talk.", copy: "I use this kind of research to decide what to fix, write and build first.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Check up to 10 keywords at once and see which ones a domain ranks for.", cta: "Check a keyword list" },
  sources: [{ label: "DataForSEO and Serper API documentation", url: "https://docs.dataforseo.com/v3/", checked: "October 2026" }],
} satisfies NewToolContent;
