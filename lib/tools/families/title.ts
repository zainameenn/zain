import { FAIR_USE, LINK_SEO_SERVICE } from "../links";
import type { Rich, ToolExample, ToolPage } from "../types";
import { ERROR_TEXT, dataNote, freeFaq } from "./common";
import { youtubeTitlePage } from "./title-youtube";
import { pinterestTitlePage } from "./writers";

// Family 3 in docs/tools-spec.md: YouTube and Pinterest title generators.

export type TitleOverride = {
  platform: string;
  visible: number;
  goal: string;
  styleRules: string;
  tips: Rich;
  examples: ToolExample[];
  faqs: { q: string; a: Rich }[];
  /** Page level override (studio pages). */
  page?: (base: ToolPage) => ToolPage;
};

export function titlePage(o: TitleOverride): ToolPage {
  const base = titleBase(o);
  return o.page ? o.page(base) : base;
}

function titleBase(o: TitleOverride): ToolPage {
  const P = o.platform;
  const p = P.toLowerCase();
  return {
    slug: `${p}-title-generator`,
    name: `${P} Title Generator`,
    keyword: `${p} title generator`,
    group: "Social",
    metaTitle: `${P} Title Generator: 6 Free Titles in Seconds`,
    metaDescription: `This free ${P} title generator writes 6 titles from your topic and keyword, each under 100 characters with the important words up front.`,
    h1: { regular: `Free ${P}`, accent: "Title Generator" },
    heroDescription: `This ${P} title generator gives you six titles built around your keyword, each under 100 characters, with the words that matter right at the front where people actually see them.`,
    accessNote: FAIR_USE,
    workspace: {
      fields: [
        { name: "topic", label: "What's it about?", type: "textarea", placeholder: "How I cut my grocery bill in half without coupons", required: true, maxLength: 1000 },
        { name: "keyword", label: "Main search phrase", type: "text", placeholder: "cheap grocery list", required: true, maxLength: 150 },
        { name: "audience", label: "Who's it for?", type: "text", placeholder: "Students living alone", maxLength: 300 },
        { name: "payoff", label: "What do they get?", type: "text", placeholder: "A $30 weekly list that covers 3 meals a day", maxLength: 300 },
        { name: "style", label: "Style", type: "chips", options: ["Clear", "Curious", "Bold", "Calm"] },
      ],
      button: `Write my ${P} titles`,
      secondary: "Try an example",
      exampleInput: o.examples[0].input,
      resultsHeading: `Your ${P} titles`,
      emptyState: `Six titles show up here, each with a counter and a marker where ${P} usually cuts it off.`,
      more: "Write 6 more",
      dataNote: dataNote("titles"),
      errorText: ERROR_TEXT,
      result: { kind: "options", limit: 100, fold: { chars: o.visible } },
    },
    howTo: {
      heading: `How to use the ${P} title generator`,
      steps: [
        "**Add your topic and the phrase people search.** The tool builds every title around it.",
        "**Say what they get.** A title with a payoff beats a title with an adjective.",
        "**Pick, then check the cutoff marker.** If the important words fall after it, pick another.",
      ],
    },
    examples: { heading: `${P} title examples`, items: o.examples },
    sections: [
      {
        heading: `What makes a good ${P} title?`,
        blocks: [
          { p: "A good title makes a promise the content keeps. That's it. That's the whole job." },
          { p: "The promise gets the click. Keeping it gets the next click. Break it, and you're the season eight of Game of Thrones of your niche: people remember, and not fondly." },
          {
            ol: [
              "**Put the keyword and the payoff in the first 60 or so characters.** Everything after that often gets cut off on phones.",
              "**Be specific.** \"$30 grocery list\" beats \"cheap meals\". Numbers, names and results stick.",
              "**One idea per title.** Two ideas means zero ideas land.",
            ],
          },
          { p: "**Common mistake:** keyword salad, like \"Grocery List Cheap Grocery List Budget Groceries 2026\". Write for a human, then make sure the keyword is in there once." },
          { p: o.tips },
        ],
      },
    ],
    faqs: [
      freeFaq(`${P} title generator`),
      { q: `How long can a ${P} title be?`, a: "100 characters. The counter shows where the visible part usually ends." },
      { q: "Will it write clickbait?", a: "No. It writes titles your content can back up. If the payoff isn't in your notes, it won't be in the title." },
      ...o.faqs,
    ],
    ctas: [
      {
        heading: "Good titles get clicks. A plan gets growth.",
        copy: "I build content and SEO plans for SaaS and service businesses, so every video and pin works toward leads, not just views.",
        button: "See how I can help",
        href: LINK_SEO_SERVICE,
      },
    ],
    related: [{ slug: `${p}-description-generator` }, { slug: "social-media-content-calendar-generator" }, { slug: "seo-title-generator" }],
    extraLinks: [],
    api: { block: "title", vars: { platform: P, visible: String(o.visible), platform_goal: o.goal, style_rules: o.styleRules } },
  };
}

