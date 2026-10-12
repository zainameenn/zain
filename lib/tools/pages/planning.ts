import { FAIR_USE, GUIDE_CONTENT_CALENDAR, GUIDE_SMALL_BUSINESS_MARKETING, LINK_CONTACT, LINK_SOCIAL_MEDIA_SERVICE } from "../links";
import type { ToolPage } from "../types";
import { ERROR_TEXT, dataNote, freeFaq } from "../families/common";

// Social Media Content Calendar Generator and Marketing Plan Generator (docs/tools-spec.md).

const calendarExample = {
  business: "Bookkeeping for restaurants",
  audience: "Owners of 1 to 3 location restaurants",
  offer: "Free 20 minute books review",
  platforms: "LinkedIn, Instagram",
  goal: "Leads",
  frequency: "3",
  hours: "3 to 5",
  assets: "Client photos, a few testimonials, an old blog",
};

export const CALENDAR: ToolPage = {
  slug: "social-media-content-calendar-generator",
  name: "Social Media Content Calendar Generator",
  keyword: "social media content calendar generator",
  group: "Social",
  metaTitle: "Social Media Content Calendar Generator (Free, CSV Export)",
  metaDescription: "This free social media content calendar generator plans a month of posts around your offer, platforms and real free time. Edit it, then download as CSV.",
  h1: { regular: "Free Social Media", accent: "Content Calendar Generator" },
  heroDescription:
    "This social media content calendar generator plans a month of posts around your offer, your platforms and the time you actually have. Every post gets a date, a hook, an outline and a call to action, and the whole thing downloads as a CSV.",
  accessNote: FAIR_USE,
  workspace: {
    fields: [
      { name: "business", label: "What does your business do?", type: "text", placeholder: "Bookkeeping for restaurants", required: true, maxLength: 300 },
      { name: "audience", label: "Who are you trying to reach?", type: "text", placeholder: "Owners of 1 to 3 location restaurants", required: true, maxLength: 300 },
      { name: "offer", label: "What do you want to sell or promote this month?", type: "text", placeholder: "Free 20 minute books review", required: true, maxLength: 300 },
      { name: "platforms", label: "Platforms", type: "multi", options: ["Instagram", "LinkedIn", "Facebook", "TikTok", "X", "Threads", "Pinterest"], max: 3, required: true },
      { name: "goal", label: "Main goal", type: "select", options: ["Leads", "Followers", "Sales", "Trust"] },
      { name: "frequency", label: "Posts per week", type: "select", options: ["2", "3", "5", "7"], defaultValue: "3" },
      { name: "hours", label: "Hours per week for content", type: "select", options: ["1 to 2", "3 to 5", "6+"] },
      { name: "assets", label: "What do you already have?", type: "textarea", placeholder: "Client photos, a few testimonials, an old blog", maxLength: 1000 },
      { name: "start", label: "Start date", type: "date" },
    ],
    button: "Build my content calendar",
    secondary: "Try an example",
    exampleInput: calendarExample,
    resultsHeading: "Your content calendar",
    emptyState: "Your calendar shows up here: a date, platform, hook, outline and call to action for every post. Edit any cell, then download it as a CSV.",
    more: "Regenerate all",
    dataNote: dataNote("content calendar"),
    errorText: ERROR_TEXT,
    result: { kind: "calendar" },
    wide: true,
  },
  howTo: {
    heading: "How to use the social media content calendar generator",
    steps: [
      "**Tell it about the business and this month's offer.** The calendar builds toward that offer, so posts don't wander.",
      "**Be honest about your time.** Pick 2 posts a week if that's real. A calendar you can't keep is just a guilt spreadsheet.",
      "**Edit, download, schedule.** Swap any row you don't like, export the CSV and load it into your scheduler or Google Sheets.",
    ],
  },
  examples: {
    heading: "Example content calendar for a service business",
    layout: "wide",
    items: [
      {
        inputLabel: "Restaurant bookkeeper, one week",
        input: calendarExample,
        table: {
          head: ["Day", "Platform", "Format", "Pillar", "Hook", "CTA"],
          rows: [
            ["Monday", "LinkedIn", "Text post", "Teach", "The 3 numbers every restaurant owner should check on Friday", "Follow for next week's numbers"],
            ["Wednesday", "Instagram", "Carousel", "Proof", "Before and after: an anonymous messy P and L, cleaned up", "Save this for your next month end"],
            ["Friday", "LinkedIn", "Text post", "Offer", "Book a free 20 minute books review", "Message me to book a slot"],
          ],
        },
        why: "Three posts a week fits 3 to 5 hours: about an hour per post to write, design and schedule. Monday teaches, Wednesday proves, Friday asks, so only one post in three is a pitch.",
      },
    ],
  },
  sections: [
    {
      heading: "Plan content around the time you actually have",
      blocks: [
        { p: "Here's the thing nobody says out loud: **CONSISTENCY BEATS VOLUME.** Three good posts a week for three months beats daily posting for nine days and then radio silence." },
        { p: "That burst and vanish pattern is the Ross and Rachel \"we were on a break\" of social media. Your audience doesn't buy it either." },
        { p: "That's why the tool asks for your hours first. Low on time? It plans fewer posts and reuses one idea across formats: a carousel on Monday becomes a short video on Thursday." },
      ],
    },
    {
      heading: "How the calendar is built",
      blocks: [
        { p: "Every calendar runs on 3 or 4 content pillars pulled from your business: things you teach, proof you've done it, behind the scenes, and offers. The tool rotates them so you never post three sales pitches in a row." },
        {
          ol: [
            "**Teach posts** build trust with useful tips.",
            "**Proof posts** show results, using only the proof you gave it.",
            "**People posts** show who's behind the business.",
            "**Offer posts** ask for the sale, roughly one in four.",
          ],
        },
      ],
    },
    {
      heading: "What to check before you publish",
      blocks: [
        { p: "The tool can't see your calendar, your holidays or your industry news. Before you schedule, check dates that clash with holidays or launches, swap any hook that doesn't sound like you, and make sure every proof post uses real numbers." },
        { p: "**Common mistake:** planning a month, then posting the plan word for word. Treat the outline as a starting point. Write the final post in your own voice, or run it through the caption generator." },
      ],
    },
  ],
  faqs: [
    freeFaq("content calendar generator"),
    { q: "Can I plan for multiple platforms?", a: "Yes, up to 3. The tool adapts the format to each platform instead of copying one post everywhere." },
    { q: "Does it write full captions?", a: "It writes a hook and an outline for each post. Use the Instagram or LinkedIn generators to turn any row into a full post." },
    { q: "Can I edit or download the calendar?", a: "Yes. Every cell is editable, and you can download it as a CSV that opens in Google Sheets or Excel." },
    { q: "How many posts per week should I plan?", a: "As many as you can keep up for three months straight. For most small businesses that's 2 to 3." },
  ],
  ctas: [
    {
      heading: "Want help creating the posts too?",
      copy: "A calendar tells you what to post. I can handle the writing, design and posting, so it actually happens every week.",
      button: "See my social media service",
      href: LINK_SOCIAL_MEDIA_SERVICE,
    },
  ],
  related: [{ slug: "instagram-caption-generator" }, { slug: "linkedin-post-generator" }, { slug: "marketing-plan-generator" }],
  extraLinks: [GUIDE_CONTENT_CALENDAR],
  api: { block: "calendar", vars: {} },
};

