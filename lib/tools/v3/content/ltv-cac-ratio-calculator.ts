import type { NewToolContent } from "../content-types";

export default {
  slug: "ltv-cac-ratio-calculator",
  name: "LTV to CAC Ratio Calculator",
  keyword: "ltv to cac ratio calculator",
  metaTitle: "LTV to CAC Ratio Calculator (100% FREE)",
  metaDescription: "Calculate customer lifetime value to acquisition cost using gross margin and churn assumptions. See the ratio, formula and limitations for your SaaS business.",
  lede: "This LTV to CAC ratio calculator estimates customer lifetime value from your average revenue, gross margin and churn, then compares it with your acquisition cost.",
  sub: "Find out what each acquired customer is worth relative to cost.",
  trust: "Free, no signup. Runs in your browser, nothing is sent anywhere.",
  steps: [
    { title: "Enter revenue and margin", text: "Add monthly revenue per customer and gross margin." },
    { title: "Add churn and CAC", text: "Enter monthly customer churn and average acquisition cost." },
    { title: "Review the result", text: "Compare modeled lifetime value against CAC." },
  ],
  examples: {
    heading: "LTV to CAC,",
    accent: "worked through.",
    intro: "Illustrative numbers to show the formula. They aren't benchmarks, and all assume constant churn and margin.",
    items: [
      { title: "A mid market plan", input: "$100 per month, 80% margin, 4% monthly churn, CAC $500.", output: "LTV = 100 x 0.80 / 0.04 = $2,000. Ratio 4.0 : 1. Payback 500 / 80 = 6.25 months.", why: "Assumes constant churn and margin." },
      { title: "A low price plan", input: "$50 per month, 70% margin, 5% monthly churn, CAC $350.", output: "LTV = 50 x 0.70 / 0.05 = $700. Ratio 2.0 : 1. Payback 350 / 35 = 10 months.", why: "Higher churn shortens lifetime and squeezes the ratio." },
      { title: "A sales led plan", input: "$200 per month, 75% margin, 2% monthly churn, CAC $3,000.", output: "LTV = 200 x 0.75 / 0.02 = $7,500. Ratio 2.5 : 1. Payback 3,000 / 150 = 20 months.", why: "A decent ratio can still mean a long wait to earn the spend back." },
    ],
  },
  guidance: {
    heading: "Reading LTV:CAC",
    accent: "properly.",
    items: [
      { title: "LTV isn't total revenue", text: "A customer paying $100 a month isn't $100 of profit. Gross margin covers delivery costs. A simple LTV model combines revenue, margin and expected retention, but real LTV varies by cohort and plan." },
      { title: "The ratio is a diagnostic, not a target", text: "A high ratio can mean room to grow, or underinvestment. A good aggregate can hide poor retention in new cohorts. Look at the inputs and payback period too." },
      { title: "Formula", text: "**LTV = monthly revenue per customer x gross margin ÷ monthly churn** (constant churn model). **Ratio = LTV ÷ CAC.** Lifetime in months = 1 ÷ churn. Payback in months = CAC ÷ (monthly revenue x margin). With zero churn, a finite LTV can't be estimated." },
    ],
  },
  faqs: [
    { q: "What is LTV to CAC?", a: "A comparison of customer lifetime contribution with the average cost to acquire a customer." },
    { q: "How do I estimate LTV for SaaS?", a: "One simple method divides monthly gross profit per customer by monthly churn, assuming churn stays roughly stable." },
    { q: "What is a good LTV:CAC ratio?", a: "Benchmarks vary by business and stage. Treat it as a diagnostic, not a pass or fail score." },
    { q: "Should I use gross revenue or gross profit?", a: "Gross margin adjusted LTV is usually more useful." },
    { q: "What if my monthly churn is zero?", a: "A simple model can't estimate a finite lifetime. Use observed retention data or a realistic time horizon." },
    { q: "Can LTV:CAC tell me whether to buy more ads?", a: "Not alone. Look at payback, cash, cohorts and channel quality." },
  ],
  related: [
    { slug: "customer-acquisition-cost-calculator", text: "Work out your CAC first." },
    { slug: "break-even-roas-calculator", text: "See the ROAS your ads need." },
    { slug: "shopify-profit-margin-calculator", text: "Check what each order really earns." },
  ],
  cta: { heading: "Unit economics not adding up?", accent: "Let's find out why.", copy: "I start by finding the real constraint, then fix that first.", button: "See growth strategy", href: "/services/saas-growth-consultant" },
  hubCard: { description: "Estimate customer lifetime value from margin and churn, and compare it with your acquisition cost.", cta: "Calculate LTV:CAC" },
  sources: [{ label: "Launch Llama: LTV to CAC calculator (competitor reference)", url: "https://tools.launchllama.co/tools/ltv-cac-calculator", checked: "October 2026" }],
} satisfies NewToolContent;
