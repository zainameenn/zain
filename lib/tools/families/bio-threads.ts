import { FAIR_USE, LINK_SOCIAL_MEDIA_SERVICE } from "../links";
import type { BrandExample, StudioContent, ToolPage } from "../types";
import { studioBioPage, type StudioBioPlatform } from "./studio-bio";

// Threads Bio Generator on the studio layout, same structure as the Instagram page.

/** Old form copy, still read by the bio family. The studio form below replaces the fields on this page. */
export const THREADS_FIELD_COPY = {
  who: { placeholder: "Product manager at a fintech startup" },
  current_bio: { label: "Paste your current Threads bio" },
};

const CHECKED = "October 17, 2026";
const logo = (path: string, alt: string) => ({ src: path, alt, width: 64, height: 64 });

const PLATFORM: StudioBioPlatform = {
  platform: "Threads",
  skin: "threads",
  limit: 150,
  target: [60, 140],
  shortMax: 60,
  facts:
    "Threads is a conversation platform, so the bio can be warmer and chattier than Instagram. Links (up to 5) and Interests (up to 10 topics) have their own fields, so never list links, topics or hashtags in the bio. Threads doesn't publish a bio limit, so keep every bio within 150 characters.",
  goals: ["Get more followers", "Start a conversation", "Visit my website", "Shop my products", "Send me a DM", "No CTA"],
  defaultFormat: "Multiple lines",
  copy: {
    about: "Product manager writing about shipping faster",
    currentBio: "Official account of Leeds Bikes | Shop | Repairs",
    name: "Sam Patel",
    nameHint: "Shows on the preview. Your Threads name comes from Instagram.",
    audience: "People who build software for a living",
    proof: "Shipped three apps in five years",
    keywords: "product management",
    location: "Leeds",
  },
  example: {
    account_type: "Business",
    category: "Small Business",
    about: "Neighborhood bike shop doing repairs and rentals",
    name: "Leeds Bikes",
    location: "Leeds",
    tone: "Friendly",
    goal: "Start a conversation",
    emoji: "Subtle",
    format: "Multiple lines",
  },
};

/**
 * Real brand profiles. Each bio is the biography field from the brand's live Threads profile on the date in CHECKED.
 * Bios change often, so recheck before relying on them. Brands without a free logo get a neutral monogram.
 */
const BRANDS: BrandExample[] = [
  {
    brand: "Duolingo",
    handle: "duolingo",
    url: "https://www.threads.com/@duolingo",
    logo: logo("/assets/tools/instagram-bio/brands/duolingo.svg", "Duolingo logo"),
    bio: "taco. taco. taco. タコス. taco. taco. टैको. taco. Taco.",
    checked: CHECKED,
    style: "Personality",
    why: "One word in three scripts. It shows off the product, languages, as a joke instead of a description.",
    lesson: "Show what you do instead of explaining it, if you can do it in one line.",
  },
  {
    brand: "Canva",
    handle: "canva",
    url: "https://www.threads.com/@canva",
    logo: logo("/assets/tools/instagram-bio/brands/canva.svg", "Canva logo"),
    bio: "What will you design today?",
    checked: CHECKED,
    style: "Action-focused",
    why: "A single question that invites you to do something, which suits a platform built on replies.",
    lesson: "A question is a call to action that doesn't feel like one.",
  },
  {
    brand: "NASA",
    handle: "nasa",
    url: "https://www.threads.com/@nasa",
    logo: logo("/assets/tools/brands/nasa.svg", "NASA logo"),
    bio: "Making the seemingly impossible, possible. ✨",
    checked: CHECKED,
    style: "Brand-focused",
    why: "A mission line and one emoji. The topics live in the Interests field instead: NASA, Space Threads and Science Threads.",
    lesson: "Let Interests carry the topics so the bio can say something bigger.",
  },
  {
    brand: "Wendy's",
    handle: "wendys",
    url: "https://www.threads.com/@wendys",
    logo: null,
    bio: "Food threads",
    checked: CHECKED,
    style: "Minimal",
    why: "Two words that play on the platform's name, in the same joking voice Wendy's uses everywhere.",
    lesson: "A tiny bio works when the voice is already famous.",
  },
  {
    brand: "Sephora",
    handle: "sephora",
    url: "https://www.threads.com/@sephora",
    logo: null,
    bio: "We Belong to Something Beautiful",
    checked: CHECKED,
    style: "Brand-focused",
    why: "The brand slogan, and nothing else. The shopping happens in the link, which has its own title: sephora.com.",
    lesson: "Give your link a clear title so the bio doesn't have to explain it.",
  },
  {
    brand: "Starbucks",
    handle: "starbucks",
    url: "https://www.threads.com/@starbucks",
    logo: null,
    bio: "*shakes iced coffee*",
    checked: CHECKED,
    style: "Personality",
    why: "Written like an action in a chat. It sounds like a person on Threads, not a coffee company.",
    lesson: "On Threads, sounding like a person beats sounding official.",
  },
];

