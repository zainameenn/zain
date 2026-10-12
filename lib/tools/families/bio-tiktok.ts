import { FAIR_USE } from "../links";
import type { DemoProfile, ToolExample, ToolInput, ToolPage } from "../types";

// TikTok Bio Generator copy v2 (docs/copy/tiktok-bio-generator.md), merged over the bio family page.

export const TIKTOK_FIELD_COPY = {
  who: { placeholder: "Budget recipes, every meal under $5" },
  audience: { placeholder: "Students cooking on a tight budget", hint: "One audience. TikTok bios are too short for two" },
  current_bio: { label: "Paste your current TikTok bio" },
  keywords: { label: "What you want to be known for (optional)", placeholder: "budget recipes" },
  location: { label: "Location (optional, useful for local businesses)", placeholder: "Manchester" },
  proof: { placeholder: "New recipe every day" },
  action: { label: "What should viewers do next?", options: ["Follow", "DM me", "Tap my link", "Shop", "Watch my series", "Nothing"], defaultValue: "Follow" },
  tone: { label: "Vibe" },
};

const base = (input: ToolInput): ToolInput => ({ mode: "new", current_bio: "", keywords: "", location: "", proof: "", emoji: true, line_breaks: false, language: "English", ...input });

type Example = ToolExample & { profile: DemoProfile };

const EXAMPLES: Example[] = [
  {
    inputLabel: "Budget recipes",
    inputText: "budget recipes under $5 · students · Follow · Friendly",
    input: base({ account_type: "Creator", who: "Budget recipes, every meal under $5", audience: "Students", proof: "New recipe every day", keywords: "budget recipes", action: "Follow", tone: "Friendly" }),
    output: "Meals under $5, new recipe daily 🍝",
    why: "a price and a schedule in six words. People know what they get before they tap follow.",
    profile: { username: "fivedollarfeed", name: "Five Dollar Feed", text: "", badge: "Creator" },
  },
  {
    inputLabel: "Resume coach",
    inputText: "resume fixes in 60 seconds · job seekers · Follow · Bold",
    input: base({ account_type: "Creator", who: "Resume fixes in 60 second videos", audience: "Job seekers", keywords: "resume tips", action: "Follow", tone: "Bold", emoji: false }),
    output: "I fix bad resumes in 60 seconds. Follow for yours",
    why: "a clear promise, a time frame, and a reason to follow, all inside 80 characters.",
    profile: { username: "resume.rescue", name: "Resume Rescue", text: "", badge: "Creator" },
  },
  {
    inputLabel: "Candle shop",
    inputText: "hand poured candles · gift shoppers · Shop · Friendly",
    input: base({ account_type: "Business", who: "Hand poured soy candles", audience: "Gift shoppers", keywords: "candles", action: "Shop", tone: "Friendly" }),
    output: "Hand poured candles that smell like holidays 🕯️ Shop below",
    why: "the product and the feeling first, then the shortest possible pointer to the link.",
    profile: { username: "glowandpour", name: "Glow & Pour", text: "", link: "yoursite.com", badge: "Business" },
  },
  {
    inputLabel: "Local gym",
    inputText: "boxing gym · beginners · Manchester · DM me · Bold",
    input: base({ account_type: "Business", who: "Boxing gym", audience: "Beginners", location: "Manchester", action: "DM me", tone: "Bold" }),
    output: "Boxing for total beginners in Manchester 🥊 DM to book",
    why: "the city tells locals it's for them, and \"total beginners\" removes the fear factor.",
    profile: { username: "mcr.boxing", name: "MCR Boxing", text: "", badge: "Business" },
  },
  {
    inputLabel: "Desk setups",
    inputText: "small desk setups · people in tiny home offices · Watch my series · Funny",
    input: base({ account_type: "Creator", who: "Small desk setup ideas", audience: "People working from tiny home offices", action: "Watch my series", tone: "Funny", emoji: false }),
    output: "Small desk setups that make Mondays bearable",
    why: "a niche with a bit of personality, and it fits with plenty of room to spare.",
    profile: { username: "tinydesk.daily", name: "Tiny Desk Daily", text: "", badge: "Creator" },
  },
  {
    inputLabel: "Personal",
    inputText: "dance videos and bad jokes · personal account · Nothing · Aesthetic",
    input: base({ account_type: "Personal", who: "Dance videos and bad jokes", audience: "", action: "Nothing", tone: "Aesthetic" }),
    output: "dancing badly, joking worse ✨",
    why: "five words and one mood. Personal accounts don't need more.",
    profile: { username: "zara.moves", name: "zara", text: "", badge: "Personal" },
  },
].map((e) => ({ ...e, profile: { ...e.profile, text: e.output } }));

