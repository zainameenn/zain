import type { NewToolContent } from "../content-types";

export default {
  slug: "local-service-page-outline-generator",
  name: "Local Service Page Outline Generator",
  keyword: "local service page outline generator",
  metaTitle: "Local Service Page Outline Generator (100% FREE)",
  metaDescription: "Local service page outline generator that plans a useful page for a local business from your real services, service area and customer questions.",
  lede: "This local service page outline generator turns a local service into a page customers can understand. Tell it what you offer and where you work, and get one clear outline that explains the service, answers common questions and leads to contact.",
  sub: "Turn a local service into a page customers can understand.",
  trust: "Free, no signup. What you type is sent to a free AI service to write your result and isn't stored, so only include public, non-sensitive details.",
  steps: [
    { title: "Name the service and area", text: "Name the service and the area you genuinely cover." },
    { title: "Add what you know", text: "Add real details that make the service useful, like your process or limits." },
    { title: "Write the page", text: "Use the outline to write one accurate, customer focused page." },
  ],
  examples: {
    heading: "Page outlines,",
    accent: "built on real details.",
    intro: "Illustrative outlines. Proof sections are placeholders for evidence you actually have.",
    items: [
      { title: "Basement waterproofing in Lahore", input: "Service basement waterproofing, area Lahore, audience homeowners.", output: "H1, then signs of water getting in, the inspection process, common questions, service limits and a quote CTA.", why: "Covers what a homeowner needs to decide." },
      { title: "Emergency plumber", input: "Emergency plumbing, Leeds, real detail: callouts 7am to 10pm only.", output: "An availability section that states the real hours, not 24/7.", why: "The outline sticks to what you told it." },
      { title: "No credentials given", input: "Gutter cleaning, Denver.", output: "A placeholder: add licences or insurance details if you have them.", why: "Proof is never invented." },
    ],
  },
  guidance: {
    heading: "Local pages",
    accent: "that earn trust.",
    items: [
      { title: "Local pages should be real pages, not city swaps", text: "A service page needs practical information about what you actually offer. Dozens of near identical pages with only the city changed make weak, unhelpful content. Each location deserves genuinely different information." },
      { title: "What proof belongs on a service page?", text: "Real licensing where relevant, your process, examples of work, genuine reviews and clear areas served all help people decide. Use proof you actually have. A template should never manufacture credibility." },
    ],
  },
  faqs: [
    { q: "What should a local service page include?", a: "A clear explanation of the service, what customers need, where you work, your real process, relevant proof and a way to get in touch." },
    { q: "Should I make one page for every city?", a: "Only when each page serves a genuinely different need with useful location specific information." },
    { q: "Should I put the city in the H1?", a: "It can help when you really offer the service there. Avoid awkward repetition." },
    { q: "Does the tool write fake reviews?", a: "No. It leaves placeholders for evidence you can verify." },
    { q: "Can I use the outline for multiple services?", a: "Yes, but each service page should have genuinely different details." },
    { q: "Will the outline guarantee local rankings?", a: "No. It's a content plan, not a ranking guarantee or an SEO audit." },
  ],
  related: [
    { slug: "local-business-faq-generator", text: "Write the FAQ section." },
    { slug: "local-seo-keyword-modifier-generator", text: "Find local phrases to check." },
    { slug: "local-business-schema-generator", text: "Add LocalBusiness markup." },
  ],
  cta: { heading: "Want more local leads?", accent: "Let's get you found.", copy: "I help service businesses turn local searches into enquiries.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Plan one useful local service page from your real service, area and process.", cta: "Create a page outline" },
  sources: [{ label: "Google: Spam policies, including doorway pages", url: "https://developers.google.com/search/docs/essentials/spam-policies", checked: "October 2026" }],
} satisfies NewToolContent;
