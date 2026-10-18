import { FAIR_USE, GUIDE_CONTENT_WRITING, LINK_SOCIAL_MEDIA_SERVICE } from "../links";
import type { Rich, ToolExample, ToolField, ToolPage } from "../types";
import { BIO_LANGUAGES } from "./common";
import { instagramCaptionPage } from "./caption-instagram";
import { tiktokCaptionPage } from "./caption-tiktok";
import { ERROR_TEXT, dataNote, fmt, freeFaq } from "./common";

// Family 2 in docs/tools-spec.md: captions (Instagram, TikTok, Facebook) and descriptions (YouTube, Pinterest).

export type CaptionOverride = {
  platform: string;
  output: "Caption" | "Description";
  limit: number;
  /** Hook zone for the prompt, e.g. "125". */
  fold: string;
  ranges: [string, string, string];
  /** Overrides the family meta title when it would run past 60 characters. */
  metaTitle?: string;
  /** Hashtag rule pasted into the prompt. */
  promptHashtagRule: string;
  formatRules: string;
  /** Hashtag toggle shown (hidden on YouTube and Pinterest). */
  hashtagToggle: boolean;
  /** YouTube only: chapters and links fields. */
  youtubeFields?: boolean;
  tips: Rich;
  examples: ToolExample[];
  faqs: { q: string; a: Rich }[];
  related: string[];
  /** Page level override, merged over the family page at build time. */
  page?: (base: ToolPage) => ToolPage;
};

export function captionPage(o: CaptionOverride): ToolPage {
  const base = captionBase(o);
  return o.page ? o.page(base) : base;
}

