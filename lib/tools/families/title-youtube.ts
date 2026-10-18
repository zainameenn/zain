import { FAIR_USE, LINK_SOCIAL_MEDIA_SERVICE } from "../links";
import type { BrandExample, StudioContent, ToolField, ToolInput, ToolPage } from "../types";
import { BIO_LANGUAGES } from "./common";

// YouTube Title Generator: the caption studio with a YouTube search results preview and the "studio-title" prompt.
// Pinterest titles reuse youtubeStyleTitlePage with their own platform copy.

const CHECKED = "October 18, 2026";
const LIMIT_HELP = "https://support.google.com/youtube/answer/57404";
const NEW = { field: "mode", equals: "new" };
const IMPROVE = { field: "mode", equals: "improve" };

export type TitlePlatform = {
  platform: string;
  skin: "youtube" | "pinterest";
  visible: number;
  goal: string;
  styleRules: string;
  copy: { topic: string; current: string; keyword: string; audience: string; payoff: string; name: string };
  example: ToolInput;
};

export function titleStudioFields(p: TitlePlatform): ToolField[] {
  return [
    {
      name: "mode",
      label: "What do you want to do?",
      type: "mode",
      options: [
        { value: "new", label: "Write a title" },
        { value: "improve", label: "Improve my title" },
      ],
      defaultValue: "new",
    },
    { name: "topic", label: "What's it about?", type: "text", placeholder: p.copy.topic, required: true, maxLength: 300, when: NEW, group: "essentials" },
    { name: "current_title", label: `Paste your current ${p.platform} title`, type: "text", placeholder: p.copy.current, required: true, maxLength: 200, when: IMPROVE, group: "essentials" },
    { name: "keyword", label: "Main search phrase", type: "text", placeholder: p.copy.keyword, hint: "The words people would type to find it. Every title includes it once.", maxLength: 100, group: "essentials" },
    { name: "style", label: "Style", type: "segmented", options: ["Clear", "Curious", "Bold", "Calm"], defaultValue: "Clear", group: "format" },
    { name: "audience", label: "Who's it for?", type: "text", placeholder: p.copy.audience, maxLength: 160, group: "advanced" },
    { name: "payoff", label: "What do they get?", type: "text", placeholder: p.copy.payoff, hint: "A real result or detail. The tool only promises what you give it.", maxLength: 200, group: "advanced" },
    { name: "name", label: "Channel name", type: "text", placeholder: p.copy.name, hint: "Shows on the preview.", maxLength: 60, group: "advanced" },
    { name: "language", label: "Language", type: "select", options: BIO_LANGUAGES, defaultValue: "English", group: "advanced" },
  ];
}

export function titleStudioPage(page: ToolPage, p: TitlePlatform, studio: StudioContent): ToolPage {
  const defaults: ToolInput = { mode: "new", current_title: "", audience: "", payoff: "", name: "", language: "English" };
  return {
    ...page,
    workspace: {
      ...page.workspace,
      fields: titleStudioFields(p),
      button: "Generate 6 titles",
      secondary: "Try an example",
      exampleInput: { ...defaults, ...p.example },
      more: "Try another angle",
      dataNote: "AI can get things wrong. Make sure the title only promises what your content delivers.",
      result: { kind: "options", limit: 100, shorter: "Make them shorter" },
      preview: undefined,
    },
    api: { block: "studio-title", vars: { platform: p.platform, visible: String(p.visible), platform_goal: p.goal, style_rules: p.styleRules } },
    studio: { tool: "caption", noun: "title", skin: p.skin, label: `${p.platform} title generator`, platform: p.platform, ...studio },
  };
}

const PLATFORM: TitlePlatform = {
  platform: "YouTube",
  skin: "youtube",
  visible: 60,
  goal: "Earn the click from search and suggested videos, then let the video keep the promise.",
  styleRules: "Title case or sentence case. Curiosity is allowed if honest. Important words in the first 60 characters.",
  copy: {
    topic: "How I cut my grocery bill in half without coupons",
    current: "My Grocery Haul + Tips!!",
    keyword: "cheap grocery list",
    audience: "Students living alone",
    payoff: "A $30 weekly list that covers 3 meals a day",
    name: "Five Dollar Feed",
  },
  example: {
    topic: "How I cut my grocery bill in half without coupons",
    keyword: "cheap grocery list",
    audience: "Students living alone",
    payoff: "A $30 weekly list that covers 3 meals a day",
    name: "Five Dollar Feed",
    style: "Clear",
  },
};

const yt = (brand: string, handle: string, id: string, title: string, style: BrandExample["style"], why: string): BrandExample => ({
  brand,
  handle,
  url: `https://www.youtube.com/watch?v=${id}`,
  logo: null,
  bio: title,
  checked: CHECKED,
  style,
  why,
  lesson: "",
  linkLabel: "Watch video",
});

