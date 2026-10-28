import { buildMetadata } from "@/lib/seo";
import { H1_ACCENT_STYLE, HERO_H1_STYLE } from "@/app/HomeComponents/heading";
import { ArrowIcon } from "../HomeComponents/icons";
import { FAQAccordion } from "../HomeComponents/FAQAccordion";
import { COMPLETE_GROWTH, CONTACT_HREF, SEO_AUDIT, SERVICES, type Package, type ServiceId } from "@/lib/pricing";

export const metadata = buildMetadata({
  title: "Black Friday Marketing Deals: 10% Off SEO, Reddit & Social",
  description:
    "Black Friday marketing deals: 10% off SEO, Reddit marketing, social media, Google and Meta ads and growth strategy. November 23 to 30, 2026.",
  path: "/black-friday-marketing-deals",
});

const MAX = 1280;
const PAD = "clamp(20px,2.5vw,32px)";
const DISCOUNT = 0.1;
const ART = "/assets/black-friday";

/** Regular and Black Friday price, both from lib/pricing.ts so the sale can never drift from the real price. */
function sale(price: number) {
  const fmt = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;
  return { regular: fmt(price), now: fmt(Math.round(price * (1 - DISCOUNT) * 100) / 100) };
}

type Offer = { name: string; price: number; from?: boolean; once?: boolean; note: string };

const pkgOffer = (p: Package, note?: string): Offer => ({ name: p.name, price: p.price ?? 0, from: p.priceType === "from", once: p.interval === "once", note: note ?? p.benefit });

type Block = { id: ServiceId; title: string; lead: string; body: string[]; art: string; artAlt: string; offers: Offer[]; small?: string; servicesLabel: string; claimLabel: string };

const BLOCKS: Block[] = [
  {
    id: "seo",
    title: "Black Friday SEO Services",
    lead: "Get found by people already searching for what you sell.",
    body: [
      "SEO isn't about publishing articles just to have more pages on Google.",
      "I research the keywords your potential customers use, examine competing pages, improve technical foundations, and create content around searches that can bring relevant traffic.",
    ],
    art: "seo-research.svg",
    artAlt: "Search results and keyword research illustration",
    offers: [
      ...SERVICES.seo.packages.map((p) => pkgOffer(p)),
      { name: SEO_AUDIT.name, price: SEO_AUDIT.price, once: true, note: "Not sure you're ready for monthly SEO? Start with an audit. You'll get a prioritized list of what needs fixing." },
    ],
    servicesLabel: "See My SEO Services",
    claimLabel: "Claim the SEO Offer",
  },
  {
    id: "reddit",
    title: "Black Friday Reddit Marketing Deals",
    lead: "Your potential customers are already having conversations. Let's find the right ones.",
    body: [
      "Reddit can be useful for reaching people who are actively asking questions, comparing products, and discussing problems your business solves. But the approach matters.",
      "I research the right subreddits, understand their rules, study relevant conversations, and develop content and participation strategies that fit each community.",
    ],
    art: "reddit-community.svg",
    artAlt: "Community conversations illustration",
    offers: SERVICES.reddit.packages.map((p) => pkgOffer(p)),
    servicesLabel: "Explore Reddit Marketing Packages",
    claimLabel: "Claim the Reddit Marketing Offer",
  },
  {
    id: "social",
    title: "Black Friday Social Media Management",
    lead: "Consistent content, without spending every day figuring out what to post.",
    body: [
      "If you're running a business, you probably have more important things to do than write captions, design graphics, and manage multiple social profiles.",
      "I handle the planning, writing, design and publishing, with content based on the audience you want to reach.",
    ],
    art: "social-content.svg",
    artAlt: "Social media content planning illustration",
    offers: SERVICES.social.packages.map((p) => pkgOffer(p)),
    servicesLabel: "Explore Social Media Management",
    claimLabel: "Claim the Social Media Offer",
  },
  {
    id: "ads",
    title: "Black Friday Google & Meta Ads Management",
    lead: "Stop spending money on clicks without knowing what happens afterward.",
    body: [
      "Google and Meta ads can bring traffic quickly, but paying for visitors doesn't automatically make them customers.",
      "I work on the campaigns, targeting, tracking, creative tests and landing page opportunities that affect your results.",
    ],
    art: "paid-ads.svg",
    artAlt: "Ad campaign performance illustration",
    offers: SERVICES.ads.packages.filter((p) => p.price).map((p) => pkgOffer(p)),
    small: "Larger accounts can be scoped separately. Important: these prices cover management fees. Your advertising budget is separate and paid directly to the advertising platforms.",
    servicesLabel: "See Google & Meta Ads Services",
    claimLabel: "Claim the Ads Management Offer",
  },
  {
    id: "growth",
    title: "Black Friday Growth Strategy & Consulting",
    lead: "Sometimes the problem isn't that you're doing too little marketing. You're working on the wrong thing.",
    body: [
      "You might have traffic but no signups. Signups but no customers. Content going out every week but little to show for it.",
      "Before recommending another channel, I look at what's happening across your positioning, acquisition, conversion and retention.",
    ],
    art: "growth-strategy.svg",
    artAlt: "Growth strategy roadmap illustration",
    offers: SERVICES.growth.packages.map((p) => ({ ...pkgOffer(p), name: p === COMPLETE_GROWTH ? "Complete Growth" : p.name })),
    servicesLabel: "Explore Growth Consulting",
    claimLabel: "Discuss Your Growth Strategy",
  },
];

