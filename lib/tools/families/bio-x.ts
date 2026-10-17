import { FAIR_USE, LINK_SOCIAL_MEDIA_SERVICE } from "../links";
import type { BrandExample, StudioContent, ToolPage } from "../types";
import { studioBioPage, type StudioBioPlatform } from "./studio-bio";

// X (Twitter) Bio Generator on the studio layout, same structure as the Instagram page.
// "X" in the copy; "Twitter" stays in the URL, title and H1 because people still search the old name.

/** Old form copy, still read by the bio family. The studio form below replaces the fields on this page. */
export const X_FIELD_COPY = {
  who: { placeholder: "Growth marketer for B2B SaaS" },
  audience: { placeholder: "SaaS founders who want demos, not just traffic" },
  current_bio: { label: "Paste your current X bio" },
};

const CHECKED = "October 17, 2026";
const logo = (path: string, alt: string) => ({ src: path, alt, width: 64, height: 64 });

const PLATFORM: StudioBioPlatform = {
  platform: "X",
  skin: "x",
  limit: 160,
  target: [80, 155],
  shortMax: 60,
  facts:
    "The display name (50 characters) and @handle sit above the bio. Location and website have their own fields, so never repeat them in the bio. @handles in the bio link to other accounts, so only use handles the visitor typed. One or two lines read best.",
  goals: ["Get more followers", "Visit my website", "Read my newsletter", "Send me a DM", "Contact me", "No CTA"],
  defaultFormat: "Single line",
  nameIdeas: { limit: 50, heading: "Ideas for your display name", helper: "X gives your display name up to 50 characters, so there's room for a plain keyword next to your name." },
  copy: {
    about: "Growth marketer for B2B SaaS",
    currentBio: "Marketing | Growth | AI | Coffee",
    name: "Maya Ortiz",
    nameHint: "Shows on the preview and in your display name ideas.",
    audience: "SaaS founders who want demos, not just traffic",
    proof: "Grew a SaaS from 0 to 2,000 signups",
    keywords: "B2B SaaS, SEO",
    location: "London",
  },
  example: {
    account_type: "Creator",
    category: "Marketing",
    about: "Growth marketer for B2B SaaS, writing about SEO",
    name: "Maya Ortiz",
    audience: "B2B SaaS founders",
    keywords: "B2B SaaS, SEO",
    tone: "Professional",
    goal: "Send me a DM",
    emoji: "None",
    format: "Single line",
  },
};

/**
 * Real brand profiles. Each bio was read from live X profile data on the date in CHECKED
 * (api.fxtwitter.com, cross checked against X's own syndication endpoint). Bios change often, so recheck before relying on them.
 * Logos: public domain files from Wikimedia Commons. Brands without a free logo get a neutral monogram.
 */
