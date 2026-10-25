import type { NewToolContent } from "../content-types";

export default {
  slug: "etsy-offsite-ads-calculator",
  name: "Etsy Offsite Ads Calculator",
  keyword: "etsy offsite ads calculator",
  metaTitle: "Etsy Offsite Ads Calculator (100% FREE)",
  metaDescription: "Etsy Offsite Ads calculator: see your profit, margin and break-even price with the 15% or 12% fee, Etsy fees and your own costs. Free, no signup.",
  lede: "This Etsy Offsite Ads calculator shows what you keep when a sale comes through an Offsite Ad. Enter your price and costs to see your profit with and without the fee.",
  sub: "Revenue, fees, net profit, margin and your break-even price, side by side.",
  trust: "Free, no signup. It runs in your browser, nothing is sent anywhere.",
  steps: [
    { title: "Enter the order", text: "Add your item price, the shipping you charge and any gift wrap." },
    { title: "Add your costs", text: "Add product cost, shipping you pay, packaging and anything else. Pick your country's processing rate and your Offsite Ads rate." },
    { title: "Read your profit", text: "See net profit and margin, how much the Offsite Ads fee takes, and the lowest price that still breaks even." },
  ],
  examples: {
    heading: "Etsy Offsite Ads",
    accent: "examples",
    intro: "A US seller, with the 6.5% transaction fee, 3% + $0.25 processing and the $0.20 listing fee included.",
    items: [
      {
        title: "Small shop, 15% rate",
        input: "Price $25, shipping charged $5. Product $8, shipping paid $4.50, packaging $1.",
        output: "Order total $30. Fees: transaction $1.95, processing $1.15, Offsite Ads $4.50, listing $0.20. Net profit $8.70 (29.0% margin). Without Offsite Ads: $13.20. Break-even price about $13.48.",
        why: "The 15% fee takes about a third of the profit on this order.",
      },
      {
        title: "Larger shop, 12% rate",
        input: "Price $80, gift wrap $5, free shipping. Product $30, shipping paid $7, packaging $2.",
        output: "Order total $85. Fees: transaction $5.53, processing $2.80, Offsite Ads $10.20, listing $0.20. Net profit $27.28 (32.1% margin). Without Offsite Ads: $37.48.",
        why: "Gift wrap counts toward the order total, so every percentage fee includes it.",
      },
      {
        title: "High price item, fee capped",
        input: "Price $900, free shipping, 15% rate. Product $400, shipping paid $25, packaging $10.",
        output: "15% would be $135, but the fee is capped at $100. Transaction $58.50, processing $27.25, listing $0.20. Net profit $279.05 (31.0% margin). Without Offsite Ads: $379.05.",
        why: "The $100 cap only matters once the order total passes about $667 at 15%, or about $833 at 12%.",
      },
    ],
  },
  guidance: {
    heading: "Getting an honest",
    accent: "number",
    items: [
      { title: "Use the full order total", text: "Etsy's transaction and Offsite Ads fees are based on the item price plus the shipping and gift wrap you charge, not the item price alone." },
      { title: "Check your processing rate", text: "Payment processing depends on the country of your bank account. Check Etsy's payments policy for your rate." },
      { title: "Include every cost", text: "Packaging, labels, inserts and the shipping you actually pay all come out of profit. Small amounts add up on cheap items." },
      { title: "What isn't modelled", text: "VAT, sales tax and currency conversion fees are not included. Add them under other costs or other Etsy fees if they apply to you." },
      { title: "Price for the worst case", text: "If your price still makes a fair profit with Offsite Ads, every other sale is a bonus." },
    ],
  },
  faqs: [
    { q: "What are Etsy Offsite Ads?", a: "Etsy pays to advertise listings on other sites, like Google, Facebook, Instagram and Pinterest. You don't pay to run the ads. You only pay a fee when a buyer clicks one and then buys from your shop." },
    { q: "What are the 12% and 15% rates?", a: "Shops that have never made USD 10,000 or more in any 365 day period pay 15% of the order total. Shops that have reached USD 10,000 pay a lower 12%. The fee on any single order is capped at USD 100." },
    { q: "When is participation mandatory?", a: "Once your shop has made USD 10,000 or more in any 365 day period, Offsite Ads become mandatory for the life of your shop, at the 12% rate, even if sales drop later." },
    { q: "Can sellers opt out?", a: "Yes, if your shop has never reached USD 10,000 in a 365 day period. You can opt out in your shop settings. Once you cross the threshold, you can't." },
    { q: "Which orders are attributed to Offsite Ads?", a: "An order is attributed when a buyer clicks an Offsite Ad for your shop and buys from you within 30 days. Separate purchases from your shop in that window can each be charged a fee." },
    { q: "How does the fee affect profit?", a: "The fee comes straight out of what you earn on that order, on top of the normal transaction and processing fees. On low margin items, a 15% fee can take most of the profit." },
    { q: "Are Offsite Ads worth it?", a: "It depends on your margins. You only pay when there's a sale, and that sale may not have happened otherwise. If your price still leaves a fair profit after the fee, it's usually fine. If not, look at your pricing, or opt out while you still can." },
    { q: "How can sellers calculate break-even pricing?", a: "Add up your costs per order, then find the price where the percentage fees plus those costs equal the order total. This calculator does it for you and shows the break-even price with the Offsite Ads fee included." },
  ],
  related: [
    { slug: "etsy-title-generator", text: "Write Etsy titles that help buyers find your listings." },
    { slug: "shopify-profit-margin-calculator", text: "Work out margins if you also sell on your own store." },
    { slug: "product-description-generator", text: "Write clear product descriptions for your listings." },
    { slug: "etsy-shop-name-generator", text: "Find a name if you're starting a new shop." },
  ],
  cta: {
    heading: "Want more Etsy sales from",
    accent: "search?",
    copy: "See how I grew an Etsy shop through search, with better titles, tags and listings.",
    button: "Read the case study",
    href: "/case-studies/loompad",
  },
  hubCard: { description: "See your real Etsy profit and break-even price when a sale comes through Offsite Ads at 15% or 12%.", cta: "Calculate Offsite Ads fee" },
  sources: [
    { label: "Etsy Fees & Payments Policy", url: "https://www.etsy.com/legal/fees/", checked: "October 2026" },
    { label: "Etsy Help: How Etsy's Offsite Ads Work", url: "https://help.etsy.com/hc/en-us/articles/360000338367-How-Etsy-s-Offsite-Ads-Work", checked: "October 2026" },
    { label: "Etsy Payments Policy (processing rates by country)", url: "https://www.etsy.com/legal/etsy-payments/", checked: "October 2026" },
    { label: "Etsy Help: Payment Processing Fees", url: "https://help.etsy.com/hc/en-us/articles/115015628847-What-are-Payment-Processing-Fees-for-Selling-on-Etsy", checked: "October 2026" },
  ],
} satisfies NewToolContent;
