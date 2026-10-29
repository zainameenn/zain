import type { NewToolContent } from "../content-types";

export default {
  slug: "serp-features-checker",
  name: "SERP Features Checker",
  keyword: "serp features checker",
  metaTitle: "SERP Features Checker (100% FREE)",
  metaDescription: "SERP features checker that shows which result types appear for a keyword, such as snippets, People Also Ask, videos, images and local packs, in one sampled search.",
  lede: "This SERP features checker shows which result types appear for a keyword besides ordinary blue links. See snippets, People Also Ask, videos, images, local results and more in one sampled search.",
  sub: "Check which search features appear for a keyword.",
  trust: "Free, no signup. Each check makes one live Google results request through a paid data source. Nothing is stored.",
  steps: [{ title: "Choose what to check", text: "Enter a keyword and choose a country and device." }, { title: "Read the returned information", text: "See each result type marked as detected or not detected in this sample." }, { title: "Use the result", text: "Decide whether your page needs video, images, local information or clearer answers." }],
  examples: {
    heading: "Examples,",
    accent: "and what they mean.",
    intro: "Illustrative. Real results depend on what the data source returns on the day.",
    items: [
      { title: "A tutorial query", input: "\"how to replace a bicycle tire\".", output: "Videos and People Also Ask detected.", why: "A tutorial with original photos or video may serve it better than text alone." },
      { title: "A local query", input: "\"dentist near me\".", output: "Local pack detected.", why: "Local results need a Business Profile as well as a website." },
      { title: "A news topic", input: "A trending story.", output: "Top stories detected.", why: "Fresh, timely coverage matters for this query." },
    ],
  },
  guidance: {
    heading: "Your results,",
    accent: "explained.",
    items: [
      { title: "Detected means observed", text: "A feature marked as detected was in this sampled result. Not detected means it wasn't in the sample or the source didn't return that type." },
      { title: "Layouts change", text: "The country, device and time all change the page. The result is labelled with each." },
      { title: "What this tool can't tell you", text: "AI Overviews aren't reported by this source, and seeing a feature isn't a promise you can win it." },
      { title: "What to do next", text: "Make the page more useful in the format searchers are shown, without expecting a guaranteed placement." },
    ],
  },
  faqs: [
    { q: "What are SERP features?", a: "Search result elements beyond a standard organic listing, such as local packs, image blocks and featured snippets." },
    { q: "Does every keyword trigger the same features?", a: "No. Intent, market, device and time all affect which features appear." },
    { q: "Can I optimise a page for a featured snippet?", a: "Clear, useful answers help search engines understand a page, but nothing guarantees a featured result." },
    { q: "Is an AI Overview an organic ranking position?", a: "No. It's a separate search experience. This source doesn't report it." },
    { q: "Why do features change between checks?", a: "Google tests and changes layouts constantly, and they vary by location." },
    { q: "Is there a limit?", a: "Yes. This tool uses a paid data source with a monthly cap, and each visitor gets a few checks a day. If the cap is reached, the tool says so and when it renews." },
  ],
  related: [
    { slug: "serp-checker", text: "See the organic results too." },
    { slug: "people-also-ask-tool", text: "Read the questions in the box." },
    { slug: "local-serp-checker", text: "Check map results by city." },
  ],
  cta: { heading: "Want help turning data into decisions?", accent: "Let's talk.", copy: "I use this kind of research to decide what to fix, write and build first.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "See which result types appear for a keyword besides ordinary links.", cta: "Check SERP features" },
  sources: [{ label: "DataForSEO and Serper API documentation", url: "https://docs.dataforseo.com/v3/", checked: "October 2026" }],
} satisfies NewToolContent;
