import type { CaseStudy } from "./types";

const IMG = "/assets/case-studies/loompad";

// ─── PLACEHOLDERS: fill these in before going live ───────────────────────────
// Anything left empty is hidden on the page, so nothing shows a dead link.

/** PLACEHOLDER driveUrl: public Google Drive folder with every LoomPad screenshot. */
const DRIVE_URL = "";
/** PLACEHOLDER articleUrl: link to the full LoomPad story on the blog. */
const ARTICLE_URL = "";
// ─────────────────────────────────────────────────────────────────────────────

// LoomPad is Zain's own Etsy store, not a client. Numbers match the Jul to Oct 2026 shop stats (120 orders).
export const loompad: CaseStudy = {
  slug: "loompad",
  name: "LoomPad",
  seo: {
    title: "Etsy SEO Case Study: 120 Orders in 2 Months, No Ads | Zain",
    description:
      "How an Etsy desk mat store nobody could find made $4,381 from 120 orders. Better listings and smarter distribution, so searchers could finally see it.",
    ogImage: {
      src: `${IMG}/og-etsy-shop-stats-120.jpg`,
      width: 1200,
      height: 630,
      alt: "LoomPad Etsy shop stats, Jul to Oct 2026: 7,046 visits, 120 orders, 1.7% conversion rate and USD 4,381.60 revenue",
    },
  },
  toc: [
    { id: "problem", label: "The problem" },
    { id: "what-i-did", label: "What I did" },
    { id: "results", label: "Results" },
    { id: "lessons", label: "Lessons" },
  ],
  tags: ["Ecommerce", "Etsy SEO", "Listings", "Mockups"],
  logo: { src: `${IMG}/loompad-logo.webp`, width: 485, height: 120, alt: "LoomPad logo" },
  hero: {
    title: "Etsy SEO case study: 0 to 120 orders in 2 months,",
    accent: "ads switched off.",
    intro:
      "This Etsy SEO case study shows how LoomPad, my own print on demand desk mat store, went from zero sales to 120 orders in about two months, without paid ads.",
    primaryCta: { label: "Tell me what's stuck", href: "/contact" },
    secondaryCta: { label: "See the results", href: "#results" },
  },
  quickFacts: [
    { label: "Store", value: "LoomPad (my own)" },
    { label: "Industry", value: "Ecommerce, Etsy print on demand" },
    { label: "My role", value: "Owner, and the only marketer" },
    { label: "Timeline", value: "About 2 months" },
    {
      label: "Services used",
      links: [
        { label: "SEO", href: "/services/seo-specialist-for-saas" },
        { label: "Content and design", href: "/services" },
      ],
    },
    { label: "Ad spend", value: "About $20, then switched off" },
  ],
  keyResults: [
    { value: "0 to 120", label: "orders in about 2 months" },
    { value: "$4,381", label: "in sales" },
    { value: "1.7%", label: "conversion rate, from 7,046 visits" },
  ],
  keyResultsSource: "Source: Etsy shop stats.",
  reviews: {
    heading: "From buyers · 5.0 rating",
    items: [
      {
        quote: "Zain is a very caring and authentic seller... The pad was carefully crafted, highly detailed and shipped within 2 days and in perfect condition. I really appreciate this!! Will be coming back for more.",
        name: "Anna",
        role: "Etsy buyer",
        rating: 5,
      },
      {
        quote: "This mat comes exactly like the picture with the same design that looks even better in person, it also has the grip on the bottom so it doesn't slide around, and shipping was a lot faster than I had anticipated.",
        name: "Xavier",
        role: "Etsy buyer",
        rating: 5,
      },
      {
        quote: "Within an hour he had run the track with a hot wheels car... The quality of the mouse pad is spectacular, and matches the description. Looks exactly like the picture.",
        name: "Cassara",
        role: "Etsy buyer",
        rating: 5,
      },
    ],
  },
  summary: {
    heading: "The 30 second version",
    items: [
      { title: "The problem", text: "Listings got views, but nobody bought." },
      { title: "What I did", text: "Studied 20 to 30 top sellers, then rebuilt titles, tags, descriptions and mockups around what buyers search." },
      { title: "The result", text: "120 orders and a 5.0 rating in about two months. No ads.", emphasis: true },
    ],
  },
  product: {
    eyebrow: "The product",
    heading: "A side project I actually wanted to work",
    body: "LoomPad sells custom desk mats on Etsy, printed and shipped on demand. I started it for side income and run the marketing myself, which makes it the one case study where every call was mine. Good ones and bad ones.",
  },
  problem: {
    eyebrow: "The problem",
    heading: { text: "Views, but", accent: "no sales." },
    paragraphs: [
      "The first days after launch, the listings got a trickle of views. Nobody bought. Not one order.",
      ["The products were fine. ", { gold: "The listings just weren't convincing anyone, and Etsy wasn't showing them to the right people." }],
    ],
  },
  phases: {
    eyebrow: "What I did",
    heading: { text: "Four moves.", accent: "One very ignored ad dashboard." },
    items: [
      {
        number: "01",
        eyebrow: "Phase 01 · Research",
        title: "Study the people already winning",
        intro: "Before changing anything, I studied 20 to 30 of the top sellers in the category. The gap was obvious side by side. My mockups were plain and average. Theirs made the mat look like the hero of a real desk setup. Their titles were built on keywords, and their descriptions answered every question a buyer might have before they asked it.",
        screenshots: [],
      },
      {
        number: "02",
        eyebrow: "Phase 02 · Listings",
        title: "Rebuild everything a buyer sees",
        intro: "",
        bullets: [
          [{ bold: "Mockups first." }, " This is the big one. I replaced the plain mockups with ones that show each mat on a real, styled desk. Buyers decide from the photo before they read a word."],
          [{ bold: "Titles built on real keywords." }, " Titles that match what buyers type, not ones that just sound nice."],
          [{ bold: "Descriptions that answer every question:" }, " which size fits your setup, how to clean it, what it's made of, how it ships."],
          [{ bold: "Tags that do the heavy lifting." }, " On Etsy, tags are SEO."],
        ],
        screenshots: [
          {
            src: `${IMG}/buyer-photo-city-carpet.webp`,
            width: 900,
            height: 650,
            alt: "Meghan's 5 star Etsy review with a photo of the City Carpet desk mat on her husband's gaming setup",
            caption: "Buyer photo · City Carpet desk mat",
          },
        ],
        screenshotsLayout: "single",
      },
      {
        number: "03",
        eyebrow: "Phase 03 · Pricing and reviews",
        title: "Earn the first reviews, then raise the price",
        intro: "I launched below the standard price to win the first orders. Once reviews came in, I raised prices to match the market. I also reply to every review personally, because a shop that clearly cares sells the next mat.",
        screenshots: [],
      },
      {
        number: "04",
        eyebrow: "Phase 04 · Ads",
        title: "Test the ads. Kill the ads.",
        intro: "I tried Etsy ads with about $20. Views actually dropped while they ran. So I switched them off and went fully organic. Best $20 I ever spent learning something.",
        screenshots: [],
      },
    ],
    outro: {
      callout: {
        title: "What didn't work",
        bullets: [
          [{ bold: "Etsy ads." }, " About $20, and views went down."],
          [{ bold: "Titles written by ChatGPT alone." }, " They read fine but missed the keywords buyers actually search. AI can write a title. It can't do your keyword research."],
        ],
      },
      screenshots: [
        {
          src: `${IMG}/etsy-storefront-120-sales.webp`,
          width: 1920,
          height: 554,
          alt: "LoomPad Etsy storefront: banner reading Premium Desk Mats That Make Every Workspace Feel Like Your Own, with a 5.0 star rating from 27 reviews, 120 sales and 2 months on Etsy",
          caption: "Etsy storefront · 5.0 rating · 120 sales",
          wide: true,
        },
        {
          src: `${IMG}/etsy-shop-stats-120-orders.webp`,
          width: 1670,
          height: 830,
          alt: "LoomPad Etsy shop stats, all time Jul to Oct 2026: 7,046 visits, 120 orders, 1.7% conversion rate and USD 4,381.60 revenue",
          caption: "Shop stats · 120 orders · 7,046 visits",
        },
        {
          src: `${IMG}/etsy-shopper-stats.webp`,
          width: 1670,
          height: 770,
          alt: "LoomPad shopper stats: 1,113 favourites, 27 reviews, 108 cities reached. Traffic: Etsy app and pages 2,472, Etsy marketing and SEO 1,802, Etsy Search 1,554, Etsy Ads 51",
          caption: "How shoppers found the store · 1,554 from Etsy search · 51 from ads",
        },
      ],
    },
  },
  statsGrid: {
    id: "results",
    heading: "Full results",
    items: [
      { value: "120", label: "orders in about 2 months" },
      { value: "$4,381", label: "in sales" },
      { value: "7,046", label: "visits" },
      { value: "1.7%", label: "conversion rate" },
      { value: "5.0", label: "star rating" },
    ],
    source: "Source: Etsy shop stats, Jul to Oct 2026.",
  },
  effort: {
    heading: "What went in",
    items: [
      { value: "20 to 30", label: "top sellers studied" },
      { value: "About $20", label: "on ads, then switched off" },
      { value: "1", label: "person doing all of it (me)" },
    ],
  },
  drive: {
    heading: "Want to check every result?",
    text: "Every screenshot from this project is in one public Google Drive folder.",
    link: { label: "See all results in Google Drive", href: DRIVE_URL },
  },
  lessons: {
    eyebrow: "Lessons",
    heading: { text: "What I'd tell", accent: "anyone starting on Etsy." },
    items: [
      { title: "Study the top 20 before you touch anything.", text: "The answer is usually sitting on page one." },
      { title: "Mockups sell. Words close.", text: "Buyers decide from the photo, then read to confirm." },
      { title: "Answer the questions before they're asked.", text: "Size, cleaning, shipping. Every unanswered question is a lost sale." },
      { title: "Ads can't fix a weak listing.", text: "Fix the listing first. Then decide if you even need ads." },
    ],
    articleLink: { label: "Read the full LoomPad story on the blog", href: ARTICLE_URL },
  },
  servicesUsed: {
    heading: "Services used here",
    items: [
      { label: "SEO specialist for SaaS", href: "/services/seo-specialist-for-saas" },
      { label: "Growth marketing services", href: "/services" },
    ],
  },
  card: {
    tags: "Etsy · SEO · Listings",
    stat: "$4,381",
    statLabel: "in Etsy sales from 120 orders",
    text: "My own Etsy store, rebuilt around what buyers search: titles, tags, descriptions and mockups.",
  },
  cta: {
    heading: { text: "Getting views", accent: "but no sales?" },
    text: "Book a free call. Bring the problem, I'll bring the coffee.",
    link: { label: "Tell me what's stuck", href: "/contact" },
  },
};
