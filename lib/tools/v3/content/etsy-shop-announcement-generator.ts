import type { NewToolContent } from "../content-types";

export default {
  slug: "etsy-shop-announcement-generator",
  name: "Etsy Shop Announcement Generator",
  keyword: "etsy shop announcement generator",
  metaTitle: "Etsy Shop Announcement Generator (100% FREE)",
  metaDescription: "Write a clear Etsy shop announcement for a launch, shipping update, sale or important notice. One specific message based on real shop details.",
  lede: "This Etsy shop announcement generator turns the update buyers need to know into one concise shop announcement you can edit and publish.",
  sub: "Say what's happening in your Etsy shop.",
  trust: "Free, no signup. What you type is sent to an AI provider to write your result and isn't stored, so don't include anything private.",
  steps: [
    { title: "Choose the reason", text: "Pick why you're updating shoppers." },
    { title: "Add the detail", text: "Enter the specific detail that should appear on the shop homepage." },
    { title: "Check and paste", text: "Check dates and policies, then paste the text into Etsy's Shop Announcement section." },
  ],
  examples: {
    heading: "Shop announcements,",
    accent: "written out.",
    intro: "Illustrative shops and results. Your output will depend on what you enter.",
    items: [
      { title: "A personalization deadline", input: "Handmade notebook covers; custom initials ordering closes November 20, 2026.", output: "\"Personalized notebook covers are open for orders through November 20. If you'd like initials added, select the personalization option on the listing before checkout.\"", why: "One clear date and the one action buyers need to take." },
      { title: "A short vacation", input: "Ceramic mugs; shop on vacation December 22 to January 3, orders ship from January 5.", output: "\"We're taking a short break from December 22 to January 3. Orders placed now will ship from January 5. Thank you for your patience.\"", why: "Sets expectations without repeating the full shipping policy." },
      { title: "A new collection", input: "Pressed flower prints; spring collection now live.", output: "\"Our spring pressed flower prints are now in the shop. Browse the new designs below, each made from flowers picked and pressed this season.\"", why: "Tells first time visitors what's new and where to look." },
    ],
  },
  guidance: {
    heading: "Writing an announcement",
    accent: "that helps.",
    items: [
      { title: "What the announcement is for", text: "Etsy says the shop announcement appears under listings on the shop homepage and can be used for important notices such as promotions or vacation updates. It isn't a substitute for your About section, policies or listing details. Keep it short." },
      { title: "A useful announcement is current", text: "When a sale ends or processing times change back, update it. Old holiday dates and stale promotions confuse buyers. Include the most relevant action, without a pushy pitch every visit." },
      { title: "Sources", text: "[Etsy Help: how to add a shop announcement and shop title](https://help.etsy.com/hc/en-us/articles/360000343708-How-to-Add-a-Shop-Announcement-and-Shop-Title)." },
    ],
  },
  faqs: [
    { q: "Where does an Etsy shop announcement appear?", a: "Under listings on the shop homepage, according to Etsy's help documentation." },
    { q: "How do I edit my Etsy shop announcement?", a: "On Etsy.com, open Shop Manager, select the edit icon beside your shop under Sales Channels, then use the Announcement section and save." },
    { q: "What should a new Etsy shop announcement say?", a: "Briefly what your shop offers and the most useful thing a buyer should know first." },
    { q: "Should I put shipping information in the announcement?", a: "For temporary or important changes. Full processing and shipping expectations belong in listings and policies." },
    { q: "Can I mention a sale?", a: "Yes, if it's real and the dates and terms are accurate." },
    { q: "How often should I update it?", a: "Whenever the notice goes out of date." },
  ],
  related: [
    { slug: "etsy-shop-about-section-generator", text: "Tell the story behind your shop." },
    { slug: "etsy-shop-name-generator", text: "Find a name that fits what you sell." },
    { slug: "etsy-title-generator", text: "Write listing titles buyers search for." },
  ],
  cta: { heading: "Want more Etsy buyers?", accent: "See how I did it.", copy: "How one Etsy shop grew its sales through search.", button: "Read the case study", href: "/case-studies/loompad" },
  hubCard: { description: "Write one clear Etsy shop announcement for a launch, sale, shipping update or important notice.", cta: "Write an announcement" },
  sources: [{ label: "Etsy Help: shop announcement and shop title", url: "https://help.etsy.com/hc/en-us/articles/360000343708-How-to-Add-a-Shop-Announcement-and-Shop-Title", checked: "October 2026" }],
} satisfies NewToolContent;
