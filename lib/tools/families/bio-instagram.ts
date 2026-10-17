import { FAIR_USE, LINK_SOCIAL_MEDIA_SERVICE } from "../links";
import type { BrandExample, StudioContent, ToolField, ToolInput, ToolPage } from "../types";
import { BIO_LANGUAGES } from "./common";

// Instagram Bio Generator v3: the redesigned studio page. Copy and design brief: docs/copy/instagram-bio-generator.md.
// The form is short on purpose: three essentials, two style choices, two formatting choices, and the rest tucked away.

export const INSTAGRAM_CATEGORIES = [
  "Personal / Lifestyle",
  "Digital Creator",
  "Small Business",
  "Ecommerce Store",
  "Fashion & Beauty",
  "Fitness & Wellness",
  "Food & Restaurants",
  "Photography",
  "Travel",
  "Technology",
  "Gaming",
  "Education",
  "Marketing",
  "Independent Professional",
  "Coach / Consultant",
  "Real Estate",
  "Other",
];

const NEW = { field: "mode", equals: "new" };
const IMPROVE = { field: "mode", equals: "improve" };

export const INSTAGRAM_FIELDS: ToolField[] = [
  {
    name: "mode",
    label: "What do you want to do?",
    type: "mode",
    options: [
      { value: "new", label: "Create a bio" },
      { value: "improve", label: "Improve my bio" },
    ],
    defaultValue: "new",
  },
  { name: "account_type", label: "What type of account is this?", type: "segmented", options: ["Personal", "Creator", "Business"], defaultValue: "Business", required: true, when: NEW, group: "essentials" },
  { name: "category", label: "What is your account about?", type: "combobox", options: INSTAGRAM_CATEGORIES, placeholder: "Search or type your niche", required: true, maxLength: 80, otherLabel: "Other", when: NEW, group: "essentials" },
  {
    name: "about",
    label: "Tell us a little about your account",
    type: "text",
    placeholder: "Handmade candles for cozy homes",
    hint: "Optional, but a few specific words make your bios much more personal.",
    maxLength: 160,
    when: NEW,
    group: "essentials",
  },
  {
    name: "current_bio",
    label: "Paste your current Instagram bio",
    type: "textarea",
    placeholder: "Entrepreneur | Dreamer | Coffee lover",
    hint: "We'll keep your information and rewrite it in five different styles.",
    required: true,
    maxLength: 500,
    when: IMPROVE,
    group: "essentials",
  },
  { name: "tone", label: "Tone", type: "select", options: ["Friendly", "Professional", "Minimal", "Funny", "Bold", "Aesthetic"], defaultValue: "Friendly", group: "style" },
  {
    name: "goal",
    label: "Main goal",
    type: "select",
    options: ["Get more followers", "Visit my website", "Shop my products", "Send me a DM", "Book a service", "View my portfolio", "Contact me", "No CTA"],
    defaultValue: "Get more followers",
    group: "style",
  },
  { name: "emoji", label: "Emojis", type: "segmented", options: ["None", "Subtle", "Expressive"], defaultValue: "Subtle", group: "format" },
  { name: "format", label: "Formatting", type: "segmented", options: ["Single line", "Multiple lines"], defaultValue: "Multiple lines", group: "format" },
  { name: "location", label: "Location", type: "text", placeholder: "Austin, TX", maxLength: 80, group: "advanced" },
  { name: "keywords", label: "Keywords people search for", type: "text", placeholder: "sourdough, bakery", maxLength: 120, group: "advanced" },
  { name: "audience", label: "Who is it for?", type: "text", placeholder: "Busy families who want real bread", maxLength: 160, group: "advanced" },
  { name: "proof", label: "Real achievements or credentials", type: "text", placeholder: "Baking since 2019, 4.9 stars on Google", hint: "Only add things that are true. The tool never makes them up.", maxLength: 160, group: "advanced" },
  { name: "language", label: "Language", type: "select", options: BIO_LANGUAGES, defaultValue: "English", group: "advanced" },
];

const EXAMPLE_INPUT: ToolInput = {
  mode: "new",
  account_type: "Business",
  category: "Food & Restaurants",
  about: "Sourdough bakery with next day preorders",
  current_bio: "",
  tone: "Friendly",
  goal: "Shop my products",
  emoji: "Subtle",
  format: "Multiple lines",
  location: "Austin, TX",
  keywords: "sourdough",
  audience: "Busy families",
  proof: "",
  language: "English",
};

const CHECKED = "October 17, 2026";
const logo = (file: string, alt: string) => ({ src: `/assets/tools/instagram-bio/brands/${file}.svg`, alt, width: 64, height: 64 });

