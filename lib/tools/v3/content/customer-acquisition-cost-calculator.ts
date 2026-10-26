import type { NewToolContent } from "../content-types";

export default {
  slug: "customer-acquisition-cost-calculator",
  name: "Customer Acquisition Cost Calculator",
  keyword: "customer acquisition cost calculator",
  metaTitle: "Customer Acquisition Cost Calculator (100% FREE)",
  metaDescription: "Calculate customer acquisition cost (CAC) using your marketing and sales expenses. See the formula, cost breakdown, and examples in seconds.",
  lede: "This customer acquisition cost calculator works out your CAC from your marketing and sales costs and the new customers you won in the same period.",
  sub: "How much does it cost to win a customer?",
  trust: "Free, no signup. Runs in your browser, nothing is sent anywhere.",
  steps: [
    { title: "Choose a reporting period", text: "Use the same month, quarter or year for costs and new customers." },
    { title: "Enter the costs", text: "Include both marketing and sales acquisition spending, not just your ad budget." },
    { title: "Add new customers", text: "Use customers acquired in that same period to get your blended CAC." },
  ],
  examples: {
    heading: "CAC,",
    accent: "worked through.",
    intro: "Illustrative numbers to show the formula. They aren't benchmarks.",
    items: [
      { title: "A monthly CAC", input: "$2,000 marketing, $1,000 sales, 30 new customers in one month.", output: "CAC = (2,000 + 1,000) / 30 = $100", why: "A blended average across every channel that month." },
      { title: "When ads look cheap", input: "$600 on ads, $2,400 of salaries and tools, 20 customers.", output: "CAC = $150, not the $30 the ad dashboard suggests.", why: "Leaving out salaries and tools makes CAC look five times better than it is." },
      { title: "With a known LTV", input: "CAC $100, lifetime gross profit per customer $450 (from real retention data).", output: "LTV to CAC = 4.5 : 1", why: "Only meaningful when the lifetime value is worked out from real data." },
    ],
  },
  guidance: {
    heading: "Getting CAC",
    accent: "right.",
    items: [
      { title: "What is customer acquisition cost?", text: "CAC measures how much a business spends, on average, to gain a new customer. It usually includes advertising, marketing staff, sales costs, tools and a fair share of overhead. A low cost per click isn't a low CAC: if people click but never buy, the spending still exists with no customers to divide it across." },
      { title: "The CAC formula", text: "**CAC = total sales and marketing acquisition costs ÷ new customers acquired.** Spend $2,000 on marketing and $1,000 on sales in a month, gain 30 customers, and CAC is $100. It's a blended average, so it doesn't prove each customer cost $100 or show which channel did the work." },
      { title: "Costs people forget", text: "Salaries, contractor or agency fees, software, creative production, commissions and sales support time. Keep periods consistent: quarter costs need quarter customers. For channel CAC you need believable attribution for that channel and period. Don't divide one platform's ad spend by all your customers." },
      { title: "Is a high CAC automatically bad?", text: "No. CAC only means something next to how much gross profit customers bring in and how long it takes to earn the spend back. A business with long recurring revenue can afford a higher CAC than one making a small one time sale. Compare it with your own unit economics, not a universal target." },
    ],
  },
  faqs: [
    { q: "What is the formula for customer acquisition cost?", a: "Add sales and marketing acquisition spending for a period and divide by the number of new customers acquired in that period." },
    { q: "Should I include salaries in CAC?", a: "Yes, if they're spent on acquiring customers. Allocate shared team costs consistently and note how you did it." },
    { q: "Is CAC the same as cost per acquisition (CPA)?", a: "Not necessarily. CPA can mean the cost of a lead, signup or other campaign action. CAC is the cost of an actual new customer." },
    { q: "What is blended CAC?", a: "Total acquisition spending divided by all new customers in the period, regardless of channel. Channel CAC uses one channel's attributable spend and customers." },
    { q: "What if I spent money but acquired no customers?", a: "CAC can't be calculated with zero new customers. The calculator shows your total spend and \"No customers acquired\" instead of a misleading number." },
    { q: "Should I include existing customer renewals?", a: "No. Renewals aren't new customers. Use genuinely new customers for standard CAC." },
    { q: "How do I know whether CAC is healthy?", a: "Compare it with contribution margin, lifetime gross profit, payback time and your business model. There's no single CAC target for every industry." },
    { q: "Can this calculator show customer lifetime value?", a: "Only the LTV to CAC ratio, and only if you enter a lifetime value you've worked out from real retention and margin data. It never invents one." },
  ],
  related: [
    { slug: "marketing-plan-generator", text: "Plan where the next customers come from." },
    { slug: "shopify-profit-margin-calculator", text: "Check what each order really earns." },
    { slug: "google-ads-negative-keyword-generator", text: "Cut wasted ad spend." },
  ],
  cta: { heading: "CAC too high?", accent: "Let's find out why.", copy: "I start by finding the real constraint, then fix that first.", button: "See growth strategy", href: "/services/saas-growth-consultant" },
  hubCard: { description: "Work out your customer acquisition cost from marketing and sales spend, with the formula shown.", cta: "Calculate CAC" },
  sources: [{ label: "HubSpot: customer acquisition cost", url: "https://www.hubspot.com/glossary/customer-acquisition-cost", checked: "October 2026" }],
} satisfies NewToolContent;
