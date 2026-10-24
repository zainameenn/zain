// Every price, package and comparison row on the site comes from here.
// The pricing page, each service page and the homepage preview all read this file,
// so a price changes in one place.
//
// STATUS: draft. These packages were proposed on Oct 24, 2026 and need Zain's sign off
// before they go live. See docs/pricing-v2/approval.md for the terms to confirm.

export type Interval = "month" | "once";

export type Package = {
  id: string;
  name: string;
  /** Who it's for, one line. */
  forWho: string;
  /** Fixed price in USD. Leave out for custom pricing. */
  price?: number;
  /** "from" shows the price as a starting point, not a quote. */
  priceType: "fixed" | "from" | "custom";
  interval: Interval;
  /** The main reason to pick it. */
  benefit: string;
  /** The 4 to 6 most important things, shown on the card. */
  highlights: string[];
  notIncluded?: string[];
  /** A short, accurate label. Never "Most popular" without sales data. */
  label?: string;
  cta: string;
  status: "draft" | "live";
};

export type CompareRow = { label: string; values: (string | boolean)[] };
export type CompareGroup = { group: string; rows: CompareRow[] };

export type Service = {
  id: ServiceId;
  name: string;
  /** Canonical service page. */
  href: string;
  /** One line for the pricing page service list. */
  summary: string;
  forWho: string;
  heading: { regular: string; accent: string };
  intro: string;
  packages: Package[];
  compare: CompareGroup[];
  /** Plain definitions, e.g. what counts as a content piece. */
  definitions?: { term: string; meaning: string }[];
  excluded: string[];
  faqs: [string, string][];
};

export type ServiceId = "seo" | "reddit" | "social" | "ads" | "growth";

export const CURRENCY = "USD";
export const CONTACT_HREF = "/contact";

export function formatPrice(p: Pick<Package, "price" | "priceType" | "interval">): { amount: string; note: string } {
  if (p.priceType === "custom" && !p.price) return { amount: "Custom", note: "scoped after a call" };
  const amount = `$${(p.price ?? 0).toLocaleString("en-US")}`;
  const per = p.interval === "month" ? "per month" : "one time";
  return p.priceType === "from" ? { amount: `From ${amount}`, note: per } : { amount, note: per };
}

/** The lowest fixed or starting price for a service, for "from" lines. */
export function startingPrice(s: Service): Package {
  return [...s.packages].filter((p) => p.price).sort((a, b) => (a.price ?? 0) - (b.price ?? 0))[0];
}

// ---------- SEO ----------

