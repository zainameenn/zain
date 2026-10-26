import type { NewToolContent } from "../content-types";

export default {
  slug: "open-graph-tags-generator",
  name: "Open Graph Tags Generator",
  keyword: "open graph tags generator",
  metaTitle: "Open Graph Tags Generator (100% FREE)",
  metaDescription: "Open Graph tags generator that creates social share meta tags for your page from your real title, description, URL and preview image.",
  lede: "This open graph tags generator makes shared links easier to recognize. Enter your page details and get copy ready Open Graph tags for social previews, then check the text and image URL before adding the code.",
  sub: "Make shared links easier to recognize.",
  trust: "Free, no signup. Runs in your browser, nothing is sent anywhere.",
  steps: [
    { title: "Add the basics", text: "Add your page title and its full URL." },
    { title: "Add a description and image", text: "Add a short description and a real preview image if you have one." },
    { title: "Paste and test", text: "Copy the tags into your page's head and test the live link." },
  ],
  examples: {
    heading: "Open Graph tags,",
    accent: "for real pages.",
    intro: "Illustrative pages. The tags only ever contain what you enter.",
    items: [
      { title: "A blog index", input: "Title Marketing Guides, URL https://example.com/blog, description Practical research and guides for growing a small business.", output: "og:title, og:description, og:url and og:type website.", why: "No image was given, so no og:image tag is added." },
      { title: "An article with an image", input: "Article title, URL, description and https://example.com/img/cover.jpg, type article.", output: "Full OG set plus og:image and a summary_large_image X card.", why: "A real image makes the preview clearer." },
      { title: "A long title", input: "A 120 character page title.", output: "Tags generated, with a warning that platforms may cut the title short.", why: "Shorter titles show in full more often." },
    ],
  },
  guidance: {
    heading: "Social previews,",
    accent: "explained.",
    items: [
      { title: "What are Open Graph tags?", text: "Open Graph metadata helps social networks and messaging apps understand a page's title, description, image and type. Real previews vary, because each platform fetches and caches metadata in its own way." },
      { title: "Use an actual preview image", text: "Give a publicly accessible image URL that represents the page. The generator never creates an image or promises a particular crop. Without an image, platforms may pick their own fallback." },
    ],
  },
  faqs: [
    { q: "What is Open Graph metadata?", a: "Page tags many platforms use to build link previews." },
    { q: "Do I need an OG image?", a: "It isn't required to generate tags, but a relevant, accessible image makes previews clearer." },
    { q: "Are OG tags the same as SEO title tags?", a: "No. Social preview tags and the search result title element do different jobs." },
    { q: "Why does my old social preview still appear?", a: "Platforms cache metadata. Use their debugging tools to refresh it and allow some time." },
    { q: "Will the preview look identical on every platform?", a: "No. Cropping, text limits and caching differ between services." },
    { q: "Where do I add these tags?", a: "In the page's head section, or through your framework's metadata settings." },
  ],
  related: [
    { slug: "meta-description-generator", text: "Write the description first." },
    { slug: "seo-title-generator", text: "Write a title that fits." },
    { slug: "json-ld-schema-validator", text: "Check your structured data too." },
  ],
  cta: { heading: "Links not getting clicks?", accent: "Let's change that.", copy: "I help brands get more from every post and share.", button: "See social media services", href: "/services/social-media-marketing-specialist" },
  hubCard: { description: "Create Open Graph and X card tags from your real title, description, URL and image.", cta: "Generate OG tags" },
  sources: [],
} satisfies NewToolContent;
