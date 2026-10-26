import type { NewToolContent } from "../content-types";

export default {
  slug: "domain-name-ideas-generator",
  name: "Domain Name Ideas Generator",
  keyword: "domain name ideas generator",
  metaTitle: "Domain Name Ideas Generator (100% FREE)",
  metaDescription: "Find one memorable domain name idea for your business, brand, or project. Choose a style and extension, then check registration separately.",
  lede: "This domain name ideas generator gives you one domain idea that fits what you're building and is easy to say, spell and remember.",
  sub: "Find a domain name that fits what you're building.",
  trust: "Free, no signup. What you type is sent to an AI provider to write your result and isn't stored. Suggested domains aren't checked for availability, trademarks or price.",
  steps: [
    { title: "Describe the idea", text: "Explain the business, website or project in one sentence." },
    { title: "Choose the style and extension", text: "Decide whether you want descriptive or brandable wording, and which ending." },
    { title: "Check before buying", text: "Review spelling, registration, similar names and trademarks." },
  ],
  examples: {
    heading: "Domain ideas,",
    accent: "with the reasoning.",
    intro: "Illustrative only. These might already be registered, in use or unsuitable.",
    items: [
      { title: "Desk accessories store", input: "Small online store for desk organisation accessories. Short, calm, brandable, .com.", output: "tidyfoundry.com", why: "Two easy words, no hyphens, and room to sell more than organisers." },
      { title: "Local bakery", input: "Sourdough bakery in Austin. Descriptive, .com.", output: "austinsourdough.com", why: "Says what and where, which helps people remember it after one visit." },
      { title: "Developer tool", input: "Open source tool that tests API responses. Short, .dev.", output: "checkreply.dev", why: "Describes the job in two common words, and .dev fits the audience." },
    ],
  },
  guidance: {
    heading: "Choosing a domain",
    accent: "you won't regret.",
    items: [
      { title: "What makes a good domain name?", text: "It's easy for your audience to type and remember. Short helps, but clarity matters more than saving a few letters. Avoid confusing spellings, extra hyphens and anything that sounds like a competitor. Say it out loud, imagine spelling it on a call, and see how it reads without spaces." },
      { title: "Keyword or brand name?", text: "A descriptive domain explains your business right away. A brandable one makes it easier to expand later. Neither guarantees better rankings: the site's usefulness and quality matter far more than a keyword in the address. Choose the one that fits the business you want to run for years." },
      { title: "Registration isn't trademark clearance", text: "An unregistered domain can still clash with a trademark or a known business. A registration record also doesn't tell you the price or whether a name might free up. Check a registrar, search similar businesses and use official trademark resources. ICANN's [RDAP lookup](https://lookup.icann.org/en) shows registration data for many domains; it isn't a promise a name is for sale." },
    ],
  },
  faqs: [
    { q: "How do I come up with a domain name?", a: "Describe your business, audience and preferred style. Pick a memorable candidate, check spelling and pronunciation, then check registration and trademarks yourself." },
    { q: "Should I choose a .com domain?", a: ".com is familiar to many people, but other extensions suit plenty of real businesses. Consider your audience, budget, branding and availability." },
    { q: "Are shorter domain names always better?", a: "No. An unfamiliar five letter string can be harder to remember than a clear two word name." },
    { q: "Does a keyword in my domain help SEO?", a: "It can signal your topic, but it's no substitute for useful content, site quality and relevant links. Don't buy an awkward exact match name hoping for a ranking shortcut." },
    { q: "Can I use hyphens or numbers?", a: "Many valid domains use them, but they're harder to say out loud. Check the rules for the extension you want." },
    { q: "Does this generator show which domains are available?", a: "No. It suggests a candidate. Checking availability needs a registrar." },
    { q: "How can I check if a domain is registered?", a: "Use a registrar or an authoritative lookup like ICANN's RDAP based Lookup where supported. Registration data and whether you can buy it today are different questions." },
    { q: "What if the domain is taken?", a: "Generate another idea, consider a suitable extension, or contact the owner through a legitimate marketplace. Don't imitate another business or trademark." },
  ],
  related: [
    { slug: "shopify-store-name-generator", text: "Name the store itself." },
    { slug: "etsy-shop-name-generator", text: "Name an Etsy shop." },
    { slug: "newsletter-name-generator", text: "Name a newsletter." },
    { slug: "podcast-name-generator", text: "Name a podcast." },
  ],
  cta: { heading: "Got the domain?", accent: "Now get the traffic.", copy: "I help new sites get found through SEO, Reddit and social.", button: "See SEO services", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Get one memorable domain idea in the extension you want. Then check availability at a registrar.", cta: "Find a domain idea" },
  sources: [
    { label: "ICANN Lookup (RDAP)", url: "https://lookup.icann.org/en", checked: "October 2026" },
    { label: "ICANN: launching RDAP, sunsetting WHOIS", url: "https://www.icann.org/en/announcements/details/icann-update-launching-rdap-sunsetting-whois-27-01-2025-en", checked: "October 2026" },
  ],
} satisfies NewToolContent;