/** Real titles, checked through YouTube's oEmbed endpoint on the date in CHECKED. */
const TITLES: BrandExample[] = [
  yt("Marques Brownlee", "mkbhd", "scwlR0QHGOk", "The NEW Tesla Roadster: My Honest Reaction", "Brand-focused", "The topic people search, then a promise of an honest take, which is what viewers want from a reviewer."),
  yt("Veritasium", "veritasium", "NiCgcUTL9_Q", "The Absurd Engineering Behind the Internet", "Personality", "\"Absurd\" opens a curiosity gap, and \"the Internet\" makes a huge topic feel personal."),
  yt("Ali Abdaal", "aliabdaal", "BNRfzI6E1Es", "Brutally Honest Advice About Productivity in 26 Minutes", "Action-focused", "A clear topic, a tone promise and an exact length, so viewers know the deal before they click."),
  yt("Ali Abdaal", "aliabdaal", "szVXpM7VVMg", "How to Learn So Fast People Assume You’re Naturally Gifted (with AI)", "Action-focused", "A how to with a result people want, and a bracket that adds the hook of the moment."),
  yt("Mark Rober", "markrober", "_L1Rim7-IPo", "Last Cheater Standing Wins $10,000", "Personality", "A simple rule and a real stake in six words. You know the game before the video starts."),
  yt("Mark Rober", "markrober", "h0EGCnBjTVk", "I Outsmarted Pro Car Thieves", "Minimal", "First person, a bold claim and a clear villain, in five words."),
];

const STUDIO: StudioContent = {
  lede: "This YouTube title generator writes six titles around the phrase people search, each under 100 characters, with the important words where viewers actually see them.",
  sub: "Say what your video is about, add your search phrase, and see each title on a YouTube search result before you copy it.",
  trust: `Free to use, no signup required. ${FAIR_USE.replace("Free to use. ", "")}`,
  sections: [
    {
      kind: "steps",
      eyebrow: "How it works",
      heading: "How to use the",
      accent: "YouTube title generator",
      intro: "Three steps, about thirty seconds. The search result preview updates while you go.",
      steps: [
        { title: "Say what the video is about", text: "Describe it in a few words and add the phrase people would search for.", visual: "account" },
        { title: "Choose your style", text: "Clear, curious, bold or calm. Add who it's for and what they get if you want sharper titles.", visual: "style" },
        { title: "Copy your favorite", text: "Compare six titles on a YouTube result, see where each one gets cut, then copy.", visual: "copy" },
      ],
    },
    {
      kind: "gallery",
      eyebrow: "Real examples",
      heading: "6 YouTube titles",
      accent: "worth learning from",
      intro: "How big creators title their videos, from five words to a full how to.",
      note: `Titles as published on each creator's YouTube channel, checked on ${CHECKED}. Big channels can lean on their name, so copy the habits, not the vagueness.`,
      items: TITLES,
    },
    {
      kind: "creator",
      eyebrow: "Title breakdown",
      heading: "What makes a good",
      accent: "YouTube title",
      intro: "A good title makes a promise the video keeps. Here's a real one, taken apart piece by piece.",
      profile: {
        handle: "mkbhd",
        name: "Marques Brownlee",
        url: "https://www.youtube.com/watch?v=scwlR0QHGOk",
        checked: CHECKED,
        photo: {
          src: "/assets/tools/twitter-bio/marques-brownlee.webp",
          alt: "Marques Brownlee",
          width: 256,
          height: 256,
          credit: "Photo: Marques Brownlee, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/), via Wikimedia Commons, cropped and resized, shared under the same license.",
        },
      },
      join: " ",
      lines: [
        { text: "The NEW Tesla Roadster:", mark: 1 },
        { text: "My Honest Reaction", mark: 2 },
      ],
      points: [
        { title: "The search phrase first", text: "\"Tesla Roadster\" is exactly what people type, and it's at the very start where nothing gets cut." },
        { title: "A promise he can keep", text: "\"My honest reaction\" tells you what kind of video it is. The video delivers exactly that." },
        { title: "Short enough to show in full", text: "42 characters, so it fits on every screen. YouTube allows 100, but shorter titles rarely get cut." },
      ],
      note: `Title as published on Marques Brownlee's channel, checked on ${CHECKED}. The thumbnail isn't shown here.`,
    },
    {
      kind: "compare",
      eyebrow: "Before and after",
      heading: "Fixing a weak",
      accent: "YouTube title",
      intro: "Most weak titles describe the format. A good one names the topic and the payoff.",
      before: "My Grocery Haul + Tips!! (MUST WATCH)",
      after: "Cheap Grocery List: $30 a Week for 3 Meals a Day",
      changes: ["\"Grocery haul\" became the phrase people search: cheap grocery list.", "\"Tips\" became a concrete payoff with a real number.", "Caps and exclamation marks went. The detail does the selling."],
    },
    {
      kind: "styles",
      eyebrow: "Title ideas",
      heading: "YouTube title ideas",
      accent: "for every kind of video",
      intro: "Six title approaches the tool can write. Find one that fits, then send it straight to the generator.",
      styles: [
        { name: "Clear", when: "For tutorials and search driven videos.", bio: "Cheap Grocery List: $30 a Week for 3 Meals a Day", why: "Search phrase first, then the exact payoff.", settings: { style: "Clear" } },
        { name: "Curious", when: "For stories and experiments.", bio: "I Fed Myself for $30 a Week. Here's the Exact List", why: "A personal result opens a gap the video closes.", settings: { style: "Curious" }, dark: true },
        { name: "Bold", when: "For opinions and challenges.", bio: "Stop Meal Prepping Like This", why: "A direct instruction that makes people check if it's them.", settings: { style: "Bold" } },
        { name: "Number", when: "For lists, challenges and results.", bio: "I Tried 5 Budget Meal Plans. Only 1 Was Worth It", why: "Real numbers from the video set clear expectations.", settings: { style: "Bold" } },
        { name: "Audience", when: "When the video is for one specific group.", bio: "Students: The Only Grocery List You Need This Semester", why: "Names who it is for, so the right viewers click.", settings: { style: "Clear" } },
        { name: "Calm", when: "For slow living, vlogs and study channels.", bio: "A Quiet Week of Cooking on a $30 Budget", why: "Sets a mood and still names the topic.", settings: { style: "Calm" } },
      ],
    },
    {
      kind: "practices",
      eyebrow: "Best practices",
      heading: "YouTube title",
      accent: "best practices",
      intro: "Six habits that make the biggest difference.",
      items: [
        { title: "Front load the important words", text: "Long titles get cut on phones and in suggested videos. Keep the topic and the payoff in roughly the first 60 characters.", featured: true, example: { good: "Cheap Grocery List: $30 a Week", bad: "In Today's Video I Share My Cheap Grocery List" } },
        { title: "Promise only what you deliver", text: "The click is worth nothing if people leave in ten seconds. The tool never promises what's not in your details.", example: { good: "My Honest Reaction", bad: "You WON'T BELIEVE What Happened" } },
        { title: "Be specific", text: "Numbers, names and results beat adjectives.", example: { good: "$30 a week for 3 meals a day", bad: "Amazing cheap meals" } },
        { title: "Write for people, not just search", text: "Use the search phrase once, in natural word order. Keyword salad reads like spam.", example: { good: "Cheap Grocery List for Students", bad: "Cheap Grocery List Budget Groceries Cheap" } },
        { title: "Let the thumbnail do a different job", text: "Don't repeat the title on the thumbnail. The title carries the words, the thumbnail carries the emotion.", example: { good: "Title: the topic. Thumbnail: the reaction." } },
        { title: "Stay within 100 characters", text: `YouTube's help center says [titles can be up to 100 characters](${LIMIT_HELP}). The counter shows the exact total.`, example: { count: 48 } },
      ],
    },
    { kind: "faq", eyebrow: "FAQ", heading: "Frequently asked", accent: "questions" },
    {
      kind: "related",
      eyebrow: "Keep going",
      heading: "More free tools for",
      accent: "your content",
      tools: [
        { slug: "youtube-description-generator", text: "A description that matches your title.", icon: "caption" },
        { slug: "tiktok-caption-generator", text: "Captions for your short videos.", icon: "caption" },
        { slug: "seo-title-generator", text: "Titles for your website pages.", icon: "caption" },
        { slug: "social-media-content-calendar-generator", text: "Plan a month of content in one go.", icon: "caption" },
      ],
    },
    {
      kind: "cta",
      heading: "A better title gets the click.",
      accent: "Let's make the rest of your content work too.",
      copy: "I help SaaS and service businesses turn content, search and social into real growth.",
      button: "Explore social media marketing",
      href: LINK_SOCIAL_MEDIA_SERVICE ?? "/services",
    },
  ],
};