export function tiktokPage(page: ToolPage): ToolPage {
  return {
    ...page,
    metaTitle: "TikTok Bio Generator: Free AI Bios That Fit 80 Characters",
    metaDescription: "Use this free TikTok bio generator to write 5 short bios from your real details, see them on a live TikTok style profile, and copy one in seconds.",
    h1: { regular: "Free AI TikTok", accent: "Bio Generator" },
    heroDescription:
      "This TikTok bio generator turns a few quick answers into five tiny bios that tell viewers exactly why to follow. Every one fits in 80 characters, shows up on a live profile preview, and sticks to the facts you give it.",
    accessNote: FAIR_USE,
    workspace: {
      ...page.workspace,
      exampleInput: EXAMPLES[0].input,
      emptyState: "",
      dataNote: "AI can get things wrong. Read your bio before you post it, because it goes out under your name.",
      result: { kind: "options", limit: 80, shorter: "Make them shorter", funnier: "Make them funnier" },
      preview: {
        skin: "tiktok",
        limit: 80,
        demo: EXAMPLES.map((e) => e.profile),
        labels: { pill: "Live preview", caption: "Illustrative profiles. Yours shows up here.", disclosure: "See it on a profile", previewButton: "Preview", theme: "Dark background" },
        live: { username: "your.username", link: "yoursite.com" },
      },
    },
    howTo: {
      heading: "How to use the TikTok bio generator",
      intro: "A TikTok bio is tiny, so every word has to earn its spot. The tool does the cutting for you.",
      steps: [
        "**Pick your account type.** Creator, business or personal. A recipe account and a boxing gym need very different twelve words.",
        "**Say what you do and who it's for.** Pick one audience. \"Students cooking on a budget\" beats \"foodies, students, parents and everyone\".",
        "**Add what you want to be known for.** A topic, a city if you're local, and one real detail like how often you post.",
        "**Preview, copy, paste.** Click Preview to see each bio on a TikTok style profile. Copy your favorite, then in TikTok tap Edit profile and paste it into Bio.",
      ],
      outro: "Got a bio already? Switch to **Improve my current bio**, paste it in, and get five tighter versions that keep your facts.",
    },
    examples: {
      heading: "TikTok bio examples for creators and businesses",
      label: "Illustrative examples",
      intro: [{ p: "Six bios the tool wrote from the inputs shown. Click \"Use this example\" to load the inputs, then swap in your own details." }],
      items: EXAMPLES,
    },
    sections: [
      {
        heading: "What makes a good TikTok bio",
        blocks: [
          { p: "Viewers usually land on your profile after one video they liked. The bio answers the only question they have: will the next video be this good too?" },
          { p: "You get about a dozen words, roughly the dialogue in a whole Mr. Bean episode, so a good TikTok bio does just three things:" },
          {
            ol: [
              "**Names your thing.** Budget recipes, resume fixes, beginner boxing. One thing.",
              "**Says who it's for,** if there's room. \"For students\" or \"for total beginners\" helps the right people self select.",
              "**Gives a tiny reason to follow,** like \"new recipe daily\" or \"part 2 is up\".",
            ],
          },
          { p: "**ONE THING, SAID CLEARLY.** If your bio tries to cover three niches, nobody remembers any of them." },
        ],
      },
      {
        heading: "Your TikTok profile: what goes where",
        blocks: [
          { p: "The bio is only one part of the profile. Knowing what the other parts do saves you from cramming everything into the bio." },
          {
            table: {
              head: ["Profile part", "What it does", "Quick tip"],
              rows: [
                ["Username", "Your @handle, used for tags and search", "2 to 24 characters: letters, numbers, underscores and periods"],
                ["Name", "Shows above your bio", "Your name or brand, plus what you do if it fits"],
                ["Bio", "Tells viewers why to follow", "One thing, said clearly"],
                ["Website link", "Sends people to your site or shop", "Needs 1,000 followers or a Verified Business Account"],
                ["Pinned videos", "Your best first impression", "Pin the video that explains your account best"],
              ],
            },
          },
          { p: "TikTok's help center says you can [add a website link](https://www.tiktok.com/support/faq_detail?id=7581821550328896012) once you have at least 1,000 followers or a Verified Business Account, and that links which open other social media apps are no longer supported. Its [username rules](https://www.tiktok.com/support/faq_detail?id=7581821550156962315) allow 2 to 24 characters, and you can change your username once every 30 days." },
        ],
      },
      {
        heading: "TikTok bio ideas for every vibe",
        blocks: [
          { p: "Borrow a formula, swap in your details, or pick the matching vibe in the tool." },
          { h3: "Creator" },
          { ul: ["\"[Thing you make] for [who]. New one [how often].\"\ne.g. \"Ten minute workouts for desk workers. New one every Monday.\""] },
          { h3: "Business" },
          { ul: ["\"[Product] that [benefit]. [Tiny next step].\"\ne.g. \"Socks that survive the washing machine. Shop below.\""] },
          { h3: "Funny" },
          { ul: ["\"I [do thing] so you don't have to.\"\ne.g. \"I taste test gas station snacks so you don't have to.\"", "\"[Job] by day, [chaos] by night.\""] },
          { h3: "Aesthetic" },
          { ul: ["\"[two small things], [one mood] [emoji]\"\ne.g. \"film photos, slow walks ☁️\""] },
        ],
      },
      {
        heading: "TikTok bio length and formatting",
        blocks: [
          { p: "TikTok bios have always been short, and this tool writes every bio in **80 characters** or fewer, counting spaces and emoji. Some newer versions of the app may allow more, but 80 fits everywhere, and short bios read better under a video anyway." },
          { p: "A few habits that help:" },
          {
            ol: [
              "**Keep it to one line.** In a space this small, a line break costs you words.",
              "**Don't type a URL into the bio.** Use the website link on your profile once you qualify, and point to it with \"link below\".",
              "**Use one emoji at most,** ideally one that replaces a word, like 🥊 for boxing.",
              "**Skip your name.** It already shows above the bio.",
            ],
          },
        ],
      },
      {
        heading: "TikTok bio mistakes to avoid",
        blocks: [
          {
            ol: [
              "**Trying to say everything.** Three niches in 80 characters means none of them land.",
              "**A link nobody can tap.** URLs typed into the bio just sit there as text.",
              "**Copying a trending bio.** If ten thousand accounts say \"living my best life ✨\", yours disappears.",
              "**A bio that doesn't match your videos.** If the bio says fitness and the feed is all cooking, viewers leave confused.",
              "**Never updating it.** New series, new product, new city? Change the bio the same day.",
            ],
          },
        ],
      },
    ],
    faqs: [
      { q: "Is this TikTok bio generator free?", a: `Yes. ${FAIR_USE}` },
      { q: "How many characters can a TikTok bio have?", a: "TikTok bios have long been capped at 80 characters, and every bio this tool writes stays within that. Some newer app versions may allow more, but 80 fits everywhere." },
      { q: "Why can't I add a link to my TikTok bio?", a: "TikTok says you need at least 1,000 followers or a Verified Business Account to add a website link to your profile. Until then, a URL typed into the bio is just text." },
      { q: "Can I link my Instagram or YouTube on TikTok?", a: "TikTok says links that open or log you into other social media apps are no longer supported, but you can still link to those platforms' websites." },
      { q: "How often can I change my TikTok username?", a: "Once every 30 days. Usernames can be 2 to 24 characters, using letters, numbers, underscores and periods." },
      { q: "What should a business put in its TikTok bio?", a: "What you sell, who it's for, your city if you're local, and one tiny next step like \"Shop below\". Keep the brand name for the name field." },
      { q: "Will the AI make things up about me?", a: "No. It only uses what you type. If a bio would be stronger with a real detail, it suggests what to add instead of inventing one." },
      { q: "Can it rewrite the bio I already have?", a: "Yes. Switch to \"Improve my current bio\", paste it in, and get five shorter, sharper versions that keep your facts." },
      { q: "Can it write TikTok bios in other languages?", a: "Yes. Pick your language from the dropdown and all five bios come out in it." },
    ],
    ctas: page.ctas,
    related: [
      { slug: "tiktok-caption-generator", text: "captions for the videos your bio promises." },
      { slug: "instagram-bio-generator", text: "the same idea in 150 characters." },
      { slug: "twitter-bio-generator", text: "a bio for X." },
      { slug: "youtube-title-generator", text: "titles for your longer videos." },
      { slug: "social-media-content-calendar-generator", text: "plan a month of posts in one go." },
    ],
    extraLinks: [...page.extraLinks, { text: "See all free marketing tools", href: "/tools" }],
  };
}
