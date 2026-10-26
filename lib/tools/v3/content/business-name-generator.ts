import type { NewToolContent } from "../content-types";

export default {
  slug: "business-name-generator",
  name: "Business Name Generator",
  keyword: "business name generator",
  metaTitle: "Business Name Generator (100% FREE)",
  metaDescription: "Generate a business name based on your industry, customers and brand style. Get one memorable suggestion and learn how to check names, domains and trademarks.",
  lede: "This business name generator uses what you're building, who it's for and how you want it to feel to suggest one name with a reason behind it, not a random list of words.",
  sub: "Start with a business name that makes sense.",
  trust: "Free, no signup. What you type is sent to an AI provider to write your result and isn't stored, so don't include anything private. A creative name is not proof that it is legally available or free to register.",
  steps: [
    { title: "Describe what you offer", text: "Say what you sell or offer in a sentence." },
    { title: "Choose an identity", text: "Pick the identity that fits your audience." },
    { title: "Review and check", text: "Review the name, then separately check legal registration, domain and social handles." },
  ],
  examples: {
    heading: "Business names,",
    accent: "with the thinking behind them.",
    intro: "Illustrative suggestions only. No availability or trademark search was performed for any of them.",
    items: [
      { title: "Coffee shop bookkeeping", input: "Easy to use bookkeeping software for independent coffee shops, warm and simple.", output: "CupLedger", why: "Connects the coffee shop audience with the bookkeeping purpose." },
      { title: "Dog walking", input: "Small group dog walks for busy owners in one neighbourhood, friendly.", output: "Lead the Way Walks", why: "A light pun on the lead that still says exactly what the service is." },
      { title: "Bike repair", input: "Mobile bicycle repair that comes to your home, practical.", output: "Doorstep Spokes", why: "Says where the service happens and what it fixes in two words." },
    ],
  },
  guidance: {
    heading: "What makes a good",
    accent: "business name.",
    items: [
      { title: "Distinctive beats complicated", text: "A business name needs to work in real conversations, website navigation and receipts. The best name is not always the most unusual spelling. Prefer clarity, pronunciation and enough flexibility for new products. If the name needs a paragraph of explanation, reconsider it." },
      { title: "Availability has several meanings", text: "A name can appear unused online and still conflict with a registered trademark. A domain might be available while the company name is not. Treat business registry, trademark and domain searches as separate checks and consult qualified counsel when necessary." },
    ],
  },
  faqs: [
    { q: "What makes a good business name?", a: "It's easy to recognize, spell and remember, fits your audience, and doesn't prevent future growth." },
    { q: "Should I use a keyword in my company name?", a: "Use one if it helps clarity. You don't need to put every service into the company name." },
    { q: "How do I check business name availability?", a: "Check the relevant business registration authority, trademark database, domain registrars and social platforms separately." },
    { q: "Can two businesses use the same name?", a: "Sometimes, depending on territory and industry, but trademark and business registration rules differ. Never assume it's legal because another company is in another country." },
    { q: "Is an invented name better than a descriptive name?", a: "Neither always wins. Descriptive names are immediately understandable. Invented names can be more distinctive but may need explanation." },
    { q: "Can AI generate a trademark safe name?", a: "AI can suggest names, but it cannot guarantee legal clearance. Research and legal review are separate steps." },
  ],
  related: [
    { slug: "shopify-store-name-generator", text: "Name an online store." },
    { slug: "domain-name-ideas-generator", text: "Find a domain idea for the name." },
    { slug: "business-slogan-generator", text: "Add a slogan to go with it." },
  ],
  cta: { heading: "Got the name,", accent: "now need customers?", copy: "I help new businesses and SaaS founders find their first growth channels. Tell me what you're building.", button: "Tell me what's stuck", href: "/contact" },
  hubCard: { description: "Get one business name with a clear reason behind it, plus how to check names, domains and trademarks.", cta: "Name your business" },
  sources: [
    { label: "Shopify business name generator (competitor reference)", url: "https://www.shopify.com/tools/business-name-generator", checked: "October 2026" },
  ],
} satisfies NewToolContent;
