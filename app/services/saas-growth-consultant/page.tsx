import { buildMetadata } from "@/lib/seo";
import { H1_ACCENT_STYLE, HERO_H1_STYLE } from "@/app/HomeComponents/heading";
import Link from "next/link";
import { ArrowIcon, Emphasis } from "../../HomeComponents/icons";
import { FAQAccordion } from "../../HomeComponents/FAQAccordion";

export const metadata = buildMetadata({
  title: "SaaS Growth Consultant | Fix the Bottleneck First | Zain",
  description:
    "SaaS growth consultant who finds what's actually blocking growth, fixes it first, then scales what works. Go to market plans and $499 audits.",
  path: "/services/saas-growth-consultant",
});

const MAX = 1280;
const PAD = "clamp(20px,2.5vw,32px)";

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

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div className="max-md:!text-center" style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#8B877F" }}>{children}</div>;
}

function SectionHead({ eyebrow, title, sub, dark }: { eyebrow: string; title: React.ReactNode; sub: React.ReactNode; dark?: boolean }) {
  return (
    <div style={{ display: "grid", gap: "20px 64px", alignItems: "end", marginBottom: 40 }} className="md:!grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] max-md:!text-center">
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: dark ? "#9C978D" : "#8B877F" }}>{eyebrow}</div>
        <h2 className="max-md:!text-balance" style={{ margin: "16px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(38px,3.6vw,52px)", lineHeight: 1.02, letterSpacing: "-0.035em", color: dark ? "#F2EFEA" : "#1C1C1C" }}>{title}</h2>
      </div>
      <div className="max-md:!mx-auto" style={{ paddingBottom: 4, maxWidth: 460 }}>
        <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: dark ? "#B7B2A8" : "#4E4C48" }}>{sub}</p>
      </div>
    </div>
  );
}

const PROOF = [
  { v: "100K+", l: "Users brought in", sub: "Across projects" },
  { v: "85K+", l: "For one SaaS", sub: "Blainy, no paid acquisition" },
  { v: "50M+", l: "Search impressions", sub: "Across projects" },
  { v: "3.9M+", l: "Instagram views", sub: "Blainy, 90 days" },
];

const SYMPTOMS = [
  { n: "01", k: "Positioning", d: "People don't get what you do." },
  { n: "02", k: "Acquisition", d: "The right people never find you." },
  { n: "03", k: "Conversion", d: "Visitors come. Nobody signs up." },
  { n: "04", k: "Activation", d: "Signups never use the product." },
  { n: "05", k: "Retention", d: "Customers quietly leave." },
  { n: "06", k: "Distribution", d: "One channel is carrying everything." },
];

const SIX_PARTS = [
  { n: "01", t: "Positioning", d: "Who it's for, what it replaces and why it's better. If this is fuzzy, every channel underperforms.", tags: ["ICP", "Competitors", "Differentiation", "Messaging"], alt: "Illustration: a target surrounded by audience, message, value and differentiation", img: "04-part-1__positioning.png" },
  { n: "02", t: "Offer", d: "What people get, what it costs and why now.", tags: ["Pricing", "Packaging", "Free entry points", "Risk reversal"], alt: "Illustration: an offer box opening into pricing, packaging, value and guarantee", img: "04-part-2__offer.png" },
  { n: "03", t: "Acquisition", d: "The channels that bring the right people. Usually one or two, not seven.", tags: ["SEO", "Reddit", "Social", "Paid", "Partnerships"], alt: "Illustration: search, social, community, paid and referral paths feeding one funnel", img: "04-part-3__acquisition.png" },
  { n: "04", t: "Conversion", d: "What happens after someone lands. The page, the pitch and the next step.", tags: ["Landing pages", "CTAs", "Signup flow", "Tracking"], alt: "Illustration: attention and interest turning into signups through one clear page", img: "04-part-4__conversion.png" },
  { n: "05", t: "Activation & retention", d: "Getting signups to actually use the product, then keeping them.", tags: ["Onboarding", "Lifecycle email", "Segmentation", "Churn signals"], alt: "Illustration: a customer at the centre of onboarding, email, support and community loops", img: "04-part-5__activation-retention.png" },
  { n: "06", t: "Measurement & prioritization", d: "Knowing which numbers matter and deciding what to fix first.", tags: ["KPIs", "Attribution", "Experiments", "Priorities"], alt: "Illustration: a growth dashboard with KPIs, targets and experiments", img: "04-part-6__measurement.png" },
];

const SYSTEM_STEPS = [
  { n: "01", t: "Diagnose", d: "Find where growth actually breaks." },
  { n: "02", t: "Prioritize", d: "Pick what to fix first." },
  { n: "03", t: "Position", d: "Make the message clear." },
  { n: "04", t: "Build", d: "Set up the pages, channels and systems." },
  { n: "05", t: "Test", d: "Run small and measure honestly." },
  { n: "06", t: "Scale", d: "Put more effort behind what proves itself." },
];

const STAGES = ["Market", "ICP", "Positioning", "Offer", "Channel", "Landing page", "Activation", "Retention", "Revenue"];

const SYMPTOM_QUOTES = [
  { q: "“People like it but don't buy.”", to: "→ Positioning / offer" },
  { q: "“Traffic comes but nobody signs up.”", to: "→ Conversion" },
  { q: "“People sign up but disappear.”", to: "→ Activation" },
  { q: "“Customers leave quickly.”", to: "→ Retention" },
];

const LEAVE_WITH = [
  { n: "01", t: "The diagnosis", items: ["Where growth is breaking and why", "Who your best customers really are", "How clear your positioning is", "What is currently wasting time or budget"] },
  { n: "02", t: "The plan", items: ["Which channels to focus on", "Which channels to ignore", "Messaging and offer changes", "What should happen first", "A 30 / 60 / 90-day direction"] },
  { n: "03", t: "The system", items: ["Experiments ranked by importance", "KPIs to track", "Funnel fixes in priority order", "What “good” should look like"] },
];

const ROADMAP = [
  { range: "DAYS 1 TO 30", t: "Diagnose & fix the obvious", items: ["Audit everything.", "Fix tracking.", "Clean up messaging.", "Fix the leaks that do not need testing."], dark: false },
  { range: "DAYS 31 TO 60", t: "Build & test", items: ["Launch priority channels.", "Run small experiments.", "Measure honestly."], dark: false },
  { range: "DAYS 61 TO 90", t: "Scale what works", items: ["Double down on what proved itself.", "Cut what didn't.", "No guilt."], dark: true },
];

const PRIORITIZE = [
  { n: "01", t: "Fix now", items: ["High impact.", "High confidence.", "Low enough effort."], dim: false },
  { n: "02", t: "Test next", items: ["Potentially high impact.", "Still uncertain.", "Needs evidence."], dim: false },
  { n: "03", t: "Ignore for now", items: ["Low impact.", "High distraction.", "Not worth the time yet."], dim: true },
];