const PROOF = [
  { title: "Blainy: 85K+ signups organically", body: "I helped build organic acquisition through SEO, content and Reddit, without paid advertising." },
  { title: "Everdry Waterproofing: 160K+ Facebook views in 28 days", body: "A content strategy built around real homeowner questions, useful information and better creative." },
  { title: "Virtarix: 70K+ Facebook views in under four months", body: "Building social visibility through technical content and community distribution." },
];

const STEPS = [
  { title: "Choose a service", body: "Review the packages above or tell me what's going on with your business if you're unsure." },
  { title: "Tell me about your project", body: "Send your website, what you're trying to achieve, and the service you're interested in." },
  { title: "Confirm the scope and discounted price", body: "I'll review what you need and confirm the work, your Black Friday price and the starting arrangements before we proceed." },
];

const FAQS: [string, string[]][] = [
  ["When is Black Friday 2026?", ["Black Friday falls on November 27, 2026. This promotion runs from November 23 through Cyber Monday, November 30."]],
  ["Does the 10% discount apply to every service?", ["The offer covers eligible paid SEO, Reddit marketing, social media management, Google and Meta ads management, and growth strategy services. Custom services can receive the same percentage off an agreed service fee."]],
  ["Does the discount apply every month?", ["No. Monthly engagements receive 10% off the first month of service. Regular pricing applies afterward. One time projects receive 10% off the qualifying project fee."]],
  ["Is ad spend included in the discount?", ["No. The discount applies to my service or management fees, not advertising budgets paid to Google, Meta or other platforms."]],
  ["Do I have to sign a long contract?", ["No long contracts are required for the standard monthly services. The scope, billing and cancellation arrangements are confirmed before work begins."]],
  ["Can I start with just an SEO audit or strategy session?", ["Absolutely. You don't need to commit to ongoing marketing management. One time services are available if you want to understand the problems before investing further."]],
  ["Can I combine the discount with another offer?", ["No. The Black Friday discount applies to the eligible service fee and is not combined with other promotional discounts."]],
  ["When does the Black Friday deal end?", ["The offer closes November 30, 2026, at 11:59 PM US Eastern Time. Bookings must be confirmed within the promotion window to qualify."]],
];

