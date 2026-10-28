import { buildMetadata } from "@/lib/seo";
import { ArrowIcon } from "../HomeComponents/icons";
import { FAQAccordion } from "../HomeComponents/FAQAccordion";
import { EditorialPage, ed as e } from "../_design/ui";
import { COMPLETE_GROWTH, CONTACT_HREF, SEO_AUDIT, SERVICES, type Package, type ServiceId } from "@/lib/pricing";
import b from "./bf.module.css";

export const metadata = buildMetadata({
  title: "Black Friday Marketing Deals 2026 | SEO, Reddit & Social | Zain",
  description:
    "Explore Black Friday marketing deals on SEO, Reddit, social media, paid ads and growth consulting. Compare services, review the 10% offer and find the right fit.",
  path: "/black-friday-marketing-deals",
});

const DISCOUNT = 0.1;
const ART = "/assets/black-friday/v2";
const PACKAGES = "#black-friday-packages";

/** Regular and Black Friday price, both from lib/pricing.ts so the sale can never drift from the real price. */
function sale(price: number) {
  const fmt = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;
  return { regular: fmt(price), now: fmt(Math.round(price * (1 - DISCOUNT) * 100) / 100) };
}

type Offer = { name: string; forWho: string; price: number; from: boolean; once: boolean; scope: string[] };

const toOffer = (p: Package): Offer => ({
  name: p === COMPLETE_GROWTH ? "Complete Growth" : p.name,
  forWho: p.forWho,
  price: p.price ?? 0,
  from: p.priceType === "from",
  once: p.interval === "once",
  scope: p.highlights.slice(0, 4),
});

const offersFor = (id: ServiceId) => SERVICES[id].packages.filter((p) => p.price).map(toOffer);

type Block = {
  id: ServiceId;
  eyebrow: string;
  title: React.ReactNode;
  body: string[];
  bestFor: string;
  workOn: string;
  art: string;
  artAlt: string;
  offers: Offer[];
  cta: string;
  link: string;
  note?: string;
};

