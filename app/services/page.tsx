import { buildMetadata } from "@/lib/seo";
import Link from "next/link";
import { ArrowIcon, Squiggle } from "../HomeComponents/icons";
import { FAQAccordion } from "../HomeComponents/FAQAccordion";

export const metadata = buildMetadata({
  title: "Growth Marketing Services for SaaS | Clear Prices | Zain",
  description:
    "Growth marketing services for SaaS and service businesses: SEO, Reddit, social, content, ads and strategy. Clear monthly prices, no long contracts.",
  path: "/services",
});

const MAX = 1280;
const PAD = "clamp(20px,2.5vw,32px)";
const SEC_PAD = `clamp(88px,8vw,112px) ${PAD} 0`;

const EYEBROW = { fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase" } as const;
const SERIF = { fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em" } as const;
const H2 = { margin: "12px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(34px,3.4vw,50px)", lineHeight: 1.04, letterSpacing: "-0.035em", textWrap: "balance" } as const;
const TEXT_LINK = "transition-colors hover:!text-[#9A7646]";

const PROOF = [
  { v: "100K+", l: "Users brought in" },
  { v: "50M+", l: "Search impressions" },
  { v: "160K+", l: "Facebook views in 28 days" },
  { v: "Thousands", l: "Reddit conversions with $0 ad spend" },
];

const SERVICES = [
  {
    n: "01",
    tag: "Growth Strategy & GTM",
    t: "Find the bottleneck before adding another channel.",
    d: "Your traffic, offer, positioning, conversion, activation and retention all affect growth. I look at the whole system, find what is actually slowing it down, and put the fixes in the right order.",
    best: "You’re already doing marketing, but you can’t confidently say what should happen next.",
    tags: ["Positioning", "Offer", "Acquisition", "Conversion", "Activation", "Retention", "Prioritization", "30 / 60 / 90 planning"],
    img: "/assets/pages/growth-strategy/01-hero__growth-system.png",
    alt: "Illustration: strategy, content, audience, channels, offer and results all connected to one growth system",
    href: "/services/saas-growth-consultant",
    cta: "Explore Growth Strategy & GTM",
  },
  {
    n: "02",
    tag: "SEO & Organic Growth",
    t: "Get found by people already looking for what you sell.",
    d: "Search strategy, technical fixes, original content, authority and AI search visibility, built around searches that can actually become customers. Not traffic for the screenshot. Traffic with somewhere useful to go.",
    best: "People already search for your product, service or problem, but they’re finding somebody else.",
    tags: ["Search strategy", "Technical SEO", "Content", "On-page SEO", "Authority", "GEO / AI visibility", "Reporting"],
    img: "/assets/pages/seo/01-hero__search-queries-to-top-result.png",
    alt: "Illustration: search queries leading to a top-ranked page, which feeds traffic, audience growth and sales",
    href: "/services/freelance-seo-expert-for-saas",
    cta: "Explore SEO",
  },
  {
    n: "03",
    tag: "Reddit Marketing",
    t: "Show up where buyers already ask for recommendations.",
    d: "Research the right communities, understand how people actually talk there, and build useful posts and conversations around that. No “drop the link and run” strategy.",
    best: "Your buyers research products, compare options, ask questions or complain about problems on Reddit.",
    tags: ["Community research", "Account strategy", "Posts", "Comments", "Distribution", "Monitoring", "Reddit SEO", "AI visibility"],
    img: "/assets/pages/reddit/01-hero__threads-to-engaged-users.png",
    alt: "Reddit threads flowing through search into engaged users",
    href: "/services/reddit-marketing-for-saas",
    cta: "Explore Reddit Marketing",
  },
  {
    n: "04",
    tag: "Social Media Management",
    t: "Stop filling a content calendar. Start getting seen.",
    d: "Strategy, graphics, content, publishing and community work built around attention that can turn into visits, searches and customers. Posting five times a week is not the strategy.",
    best: "You’re publishing consistently but it feels like nobody would notice if you stopped tomorrow.",
    tags: ["Strategy", "Content planning", "Copy", "Graphics", "Publishing", "Community", "Testing", "Reporting"],
    img: "/assets/pages/social/01-hero__calendar-to-posts.png",
    alt: "Illustration: a content calendar turning into posts published across Instagram, TikTok, LinkedIn, YouTube, X, Pinterest and Threads, feeding a growth dashboard",
    href: "/services/hire-a-social-media-manager",
    cta: "Explore Social Media",
  },
  {
    n: "05",
    tag: "Google & Meta Ads",
    t: "Buy attention only when the funnel can do something with it.",
    d: "I handle tracking, campaign structure, targeting, creative, landing-page review and optimization. Google catches people searching. Meta gets in front of the people who aren’t searching yet.",
    best: "Your offer already works and you want a measurable way to bring more qualified people into the funnel.",
    tags: ["Tracking", "Google Ads", "Meta Ads", "Campaign setup", "Audience research", "Keyword research", "Creative", "Landing-page review", "Weekly optimization"],
    img: "/assets/pages/ads/01-hero__ad-spend-leaking-funnel.png",
    alt: "Illustration: ad spend poured into a leaking pipe, losing coins at targeting, offer, landing page, tracking and funnel before reaching customers",
    href: "/services/google-and-meta-ads-specialist",
    cta: "Explore Google & Meta Ads",
  },
  {
    n: "06",
    tag: "Content & Design",
    t: "The words and visuals should probably know each other.",
    d: "Articles, landing-page copy, social content and graphics made as one system instead of being passed between a writer, strategist and designer who never speak.",
    best: "You know what you want to say, but everything coming out of the business feels disconnected.",
    tags: ["Articles", "SEO content", "Copywriting", "Social content", "Graphics", "Campaign creatives", "Content repurposing", "Visual direction"],
    img: "/assets/pages/content/01-hero__words-and-visuals.png",
    alt: "Illustration: ideas, a content calendar, articles, graphics and scheduled posts working as one content system",
    // No Content & Design page yet, so this card goes to the contact page.
    href: "/contact",
    cta: "Ask about Content & Design",
  },
];

const SYSTEM = [
  "Strategy decides what deserves attention.",
  "Content gives you something worth finding.",
  "SEO captures search.",
  "Reddit captures conversations.",
  "Social builds attention.",
  "Paid speeds up what already proves itself.",
];

const CHAIN = ["Strategy", "Content", "Distribution", "Conversion", "Growth"];
const DISTRIBUTION = ["SEO", "Reddit", "Social", "Paid"];

const STEPS = [
  { n: "01", t: "Diagnose", d: "Find where growth is leaking." },
  { n: "02", t: "Prioritize", d: "Pick what matters. Ignore the rest." },
  { n: "03", t: "Execute", d: "I do the work, not just point at it." },
  { n: "04", t: "Learn", d: "Keep what works. Cut what doesn’t. Repeat." },
];

const CASES = [
  { href: "/case-studies/blainy", logo: "/assets/site/logo-blainy.png", alt: "Blainy", stats: [["85K+", "users"], ["~30M", "search impressions"], ["Thousands", "Reddit-driven conversions"]] },
  { href: "/case-studies/everdry", logo: "/assets/v8/logo-everdry.gif", alt: "Everdry Waterproofing", stats: [["160K+", "Facebook views in 28 days"], ["12,462", "Business Profile views/interactions"], ["603", "calls from Business Profile"]] },
  { href: "/case-studies/virtarix", logo: "/assets/v8/logos/virtarix.png", alt: "Virtarix", stats: [["70K+", "Facebook views"], ["Reddit", "visibility"], ["Community", "+ content distribution"]] },
  { href: "/#case-loompad", logo: "/assets/v8/logos/loompad.png", alt: "LoomPad", stats: [["93", "orders"], ["$3,401", "sales"], ["10,777", "shop views"]] },
];

const FAQS: [string, string[]][] = [
  ["I don’t know which service I need. What should I choose?", ["You don’t need to know. Tell me what’s happening and what you’ve already tried. I’ll tell you where I’d start."]],
  ["Can I hire you for only one service?", ["Yes. SEO can be SEO. Reddit can be Reddit. Social can be social. You don’t need to buy the whole system just because it exists."]],
  ["Can you handle multiple channels together?", ["Yes. That’s usually where I’m most useful. The channels work better when one strategy decides what each one is supposed to do."]],
  ["Do I need a long contract?", ["No. I’d rather keep the work because it is useful than because a contract makes leaving annoying."]],
  ["What if I only need a one-time project?", ["That works too. The Growth Audit and SEO audit are designed as one-time starting points, and content/design projects can also be scoped separately."]],
  ["How quickly do you reply?", ["Usually within a couple of hours."]],
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(([q, paras]) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: paras.join(" ") },
  })),
};

