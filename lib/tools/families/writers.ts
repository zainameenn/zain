import { FAIR_USE } from "../links";
import type { ToolField, ToolPage } from "../types";
import { BIO_LANGUAGES } from "./common";
import { realExample, studioWriterPage, writerStudio } from "./studio-writer";
import { titleStudioPage } from "./title-youtube";

// Five writing tools on the shared studio: YouTube and Pinterest descriptions, Pinterest titles, SEO titles and meta descriptions.
// Each keeps its existing prompt; only the fields, preview, copy and examples are new. Limits checked on official pages, Oct 18, 2026.

const CHECKED = "October 18, 2026";
const LANG: ToolField = { name: "language", label: "Language", type: "select", options: BIO_LANGUAGES, defaultValue: "English", group: "advanced" };
const free = (tool: string) => ({ q: `Is this ${tool} free?`, a: `Yes. ${FAIR_USE}` });
const langFaq = (n: string) => ({ q: `Can it write ${n} in other languages?`, a: "Yes. Open \"More ways to personalize\", pick your language, and every result comes out in it." });

// ---------- YouTube Description Generator ----------

export function youtubeDescriptionPage(page: ToolPage): ToolPage {
  const fields: ToolField[] = [
    { name: "topic", label: "What's the video about?", type: "text", placeholder: "How I cut my grocery bill in half without coupons", required: true, maxLength: 300, group: "essentials" },
    { name: "notes", label: "Key points to cover", type: "textarea", placeholder: "$30 weekly list, 3 meals a day, shops at Aldi, batch cooks on Sunday", hint: "Real details only. The tool never invents results or links.", maxLength: 1500, group: "essentials" },
    { name: "keyword", label: "Main search phrase", type: "text", placeholder: "cheap grocery list", maxLength: 150, group: "essentials" },
    { name: "tone", label: "Tone", type: "select", options: ["Friendly", "Funny", "Bold", "Calm", "Professional"], defaultValue: "Friendly", group: "style" },
    { name: "goal", label: "Main goal", type: "select", options: ["Watch time", "Comments", "Clicks", "Sales", "Saves"], defaultValue: "Watch time", group: "style" },
    { name: "length", label: "Length", type: "segmented", options: ["Short", "Medium", "Long"], defaultValue: "Medium", group: "format" },
    { name: "emoji", label: "Emojis", type: "segmented", options: ["No", "Yes"], defaultValue: "No", group: "format" },
    { name: "chapters", label: "Timestamps", type: "textarea", placeholder: "0:00 Intro\n1:12 The list\n4:30 Batch cooking", hint: "Paste yours exactly. The first must be 0:00. The tool never invents timestamps.", maxLength: 1500, group: "advanced" },
    { name: "links", label: "Links to include", type: "textarea", placeholder: "Full list: example.com/list", maxLength: 1000, group: "advanced" },
    { name: "audience", label: "Who's watching?", type: "text", placeholder: "Students living alone", maxLength: 300, group: "advanced" },
    { name: "cta", label: "Your own call to action", type: "text", placeholder: "Subscribe for a new budget recipe every week", maxLength: 200, group: "advanced" },
    { name: "name", label: "Channel name", type: "text", placeholder: "Five Dollar Feed", hint: "Shows on the preview.", maxLength: 60, group: "advanced" },
    LANG,
  ];
  const studio = writerStudio(
    {
      tool: "YouTube description generator",
      noun: "YouTube description",
      steps: [
        ["Say what the video covers", "Add the topic, the key points and the phrase people would search for."],
        ["Choose your style", "Pick a tone, a goal and a length. Paste timestamps and links if you have them."],
        ["Copy your favorite", "Compare three descriptions on a YouTube watch page, see where \"...more\" cuts in, then copy."],
      ],
      compare: {
        intro: "Most weak descriptions are an afterthought. The first two lines are a second chance to sell the video.",
        before: "New video!! Hope you enjoy, don't forget to like and subscribe!! 👍👍",
        after: "Here's the exact cheap grocery list I use to eat 3 meals a day on $30 a week, plus how I batch cook it all on Sunday.\n\n0:00 Intro\n1:12 The list\n4:30 Batch cooking\n\nFull list: example.com/list",
        changes: ["The first line says what the viewer gets, with the search phrase in it.", "Timestamps let people jump to the part they came for.", "One link to the thing the video promised."],
      },
      styles: {
        intro: "Three structures that work for most channels. Pick one, then send its settings to the generator.",
        items: [
          { name: "Search first", when: "For tutorials people find through search.", text: "Cheap grocery list: how I eat 3 meals a day on $30 a week, with the full list and a Sunday batch cooking plan.", why: "The search phrase and the payoff in the first line.", settings: { tone: "Professional", goal: "Watch time", length: "Short" } },
          { name: "Story", when: "For vlogs and personal videos.", text: "I spent a month living on $30 a week of groceries. Some meals were great. One was a disaster. Here's everything I bought.", why: "Opens like a story and makes people want to watch it.", settings: { tone: "Friendly", goal: "Comments", length: "Medium" } },
          { name: "Resource hub", when: "For reviews and how tos with links.", text: "Everything from this video in one place: the list, the recipes and the tools.\n\nRecipes: example.com/recipes", why: "Turns the description into a reason to click.", settings: { tone: "Calm", goal: "Clicks", length: "Medium" } },
        ],
      },
      practices: [
        { title: "Make the first two lines count", text: "Only the start of the description shows before \"...more\". Put what the viewer gets there.", good: "The $30 grocery list I use for 3 meals a day", bad: "Hi guys, welcome back to my channel!" },
        { title: "Use the search phrase naturally", text: "Say what the video is about in the words people search, once or twice. Don't list keywords.", good: "This cheap grocery list covers...", bad: "grocery list cheap groceries budget food" },
        { title: "Add real timestamps", text: "YouTube's chapter rules: the first timestamp is 0:00, there are at least three, and each chapter is at least 10 seconds long.", good: "0:00 Intro\n1:12 The list" },
        { title: "Only link what helps", text: "One or two links to things the video mentions beat a wall of affiliate links.", good: "Full list: example.com/list" },
        { title: "End with one ask", text: "Subscribe, comment or click. Pick the one that fits the video.", good: "Tell me your cheapest meal below" },
        { title: "Stay inside 5,000 characters", text: "That's YouTube's limit. Most good descriptions use a few hundred.", count: 420 },
      ],
      related: [
        { slug: "youtube-title-generator", text: "A title that matches your description." },
        { slug: "tiktok-caption-generator", text: "Captions for your short videos." },
        { slug: "pinterest-description-generator", text: "Descriptions for your pins." },
        { slug: "social-media-content-calendar-generator", text: "Plan a month of content in one go." },
      ],
      cta: "social",
    },
    "This YouTube description generator turns your notes into three descriptions with a strong first line, your timestamps and links in the right place, and the phrase people search.",
    "Say what your video covers, pick a style, and see each description on a YouTube watch page before you copy it.",
  );
  return studioWriterPage(
    {
      ...page,
      metaTitle: "YouTube Description Generator: Free AI Video Descriptions",
      metaDescription: "Use this free YouTube description generator to write 3 descriptions with a strong first line, your timestamps and links, on a live watch page preview.",
      h1: { regular: "Free YouTube", accent: "Description Generator" },
      heroDescription: studio.lede,
      faqs: [
        free("YouTube description generator"),
        { q: "How long can a YouTube description be?", a: "YouTube's help center says up to 5,000 characters. The tool stays well under that." },
        { q: "How do I add chapters?", a: "Paste your timestamps. YouTube needs the first one at 0:00, at least three in order, and each chapter at least 10 seconds long. The tool uses yours exactly and never makes them up." },
        { q: "Where should the search phrase go?", a: "In the first sentence or two, said naturally. That's also the part people see before \"...more\"." },
        { q: "Will it add hashtags?", a: "Up to 3 at the very end, if they fit the video." },
        { q: "Will it make things up?", a: "No. It only uses your details, links and timestamps." },
        langFaq("descriptions"),
      ],
      related: [],
      extraLinks: [],
    },
    {
      platform: "YouTube",
      noun: "description",
      skin: "youtube-watch",
      fields,
      button: "Generate 3 descriptions",
      limit: 5000,
      example: { topic: "How I cut my grocery bill in half without coupons", notes: "$30 weekly list, 3 meals a day, batch cooks on Sunday", keyword: "cheap grocery list", tone: "Friendly", goal: "Watch time", length: "Medium", emoji: "No", chapters: "0:00 Intro\n1:12 The list\n4:30 Batch cooking", links: "", audience: "Students living alone", cta: "", name: "Five Dollar Feed", language: "English" },
      dataNote: "AI can get things wrong. Check that every detail matches your video before you publish.",
      shorter: "Make them shorter",
    },
    studio,
  );
}

