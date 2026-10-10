import type { CaseStudy } from "./types";

const IMG = "/assets/case-studies/blainy";

// ─── PLACEHOLDERS: fill these in before going live ───────────────────────────
// Anything left empty is hidden on the page, so nothing shows a dead link.

/** PLACEHOLDER driveUrl: public Google Drive folder with every Blainy screenshot. */
const DRIVE_URL = "";
/** PLACEHOLDER redditUrl: link to the Blainy posts on Reddit. */
const REDDIT_URL = "";
/** PLACEHOLDER articleUrl: link to the full written breakdown of this case study. */
const ARTICLE_URL = "";
/** PLACEHOLDER signupImg: signup dashboard screenshot, e.g. `${IMG}/signup-dashboard.webp`. Also set its real width and height below. */
const SIGNUP_IMG = "";
/** PLACEHOLDER analyticsImg: website analytics screenshot, e.g. `${IMG}/website-analytics.webp`. Also set its real width and height below. */
const ANALYTICS_IMG = "";
// ─────────────────────────────────────────────────────────────────────────────

export const blainy: CaseStudy = {
  slug: "blainy",
  name: "Blainy",
  seo: {
    title: "Blainy Case Study: 85K+ Signups Without Paid Ads | Zain",
    description:
      "Blainy case study: how an AI research paper tool got 85K+ signups and 1M+ visitors in about 14 months with Reddit, SEO and UGC. No paid ads.",
    ogImage: {
      src: `${IMG}/og-google-search-console.jpg`,
      width: 1200,
      height: 630,
      alt: "Blainy Google Search Console report: 297K clicks and 25.3M impressions",
    },
  },
  toc: [
    { id: "problem", label: "The problem" },
    { id: "what-i-did", label: "What I did" },
    { id: "results", label: "Results" },
    { id: "lessons", label: "Lessons" },
  ],
  tags: ["AI SaaS", "SEO", "Reddit", "UGC"],
  logo: { src: `${IMG}/blainy-logo.png`, width: 2000, height: 582, alt: "Blainy logo" },
  hero: {
    title: "Blainy case study: 0 to 85K+ signups,",
    accent: "zero paid ads.",
    intro:
      "This Blainy case study shows how an AI research paper writer went from launch to 85K+ signups and 1M+ website visitors in about 14 months, without spending a dollar on ads.",
    primaryCta: { label: "Tell me what's stuck", href: "/contact" },
    secondaryCta: { label: "See the results", href: "#results" },
  },
  quickFacts: [
    { label: "Client", value: "Blainy" },
    { label: "Industry", value: "AI SaaS, education" },
    { label: "My role", value: "Founding marketing hire" },
    { label: "Timeline", value: "About 14 months" },
    {
      label: "Services used",
      links: [
        { label: "SEO", href: "/services/seo-specialist-for-saas" },
        { label: "Reddit marketing", href: "/services/reddit-marketing-specialist" },
        { label: "Social media", href: "/services/social-media-marketing-specialist" },
      ],
    },
    { label: "Ad spend", value: "$0", large: true },
  ],
  keyResults: [
    { value: "0 to 85K+", label: "signups in about 14 months" },
    { value: "1M+", label: "website visitors" },
    { value: "~30M", label: "search impressions in 12 months" },
  ],
  keyResultsSource: "Sources: Blainy signup dashboard, Google Analytics, Google Search Console.",
  testimonial: {
    label: "LinkedIn recommendation",
    quote:
      "I can confidently say he played a key role in driving our product Blainy from 0 to 80,000 users organically. His ability to craft smart growth strategies and execute them effectively made a real difference in our journey.",
    name: "Khalid Bashir",
    role: "Founder, Blainy",
    avatar: { src: `${IMG}/khalid-bashir.webp`, width: 52, height: 52, alt: "Khalid Bashir" },
    originalHref: `${IMG}/linkedin-recommendation.webp`,
  },
  summary: {
    heading: "The 30 second version",
    items: [
      { title: "The problem", text: "Students wouldn't trust an AI tool for schoolwork. AI had a cheating reputation." },
      { title: "What I did", text: "SEO for the foundation, Reddit to earn trust, UGC creators to grow social." },
      { title: "The result", text: "85K+ signups and 1M+ visitors in about 14 months. Zero paid ads.", emphasis: true },
    ],
  },
  product: {
    eyebrow: "The product",
    heading: "An AI research paper writer, launched from zero",
    lead: "Blainy helps students research, outline and write essays, research papers and other academic documents with AI.",
    body: "I joined as the founding marketing hire, after working on Hify, another product from the same company. My job was traffic and signups. Along the way I also designed the graphics and wrote the user guides for every major feature, because someone had to and I was already there.",
  },
  problem: {
    eyebrow: "The problem",
    heading: { text: "Selling AI to students", accent: "when AI was the villain." },
    paragraphs: [
      "At the time, using AI for schoolwork had a reputation problem. Students heard it was cheating. Teachers said it was cheating. Plenty of students wouldn't touch an AI tool, even a legitimate one.",
      "Blainy didn't write fake papers. It helped students find and organize research faster, the same research they could dig up online themselves, just without six hours of tabs.",
    ],
    closing: ["So the job wasn't just getting attention. ", { gold: "It was getting students to trust an AI tool in a space where AI was the bad guy." }],
  },
  phases: {
    eyebrow: "What I did",
    heading: { text: "Three phases.", accent: "One compounding system." },
    items: [
      {
        number: "01",
        eyebrow: "Phase 01 · SEO",
        title: "Build the foundation first",
        intro: "I started with SEO, because it compounds and a new product needs something that keeps working while you sleep.",
        bullets: [
          [{ bold: "Authority first." }, " I built backlinks to raise the domain rating, so new pages could actually rank."],
          [{ bold: "Directories for early users." }, " I listed Blainy on Product Hunt, Trustpilot and other directories. Our first signup spikes came from there."],
          [{ bold: "High intent content." }, " I wrote 70 to 80 articles myself, aimed at what students were already searching for, alongside Blainy's free tools."],
        ],
        screenshots: [
          {
            src: `${IMG}/google-search-console.webp`,
            width: 1600,
            height: 932,
            alt: "Blainy Google Search Console performance report: 297K total clicks and 25.3M total impressions, with daily clicks and impressions rising over the period",
            caption: "Search Console · 297K clicks · 25.3M impressions",
            highlights: [
              { left: "23.3%", top: "23.4%", width: "11.6%", height: "10.6%" },
              { left: "34.4%", top: "23.4%", width: "11.6%", height: "10.6%" },
            ],
          },
          {
            src: `${IMG}/bing-webmaster-tools.webp`,
            width: 1600,
            height: 933,
            alt: "Blainy Bing Webmaster Tools search performance report showing clicks and impressions over time",
            caption: "Bing Webmaster Tools",
          },
        ],
        // Optional: an article that ranked well. Shown once title and url are both set.
        articleExample: { title: "", url: "", result: "" },
        callout: {
          title: "What didn't work",
          text: [
            "The traffic came, but signups didn't follow. Students read the article, used the free tool and left. We had readers, not users. ",
            { accent: "That's when I pitched Reddit." },
          ],
        },
      },
      {
        number: "02",
        eyebrow: "Phase 02 · Reddit",
        title: "The turning point",
        intro: "Students were already on Reddit asking how to use AI for research without getting in trouble. So that's where we went.",
        introStrong: true,
        body: "I ran the whole campaign: picked the communities, wrote the content and managed the posting. We focused on r/ChatGPT plus student, AI for students and research paper communities.",
        bullets: [
          "A normal post did 25K to 30K views. The viral ones went past 100K.",
          "We showed up in Reddit Answers, Reddit's own AI search, for research paper questions.",
          "The community started talking about us on its own. People recommended Blainy without being asked and used it regularly.",
          "The campaign ran for 3 to 4 months. Signups kept coming long after we stopped posting.",
        ],
        link: { label: "See the Blainy posts on Reddit", href: REDDIT_URL },
        screenshots: [
          {
            src: `${IMG}/reddit-link-tracker.webp`,
            width: 1489,
            height: 630,
            alt: "Link tracker for linked Blainy Reddit posts: 7,209 all time clicks, 14.89 per day, best day 165 clicks on June 10, 2024, with clicks dropping after Reddit posting stopped in August 2024",
            caption: "Link tracker · 7,209 clicks from linked Reddit posts",
            wide: true,
          },
          {
            src: `${IMG}/reddit-traffic-sources.webp`,
            width: 1822,
            height: 1409,
            alt: "Link tracker traffic sources: www.reddit.com sent 4,210 clicks, old.reddit.com 69 and redditmedia.com 39, with 4,553 referrer hits and 2,845 direct hits",
            caption: "Traffic sources · 4,210 clicks from reddit.com",
          },
          {
            src: `${IMG}/reddit-traffic-by-country.webp`,
            width: 1474,
            height: 794,
            alt: "Link tracker traffic by country: United States 2,421 clicks, United Kingdom 513, Germany 374, Canada 364, Australia 258, India 241, France 146",
            caption: "Traffic by country · USA 2,421 · UK 513 · Germany 374",
          },
        ],
        screenshotsNote: "Clicks from Reddit posts that carried a link. Most posts didn't.",
        postExample: { subreddit: "r/ChatGPTPromptGenius", title: "Is using AI for writing cheating?", views: "44K" },
        attribution: {
          title: "Why the dashboard undercounts Reddit",
          text: [
            "Roughly three times as many posts had no link at all. They just helped. So the signups we could track from Reddit links were only about a fifth of what Reddit actually drove. The rest saw a post, searched \"Blainy\" on Google and signed up from there. ",
            { bold: "Your attribution dashboard will never tell you that part." },
          ],
          tracked: ["Tracked from links:", "about 1 in 5"],
          untracked: ["Searched Blainy on Google instead:", "about 4 in 5"],
          ratio: [1, 4],
        },
      },
      {
        number: "03",
        eyebrow: "Phase 03 · UGC and creators",
        title: "Then we fixed social",
        intro: "Social wasn't growing. We were posting into the void. So I suggested UGC creators.",
        introStrong: true,
        body: "I found creators who fit the budget, then came up with the video ideas and hooks myself. Some videos hit millions of views. I also reached out to YouTubers and influencers, which got us free videos and shoutouts.",
        screenshots: [
          {
            src: `${IMG}/instagram-dashboard.webp`,
            width: 1920,
            height: 1440,
            alt: "Blainy Instagram professional dashboard: 3,952,443 views over 90 days with 98.4% from non-followers and 2,139,992 accounts reached, 612,036 interactions, 13,110 profile activity, and top Reels at 53.9K, 24.9K, 21.8K, 13.5K and 8.8K views",
            caption: "Instagram · 3.95M views · 612K interactions · 90 days",
            wide: true,
            background: "#000",
          },
          {
            src: `${IMG}/youtube-28-days.webp`,
            width: 1037,
            height: 476,
            alt: "Blainy YouTube channel analytics: 78,267 views in the last 28 days, 116.6 watch time hours and 23 new subscribers",
            caption: "YouTube · 78,267 views in 28 days",
            background: "#282828",
          },
          {
            src: `${IMG}/pinterest-pin.webp`,
            width: 1920,
            height: 1440,
            alt: "A single Blainy Pinterest video pin: 225.75K impressions, 8.41K pin clicks and 2.11K saves",
            caption: "Pinterest pin · 225.75K impressions · 8.41K clicks",
          },
          {
            src: `${IMG}/threads-insights.webp`,
            width: 1915,
            height: 875,
            alt: "Blainy Threads insights from Feb 21 to May 21: 338K total views and 11.9K total interactions",
            caption: "Threads · 338K views · 11.9K interactions",
            background: "#101010",
          },
          {
            src: `${IMG}/pinterest-90-days.webp`,
            width: 1026,
            height: 468,
            alt: "Blainy Pinterest overall performance, last 90 days: 479K impressions up 410%, 24.94K engagements, 306 outbound clicks, 4.64K saves, 347.26K total audience",
            caption: "Pinterest · 479K impressions in 90 days · up 410%",
          },
          {
            src: `${IMG}/tiktok-analytics.webp`,
            width: 1293,
            height: 141,
            alt: "Blainy TikTok analytics: 103K video views, 495 profile views, 4K likes, 91 comments and 133 shares",
            caption: "TikTok · 103K video views",
            wide: true,
          },
        ],
        screenshotsNote: "Views, impressions and interactions, not signups.",
        driveLink: { label: "See more results in Google Drive", href: DRIVE_URL },
      },
    ],
  },
  compounding: {
    eyebrow: "How it compounded",
    heading: { text: "One channel working", accent: "made every channel work." },
    intro: "Reddit was the spark. Once students trusted Blainy there, everything else picked up.",
    flows: [
      [
        { label: "Reddit posts", icons: ["reddit"] },
        { label: "People search \"Blainy\" on Google", icons: ["search"] },
        { label: "Branded search lifts rankings", icons: ["trend"] },
      ],
      [
        { label: "Instagram reels", icons: ["instagram"] },
        { label: "People search on Google", icons: ["search"] },
        { label: "Google gets the credit", icons: ["award"] },
      ],
      [
        { label: "Instagram and Pinterest", icons: ["instagram", "pinterest"] },
        { label: "Start growing without extra effort", icons: ["sprout"] },
      ],
    ],
    footnote: "Where users came from, in order: Reddit, then Google, then Instagram.",
  },
  effort: {
    heading: "What went in",
    items: [
      { value: "70 to 80", label: "articles written by me" },
      { value: "3 to 4 months", label: "of Reddit campaign" },
      { value: "$0", label: "spent on ads" },
      { value: "1", label: "marketer (me)" },
    ],
  },
  results: {
    eyebrow: "Results",
    heading: { text: "14 months later,", accent: "here's what moved." },
    items: [
      { value: "85K+", label: "signups in about 14 months", note: "(signups, not visitors)" },
      { value: "1M+", label: "website visitors" },
      { value: "~30M", label: "search impressions in 12 months" },
    ],
    privateNote: { title: "Paid conversion and cost per user", text: "Private. Happy to walk you through it on a call." },
    gallery: [
      // PLACEHOLDER signupImg: replace width and height with the screenshot's real size.
      { src: SIGNUP_IMG, width: 1600, height: 900, alt: "Blainy signup dashboard", caption: "Signup dashboard" },
      // PLACEHOLDER analyticsImg: replace width and height with the screenshot's real size.
      { src: ANALYTICS_IMG, width: 1600, height: 900, alt: "Blainy website analytics", caption: "Website analytics" },
    ],
  },
  drive: {
    heading: "Want to check every result?",
    text: "Every screenshot from this project is in one public Google Drive folder.",
    link: { label: "See all results in Google Drive", href: DRIVE_URL },
  },
  lessons: {
    eyebrow: "Lessons",
    heading: { text: "What I'd tell anyone", accent: "marketing an AI tool." },
    items: [
      { title: "Traffic isn't users.", text: "SEO brought readers. Reddit brought believers." },
      { title: "Trust beats reach.", text: "If your category has a reputation problem, go where people talk honestly, not where they scroll." },
      { title: "Don't trust your attribution dashboard.", text: "Your best channel is probably getting credit for half of what it does." },
      { title: "One working channel feeds the rest.", text: "Fix the right one first and the others get easier." },
    ],
    articleLink: { label: "Read the full breakdown", href: ARTICLE_URL },
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
        tags: "Home services · Social · Local SEO",
        logo: { src: `${IMG}/everdry-logo.gif`, width: 250, height: 80, alt: "Everdry logo" },
        stat: "603",
        statLabel: "calls from Google Business Profile, Jun to Nov",
        text: "Their social pages weren't reaching anyone. I rebuilt the content around visuals people stop for and turned the Google Business Profile into a lead source.",
        link: { label: "Read the Everdry case study", href: "/case-studies/everdry" },
      },
      {
        tags: "Content · Community · Reddit",
        logo: { src: `${IMG}/virtarix-logo.png`, width: 576, height: 176, alt: "Virtarix logo" },
        stat: "70K+",
        statLabel: "Facebook views in 3 months",
        text: "Virtarix had solid technical knowledge and almost no distribution.",
        link: { label: "Read the Virtarix case study", href: "/case-studies/virtarix" },
      },
    ],
    allLink: { label: "See all case studies", href: "/case-studies" },
  },
  cta: {
    heading: { text: "Got a product people don't trust yet?", accent: "Tell me what's stuck." },
    text: "Book a free 30 minute call. Bring the problem, I'll bring the coffee.",
    link: { label: "Tell me what's stuck", href: "/contact" },
  },
};
