import { FAIR_USE } from "../links";
import type { DemoProfile, ToolExample, ToolInput, ToolPage } from "../types";

// X (Twitter) Bio Generator copy v2 (docs/copy/twitter-bio-generator.md), merged over the bio family page.
// "X" in the copy; "Twitter" stays in the URL, title and H1 because people still search the old name.

export const X_FIELD_COPY = {
  who: { placeholder: "Growth marketer for B2B SaaS" },
  audience: { placeholder: "SaaS founders who want demos, not just traffic", hint: "Name the people you want replies from" },
  current_bio: { label: "Paste your current X bio" },
  keywords: { label: "Words people search for (optional)", placeholder: "B2B SaaS, SEO" },
  location: { label: "Location (optional, X has its own field for this)", placeholder: "London" },
  proof: { placeholder: "Grew a SaaS from 0 to 2,000 signups" },
  action: { label: "What should visitors do next?", options: ["Follow", "DM me", "Tap my link", "Book", "Shop", "Nothing"], defaultValue: "Follow" },
  tone: { label: "Vibe" },
};

const base = (input: ToolInput): ToolInput => ({ mode: "new", current_bio: "", keywords: "", location: "", proof: "", emoji: false, line_breaks: false, language: "English", ...input });

type Example = ToolExample & { profile: DemoProfile };

const EXAMPLES: Example[] = [
  {
    inputLabel: "SaaS marketer",
    inputText: "growth marketer · B2B SaaS founders · DM me · Professional",
    input: base({ account_type: "Creator", who: "Growth marketer for B2B SaaS", audience: "B2B SaaS founders", keywords: "B2B SaaS, SEO", action: "DM me", tone: "Professional" }),
    output: "Growth marketer for B2B SaaS. I write about SEO that brings demos, not just traffic. DMs open.",
    why: "the searchable job title comes first, then the topic, then an open door.",
    profile: { username: "maya_grows", name: "Maya · B2B SaaS Growth", text: "", link: "yoursite.com", badge: "Creator" },
  },
  {
    inputLabel: "Indie founder",
    inputText: "founder of @YourApp · habit tracker · indie hackers · Follow · Funny",
    input: base({ account_type: "Personal", who: "Founder of @YourApp, a habit tracker, building in public", audience: "Indie hackers", proof: "Shares weekly revenue numbers", action: "Follow", tone: "Funny" }),
    output: "Founder @YourApp. Building a habit tracker in public. Weekly numbers, wins and faceplants.",
    why: "the @handle points straight at the product, and \"weekly numbers\" says what you'll get.",
    profile: { username: "sam_ships", name: "Sam · building @YourApp", text: "", link: "yoursite.com", badge: "Personal" },
  },
  {
    inputLabel: "Pastry chef",
    inputText: "pastry chef · home bakers · Follow · Bold",
    input: base({ account_type: "Creator", who: "Pastry chef sharing restaurant dessert recipes", audience: "Home bakers", keywords: "pastry, baking", action: "Follow", tone: "Bold" }),
    output: "Pastry chef. Posting the recipes restaurants keep to themselves.",
    why: "a role plus a reason to follow that feels like insider access.",
    profile: { username: "chef_noor", name: "Noor · Pastry Chef", text: "", badge: "Creator" },
  },
  {
    inputLabel: "Local bookshop",
    inputText: "independent bookshop · readers · Edinburgh · Follow · Friendly",
    input: base({ account_type: "Business", who: "Independent bookshop", audience: "Readers", location: "Edinburgh", proof: "Staff picks every Friday", action: "Follow", tone: "Friendly", emoji: true }),
    output: "Independent bookshop with strong opinions 📚 Staff picks every Friday, arguments in the replies.",
    why: "it promises something regular and invites people into the conversation.",
    profile: { username: "inkandoak_books", name: "Ink & Oak Books", text: "", link: "yoursite.com", badge: "Business" },
  },
  {
    inputLabel: "Data journalist",
    inputText: "data journalist · climate · readers who like charts · Follow · Professional",
    input: base({ account_type: "Creator", who: "Data journalist covering climate", audience: "Readers who like charts", keywords: "climate data", action: "Follow", tone: "Professional" }),
    output: "Data journalist covering climate. Charts, sources and the occasional correction. Views my own.",
    why: "\"the occasional correction\" builds trust, which matters more than polish for a journalist.",
    profile: { username: "lena_charts", name: "Lena Ortiz · Climate Data", text: "", badge: "Creator" },
  },
  {
    inputLabel: "Personal",
    inputText: "football and cooking · personal account · Nothing · Funny",
    input: base({ account_type: "Personal", who: "Football fan who cooks", audience: "", action: "Nothing", tone: "Funny" }),
    output: "Opinions on football, recipes and very little else. Usually wrong about one of them.",
    why: "a personal account just needs a voice, and this one has one in fourteen words.",
    profile: { username: "tom_eats", name: "Tom", text: "", badge: "Personal" },
  },
].map((e) => ({ ...e, profile: { ...e.profile, text: e.output } }));

