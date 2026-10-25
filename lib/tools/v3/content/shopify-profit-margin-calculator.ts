import type { NewToolContent } from "../content-types";

export default {
  slug: "shopify-profit-margin-calculator",
  name: "Shopify Profit Margin Calculator",
  keyword: "shopify profit margin calculator",
  metaTitle: "Shopify Profit Margin Calculator (100% FREE)",
  metaDescription: "Shopify profit margin calculator: see profit, margin, markup and break-even price per order, with fees, ads and fixed costs included. Free, no signup.",
  lede: "This Shopify profit margin calculator shows what you really keep on each order. Enter your price and costs to see profit, margin, markup and the price you need to hit your goal.",
  sub: "Gross and net profit, margins, markup, break-even price and price for a target margin.",
  trust: "Free, no signup. It runs in your browser, nothing is sent anywhere.",
  steps: [
    { title: "Enter price and costs", text: "Add your selling price, cost of goods, shipping and packaging." },
    { title: "Add fees and ads", text: "Enter your own payment fee (percent plus fixed), ad cost per order, other variable costs, and your monthly fixed costs and orders." },
    { title: "Read your numbers", text: "See profit and margin per order, your break-even price, and the price you'd need for a target margin." },
  ],
  examples: {
    heading: "Shopify profit",
    accent: "examples",
    intro: "Example payment fees below are made up for the math. Use the rate on your own Shopify plan.",
    items: [
      {
        title: "A healthy product",
        input: "Price $40, cost of goods $12, shipping $5, packaging $1, payment fee 2.9% + $0.30, ads $8 per order. Fixed costs $300 a month, 500 orders.",
        output: "Gross profit $28.00 (70% gross margin), markup 233%. Total cost per order $28.06. Net profit $11.94 (29.9% net margin). Break-even price $27.70. Price for a 40% net margin: $47.11.",
        why: "Ads are the biggest cost after the product itself, so they shape the margin most.",
      },
      {
        title: "A 20% discount",
        input: "Price $60 with 20% off, cost of goods $20, shipping $6, payment fee 2.9% + $0.30, ads $10 per order, no fixed costs.",
        output: "Revenue $48.00. Total cost per order $37.69. Net profit $10.31 (21.5% net margin). At full price it would be $21.96.",
        why: "A 20% discount cut profit by more than half, because costs stayed the same.",
      },
      {
        title: "Ads eating the profit",
        input: "Price $30, cost of goods $9, shipping $4, packaging $1, payment fee 3% + $0.30, ads $15 per order.",
        output: "Total cost per order $30.20. Net profit is negative $0.20 (a 0.7% loss). Break-even price $30.21.",
        why: "The product sells, but each sale costs more than it earns until ad costs come down or the price goes up.",
      },
    ],
  },
  guidance: {
    heading: "Getting a true",
    accent: "margin",
    items: [
      { title: "Use your real payment rate", text: "Shopify Payments rates depend on your plan, your country and the card type. Third party processors charge their own fees. Check [Shopify's pricing page](https://www.shopify.com/pricing) and enter what you actually pay." },
      { title: "Spread ad spend per order", text: "Divide what you spent on ads by the orders they brought in. That gives a fair ad cost per order." },
      { title: "Include fixed costs", text: "Your plan, apps and tools cost money every month. Spread them across your orders to see real net profit." },
      { title: "Count the small things", text: "Packaging, inserts, returns, apps and transaction fees on third party gateways add up over many orders." },
      { title: "Price from the margin you want", text: "Start with your target margin and work backwards. It's easier than raising prices later." },
    ],
  },
  faqs: [
    { q: "How do I calculate Shopify profit?", a: "Take the price the customer pays, then subtract cost of goods, shipping, packaging, payment fees, ad cost per order, other variable costs and a share of your monthly fixed costs. What's left is your net profit per order." },
    { q: "What is profit margin?", a: "Profit margin is profit divided by revenue, shown as a percentage. A $10 profit on a $40 sale is a 25% margin." },
    { q: "What is the difference between profit margin and markup?", a: "Margin compares profit to the selling price. Markup compares profit to the cost. A product that costs $20 and sells for $40 has a 100% markup but a 50% gross margin." },
    { q: "How do payment fees affect profit?", a: "Most processors take a percentage of each order plus a small fixed fee. The fixed part hurts more on cheap orders. Your Shopify Payments rate depends on your plan and country, so check Shopify's pricing page for yours." },
    { q: "How should ad spend be included?", a: "Treat it as a cost per order. Divide your ad spend by the orders it brought in and enter that number. If ads only bring some of your sales, this gives a cautious view of profit." },
    { q: "How do discounts affect margin?", a: "A discount lowers revenue, but your costs stay the same. So the profit drops by the full discount amount, and the margin drops faster than the discount percent suggests." },
    { q: "How much should I price my product?", a: "Enough to cover every cost and leave the margin you need to grow. Use the target margin field to see the price that gets you there, then check it against what similar products sell for." },
    { q: "What costs do ecommerce sellers often forget?", a: "Packaging, payment fees, returns, app subscriptions, free shipping they pay for, and the ad spend behind each sale. Missing these is the most common reason a store feels busy but makes little money." },
  ],
  related: [
    { slug: "etsy-offsite-ads-calculator", text: "Check your profit on Etsy sales too." },
    { slug: "product-description-generator", text: "Write product descriptions that help people buy." },
    { slug: "shopify-store-name-generator", text: "Find a name if you're starting a new store." },
    { slug: "utm-link-builder", text: "Track which campaigns bring your orders." },
  ],
  cta: {
    heading: "Want ads that leave you",
    accent: "a profit?",
    copy: "If ad costs are eating your margin, I can help you tighten targeting and spend where it pays back.",
    button: "See ads services",
    href: "/services/google-and-meta-ads-specialist",
  },
  hubCard: { description: "Work out profit, margin, markup and break-even price per order for your Shopify store.", cta: "Calculate profit margin" },
  sources: [
    { label: "Shopify pricing", url: "https://www.shopify.com/pricing", checked: "October 2026" },
  ],
} satisfies NewToolContent;