// ---------- Pinterest Description Generator ----------

export function pinterestDescriptionPage(page: ToolPage): ToolPage {
  const fields: ToolField[] = [
    { name: "topic", label: "What's the pin about?", type: "text", placeholder: "Small balcony garden setup for renters", required: true, maxLength: 300, group: "essentials" },
    { name: "notes", label: "Key details", type: "textarea", placeholder: "$40 total, herbs and trailing plants, nothing drilled into the walls", maxLength: 1000, group: "essentials" },
    { name: "keyword", label: "Main search phrase", type: "text", placeholder: "small balcony garden ideas", hint: "Pinterest is a search engine. Use the words pinners type.", maxLength: 150, group: "essentials" },
    { name: "tone", label: "Tone", type: "select", options: ["Friendly", "Calm", "Professional", "Bold"], defaultValue: "Friendly", group: "style" },
    { name: "goal", label: "Main goal", type: "select", options: ["Saves", "Clicks", "Sales"], defaultValue: "Saves", group: "style" },
    { name: "length", label: "Length", type: "segmented", options: ["Short", "Medium", "Long"], defaultValue: "Short", group: "format" },
    { name: "audience", label: "Who's it for?", type: "text", placeholder: "Renters with small balconies", maxLength: 300, group: "advanced" },
    { name: "cta", label: "Your own call to action", type: "text", placeholder: "Save it for your next weekend project", maxLength: 200, group: "advanced" },
    { name: "name", label: "Account name", type: "text", placeholder: "Tiny Green Flat", hint: "Shows on the preview.", maxLength: 60, group: "advanced" },
    LANG,
  ];
  const studio = writerStudio(
    {
      tool: "Pinterest description generator",
      noun: "Pinterest description",
      steps: [
        ["Say what the pin is about", "Add the topic, the real details and the phrase pinners search for."],
        ["Choose your style", "Pick a tone, a goal and a length."],
        ["Copy your favorite", "Compare three descriptions on a pin, then copy the one you like."],
      ],
      compare: {
        intro: "Pinterest works like a search engine. A good description tells it, and pinners, exactly what the pin is.",
        before: "Love this!! 😍✨ So cute #home #decor #cute #love",
        after: "Small balcony garden ideas for renters: a $40 setup with herbs, trailing plants and a folding bench. Nothing gets drilled into the walls, so it all comes with you when you move.",
        changes: ["Feelings became the phrase pinners search.", "Real details: price, plants and the renter friendly part.", "Generic hashtags went. Plain keywords do the work on Pinterest."],
      },
      styles: {
        intro: "Three approaches for different pins.",
        items: [
          { name: "Search first", when: "For ideas and inspiration pins.", text: "Small balcony garden ideas for renters, with herbs and trailing plants you can take with you.", why: "Keyword first, then what makes it different.", settings: { tone: "Calm", goal: "Saves", length: "Short" } },
          { name: "How to", when: "For tutorials and guides.", text: "How to set up a balcony garden for $40: pick three herbs, add one trailing plant, and use rail planters so nothing needs drilling.", why: "Steps in one sentence, so pinners know they'll learn something.", settings: { tone: "Friendly", goal: "Clicks", length: "Medium" } },
          { name: "Product", when: "For shops pinning products.", text: "Large felt desk mat in sage green, 90 x 40 cm. A calm, soft surface for a minimal desk setup.", why: "Product, size and use, in shopper language.", settings: { tone: "Professional", goal: "Sales", length: "Short" } },
        ],
      },
      practices: [
        { title: "Write for search", text: "Pinners search like they're making a list. Use those exact words near the start.", good: "Small balcony garden ideas for renters", bad: "Obsessed with this vibe" },
        { title: "Be specific", text: "Prices, sizes, materials and steps make a pin worth saving.", good: "$40 setup, nothing drilled", bad: "Easy and cute" },
        { title: "Skip hashtags", text: "Plain keywords in sentences work better than a row of tags on Pinterest.", good: "herbs and trailing plants", bad: "#garden #plants #cute" },
        { title: "Match the pin and the page", text: "The description should describe what people find when they click.", good: "Full plant list on the blog" },
        { title: "Say what to do next", text: "Save it, try it or shop it. One ask is enough.", good: "Save it for your next weekend project" },
        { title: "Stay inside 800 characters", text: "That's Pinterest's limit for descriptions. Most good ones are one to three sentences.", count: 180 },
      ],
      related: [
        { slug: "pinterest-title-generator", text: "A title for the same pin." },
        { slug: "instagram-caption-generator", text: "Captions for Instagram posts." },
        { slug: "product-description-generator", text: "Descriptions for your product pages." },
        { slug: "social-media-content-calendar-generator", text: "Plan a month of content in one go." },
      ],
      cta: "social",
    },
    "This Pinterest description generator turns your notes into three descriptions written the way pinners search, with real details and one clear next step.",
    "Say what your pin is about, pick a style, and see each description on a pin before you copy it.",
  );
  return studioWriterPage(
    {
      ...page,
      metaTitle: "Pinterest Description Generator: Free AI Pin Descriptions",
      metaDescription: "Use this free Pinterest description generator to write 3 pin descriptions with the words pinners search, real details and a clear next step.",
      h1: { regular: "Free Pinterest", accent: "Description Generator" },
      heroDescription: studio.lede,
      faqs: [
        free("Pinterest description generator"),
        { q: "How long can a Pinterest description be?", a: "Pinterest's pin specs allow up to 800 characters. Most good descriptions are much shorter." },
        { q: "Should I use hashtags on Pinterest?", a: "Plain keywords in natural sentences are the safer choice. The tool doesn't add hashtags." },
        { q: "What words should I use?", a: "The ones people type into Pinterest search. Add your main search phrase and the tool works it in near the start." },
        { q: "Will it make things up?", a: "No. It only uses your details. If a stronger description needs a fact, it tells you what to add." },
        langFaq("descriptions"),
      ],
      related: [],
      extraLinks: [],
    },
    {
      platform: "Pinterest",
      noun: "description",
      skin: "pinterest-description",
      fields,
      button: "Generate 3 descriptions",
      limit: 800,
      example: { topic: "Small balcony garden setup for renters", notes: "$40 total, herbs and trailing plants, nothing drilled into the walls", keyword: "small balcony garden ideas", tone: "Calm", goal: "Saves", length: "Short", audience: "Renters", cta: "", name: "Tiny Green Flat", language: "English" },
      dataNote: "AI can get things wrong. Make sure the description matches your pin and the page it links to.",
      shorter: "Make them shorter",
      vars: { hashtags: "off", emoji: "off" },
    },
    studio,
  );
}