const BRANDS: BrandExample[] = [
  {
    brand: "Nike",
    handle: "Nike",
    url: "https://x.com/Nike",
    logo: logo("/assets/tools/instagram-bio/brands/nike.svg", "Nike logo"),
    bio: "Just Do It.",
    checked: CHECKED,
    style: "Minimal",
    why: "The tagline is the whole bio. It works because almost everyone already knows what Nike sells.",
    lesson: "Short works when the line is famous. Everyone else should add what they do.",
  },
  {
    brand: "NASA",
    handle: "NASA",
    url: "https://x.com/NASA",
    logo: logo("/assets/tools/brands/nasa.svg", "NASA logo"),
    bio: "Making the seemingly impossible, possible. ✨",
    checked: CHECKED,
    style: "Brand-focused",
    why: "One line of mission and a single emoji. The joke lives in the location field instead, which reads \"Pale Blue Dot\".",
    lesson: "Let the other fields carry some personality, so the bio can stay clear.",
  },
  {
    brand: "Wendy's",
    handle: "Wendys",
    url: "https://x.com/Wendys",
    logo: null,
    bio: "sir, this is a wendy's",
    checked: CHECKED,
    style: "Personality",
    why: "All lowercase and written like a reply, which is how the account talks on X. The website field goes straight to ordering.",
    lesson: "If your voice is the brand, the bio can just be your voice.",
  },
  {
    brand: "Ryanair",
    handle: "Ryanair",
    url: "https://x.com/Ryanair",
    logo: null,
    bio: "Catch flights, not feelings with Europe’s no. 1 airline 💅",
    checked: CHECKED,
    style: "Personality",
    why: "A wordplay hook, a claim about the brand and one emoji that sets the tone, all in under 60 characters.",
    lesson: "A joke works best when it still says what you are.",
  },
  {
    brand: "Airbnb",
    handle: "Airbnb",
    url: "https://x.com/Airbnb",
    logo: logo("/assets/tools/brands/airbnb.svg", "Airbnb logo"),
    bio: "Don’t just see a place. Experience it.\nCustomer support ➡️ @AirbnbHelp",
    checked: CHECKED,
    style: "Brand-focused",
    why: "Line one is the promise. Line two sends support questions to @AirbnbHelp, so the main account can stay on brand.",
    lesson: "Point people with a specific need to the place that can help them.",
  },
  {
    brand: "Canva",
    handle: "canva",
    url: "https://x.com/canva",
    logo: logo("/assets/tools/instagram-bio/brands/canva.svg", "Canva logo"),
    bio: "Amazingly simple design. Have a question? Or looking for some design tips? We’re here to help: canva.me/help-center 😊",
    checked: CHECKED,
    style: "Action-focused",
    why: "What Canva is in three words, then the two questions its followers actually have, then where to go for answers.",
    lesson: "Name the reader's question, then answer it with one next step.",
  },
];