const seo: Service = {
  id: "seo",
  name: "SEO",
  href: "/services/seo-specialist-for-saas",
  summary: "Research, technical fixes, page optimization and original articles that build organic traffic.",
  forWho: "SaaS and small businesses that want search traffic they don't pay for per click.",
  heading: { regular: "SEO packages built", accent: "around your goals." },
  intro: "Pick the amount of work your site needs each month. Every plan starts with a review, so the work goes where it matters first.",
  packages: [
    {
      id: "seo-foundations",
      name: "SEO Foundations",
      forWho: "Small businesses and early SaaS building a reliable SEO base.",
      price: 1499,
      priceType: "fixed",
      interval: "month",
      benefit: "Fix what's holding your existing pages back before you spend on new content.",
      highlights: ["Initial SEO review and priorities", "Keyword and search intent mapping", "Technical SEO issue assessment", "Up to 5 existing pages optimized a month", "Internal linking improvements", "Monthly report and strategy review"],
      notIncluded: ["New articles", "Outreach and link building"],
      cta: "Start with Foundations",
      status: "draft",
    },
    {
      id: "seo-growth",
      name: "SEO Growth",
      forWho: "Businesses ready for steady organic traffic and qualified leads.",
      price: 2499,
      priceType: "fixed",
      interval: "month",
      benefit: "Adds original articles and topic clusters on top of the foundation work.",
      highlights: ["Everything in Foundations", "Up to 8 existing pages optimized a month", "Up to 2 original, research based articles a month", "Content refresh recommendations", "Topic cluster and internal linking work", "Outreach research"],
      label: "For growing businesses",
      cta: "Start with Growth",
      status: "draft",
    },
    {
      id: "seo-scale",
      name: "SEO Scale",
      forWho: "Larger sites, several products or more complex organic growth.",
      price: 3999,
      priceType: "from",
      interval: "month",
      benefit: "More capacity and deeper strategy, scoped after a discovery call.",
      highlights: ["Larger technical SEO projects", "Broader content production", "Advanced competitor analysis", "Multi category or multi market strategy", "More implementation capacity", "Advanced reporting"],
      cta: "Talk about Scale",
      status: "draft",
    },
  ],
  compare: [
    {
      group: "Strategy",
      rows: [
        { label: "Strategy and research", values: ["Core", "Ongoing", "Advanced"] },
        { label: "Keyword mapping", values: [true, true, true] },
        { label: "Strategy meetings", values: ["Monthly", "Monthly", "As agreed"] },
      ],
    },
    {
      group: "Search",
      rows: [
        { label: "Technical SEO", values: ["Assessment", "Assessment and fixes", "Larger projects"] },
        { label: "On page SEO", values: [true, true, true] },
        { label: "Existing pages optimized a month", values: ["Up to 5", "Up to 8", "Scoped"] },
        { label: "Internal linking", values: [true, "Plus topic clusters", "Plus topic clusters"] },
        { label: "Outreach research", values: [false, true, true] },
      ],
    },
    {
      group: "Content",
      rows: [
        { label: "Original articles a month", values: [false, "Up to 2", "Scoped"] },
        { label: "Content refreshes", values: [false, "Recommendations", "Recommendations and rewrites"] },
      ],
    },
    {
      group: "Reporting",
      rows: [
        { label: "Reporting", values: ["Monthly", "Monthly", "Advanced"] },
        { label: "Implementation", values: ["I make the changes when I have access", "I make the changes when I have access", "Shared with your team as agreed"] },
      ],
    },
  ],
  excluded: ["Guaranteed rankings or traffic numbers", "A set number of backlinks", "Website development or redesigns"],
  faqs: [
    ["Do you guarantee rankings?", "No. Nobody honest can. You get clear work each month and a report that shows what moved and why."],
    ["Can I start with the audit?", "Yes. The $499 audit gives you a ranked list of fixes. If you move to a monthly plan, we start from it."],
    ["Who makes the changes on my site?", "I do when I have access. If your team prefers to make them, I hand over clear instructions."],
  ],
};

// ---------- Reddit ----------