const BLOCKS: Block[] = [
  {
    id: "seo",
    eyebrow: "01 / Search visibility",
    title: <>SEO that helps the <em className={e.emGreen}>right people</em> find you.</>,
    body: [
      "More keywords aren't the goal. Relevant visitors who understand what you offer are.",
      "I look at how your audience searches, where your site is losing visibility, and which pages deserve attention first. Depending on the package, that can include technical fixes, keyword research, content planning, content creation, and search performance reviews.",
    ],
    bestFor: "SaaS products, service businesses and sites with useful offers that aren't getting enough qualified search traffic.",
    workOn: "Search research, technical priorities, page optimization, useful content and measurement. Exact deliverables depend on the package.",
    art: "BF02-seo-service.svg",
    artAlt: "Search results page with a rising visibility chart",
    offers: [
      ...offersFor("seo"),
      { name: SEO_AUDIT.name, forWho: "Not ready for monthly SEO? Start with a ranked list of what to fix.", price: SEO_AUDIT.price, from: false, once: true, scope: SEO_AUDIT.covers.slice(0, 4) },
    ],
    cta: "Compare Black Friday SEO packages",
    link: "See my SEO services",
  },
  {
    id: "reddit",
    eyebrow: "02 / Community discovery",
    title: <>Show up in conversations your customers <em className={e.emGreen}>already care about.</em></>,
    body: [
      "Reddit isn't a place to paste promotions and hope nobody notices. People go there to ask questions, compare options, and hear what others actually think.",
      "The work starts with finding relevant communities, understanding their rules and contributing where there's something genuinely useful to say. The goal is stronger visibility and more relevant conversations, without treating a community like an ad slot.",
    ],
    bestFor: "Businesses whose customers discuss problems, products, or recommendations in active communities.",
    workOn: "Community research, participation plans, useful content, subreddit strategy and referral measurement, depending on the scope.",
    art: "BF03-reddit-service.svg",
    artAlt: "Community discussion threads with helpful replies",
    offers: offersFor("reddit"),
    cta: "Compare Black Friday Reddit packages",
    link: "Explore Reddit marketing",
  },
  {
    id: "social",
    eyebrow: "03 / Content and community",
    title: <>Social media that gives people <em className={e.emGreen}>a reason to follow.</em></>,
    body: [
      "Posting every day doesn't help much when every post says the same thing.",
      "I build content around your customers, your expertise and the questions people already ask. The right mix depends on the business: educational posts, short form ideas, carousels, community conversations, and content worth saving or sharing.",
    ],
    bestFor: "Teams that need a consistent organic presence without filling their feed with generic marketing copy.",
    workOn: "Content strategy, planning, copy, graphics, publishing support and platform specific improvements, subject to the selected plan.",
    art: "BF04-social-service.svg",
    artAlt: "Social posts and a content calendar",
    offers: offersFor("social"),
    cta: "Compare Black Friday social media packages",
    link: "See social media services",
  },
  {
    id: "ads",
    eyebrow: "04 / Paid acquisition",
    title: <>Run paid campaigns with a <em className={e.emGreen}>clearer reason</em> behind the spend.</>,
    body: [
      "A larger budget won't rescue a weak offer or a confusing landing page.",
      "Before scaling spend, I look at targeting, the message, the conversion path, and what success should be measured against. Campaign work should be built around the outcome you're actually trying to achieve.",
    ],
    bestFor: "Businesses with a defined offer, a realistic testing budget and a way to track inquiries or purchases.",
    workOn: "Campaign planning, creative direction, setup, testing, and reporting for the ad platforms actually included in your service agreement.",
    art: "BF05-paid-ads-service.svg",
    artAlt: "Ad campaign dashboard with conversion tracking",
    offers: offersFor("ads"),
    cta: "Compare Black Friday ads packages",
    link: "See Google and Meta ads services",
    note: "Advertising spend and third party platform fees are separate and paid directly to the platforms. Larger accounts are scoped separately.",
  },
  {
    id: "growth",
    eyebrow: "05 / Growth priorities",
    title: <>Find the bottleneck <em className={e.emGreen}>before paying</em> to send more traffic into it.</>,
    body: [
      "You can improve traffic and still struggle to grow. Maybe the offer isn't clear. Maybe the page isn't converting. Maybe visitors sign up and never reach the moment your product becomes valuable.",
      "A growth review looks at the whole journey, then helps you decide what to fix first. The aim is a shorter list of better priorities, not an impressive document that nobody uses.",
    ],
    bestFor: "SaaS founders and service business owners who aren't sure which marketing problem to solve first.",
    workOn: "Positioning, offers, acquisition channels, conversion, retention signals, and prioritization. Confirmed scope determines the deliverables.",
    art: "BF06-growth-strategy-service.svg",
    artAlt: "Funnel diagram with the bottleneck highlighted",
    offers: offersFor("growth"),
    cta: "Compare growth consulting packages",
    link: "Explore growth strategy",
  },
];

const CHOOSER: [string, string][] = [
  ["People can't find your website through relevant searches", "SEO"],
  ["Buyers ask questions and compare options in communities you rarely join", "Reddit marketing"],
  ["Your business has expertise but no consistent content presence", "Social media marketing"],
  ["Your offer converts and you want to test paid demand", "Paid ads"],
  ["You're unsure whether the problem is traffic, messaging, conversion or retention", "Growth strategy"],
];

const PROOF = [
  { name: "Blainy", result: "85K+ users with no paid acquisition", body: "Organic acquisition through SEO, content and Reddit for a SaaS product.", shot: "/assets/site/blainy-gsc-full.jpg", alt: "Blainy Google Search Console: 297K clicks, 25.3M impressions", meta: "SEO and Reddit, SaaS", href: "/case-studies/blainy" },
  { name: "Everdry Waterproofing", result: "160K+ Facebook views in 28 days", body: "Content built around real homeowner questions, useful information and better creative.", shot: "/assets/pages/growth-strategy/07-results-everdry__facebook-160k-views.webp", alt: "Everdry Facebook dashboard, last 28 days: 160,235 views", meta: "Organic social, Facebook, 28 days", href: "/case-studies/everdry" },
  { name: "Virtarix", result: "70K+ Facebook views in under four months", body: "Social visibility through technical content and community distribution.", shot: "/assets/v8/vx-70k.webp", alt: "Virtarix Facebook insights, 4 Oct to 23 Jan: 71,459 views, 3,395 interactions", meta: "Organic social, Facebook, 4 months", href: "/case-studies/virtarix" },
];

