import { FAIR_USE } from "../links";
import type { DemoProfile, ToolExample, ToolInput, ToolPage } from "../types";

// Facebook Bio Generator copy v2 (docs/copy/facebook-bio-generator.md), merged over the bio family page.

export const FACEBOOK_FIELD_COPY = {
  who: { placeholder: "Family run plumbing business" },
  audience: { placeholder: "Homeowners who need a plumber they can trust", hint: "Facebook visitors often check you're legit, so say who you serve" },
  current_bio: { label: "Paste your current bio or Page intro" },
  keywords: { label: "Words people search to find you (optional)", placeholder: "plumber, emergency repairs" },
  location: { label: "Location (optional, important for local businesses)", placeholder: "Austin, TX" },
  proof: { placeholder: "25 years in business, 4.8 stars on Google" },
  action: { label: "What should visitors do next?", options: ["Follow", "Message us", "Call", "Book", "Shop", "Nothing"], defaultValue: "Message us" },
  tone: { label: "Vibe" },
};

const base = (input: ToolInput): ToolInput => ({ mode: "new", current_bio: "", keywords: "", location: "", proof: "", emoji: true, line_breaks: true, language: "English", ...input });

type Example = ToolExample & { profile: DemoProfile };

const EXAMPLES: Example[] = [
  {
    inputLabel: "Local plumber",
    inputText: "family run plumbing · homeowners · Austin, TX · Call · Professional",
    input: base({ account_type: "Business", who: "Family run plumbing business", audience: "Homeowners", location: "Austin, TX", proof: "Same day repairs", keywords: "plumber", action: "Call", tone: "Professional" }),
    output: "Family run plumbing in Austin 🔧\nSame day repairs, honest quotes",
    why: "what, where and two reasons to trust it, before anyone has to tap \"see more\".",
    profile: { username: "austinplumbing", name: "Austin Family Plumbing", text: "", badge: "Business" },
  },
  {
    inputLabel: "Yoga studio",
    inputText: "yoga studio · desk workers · Denver · Book · Friendly",
    input: base({ account_type: "Business", who: "Yoga studio for desk workers", audience: "People with stiff backs from desk jobs", location: "Denver", proof: "Free beginner class every Saturday", action: "Book", tone: "Friendly" }),
    output: "Yoga for desk workers in Denver 🧘\nFree beginner class every Saturday",
    why: "the free class lowers the risk of trying it, and the city tells locals it's for them.",
    profile: { username: "deskyogadenver", name: "Desk Yoga Denver", text: "", badge: "Business" },
  },
  {
    inputLabel: "Food creator",
    inputText: "15 minute dinners · busy parents · Follow · Friendly",
    input: base({ account_type: "Creator", who: "Quick dinner recipes", audience: "Busy parents", proof: "New recipe every Sunday", keywords: "easy dinners", action: "Follow", tone: "Friendly", emoji: false }),
    output: "15 minute dinners for busy weeknights\nNew recipe every Sunday",
    why: "a time, a reader and a schedule. People know exactly what following gets them.",
    profile: { username: "fifteenminutedinners", name: "15 Minute Dinners", text: "", badge: "Creator" },
  },
  {
    inputLabel: "Real estate agent",
    inputText: "real estate agent · first time buyers · Toronto · Message us · Professional",
    input: base({ account_type: "Business", who: "Real estate agent", audience: "First time buyers", location: "Toronto", action: "Message us", tone: "Professional", emoji: false }),
    output: "Helping first time buyers in Toronto find a place they can afford",
    why: "one line, one audience, one promise. Plain and trustworthy wins on Facebook.",
    profile: { username: "priya.homes", name: "Priya Shah Real Estate", text: "", badge: "Business" },
  },
  {
    inputLabel: "Running club",
    inputText: "running club · all paces · Leicester · Follow · Funny",
    input: base({ account_type: "Business", who: "Community running club", audience: "Runners of all paces", location: "Leicester", proof: "Runs every Tuesday at 7pm", action: "Follow", tone: "Funny" }),
    output: "Leicester's slowest fast running club 🏃\nAll paces, every Tuesday at 7",
    why: "the joke makes beginners feel welcome, and the day and time do the rest.",
    profile: { username: "leicesterrunclub", name: "Leicester Run Club", text: "", badge: "Business" },
  },
  {
    inputLabel: "Personal",
    inputText: "dad, gardening, pancakes · personal profile · Nothing · Funny",
    input: base({ account_type: "Personal", who: "Dad of two who likes gardening and cooking", audience: "", action: "Nothing", tone: "Funny", line_breaks: false }),
    output: "Dad of two. Terrible gardener. Excellent pancakes 🥞",
    why: "a personal bio doesn't need a pitch. Three honest details say plenty.",
    profile: { username: "mark.r", name: "Mark Reyes", text: "", badge: "Personal" },
  },
].map((e) => ({ ...e, profile: { ...e.profile, text: e.output } }));