const reddit: Service = {
  id: "reddit",
  name: "Reddit Marketing",
  href: "/services/reddit-marketing-specialist",
  summary: "Research and real participation in the communities your buyers already read.",
  forWho: "SaaS and service brands whose buyers ask for advice on Reddit.",
  heading: { regular: "Reddit marketing packages", accent: "for real community growth." },
  intro: "Start with research, or go straight to ongoing participation. Every plan follows Reddit's rules and each subreddit's own rules.",
  packages: [
    {
      id: "reddit-research",
      name: "Reddit Strategy & Community Research",
      forWho: "Brands that want a clear Reddit map before paying for ongoing work.",
      price: 599,
      priceType: "fixed",
      interval: "once",
      benefit: "Know where your buyers talk, what the rules are and what to post first.",
      highlights: ["Relevant subreddit research", "Community rule review", "Competitor discussion analysis", "Audience and search intent research", "Content opportunity map", "30 day action plan"],
      notIncluded: ["Posting or commenting"],
      cta: "Get the research",
      status: "draft",
    },
    {
      id: "reddit-growth",
      name: "Reddit Community Growth",
      forWho: "Brands that want steady, genuine visibility in relevant communities.",
      price: 1499,
      priceType: "fixed",
      interval: "month",
      benefit: "Ongoing, helpful participation, planned and written for you.",
      highlights: ["Ongoing community research", "Account and participation strategy", "Discussion monitoring", "Up to 4 original posts a month", "Up to 16 relevant comments a month", "Monthly report"],
      label: "For steady presence",
      cta: "Start Community Growth",
      status: "draft",
    },
    {
      id: "reddit-visibility",
      name: "Reddit Growth & Visibility",
      forWho: "SaaS brands using Reddit as a main research and acquisition channel.",
      price: 2499,
      priceType: "fixed",
      interval: "month",
      benefit: "Wider coverage, more participation and support for founder accounts.",
      highlights: ["Wider subreddit research", "More monitoring and opportunity discovery", "Up to 6 original posts a month", "Up to 30 relevant comments a month", "Founder participation support", "Reddit search visibility research"],
      cta: "Start Growth & Visibility",
      status: "draft",
    },
  ],
  compare: [
    {
      group: "Strategy",
      rows: [
        { label: "Subreddit research", values: ["One time", "Ongoing", "Wider, ongoing"] },
        { label: "Community rule review", values: [true, true, true] },
        { label: "Participation and positioning strategy", values: ["30 day plan", true, "Plus positioning"] },
      ],
    },
    {
      group: "Community",
      rows: [
        { label: "Discussion monitoring", values: [false, true, "Wider"] },
        { label: "Original posts a month", values: [false, "Up to 4", "Up to 6"] },
        { label: "Relevant comments a month", values: [false, "Up to 16", "Up to 30"] },
        { label: "Founder participation support", values: [false, false, true] },
      ],
    },
    {
      group: "Search",
      rows: [{ label: "Reddit search visibility research", values: [false, false, true] }],
    },
    {
      group: "Reporting",
      rows: [{ label: "Reporting and review", values: ["Final report", "Monthly", "Monthly plus strategy review"] }],
    },
  ],
  definitions: [{ term: "Post and comment numbers", meaning: "These are ceilings, not quotas. If a thread isn't a good fit or a subreddit's rules say no, I don't post just to hit a number." }],
  excluded: ["Fake accounts, vote buying or staged conversations", "Guaranteed post survival or account safety", "Guaranteed rankings in Google or AI answers", "Reddit ads"],
  faqs: [
    ["Will my posts get removed?", "Sometimes, even when they follow the rules. Moderators decide. I keep posts useful and within the rules to keep that rare."],
    ["Do you use fake accounts or upvotes?", "Never. It breaks Reddit's rules and it gets brands banned. Everything is genuine participation."],
    ["Do I need the research first?", "No, but it helps. If you start a monthly plan, the first weeks cover the same research."],
  ],
};

// ---------- Social ----------

