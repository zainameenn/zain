import type { NewToolContent } from "../content-types";

export default {
  slug: "product-hunt-launch-copy-generator",
  name: "Product Hunt Launch Copy Generator",
  keyword: "product hunt launch copy generator",
  metaTitle: "Product Hunt Launch Copy Generator (100% FREE)",
  metaDescription: "Product Hunt launch copy generator that drafts a tagline, short description and genuine maker comment from your real product details.",
  lede: "This product hunt launch copy generator explains your product without the launch day hype. Describe a public product and what makes it useful, and get one launch pack with a tagline, description and maker comment.",
  sub: "Explain your product without the launch day hype.",
  trust: "Free, no signup. What you type is sent to a free AI service to write your result and isn't stored, so only include public, non-sensitive details.",
  steps: [
    { title: "Describe the product", text: "Enter what your product really does and who uses it." },
    { title: "Review the pack", text: "Read the tagline, description and maker comment together." },
    { title: "Check the guidelines", text: "Compare your final copy with Product Hunt's current launch guide before you submit." },
  ],
  examples: {
    heading: "Launch copy,",
    accent: "kept honest.",
    intro: "Illustrative products. The tool never adds user numbers, press or testimonials.",
    items: [
      { title: "A browser extension", input: "Extension that organizes saved AI conversations, for frequent AI tool users.", output: "Tagline: Keep your AI chats organized and easy to find. Plus a description and maker comment about why it was built.", why: "States the capability, nothing more." },
      { title: "A small SaaS", input: "Invoicing for design studios, built after the maker's own spreadsheet broke.", output: "A maker comment that tells that real story and asks for feedback on recurring invoices.", why: "Uses the story only because it was supplied." },
      { title: "No story given", input: "Product name, what it does and who benefits only.", output: "A maker comment focused on the problem and the feedback wanted, no invented origin.", why: "Missing details are left out, not made up." },
    ],
  },
  guidance: {
    heading: "Launching",
    accent: "on Product Hunt.",
    items: [
      { title: "Your page should introduce the product", text: "Visitors should understand the practical benefit quickly. A good tagline describes the product without exaggerated claims. The maker comment can tell the real reason you built it and what feedback you want." },
      { title: "Community matters more than vote tricks", text: "Engage honestly with questions and feedback. Product Hunt says not to ask directly for upvotes or offer vote incentives. This tool only drafts copy. It can't submit, promote or guarantee featuring." },
      { title: "Length limits", text: "The tagline is checked against **60 characters** and the description against **260 characters**, from Product Hunt's current launch guide. Check the guide in case they change." },
    ],
  },
  faqs: [
    { q: "What goes on a Product Hunt launch page?", a: "A product name, short tagline, description, real screenshots and other details, with a maker comment introducing the product." },
    { q: "How long can the tagline be?", a: "Product Hunt currently allows 60 characters. Check its latest guidance before publishing." },
    { q: "How long is the product description?", a: "Product Hunt's current launch guide allows up to 260 characters." },
    { q: "Should I include my founder story?", a: "Yes, when it's true and relevant. Explain why you built it rather than inventing an origin story." },
    { q: "Can I ask for upvotes?", a: "Product Hunt advises against asking for upvotes directly. Ask people to try it, comment or give feedback instead." },
    { q: "Does this tool publish my launch?", a: "No. It prepares editable text for you to review and submit yourself." },
  ],
  related: [
    { slug: "saas-value-proposition-generator", text: "Sharpen the core message first." },
    { slug: "website-hero-headline-generator", text: "Match your homepage headline." },
    { slug: "changelog-entry-generator", text: "Announce what ships next." },
  ],
  cta: { heading: "Launch coming up?", accent: "Let's plan it.", copy: "I help SaaS founders plan launches that bring customers, not just a busy day.", button: "See growth consulting", href: "/services/saas-growth-consultant" },
  hubCard: { description: "Draft a Product Hunt tagline, description and maker comment from your real product details.", cta: "Draft launch copy" },
  sources: [{ label: "Product Hunt: Launch guide", url: "https://help.producthunt.com/en/articles/17350772-launch-guide", checked: "October 2026" }],
} satisfies NewToolContent;
