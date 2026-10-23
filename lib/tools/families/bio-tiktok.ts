import { FAIR_USE, LINK_SOCIAL_MEDIA_SERVICE } from "../links";
import type { BrandExample, StudioContent, ToolPage } from "../types";
import { studioBioPage, type StudioBioPlatform } from "./studio-bio";

// TikTok Bio Generator on the studio layout, same structure as the Instagram page.

/** Old form copy, still read by the bio family. The studio form below replaces the fields on this page. */
export const TIKTOK_FIELD_COPY = {
  who: { placeholder: "Budget recipes, every meal under $5" },
  current_bio: { label: "Paste your current TikTok bio" },
};

const CHECKED = "October 17, 2026";
const logo = (path: string, alt: string) => ({ src: path, alt, width: 64, height: 64 });
const IG = "/assets/tools/instagram-bio/brands";

const PLATFORM: StudioBioPlatform = {
  platform: "TikTok",
  skin: "tiktok",
  limit: 80,
  target: [30, 78],
  shortMax: 40,
  facts:
    "The name (30 characters) and @username sit above the bio. URLs typed into the bio are not clickable. A website link needs 1,000 followers or a Verified Business Account and has its own field. The space is tiny, so one line usually reads best.",
  goals: ["Get more followers", "Watch my series", "Visit my website", "Shop my products", "Send me a DM", "No CTA"],
  defaultFormat: "Single line",
  nameIdeas: { limit: 30, heading: "Ideas for your TikTok name", helper: "Your TikTok name can be up to 30 characters and shows above your bio, so a plain keyword helps." },
  copy: {
    about: "Budget recipes, every meal under $5",
    currentBio: "Hi!! I'm Jess ✨ fitness | food | travel | life",
    name: "Five Dollar Feed",
    nameHint: "Shows on the preview and in your name ideas.",
    audience: "Students cooking on a tight budget",
    proof: "New recipe every day",
    keywords: "budget recipes",
    location: "Manchester",
  },
  example: {
    account_type: "Creator",
    category: "Food & Restaurants",
    about: "Budget recipes, every meal under $5",
    name: "Five Dollar Feed",
    audience: "Students",
    proof: "New recipe every day",
    keywords: "budget recipes",
    tone: "Friendly",
    goal: "Get more followers",
    emoji: "Subtle",
    format: "Single line",
  },
};

/**
 * Real brand profiles. Each bio is the signature field from the brand's live TikTok profile on the date in CHECKED.
 * Bios change often (Duolingo's is seasonal), so recheck before relying on them. Brands without a free logo get a neutral monogram.
 */