const social: Service = {
  id: "social",
  name: "Social Media",
  href: "/services/social-media-marketing-specialist",
  summary: "Planned, designed and scheduled content for the platforms your customers use.",
  forWho: "Small businesses and brands that want a consistent, professional presence.",
  heading: { regular: "Social media packages", accent: "that make sense." },
  intro: "Choose by how many platforms you need and how much content you want each month. Every plan includes planning, design and scheduling.",
  packages: [
    {
      id: "social-essentials",
      name: "Social Essentials",
      forWho: "Small businesses setting up a professional presence.",
      price: 799,
      priceType: "fixed",
      interval: "month",
      benefit: "A steady, good looking feed without you having to think about it.",
      highlights: ["Up to 2 platforms", "8 original content pieces a month", "Platform adaptations", "Basic branded graphics", "Scheduling", "Monthly report"],
      cta: "Start Essentials",
      status: "draft",
    },
    {
      id: "social-growth",
      name: "Social Growth",
      forWho: "Businesses that want consistent content and stronger positioning.",
      price: 1499,
      priceType: "fixed",
      interval: "month",
      benefit: "Twice the content, carousels and a planned calendar.",
      highlights: ["Up to 3 platforms", "16 original content pieces a month", "Branded graphics and carousels", "Up to 4 carousels within the 16", "Content planning and scheduling", "Monthly report and review"],
      label: "For growing businesses",
      cta: "Start Growth",
      status: "draft",
    },
    {
      id: "social-plus",
      name: "Social Plus",
      forWho: "Brands that need more creative output and coordination.",
      price: 2299,
      priceType: "fixed",
      interval: "month",
      benefit: "More platforms, short video edits and light community monitoring.",
      highlights: ["Up to 4 platforms", "20 original content pieces a month", "Up to 4 short video edits from your footage", "Detailed content planning", "Publishing support and light monitoring", "Monthly report and planning call"],
      cta: "Start Plus",
      status: "draft",
    },
  ],
  compare: [
    {
      group: "Content",
      rows: [
        { label: "Platforms", values: ["Up to 2", "Up to 3", "Up to 4"] },
        { label: "Original content a month", values: ["8", "16", "20"] },
        { label: "Platform adaptations", values: [true, true, true] },
        { label: "Graphics", values: ["Basic branded", "Branded", "Branded"] },
        { label: "Carousels", values: [false, "Up to 4", "Up to 4"] },
        { label: "Short video edits", values: [false, false, "Up to 4"] },
        { label: "Revisions", values: ["1 round per piece", "1 round per piece", "2 rounds per piece"] },
      ],
    },
    {
      group: "Strategy",
      rows: [
        { label: "Content calendar", values: ["Simple", true, "Detailed"] },
        { label: "Scheduling", values: [true, true, "Plus publishing support"] },
      ],
    },
    {
      group: "Community",
      rows: [{ label: "Community monitoring", values: [false, false, "Light, as defined"] }],
    },
    {
      group: "Reporting",
      rows: [
        { label: "Reporting", values: ["Monthly", "Monthly", "Monthly"] },
        { label: "Meetings", values: [false, "Monthly review", "Monthly planning call"] },
      ],
    },
  ],
  definitions: [
    { term: "Original content piece", meaning: "One new post idea, written and designed. Resizing or rewording it for another platform is an adaptation, not a new piece." },
    { term: "Graphic", meaning: "A single branded image." },
    { term: "Carousel", meaning: "A multi slide post. It counts as one content piece." },
    { term: "Reel or short video edit", meaning: "A short vertical video cut from footage you send, with captions and simple text. Filming isn't included." },
    { term: "Revision", meaning: "One round of changes to a piece before it's scheduled." },
  ],
  excluded: ["Filming or studio production", "Unlimited design", "Full inbox and comment management", "Paid social ads (see Ads)"],
  faqs: [
    ["Do you film content?", "No. I edit footage you send. If you need filming, I can point you to someone local."],
    ["Do you reply to every comment and message?", "No. Plus includes light monitoring, as agreed at the start. Full inbox management isn't part of any plan."],
    ["Can I add a platform later?", "Yes. Moving up a plan covers more platforms and more content."],
  ],
};

// ---------- Ads ----------

