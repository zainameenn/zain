import { buildMetadata } from "@/lib/seo";
import { H1_STYLE, SUBHEAD_SIZE } from "@/app/HomeComponents/heading";
import Link from "next/link";
import { ArrowIcon, Emphasis } from "../../HomeComponents/icons";
import { FAQAccordion } from "../../HomeComponents/FAQAccordion";

export const metadata = buildMetadata({
  title: "Google and Meta Ads Specialist | Fix the Funnel First | Zain",
  description:
    "Google and Meta ads specialist. Tracking set up first, landing pages fixed, budget moved to what converts. $1,499/mo, and you own the account.",
  path: "/services/google-and-meta-ads-specialist",
});

const MAX = 1280;
const PAD = "clamp(20px,2.5vw,32px)";

/* ---------- local helpers, following the pattern established on other service pages ---------- */

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", height: 34, padding: "0 14px", borderRadius: 999, background: "#1C1C1C", color: "#F2EFEA", fontSize: 13, fontWeight: 500, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

function LightPill({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", height: 34, padding: "0 14px", borderRadius: 999, background: "#F2EFEA", color: "#1C1C1C", fontSize: 13, fontWeight: 500, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

/** Italic Instrument Serif, no hand-drawn underline, used for most heading emphasis on this page. */
function ItalicInline({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.08em", ...style }}>
      {children}
    </em>
  );
}

function ItalicBlock({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <em style={{ display: "block", marginTop: 6, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.08em", lineHeight: 1.05, ...style }}>
      {children}
    </em>
  );
}

/** Block emphasis with the gold hand-drawn squiggle underneath, used only where the source page uses it. */
function SquiggleBlock({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <em className="max-md:[&>span]:!whitespace-normal" style={{ display: "block", marginTop: 6, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.08em", color }}>
      <Emphasis>{children}</Emphasis>
    </em>
  );
}

function CenterHead({ eyebrow, title, sub, dark, mb = 40, max = 1000 }: { eyebrow: string; title: React.ReactNode; sub?: React.ReactNode; dark?: boolean; mb?: number; max?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", margin: `0 auto ${mb}px`, maxWidth: max }}>
      <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: dark ? "#9C978D" : "#8B877F" }}>{eyebrow}</div>
      <h2 className="max-md:!text-balance" style={{ margin: "12px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(34px,3.4vw,50px)", lineHeight: 1.04, letterSpacing: "-0.035em", color: dark ? "#F2EFEA" : "#1C1C1C" }}>{title}</h2>
      {sub ? <p style={{ margin: "20px 0 0", maxWidth: 600, fontSize: 17, lineHeight: 1.55, color: dark ? "#B7B2A8" : "#5A5854" }}>{sub}</p> : null}
    </div>
  );
}

function TrustItem({ path, t, d }: { path: string; t: string; d: string }) {
  return (
    <div style={{ padding: "26px 24px 26px 0", display: "grid", gridTemplateColumns: "36px minmax(0,1fr)", gap: "4px 14px", alignItems: "start" }}>
      <span aria-hidden="true" style={{ gridRow: "span 2", width: 36, height: 36, borderRadius: 10, background: "#1C1C1C", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="18" height="18" viewBox="0 0 16 18" fill="none">
          <path d={path} stroke="#D3AE82" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span style={{ fontFamily: "'General Sans'", fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.25 }}>{t}</span>
      <span style={{ fontSize: 14, lineHeight: 1.45, color: "#5A5854" }}>{d}</span>
    </div>
  );
}

function NumRow({ n, children, big }: { n: string; children: React.ReactNode; big?: boolean }) {
  return (
    <li style={{ display: "grid", gridTemplateColumns: big ? "40px minmax(0,1fr)" : "auto minmax(0,1fr)", gap: big ? 16 : 12, alignItems: "baseline", padding: big ? "17px 0" : "12px 0", borderBottom: "1px solid #DDDAD3" }}>
      <span style={{ fontSize: big ? 12.5 : 11.5, fontWeight: 600, color: "#9A7646", fontVariantNumeric: "tabular-nums" }}>{n}</span>
      <span className={big ? undefined : "max-md:!text-base"} style={big ? { fontFamily: "'General Sans'", fontSize: "clamp(18px,1.6vw,21px)", fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1.3 } : { fontSize: 15.5, lineHeight: 1.4 }}>{children}</span>
    </li>
  );
}

const TRUST = [
  { path: "M4 11V7a4 4 0 0 1 8 0v4M3 11h10v6H3z", t: "You own the ad account", d: "Your data, your billing, always." },
  { path: "M2 5h12v8H2zM2 8h12", t: "Fee separate from ad spend", d: "You pay Google and Meta directly." },
  { path: "M8 2v4M8 10v4M2 8h4M10 8h4M8 5a3 3 0 1 0 0 6 3 3 0 0 0 0-6", t: "Tracking before launch", d: "Real conversions recorded first." },
  { path: "M2 12l4-4 3 3 5-6M10 5h4v4", t: "Weekly optimization", d: "Waste cut, budget moved every week." },
];

const PROBLEM_LIST = [
  "Keywords with the wrong search intent",
  "Audiences so broad they include everyone",
  "Creative that looks like every other ad",
  "An offer nobody feels urgent about",
  "Tracking that doesn't record real conversions",
  "A landing page that breaks the ad's promise",
  "Budget spread across too many campaigns",
  "Optimizing for cheap clicks instead of real leads",
];

const SIX_PARTS = [
  { n: "01", t: "Offer & goal", d: "What are we actually asking someone to do, and why would they want to?", tags: ["Offer review", "Conversion goal", "Funnel review", "Unit economics"], alt: "Icon: offer and goal", img: "04-part-1__offer.png" },
  { n: "02", t: "Tracking", d: "If we can't measure leads, sales, calls and signups correctly, every decision after is a guess.", tags: ["Google Ads conversions", "GA4", "Meta Pixel", "Conversions API", "UTMs"], alt: "Icon: tracking", img: "04-part-2__tracking.png" },
  { n: "03", t: "Audience & intent", d: "Who should see the ad, and what are they looking for when they do?", tags: ["Keyword research", "Search intent", "Audiences", "Exclusions"], alt: "Icon: audience and intent", img: "04-part-3__audience.png" },
  { n: "04", t: "Campaign structure", d: "Campaigns, ad sets, keywords, negatives and budgets, organized so the data actually means something.", tags: ["Campaign setup", "Negative keywords", "Budget allocation", "Bidding"], alt: "Icon: campaign structure", img: "04-part-4__campaign-structure.png" },
  { n: "05", t: "Creative & landing page", d: "The ad earns the click. The page earns the conversion. I write and design both.", tags: ["Ad copy", "Ad graphics", "Landing page review", "Message match"], alt: "Icon: creative and landing page", img: "04-part-5__creative.png" },
  { n: "06", t: "Optimization & scaling", d: "Cut waste, test one thing at a time, and move budget into what proves itself.", tags: ["Search-term cleanup", "Creative testing", "Budget shifts", "Weekly optimization"], alt: "Icon: optimization and scaling", img: "04-part-6__optimization.png" },
];

const CLICK_STEPS = [
  { n: "01", t: "Demand", d: "Someone has a problem or is already searching." },
  { n: "02", t: "Ad", d: "The right message earns the click." },
  { n: "03", t: "Landing page", d: "The page keeps the same promise." },
  { n: "04", t: "Conversion", d: "Form, call, signup or purchase." },
  { n: "05", t: "Feedback", d: "Tracking shows what actually happened." },
  { n: "06", t: "Scale", d: "More budget only goes to what proved itself." },
];

const GOOGLE_LIST = ["High-intent keywords", "Branded searches", "Competitor searches", "Category searches", "Remarketing where useful"];
const META_LIST = ["Creative-led campaigns", "Audience discovery", "Lead generation", "Retargeting", "Offer testing"];

const TRACKING_CHECKLIST = ["Google Ads conversion tracking", "Meta Pixel", "Conversions API", "GA4 events", "UTM structure", "Form tracking", "Call tracking", "CRM attribution, where available"];

const AD_RESULTS = [
  {
    n: "01",
    title: "464,779 video plays",
    emph: "on one ad.",
    d: "A UGC-style video in the purchase-objective campaign, built around one relatable hook.",
    stats: [
      { v: "464,779", l: "video plays" },
      { v: "20%", l: "hook rate" },
      { v: "3.97%", l: "hold rate" },
      { v: "0:03", l: "avg. play time" },
    ],
    img: "08-paid-work-blainy__meta-ad-464k.png",
    alt: "Meta Ads Manager video performance for a Blainy ad: 464,779 video plays, 0:03 average play time, 20% hook rate, 3.97% hold rate",
  },
  {
    n: "02",
    title: "A 32% hook rate",
    emph: "on a 22-second ad.",
    d: "A shorter comparison-style creative, tested in the same ad set against other hooks.",
    stats: [
      { v: "14,950", l: "video plays" },
      { v: "32%", l: "hook rate" },
      { v: "18.77%", l: "hold rate" },
      { v: "0:05", l: "avg. play time" },
    ],
    img: "08-paid-work-blainy__meta-ad-14k.png",
    alt: "Meta Ads Manager video performance for a Blainy ad: 14,950 video plays, 0:05 average play time, 32% hook rate, 18.77% hold rate",
  },
];

const FIRST_WEEK = [
  { n: "01", q: "Is tracking recording real conversions?", d: "Not page views. Not button clicks. Actual leads or purchases." },
  { n: "02", q: "Are we buying the right intent?", d: "Search terms and audiences should look like buyers, not just cheap traffic." },
  { n: "03", q: "Does the landing page match the ad?", d: "The promise can't change after the click." },
  { n: "04", q: "Is budget going to what converts?", d: "Spend follows evidence, not campaign age." },
];

const MANAGE_COLS = [
  { n: "01", t: "Strategy", items: ["Account audit", "Objectives", "Offer review", "Funnel review", "Budget allocation"] },
  { n: "02", t: "Google Ads", items: ["Keyword research", "Campaign setup", "Negative keywords", "Search terms", "Bidding", "Ad assets"] },
  { n: "03", t: "Meta Ads", items: ["Audiences", "Campaign setup", "Ad copy", "Graphics", "Retargeting", "Testing"] },
  { n: "04", t: "Tracking", items: ["Conversions", "GA4", "Pixel", "Conversions API", "UTMs"] },
  { n: "05", t: "Optimization", items: ["Search-term cleanup", "Creative tests", "Audience tests", "Budget shifts", "Reporting"] },
];

const TEST_ROW1 = ["Offer", "Audience", "Creative", "Headline", "Keyword & intent"];
const TEST_ROW2 = ["Landing page", "Bid & budget", "Placement", "Schedule"];

const BUDGET_BARS = [
  { h: 8, op: 0.35, t: "Testing budget", gold: false },
  { h: 16, op: 0.55, t: "Start small", gold: false },
  { h: 24, op: 0.75, t: "Learn", gold: false },
  { h: 32, op: 1, t: "Then scale", gold: true },
];

const PROCESS_STEPS = [
  { n: "01", t: "Audit", d: "Tracking, offer, account and funnel." },
  { n: "02", t: "Build", d: "Campaign structure, audiences, keywords and creative." },
  { n: "03", t: "Launch", d: "Start controlled. Not everywhere at once." },
  { n: "04", t: "Learn", d: "Read search terms, creative response and lead quality." },
  { n: "05", t: "Scale", d: "Move budget into what proved itself.", last: true },
];

const PERF_CARDS = [
  { n: "01", tag: "ATTENTION", t: "CTR", d: "Did the ad earn attention?", dark: false },
  { n: "02", tag: "ATTENTION", t: "CPC", d: "What did the visit cost?", dark: false },
  { n: "03", tag: "EFFICIENCY", t: "Conversion rate", d: "Did the page do its job?", dark: false },
  { n: "04", tag: "EFFICIENCY", t: "CPA / CPL", d: "What did the actual result cost?", dark: false },
  { n: "05", tag: "WHAT MATTERS", t: "Lead quality", d: "Did the right people convert?", dark: true },
  { n: "06", tag: "WHAT MATTERS", t: "Revenue / ROAS", d: "Did the economics make sense?", dark: true },
];

const PRICING_INCLUDED = ["Campaign setup", "Conversion tracking", "Landing-page review", "Keyword research", "Audience research", "Ad copy", "Ad graphics", "Creative testing", "Budget reallocation", "Weekly optimization"];

const FIT_GOOD = ["Your offer already has proven demand.", "You can handle more leads or customers.", "You're willing to set up tracking properly.", "You have enough budget to test.", "You want acquisition you can measure."];
const FIT_BAD = ["You want guaranteed ROAS.", "You expect $5 a day to scale immediately.", "The offer has no demand yet.", "You'd rather skip tracking.", "You want to launch on every platform at once."];

const FAQS: [string, string[]][] = [
  ["How much does Google or Meta Ads management cost?", ["Management usually costs 10% to 20% of your monthly ad spend or a flat monthly fee, with freelancers typically charging $500 to $2,500 a month. My fee is $1,499 a month, and your ad budget is paid directly to Google or Meta."]],
  ["How much ad spend do I need?", ["For testing, $100 to $500 a month is usually enough to learn which keywords or audiences convert. At an average of about $5.42 per Google click, $300 to $600 gets you roughly 55 to 110 clicks. Scaling needs more, and only after something has proven itself."]],
  ["Which is better: Google Ads or Meta Ads?", ["Neither. They do different jobs. Google works when people already search for what you sell. Meta works when you need to reach people who don't know you exist yet. Many businesses need Google first, then Meta for retargeting and growth."]],
  ["Do you create the ads too?", ["Yes. I write the ad copy and design the graphics myself, so you don't need a separate designer."]],
  ["Do you set up tracking?", ["Yes, and I do it before anything scales: Google Ads conversions, GA4, Meta Pixel and Conversions API, and UTMs."]],
  ["Do I own the ad account?", ["Always. It's your account, your data and your billing. I just get access to manage it."]],
  ["Can you guarantee ROAS or leads?", ["No, and be careful with anyone who does. Results depend on your offer, market and budget. What I can promise is that tracking will be right, budget won't go to what isn't working, and you'll always know where your money went."]],
  ["Do Google Ads help SEO?", ["No. Ads and organic rankings are completely separate. But ad data tells you which keywords actually convert, and I use that to plan your SEO."]],
];

const RELATED = [
  { t: "Growth strategy & GTM", d: "When the problem is bigger than ads.", href: "/services/saas-growth-consultant" },
  { t: "SEO", d: "Turn winning ad keywords into organic traffic.", href: "/services/freelance-seo-expert-for-saas" },
  { t: "Social media management", d: "Organic attention alongside paid.", href: "/services/hire-a-social-media-manager" },
];

export default function GoogleMetaAdsPage() {
  return (
    <main id="top" style={{ overflowX: "clip" }}>
      {/* HERO */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(40px,5vw,64px) ${PAD} 48px`, display: "grid", gap: "32px 48px", alignItems: "center" }} className="md:!grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div style={{ minWidth: 0 }} className="max-md:!text-center">
          <h1 className="max-md:!mx-auto" style={{ ...H1_STYLE, maxWidth: 680 }}>
            Google and Meta ads specialist who fixes the funnel before scaling spend
          </h1>
          <p className="max-md:!mx-auto max-md:!text-balance" style={{ margin: "20px 0 0", maxWidth: 640, fontFamily: "'General Sans'", fontWeight: 500, fontSize: SUBHEAD_SIZE, lineHeight: 1.05, letterSpacing: "-0.035em" }}>
            Don&apos;t scale the spend
            <span style={{ display: "block", marginTop: ".1em" }}>
              before the <Emphasis>funnel works.</Emphasis>
            </span>
          </p>
          <p className="max-md:!mx-auto" style={{ margin: "28px 0 0", maxWidth: 520, fontSize: 18, lineHeight: 1.55, color: "#4E4C48" }}>
            As your Google and Meta ads specialist, I set up tracking and fix the landing page before we spend another dollar. I set up the tracking, fix the landing page, build the campaigns and move your budget toward what actually brings customers.
          </p>
          <p className="max-md:!mx-auto" style={{ margin: "12px 0 0", maxWidth: 520, fontSize: 18, lineHeight: 1.55, color: "#1C1C1C", fontWeight: 500 }}>
            On Google, I capture people already searching. On Meta, I reach the ones who don&apos;t know you yet.
          </p>
          <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12 }} className="max-md:!mx-auto max-md:!max-w-[400px] max-md:!flex-col">
            <a href="#contact" className="max-md:!justify-center" style={{ display: "inline-flex", alignItems: "center", gap: 12, height: 56, padding: "0 26px", borderRadius: 12, background: "#1C1C1C", color: "#F8F6F4", fontSize: 16, fontWeight: 600 }}>
              Tell me about your ads
              <ArrowIcon />
            </a>
            <a href="#process" className="max-md:!justify-center" style={{ display: "inline-flex", alignItems: "center", gap: 10, height: 56, padding: "0 22px", borderRadius: 12, border: "1px solid #CFCBC2", color: "#1C1C1C", fontSize: 16, fontWeight: 600 }}>
              See how I work ↓
            </a>
          </div>
          <p className="max-md:!block" style={{ margin: "16px 0 0", display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "#77746E" }}>
            <span aria-hidden="true" className="max-md:!mr-2.5 max-md:!inline-block max-md:!align-middle" style={{ width: 6, height: 6, borderRadius: "50%", background: "#C4A47C", flex: "0 0 auto" }} />
            You own the ad account. Your spend goes straight to Google and Meta.
          </p>
        </div>
        <figure style={{ margin: 0, minWidth: 0 }}>
          <img loading="lazy" src="/assets/pages/ads/01-hero__ad-spend-leaking-funnel.png" alt="Illustration: ad spend poured into a leaking pipe, losing coins at targeting, offer, landing page, tracking and funnel before reaching customers" style={{ display: "block", width: "100%", aspectRatio: "4/3", borderRadius: 12, objectFit: "cover" }} />
        </figure>
      </section>

      {/* TRUST */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: `0 ${PAD}` }}>
        <div style={{ display: "grid", borderTop: "1px solid #1C1C1C", borderBottom: "1px solid #DDDAD3" }} className="!grid-cols-2 sm:!grid-cols-4">
          {TRUST.map((s) => (
            <TrustItem key={s.t} path={s.path} t={s.t} d={s.d} />
          ))}
        </div>
        <p className="max-md:!text-center" style={{ margin: "14px 0 0", fontSize: 13.5, color: "#77746E" }}>The boring stuff most wasted budgets skip.</p>
      </section>

      {/* PROBLEM */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <div style={{ display: "grid", gap: "40px 64px", alignItems: "start" }} className="md:!grid-cols-2">
          <div>
            <div className="max-md:!text-center" style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#8B877F" }}>The problem</div>
            <h2 className="max-md:!text-center max-md:!text-balance" style={{ margin: "16px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(38px,3.6vw,52px)", lineHeight: 1.02, letterSpacing: "-0.035em" }}>
              More ad spend
              <SquiggleBlock>doesn&apos;t fix a broken funnel.</SquiggleBlock>
            </h2>
            <p className="max-md:!mx-auto max-md:!text-center" style={{ margin: "18px 0 0", fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "clamp(22px,2vw,26px)", lineHeight: 1.25, color: "#6B6862", maxWidth: 460 }}>
              It just makes the leak more expensive.
            </p>
            <p style={{ margin: "24px 0 0", fontSize: 17, lineHeight: 1.6, color: "#4E4C48", maxWidth: 480 }}>
              Most bad ad results aren&apos;t an ads problem. The campaigns are getting clicks, but something between the click and the customer is broken.
            </p>
            <p style={{ margin: "32px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(20px,1.8vw,24px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
              Find the leak first.
              <br />
              <ItalicInline style={{ color: "#9A7646" }}>Then spend the money.</ItalicInline>
            </p>
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", color: "#9A7646", marginBottom: 12 }}>USUALLY ONE OF THESE</div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", borderTop: "1px solid #1C1C1C" }}>
              {PROBLEM_LIST.map((it, i) => (
                <NumRow key={it} n={String(i + 1).padStart(2, "0")} big>
                  {it}
                </NumRow>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SIX PARTS */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <CenterHead eyebrow="What paid acquisition involves" title={<>Paid acquisition has <ItalicInline>six parts.</ItalicInline></>} sub="Skip one and the budget finds a way to disappear." />
        <div style={{ display: "grid", gap: 20 }} className="grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3">
          {SIX_PARTS.map((p) => (
            <div key={p.n} style={{ minWidth: 0, borderRadius: 22, background: "#FBFBF9", border: "1px solid #E2DFD8", padding: 26, display: "flex", flexDirection: "column" }}>
              <div style={{ marginBottom: 14 }}>
                <img loading="lazy" src={`/assets/pages/ads/${p.img}`} alt={p.alt} style={{ display: "block", width: "100%", aspectRatio: "4/3", borderRadius: 12, objectFit: "cover" }} />
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#9A7646", fontVariantNumeric: "tabular-nums" }}>{p.n}</span>
              <h3 style={{ margin: "8px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(21px,1.8vw,25px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.15 }}>{p.t}</h3>
              <p className="max-md:!text-base" style={{ margin: "10px 0 0", fontSize: 15, lineHeight: 1.55, color: "#4E4C48" }}>{p.d}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
                {p.tags.map((tag) => (
                  <Pill key={tag}>{tag}</Pill>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DARK: CLICK TO CUSTOMER */}
      <section className="max-md:!mt-20" style={{ marginTop: "clamp(88px,8vw,112px)", background: "#171717", color: "#F2EFEA" }}>
        <div style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(56px,5vw,80px) ${PAD} clamp(48px,4.5vw,64px)` }}>
          <CenterHead
            dark
            eyebrow="How paid acquisition works"
            title={<>From a click<SquiggleBlock color="#D3AE82">to a qualified customer.</SquiggleBlock></>}
            sub="A good campaign isn't one good ad. It's every step after the click doing its job."
            mb={8}
          />
          <div style={{ margin: "0 auto", maxWidth: 1120 }}>
            <img loading="lazy" src="/assets/pages/ads/05-click-to-customer__dark-journey.png" alt="Journey: ad click, landing page, attention, evaluation, sign up or lead, qualified customer" style={{ display: "block", width: "100%", aspectRatio: "1448/460", borderRadius: 12, objectFit: "cover" }} />
          </div>
          <ol style={{ margin: "32px 0 0", padding: 0, listStyle: "none", display: "grid", gap: 24 }} className="grid-cols-2 sm:!grid-cols-3 lg:!grid-cols-6">
            {CLICK_STEPS.map((s, i) => (
              <li key={s.n} style={{ minWidth: 0, paddingTop: 16, borderTop: `2px solid ${i === CLICK_STEPS.length - 1 ? "#C4A47C" : "rgba(255,255,255,.3)"}` }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#D3AE82", fontVariantNumeric: "tabular-nums" }}>{s.n}</span>
                <h3 style={{ margin: "8px 0 0", fontFamily: "'General Sans'", fontSize: 20, fontWeight: 600, letterSpacing: "-0.015em" }}>{s.t}</h3>
                <p className="max-md:!text-base" style={{ margin: "6px 0 0", fontSize: 14.5, lineHeight: 1.5, color: "#B7B2A8" }}>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* GOOGLE VS META */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <CenterHead eyebrow="Two platforms" title={<>Same budget. <ItalicInline>Different job.</ItalicInline></>} mb={24} />
        <div style={{ margin: "0 auto 28px", maxWidth: 880 }}>
          <img loading="lazy" src="/assets/pages/ads/06-google-vs-meta__budget-split.png" alt="Illustration: the same budget split into Google, capturing existing demand, and Meta, creating future demand" style={{ display: "block", width: "100%", aspectRatio: "16/9", borderRadius: 12, objectFit: "cover" }} />
        </div>
        <div style={{ display: "grid", gap: 20 }} className="md:!grid-cols-2">
          <div style={{ minWidth: 0, borderRadius: 24, background: "#FBFBF9", color: "#1C1C1C", border: "1px solid #E2DFD8", padding: "clamp(24px,3vw,40px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span aria-hidden="true" style={{ width: 40, height: 40, borderRadius: 12, background: "#1C1C1C", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M5 9a4 4 0 1 0 8 0 4 4 0 0 0-8 0M12 12l4 4" stroke="#D3AE82" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", color: "#9A7646" }}>GOOGLE ADS</span>
            </div>
            <h3 style={{ margin: "20px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(30px,3vw,42px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.05 }}>Captures demand.</h3>
            <p style={{ margin: "12px 0 0", fontSize: 17, lineHeight: 1.6, color: "#4E4C48", maxWidth: 460 }}>
              People are already searching for what you sell. Google puts you in front of them at the exact moment they&apos;re looking.
            </p>
            <ul style={{ margin: "22px 0 0", padding: 0, listStyle: "none" }}>
              {GOOGLE_LIST.map((it) => (
                <li key={it} style={{ display: "flex", gap: 12, padding: "11px 0", borderTop: "1px solid #E6E1D8", fontSize: 16, lineHeight: 1.45, color: "#1C1C1C" }}>
                  <span style={{ width: 5, height: 5, marginTop: ".55em", borderRadius: "50%", background: "#C4A47C", flex: "0 0 auto" }} />
                  {it}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ minWidth: 0, borderRadius: 24, background: "#171717", color: "#F2EFEA", border: "1px solid #171717", padding: "clamp(24px,3vw,40px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span aria-hidden="true" style={{ width: 40, height: 40, borderRadius: 12, background: "#F2EFEA", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 3h12v12H3zM3 8h12M3 12h12" stroke="#1C1C1C" strokeWidth="1.6" strokeLinecap="round" />
                </svg>
              </span>
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", color: "#D3AE82" }}>META ADS</span>
            </div>
            <h3 style={{ margin: "20px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(30px,3vw,42px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.05 }}>Creates demand.</h3>
            <p style={{ margin: "12px 0 0", fontSize: 17, lineHeight: 1.6, color: "#B7B2A8", maxWidth: 460 }}>
              People aren&apos;t looking for you yet. Meta interrupts the scroll with something worth stopping for.
            </p>
            <ul style={{ margin: "22px 0 0", padding: 0, listStyle: "none" }}>
              {META_LIST.map((it) => (
                <li key={it} style={{ display: "flex", gap: 12, padding: "11px 0", borderTop: "1px solid rgba(255,255,255,.14)", fontSize: 16, lineHeight: 1.45, color: "#C9C4BA" }}>
                  <span style={{ width: 5, height: 5, marginTop: ".55em", borderRadius: "50%", background: "#C4A47C", flex: "0 0 auto" }} />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p style={{ margin: "24px 0 0", textAlign: "center", fontFamily: "'General Sans'", fontSize: "clamp(20px,1.8vw,24px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
          Google catches intent. <ItalicInline style={{ color: "#9A7646" }}>Meta creates it.</ItalicInline>
        </p>
      </section>

      {/* TRACKING */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <CenterHead
          eyebrow="Tracking before scaling"
          title={<>If tracking is wrong,<ItalicBlock>every optimization is guessing.</ItalicBlock></>}
          sub="Most accounts I look at are optimizing toward the wrong number, like page views or button clicks instead of actual leads."
          mb={36}
        />
        <div style={{ display: "grid", gap: "36px 56px", alignItems: "center" }} className="md:!grid-cols-2">
          <div>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "#1C1C1C", fontWeight: 500, maxWidth: 480 }}>Before a single dollar scales, I make sure these are set up and talking to each other:</p>
            <ul style={{ margin: "18px 0 0", padding: 0, listStyle: "none", display: "grid", gap: "0 28px", borderTop: "1px solid #1C1C1C" }} className="sm:!grid-cols-2">
              {TRACKING_CHECKLIST.map((it, i) => (
                <NumRow key={it} n={String(i + 1).padStart(2, "0")}>
                  {it}
                </NumRow>
              ))}
            </ul>
          </div>
          <img loading="lazy" src="/assets/pages/ads/07-tracking__broken-tracking.png" alt="Illustration: tangled, broken tracking across Google, Meta and store feeding a dark dashboard, versus clean connected tracking into one data source and a clear dashboard" style={{ display: "block", width: "100%", aspectRatio: "4/3", borderRadius: 12, objectFit: "cover" }} />
        </div>
      </section>

      {/* PAID WORK */}
      <section id="work" className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <CenterHead eyebrow="Paid work" title={<>A look at<ItalicBlock>the paid work.</ItalicBlock></>} sub="Two Meta video ads from the Blainy account, straight from Ads Manager. Figures are exactly what Meta reports for each ad." mb={32} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14, margin: "0 0 24px" }}>
          <img src="/assets/site/logo-blainy.png" alt="Blainy logo" loading="lazy" style={{ display: "block", height: 36, width: "auto", mixBlendMode: "multiply" }} />
          <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".12em", color: "#8B877F" }}>AI SAAS · CAMPAIGN: CAPTURE / SALES</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {AD_RESULTS.map((a) => (
            <article key={a.n} style={{ borderRadius: 24, background: "#FBFBF9", border: "1px solid #E2DFD8", padding: "clamp(22px,3vw,36px)", display: "grid", gap: "28px 44px", alignItems: "center" }} className="md:!grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 11.5, fontWeight: 600, letterSpacing: ".12em", color: "#6A5C4B" }}>
                  <span>{a.n}</span>
                  <span style={{ width: 24, height: 1, background: "#DDD5C8" }} />
                  <span>META ADS · VIDEO CREATIVE</span>
                </div>
                <h3 style={{ margin: "14px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(22px,2vw,28px)", fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.15 }}>
                  {a.title} <ItalicInline style={{ fontWeight: 400 }}>{a.emph}</ItalicInline>
                </h3>
                <p className="max-md:!text-base" style={{ margin: "10px 0 0", fontSize: 15.5, lineHeight: 1.6, color: "#4E4C48" }}>{a.d}</p>
                <div className="max-md:[&>div]:!px-2 max-md:[&>div]:!text-center" style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid #1C1C1C", borderBottom: "1px solid #DDD5C8" }}>
                  {a.stats.map((s, i) => (
                    <div key={s.l} style={{ padding: `14px 10px 14px ${i % 2 ? 14 : 0}px`, borderLeft: i % 2 ? "1px solid #DDD5C8" : "0", borderTop: i > 1 ? "1px solid #DDD5C8" : "0" }}>
                      <div style={{ fontFamily: "'General Sans'", fontSize: "clamp(24px,2.2vw,30px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{s.v}</div>
                      <div style={{ marginTop: 6, fontSize: 13, color: "#5A5854" }}>{s.l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <figure style={{ margin: 0, minWidth: 0 }}>
                <div style={{ marginBottom: 10, fontSize: 11, fontWeight: 700, letterSpacing: ".12em", color: "#9A7646" }}>META ADS MANAGER · VIDEO PERFORMANCE</div>
                <img loading="lazy" src={`/assets/pages/ads/${a.img}`} alt={a.alt} style={{ display: "block", width: "100%", aspectRatio: "4/3", borderRadius: 14, objectFit: "cover" }} />
              </figure>
            </article>
          ))}
        </div>
        <p className="max-md:!text-base" style={{ margin: "18px 0 0", fontSize: 14, lineHeight: 1.5, color: "#77746E", textAlign: "center" }}>
          What I handled on these: campaign and ad-set setup, creative testing across hooks, and reading the video metrics to decide what kept running.
        </p>
      </section>

      {/* FIRST WEEK */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <CenterHead eyebrow="The first-week check" title={<>What I check<ItalicBlock>in the first week.</ItalicBlock></>} sub="Before spending more, I want four questions answered. Most wasted spend shows up in one of these places." />
        <div style={{ display: "grid", gap: 20 }} className="md:!grid-cols-2">
          {FIRST_WEEK.map((f) => (
            <div key={f.n} style={{ minWidth: 0, borderRadius: 22, background: "#FBFBF9", border: "1px solid #E2DFD8", padding: "clamp(24px,2.6vw,32px)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36, borderRadius: "50%", border: "1.5px solid #1C1C1C", fontSize: 12.5, fontWeight: 600 }}>{f.n}</span>
              <h3 style={{ margin: "18px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(22px,2vw,27px)", fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.15 }}>{f.q}</h3>
              <p style={{ margin: "10px 0 0", fontSize: 16, lineHeight: 1.55, color: "#5A5854" }}>{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MANAGE */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <CenterHead eyebrow="Scope" title={<>What I <ItalicInline>actually manage.</ItalicInline></>} mb={32} />
        <div style={{ display: "grid", borderTop: "1px solid #1C1C1C" }} className="grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-5">
          {MANAGE_COLS.map((c, i) => (
            <div key={c.n} className="max-sm:!border-l-0 max-sm:!px-0" style={{ minWidth: 0, padding: `24px ${i ? 18 : 0}px 28px ${i ? 18 : 0}px`, borderLeft: i ? "1px solid #DDDAD3" : "0", borderBottom: "1px solid #DDDAD3" }}>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: "#9A7646" }}>{c.n}</span>
              <h3 style={{ margin: "10px 0 0", fontFamily: "'General Sans'", fontSize: 21, fontWeight: 600, letterSpacing: "-0.02em" }}>{c.t}</h3>
              <ul style={{ margin: "16px 0 0", padding: 0, listStyle: "none" }}>
                {c.items.map((it) => (
                  <li key={it} className="max-md:!text-base" style={{ padding: "9px 0", borderTop: "1px solid #E6E1D8", fontSize: 15, lineHeight: 1.4, color: "#4E4C48" }}>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* TESTING */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <div style={{ borderRadius: 28, background: "#F4F0E8", border: "1px solid #E2D8CA", padding: "clamp(28px,3.6vw,52px)" }}>
          <CenterHead eyebrow="Testing framework" title={<>Change one thing. <ItalicInline>Learn something.</ItalicInline></>} sub="Changing five things at once tells you nothing. I test one variable at a time, so every result actually means something." mb={28} />
          <div style={{ display: "grid", gap: "32px 48px", alignItems: "center" }} className="md:!grid-cols-2">
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", color: "#9A7646", textAlign: "center" }}>ONE VARIABLE AT A TIME</div>
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
                  {TEST_ROW1.map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
                  {TEST_ROW2.map((t) => (
                    <Pill key={t}>{t}</Pill>
                  ))}
                </div>
              </div>
              <div style={{ marginTop: 28, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <span style={{ display: "inline-flex", alignItems: "center", height: 44, padding: "0 16px", borderRadius: 12, background: "#FBFBF9", color: "#1C1C1C", border: "1px solid #DDD0BE", fontFamily: "'General Sans'", fontSize: 16, fontWeight: 600 }}>Test</span>
                <span aria-hidden="true" style={{ color: "#B8A68C" }}>→</span>
                <span style={{ display: "inline-flex", alignItems: "center", height: 44, padding: "0 16px", borderRadius: 12, background: "#FBFBF9", color: "#1C1C1C", border: "1px solid #DDD0BE", fontFamily: "'General Sans'", fontSize: 16, fontWeight: 600 }}>Learn</span>
                <span aria-hidden="true" style={{ color: "#B8A68C" }}>→</span>
                <span style={{ display: "inline-flex", alignItems: "center", height: 44, padding: "0 16px", borderRadius: 12, background: "#FBFBF9", color: "#1C1C1C", border: "1px solid #DDD0BE", fontFamily: "'General Sans'", fontSize: 16, fontWeight: 600 }}>Keep or kill</span>
                <span aria-hidden="true" style={{ color: "#B8A68C" }}>→</span>
                <span style={{ display: "inline-flex", alignItems: "center", height: 44, padding: "0 16px", borderRadius: 12, background: "#1C1C1C", color: "#D3AE82", border: "1px solid #1C1C1C", fontFamily: "'General Sans'", fontSize: 16, fontWeight: 600 }}>Scale</span>
                <span aria-hidden="true" style={{ color: "#B8A68C", fontSize: 18 }}>↺</span>
              </div>
            </div>
            <img loading="lazy" src="/assets/pages/ads/09-testing__one-dial-at-a-time.png" alt="Illustration: adjusting one dial feeds audience, ads, landing page, checkout and conversions" style={{ display: "block", width: "100%", aspectRatio: "4/3", borderRadius: 12, objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* BUDGET */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <CenterHead eyebrow="Budget" title={<>Management fee and ad spend<ItalicBlock>stay separate.</ItalicBlock></>} sub="You pay Google and Meta directly. You own the ad accounts, always. My fee covers the management, not the media." max={900} />
        <div style={{ display: "grid", gap: 20 }} className="md:!grid-cols-2">
          <div style={{ borderRadius: 24, background: "#FBFBF9", border: "1px solid #E2DFD8", padding: "clamp(24px,3vw,40px)" }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", color: "#9A7646" }}>YOUR AD SPEND</div>
            <h3 style={{ margin: "14px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(26px,2.4vw,34px)", fontWeight: 600, letterSpacing: "-0.03em" }}>Paid straight to Google &amp; Meta.</h3>
            <p style={{ margin: "12px 0 0", fontSize: 16, lineHeight: 1.6, color: "#4E4C48" }}>
              It depends on your market, click costs, location, sales cycle and goal. For testing, I usually recommend starting between $100 and $500 a month.
            </p>
            <div style={{ marginTop: 24, display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 6 }}>
              {BUDGET_BARS.map((b) => (
                <div key={b.t} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <span style={{ height: b.h, borderRadius: 4, background: b.gold ? "#C4A47C" : "#1C1C1C", opacity: b.op }} />
                  <span style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.3 }}>{b.t}</span>
                </div>
              ))}
            </div>
            <p className="max-md:!text-base" style={{ margin: "24px 0 0", paddingTop: 16, borderTop: "1px solid #E6E1D8", fontSize: 14.5, lineHeight: 1.55, color: "#5A5854" }}>
              At about $5.42 per Google click on average, $300 to $600 a month gets you roughly 55 to 110 clicks. Enough to learn which keywords convert, not enough to scale.
            </p>
            <p style={{ margin: "12px 0 0", fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: 19, lineHeight: 1.3, color: "#77746E" }}>
              Tiny budgets can answer questions. They can&apos;t guarantee results.
            </p>
          </div>
          <div style={{ borderRadius: 24, background: "#171717", color: "#F2EFEA", padding: "clamp(24px,3vw,40px)" }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", color: "#D3AE82" }}>MY MANAGEMENT FEE</div>
            <h3 style={{ margin: "14px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(26px,2.4vw,34px)", fontWeight: 600, letterSpacing: "-0.03em" }}>One flat monthly fee.</h3>
            <p style={{ margin: "12px 0 0", fontSize: 16, lineHeight: 1.6, color: "#B7B2A8" }}>
              Covers the work: tracking, campaigns, creative, landing-page review and weekly optimization. Not a percentage of your spend.
            </p>
            <div style={{ marginTop: 24, display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontFamily: "'General Sans'", fontSize: "clamp(48px,4.6vw,64px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>$1,499</span>
              <span style={{ color: "#9C978D" }}>per month</span>
            </div>
            <ul style={{ margin: "22px 0 0", padding: 0, listStyle: "none" }}>
              {["You own the ad account", "You see every dollar in your own billing", "No markup on media"].map((it) => (
                <li key={it} style={{ display: "flex", gap: 12, padding: "11px 0", borderTop: "1px solid rgba(255,255,255,.14)", fontSize: 16, lineHeight: 1.45, color: "#C9C4BA" }}>
                  <span style={{ width: 5, height: 5, marginTop: ".55em", borderRadius: "50%", background: "#C4A47C", flex: "0 0 auto" }} />
                  {it}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <CenterHead eyebrow="Process" title={<>Five steps. <ItalicInline>No &ldquo;launch everything and pray.&rdquo;</ItalicInline></>} mb={28} max={1100} />
        <div style={{ margin: "0 auto 28px", maxWidth: 1120 }}>
          <img loading="lazy" src="/assets/pages/ads/10-process__five-steps.png" alt="Five-step process illustration: audit, research, build, optimize, measure" style={{ display: "block", width: "100%", aspectRatio: "1448/500", borderRadius: 12, objectFit: "cover" }} />
        </div>
        <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "16px 24px" }} className="grid-cols-1 sm:!grid-cols-3 lg:!grid-cols-5">
          {PROCESS_STEPS.map((s) => (
            <li key={s.n} style={{ minWidth: 0, paddingTop: 16, borderTop: `2px solid ${s.last ? "#C4A47C" : "#1C1C1C"}` }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#9A7646" }}>{s.n}</span>
              <h3 style={{ margin: "8px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(20px,1.7vw,23px)", fontWeight: 600, letterSpacing: "-0.02em" }}>{s.t}</h3>
              <p className="max-md:!text-base" style={{ margin: "6px 0 0", fontSize: 15, lineHeight: 1.5, color: "#4E4C48" }}>{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* PERFORMANCE */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <CenterHead eyebrow="Reading the numbers" title={<>Cheap clicks <ItalicInline>are not the goal.</ItalicInline></>} sub="Here's what each number actually tells you." />
        <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 12 }} className="grid-cols-1 sm:!grid-cols-3 lg:!grid-cols-6">
          {PERF_CARDS.map((c) => (
            <li key={c.n} style={{ position: "relative", minWidth: 0, borderRadius: 18, padding: "22px 20px 24px", background: c.dark ? (c.n === "05" ? "#2A2926" : "#171717") : "#FBFBF9", color: c.dark ? "#F2EFEA" : "#1C1C1C", border: c.dark ? "1px solid transparent" : "1px solid #E2DFD8" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: c.dark ? "#D3AE82" : "#9A7646" }}>{c.n}</span>
                <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".1em", color: c.dark ? "#D3AE82" : "#A09B91" }}>{c.tag}</span>
              </div>
              <h3 style={{ margin: "16px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(22px,2vw,26px)", fontWeight: 600, letterSpacing: "-0.025em" }}>{c.t}</h3>
              <p className="max-md:!text-base" style={{ margin: "8px 0 0", fontSize: 15, lineHeight: 1.5, color: c.dark ? "#C9C4BA" : "#5A5854" }}>{c.d}</p>
            </li>
          ))}
        </ol>
        <p style={{ margin: "24px 0 0", textAlign: "center", fontFamily: "'General Sans'", fontSize: "clamp(20px,1.8vw,24px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
          A $10 click that becomes a customer <ItalicInline style={{ color: "#9A7646" }}>beats a $1 click that doesn&apos;t.</ItalicInline>
        </p>
      </section>

      {/* PRICING */}
      <section id="pricing" className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <CenterHead eyebrow="Pricing" title={<>One fee. <ItalicInline>Your budget stays yours.</ItalicInline></>} />
        <div style={{ borderRadius: 28, background: "#FBFBF9", border: "1px solid #D9CBB6", padding: "clamp(24px,3.4vw,48px)" }}>
          <div style={{ display: "grid", gap: "32px 56px", alignItems: "start" }} className="md:!grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)]">
            <div className="max-md:!text-center">
              <div className="max-md:!justify-center" style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, fontWeight: 700, letterSpacing: ".12em", color: "#9A7646" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C4A47C" }} />
                GOOGLE + META ADS MANAGEMENT
              </div>
              <h3 style={{ margin: "14px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(30px,3vw,42px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.05 }}>
                Tracking, campaigns, creative and weekly optimization.
              </h3>
              <div style={{ marginTop: 22, fontSize: 12, fontWeight: 700, letterSpacing: ".12em" }}>INCLUDED</div>
              <ul style={{ margin: "10px 0 0", padding: 0, listStyle: "none", display: "grid", gap: "0 28px", borderTop: "1px solid #E6E1D8" }} className="sm:!grid-cols-2 max-md:!text-left">
                {PRICING_INCLUDED.map((it) => (
                  <li key={it} className="max-md:!text-base" style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: "1px solid #E6E1D8", fontSize: 15, lineHeight: 1.4, fontWeight: 500 }}>
                    <span style={{ fontSize: 12, color: "#9A7646" }}>✓</span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }} className="md:!pl-14 md:!border-l md:!border-[#E6E1D8] max-md:!text-center">
              <div>
                <span style={{ fontFamily: "'General Sans'", fontSize: "clamp(56px,5.6vw,76px)", fontWeight: 600, letterSpacing: "-0.045em", lineHeight: 1 }}>$1,499</span>
                <span style={{ marginLeft: 10, fontSize: 15, color: "#77746E" }}>per month</span>
              </div>
              <p className="max-md:!text-base" style={{ margin: 0, fontSize: 15, lineHeight: 1.55, color: "#4E4C48" }}>Ad spend is paid directly to Google or Meta. You own the ad account.</p>
              <a href="#contact" className="max-md:!flex max-md:!w-full max-md:!max-w-[400px] max-md:!justify-center max-md:!self-center max-md:!mx-auto" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 12, height: 56, padding: "0 26px", borderRadius: 12, background: "#1C1C1C", color: "#F8F6F4", fontSize: 16, fontWeight: 600 }}>
                Tell me about your ads
                <ArrowIcon />
              </a>
              <p className="max-md:!text-base" style={{ margin: 0, paddingTop: 14, borderTop: "1px solid #E6E1D8", fontSize: 13.5, lineHeight: 1.5, color: "#77746E" }}>
                Freelancers typically charge $500 to $2,500 a month for ads management. Tracking, creative and landing-page review are in this fee, not add-ons.
              </p>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 20, borderRadius: 24, background: "#171717", color: "#F2EFEA", padding: "clamp(24px,3vw,40px)", display: "grid", gap: "24px 48px", alignItems: "center" }} className="sm:!grid-cols-2 max-sm:!text-center">
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", color: "#D3AE82" }}>NEED THE REST OF THE FUNNEL TOO?</div>
            <div className="phone-heading" style={{ marginTop: 12, fontFamily: "'General Sans'", fontSize: "clamp(34px,3.2vw,44px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1 }}>Everything, handled</div>
            <p style={{ margin: "10px 0 0", color: "#C9C4BA" }}>$3,999 a month for SEO, Reddit, social, content and design. Add ads management for $1,499.</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "flex-start" }} className="sm:!justify-end max-sm:!justify-center">
            {["SEO", "Reddit", "Social", "Content", "Design", "+ Ads $1,499"].map((t) => (
              <LightPill key={t}>{t}</LightPill>
            ))}
          </div>
        </div>
      </section>

      {/* FIT */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#8B877F" }}>Who it&apos;s for</div>
          <h2 style={{ margin: "12px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(34px,3.4vw,50px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
            Paid ads work best <ItalicInline>when...</ItalicInline>
          </h2>
        </div>
        <div style={{ display: "grid", gap: "32px clamp(32px,5vw,72px)", maxWidth: 1080, margin: "0 auto" }} className="sm:!grid-cols-2">
          <div>
            <h3 style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#9A7646" }}>Good fit</h3>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", borderBottom: "1px solid #DDDAD3" }}>
              {FIT_GOOD.map((t) => (
                <li key={t} style={{ display: "grid", gridTemplateColumns: "24px minmax(0,1fr)", gap: 12, alignItems: "baseline", padding: "16px 0", borderTop: "1px solid #DDDAD3", fontSize: 17, lineHeight: 1.45 }}>
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
                <li key={t} style={{ display: "grid", gridTemplateColumns: "24px minmax(0,1fr)", gap: 12, alignItems: "baseline", padding: "16px 0", borderTop: "1px solid #DDDAD3", fontSize: 17, lineHeight: 1.45, color: "#5A5854" }}>
                  <span aria-hidden="true" style={{ fontSize: 14, fontWeight: 600, color: "#A09B91" }}>—</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <CenterHead eyebrow="FAQ" title={<>Ads questions, <ItalicInline>answered straight.</ItalicInline></>} mb={8} />
        <div style={{ display: "grid", gap: "24px clamp(40px,5vw,80px)", alignItems: "start" }} className="md:!grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)]">
          <div style={{ minWidth: 0, display: "flex", justifyContent: "center" }}>
            <img loading="lazy" src="/assets/pages/ads/14-faq__ad-questions.png" alt="Illustration: scattered ad questions going into a laptop and coming out as clear, checked answers" style={{ display: "block", width: "100%", aspectRatio: "1/1", borderRadius: 12, objectFit: "cover" }} />
          </div>
          <FAQAccordion faqs={FAQS} />
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} clamp(24px,3vw,40px)` }}>
        <div style={{ borderRadius: 28, background: "#1C1C1C", color: "#F2EFEA", padding: "clamp(48px,6vw,88px) clamp(24px,5vw,72px)", display: "grid", gap: "48px clamp(40px,5vw,80px)", alignItems: "center" }} className="md:!grid-cols-2">
          <div className="max-md:!text-center">
            <h2 className="max-md:!text-balance" style={{ margin: 0, fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(32px,3.4vw,48px)", lineHeight: 1.06, letterSpacing: "-0.035em" }}>Already spending and not sure what&apos;s working?</h2>
            <p style={{ margin: "14px 0 0", fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "clamp(28px,2.6vw,36px)", lineHeight: 1.1, color: "#D3AE82" }}>
              <Emphasis>Let&apos;s find the leak.</Emphasis>
            </p>
            <p className="max-md:!mx-auto" style={{ margin: "22px 0 0", maxWidth: 480, fontSize: 17, lineHeight: 1.6, color: "#B7B2A8" }}>
              Tell me what you&apos;re spending, where, and what you&apos;re getting back. I&apos;ll tell you where I&apos;d look first.
            </p>
          </div>
          <div className="max-md:!mx-auto max-md:!w-full max-md:!max-w-[400px]" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <a href="/contact" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, height: 64, padding: "0 24px", borderRadius: 12, background: "#F2EFEA", color: "#1C1C1C", fontSize: 17, fontWeight: 600 }}>
              Tell me about your ads
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
        <h2 className="max-md:!text-center" style={{ margin: "0 0 20px", fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#8B877F" }}>Works well alongside ads</h2>
        <div style={{ display: "grid", borderTop: "1px solid #1C1C1C" }} className="grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4">
          {RELATED.map((r, i) => (
            <a key={r.t} href={r.href} className="max-sm:!border-l-0 max-sm:!px-0" style={{ display: "flex", flexDirection: "column", gap: 8, padding: `22px ${i ? 24 : 0}px 22px ${i ? 24 : 0}px`, borderLeft: i ? "1px solid #DDDAD3" : "0", borderBottom: "1px solid #DDDAD3" }}>
              <span style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, fontFamily: "'General Sans'", fontSize: 20, fontWeight: 600, letterSpacing: "-0.015em" }}>
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