const BRANDS: BrandExample[] = [
  {
    brand: "Nike",
    handle: "nike",
    url: "https://www.tiktok.com/@nike",
    logo: logo(`${IG}/nike.svg`, "Nike logo"),
    bio: "Just Do It.",
    checked: CHECKED,
    style: "Minimal",
    why: "The slogan is the whole bio. With 80 characters to work with, three famous words leave nothing to skim past.",
    lesson: "Short works when the line is already famous.",
  },
  {
    brand: "Duolingo",
    handle: "duolingo",
    url: "https://www.tiktok.com/@duolingo",
    logo: logo(`${IG}/duolingo.svg`, "Duolingo logo"),
    bio: "educated girl autumn 🎃🦉",
    checked: CHECKED,
    style: "Personality",
    why: "All lowercase and riffing on a seasonal meme, the same way its videos talk. The owl emoji does the branding.",
    lesson: "Sound like your videos, not like your About page.",
  },
  {
    brand: "Ryanair",
    handle: "ryanair",
    url: "https://www.tiktok.com/@ryanair",
    logo: null,
    bio: "Catch flights, not feelings 💅\n\nOfficial: @Ryanair España 🇪🇸 @Ryanair Italia 🇮🇹 @Ryanair FR 🇫🇷🇲🇦",
    checked: CHECKED,
    style: "Action-focused",
    why: "A pun up top, then mentions that send viewers to the right country account. There's no link, so the mentions do the routing.",
    lesson: "No link yet? Point people to the right place with a mention.",
  },
  {
    brand: "Canva",
    handle: "canva",
    url: "https://www.tiktok.com/@canva",
    logo: logo(`${IG}/canva.svg`, "Canva logo"),
    bio: "It’s called CANva, not CANTva 😌✨",
    checked: CHECKED,
    style: "Personality",
    why: "Wordplay on its own name, with caps for the joke. It's confident and tells you the brand doesn't take itself too seriously.",
    lesson: "Play with your own name if it gives you a line nobody else can use.",
  },
  {
    brand: "Gymshark",
    handle: "gymshark",
    url: "https://www.tiktok.com/@gymshark",
    logo: null,
    bio: "megan does gym",
    checked: CHECKED,
    style: "Minimal",
    why: "Three lowercase words about a person, not the brand. It reads like a creator account, which is how its videos feel. The link goes to the shop.",
    lesson: "A human voice can sell harder than a product line.",
  },
  {
    brand: "Netflix",
    handle: "netflix",
    url: "https://www.tiktok.com/@netflix",
    logo: logo(`${IG}/netflix.svg`, "Netflix logo"),
    bio: "",
    checked: CHECKED,
    style: "Minimal",
    why: "Netflix currently leaves its TikTok bio empty and lets the name, the badge and the videos do the talking.",
    lesson: "That only works with near universal recognition.",
  },
];

