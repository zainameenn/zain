import type { NewToolContent } from "../content-types";

export default {
  slug: "shopify-sku-generator",
  name: "Shopify SKU Generator",
  keyword: "shopify sku generator",
  metaTitle: "Shopify SKU Generator (100% FREE)",
  metaDescription: "Shopify SKU generator that builds consistent codes for products and variants from type, color, size and a sequence. Export the list as CSV.",
  lede: "This shopify sku generator gives every product variant a SKU that makes sense. Choose a simple code format, enter your product attributes, and generate consistent, inventory friendly codes that are easy to export.",
  sub: "Give every product variant a SKU that makes sense.",
  trust: "Free, no signup. Runs in your browser, nothing is sent anywhere.",
  steps: [
    { title: "Enter prefix and variants", text: "Enter your product prefix and the variant options, like colors and sizes." },
    { title: "Choose a pattern", text: "Pick one consistent format: separator, sequence and length." },
    { title: "Check and import", text: "Check for duplicates, then paste or import the SKUs into Shopify." },
  ],
  examples: {
    heading: "SKU systems,",
    accent: "that stay consistent.",
    intro: "Illustrative codes. Your store's existing SKUs are only checked if you paste them in.",
    items: [
      { title: "Desk mat in colors and sizes", input: "Prefix MAT, colors BLK, BLU, sizes S, L, sequence on.", output: "MAT-BLK-S-001, MAT-BLK-L-002, MAT-BLU-S-003, MAT-BLU-L-004", why: "Four variants, four unique codes." },
      { title: "T-shirts without a sequence", input: "Prefix TEE, colors WHT, NVY, sizes S, M, L, sequence off.", output: "TEE-WHT-S, TEE-WHT-M ... TEE-NVY-L (6 codes).", why: "Attributes alone already make each code unique." },
      { title: "Clash with your store", input: "The desk mat codes plus an existing SKU list containing MAT-BLK-S-001.", output: "1 duplicate flagged.", why: "Catch clashes before importing." },
    ],
  },
  guidance: {
    heading: "SKUs that",
    accent: "keep working.",
    items: [
      { title: "What is a SKU?", text: "A SKU is an internal code used to track and tell apart your inventory. It's different from a barcode or GTIN. Shopify suggests keeping SKUs short, consistent and unique for each variant." },
      { title: "Design a system you can keep using", text: "If BLK means black on one product, use it the same way everywhere. Avoid ambiguous codes and plan for new variants. This tool formats codes; it isn't a registry of what's already in your store." },
    ],
  },
  faqs: [
    { q: "What is a Shopify SKU?", a: "A code you assign to identify products and variants in your inventory." },
    { q: "Is a SKU the same as a barcode?", a: "No. A barcode or GTIN identifies products in other systems. A SKU is usually internal." },
    { q: "Does every variant need its own SKU?", a: "Unique SKUs per variant make stock tracking and reporting accurate." },
    { q: "Can SKU codes contain letters?", a: "Yes. Letters and numbers are common. Shopify recommends simple, consistent formats." },
    { q: "How do I prevent duplicate SKUs?", a: "Paste an export of your existing SKUs into the tool, and it flags any clashes before you import." },
    { q: "Can this tool update my Shopify store?", a: "No. It makes codes and a CSV. It never connects to your store." },
  ],
  related: [
    { slug: "shopify-product-title-generator", text: "Write titles for the same products." },
    { slug: "product-schema-generator", text: "Add SKUs to your product markup." },
    { slug: "shopify-profit-margin-calculator", text: "Check what each variant earns." },
  ],
  cta: { heading: "Growing a store?", accent: "Let's bring in buyers.", copy: "I run ads and SEO for stores that want profitable growth.", button: "See ads services", href: "/services/google-and-meta-ads-specialist" },
  hubCard: { description: "Build consistent SKU codes for every variant, check duplicates and export a CSV.", cta: "Generate SKUs" },
  sources: [{ label: "Shopify: Using SKUs", url: "https://help.shopify.com/en/manual/products/details/sku", checked: "October 2026" }],
} satisfies NewToolContent;
