import { FAIR_USE, LINK_SOCIAL_MEDIA_SERVICE } from "../links";
import type { StudioContent, StudioSection, ToolField, ToolInput, ToolPage } from "../types";
import { BIO_LANGUAGES } from "./common";
import { IG_CAPTION_GALLERY } from "./caption-instagram-examples";

// Instagram Caption Generator on the studio layout. The master template for the other caption tools:
// TikTok and Facebook reuse captionStudioFields and the "studio-caption" prompt with their own platform vars.

const NEW = { field: "mode", equals: "new" };
const IMPROVE = { field: "mode", equals: "improve" };

export type CaptionPlatform = {
  platform: string;
  limit: number;
  fold: number;
  ranges: [string, string, string];
  hashtagMax: number;
  formatRules: string;
  postTypes: string[];
  goals: string[];
  copy: { topic: string; details: string; current: string; name: string; audience: string; keyword: string; cta: string };
  example: ToolInput;
};

export function captionStudioFields(p: CaptionPlatform): ToolField[] {
  const tagOptions = ["None", ...[3, p.hashtagMax].filter((n, i, a) => n > 0 && a.indexOf(n) === i).map((n) => `${n} hashtags`)];
  return [
    {
      name: "mode",
      label: "What do you want to do?",
      type: "mode",
      options: [
        { value: "new", label: "Write a caption" },
        { value: "improve", label: "Improve my caption" },
      ],
      defaultValue: "new",
    },
    { name: "post_type", label: "What are you posting?", type: "segmented", options: p.postTypes, defaultValue: p.postTypes[0], group: "essentials" },
    { name: "topic", label: "What's the post about?", type: "text", placeholder: p.copy.topic, required: true, maxLength: 300, when: NEW, group: "essentials" },
    { name: "current_caption", label: `Paste your current ${p.platform} caption`, type: "textarea", placeholder: p.copy.current, hint: "We'll keep your facts and rewrite it three different ways.", required: true, maxLength: 2500, when: IMPROVE, group: "essentials" },
    { name: "details", label: "Key details to include", type: "textarea", placeholder: p.copy.details, hint: "Optional. Real numbers, places and names make captions far better. The tool never invents them.", maxLength: 800, when: NEW, group: "essentials" },
    { name: "tone", label: "Tone", type: "select", options: ["Friendly", "Funny", "Bold", "Calm", "Professional", "Aesthetic"], defaultValue: "Friendly", group: "style" },
    { name: "goal", label: "Main goal", type: "select", options: p.goals, defaultValue: p.goals[0], group: "style" },
    { name: "length", label: "Length", type: "segmented", options: ["Short", "Medium", "Long"], defaultValue: "Short", group: "format" },
    { name: "emoji", label: "Emojis", type: "segmented", options: ["None", "Subtle", "Expressive"], defaultValue: "Subtle", group: "format" },
    { name: "hashtags", label: "Hashtags", type: "segmented", options: tagOptions, defaultValue: tagOptions[1] ?? "None", group: "format" },
    { name: "name", label: "Account or brand name", type: "text", placeholder: p.copy.name, hint: "Shows on the preview.", maxLength: 60, group: "advanced" },
    { name: "audience", label: "Who is it for?", type: "text", placeholder: p.copy.audience, maxLength: 160, group: "advanced" },
    { name: "keyword", label: "Search phrase", type: "text", placeholder: p.copy.keyword, hint: "Words people might search. Worked in once or twice, never stuffed.", maxLength: 100, group: "advanced" },
    { name: "cta", label: "Your own call to action", type: "text", placeholder: p.copy.cta, maxLength: 120, group: "advanced" },
    { name: "language", label: "Language", type: "select", options: BIO_LANGUAGES, defaultValue: "English", group: "advanced" },
  ];
}

/** Turns a caption family page into a studio caption page: the new form, workspace, prompt vars and page content. */
export function captionStudioPage(page: ToolPage, p: CaptionPlatform, studio: StudioContent): ToolPage {
  const defaults: ToolInput = { mode: "new", current_caption: "", details: "", name: "", audience: "", keyword: "", cta: "", language: "English" };
  return {
    ...page,
    workspace: {
      ...page.workspace,
      fields: captionStudioFields(p),
      button: "Generate 3 captions",
      secondary: "Try an example",
      exampleInput: { ...defaults, ...p.example },
      more: "Try another angle",
      dataNote: "AI can get things wrong. Read your caption before you post it, and make sure it matches what's in the photo or video.",
      result: { kind: "options", limit: p.limit, hashtags: true, shorter: "Make them shorter" },
      preview: undefined,
    },
    api: {
      block: "studio-caption",
      vars: {
        platform: p.platform,
        limit: p.limit.toLocaleString("en-US"),
        fold: String(p.fold),
        short_range: p.ranges[0],
        medium_range: p.ranges[1],
        long_range: p.ranges[2],
        hashtag_max: String(p.hashtagMax),
        format_rules: p.formatRules,
      },
    },
    studio: { tool: "caption", label: `${p.platform} caption generator`, platform: p.platform, ...studio },
  };
}

