import type { NewToolContent } from "../content-types";

export default {
  slug: "landing-page-copy-generator",
  name: "Landing Page Copy Generator",
  keyword: "landing page copy generator",
  metaTitle: "Landing Page Copy Generator (100% FREE)",
  metaDescription: "Landing page copy generator that drafts one focused page from your public offer, audience and proof: headline, benefits, sections and a CTA to edit.",
  lede: "This landing page copy generator makes your offer easier to understand. Tell it who your product or service helps and what it does, and get one complete landing page draft with a clear message and a realistic next step.",
  sub: "Make your offer easier to understand.",
  trust: "Free, no signup. What you type is sent to a free AI service to write your result and isn't stored, so only include public, non-sensitive details.",
  steps: [
    { title: "Explain the offer", text: "Explain your public offer and who it's for." },
    { title: "Choose one goal", text: "Pick the one action you want visitors to take." },
    { title: "Edit with real proof", text: "Edit the draft using true benefits, screenshots and genuine proof before publishing." },
  ],
  examples: {
    heading: "Landing pages,",
    accent: "drafted honestly.",
    intro: "Illustrative offers. Missing proof becomes a placeholder, never a made up quote.",
    items: [
      { title: "SEO audit service", input: "SEO audit for small ecommerce stores, audience shop owners, CTA Request audit.", output: "A page that explains what the audit covers and asks people to get in touch, with no ranking promises.", why: "Benefits come from what the audit includes." },
      { title: "SaaS trial", input: "Booking software for salons, CTA Start free trial, verified: two week trial, no card needed.", output: "H1, three benefits, how it works, and a CTA that mentions the two week trial.", why: "The trial details were supplied, so they're used." },
      { title: "No testimonials yet", input: "Bookkeeping service, no proof given.", output: "Proof section: [Add verified example].", why: "You fill it in with something real." },
    ],
  },
  guidance: {
    heading: "Pages that",
    accent: "convert honestly.",
    items: [
      { title: "One page, one decision", text: "A landing page should make it obvious who it's for, what they get and why to take the next step. Too many competing calls to action distract from the one you want." },
      { title: "Proof must be earned", text: "Customer quotes, revenue figures, awards and guarantees must be real and verifiable. If you have no testimonial or case study, describe your process honestly and leave a placeholder rather than inventing proof." },
    ],
  },
  faqs: [
    { q: "What is landing page copy?", a: "The text that explains a specific offer and leads visitors to one clear next step." },
    { q: "Does this create a working website page?", a: "No. It writes editable text for you or your developer to build." },
    { q: "Should a landing page have one CTA?", a: "One clear main action helps visitors know what to do, though supporting links can still be fine." },
    { q: "Can I generate testimonials?", a: "No. The tool never invents customer quotes. Use real ones you have permission to share." },
    { q: "Can I use this for SaaS and service businesses?", a: "Yes. The structure adapts to the type of offer you describe." },
    { q: "Does this guarantee a conversion increase?", a: "No. Results depend on your offer, audience and testing." },
  ],
  related: [
    { slug: "website-hero-headline-generator", text: "Try other hero headlines." },
    { slug: "saas-value-proposition-generator", text: "Sharpen the value proposition." },
    { slug: "ab-test-sample-size-calculator", text: "Plan a test of the new page." },
  ],
  cta: { heading: "Traffic but no signups?", accent: "Let's fix the page.", copy: "I help SaaS teams turn more visitors into customers.", button: "See growth consulting", href: "/services/saas-growth-consultant" },
  hubCard: { description: "Draft one focused landing page: headline, benefits, how it works, proof placeholders and one CTA.", cta: "Create landing page copy" },
  sources: [],
} satisfies NewToolContent;
