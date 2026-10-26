import type { NewToolContent } from "../content-types";

export default {
  slug: "local-business-schema-generator",
  name: "Local Business Schema Generator",
  keyword: "local business schema generator",
  metaTitle: "Local Business Schema Generator (100% FREE)",
  metaDescription: "Create LocalBusiness JSON-LD using verified business details, address and hours. Copy schema markup and review Google's structured data guidelines.",
  lede: "This local business schema generator turns your real business information into LocalBusiness structured data you can review and add to your website.",
  sub: "Help search engines understand your business details.",
  trust: "Free, no signup. Runs in your browser, nothing is sent anywhere.",
  steps: [
    { title: "Enter the public facts", text: "Add public facts about the business and its location." },
    { title: "Review the markup", text: "Check it carefully, especially phone, address and opening hours." },
    { title: "Add it and validate", text: "Put it on the relevant page and validate with Google's Rich Results Test." },
  ],
  examples: {
    heading: "LocalBusiness schema,",
    accent: "in practice.",
    intro: "Illustrative businesses to show what the markup includes. They aren't real listings.",
    items: [
      { title: "A bike repair shop", input: "North Shore Bicycle Repairs, https://example.com, public address and phone.", output: "Valid LocalBusiness JSON-LD with only those fields.", why: "No stars, ratings, service areas or coordinates that weren't given." },
      { title: "A dental practice with hours", input: "Harbor Family Dental, Dentist subtype, public address, phone and weekday opening hours.", output: "Dentist JSON-LD with address, telephone and openingHoursSpecification.", why: "A more specific subtype fits better than plain LocalBusiness." },
      { title: "A café without a website phone", input: "Corner Street Café, CafeOrCoffeeShop subtype, address and opening hours, no phone listed.", output: "JSON-LD with name, address and hours, and no telephone field.", why: "Fields you don't provide are left out rather than guessed." },
    ],
  },
  guidance: {
    heading: "Getting schema",
    accent: "right.",
    items: [
      { title: "What LocalBusiness schema is for", text: "A standardized way to describe a business to search engines. Depending on type and page, it can communicate location, contact details and opening hours. The markup must match what people can see on the page." },
      { title: "Accuracy matters more than extra fields", text: "Don't fill schema with keywords, fake reviews or an address the company doesn't use publicly. An invalid type or hidden claims can hurt rich result eligibility. Keep hours and contact details current, and use a more specific subtype when it fits." },
      { title: "What schema can't do", text: "Structured data helps describe your page but does not guarantee a special search result or better ranking." },
      { title: "Sources", text: "[Google: LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business) and [Google: structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)." },
    ],
  },
  faqs: [
    { q: "What is LocalBusiness schema?", a: "Structured data describing a local business's public identity, location and attributes in a machine readable vocabulary." },
    { q: "Where do I add schema on my website?", a: "Usually as JSON-LD in the page HTML, following your platform's supported method." },
    { q: "Does LocalBusiness schema guarantee Google Maps rankings?", a: "No." },
    { q: "Do I need to include a street address?", a: "It depends on business type and eligibility. Don't fabricate or expose a private home address; check Google's current requirements." },
    { q: "Can I add review stars to my own business schema?", a: "Avoid self serving or fabricated ratings. Google restricts review snippets for LocalBusiness and Organization." },
    { q: "How can I check whether the schema is valid?", a: "JSON syntax check, Google's Rich Results Test and Search Console after deployment." },
  ],
  related: [
    { slug: "xml-sitemap-validator", text: "Check search engines can find your pages." },
    { slug: "seo-title-generator", text: "Write a clear title for the same page." },
    { slug: "local-business-faq-generator", text: "Answer what local customers ask." },
  ],
  cta: { heading: "Want more local search traffic?", accent: "Let's build it properly.", copy: "I fix the technical basics first, then build pages people actually search for.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Generate LocalBusiness JSON-LD from your real business details, address and opening hours.", cta: "Generate schema" },
  sources: [
    { label: "Google: LocalBusiness structured data", url: "https://developers.google.com/search/docs/appearance/structured-data/local-business", checked: "October 2026" },
    { label: "Google: structured data policies", url: "https://developers.google.com/search/docs/appearance/structured-data/sd-policies", checked: "October 2026" },
  ],
} satisfies NewToolContent;
