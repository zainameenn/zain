import type { NewToolContent } from "../content-types";

export default {
  slug: "customer-retention-rate-calculator",
  name: "Customer Retention Rate Calculator",
  keyword: "customer retention rate calculator",
  metaTitle: "Customer Retention Rate Calculator (100% FREE)",
  metaDescription: "Customer retention rate calculator using customers at the start, new customers gained and customers at the end of a period. See what it tells you.",
  lede: "This customer retention rate calculator shows how many of your existing customers stayed. Enter three customer counts from the same period to calculate retention and see what the number does, and doesn't, tell you.",
  sub: "How many of your existing customers stayed?",
  trust: "Free, no signup. Runs in your browser, nothing is sent anywhere.",
  steps: [
    { title: "Pick one period", text: "Choose one period and one consistent definition of an active customer." },
    { title: "Enter three counts", text: "Enter customers at the start, new customers gained and customers at the end." },
    { title: "Check the assumptions", text: "Read the retention rate and the assumptions behind it." },
  ],
  examples: {
    heading: "Retention,",
    accent: "worked through.",
    intro: "Illustrative numbers to show the formula. They aren't benchmarks.",
    items: [
      { title: "A growing customer base", input: "Start 200, new 50, end 210.", output: "Retained 160 of 200. Retention 80%.", why: "The ending count looks healthy, but 40 existing customers left." },
      { title: "No new customers", input: "Start 500, new 0, end 470.", output: "Retention 94%.", why: "With no new customers, the ending count is all retained ones." },
      { title: "Inconsistent inputs", input: "Start 100, new 10, end 120.", output: "Warning: 110 retained is more than the 100 you started with.", why: "Usually reactivations or a changed definition. The result isn't clamped." },
    ],
  },
  guidance: {
    heading: "Reading retention",
    accent: "properly.",
    items: [
      { title: "New customers aren't retained old customers", text: "If you add many customers, the ending count can look healthy while earlier customers leave. Subtract new customers before measuring how much of the original group stayed." },
      { title: "Cohorts are more precise when available", text: "The three number formula assumes you can separate ending customers into new and retained. Reactivations, transfers or multiple accounts break that. For detailed SaaS analysis, use defined cohorts and consistent event data." },
      { title: "Formula", text: "**Retention = (customers at end minus new customers) ÷ customers at start × 100.**" },
    ],
  },
  faqs: [
    { q: "How is retention rate calculated?", a: "Subtract new customers from customers at the end, then divide by customers at the start." },
    { q: "Can retention exceed 100%?", a: "Not under these assumptions. A result over 100% points to inconsistent inputs or reactivations." },
    { q: "Is retention the opposite of churn?", a: "In a simple fixed group, yes. In real reporting, definitions and reactivations make it less neat." },
    { q: "What is a good retention rate?", a: "It varies widely by product, how often people buy and the period measured. Avoid one universal benchmark." },
    { q: "Should I count free users?", a: "Pick one consistent definition. Paying customer retention and active user retention answer different questions." },
    { q: "Is this the same as net revenue retention?", a: "No. Customer retention counts customers. NRR measures recurring revenue changes from existing customers." },
  ],
  related: [
    { slug: "mrr-calculator", text: "Work out your recurring revenue." },
    { slug: "ltv-cac-ratio-calculator", text: "See what retention means for LTV." },
    { slug: "customer-acquisition-cost-calculator", text: "Compare with acquisition cost." },
  ],
  cta: { heading: "Customers slipping away?", accent: "Let's find out why.", copy: "I help SaaS founders improve the growth loop, not just the top of the funnel.", button: "See growth consulting", href: "/services/saas-growth-consultant" },
  hubCard: { description: "Calculate customer retention from start, new and end counts, with the assumptions explained.", cta: "Calculate retention" },
  sources: [],
} satisfies NewToolContent;
