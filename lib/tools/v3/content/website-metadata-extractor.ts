import type { NewToolContent } from "../content-types";

export default {
  slug: "website-metadata-extractor",
  name: "Website Metadata Extractor",
  keyword: "website metadata extractor",
  metaTitle: "Website Metadata Extractor (100% FREE)",
  metaDescription: "Website metadata extractor that pulls the title, meta description, canonical, robots directives, Open Graph tags and headings from public HTML, ready to copy.",
  lede: "This website metadata extractor shows the metadata found in a page's HTML in one place. Copy the title, description, canonical URL, robots directives, social sharing tags and main heading without hunting through page source.",
  sub: "Extract a webpage's metadata in one place.",
  trust: "Free, no signup. The public URL you enter is fetched once by our server to read its HTML. Pasted HTML stays in your browser. Nothing is stored.",
  steps: [
    { title: "Choose what to check", text: "Enter a public URL, or paste HTML you're authorized to inspect." },
    { title: "Read the returned information", text: "Review each extracted value and whether it's missing or duplicated." },
    { title: "Use the result", text: "Copy the actual values into a content or development change request." },
  ],
  examples: {
    heading: "Metadata checks,",
    accent: "and what they mean.",
    intro: "Illustrative results. The tool shows exact extracted values, not judgments presented as facts.",
    items: [
      { title: "A blog post before launch", input: "A new post URL that's publicly reachable.", output: "Title, canonical and og:image found; meta description not found.", why: "Confirm the canonical and social preview fields, then add a description if you want control of the snippet." },
      { title: "A tag added by JavaScript", input: "A page whose canonical is set by a client side script.", output: "Canonical: Not found.", why: "The extractor reads the returned HTML, so tags injected later won't appear. Paste the rendered HTML to check it." },
      { title: "Two descriptions", input: "A template that outputs the meta description twice.", output: "Meta description: two values listed.", why: "Duplicates usually come from a theme plus a plugin. Keep one." },
    ],
  },
  guidance: {
    heading: "Your results,",
    accent: "explained.",
    items: [
      { title: "Missing isn't always wrong", text: "An empty meta description is not automatically a ranking failure. Search engines can build snippets from page content. A canonical tag is a hint, not a guarantee that Google will select that URL." },
      { title: "Why metadata matters", text: "Metadata helps browsers, search engines and social platforms understand or preview a page. This is a factual inspection tool, not a generator: it shows the actual value, and whether it's missing or duplicated." },
      { title: "What this tool can't tell you", text: "The extractor works on the returned HTML. Some tags may be injected after JavaScript runs, and restricted pages can't be fetched publicly. Use the paste HTML option for markup you have access to." },
      { title: "What to do next", text: "Fix incorrect metadata in your site templates or publishing workflow, then fetch the page again to verify the updated HTML." },
    ],
  },
  faqs: [
    { q: "What metadata can this tool extract?", a: "The title, meta description, canonical, robots meta and X-Robots-Tag header, language, viewport, charset, Open Graph and Twitter tags, hreflang links, H1 and the number of JSON-LD blocks." },
    { q: "Does a meta description control the Google snippet?", a: "No. Google can generate a snippet from the page content or use the description when it's appropriate." },
    { q: "Why is a tag missing from the result?", a: "It may not be in the fetched HTML, or the site may add it with JavaScript after loading." },
    { q: "Can I check a page that blocks bots?", a: "Not through a public request if access is blocked. You can paste HTML you're authorized to inspect." },
    { q: "Is my data stored?", a: "No. The page is fetched once to read its HTML and nothing is saved. Pasted HTML never leaves your browser." },
    { q: "Does it follow redirects?", a: "Yes. It follows up to six server redirects and shows the final URL and status it read." },
  ],
  related: [
    { slug: "website-seo-checker", text: "Check the same page for SEO basics." },
    { slug: "seo-title-generator", text: "Rewrite a title that needs work." },
    { slug: "meta-description-generator", text: "Write a missing meta description." },
    { slug: "canonical-url-checker", text: "Dig into a canonical that looks wrong." },
  ],
  cta: { heading: "Metadata all over the place?", accent: "Let's fix the templates.", copy: "I clean up the technical SEO basics so every page sends clear signals.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Pull a page's title, description, canonical, robots and social tags from its HTML.", cta: "Extract metadata" },
  sources: [{ label: "Google: Control your snippets", url: "https://developers.google.com/search/docs/appearance/snippet", checked: "October 2026" }],
} satisfies NewToolContent;