const PROCESS_STEPS = [
  { n: "01", t: "Diagnose", d: "Look at the whole system, not just one channel." },
  { n: "02", t: "Prioritize", d: "Rank problems by impact, confidence and effort." },
  { n: "03", t: "Build the plan", d: "Channels, messaging and a 30 / 60 / 90 roadmap." },
  { n: "04", t: "Execute & test", d: "Do the work, or work alongside the team." },
  { n: "05", t: "Learn & scale", d: "Keep what works, cut what doesn't, repeat." },
];

const AUDIT_REVIEW = ["What is holding growth back", "Which parts of the funnel are weak", "Which channels help, and which waste effort", "Whether the positioning is clear", "Whether the offer makes sense", "Whether traffic reaches the right people", "Where conversion is leaking", "Whether activation or retention is the real issue", "Missed opportunities"];
const AUDIT_RECEIVE = ["Current growth diagnosis", "Bottleneck map", "Positioning / offer review", "Channel assessment", "Funnel issues", "Missed opportunities", "Ranked priorities", "Recommended next steps"];

const FIT_GOOD = ["Your product or service already exists and has customers.", "You have some traction but growth is inconsistent.", "You're running several channels with no clear priority.", "You're launching something new or repositioning.", "The founder still owns too much of the growth work."];
const FIT_BAD = ["You want guaranteed growth.", "You haven't validated the product yet.", "You only want a list of random tactics.", "You would rather not measure anything."];

const FAQS: [string, string[]][] = [
  ["What is GTM?", ["Go-to-market: how a product reaches the people who should buy it. Who it's for, what you say, what it costs, which channels you use and what happens after someone lands."]],
  ["What does a growth strategist actually do?", ["Finds what is actually blocking growth, decides what to fix first, and builds the plan around it. In my case I also do the work: SEO, Reddit, social, content and design."]],
  ["How much does it cost to hire a marketing person?", ["The growth audit is $499 one time. Everything, handled, strategy plus execution across SEO, Reddit, social, content and design, is $3,999 a month. That is one person instead of a strategist, writer, designer and channel specialists."]],
  ["Do you do strategy or execution?", ["Both. I don't hand over a plan and disappear. Most clients start with the audit, then decide whether they want me to run it."]],
  ["Can you work with our existing team?", ["Yes. I can own a channel, fill gaps, or set the priorities and work alongside the people you have."]],
  ["What does the $499 audit include?", ["I review your current growth system, including positioning, offer, channels, funnel, messaging and data.", "Then I identify what's holding growth back, rank the issues by priority, show where you're wasting effort, highlight missed opportunities, and give you a clear action list for what to fix first and what to do next.", "The goal is simple: you leave knowing where growth is stuck and what to do about it."]],
  ["How long until we know what's working?", ["Obvious leaks can often be fixed in the first 30 days. Small experiments usually show a direction in 30 to 60 days. Channels like SEO take longer to compound."]],
  ["What stage should my company be at?", ["You should have a real product or service and some customers. If you haven't validated the product yet, strategy work is usually premature."]],
  ["Do I need every marketing channel?", ["No. Most businesses grow on one or two channels done well. Part of the audit is deciding which ones to ignore."]],
];

const RELATED = [
  { t: "SEO", d: "Get found by people already searching.", href: "/services/seo-specialist-for-saas" },
  { t: "Reddit marketing", d: "Show up where buyers ask for recommendations.", href: "/services/reddit-marketing-specialist" },
  { t: "Social media management", d: "Consistent attention that brings visits.", href: "/services/social-media-marketing-specialist" },
];