// ---------- Pinterest Title Generator ----------

export function pinterestTitlePage(page: ToolPage): ToolPage {
  const studio = writerStudio(
    {
      tool: "Pinterest title generator",
      noun: "Pinterest title",
      steps: [
        ["Say what the pin is about", "Add the topic and the phrase pinners would search for."],
        ["Choose your style", "Clear, curious, bold or calm. Add who it's for and the payoff for sharper titles."],
        ["Copy your favorite", "Compare six titles on a pin, then copy the one you like."],
      ],
      compare: {
        intro: "Pinterest rewards titles that say exactly what the pin is. Clever rarely beats clear here.",
        before: "This changed everything ✨",
        after: "Small balcony garden ideas for renters",
        changes: ["A vague teaser became what pinners actually type.", "The audience makes it clear who it's for.", "Short enough to show in full on a pin."],
      },
      styles: {
        intro: "Three title styles that suit Pinterest.",
        items: [
          { name: "Clear", when: "For almost every pin.", text: "Small balcony garden ideas for renters", why: "The search phrase and the audience, nothing else.", settings: { style: "Clear" } },
          { name: "Number", when: "For lists and guides.", text: "5 easy herbs for a small balcony garden", why: "A number sets clear expectations.", settings: { style: "Bold" } },
          { name: "Calm", when: "For home, lifestyle and aesthetic pins.", text: "A calm minimal desk setup with a felt mat", why: "A mood, plus the words people search.", settings: { style: "Calm" } },
        ],
      },
      practices: [
        { title: "Lead with the search phrase", text: "Pins show only part of a long title, so the keyword goes first.", good: "Small balcony garden ideas", bad: "You need to see this balcony" },
        { title: "Describe, don't tease", text: "Pinners want to know exactly what they'll get.", good: "Cheap grocery list for students", bad: "The list that changed my life" },
        { title: "Add the audience", text: "\"For renters\" or \"for students\" helps the right people click.", good: "...for renters" },
        { title: "One idea per title", text: "Two ideas in one title means neither lands.", good: "Minimal desk setup ideas" },
        { title: "Match the image", text: "The title should describe what's in the pin, close to the text on the image." },
        { title: "Stay within 100 characters", text: "That's Pinterest's title limit. Most good titles are under 60.", count: 38 },
      ],
      related: [
        { slug: "pinterest-description-generator", text: "A description for the same pin." },
        { slug: "youtube-title-generator", text: "Titles for your videos." },
        { slug: "etsy-title-generator", text: "Titles for your Etsy listings." },
        { slug: "seo-title-generator", text: "Titles for your website pages." },
      ],
      cta: "social",
    },
    "This Pinterest title generator writes six pin titles around the phrase pinners search, each under 100 characters and clear about what the pin is.",
    "Say what your pin is about, add your search phrase, and see each title on a pin before you copy it.",
  );
  return titleStudioPage(
    {
      ...page,
      metaTitle: "Pinterest Title Generator: 6 Free Pin Titles in Seconds",
      metaDescription: "Use this free Pinterest title generator to write 6 pin titles around the words pinners search, each under 100 characters, on a live pin preview.",
      h1: { regular: "Free Pinterest", accent: "Title Generator" },
      heroDescription: studio.lede,
      faqs: [
        free("Pinterest title generator"),
        { q: "How long can a Pinterest title be?", a: "Pinterest's pin specs allow up to 100 characters. Shorter titles show in full more often." },
        { q: "Does the title matter for Pinterest search?", a: "It's one of the clearest descriptions of what your pin is, so use the words people search." },
        { q: "Should my title match the text on my pin image?", a: "Close, but not identical. Use the title to add search words the image can't fit." },
        { q: "Can it improve a title I already have?", a: "Yes. Switch to \"Improve my title\" and paste it in." },
        langFaq("titles"),
      ],
      related: [],
      extraLinks: [],
    },
    {
      platform: "Pinterest",
      skin: "pinterest",
      visible: 40,
      goal: "Get found in Pinterest search. Descriptive beats clever.",
      styleRules: "Sentence case. Keyword first. No curiosity gaps, Pinterest users want to know exactly what they'll get.",
      copy: { topic: "Small balcony garden setup for renters", current: "This changed everything ✨", keyword: "small balcony garden ideas", audience: "Renters", payoff: "A $40 setup that fits a narrow balcony", name: "Tiny Green Flat" },
      example: { topic: "Small balcony garden setup for renters", keyword: "small balcony garden ideas", audience: "Renters", payoff: "A $40 setup that fits a narrow balcony", name: "Tiny Green Flat", style: "Clear" },
    },
    { ...studio, skin: "pinterest-title" },
  );
}