function captionBase(o: CaptionOverride): ToolPage {
  const P = o.platform;
  const O = o.output;
  const o_ = O.toLowerCase();
  const slug = `${P.toLowerCase()}-${o_}-generator`;
  const fields: ToolField[] = [
    { name: "topic", label: "What's the post or video about?", type: "textarea", placeholder: "A before and after of a tiny balcony garden makeover", required: true, maxLength: 1000 },
    { name: "notes", label: "Key details to include", type: "textarea", placeholder: "Cost $40, done in one weekend, plants from a local nursery", maxLength: 1500 },
    { name: "audience", label: "Who's watching?", type: "text", placeholder: "Renters with small apartments", maxLength: 300 },
    { name: "goal", label: "What do you want?", type: "select", options: ["Comments", "Saves", "Clicks", "Sales", "Watch time"] },
    { name: "keyword", label: "Search phrase (optional)", type: "text", placeholder: "balcony garden ideas", maxLength: 150 },
    { name: "cta", label: "Call to action (optional)", type: "text", placeholder: "Link in bio for the plant list", maxLength: 200 },
    { name: "tone", label: "Tone", type: "chips", options: ["Friendly", "Funny", "Bold", "Calm", "Professional"] },
    { name: "length", label: "Length", type: "chips", options: ["Short", "Medium", "Long"], defaultValue: "Medium" },
  ];
  if (o.hashtagToggle) fields.push({ name: "hashtags", label: "Add hashtags", type: "toggle", defaultOn: true });
  fields.push({ name: "emoji", label: "Use emoji", type: "toggle", defaultOn: true });
  if (o.youtubeFields) {
    fields.push(
      { name: "chapters", label: "Timestamps (YouTube only)", type: "textarea", placeholder: "0:00 Intro, 1:12 The plants, 4:30 Final look", maxLength: 1500 },
      { name: "links", label: "Links to include (YouTube only)", type: "textarea", placeholder: "Plant list: example.com/plants", maxLength: 1000 },
    );
  }
  fields.push({ name: "language", label: "Language", type: "select", options: BIO_LANGUAGES, defaultValue: "English" });
  const example = o.examples[0].input;

  return {
    slug,
    name: `${P} ${O} Generator`,
    keyword: `${P.toLowerCase()} ${o_} generator`,
    group: "Social",
    metaTitle: o.metaTitle ?? `${P} ${O} Generator: Free, Written From Your Notes`,
    metaDescription: `This free ${P} ${o_} generator turns your notes into 3 ready to post ${o_}s with a strong first line and the right length.`,
    h1: { regular: `Free ${P}`, accent: `${O} Generator` },
    heroDescription: `This ${P} ${o_} generator turns a few rough notes into three ${o_}s you can post today. Every one opens with a line worth reading and stays inside ${P}'s limits.`,
    accessNote: `${FAIR_USE} Nothing posts automatically.`,
    workspace: {
      fields,
      button: `Write my ${P} ${o_}s`,
      secondary: "Try an example",
      exampleInput: example,
      resultsHeading: `Your ${P} ${o_}s`,
      emptyState: "Three versions show up here. The first line is highlighted, because that's the bit people see before they tap \"more\".",
      more: "Write 3 more",
      dataNote: dataNote(`${o_}s`),
      errorText: ERROR_TEXT,
      result: { kind: "options", limit: o.limit, fold: { firstLine: true }, hashtags: true, shorter: "Make it shorter", punchier: "Make it punchier" },
    },
    howTo: {
      heading: `How to use the ${P} ${o_} generator`,
      steps: [
        `**Dump your notes.** Messy is fine. Real details beat polished nothing. "Cost $40, took a weekend" gives the tool something to work with. "Check out my garden" does not.`,
        `**Pick your goal.** A ${o_} built for comments asks a question. One built for clicks earns the click. Pick one.`,
        "**Read the first line only.** If it doesn't make you want the second line, regenerate. Then copy and post.",
      ],
    },
    examples: { heading: `${P} ${o_} examples`, items: o.examples },
    sections: [
      {
        heading: `What makes a good ${P} ${o_}?`,
        blocks: [
          { p: "The first line does 80% of the work. People see it, then decide whether to tap \"more\" or keep scrolling." },
          { p: "Think of it as a cold open. Breaking Bad didn't start with Walter White doing taxes. It started with a pair of pants flying across the desert. **YOUR FIRST LINE NEEDS ITS FLYING PANTS.**" },
          { p: `After the hook, a good ${o_} does three things:` },
          {
            ol: [
              "**Adds what the video or image can't show:** the price, the why, the mistake, the backstory.",
              `**Uses words people search for,** because ${P} reads your text to figure out who should see the post.`,
              "**Ends with one clear ask.** Not four. One.",
            ],
          },
          { p: o.tips },
          { p: "**Common mistake:** writing the caption last, in a hurry, as \"New post! ✨\". That's caption shaped air. Swap it for one specific detail, like \"$40 and one weekend. Here's the plant list.\"" },
          { p: `**One limit to know:** the tool can't see your image or watch your video. If the ${o_} mentions something, make sure it's actually in the post.` },
        ],
      },
    ],
    faqs: [
      freeFaq(`${P} ${o_} generator`),
      { q: "Will it invent details?", a: `No. It only uses what you type. If a stronger ${o_} needs a number or a fact, it tells you what to add.` },
      { q: "Can I make it shorter or change the tone?", a: "Yes. Use the Shorter and Punchier buttons, or switch the tone and run it again." },
      { q: "Does it post for me?", a: "No. You copy it and post it yourself." },
      ...o.faqs,
    ],
    ctas: [
      {
        heading: `Writing ${o_}s every week gets old fast.`,
        copy: "I plan, write and post social content for SaaS and service businesses, so your feed stays busy while you run the business.",
        button: "See my social media service",
        href: LINK_SOCIAL_MEDIA_SERVICE,
      },
    ],
    related: [...o.related, "social-media-content-calendar-generator"].map((s) => ({ slug: s })),
    extraLinks: [GUIDE_CONTENT_WRITING],
    api: {
      block: "caption",
      vars: {
        platform: P,
        output_type: o_,
        limit: fmt(o.limit),
        fold: o.fold,
        short_range: o.ranges[0],
        medium_range: o.ranges[1],
        long_range: o.ranges[2],
        hashtag_rule: o.promptHashtagRule,
        format_rules: o.formatRules,
        // Platforms without the toggle: YouTube allows up to 3 tags, Pinterest none.
        ...(o.hashtagToggle ? {} : { hashtags: o.promptHashtagRule.startsWith("None") ? "off" : "on" }),
      },
    },
  };
}

const ex = (inputLabel: string, input: ToolExample["input"], output: string, why: string): ToolExample => ({ inputLabel, input, output, why });