export function youtubeTitlePage(page: ToolPage): ToolPage {
  return titleStudioPage(
    {
      ...page,
      metaTitle: "YouTube Title Generator: 6 Free Titles Under 100 Characters",
      metaDescription: "Use this free YouTube title generator to write 6 titles around your search phrase, each under 100 characters, and see them on a live search result.",
      h1: { regular: "Free YouTube", accent: "Title Generator" },
      heroDescription: STUDIO.lede,
      faqs: [
        { q: "Is this YouTube title generator free?", a: `Yes. ${FAIR_USE}` },
        { q: "How long can a YouTube title be?", a: "YouTube's help center says titles can be up to 100 characters. Every title this tool writes stays within that." },
        { q: "How much of my title do people see?", a: "It depends on the screen. Long titles get cut on phones and in suggested videos, so the tool puts the important words in roughly the first 60 characters." },
        { q: "Should I put the year in my title?", a: "Only if the video truly depends on it, like a yearly review. Otherwise it dates your video. The tool never adds a year you didn't type." },
        { q: "Will it write clickbait?", a: "No. It writes titles your video can back up. If the payoff isn't in your details, it won't be in the title." },
        { q: "Can it improve a title I already have?", a: "Yes. Switch to \"Improve my title\", paste it in, and get six better versions that keep your facts." },
        { q: "Can it write titles in other languages?", a: "Yes. Open \"More ways to personalize\", pick your language, and all six titles come out in it." },
      ],
      related: [],
      extraLinks: [],
    },
    PLATFORM,
    STUDIO,
  );
}
