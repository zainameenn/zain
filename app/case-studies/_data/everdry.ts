import type { CaseStudy } from "./types";

const IMG = "/assets/case-studies/everdry";

// ─── PLACEHOLDERS: fill these in before going live ───────────────────────────
// Anything left empty is hidden on the page, so nothing shows a dead link.

/** PLACEHOLDER driveUrl: public Google Drive folder with every Everdry screenshot. */
const DRIVE_URL = "";
/** PLACEHOLDER timeline: how long you ran the page, e.g. "Oct 2025 to present". Shown in Quick facts once set. */
const TIMELINE = "";
// ─────────────────────────────────────────────────────────────────────────────

// Facebook work only. The Google Business Profile was set up by a previous agency, so it stays off this page.
export const everdry: CaseStudy = {
  slug: "everdry",
  name: "Everdry Waterproofing",
  seo: {
    title: "Everdry Case Study: Social Media and Local SEO | Zain",
    description:
      "This Everdry case study shows how a US waterproofing company turned quiet social pages into steady visibility.",
    ogImage: {
      src: `${IMG}/og-facebook-160k-views.jpg`,
      width: 1200,
      height: 630,
      alt: "Everdry Waterproofing Facebook dashboard: 160,235 views and 40,153 reach in 28 days",
    },
  },
  toc: [
    { id: "problem", label: "The problem" },
    { id: "what-i-did", label: "What I did" },
    { id: "results", label: "Results" },
    { id: "lessons", label: "Lessons" },
  ],
  tags: ["Home services", "Facebook", "Content design"],
  logo: { src: `${IMG}/everdry-logo.webp`, width: 250, height: 80, alt: "Everdry Waterproofing logo" },
  hero: {
    title: "Everdry case study: an abandoned Facebook page,",
    accent: "160K+ views in 28 days.",
    intro:
      "This Everdry case study shows how a US basement waterproofing company's Facebook page went from zero activity to 160K+ views in 28 days, with content homeowners actually stop for.",
    primaryCta: { label: "Tell me what's stuck", href: "/contact" },
    secondaryCta: { label: "See the results", href: "#results" },
  },
  quickFacts: [
    { label: "Client", value: "Everdry Waterproofing" },
    { label: "Industry", value: "Home services, basement waterproofing" },
    { label: "My role", value: "Contract social media marketer" },
    { label: "Timeline", value: TIMELINE },
    { label: "Services used", links: [{ label: "Social media marketing", href: "/services/social-media-marketing-specialist" }] },
  ],
  keyResults: [
    { value: "0 to 160K+", label: "Facebook views in 28 days" },
    { value: "40,153", label: "people reached in the same 28 days" },
  ],
  keyResultsSource: "Source: Meta Business Suite.",
  keyResultsId: "results",
  testimonial: {
    heading: "From the director",
    label: "Upwork review",
    quote:
      "He came in, got up to speed quick, and delivered what we needed without me having to micromanage. His communication is clean, turnaround time is solid, and he takes feedback well. Critically, he suggested how to approach things I didn't know that we needed to approach and the results were phenomenal.",
    name: "Cam Kaminsky",
    role: "Director, Everdry Waterproofing",
    initials: "CK",
    originalHref: `${IMG}/upwork-review.webp`,
  },
  summary: {
    heading: "The 30 second version",
    items: [
      { title: "The problem", text: "The person running Facebook left. The page went silent." },
      { title: "What I did", text: "Rebuilt the content around before and afters, myth busting, reviews and service promos." },
      { title: "The result", text: "160K+ views in 28 days, from a page that had zero.", emphasis: true },
    ],
  },
  problem: {
    eyebrow: "The problem",
    heading: { text: "Nobody scrolls Facebook", accent: "hoping to see basements." },
    paragraphs: [
      "Basement waterproofing isn't a scroll stopper. Most homeowners don't think about it until there's water on the floor.",
      ["On top of that, the person managing Everdry's Facebook had left. ", { gold: "Nobody was posting. Traffic was zero." }],
    ],
  },
  approach: {
    eyebrow: "What I did",
    heading: { text: "Content people", accent: "actually stop for." },
    intro: "I took over the page and built every post around one question: what does a worried homeowner need to see?",
    items: [
      { title: "Before and afters.", text: "A wet, cracked basement next to a dry, finished one does more selling than any caption." },
      { title: "Facts and myths.", text: "What actually causes basement water, what doesn't, and what happens if you ignore it." },
      { title: "Reviews.", text: "Real customers saying it worked." },
      { title: "Service promos.", text: "Clear offers, once people already trusted the page." },
    ],
    outro: "I designed every post myself in Canva, along with the other graphics the company needed.",
    galleries: [
      [
        {
          src: `${IMG}/canva-posts-grid.webp`,
          width: 1183,
          height: 1153,
          alt: "A grid of 36 Everdry Facebook posts I designed in Canva: Did You Know facts, before and afters, customer reviews, egress windows, crawl space and foundation repair promos, and a Happy New Year 2026 post",
          caption: "Posts I designed in Canva · facts, reviews, services",
        },
        {
          src: `${IMG}/facebook-page-grid.webp`,
          width: 1265,
          height: 1116,
          alt: "Everdry Waterproofing of Michiana Facebook page grid of posts I designed: Client Feedback reviews, Thanksgiving and Veterans Day posts, Did You Know facts and service promos",
          caption: "The live Everdry Facebook page · seasonal and review posts",
        },
      ],
      [
        {
          src: `${IMG}/facebook-160k-views.webp`,
          width: 1920,
          height: 1117,
          alt: "Everdry Waterproofing of Michiana Facebook professional dashboard, last 28 days: 160,235 views, 40,153 reach, 347 content interactions and 16 follows",
          caption: "Facebook · 160,235 views in 28 days",
          wide: true,
        },
        {
          src: `${IMG}/facebook-50k-views-early.webp`,
          width: 1600,
          height: 925,
          alt: "Everdry Facebook professional dashboard in October, last 28 days: 50,881 views, 17,292 reach, 264 content interactions and 4 follows",
          caption: "Early on · 50,881 views in 28 days",
        },
        {
          src: `${IMG}/facebook-141k-views.webp`,
          width: 1920,
          height: 1119,
          alt: "Everdry Facebook professional dashboard, an earlier 28 day window: 141,889 views, 36,284 reach, 338 content interactions and 16 follows",
          caption: "Facebook · 141,889 views in 28 days",
        },
      ],
    ],
    note: "Three separate 28 day windows from the page's professional dashboard.",
    driveLink: { label: "See more results in Google Drive", href: DRIVE_URL },
  },
  drive: {
    heading: "Want to check every result?",
    text: "Every screenshot from this project is in one public Google Drive folder.",
    link: { label: "See all results in Google Drive", href: DRIVE_URL },
  },
  lessons: {
    eyebrow: "Lessons",
    heading: { text: "What I'd tell", accent: "any home service business." },
    items: [
      { title: "Show the transformation.", text: "Before and afters sell the job for you." },
      { title: "Answer the 2am questions.", text: "Homeowners search their problem before they search for a company. Be the page that explains it." },
      { title: "Proof beats promos.", text: "Reviews first, offers second." },
      { title: "Don't fix what works.", text: "Spend the time where the gap actually is." },
    ],
    articleLink: { label: "Read the full breakdown", href: "" },
  },
  servicesUsed: {
    heading: "Services used here",
    items: [{ label: "Social media marketing specialist", href: "/services/social-media-marketing-specialist" }],
  },
  card: {
    tags: "Home services · Facebook",
    stat: "160K+",
    statLabel: "Facebook views in 28 days",
    text: "Their Facebook page had gone quiet after the last manager left. I rebuilt it around before and afters, myth busting and real reviews.",
  },
  cta: {
    heading: { text: "Great service,", accent: "quiet page?" },
    text: "Book a free call. Bring the problem, I'll bring the coffee.",
    link: { label: "Tell me what's stuck", href: "/contact" },
  },
};