/**
 * Real brand profiles. Each bio was read from the brand's verified Instagram profile on the date in CHECKED.
 * Bios change often (Canva's and Duolingo's are seasonal), so recheck them before relying on the wording.
 * Logos: Wikimedia files marked public domain (trademarks of their owners, shown only to identify each account).
 */
export const BRAND_EXAMPLES: BrandExample[] = [
  {
    brand: "NVIDIA",
    handle: "nvidia",
    url: "https://www.instagram.com/nvidia/",
    logo: logo("nvidia", "NVIDIA logo"),
    bio: "NVIDIA pioneered accelerated computing to tackle challenges no one else can solve. Our work is transforming the world's industries.",
    checked: CHECKED,
    style: "Brand-focused",
    why: "It names the category it owns, accelerated computing, in the first few words, so there's no doubt what NVIDIA does.",
    lesson: "Say your niche early, in plain words. If you do one thing, lead with that thing.",
  },
  {
    brand: "Apple",
    handle: "apple",
    url: "https://www.instagram.com/apple/",
    logo: logo("apple", "Apple logo"),
    bio: "Everyone has a story to tell.\n#ShotoniPhone",
    checked: CHECKED,
    style: "Action-focused",
    why: "The first line sets up the feed, and the branded hashtag gives people one simple way to join in with their own photos.",
    lesson: "If you want people to share or tag you, give them one easy way to do it, like a hashtag that's only yours.",
  },
  {
    brand: "Nike",
    handle: "nike",
    url: "https://www.instagram.com/nike/",
    logo: logo("nike", "Nike logo"),
    bio: "Just Do It.",
    checked: CHECKED,
    style: "Minimal",
    why: "Three words almost everyone already knows. The bio is the slogan, so it reinforces the brand instead of explaining it.",
    lesson: "Short works when the line is memorable and truly yours. A smaller account should pair it with what it actually does.",
  },
  {
    brand: "Netflix",
    handle: "netflix",
    url: "https://www.instagram.com/netflix/",
    logo: logo("netflix", "Netflix logo"),
    bio: "",
    checked: CHECKED,
    style: "Minimal",
    why: "Netflix currently leaves its bio empty and lets the name and the posts do the talking.",
    lesson: "That only works with near universal recognition. Everyone else needs a bio that says why to follow.",
  },
  {
    brand: "Canva",
    handle: "canva",
    url: "https://www.instagram.com/canva/",
    logo: logo("canva", "Canva logo"),
    bio: "We’re so back #CanvaWorldTour",
    checked: CHECKED,
    style: "Personality",
    why: "It sounds like a friend, not a press release, and it's tied to what the brand is doing right now.",
    lesson: "Your bio can change with your moment. Update it for a launch or an event, then switch it back.",
  },
  {
    brand: "Duolingo",
    handle: "duolingo",
    url: "https://www.instagram.com/duolingo/",
    logo: logo("duolingo", "Duolingo logo"),
    bio: "educated girl autumn 🎃🦉",
    checked: CHECKED,
    style: "Personality",
    why: "All lowercase, a seasonal joke and the owl. It matches the playful voice Duolingo uses everywhere else.",
    lesson: "Personality pays off when it's consistent. Pick a voice and keep it the same in your bio, captions and replies.",
  },
];

