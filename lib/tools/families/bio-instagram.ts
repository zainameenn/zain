import { FAIR_USE } from "../links";
import type { DemoProfile, ToolExample, ToolInput, ToolPage } from "../types";

// Instagram Bio Generator copy v2 (docs/copy/instagram-bio-generator.md), merged over the bio family page.

export const INSTAGRAM_FIELD_COPY = {
  who: { placeholder: "Sourdough bakery" },
  audience: { placeholder: "Busy families who want real bread", hint: "This one makes your bio much sharper" },
  proof: { placeholder: "Baking since 2019, 4.9 stars on Google" },
  action: { label: "What should visitors do next?", options: ["Follow", "DM me", "Tap my link", "Book", "Shop", "Nothing"], defaultValue: "Tap my link" },
  tone: { label: "Vibe" },
};

const base = (input: ToolInput): ToolInput => ({ mode: "new", current_bio: "", keywords: "", location: "", proof: "", emoji: true, line_breaks: true, language: "English", ...input });

type Example = ToolExample & { profile: DemoProfile };

const EXAMPLES: Example[] = [
  {
    inputLabel: "Local bakery",
    inputText: "sourdough bakery · busy families · Austin, TX · Tap my link · Friendly",
    input: base({ account_type: "Business", who: "Sourdough bakery", audience: "Busy families", keywords: "sourdough, bakery", location: "Austin, TX", action: "Tap my link", tone: "Friendly" }),
    output: "Sourdough baked fresh every morning in Austin 🍞\nPreorder by 9pm for tomorrow\nOrder link below 👇",
    why: "says what, where and how to buy in three short lines. The city doubles as a search keyword.",
    profile: { username: "austin.sourdough", name: "Sourdough Bakery Austin", text: "", link: "yoursite.com", badge: "Business" },
  },
  {
    inputLabel: "Fitness coach",
    inputText: "online strength coach · busy moms · free 4 week plan · DM me · Bold",
    input: base({ account_type: "Creator", who: "Online strength coach", audience: "Busy moms", proof: "Free 4 week plan", keywords: "strength coach", action: "DM me", tone: "Bold" }),
    output: "Strength training for moms with 30 minutes and zero patience 💪\nHome workouts, no guilt\nDM START for the free plan",
    why: "the audience sees themselves in line one, and the DM keyword makes replying effortless.",
    profile: { username: "maya.lifts", name: "Maya · Strength Coach", text: "", link: "yoursite.com", badge: "Creator" },
  },
  {
    inputLabel: "Online shop",
    inputText: "large felt desk mats · people who work long hours at a desk · Shop · Friendly",
    input: base({ account_type: "Business", who: "Large felt desk mats", audience: "People who work long hours at a desk", proof: "Printed to order", keywords: "desk mat", action: "Shop", tone: "Friendly" }),
    output: "Big, soft desk mats for long work days 🖥️\nPrinted to order, made to make Mondays bearable\nShop the collection below",
    why: "product first, buyer second, a little personality third. Nothing in it needs a fact check.",
    profile: { username: "softdesk.mats", name: "Felt Desk Mats", text: "", link: "yoursite.com", badge: "Business" },
  },
  {
    inputLabel: "Brand designer",
    inputText: "brand designer · coffee shops · 40 cafés branded · Book · Professional",
    input: base({ account_type: "Business", who: "Brand designer", audience: "Coffee shops", proof: "40 cafés branded", keywords: "brand designer", action: "Book", tone: "Professional" }),
    output: "Brand designer for coffee shops ☕\n40 cafés branded and counting\nBook a free intro call below",
    why: "a niche this narrow attracts exactly the right DMs, and the proof is one specific number.",
    profile: { username: "cafe.brands", name: "Cafe Brand Design", text: "", link: "yoursite.com", badge: "Business" },
  },
  {
    inputLabel: "SaaS founder",
    inputText: "building a booking app for dental clinics · founders and clinic owners · Follow · Friendly",
    input: base({ account_type: "Personal", who: "Building a booking app for dental clinics", audience: "Founders and clinic owners", action: "Follow", tone: "Friendly", emoji: false }),
    output: "Building a booking app for dental clinics\nSharing what works and what flopped along the way",
    why: "the honest second line is the reason to follow. People love a build in public story with real faceplants.",
    profile: { username: "sam.builds", name: "Sam · Founder", text: "", link: "yoursite.com", badge: "Personal" },
  },
  {
    inputLabel: "Personal",
    inputText: "film photography · personal account · Nothing · Aesthetic · emoji on",
    input: base({ account_type: "Personal", who: "Film photography", audience: "", action: "Nothing", tone: "Aesthetic", line_breaks: false }),
    output: "slow mornings, film photos, too much coffee ☁️",
    why: "personal accounts don't need a pitch. A mood in one line is plenty.",
    profile: { username: "june.on.film", name: "june", text: "", badge: "Personal" },
  },
].map((e) => ({ ...e, profile: { ...e.profile, text: e.output } }));

