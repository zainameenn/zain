import type { CaseStudy } from "./types";

const IMG = "/assets/case-studies/virtarix";

// ─── PLACEHOLDERS: fill these in before going live ───────────────────────────
// Anything left empty is hidden on the page, so nothing shows a dead link.

/** PLACEHOLDER driveUrl: public Google Drive folder with every Virtarix screenshot. */
const DRIVE_URL = "";
/** PLACEHOLDER answerExTitle: title of a Reddit answer that worked. Shown once both answer fields are set. */
const ANSWER_EXAMPLE_TITLE = "";
/** PLACEHOLDER answerExViews: views on that answer, e.g. "50K". */
const ANSWER_EXAMPLE_VIEWS = "";
/** TO CONFIRM pinterestWindow: Pinterest result wording. The other option was "1.2K+ visits within the first weeks". */
const PINTEREST_RESULT = "It went from 0 to 1.2K+ monthly visits.";
// ─────────────────────────────────────────────────────────────────────────────

export const virtarix: CaseStudy = {
  slug: "virtarix",
  name: "Virtarix",
  seo: {
    title: "Virtarix Case Study: 70K+ Facebook Views in Under 4 Months | Zain",
    description:
      "Virtarix case study: how a VPS host went from no social presence to 71K+ Facebook views and Reddit Answers recommendations, with Reddit, guides and social.",
    ogImage: {
      src: `${IMG}/og-facebook-71k-views.jpg`,
      width: 1200,
      height: 630,
      alt: "Virtarix Facebook page insights: 71,459 views and 3,395 interactions, Oct 4 to Jan 23",
    },
  },
  toc: [
    { id: "problem", label: "The problem" },
    { id: "what-i-did", label: "What I did" },
    { id: "results", label: "Results" },
    { id: "lessons", label: "Lessons" },
  ],
  tags: ["VPS hosting", "Reddit", "Content", "Social"],
  logo: { src: `${IMG}/virtarix-logo.png`, width: 576, height: 176, alt: "Virtarix logo" },
  hero: {
    title: "Virtarix case study: 70K+ Facebook views,",
    accent: "in under 4 months.",
    intro:
      "This Virtarix case study shows how a VPS hosting company competing with much bigger names built a presence from zero on Reddit, Facebook and Pinterest in under 4 months.",
    primaryCta: { label: "Tell me what's stuck", href: "/contact" },
    secondaryCta: { label: "See the results", href: "#results" },
  },
  quickFacts: [
    { label: "Client", value: "Virtarix" },
    { label: "Industry", value: "VPS hosting" },
    { label: "My role", value: "Contract growth marketer: Reddit, technical content, social" },
    { label: "Timeline", value: "4 to 5 months" },
    {
      label: "Services used",
      links: [
        { label: "Reddit marketing", href: "/services/reddit-marketing-specialist" },
        { label: "SEO", href: "/services/seo-specialist-for-saas" },
        { label: "Social media", href: "/services/social-media-marketing-specialist" },
      ],
    },
  ],
  keyResults: [
    { value: "0 to 71K+", label: "Facebook views, Oct 4 to Jan 23" },
    { value: "34K", label: "views from Dec 1 to Jan 8" },
    { value: "5", label: "Reddit Answers results recommending Virtarix" },
  ],
  keyResultsSource: "Sources: Meta Business Suite, Reddit Answers.",
  keyResultsId: "results",
  testimonial: {
    heading: "From the managing director",
    label: "Upwork review",
    quote:
      "Zain is an exceptionally skilled and professional freelancer. We hired him to optimize our online and social media presence, and his work directly addressed our goal of turning our growth plateau into predictable, scalable momentum.",
    name: "Peter French",
    role: "Managing Director, Virtarix",
    initials: "PF",
    originalHref: `${IMG}/upwork-review.webp`,
  },
  summary: {
    heading: "The 30 second version",
    items: [
      { title: "The problem", text: "A strong VPS product in a crowded market, with no presence where buyers compare hosts." },
      { title: "What I did", text: "Reddit and technical guides first, then social, then Pinterest." },
      { title: "The result", text: "71K+ Facebook views from zero and Virtarix recommended in Reddit Answers.", emphasis: true },
    ],
  },
  product: {
    eyebrow: "The product",
    heading: "A VPS host up against much bigger names",
    body: "Virtarix sells VPS hosting with NVMe storage on every plan, starting at $5.50 a month, with servers in Dallas, Frankfurt and Johannesburg. Their own pricing pages compare them against OVHcloud, Hostinger and Contabo, which tells you the kind of competition they're up against.",
    closing: "The product was solid. The problem was that almost nobody had heard of it.",
  },
  problem: {
    eyebrow: "The problem",
    heading: { text: "Great servers,", accent: "no one talking about them." },
    paragraphs: [
      "When people choose a VPS host, they don't start on the host's website. They ask Reddit. They read comparison threads. They search \"best cheap VPS\" and trust whatever real users recommend.",
      ["Virtarix wasn't in any of those conversations. ", { gold: "And the Facebook page was starting from zero." }],
    ],
  },
  phases: {
    eyebrow: "What I did",
    heading: { text: "Three phases.", accent: "Zero to a real presence." },
    items: [
      {
        number: "01",
        eyebrow: "Phase 01 · Reddit and technical guides",
        title: "Get into the conversations first",
        intro: "Reddit came first, because that's where hosting buyers make up their minds.",
        introStrong: true,
        bullets: [
          [{ bold: "The right communities." }, " I focused on VPS, hosting, self-hosting and startup communities."],
          [{ bold: "Answers, not ads." }, " I answered the questions buyers were actually asking about hosts and setups, and added helpful comments where Virtarix was genuinely relevant."],
          [{ bold: "Some posts passed 50K views." }],
          [{ bold: "Reddit Answers started recommending Virtarix." }, " Reddit's own AI search now lists it for \"good VPS\" style questions."],
        ],
        body: "I also wrote the technical guides. Before writing each one, I installed and tested the software myself, so every step actually worked.",
        bodyAfterBullets: true,
        screenshots: [
          {
            src: `${IMG}/reddit-answers-good-vps.webp`,
            width: 990,
            height: 722,
            alt: "Reddit Answers response to a good VPS question, listing Virtarix among the recommended hosts",
            caption: "Reddit Answers · Virtarix recommended for \"good VPS\"",
          },
        ],
        screenshotsLayout: "single",
        example: { heading: "An answer that worked", title: ANSWER_EXAMPLE_TITLE, views: ANSWER_EXAMPLE_VIEWS },
      },
      {
        number: "02",
        eyebrow: "Phase 02 · Social",
        title: "Build the page from nothing",
        intro: "After the first week or two, I set up and ran Facebook. Three to four posts a week, built around what hosting buyers care about. Not daily. Just consistent, and good enough to share.",
        introStrong: true,
        body: "The page went from flat to 71K+ views and 3,395 interactions between October 4 and January 23.",
        screenshots: [
          {
            src: `${IMG}/facebook-71k-views.webp`,
            width: 1654,
            height: 845,
            alt: "Virtarix Facebook page insights, Oct 4 to Jan 23: 71,459 views and 3,395 interactions",
            caption: "After · 71,459 views · Oct 4 to Jan 23",
            wide: true,
          },
          {
            src: `${IMG}/facebook-before.webp`,
            width: 1556,
            height: 781,
            alt: "Virtarix Facebook dashboard: views flat at zero through September, then rising from October",
            caption: "Before · flat until Oct",
          },
          {
            src: `${IMG}/facebook-34k-one-month.webp`,
            width: 986,
            height: 662,
            alt: "Meta insights for Virtarix, Dec 1 to Jan 8: 34.0K views",
            caption: "One month · 34K · Dec 1 to Jan 8",
          },
        ],
      },
      {
        number: "03",
        eyebrow: "Phase 03 · Pinterest",
        title: "Plant something that keeps growing",
        intro: `Late in the project I started Pinterest from scratch. ${PINTEREST_RESULT} Pins keep ranking for months, so this is the channel I'd have scaled next.`,
        introStrong: true,
        screenshots: [],
        driveLink: { label: "See more results in Google Drive", href: DRIVE_URL },
      },
    ],
  },
  compounding: {
    eyebrow: "How it compounded",
    heading: { text: "Every mention", accent: "made the next one easier." },
    flows: [
      [
        { label: "Reddit mentions", icons: ["reddit"], description: "brought brand searches and backlinks" },
        { label: "Brand searches", icons: ["search"], description: "helped the guides rank" },
        { label: "Guides", icons: ["book"], description: "gave Reddit answers something useful to link to" },
        { label: "Social", icons: ["facebook"], description: "made Virtarix look active to anyone checking" },
      ],
    ],
  },
  effort: {
    heading: "What went in",
    items: [
      { value: "3 to 4", label: "posts a week on Facebook" },
      { value: "4 to 5 months", label: "total" },
      { value: "4", label: "channels: Reddit, guides, Facebook, Pinterest" },
      { value: "1", label: "marketer (me)" },
    ],
  },
  drive: {
    heading: "Want to check every result?",
    text: "Every screenshot from this project is in one public Google Drive folder.",
    link: { label: "See all results in Google Drive", href: DRIVE_URL },
  },
  lessons: {
    eyebrow: "Lessons",
    heading: { text: "What I'd tell", accent: "any company in a crowded market." },
    items: [
      { title: "Be where the comparing happens.", text: "Buyers decide on Reddit, not on your homepage." },
      { title: "Test before you write.", text: "Technical buyers spot a fake tutorial in one line." },
      { title: "Consistency beats volume.", text: "Three to four good posts a week took a page from zero to 71K+ views." },
      { title: "Get analytics access on day one.", text: "Tie every post to signups from the start, so the results speak in revenue, not just views." },
    ],
    articleLink: { label: "Read the full breakdown", href: "" },
  },
  servicesUsed: {
    heading: "Services used here",
    items: [
      { label: "SEO specialist for SaaS", href: "/services/seo-specialist-for-saas" },
      { label: "Reddit marketing specialist", href: "/services/reddit-marketing-specialist" },
      { label: "Social media marketing specialist", href: "/services/social-media-marketing-specialist" },
    ],
  },
  related: {
    eyebrow: "More case studies",
    heading: "Read another case study",
    items: [
      {
        tags: "AI SaaS · SEO · Reddit",
        logo: { src: "/assets/case-studies/blainy/blainy-logo.png", width: 2000, height: 582, alt: "Blainy logo" },
        stat: "85K+",
        statLabel: "signups in about 14 months",
        text: "85K+ signups and 1M+ visitors in about 14 months. Zero paid ads.",
        link: { label: "Read the Blainy case study", href: "/case-studies/blainy" },
      },
      {
        tags: "Home services · Social · Local SEO",
        logo: { src: "/assets/case-studies/blainy/everdry-logo.gif", width: 250, height: 80, alt: "Everdry logo" },
        stat: "603",
        statLabel: "calls from Google Business Profile, Jun to Nov",
        text: "Their social pages weren't reaching anyone. I rebuilt the content around visuals people stop for and turned the Google Business Profile into a lead source.",
        link: { label: "Read the Everdry case study", href: "/case-studies/everdry" },
      },
    ],
    allLink: { label: "See all case studies", href: "/case-studies" },
  },
  cta: {
    heading: { text: "Great product,", accent: "nobody talking about it?" },
    text: "Book a free call. Bring the problem, I'll bring the coffee.",
    link: { label: "Tell me what's stuck", href: "/contact" },
  },
};
