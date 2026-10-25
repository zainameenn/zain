import type { NewToolContent } from "../content-types";

export default {
  slug: "llms-txt-generator",
  name: "LLMS.txt Generator",
  keyword: "llms.txt generator",
  metaTitle: "LLMS.txt Generator (100% FREE)",
  metaDescription: "llms.txt generator: build a clean llms.txt file for your site in the format from llmstxt.org, then copy or download it. Free, no signup needed.",
  lede: "This llms.txt generator turns a few details about your site into a tidy llms.txt file. Add your name, a short summary and your key pages, and copy the result.",
  sub: "A markdown file in the llmstxt.org format, ready to copy or download.",
  trust: "Free, no signup. It runs in your browser, nothing is sent anywhere.",
  steps: [
    { title: "Describe your site", text: "Add your site name, URL and a one or two sentence summary." },
    { title: "List your key pages", text: "Add the pages that matter most, with a title and a short note for each. Group them into sections if you like." },
    { title: "Copy or download", text: "Copy the file or download it, then upload it to your site root so it lives at /llms.txt." },
  ],
  examples: {
    heading: "llms.txt",
    accent: "examples",
    intro: "Short versions of what the file looks like.",
    items: [
      {
        title: "A SaaS product",
        input: "Name: Tasklane. Summary: project management for small teams. Pages: Pricing, Docs, API.",
        output: "# Tasklane\n\n> Project management for small teams.\n\n## Product\n\n- [Pricing](https://tasklane.com/pricing): plans and limits\n- [Docs](https://tasklane.com/docs): setup and features\n\n## Optional\n\n- [API](https://tasklane.com/api): developer reference",
        why: "Core pages come first and secondary ones go under Optional.",
      },
      {
        title: "A local business",
        input: "Name: Rosa's Bakery. Summary: sourdough bakery in Austin. Pages: Menu, Hours, Order.",
        output: "# Rosa's Bakery\n\n> Sourdough bakery in Austin, Texas.\n\n## Visit\n\n- [Menu](https://rosasbakery.com/menu): breads and pastries\n- [Hours](https://rosasbakery.com/hours): opening times\n- [Order](https://rosasbakery.com/order): pickup orders",
        why: "A small site only needs one section.",
      },
      {
        title: "A blog",
        input: "Name: Field Notes. Summary: guides on home gardening. Pages: Start here, Guides, About.",
        output: "# Field Notes\n\n> Practical guides on home gardening.\n\n## Guides\n\n- [Start here](https://fieldnotes.blog/start): the best first reads\n- [All guides](https://fieldnotes.blog/guides): every guide by topic\n\n## Optional\n\n- [About](https://fieldnotes.blog/about): who writes the guides",
        why: "Notes after each link say what the page is for in a few words.",
      },
    ],
  },
  guidance: {
    heading: "Writing a good",
    accent: "llms.txt",
    items: [
      { title: "Keep the summary short", text: "One or two plain sentences that say what the site is and who it's for." },
      { title: "Pick your best pages", text: "List the pages that explain your site best, not every URL. Your sitemap already covers everything." },
      { title: "Use clear notes", text: "A short note after each link says what the page covers. Keep it factual." },
      { title: "Use Optional for extras", text: "Put secondary links under a section called Optional. The proposal says tools can skip it when they need less text." },
      { title: "Keep expectations honest", text: "llms.txt is a proposal, not a standard. Having one doesn't promise rankings, traffic or AI citations." },
    ],
  },
  faqs: [
    { q: "What is llms.txt?", a: "llms.txt is a proposed markdown file, described at [llmstxt.org](https://llmstxt.org/), that gives language models a short guide to a website: its name, a summary and links to its most useful pages." },
    { q: "How do I create it?", a: "Start with an H1 for your site name, then a blockquote summary, optional notes, and H2 sections with lists of links in the form - [Title](url): notes. This tool builds that for you from the details you enter." },
    { q: "Where should the file go?", a: "At the root of your site, so it's at yoursite.com/llms.txt. The proposal also allows files in subpaths, like /docs/llms.txt." },
    { q: "How is it different from robots.txt?", a: "robots.txt tells crawlers which parts of a site they may or may not crawl. llms.txt doesn't allow or block anything. It's only a guide to your useful content." },
    { q: "How is it different from sitemap.xml?", a: "A sitemap lists the URLs you want search engines to know about, often all of them. llms.txt is a short, hand picked list with plain descriptions." },
    { q: "Does Google use llms.txt?", a: "Google's Search Central documentation on AI features says you don't need to create new machine readable files or AI text files to appear in AI Overviews or AI Mode. So don't expect it to change how you appear in Google." },
    { q: "Is it required for AI search?", a: "No. No search engine or AI tool requires it. It's an optional file some sites add, and it won't hurt if you keep it accurate." },
    { q: "How do I validate the format?", a: "Check that the file starts with a single H1, that the summary is a blockquote, and that every list item is a markdown link. Then open yoursite.com/llms.txt in a browser to confirm it loads as plain text." },
  ],
  related: [
    { slug: "seo-title-generator", text: "Write clear titles for the pages you list." },
    { slug: "meta-description-generator", text: "Write short page summaries for search results." },
    { slug: "seo-search-intent-classifier", text: "Check which pages match what people search for." },
  ],
  cta: {
    heading: "Want SEO that brings",
    accent: "real traffic?",
    copy: "I help SaaS companies grow search traffic with useful pages and a clear keyword plan.",
    button: "See SEO services",
    href: "/services/seo-specialist-for-saas",
  },
  hubCard: { description: "Build an llms.txt file for your site in the llmstxt.org format, then copy or download it.", cta: "Generate llms.txt" },
  sources: [
    { label: "llmstxt.org: The /llms.txt file proposal", url: "https://llmstxt.org/", checked: "October 2026" },
    { label: "Google Search Central: AI features and your website", url: "https://developers.google.com/search/docs/appearance/ai-features", checked: "October 2026" },
  ],
} satisfies NewToolContent;
