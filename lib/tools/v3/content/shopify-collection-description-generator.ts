import type { NewToolContent } from "../content-types";

export default {
  slug: "shopify-collection-description-generator",
  name: "Shopify Collection Description Generator",
  keyword: "shopify collection description generator",
  metaTitle: "Shopify Collection Description Generator (100% FREE)",
  metaDescription: "Write a useful Shopify collection description from the products, audience and shopping intent. Get one natural description without invented features.",
  lede: "This Shopify collection description generator writes one clear description from the products in a collection and why customers choose them, so visitors can browse with confidence.",
  sub: "Make your Shopify collections easier to shop.",
  trust: "Free, no signup. What you type is sent to an AI provider to write your result and isn't stored, so don't include anything private.",
  steps: [
    { title: "Name the collection", text: "Say what the collection actually contains." },
    { title: "Describe the shopper", text: "Explain who shops it and what matters when choosing." },
    { title: "Review and publish", text: "Remove uncertain details and add it to Shopify." },
  ],
  examples: {
    heading: "Collection descriptions,",
    accent: "written out.",
    intro: "Illustrative stores and results. Your output will depend on what you enter.",
    items: [
      { title: "Desk accessories", input: "Minimal Desk Accessories; organizers, cable clips, felt trays; remote workers.", output: "\"Keep your workspace practical without filling it with clutter. Explore desk organizers, cable clips, and felt trays designed to help you keep everyday essentials close and your setup easier to manage.\"", why: "Names the real products and the reason people shop them." },
      { title: "Trail running socks", input: "Trail Running Socks; cushioned, lightweight and waterproof styles; runners on rough ground.", output: "\"Find socks built for uneven trails, from lightweight pairs for dry routes to cushioned and waterproof styles for longer, wetter runs. Compare by thickness and height to match your shoes and conditions.\"", why: "Explains how to compare the range without listing specs that belong on product cards." },
      { title: "Houseplant pots", input: "Small Plant Pots; ceramic and terracotta, with and without drainage; apartment growers.", output: "\"Choose a pot for desks, shelves and windowsills. Browse ceramic and terracotta options, and check each listing for drainage and size before you pick one for your plant.\"", why: "Points shoppers to the listing for details instead of claiming every pot suits every plant." },
    ],
  },
  guidance: {
    heading: "Writing collection copy",
    accent: "that helps.",
    items: [
      { title: "Collections need a purpose", text: "A collection page groups items a shopper is likely to compare. The description should make that grouping understandable. A page selling laptop cases in several sizes might explain compatible styles and how to compare, but should never claim every case fits every device." },
      { title: "Write for buyers, not just search engines", text: "Start with products and uses, not a repeated keyword. Help customers know whether this is the right part of the store. Let product cards carry prices, sizes and detailed specs." },
    ],
  },
  faqs: [
    { q: "What is a Shopify collection description?", a: "Intro copy explaining what shoppers will find in a product category and when those products are useful." },
    { q: "Should every collection have a description?", a: "A short useful one helps browsing, especially when the category needs explaining. Skip filler on self explanatory collections." },
    { q: "How long should a collection description be?", a: "Long enough to explain the category; no ideal word count." },
    { q: "Should I repeat the collection keyword?", a: "Use the main topic naturally, without repeating phrases to fill space." },
    { q: "Can I put shipping policies in a collection description?", a: "Only if relevant and accurate. Policies also belong on dedicated store pages." },
    { q: "Can I use the same copy across collections?", a: "Avoid identical generic descriptions when the product groups differ." },
  ],
  related: [
    { slug: "shopify-product-title-generator", text: "Write clear titles for the products inside." },
    { slug: "product-description-generator", text: "Describe each product in the collection." },
    { slug: "shopify-profit-margin-calculator", text: "Check what each order really earns." },
  ],
  cta: { heading: "Want more shoppers finding your store?", accent: "Let's work on it.", copy: "I build search pages around what your buyers actually look for.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Write one natural Shopify collection description from the products, audience and shopping intent.", cta: "Write a description" },
  sources: [],
} satisfies NewToolContent;
