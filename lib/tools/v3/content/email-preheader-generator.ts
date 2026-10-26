import type { NewToolContent } from "../content-types";

export default {
  slug: "email-preheader-generator",
  name: "Email Preheader Generator",
  keyword: "email preheader generator",
  metaTitle: "Email Preheader Generator (100% FREE)",
  metaDescription: "Create a short email preheader that complements your subject line. Get one natural preview text idea based on your email's message and audience.",
  lede: "This email preheader generator takes your subject and what your email says, then writes one preheader that adds context instead of repeating the subject.",
  sub: "Give your email a better second line.",
  trust: "Free, no signup. What you type is sent to an AI provider to write your result and isn't stored, so don't include anything private.",
  steps: [
    { title: "Paste the subject line", text: "Add the subject exactly as it will be sent." },
    { title: "Explain the email", text: "Describe the email's main point and who receives it." },
    { title: "Review and copy", text: "Read the preheader beside the subject, then copy it into your email platform." },
  ],
  examples: {
    heading: "Preheaders,",
    accent: "written out.",
    intro: "Illustrative emails and results. Your output will depend on what you enter.",
    items: [
      { title: "A product update", input: "Subject \"Your October product update\"; email: three improvements and one bug fix.", output: "\"See the new shortcuts, cleaner reports and the issue we fixed.\"", why: "Adds specifics the subject leaves out." },
      { title: "An order shipped", input: "Subject \"Your order is on its way\"; email: tracking link, delivery expected Thursday.", output: "\"Expected Thursday. Track your parcel any time from this email.\"", why: "For an order update, clarity beats cleverness." },
      { title: "A weekly newsletter", input: "Subject \"5 things we learned this week\"; email: lead story on cutting onboarding time in half.", output: "\"Including how one team halved onboarding time without new tools.\"", why: "A second specific detail gives readers a reason to open." },
    ],
  },
  guidance: {
    heading: "Writing preheaders",
    accent: "that help.",
    items: [
      { title: "Subject and preheader should work together", text: "The subject says what the email is about. The preheader adds a reason to open or useful context, without repeating it. For an order update, clarity beats cleverness. For a newsletter, a second specific detail can make it compelling." },
      { title: "Preview text displays differently", text: "Inboxes show different amounts of text and may pull snippets from the email body. Put the most important message first and test in the email apps your readers use. A character count is a guide, not a universal cutoff." },
    ],
  },
  faqs: [
    { q: "What is an email preheader?", a: "Short preview text that may appear beside or under the subject line in an inbox." },
    { q: "How long should a preheader be?", a: "No universal display limit. Put the core message first and check previews." },
    { q: "Should preheader text repeat the subject?", a: "Usually not." },
    { q: "Can I leave the preheader blank?", a: "Yes, but the inbox may show the start of the email instead." },
    { q: "Is preheader text visible inside the email?", a: "Depends on your template; it can be visually hidden but still used as preview text." },
    { q: "Does a preheader guarantee more opens?", a: "No." },
  ],
  related: [
    { slug: "newsletter-name-generator", text: "Name the newsletter you're sending." },
    { slug: "marketing-plan-generator", text: "Plan where email fits in your marketing." },
    { slug: "changelog-entry-generator", text: "Write the product update itself." },
  ],
  cta: { heading: "Email not bringing customers?", accent: "Let's find out why.", copy: "I start by finding the real constraint, then fix that first.", button: "See growth strategy", href: "/services/saas-growth-consultant" },
  hubCard: { description: "Write one short email preheader that complements your subject line instead of repeating it.", cta: "Write a preheader" },
  sources: [],
} satisfies NewToolContent;