const CHECKLIST: [string, string][] = [
  ["Make the offer obvious", "What are you selling? Who is it for? How much does it cost? When does the deal end? People shouldn't have to scroll through five sections to find those answers."],
  ["Give your offer a dedicated page", "Use a clear page title, descriptive URL, relevant H1, and opening paragraph that explains the offer naturally. Don't make someone work out whether they're looking at a Black Friday deal or a regular service page."],
  ["Make the pricing easy to compare", "Show what each package includes, the normal price, the discounted price, and whether the charge is one time or monthly. If something costs extra, say so."],
  ["Promote it where your customers actually spend time", "That might mean Google, Reddit, Facebook, LinkedIn, Pinterest, email, or paid advertising. You don't need every channel. You need the channels that make sense for your audience."],
  ["Test the buying journey", "Open the page on your phone. Click the buttons. Submit the form. Check your tracking. A campaign isn't ready just because the graphics look good."],
  ["Plan what happens after the promotion", "How will new customers get started? What information do you need? Which work happens first? A good offer should lead to a clear next step."],
];

const STEPS: [string, string][] = [
  ["Tell me about your business", "Share what you're selling, who you're trying to reach, and the biggest problem you're facing."],
  ["We'll confirm the scope", "You'll know what the package includes, what it costs, which discount terms apply, and what happens next."],
  ["We start with the priorities", "No random list of marketing activities. We focus on the work that makes the most sense for your business."],
];

const FAQS: [string, string[]][] = [
  ["Are these Black Friday marketing deals only for ecommerce businesses?", ["No. The services can also be relevant to SaaS products and service businesses. The right work depends on your audience, offer, and growth bottleneck."]],
  ["What's included in a Black Friday SEO package?", ["That depends on the package selected. It may include search research, technical priorities, content planning, page optimization, and ongoing measurement. Each card above lists the main deliverables."]],
  ["Can I book Reddit marketing without SEO?", ["Yes. Reddit and SEO can complement each other, but they're different services with different methods and deliverables, and each can be booked on its own."]],
  ["Is social media marketing included in every package?", ["No. Check the selected package for included platforms, content quantities, design work, and publishing responsibilities. Extra platforms aren't included unless the package says so."]],
  ["Is ad spend part of the discounted price?", ["No. The discount applies to my management fee only. Ad spend is paid directly to Google, Meta or other platforms. Paid advertising also needs a suitable budget, an offer, and conversion tracking."]],
  ["How is the 10% Black Friday discount applied?", ["Monthly services get 10% off the first month, then regular pricing applies. One time projects get 10% off the project fee. The card for each package shows the regular price, the Black Friday price and whether it's monthly or one time."]],
  ["When does the Black Friday offer end?", ["The offer runs from November 23 to November 30, 2026, and closes at 11:59 PM US Eastern Time. Bookings must be confirmed within that window to qualify."]],
  ["Can I combine services?", ["You can ask for a combined scope. Each eligible service gets 10% off, but the discount doesn't stack with any other promotion."]],
  ["Do you guarantee rankings, leads, or sales?", ["No responsible marketing work can guarantee those outcomes. The focus is on agreed deliverables, useful strategy, careful execution, and transparent measurement."]],
  ["What if I don't know which service I need?", ["Tell me what you're selling, what's happening now, and what you've tried. I'll recommend where I'd start, including when a smaller service makes more sense."]],
];