const planSaas = {
  type: "SaaS",
  offer: "Scheduling software for dental clinics",
  audience: "Clinic managers at 2 to 10 chair practices",
  stage: "No customers yet",
  goal: "10 demo calls",
  budget: "$0",
  hours: "5",
  channels: "Posted on LinkedIn for 2 months, few likes, no leads",
  team: "Just me",
};

export const MARKETING_PLAN: ToolPage = {
  slug: "marketing-plan-generator",
  name: "Marketing Plan Generator",
  keyword: "marketing plan generator",
  group: "SEO",
  metaTitle: "Marketing Plan Generator: Free 30 Day Small Business Plan",
  metaDescription: "This free marketing plan generator builds a 30 day plan around your budget, time and goal. One clear priority, weekly actions and the numbers to watch.",
  h1: { regular: "Free Marketing", accent: "Plan Generator" },
  heroDescription:
    "This marketing plan generator builds a 30 day plan around your budget, your time and one goal. You get a single first priority, weekly actions, the numbers to watch, and the reasoning behind every call.",
  accessNote: FAIR_USE,
  workspace: {
    fields: [
      { name: "type", label: "Business type", type: "select", options: ["SaaS", "Service", "Ecommerce", "Local business"], required: true },
      { name: "offer", label: "What do you sell?", type: "text", placeholder: "Scheduling software for dental clinics", required: true, maxLength: 300 },
      { name: "audience", label: "Who buys it?", type: "text", placeholder: "Clinic managers at 2 to 10 chair practices", required: true, maxLength: 300 },
      { name: "stage", label: "Where are you now?", type: "select", options: ["No customers yet", "First customers", "Growing", "Stuck"] },
      { name: "goal", label: "Goal for the next 30 days", type: "text", placeholder: "10 demo calls", required: true, maxLength: 300 },
      { name: "budget", label: "Monthly marketing budget", type: "select", options: ["$0", "Under $500", "$500 to $2,000", "$2,000+"] },
      { name: "hours", label: "Hours per week you can give it", type: "select", options: ["2", "5", "10", "20+"] },
      { name: "channels", label: "What have you tried, and how did it go?", type: "textarea", placeholder: "Posted on LinkedIn for 2 months, few likes, no leads", maxLength: 1500 },
      { name: "team", label: "Who's doing the work?", type: "select", options: ["Just me", "Me plus one", "Small team"] },
    ],
    button: "Build my 30 day plan",
    secondary: "Try an example",
    exampleInput: planSaas,
    resultsHeading: "Your 30 day marketing plan",
    emptyState: "Your plan shows up here: one first priority, what to skip for now, four weeks of actions and the numbers to watch.",
    more: "Regenerate",
    dataNote: dataNote("plan"),
    errorText: ERROR_TEXT,
    result: { kind: "plan" },
    wide: true,
  },
  howTo: {
    heading: "How to use the marketing plan generator",
    steps: [
      "**Fill in the boring stuff honestly.** Budget, hours and what's already failed matter more than your goal.",
      "**Read the first priority and the \"not yet\" list.** That's where the plan earns its keep.",
      "**Check the assumptions.** If one is wrong, fix the input and run it again.",
    ],
  },
  examples: {
    heading: "Example marketing plans for SaaS, services and ecommerce",
    items: [
      {
        inputLabel: "SaaS, no customers, $0 budget, 5 hours",
        input: planSaas,
        output: "Priority: direct outreach to 50 well matched clinics, because you need conversations before content.\nNot yet: paid ads, SEO.\nWeek 1: list 50 clinics that fit, write one short outreach message, send the first 15.",
        why: "No customers and no budget, so the plan starts with conversations, not content.",
      },
      {
        inputLabel: "Service business, growing, $500 budget, 5 hours",
        input: {
          type: "Service",
          offer: "Bookkeeping for restaurants",
          audience: "Owners of 1 to 3 location restaurants",
          stage: "Growing",
          goal: "5 new clients",
          budget: "$500 to $2,000",
          hours: "5",
          channels: "Ran Google Ads once, expensive clicks, 1 client",
          team: "Me plus one",
        },
        output: "Priority: turn past happy clients into reviews and referrals, because warm leads close fastest.\nNot yet: a new social platform.\nWeek 1: email your 20 happiest clients for a review, then ask 5 of them for one referral each.",
        why: "Happy clients already exist, so the plan uses them before buying new attention.",
      },
      {
        inputLabel: "Ecommerce, first customers, $500 budget, 10 hours",
        input: {
          type: "Ecommerce",
          offer: "Large felt desk mats",
          audience: "People working long hours at a desk",
          stage: "First customers",
          goal: "30 orders",
          budget: "$500 to $2,000",
          hours: "10",
          channels: "Tried Instagram ads for a week, clicks but no sales",
          team: "Just me",
        },
        output: "Priority: fix the product page and listing copy before buying traffic, because ads into a leaky page waste money.\nNot yet: influencers.\nWeek 1: rewrite the top 3 product titles and descriptions, add size photos, make shipping info clear on the page.",
        why: "Clicks without sales point at the page, so the plan fixes the page first.",
      },
    ],
  },
  sections: [
    {
      heading: "How to choose your first marketing priority",
      blocks: [
        { p: "Most small businesses don't fail at marketing because they pick the wrong channel. They fail because they pick **ALL THE CHANNELS** at once." },
        { p: "LinkedIn on Monday, TikTok on Tuesday, a podcast idea by Friday. That's the Avengers without Nick Fury: lots of power, nobody running the plan." },
        { p: "This tool picks one priority based on four things: how many customers you have, your budget, your hours, and how people already look for what you sell. Then it tells you what to ignore for now. That \"not yet\" list is the most valuable part, honestly." },
      ],
    },
    {
      heading: "What this plan needs you to check",
      blocks: [
        { p: "The tool doesn't know your margins, your competitors or your market. Treat the plan as a smart first draft. Check every assumption, and measure the numbers it gives you weekly. If week 2 shows nothing moving, the plan tells you what to change." },
        { p: "**Common mistake:** judging a channel after 7 days. Give the first priority the full 30 days unless the numbers say it's clearly dead." },
      ],
    },
  ],
  faqs: [
    freeFaq("marketing plan generator"),
    { q: "What if I have no ad budget?", a: "Pick $0. The plan will lean on outreach, content, partnerships and reviews." },
    { q: "Is this a full marketing strategy?", a: "No. It's a focused 30 day starting plan. A full strategy needs your numbers, market research and testing." },
    { q: "Can I change the recommendations?", a: "Yes. Change any input and regenerate, or edit the plan directly." },
    { q: "Why does it only pick one priority?", a: "Because one channel done properly for 30 days teaches you more than five done badly." },
  ],
  ctas: [
    {
      heading: "Let's turn this starting plan into a strategy for your business.",
      copy: "I build and run growth plans for SaaS and service businesses: SEO, Reddit, social and content, all tied to leads you can count.",
      button: "Get a free marketing audit",
      href: LINK_CONTACT,
    },
  ],
  related: [{ slug: "social-media-content-calendar-generator" }, { slug: "utm-link-builder", text: "to track the plan." }, { slug: "seo-title-generator" }],
  extraLinks: [GUIDE_SMALL_BUSINESS_MARKETING],
  api: { block: "plan", vars: {} },
};
