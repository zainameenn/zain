import type { NewToolContent } from "../content-types";

export default {
  slug: "keyword-to-page-mapper",
  name: "Keyword to Page Mapper",
  keyword: "keyword to page mapper",
  metaTitle: "Keyword to Page Mapper (100% FREE)",
  metaDescription: "Keyword to page mapper that assigns keywords to existing or planned pages. See page types, overlapping intent and gaps without fabricated search data.",
  lede: "This keyword to page mapper gives every keyword a sensible home. Paste your keywords and, if you like, your page list, and get a practical map showing which searches belong together and which need their own page.",
  sub: "Give every keyword a sensible home.",
  trust: "Free, no signup. What you type is sent to a free AI service to write your result and isn't stored, so only include public, non-sensitive details.",
  steps: [
    { title: "Enter your keywords", text: "Add a set of related keywords, one per line." },
    { title: "Add your pages", text: "List existing pages if you want keywords mapped to real URLs." },
    { title: "Check the map", text: "Review the groups and compare unclear cases with real search results before building pages." },
  ],
  examples: {
    heading: "Keyword maps,",
    accent: "in practice.",
    intro: "Illustrative keyword sets. The tool never adds search volumes.",
    items: [
      { title: "Fee questions to one tool", input: "etsy fee calculator, how much are etsy seller fees, etsy transaction fee, etsy refund policy. Existing page /tools/etsy-fee-calculator.", output: "The first three map to the existing calculator. etsy refund policy gets its own proposed resource.", why: "Refund policy is a different question." },
      { title: "Planning new pages", input: "crm for bakeries, bakery order tracking, wholesale bakery software, bakery invoice template.", output: "Proposed: a bakery CRM page, and a separate invoice template page.", why: "A template search wants a download, not software." },
      { title: "Possible overlap", input: "Two existing pages both titled around email marketing tips.", output: "Overlap warning on both, for you to review.", why: "Nothing is deleted or merged automatically." },
    ],
  },
  guidance: {
    heading: "Keyword maps",
    accent: "are plans.",
    items: [
      { title: "Keyword maps are planning documents", text: "A map helps you avoid a thin page for every small keyword variation. Similar searches can share one useful page when the intent and the content needed overlap. An AI can suggest groupings, but looking at real results may change them." },
      { title: "Prevent duplicate intent", text: "If two existing pages target nearly the same search, flag it for review instead of deleting or canonicalizing either one. Different audiences or intents can justify both." },
    ],
  },
  faqs: [
    { q: "What is keyword mapping?", a: "Assigning keywords and the intent behind them to the pages best suited to answer them." },
    { q: "Should every keyword have its own page?", a: "No. Closely related searches often work best on one thorough page." },
    { q: "Can I map keywords to existing pages?", a: "Yes. Add their URLs and titles and the tool will only use those URLs." },
    { q: "Does the tool measure search volume?", a: "No. It uses your keyword text only and doesn't do live keyword research." },
    { q: "What is keyword cannibalization?", a: "When your own pages compete for similar searches. The tool flags possible cases for you to review." },
    { q: "Will this map guarantee rankings?", a: "No. It's a content planning aid, not a ranking forecast." },
  ],
  related: [
    { slug: "seo-search-intent-classifier", text: "Check the intent behind each keyword." },
    { slug: "seo-keyword-cluster-generator", text: "Group a longer list first." },
    { slug: "seo-content-brief-generator", text: "Brief the pages you plan." },
  ],
  cta: { heading: "Need a keyword plan", accent: "that holds up?", copy: "I build SEO strategies for SaaS teams that turn searches into signups.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Map keywords to existing or planned pages, with page types and overlap warnings.", cta: "Map keywords" },
  sources: [],
} satisfies NewToolContent;
