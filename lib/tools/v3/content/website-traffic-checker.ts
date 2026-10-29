import type { NewToolContent } from "../content-types";

export default {
  slug: "website-traffic-checker",
  name: "Website Traffic Checker",
  keyword: "website traffic checker",
  metaTitle: "Website Traffic Checker (100% FREE)",
  metaDescription: "Website traffic checker that estimates a domain's monthly organic search visits in a chosen country, clearly labelled as organic only and not total traffic.",
  lede: "This website traffic checker estimates how many organic search visits a domain gets each month in the country you choose. It's clearly labelled as organic only, because it isn't total traffic.",
  sub: "Estimate a website's organic search traffic.",
  trust: "Free, no signup. Each check sends the domain to a paid data source. Nothing is stored.",
  steps: [{ title: "Choose what to check", text: "Enter a domain and choose a country." }, { title: "Read the returned information", text: "Read the organic visit estimate and how its rankings are spread." }, { title: "Use the result", text: "Use it to compare, not to claim exact visitor numbers." }],
  examples: {
    heading: "Examples,",
    accent: "and what they mean.",
    intro: "Illustrative. Real results depend on what the data source returns on the day.",
    items: [
      { title: "Two competitors", input: "Two businesses in the same niche and market.", output: "One has about three times the estimated organic visits.", why: "Look at which pages drive it, not just the number." },
      { title: "A brand new site", input: "A domain launched recently.", output: "No organic estimate.", why: "The source has too little data. It doesn't mean nobody visits." },
      { title: "A different country", input: "The same domain in two markets.", output: "Very different estimates.", why: "Organic visibility is country specific." },
    ],
  },
  guidance: {
    heading: "Your results,",
    accent: "explained.",
    items: [
      { title: "Organic only", text: "Estimated organic visits are not total visits, sessions or Search Console clicks. Direct, social, paid and email traffic aren't included." },
      { title: "How it's estimated", text: "The figure comes from rankings, search volumes and click through assumptions. Treat it as directional." },
      { title: "What this tool can't tell you", text: "No one can see a competitor's private analytics. This is an outside estimate, not a count." },
      { title: "What to do next", text: "For your own domain, compare with Search Console and your analytics." },
    ],
  },
  faqs: [
    { q: "Can I find out exactly how much traffic a competitor gets?", a: "No. Without their analytics, any tool can only estimate." },
    { q: "Why does this differ from Semrush, Ahrefs or Similarweb?", a: "Each provider uses different data, modelling and traffic definitions." },
    { q: "What does no estimate mean?", a: "The source doesn't have enough data. It doesn't prove nobody visits the site." },
    { q: "Is organic traffic the same as all website traffic?", a: "No. Organic search is one channel among direct, referral, social, paid and others." },
    { q: "What do the position counts mean?", a: "How many of the domain's ranking keywords sit in each position band." },
    { q: "Is there a limit?", a: "Yes. This tool uses a paid data source with a monthly cap, and each visitor gets a few checks a day. If the cap is reached, the tool says so and when it renews." },
  ],
  related: [
    { slug: "organic-keywords-finder", text: "See which keywords drive it." },
    { slug: "seo-competitor-finder", text: "Compare against search competitors." },
    { slug: "competitor-keyword-gap", text: "Find their keywords you're missing." },
  ],
  cta: { heading: "Want help turning data into decisions?", accent: "Let's talk.", copy: "I use this kind of research to decide what to fix, write and build first.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Estimate a domain's monthly organic search visits, labelled organic only.", cta: "Check estimated traffic" },
  sources: [{ label: "DataForSEO and Serper API documentation", url: "https://docs.dataforseo.com/v3/", checked: "October 2026" }],
} satisfies NewToolContent;
