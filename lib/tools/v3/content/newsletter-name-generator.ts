import type { NewToolContent } from "../content-types";

export default {
  slug: "newsletter-name-generator",
  name: "Newsletter Name Generator",
  keyword: "newsletter name generator",
  metaTitle: "Newsletter Name Generator (100% FREE)",
  metaDescription: "Create a memorable newsletter name for your audience and topic. Get one tailored name with a short tagline and a clear explanation.",
  lede: "This newsletter name generator gives you one name and a short tagline that fit what you write about, who reads it and how you want it to sound.",
  sub: "Give your newsletter a name people will remember.",
  trust: "Free, no signup. What you type is sent to an AI provider to write your result and isn't stored, so don't include anything private.",
  steps: [
    { title: "Describe your topic", text: "What will readers actually get from each issue?" },
    { title: "Choose your audience and style", text: "A founder newsletter and a local community digest can sound very different." },
    { title: "Review your name", text: "Search for existing newsletters and handles before you commit." },
  ],
  examples: {
    heading: "Newsletter names,",
    accent: "with the thinking behind them.",
    intro: "Illustrative suggestions only. None of them is a claim that the name is unique or available.",
    items: [
      { title: "SEO experiments", input: "Short weekly explanations of SEO experiments for independent businesses, thoughtful and approachable.", output: "The Search Notebook: Small SEO experiments, explained without the jargon.", why: "Sounds like a working notebook, which fits experiments, and the tagline does the explaining." },
      { title: "Local food scene", input: "Monthly digest of new cafes and markets in Leeds, friendly style.", output: "Second Helpings: What's new to eat in Leeds this month.", why: "Playful but clear, and the city lives in the tagline so the name can travel." },
      { title: "Founder finance", input: "Practical money lessons for first time SaaS founders, professional.", output: "Runway Notes: Plain money lessons for founders building their first company.", why: "Runway is a word founders already use, so the topic lands fast." },
    ],
  },
  guidance: {
    heading: "What makes a good",
    accent: "newsletter name.",
    items: [
      { title: "Easy to repeat, still right at issue fifty", text: "A good name gives readers a clue about the publication, is easy to repeat, and still makes sense after your fiftieth issue. You don't have to force \"newsletter\" or \"weekly\" into it. A distinctive phrase with a clear tagline works just as well. Pick something you're happy to say out loud and see in a subject line." },
      { title: "Descriptive or brandable", text: "A descriptive name helps new readers understand what they're signing up for. A brandable name leaves room to cover more later. If you publish one specific tutorial every week, clarity may matter most. If you're building a long term media brand, pick something flexible and explain the focus in your tagline." },
      { title: "Check before you commit", text: "Search Google, newsletter directories, social platforms and trademark databases. A similar name can exist even when the domain looks free. This tool doesn't check availability." },
    ],
  },
  faqs: [
    { q: "How do I name a newsletter?", a: "Start with its topic, intended reader, point of view and publishing style. Shortlist a name that's easy to spell and explain. Then search existing newsletters and check domains and trademarks." },
    { q: "Should my newsletter name include a keyword?", a: "Only when it makes the name clearer. A keyword can signal your topic, but awkward exact match phrases aren't needed for a good publication name." },
    { q: "Should I include Daily or Weekly?", a: "Only if you expect that schedule to stay the same. A frequency in the name gets confusing if your schedule changes." },
    { q: "Can I use my personal name?", a: "Yes. A name based publication works well when readers subscribe because they trust a person. A branded title may suit a team publication better." },
    { q: "How long should a newsletter name be?", a: "There's no single character limit across email platforms. Aim for something short enough to remember and display clearly, and check the platform you use." },
    { q: "How do I know a newsletter name is taken?", a: "Search Google, newsletter directories, social platforms and trademark databases. Similar names can exist even if a domain appears available." },
    { q: "Can I rename my newsletter later?", a: "Usually yes, depending on your platform, but renaming a recognised newsletter can confuse readers. Explain the change and keep any old links working if you rebrand." },
    { q: "Can I use this for Substack or beehiiv?", a: "Yes, as a creative starting point for either. The tool doesn't connect to those platforms or reserve names on them." },
  ],
  related: [
    { slug: "podcast-name-generator", text: "Name a podcast to go with it." },
    { slug: "domain-name-ideas-generator", text: "Find a domain idea for the newsletter." },
    { slug: "linkedin-post-generator", text: "Share each issue on LinkedIn." },
  ],
  cta: { heading: "Want the newsletter", accent: "to actually grow?", copy: "I help founders build audiences through SEO, Reddit and social. Tell me what you're working on.", button: "Tell me what's stuck", href: "/contact" },
  hubCard: { description: "Get one memorable newsletter name and a short tagline that fit your topic, readers and style.", cta: "Name your newsletter" },
  sources: [
    { label: "Logo.com newsletter name generator (competitor reference)", url: "https://logo.com/name/newsletter-name-generator", checked: "October 2026" },
  ],
} satisfies NewToolContent;
