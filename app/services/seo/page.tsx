import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowIcon, Emphasis, Squiggle } from "../../HomeComponents/icons";
import { FAQAccordion } from "../../HomeComponents/FAQAccordion";
import { SeoStepsTabs } from "./SeoStepsTabs";

export const metadata = buildMetadata({
  title: "Freelance SEO Expert for SaaS & Service Businesses | Zain",
  description:
    "Hire a freelance SEO expert for Google and AI search. Technical fixes, original content and links for $1,999/mo, or start with a $499 SEO audit.",
  path: "/services/seo",
});

const MAX = 1360;
const PAD = "clamp(20px,4vw,48px)";
const SEC_PAD = `clamp(96px,9vw,128px) ${PAD} 0`;

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", height: 32, padding: "0 14px", borderRadius: 16, background: "#1C1C1C", color: "#F2EFEA", fontSize: 13, fontWeight: 500, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return <div className="max-md:!text-center" style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: dark ? "#C4A47C" : "#8B877F" }}>{children}</div>;
}

function SectionHead({ eyebrow, title, sub, dark }: { eyebrow: string; title: React.ReactNode; sub: React.ReactNode; dark?: boolean }) {
  return (
    <div style={{ display: "grid", gap: "16px 48px", alignItems: "end", marginBottom: "clamp(28px,3vw,40px)" }} className="md:!grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] max-md:!text-center">
      <div>
        <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
        <h2 className="max-md:!text-balance" style={{ margin: "12px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(34px,3.6vw,50px)", lineHeight: 1.04, letterSpacing: "-0.035em", color: dark ? "#F2EFEA" : "#1C1C1C" }}>{title}</h2>
      </div>
      <p className="max-md:!mx-auto" style={{ margin: 0, fontSize: 16.5, lineHeight: 1.55, color: dark ? "#B7B2A8" : "#5A5854", maxWidth: 420 }}>{sub}</p>
    </div>
  );
}

/** Bare word/phrase with the gold hand-drawn underline, no italics (matches the source's inline squiggle-only spans). */
function Underline({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}>
      {children}
      <Squiggle />
    </span>
  );
}

const PROOF = [
  { v: "50M+", l: "search impressions across work" },
  { v: "~30M", l: "Blainy search impressions" },
  { v: "85K+", l: "Blainy users" },
  { v: "800–900", l: "daily visitors in 20 days, up from ~100" },
];

const PROBLEM_LIST = [
  "The problem might be technical.",
  "It might be search intent.",
  "It might be weak pages.",
  "It might be content nobody needed.",
  "Or the site might be getting found by the wrong people.",
];

const LAYERS = [
  {
    n: "01",
    t: "Search strategy",
    d: "Find the searches worth winning before spending months trying to rank for things that will never become customers.",
    tags: ["Commercial intent", "Keyword opportunities", "SERP research", "Competitors", "Content architecture"],
    alt: "Illustration of Search strategy: queries clustered by intent, SERP research, then one page built to win",
    img: "04-layer-1__search-strategy.png",
  },
  {
    n: "02",
    t: "Technical SEO",
    d: "Make sure search engines can crawl, load and understand the site before asking better content to do all the work.",
    tags: ["Crawlability", "Indexing", "Site structure", "Internal links", "Search Console"],
    alt: "Illustration of Technical SEO: crawl blocks and orphan pages fixed into a clean, indexed site structure",
    img: "04-layer-2__technical-seo.png",
  },
  {
    n: "03",
    t: "Content & on-page SEO",
    d: "Build pages around what people actually want to know, then give them something better than the thirty pages already saying the same thing.",
    tags: ["Search intent", "Original content", "Landing pages", "Metadata", "Content refreshes"],
    alt: "Illustration of Content: search inputs shaped into an outline, then a complete page that ranks",
    img: "04-layer-3__content-on-page.png",
  },
  {
    n: "04",
    t: "Authority & off-page visibility",
    d: "Earn mentions and links from places search engines already trust.",
    tags: ["Link outreach", "Brand mentions", "Citations", "Publisher relationships", "Community visibility"],
    alt: "Illustration of Authority: links and mentions from blogs, Reddit, podcasts and partners pointing to one page",
    img: "04-layer-4__authority-off-page.png",
  },
];

const GEO_TAGS = ["AI crawler access", "Original data and research", "Brand mentions across the web", "Reddit and forum presence", "AI referral tracking"];

const SEARCH_STEPS = [
  { n: "01", t: "Search demand", d: "Understand what people are looking for." },
  { n: "02", t: "Intent", d: "Separate research from buying intent." },
  { n: "03", t: "Page", d: "Build the right page or content for that search." },
  { n: "04", t: "Visibility", d: "Get discovered across Google, Bing and AI answers." },
  { n: "05", t: "Conversion", d: "Turn qualified traffic into an action." },
];

const RESULTS_LIST = [
  { n: "01", who: "Blainy", detail: "Google Search Console", value: "297K clicks" },
  { n: "02", who: "Blainy", detail: "Bing Webmaster Tools", value: "38.8K clicks" },
  { n: "03", who: "Recent client", detail: "First 20 days", value: "~100 → 800–900 daily visitors" },
];

const TURNAROUND_STATS = [
  { l: "Before", v: "~100", sub: "daily visitors" },
  { l: "After", v: "800–900", sub: "daily visitors" },
  { l: "Timeframe", v: "20 days", sub: "from the start of the work" },
  { l: "What changed", v: "Original content", sub: "replacing AI-first pages", gold: true },
];

const BEFORE_STATS = [
  { v: "2.97K", l: "clicks in ~4 months" },
  { v: "0.3%", l: "average CTR" },
  { v: "40", l: "average position" },
  { v: "~100", l: "daily visitors, AI-heavy content" },
];

const AFTER_STATS = [
  { v: "11.8K", l: "clicks in under 4 weeks" },
  { v: "1.8%", l: "average CTR, up from 0.3%" },
  { v: "13.4", l: "average position, up from 40" },
  { v: "800–900", l: "daily visitors" },
];

