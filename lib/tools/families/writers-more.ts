import type { ToolField, ToolPage } from "../types";
import { studioFields, studioWriterPage, writerStudio } from "./studio-writer";

// Etsy titles, product descriptions and three LinkedIn tools on the shared studio.
// Each keeps its existing prompt, FAQs and meta copy; the form, preview and page sections are new.

const DISPLAY_NAME: ToolField = { name: "display_name", label: "Your name", type: "text", placeholder: "Maya Ortiz", hint: "Shows on the preview only.", maxLength: 60, group: "advanced" };
const SHOP_NAME: ToolField = { name: "name", label: "Shop name", type: "text", placeholder: "SoftDeskCo", hint: "Shows on the preview only.", maxLength: 60, group: "advanced" };

const limitOf = (page: ToolPage, fallback: number) => {
  const r = page.workspace.result;
  return r.kind === "options" && typeof r.limit === "number" ? r.limit : "limit" in r && typeof r.limit === "number" ? r.limit : fallback;
};

export function etsyTitlePage(page: ToolPage): ToolPage {
  const studio = writerStudio(
    {
      tool: "Etsy title generator",
      noun: "Etsy title",
      steps: [
        ["Describe the item", "Say what it is in plain words, then add the traits buyers filter by: color, material, size, style."],
        ["Add the search phrase", "The phrase buyers type goes first. Paste your current title to see a before and after."],
        ["Tweak and copy", "See your title on an Etsy listing, see what changed and why, then ask for a fresh take or a small change."],
      ],
      compare: {
        intro: "Most weak Etsy titles are a pile of repeated keywords. Buyers, and Etsy's own guidance, prefer a clear description.",
        before: "Desk Mat Large Mouse Pad Gaming Desk Mat Office Gift Desk Pad XXL Desk Mat",
        after: "Large Felt Desk Mat, Black, 90 x 40 cm, Non Slip Mouse Pad",
        changes: ["Four repeats of \"desk mat\" became one, at the start.", "Real traits buyers filter by: size, color, material.", "Short enough to read on a phone search result."],
      },
      styles: {
        intro: "Three title shapes that work for most listings.",
        items: [
          { name: "Product first", when: "For most listings.", text: "Large Felt Desk Mat, Black, 90 x 40 cm", why: "What it is, then the traits buyers check.", settings: {} },
          { name: "Gift", when: "When the occasion is part of the product.", text: "Personalized Teacher Gift Mug, Custom Name, 11 oz", why: "The occasion belongs in the title only when the product is made for it.", settings: {} },
          { name: "Design led", when: "For prints, art and patterned items.", text: "Mountain Line Art Desk Mat, Minimal Felt Mouse Pad", why: "The design is what people search, so it leads.", settings: {} },
        ],
      },
      practices: [
        { title: "Say what it is first", text: "The first few words should name the item, the way a buyer would search for it.", good: "Large Felt Desk Mat", bad: "Gorgeous Cozy Aesthetic Must Have" },
        { title: "Describe, don't repeat", text: "One mention of each phrase is enough. Use tags and attributes for the rest.", good: "Desk Mat, Black Felt", bad: "Desk Mat Desk Pad Desk Mat" },
        { title: "Use real traits", text: "Size, color and material help buyers pick the right listing.", good: "90 x 40 cm, black felt" },
        { title: "Keep it readable", text: "Short, comma separated phrases read better in search results." },
        { title: "Only claim what's true", text: "Never add materials, sizes or occasions the item doesn't have." },
        { title: "Stay within 140 characters", text: "That's Etsy's title limit. Shorter titles are easier to scan.", count: 58 },
      ],
      related: [
        { slug: "product-description-generator", text: "A description for the same listing." },
        { slug: "pinterest-title-generator", text: "Pin titles for your products." },
        { slug: "instagram-caption-generator", text: "Captions to promote your shop." },
        { slug: "seo-title-generator", text: "Titles for your own website." },
      ],
      cta: "seo",
    },
    "This Etsy title generator turns your item details into a clear listing title that puts the search phrase first and describe the item the way buyers search.",
    "Describe the item, add the phrase buyers type, and see your title on an Etsy listing before you copy it.",
  );
  return studioWriterPage(
    { ...page, heroDescription: studio.lede },
    {
      platform: "Etsy",
      noun: "title",
      skin: "etsy",
      fields: studioFields(page.workspace.fields, [SHOP_NAME]),
      button: "Generate my title",
      limit: limitOf(page, 140),
      example: { ...page.workspace.exampleInput, name: "SoftDeskCo" },
      dataNote: "AI can get things wrong. Check every trait in the title matches your item.",
    },
    studio,
  );
}