const ads: Service = {
  id: "ads",
  name: "Paid Ads",
  href: "/services/google-and-meta-ads-specialist",
  summary: "Google and Meta campaigns managed, tested and reported on. Ad spend stays separate.",
  forWho: "Businesses that want paid traffic managed properly, with tracking they can trust.",
  heading: { regular: "Ads management pricing,", accent: "without hidden costs." },
  intro: "The price below is the management fee. You pay your ad spend straight to Google or Meta, so you always see exactly where it goes.",
  packages: [
    {
      id: "ads-essentials",
      name: "Ads Essentials",
      forWho: "Businesses advertising on one platform.",
      price: 899,
      priceType: "fixed",
      interval: "month",
      benefit: "One platform, managed and tested properly.",
      highlights: ["Google Ads or Meta Ads", "One ad account", "Up to 3 campaigns", "Initial tracking review", "Ad copy testing", "Ongoing optimization and monthly report"],
      cta: "Start Essentials",
      status: "draft",
    },
    {
      id: "ads-growth",
      name: "Ads Growth",
      forWho: "Businesses running both Google and Meta.",
      price: 1699,
      priceType: "fixed",
      interval: "month",
      benefit: "Both platforms planned together, with more testing.",
      highlights: ["Up to 2 platforms", "Up to 6 campaigns", "Campaign planning and optimization", "Conversion tracking assessment", "More copy and creative testing with your assets", "Monthly report and strategy review"],
      label: "For Google and Meta",
      cta: "Start Growth",
      status: "draft",
    },
    {
      id: "ads-performance",
      name: "Performance Ads",
      forWho: "Larger accounts and more advanced testing.",
      priceType: "custom",
      interval: "month",
      benefit: "Bigger portfolios, more markets and deeper testing, scoped to your account.",
      highlights: ["Larger campaign portfolios", "Advanced conversion tracking", "Extra accounts or markets", "Complex creative testing", "Landing page test coordination", "Wider reporting"],
      cta: "Talk about your account",
      status: "draft",
    },
  ],
  compare: [
    {
      group: "Advertising",
      rows: [
        { label: "Platforms", values: ["1", "Up to 2", "As scoped"] },
        { label: "Ad accounts", values: ["1", "As agreed", "Several"] },
        { label: "Campaigns", values: ["Up to 3", "Up to 6", "Larger portfolio"] },
        { label: "Copy and creative testing", values: ["Copy", "Copy and creative", "Advanced"] },
        { label: "Landing page tests", values: [false, false, "Coordination"] },
      ],
    },
    {
      group: "Strategy",
      rows: [
        { label: "Tracking", values: ["Initial review", "Conversion assessment", "Advanced setup"] },
        { label: "Campaign planning", values: [true, true, true] },
      ],
    },
    {
      group: "Reporting",
      rows: [
        { label: "Reporting", values: ["Monthly", "Monthly", "Wider, as agreed"] },
        { label: "Strategy review", values: [false, true, true] },
      ],
    },
  ],
  excluded: ["Ad spend (you pay Google and Meta directly)", "Guaranteed ROAS, sales or conversions", "Landing page builds", "Filming or complex creative production"],
  faqs: [
    ["Is ad spend included?", "No. The fee is for management. You pay Google or Meta directly, from your own account."],
    ["Who owns the ad accounts?", "You do. I work inside your accounts, so the data and history stay with you."],
    ["Is there a setup fee?", "Not by default. If an account needs a big rebuild, I'll quote that before we start."],
  ],
};

// ---------- Growth ----------