const PRICING_CATEGORIES = [
  { h: "Search & strategy", items: ["Keyword research", "Competitor research", "Commercial intent", "SERP analysis"] },
  { h: "Technical", items: ["Search Console", "Indexing / crawling", "Internal links", "Page improvements"] },
  { h: "Content", items: ["Original articles", "Content refreshes", "Landing pages", "Search-intent optimization"] },
  { h: "Authority", items: ["Link outreach", "Citations", "Brand mentions"] },
  { h: "AI / GEO", items: ["AI crawler access review", "Original-data opportunities", "Brand/source visibility", "AI referral monitoring"] },
];

const FIT_GOOD = [
  "People already search for what you sell.",
  "You have a real product or service.",
  "You want acquisition that compounds.",
  "You're willing to improve pages, not just publish articles.",
  "You can give SEO time to work.",
  "You're willing to publish something original enough to deserve visibility.",
];

const FIT_BAD = ["You need page one by next Friday.", "You want guaranteed rankings.", "You only want a fixed number of AI articles.", "The product itself is still completely unvalidated."];

const FAQS: [string, string[]][] = [
  [
    "How much does it cost to hire an SEO expert?",
    [
      "My SEO plan is $1,999 a month, billed weekly or every two weeks. If you are not ready for monthly work, the full website and SEO audit is $499.",
      "For context, most SEO freelancers charge around $1,350 a month and agencies average around $3,200. You get senior work, one person to talk to, and no agency markup.",
    ],
  ],
  [
    "Is SEO still worth paying for in 2026?",
    [
      "It's worth it, but the old playbook is dead. Google doesn't punish AI. It punishes mass produced content with nothing new in it. In 2024, sites built on that went from thousands of visitors a day to zero overnight.",
      "What works now is content with something original: real research, insights from forums and communities, and data nobody else has. Google says that's also what gets you into AI Overviews. So one piece of work covers both.",
    ],
  ],
  [
    "Is SEO dead because of AI?",
    [
      "No. AI changed what gets rewarded, not whether search matters. People still search, and AI answers still pull from pages that earn trust.",
      "AI scrap is still AI scrap. Pages with original insight keep ranking and keep getting cited.",
    ],
  ],
  [
    "Can ChatGPT do SEO for me? Which AI is best for SEO?",
    [
      "It makes the work faster. Things that took me a week now take a couple of hours. But AI can't decide what's worth ranking for or add the insight that makes a page stand out. That part still needs a person.",
      "The best AI for SEO is the one used by someone who knows what to check. I use several for research and drafting, and none of them publish anything unedited.",
    ],
  ],
  [
    "Can I do SEO myself?",
    [
      "Yes, especially early on. Fix the technical basics, write pages that answer real buyer questions, and check Search Console every week.",
      "Where most people get stuck is choosing what to go after and knowing what to fix first. That is usually where an audit pays for itself.",
    ],
  ],
  [
    "What does an SEO expert actually do?",
    [
      "Five layers of work. Search strategy: finding the searches worth winning. Technical SEO: making sure Google can crawl, load and understand your site. On-page SEO: the content, headings, metadata and internal links on each page. Off-page SEO: earning links and mentions from other sites.",
      "And now GEO: making sure AI tools like ChatGPT and Gemini can find your site and have a reason to quote it. That includes visibility across sources such as community discussions and forums, because people search in far more places than Google now.",
      "Links are still the slow part. The good ones come from giving journalists and publishers credible information they want to cite. Directories such as Crunchbase or Product Hunt can help discovery, but many profile links pass little direct ranking authority on their own.",
    ],
  ],
  [
    "What is the 80/20 rule in SEO?",
    [
      "A small number of pages and fixes usually drive most of the results. The job is finding those first: the few technical issues blocking many pages, the handful of searches that bring buyers, the pages closest to ranking.",
      "That is why the audit ranks fixes in order instead of handing you a long list.",
    ],
  ],
  [
    "How long does SEO take to work?",
    [
      "Google says four months to a year. With faster research and production, I usually see early movement on less competitive keywords in 2 to 3 months.",
      "The bigger results take longer, and anyone promising page one by next month is guessing.",
    ],
  ],
];

const RELATED = [
  { t: "Reddit Marketing", d: "Show up where buyers ask for recommendations, and in the threads Google ranks.", href: "/services/reddit-marketing" },
  { t: "Growth Strategy & GTM", d: "Find the real constraint before deciding SEO is the answer.", href: "/services/growth-strategy" },
];