const PLATFORM: CaptionPlatform = {
  platform: "Instagram",
  limit: 2200,
  fold: 125,
  ranges: ["60 to 220", "220 to 600", "600 to 1,400"],
  hashtagMax: 5,
  formatRules: "Short lines with a blank line between ideas. Hashtags go at the end, never inside sentences. Mentions only if the visitor typed them.",
  postTypes: ["Photo", "Carousel", "Reel"],
  goals: ["Comments", "Saves", "Shares", "Link clicks", "Sales", "Followers"],
  copy: {
    topic: "Before and after of a tiny balcony garden",
    details: "Cost $40, done in one weekend, plants from a local nursery",
    current: "New post! ✨ Loving how this turned out 🌿🌸",
    name: "Tiny Green Flat",
    audience: "Renters with small apartments",
    keyword: "balcony garden ideas",
    cta: "Save this for spring",
  },
  example: {
    post_type: "Carousel",
    topic: "Before and after of a tiny balcony garden",
    details: "Cost $40, done in one weekend, plants from a local nursery",
    name: "Tiny Green Flat",
    audience: "Renters with small apartments",
    keyword: "balcony garden ideas",
    tone: "Friendly",
    goal: "Saves",
    length: "Short",
    emoji: "Subtle",
    hashtags: "3 hashtags",
  },
};

const SECTIONS: StudioSection[] = [
  {
    kind: "steps",
    eyebrow: "How it works",
    heading: "How to use the",
    accent: "Instagram caption generator",
    intro: "Three steps, about thirty seconds. The post preview updates while you go.",
    steps: [
      { title: "Say what you're posting", text: "Pick photo, carousel or reel, then describe the post in a few words. Add the real details if you have them.", visual: "account" },
      { title: "Choose your style", text: "Pick a tone and a goal, then set the length, the emoji and how many hashtags you want.", visual: "style" },
      { title: "Copy your favorite", text: "Compare three captions, see each one cut at the \"more\" point, remove any hashtag, then copy.", visual: "copy" },
    ],
  },
  ...IG_CAPTION_GALLERY,
  {
    kind: "compare",
    eyebrow: "Before and after",
    heading: "Fixing a weak",
    accent: "Instagram caption",
    intro: "Most weak captions describe the photo. A good one adds what the photo can't show.",
    before: "New post! ✨ Loving how this turned out 🌿🌸 #plants #love #instagood #home #diy",
    after: "$40 and one weekend turned this sad balcony into my favorite room 🌿\n\nEvery plant came from a local nursery, so these balcony garden ideas work on a renter's budget.\n\nSave this for spring.\n\n#balconygarden #smallspaceliving #renterfriendly",
    changes: [
      "\"New post\" became the price and the time, right where people decide to tap more.",
      "A mood became a detail people can use: where the plants came from and who it suits.",
      "Five generic hashtags became three specific ones, and the caption ends with one clear ask.",
    ],
  },
  {
    kind: "styles",
    eyebrow: "Caption ideas",
    heading: "Instagram caption ideas",
    accent: "for every kind of post",
    intro: "Six different approaches for six kinds of posts. Find one that fits, then send its settings straight to the generator.",
    styles: [
      {
        name: "Short & punchy",
        when: "For photos that speak for themselves.",
        bio: "Batch 201. The first 200 didn't make it. 🥐",
        why: "One line with a tiny story. It works before anyone taps more.",
        settings: { tone: "Funny", emoji: "Subtle", length: "Short" },
      },
      {
        name: "Carousel teaser",
        when: "For tips, steps and before and afters.",
        bio: "Stop doing 100 crunches. Do this instead.\n\nSwipe for the 5 minute version 💪",
        why: "A bold first line, then a reason to swipe. The slides do the teaching.",
        settings: { tone: "Bold", emoji: "Subtle", post_type: "Carousel", goal: "Saves", length: "Short" },
        dark: true,
      },
      {
        name: "Story",
        when: "For behind the scenes and personal moments.",
        bio: "Six tries to centre the clay.\n\nBowl number six survived, slightly lopsided and completely mine.",
        why: "Opens in the middle of the moment, then lands the payoff.",
        settings: { tone: "Calm", emoji: "None", goal: "Comments", length: "Medium" },
      },
      {
        name: "Question",
        when: "For community and engagement posts.",
        bio: "Be honest: plain croissant or almond?\n\nWe're baking more of whichever wins.",
        why: "An easy question with a real reason to answer it.",
        settings: { tone: "Friendly", emoji: "None", goal: "Comments", length: "Short" },
      },
      {
        name: "Product launch",
        when: "For shops announcing something new.",
        bio: "New colour: sage green.\n\nSame felt desk mat, 90 x 40 cm, printed to order.\n\nLink in bio to shop.",
        why: "The news, the specs buyers check, and one next step.",
        settings: { tone: "Professional", emoji: "None", goal: "Sales", length: "Short" },
      },
      {
        name: "Reel hook",
        when: "For reels where the payoff comes at the end.",
        bio: "Watch what $40 does to a rented balcony. 🌿",
        why: "Names the payoff without giving it away, so people keep watching.",
        settings: { tone: "Friendly", emoji: "Subtle", post_type: "Reel", goal: "Shares", length: "Short" },
      },
    ],
  },
  {
    kind: "practices",
    eyebrow: "Best practices",
    heading: "Instagram caption",
    accent: "best practices",
    intro: "Six habits that make the biggest difference, each one a different idea.",
    items: [
      {
        title: "Win the first line",
        text: "The feed shows a line or two, then \"more\". Put the most interesting detail there, not a greeting.",
        featured: true,
        example: { good: "$40 and one weekend turned this balcony around", bad: "Hey guys! New post ✨" },
      },
      { title: "Add what the photo can't show", text: "Price, place, time, the mistake, the why. The picture already shows what it looks like.", example: { good: "Every plant came from a local nursery", bad: "Loving how this turned out" } },
      { title: "Say it the way people search", text: "Use the plain words someone would type, like \"balcony garden ideas\", not only clever ones. It tells people, and search, what the post is about.", example: { good: "balcony garden ideas on a renter's budget", bad: "#gardengoals #plantmom #vibes" } },
      { title: "Use a few specific hashtags", text: "Instagram's help center says you can use [up to 5 hashtags](https://help.instagram.com/351460621611097) on a post. Make them specific. The tool keeps them at the end and lets you remove any.", example: { good: "#balconygarden #smallspaceliving", bad: "#love #instagood #photooftheday" } },
      { title: "End with one clear ask", text: "Save, comment, share or tap the link. Pick the one that matches your goal, not all four.", example: { good: "Save this for spring." } },
      { title: "Keep it as long as it needs", text: "Captions can run to about 2,200 characters, hashtags included. Most good ones use a fraction of that.", example: { count: 340 } },
    ],
  },
  { kind: "faq", eyebrow: "FAQ", heading: "Frequently asked", accent: "questions" },
  {
    kind: "related",
    eyebrow: "Keep going",
    heading: "More free tools for",
    accent: "your social profiles",
    tools: [
      { slug: "instagram-bio-generator", text: "A bio that matches your new captions.", icon: "bio" },
      { slug: "tiktok-bio-generator", text: "Say the same thing in 80 characters.", icon: "bio" },
      { slug: "threads-bio-generator", text: "A warmer, chattier bio for Threads.", icon: "chat" },
      { slug: "social-media-content-calendar-generator", text: "Plan a month of posts in one go.", icon: "caption" },
    ],
  },
  {
    kind: "cta",
    heading: "A better caption is a start.",
    accent: "Let's fix the rest of your social presence.",
    copy: "I help SaaS and service businesses turn content, profiles and organic social into real growth.",
    button: "Explore social media marketing",
    href: LINK_SOCIAL_MEDIA_SERVICE ?? "/services",
  },
];

