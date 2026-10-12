import { FAIR_USE } from "../links";
import type { DemoProfile, ToolExample, ToolInput, ToolPage } from "../types";

// Threads Bio Generator copy v2 (docs/copy/threads-bio-generator.md), merged over the bio family page.

export const THREADS_FIELD_COPY = {
  who: { placeholder: "Tiny candle studio run by two people" },
  audience: { placeholder: "People who like slow evenings and honest small business talk", hint: "Threads is a conversation app, so say who you want to talk with" },
  current_bio: { label: "Paste your current bio (from Threads, Instagram or X)" },
  keywords: { label: "Topics you post about (optional)", placeholder: "candles, small business" },
  proof: { placeholder: "500 orders shipped from our kitchen table" },
  action: { label: "What should visitors do next?", options: ["Follow", "DM me", "Tap my link", "Book", "Shop", "Nothing"], defaultValue: "Follow" },
  tone: { label: "Vibe" },
};

const base = (input: ToolInput): ToolInput => ({ mode: "new", current_bio: "", keywords: "", location: "", proof: "", emoji: true, line_breaks: true, language: "English", ...input });

type Example = ToolExample & { profile: DemoProfile };

const EXAMPLES: Example[] = [
  {
    inputLabel: "Candle studio",
    inputText: "two person candle studio · people who like small business stories · Follow · Funny",
    input: base({ account_type: "Business", who: "Two person candle studio", audience: "People who like small business stories", keywords: "candles", action: "Follow", tone: "Funny" }),
    output: "Two of us, one tiny candle studio, far too many opinions about wax 🕯️\nPosting the wins, the flops and the weird orders",
    why: "it promises a running story, which is exactly what people follow on Threads.",
    profile: { username: "wickandwhim", name: "Wick & Whim", text: "", link: "yoursite.com", badge: "Business" },
  },
  {
    inputLabel: "Product designer",
    inputText: "product designer · designers and product people · Follow · Bold",
    input: base({ account_type: "Creator", who: "Product designer", audience: "Designers and product people", keywords: "UX", action: "Follow", tone: "Bold", emoji: false, line_breaks: false }),
    output: "Product designer. Hot takes on bad UX, kind takes on people.",
    why: "the contrast tells you the tone of every reply before you read one.",
    profile: { username: "rina.designs", name: "Rina · Product Design", text: "", badge: "Creator" },
  },
  {
    inputLabel: "English teacher",
    inputText: "English teacher · adults who think it's too late · Follow · Friendly",
    input: base({ account_type: "Creator", who: "English teacher for adult learners", audience: "Adults who think it's too late to learn English", action: "Follow", tone: "Friendly", emoji: false, line_breaks: false }),
    output: "Teaching English to adults who think it's too late. It isn't.",
    why: "it names the doubt the audience carries, then answers it in two words.",
    profile: { username: "never.too.late.english", name: "Omar · English Coach", text: "", badge: "Creator" },
  },
  {
    inputLabel: "Coffee roaster",
    inputText: "small batch coffee roaster · Leeds · home brewers · DM me · Friendly",
    input: base({ account_type: "Business", who: "Small batch coffee roaster", audience: "Home brewers", location: "Leeds", keywords: "coffee", action: "DM me", tone: "Friendly" }),
    output: "Small batch coffee, roasted in Leeds ☕\nAsk us anything about brewing at home, we love it\nDMs open",
    why: "it invites questions, and on Threads a question is how a conversation starts.",
    profile: { username: "leeds.roastery", name: "Leeds Roastery", text: "", link: "yoursite.com", badge: "Business" },
  },
  {
    inputLabel: "SaaS founder",
    inputText: "building an invoicing tool for tiny agencies · founders · Follow · Professional",
    input: base({ account_type: "Personal", who: "Building an invoicing tool for tiny agencies", audience: "Other founders", keywords: "SaaS", action: "Follow", tone: "Professional", emoji: false }),
    output: "Building an invoicing tool for tiny agencies\nThinking out loud about pricing, churn and sleep",
    why: "\"thinking out loud\" is a promise of honest posts, and \"sleep\" makes it human.",
    profile: { username: "dev.builds.invoices", name: "Dev · Founder", text: "", link: "yoursite.com", badge: "Personal" },
  },
  {
    inputLabel: "Personal",
    inputText: "plants and late night playlists · personal account · Nothing · Aesthetic",
    input: base({ account_type: "Personal", who: "Plants and late night playlists", audience: "", action: "Nothing", tone: "Aesthetic", line_breaks: false }),
    output: "plants, bad puns, playlists for 2am 🌙",
    why: "a personal account only needs a mood, and this one sets it in seven words.",
    profile: { username: "leafy.lena", name: "lena", text: "", badge: "Personal" },
  },
].map((e) => ({ ...e, profile: { ...e.profile, text: e.output } }));