export function productDescriptionPage(page: ToolPage): ToolPage {
  const studio = writerStudio(
    {
      tool: "product description generator",
      noun: "product description",
      steps: [
        ["Add the product and specs", "Name it, list the specs one per line, and say who buys it."],
        ["Pick the channel and tone", "Etsy, Shopify, Amazon or your own site, written in the tone that fits your brand."],
        ["Copy what you need", "You get a description, bullet points and buyer FAQs, each ready to copy."],
      ],
      compare: {
        intro: "Most weak product descriptions repeat the title with adjectives. A good one answers the buyer's questions.",
        before: "This amazing desk mat is perfect for everyone! High quality and great value. Buy now!",
        after: "A large felt desk mat that covers your keyboard, mouse and notebook in one calm surface.\n\n• 90 x 40 cm, 4 mm felt\n• Non slip rubber base\n• Printed to order, ships in 3 to 5 days",
        changes: ["Adjectives became what the product actually does.", "Specs moved into scannable bullet points.", "Real shipping details replaced \"buy now\"."],
      },
      styles: {
        intro: "Three tones for different brands.",
        items: [
          { name: "Friendly", when: "For handmade and small brands.", text: "Your desk deserves a soft landing. This felt mat covers keyboard, mouse and coffee in one calm surface.", why: "Warm and human, still specific.", settings: { tone: "Friendly" } },
          { name: "Premium", when: "For higher priced products.", text: "Dense 4 mm felt over a non slip rubber base. Cut to 90 x 40 cm and printed to order.", why: "Materials and craft carry the value.", settings: { tone: "Premium" } },
          { name: "Straightforward", when: "For marketplaces like Amazon.", text: "Large desk mat, 90 x 40 cm. Felt top, non slip base. Fits keyboard and mouse.", why: "Fast to scan, nothing extra.", settings: { tone: "Straightforward" } },
        ],
      },
      practices: [
        { title: "Lead with what it does", text: "The first sentence should tell buyers why they'd want it.", good: "Covers keyboard, mouse and notebook", bad: "Amazing high quality product" },
        { title: "Use bullets for specs", text: "Buyers scan for size, material and care. Put them in a list." },
        { title: "Answer buyer questions", text: "Shipping time, care and fit questions belong in the description or FAQs." },
        { title: "Write for the channel", text: "Amazon wants scannable facts; your own site can tell more of a story." },
        { title: "Never invent claims", text: "Only use specs and selling points you've confirmed. The tool won't add any." },
        { title: "Keep it tight", text: "Most good descriptions are a short paragraph plus bullets.", count: 380 },
      ],
      related: [
        { slug: "etsy-title-generator", text: "A title for the same listing." },
        { slug: "pinterest-description-generator", text: "Pin descriptions for your products." },
        { slug: "meta-description-generator", text: "A meta description for your product page." },
        { slug: "instagram-caption-generator", text: "Captions to promote the product." },
      ],
      cta: "seo",
    },
    "This product description generator turns your specs into a clear description, scannable bullet points and buyer FAQs, written for the channel you sell on.",
    "Add your product and specs, pick a tone, and see the description on a product page before you copy it.",
  );
  return studioWriterPage(
    { ...page, heroDescription: studio.lede },
    {
      platform: "Product page",
      noun: "description",
      skin: "product",
      fields: studioFields(page.workspace.fields),
      button: "Generate description",
      limit: 2000,
      example: page.workspace.exampleInput,
      dataNote: "AI can get things wrong. Check every spec and claim before you publish.",
    },
    studio,
  );
}

