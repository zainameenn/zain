import type { NewToolContent } from "../content-types";

export default {
  slug: "saas-product-name-generator",
  name: "SaaS Product Name Generator",
  keyword: "saas product name generator",
  metaTitle: "SaaS Product Name Generator (100% FREE)",
  metaDescription: "SaaS product name generator that finds one brandable name from your category, audience and style. Check domain and trademark availability separately.",
  lede: "This saas product name generator gives you a product name that tells the right story. Describe what your software helps people do and who it's for, and get one name idea that sounds natural and has room to grow.",
  sub: "A product name that tells the right story.",
  trust: "Free, no signup. What you type is sent to a free AI service to write your result and isn't stored, so only include public, non-sensitive details.",
  steps: [
    { title: "Describe the product", text: "Describe your public product category and who uses it." },
    { title: "Pick a style", text: "Choose the kind of name you want." },
    { title: "Check it", text: "Check the name for conflicts and fit before you use it." },
  ],
  examples: {
    heading: "SaaS names,",
    accent: "with the reasoning.",
    intro: "Illustrative suggestions. None has been checked for domains, trademarks or handles.",
    items: [
      { title: "Scheduling for fitness coaches", input: "Appointment scheduling for independent fitness coaches, small studios, friendly.", output: "Slotwise", why: "Short, easy to say, and hints at booking without naming one feature." },
      { title: "Invoicing for agencies", input: "Invoicing and time tracking for small design agencies, professional.", output: "Ledgerline", why: "Sounds credible and leaves room to add more finance features." },
      { title: "Data tool for analysts", input: "SQL notebook for data analysts, technical.", output: "Querybook", why: "Clear to the audience and simple to spell." },
    ],
  },
  guidance: {
    heading: "Naming",
    accent: "software well.",
    items: [
      { title: "What makes a SaaS name useful?", text: "A strong product name is easy to say, easy to search for and distinct enough to identify the product. It needn't describe every feature. A name tied to one small feature can become awkward as the product grows." },
      { title: "Check before buying a domain", text: "Search existing company and product names, check trademarks in your target markets, and look up domains and social handles yourself. An AI generated name is an idea, not legal clearance." },
    ],
  },
  faqs: [
    { q: "Should a SaaS name explain exactly what the product does?", a: "Not always. It should be understandable and memorable, with your positioning copy explaining the benefit." },
    { q: "Are invented words good names?", a: "Sometimes. They can be distinctive, but should still be easy to pronounce and spell." },
    { q: "Does this tool check registered trademarks?", a: "No. Do a proper trademark search in the markets you sell in." },
    { q: "Does this tool check available domains?", a: "No. Domain availability needs a real lookup with a registrar." },
    { q: "Can I rename an existing SaaS?", a: "Yes, but weigh migration costs, customer confusion, existing backlinks and documentation." },
    { q: "Will the generated name be truly unique?", a: "No generator can promise that without checks." },
  ],
  related: [
    { slug: "domain-name-ideas-generator", text: "Find a domain to match." },
    { slug: "business-name-generator", text: "Name the company too." },
    { slug: "saas-value-proposition-generator", text: "Explain what the product does." },
  ],
  cta: { heading: "Launching a SaaS?", accent: "Let's plan the growth.", copy: "I help SaaS founders find the channels and messaging that bring in customers.", button: "See growth consulting", href: "/services/saas-growth-consultant" },
  hubCard: { description: "Get one brandable SaaS product name from your category, audience and style.", cta: "Name your product" },
  sources: [],
} satisfies NewToolContent;
