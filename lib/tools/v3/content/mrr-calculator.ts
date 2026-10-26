import type { NewToolContent } from "../content-types";

export default {
  slug: "mrr-calculator",
  name: "MRR Calculator",
  keyword: "mrr calculator",
  metaTitle: "MRR Calculator (100% FREE)",
  metaDescription: "MRR calculator that works out monthly recurring revenue from your plans, normalizes annual billing and estimates ARR with transparent formulas.",
  lede: "This mrr calculator shows what your subscriptions earn each month. Enter your active plans and subscriber counts to see monthly recurring revenue, an annual run rate and a breakdown by plan.",
  sub: "See what your subscriptions earn each month.",
  trust: "Free, no signup. Runs in your browser, nothing is sent anywhere.",
  steps: [
    { title: "Enter your prices", text: "Enter each plan's price and whether it's billed monthly or yearly." },
    { title: "Add subscriber counts", text: "Enter active subscribers for the same point in time." },
    { title: "Read the total", text: "Review each plan's monthly amount and the total MRR." },
  ],
  examples: {
    heading: "MRR,",
    accent: "worked through.",
    intro: "Illustrative numbers to show the formula. They aren't benchmarks.",
    items: [
      { title: "Monthly and annual plans", input: "100 monthly subscribers at $20, 10 annual subscribers at $240 a year.", output: "$2,000 + $200 = $2,200 MRR. Annual run rate $26,400.", why: "Annual plans are divided by 12." },
      { title: "Three tiers", input: "50 at $10, 20 at $49 and 5 at $199, all monthly.", output: "$500 + $980 + $995 = $2,475 MRR.", why: "Each plan is price times active subscribers." },
      { title: "With a recurring discount", input: "40 subscribers at $50 with a 20% recurring discount.", output: "$40 each, $1,600 MRR.", why: "Only discounts that recur every month belong in MRR." },
    ],
  },
  guidance: {
    heading: "Getting MRR",
    accent: "right.",
    items: [
      { title: "How to normalize annual plans", text: "A customer paying $1,200 a year adds about $100 of monthly recurring revenue. That isn't the same as receiving $100 cash each month, or revenue recognized in your accounts." },
      { title: "MRR movement matters too", text: "A snapshot shows your current run rate. New customers, upgrades, downgrades and churn explain why it moves. Track those movements separately rather than mixing snapshots and flows." },
      { title: "Formula", text: "**MRR = sum of (monthly price × active subscribers)**, with annual prices divided by 12. **Annual run rate = MRR × 12.** One time setup fees, refunds and usage charges are left out." },
    ],
  },
  faqs: [
    { q: "What is MRR?", a: "Monthly recurring revenue: the monthly value of your active recurring subscriptions." },
    { q: "How do I treat annual subscriptions?", a: "Divide the annual price by 12 to get its monthly recurring value." },
    { q: "Do one time setup fees count?", a: "Usually not. Track them separately from recurring revenue." },
    { q: "Is MRR the same as monthly cash collected?", a: "No. Billing timing and revenue recognition differ from a normalized run rate." },
    { q: "How do I calculate ARR?", a: "A common simple estimate is MRR multiplied by 12, as long as you define it consistently." },
    { q: "Can I calculate multiple pricing plans?", a: "Yes. Add a row for each plan with its price, billing interval and subscriber count." },
  ],
  related: [
    { slug: "customer-retention-rate-calculator", text: "See how many customers stay." },
    { slug: "ltv-cac-ratio-calculator", text: "Compare lifetime value with CAC." },
    { slug: "customer-acquisition-cost-calculator", text: "Work out what a customer costs." },
  ],
  cta: { heading: "Want MRR", accent: "that keeps growing?", copy: "I help SaaS founders find growth channels that compound.", button: "See growth consulting", href: "/services/saas-growth-consultant" },
  hubCard: { description: "Calculate MRR from your plans, normalize annual billing and see an annual run rate.", cta: "Calculate MRR" },
  sources: [{ label: "Stripe: What is monthly recurring revenue", url: "https://stripe.com/resources/more/what-is-monthly-recurring-revenue", checked: "October 2026" }],
} satisfies NewToolContent;