export function linkedinHeadlinePage(page: ToolPage): ToolPage {
  const studio = writerStudio(
    {
      tool: "LinkedIn headline generator",
      noun: "LinkedIn headline",
      steps: [
        ["Say what you do and for whom", "Your role, who you help, and what they get."],
        ["Pick your goal and tone", "Clients, a job, an audience or investors. Add real proof if you have it."],
        ["Tweak and copy", "See your headline on a LinkedIn profile and what shows in search and comments, then ask for a fresh take or a small change."],
      ],
      compare: {
        intro: "Most weak headlines are a job title and a list of buzzwords. A good one says who you help and how.",
        before: "Marketing | Growth | SEO | AI | Coffee lover",
        after: "Growth marketer for B2B SaaS · More demo calls from SEO and Reddit",
        changes: ["Five labels became one clear role.", "It names who you help: B2B SaaS.", "It says the outcome, which is why people click."],
      },
      styles: {
        intro: "Three headline shapes for different goals.",
        items: [
          { name: "Clear", when: "For getting clients.", text: "Growth marketer for B2B SaaS · More demo calls from SEO and Reddit", why: "Role, audience and outcome.", settings: { tone: "Clear", goal: "Get clients" } },
          { name: "Bold", when: "For building an audience.", text: "I help SaaS founders stop guessing where growth comes from", why: "A strong promise in plain words.", settings: { tone: "Bold", goal: "Build an audience" } },
          { name: "Job search", when: "For getting hired.", text: "Senior Growth Marketer · B2B SaaS · Grew signups from 0 to 2,000", why: "Searchable title first, then real proof.", settings: { tone: "Clear", goal: "Get hired" } },
        ],
      },
      practices: [
        { title: "Front load the important words", text: "Only the start of your headline shows next to comments and in search.", good: "Growth marketer for B2B SaaS", bad: "Passionate storyteller and lifelong learner" },
        { title: "Name who you help", text: "\"For B2B SaaS\" tells the right people they're in the right place." },
        { title: "Say the outcome", text: "What do people get from working with you?", good: "More demo calls from SEO" },
        { title: "Use searchable words", text: "Recruiters and clients search by role and skill, not by clever labels.", good: "SaaS SEO, GTM", bad: "Growth ninja" },
        { title: "Use real proof only", text: "A real number beats an adjective. The tool never invents one." },
        { title: "Stay within 220 characters", text: "That's LinkedIn's headline limit. Most good ones are much shorter.", count: 70 },
      ],
      related: [
        { slug: "linkedin-about-section-generator", text: "An About section to match." },
        { slug: "linkedin-post-generator", text: "Posts that back up your headline." },
        { slug: "twitter-bio-generator", text: "The same pitch for X." },
        { slug: "instagram-bio-generator", text: "Your bio for Instagram." },
      ],
      cta: "social",
    },
    "This LinkedIn headline generator turns your role, audience and outcome into a headline that shows up in search and tell people why to connect.",
    "Say what you do and for whom, pick your goal, and see your headline on a LinkedIn profile before you copy it.",
  );
  return studioWriterPage(
    { ...page, heroDescription: studio.lede },
    { platform: "LinkedIn", noun: "headline", skin: "linkedin-headline", fields: studioFields(page.workspace.fields, [DISPLAY_NAME]), button: "Generate my headline", limit: limitOf(page, 220), example: { ...page.workspace.exampleInput, display_name: "Maya Ortiz" }, dataNote: "AI can get things wrong. Only keep claims you can back up." },
    studio,
  );
}

export function linkedinAboutPage(page: ToolPage): ToolPage {
  const studio = writerStudio(
    {
      tool: "LinkedIn About section generator",
      noun: "LinkedIn About section",
      steps: [
        ["Share your background", "A few lines on what you've done, who you want reading, and what you offer."],
        ["Add what makes you different", "How you work, real wins and one personal detail make it sound like you."],
        ["Tweak and copy", "See your About section on a LinkedIn profile with the \"see more\" cut, then ask for a fresh take or a small change."],
      ],
      compare: {
        intro: "Most weak About sections read like a CV. A good one talks to the reader and gives them a next step.",
        before: "Results driven marketing professional with a passion for growth and a proven track record of success.",
        after: "I help SaaS founders find what's actually blocking growth, then fix it.\n\nI started in content, moved to SEO, and now run growth for small SaaS teams. Want to talk about yours? Message me.",
        changes: ["Buzzwords became who you help and how.", "A short real story replaced \"proven track record\".", "It ends with one clear next step."],
      },
      styles: {
        intro: "Three tones the tool can write in.",
        items: [
          { name: "Warm", when: "For most people.", text: "I help SaaS founders find what's blocking growth. Most of the time it's one thing, hiding behind ten tasks.", why: "Friendly and specific.", settings: { tone: "Warm" } },
          { name: "Direct", when: "For consultants and senior roles.", text: "Growth marketer for B2B SaaS. I fix the bottleneck first, then build the channel that brings users in.", why: "Short sentences, clear value.", settings: { tone: "Direct" } },
          { name: "Witty", when: "For creators and personal brands.", text: "Marketer by trade, spreadsheet enthusiast by accident. I help SaaS teams grow without the guesswork.", why: "Personality first, still clear.", settings: { tone: "Witty" } },
        ],
      },
      practices: [
        { title: "Win the first lines", text: "Only the start shows before \"see more\". Put who you help and how there.", good: "I help SaaS founders find what's blocking growth", bad: "Hi, thanks for visiting my profile!" },
        { title: "Write in first person", text: "\"I help\" reads like a person. Third person reads like a press release." },
        { title: "Tell one short story", text: "Where you started and what you do now makes your experience feel real." },
        { title: "Use real wins", text: "Specific achievements beat \"results driven\". The tool never invents them." },
        { title: "End with a next step", text: "Message me, book a call or visit a site. Pick one.", good: "Want to talk about yours? Message me." },
        { title: "Stay within 2,600 characters", text: "That's LinkedIn's About limit. The short version keeps it tight.", count: 900 },
      ],
      related: [
        { slug: "linkedin-headline-generator", text: "A headline to match your About section." },
        { slug: "linkedin-post-generator", text: "Posts that back up your story." },
        { slug: "twitter-bio-generator", text: "A short bio for X." },
        { slug: "instagram-bio-generator", text: "Your bio for Instagram." },
      ],
      cta: "social",
    },
    "This LinkedIn summary generator turns your background and real wins into an About section that sounds like you and end with a clear next step.",
    "Share your background, pick a tone, and see your About section on a LinkedIn profile before you copy it.",
  );
  return studioWriterPage(
    { ...page, heroDescription: studio.lede, h1: { regular: "Free LinkedIn", accent: "Summary Generator" } },
    { platform: "LinkedIn", noun: "version", skin: "linkedin-about", fields: studioFields(page.workspace.fields, [DISPLAY_NAME]), button: "Write my About section", limit: limitOf(page, 2600), example: { ...page.workspace.exampleInput, display_name: "Maya Ortiz" }, dataNote: "AI can get things wrong. Only keep claims you can back up." },
    studio,
  );
}