export default function GrowthStrategyPage() {
  return (
    <main id="top" style={{ overflowX: "clip" }}>
      {/* HERO */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(40px,5vw,64px) ${PAD} 48px`, display: "grid", gap: "40px 56px", alignItems: "center" }} className="md:!grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <div style={{ minWidth: 0 }} className="max-md:!text-center">
          <h1 className="max-md:!mx-auto" style={{ ...HERO_H1_STYLE, maxWidth: 680 }}>
            SaaS growth consultant who{" "}
            <em style={H1_ACCENT_STYLE}>
              fixes the leak before <Emphasis>buying more water.</Emphasis>
            </em>
          </h1>
          <p className="max-md:!mx-auto" style={{ margin: "28px 0 0", maxWidth: 520, fontSize: 18, lineHeight: 1.55, color: "#4E4C48" }}>
            As a SaaS growth consultant, I look at your whole growth system, from positioning to retention, find the one thing actually holding it back, and build the plan around that.
          </p>
          <p className="max-md:!mx-auto" style={{ margin: "12px 0 0", maxWidth: 520, fontSize: 18, lineHeight: 1.55, color: "#1C1C1C", fontWeight: 500 }}>Then I help execute it, because a plan nobody runs is just a nice PDF.</p>
          <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: 12 }} className="max-md:!mx-auto max-md:!max-w-[400px] max-md:!flex-col">
            <a href="#pricing" className="max-md:!justify-center" style={{ display: "inline-flex", alignItems: "center", gap: 12, height: 56, padding: "0 26px", borderRadius: 12, background: "#1C1C1C", color: "#F8F6F4", fontSize: 16, fontWeight: 600 }}>
              Start with the $499 audit
              <ArrowIcon />
            </a>
            <a href="#work" className="max-md:!justify-center" style={{ display: "inline-flex", alignItems: "center", gap: 10, height: 56, padding: "0 22px", borderRadius: 12, border: "1px solid #CFCBC2", color: "#1C1C1C", fontSize: 16, fontWeight: 600 }}>
              See the results ↓
            </a>
          </div>
        </div>
        <figure style={{ margin: 0, minWidth: 0 }}>
          <img loading="lazy" src="/assets/pages/growth-strategy/01-hero__growth-system.png" alt="Illustration: strategy, content, audience, channels, offer and results all connected to one growth system" style={{ display: "block", width: "100%", height: "auto" }} />
        </figure>
      </section>

      {/* PROOF */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: `0 ${PAD}` }}>
        <div style={{ display: "grid", borderTop: "1px solid #1C1C1C", borderBottom: "1px solid #DDDAD3" }} className="!grid-cols-2 sm:!grid-cols-4">
          {PROOF.map((s, i) => (
            <div key={s.l} className={`max-md:!text-center max-sm:!px-2 ${i % 2 === 0 ? "max-sm:!border-l-0" : ""} ${i >= 2 ? "max-sm:!border-t max-sm:!border-t-[#DDDAD3]" : ""}`} style={{ padding: `28px 24px 28px ${i ? 24 : 0}px`, borderLeft: i ? "1px solid #DDDAD3" : "0" }}>
              <div style={{ fontFamily: "'General Sans'", fontSize: "clamp(40px,3.8vw,56px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{s.v}</div>
              <div style={{ marginTop: 14, fontSize: 15, fontWeight: 600 }}>{s.l}</div>
              <div style={{ marginTop: 4, fontSize: 13.5, color: "#77746E" }}>{s.sub}</div>
            </div>
          ))}
        </div>
        <p className="max-md:!text-center" style={{ margin: "14px 0 0", fontSize: 13.5, color: "#77746E" }}>Strategy built from doing the work, not just talking about it.</p>
      </section>

      {/* PROBLEM */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <div style={{ display: "grid", gap: "40px 64px", alignItems: "start" }} className="md:!grid-cols-2">
          <div>
            <Eyebrow>The problem</Eyebrow>
            <h2 className="max-md:!text-center max-md:!text-balance" style={{ margin: "16px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(38px,3.6vw,52px)", lineHeight: 1.02, letterSpacing: "-0.035em" }}>
              More marketing
              <em style={{ display: "block", marginTop: 6, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.08em" }}>
                <Emphasis>isn&apos;t a strategy.</Emphasis>
              </em>
            </h2>
            <p className="max-md:!mx-auto max-md:!text-center max-md:!text-balance" style={{ margin: "18px 0 0", fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "clamp(22px,2vw,26px)", lineHeight: 1.25, color: "#6B6862", maxWidth: 460 }}>
              It&apos;s usually just a more expensive way to stay stuck.
            </p>
            <p style={{ margin: "24px 0 0", fontSize: 17, lineHeight: 1.6, color: "#4E4C48", maxWidth: 480 }}>
              When growth stalls, the instinct is to add something: another channel, another hire, another agency.
            </p>
            <p style={{ margin: "12px 0 0", fontSize: 17, lineHeight: 1.6, color: "#1C1C1C", fontWeight: 500, maxWidth: 480 }}>
              But if people don&apos;t understand the product, more traffic just means more people leaving confused. The fix depends on where growth is actually stuck.
            </p>
          </div>
          <div style={{ minWidth: 0 }}>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", borderTop: "1px solid #1C1C1C" }}>
              {SYMPTOMS.map((s) => (
                <li key={s.n} className="max-sm:!grid-cols-[40px_minmax(0,1fr)]" style={{ display: "grid", gridTemplateColumns: "40px minmax(0,150px) minmax(0,1fr)", gap: "4px 16px", alignItems: "baseline", padding: "20px 0", borderBottom: "1px solid #DDDAD3" }}>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: "#9A7646", fontVariantNumeric: "tabular-nums" }}>{s.n}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase" }}>{s.k}</span>
                  <span className="max-sm:!col-start-2" style={{ fontFamily: "'General Sans'", fontSize: "clamp(18px,1.6vw,21px)", fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1.3 }}>{s.d}</span>
                </li>
              ))}
            </ul>
            <p style={{ margin: "24px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(20px,1.8vw,24px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
              Different symptoms. Different fixes.
              <br />
              <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.1em", color: "#9A7646" }}>Same mistake: guessing.</em>
            </p>
          </div>
        </div>
      </section>

      {/* SIX PARTS */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <SectionHead eyebrow="What growth involves" title={<>Growth has <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.08em" }}>six parts.</em></>} sub="A weak one drags down the other five." />
        <div style={{ display: "grid", gap: 20 }} className="grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3">
          {SIX_PARTS.map((p) => (
            <div key={p.n} style={{ minWidth: 0, borderRadius: 22, background: "#FBFBF9", border: "1px solid #E2DFD8", padding: 26, display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#9A7646", fontVariantNumeric: "tabular-nums" }}>{p.n}</span>
              <h3 style={{ margin: "10px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(21px,1.8vw,25px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.15 }}>{p.t}</h3>
              <p className="max-md:!text-base" style={{ margin: "10px 0 0", fontSize: 15, lineHeight: 1.55, color: "#4E4C48" }}>{p.d}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
                {p.tags.map((tag) => (
                  <Pill key={tag}>{tag}</Pill>
                ))}
              </div>
              <div style={{ marginTop: "auto", paddingTop: 20 }}>
                <img loading="lazy" src={`/assets/pages/growth-strategy/${p.img}`} alt={p.alt} style={{ display: "block", width: "100%", height: "auto", borderRadius: 12 }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* DARK: BOTTLENECK TO SYSTEM */}
      <section className="max-md:!mt-20" style={{ marginTop: "clamp(88px,8vw,112px)", background: "#171717", color: "#F2EFEA" }}>
        <div style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(64px,6vw,88px) ${PAD} clamp(56px,5vw,72px)` }}>
          <SectionHead
            dark
            eyebrow="How growth gets unstuck"
            title={<>From a bottleneck<em style={{ display: "block", marginTop: 6, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.08em", color: "#D3AE82" }}><Emphasis>to a growth system.</Emphasis></em></>}
            sub="Most growth plans start with tactics. Mine start with the constraint. Fix that, prove it works, then scale it."
          />
          <div style={{ display: "grid", gap: "32px 56px", alignItems: "center" }} className="md:!grid-cols-2">
            <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "24px 28px" }} className="grid-cols-2 sm:!grid-cols-3">
              {SYSTEM_STEPS.map((s, i) => (
                <li key={s.n} style={{ minWidth: 0, paddingTop: 16, borderTop: `2px solid ${i === SYSTEM_STEPS.length - 1 ? "#C4A47C" : "rgba(255,255,255,.3)"}` }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: "#D3AE82", fontVariantNumeric: "tabular-nums" }}>{s.n}</span>
                  <h3 style={{ margin: "8px 0 0", fontFamily: "'General Sans'", fontSize: 20, fontWeight: 600, letterSpacing: "-0.015em" }}>{s.t}</h3>
                  <p className="max-md:!text-base" style={{ margin: "6px 0 0", fontSize: 14.5, lineHeight: 1.5, color: "#B7B2A8" }}>{s.d}</p>
                </li>
              ))}
            </ol>
            <img loading="lazy" src="/assets/pages/growth-strategy/05-bottleneck-to-system__dark-journey.png" alt="Illustration: a tangled knot of activity turning into a clear path of strategy, content, channels, audience and growth" style={{ display: "block", width: "100%", height: "auto" }} />
          </div>
        </div>
      </section>

      {/* CONSTRAINT MAP */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <SectionHead eyebrow="The whole system" title={<>I check the whole system<em style={{ display: "block", marginTop: 6, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.08em" }}>before recommending anything.</em></>} sub="If I only looked at SEO, I'd only ever recommend SEO." />
        <div style={{ borderRadius: 28, background: "#F4F0E8", border: "1px solid #E2D8CA", padding: "clamp(20px,3vw,40px) clamp(12px,2vw,28px) clamp(24px,3vw,36px)" }}>
          <img loading="lazy" src="/assets/pages/growth-strategy/06-constraint-map__nine-stage-system.png" alt="Growth system: market, ICP, positioning, offer, channel, landing page, activation, retention and revenue as nine connected stages, with a magnifier on the weak points" style={{ display: "block", width: "100%", height: "auto" }} />
          <div className="max-md:!justify-center" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "8px 16px", marginTop: 20 }}>
            {STAGES.map((s, i) => (
              <span key={s} style={{ fontFamily: "'General Sans'", fontSize: 14.5, fontWeight: 600, letterSpacing: "-0.01em", color: i === STAGES.length - 1 ? "#9A7646" : "#1C1C1C" }}>
                {s}
              </span>
            ))}
          </div>
        </div>
        <div style={{ marginTop: 28, display: "grid", borderTop: "1px solid #1C1C1C" }} className="grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4">
          {SYMPTOM_QUOTES.map((s, i) => (
            <div key={s.q} className="max-sm:!border-l-0 max-sm:!px-0" style={{ minWidth: 0, padding: `20px ${i ? 0 : 24}px 22px 0`, borderLeft: i ? "1px solid #DDDAD3" : "0", borderBottom: "1px solid #DDDAD3" }}>
              <p style={{ margin: 0, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: 20, lineHeight: 1.25 }}>{s.q}</p>
              <p style={{ margin: "10px 0 0", fontSize: 11.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "#9A7646" }}>{s.to}</p>
            </div>
          ))}
        </div>
        <p style={{ margin: "20px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(20px,1.8vw,24px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
          Same business. Different symptom. <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.1em", color: "#9A7646" }}>Completely different fix.</em>
        </p>
      </section>

      {/* WORK */}
      <section id="work" className="max-md:!pt-20 max-md:[&_.grid-cols-2>div]:!text-center max-md:[&_.grid-cols-1>div]:!text-center max-sm:[&_.grid-cols-2>div]:!px-2 max-sm:[&_.grid-cols-2>div:nth-child(odd)]:!border-l-0 max-sm:[&_.grid-cols-2>div:nth-child(n+3)]:![border-top:1px_solid_rgba(128,128,128,.3)] max-sm:[&_.grid-cols-1>div]:!border-l-0 max-sm:[&_.grid-cols-1>div]:!px-0 max-sm:[&_.grid-cols-1>div+div]:![border-top:1px_solid_rgba(128,128,128,.3)] max-md:[&_p[style*='font-size:15.5px']]:!text-base" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <SectionHead eyebrow="Selected growth work" title={<>Growth work that<em style={{ display: "block", marginTop: 6, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.08em" }}>had to earn its place.</em></>} sub="Every number below comes from a real screenshot." />
        <div style={{ display: "flex", flexDirection: "column", gap: "clamp(56px,6vw,80px)" }}>
          {/* Blainy */}
          <article style={{ borderRadius: 28, background: "#111616", color: "#F2EFEA", padding: "clamp(24px,3.4vw,48px)" }}>
            <div style={{ display: "grid", gap: "24px 56px", alignItems: "start" }} className="md:!grid-cols-2">
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 12px", fontSize: 11.5, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#9C978D" }}>
                  <span>01</span>
                  <span style={{ width: 24, height: 1, background: "rgba(255,255,255,.2)" }} />
                  <span>AI SaaS · Multi-channel growth &amp; GTM</span>
                </div>
                <div style={{ marginTop: 20, height: 52, display: "flex", alignItems: "center" }}>
                  <span style={{ padding: "10px 14px", borderRadius: 12, background: "#F2EFEA", display: "inline-flex", alignItems: "center" }}>
                    <img loading="lazy" src="/assets/site/logo-blainy.png" alt="Blainy logo" style={{ display: "block", height: 40, width: "auto" }} />
                  </span>
                </div>
                <h3 style={{ margin: "20px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(28px,2.6vw,38px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.08 }}>
                  Zero to 85K+ users.
                  <br />
                  <strong style={{ fontWeight: 700 }}>No paid acquisition.</strong>
                </h3>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ padding: "14px 0", borderTop: "1px solid rgba(255,255,255,.14)" }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#D3AE82" }}>PROBLEM</div>
                  <p style={{ margin: "6px 0 0", fontSize: 15.5, lineHeight: 1.55, color: "#C9C4BA", maxWidth: 460 }}>Blainy needed users without an ad budget.</p>
                </div>
                <div style={{ padding: "14px 0", borderTop: "1px solid rgba(255,255,255,.14)" }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#D3AE82" }}>CONSTRAINT</div>
                  <p style={{ margin: "6px 0 0", fontSize: 15.5, lineHeight: 1.55, color: "#C9C4BA", maxWidth: 460 }}>No budget for paid acquisition meant every channel had to feed the others instead of competing for attention.</p>
                </div>
              </div>
            </div>
            <div style={{ margin: "28px 0 32px", display: "grid", borderTop: "1px solid rgba(255,255,255,.28)", borderBottom: "1px solid rgba(255,255,255,.14)" }} className="grid-cols-2 sm:!grid-cols-4">
              {[
                { v: "85K+", l: "users" },
                { v: "~30M", l: "search impressions" },
                { v: "3.9M+", l: "Instagram views, 90 days" },
                { v: "6,089", l: "tracked Reddit clicks, $0 on ads" },
              ].map((s, i) => (
                <div key={s.l} style={{ padding: `20px 16px 20px ${i ? 16 : 0}px`, borderLeft: i ? "1px solid rgba(255,255,255,.14)" : "0" }}>
                  <div style={{ fontFamily: "'General Sans'", fontSize: "clamp(28px,2.6vw,40px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{s.v}</div>
                  <div style={{ marginTop: 8, fontSize: 13.5, lineHeight: 1.4, color: "#B7B2A8" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 12px", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.14)", marginBottom: 14 }}>
              <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#D3AE82" }}>THE GROWTH ENGINE</span>
              <span style={{ fontSize: 12.5, color: "#9C978D" }}>Seven channels feeding one system</span>
            </div>
            <div style={{ display: "grid", gap: 16, alignItems: "center", marginBottom: 32 }} className="md:!grid-cols-[minmax(0,1.4fr)_auto_minmax(0,1fr)]">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["SEO", "Reddit", "Social", "Content", "Lifecycle", "Partnerships", "Retargeting"].map((t) => (
                  <LightPill key={t}>{t}</LightPill>
                ))}
              </div>
              <span aria-hidden="true" style={{ justifySelf: "center", fontSize: 22, color: "#D3AE82" }}>
                →
              </span>
              <div style={{ borderRadius: 16, border: "1px solid rgba(211,174,130,.5)", padding: "18px 20px" }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#D3AE82" }}>ONE GROWTH ENGINE</div>
                <div style={{ marginTop: 8, fontFamily: "'General Sans'", fontSize: "clamp(28px,2.6vw,36px)", fontWeight: 600, letterSpacing: "-0.035em" }}>85K+ users</div>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 12px", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.14)", marginBottom: 14 }}>
              <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#D3AE82" }}>SEARCH</span>
              <span style={{ fontSize: 12.5, color: "#9C978D" }}>Google Search Console</span>
            </div>
            <div style={{ borderRadius: 14, overflow: "hidden", background: "#fff", border: "1px solid rgba(128,128,128,.22)" }}>
              <img loading="lazy" src="/assets/site/blainy-gsc-full.jpg" alt="Blainy Google Search Console: 297K clicks, 25.3M impressions" style={{ display: "block", width: "100%" }} />
            </div>
            <div style={{ marginTop: 28, display: "grid", gap: "28px 20px", alignItems: "start" }} className="sm:!grid-cols-2">
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 12px", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.14)", marginBottom: 14 }}>
                  <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#D3AE82" }}>INSTAGRAM</span>
                  <span style={{ fontSize: 12.5, color: "#9C978D" }}>3.9M+ views · last 90 days</span>
                </div>
                <div style={{ borderRadius: 14, overflow: "hidden", background: "#fff", border: "1px solid rgba(128,128,128,.22)" }}>
                  <img loading="lazy" src="/assets/pages/growth-strategy/07-results-blainy__instagram-90-days.png" alt="Blainy Instagram, last 90 days: 3,952,443 views, 2,139,992 accounts reached" style={{ display: "block", width: "100%" }} />
                </div>
                <div style={{ borderRadius: 14, overflow: "hidden", background: "#fff", border: "1px solid rgba(128,128,128,.22)" }}>
                  <img loading="lazy" src="/assets/pages/growth-strategy/07-results-blainy__instagram-top-reels.png" alt="Blainy Instagram top reels: 53.9K, 24.9K, 21.8K views" style={{ display: "block", width: "100%" }} />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 12px", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.14)", marginBottom: 14 }}>
                  <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#D3AE82" }}>THREADS</span>
                  <span style={{ fontSize: 12.5, color: "#9C978D" }}>338K views</span>
                </div>
                <div style={{ borderRadius: 14, overflow: "hidden", background: "#fff", border: "1px solid rgba(128,128,128,.22)" }}>
                  <img loading="lazy" src="/assets/pages/growth-strategy/07-results-blainy__threads-338k-views.png" alt="Blainy Threads insights: 338K views, 11.9K interactions" style={{ display: "block", width: "100%" }} />
                </div>
                <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#9C978D", marginTop: 6 }}>ONE OF THE POSTS</div>
                <div style={{ borderRadius: 14, overflow: "hidden", background: "#fff", border: "1px solid rgba(128,128,128,.22)" }}>
                  <img loading="lazy" src="/assets/pages/growth-strategy/07-results-blainy__threads-post.png" alt="Blainy Threads post, PhD student survival guide: 306 likes, 21 reposts" style={{ display: "block", width: "100%" }} />
                </div>
              </div>
            </div>
            <div style={{ marginTop: 28 }}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 12px", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.14)", marginBottom: 14 }}>
                <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#D3AE82" }}>PINTEREST</span>
                <span style={{ fontSize: 12.5, color: "#9C978D" }}>479K impressions · last 90 days</span>
              </div>
              <div style={{ display: "grid", gap: 14 }} className="sm:!grid-cols-2">
                <div style={{ borderRadius: 14, overflow: "hidden", background: "#fff", border: "1px solid rgba(128,128,128,.22)" }}>
                  <img loading="lazy" src="/assets/pages/growth-strategy/07-results-blainy__pinterest-90-days.png" alt="Blainy Pinterest, last 90 days: 479k impressions, up 410%" style={{ display: "block", width: "100%" }} />
                </div>
                <div style={{ borderRadius: 14, overflow: "hidden", background: "#fff", border: "1px solid rgba(128,128,128,.22)" }}>
                  <img loading="lazy" src="/assets/pages/growth-strategy/07-results-blainy__pinterest-top-pin.png" alt="Blainy top Pinterest video pin: 225.75k impressions, 8.41k pin clicks" style={{ display: "block", width: "100%" }} />
                </div>
              </div>
            </div>
          </article>

          {/* Everdry */}
          <article style={{ borderRadius: 28, background: "#F4EFE8", border: "1px solid #E2D8CA", padding: "clamp(24px,3.4vw,48px)" }}>
            <div style={{ display: "grid", gap: "24px 56px", alignItems: "start" }} className="md:!grid-cols-2">
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 12px", fontSize: 11.5, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#6A5C4B" }}>
                  <span>02</span>
                  <span style={{ width: 24, height: 1, background: "#DDD5C8" }} />
                  <span>Home services · Local growth</span>
                </div>
                <div style={{ marginTop: 20, height: 52, display: "flex", alignItems: "center" }}>
                  <img loading="lazy" src="/assets/v8/logo-everdry.gif" alt="Everdry Waterproofing logo" style={{ display: "block", height: 52, width: "auto", mixBlendMode: "multiply" }} />
                </div>
                <h3 style={{ margin: "20px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(28px,2.6vw,38px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.08 }}>
                  A local service business
                  <br />
                  that needed <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.1em" }}>calls, not likes.</em>
                </h3>
              </div>
              <div style={{ minWidth: 0 }}>
                <div style={{ padding: "14px 0", borderTop: "1px solid #DDD5C8" }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#9A7646" }}>PROBLEM</div>
                  <p style={{ margin: "6px 0 0", fontSize: 15.5, lineHeight: 1.55, color: "#4E4C48", maxWidth: 460 }}>Social pages weren&apos;t reaching enough people and local visibility needed improvement.</p>
                </div>
                <div style={{ padding: "14px 0", borderTop: "1px solid #DDD5C8" }}>
                  <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#9A7646" }}>WHAT CHANGED</div>
                  <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["Local visual content", "Community distribution", "Facebook growth", "Google Business Profile"].map((t) => (
                      <Pill key={t}>{t}</Pill>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ margin: "28px 0 32px", display: "grid", borderTop: "1px solid #1C1C1C", borderBottom: "1px solid #DDD5C8" }} className="grid-cols-1 sm:!grid-cols-3">
              {[
                { v: "160,235", l: "Facebook views, 28 days" },
                { v: "12,462", l: "Business Profile views" },
                { v: "603", l: "calls from the Business Profile" },
              ].map((s, i) => (
                <div key={s.l} style={{ padding: `20px 16px 20px ${i ? 16 : 0}px`, borderLeft: i ? "1px solid #DDD5C8" : "0" }}>
                  <div style={{ fontFamily: "'General Sans'", fontSize: "clamp(28px,2.6vw,40px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{s.v}</div>
                  <div style={{ marginTop: 8, fontSize: 13.5, lineHeight: 1.4, color: "#5A5854" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gap: "28px 20px", alignItems: "start" }} className="sm:!grid-cols-2">
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 12px", paddingTop: 16, borderTop: "1px solid #DDD5C8", marginBottom: 14 }}>
                  <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#9A7646" }}>FACEBOOK</span>
                  <span style={{ fontSize: 12.5, color: "#8B877F" }}>Last 28 days</span>
                </div>
                <div style={{ borderRadius: 14, overflow: "hidden", background: "#fff", border: "1px solid rgba(128,128,128,.22)" }}>
                  <img loading="lazy" src="/assets/pages/growth-strategy/07-results-everdry__facebook-160k-views.png" alt="Everdry Facebook dashboard, last 28 days: 160,235 views" style={{ display: "block", width: "100%" }} />
                </div>
                <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#8B877F", marginTop: 6 }}>THE CONTENT BEHIND IT</div>
                <div style={{ borderRadius: 14, overflow: "hidden", background: "#fff", border: "1px solid rgba(128,128,128,.22)" }}>
                  <img loading="lazy" src="/assets/pages/growth-strategy/07-results-everdry__post-graphics-grid.png" alt="Grid of Everdry post graphics: client feedback, education and service posts" style={{ display: "block", width: "100%" }} />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 12px", paddingTop: 16, borderTop: "1px solid #DDD5C8", marginBottom: 14 }}>
                  <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#9A7646" }}>GOOGLE BUSINESS PROFILE</span>
                  <span style={{ fontSize: 12.5, color: "#8B877F" }}>Visibility and calls</span>
                </div>
                <div style={{ borderRadius: 14, overflow: "hidden", background: "#fff", border: "1px solid rgba(128,128,128,.22)" }}>
                  <img loading="lazy" src="/assets/v7/everdry-gbp.png" alt="Everdry Google Business Profile: 12,462 profile views" style={{ display: "block", width: "100%" }} />
                </div>
                <div style={{ borderRadius: 14, overflow: "hidden", background: "#fff", border: "1px solid rgba(128,128,128,.22)" }}>
                  <img loading="lazy" src="/assets/pages/growth-strategy/07-results-everdry__603-calls.png" alt="Everdry: 603 calls from the Business Profile" style={{ display: "block", width: "100%" }} />
                </div>
              </div>
            </div>
          </article>

          {/* Virtarix */}
          <article style={{ borderRadius: 28, background: "#15171F", color: "#F2EFEA", padding: "clamp(24px,3.4vw,48px)" }}>
            <div style={{ display: "grid", gap: "24px 56px", alignItems: "start" }} className="md:!grid-cols-2">
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 12px", fontSize: 11.5, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#9C978D" }}>
                  <span>03</span>
                  <span style={{ width: 24, height: 1, background: "rgba(255,255,255,.2)" }} />
                  <span>AI / Tech · Content · Reddit · Pinterest</span>
                </div>
                <div style={{ marginTop: 20, height: 52, display: "flex", alignItems: "center" }}>
                  <span style={{ padding: "10px 14px", borderRadius: 12, background: "#F2EFEA", display: "inline-flex", alignItems: "center" }}>
                    <img loading="lazy" src="/assets/v8/logos/virtarix.png" alt="Virtarix logo" style={{ display: "block", height: 30, width: "auto" }} />
                  </span>
                </div>
                <h3 style={{ margin: "20px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(28px,2.6vw,38px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.08 }}>
                  Technical expertise.
                  <br />
                  <strong style={{ fontWeight: 700 }}>Almost no distribution.</strong>
                </h3>
              </div>
              <div style={{ minWidth: 0, padding: "14px 0", borderTop: "1px solid rgba(255,255,255,.14)" }}>
                <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#D3AE82" }}>WHAT CHANGED</div>
                <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Technical guides", "Visual social content", "Pinterest from zero", "Reddit community work"].map((t) => (
                    <LightPill key={t}>{t}</LightPill>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ margin: "28px 0 32px", display: "grid", borderTop: "1px solid rgba(255,255,255,.28)", borderBottom: "1px solid rgba(255,255,255,.14)" }} className="grid-cols-1 sm:!grid-cols-3">
              {[
                { v: "71,459", l: "Facebook views, 4 Oct to 23 Jan" },
                { v: "1.2K+", l: "monthly Pinterest visits, from zero" },
                { v: "34K", l: "Facebook views in December" },
              ].map((s, i) => (
                <div key={s.l} style={{ padding: `20px 16px 20px ${i ? 16 : 0}px`, borderLeft: i ? "1px solid rgba(255,255,255,.14)" : "0" }}>
                  <div style={{ fontFamily: "'General Sans'", fontSize: "clamp(28px,2.6vw,40px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{s.v}</div>
                  <div style={{ marginTop: 8, fontSize: 13.5, lineHeight: 1.4, color: "#B7B2A8" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gap: "28px 20px", alignItems: "start" }} className="sm:!grid-cols-2">
              <div>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 12px", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.14)", marginBottom: 14 }}>
                  <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#D3AE82" }}>FACEBOOK</span>
                  <span style={{ fontSize: 12.5, color: "#9C978D" }}>4 Oct to 23 Jan</span>
                </div>
                <div style={{ borderRadius: 14, overflow: "hidden", background: "#242526", border: "1px solid rgba(128,128,128,.22)" }}>
                  <img loading="lazy" src="/assets/v8/vx-70k.png" alt="Virtarix Facebook insights, 4 Oct to 23 Jan: 71,459 views, 3,395 interactions" style={{ display: "block", width: "100%" }} />
                </div>
              </div>
              <div>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 12px", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.14)", marginBottom: 14 }}>
                  <span style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".12em", color: "#D3AE82" }}>REDDIT &amp; AI DISCOVERY</span>
                  <span style={{ fontSize: 12.5, color: "#9C978D" }}>Reddit Answers recommending Virtarix</span>
                </div>
                <div style={{ borderRadius: 14, overflow: "hidden", background: "#fff", border: "1px solid rgba(128,128,128,.22)" }}>
                  <img loading="lazy" src="/assets/v7/virtarix-reddit-good.jpg" alt="Reddit Answers for 'good vps' listing Virtarix" style={{ display: "block", width: "100%" }} />
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* LEAVE WITH */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <SectionHead eyebrow="Deliverables" title={<>Strategy you can<em style={{ display: "block", marginTop: 6, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.08em" }}>actually use.</em></>} sub="Not a 60-slide deck. A plan with an order to it." />
        <div style={{ display: "grid", borderTop: "1px solid #1C1C1C" }} className="grid-cols-1 sm:!grid-cols-3">
          {LEAVE_WITH.map((c, i) => (
            <div key={c.n} className="max-sm:!border-l-0 max-sm:!px-0" style={{ minWidth: 0, padding: `28px ${i ? 24 : 0}px 32px ${i ? 24 : 0}px`, borderLeft: i ? "1px solid #DDDAD3" : "0", borderBottom: "1px solid #DDDAD3" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#9A7646" }}>{c.n}</span>
              <h3 style={{ margin: "10px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(24px,2.2vw,30px)", fontWeight: 600, letterSpacing: "-0.025em" }}>{c.t}</h3>
              <ul style={{ margin: "20px 0 0", padding: 0, listStyle: "none" }}>
                {c.items.map((it) => (
                  <li key={it} style={{ display: "flex", gap: 12, padding: "11px 0", borderTop: "1px solid #E6E1D8", fontSize: 16, lineHeight: 1.45 }}>
                    <span style={{ width: 5, height: 5, marginTop: ".55em", borderRadius: "50%", background: "#C4A47C", flex: "0 0 auto" }} />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 30 60 90 */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <SectionHead eyebrow="Roadmap" title={<>What the first 90 days<em style={{ display: "block", marginTop: 6, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.08em" }}>usually look like.</em></>} sub="" />
        <div style={{ display: "grid", gap: 20 }} className="grid-cols-1 sm:!grid-cols-3">
          {ROADMAP.map((r) => (
            <div key={r.range} style={{ minWidth: 0, borderRadius: 22, background: r.dark ? "#171717" : "#FBFBF9", color: r.dark ? "#F2EFEA" : "#1C1C1C", border: `1px solid ${r.dark ? "#171717" : "#E2DFD8"}`, padding: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: r.dark ? "#D3AE82" : "#1C1C1C" }} />
                <span style={{ flex: 1, height: 1.5, background: r.dark ? "rgba(211,174,130,.5)" : "#DDD5C8" }} />
                <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", color: "#9A7646" }}>{r.range}</span>
              </div>
              <h3 style={{ margin: "20px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(22px,2vw,28px)", fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.15 }}>{r.t}</h3>
              <ul style={{ margin: "18px 0 0", padding: 0, listStyle: "none" }}>
                {r.items.map((it) => (
                  <li key={it} style={{ padding: "10px 0", borderTop: `1px solid ${r.dark ? "rgba(255,255,255,.14)" : "#E6E1D8"}`, fontSize: 15.5, lineHeight: 1.45, color: r.dark ? "#C9C4BA" : "#4E4C48" }} className="max-md:!text-base">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* PRIORITIZE */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <div style={{ display: "grid", gap: "20px 64px", alignItems: "end", marginBottom: 36 }} className="md:!grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] max-md:!text-center">
          <div>
            <Eyebrow>How I prioritize</Eyebrow>
            <h2 style={{ margin: "16px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(38px,3.6vw,52px)", lineHeight: 1.02, letterSpacing: "-0.035em" }}>
              Fix now. Test next.
              <em style={{ display: "block", marginTop: 6, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.08em" }}>Ignore for now.</em>
            </h2>
          </div>
          <div style={{ paddingBottom: 4 }}>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "#4E4C48" }}>Every idea gets three questions.</p>
            <div className="max-md:!justify-center" style={{ marginTop: 14, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px 14px", fontFamily: "'General Sans'", fontSize: 19, fontWeight: 600 }}>
              {["Impact", "Confidence", "Effort"].map((t, i) => (
                <span key={t} style={{ display: "inline-flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ fontFamily: "'Geist','Inter'", fontSize: 11.5, color: "#9A7646" }}>{String(i + 1).padStart(2, "0")}</span>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: "grid", borderTop: "1px solid #1C1C1C" }} className="grid-cols-1 sm:!grid-cols-3">
          {PRIORITIZE.map((c, i) => (
            <div key={c.n} className="max-sm:!border-l-0 max-sm:!px-0" style={{ minWidth: 0, padding: `28px ${i ? 24 : 0}px 30px ${i ? 24 : 0}px`, borderLeft: i ? "1px solid #DDDAD3" : "0", borderBottom: "1px solid #DDDAD3" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, fontWeight: 700, letterSpacing: ".12em", color: c.dim ? "#A09B91" : "#9A7646" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: i === 0 ? "#1C1C1C" : i === 1 ? "#C4A47C" : "transparent", border: c.dim ? "1.5px solid #CFCBC2" : "1.5px solid transparent" }} />
                {c.n}
              </div>
              <h3 style={{ margin: "14px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(26px,2.4vw,34px)", fontWeight: 600, letterSpacing: "-0.03em", color: c.dim ? "#77746E" : "#1C1C1C" }}>{c.t}</h3>
              <ul style={{ margin: "18px 0 0", padding: 0, listStyle: "none" }}>
                {c.items.map((it) => (
                  <li key={it} style={{ padding: "10px 0", borderTop: "1px solid #E6E1D8", fontSize: 16, lineHeight: 1.45, color: c.dim ? "#77746E" : "#4E4C48" }}>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <Eyebrow>Process</Eyebrow>
        <h2 className="max-md:!text-center max-md:!text-balance" style={{ margin: "16px 0 24px", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(38px,3.6vw,52px)", lineHeight: 1.02, letterSpacing: "-0.035em" }}>
          Five steps.
          <em style={{ display: "block", marginTop: 6, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.08em" }}>No strategy that dies in a folder.</em>
        </h2>
        <div style={{ display: "grid", gap: "32px 56px", alignItems: "center" }} className="md:!grid-cols-2">
          <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column" }}>
            {PROCESS_STEPS.map((s, i) => (
              <li key={s.n} style={{ minWidth: 0, display: "grid", gridTemplateColumns: "44px minmax(0,1fr)", gap: "2px 12px", padding: "18px 0", borderTop: `1px solid ${i === PROCESS_STEPS.length - 1 ? "#C4A47C" : "#1C1C1C"}` }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#9A7646" }}>{s.n}</span>
                <h3 style={{ margin: 0, fontFamily: "'General Sans'", fontSize: "clamp(21px,1.9vw,25px)", fontWeight: 600, letterSpacing: "-0.02em" }}>{s.t}</h3>
                <p className="max-md:!text-base" style={{ gridColumn: 2, margin: "4px 0 0", fontSize: 15.5, lineHeight: 1.5, color: "#4E4C48" }}>{s.d}</p>
              </li>
            ))}
          </ol>
          <img loading="lazy" src="/assets/pages/growth-strategy/11-process__mountain-path-five-stops.png" alt="Illustration: a mountain path with five stops, strategy, plan, channels, audience and growth, up to a flag" style={{ display: "block", width: "100%", height: "auto" }} />
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="max-md:!pt-12" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <SectionHead eyebrow="Pricing" title={<>Start with the diagnosis.<em style={{ display: "block", marginTop: 6, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.08em" }}>Then decide.</em></>} sub="Most clients begin with the audit. You leave knowing what is wrong and what to do next, whether or not we keep working together." />
        <div style={{ borderRadius: 28, background: "#FBFBF9", border: "1px solid #D9CBB6", padding: "clamp(24px,3.4vw,48px)" }}>
          <div style={{ display: "grid", gap: "32px 56px", alignItems: "start" }} className="md:!grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
            <div className="max-md:!text-center">
              <div className="max-md:!justify-center" style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, fontWeight: 700, letterSpacing: ".12em", color: "#9A7646" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C4A47C" }} />
                01 · DIAGNOSE · THE FIRST STEP
              </div>
              <h3 style={{ margin: "14px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(32px,3.2vw,44px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1.05 }}>Growth audit</h3>
              <p className="max-md:!mx-auto" style={{ margin: "14px 0 0", fontSize: 17, lineHeight: 1.6, color: "#4E4C48", maxWidth: 520 }}>
                Not a list of marketing ideas. I review your business as it exists today, the whole growth system, and find what is actually holding it back.
              </p>
              <div style={{ marginTop: 24, fontSize: 12, fontWeight: 700, letterSpacing: ".12em" }}>WHAT I REVIEW</div>
              <ul style={{ margin: "10px 0 0", padding: 0, listStyle: "none", display: "grid", gap: "0 28px", borderTop: "1px solid #E6E1D8" }} className="sm:!grid-cols-2 max-md:!text-left">
                {AUDIT_REVIEW.map((it) => (
                  <li key={it} className="max-md:!text-base" style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: "1px solid #E6E1D8", fontSize: 15, lineHeight: 1.4 }}>
                    <span style={{ width: 5, height: 5, marginTop: ".5em", borderRadius: "50%", background: "#C4A47C", flex: "0 0 auto" }} />
                    {it}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 24, fontSize: 12, fontWeight: 700, letterSpacing: ".12em" }}>WHAT YOU RECEIVE</div>
              <ul style={{ margin: "10px 0 0", padding: 0, listStyle: "none", display: "grid", gap: "0 28px", borderTop: "1px solid #E6E1D8" }} className="sm:!grid-cols-2 max-md:!text-left">
                {AUDIT_RECEIVE.map((it) => (
                  <li key={it} className="max-md:!text-base" style={{ display: "flex", gap: 10, padding: "10px 0", borderBottom: "1px solid #E6E1D8", fontSize: 15, lineHeight: 1.4, fontWeight: 500 }}>
                    <span style={{ fontSize: 12, color: "#9A7646" }}>✓</span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }} className="md:!pl-14 md:!border-l md:!border-[#D9CBB6] max-md:!text-center">
              <div>
                <span style={{ fontFamily: "'General Sans'", fontSize: "clamp(56px,5.6vw,76px)", fontWeight: 600, letterSpacing: "-0.045em", lineHeight: 1 }}>$499</span>
                <span style={{ marginLeft: 10, fontSize: 15, color: "#77746E" }}>one time</span>
              </div>
              <a href="#contact" className="max-md:!flex max-md:!w-full max-md:!max-w-[400px] max-md:!justify-center max-md:!self-center max-md:!mx-auto" style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 12, height: 56, padding: "0 26px", borderRadius: 12, background: "#1C1C1C", color: "#F8F6F4", fontSize: 16, fontWeight: 600 }}>
                Start the growth audit
                <ArrowIcon />
              </a>
              <div style={{ marginTop: 8, fontSize: 12, fontWeight: 700, letterSpacing: ".12em" }}>YOU LEAVE KNOWING</div>
              <div className="max-md:!justify-center" style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["What's wrong", "What matters", "What to fix first", "What to do next"].map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 20, borderRadius: 24, background: "#171717", color: "#F2EFEA", padding: "clamp(28px,3.4vw,44px)", display: "grid", gap: "28px 48px", alignItems: "center" }} className="sm:!grid-cols-2 max-sm:!text-center">
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".12em", color: "#D3AE82" }}>02 · THEN EXECUTE · EVERYTHING, HANDLED</div>
            <div className="max-sm:!justify-center" style={{ marginTop: 12, display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontFamily: "'General Sans'", fontSize: "clamp(44px,4.4vw,60px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>$3,999</span>
              <span style={{ color: "#9C978D" }}>per month</span>
            </div>
            <p className="max-sm:!mx-auto" style={{ margin: "12px 0 0", color: "#C9C4BA", maxWidth: 460, lineHeight: 1.55 }}>Strategy plus execution across SEO, Reddit, social media, content and design.</p>
            <p style={{ margin: "8px 0 0", color: "#F2EFEA", fontWeight: 500 }}>One person. One plan. One invoice.</p>
          </div>
          <div className="sm:!pl-12 sm:!border-l sm:!border-[#33322F]">
            <h3 style={{ margin: 0, fontFamily: "'General Sans'", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>Running ads too?</h3>
            <p className="max-md:!text-base" style={{ margin: "8px 0 0", fontSize: 15, lineHeight: 1.55, color: "#B7B2A8" }}>Ads management can be added separately.</p>
            <a href="#contact" className="max-md:!flex max-md:!w-full max-md:!max-w-[400px] max-md:!justify-center max-md:!self-center max-md:!mx-auto" style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 12, height: 48, padding: "0 22px", borderRadius: 12, background: "#F2EFEA", color: "#171717", fontSize: 15, fontWeight: 600 }}>
              Tell me what&apos;s stuck
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>

      {/* FIT */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <div style={{ display: "grid", gap: "24px clamp(32px,5vw,80px)", alignItems: "start" }} className="md:!grid-cols-[minmax(0,0.34fr)_minmax(0,1fr)]">
          <div className="max-md:!text-center">
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#8B877F" }}>Who it&apos;s for</div>
            <h2 style={{ margin: "12px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(34px,3.2vw,46px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
              Growth strategy
              <br />
              works best when...
            </h2>
          </div>
          <div style={{ display: "grid", gap: "32px clamp(24px,3vw,48px)" }} className="sm:!grid-cols-2">
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
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0`, display: "grid", gap: "24px clamp(40px,5vw,80px)", alignItems: "start" }} className="md:!grid-cols-[minmax(0,0.58fr)_minmax(0,1fr)] max-md:!pt-20">
        <div className="max-md:!text-center">
          <Eyebrow>FAQ</Eyebrow>
          <h2 style={{ margin: "12px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(30px,3vw,42px)", lineHeight: 1.06, letterSpacing: "-0.03em" }}>
            Growth questions,
            <br />
            <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.1em" }}>answered straight.</em>
          </h2>
          <div className="max-md:!mx-auto" style={{ marginTop: 32, width: "100%", maxWidth: 420 }}>
            <img loading="lazy" src="/assets/pages/growth-strategy/14-faq__growth-questions.png" alt="Illustration: growth questions answered and checked off, on a path toward a target" style={{ display: "block", width: "100%", height: "auto" }} />
          </div>
        </div>
        <FAQAccordion faqs={FAQS} />
      </section>

      {/* CTA */}
      <section id="contact" className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} clamp(24px,3vw,40px)` }}>
        <div style={{ borderRadius: 28, background: "#1C1C1C", color: "#F2EFEA", padding: "clamp(48px,6vw,88px) clamp(24px,5vw,72px)", display: "grid", gap: "48px clamp(40px,5vw,80px)", alignItems: "center" }} className="md:!grid-cols-2">
          <div className="max-md:!text-center">
            <h2 className="max-md:!text-balance" style={{ margin: 0, fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(32px,3.4vw,48px)", lineHeight: 1.06, letterSpacing: "-0.035em" }}>Not sure what&apos;s holding growth back?</h2>
            <p style={{ margin: "14px 0 0", fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "clamp(28px,2.6vw,36px)", lineHeight: 1.1, color: "#D3AE82" }}>
              <Emphasis>That&apos;s exactly where I start.</Emphasis>
            </p>
            <p className="max-md:!mx-auto" style={{ margin: "22px 0 0", maxWidth: 480, fontSize: 17, lineHeight: 1.6, color: "#B7B2A8" }}>
              Tell me what you&apos;re growing, what&apos;s happening now and what you&apos;ve already tried. I&apos;ll look at the system and tell you where I&apos;d start first.
            </p>
          </div>
          <div className="max-md:!mx-auto max-md:!w-full max-md:!max-w-[400px]" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <a href="#pricing" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, height: 64, padding: "0 24px", borderRadius: 12, background: "#F2EFEA", color: "#1C1C1C", fontSize: 17, fontWeight: 600 }}>
              Start with the $499 audit
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
        <h2 className="max-md:!text-center" style={{ margin: "0 0 20px", fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#8B877F" }}>Where the strategy gets executed</h2>
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