function SectionHead({ eyebrow, title, accent, sub }: { eyebrow: string; title: string; accent: string; sub?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", margin: "0 auto 44px", maxWidth: 900 }}>
      <div style={{ ...EYEBROW, color: "#8B877F" }}>{eyebrow}</div>
      <h2 style={H2}>
        {title}
        <em style={{ ...SERIF, display: "block", marginTop: 6, fontSize: "1.08em", lineHeight: 1.05, color: "#1C1C1C" }}>{accent}</em>
      </h2>
      {sub && <p style={{ margin: "20px auto 0", maxWidth: 640, fontSize: 17, lineHeight: 1.6, color: "#5A5854", textWrap: "pretty" }}>{sub}</p>}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <main id="top" style={{ overflowX: "clip" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* HERO */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(48px,5.4vw,72px) ${PAD} 0`, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <div style={{ ...EYEBROW, display: "flex", alignItems: "center", gap: 10, color: "#5A5854" }}>
          <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: "50%", background: "#C4A47C" }} />
          Services
        </div>
        <h1 style={{ margin: "18px auto 0", maxWidth: 980, fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(42px,5.2vw,76px)", lineHeight: 1.02, letterSpacing: "-0.04em", textWrap: "balance" }}>
          Growth marketing services for SaaS and service businesses
        </h1>
        <p style={{ margin: "28px auto 0", maxWidth: 680, fontSize: 18, lineHeight: 1.6, color: "#4E4C48", textWrap: "pretty" }}>
          Growth marketing services for SaaS work better when one person runs them together, so pick one channel or hand me all of it. Five services, all handled by me. If you already know what you need, jump straight in. If you don&apos;t, that&apos;s kind of my thing.
        </p>
        <div className="max-md:!w-full max-md:!max-w-[400px] max-md:!flex-col" style={{ marginTop: 32, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
          <Link href="/contact" className="max-md:!justify-center transition-colors hover:!bg-[#33322F]" style={{ display: "inline-flex", alignItems: "center", gap: 12, height: 56, padding: "0 26px", borderRadius: 12, background: "#1C1C1C", color: "#F8F6F4", fontSize: 16, fontWeight: 600 }}>
            Tell me what’s stuck
            <ArrowIcon />
          </Link>
          <a href="#all-services" className="max-md:!justify-center transition-colors hover:!bg-[#1C1C1C] hover:!text-[#F8F6F4]" style={{ display: "inline-flex", alignItems: "center", gap: 10, height: 56, padding: "0 24px", borderRadius: 12, border: "1px solid #1C1C1C", color: "#1C1C1C", fontSize: 16, fontWeight: 600 }}>
            See all services ↓
          </a>
        </div>
        <p style={{ margin: "16px 0 0", fontSize: 13.5, color: "#77746E" }}>One person. Fewer handoffs. Much less “who was handling this?”</p>
      </section>

      {/* PROOF */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(56px,6vw,80px) ${PAD} 0` }}>
        <div className="max-[760px]:!grid-cols-2" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", borderTop: "1px solid #1C1C1C", borderBottom: "1px solid #DDDAD3" }}>
          {PROOF.map((p, i) => (
            <div key={p.v} className={i === 2 ? "max-[760px]:!border-l-0" : undefined} style={{ padding: "28px 16px", textAlign: "center", borderLeft: i === 0 ? "none" : "1px solid #DDDAD3" }}>
              <div style={{ fontFamily: "'General Sans'", fontSize: "clamp(34px,3.4vw,48px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{p.v}</div>
              <div style={{ marginTop: 10, fontSize: 14, lineHeight: 1.4, color: "#5A5854" }}>{p.l}</div>
            </div>
          ))}
        </div>
        <p style={{ margin: "18px 0 0", textAlign: "center", fontSize: 15, fontWeight: 500, color: "#1C1C1C" }}>Different channels. Same job: move something that matters.</p>
      </section>

      {/* SERVICES */}
      <section id="all-services" style={{ maxWidth: MAX, margin: "0 auto", padding: SEC_PAD, scrollMarginTop: 80 }}>
        <SectionHead
          eyebrow="What I can help with"
          title="Pick the problem."
          accent="Then we’ll pick the channel."
          sub="You don’t need six marketing strategies running at once. Start with the problem that is costing you the most."
        />
        <div className="max-[1080px]:!grid-cols-1" style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 20 }}>
          {SERVICES.map((s) => (
            <article key={s.n} style={{ display: "flex", flexDirection: "column", borderRadius: 28, background: "#F8F6F4", border: "1px solid #E2DFD8", overflow: "hidden" }}>
              <div style={{ aspectRatio: "16/10", background: "#F4F0E8", borderBottom: "1px solid #E2D8CA", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img loading="lazy" src={s.img} alt={s.alt} style={{ display: "block", width: "88%", height: "88%", objectFit: "contain", mixBlendMode: "multiply" }} />
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "clamp(24px,2.6vw,36px)" }}>
                <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 12 }}>
                  <span style={{ ...SERIF, fontSize: 30, lineHeight: 1, color: "#C4A47C" }}>{s.n}</span>
                  <span style={{ ...EYEBROW, fontSize: 11.5, color: "#5A5854" }}>{s.tag}</span>
                </div>
                <h3 style={{ margin: "14px 0 0", fontFamily: "'General Sans'", fontSize: "clamp(24px,2.1vw,30px)", fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.12, textWrap: "balance" }}>{s.t}</h3>
                <p style={{ margin: "14px 0 0", fontSize: 16, lineHeight: 1.6, color: "#4E4C48", textWrap: "pretty" }}>{s.d}</p>
                <div style={{ marginTop: 20, width: "100%", padding: "14px 18px", borderRadius: 12, background: "#EEEDE7", borderTop: "2px solid #C4A47C" }}>
                  <div style={{ ...EYEBROW, fontSize: 10.5, color: "#9A7646" }}>Best when</div>
                  <p style={{ margin: "6px 0 0", fontSize: 15, lineHeight: 1.5, color: "#1C1C1C" }}>{s.best}</p>
                </div>
                <div style={{ marginTop: 18, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6 }}>
                  {s.tags.map((t) => (
                    <span key={t} style={{ display: "inline-flex", alignItems: "center", height: 28, padding: "0 12px", borderRadius: 999, background: "#1C1C1C", color: "#F2EFEA", fontSize: 12.5, fontWeight: 500, whiteSpace: "nowrap" }}>{t}</span>
                  ))}
                </div>
                <Link href={s.href} className={TEXT_LINK} style={{ marginTop: "auto", paddingTop: 26, alignSelf: "center", display: "inline-flex", alignItems: "center", gap: 10, fontSize: 15, fontWeight: 600, color: "#1C1C1C" }}>
                  <span style={{ borderBottom: "1.5px solid currentColor", paddingBottom: 2 }}>{s.cta}</span>
                  <ArrowIcon />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ONE SYSTEM */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: SEC_PAD }}>
        <div style={{ borderRadius: 28, background: "#1C1C1C", color: "#F2EFEA", padding: "clamp(48px,6vw,80px) clamp(24px,4vw,64px)" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", margin: "0 auto 28px", maxWidth: 900 }}>
            <div style={{ ...EYEBROW, color: "#C4A47C" }}>One system</div>
            <h2 style={H2}>
              Different channels.
              <em style={{ ...SERIF, display: "block", marginTop: 6, fontSize: "1.08em", lineHeight: 1.05, color: "#D3AE82" }}>Same growth problem.</em>
            </h2>
          </div>
          <div className="max-[1080px]:!grid-cols-2 max-[760px]:!grid-cols-1" style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", borderTop: "1px solid #33322F" }}>
            {SYSTEM.map((line) => (
              <p key={line} style={{ margin: 0, padding: "18px 16px", borderBottom: "1px solid #33322F", textAlign: "center", fontSize: 16, lineHeight: 1.45, color: "#C9C4BA", textWrap: "balance" }}>{line}</p>
            ))}
          </div>
          <div className="max-[760px]:!flex-col max-[760px]:!items-center" style={{ margin: "clamp(36px,4vw,52px) auto 0", maxWidth: 1060, display: "flex", alignItems: "flex-start", justifyContent: "center", gap: 14 }}>
            {CHAIN.map((c, i) => {
              const last = i === CHAIN.length - 1;
              return [
                i > 0 && (
                  <span key={`a${i}`} aria-hidden="true" className="max-[760px]:!mt-0 max-[760px]:!self-center max-[760px]:!rotate-90" style={{ flex: "0 0 auto", alignSelf: "flex-start", marginTop: 21, color: "#C4A47C" }}>
                    <ArrowIcon />
                  </span>
                ),
                <div key={c} className="max-[760px]:!w-full max-[760px]:!flex-none" style={{ flex: "1 1 0", minWidth: 0, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", maxWidth: 170, height: 56, borderRadius: 14, border: `1px solid ${last ? "#D3AE82" : "#3A3935"}`, background: last ? "#D3AE82" : "#262523", color: last ? "#1C1C1C" : "#F2EFEA", fontFamily: "'General Sans'", fontSize: 17, fontWeight: 600 }}>{c}</span>
                  {c === "Distribution" && (
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(2,minmax(0,1fr))", gap: 6, width: "100%", maxWidth: 170 }}>
                      {DISTRIBUTION.map((d) => (
                        <span key={d} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", height: 26, padding: "0 10px", borderRadius: 999, border: "1px solid #4A4843", fontSize: 12, color: "#C9C4BA" }}>{d}</span>
                      ))}
                    </div>
                  )}
                </div>,
              ];
            })}
          </div>
          <p style={{ ...SERIF, margin: "clamp(28px,3vw,40px) 0 0", textAlign: "center", fontSize: 22, color: "#D3AE82" }}>The channels change. The job doesn’t.</p>
        </div>
      </section>

      {/* WHERE TO START */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: SEC_PAD }}>
        <SectionHead eyebrow="Where to start" title="You don’t need to diagnose it yourself." accent="That would make my job suspiciously unnecessary." />
        <div className="max-[1080px]:!grid-cols-1" style={{ display: "grid", gridTemplateColumns: "repeat(3,minmax(0,1fr))", gap: 20 }}>
          {[
            { n: "01", t: "I know exactly what I need", d: "Choose one of the six services above.", href: "#all-services", cta: "Pick a service", up: true },
            { n: "02", t: "Something is wrong. I’m not sure what.", d: "Start with the $499 Growth Audit. I’ll review the current system, identify the bottlenecks and rank what I would fix first.", price: "$499 one time", href: "/services/saas-growth-consultant#pricing", cta: "Start with the growth audit", featured: true },
            { n: "03", t: "I want someone to handle the whole thing.", d: "SEO, Reddit, social, content and design managed as one system. One person. One plan. One invoice.", price: "$3,999/month", href: "/contact", cta: "Tell me what’s stuck" },
          ].map((o) => (
            <div key={o.n} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "clamp(28px,3vw,40px) clamp(22px,2.4vw,32px)", borderRadius: 24, background: o.featured ? "#F4F0E8" : "#F8F6F4", border: `1px solid ${o.featured ? "#D3AE82" : "#E2DFD8"}` }}>
              <span style={{ ...SERIF, fontSize: 32, lineHeight: 1, color: "#C4A47C" }}>{o.n}</span>
              <h3 style={{ margin: "14px 0 0", fontFamily: "'General Sans'", fontSize: 21, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2, textWrap: "balance" }}>{o.t}</h3>
              <p style={{ margin: "12px 0 0", maxWidth: 320, fontSize: 15.5, lineHeight: 1.55, color: "#4E4C48", textWrap: "pretty" }}>{o.d}</p>
              {o.price && <div style={{ marginTop: 16, fontFamily: "'General Sans'", fontSize: 26, fontWeight: 600, letterSpacing: "-0.03em" }}>{o.price}</div>}
              <Link href={o.href} className={TEXT_LINK} style={{ marginTop: "auto", paddingTop: 24, display: "inline-flex", alignItems: "center", gap: 10, fontSize: 15, fontWeight: 600, color: "#1C1C1C" }}>
                <span style={{ borderBottom: "1.5px solid currentColor", paddingBottom: 2 }}>{o.cta}</span>
                {o.up ? <span aria-hidden="true">↑</span> : <ArrowIcon />}
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* HOW I WORK */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: SEC_PAD }}>
        <SectionHead eyebrow="How I work" title="Four steps." accent="No 87-slide strategy deck." />
        <ol className="max-[1080px]:!grid-cols-2 max-[760px]:!grid-cols-1" style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: "28px 24px" }}>
          {STEPS.map((s) => (
            <li key={s.n} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", paddingTop: 22, borderTop: "2px solid #1C1C1C" }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#9A7646", fontVariantNumeric: "tabular-nums" }}>{s.n}</span>
              <h3 style={{ margin: "10px 0 0", fontFamily: "'General Sans'", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>{s.t}</h3>
              <p style={{ margin: "8px 0 0", maxWidth: 240, fontSize: 15.5, lineHeight: 1.55, color: "#5A5854" }}>{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* SELECTED PROOF */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: SEC_PAD }}>
        <SectionHead eyebrow="Selected proof" title="The services are different." accent="The proof shouldn’t be." />
        <div className="max-[1080px]:!grid-cols-2 max-[760px]:!grid-cols-1" style={{ display: "grid", gridTemplateColumns: "repeat(4,minmax(0,1fr))", gap: 16 }}>
          {CASES.map((c) => (
            <Link key={c.alt} href={c.href} className="transition-colors hover:!border-[#1C1C1C]" style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "28px 22px", borderRadius: 22, background: "#F8F6F4", border: "1px solid #E2DFD8", color: "#1C1C1C" }}>
              <span style={{ height: 44, display: "flex", alignItems: "center" }}>
                <img loading="lazy" src={c.logo} alt={c.alt} style={{ display: "block", maxHeight: 34, maxWidth: 150, width: "auto", height: "auto", mixBlendMode: "multiply" }} />
              </span>
              <div style={{ marginTop: 18, width: "100%", display: "flex", flexDirection: "column" }}>
                {c.stats.map(([v, l]) => (
                  <div key={l} style={{ padding: "12px 0", borderTop: "1px solid #E2DFD8" }}>
                    <div style={{ fontFamily: "'General Sans'", fontSize: 24, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05 }}>{v}</div>
                    <div style={{ marginTop: 4, fontSize: 13.5, color: "#5A5854" }}>{l}</div>
                  </div>
                ))}
              </div>
              <span style={{ marginTop: "auto", paddingTop: 14, display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14.5, fontWeight: 600 }}>
                <span style={{ borderBottom: "1.5px solid currentColor", paddingBottom: 2 }}>See the case study</span>
                <ArrowIcon />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: SEC_PAD }}>
        <SectionHead eyebrow="FAQ" title="Service questions," accent="answered before you have to ask." />
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <FAQAccordion faqs={FAQS} defaultOpen={0} />
        </div>
      </section>

      {/* CTA */}
      <section id="contact" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} clamp(64px,7vw,96px)` }}>
        <div style={{ borderRadius: 28, background: "#1C1C1C", color: "#F2EFEA", padding: "clamp(48px,6vw,88px) clamp(24px,5vw,72px)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <h2 style={{ margin: 0, fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(34px,3.6vw,52px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
            Still not sure which one?
            <span style={{ ...SERIF, display: "block", marginTop: 6, fontSize: "1.08em", color: "#D3AE82" }}>
              <span style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}>
                Tell me what’s stuck.
                <Squiggle />
              </span>
            </span>
          </h2>
          <p style={{ margin: "22px auto 0", maxWidth: 580, fontSize: 17, lineHeight: 1.6, color: "#B7B2A8", textWrap: "pretty" }}>
            Send me the site, the numbers, the half-finished idea or just the problem. I’ll tell you where I’d start. If I’m not the right person for it, I’ll say that too.
          </p>
          <div className="max-md:!w-full max-md:!max-w-[400px] max-md:!flex-col" style={{ marginTop: 30, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            <Link href="/contact" className="max-md:!justify-center transition-colors hover:!bg-white" style={{ display: "inline-flex", alignItems: "center", gap: 12, height: 56, padding: "0 26px", borderRadius: 12, background: "#F2EFEA", color: "#1C1C1C", fontSize: 16, fontWeight: 600 }}>
              Tell me what’s stuck
              <ArrowIcon />
            </Link>
            <Link href="/contact#book" className="max-md:!justify-center transition-colors hover:!border-[#C4A47C]" style={{ display: "inline-flex", alignItems: "center", height: 56, padding: "0 24px", borderRadius: 12, border: "1px solid #4A4843", color: "#F2EFEA", fontSize: 16, fontWeight: 600 }}>
              Book a free call
            </Link>
            <a href="mailto:hello@zainameen.com" className="max-md:!justify-center transition-colors hover:!text-[#D3AE82]" style={{ display: "inline-flex", alignItems: "center", height: 56, padding: "0 18px", color: "#F2EFEA", fontSize: 16, fontWeight: 600, textDecoration: "underline", textUnderlineOffset: 4, textDecorationColor: "#6B675F" }}>
              Email me
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
