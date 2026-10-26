import type { NewToolContent } from "../content-types";

export default {
  slug: "tiktok-username-generator",
  name: "TikTok Username Generator",
  keyword: "tiktok username generator",
  metaTitle: "TikTok Username Generator (100% FREE)",
  metaDescription: "Get a memorable TikTok username for your content, creator identity or business. One personalized suggestion with formatting checks and simple naming advice.",
  lede: "This TikTok username generator takes your content and preferred style and gives you one short, relevant username idea you can try on TikTok.",
  sub: "Make your TikTok name easy to remember.",
  trust: "Free, no signup. What you type is sent to an AI provider to write your result and isn't stored, so don't include anything private. Names are suggestions. Availability is not checked.",
  steps: [
    { title: "Type your name or theme", text: "Add your creator name or what your content is about." },
    { title: "Pick a tone", text: "Choose the tone you want the handle to communicate." },
    { title: "Try it in TikTok", text: "Enter the generated handle in TikTok's Edit Profile screen." },
  ],
  examples: {
    heading: "TikTok usernames,",
    accent: "with the thinking behind them.",
    intro: "Illustrative suggestions only. Availability is unknown for all of them.",
    items: [
      { title: "Apartment cooking", input: "Mia, easy apartment cooking, playful.", output: "@miamakesdinner", why: "Clear, approachable and easy to say." },
      { title: "Book reviews", input: "Sam, short reviews of new fantasy novels, calm.", output: "@sam.reads.fantasy", why: "The genre is in the handle, and the periods keep it readable." },
      { title: "Small business", input: "Fern and Pot, houseplant shop, cheerful.", output: "@fernandpot_plants", why: "Keeps the shop name and adds what it sells for new viewers." },
    ],
  },
  guidance: {
    heading: "What makes a good",
    accent: "TikTok username.",
    items: [
      { title: "Pick a name that still works next year", text: "A username based on one viral joke may feel perfect for a week and confusing after you change direction. Consider a name that covers your broader topic. If you review affordable cooking gear, you may eventually post recipes and kitchen tests too, so choose a handle with enough room to grow." },
      { title: "Changing your TikTok username", text: "TikTok says usernames can be changed once every 30 days, and changing the username also changes the profile link. A previous username may not become available immediately. Update any external links if you change it." },
      { title: "Sources", text: "Username change rules come from [TikTok's help page on changing your username](https://support.tiktok.com/en/getting-started/setting-up-your-profile/changing-your-username), checked October 2026." },
    ],
  },
  faqs: [
    { q: "What characters can I use in a TikTok username?", a: "Letters, numbers, underscores and periods, but a period cannot be the last character. The tool checks formatting, not availability." },
    { q: "Can I change my TikTok username whenever I want?", a: "TikTok currently limits username changes to once every 30 days. Plan changes carefully because they affect your profile link." },
    { q: "Should my TikTok username include my niche?", a: "A short niche clue can help if it remains readable, but don't trap your brand inside a topic you may abandon." },
    { q: "Is a TikTok display name the same as the username?", a: "No. The username is your @handle and link. The display name is a separate presentation field." },
    { q: "Can this tool guarantee a unique handle?", a: "No. Even if a profile URL appears empty, the handle may be unavailable. The TikTok app is the authority." },
    { q: "Are numbers in usernames bad?", a: "Not necessarily. A relevant number is fine, but long random suffixes usually make handles harder to remember." },
  ],
  related: [
    { slug: "tiktok-bio-generator", text: "Write a bio to go with the handle." },
    { slug: "instagram-username-generator", text: "Get a matching Instagram handle." },
    { slug: "tiktok-caption-generator", text: "Write captions for your videos." },
  ],
  cta: { heading: "Want TikTok", accent: "to bring in customers?", copy: "I help brands build social content that earns followers and sales, not just views.", button: "See social media marketing", href: "/services/social-media-marketing-specialist" },
  hubCard: { description: "Get one short TikTok handle idea with formatting checks for your content or business.", cta: "Generate a username" },
  sources: [
    { label: "TikTok: changing your username", url: "https://support.tiktok.com/en/getting-started/setting-up-your-profile/changing-your-username", checked: "October 2026" },
  ],
} satisfies NewToolContent;
