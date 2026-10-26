import type { NewToolContent } from "../content-types";

export default {
  slug: "shopify-abandoned-checkout-email-generator",
  name: "Shopify Abandoned Checkout Email Generator",
  keyword: "shopify abandoned checkout email generator",
  metaTitle: "Shopify Abandoned Checkout Email Generator (100% FREE)",
  metaDescription: "Shopify abandoned checkout email generator that drafts a subject line, preview text and honest reminder. No store connection needed.",
  lede: "This shopify abandoned checkout email generator writes a simple reminder without sounding pushy. Describe the product and your real policies, and get one email to review before adding it to Shopify's automation.",
  sub: "A simple reminder, without sounding pushy.",
  trust: "Free, no signup. What you type is sent to a free AI service to write your result and isn't stored, so only include public, non-sensitive details.",
  steps: [
    { title: "Describe the product", text: "Describe the product left behind and choose a tone." },
    { title: "Review the email", text: "Read the subject, preview text and the one reminder message." },
    { title: "Add it to Shopify", text: "Paste the approved text into your abandoned checkout automation and check the real checkout link." },
  ],
  examples: {
    heading: "Reminder emails,",
    accent: "without fake urgency.",
    intro: "Illustrative inputs. The email never adds discounts, countdowns or stock claims you didn't give.",
    items: [
      { title: "Desk mat, understated", input: "Product desk mat, tone understated, verified benefit easy clean surface.", output: "Subject: Your desk mat is still in your cart. Body focuses on the easy clean surface and a simple return to checkout button.", why: "Only the real benefit is used." },
      { title: "With a real offer", input: "Candle set, friendly, verified 10% off code WELCOME10 for first orders.", output: "Mentions the WELCOME10 code once, exactly as given.", why: "Offers appear only when you supply them." },
      { title: "With a public returns policy", input: "Running shoes, direct, public policy free returns within 30 days.", output: "Answers a likely worry with the 30 day free returns line.", why: "A reminder can remove a last doubt." },
    ],
  },
  guidance: {
    heading: "Reminders that",
    accent: "help.",
    items: [
      { title: "The goal is to help, not pressure", text: "A short reminder can answer a last question or make it easy to get back to checkout. Don't use fake countdowns, only two left claims or invented discounts. Confirm policies on your live store." },
      { title: "How Shopify sends these emails", text: "Shopify sends abandoned checkout emails through its own automation and workflow settings. This tool drafts text only. It doesn't send email or access your store. Check the recipient rules and marketing consent that apply to you." },
    ],
  },
  faqs: [
    { q: "What is an abandoned checkout email?", a: "A reminder sent after a shopper starts checkout but doesn't finish buying." },
    { q: "Does this tool send messages?", a: "No. It prepares copy for your store's own email system." },
    { q: "Should I give a discount in every reminder?", a: "No. Only mention real, approved offers when they make sense for your margins." },
    { q: "Can I personalize the email?", a: "Use Shopify's own merge fields, but never paste private customer data into this free AI tool." },
    { q: "How soon should reminders go out?", a: "It depends on your store, consent rules and Shopify settings. Test rather than relying on one best time." },
    { q: "Can I include a checkout link?", a: "Yes, through Shopify's abandoned checkout email flow. A generic draft can't create a real buyer specific checkout link." },
  ],
  related: [
    { slug: "email-preheader-generator", text: "Fine tune the preview text." },
    { slug: "shopify-product-title-generator", text: "Write clearer product titles." },
    { slug: "shopify-profit-margin-calculator", text: "Check what a discount costs you." },
  ],
  cta: { heading: "Carts left behind?", accent: "Let's bring buyers back.", copy: "I run retargeting and ads for stores that want profitable sales.", button: "See ads services", href: "/services/google-and-meta-ads-specialist" },
  hubCard: { description: "Draft one honest abandoned checkout email with subject, preview text and a clear button.", cta: "Draft a reminder email" },
  sources: [{ label: "Shopify: Abandoned checkout automation", url: "https://help.shopify.com/en/manual/promoting-marketing/create-marketing/migrate-abandoned-checkout", checked: "October 2026" }],
} satisfies NewToolContent;
