import type { NewToolContent } from "../content-types";

export default {
  slug: "organic-keywords-finder",
  name: "Organic Keywords Finder",
  keyword: "organic keywords finder",
  metaTitle: "Organic Keywords Finder (100% FREE)",
  metaDescription: "Organic keywords finder that shows the keywords a domain ranks for in a chosen country, with position, search volume and ranking URL from a sourced database.",
  lede: "This organic keywords finder shows the keywords a website ranks for in the country you choose. See the matching URLs, observed positions and search volumes from a sourced ranking database.",
  sub: "See the keywords a website appears for in search.",
  trust: "Free, no signup. Each check sends the domain to a paid data source. Nothing is stored.",
  steps: [{ title: "Choose what to check", text: "Enter a domain and choose a country." }, { title: "Read the returned information", text: "Review the top keywords by volume with position and ranking page." }, { title: "Use the result", text: "Look closely at the pages already visible for valuable queries." }],
  examples: {
    heading: "Examples,",
    accent: "and what they mean.",
    intro: "Illustrative. Real results depend on what the data source returns on the day.",
    items: [
      { title: "Your own site", input: "Your domain in your main market.", output: "Keywords you didn't deliberately target.", why: "Pages that already rank can often improve with a clearer answer." },
      { title: "A competitor", input: "A competitor's domain.", output: "Their highest volume rankings.", why: "Shows which topics bring them visibility." },
      { title: "A new site", input: "A domain launched last month.", output: "No keywords on record.", why: "The database may not have picked it up yet." },
    ],
  },
  guidance: {
    heading: "Your results,",
    accent: "explained.",
    items: [
      { title: "A sampled database", text: "Third party ranking data samples and updates searches. It isn't a complete record of every query a site appears for." },
      { title: "Compare with Search Console", text: "For your own website, Search Console shows your real queries. Expect differences." },
      { title: "What this tool can't tell you", text: "A position alone doesn't tell you what to change, and the list shows the top 50 by volume, not everything." },
      { title: "What to do next", text: "Pick a relevant ranking query and compare your page with what searchers see today." },
    ],
  },
  faqs: [
    { q: "Can I see every keyword a competitor ranks for?", a: "No. No third party database captures every search. This shows the source's top 50 by volume." },
    { q: "Is an organic keyword the same as a paid keyword?", a: "No. Organic rankings are unpaid placements; ads are a different dataset." },
    { q: "Why do keyword counts vary between tools?", a: "Coverage, ranking depth, country support and update schedules all differ." },
    { q: "How can I find quick SEO opportunities?", a: "Start with relevant queries where a page already ranks just off page one, confirm intent, then improve the page." },
    { q: "Which country is used?", a: "The one you pick. Rankings differ a lot between markets." },
    { q: "Is there a limit?", a: "Yes. This tool uses a paid data source with a monthly cap, and each visitor gets a few checks a day. If the cap is reached, the tool says so and when it renews." },
  ],
  related: [
    { slug: "competitor-keyword-gap", text: "Find keywords a competitor has that you don't." },
    { slug: "seo-competitor-finder", text: "Find who you compete with." },
    { slug: "website-traffic-checker", text: "See the estimated organic traffic." },
  ],
  cta: { heading: "Want help turning data into decisions?", accent: "Let's talk.", copy: "I use this kind of research to decide what to fix, write and build first.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "See the keywords a domain ranks for, with position and ranking URL.", cta: "Find organic keywords" },
  sources: [{ label: "DataForSEO and Serper API documentation", url: "https://docs.dataforseo.com/v3/", checked: "October 2026" }],
} satisfies NewToolContent;
