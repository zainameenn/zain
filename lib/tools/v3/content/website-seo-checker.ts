import type { NewToolContent } from "../content-types";

export default {
  slug: "website-seo-checker",
  name: "Website SEO Checker",
  keyword: "website seo checker",
  metaTitle: "Website SEO Checker (100% FREE)",
  metaDescription: "Website SEO checker that inspects a public URL for its title, description, headings, canonical, robots directives and other basics, with evidence for each.",
  lede: "This website SEO checker inspects one public page's title, meta description, headings, canonical tag, indexing directives, links and more. See what was found in the page code and what to review next.",
  sub: "Check the SEO basics on any public page.",
  trust: "Free, no signup. Our server fetches the public page once to read its HTML. Nothing is stored.",
  steps: [
    { title: "Choose what to check", text: "Paste a publicly accessible page URL, plus an optional target keyword." },
    { title: "Read the returned information", text: "Review each check with the HTML evidence that triggered it." },
    { title: "Use the result", text: "Fix the issues that matter for that page, then check the same URL again." },
  ],
  examples: {
    heading: "Page checks,",
    accent: "and what they mean.",
    items: [
      { title: "A service page before publishing", input: "A page titled \"Home\" with a canonical pointing to another URL.", output: "Canonical points to a different URL; title found, 4 characters.", why: "Two concrete things to review before launch." },
      { title: "A page hidden by mistake", input: "A landing page with a robots meta tag set to noindex.", output: "Indexing directives: noindex found.", why: "Search engines are asked to leave it out. Often left over from staging." },
      { title: "A concise title", input: "A 38 character title.", output: "Title: 38 characters, OK.", why: "Short isn't an error, so the checker doesn't call it one." },
    ],
  },
  guidance: {
    heading: "Your results,",
    accent: "explained.",
    items: [
      { title: "Checks, not a score", text: "A useful on page check shows evidence, not a mysterious score. A missing H1, a conflicting canonical or an unexpected noindex deserves investigation. Not every short description is a problem, and not every page needs every element." },
      { title: "Start with access", text: "Check the HTTP status and indexing directives first. A page that returns an error or asks to be left out of the index won't benefit from title tweaks." },
      { title: "What this tool can't tell you", text: "This is a single page inspection, not a site crawl or a Google indexing verdict. Content rendered by JavaScript may not be in the HTML it reads." },
      { title: "What to do next", text: "Open the page, verify the flagged element in its source, fix it, then run the same check again." },
    ],
  },
  faqs: [
    { q: "Is a website SEO checker the same as a site audit?", a: "No. This checks one page. A site audit follows many URLs and looks for sitewide patterns such as duplicates and broken internal paths." },
    { q: "Can this tell me why I'm not ranking?", a: "It can show observable issues on the page, but rankings depend on many factors, including relevance, competition and how helpful the content is." },
    { q: "Can you check pages that need a login?", a: "No. Restricted pages need an authorized workflow, and private credentials should never be sent to a public checker." },
    { q: "Does a clean result guarantee Google traffic?", a: "No. These checks remove obvious obstacles; they can't predict traffic or a ranking position." },
    { q: "Does it check Core Web Vitals?", a: "Not on this page. Use the Core Web Vitals Checker for real user performance data." },
    { q: "Why does it say a long title is only info?", a: "Long titles are often shortened in results, but that isn't an error. The checker only flags what's worth a look." },
  ],
  related: [
    { slug: "website-metadata-extractor", text: "Copy the page's metadata values." },
    { slug: "broken-link-checker", text: "Test the links on the same page." },
    { slug: "canonical-url-checker", text: "Check a canonical in detail." },
    { slug: "seo-title-generator", text: "Rewrite a weak title." },
  ],
  cta: { heading: "Found more than you can fix?", accent: "I can help.", copy: "I prioritise technical and on page SEO fixes so the work goes where it matters first.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Check one page's title, description, headings, canonical and indexing directives, with evidence.", cta: "Check a page" },
  sources: [{ label: "Google: SEO Starter Guide", url: "https://developers.google.com/search/docs/fundamentals/seo-starter-guide", checked: "October 2026" }],
} satisfies NewToolContent;
