import type { NewToolContent } from "../content-types";

export default {
  slug: "seo-search-intent-classifier",
  name: "Search Intent Classifier",
  keyword: "search intent classifier",
  metaTitle: "Search Intent Classifier (100% FREE)",
  metaDescription: "Search intent classifier for SEO. Paste keywords and get each one's intent, confidence, reason and best page type in one table. Free, no signup.",
  lede: "This search intent classifier tells you what people probably want when they type a keyword. Paste one keyword or a whole list and see which kind of page fits each one.",
  sub: "One table with primary intent, secondary intent, confidence, reason and suggested page type, ready to export as CSV.",
  trust: "Free, no signup. What you type is sent to an AI provider to write your result and isn't stored, so don't include anything private.",
  steps: [
    { title: "Paste your keywords", text: "Add one keyword per line. You can paste a short list or a longer batch." },
    { title: "Add context", text: "Optionally add your industry, country, language and website type, so the intent fits your market." },
    { title: "Review and export", text: "Read the reasons, check the low confidence rows in Google yourself, and download the CSV. Regenerate for a fresh take." },
  ],
  examples: {
    heading: "Search intent",
    accent: "examples",
    intro: "How a few common keywords get classified. Your result depends on your keywords and context.",
    items: [
      {
        title: "A how to question",
        input: "how to lower bounce rate",
        output: "Informational, high confidence. Suggested page: guide or blog post.",
        why: "The searcher wants to learn something, not buy anything yet.",
      },
      {
        title: "A comparison",
        input: "best crm for small business",
        output: "Commercial, secondary informational, high confidence. Suggested page: comparison or roundup.",
        why: "Best and for small business signal someone weighing options before buying.",
      },
      {
        title: "A ready to buy search",
        input: "buy standing desk online",
        output: "Transactional, high confidence. Suggested page: category or product page.",
        why: "Buy and online make the next step clear: a purchase.",
      },
      {
        title: "A brand search",
        input: "notion login",
        output: "Navigational, high confidence. Suggested page: none for most sites, it belongs to the brand.",
        why: "People want one specific site, so other pages rarely win this search.",
      },
    ],
  },
  guidance: {
    heading: "Using intent",
    accent: "well",
    items: [
      { title: "Treat it as a starting point", text: "The tool reads the words in your keyword. It doesn't see live Google results, so check anything important in a real search." },
      { title: "Watch low confidence rows", text: "Low confidence usually means mixed intent. Those are the keywords worth checking by hand first." },
      { title: "No volume or difficulty", text: "The table never shows search volume or difficulty. Use a keyword tool for those numbers." },
      { title: "Add context for vague terms", text: "A word like apple means different things in tech and in food. Your industry and website type help the result fit." },
      { title: "One intent per page", text: "Group keywords with the same intent onto one page, and give different intents their own pages." },
    ],
  },
  faqs: [
    { q: "What is search intent?", a: "Search intent is the reason behind a search. It's what the person hopes to find or do, like learn something, reach a site, compare options or buy." },
    { q: "What are the four main search intent types?", a: "Informational (learn something), navigational (reach a specific site or page), commercial (research before buying) and transactional (buy or sign up now)." },
    { q: "How do I identify informational intent?", a: "Look for question words like how, what, why and guide, or topics without any sign of buying. These searches usually want an answer, a guide or an explanation." },
    { q: "What is commercial investigation?", a: "It's when someone is close to buying but still comparing. Searches with best, top, review, vs or alternatives usually fall here, and comparison or review pages tend to suit them." },
    { q: "How do I match keywords to pages?", a: "Give informational keywords a guide or article, commercial ones a comparison or review, transactional ones a product, category or pricing page, and leave brand searches to that brand." },
    { q: "Can a keyword have mixed intent?", a: "Yes. Some searches serve several needs at once, so Google may show guides and product pages together. That's why the table includes an optional secondary intent and a confidence level." },
    { q: "Why should I inspect Google results manually?", a: "The results page shows what Google currently thinks people want. This tool doesn't look at live results, so a quick search is the best way to confirm a classification before you build a page." },
    { q: "How do I use search intent in an SEO strategy?", a: "Group your keywords by intent, decide which page type serves each group, and plan content in that order. Pages that match intent tend to be more useful to visitors, which is what search engines look for." },
  ],
  related: [
    { slug: "seo-title-generator", text: "Write a title for the page once you know its intent." },
    { slug: "meta-description-generator", text: "Write a matching meta description for that page." },
    { slug: "google-ads-negative-keyword-generator", text: "Exclude searches with the wrong intent from your ads." },
    { slug: "llms-txt-generator", text: "List your key pages in a simple llms.txt file." },
  ],
  cta: {
    heading: "Want an SEO plan built on",
    accent: "real intent?",
    copy: "I help SaaS companies pick the right keywords, map them to pages and grow search traffic that converts.",
    button: "See SEO services",
    href: "/services/seo-specialist-for-saas",
  },
  hubCard: { description: "Classify keywords by search intent and see which page type fits each one, in one exportable table.", cta: "Classify search intent" },
  sources: [
    { label: "Google Search Central: Creating helpful, reliable, people-first content", url: "https://developers.google.com/search/docs/fundamentals/creating-helpful-content", checked: "October 2026" },
  ],
} satisfies NewToolContent;
