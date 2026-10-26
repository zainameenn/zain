import type { NewToolContent } from "../content-types";

export default {
  slug: "changelog-entry-generator",
  name: "Changelog Entry Generator",
  keyword: "changelog entry generator",
  metaTitle: "Changelog Entry Generator (100% FREE)",
  metaDescription: "Turn a shipped product change into a clear changelog entry. Draft one release note with what's new, what's fixed and a useful explanation for customers.",
  lede: "This changelog entry generator takes what shipped and who it helps, then writes one changelog entry ready to review, edit and publish.",
  sub: "Turn product changes into updates people can understand.",
  trust: "Free, no signup. What you type is sent to an AI provider to write your result and isn't stored, so don't include anything private. Don't paste private issue trackers or security details.",
  steps: [
    { title: "Summarize the change", text: "Describe what actually shipped without confidential details." },
    { title: "Choose the type", text: "Pick whether it's new, improved, fixed or removed." },
    { title: "Check before publishing", text: "Confirm the release date and availability." },
  ],
  examples: {
    heading: "Changelog entries,",
    accent: "written out.",
    intro: "Illustrative changes and results. Your output will depend on what you enter.",
    items: [
      { title: "A new export", input: "\"Added CSV export to keyword groups\", new, SEO marketers, live for all.", output: "Title \"Export Keyword Clusters as CSV\". Summary \"Keyword groups can now be downloaded as CSV files, making it easier to review and organize them in a spreadsheet.\"", why: "Explains what users can now do, not what the code changed." },
      { title: "A bug fix", input: "\"Fixed timezone bug in scheduled reports\", fixed, account admins, live for all.", output: "Title \"Scheduled Reports Now Send at the Right Time\". Summary \"Reports scheduled in a timezone other than UTC were arriving an hour early or late. They now send at the time you set.\"", why: "Describes the problem that no longer happens." },
      { title: "A beta feature", input: "\"Team comments on dashboards\", new, Pro plan only, beta.", output: "Title \"Comment on Dashboards (Beta)\". Summary \"Pro plan teams can now leave comments on dashboards. This feature is in beta, so let us know what works and what doesn't.\"", why: "States plan limits and beta status instead of saying it's for everyone." },
    ],
  },
  guidance: {
    heading: "Writing a changelog",
    accent: "people read.",
    items: [
      { title: "Write for users, not the code repository", text: "A commit message might say \"refactor query handler\". A useful changelog explains what someone can now do or what problem no longer happens. Small technical changes can be combined into one meaningful release." },
      { title: "Accuracy builds trust", text: "Don't say \"available to everyone\" for a beta feature. Don't invent dates or screenshots. If a feature needs user action or is limited to some plans, say so." },
    ],
  },
  faqs: [
    { q: "What is a changelog?", a: "A dated record of meaningful changes to a product or website, written so users understand what's different." },
    { q: "What belongs in a changelog?", a: "New features, material improvements, important fixes, availability changes and significant removals." },
    { q: "Are release notes the same as a changelog?", a: "They overlap. Release notes summarize a version; a changelog is an ongoing history." },
    { q: "Should every bug fix get its own page?", a: "Not necessarily. Group minor fixes unless the impact merits its own note." },
    { q: "How do I write a useful product update?", a: "Lead with the user visible change, explain who benefits, and add steps or limits." },
    { q: "Can this tool publish directly to my website?", a: "No. It writes copy to review and publish in your own CMS or changelog. For an example, see [our own changelog](https://www.zainameen.com/changelog)." },
  ],
  related: [
    { slug: "saas-value-proposition-generator", text: "Explain why your product matters." },
    { slug: "email-preheader-generator", text: "Write preview text for the update email." },
    { slug: "website-hero-headline-generator", text: "Make your homepage explain what you do." },
  ],
  cta: { heading: "Shipping but not growing?", accent: "Let's find out why.", copy: "I start by finding the real constraint, then fix that first.", button: "See growth strategy", href: "/services/saas-growth-consultant" },
  hubCard: { description: "Turn a shipped product change into one clear changelog entry your customers can understand.", cta: "Write a changelog entry" },
  sources: [],
} satisfies NewToolContent;
