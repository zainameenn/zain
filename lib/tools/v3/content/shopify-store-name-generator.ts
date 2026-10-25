import type { NewToolContent } from "../content-types";

export default {
  slug: "shopify-store-name-generator",
  name: "Shopify Store Name Generator",
  keyword: "shopify store name generator",
  metaTitle: "Shopify Store Name Generator (100% FREE)",
  metaDescription: "Shopify store name generator that suggests one brand name, a domain idea to check and a short reason it fits your products. Free, no signup.",
  lede: "This Shopify store name generator suggests one brand name for your store, plus a domain idea to check. Tell it what you sell and how your brand should feel, and it explains why the name works.",
  sub: "One brand name, one domain idea and a short reason. Regenerate for another take.",
  trust: "Free, no signup. What you type is sent to an AI provider to write your result and isn't stored, so don't include anything private.",
  steps: [
    { title: "Describe your store", text: "Add what you sell and who your customers are." },
    { title: "Set the feel", text: "Choose a brand personality and naming style. Add keywords, words to avoid and the language." },
    { title: "Get one name", text: "You get one brand name, a domain idea and a reason. Check the domain and trademarks, or press Regenerate." },
  ],
  examples: {
    heading: "Example store",
    accent: "names",
    items: [
      { title: "Skincare", input: "Gentle skincare for sensitive skin, calm and clean personality", output: "Name: Softwell. Domain idea: softwell.com", why: "Soft and trustworthy, and easy to spell." },
      { title: "Outdoor gear", input: "Lightweight camping gear for weekend hikers, bold style, keyword: trail", output: "Name: Trailkind. Domain idea: trailkind.com", why: "Keeps the keyword and still feels like a brand." },
      { title: "Coffee subscription", input: "Small batch coffee by mail, warm and friendly, avoid the word bean", output: "Name: Morning Parcel. Domain idea: morningparcel.com", why: "Hints at coffee and delivery without the avoided word." },
    ],
  },
  guidance: {
    heading: "What makes a good store",
    accent: "name",
    items: [
      { title: "Short and clear", text: "A name people can remember, say and type easily works harder in ads, on packaging and in word of mouth." },
      { title: "Brand first, keyword second", text: "A keyword can help, but it can also box you in. A distinct brand name is easier to protect and grow." },
      { title: "Check the domain", text: "The domain shown here is only an idea. Look it up with a domain registrar or in Shopify before you decide." },
      { title: "Check trademarks", text: "This tool can't tell you if a name is trademarked. Search your country's trademark office before you invest in branding." },
      { title: "Think a few years ahead", text: "Pick a name that still fits if you add new products or sell in new places." },
    ],
  },
  faqs: [
    { q: "How do I name a Shopify store?", a: "Start with what you sell, who buys it and how you want the brand to feel. Pick a short, easy name, then check the domain, social handles and trademarks before you commit." },
    { q: "Should my store name include a keyword?", a: "It can make it clearer what you sell, but it isn't needed for search. Product pages and content do most of that work. A keyword can also limit you if you expand later." },
    { q: "Should I choose a short name?", a: "Usually, yes. Short names are easier to remember, type and fit on labels. Clarity matters more than a strict length." },
    { q: "Should the store name match the domain?", a: "Ideally, yes, so customers can find you easily. If the exact .com is taken, a small change like adding \"shop\" or \"co\" can work, as long as it's clearly yours." },
    { q: "How do I check trademarks?", a: "Search the official trademark database in each country you sell in, for example the [USPTO trademark search](https://www.uspto.gov/trademarks/search) in the US. For anything important, talk to a trademark professional." },
    { q: "Can I change my Shopify store name?", a: "Yes. You can change your store name in your Shopify admin under Settings. See [Shopify's help page on store details](https://help.shopify.com/en/manual/intro-to-shopify/initial-setup/setup-business-settings). Your original myshopify.com address stays the same." },
    { q: "How do I choose a name that can grow with my business?", a: "Avoid names tied to one product, one city or a passing trend. A brand word or a simple idea gives you room to add new products later." },
  ],
  related: [
    { slug: "product-description-generator", text: "Write product descriptions for your store." },
    { slug: "shopify-profit-margin-calculator", text: "Work out your margins before you set prices." },
    { slug: "seo-title-generator", text: "Write SEO titles for your store pages." },
    { slug: "meta-description-generator", text: "Write meta descriptions for search results." },
  ],
  cta: {
    heading: "Want customers to find your",
    accent: "store?",
    copy: "Zain runs Google and Meta ads that turn clicks into sales.",
    button: "See Google and Meta ads",
    href: "/services/google-and-meta-ads-specialist",
  },
  hubCard: { description: "Get one Shopify store name, a domain idea to check and a short reason.", cta: "Name my store" },
  sources: [
    { label: "Shopify Help: Store details and business settings", url: "https://help.shopify.com/en/manual/intro-to-shopify/initial-setup/setup-business-settings", checked: "October 2026" },
    { label: "USPTO: Search trademarks", url: "https://www.uspto.gov/trademarks/search", checked: "October 2026" },
  ],
} satisfies NewToolContent;