const STUDIO: StudioContent = {
  lede: "This Instagram bio generator writes bios that sound like you, fit the 150 character limit, and give people a reason to follow.",
  sub: "Choose your style, tell us what your account is about, and get five bios ready to copy.",
  trust: `Free to use, no signup required. ${FAIR_USE.replace("Free to use. ", "")}`,
  sections: [
    {
      kind: "steps",
      heading: "How to use the Instagram bio generator",
      intro: "About thirty seconds from start to finish. Here's the whole thing.",
      image: { src: "/assets/tools/instagram-bio/how-it-works-steps.webp", alt: "Five steps of the Instagram bio generator: pick an account type, choose a style, add a few details, compare the bios on a preview, then copy one to Instagram", width: 1400, height: 788 },
      steps: [
        { title: "Pick your account type", text: "Personal, creator or business. Each one gets a different kind of bio." },
        { title: "Say what it's about", text: "Pick a category, or type your own niche if none of them fit." },
        { title: "Add a few details", text: "One short line about your account makes the bios far more personal. Everything else is optional." },
        { title: "Compare five bios", text: "Each takes a different angle. Click Preview on any of them to see it on the profile." },
        { title: "Copy it to Instagram", text: "Copying keeps your line breaks and emoji. In Instagram, tap Edit profile and paste it into Bio." },
      ],
    },
    {
      kind: "gallery",
      heading: "6 Instagram bios worth learning from",
      intro: "See how well known brands introduce themselves, show their personality, and make every character count.",
      note: `Big brands can lean on name recognition, so copy the habits, not the brevity. Bios as shown on each brand's official Instagram profile on ${CHECKED}, and they may have changed since. Logos are trademarks of their owners, shown only to identify each account.`,
      items: BRAND_EXAMPLES,
    },
    {
      kind: "anatomy",
      heading: "What makes a good Instagram bio",
      intro: "A good bio answers one question fast: why should I follow? Here's what each part of a profile does.",
      image: { src: "/assets/tools/instagram-bio/bio-anatomy.webp", alt: "An Instagram profile surrounded by the parts of a strong bio: a clear niche, proof, personality, keywords, a call to action and a link", width: 1400, height: 1050 },
      profile: { username: "austin.sourdough", name: "Rosa · Sourdough Bakery Austin", category: "Bakery", link: "yourbakery.com" },
      lines: [
        { text: "Sourdough baked fresh every morning 🍞", part: "value" },
        { text: "Real bread for busy Austin families", part: "keywords" },
        { text: "Still warm at 8, usually gone by noon", part: "personality" },
        { text: "Preorder below 👇", part: "cta" },
      ],
      parts: [
        { key: "name", label: "Profile name", text: "Shows in bold above your bio and it's searchable, so a plain keyword next to your name helps people find you." },
        { key: "value", label: "Niche or value", text: "What you do or sell, in the words your audience would use. This line does most of the work." },
        { key: "keywords", label: "Keywords", text: "The words people actually search, like \"sourdough\" and \"Austin\". Once each, never as a list." },
        { key: "personality", label: "Personality", text: "One human detail, so you sound like a person instead of a brochure." },
        { key: "cta", label: "Call to action", text: "One next step. Pick the one that matters most and point to it." },
        { key: "link", label: "Profile link", text: "Links live in their own section below the bio. The bio just points to them." },
      ],
    },
    {
      kind: "compare",
      heading: "Before and after: fixing a weak Instagram bio",
      intro: "Most weak bios aren't badly written. They just don't say anything a stranger can use.",
      image: { src: "/assets/tools/instagram-bio/bio-before-after.webp", alt: "A dull, unclear Instagram profile turning into a clear, polished one with a strong bio, highlights and a link", width: 1400, height: 788 },
      before: "Entrepreneur | Dreamer | Coffee lover ☕✨\nLiving my best life 🌸\nDM for collabs 💌",
      after: "Handmade candles for cozy homes 🕯️\nSmall batches, poured in Portland\nShop the autumn scents below",
      changes: [
        "Three job titles became one clear line about what the account sells.",
        "A mood line became a concrete detail people can picture.",
        "A vague DM ask became one next step that matches the goal.",
      ],
    },
    {
      kind: "styles",
      heading: "Instagram bio ideas for every style",
      intro: "Six short, genuinely different approaches. Pick the one that sounds like you, then choose the matching tone in the tool.",
      image: { src: "/assets/tools/instagram-bio/notes-to-profile.webp", alt: "Rough notes turning into a finished Instagram profile, with tone and emoji choices and line formatting options", width: 1122, height: 1402 },
      styles: [
        { name: "Minimal", bio: "Ceramics for slow mornings.", note: "Four words, one clear idea. Works when the grid does the talking." },
        { name: "Professional", bio: "Bookkeeper for restaurants · Clean books every month · Book a free review", note: "Role, audience and offer, separated so each part is easy to scan." },
        { name: "Funny", bio: "I fix bad resumes. Professionally. Mine still needs work.", note: "One honest joke that still tells you exactly what the account does." },
        { name: "Creator", bio: "Ten minute dinners for tired weeknights 🍝\nNew recipe every Sunday", note: "What you post and how often, so people know what following gets them." },
        { name: "Business", bio: "Same day phone repairs in Leeds\nWalk in, or book a slot below", note: "Service, place and the easiest next step. Nothing to decode." },
        { name: "Aesthetic", bio: "linen, sourdough, slow sundays 🌾", note: "A mood in a few soft words. Best for personal accounts." },
      ],
      formats: [
        { label: "Single line, no emoji", bio: "Wedding photos for couples who hate posing. Now booking spring dates." },
        { label: "Multiple lines, subtle emoji", bio: "Wedding photos for couples who hate posing 📷\nRelaxed, outdoor, a little windswept\nNow booking spring dates" },
        { label: "Multiple lines, expressive emoji", bio: "📷 Wedding photos for couples who hate posing\n🌿 Relaxed, outdoor, a little windswept\n💌 Spring dates open, link below" },
      ],
    },
    {
      kind: "practices",
      heading: "Instagram bio best practices",
      intro: "The short version of what's worth knowing before you paste.",
      items: [
        { title: "150 characters, and everything counts", text: "Spaces, emoji and line breaks all count toward Instagram's 150 character limit. The counter on every result counts emoji the way they actually display." },
        { title: "Line breaks help, up to a point", text: "Two to four short lines are easy to scan. Copy from the tool and the breaks paste straight into Instagram's Bio field." },
        { title: "Emoji should earn their place", text: "Use one that replaces a word or marks a line. A row of five is decoration, not information." },
        { title: "Plain keywords help people find you", text: "Instagram has said search matches what people type against [usernames, bios, captions, hashtags and places](https://about.instagram.com/blog/announcements/break-down-how-instagram-search-works). Use the words people actually search, once and naturally. It helps discovery, but it doesn't guarantee followers." },
        { title: "Links belong in the Links section", text: "Links typed into the bio aren't clickable. Instagram lets you add [up to 5 links](https://help.instagram.com/362497417173378) in their own section, so the bio can just say \"link below\"." },
        { title: "Mistakes worth skipping", text: "Job title stacks, borrowed quotes, walls of hashtags, and a bio that's two launches out of date." },
      ],
    },
    { kind: "faq", heading: "Frequently asked questions" },
    {
      kind: "related",
      heading: "More free tools for your social profiles",
      tools: [
        { slug: "instagram-caption-generator", text: "Write captions that match your new bio.", icon: "caption" },
        { slug: "tiktok-bio-generator", text: "Say the same thing in 80 characters.", icon: "bio" },
        { slug: "threads-bio-generator", text: "A warmer, chattier bio for Threads.", icon: "chat" },
        { slug: "twitter-bio-generator", text: "A sharper 160 character bio for X.", icon: "x" },
      ],
    },
    {
      kind: "cta",
      heading: "A better bio is a start.",
      accent: "Let's fix the rest of your social presence.",
      copy: "I help SaaS and service businesses turn content, profiles and organic social into real growth.",
      button: "Explore social media marketing",
      href: LINK_SOCIAL_MEDIA_SERVICE ?? "/services",
    },
  ],
};

