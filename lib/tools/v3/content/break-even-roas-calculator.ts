import type { NewToolContent } from "../content-types";

export default {
  slug: "break-even-roas-calculator",
  name: "Break-even ROAS Calculator",
  keyword: "break even roas calculator",
  metaTitle: "Break-even ROAS Calculator (100% FREE)",
  metaDescription: "Calculate the ROAS your ads need to reach break even after product and fulfillment costs. See contribution margin and allowable ad spend per order.",
  lede: "This break even ROAS calculator shows the return on ad spend you need to break even, based on what each order earns and costs before advertising.",
  sub: "Know the ROAS your ads actually need.",
  trust: "Free, no signup. Runs in your browser, nothing is sent anywhere.",
  steps: [
    { title: "Enter revenue per order", text: "Use average revenue per order on a consistent tax basis." },
    { title: "Add variable costs", text: "Include the costs that come with each order." },
    { title: "Compare with your ads", text: "Review the break even ROAS and compare it with your ad results." },
  ],
  examples: {
    heading: "Break even ROAS,",
    accent: "worked through.",
    intro: "Illustrative numbers to show the formula. They aren't benchmarks.",
    items: [
      { title: "A typical store order", input: "Net revenue per order $80, variable costs $48.", output: "Contribution $32. Break even ROAS = 80 / 32 = 2.50x. Allowable ad spend per order $32.", why: "Below 2.50x, each ad driven order loses money." },
      { title: "A thin margin product", input: "Net revenue per order $50, variable costs $40.", output: "Contribution $10. Break even ROAS = 50 / 10 = 5.00x. Allowable ad spend per order $10.", why: "A 3x ROAS looks good here but still loses about $6.67 on each $50 order." },
      { title: "A high margin product", input: "Net revenue per order $120, variable costs $30.", output: "Contribution $90. Break even ROAS = 120 / 90 = 1.33x. Allowable ad spend per order $90.", why: "High margins leave far more room to pay for each order." },
    ],
  },
  guidance: {
    heading: "Reading ROAS",
    accent: "properly.",
    items: [
      { title: "Why a 2x ROAS may still lose money", text: "ROAS is ad attributed revenue divided by ad spend; it isn't profit. A low margin business can lose money at a ROAS that looks impressive. Work out what's left after product and fulfillment before deciding what you can pay for an order." },
      { title: "Check attribution and fixed costs separately", text: "Ad platform conversion values and real store sales can differ. The simple calculation covers per order contribution and leaves out fixed overhead. For a company level profit target, include overhead explicitly rather than trusting one universal threshold." },
      { title: "Formula", text: "**Contribution = net revenue per order minus non ad variable costs. Break even ROAS = revenue ÷ contribution**, when contribution is above zero. Allowable ad spend per order equals the contribution. If costs are equal to or higher than revenue, there is no finite break even ROAS." },
    ],
  },
  faqs: [
    { q: "What is break even ROAS?", a: "The return on ad spend needed for sales contribution to cover ad spend under your cost assumptions." },
    { q: "How do I calculate break even ROAS?", a: "Divide revenue per order by the contribution before ads, if it's positive." },
    { q: "Is 2x ROAS profitable?", a: "Depends on margin. At a 50% contribution margin, 2x is break even; lower margins need a higher return." },
    { q: "Does break even ROAS include shipping and payment fees?", a: "It should, when you enter them. Missing costs make the threshold too optimistic." },
    { q: "Should I include sales tax?", a: "Use a consistent basis. Tax collected for remittance isn't your revenue." },
    { q: "Why is my calculator showing no possible break even?", a: "Variable costs use up all revenue before ads, so nothing is left for advertising." },
  ],
  related: [
    { slug: "shopify-profit-margin-calculator", text: "Check what each order really earns." },
    { slug: "customer-acquisition-cost-calculator", text: "Work out what a customer costs you." },
    { slug: "etsy-fee-calculator", text: "Count Etsy fees in your costs." },
  ],
  cta: { heading: "Ads not paying back?", accent: "Let's fix that.", copy: "I run Google and Meta campaigns against real margins, not vanity ROAS.", button: "See ads services", href: "/services/google-and-meta-ads-specialist" },
  hubCard: { description: "Work out the ROAS your ads need to break even, with contribution and allowable ad spend per order.", cta: "Calculate break even ROAS" },
  sources: [],
} satisfies NewToolContent;