const STUDIO: StudioContent = {
  lede: "This Threads bio generator writes bios that sound like a real person, start conversations, and fit in 150 characters.",
  sub: "Choose your style, tell us what your account is about, and get five bios ready to copy.",
  trust: `Free to use, no signup required. ${FAIR_USE.replace("Free to use. ", "")}`,
  sections: [
    {
      kind: "steps",
      eyebrow: "How it works",
      heading: "How to use the",
      accent: "Threads bio generator",
      intro: "Three steps, about thirty seconds. The phone preview updates while you go.",
      steps: [
        { title: "Tell us about your account", text: "Pick personal, creator or business, then choose your niche or type your own.", visual: "account" },
        { title: "Choose your style", text: "Pick a tone, how many emoji you want, and one line or several.", visual: "style" },
        { title: "Copy your favorite", text: "Compare five bios, preview any of them on the phone, then paste one into Edit profile on Threads.", visual: "copy" },
      ],
    },
    {
      kind: "gallery",
      eyebrow: "Real examples",
      heading: "6 Threads bios",
      accent: "worth learning from",
      intro: "How well known brands sound on Threads, where the bio reads more like a hello than a pitch.",
      note: `Big brands can lean on name recognition, so copy the habits, not the brevity. Bios as shown on each brand's official Threads profile on ${CHECKED}, and they may have changed since. Logos are trademarks of their owners, shown only to identify each account.`,
      items: BRANDS,
    },
    {
      kind: "creator",
      eyebrow: "Bio breakdown",
      heading: "What makes a good",
      accent: "Threads bio",
      intro: "A good Threads bio tells people who you are and why your replies are worth reading. Here's a real one, taken apart line by line.",
      profile: {
        handle: "adamgrant",
        name: "Adam Grant",
        url: "https://www.threads.com/@adamgrant",
        checked: CHECKED,
        link: "linktr.ee/adammgrant",
        photo: {
          src: "/assets/tools/threads-bio/adam-grant.webp",
          alt: "Adam Grant",
          width: 256,
          height: 256,
          credit: "Photo: World Economic Forum / Jakob Polacsek, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/), via Wikimedia Commons, cropped.",
        },
      },
      nameMark: 1,
      linkMark: 5,
      lines: [
        { text: "Organizational psychologist @whartonschool", mark: 2 },
        { text: "#1 NYT bestselling author of THINK AGAIN and HIDDEN POTENTIAL", mark: 3 },
        { text: "@TED podcast: Re:Thinking", mark: 4 },
      ],
      points: [
        { title: "Name", text: "His real name, in bold at the top. On Threads it comes from Instagram, so there's no extra name field to fill." },
        { title: "Role and where he works", text: "\"Organizational psychologist\" says what he knows about, and the @whartonschool mention is tappable." },
        { title: "Proof, stated once", text: "One line of credibility, with his two books named. Use proof like this only if it's real and you can name it." },
        { title: "Another way in", text: "The podcast line gives people a second reason to stick around, and the @TED mention links straight to it." },
        { title: "One link", text: "A single link page in the links section, so the bio itself never needs a URL. Threads allows up to five." },
        { title: "What's missing", text: "Nothing personal or chatty, and no Interests set. On Threads, one human line or a question gives people an easy first reply." },
      ],
      note: `Bio and link as shown on @adamgrant on ${CHECKED}. Follower counts and posts are left out on purpose.`,
    },
    {
      kind: "compare",
      eyebrow: "Before and after",
      heading: "Fixing a weak",
      accent: "Threads bio",
      intro: "A bio copied from a website sounds stiff on Threads. Make it sound like someone you could reply to.",
      before: "Official account of Leeds Bikes 🚲\nShop | Repairs | Rentals\nLink below 👇",
      after: "Neighborhood bike shop in Leeds 🚲\nAsk us anything about fixing a puncture",
      changes: [
        "\"Official account\" became what the shop actually is.",
        "A list of services became an open invitation to talk.",
        "The link pointer went, because links have their own section.",
      ],
    },
    {
      kind: "styles",
      eyebrow: "Bio ideas",
      heading: "Threads bio ideas",
      accent: "for every style",
      intro: "Six different approaches across six kinds of accounts. Find one that sounds like you, then send its settings straight to the generator.",
      styles: [
        {
          name: "Minimal",
          when: "For makers and artists who let their posts do the talking.",
          bio: "Ceramicist · Glasgow\nMostly mugs, some opinions",
          why: "Craft, place and a hint of personality in seven words.",
          settings: { tone: "Minimal", emoji: "None", format: "Multiple lines" },
        },
        {
          name: "Professional",
          when: "For people sharing what they learn at work.",
          bio: "Product manager at a fintech startup\nPosting what I learn about shipping faster",
          why: "What you do, then exactly what people get from following.",
          settings: { tone: "Professional", emoji: "None", format: "Multiple lines" },
          dark: true,
        },
        {
          name: "Funny",
          when: "For teachers, parents and anyone with stories to tell.",
          bio: "Teaching year 6 and losing every argument to a ten year old 🍎",
          why: "A real job and an honest joke. You can already picture the posts.",
          settings: { tone: "Funny", emoji: "Subtle", format: "Single line" },
        },
        {
          name: "Aesthetic",
          when: "For lifestyle and personal accounts.",
          bio: "slow mornings, film photos, too many plants 🌿",
          why: "Three small details set a mood without trying hard.",
          settings: { tone: "Aesthetic", emoji: "Subtle", format: "Single line" },
        },
        {
          name: "Conversation starter",
          when: "For creators who want replies, not just follows.",
          bio: "Home cook sharing one dinner a day 🍲\nWhat should I make next?",
          why: "What you post, then a question that gives people an easy first reply.",
          settings: { tone: "Friendly", emoji: "Subtle", format: "Multiple lines", goal: "Start a conversation" },
        },
        {
          name: "Business",
          when: "For local shops and small brands.",
          bio: "Neighborhood bike shop in Leeds 🚲\nRepairs, rides and the odd rant about potholes",
          why: "What, where, and a little personality that makes locals want to say hi.",
          settings: { tone: "Friendly", emoji: "Subtle", format: "Multiple lines" },
        },
      ],
    },
    {
      kind: "practices",
      eyebrow: "Best practices",
      heading: "Threads bio",
      accent: "best practices",
      intro: "Six habits that make the biggest difference, each one a different idea.",
      items: [
        {
          title: "Sound like a person",
          text: "Threads is built for conversation, so write the way you'd introduce yourself to someone new.",
          featured: true,
          example: { good: "Product manager who overshares about shipping", bad: "Visionary leader | Innovator" },
        },
        {
          title: "Use Interests for topics",
          text: "You can add [up to 10 Interests](https://www.threads.com/@threads/post/DIupHJTsMO3) to your profile. Tapping one leads to conversations about it.",
          example: { good: "Bike repairs and local rides", bad: "#cycling #bikes #leeds #repair" },
        },
        {
          title: "Put links in the links section",
          text: "Threads lets you add [up to 5 links](https://about.fb.com/news/2025/03/new-threads-features-more-personalized-experience-you-control/), each with its own title.",
          example: { good: "Repair bookings below", bad: "Book at www.leedsbikes.co.uk" },
        },
        {
          title: "Don't just copy Instagram",
          text: "Changes on Threads [only affect Threads](https://help.instagram.com/1207185479989246/), so you can write a warmer version here.",
          example: { good: "Mostly mugs, some opinions" },
        },
        { title: "Invite a reply", text: "A short question or an open door gives people an easy first message.", example: { good: "What should I make next?" } },
        { title: "Keep it short", text: "Threads doesn't publish a bio limit. This tool keeps every bio within 150 characters, the same as Instagram.", example: { count: 126 } },
      ],
    },
    { kind: "faq", eyebrow: "FAQ", heading: "Frequently asked", accent: "questions" },
    {
      kind: "related",
      eyebrow: "Keep going",
      heading: "More free tools for",
      accent: "your social profiles",
      tools: [
        { slug: "instagram-bio-generator", text: "The matching bio for Instagram.", icon: "bio" },
        { slug: "twitter-bio-generator", text: "A sharper 160 character bio for X.", icon: "x" },
        { slug: "tiktok-bio-generator", text: "Say the same thing in 80 characters.", icon: "bio" },
        { slug: "instagram-caption-generator", text: "Captions for the posts your bio promises.", icon: "caption" },
      ],
    },
    {
      kind: "cta",
      heading: "A better bio is a start.",
      accent: "Let's fix the rest of your social presence.",
      copy: "I help SaaS and service businesses turn content, profiles and organic social into real growth.",
      button: "Explore social media marketing",
      href: LINK_SOCIAL_MEDIA_SERVICE ?? "/services",
    },
  ],
};

