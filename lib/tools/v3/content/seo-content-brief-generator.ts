import type { NewToolContent } from "../content-types";

export default {
  slug: "seo-content-brief-generator",
  name: "SEO Content Brief Generator",
  keyword: "seo content brief generator",
  metaTitle: "SEO Content Brief Generator (100% FREE)",
  metaDescription: "Build an SEO content brief from a target topic, audience and search intent. Get one structured outline, research questions and a clear writing direction.",
  lede: "This SEO content brief generator takes your topic and audience and gives you a focused brief with the questions to answer and the evidence still needed.",
  sub: "Give the writer a plan, not a pile of keywords.",
  trust: "Free, no signup. What you type is sent to an AI provider to write your result and isn't stored, so don't include anything private.",
  steps: [
    { title: "Enter the subject", text: "Add the topic and who needs the answer." },
    { title: "Explain the purpose", text: "Say what the page is for and add known facts if available." },
    { title: "Hand it over and verify", text: "Give the brief to your writer and verify search results and sources before publication." },
  ],
  examples: {
    heading: "Content briefs,",
    accent: "with a clear direction.",
    intro: "Illustrative briefs only. Each one still needs checking against live search results and real sources.",
    items: [
      { title: "CRM for a bakery", input: "How to choose a CRM for a small wholesale bakery, for a bakery owner, comparison intent.", output: "Compare order capture, shared stock, credit limits, invoicing at handover and reporting.", why: "Evidence needed: real software capabilities, current prices and workflow demos." },
      { title: "Payroll for a first hire", input: "How to run payroll for your first employee in the UK, for a new founder, how to intent.", output: "Walk through registering as an employer, choosing payroll software, PAYE deadlines and first payslip checks.", why: "Evidence needed: current HMRC guidance and deadlines, quoted from the official source." },
      { title: "Project tool pricing", input: "Is a paid project management tool worth it for a five person agency, decision intent.", output: "Weigh time saved, client visibility and seat costs against free plans, ending with a simple decision checklist.", why: "Evidence needed: current plan limits and prices from each vendor's pricing page." },
    ],
  },
  guidance: {
    heading: "What a good brief",
    accent: "actually does.",
    items: [
      { title: "Start with the reader's task", text: "A brief is not just a list of headings. It tells a writer what the searcher needs to understand or do, which claims need evidence and what would make the page more useful than a generic overview. A comparison page and a how to guide may target similar keywords but answer different needs." },
      { title: "A brief doesn't replace SERP research", text: "Without live search results, the outline reflects your topic and context. It doesn't prove what ranks, which People Also Ask questions appear or how long competitors write. Verify the current results before treating the outline as final." },
    ],
  },
  faqs: [
    { q: "What is an SEO content brief?", a: "A document defining the target reader, topic, intent, angle, headings, key questions and evidence needed for a page." },
    { q: "Does a content brief guarantee rankings?", a: "No." },
    { q: "How many keywords should a brief include?", a: "Enough to cover the topic naturally. One clear primary intent beats dozens of loosely related terms." },
    { q: "Does this tool analyze Google's top 10 results?", a: "No. It drafts from your topic and information." },
    { q: "Can I use the brief for an existing article?", a: "Yes. Describe the current purpose and use the gaps for a refresh, after checking them against real evidence." },
    { q: "Should I use every proposed H2?", a: "No. Remove sections that don't serve the reader or repeat another section." },
  ],
  related: [
    { slug: "seo-search-intent-classifier", text: "Check the intent before you brief." },
    { slug: "seo-keyword-cluster-generator", text: "Group keywords into pages first." },
    { slug: "seo-title-generator", text: "Write the title for the finished page." },
  ],
  cta: { heading: "Want content", accent: "that actually ranks?", copy: "I plan and run SEO for SaaS companies, from briefs to pages that bring in signups.", button: "See SEO for SaaS", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Get a structured SEO content brief with an outline, research questions and the evidence still needed.", cta: "Create a brief" },
  sources: [],
} satisfies NewToolContent;