export function instagramPage(page: ToolPage): ToolPage {
  return {
    ...page,
    metaTitle: "Instagram Bio Generator: Free AI Bios Under 150 Characters",
    metaDescription: "Use this free Instagram bio generator to write 5 bios from a few quick answers, preview them on a profile, and copy one that fits 150 characters.",
    h1: { regular: "Free Instagram", accent: "Bio Generator" },
    heroDescription: STUDIO.lede,
    accessNote: STUDIO.trust,
    workspace: {
      ...page.workspace,
      fields: INSTAGRAM_FIELDS,
      button: "Generate 5 bios",
      secondary: "Try an example",
      exampleInput: EXAMPLE_INPUT,
      resultsHeading: "Your Instagram bios",
      emptyState: "",
      more: "Try another style",
      dataNote: "AI can get things wrong. Read your bio before you post it, because it goes out under your name.",
      result: {
        kind: "options",
        limit: 150,
        shorter: "Make them shorter",
        ideas: { key: "name_ideas", limit: 30, heading: "Ideas for your name field", helper: "Your name field is searchable, so a keyword here helps people find you." },
      },
      preview: undefined,
    },
    examples: { heading: "", items: [] },
    sections: [],
    faqs: [
      { q: "Is this Instagram bio generator free?", a: "Yes. It's free to use and there's no signup. Fair use limits apply." },
      { q: "How many characters can an Instagram bio have?", a: "150, including spaces, emoji and line breaks. Every bio this tool writes fits, and the counter shows the exact total." },
      { q: "What should I put in my Instagram bio for a business?", a: "What you sell, who it's for, your city if you're local, one reason to trust you, and one next step. Use the contact buttons and links for everything else." },
      { q: "What if I don't fill in any details?", a: "You'll still get five usable bios for your category. They'll be more general, because the tool never invents facts about you, so add a short line about your account for more personal results." },
      { q: "Will the AI make things up about me?", a: "No. It only uses what you type. If a bio would be stronger with a real number or result, it suggests what to add instead of inventing one." },
      { q: "Can I put a link in my Instagram bio?", a: "Not in the bio text itself, because typed links aren't clickable there. Add up to 5 links in the Links section of your profile, and use your bio to point to them." },
      { q: "How do I add line breaks to my Instagram bio?", a: "Choose Multiple lines in the formatting options, then copy your bio. The breaks paste straight into Instagram's Bio field." },
      { q: "Can it write bios in other languages?", a: "Yes. Open \"More ways to personalize\", pick your language, and all five bios come out in it." },
      { q: "Can it improve the bio I already have?", a: "Yes. Switch to Improve my bio, paste it in, and you'll get five rewrites that keep your facts, shown next to your original so you can compare." },
    ],
    related: [],
    extraLinks: [],
    api: { block: "instagram-bio", vars: { name_field_limit: "30" } },
    studio: STUDIO,
  };
}
