import type { NewToolContent } from "../content-types";

export default {
  slug: "serp-checker",
  name: "SERP Checker",
  keyword: "serp checker",
  metaTitle: "SERP Checker (100% FREE)",
  metaDescription: "SERP checker that shows the pages Google ranks for a keyword by country and device, with a dated snapshot and the other result types on the page.",
  lede: "This SERP checker shows the pages Google ranks for a keyword in the country and on the device you choose. Look beyond the position numbers to the kinds of pages that appear and the questions they answer.",
  sub: "See what Google ranks for your keyword.",
  trust: "Free, no signup. Each check makes one live Google results request through a paid data source. Nothing you enter is stored.",
  steps: [{ title: "Choose what to check", text: "Enter a keyword and choose a country and device." }, { title: "Read the returned information", text: "Review the ranking pages and the other result types listed separately." }, { title: "Use the result", text: "Match your page format to what searchers appear to want." }],
  examples: {
    heading: "Examples,",
    accent: "and what they mean.",
    intro: "Illustrative. Real results depend on what the data source returns on the day.",
    items: [
      { title: "A comparison query", input: "\"best accounting software for consultants\" in the US.", output: "Mostly comparison articles in the top 10.", why: "A single product page may not satisfy the same intent." },
      { title: "A how to query", input: "\"how to replace a bicycle tire\".", output: "Tutorials, plus videos listed under other result types.", why: "A practical guide with images or video fits better than text alone." },
      { title: "A brand query", input: "A company name.", output: "The brand's own pages and review sites.", why: "Navigational searches rarely reward new content." },
    ],
  },
  guidance: {
    heading: "Your results,",
    accent: "explained.",
    items: [
      { title: "A snapshot, not a constant", text: "Positions come from one sampled request for the selected market and device. Results vary by location, language, personalisation and time. Check the timestamp before making decisions." },
      { title: "Organic is listed separately", text: "Featured snippets, ads, maps and other features are not ordinary organic listings, so they're listed apart and not given a position." },
      { title: "What this tool can't tell you", text: "It can't show what every person sees, and it doesn't predict where a new page would rank." },
      { title: "What to do next", text: "Choose one meaningful gap in usefulness: a missing example, a clearer explanation or a better page format." },
    ],
  },
  faqs: [
    { q: "Can I check Google results in another country?", a: "Yes. Pick the country before you check; the result shows the market used." },
    { q: "Are these the exact results every user sees?", a: "No. Results vary with location, personalisation, freshness and device." },
    { q: "Does the tool show ads and SERP features?", a: "Other result types the source returns are listed by name. Ads aren't included." },
    { q: "How do I use the SERP for content planning?", a: "Look for recurring page formats, unanswered questions and how useful the leading results really are before choosing your angle." },
    { q: "Why do results change between checks?", a: "Rankings move constantly, and results for the same query can differ by hour and location." },
    { q: "Is there a limit?", a: "Yes. This tool uses a paid data source with a monthly cap, and each visitor gets a few checks a day. If the cap is reached, the tool says so and when it renews." },
  ],
  related: [
    { slug: "keyword-rank-checker", text: "Find where your own domain appears." },
    { slug: "serp-features-checker", text: "See every result type on the page." },
    { slug: "people-also-ask-tool", text: "See the questions Google shows." },
  ],
  cta: { heading: "Want help turning data into decisions?", accent: "Let's talk.", copy: "I use this kind of research to decide what to fix, write and build first.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "See the pages Google ranks for a keyword, by country and device.", cta: "Check a SERP" },
  sources: [{ label: "DataForSEO and Serper API documentation", url: "https://docs.dataforseo.com/v3/", checked: "October 2026" }],
} satisfies NewToolContent;