const STUDIO: StudioContent = {
  lede: "This TikTok bio generator writes tiny bios that tell viewers exactly why to follow, and every one fits in 80 characters.",
  sub: "Choose your style, tell us what your account is about, and get a bio ready to copy.",
  trust: `Free to use, no signup required. ${FAIR_USE.replace("Free to use. ", "")}`,
  sections: [
    {
      kind: "steps",
      eyebrow: "How it works",
      heading: "How to use the",
      accent: "TikTok bio generator",
      intro: "Three steps, about thirty seconds. The phone preview updates while you go.",
      steps: [
        { title: "Tell us about your account", text: "Pick personal, creator or business, then choose your niche or type your own.", visual: "account" },
        { title: "Choose your style", text: "Pick a tone and how many emoji you want. One line usually reads best in 80 characters.", visual: "style" },
        { title: "Tweak and copy", text: "Preview your bio on the phone, ask for a fresh take or a small change, then paste it into Edit profile on TikTok.", visual: "copy" },
      ],
    },
    {
      kind: "gallery",
      eyebrow: "Real examples",
      heading: "6 TikTok bios",
      accent: "worth learning from",
      intro: "How well known brands use 80 characters, from one famous slogan to no bio at all.",
      note: `Big brands can lean on name recognition, so copy the habits, not the brevity. Bios as shown on each brand's official TikTok profile on ${CHECKED}, and they may have changed since. Logos are trademarks of their owners, shown only to identify each account.`,
      items: BRANDS,
    },
    {
      kind: "creator",
      eyebrow: "Bio breakdown",
      heading: "What makes a good",
      accent: "TikTok bio",
      intro: "Viewers land on your profile after one video they liked. The bio answers one question: will the next one be worth it? Here's a real creator bio, taken apart line by line.",
      profile: {
        handle: "charlidamelio",
        name: "charli d’amelio",
        url: "https://www.tiktok.com/@charlidamelio",
        checked: CHECKED,
        link: "m.youtube.com/@CharlidAmelio",
        photo: {
          src: "/assets/tools/tiktok-bio/charli-damelio.webp",
          alt: "Charli D'Amelio",
          width: 256,
          height: 256,
          credit: "Photo: Brad Mondo, [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/), via Wikimedia Commons, cropped.",
        },
      },
      nameMark: 1,
      linkMark: 4,
      lines: [{ text: "orca enthusiast", mark: 2 }, { text: "meg thee stallion fan" }, { text: "i post on youtube on saturdays (for the most part)", mark: 3 }],
      points: [
        { title: "Name in her own voice", text: "All lowercase, just like the bio. The name and the bio sound like the same person." },
        { title: "Personality first", text: "Two small, specific things she likes. They tell you more about her than a job title would." },
        { title: "When to come back", text: "A posting day, with an honest \"for the most part\". It gives people a reason to check in, and somewhere to go." },
        { title: "A link to the next stop", text: "The website link points to her YouTube channel. TikTok allows a website link once you have 1,000 followers or a Verified Business Account." },
        { title: "What's missing", text: "Nothing says what her videos are about. She can skip that. A smaller account usually can't, so lead with what you post." },
      ],
      note: `Bio and link as shown on @charlidamelio on ${CHECKED}. Follower counts and videos are left out on purpose.`,
    },
    {
      kind: "compare",
      eyebrow: "Before and after",
      heading: "Fixing a weak",
      accent: "TikTok bio",
      intro: "In 80 characters, trying to say everything means saying nothing. Pick one thing and say it clearly.",
      before: "Hi!! 👋 I'm Jess ✨ fitness | food | travel | life 💕",
      after: "Ten minute workouts for desk workers. New one every Monday",
      changes: [
        "The greeting and the name went, because the name already shows above the bio.",
        "Four topics became one clear thing people get.",
        "A posting rhythm gives viewers a reason to follow now.",
      ],
    },
    {
      kind: "styles",
      eyebrow: "Bio ideas",
      heading: "TikTok bio ideas",
      accent: "for every style",
      intro: "Six different approaches across six kinds of accounts, all under 80 characters. Find one that sounds like you, then send its settings straight to the generator.",
      styles: [
        {
          name: "Minimal",
          when: "For local businesses and anyone with a clear offer.",
          bio: "Boxing for total beginners · Manchester",
          why: "What, who and where. \"Total beginners\" removes the fear factor in two words.",
          settings: { tone: "Minimal", emoji: "None", format: "Single line" },
        },
        {
          name: "Professional",
          when: "For coaches, consultants and experts teaching in short videos.",
          bio: "I fix bad resumes in 60 seconds. Follow for yours",
          why: "A clear promise, a time frame and a reason to follow, with room to spare.",
          settings: { tone: "Professional", emoji: "None", format: "Single line" },
          dark: true,
        },
        {
          name: "Funny",
          when: "For comedy, reviews and personality led accounts.",
          bio: "I taste test gas station snacks so you don't have to",
          why: "The niche is the joke, so you know exactly what the videos are.",
          settings: { tone: "Funny", emoji: "None", format: "Single line" },
        },
        {
          name: "Aesthetic",
          when: "For lifestyle, fashion and personal accounts.",
          bio: "film photos, slow walks ☁️",
          why: "Two small things and one mood. Personal accounts don't need more.",
          settings: { tone: "Aesthetic", emoji: "Subtle", format: "Single line" },
        },
        {
          name: "Creator",
          when: "For food, fitness and education creators.",
          bio: "Meals under $5, new recipe daily 🍝",
          why: "A price and a schedule in six words. People know what they get before they follow.",
          settings: { tone: "Friendly", emoji: "Subtle", format: "Single line" },
        },
        {
          name: "Business",
          when: "For shops and small brands selling on TikTok.",
          bio: "Hand poured candles that smell like holidays 🕯️ Shop below",
          why: "The product and the feeling first, then the shortest pointer to the link.",
          settings: { tone: "Friendly", emoji: "Subtle", format: "Single line", goal: "Shop my products" },
        },
      ],
    },
    {
      kind: "practices",
      eyebrow: "Best practices",
      heading: "TikTok bio",
      accent: "best practices",
      intro: "Six habits that make the biggest difference, each one a different idea.",
      items: [
        {
          title: "Say one thing",
          text: "If your bio covers three niches, nobody remembers any of them. Pick the one your videos are about.",
          featured: true,
          example: { good: "Meals under $5, new recipe daily", bad: "food | travel | fitness | life ✨" },
        },
        { title: "Skip your name", text: "It already shows above the bio, so spend the characters on what you post.", example: { good: "Ten minute workouts for desk workers", bad: "Hi I'm Jess and this is my page" } },
        {
          title: "Don't type links",
          text: "A website link needs [1,000 followers or a Verified Business Account](https://www.tiktok.com/support/faq_detail?id=7581821550328896012). A URL typed into the bio is just text.",
          example: { good: "Shop below", bad: "shop at www.glowandpour.com" },
        },
        { title: "One emoji at most", text: "In a space this small, an emoji should replace a word, not decorate one.", example: { good: "Boxing for beginners 🥊", bad: "🥊🔥💪😤 Boxing" } },
        { title: "Match your videos", text: "If the bio says fitness and the feed is all cooking, viewers leave confused.", example: { good: "Small desk setups that make Mondays bearable" } },
        {
          title: "Stay within 80 characters",
          text: "TikTok says bios [can't exceed 80 characters](https://www.tiktok.com/support/faq_detail?id=7096681482017692162). The counter in the tool counts emoji the way they display.",
          example: { count: 62 },
        },
      ],
    },
    { kind: "faq", eyebrow: "FAQ", heading: "Frequently asked", accent: "questions" },
    {
      kind: "related",
      eyebrow: "Keep going",
      heading: "More free tools for",
      accent: "your social profiles",
      tools: [
        { slug: "instagram-bio-generator", text: "The same idea in 150 characters.", icon: "bio" },
        { slug: "twitter-bio-generator", text: "A sharper 160 character bio for X.", icon: "x" },
        { slug: "threads-bio-generator", text: "A warmer, chattier bio for Threads.", icon: "chat" },
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

export function tiktokPage(page: ToolPage): ToolPage {
  return studioBioPage(
    {
      ...page,
      metaTitle: "TikTok Bio Generator: Free AI Bios That Fit 80 Characters",
      metaDescription: "Use this free TikTok bio generator to write 5 short bios from your real details, see them on a live TikTok style profile, and copy one in seconds.",
      h1: { regular: "Free TikTok", accent: "Bio Generator" },
      heroDescription: STUDIO.lede,
      accessNote: FAIR_USE,
      faqs: [
        { q: "Is this TikTok bio generator free?", a: `Yes. ${FAIR_USE}` },
        { q: "How many characters can a TikTok bio have?", a: "TikTok's help center says bios can't exceed 80 characters. Every bio this tool writes stays within that, and the counter shows the exact total." },
        { q: "Why can't I add a link to my TikTok bio?", a: "TikTok says you need at least 1,000 followers or a Verified Business Account to add a website link to your profile. Until then, a URL typed into the bio is just text." },
        { q: "Can I link my Instagram or YouTube on TikTok?", a: "TikTok says links that open or log you into other social media apps are no longer supported, but you can still link to those platforms' websites." },
        { q: "How long can my TikTok name and username be?", a: "Your name can be up to 30 characters. Your username can be 2 to 24 characters, using letters, numbers, underscores and periods, and you can change it once every 30 days." },
        { q: "What should a business put in its TikTok bio?", a: "What you sell, who it's for, your city if you're local, and one tiny next step like \"Shop below\". Keep the brand name for the name field." },
        { q: "Will the AI make things up about me?", a: "No. It only uses what you type. If a bio would be stronger with a real detail, it suggests what to add instead of inventing one." },
        { q: "Can it rewrite the bio I already have?", a: "Yes. Switch to \"Improve my bio\", paste it in, and get a shorter, sharper version that keeps your facts." },
        { q: "Can it write TikTok bios in other languages?", a: "Yes. Open \"More ways to personalize\", pick your language, and your bio comes out in it." },
      ],
      related: [],
      extraLinks: [],
    },
    PLATFORM,
    STUDIO,
  );
}