export function facebookPage(page: ToolPage): ToolPage {
  return {
    ...page,
    metaTitle: "Facebook Bio Generator: Free AI Bios for Profiles and Pages",
    metaDescription: "Use this free Facebook bio generator to write 5 short bios for your profile or Page, see them in a live Intro preview, and copy one that fits.",
    h1: { regular: "Free AI Facebook", accent: "Bio Generator" },
    heroDescription:
      "This Facebook bio generator writes five short bios for your profile or Page, then shows them in a live Intro box so you can see how they read. Every bio stays under 101 characters, and none of them claim things you can't back up.",
    accessNote: FAIR_USE,
    workspace: {
      ...page.workspace,
      exampleInput: EXAMPLES[0].input,
      emptyState: "",
      dataNote: "AI can get things wrong. Read your bio before you post it, because your Facebook Intro is always public.",
      result: { kind: "options", limit: 101, shorter: "Make them shorter", funnier: "Make them funnier" },
      preview: {
        skin: "facebook",
        limit: 101,
        demo: EXAMPLES.map((e) => e.profile),
        labels: { pill: "Live preview", caption: "Illustrative profiles. Yours shows up here.", disclosure: "See it on a profile", previewButton: "Preview", theme: "Dark background" },
        live: { username: "yourpage", link: "yoursite.com" },
      },
    },
    howTo: {
      heading: "How to use the Facebook bio generator",
      intro: "It takes about a minute, which is roughly how long most people stare at the Intro box before typing \"Just living life\".",
      steps: [
        "**Pick the account type.** Business, creator or personal. A plumber's Page and a personal profile need very different bios.",
        "**Say what you do and who it's for.** Facebook visitors often arrive checking whether you're real and local, so be specific: \"plumbing in Austin\" beats \"home services\".",
        "**Add your city and one real proof point.** Years in business, a review score, a free class. One fact earns more trust than three adjectives.",
        "**Preview, copy, paste.** Click Preview to see each bio in an Intro box. Pick one, copy it, then on Facebook go to the Intro section under your profile picture and edit your bio.",
      ],
      outro: "Already have a bio or Page intro? Switch to **Improve my current bio**, paste it in, and get five tighter versions that keep your facts.",
    },
    examples: {
      heading: "Facebook bio examples for profiles and Pages",
      label: "Illustrative examples",
      intro: [{ p: "Six bios the tool wrote from the inputs shown. Click \"Use this example\" to load the inputs, then make it yours." }],
      items: EXAMPLES,
    },
    sections: [
      {
        heading: "What to put in your Facebook bio",
        blocks: [
          { p: "Facebook bios get read in a very specific moment: someone found you in a group, a comment or a search, and they're deciding whether you're legit. The bio's job is to settle that in one glance." },
          { p: "So the order matters:" },
          {
            ol: [
              "**What you do, in plain words.** \"Family run plumbing\", not \"solutions for your home\".",
              "**Where, if you're local.** A city name tells nearby people you're for them.",
              "**One reason to trust you.** A real number, a free first visit, a promise you keep.",
              "**What to do next,** if there's room. Facebook has buttons for messaging and calling, so this can be short.",
            ],
          },
          { p: "Calling yourself \"Best plumber in town\" is the bio version of Michael Scott's \"World's Best Boss\" mug. He bought it himself, and everyone could tell. Let the reviews say it." },
        ],
      },
      {
        heading: "Profile or Page: where everything else goes",
        blocks: [
          { p: "The bio is only one part of your profile. Facebook gives other details their own fields, and using them keeps the bio short and clean." },
          {
            table: {
              head: ["Profile part", "What it's for", "Quick tip"],
              rows: [
                ["Bio (in the Intro section)", "A short description of you or your Page", "What you do, for whom, and where"],
                ["Links", "Links to your websites", "Your shop, booking page or menu goes here, not in the bio"],
                ["Contact info", "Ways people can reach you, like phone, email and social links", "Fill it in, so the bio doesn't have to list a phone number"],
                ["Category (Pages)", "Shows below your Page name in search", "Pick the category your customers would search for"],
              ],
            },
          },
          { p: "Meta's help pages describe the [Intro as \"a bio or brief description of yourself or your Page\"](https://www.facebook.com/help/1090724464274188) and list Links, Contact info and [Category](https://www.facebook.com/help/222732947737668) as separate details. The short version: **THE BIO SAYS WHO YOU ARE, THE OTHER FIELDS SAY HOW TO REACH YOU.**" },
        ],
      },
      {
        heading: "Facebook bio ideas you can steal",
        blocks: [
          { p: "Fill in the brackets with your own details, or pick the matching vibe in the tool." },
          { h3: "Local business" },
          { ul: ["\"[Service] in [city]. [One trust fact].\"\ne.g. \"Dog grooming in Bristol. Calm, cage free, 9 years running.\"", "\"[City]'s [specific thing]. [When or how to visit].\""] },
          { h3: "Creator" },
          { ul: ["\"[What you post] for [who]. New [thing] every [day].\"\ne.g. \"Budget travel tips for families. New trip guide every Friday.\""] },
          { h3: "Personal" },
          { ul: ["\"[Role in life]. [Hobby you're bad at]. [Thing you're good at].\"\ne.g. \"Nurse. Bad at chess. Great at lasagna.\""] },
          { h3: "Funny" },
          { ul: ["\"[Job], professionally. [Honest twist], unprofessionally.\"\ne.g. \"Accountant, professionally. Karaoke legend, unprofessionally.\""] },
        ],
      },
      {
        heading: "Facebook bio length, privacy and formatting",
        blocks: [
          { p: "Most guides put the Facebook profile bio limit at **101 characters**, and every bio this tool writes stays under that, counting spaces, emoji and line breaks. That length also works for a Page intro, so you can use the same text on both." },
          { p: "A few things worth knowing before you paste:" },
          {
            ol: [
              "**Your Intro is always public.** Meta says the information in the Intro section of your profile is always public, so leave out anything you wouldn't pin to a community noticeboard.",
              "**Put links in the Links field.** A website, booking page or Instagram link belongs in Links or Contact info, where people can tap it.",
              "**Short beats complete.** One clear line is easier to read on a phone than three crammed ones.",
              "**Emoji are optional.** One that replaces a word, like 🔧 for a plumber, is plenty.",
            ],
          },
        ],
      },
      {
        heading: "Facebook bio mistakes that make people scroll past",
        blocks: [
          {
            ol: [
              "**A bio that could belong to anyone.** \"Living my best life\" tells a visitor nothing. Add one real detail.",
              "**Phone numbers and opening hours in the bio.** They have their own fields, and they eat your characters.",
              "**Business jargon.** \"Full service solutions provider\" makes people work to understand you. They won't.",
              "**Claims you can't back up.** \"Best\", \"#1\" and \"cheapest\" invite comparison, and someone always checks.",
              "**Forgetting the Page and profile are different.** If you run a business Page, write the Page bio for customers and keep your personal bio personal.",
            ],
          },
        ],
      },
    ],
    faqs: [
      { q: "Is this Facebook bio generator free?", a: `Yes. ${FAIR_USE}` },
      { q: "How many characters can a Facebook bio have?", a: "Most guides put the profile bio limit at 101 characters. Every bio this tool writes stays under that, and the counter shows the exact total." },
      { q: "Who can see my Facebook bio?", a: "Everyone. Meta says the information in the Intro section of your profile is always public, so only write what you're happy for anyone to read." },
      { q: "Where do I find my bio on Facebook?", a: "In the Intro section of your profile, below your profile picture. Edit it there and paste in your new bio." },
      { q: "Can I put a link in my Facebook bio?", a: "Use the Links and Contact info fields instead. They're built for websites, phone numbers and social links, so the bio can stay short." },
      { q: "Is a Page bio different from a profile bio?", a: "Pages also have an Intro, plus a category that shows under the Page name in search. Write the Page bio for customers and keep your personal bio personal." },
      { q: "What should a local business put in its Facebook bio?", a: "What you do, the city or area you serve, and one reason to trust you. Use the contact fields for the phone number and the Links field for your website." },
      { q: "Will the AI make things up about me?", a: "No. It only uses what you type. If a bio would be stronger with a real number or result, it tells you what to add." },
      { q: "Can it write my bio in another language?", a: "Yes. Pick a language from the dropdown and all five bios come out in it." },
    ],
    ctas: page.ctas,
    related: [
      { slug: "facebook-caption-generator", text: "posts that match your new bio." },
      { slug: "instagram-bio-generator", text: "the same idea for Instagram." },
      { slug: "threads-bio-generator", text: "a chattier version for Threads." },
      { slug: "linkedin-headline-generator", text: "the professional cousin of your bio." },
      { slug: "social-media-content-calendar-generator", text: "plan a month of posts in one go." },
    ],
    extraLinks: [...page.extraLinks, { text: "See all free marketing tools", href: "/tools" }],
  };
}