export default function SeoPage() {
  return (
    <main id="top" style={{ overflowX: "clip" }}>
      {/* HERO */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(40px,5vw,72px) ${PAD} clamp(48px,5vw,72px)`, display: "grid", gap: "48px clamp(32px,4vw,64px)", alignItems: "center" }} className="md:!grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)]">
        <div style={{ minWidth: 0 }} className="max-md:!text-center">
          <h1 className="max-md:!block max-md:!text-balance" style={{ margin: 0, display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#5A5854" }}>
            <span aria-hidden="true" className="max-md:!mr-2.5 max-md:!inline-block max-md:!align-middle" style={{ width: 8, height: 8, borderRadius: "50%", background: "#C4A47C", flex: "0 0 auto" }} />
            SEO expert for SaaS and service businesses
          </h1>
          <p className="max-md:!mx-auto max-md:!text-balance" style={{ margin: "22px 0 0", maxWidth: 640, fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(42px,4.8vw,70px)", lineHeight: 1.02, letterSpacing: "-0.04em" }}>
            Get found by people
            <br />
            already looking for
            <br />
            <Underline>what you sell.</Underline>
          </p>
          <p className="max-md:!mx-auto max-md:!text-balance" style={{ margin: "18px 0 0", maxWidth: 560, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "clamp(26px,2.6vw,36px)", lineHeight: 1.1, color: "#6B6862" }}>
            Traffic is nice. Qualified demand is better.
          </p>
          <p className="max-md:!mx-auto" style={{ margin: "28px 0 0", maxWidth: 520, fontSize: 18, lineHeight: 1.55, color: "#4E4C48" }}>
            I find the searches worth winning on Google and in AI answers like ChatGPT, fix what&apos;s holding your site back, and build the pages and content around them.
          </p>
          <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 20px" }} className="max-md:!mx-auto max-md:!max-w-[400px] max-md:!flex-col max-md:!items-stretch">
            <a href="#contact" className="max-md:!justify-center" style={{ display: "inline-flex", alignItems: "center", gap: 12, height: 56, padding: "0 26px", borderRadius: 12, background: "#1C1C1C", color: "#F8F6F4", fontSize: 16, fontWeight: 600 }}>
              Show me your site
              <ArrowIcon />
            </a>
            <a href="#results" className="max-md:!justify-center" style={{ display: "inline-flex", alignItems: "center", gap: 10, height: 56, padding: "0 4px", fontSize: 16, fontWeight: 600, color: "#1C1C1C", borderBottom: "1.5px solid transparent" }}>
              See SEO results ↓
            </a>
          </div>
          <p className="max-md:!block" style={{ margin: "14px 0 0", display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "#77746E" }}>
            <span aria-hidden="true" className="max-md:!mr-2.5 max-md:!inline-block max-md:!align-middle" style={{ width: 6, height: 6, borderRadius: "50%", background: "#C4A47C" }} />
            Not sure what&apos;s wrong? <a href="#pricing" className="max-md:relative max-md:after:absolute max-md:after:inset-x-0 max-md:after:-inset-y-3.5 max-md:after:content-['']" style={{ color: "#1C1C1C", borderBottom: "1px solid #CFCBC2" }}>Start with the $499 audit.</a>
          </p>
        </div>
        <figure style={{ margin: 0, minWidth: 0, width: "100%", maxWidth: 680 }}>
          <img loading="lazy" src="/assets/pages/seo/01-hero__search-queries-to-top-result.png" alt="Illustration: search queries leading to a top-ranked page, which feeds traffic, audience growth and sales" style={{ display: "block", width: "100%", height: "auto" }} />
        </figure>
      </section>

      {/* PROOF */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: `0 ${PAD}` }}>
        <Eyebrow>Organic proof</Eyebrow>
        <div style={{ marginTop: 14, display: "grid", borderTop: "1px solid #1C1C1C", borderBottom: "1px solid #DDDAD3" }} className="!grid-cols-2 sm:!grid-cols-4">
          {PROOF.map((s, i) => (
            <div key={s.l} className={`max-md:!text-center max-sm:!px-2 max-sm:!pb-4 ${i % 2 === 0 ? "max-sm:!border-l-0" : ""} ${i >= 2 ? "max-sm:!border-t max-sm:!border-t-[#DDDAD3]" : ""}`} style={{ padding: `26px ${i ? 16 : 20}px 26px ${i ? 24 : 0}px`, borderLeft: i ? "1px solid #DDDAD3" : "0" }}>
              <div style={{ fontFamily: "'General Sans'", fontSize: "clamp(40px,4vw,56px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>{s.v}</div>
              <div className="max-md:!mx-auto max-md:!text-balance" style={{ marginTop: 10, fontSize: 14, lineHeight: 1.4, color: "#5A5854", maxWidth: 200 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: SEC_PAD }}>
        <div style={{ display: "grid", gap: "24px clamp(40px,5vw,80px)", alignItems: "center" }} className="md:!grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div>
            <Eyebrow>The problem</Eyebrow>
            <h2 className="max-md:!text-center max-md:!text-balance" style={{ margin: "12px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(34px,3.6vw,50px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
              Ranking isn&apos;t the same
              <br />
              as <Underline>growing.</Underline>
            </h2>
            <p className="max-md:!text-center" style={{ margin: "12px 0 0", fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "clamp(26px,2.5vw,34px)", lineHeight: 1.1, color: "#6B6862" }}>
              The wrong traffic still wastes your time.
            </p>
            <figure className="max-md:!mx-auto" style={{ margin: "clamp(28px,3vw,44px) 0 0", maxWidth: 680 }}>
              <img loading="lazy" src="/assets/pages/seo/03-problem__ranking-isnt-growing.png" alt="Illustration: rankings and impressions flow into one search hub with several possible blockers before qualified demand, conversion and revenue" style={{ display: "block", width: "100%", height: "auto" }} />
            </figure>
          </div>
          <div style={{ maxWidth: 560, minWidth: 0 }}>
            <p style={{ margin: 0, fontSize: 18.5, lineHeight: 1.5, fontWeight: 500, color: "#1C1C1C" }}>
              You can rank, get impressions and publish every week while qualified demand barely moves.
            </p>
            <ul style={{ margin: "20px 0 0", padding: 0, listStyle: "none", borderTop: "1px solid #DDDAD3" }}>
              {PROBLEM_LIST.map((it) => (
                <li key={it} style={{ padding: "11px 0", borderBottom: "1px solid #DDDAD3", fontSize: 16.5, color: "#4E4C48" }}>
                  {it}
                </li>
              ))}
            </ul>
            <p style={{ margin: "20px 0 0", fontFamily: "'General Sans'", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>The job is finding which one comes first.</p>
          </div>
        </div>
      </section>

      {/* THE WORK */}
      <section id="the-work" className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: SEC_PAD }}>
        <SectionHead
          eyebrow="The work"
          title={
            <>
              SEO has <Emphasis>five layers now.</Emphasis>
            </>
          }
          sub="Fixing one while ignoring the others usually just moves the problem somewhere else."
        />
        <div style={{ display: "grid", gap: 20 }} className="lg:!grid-cols-2">
          {LAYERS.map((l) => (
            <div key={l.n} style={{ minWidth: 0, padding: "clamp(22px,2.6vw,34px)", borderRadius: 28, background: "#FBFBF9", border: "1px solid #C9B9A2", boxShadow: "0 0 0 4px rgba(196,164,124,.12)", display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#9A7646", fontVariantNumeric: "tabular-nums" }}>{l.n}</div>
              <h3 style={{ margin: "10px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(24px,2.2vw,30px)", fontWeight: 600, letterSpacing: "-0.025em" }}>{l.t}</h3>
              <p style={{ margin: "12px 0 0", fontSize: 16, lineHeight: 1.55, color: "#1C1C1C", maxWidth: 420 }}>{l.d}</p>
              <div style={{ margin: "16px 0 0", display: "flex", flexWrap: "wrap", gap: 8 }}>
                {l.tags.map((tag) => (
                  <Pill key={tag}>{tag}</Pill>
                ))}
              </div>
              <div style={{ margin: "24px -8px -8px" }}>
                <img loading="lazy" src={`/assets/pages/seo/${l.img}`} alt={l.alt} style={{ display: "block", width: "100%", height: "auto" }} />
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: "clamp(20px,2vw,28px)",
            borderRadius: 28,
            background: "#FBFBF9",
            border: "1px solid #C9B9A2",
            boxShadow: "0 0 0 4px rgba(196,164,124,.12)",
            padding: "clamp(24px,3vw,44px)",
            display: "grid",
            gap: "28px clamp(28px,4vw,56px)",
            alignItems: "center",
          }}
          className="md:!grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"
        >
          <div>
            <span style={{ fontSize: 13, fontWeight: 600, color: "#9A7646" }}>05</span>
            <h3 style={{ margin: "12px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(28px,2.8vw,38px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.08 }}>
              AI search visibility <Emphasis>(GEO)</Emphasis>
            </h3>
            <p style={{ margin: "16px 0 0", fontSize: 17, lineHeight: 1.55, color: "#1C1C1C", fontWeight: 500, maxWidth: 460 }}>People now ask ChatGPT, Gemini and Perplexity before they ever open Google.</p>
            <p style={{ margin: "10px 0 0", fontSize: 16, lineHeight: 1.6, color: "#4E4C48", maxWidth: 460 }}>GEO, or generative engine optimization, makes sure those tools can find your site and have a reason to quote it.</p>
            <div style={{ margin: "18px 0 0", display: "flex", flexWrap: "wrap", gap: 8 }}>
              {GEO_TAGS.map((tag) => (
                <Pill key={tag}>{tag}</Pill>
              ))}
            </div>
          </div>
          <figure style={{ margin: 0, minWidth: 0 }}>
            <img loading="lazy" src="/assets/pages/seo/04-layer-5__geo-ai-search-visibility.png" alt="Illustration: one page of original content cited as a source by ChatGPT, Gemini, Claude, Meta AI and Google, fed by data, links, mentions and research" style={{ display: "block", width: "100%", height: "auto" }} />
          </figure>
        </div>
      </section>

      {/* SEARCH SYSTEM */}
      <section className="max-md:!mt-20" style={{ marginTop: "clamp(96px,9vw,128px)", background: "#171717", color: "#F2EFEA" }}>
        <div style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(64px,6vw,88px) ${PAD} clamp(48px,5vw,72px)` }}>
          <SectionHead
            dark
            eyebrow="How search turns into revenue"
            title={
              <>
                From a search
                <br />
                <span style={{ color: "#D3AE82" }}>
                  <Emphasis>to a customer.</Emphasis>
                </span>
              </>
            }
            sub="SEO only matters when visibility turns into the right visitor, and the right visitor knows what to do next. Search demand, intent, content, visibility and conversion have to work as one path."
          />
          <figure style={{ margin: 0 }}>
            <img loading="lazy" src="/assets/pages/seo/05-search-to-customer__dark-journey.png" alt="Illustration: a search query, intent, a page, Google and ChatGPT visibility, a qualified visitor and a conversion" style={{ display: "block", width: "100%", height: "auto" }} />
            <figcaption style={{ marginTop: 0, display: "grid", gap: "0 20px", borderTop: "1px solid #33322F" }} className="sm:!grid-cols-2 lg:!grid-cols-5">
              {SEARCH_STEPS.map((s) => (
                <div key={s.n} style={{ padding: "18px 0" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#D3AE82" }}>{s.n}</div>
                  <div style={{ marginTop: 8, fontFamily: "'General Sans'", fontSize: 18, fontWeight: 600, color: "#F2EFEA" }}>{s.t}</div>
                  <p className="max-md:!text-base" style={{ margin: "6px 0 0", fontSize: 14.5, lineHeight: 1.5, color: "#B7B2A8" }}>{s.d}</p>
                </div>
              ))}
            </figcaption>
          </figure>
        </div>
      </section>

      {/* SEO RESULTS */}
      <section id="results" className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: SEC_PAD }}>
        <div style={{ display: "grid", gap: "24px clamp(32px,4vw,64px)", alignItems: "end", marginBottom: "clamp(28px,3vw,40px)" }} className="md:!grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="max-md:!text-center">
            <Eyebrow>SEO results</Eyebrow>
            <h2 className="max-md:!text-balance max-md:[&_span]:!whitespace-normal" style={{ margin: "12px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(34px,3.6vw,50px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
              Two sites.
              <br />
              <Emphasis>Google and Bing, shown separately.</Emphasis>
            </h2>
          </div>
          <ol style={{ margin: 0, padding: 0, listStyle: "none", borderTop: "1px solid #1C1C1C" }}>
            {RESULTS_LIST.map((r) => (
              <li key={r.n} className="max-md:!grid-cols-[32px_minmax(0,1fr)]" style={{ display: "grid", gridTemplateColumns: "32px minmax(0,1fr) auto", gap: "4px 14px", alignItems: "baseline", padding: "14px 0", borderBottom: "1px solid #DDDAD3" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#9A7646" }}>{r.n}</span>
                <span style={{ fontSize: 15, color: "#1C1C1C" }}>
                  <b style={{ fontWeight: 600 }}>{r.who}</b> · <span style={{ color: "#5A5854" }}>{r.detail}</span>
                </span>
                <span className="max-md:!col-start-2 max-md:!whitespace-normal" style={{ fontFamily: "'General Sans'", fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>{r.value}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="max-md:[&_[style*='grid-template-columns']>div]:!px-2 max-md:[&_[style*='grid-template-columns']>div]:!text-center" style={{ borderRadius: 28, background: "#EEF3F2", border: "1px solid #D6E1DF", padding: "clamp(24px,3vw,44px)" }}>
          <div style={{ display: "grid", gap: "24px clamp(32px,4vw,56px)", alignItems: "end" }} className="md:!grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#4F5A59" }}>SEO case study</span>
                <img loading="lazy" src="/assets/site/logo-blainy.png" alt="Blainy logo" style={{ display: "block", height: 30, width: "auto", mixBlendMode: "multiply" }} />
              </div>
              <h3 style={{ margin: "18px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(34px,3.2vw,44px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1 }}>Blainy</h3>
              <p style={{ margin: "12px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(22px,2vw,27px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.15, maxWidth: 560 }}>
                From zero to 85K+ users without building growth around paid acquisition.
              </p>
              <p style={{ margin: "14px 0 0", fontSize: 16, lineHeight: 1.6, color: "#4F5A59", maxWidth: 520 }}>
                Search demand mapped to commercial intent, content built around it, and Reddit and social helping those pages get found.
              </p>
            </div>
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid #C9D6D4" }}>
                <div style={{ padding: "16px 12px 0 0" }}>
                  <div style={{ fontFamily: "'General Sans'", fontSize: "clamp(26px,2.4vw,34px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>85K+</div>
                  <div style={{ marginTop: 6, fontSize: 13, color: "#4F5A59" }}>users</div>
                </div>
                <div style={{ padding: "16px 12px 0 18px", borderLeft: "1px solid #C9D6D4" }}>
                  <div style={{ fontFamily: "'General Sans'", fontSize: "clamp(26px,2.4vw,34px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>~30M</div>
                  <div style={{ marginTop: 6, fontSize: 13, color: "#4F5A59" }}>search impressions, Google + Bing</div>
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 16, borderRadius: 24, background: "#F6F9F8", border: "1px solid #D6E1DF", padding: "clamp(20px,2.4vw,32px)", display: "grid", gap: "24px clamp(24px,3vw,44px)", alignItems: "center" }} className="md:!grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)]">
            <div>
              <span style={{ display: "inline-block", padding: "5px 10px", borderRadius: 7, background: "#1C1C1C", color: "#F2EFEA", fontSize: 10.5, fontWeight: 600, letterSpacing: ".12em" }}>GOOGLE SEARCH CONSOLE</span>
              <p style={{ margin: "14px 0 0", fontSize: 13, color: "#6B7877" }}>Custom range · Jun 2024 to Oct 2025</p>
              <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", borderTop: "1px solid #C9D6D4" }}>
                <div style={{ padding: "16px 12px 0 0" }}>
                  <div style={{ fontFamily: "'General Sans'", fontSize: "clamp(26px,2.4vw,34px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>297K</div>
                  <div style={{ marginTop: 6, fontSize: 13, color: "#4F5A59" }}>clicks</div>
                </div>
                <div style={{ padding: "16px 12px 0 18px", borderLeft: "1px solid #C9D6D4" }}>
                  <div style={{ fontFamily: "'General Sans'", fontSize: "clamp(26px,2.4vw,34px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>25.3M</div>
                  <div style={{ marginTop: 6, fontSize: 13, color: "#4F5A59" }}>impressions</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", borderTop: "1px solid #C9D6D4", marginTop: 16 }}>
                <div style={{ padding: "16px 12px 0 0" }}>
                  <div style={{ fontFamily: "'General Sans'", fontSize: "clamp(26px,2.4vw,34px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>1.2%</div>
                  <div style={{ marginTop: 6, fontSize: 13, color: "#4F5A59" }}>average CTR</div>
                </div>
                <div style={{ padding: "16px 12px 0 18px", borderLeft: "1px solid #C9D6D4" }}>
                  <div style={{ fontFamily: "'General Sans'", fontSize: "clamp(26px,2.4vw,34px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>21.8</div>
                  <div style={{ marginTop: 6, fontSize: 13, color: "#4F5A59" }}>average position</div>
                </div>
              </div>
              <p className="max-md:!text-base" style={{ margin: "18px 0 0", fontSize: 15, lineHeight: 1.55, color: "#1C1C1C" }}>Organic search growth from the Blainy SEO work, climbing steadily from mid-2024.</p>
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(20,40,40,.12)", background: "#fff", boxShadow: "0 24px 48px -34px rgba(20,40,40,.4)" }}>
                <img loading="lazy" src="/assets/site/blainy-gsc-full.jpg" alt="Blainy Google Search Console, Jun 2024 to Oct 2025: 297K clicks, 25.3M impressions, 1.2% average CTR, 21.8 average position" style={{ display: "block", width: "100%" }} />
              </div>
            </div>
          </div>

          <div style={{ marginTop: 16, borderRadius: 24, background: "#F6F9F8", border: "1px solid #D6E1DF", padding: "clamp(20px,2.4vw,32px)", display: "grid", gap: "24px clamp(24px,3vw,44px)", alignItems: "center" }} className="md:!grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)]">
            <div>
              <span style={{ display: "inline-block", padding: "5px 10px", borderRadius: 7, background: "#1C1C1C", color: "#F2EFEA", fontSize: 10.5, fontWeight: 600, letterSpacing: ".12em" }}>BING WEBMASTER TOOLS</span>
              <p style={{ margin: "14px 0 0", fontSize: 13, color: "#6B7877" }}>1 Nov 2024 to 21 Oct 2025</p>
              <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", borderTop: "1px solid #C9D6D4" }}>
                <div style={{ padding: "16px 12px 0 0" }}>
                  <div style={{ fontFamily: "'General Sans'", fontSize: "clamp(26px,2.4vw,34px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>38.8K</div>
                  <div style={{ marginTop: 6, fontSize: 13, color: "#4F5A59" }}>clicks</div>
                </div>
                <div style={{ padding: "16px 12px 0 18px", borderLeft: "1px solid #C9D6D4" }}>
                  <div style={{ fontFamily: "'General Sans'", fontSize: "clamp(26px,2.4vw,34px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>2.2M</div>
                  <div style={{ marginTop: 6, fontSize: 13, color: "#4F5A59" }}>impressions</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", borderTop: "1px solid #C9D6D4", marginTop: 16 }}>
                <div style={{ padding: "16px 12px 0 0" }}>
                  <div style={{ fontFamily: "'General Sans'", fontSize: "clamp(26px,2.4vw,34px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>1.78%</div>
                  <div style={{ marginTop: 6, fontSize: 13, color: "#4F5A59" }}>average CTR</div>
                </div>
              </div>
              <p className="max-md:!text-base" style={{ margin: "18px 0 0", fontSize: 15, lineHeight: 1.55, color: "#1C1C1C" }}>The same organic system producing visibility beyond Google.</p>
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(20,40,40,.12)", background: "#fff", boxShadow: "0 24px 48px -34px rgba(20,40,40,.4)" }}>
                <img loading="lazy" src="/assets/site/blainy-bing-full.jpg" alt="Blainy Bing Webmaster Tools, 1 Nov 2024 to 21 Oct 2025: 38.8K clicks, 2.2M impressions, 1.78% average CTR" style={{ display: "block", width: "100%" }} />
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20, borderRadius: 28, background: "#FBFBF9", border: "1px solid #DAD8D1", padding: "clamp(24px,3vw,44px)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px 16px", fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase" }}>
            <span style={{ color: "#8B877F" }}>Recent SEO turnaround</span>
            <span style={{ padding: "4px 9px", borderRadius: 7, background: "#F6F1E9", border: "1px solid #E8DCC9", color: "#9A7646", fontSize: 10.5, letterSpacing: ".12em" }}>First 20 days</span>
          </div>
          <div style={{ display: "grid", gap: "24px clamp(32px,4vw,56px)", alignItems: "center", marginTop: 12 }} className="md:!grid-cols-[minmax(0,0.7fr)_minmax(0,1fr)]">
            <div>
              <h3 style={{ margin: 0, fontFamily: "'General Sans'", fontSize: "clamp(30px,3.2vw,44px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.06 }}>
                From roughly 100 daily visitors
                <br />
                to <Emphasis>800–900.</Emphasis>
              </h3>
              <div style={{ marginTop: "clamp(24px,3vw,36px)", display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", borderTop: "1px solid #1C1C1C", borderBottom: "1px solid #DDDAD3" }}>
                {TURNAROUND_STATS.map((s, i) => (
                  <div key={s.l} style={{ padding: "20px 12px", textAlign: "center", borderLeft: i % 2 ? "1px solid #DDDAD3" : "0", borderTop: i > 1 ? "1px solid #DDDAD3" : "0" }}>
                    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: s.gold ? "#9A7646" : "#8B877F" }}>{s.l}</div>
                    <div style={{ marginTop: 8, fontFamily: "'General Sans'", fontSize: s.gold ? "clamp(20px,1.7vw,24px)" : "clamp(28px,2.6vw,36px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05 }}>{s.v}</div>
                    <div style={{ marginTop: 6, fontSize: 13, lineHeight: 1.4, color: "#5A5854" }}>{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 14, fontSize: 16.5, lineHeight: 1.6, color: "#4E4C48", maxWidth: 520, padding: "clamp(20px,2.4vw,32px) 0", borderTop: "1px solid #DDDAD3", borderBottom: "1px solid #DDDAD3" }}>
              <p style={{ margin: 0 }}>When I started, the site relied heavily on AI-written content and organic performance had been flat for months.</p>
              <p style={{ margin: 0 }}>I reworked the content strategy, rewrote weak AI-first pages into useful, original content, aligned each page with real search intent, and tightened the on-page SEO and internal structure.</p>
              <p style={{ margin: 0, color: "#1C1C1C", fontWeight: 500 }}>
                Within the first 20 days of the engagement, daily visitors moved from roughly 100 to the 800–900 range. That&apos;s an observed result from this engagement, not a promise for every site.
              </p>
            </div>
          </div>

          <div style={{ marginTop: "clamp(28px,3vw,40px)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "10px 20px" }}>
              <span style={{ display: "inline-block", padding: "5px 10px", borderRadius: 7, background: "#E6E3DC", color: "#1C1C1C", fontSize: 10.5, fontWeight: 600, letterSpacing: ".12em" }}>BEFORE</span>
              <span style={{ fontSize: 13, color: "#77746E" }}>Google Search Console · 1 May to 29 Aug 2026 · about 4 months</span>
            </div>
            <div style={{ marginTop: 12 }}>
              <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #DAD8D1", background: "#fff", boxShadow: "0 24px 48px -34px rgba(20,40,40,.4)" }}>
                <img loading="lazy" src="/assets/pages/seo/06-results-turnaround__before-search-console.png" alt="Before: Google Search Console, 1 May to 29 Aug 2026: 2.97K clicks, 1.12M impressions, 0.3% CTR, average position 40, flat or declining" style={{ display: "block", width: "100%" }} />
              </div>
            </div>
            <div style={{ display: "grid", borderTop: "1px solid #DDDAD3", marginTop: 14 }} className="grid-cols-2 sm:!grid-cols-4">
              {BEFORE_STATS.map((s, i) => (
                <div key={s.l} className={`max-md:!text-center max-sm:!px-2 max-sm:!pb-4 ${i % 2 === 0 ? "max-sm:!border-l-0" : ""} ${i >= 2 ? "max-sm:!border-t max-sm:!border-t-[#DDDAD3]" : ""}`} style={{ padding: `16px 12px 0 ${i ? 18 : 0}px`, borderLeft: i ? "1px solid #DDDAD3" : "0" }}>
                  <div style={{ fontFamily: "'General Sans'", fontSize: "clamp(26px,2.4vw,34px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>{s.v}</div>
                  <div style={{ marginTop: 6, fontSize: 13, color: "#5A5854" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ margin: "clamp(24px,3vw,36px) 0 0", display: "flex", alignItems: "center", gap: 12, color: "#9A7646", fontSize: 12, fontWeight: 600, letterSpacing: ".12em" }}>
            <span style={{ flex: 1, height: 1, background: "#E8DCC9" }} />
            CONTENT &amp; SEO REVAMP
            <span style={{ flex: 1, height: 1, background: "#E8DCC9" }} />
          </div>

          <div style={{ marginTop: "clamp(24px,3vw,36px)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "10px 20px" }}>
              <span style={{ display: "inline-block", padding: "5px 10px", borderRadius: 7, background: "#1C1C1C", color: "#F2EFEA", fontSize: 10.5, fontWeight: 600, letterSpacing: ".12em" }}>20 DAYS LATER</span>
              <span style={{ fontSize: 13, color: "#77746E" }}>Google Search Console · 31 Aug to 26 Sep 2026 · under 4 weeks</span>
            </div>
            <div style={{ marginTop: 12 }}>
              <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid #C9B9A2", background: "#fff", boxShadow: "0 24px 48px -34px rgba(20,40,40,.4)" }}>
                <img loading="lazy" src="/assets/pages/seo/06-results-turnaround__after-search-console.png" alt="After: Google Search Console, 31 Aug to 26 Sep 2026: 11.8K clicks, 665K impressions, 1.8% CTR, average position 13.4, sharp rise from 8 September" style={{ display: "block", width: "100%" }} />
              </div>
            </div>
            <div style={{ display: "grid", borderTop: "1px solid #1C1C1C", marginTop: 14 }} className="grid-cols-2 sm:!grid-cols-4">
              {AFTER_STATS.map((s, i) => (
                <div key={s.l} className={`max-md:!text-center max-sm:!px-2 max-sm:!pb-4 ${i % 2 === 0 ? "max-sm:!border-l-0" : ""} ${i >= 2 ? "max-sm:!border-t max-sm:!border-t-[#DDDAD3]" : ""}`} style={{ padding: `16px 12px 0 ${i ? 18 : 0}px`, borderLeft: i ? "1px solid #DDDAD3" : "0" }}>
                  <div style={{ fontFamily: "'General Sans'", fontSize: "clamp(26px,2.4vw,34px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1 }}>{s.v}</div>
                  <div style={{ marginTop: 6, fontSize: 13, color: "#5A5854" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: SEC_PAD }}>
        <div style={{ display: "grid", gap: "clamp(32px,5vw,72px)", alignItems: "center" }} className="md:!grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)]">
          <div>
            <Eyebrow>How SEO works with me</Eyebrow>
            <h2 className="max-md:!text-center max-md:!text-balance" style={{ margin: "12px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(32px,3.2vw,44px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
              Five steps.
              <br />
              <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.08em" }}>No keyword spreadsheet disappearing into a folder.</em>
            </h2>
            <SeoStepsTabs />
          </div>
          <figure style={{ margin: 0, minWidth: 0 }}>
            <img loading="lazy" src="/assets/pages/seo/07-process__five-steps.png" alt="Illustration: five steps rising left to right, from audit and demand mapping to fixes, new pages and measured growth" style={{ display: "block", width: "100%", height: "auto" }} />
          </figure>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="max-md:!pt-12" style={{ maxWidth: MAX, margin: "0 auto", padding: SEC_PAD }}>
        <SectionHead
          eyebrow="Pricing"
          title={
            <>
              One plan.
              <br />
              <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.1em" }}>Everything SEO needs.</em>
            </>
          }
          sub="No article quotas, no mystery hours. Billed weekly or every two weeks."
        />
        <div style={{ borderRadius: 28, background: "#171717", color: "#F2EFEA", padding: "clamp(32px,4vw,56px)", display: "grid", gap: "40px clamp(32px,5vw,72px)" }} className="md:!grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div>
            <h3 className="max-md:!text-center" style={{ margin: 0, fontFamily: "'General Sans'", fontSize: "clamp(34px,3.2vw,44px)", fontWeight: 600, letterSpacing: "-0.035em" }}>SEO</h3>
            <p style={{ margin: "14px 0 0", maxWidth: 500, fontSize: 16.5, lineHeight: 1.6, color: "#C9C4BA" }}>
              Keyword and competitor research, technical fixes, original articles, internal linking, link building through outreach, and monthly reporting on rankings, traffic and conversions.
            </p>
            <div style={{ marginTop: 28, display: "grid", gap: "24px 32px" }} className="sm:!grid-cols-2">
              {PRICING_CATEGORIES.map((c) => (
                <div key={c.h}>
                  <div style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#D3AE82", marginBottom: 8 }}>{c.h}</div>
                  <ul style={{ margin: 0, padding: 0, listStyle: "none", borderTop: "1px solid #33322F" }}>
                    {c.items.map((it) => (
                      <li key={it} className="max-md:!text-base" style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: "1px solid #33322F", fontSize: 14.5, color: "#E6E1D8" }}>
                        <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: "50%", background: "#C4A47C", flex: "0 0 auto" }} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }} className="md:!pl-14 md:!border-l md:!border-[#33322F] max-md:!text-center">
            <div className="max-md:!justify-center" style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontFamily: "'General Sans'", fontSize: "clamp(52px,5.4vw,72px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>$1,999</span>
              <span style={{ fontSize: 15, color: "#9C978D" }}>per month</span>
            </div>
            <a href="#contact" className="max-md:!flex max-md:!w-full max-md:!max-w-[400px] max-md:!justify-center max-md:!self-center max-md:!mx-auto" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 12, height: 52, padding: "0 24px", borderRadius: 12, background: "#F2EFEA", color: "#171717", fontSize: 15.5, fontWeight: 600 }}>
              Start SEO
              <ArrowIcon />
            </a>
            <div style={{ marginTop: 8, paddingTop: 18, borderTop: "1px solid #33322F" }}>
              <div style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#9C978D" }}>Market context</div>
              <p className="max-md:!text-base" style={{ margin: "10px 0 0", fontSize: 14, lineHeight: 1.55, color: "#B7B2A8" }}>Most SEO freelancers average around $1,350/month and agencies around $3,200.</p>
              <p style={{ margin: "6px 0 0", fontSize: 12.5, color: "#8B877F" }}>Source: Ahrefs survey of 439 SEO providers.</p>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 16, borderRadius: 22, border: "1px solid #DAD8D1", background: "#FBFBF9", padding: "clamp(24px,2.6vw,36px)", display: "grid", gap: "20px clamp(24px,3vw,48px)", alignItems: "center" }} className="md:!grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_auto] max-md:!text-center">
          <div>
            <h3 style={{ margin: 0, fontFamily: "'General Sans'", fontSize: "clamp(22px,2vw,28px)", fontWeight: 600, letterSpacing: "-0.02em" }}>Not ready for monthly?</h3>
            <p style={{ margin: "6px 0 0", fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: 24, color: "#6B6862" }}>Start with the audit.</p>
          </div>
          <p className="max-md:!mx-auto" style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "#4E4C48", maxWidth: 440 }}>Everything on your site, ranked by what to fix first. Most audits give you a list. This one tells you the order.</p>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12 }} className="md:!items-end max-md:!items-center">
            <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ fontFamily: "'General Sans'", fontSize: 36, fontWeight: 600, letterSpacing: "-0.035em" }}>$499</span>
              <span style={{ fontSize: 13.5, color: "#77746E" }}>one time</span>
            </div>
            <a href="#contact" className="max-md:relative max-md:after:absolute max-md:after:inset-x-0 max-md:after:-inset-y-3.5 max-md:after:content-['']" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 15, fontWeight: 600, borderBottom: "1.5px solid #1C1C1C", paddingBottom: 3 }}>
              Start with the $499 audit
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      {/* FIT */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: SEC_PAD }}>
        <div style={{ display: "grid", gap: "24px clamp(32px,5vw,80px)", alignItems: "start" }} className="md:!grid-cols-[minmax(0,0.34fr)_minmax(0,1fr)]">
          <div className="max-md:!text-center">
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#8B877F" }}>Who it’s for</div>
            <h2 style={{ margin: "12px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(32px,3vw,44px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
              SEO works
              <br />
              best when…
            </h2>
          </div>
          <div style={{ display: "grid", gap: "32px clamp(24px,3vw,48px)" }} className="sm:!grid-cols-2">
            <div>
              <h3 style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#9A7646" }}>Good fit</h3>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", borderBottom: "1px solid #DDDAD3" }}>
                {FIT_GOOD.map((t) => (
                  <li key={t} style={{ display: "grid", gridTemplateColumns: "24px minmax(0,1fr)", gap: 12, alignItems: "baseline", padding: "15px 0", borderTop: "1px solid #DDDAD3", fontSize: 17, lineHeight: 1.45, color: "#1C1C1C" }}>
                    <span aria-hidden="true" style={{ fontSize: 14, fontWeight: 600, color: "#9A7646" }}>✓</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#8B877F" }}>Not the right fit</h3>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", borderBottom: "1px solid #DDDAD3" }}>
                {FIT_BAD.map((t) => (
                  <li key={t} style={{ display: "grid", gridTemplateColumns: "24px minmax(0,1fr)", gap: 12, alignItems: "baseline", padding: "15px 0", borderTop: "1px solid #DDDAD3", fontSize: 17, lineHeight: 1.45, color: "#5A5854" }}>
                    <span aria-hidden="true" style={{ fontSize: 14, fontWeight: 600, color: "#A09B91" }}>—</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: SEC_PAD, display: "grid", gap: "24px clamp(40px,5vw,80px)", alignItems: "start" }} className="md:!grid-cols-[minmax(0,0.58fr)_minmax(0,1fr)] max-md:!pt-20">
        <div className="max-md:!text-center">
          <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#8B877F" }}>SEO FAQ</div>
          <h2 style={{ margin: "12px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(30px,3vw,42px)", lineHeight: 1.06, letterSpacing: "-0.03em" }}>
            SEO questions,
            <br />
            <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.1em" }}>answered straight.</em>
          </h2>
          <div className="max-md:!mx-auto" style={{ marginTop: "clamp(28px,3vw,40px)", width: "100%", maxWidth: 420 }}>
            <img loading="lazy" src="/assets/pages/seo/10-faq__seo-questions.png" alt="Illustration: a search leading to query refinements, a useful page, supporting links and a growth chart" style={{ display: "block", width: "100%", height: "auto" }} />
          </div>
        </div>
        <FAQAccordion faqs={FAQS} />
      </section>

      {/* CTA */}
      <section id="contact" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(80px,9vw,128px) ${PAD} clamp(24px,3vw,40px)` }}>
        <div style={{ borderRadius: 28, background: "#1C1C1C", color: "#F2EFEA", padding: "clamp(48px,6vw,88px) clamp(24px,5vw,72px)", display: "grid", gap: "48px clamp(40px,5vw,80px)", alignItems: "center" }} className="md:!grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="max-md:!text-center">
            <h2 className="max-md:!text-balance" style={{ margin: 0, fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(32px,3.4vw,48px)", lineHeight: 1.06, letterSpacing: "-0.035em" }}>
              Want me to look at what&apos;s stopping <Underline>your search growth?</Underline>
            </h2>
            <p style={{ margin: "14px 0 0", fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "clamp(28px,2.6vw,36px)", lineHeight: 1.1, color: "#D3AE82" }}>Start with the audit.</p>
            <p className="max-md:!mx-auto" style={{ margin: "22px 0 0", maxWidth: 480, fontSize: 17, lineHeight: 1.6, color: "#B7B2A8" }}>I&apos;ll review the site, the search demand and what is already working, then rank the fixes by what matters first.</p>
          </div>
          <div className="max-md:!mx-auto max-md:!w-full max-md:!max-w-[400px]" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <a href="/contact" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, height: 64, padding: "0 24px", borderRadius: 12, background: "#F2EFEA", color: "#1C1C1C", fontSize: 17, fontWeight: 600 }}>
              Start the $499 SEO audit
              <ArrowIcon size={16} />
            </a>
            <div className="max-md:!grid-cols-1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <Link href="/#contact" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 52, borderRadius: 12, border: "1px solid #3A3935", fontSize: 15, fontWeight: 500, color: "#F2EFEA" }}>
                Tell me what&apos;s stuck
              </Link>
              <a href="mailto:hello@zainameen.com" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 52, borderRadius: 12, border: "1px solid #3A3935", fontSize: 15, fontWeight: 500, color: "#F2EFEA" }}>
                Email me
              </a>
            </div>
            <span className="max-md:!text-center" style={{ paddingTop: 8, fontSize: 13.5, color: "#8B877F" }}>I usually reply within a couple of hours.</span>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(56px,6vw,80px) ${PAD} clamp(64px,7vw,96px)` }}>
        <h2 className="max-md:!text-center" style={{ margin: "0 0 20px", fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#8B877F" }}>SEO rarely works alone</h2>
        <div style={{ display: "grid", borderTop: "1px solid #1C1C1C" }} className="grid-cols-1 sm:!grid-cols-3">
          {RELATED.map((r, i) => (
            <a key={r.t} href={r.href} className="max-sm:!border-l-0 max-sm:!px-0" style={{ display: "flex", flexDirection: "column", gap: 8, padding: `22px ${i ? 24 : 0}px 22px ${i ? 24 : 0}px`, borderLeft: i ? "1px solid #DDDAD3" : "0", borderBottom: "1px solid #DDDAD3" }}>
              <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, fontFamily: "'General Sans'", fontSize: 21, fontWeight: 600, letterSpacing: "-0.015em" }}>
                {r.t}
                <ArrowIcon />
              </span>
              <span className="max-md:!text-base" style={{ fontSize: 15, lineHeight: 1.5, color: "#5A5854" }}>{r.d}</span>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