export function xPage(page: ToolPage): ToolPage {
  return {
    ...page,
    metaTitle: "Twitter Bio Generator: Free AI Bios for X in 160 Characters",
    metaDescription: "Use this free Twitter bio generator to write 5 X bios from your real details, preview them on a live profile, and copy one that fits 160 characters.",
    h1: { regular: "Free AI Twitter", accent: "Bio Generator" },
    heroDescription:
      "This Twitter bio generator writes five bios for your X profile from a few quick answers, then shows them on a live profile so you can see how they read. Every bio fits X's 160 characters, and none of them invent results you don't have.",
    accessNote: FAIR_USE,
    workspace: {
      ...page.workspace,
      exampleInput: EXAMPLES[0].input,
      emptyState: "",
      dataNote: "AI can get things wrong. Read your bio before you post it, because it goes out under your name.",
      result: {
        kind: "options",
        limit: 160,
        shorter: "Make them shorter",
        funnier: "Make them funnier",
        ideas: { key: "name_ideas", limit: 50, heading: "Bonus: ideas for your display name", helper: "X gives your display name up to 50 characters, so there's room for a plain keyword next to your name." },
      },
      preview: {
        skin: "x",
        limit: 160,
        demo: EXAMPLES.map((e) => e.profile),
        labels: { pill: "Live preview", caption: "Illustrative profiles. Yours shows up here.", disclosure: "See it on a profile", previewButton: "Preview", theme: "Dark background" },
        live: { username: "yourhandle", link: "yoursite.com" },
      },
    },
    howTo: {
      heading: "How to use the Twitter bio generator",
      intro: "Answer a few questions, get five bios, pick the one that sounds like you on a good day. That's it.",
      steps: [
        "**Pick your account type.** Creator, business or personal. A founder, a bookshop and a football fan want very different things from a bio.",
        "**Say what you do and who you want replies from.** Use the words people would actually search, like \"B2B SaaS\" or \"pastry chef\", not \"growth ninja\".",
        "**Add the extras.** Keywords, one real proof point and the next step you want. Skip the location here, because X has its own field for it.",
        "**Preview, copy, paste.** Click Preview to see each bio on a live profile. Copy your favorite, then on X go to your profile, choose Edit profile, and paste it into Bio.",
      ],
      outro: "Already have a bio that isn't working? Switch to **Improve my current bio**, paste it in, and get five sharper versions that keep your facts.",
    },
    examples: {
      heading: "Twitter bio examples for founders, creators and brands",
      label: "Illustrative examples",
      intro: [{ p: "Six X bios the tool wrote from the inputs shown. Click \"Use this example\" to load the inputs, then make them yours." }],
      items: EXAMPLES,
    },
    sections: [
      {
        heading: "What to put in your X bio",
        blocks: [
          { p: "Most people meet you on X through a reply or a repost, then tap your name to decide whether you're worth following. Your bio gets one look." },
          { p: "Like a good Sherlock Holmes scene, people read the clues fast and decide. Give them the right clues:" },
          {
            ol: [
              "**What you do,** in words people search for.",
              "**What you post about,** so they know what lands in their feed.",
              "**One real proof point,** if you have one. A number beats an adjective.",
              "**A light next step,** like \"DMs open\" or a pointer to your link.",
            ],
          },
          { p: "Don't try to fit your whole life story into 160 characters. Pick the version of you that your ideal follower cares about, and let your posts do the rest." },
        ],
      },
      {
        heading: "Name, handle, bio, location: what goes where on X",
        blocks: [
          { p: "X gives you several fields, and each has its own limit. Using them properly keeps your bio from doing jobs that belong somewhere else." },
          {
            table: {
              head: ["Field", "Limit", "What to put there"],
              rows: [
                ["Display name", "50 characters", "Your name plus one plain keyword, like \"Maya · B2B SaaS Growth\""],
                ["Username (@handle)", "15 characters, letters, numbers and underscores", "Short, easy to spell, easy to say out loud"],
                ["Bio", "160 characters", "What you do, what you post about, and why to follow"],
                ["Location", "Its own field", "Your city, so the bio doesn't have to say it"],
                ["Website", "Its own field", "Your site or link page, so the bio never needs a URL"],
              ],
            },
          },
          { p: "These limits come from X's own [profile](https://help.x.com/en/managing-your-account/how-to-customize-your-profile) and [username rules](https://help.x.com/en/managing-your-account/x-username-rules) help pages. The takeaway: **YOUR BIO SHOULD NEVER REPEAT YOUR LOCATION OR WEBSITE.** Those fields already show them." },
        ],
      },
      {
        heading: "X bio ideas and formulas",
        blocks: [
          { p: "Pick a formula, fill in the brackets, or choose the matching vibe in the tool." },
          { h3: "Professional" },
          { ul: ["\"[Role] for [audience]. I write about [topic] that [result].\"\ne.g. \"Designer for fintech apps. I write about onboarding that people actually finish.\""] },
          { h3: "Build in public" },
          { ul: ["\"Building [product] for [who]. Sharing [numbers, lessons or mistakes].\"\ne.g. \"Building a booking tool for barbers. Sharing revenue, churn and bad haircuts.\""] },
          { h3: "Funny" },
          { ul: ["\"[Job] by day. [Honest hobby] by night. [Self aware twist].\"\ne.g. \"Accountant by day. Amateur chef by night. Neither is going well.\""] },
          { h3: "Short" },
          { ul: ["\"[Role]. [Topic]. [One word attitude].\"\ne.g. \"Nurse. Night shifts. Snacks.\""] },
        ],
      },
      {
        heading: "Keywords in your X bio",
        blocks: [
          { p: "X search shows posts and accounts together, and people often look for experts by typing a role or a topic. X doesn't publish exactly how account search works, but plain words give you the best chance of matching what people type." },
          {
            ol: [
              "**Use the job title people search,** not a clever label. \"Product designer\" beats \"pixel wizard\".",
              "**Name your niche.** \"B2B SaaS\" or \"climate data\" tells both people and search what you're about.",
              "**Put a keyword in your display name too.** You have 50 characters there, which is plenty for \"Name · Keyword\".",
            ],
          },
          { p: "Stuffing three job titles and five topics into one bio does the opposite. It reads like a résumé that fell down the stairs." },
        ],
      },
      {
        heading: "X bio character limit and formatting",
        blocks: [
          { p: "Your X bio can be up to **160 characters**. Spaces, emoji and line breaks all count. The counter on every result shows the exact total, so you'll never hit the limit mid paste." },
          { p: "A few formatting habits that help:" },
          {
            ol: [
              "**Lead with the most important words.** People skim, and the first line does most of the work.",
              "**@mention your company if you have one.** It points curious readers straight to it.",
              "**Keep line breaks to a minimum.** One or two lines read cleanly under your name.",
              "**Leave out hashtags.** They rarely help a bio, and they cost characters you could spend on what you do.",
            ],
          },
        ],
      },
      {
        heading: "X bio mistakes that cost you followers",
        blocks: [
          {
            ol: [
              "**The keyword pile.** \"Marketing | Growth | AI | Web3 | Coffee\" says you can't decide what you are.",
              "**\"Views my own\" and nothing else.** Fine as a closer, useless as a whole bio.",
              "**Repeating your location and link.** They already have their own fields.",
              "**A bio that fights your pinned post.** If the bio says SaaS and the pinned post is about your cat, pick a lane.",
              "**Clever but unclear.** If a stranger can't tell what you do in one read, the joke cost you a follower.",
            ],
          },
        ],
      },
    ],
    faqs: [
      { q: "Is this Twitter bio generator free?", a: `Yes. ${FAIR_USE}` },
      { q: "How long can a Twitter bio be?", a: "160 characters, including spaces and emoji. Every bio this tool writes fits, and the counter shows the exact total." },
      { q: "Is a Twitter bio the same as an X bio?", a: "Yes. Twitter became X, and the bio field works the same way. Most people still call it a Twitter bio." },
      { q: "How long can my X display name and username be?", a: "Your display name can be up to 50 characters. Your username can be up to 15, using letters, numbers and underscores." },
      { q: "Should I put my website or location in my bio?", a: "No. X has separate fields for both, so the bio can spend all 160 characters on what you do and why to follow." },
      { q: "Should I use hashtags in my X bio?", a: "Usually not. They take characters away from what you do. If you want topics in your bio, write them as plain words." },
      { q: "Will the AI make up achievements?", a: "No. It only uses what you type. If a bio would be stronger with a real number, it tells you what to add instead of inventing one." },
      { q: "Can it rewrite the bio I already have?", a: "Yes. Switch to \"Improve my current bio\", paste it in, and you'll get five rewrites that keep your facts." },
      { q: "Can it write X bios in other languages?", a: "Yes. Pick your language from the dropdown and all five bios come out in it." },
    ],
    ctas: page.ctas,
    related: [
      { slug: "linkedin-headline-generator", text: "the same pitch for LinkedIn." },
      { slug: "threads-bio-generator", text: "a warmer version for Threads." },
      { slug: "instagram-bio-generator", text: "your bio for Instagram." },
      { slug: "linkedin-post-generator", text: "turn your notes into a post." },
      { slug: "social-media-content-calendar-generator", text: "plan a month of posts in one go." },
    ],
    extraLinks: [...page.extraLinks, { text: "See all free marketing tools", href: "/tools" }],
  };
}
