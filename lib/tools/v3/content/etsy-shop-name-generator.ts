import type { NewToolContent } from "../content-types";

export default {
  slug: "etsy-shop-name-generator",
  name: "Etsy Shop Name Generator",
  keyword: "etsy shop name generator",
  metaTitle: "Etsy Shop Name Generator (100% FREE)",
  metaDescription: "Etsy shop name generator that suggests one clear name for your shop, checked against Etsy's length and character rules. Free, no signup needed.",
  lede: "This Etsy shop name generator suggests one shop name that fits what you sell and follows Etsy's naming rules. Tell it about your products and style, and it gives you a name with a short reason why it works.",
  sub: "One name, 4 to 20 letters and numbers, no spaces. Regenerate for another take.",
  trust: "Free, no signup. What you type is sent to an AI provider to write your result and isn't stored, so don't include anything private.",
  steps: [
    { title: "Describe your shop", text: "Add what you sell, the style you like and, if you want, who you sell to." },
    { title: "Add your preferences", text: "List keywords to include, words to avoid, the language, and any name ideas you already have." },
    { title: "Get one name", text: "You get one name that fits Etsy's rules, plus a short reason. Not quite right? Press Regenerate." },
  ],
  examples: {
    heading: "Example Etsy shop",
    accent: "names",
    items: [
      { title: "Handmade candles", input: "Soy candles, cozy and calm style, for people who love slow evenings", output: "HushHourCandles", why: "Short, easy to say, and tells buyers what you sell." },
      { title: "Printable planners", input: "Digital planners and printables, clean and minimal, for busy parents", output: "TidyPagesStudio", why: "Fits printables now and leaves room for new products later." },
      { title: "Ceramic mugs", input: "Hand thrown mugs and bowls, earthy and warm, avoid the word pottery", output: "ClayAndKiln", why: "Feels handmade without using the word to avoid." },
      { title: "Pet bandanas", input: "Dog bandanas and collars, playful style, keyword: pup", output: "PupParadeCo", why: "Keeps the keyword and stays well under 20 characters." },
    ],
  },
  guidance: {
    heading: "What makes a good Etsy shop",
    accent: "name",
    items: [
      { title: "Follow the rules first", text: "Etsy shop names are 4 to 20 characters, letters and numbers only, with no spaces or special characters. Use capital letters to separate words, like ClayAndKiln." },
      { title: "Make it easy to say and spell", text: "People should be able to hear it once and find you. Skip odd spellings and long runs of letters." },
      { title: "Leave room to grow", text: "A name tied to one product can feel tight if you add new lines later. A broader name gives you more space." },
      { title: "Check before you commit", text: "This tool can't tell you if a name is taken or trademarked. Check it on Etsy, search the web, and look at trademark records before you use it." },
      { title: "Avoid other brands", text: "Don't use another company's name or a famous brand inside yours. It can cause problems with Etsy and with the brand owner." },
    ],
  },
  faqs: [
    { q: "How do I choose an Etsy shop name?", a: "Start with what you sell and the feeling you want buyers to get. Pick something short, easy to say and easy to spell. Then check that it follows Etsy's rules and that nobody else is using it." },
    { q: "What makes a good Etsy shop name?", a: "A good name is short, memorable and fits your products. It should be easy to type into search, not too close to another brand, and broad enough to grow with your shop." },
    { q: "How long can an Etsy shop name be?", a: "Etsy shop names must be between 4 and 20 characters. See [Etsy's help page on shop names](https://help.etsy.com/hc/en-us/articles/115015672808) for the current rules." },
    { q: "Can Etsy shop names contain spaces?", a: "No. Etsy shop names can only use letters and numbers, with no spaces or special characters. Most sellers use capital letters to show where each word starts." },
    { q: "Can I change my Etsy shop name?", a: "Yes. You can change your shop name from your Shop Manager settings. Etsy may limit how often you can do it, so check the current rules in the Etsy Help Center before you change it." },
    { q: "How do I check whether a name is available?", a: "Etsy checks availability when you enter a name during shop setup or when you change it, because each shop name must be unique on Etsy. It's also worth searching the web and trademark records so you don't clash with an existing business." },
    { q: "Should I use keywords in my shop name?", a: "It can help buyers understand what you sell, but it isn't required. Your listing titles, tags and descriptions matter much more for Etsy search. A clear, memorable name is usually the better choice." },
    { q: "Should my Etsy shop name match my domain?", a: "It helps if you plan to build your own website later. Matching names make you easier to find and remember. Check that the domain is free before you settle on the shop name." },
  ],
  related: [
    { slug: "etsy-title-generator", text: "Write clear, searchable titles for your listings." },
    { slug: "product-description-generator", text: "Describe your products in plain, helpful words." },
    { slug: "etsy-offsite-ads-calculator", text: "See what Offsite Ads fees mean for your profit." },
    { slug: "instagram-bio-generator", text: "Write a bio for your shop's Instagram account." },
  ],
  cta: {
    heading: "Want more buyers to find your",
    accent: "shop?",
    copy: "Zain helped an Etsy shop grow through better listings and search. See how it worked.",
    button: "Read the Etsy SEO case study",
    href: "/case-studies/loompad",
  },
  hubCard: { description: "Get one Etsy shop name that fits your products and follows Etsy's rules.", cta: "Name my shop" },
  sources: [
    { label: "Etsy Help: How to choose or change your shop name", url: "https://help.etsy.com/hc/en-us/articles/115015672808", checked: "October 2026" },
  ],
} satisfies NewToolContent;
