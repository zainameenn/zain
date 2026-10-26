import type { NewToolContent } from "../content-types";

export default {
  slug: "instagram-username-generator",
  name: "Instagram Username Generator",
  keyword: "instagram username generator",
  metaTitle: "Instagram Username Generator (100% FREE)",
  metaDescription: "Create a clean Instagram username based on your name, niche or business. Get one handle idea, understand the formatting rules and check availability yourself.",
  lede: "This Instagram username generator turns your name or brand and what your account is about into one handle idea that's readable, relevant and easy to share.",
  sub: "Find an Instagram username that feels like you.",
  trust: "Free, no signup. What you type is sent to an AI provider to write your result and isn't stored, so don't include anything private. This is an idea, not a live availability check. Try claiming it in Instagram before using it elsewhere.",
  steps: [
    { title: "Enter a name or theme", text: "Describe what followers should expect from the account." },
    { title: "Choose a style", text: "Pick the style that fits your account." },
    { title: "Check it in Instagram", text: "Copy the suggested handle and check it inside Instagram." },
  ],
  examples: {
    heading: "Instagram usernames,",
    accent: "with the thinking behind them.",
    intro: "Illustrative suggestions only. Availability is not verified for any of them.",
    items: [
      { title: "Handmade ceramics", input: "Quiet Morning Studio, handmade ceramic mugs, simple.", output: "@quietmorningceramics", why: "Keeps the brand identity and makes the niche immediately understandable." },
      { title: "Personal trainer", input: "Dana Reyes, home workouts for busy parents, friendly.", output: "@dana.moves.home", why: "Her real name stays first, and the rest says where the workouts happen." },
      { title: "Bakery account", input: "Little Crumb Bakery, sourdough and pastries in Bristol, warm.", output: "@littlecrumb_bristol", why: "The brand is intact and the city helps if the plain name is already taken." },
    ],
  },
  guidance: {
    heading: "What makes a good",
    accent: "Instagram username.",
    items: [
      { title: "A name people can remember", text: "Your Instagram username appears in your profile link and mentions. The best choice is usually one you can say out loud without explaining where three underscores go. Start with your real brand or topic, not a collection of trending words. If you sell handmade products, a readable brand variation is more useful than a random string of numbers." },
      { title: "Handle versus display name", text: "Your handle is the unique account identifier, while your display name can communicate more context about your work. You don't have to squeeze every service or keyword into the handle. Keep the handle recognizable, then use the display name and bio to explain what the account offers." },
    ],
  },
  faqs: [
    { q: "How do I create a good Instagram username?", a: "Start with a recognizable name or theme, keep spelling simple, and avoid cluttered numbers and punctuation. Check how it looks in a profile URL and how easily someone can remember it." },
    { q: "How long can an Instagram username be?", a: "Instagram usernames can be up to 30 characters, using letters, numbers, periods and underscores. The tool checks the suggestion against these rules." },
    { q: "Is an Instagram username the same as the name in my profile?", a: "No. The handle is your unique @identifier. The display name is a separate field and can give more detail about your niche or role." },
    { q: "Can this tool check whether a username is taken?", a: "No. This tool creates an idea. Instagram itself is the final place to confirm availability." },
    { q: "Should I put keywords in my username?", a: "Only when they help explain the brand and don't make the handle hard to remember. A relevant modifier can help when your first choice is unavailable." },
    { q: "Can I change the handle later?", a: "Instagram supports changing usernames, but check the current account rules and update links and mentions when rebranding." },
  ],
  related: [
    { slug: "instagram-bio-generator", text: "Write the bio that explains the account." },
    { slug: "tiktok-username-generator", text: "Get a matching TikTok handle." },
    { slug: "instagram-caption-generator", text: "Write captions for your first posts." },
  ],
  cta: { heading: "Want the account", accent: "to actually grow?", copy: "I help brands turn social accounts into real customers with content people want to follow.", button: "See social media marketing", href: "/services/social-media-marketing-specialist" },
  hubCard: { description: "Get one readable Instagram handle idea based on your name, niche or business.", cta: "Generate a username" },
  sources: [],
} satisfies NewToolContent;