const STUDIO: StudioContent = {
  lede: "This Twitter bio generator writes X bios that sound like you, fit the 160 character limit, and tell people why to follow.",
  sub: "Choose your style, tell us what your account is about, and get five bios ready to copy.",
  trust: `Free to use, no signup required. ${FAIR_USE.replace("Free to use. ", "")}`,
  sections: [
    {
      kind: "steps",
      eyebrow: "How it works",
      heading: "How to use the",
      accent: "Twitter bio generator",
      intro: "Three steps, about thirty seconds. The phone preview updates while you go.",
      steps: [
        { title: "Tell us about your account", text: "Pick personal, creator or business, then choose your niche or type your own.", visual: "account" },
        { title: "Choose your style", text: "Pick a tone, how many emoji you want, and one line or two.", visual: "style" },
        { title: "Copy your favorite", text: "Compare five bios, preview any of them on the phone, then paste one into Edit profile on X.", visual: "copy" },
      ],
    },
    {
      kind: "gallery",
      eyebrow: "Real examples",
      heading: "6 X bios",
      accent: "worth learning from",
      intro: "How well known brands use 160 characters, from three words to a full help desk.",
      note: `Big brands can lean on name recognition, so copy the habits, not the brevity. Bios as shown on each brand's official X profile on ${CHECKED}, and they may have changed since. Logos are trademarks of their owners, shown only to identify each account.`,
      items: BRANDS,
    },
    {
      kind: "creator",
      eyebrow: "Bio breakdown",
      heading: "What makes a good",
      accent: "X bio",
      intro: "A good X bio says what you do and why you're worth a follow. Here's a real creator bio, taken apart piece by piece.",
      profile: {
        handle: "MKBHD",
        name: "Marques Brownlee",
        url: "https://x.com/MKBHD",
        checked: CHECKED,
        link: "MKBHD.com",
        location: "NYC",
        photo: {
          src: "/assets/tools/twitter-bio/marques-brownlee.webp",
          alt: "Marques Brownlee",
          width: 256,
          height: 256,
          credit: "Photo: Marques Brownlee, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), via Wikimedia Commons, cropped and resized, shared under the same license.",
        },
      },
      nameMark: 1,
      linkMark: 5,
      join: " | ",
      lines: [{ text: "Web Video Producer", mark: 2 }, { text: "⋈" }, { text: "Pro Ultimate Frisbee Player", mark: 3 }, { text: "Host of @WVFRM @TheStudio", mark: 4 }],
      points: [
        { title: "Display name", text: "His real name, nothing added. A smaller account can use some of the 50 characters for a keyword, like \"Maya · B2B SaaS Growth\"." },
        { title: "What he does, first", text: "\"Web Video Producer\" is the first thing you read. A plain job title is easier to search for than a clever one." },
        { title: "One human detail", text: "Ultimate frisbee is a real part of his life, and it makes the bio sound like a person instead of a résumé." },
        { title: "Mentions that link out", text: "@WVFRM and @TheStudio are tappable, so the bio doubles as a map of the other accounts he runs." },
        { title: "Location and website in their own fields", text: "NYC and MKBHD.com sit under the bio, so none of the 160 characters are spent on them." },
        { title: "What's missing", text: "Nothing says what you get by following. His name does that job. A smaller account should spell it out, like \"Weekly SEO teardowns\"." },
      ],
      note: `Bio, location and website as shown on @MKBHD on ${CHECKED}. Follower counts and posts are left out on purpose.`,
    },
    {
      kind: "compare",
      eyebrow: "Before and after",
      heading: "Fixing a weak",
      accent: "X bio",
      intro: "Most weak X bios are a pile of labels. Swap them for one clear line about what you post.",
      before: "Marketing | Growth | AI | Coffee ☕\nViews my own",
      after: "Growth marketer for B2B SaaS. I write about SEO that brings demos, not just traffic. DMs open.",
      changes: [
        "Four labels became one searchable job title and a niche.",
        "\"Views my own\" became a reason to follow: what the posts are about.",
        "A soft next step at the end, so the right people know they can reach out.",
      ],
    },
    {
      kind: "styles",
      eyebrow: "Bio ideas",
      heading: "X bio ideas",
      accent: "for every style",
      intro: "Six different approaches across six kinds of accounts. Find one that sounds like you, then send its settings straight to the generator.",
      styles: [
        {
          name: "Minimal",
          when: "For personal accounts and people who post more than they explain.",
          bio: "Nurse. Night shifts. Snacks.",
          why: "Three short beats: who, when, and a wink. It reads in a second.",
          settings: { tone: "Minimal", emoji: "None", format: "Single line" },
        },
        {
          name: "Professional",
          when: "For consultants, designers and founders who want the right replies.",
          bio: "Designer for fintech apps. I write about onboarding that people actually finish.",
          why: "Role, niche and what you post, in plain words people search for.",
          settings: { tone: "Professional", emoji: "None", format: "Single line" },
          dark: true,
        },
        {
          name: "Funny",
          when: "For personality led accounts and anyone who posts takes.",
          bio: "Accountant by day. Amateur chef by night. Neither is going well.",
          why: "A setup and a twist. You still learn two real things about the person.",
          settings: { tone: "Funny", emoji: "None", format: "Single line" },
        },
        {
          name: "Aesthetic",
          when: "For artists, writers and photographers.",
          bio: "film cameras, late trains, notes app poems ☁️",
          why: "Lowercase and a few small images set a mood that matches the feed.",
          settings: { tone: "Aesthetic", emoji: "Subtle", format: "Single line" },
        },
        {
          name: "Build in public",
          when: "For indie founders sharing the journey.",
          bio: "Building a booking tool for barbers 💈\nSharing revenue, churn and bad haircuts",
          why: "What you're building and exactly what followers will see. The joke lands because it's specific.",
          settings: { tone: "Friendly", emoji: "Subtle", format: "Multiple lines" },
        },
        {
          name: "Business",
          when: "For shops, cafés and local businesses.",
          bio: "Independent bookshop with strong opinions 📚\nStaff picks every Friday, arguments in the replies",
          why: "Something regular to look forward to, plus an open invite to talk.",
          settings: { tone: "Friendly", emoji: "Subtle", format: "Multiple lines" },
        },
      ],
    },
    {
      kind: "practices",
      eyebrow: "Best practices",
      heading: "X bio",
      accent: "best practices",
      intro: "Six habits that make the biggest difference, each one a different idea.",
      items: [
        {
          title: "Lead with what you do",
          text: "People meet you through a reply, then tap your name. The first words decide if they follow.",
          featured: true,
          example: { good: "Product designer for fintech apps", bad: "Pixel wizard ✨ | dreamer" },
        },
        {
          title: "Use the words people search",
          text: "X doesn't publish how account search works, so plain job titles and topics are your best bet.",
          example: { good: "Data journalist covering climate", bad: "Storyteller of numbers" },
        },
        {
          title: "Let the fields do their jobs",
          text: "Location and website have [their own fields](https://help.x.com/en/managing-your-account/how-to-customize-your-profile), so the bio never needs to repeat them.",
          example: { good: "Staff picks every Friday", bad: "📍 Edinburgh · inkandoak.com" },
        },
        { title: "Mention what you're part of", text: "An @handle in your bio is tappable, so point to your company, show or project.", example: { good: "Founder @YourApp" } },
        { title: "Skip the hashtags", text: "They cost characters you could spend on what you do, and they rarely help a bio.", example: { good: "Writing about B2B SaaS", bad: "#SaaS #Growth #Marketing" } },
        { title: "Stay within 160 characters", text: "Spaces, emoji and line breaks all count. The counter in the tool counts emoji the way they display.", example: { count: 148 } },
      ],
    },
    { kind: "faq", eyebrow: "FAQ", heading: "Frequently asked", accent: "questions" },
    {
      kind: "related",
      eyebrow: "Keep going",
      heading: "More free tools for",
      accent: "your social profiles",
      tools: [
        { slug: "threads-bio-generator", text: "A warmer, chattier bio for Threads.", icon: "chat" },
        { slug: "instagram-bio-generator", text: "Your bio for Instagram, in 150 characters.", icon: "bio" },
        { slug: "tiktok-bio-generator", text: "Say the same thing in 80 characters.", icon: "bio" },
        { slug: "facebook-bio-generator", text: "A short, trustworthy Facebook intro.", icon: "bio" },
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

export function xPage(page: ToolPage): ToolPage {
  return studioBioPage(
    {
      ...page,
      metaTitle: "Twitter Bio Generator: Free AI Bios for X in 160 Characters",
      metaDescription: "Use this free Twitter bio generator to write 5 X bios from your real details, preview them on a live profile, and copy one that fits 160 characters.",
      h1: { regular: "Free Twitter", accent: "Bio Generator" },
      heroDescription: STUDIO.lede,
      accessNote: FAIR_USE,
      faqs: [
        { q: "Is this Twitter bio generator free?", a: `Yes. ${FAIR_USE}` },
        { q: "How long can a Twitter bio be?", a: "160 characters, including spaces and emoji. Every bio this tool writes fits, and the counter shows the exact total." },
        { q: "Is a Twitter bio the same as an X bio?", a: "Yes. Twitter became X, and the bio field works the same way. Most people still call it a Twitter bio." },
        { q: "How long can my X display name and username be?", a: "Your display name can be up to 50 characters. Your username can be up to 15, using letters, numbers and underscores." },
        { q: "Should I put my website or location in my bio?", a: "No. X has separate fields for both, so the bio can spend all 160 characters on what you do and why to follow." },
        { q: "Should I use hashtags in my X bio?", a: "Usually not. They take characters away from what you do. If you want topics in your bio, write them as plain words." },
        { q: "Will the AI make up achievements?", a: "No. It only uses what you type. If a bio would be stronger with a real number, it tells you what to add instead of inventing one." },
        { q: "Can it rewrite the bio I already have?", a: "Yes. Switch to \"Improve my bio\", paste it in, and you'll get five rewrites that keep your facts." },
        { q: "Can it write X bios in other languages?", a: "Yes. Open \"More ways to personalize\", pick your language, and all five bios come out in it." },
      ],
      related: [],
      extraLinks: [],
    },
    PLATFORM,
    STUDIO,
  );
}