// ---------- SEO Title Generator and Meta Description Generator ----------

const PAGE_TYPES = ["Blog post", "Service page", "Product page", "Category page", "Homepage", "Landing page", "Tool page"];
const seoFields = (extra: ToolField[], ph = ["A guide to fixing slow WordPress sites without plugins", "speed up wordpress"]): ToolField[] => [
  { name: "summary", label: "What's on the page?", type: "textarea", placeholder: ph[0], required: true, maxLength: 1500, group: "essentials" },
  { name: "keyword", label: "Target keyword", type: "text", placeholder: ph[1], required: true, maxLength: 150, group: "essentials" },
  { name: "page_type", label: "Page type", type: "select", options: PAGE_TYPES, defaultValue: "Blog post", group: "style" },
  ...extra,
];

const HOME = (name: string, url: string, text: string, why: string, kind: "title" | "description") =>
  realExample(name, url.replace(/^https:\/\/(www\.)?/, "").replace(/\/$/, ""), url, text, kind === "title" ? "Brand-focused" : "Action-focused", why, CHECKED, "Visit page");

export function seoTitlePage(page: ToolPage): ToolPage {
  const fields = seoFields([
    { name: "intent", label: "What does the searcher want?", type: "select", options: ["Learn", "Compare", "Buy", "Hire", "Use a tool"], defaultValue: "Learn", group: "style" },
    { name: "brand", label: "Brand name", type: "text", placeholder: "Zain", hint: "Shows on the preview and can end the title.", maxLength: 60, group: "advanced" },
  ]);
  const studio = writerStudio(
    {
      tool: "SEO title generator",
      noun: "SEO title",
      steps: [
        ["Say what's on the page", "Describe the page and add the keyword you want it to rank for."],
        ["Pick the page type and intent", "A blog post and a service page need different titles. So do learners and buyers."],
        ["Copy your favorite", "Compare the titles on a Google result, check the length, then copy."],
      ],
      gallery: {
        heading: "6 SEO titles",
        intro: "How well known companies title their homepages, from one word to a full keyword list.",
        note: `Title tags as served on each homepage, checked on ${CHECKED}. Big brands can rank on their name, so copy the habits, not the brevity.`,
        items: [
          HOME("Notion", "https://www.notion.com/", "The AI workspace that works for you. | Notion", "A clear category and a benefit, then the brand at the end.", "title"),
          HOME("Canva", "https://www.canva.com/", "Canva: Visual Suite for Everyone", "Brand first, then the category and who it's for.", "title"),
          HOME("Mailchimp", "https://mailchimp.com/", "Email & SMS Marketing Platform | Mailchimp", "The keyword people search comes first, the brand last.", "title"),
          HOME("Airbnb", "https://www.airbnb.com/", "Airbnb: Vacation Rentals, Cabins, Beach Houses, Unique Homes & Experiences", "A list of what people search for. Long, so the end gets cut on most screens.", "title"),
          HOME("Zapier", "https://zapier.com/", "Zapier: Automate AI Workflows, Agents, and Apps", "Brand, then a verb and the exact things it automates.", "title"),
          HOME("Calendly", "https://www.calendly.com/", "Meeting Scheduling Software and AI Meeting Tools | Calendly", "Two search phrases buyers use, then the brand.", "title"),
        ],
      },
      compare: {
        intro: "Most weak titles are just the page name. A good one matches what people search and why they'd click.",
        before: "Home | Ledgerly",
        after: "Restaurant Bookkeeping Services: Clean Books Monthly | Ledgerly",
        changes: ["\"Home\" became the service people search for.", "A short benefit gives a reason to click.", "The brand moved to the end, where it doesn't push the keyword out."],
      },
      styles: {
        intro: "Three title shapes that fit most pages.",
        items: [
          { name: "Keyword first", when: "For blog posts and guides.", text: "How to Speed Up WordPress Without Plugins (7 Fixes)", why: "The search phrase leads, the number sets expectations.", settings: { page_type: "Blog post", intent: "Learn" } },
          { name: "Service", when: "For service and landing pages.", text: "Restaurant Bookkeeping Services | Ledgerly", why: "What you offer, then who you are.", settings: { page_type: "Service page", intent: "Hire" } },
          { name: "Comparison", when: "For versus and alternatives pages.", text: "Notion vs Obsidian: Which Note App Fits Your Team?", why: "Matches how people search when they're deciding.", settings: { page_type: "Blog post", intent: "Compare" } },
        ],
      },
      practices: [
        { title: "Put the keyword near the start", text: "Google cuts long titles on most screens, so the important words go first.", good: "Restaurant Bookkeeping Services | Ledgerly", bad: "Ledgerly | Welcome to Our Website | Services" },
        { title: "Match the search intent", text: "Learners want a guide, buyers want a service. The title should tell them they found it.", good: "How to Speed Up WordPress", bad: "WordPress Speed Services" },
        { title: "Write a reason to click", text: "A benefit, a number or a year (when it matters) makes your result stand out.", good: "(7 Fixes)" },
        { title: "Keep each title unique", text: "Every page needs its own title. Duplicates confuse both Google and searchers." },
        { title: "Don't stuff keywords", text: "One keyword, said naturally. Repeating it reads like spam.", good: "Speed Up WordPress", bad: "WordPress Speed WordPress Fast WordPress" },
        { title: "Aim for about 50 to 60 characters", text: "Google doesn't publish a limit, but longer titles often get cut. The counter turns amber outside that range.", count: 54 },
      ],
      related: [
        { slug: "meta-description-generator", text: "A meta description to go with your title." },
        { slug: "marketing-plan-generator", text: "A 30 day plan for your marketing." },
        { slug: "utm-link-builder", text: "Track where your traffic comes from." },
        { slug: "youtube-title-generator", text: "Titles for your videos." },
      ],
      cta: "seo",
    },
    "This SEO title generator writes title tags around your target keyword, sized to show in full on Google and matched to what searchers want.",
    "Describe the page, add your keyword, and see each title on a Google result before you copy it.",
  );
  return studioWriterPage(
    {
      ...page,
      heroDescription: studio.lede,
      faqs: [
        free("SEO title generator"),
        { q: "How long should an SEO title be?", a: "Google doesn't publish a fixed limit, but titles over about 60 characters often get cut. The tool aims for 50 to 60." },
        { q: "Does Google always use my title?", a: "Not always. Google can rewrite titles it thinks don't match the page. A clear, accurate title makes that less likely." },
        { q: "Should my brand name be in the title?", a: "Usually at the end, after a separator. Add it under \"More ways to personalize\"." },
        { q: "Can these titles guarantee rankings?", a: "No. A good title helps people click and helps Google understand the page, but rankings depend on much more." },
        { q: "Will it make things up?", a: "No. It only uses what you describe. It won't promise anything the page doesn't offer." },
      ],
      related: [],
      extraLinks: [],
    },
    {
      platform: "Google",
      noun: "title",
      skin: "google-title",
      fields,
      button: "Generate titles",
      limit: 65,
      example: { summary: "A guide to fixing slow WordPress sites without plugins, with 7 fixes", keyword: "speed up wordpress", page_type: "Blog post", intent: "Learn", brand: "" },
      dataNote: "AI can get things wrong. Make sure each title matches what's really on the page.",
    },
    studio,
  );
}

