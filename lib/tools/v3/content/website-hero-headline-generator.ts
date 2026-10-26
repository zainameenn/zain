import type { NewToolContent } from "../content-types";

export default {
  slug: "website-hero-headline-generator",
  name: "Website Hero Headline Generator",
  keyword: "website hero headline generator",
  metaTitle: "Website Hero Headline Generator (100% FREE)",
  metaDescription: "Generate a clear homepage or landing page hero headline from your offer, audience and real benefit. Get one headline and supporting subheading.",
  lede: "This website hero headline generator takes who you help and what you offer, then writes a specific homepage headline and subheading without empty marketing buzzwords.",
  sub: "Make the first screen explain what you do.",
  trust: "Free, no signup. What you type is sent to an AI provider to write your result and isn't stored, so don't include anything private.",
  steps: [
    { title: "Describe the offer", text: "Say what you offer and who it's for." },
    { title: "State the benefit", text: "Name the most important practical benefit." },
    { title: "Check it stands alone", text: "Make sure a visitor can understand the headline without reading the rest of the page." },
  ],
  examples: {
    heading: "Hero copy,",
    accent: "written out.",
    intro: "Illustrative businesses and results. Your output will depend on what you enter.",
    items: [
      { title: "Bakery software", input: "Invoicing and stock tracking for wholesale bakeries; small bakery teams; keep stock and balances in one place.", output: "Headline: \"Wholesale bakery orders, stock and invoices in one place.\" Subheading: \"Track what's available, prepare invoices at handover and keep customer balances clear without juggling spreadsheets.\"", why: "Says what it is and who it's for in one line." },
      { title: "A bookkeeping service", input: "Monthly bookkeeping for independent cafés; owners short on time; books ready for tax season.", output: "Headline: \"Monthly bookkeeping for independent cafés.\" Subheading: \"Send your receipts, and we keep your books up to date so tax season isn't a scramble.\"", why: "The subheading explains how it works." },
      { title: "A scheduling app", input: "Shift scheduling for small clinics; practice managers; fewer last minute gaps.", output: "Headline: \"Shift scheduling built for small clinics.\" Subheading: \"Plan rotas, swap shifts and spot gaps early, all from one shared calendar.\"", why: "Concrete actions instead of abstract promises." },
    ],
  },
  guidance: {
    heading: "Writing a hero",
    accent: "that's clear.",
    items: [
      { title: "A hero should answer the obvious question", text: "Visitors want to know what you sell, who it helps and what to do next. Many headlines sound polished but hide the product behind abstract language. A specific sentence beats \"Redefining the future of success.\"" },
      { title: "Use the subheading for context", text: "The headline carries the offer; the subheading explains what's included or how it works. Keep the CTA honest and linked to a real action, like viewing packages, booking a call or trying the tool." },
    ],
  },
  faqs: [
    { q: "What is a website hero headline?", a: "The main heading at the top of a homepage or landing page that introduces the offer." },
    { q: "How long should a hero headline be?", a: "Long enough to communicate the offer, short enough to understand at a glance." },
    { q: "Should the headline include a keyword?", a: "Use a relevant term when natural, but clarity comes first." },
    { q: "Do I need a subheading?", a: "Helpful when the headline can't explain what's included or how it works." },
    { q: "Should I include numbers or results?", a: "Only when true, attributed and relevant." },
    { q: "Can AI make my landing page convert better?", a: "It can draft copy; better conversion needs testing with real visitors." },
  ],
  related: [
    { slug: "business-slogan-generator", text: "Find a short line for your brand." },
    { slug: "saas-value-proposition-generator", text: "Sharpen the offer behind the headline." },
    { slug: "meta-description-generator", text: "Write the snippet people see in search." },
  ],
  cta: { heading: "Visitors not converting?", accent: "Let's find out why.", copy: "I start by finding the real constraint, then fix that first.", button: "See growth strategy", href: "/services/saas-growth-consultant" },
  hubCard: { description: "Write a clear homepage or landing page hero headline and subheading from your offer and audience.", cta: "Write hero copy" },
  sources: [],
} satisfies NewToolContent;
