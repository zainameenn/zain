import type { NewToolContent } from "../content-types";

export default {
  slug: "json-ld-schema-validator",
  name: "JSON-LD Schema Validator",
  keyword: "json-ld schema validator",
  metaTitle: "JSON-LD Schema Validator (100% FREE)",
  metaDescription: "JSON-LD schema validator that checks structured data for valid JSON, schema types and common missing fields before you test rich result eligibility.",
  lede: "This json-ld schema validator checks your structured data before you publish it. Paste JSON-LD or HTML with schema scripts to find syntax problems, missing common properties and details to review, without uploading your code.",
  sub: "Check your structured data before publishing it.",
  trust: "Free, no signup. Runs in your browser, nothing is sent anywhere.",
  steps: [
    { title: "Paste your code", text: "Paste the JSON-LD, or the HTML that contains it, from your page." },
    { title: "Read errors and warnings", text: "Errors break the markup. Warnings are worth reviewing." },
    { title: "Fix and confirm", text: "Fix mistakes, then confirm eligibility with Google's Rich Results Test." },
  ],
  examples: {
    heading: "Validation results,",
    accent: "in plain words.",
    intro: "Illustrative snippets and what the validator reports.",
    items: [
      { title: "A minimal product", input: "{\"@context\":\"https://schema.org\",\"@type\":\"Product\",\"name\":\"Desk Mat\"}", output: "Valid JSON, type Product. Warnings: no image or offers.", why: "Fine as basic markup, but not enough for merchant listings." },
      { title: "A trailing comma", input: "A LocalBusiness block with a comma after the last property.", output: "Error: invalid JSON, with the line and column.", why: "One stray comma makes the whole block unreadable." },
      { title: "Several blocks on one page", input: "HTML with an Organization script and a BreadcrumbList script.", output: "2 blocks found, each checked separately.", why: "Pages often carry more than one schema block." },
    ],
  },
  guidance: {
    heading: "What validation",
    accent: "can tell you.",
    items: [
      { title: "Syntax versus rich result eligibility", text: "A JSON-LD block can be valid JSON while breaking schema rules, or not qualify for a Google feature. This tool checks syntax and selected documented rules. Google's Rich Results Test is the authority on Google's supported rich result types." },
      { title: "Do not add facts only to satisfy a test", text: "If your page has no genuine reviews, ratings, prices or availability, don't make those fields up. Structured data should match what visitors can see on the page." },
    ],
  },
  faqs: [
    { q: "What is JSON-LD?", a: "A JSON format commonly used to describe structured data on a web page." },
    { q: "Does valid JSON mean valid schema?", a: "No. Syntax, schema vocabulary and Google's feature rules are three different tests." },
    { q: "Does schema markup guarantee a rich result?", a: "No. Search engines decide eligibility and display using several factors." },
    { q: "Can I validate multiple blocks?", a: "Yes, including separate scripts and @graph nodes, within reasonable size limits." },
    { q: "Should I add fake ratings when the tool warns about ratings?", a: "Never. Leave unsupported fields out and only use genuine, visible information." },
    { q: "Will this tool modify my website?", a: "No. It reads what you paste and lists findings. Nothing is changed or sent anywhere." },
  ],
  related: [
    { slug: "product-schema-generator", text: "Generate Product markup to test." },
    { slug: "local-business-schema-generator", text: "Generate LocalBusiness markup." },
    { slug: "open-graph-tags-generator", text: "Add social preview tags too." },
  ],
  cta: { heading: "Want rich results", accent: "that actually show?", copy: "I set up structured data and technical SEO that search engines can use.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Check JSON-LD for valid JSON, schema types and common missing fields, right in your browser.", cta: "Validate JSON-LD" },
  sources: [{ label: "Google: Structured data introduction", url: "https://developers.google.com/search/docs/appearance/structured-data", checked: "October 2026" }],
} satisfies NewToolContent;