const grocery = { topic: "How I cut my grocery bill in half without coupons", keyword: "cheap grocery list", audience: "Students living alone", payoff: "A $30 weekly list that covers 3 meals a day" };
const ex = (inputLabel: string, input: ToolExample["input"], output: string, why: string): ToolExample => ({ inputLabel, input, output, why });

export const TITLE_PLATFORMS: TitleOverride[] = [
  {
    platform: "YouTube",
    page: youtubeTitlePage,
    visible: 60,
    goal: "Earn the click from search and suggested videos, then let the video keep the promise.",
    styleRules: "Title case or sentence case, the visitor's choice. Curiosity is allowed if honest.",
    tips: "Your title and thumbnail are a team, so don't make them say the same thing. Let the title carry the search phrase and the thumbnail carry the emotion.",
    examples: [
      ex("Grocery budget video, Clear style", { ...grocery, style: "Clear" }, "Cheap Grocery List: $30 a Week for 3 Meals a Day", "Keyword first, then the exact payoff, all inside the first 60 characters."),
      ex("Grocery budget video, Curious style", { ...grocery, style: "Curious" }, "I Fed Myself for $30 a Week. Here's the Exact List", "A personal result opens a gap that the video closes with the list."),
      ex("Grocery budget video, Bold style", { ...grocery, style: "Bold" }, "Students: The Only Grocery List You Need This Semester", "Names the audience first, so the right viewers know it's for them."),
    ],
    faqs: [
      { q: "Should I put the year in my YouTube title?", a: "Only if the content truly depends on it, like a yearly review. Otherwise it dates your video." },
      { q: "How many characters show on YouTube?", a: "It depends on the device, so keep the key words in roughly the first 60." },
    ],
  },
  {
    platform: "Pinterest",
    page: pinterestTitlePage,
    visible: 40,
    goal: "Get found in Pinterest search. Descriptive beats clever.",
    styleRules: "Sentence case. Keyword first. No curiosity gaps, Pinterest users want to know exactly what they'll get.",
    tips: "Pinterest's specs cap titles at [100 characters](https://help.pinterest.com/article/review-pin-specs), but the feed shows less, so front load the keyword. Pinners search like they're making a shopping list. Use that language.",
    examples: [
      ex("Grocery budget pin", { ...grocery, style: "Clear" }, "Cheap grocery list for students: $30 a week", "Keyword first, then the audience and a price people can scan."),
      ex(
        "Balcony garden pin",
        { topic: "Small balcony garden setup for renters", keyword: "small balcony garden ideas", audience: "Renters", payoff: "A $40 setup that fits a narrow balcony", style: "Clear" },
        "Small balcony garden ideas for renters",
        "Exactly what pinners type, with the audience added.",
      ),
      ex(
        "Desk setup pin",
        { topic: "Minimal home office desk setup", keyword: "minimal desk setup", audience: "Remote workers in small apartments", payoff: "A calm desk with a large felt mat and hidden cables", style: "Calm" },
        "Minimal desk setup with a large felt desk mat",
        "Search phrase up front, then the detail that makes the pin different.",
      ),
    ],
    faqs: [
      { q: "Does the Pinterest title matter for search?", a: "Yes. It's one of the clearest signals of what your pin is about." },
      { q: "Should my pin title match my image text?", a: "Close, but not identical. Use the title to add the search words the image can't fit." },
    ],
  },
];