const growth: Service = {
  id: "growth",
  name: "Growth Strategy",
  href: "/services/saas-growth-consultant",
  summary: "A diagnosis, a 90 day plan, or ongoing growth management across channels.",
  forWho: "Founders who need to know what to fix first, or want it handled.",
  heading: { regular: "Choose the growth support", accent: "your business needs." },
  intro: "Start with a diagnosis, get a full 90 day plan, or have the work coordinated for you each month.",
  packages: [
    {
      id: "growth-diagnosis",
      name: "Growth Diagnosis",
      forWho: "Businesses that know something is off but not what.",
      price: 499,
      priceType: "fixed",
      interval: "once",
      benefit: "Find the biggest bottlenecks and what to do first.",
      highlights: ["Review of your current marketing", "Acquisition and conversion bottlenecks", "Positioning and offer clarity review", "Priority recommendations", "Short action plan"],
      cta: "Start the diagnosis",
      status: "draft",
    },
    {
      id: "growth-sprint",
      name: "Growth Strategy Sprint",
      forWho: "Teams that want a full plan they can run themselves.",
      price: 1499,
      priceType: "fixed",
      interval: "once",
      benefit: "A detailed 90 day roadmap, handed over and explained.",
      highlights: ["Business and customer analysis", "Competitor and channel research", "Positioning and offer recommendations", "Funnel and conversion opportunities", "Channel priorities", "90 day roadmap and handover"],
      label: "For a full plan",
      cta: "Book the sprint",
      status: "draft",
    },
    {
      id: "growth-integrated",
      name: "Integrated Growth Management",
      forWho: "Businesses that want strategy and execution coordinated across channels.",
      price: 4499,
      priceType: "from",
      interval: "month",
      benefit: "One plan, up to two active channels at a time, managed for you.",
      highlights: ["Growth strategy and monthly priorities", "Up to 2 active channels at a time", "Cross channel coordination", "Execution planning", "Monthly performance review", "Agreed strategy meetings"],
      cta: "Talk about Complete Growth",
      status: "draft",
    },
  ],
  compare: [
    {
      group: "Consulting",
      rows: [
        { label: "Marketing review", values: [true, "Deeper", "Ongoing"] },
        { label: "Competitor and channel research", values: [false, true, true] },
        { label: "Positioning and offer", values: ["Review", "Recommendations", "Ongoing"] },
        { label: "Roadmap", values: ["Short action plan", "90 days", "Monthly priorities"] },
      ],
    },
    {
      group: "Strategy",
      rows: [
        { label: "Execution", values: [false, false, "Up to 2 channels at a time"] },
        { label: "Strategy meetings", values: ["Walkthrough", "Handover", "As agreed"] },
      ],
    },
    {
      group: "Reporting",
      rows: [{ label: "Performance review", values: [false, false, "Monthly"] }],
    },
  ],
  excluded: ["Unlimited access to every service", "Ad spend and paid tools", "Guaranteed revenue or growth numbers"],
  faqs: [
    ["Is Integrated Growth every service at once?", "No. We pick up to two active channels based on the plan, and change them as priorities change."],
    ["What if I need more than two channels?", "We scope it on a call. Larger engagements are priced to the work."],
    ["Does the diagnosis count toward a bigger plan?", "It's the starting point for one, so nothing gets repeated."],
  ],
};

export const SERVICES: Record<ServiceId, Service> = { seo, reddit, social, ads, growth };
export const SERVICE_ORDER: ServiceId[] = ["seo", "reddit", "social", "ads", "growth"];

// ---------- One time services (pricing page) ----------

export type OneTime = { name: string; price?: number; scope: string; next: string; href: string };

export const ONE_TIME: OneTime[] = [
  { name: "Free Social Media Check", scope: "I look at your profiles and tell you why posts aren't getting seen.", next: "Book a short call.", href: CONTACT_HREF },
  { name: "Full SEO Audit", price: 499, scope: "Technical health, on page issues, keywords, content gaps and competitors, ranked by what to fix first.", next: "You get the ranked fix list and a walkthrough.", href: `${seo.href}#pricing` },
  { name: "Reddit Strategy & Community Research", price: 599, scope: "Where your buyers talk, the rules in each place and a 30 day plan.", next: "Run it yourself or move to a monthly plan.", href: `${reddit.href}#pricing` },
  { name: "Growth Diagnosis", price: 499, scope: "Your biggest acquisition and conversion bottlenecks, with priorities.", next: "A short action plan you can start on right away.", href: `${growth.href}#pricing` },
  { name: "Growth Strategy Sprint", price: 1499, scope: "A full 90 day roadmap across positioning, channels and funnel.", next: "A handover call so your team can run it.", href: `${growth.href}#pricing` },
];

/** The SEO audit, shown under the SEO packages. */
export const SEO_AUDIT = {
  name: "Full SEO Audit",
  price: 499,
  covers: ["Technical health and indexing", "On page issues on key pages", "Keyword and search intent gaps", "Content and internal linking gaps", "Competitor comparison", "A fix list ranked by impact"],
};

/** Integrated Growth Management, shown as "Complete Growth" on the pricing page. */
export const COMPLETE_GROWTH = growth.packages[2];
