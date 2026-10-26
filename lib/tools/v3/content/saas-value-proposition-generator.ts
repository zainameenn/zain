import type { NewToolContent } from "../content-types";

export default {
  slug: "saas-value-proposition-generator",
  name: "SaaS Value Proposition Generator",
  keyword: "saas value proposition generator",
  metaTitle: "SaaS Value Proposition Generator (100% FREE)",
  metaDescription: "Write a clear SaaS value proposition based on the customer, problem, product and differentiator. Get one positioning statement with supporting proof questions.",
  lede: "This SaaS value proposition generator takes the customer, the problem and what your product actually does, then writes one value proposition specific enough to test.",
  sub: "Explain why someone should choose your SaaS.",
  trust: "Free, no signup. What you type is sent to an AI provider to write your result and isn't stored, so don't include anything private.",
  steps: [
    { title: "Describe the product", text: "Explain what it does in plain words." },
    { title: "Name who it's for", text: "Identify who feels the problem and what changes with your product." },
    { title: "Test it", text: "Use the statement in interviews or on your site, then check whether it resonates." },
  ],
  examples: {
    heading: "Value propositions,",
    accent: "written out.",
    intro: "Illustrative products and results. Your output will depend on what you enter.",
    items: [
      { title: "A bakery CRM", input: "Simple CRM for independent wholesale bakeries tracking orders and credit alongside stock.", output: "\"A simple wholesale bakery CRM that keeps customer orders, shared stock and credit balances together, so teams can manage handover without juggling separate records.\"", why: "Specific about the user, the workflow and the difference." },
      { title: "A reporting tool", input: "Weekly ad performance reports for small agencies; replaces manual spreadsheet exports.", output: "\"Weekly ad performance reports for small agencies, built automatically so account managers stop exporting spreadsheets every Monday.\"", why: "Turns a feature into the problem it removes." },
      { title: "A booking tool", input: "Online booking for independent dog groomers; reminders cut no shows; replaces phone and text bookings.", output: "\"Online booking for independent dog groomers, with reminders that help cut no shows, so you spend less time answering texts between appointments.\"", why: "Outcome claims stay modest until they're proven with users." },
    ],
  },
  guidance: {
    heading: "Writing a value proposition",
    accent: "that's specific.",
    items: [
      { title: "Value propositions are not feature lists", text: "A feature is what a product has. A value proposition is which customer problem it addresses and why it matters. \"Automated reports\" is a feature; \"weekly performance reporting without manual spreadsheet exports\" is closer to a benefit, if the product really does it." },
      { title: "Positioning needs evidence", text: "\"The only tool for X\" or \"cut costs 80%\" needs proof. Early SaaS teams can still position well by being specific about the workflow, the user and the difference from the obvious alternative." },
    ],
  },
  faqs: [
    { q: "What is a SaaS value proposition?", a: "A concise explanation of the target user, problem, product benefit and why the solution is relevant." },
    { q: "Is a value proposition a slogan?", a: "No. A slogan is memorable brand language; a value proposition makes the offer understandable." },
    { q: "How do I find my product's real differentiator?", a: "Compare customer workflows and alternatives, then validate with users." },
    { q: "Can an early SaaS startup write one without customers?", a: "Yes, as a hypothesis. Mark outcome claims unverified and test them." },
    { q: "Should I mention competitors?", a: "Only for a factual distinction. Don't claim superiority without evidence." },
    { q: "Does clearer positioning guarantee conversions?", a: "No." },
  ],
  related: [
    { slug: "website-hero-headline-generator", text: "Turn it into homepage hero copy." },
    { slug: "business-slogan-generator", text: "Find a short line for your brand." },
    { slug: "customer-acquisition-cost-calculator", text: "Work out what a customer costs you." },
  ],
  cta: { heading: "Positioning not landing?", accent: "Let's sharpen it.", copy: "I start by finding the real constraint, then fix that first.", button: "See growth strategy", href: "/services/saas-growth-consultant" },
  hubCard: { description: "Write one clear SaaS value proposition from your customer, problem, product and differentiator.", cta: "Write a value proposition" },
  sources: [],
} satisfies NewToolContent;