export function instagramPage(page: ToolPage): ToolPage {
  return {
    ...page,
    metaTitle: "Instagram Bio Generator: Free AI Bios Under 150 Characters",
    metaDescription: "Use this free Instagram bio generator to write 5 bios from your real details, see them on a live profile preview, and copy one that fits 150 characters.",
    h1: { regular: "Free AI Instagram", accent: "Bio Generator" },
    heroDescription:
      "This Instagram bio generator writes five bios from a few quick answers, then shows them on a live profile so you can see exactly how they'll look. Every bio fits Instagram's 150 characters. None of them invent achievements you don't have.",
    accessNote: FAIR_USE,
    workspace: {
      ...page.workspace,
      exampleInput: EXAMPLES[0].input,
      emptyState: "",
      dataNote: "AI can get things wrong. Read your bio before you post it, because it goes out under your name.",
      result: {
        kind: "options",
        limit: 150,
        shorter: "Make them shorter",
        funnier: "Make them funnier",
        ideas: { key: "name_ideas", limit: 30, heading: "Bonus: ideas for your Name field", helper: "Your name field is searchable, so a keyword here helps people find you." },
      },
      preview: {
        skin: "instagram",
        limit: 150,
        demo: EXAMPLES.map((e) => e.profile),
        labels: { pill: "Live preview", caption: "Illustrative profiles. Yours shows up here.", disclosure: "See it on a profile", previewButton: "Preview", theme: "Dark background" },
        live: { username: "your.username", link: "yoursite.com" },
      },
    },
    howTo: {
      heading: "How to use the Instagram bio generator",
      intro: "Using it takes about a minute. Writing a good bio from scratch takes most people an afternoon and three existential crises.",
      steps: [
        "**Pick your account type.** Creator, business or personal. A bakery and a fitness coach need different bios, and the tool writes for each one differently.",
        "**Say what you do and who it's for.** Use the words your audience would use. \"Help small businesses grow\" gets you mush. \"Fresh sourdough for busy families\" gets you a bio.",
        "**Add the extras that make it yours.** Search keywords, your city, one real proof point and the next step you want visitors to take. All optional, all worth it.",
        "**Preview, tweak, paste.** Click Preview to see each bio on a real looking profile. Pick one, copy it, then in Instagram go to your profile, tap Edit profile, and paste it into the Bio field.",
      ],
      outro: "Already have a bio? Switch to **Improve my current bio**, paste it in, and the tool rewrites it five ways while keeping your facts.",
    },
    examples: {
      heading: "Instagram bio examples for every kind of account",
      label: "Illustrative examples",
      intro: [{ p: "Here are six bios the tool wrote from the inputs shown. Click \"Use this example\" on any card to load its inputs into the form and make it your own." }],
      items: EXAMPLES,
    },
    sections: [
      {
        heading: "What to put in your Instagram bio",
        blocks: [
          { p: "Your bio has one job: tell the right stranger, in about two seconds, why they should follow you." },
          { p: "That's not much time. Visitors scroll past profiles with the attention span of Dory from Finding Nemo. So here's the formula that works for almost everyone:" },
          {
            ol: [
              "**What you do or sell,** in your audience's words.",
              "**Who it's for,** as specific as you can stand.",
              "**One real proof point,** if you have one.",
              "**One next step:** follow, DM, tap the link, book.",
            ],
          },
          { p: "**YOU DON'T NEED ALL FOUR.** Two done well beats four crammed into 150 characters like clothes in a carry on." },
        ],
      },
      {
        heading: "Your bio is one part of your profile, so use every part",
        blocks: [
          { p: "Most people pour everything into the 150 characters and ignore the rest of the profile. That's like decorating one wall and leaving the room empty. Each part has its own job:" },
          {
            table: {
              head: ["Profile part", "Its job", "Quick tip"],
              rows: [
                ["Username", "How people find and tag you", "Short, easy to spell, easy to say out loud"],
                ["Name field", "Shows in bold above your bio, and it's searchable", "Add a keyword: \"Maya · Strength Coach\""],
                ["Bio", "Gives people a reason to follow", "Use the formula above"],
                ["Links", "Sends people somewhere useful", "You can add up to 5, and the first one shows on your profile"],
                ["Category and contact buttons", "Quick trust and an easy way to reach you", "Available on business and creator accounts, and they don't use bio characters"],
                ["Highlights", "Proof, FAQs and the stuff that won't fit", "Reviews, menu, prices, behind the scenes"],
              ],
            },
          },
          { p: "Here's the trick most people miss: **because the name field, links and buttons do their own jobs, your bio is free to just be good.**" },
        ],
      },
      {
        heading: "Instagram bio ideas for every vibe",
        blocks: [
          { p: "Stuck on a style? Steal one of these fill in the blank formulas. Swap the brackets for your own details, or pick the matching vibe in the tool." },
          { h3: "Funny" },
          { ul: ["\"[What you do]. Professionally. [Funny honest admission].\"\ne.g. \"I fix bad resumes. Professionally. Mine still needs work.\"", "\"Here for [thing], stayed for [other thing].\""] },
          { h3: "Aesthetic and minimal" },
          { ul: ["\"[three small things you love], [one feeling] [one emoji]\"\ne.g. \"linen, sourdough, slow sundays 🌾\"", "\"[city] · [what you make] · [one word mood]\""] },
          { h3: "Professional" },
          { ul: ["\"[Role] for [audience] · [result or proof] · [next step]\"\ne.g. \"Bookkeeper for restaurants · Clean books every month · Book a free review\""] },
          { h3: "Short" },
          { ul: ["\"[What you do] for [who].\" That's it. Sometimes the shortest bio is the loudest.\ne.g. \"Wedding photos for couples who hate posing.\""] },
        ],
      },
      {
        heading: "Do keywords in your Instagram bio help you get found?",
        blocks: [
          { p: "Yes, they help. [Instagram's own explanation of search](https://blog.hootsuite.com/instagram-search) says the text people type is the biggest signal, and that Instagram matches it against usernames, bios, captions, hashtags and places. Its advice was to use a relevant handle and name, and to add keywords and your location to your bio." },
          { p: "So if you're a dentist in Lahore, say \"dentist\" and \"Lahore\" somewhere in your name or bio. Plain words beat clever ones here." },
          { p: "**BUT DON'T STUFF IT.** \"Dentist Lahore best dentist teeth whitening dentist\" reads like a ransom note, and nobody follows a ransom note." },
        ],
      },
      {
        heading: "Instagram bio character limit and formatting",
        blocks: [
          { p: "Instagram gives you **150 characters** for your bio. Spaces, emoji and line breaks all count, so a four line bio spends three characters just on breaks. The counter on every result shows the real total, so you'll never get the dreaded \"too long\" error." },
          { p: "A few formatting rules worth knowing:" },
          {
            ol: [
              "**Line breaks make bios scannable.** This tool keeps them when you copy, so they paste straight into Instagram.",
              "**@mentions in your bio are clickable.** Use them to point to a second account, like your shop or your team.",
              "**Hashtags in your bio are clickable too,** but they send visitors away to a page full of other people's posts. Only use your own branded hashtag, if any.",
              "**Links typed into the bio text don't work.** Put links in the Links section instead, then point to them with \"link below\".",
            ],
          },
        ],
      },
      {
        heading: "Instagram bio mistakes that cost you followers",
        blocks: [
          {
            ol: [
              "**The title stack.** \"Entrepreneur | Creator | Visionary\" tells people about as much as Jon Snow knew. Swap titles for a result: \"I help bakeries sell out before noon.\"",
              "**Writing about you instead of them.** Visitors don't care that you're \"passionate\". They care what's in it for them.",
              "**No next step.** A bio without an action is a shop window with the door painted shut.",
              "**Copying a template word for word.** \"Living my best life ✨\" is on a few million profiles. Use the formulas above as a starting point, not the finish line.",
              "**Setting it and forgetting it.** New offer, new launch, new city? Update the bio. It takes ten seconds and it's the first thing every visitor reads.",
            ],
          },
        ],
      },
    ],
    faqs: [
      { q: "Is this Instagram bio generator free?", a: `Yes. ${FAIR_USE}` },
      { q: "How many characters can an Instagram bio have?", a: "150, including spaces, emoji and line breaks. Every bio this tool writes fits, and the counter shows the exact total." },
      { q: "What should I put in my Instagram bio for a business?", a: "What you sell, who it's for, your city if you're local, one reason to trust you, and one next step. Use the contact buttons and links for everything else." },
      { q: "Will the AI make things up about me?", a: "No. It only uses what you type. If a bio would be stronger with a number or a result, it tells you what to add instead of inventing one." },
      { q: "Can I put a link in my Instagram bio?", a: "Not in the bio text itself, because typed links aren't clickable there. Add up to 5 links in the Links section of your profile, and use your bio to point to them." },
      { q: "Should I use hashtags in my Instagram bio?", a: "Usually not. They're clickable, so they pull visitors away from your profile. The exception is your own branded hashtag." },
      { q: "How do I add line breaks to my Instagram bio?", a: "Turn on line breaks in the tool, then copy your bio. The breaks paste straight into Instagram's Bio field." },
      { q: "Can it write bios in other languages?", a: "Yes. Pick your language from the dropdown and all five bios come out in it." },
      { q: "Can it improve the bio I already have?", a: "Yes. Switch to \"Improve my current bio\", paste it in, and you'll get five rewrites that keep your facts." },
    ],
    related: [
      { slug: "instagram-caption-generator", text: "write captions that match your new bio." },
      { slug: "tiktok-bio-generator", text: "say the same thing in 80 characters." },
      { slug: "threads-bio-generator", text: "a warmer version for your Threads profile." },
      { slug: "linkedin-headline-generator", text: "your bio's grown up cousin." },
      { slug: "social-media-content-calendar-generator", text: "plan a month of posts in one go." },
    ],
    extraLinks: [...page.extraLinks, { text: "See all free marketing tools", href: "/tools" }],
  };
}