export const CAPTION_PLATFORMS: CaptionOverride[] = [
  {
    platform: "Instagram",
    output: "Caption",
    limit: 2200,
    fold: "125",
    ranges: ["80 to 250", "250 to 700", "700 to 1,500"],
    promptHashtagRule: "3 to 5 tags, never more than 5",
    formatRules: "Short lines with a blank line between ideas. Up to 2 emoji per version, used as bullets or for tone. Hashtags go at the end.",
    hashtagToggle: true,
    tips: "Instagram now allows [only 5 hashtags per post](https://www.inro.social/tools/instagram-hashtag-generator), counted across the caption and comments, per its Help Center as reported in August 2026. Any tool still handing you 30 tags is living in 2022. Pick five specific ones and move on. Put your searchable words in the opening lines, where people and Instagram both read first.",
    examples: [
      ex(
        "Balcony garden makeover",
        { topic: "A before and after of a tiny balcony garden makeover", notes: "Cost $40, done in one weekend, plants from a local nursery", audience: "Renters with small apartments", goal: "Saves", keyword: "balcony garden ideas", cta: "Link in bio for the plant list", tone: "Friendly", length: "Short", hashtags: true },
        "$40 and one weekend turned this sad balcony into my favorite room.\n\nEverything came from a local nursery, so these balcony garden ideas work on a renter's budget.\n\nLink in bio for the plant list.",
        "The price and the time land in the first line, before anyone taps more.",
      ),
      ex(
        "Café launch",
        { topic: "Our café's opening day bake", notes: "Burned the first 200 croissants testing the oven. Opening tomorrow at 8am", audience: "Locals near the café", goal: "Sales", keyword: "fresh croissants", cta: "See you at 8", tone: "Funny", length: "Short", hashtags: true },
        "We burned the first 200 croissants. Batch 201 is out tomorrow at 8.",
        "Opens on a real mistake people want to hear about, then gives a time to show up.",
      ),
      ex(
        "Coach tip",
        { topic: "A core exercise that works better than crunches", notes: "Dead bugs, 3 sets of 10, takes 5 minutes", audience: "Busy people training at home", goal: "Saves", keyword: "core workout at home", cta: "Save this for your next workout", tone: "Bold", length: "Short", hashtags: true },
        "Stop doing 100 crunches. Do this instead.",
        "A direct instruction that challenges a habit, so people read on for the fix.",
      ),
    ],
    faqs: [
      { q: "How many hashtags should I use on Instagram?", a: "Up to 5, which is now the maximum. Fewer specific tags beat a wall of generic ones." },
      { q: "How long should an Instagram caption be?", a: "As long as it stays interesting. Short for photos that speak for themselves, longer for tips and stories. The limit is 2,200." },
    ],
    related: ["instagram-bio-generator"],
    page: instagramCaptionPage,
  },
  {
    platform: "TikTok",
    page: tiktokCaptionPage,
    output: "Caption",
    limit: 2200,
    fold: "70",
    ranges: ["40 to 150", "150 to 400", "400 to 1,000"],
    promptHashtagRule: "3 to 5 specific tags",
    formatRules: "Casual, spoken voice. One or two short lines usually. The hook must add to the video, not describe it.",
    hashtagToggle: true,
    tips: "TikTok captions can run long in the app, but scheduling tools cap them at 2,200, so this tool writes to 2,200 to be safe. The caption is where you add the words viewers would search, since your video can't be typed into a search bar.",
    examples: [
      ex(
        "Cheap phone screen fix",
        { topic: "Fixing a cracked phone screen with a cheap kit", notes: "Kit cost $12, temporary fix, took 10 minutes", audience: "People with cracked phones and no budget for a repair", goal: "Watch time", keyword: "cracked phone screen fix", cta: "Follow for part 2", tone: "Funny", length: "Short", hashtags: true },
        "The $12 fix that saved my cracked phone screen (for now)",
        "Price, payoff and an honest \"(for now)\" that keeps people watching to the end.",
      ),
      ex(
        "Office skit",
        { topic: "A skit about a quick slide deck that takes all day", notes: "Three scenes, starts at 9am, ends at 11pm", audience: "Office workers", goal: "Comments", keyword: "office humor", cta: "Tag the coworker who does this", tone: "Funny", length: "Short", hashtags: true },
        "POV: your boss asks for a 'quick' slide deck",
        "A setup the audience has lived, in one short line.",
      ),
      ex(
        "Budget dinners",
        { topic: "Three cheap dinner recipes", notes: "Each under $5 a serving, 20 minutes or less", audience: "Students and young professionals", goal: "Saves", keyword: "budget dinners", cta: "Save for this week's shopping", tone: "Friendly", length: "Short", hashtags: true },
        "3 budget dinners that taste like you tried",
        "A number and a relatable promise, with the search phrase built in.",
      ),
    ],
    faqs: [
      { q: "What's the TikTok caption limit?", a: "Up to about 4,000 characters in the app and 2,200 through scheduling tools." },
      { q: "Do hashtags still matter on TikTok?", a: "A few specific ones help TikTok understand the topic. Skip #fyp, it tells TikTok nothing." },
    ],
    related: ["tiktok-bio-generator"],
  },
  {
    platform: "Facebook",
    output: "Caption",
    limit: 1500,
    fold: "120",
    ranges: ["60 to 200", "200 to 500", "500 to 1,200"],
    promptHashtagRule: "0 to 2 tags, only if useful",
    formatRules: "Conversational. Short paragraphs. Questions work well for comments. Hashtags rarely.",
    hashtagToggle: true,
    tips: "Facebook allows absurdly long posts, but only the first few lines show before \"See more\". Write like you're talking to a neighbor. For local businesses, name the area and the offer plainly.",
    examples: [
      ex(
        "Bakery closed for a day",
        { topic: "Bakery closed on Monday", notes: "The oven broke. Back Tuesday with a double batch of cinnamon rolls", audience: "Regular customers in the neighborhood", goal: "Comments", keyword: "bakery hours", cta: "See you Tuesday", tone: "Friendly", length: "Short", hashtags: false },
        "We're closed Monday. Not for a holiday, the oven died. Back Tuesday with double cinnamon rolls.",
        "Plain news, a human reason and a reward for coming back.",
      ),
      ex(
        "Summer camp question",
        { topic: "Asking parents about summer schedules before setting camp times", notes: "Running a summer camp in Austin, deciding start times", audience: "Parents in Austin", goal: "Comments", keyword: "summer camp Austin", cta: "Tell us in the comments", tone: "Friendly", length: "Short", hashtags: false },
        "Quick question for parents in Austin: what time do your kids actually get out of bed in summer?",
        "Names the local audience and asks a question they can answer in two seconds.",
      ),
      ex(
        "New booking page",
        { topic: "Launching an online booking page", notes: "Book in two clicks, no more calling to book", audience: "Existing clients", goal: "Clicks", keyword: "book online", cta: "Book through the link", tone: "Professional", length: "Short", hashtags: false },
        "Our new booking page is live. Two clicks, no phone tag.",
        "Short news with the benefit right after it.",
      ),
    ],
    faqs: [
      { q: "Do hashtags work on Facebook?", a: "Barely. One or two relevant ones won't hurt, more looks spammy." },
      { q: "How long should a Facebook post be?", a: "Short enough that the point lands before \"See more\"." },
    ],
    related: ["facebook-bio-generator"],
  },
  {
    platform: "YouTube",
    output: "Description",
    limit: 5000,
    fold: "150",
    ranges: ["300 to 800", "800 to 2,000", "2,000 to 4,500"],
    metaTitle: "YouTube Description Generator: Free, From Your Notes",
    promptHashtagRule: "Up to 3 tags at the very end",
    formatRules: "Structure: hook (first 150 characters, includes the search phrase), 2 to 4 short paragraphs on what the viewer gets, chapters if timestamps were given, links if given, then hashtags at the end. Never write 'In this video'.",
    hashtagToggle: false,
    youtubeFields: true,
    tips: "Only the first couple of lines show above the fold, so the hook decides whether anyone expands it. If you add chapters, [YouTube's rules](https://support.google.com/youtube/answer/9884579) are strict: the first timestamp must be 00:00, you need at least three in ascending order, and each chapter must be at least 10 seconds long. The tool never invents timestamps. Paste yours.",
    examples: [
      ex(
        "Tutorial",
        { topic: "Speeding up a slow WordPress site without plugins", notes: "Takes 15 minutes. Covers image sizes, caching in the host settings and removing unused scripts", audience: "Small business owners running WordPress", goal: "Watch time", keyword: "speed up wordpress", cta: "Grab the checklist from the link below", tone: "Calm", length: "Short", chapters: "0:00 Intro, 1:30 Image sizes, 6:10 Hosting settings, 11:45 Results", links: "Checklist: example.com/wp-checklist" },
        "Fix a slow WordPress site in 15 minutes, no plugins required. You'll learn how to resize images, turn on caching in your host settings and remove scripts you don't need.\n\n0:00 Intro\n1:30 Image sizes\n6:10 Hosting settings\n11:45 Results\n\nChecklist: example.com/wp-checklist",
        "The search phrase and the payoff sit in the first line, and the chapters are the visitor's own.",
      ),
      ex(
        "Vlog",
        { topic: "30 days running my business from a van", notes: "Wifi, power and client calls broke first. Kept a daily log", audience: "Remote workers thinking about van life", goal: "Watch time", keyword: "van life remote work", cta: "Subscribe for the day 30 update", tone: "Friendly", length: "Short", chapters: "0:00 Why a van, 2:15 Week one, 9:40 What broke", links: "Gear list: example.com/van-gear" },
        "I moved my whole business into a van for 30 days. Here's what broke first.",
        "A big, specific setup and an open question that the video answers.",
      ),
      ex(
        "Review",
        { topic: "Kindle Scribe review after 6 months", notes: "Used daily for notes and reading. Great for reading PDFs, slow for handwriting search", audience: "People deciding whether to buy a Kindle Scribe", goal: "Watch time", keyword: "kindle scribe review", cta: "Ask your question in the comments", tone: "Calm", length: "Medium", chapters: "0:00 Intro, 1:05 Reading, 4:20 Note taking, 8:50 Verdict", links: "Notes template: example.com/notes" },
        "After 6 months with the Kindle Scribe, here's who should buy it and who shouldn't.",
        "Real time with the product, and a promise to help both kinds of buyer.",
      ),
    ],
    faqs: [
      { q: "How long can a YouTube description be?", a: "5,000 characters. Most good ones use far less." },
      { q: "How do I add chapters?", a: "Paste your timestamps into the tool. They need to start at 00:00, with at least three, each at least 10 seconds long." },
    ],
    related: ["youtube-title-generator"],
  },
  {
    platform: "Pinterest",
    output: "Description",
    limit: 800,
    fold: "0 (descriptions are not shown in the feed)",
    ranges: ["150 to 300", "300 to 500", "500 to 780"],
    metaTitle: "Pinterest Description Generator: Free, From Your Notes",
    promptHashtagRule: "None. Use plain keywords",
    formatRules: "Search first. Two to four plain sentences that describe the idea using words people type into Pinterest search. No hashtags, no hype.",
    hashtagToggle: false,
    tips: "Pinterest is a search engine wearing a mood board costume. [Pinterest's own specs](https://help.pinterest.com/article/review-pin-specs) allow 800 characters and say descriptions don't show in the home or search feed, so write for search and for the close up view, not the scroll.",
    examples: [
      ex(
        "Balcony garden pin",
        { topic: "Small balcony garden setup for renters", notes: "$40 total. Herbs, trailing plants and a folding bench. Nothing drilled into the walls", audience: "Renters with small balconies", goal: "Saves", keyword: "small balcony garden ideas", cta: "Save it for your next weekend project", tone: "Calm", length: "Short" },
        "Small balcony garden ideas for renters: a $40 setup with herbs, trailing plants and a folding bench. Nothing gets drilled into the walls, so it all comes with you when you move.",
        "Starts with the exact phrase people search, then adds the details that make it useful.",
      ),
      ex(
        "Desk setup pin",
        { topic: "Minimal home office desk setup", notes: "Large felt desk mat, warm lamp, cables hidden under the desk, small apartment", audience: "Remote workers in small apartments", goal: "Clicks", keyword: "minimal desk setup", cta: "Shop the desk mat", tone: "Calm", length: "Short" },
        "Minimal desk setup with a large felt desk mat, warm lighting and hidden cables. A calm home office corner that fits a small apartment.",
        "Plain words people type into search, with each item named.",
      ),
      ex(
        "Recipe pin",
        { topic: "Lemon garlic spinach pasta", notes: "Ready in 20 minutes, one pan, pantry ingredients", audience: "People cooking quick weeknight dinners", goal: "Clicks", keyword: "easy weeknight pasta", cta: "Get the full recipe", tone: "Friendly", length: "Short" },
        "Easy weeknight pasta with lemon, garlic and spinach, ready in 20 minutes. One pan and a few pantry ingredients.",
        "The search phrase, the main ingredients and the time, all in the first sentence.",
      ),
    ],
    faqs: [
      { q: "How long should a Pinterest description be?", a: "Up to 800 characters. Two to four useful sentences is plenty." },
      { q: "Should I use hashtags on Pinterest?", a: "Not needed. Clear keywords in the title and description do the work." },
    ],
    related: ["pinterest-title-generator"],
  },
];