export function threadsPage(page: ToolPage): ToolPage {
  return studioBioPage(
    {
      ...page,
      metaTitle: "Threads Bio Generator: Free AI Bios That Start Chats",
      metaDescription: "Use this free Threads bio generator to write 5 bios from your real details, see them on a live Threads style profile, and copy the one that sounds like you.",
      h1: { regular: "Free Threads", accent: "Bio Generator" },
      heroDescription: STUDIO.lede,
      accessNote: FAIR_USE,
      faqs: [
        { q: "Is this Threads bio generator free?", a: `Yes. ${FAIR_USE}` },
        { q: "How long can a Threads bio be?", a: "Threads doesn't publish an exact limit. This tool keeps every bio within 150 characters, counting spaces, emoji and line breaks, and the counter shows the exact total." },
        { q: "Can my Threads bio be different from my Instagram bio?", a: "Yes. Changes you make on Threads only affect Threads, so it doesn't have to match Instagram. Most people do better with a warmer, chattier version here." },
        { q: "How many links can I add to my Threads profile?", a: "Up to five, and you can give each link a title. That's why the bio itself never needs a URL." },
        { q: "What are Interests on a Threads profile?", a: "Topics you add to your profile, up to 10. Tapping one takes people to conversations about that topic, so they're the best place to list what you post about." },
        { q: "Should I use hashtags in my Threads bio?", a: "Use the Interests field for topics instead. It was built for exactly that, and it keeps your bio free for personality." },
        { q: "Will the AI make things up about me?", a: "No. It only uses what you type. If a bio would be stronger with a real number or result, it suggests what to add instead of inventing one." },
        { q: "Can it rewrite the bio I already have?", a: "Yes. Switch to \"Improve my bio\", paste your Threads, Instagram or X bio, and you'll get five Threads versions that keep your facts." },
        { q: "Can it write bios in other languages?", a: "Yes. Open \"More ways to personalize\", pick your language, and all five bios come out in it." },
      ],
      related: [],
      extraLinks: [],
    },
    PLATFORM,
    STUDIO,
  );
}
