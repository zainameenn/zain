import type { NewToolContent } from "../content-types";

export default {
  slug: "product-schema-generator",
  name: "Product Schema Generator",
  keyword: "product schema generator",
  metaTitle: "Product Schema Generator (100% FREE)",
  metaDescription: "Product schema generator that builds Product JSON-LD from your real product name, images, pricing and availability. Review it before adding it.",
  lede: "This product schema generator describes your product to search engines using real details. Create Product structured data from your own information and copy valid JSON-LD without made up ratings, stock levels or prices.",
  sub: "Describe your product to search engines using real details.",
  trust: "Free, no signup. Runs in your browser, nothing is sent anywhere.",
  steps: [
    { title: "Enter product details", text: "Enter verified details such as the name, URL, image and brand." },
    { title: "Add offer details if correct", text: "Include price and availability only where they're accurate." },
    { title: "Copy and test", text: "Add the markup to the matching product page and test it." },
  ],
  examples: {
    heading: "Product markup,",
    accent: "from real details.",
    intro: "Illustrative products. Only the fields you fill in appear in the output.",
    items: [
      { title: "A product with a price", input: "Matte Desk Mat, https://example.com/products/matte-mat, brand Example Studio, an image and USD 35.00 in stock.", output: "A Product with an Offer: price 35.00, currency USD, availability InStock.", why: "Everything comes from what was entered." },
      { title: "No price yet", input: "Name, URL and image only.", output: "Basic Product markup with a note that merchant listings need offer details.", why: "Still valid, just not eligible for every feature." },
      { title: "With SKU and condition", input: "Name, URL, SKU MAT-BLK-01, new condition, GBP 28.", output: "Product with sku, and an Offer with itemCondition NewCondition.", why: "Extra fields help when they're true." },
    ],
  },
  guidance: {
    heading: "Product schema,",
    accent: "done honestly.",
    items: [
      { title: "Product markup is not a product listing", text: "This generator formats structured data for an existing product page. It doesn't create a merchant account, submit products to Google Shopping or guarantee a rich result. The markup must match what's visible on the page." },
      { title: "Reviews and ratings must be real", text: "Don't add star ratings, testimonials or stock statuses unless they come from genuine information shown on your site. Fake values make the markup misleading and break search guidelines. This tool never adds ratings." },
    ],
  },
  faqs: [
    { q: "What is Product schema?", a: "Structured data describing a specific product, such as its name, image, seller and offer." },
    { q: "Does every Product schema need a price?", a: "Basic Product markup can leave price out, but merchant listing experiences need offer details." },
    { q: "Should I add Product schema to category pages?", a: "Google's product guidance focuses on individual products and their variants, not category listings." },
    { q: "Can I add reviews that aren't on my site?", a: "No. Only include genuine information that's on the page and meets the guidelines." },
    { q: "Does this guarantee Google stars or shopping visibility?", a: "No. Search engines control eligibility and display." },
    { q: "Where should the code be installed?", a: "On the real product page, ideally through your site's template or structured data settings." },
  ],
  related: [
    { slug: "json-ld-schema-validator", text: "Check the markup before you publish." },
    { slug: "shopify-sku-generator", text: "Create consistent SKUs for variants." },
    { slug: "shopify-product-title-generator", text: "Write a clear product title." },
  ],
  cta: { heading: "Want more from", accent: "product search?", copy: "I help stores fix the technical SEO behind product visibility.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Generate Product JSON-LD from your real product details, with no invented ratings or prices.", cta: "Generate Product schema" },
  sources: [{ label: "Google: Merchant listing structured data", url: "https://developers.google.com/search/docs/appearance/structured-data/merchant-listing", checked: "October 2026" }],
} satisfies NewToolContent;
