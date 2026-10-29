import type { NewToolContent } from "../content-types";

export default {
  slug: "keyword-search-volume-checker",
  name: "Keyword Search Volume Checker",
  keyword: "keyword search volume checker",
  metaTitle: "Keyword Search Volume Checker (100% FREE)",
  metaDescription: "Keyword search volume checker that shows average monthly searches for up to 20 keywords by country, with CPC, and labels missing data instead of showing zero.",
  lede: "This keyword search volume checker shows how often keywords are searched each month in the country you choose. Compare up to 20 phrases without confusing search volume with website traffic.",
  sub: "Check keyword search volume for your market.",
  trust: "Free, no signup. Each check sends your keywords to a paid data source. Nothing is stored.",
  steps: [{ title: "Choose what to check", text: "Paste up to 20 keywords and choose a country." }, { title: "Read the returned information", text: "Review the volume estimates, CPC and any missing data labels." }, { title: "Use the result", text: "Take promising phrases to a SERP check, not just the biggest number." }],
  examples: {
    heading: "Examples,",
    accent: "and what they mean.",
    intro: "Illustrative. Real results depend on what the data source returns on the day.",
    items: [
      { title: "Broad versus specific", input: "\"crm\" and \"crm for small architecture firms\".", output: "A large number for the first, a small one for the second.", why: "The second describes a much clearer buying problem." },
      { title: "No estimate", input: "A very new phrase.", output: "No data.", why: "The source has no estimate. That isn't the same as zero searches." },
      { title: "High CPC", input: "A commercial phrase.", output: "A high CPC next to a modest volume.", why: "Advertisers value it, which says something about intent." },
    ],
  },
  guidance: {
    heading: "Your results,",
    accent: "explained.",
    items: [
      { title: "Read the context", text: "Look at the market and source. Volumes are modelled averages over the last 12 months, and similar variants may be grouped." },
      { title: "Volume isn't traffic", text: "A monthly search volume is not the number of clicks your page would receive." },
      { title: "Ad competition isn't SEO difficulty", text: "The competition column describes advertisers in Google Ads, not the effort to rank organically." },
      { title: "What to do next", text: "Choose relevant keywords first, then check the results page before committing to new content." },
    ],
  },
  faqs: [
    { q: "What does monthly search volume mean?", a: "An estimate of searches for a keyword per month in a selected market, not a count of visitors to any website." },
    { q: "Why do Ahrefs, Semrush and Google show different volumes?", a: "They use different datasets, grouping rules and update schedules. Compare sources and dates before comparing numbers." },
    { q: "Does no data mean nobody searches for a keyword?", a: "Not necessarily. The source may lack enough data for that phrase." },
    { q: "Can I check multiple keywords?", a: "Yes, up to 20 at a time, one per line." },
    { q: "What is CPC?", a: "The average cost per click advertisers pay in Google Ads for that keyword." },
    { q: "Is there a limit?", a: "Yes. This tool uses a paid data source with a monthly cap, and each visitor gets a few checks a day. If the cap is reached, the tool says so and when it renews." },
  ],
  related: [
    { slug: "keyword-difficulty-checker", text: "See how hard each keyword may be." },
    { slug: "keyword-research-tool", text: "Find more keyword ideas." },
    { slug: "seo-keyword-cluster-generator", text: "Group the keywords you keep." },
  ],
  cta: { heading: "Want help turning data into decisions?", accent: "Let's talk.", copy: "I use this kind of research to decide what to fix, write and build first.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "See average monthly searches for up to 20 keywords by country.", cta: "Check search volume" },
  sources: [{ label: "DataForSEO and Serper API documentation", url: "https://docs.dataforseo.com/v3/", checked: "October 2026" }],
} satisfies NewToolContent;