const btnDark = { display: "inline-flex", alignItems: "center", gap: 10, height: 48, padding: "0 20px", borderRadius: 12, background: "#1C1C1C", color: "#F8F6F4", fontSize: 15, fontWeight: 600 } as const;
const btnLine = { display: "inline-flex", alignItems: "center", gap: 10, height: 48, padding: "0 20px", borderRadius: 12, border: "1px solid #CFCBC2", color: "#1C1C1C", fontSize: 15, fontWeight: 600 } as const;
const h2Style = { margin: 0, fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(30px,3.2vw,46px)", lineHeight: 1.06, letterSpacing: "-0.035em", textWrap: "balance" } as const;
const muted = { color: "#5A5854", fontSize: 17, lineHeight: 1.6 } as const;

function Section({ children, tint, id }: { children: React.ReactNode; tint?: boolean; id?: string }) {
  return (
    <section id={id} style={{ background: tint ? "#F3F1EC" : undefined, padding: `clamp(64px,8vw,112px) ${PAD}`, scrollMarginTop: 80 }}>
      <div style={{ maxWidth: MAX, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

function OfferCard({ o }: { o: Offer }) {
  const p = sale(o.price);
  const per = o.once ? "one time" : "for the first month";
  return (
    <div style={{ minWidth: 0, display: "flex", flexDirection: "column", padding: 24, borderRadius: 18, background: "#FBFBF9", border: "1px solid #E2DFD8" }}>
      <h4 style={{ margin: 0, fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>{o.name}</h4>
      <p style={{ margin: "14px 0 0", fontSize: 14, color: "#6F6B64" }}>
        Regular price: <s>{o.from ? "From " : ""}{p.regular}{o.once ? "" : "/month"}</s>
      </p>
      <p style={{ margin: "4px 0 0", fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}>
        {o.from ? "From " : ""}{p.now}
      </p>
      <p style={{ margin: "2px 0 0", fontSize: 14, color: "#6F6B64" }}>Black Friday, {per}</p>
      <p style={{ margin: "14px 0 0", fontSize: 15, lineHeight: 1.55, color: "#5A5854" }}>{o.note}</p>
    </div>
  );
}

export default function BlackFridayPage() {
  return (
    <main id="top" style={{ overflowX: "clip" }}>
      {/* Hero */}
      <section style={{ padding: `clamp(120px,12vw,160px) ${PAD} clamp(56px,6vw,88px)` }}>
        <div className="grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center" style={{ maxWidth: MAX, margin: "0 auto" }}>
          <div style={{ minWidth: 0 }}>
            <p style={{ margin: "0 0 18px", fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#6F6B64" }}>Black Friday 2026 | November 23 to November 30</p>
            <h1 style={HERO_H1_STYLE}>
              Black Friday marketing deals: <span style={H1_ACCENT_STYLE}>10% off SEO, Reddit and social.</span>
            </h1>
            <p style={{ ...muted, margin: "24px 0 0", maxWidth: 620 }}>
              Black Friday marketing deals for SaaS founders and small businesses: 10% off my SEO, Reddit marketing, social media management, paid ads management and growth strategy services.
            </p>
            <p style={{ ...muted, margin: "14px 0 0", maxWidth: 620 }}>
              Whether you&apos;re struggling to get traffic, turn visitors into customers, or figure out which marketing channel deserves your budget, I can help you work on the problem that&apos;s actually slowing you down. Same services. Same hands on work. Just 10% less to get started.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 28 }}>
              <a href="#black-friday-packages" style={btnDark}>Explore Black Friday Deals <ArrowIcon /></a>
              <a href={CONTACT_HREF} style={btnLine}>Talk About Your Project <ArrowIcon /></a>
            </div>
            <p style={{ margin: "20px 0 0", fontSize: 13, lineHeight: 1.55, color: "#6F6B64", maxWidth: 600 }}>
              Offer starts November 23 and ends November 30, 2026. Discount applies to the first month of eligible monthly services or the quoted fee of an eligible one time project.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${ART}/black-friday-growth-hero.svg`} alt="Search, analytics and growth charts with a 10 percent off ticket" width={1440} height={900} fetchPriority="high" style={{ width: "100%", height: "auto" }} />
        </div>
      </section>

      {/* Packages */}
      <Section tint id="black-friday-packages">
        <h2 style={h2Style}>Black Friday packages and pricing</h2>
        <p style={{ ...muted, margin: "16px 0 0", maxWidth: 680 }}>Pick what your business actually needs. You don&apos;t have to buy five marketing services when one could solve the problem.</p>

        {BLOCKS.map((b, i) => {
          const svc = SERVICES[b.id];
          return (
            <div key={b.id} id={`bf-${b.id}`} style={{ marginTop: "clamp(56px,6vw,88px)", scrollMarginTop: 80 }}>
              <div className="grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-center">
                <div style={{ minWidth: 0 }}>
                  <h3 style={{ margin: 0, fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(24px,2.2vw,32px)", letterSpacing: "-0.025em", lineHeight: 1.15 }}>
                    {i + 1}. {b.title}
                  </h3>
                  <p style={{ margin: "12px 0 0", fontSize: 19, fontWeight: 600, lineHeight: 1.4 }}>{b.lead}</p>
                  {b.body.map((t) => <p key={t} style={{ ...muted, margin: "12px 0 0" }}>{t}</p>)}
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`${ART}/${b.art}`} alt={b.artAlt} width={800} height={640} loading="lazy" decoding="async" className="max-md:hidden" style={{ width: "100%", maxWidth: 420, height: "auto", justifySelf: "center" }} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" style={{ marginTop: 28 }}>
                {b.offers.map((o) => <OfferCard key={o.name} o={o} />)}
              </div>
              {b.small ? <p style={{ margin: "16px 0 0", fontSize: 14, lineHeight: 1.55, color: "#6F6B64", maxWidth: 760 }}>{b.small}</p> : null}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24 }}>
                <a href={CONTACT_HREF} style={btnDark}>{b.claimLabel} <ArrowIcon /></a>
                <a href={svc.href} style={btnLine}>{b.servicesLabel} <ArrowIcon /></a>
              </div>
            </div>
          );
        })}
      </Section>

      {/* Proof */}
      <Section>
        <h2 style={h2Style}>Why work with me?</h2>
        <p style={{ ...muted, margin: "16px 0 0", maxWidth: 720 }}>
          You don&apos;t need a bigger list of marketing tasks. You need someone who can figure out what matters and actually do the work. I&apos;ve worked across SaaS, service businesses and ecommerce, helping businesses improve search visibility, community marketing and organic distribution.
        </p>
        <div className="grid gap-4 md:grid-cols-3" style={{ marginTop: 32 }}>
          {PROOF.map((p) => (
            <div key={p.title} style={{ padding: 24, borderRadius: 18, border: "1px solid #E2DFD8", background: "#FBFBF9" }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, lineHeight: 1.35 }}>{p.title}</h3>
              <p style={{ margin: "10px 0 0", fontSize: 15, lineHeight: 1.55, color: "#5A5854" }}>{p.body}</p>
            </div>
          ))}
        </div>
        <p style={{ margin: "16px 0 0", fontSize: 13, color: "#6F6B64" }}>These are examples of past work, not promises of future results.</p>
        <a href="/case-studies" style={{ ...btnLine, marginTop: 24 }}>See More of My Work <ArrowIcon /></a>
      </Section>

      {/* How to claim */}
      <Section tint>
        <h2 style={h2Style}>How to claim the Black Friday discount</h2>
        <ol className="grid gap-4 md:grid-cols-3" style={{ listStyle: "none", padding: 0, margin: "32px 0 0" }}>
          {STEPS.map((s, i) => (
            <li key={s.title} style={{ padding: 24, borderRadius: 18, background: "#FBFBF9", border: "1px solid #E2DFD8" }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#6F6B64" }}>Step {i + 1}</span>
              <h3 style={{ margin: "6px 0 0", fontSize: 18, fontWeight: 600 }}>{s.title}</h3>
              <p style={{ margin: "10px 0 0", fontSize: 15, lineHeight: 1.55, color: "#5A5854" }}>{s.body}</p>
            </li>
          ))}
        </ol>
        <a href={CONTACT_HREF} style={{ ...btnDark, marginTop: 28 }}>Get in Touch <ArrowIcon /></a>
      </Section>

      {/* FAQ */}
      <Section>
        <h2 style={{ ...h2Style, marginBottom: 32 }}>Black Friday marketing deals: frequently asked questions</h2>
        <FAQAccordion faqs={FAQS} />
      </Section>

      {/* Closing CTA */}
      <section style={{ background: "#1C1C1C", color: "#F2EFEA", padding: `clamp(64px,8vw,112px) ${PAD}` }}>
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr] md:items-center" style={{ maxWidth: MAX, margin: "0 auto" }}>
          <div style={{ minWidth: 0 }}>
            <h2 style={{ ...h2Style, color: "#F2EFEA" }}>Planning to grow your business? Start with the right problem.</h2>
            <p style={{ ...muted, color: "#B7B2A8", margin: "18px 0 0" }}>
              You might need SEO. You might need better social media content. You might need to fix your landing page before spending anything on more traffic. I won&apos;t recommend a service just because it&apos;s on sale. Tell me about your business and what you&apos;re trying to achieve, and I&apos;ll help you figure out where to start.
            </p>
            <p style={{ margin: "18px 0 0", fontSize: 17, fontWeight: 600 }}>Get 10% off eligible marketing services this Black Friday.</p>
            <a href={CONTACT_HREF} style={{ ...btnDark, background: "#F8F6F4", color: "#1C1C1C", marginTop: 24 }}>Let&apos;s Talk About Your Business <ArrowIcon /></a>
            <p style={{ margin: "24px 0 0", fontSize: 13, lineHeight: 1.55, color: "#8F8A80" }}>
              Offer applies to new qualifying engagements booked during the promotion period. First month discounts apply across that month&apos;s invoices even when billing is weekly or biweekly. Standard pricing resumes afterward. Custom scopes, availability and starting arrangements are confirmed before booking. Results are not guaranteed.
            </p>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${ART}/10-percent-off-seal.svg`} alt="" aria-hidden width={640} height={640} loading="lazy" className="max-md:hidden" style={{ width: "100%", maxWidth: 320, height: "auto", justifySelf: "center" }} />
        </div>
      </section>
    </main>
  );
}
