import type { NewToolContent } from "../content-types";

export default {
  slug: "local-seo-keyword-modifier-generator",
  name: "Local SEO Keyword Modifier Generator",
  keyword: "local seo keyword modifier generator",
  metaTitle: "Local SEO Keyword Modifier Generator (100% FREE)",
  metaDescription: "Local SEO keyword modifier generator that combines your real services and locations with common local search modifiers. Export ideas, no fake volumes.",
  lede: "This local seo keyword modifier generator finds more ways people might search for your local service. Enter what you offer and the places you serve, and get organized keyword ideas to check before writing your next service page.",
  sub: "Find more ways people might search for your local service.",
  trust: "Free, no signup. Runs in your browser, nothing is sent anywhere.",
  steps: [
    { title: "Enter service and places", text: "Enter the real service and the locations you serve." },
    { title: "Pick modifier groups", text: "Choose the groups that make sense, like cost or urgency." },
    { title: "Check against real results", text: "Review the ideas against actual search results and what you really offer." },
  ],
  examples: {
    heading: "Local keyword ideas,",
    accent: "from patterns.",
    intro: "Hypothetical query ideas made from your terms. None of them has verified search volume.",
    items: [
      { title: "Basement waterproofing in Lahore", input: "Service basement waterproofing, city Lahore.", output: "basement waterproofing Lahore, basement waterproofing cost Lahore, how to fix basement leaks in Lahore", why: "Location, cost and question patterns." },
      { title: "Plumber with nearby towns", input: "Service plumber, areas Leeds and Otley, urgency group on.", output: "plumber Leeds, emergency plumber Otley, plumber near Leeds", why: "Only towns you entered are used." },
      { title: "Comparison intent", input: "Service dentist, city Denver, comparison group on.", output: "best dentist Denver, dentist vs orthodontist Denver", why: "Remove any combination that doesn't make sense for you." },
    ],
  },
  guidance: {
    heading: "Patterns",
    accent: "are not data.",
    items: [
      { title: "Patterns are not data", text: "A formula can make plausible phrases such as plumber in Lahore or roof leak cost Lahore. That doesn't prove anyone searches for them. Check demand with keyword research and customer conversations before creating pages." },
      { title: "Avoid location doorway pages", text: "Don't create dozens of nearly identical pages for places where you don't offer a genuinely different service. Make each service and location page useful to real customers." },
    ],
  },
  faqs: [
    { q: "What are local SEO keyword modifiers?", a: "Words that add place, urgency, cost or service type to a search phrase." },
    { q: "Are the suggestions pulled from Google?", a: "No. They're combinations of your terms and common patterns, made in your browser." },
    { q: "Does this show search volume?", a: "No. You need separate keyword research data for real volumes." },
    { q: "Should I use near me in page titles?", a: "Usually natural service and location wording is clearer. Avoid repeating near me just to target it." },
    { q: "Can I add multiple areas?", a: "Yes, but only include places you actually serve." },
    { q: "Should I create a page for every generated phrase?", a: "No. Group related intent on one page and avoid thin duplicate location pages." },
  ],
  related: [
    { slug: "local-service-page-outline-generator", text: "Plan the page these phrases belong on." },
    { slug: "local-business-faq-generator", text: "Answer the question phrases." },
    { slug: "keyword-to-page-mapper", text: "Map the ideas to pages." },
  ],
  cta: { heading: "Want local search", accent: "that brings calls?", copy: "I help service businesses get found by the people nearby.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Combine your services and real locations with local modifiers, grouped and exportable as CSV.", cta: "Generate local keyword ideas" },
  sources: [{ label: "Google: Spam policies, including doorway pages", url: "https://developers.google.com/search/docs/essentials/spam-policies", checked: "October 2026" }],
} satisfies NewToolContent;
