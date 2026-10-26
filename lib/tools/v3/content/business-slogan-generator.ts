import type { NewToolContent } from "../content-types";

export default {
  slug: "business-slogan-generator",
  name: "Business Slogan Generator",
  keyword: "business slogan generator",
  metaTitle: "Business Slogan Generator (100% FREE)",
  metaDescription: "Write one concise business slogan based on your product, audience and strongest benefit. Find words you can use in your branding and marketing.",
  lede: "This business slogan generator takes what your business does and what makes it worth choosing, and writes one short slogan that sounds like your brand.",
  sub: "A slogan that says something useful.",
  trust: "Free, no signup. What you type is sent to an AI provider to write your result and isn't stored, so don't include anything private.",
  steps: [
    { title: "Describe your offer", text: "Say what you sell and the benefit customers value." },
    { title: "Pick a tone", text: "Choose the tone that fits your brand." },
    { title: "Check the slogan", text: "Make sure it's true, easy to remember and not already closely associated with another business." },
  ],
  examples: {
    heading: "Business slogans,",
    accent: "with the thinking behind them.",
    intro: "Illustrative suggestions only. None of them has been checked for originality or trademarks.",
    items: [
      { title: "Bookkeeping studio", input: "Small bookkeeping studio that makes monthly records easy for independent professionals.", output: "\"Books sorted. Head clear.\"", why: "Connects the service with peace of mind without inventing a measurable result." },
      { title: "Neighbourhood bakery", input: "Family bakery baking bread fresh every morning, warm.", output: "\"Baked this morning, for this street.\"", why: "Highlights freshness and local roots, both things the bakery can stand behind." },
      { title: "Scheduling app", input: "Booking software for hair salons that cuts phone calls, straightforward.", output: "\"Fewer calls. Fuller chairs.\"", why: "Names the real problem and the outcome salons care about, with no promised numbers." },
    ],
  },
  guidance: {
    heading: "What makes a good",
    accent: "business slogan.",
    items: [
      { title: "A slogan is not a mission statement", text: "A slogan should be short enough to remember and specific enough to say something about the brand. Avoid stacking empty words such as innovation, excellence and tomorrow into one sentence. Useful slogans often focus on a real customer problem or a recognizable point of view." },
      { title: "Check the promise", text: "Claims about speed, savings, safety or results should be supportable. If you cannot verify that your delivery is the fastest, don't build the slogan around it. A distinct tone and a real benefit usually age better than a claim you cannot prove." },
    ],
  },
  faqs: [
    { q: "What's the difference between a slogan and a tagline?", a: "They often overlap. A slogan may be campaign specific, while a tagline commonly stays with the brand longer." },
    { q: "How long should a business slogan be?", a: "Short enough to say naturally, often a few words. There's no universal character count." },
    { q: "Should my slogan mention my product?", a: "Not always. It can focus on the customer benefit when the business name or nearby copy gives product context." },
    { q: "Can a slogan make a guarantee?", a: "Only if your business can substantiate it and complies with advertising rules. Avoid unverified promises." },
    { q: "Should I put the slogan on my logo?", a: "Only if it remains legible at typical sizes. It can live in website copy and ads instead." },
    { q: "How do I know whether another company uses it?", a: "Search the phrase, review competing brands and check trademark databases. This generator does not verify originality." },
  ],
  related: [
    { slug: "business-name-generator", text: "Name the business first." },
    { slug: "website-hero-headline-generator", text: "Turn the idea into a homepage headline." },
    { slug: "saas-value-proposition-generator", text: "Sharpen the value proposition behind it." },
  ],
  cta: { heading: "Want messaging", accent: "that actually converts?", copy: "I help SaaS founders find the words and channels that turn visitors into customers.", button: "See growth consulting", href: "/services/saas-growth-consultant" },
  hubCard: { description: "Get one short business slogan built on your product, audience and strongest benefit.", cta: "Write a slogan" },
  sources: [
    { label: "Shopify slogan maker (competitor reference)", url: "https://www.shopify.com/tools/slogan-maker", checked: "October 2026" },
  ],
} satisfies NewToolContent;