export function metaDescriptionPage(page: ToolPage): ToolPage {
  const fields = seoFields([
    { name: "facts", label: "Key facts worth showing", type: "text", placeholder: "Starts at $299/month, 48 hour turnaround", hint: "Real prices, numbers or features. The tool never invents them.", maxLength: 300, group: "advanced" },
    { name: "title", label: "Your SEO title", type: "text", placeholder: "Restaurant Bookkeeping Services by Ledgerly", hint: "Shows on the preview, so you see the full result.", maxLength: 120, group: "advanced" },
    { name: "name", label: "Site name", type: "text", placeholder: "Ledgerly", hint: "Shows on the preview.", maxLength: 60, group: "advanced" },
  ], ["Service page for restaurant bookkeeping, monthly packages, free review call", "restaurant bookkeeping"]);
  const studio = writerStudio(
    {
      tool: "meta description generator",
      noun: "meta description",
      steps: [
        ["Say what's on the page", "Describe the page and add the keyword you want it to rank for."],
        ["Add your facts", "Prices, numbers and features make a description worth clicking. Add your title to see the full result."],
        ["Copy your favorite", "Compare descriptions on a Google result, check the length, then copy."],
      ],
      gallery: {
        heading: "6 meta descriptions",
        intro: "How well known companies describe their homepages to searchers.",
        note: `Meta descriptions as served on each homepage, checked on ${CHECKED}. Google may show different text in its results.`,
        items: [
          HOME("Notion", "https://www.notion.com/", "Build Custom Agents, search across all your apps, and automate busywork. The AI workspace where teams get more done, faster.", "Three concrete things it does, then the positioning line.", "description"),
          HOME("Canva", "https://www.canva.com/", "Canva is a free-to-use online graphic design tool. Use it to create social media posts, presentations, posters, videos, logos and more.", "What it is and what you can make, in plain words people search.", "description"),
          HOME("Mailchimp", "https://mailchimp.com/", "Utilize real-time user behavior data and artificial intelligence to convert more customers. Easy to use, get started for free!", "A benefit, then two reasons to try it: easy and free.", "description"),
          HOME("Airbnb", "https://www.airbnb.com/", "Get an Airbnb for every kind of trip → 8 million vacation rentals → 2 million Guest Favorites → 220+ countries and regions worldwide", "Proof points in a scannable list, with real numbers.", "description"),
          HOME("Duolingo", "https://www.duolingo.com/", "Duolingo is the world's most popular way to learn a language. It's 100% free, fun and science-based. Practice online on duolingo.com or on the apps!", "A claim, three reasons, and where to start.", "description"),
          HOME("Calendly", "https://www.calendly.com/", "Calendly connects and simplifies all of the work around meetings, from scheduling, payments, and meeting prep to notetaking, contact management, and follow-up.", "Names every job it covers, which matches lots of searches.", "description"),
        ],
      },
      compare: {
        intro: "A weak meta description just restates the title. A good one gives searchers a reason to pick your result.",
        before: "Welcome to Ledgerly. We offer bookkeeping services. Contact us today for more information.",
        after: "Restaurant bookkeeping from $299 a month: clean books every month, payroll handled, and a free 20 minute review to start.",
        changes: ["The keyword and the price come first.", "Generic claims became specific things people get.", "\"Contact us\" became a low effort first step."],
      },
      styles: {
        intro: "Three shapes that work for most pages.",
        items: [
          { name: "Benefit first", when: "For service and product pages.", text: "Restaurant bookkeeping from $299 a month, with clean books every month and payroll handled.", why: "What it is, what it costs, what you get.", settings: { page_type: "Service page" } },
          { name: "Answer first", when: "For guides and blog posts.", text: "Slow WordPress site? These 7 fixes speed it up without plugins, starting with the two that matter most.", why: "Names the problem, promises the fix.", settings: { page_type: "Blog post" } },
          { name: "Proof first", when: "For homepages and category pages.", text: "Trusted by 400 restaurants: bookkeeping, payroll and tax prep with a 48 hour turnaround.", why: "Real proof makes your result stand out.", settings: { page_type: "Homepage" } },
        ],
      },
      practices: [
        { title: "Answer \"why click this?\"", text: "Searchers compare results in seconds. Give them a specific reason to pick yours.", good: "From $299 a month, 48 hour turnaround", bad: "Welcome to our website" },
        { title: "Use the keyword naturally", text: "Google often bolds words that match the search, which helps your result stand out.", good: "Restaurant bookkeeping from $299" },
        { title: "Use real facts", text: "Prices, numbers and turnaround times beat adjectives.", good: "48 hour turnaround", bad: "Fast, reliable, professional" },
        { title: "Write one for every important page", text: "Unique descriptions for each page beat one copied everywhere." },
        { title: "Don't count on rankings", text: "Google says meta descriptions aren't a ranking factor. They help people choose your result." },
        { title: "Aim for about 120 to 155 characters", text: "Google cuts longer snippets depending on the screen. The counter turns amber outside that range.", count: 142 },
      ],
      related: [
        { slug: "seo-title-generator", text: "A title tag to go with your description." },
        { slug: "marketing-plan-generator", text: "A 30 day plan for your marketing." },
        { slug: "utm-link-builder", text: "Track where your traffic comes from." },
        { slug: "product-description-generator", text: "Descriptions for your product pages." },
      ],
      cta: "seo",
    },
    "This meta description generator writes search snippets around your keyword and real facts, sized for Google, so searchers have a reason to pick your page.",
    "Describe the page, add your facts, and see each description on a Google result before you copy it.",
  );
  return studioWriterPage(
    {
      ...page,
      heroDescription: studio.lede,
      faqs: [
        free("meta description generator"),
        { q: "How long should a meta description be?", a: "Google doesn't publish a fixed limit, and the cut depends on the screen. About 120 to 155 characters usually shows in full." },
        { q: "Do meta descriptions help rankings?", a: "Google says they aren't a ranking factor. They help people decide whether to click your result." },
        { q: "Does Google always use my meta description?", a: "No. Google sometimes writes its own snippet from the page when it better matches the search." },
        { q: "Should every page have one?", a: "Every important page should have its own, written for what that page offers." },
        { q: "Will it make things up?", a: "No. It only uses your facts. It won't add prices, numbers or claims you didn't give." },
      ],
      related: [],
      extraLinks: [],
    },
    {
      platform: "Google",
      noun: "description",
      skin: "google-description",
      fields,
      button: "Generate descriptions",
      limit: 160,
      example: { summary: "Service page for bookkeeping for restaurants, monthly packages, free review call", keyword: "restaurant bookkeeping", page_type: "Service page", facts: "Starts at $299/month, 48 hour turnaround", title: "Restaurant Bookkeeping Services | Ledgerly", name: "Ledgerly" },
      dataNote: "AI can get things wrong. Make sure every fact is true for your page.",
    },
    studio,
  );
}