export function threadsPage(page: ToolPage): ToolPage {
  return {
    ...page,
    metaTitle: "Threads Bio Generator: Free AI Bios That Start Chats",
    metaDescription: "Use this free Threads bio generator to write 5 bios from your real details, see them on a live Threads style profile, and copy the one that sounds like you.",
    h1: { regular: "Free AI Threads", accent: "Bio Generator" },
    heroDescription:
      "This Threads bio generator writes five bios from a few quick answers, then shows them on a live Threads style profile. Each one is short, sounds like a person, and tells people what you post about, so the right ones follow and reply.",
    accessNote: FAIR_USE,
    workspace: {
      ...page.workspace,
      exampleInput: EXAMPLES[0].input,
      emptyState: "",
      dataNote: "AI can get things wrong. Read your bio before you post it, because it goes out under your name.",
      result: { kind: "options", limit: 150, shorter: "Make them shorter", funnier: "Make them funnier" },
      preview: {
        skin: "threads",
        limit: 150,
        demo: EXAMPLES.map((e) => e.profile),
        labels: { pill: "Live preview", caption: "Illustrative profiles. Yours shows up here.", disclosure: "See it on a profile", previewButton: "Preview", theme: "Dark background" },
        live: { username: "your.username", link: "yoursite.com" },
      },
    },
    howTo: {
      heading: "How to use the Threads bio generator",
      intro: "Two minutes, five bios, zero staring at a blinking cursor. Here's the whole process.",
      steps: [
        "**Pick your account type.** Business, creator or personal. A coffee roaster and a product designer want different conversations, so the tool writes each one differently.",
        "**Say what you do and who you want to talk with.** Threads is a conversation app. \"Coffee people\" is fine. \"Home brewers who want better morning coffee\" is better.",
        "**Add the topics you post about.** That's what tells a stranger whether your posts belong in their feed. Add a city, a real proof point and a next step if you have them.",
        "**Preview, copy, paste.** Click Preview to see each bio on a Threads style profile. Pick one, copy it, then in Threads go to your profile, tap Edit profile, and paste it into Bio.",
      ],
      outro: "Moving over from Instagram or X? Switch to **Improve my current bio**, paste the old one, and the tool rewrites it for Threads while keeping your facts.",
    },
    examples: {
      heading: "Threads bio examples for every kind of account",
      label: "Illustrative examples",
      intro: [{ p: "Six bios the tool wrote from the inputs shown. Hit \"Use this example\" on any card to load its inputs, then swap in your own details." }],
      items: EXAMPLES,
    },
    sections: [
      {
        heading: "What makes a good Threads bio",
        blocks: [
          { p: "Instagram bios sell the account. Threads bios start the conversation. That's the whole difference, and it changes what you write." },
          { p: "Someone lands on your profile because you replied to a post they liked. They want to know one thing: if I follow, what will you talk about? So a good Threads bio does three jobs:" },
          {
            ol: [
              "**Says what you post about,** in plain words. Topics beat titles.",
              "**Sounds like you talk.** A little personality is the point here, not a risk.",
              "**Gives people a reason to reply.** A question you love answering, an opinion you hold, a story you're in the middle of.",
            ],
          },
          { p: "Think of your bio as the sign on the door of a party. Nobody walks into a room labeled \"Entrepreneur. Visionary.\" Plenty walk into one labeled \"Two people, one candle studio, a lot of opinions about wax.\"" },
        ],
      },
      {
        heading: "Your Threads profile has more than a bio, so use all of it",
        blocks: [
          { p: "The bio is short on purpose. Threads gives you other spots for everything that doesn't fit, and most people leave them empty." },
          {
            table: {
              head: ["Profile part", "What it's for", "How to use it"],
              rows: [
                ["Bio", "What you post about and who it's for", "One or two lines with personality. Use the formulas below"],
                ["Interests", "Topics people can tap to find conversations about them", "Add up to 10 topics you actually post about"],
                ["Links", "Somewhere useful to send people", "Add up to 5 links, and give each one a clear title"],
                ["Profile photo", "The face next to every reply you write", "A clear face or logo that still reads at tiny sizes"],
                ["Your replies", "The real reason people find you", "Good replies send people to your profile, so the bio has to finish the job"],
              ],
            },
          },
          { p: "Threads announced [up to 10 Interests topics and up to five profile links](https://about.fb.com/news/2025/03/new-threads-features-more-personalized-experience-you-control/) in 2025. Because topics and links have their own spots, **YOUR BIO NEVER HAS TO LIST THEM.** Spend those characters on personality instead." },
        ],
      },
      {
        heading: "Threads bio ideas for every vibe",
        blocks: [
          { p: "Steal a formula, swap the brackets for your own details, or pick the matching vibe in the tool and let it do the swapping." },
          { h3: "Conversational" },
          { ul: ["\"Talking about [topic] like it's a group chat. [Small honest detail].\"\ne.g. \"Talking about personal finance like it's a group chat. Still buy too many plants.\"", "\"Ask me anything about [thing you know]. Seriously, I love it.\""] },
          { h3: "Story in progress" },
          { ul: ["\"Building [thing] for [who]. Sharing [what you'll post].\"\ne.g. \"Building a tiny bakery in a big city. Sharing the numbers and the burnt batches.\"", "\"Day [number] of [challenge]. Results so far: [honest one liner].\""] },
          { h3: "Opinionated" },
          { ul: ["\"[Role]. Strong opinions about [topic], loosely held.\"\ne.g. \"Copywriter. Strong opinions about commas, loosely held.\""] },
          { h3: "Aesthetic" },
          { ul: ["\"[three small things], [one mood] [one emoji]\"\ne.g. \"ceramics, rain, slow sundays ☁️\""] },
        ],
      },
      {
        heading: "Interests, topics and your Threads bio",
        blocks: [
          { p: "Threads lets you add topics to your profile as Interests. Meta says tapping a topic on someone's profile leads straight to conversations about it. That's a much better home for your topics than a row of hashtags in your bio." },
          { p: "So use them like this:" },
          {
            ol: [
              "**Put your three or four main topics in Interests.** Pick the ones you'd happily post about every week.",
              "**Let the bio give those topics a personality.** Interests say \"coffee\". The bio says \"roasting small batches in Leeds and answering every brewing question\".",
              "**Keep them consistent with your posts.** If your Interests say design and every post is about football, people will notice.",
            ],
          },
        ],
      },
      {
        heading: "Threads bio length and formatting",
        blocks: [
          { p: "Threads bios are short. This tool keeps every bio under **150 characters**, counting spaces, emoji and line breaks, so it fits without trimming. The counter on every result shows the exact total." },
          { p: "A few formatting habits that work well:" },
          {
            ol: [
              "**Use one or two lines.** Short lines read better on a phone, and the tool keeps your line breaks when you copy.",
              "**Skip the links in the text.** You have up to five proper links on your profile, so point to them instead.",
              "**Go easy on emoji.** One that adds meaning beats four that add noise.",
              "**Write it fresh for Threads.** Your Threads bio doesn't have to match your Instagram bio, and it usually shouldn't. Instagram sells, Threads chats.",
            ],
          },
        ],
      },
      {
        heading: "Threads bio mistakes that cost you followers",
        blocks: [
          {
            ol: [
              "**Pasting your Instagram bio unchanged.** \"Shop the collection below\" sounds odd in a conversation app. Rewrite it as an invitation.",
              "**A list of job titles.** \"Founder | Speaker | Coach\" tells people your LinkedIn history, not what you'll talk about.",
              "**Being vague to sound mysterious.** \"Just vibes ✨\" is fine for a private account. For anything else, say what the vibes are about.",
              "**Hashtags instead of Interests.** Use the Interests field for topics, and keep the bio for personality.",
              "**Promising posts you never write.** If the bio says \"daily design tips\" and you post twice a month, the bio becomes a broken promise.",
            ],
          },
        ],
      },
    ],
    faqs: [
      { q: "Is this Threads bio generator free?", a: `Yes. ${FAIR_USE}` },
      { q: "How long can a Threads bio be?", a: "Keep it short. This tool writes every bio under 150 characters, counting spaces, emoji and line breaks, and the counter shows the exact total." },
      { q: "Can my Threads bio be different from my Instagram bio?", a: "Yes. You can edit your bio in Threads, so it doesn't have to match Instagram. Most people do better with a warmer, chattier version on Threads." },
      { q: "How many links can I add to my Threads profile?", a: "Up to five, and you can give each link a title. That's why the bio itself never needs a URL." },
      { q: "What are Interests on a Threads profile?", a: "Topics you add to your profile, up to 10. Tapping one takes people to conversations about that topic, so they're the best place to list what you post about." },
      { q: "Should I use hashtags in my Threads bio?", a: "Use the Interests field for topics instead. It was built for exactly that, and it keeps your bio free for personality." },
      { q: "Will the AI make things up about me?", a: "No. It only uses what you type. If a bio would be stronger with a real number or result, it suggests what to add instead of inventing one." },
      { q: "Can it rewrite the bio I already have?", a: "Yes. Switch to \"Improve my current bio\", paste your Threads, Instagram or X bio, and you'll get five Threads versions that keep your facts." },
      { q: "Can it write bios in other languages?", a: "Yes. Pick your language from the dropdown and all five bios come out in it." },
    ],
    ctas: page.ctas,
    related: [
      { slug: "instagram-bio-generator", text: "the version that sells your account." },
      { slug: "twitter-bio-generator", text: "a sharper take for X." },
      { slug: "instagram-caption-generator", text: "posts that match your new bio." },
      { slug: "linkedin-headline-generator", text: "the professional cousin of your bio." },
      { slug: "social-media-content-calendar-generator", text: "plan what you'll actually post." },
    ],
    extraLinks: [...page.extraLinks, { text: "See all free marketing tools", href: "/tools" }],
  };
}
