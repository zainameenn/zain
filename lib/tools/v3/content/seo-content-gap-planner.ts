import type { NewToolContent } from "../content-types";

export default {
  slug: "seo-content-gap-planner",
  name: "SEO Content Gap Planner",
  keyword: "seo content gap planner",
  metaTitle: "SEO Content Gap Planner (100% FREE)",
  metaDescription: "SEO content gap planner that compares public topic and page lists, spots missing content and gives a prioritized plan without fake keyword volumes.",
  lede: "This seo content gap planner shows topics your website may not answer yet. Compare your published topics with audience questions or public competitor page titles and get a focused plan for what to create next.",
  sub: "See the topics your website may not answer yet.",
  trust: "Free, no signup. What you type is sent to a free AI service to write your result and isn't stored, so only include public, non-sensitive details.",
  steps: [
    { title: "List what you cover", text: "Paste the topics or titles you've already published." },
    { title: "Add the other side", text: "Add audience questions or publicly visible competitor page titles." },
    { title: "Verify before writing", text: "Review the gaps and check real search demand before commissioning content." },
  ],
  examples: {
    heading: "Content gaps,",
    accent: "as ideas to check.",
    intro: "Illustrative lists. A gap here is a content idea, not a verified ranking opportunity.",
    items: [
      { title: "Social tools site", input: "Your pages: Instagram Bio Generator, Instagram Caption Generator. Question: How do I plan a week of posts?", output: "Gap: a weekly post planning guide or calendar resource. Priority: medium.", why: "Nothing you list answers planning." },
      { title: "Bakery software", input: "Your pages cover order tracking. Competitor titles include wholesale pricing guide.", output: "Gap: a wholesale pricing guide, marked as needing demand checks.", why: "Relevant to your buyers, but unproven." },
      { title: "Already covered", input: "Question matches an existing page title closely.", output: "Not listed as a gap.", why: "Near duplicates are merged, not repeated." },
    ],
  },
  guidance: {
    heading: "Gaps are",
    accent: "not orders.",
    items: [
      { title: "A competitor topic is not automatically your opportunity", text: "A topic could be irrelevant, overserved or a poor fit for your buyers. Use real customer questions, business fit and the expertise you have before investing in a page." },
      { title: "Don't publish thin filler pages", text: "Combine related questions where it makes sense. Build pages with real explanations, evidence, original examples and clear next steps, rather than a URL for every long tail variation." },
    ],
  },
  faqs: [
    { q: "What is a content gap?", a: "A question or topic your current content doesn't answer well." },
    { q: "Does this analyze competitor websites live?", a: "No. It only uses the titles or topics you paste. Nothing is crawled." },
    { q: "Is every missing competitor topic worth copying?", a: "No. Relevance to your audience matters more than copying another sitemap." },
    { q: "Does it show keyword difficulty?", a: "No. It has no live keyword data." },
    { q: "Should I write one post for every gap?", a: "Not always. Combine related questions when one strong page can answer them." },
    { q: "How do I prioritize gaps?", a: "Weigh audience need, commercial relevance, your ability to answer well and real search evidence." },
  ],
  related: [
    { slug: "keyword-to-page-mapper", text: "Map keywords to the pages you plan." },
    { slug: "seo-content-brief-generator", text: "Brief the first gap." },
    { slug: "seo-search-intent-classifier", text: "Check what searchers want." },
  ],
  cta: { heading: "Want a content plan", accent: "built on evidence?", copy: "I plan SaaS content around what buyers actually search for.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Compare your topics with audience questions or public competitor titles and get a prioritized gap plan.", cta: "Plan content gaps" },
  sources: [],
} satisfies NewToolContent;