const STUDIO: StudioContent = {
  lede: "This Instagram caption generator turns a few notes into three captions with a strong first line, the right length and a handful of specific hashtags.",
  sub: "Say what you're posting, pick a style, and see each caption on a real looking post before you copy it.",
  trust: `Free to use, no signup required. ${FAIR_USE.replace("Free to use. ", "")}`,
  sections: SECTIONS,
};

export function instagramCaptionPage(page: ToolPage): ToolPage {
  return captionStudioPage(
    {
      ...page,
      metaTitle: "Instagram Caption Generator: Free AI Captions From Notes",
      metaDescription: "Use this free Instagram caption generator to turn your notes into 3 captions with a strong first line, up to 5 hashtags, and a live post preview.",
      h1: { regular: "Free Instagram", accent: "Caption Generator" },
      heroDescription: STUDIO.lede,
      accessNote: FAIR_USE,
      faqs: [
        { q: "Is this Instagram caption generator free?", a: `Yes. ${FAIR_USE}` },
        { q: "How long can an Instagram caption be?", a: "About 2,200 characters, hashtags included. Every caption this tool writes stays well under that, and the counter shows the exact total." },
        { q: "How many hashtags should I use on Instagram?", a: "Instagram's help center says you can use up to 5 per post. The tool suggests 3 or 5 specific ones, puts them at the end, and lets you remove any before copying." },
        { q: "Where does Instagram cut my caption off?", a: "In the feed, people usually see the first line or two before \"more\". Instagram doesn't publish an exact number, so the preview shows a typical cut point." },
        { q: "Do keywords in captions help on Instagram?", a: "Instagram doesn't publish exactly how search ranks posts, but plain words that describe the post make it clearer to people and to search. Add a search phrase and the tool works it in naturally, without stuffing." },
        { q: "Can I edit my Instagram caption after posting?", a: "Yes. Instagram lets you edit a caption on a post you've already shared." },
        { q: "Does the tool see my photo or video?", a: "No. It only uses what you type, so describe the post and check the caption matches it." },
        { q: "Will it make things up?", a: "No. It only uses your details. If a stronger caption needs a number or a fact, it tells you what to add instead of inventing one." },
        { q: "Can it write captions in other languages?", a: "Yes. Open \"More ways to personalize\", pick your language, and all three captions come out in it." },
      ],
      related: [],
      extraLinks: [],
    },
    PLATFORM,
    STUDIO,
  );
}
