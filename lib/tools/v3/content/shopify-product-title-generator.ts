import type { NewToolContent } from "../content-types";

export default {
  slug: "shopify-product-title-generator",
  name: "Shopify Product Title Generator",
  keyword: "shopify product title generator",
  metaTitle: "Shopify Product Title Generator (100% FREE)",
  metaDescription: "Write a clear Shopify product title from your actual product details. Improve confusing supplier titles without inventing features or stuffing keywords.",
  lede: "This Shopify product title generator turns product details or a messy supplier title into one accurate, readable title. No keyword stuffing or made up features.",
  sub: "A product title should tell shoppers what they're buying.",
  trust: "Free, no signup. What you type is sent to an AI provider to write your result and isn't stored, so don't include anything private.",
  steps: [
    { title: "Describe what you sell", text: "Use the actual product category and the details that identify it." },
    { title: "Add important specifications", text: "Include only verified materials, sizes, model compatibility, quantities or variants." },
    { title: "Check the title", text: "Make sure a shopper can tell what the product is before you copy it to Shopify." },
  ],
  examples: {
    heading: "Before and after,",
    accent: "from real looking supplier titles.",
    intro: "Illustrative examples. Every detail in the new title came from the seller.",
    items: [
      { title: "A laptop case", input: "Supplier title: Premium Luxury Computer Protector Shell 2026 New. Seller details: clear matte, snap on, fits 14 inch MacBook Pro (2023).", output: "Clear Matte Snap On Case for 14 Inch MacBook Pro (2023)", why: "Product type first, then the compatibility the seller confirmed. The filler is gone." },
      { title: "A candle", input: "Supplier title: Best Aromatherapy Gift Candle Relax Home Decor. Details: soy wax, lavender, 8 oz, cotton wick.", output: "Lavender Soy Candle, 8 oz, Cotton Wick", why: "Scent, material and size are what candle shoppers compare." },
      { title: "A water bottle", input: "Details: stainless steel, 750 ml, keeps drinks cold 24 hours (from the manufacturer's spec sheet), matte black.", output: "Matte Black Stainless Steel Water Bottle, 750 ml", why: "The 24 hour claim stays in the description, where it can be explained and checked." },
    ],
  },
  guidance: {
    heading: "What makes a strong",
    accent: "Shopify product title.",
    items: [
      { title: "Say what it is, then what matters", text: "A useful title identifies the item quickly and adds the few details that affect a buying decision. Start with what the product is. Include brand, material, size, colour or compatibility when they genuinely matter. Remove filler like \"best ever\" and promises you can't back up." },
      { title: "Product title versus SEO page title", text: "Shopify lets you set the product's name and a separate search engine listing title. The first helps visitors on your store. The second is the page title that may appear in search results, though Google can rewrite it. Shopify notes the search listing title can be cut off past 70 characters. That limit is for the SEO title, not the product name." },
      { title: "Fixing supplier titles", text: "Supplier titles often have repeated keywords, internal codes and vague adjectives. Keep the details that identify the product, check the real specs, and write for a person. If a detail is uncertain, leave it out. This matters most for electronics compatibility, cosmetics, safety claims and products with several variants." },
    ],
  },
  faqs: [
    { q: "How should I write a Shopify product title?", a: "Start with the product category, then add the details shoppers use to choose, like size, colour, material or model compatibility. Keep the wording natural and factual." },
    { q: "Is the product name the same as the SEO title?", a: "No. Shopify has a separate title in the search engine listing settings. You can write them separately while keeping them consistent." },
    { q: "How many characters should a Shopify title contain?", a: "There's no single ideal length for the visible product title. Shopify's SEO title field has its own limits, and search results can shorten or rewrite titles. Aim for clarity, not a character target." },
    { q: "Should I include my brand in every product title?", a: "Include it when the brand helps shoppers understand or tell the product apart. Skip it if repeating it makes every title harder to read." },
    { q: "Can I add SEO keywords to product titles?", a: "Yes, when they accurately describe the item. Repeating near identical terms or adding unrelated keywords makes the title less useful." },
    { q: "How do I improve a generic supplier product title?", a: "Remove filler and repeated words, check the specifications, and put the item type first. Make sure every feature in the new title is true." },
    { q: "Can the generator check product specifications from a URL?", a: "No. It uses only the product information you type, so you control every claim that goes into the title." },
    { q: "Can I generate titles for multiple variants?", a: "Use the details for the specific variant. Don't claim every colour, size or model fits a listing when only one option is described." },
  ],
  related: [
    { slug: "product-description-generator", text: "Write the description to match." },
    { slug: "shopify-profit-margin-calculator", text: "Check the product is profitable." },
    { slug: "seo-title-generator", text: "Write the SEO page title too." },
    { slug: "shopify-store-name-generator", text: "Name your store." },
  ],
  cta: { heading: "Want more people to find", accent: "your products?", copy: "I help ecommerce brands get found in search without paying for every click.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Turn product details or a messy supplier title into one clear, accurate Shopify product title.", cta: "Write a product title" },
  sources: [
    { label: "Shopify Help: adding and updating products", url: "https://help.shopify.com/en/manual/products/add-update-products", checked: "October 2026" },
    { label: "Shopify Help: SEO titles and descriptions", url: "https://help.shopify.com/en/manual/promoting-marketing/seo/adding-keywords", checked: "October 2026" },
  ],
} satisfies NewToolContent;
