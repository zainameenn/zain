import type { NewToolContent } from "../content-types";

export default {
  slug: "hreflang-tag-generator",
  name: "Hreflang Tag Generator",
  keyword: "hreflang tag generator",
  metaTitle: "Hreflang Tag Generator (100% FREE)",
  metaDescription: "Hreflang tag generator for multilingual websites. Use your real translated page URLs to get reciprocal tags with optional x-default markup.",
  lede: "This hreflang tag generator tells search engines which page is for which language. Add the URLs of your translated pages, choose their language or region, and get a consistent set of tags for every version.",
  sub: "Tell search engines which page is for which language.",
  trust: "Free, no signup. Runs in your browser, nothing is sent anywhere.",
  steps: [
    { title: "Add each version", text: "Add every real language specific URL for the page." },
    { title: "Pick the language", text: "Select the language code and, if you need it, the region for each URL." },
    { title: "Place the full set", text: "Generate the reciprocal tags and add the same set to every version." },
  ],
  examples: {
    heading: "Hreflang sets,",
    accent: "for common setups.",
    intro: "Illustrative URLs. The tool only ever uses the URLs you enter.",
    items: [
      { title: "English and German product page", input: "https://example.com/en/product as en, https://example.com/de/product as de, https://example.com/ as x-default.", output: "Three link tags, placed on both the English and German pages.", why: "Each version lists itself and the other, plus the fallback." },
      { title: "Two English regions", input: "https://example.com/us/ as en-US and https://example.com/gb/ as en-GB.", output: "Two link tags on each page, one for each region.", why: "A region is always paired with a language, never used alone." },
      { title: "Sitemap instead of HTML", input: "The same three URLs, exported as sitemap annotations.", output: "A url block for each version with xhtml:link alternates for all three.", why: "Useful when you can't edit page templates." },
    ],
  },
  guidance: {
    heading: "Getting hreflang",
    accent: "right.",
    items: [
      { title: "Hreflang and canonical are not substitutes", text: "Use hreflang for alternate language or region versions that users should actually see. Use canonical tags to show the preferred URL within a set of duplicates. A translated page should normally point canonically to its own URL, not to the English version." },
      { title: "Common international SEO mistakes", text: "Missing reciprocal references, a country code without a language, pointing to redirects, the wrong x-default and inconsistent canonical URLs can all weaken the annotations. The tool checks the data you enter. Only a live audit can confirm the published tags." },
    ],
  },
  faqs: [
    { q: "What does hreflang do?", a: "It helps Google identify alternate URLs for users in different languages or regions." },
    { q: "Is hreflang a ranking factor?", a: "It helps serve the right language or regional version. It doesn't guarantee higher rankings." },
    { q: "Do I need a separate URL for each language?", a: "Yes. To label localized versions with hreflang, each version needs its own crawlable URL." },
    { q: "What does x-default mean?", a: "It marks the fallback URL to use when no specific language or region version matches the user." },
    { q: "Must pages reference themselves?", a: "Yes. Google recommends each version lists itself as well as every alternate, with the same set on every version." },
    { q: "Can hreflang go in an XML sitemap?", a: "Yes. Google supports HTML tags, HTTP headers and sitemap annotations. Pick one method and keep it consistent." },
  ],
  related: [
    { slug: "xml-sitemap-generator", text: "Build the sitemap for your localized URLs." },
    { slug: "canonical-url-checker", text: "Check each version's canonical." },
    { slug: "robots-txt-tester", text: "Make sure every version can be crawled." },
  ],
  cta: { heading: "Going international?", accent: "Get the SEO right.", copy: "I help SaaS teams launch localized sites without splitting their search visibility.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Create reciprocal hreflang tags for your translated pages, with x-default and sitemap export.", cta: "Generate hreflang tags" },
  sources: [{ label: "Google: Localized versions and hreflang", url: "https://developers.google.com/search/docs/specialty/international/localized-versions", checked: "October 2026" }],
} satisfies NewToolContent;
