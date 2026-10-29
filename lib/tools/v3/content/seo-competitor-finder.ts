import type { NewToolContent } from "../content-types";

export default {
  slug: "seo-competitor-finder",
  name: "SEO Competitor Finder",
  keyword: "seo competitor finder",
  metaTitle: "SEO Competitor Finder (100% FREE)",
  metaDescription: "SEO competitor finder that shows the websites sharing your ranking keywords in a chosen country, with shared keyword counts, so you know who competes in search.",
  lede: "This SEO competitor finder shows the websites that compete with you for the same search audience. See how many keywords you share with each, including rivals you might overlook.",
  sub: "Find the websites competing for your search audience.",
  trust: "Free, no signup. Each check sends the domain to a paid data source. Nothing is stored.",
  steps: [{ title: "Choose what to check", text: "Enter your domain and choose a country." }, { title: "Read the returned information", text: "Review the domains sharing your ranking keywords." }, { title: "Use the result", text: "Separate business rivals from publishers and directories." }],
  examples: {
    heading: "Examples,",
    accent: "and what they mean.",
    intro: "Illustrative. Real results depend on what the data source returns on the day.",
    items: [
      { title: "A SaaS product", input: "A scheduling app's domain.", output: "Other apps, plus review sites and blogs.", why: "Publishers compete for attention even if they don't sell anything." },
      { title: "A local service", input: "A plumber's website.", output: "Directories and other local firms.", why: "Directories often take the clicks you want." },
      { title: "A new site", input: "A domain with few rankings.", output: "Few or no competitors on record.", why: "There isn't enough ranking data yet." },
    ],
  },
  guidance: {
    heading: "Your results,",
    accent: "explained.",
    items: [
      { title: "Search rivals aren't always business rivals", text: "A site with large keyword overlap may be a publisher or directory rather than a company selling the same thing." },
      { title: "Shared keywords", text: "The overlap comes from the source's ranking database for the chosen market. Very large sites are left out so the list stays useful." },
      { title: "What this tool can't tell you", text: "It doesn't tell you why a competitor ranks or how good their pages are." },
      { title: "What to do next", text: "Pick one search competitor and study the pages that serve relevant queries better than yours." },
    ],
  },
  faqs: [
    { q: "Who are my SEO competitors?", a: "Websites that appear for some of the same relevant searches in a market." },
    { q: "Are my SEO competitors my business competitors?", a: "Not always. Publishers, directories and forums can compete in search without selling your product." },
    { q: "How is overlap measured?", a: "By shared ranking keywords in the source's database, for the market you choose." },
    { q: "Why are big sites missing?", a: "Very large sites like Wikipedia are excluded so the list shows realistic competitors." },
    { q: "What should I do after finding competitors?", a: "Study their useful pages, the gaps in your coverage and where you can offer better information." },
    { q: "Is there a limit?", a: "Yes. This tool uses a paid data source with a monthly cap, and each visitor gets a few checks a day. If the cap is reached, the tool says so and when it renews." },
  ],
  related: [
    { slug: "competitor-keyword-gap", text: "Find keywords a competitor has that you don't." },
    { slug: "organic-keywords-finder", text: "See a competitor's keywords." },
    { slug: "seo-content-gap-planner", text: "Plan content for the gaps." },
  ],
  cta: { heading: "Want help turning data into decisions?", accent: "Let's talk.", copy: "I use this kind of research to decide what to fix, write and build first.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Find the websites that share your ranking keywords.", cta: "Find SEO competitors" },
  sources: [{ label: "DataForSEO and Serper API documentation", url: "https://docs.dataforseo.com/v3/", checked: "October 2026" }],
} satisfies NewToolContent;