function Art({ src, alt, priority }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className={b.media}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${ART}/${src}`} alt={alt} width={1200} height={800} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" />
    </div>
  );
}

function OfferCard({ o }: { o: Offer }) {
  const p = sale(o.price);
  const from = o.from ? "From " : "";
  return (
    <li className={b.card}>
      <h4 className={b.cardName}>{o.name}</h4>
      <p className={b.cardFor}>{o.forWho}</p>
      <p className={b.was}>
        Regular <s>{from}{p.regular}{o.once ? "" : "/month"}</s>
      </p>
      <p className={b.now}>{from}{p.now}</p>
      <p className={b.billing}>{o.once ? "One time, 10% off" : "First month, 10% off"}</p>
      <ul className={b.scope}>
        {o.scope.map((s) => <li key={s}>{s}</li>)}
      </ul>
      <a href={CONTACT_HREF} className={`${e.btn} ${e.btnSecondary} ${b.cardBtn}`}>Claim this offer</a>
    </li>
  );
}

export default function BlackFridayPage() {
  return (
    <EditorialPage>
      {/* Hero */}
      <section className={b.hero}>
        <div className={e.container}>
          <div className={b.heroGrid}>
            <div style={{ minWidth: 0 }}>
              <p className={e.eyebrow}>Black Friday marketing deals 2026</p>
              <h1 className={`${e.h1} ${b.h1}`}>
                Black Friday marketing deals. <span className={b.h1Accent}>Better growth, 10% less.</span>
              </h1>
              <p className={e.lede} style={{ marginTop: 24 }}>
                These Black Friday marketing deals are for SaaS founders and service businesses that need more than another month of random marketing tasks.
              </p>
              <p className={e.body} style={{ marginTop: 14 }}>
                Save 10% on eligible SEO, Reddit marketing, social media, paid advertising and growth consulting packages. Pick the work your business actually needs, not the biggest package on the page.
              </p>
              <div className={e.actions} style={{ marginTop: 28 }}>
                <a href={PACKAGES} className={`${e.btn} ${e.btnPrimary}`}>Explore Black Friday packages <ArrowIcon /></a>
                <a href="#help-me-choose" className={`${e.btn} ${e.btnSecondary}`}>Help me choose</a>
              </div>
              <p className={b.trust}>Real deliverables. Clear scope. No promises of overnight rankings or guaranteed sales.</p>
            </div>
            <Art src="BF01-black-friday-hero.svg" alt="Black Friday growth illustration with search, analytics and a 10% off tag" priority />
          </div>

          {/* Offer details */}
          <div className={b.strip}>
            <dl className={b.stripGrid}>
              <div><dt>Seasonal offer</dt><dd>10% off eligible marketing packages: SEO, Reddit, social media, paid ads and growth strategy.</dd></div>
              <div><dt>When it applies</dt><dd>November 23 to November 30, 2026, closing at 11:59 PM US Eastern Time.</dd></div>
              <div><dt>Who can claim</dt><dd>New engagements confirmed during the promotion window.</dd></div>
              <div><dt>How the discount works</dt><dd>10% off the first month of monthly services, or 10% off a one time project. Regular pricing after that. Ad spend is not included.</dd></div>
            </dl>
            <div className={b.stripFoot}>
              <p className={e.small} style={{ margin: 0 }}>Not combined with other promotions. Scope and start date are confirmed before work begins.</p>
              <a href={PACKAGES} className={e.link}>See eligible packages</a>
            </div>
          </div>
        </div>
      </section>

      {/* Services intro */}
      <section id="black-friday-packages" className={b.sec}>
        <div className={`${e.container} ${b.center}`}>
          <h2 className={e.h2} style={{ maxWidth: 820 }}>Choose the marketing work that will <em className={e.emGreen}>actually move things forward.</em></h2>
          <p className={e.body} style={{ marginTop: 18 }}>
            A bigger marketing plan isn&apos;t always a better one. Sometimes the problem is poor search visibility. Sometimes you&apos;re getting attention from the wrong audience. Sometimes the traffic is fine, but the page doesn&apos;t give people a reason to act. Here&apos;s what each service is designed to help with.
          </p>
        </div>
      </section>

      {BLOCKS.map((s, i) => {
        const svc = SERVICES[s.id];
        const cols = s.offers.length >= 4 ? b.cards4 : b.cards3;
        return (
          <section key={s.id} id={`bf-${s.id}`} className={b.sec}>
            <div className={e.container}>
              <div className={`${b.svcGrid} ${i % 2 ? b.svcFlip : ""}`}>
                <div style={{ minWidth: 0 }}>
                  <p className={e.eyebrow}>{s.eyebrow}</p>
                  <h2 className={e.h2}>{s.title}</h2>
                  {s.body.map((t) => <p key={t} className={e.body} style={{ marginTop: 16 }}>{t}</p>)}
                  <div className={b.meta}>
                    <p><strong>Best for:</strong> {s.bestFor}</p>
                    <p><strong>What we can work on:</strong> {s.workOn}</p>
                  </div>
                </div>
                <div className={b.svcArt}><Art src={s.art} alt={s.artAlt} /></div>
              </div>

              <ul className={`${b.cards} ${cols}`} aria-label={`${svc.name} Black Friday packages`}>
                {s.offers.map((o) => <OfferCard key={o.name} o={o} />)}
              </ul>
              <div className={b.svcFoot}>
                {s.note ? <p className={b.note}>{s.note}</p> : <span />}
                <div className={e.actions}>
                  <a href={CONTACT_HREF} className={`${e.btn} ${e.btnPrimary}`}>{s.cta} <ArrowIcon /></a>
                  <a href={svc.href} className={`${e.btn} ${e.btnSecondary}`}>{s.link}</a>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Help me choose */}
      <div className={b.band}>
        <section id="help-me-choose" className={b.sec}>
          <div className={`${e.container} ${b.center}`}>
            <p className={e.eyebrow}>Start with the problem, not the package</p>
            <h2 className={e.h2} style={{ maxWidth: 820 }}>Not sure which Black Friday marketing package <em className={e.emGreen}>you need?</em></h2>
            <div className={b.chooseLines}>
              <p>If people can&apos;t find your website, SEO might be the best starting point. If potential customers are asking questions on Reddit and nobody from your business is part of those conversations, community marketing could make more sense.</p>
              <p>If you already have an audience but struggle to publish useful content consistently, social media support may be what you need. And if you&apos;re getting traffic but few inquiries or signups, buying more traffic might be the last thing I&apos;d recommend.</p>
            </div>
            <table className={b.table}>
              <thead><tr><th scope="col">If your biggest problem is...</th><th scope="col">Start by looking at</th></tr></thead>
              <tbody>
                {CHOOSER.map(([problem, svc]) => <tr key={svc}><td>{problem}</td><td>{svc}</td></tr>)}
              </tbody>
            </table>
            <p className={e.small} style={{ marginTop: 16 }}>This is guidance, not a substitute for reviewing your business and current results.</p>
            <p className={e.body} style={{ marginTop: 24 }}><strong>Not sure what&apos;s holding you back?</strong> Tell me what you&apos;re working on, what&apos;s happening now, and what you&apos;ve already tried.</p>
            <div className={e.actions} style={{ justifyContent: "center", marginTop: 20 }}>
              <a href={CONTACT_HREF} className={`${e.btn} ${e.btnPrimary}`}>Help me choose a service <ArrowIcon /></a>
            </div>
          </div>
        </section>
      </div>

      {/* Evidence */}
      <section className={b.sec}>
        <div className={`${e.container} ${b.center}`}>
          <p className={e.eyebrow}>Selected work</p>
          <h2 className={e.h2} style={{ maxWidth: 760 }}>Marketing decisions should <em className={e.emGreen}>come with evidence.</em></h2>
          <ul className={b.proof}>
            {PROOF.map((p) => (
              <li key={p.name} className={b.proofCard}>
                <div className={b.proofShot}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.shot} alt={p.alt} loading="lazy" decoding="async" />
                </div>
                <div className={b.proofBody}>
                  <h3 className={e.h3}>{p.name}: {p.result}</h3>
                  <p>{p.body}</p>
                  <p className={e.small}>{p.meta}. <a href={p.href} className={e.link}>Read the case study</a></p>
                </div>
              </li>
            ))}
          </ul>
          <p className={e.small} style={{ marginTop: 16 }}>These are examples of past work, not promises of future results.</p>
          <div className={e.actions} style={{ justifyContent: "center", marginTop: 20 }}>
            <a href="/case-studies" className={`${e.btn} ${e.btnSecondary}`}>See selected work <ArrowIcon /></a>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className={b.sec}>
        <div className={e.container}>
          <div className={b.svcGrid}>
            <div style={{ minWidth: 0 }}>
              <p className={e.eyebrow}>Useful even if you don&apos;t book</p>
              <h2 className={e.h2}>A practical Black Friday marketing <em className={e.emGreen}>checklist for 2026.</em></h2>
              <p className={e.body} style={{ marginTop: 16 }}>A discount won&apos;t help much if people can&apos;t find your offer or don&apos;t understand it when they arrive. Before you start promoting, check these six things.</p>
            </div>
            <div className={b.svcArt}><Art src="BF07-seo-landing-page-checklist.svg" alt="Landing page checklist with title, URL, heading and first sentence ticked" /></div>
          </div>
          <ol className={b.checklist}>
            {CHECKLIST.map(([t, d], i) => (
              <li key={t}>
                <h3><span>{String(i + 1).padStart(2, "0")}</span>{t}</h3>
                <p>{d}</p>
              </li>
            ))}
          </ol>
          <div className={b.svcFoot}>
            <p className={b.note}><strong>Need help preparing your marketing?</strong> I can help you identify what matters most and build a plan around it.</p>
            <a href={CONTACT_HREF} className={`${e.btn} ${e.btnPrimary}`}>Tell me what you&apos;re growing <ArrowIcon /></a>
          </div>
        </div>
      </section>

      {/* What happens next */}
      <div className={b.band}>
        <section className={b.sec}>
          <div className={`${e.container} ${b.center}`}>
            <h2 className={e.h2}>What happens after you <em className={e.emGreen}>choose a package?</em></h2>
            <ol className={b.steps}>
              {STEPS.map(([t, d], i) => (
                <li key={t}>
                  <span className={b.stepNum}>{String(i + 1).padStart(2, "0")}</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </li>
              ))}
            </ol>
            <div className={e.actions} style={{ justifyContent: "center", marginTop: 28 }}>
              <a href={CONTACT_HREF} className={`${e.btn} ${e.btnPrimary}`}>Ask about the Black Friday offer <ArrowIcon /></a>
            </div>
          </div>
        </section>
      </div>

      {/* FAQ */}
      <section className={b.sec}>
        <div className={`${e.container} ${e.faq}`}>
          <div>
            <p className={e.eyebrow}>FAQ</p>
            <h2 className={e.h2}>Black Friday marketing deals: <em className={e.emGreen}>your questions.</em></h2>
          </div>
          <FAQAccordion faqs={FAQS} />
        </div>
      </section>

      {/* Final CTA */}
      <section className={`${b.sec} ${b.last}`}>
        <div className={e.container}>
          <div className={e.cta}>
            <div>
              <h2 className={e.h2}>Start with the right problem. Make the offer count.</h2>
              <p className={e.body} style={{ marginTop: 18 }}>
                You don&apos;t need to spend more on everything. You need a clearer idea of what&apos;s holding your business back and the right work to address it. If you&apos;re considering SEO, Reddit, social media, ads, or growth consulting, tell me a little about your business and I&apos;ll help you work out where to start.
              </p>
              <p className={b.legal}>
                Offer applies to new qualifying engagements booked November 23 to 30, 2026. First month discounts apply across that month&apos;s invoices even when billing is weekly or biweekly. Standard pricing resumes afterward. Custom scopes, availability and starting arrangements are confirmed before booking. Results are not guaranteed.
              </p>
            </div>
            <div className={e.ctaActions}>
              <a href={CONTACT_HREF} className={`${e.btn} ${e.btnLight}`}>Let&apos;s talk about your business <ArrowIcon /></a>
              <a href={PACKAGES} className={`${e.btn} ${e.btnGhostLight}`}>Review the packages again</a>
            </div>
          </div>
        </div>
      </section>
    </EditorialPage>
  );
}