export function linkedinPostPage(page: ToolPage): ToolPage {
  const studio = writerStudio(
    {
      tool: "LinkedIn post generator",
      noun: "LinkedIn post",
      steps: [
        ["Dump your notes", "What happened, what you learned, the numbers. Messy is fine."],
        ["Pick the format and tone", "Story, lesson list, how to, opinion, case study or announcement."],
        ["Copy the post", "See it in a LinkedIn feed with the \"see more\" cut, then ask for a fresh take or a small change."],
      ],
      compare: {
        intro: "Most weak LinkedIn posts bury the point. A good one opens with it, then backs it up.",
        before: "I'm excited to share some thoughts on marketing channels and what I've been learning lately...",
        after: "We spent $3,000 on Facebook ads for a B2B client. Zero qualified leads.\n\nThen we moved the budget to LinkedIn outreach. Six calls in three weeks.\n\nThe lesson: pick the channel your buyers already use.",
        changes: ["\"Excited to share\" became the result, in the first line.", "Real numbers carry the story.", "One clear takeaway at the end."],
      },
      styles: {
        intro: "Three formats that work on LinkedIn.",
        items: [
          { name: "Story", when: "For lessons from real work.", text: "We spent $3,000 on ads. Zero leads. Here's what we did next.", why: "A result up front, then what happened.", settings: { format: "Story" } },
          { name: "Lesson list", when: "For practical tips.", text: "5 things I check before running any ad campaign:", why: "A clear promise people can scan.", settings: { format: "Lesson list" } },
          { name: "Opinion", when: "For starting a conversation.", text: "Most B2B companies don't need more channels. They need one that works.", why: "A clear stance invites replies.", settings: { format: "Opinion" } },
        ],
      },
      practices: [
        { title: "Open with the point", text: "Only the first lines show before \"see more\". Make them worth expanding.", good: "We spent $3,000 on ads. Zero leads.", bad: "I'm excited to share some thoughts..." },
        { title: "Use real numbers", text: "Specific results make a post credible. The tool never invents them." },
        { title: "Short paragraphs", text: "One or two sentences per paragraph reads well on a phone." },
        { title: "One takeaway", text: "Say what readers should remember, once, near the end." },
        { title: "End with a real question", text: "Ask something readers can answer from their own experience.", good: "Which channel surprised you most?" },
        { title: "Stay within 3,000 characters", text: "That's LinkedIn's post limit. Most good posts are well under it.", count: 900 },
      ],
      related: [
        { slug: "linkedin-headline-generator", text: "A headline that matches your posts." },
        { slug: "linkedin-about-section-generator", text: "An About section for your profile." },
        { slug: "instagram-caption-generator", text: "Captions for Instagram." },
        { slug: "social-media-content-calendar-generator", text: "Plan a month of posts in one go." },
      ],
      cta: "social",
    },
    "This LinkedIn post generator turns your messy notes into a post that opens with the point, backs it up with your real details and ends with a question people answer.",
    "Paste your notes, pick a format, and see the post in a LinkedIn feed before you copy it.",
  );
  return studioWriterPage(
    { ...page, heroDescription: studio.lede },
    { platform: "LinkedIn", noun: "post", skin: "linkedin-post", fields: studioFields(page.workspace.fields, [DISPLAY_NAME]), button: "Write my post", limit: limitOf(page, 3000), example: { ...page.workspace.exampleInput, display_name: "Maya Ortiz" }, dataNote: "AI can get things wrong. Check every number before you post." },
    studio,
  );
}
