import { buildMetadata } from "@/lib/seo";
import { ArrowIcon } from "@/app/HomeComponents/icons";
import { FAQAccordion } from "@/app/HomeComponents/FAQAccordion";
import { H1_ACCENT_STYLE, HERO_H1_STYLE } from "@/app/HomeComponents/heading";
import { Art } from "../HomeComponents/Art";
import Work from "../HomeComponents/Work";
import Reviews from "../HomeComponents/Reviews";
import { ComparisonTable, PricingCTA, PricingHeading } from "../_pricing/Pricing";
import { COMPLETE_GROWTH, CONTACT_HREF, ONE_TIME, SERVICES, SERVICE_ORDER, formatPrice, startingPrice, type CompareGroup } from "@/lib/pricing";
import s from "../_pricing/pricing.module.css";

export const metadata = buildMetadata({
  title: "Growth Marketing Pricing | SEO, Reddit, Social, Ads | Zain",
  description:
    "Growth marketing pricing for SEO, Reddit, social media, Google and Meta ads and strategy. Compare packages, see what's included and pick the right fit.",
  path: "/pricing",
});

// What each service is for, side by side. It compares purpose, not volume, because the services do different jobs.
const SERVICE_COMPARE: CompareGroup[] = [
  {
    group: "Strategy",
    rows: [
      { label: "Research before any work starts", values: [true, true, true, true, true] },
      { label: "Monthly priorities", values: [true, true, true, true, true] },
    ],
  },
  {
    group: "Content",
    rows: [
      { label: "Original articles", values: ["Growth and Scale", false, false, false, false] },
      { label: "Social posts and graphics", values: [false, false, true, false, false] },
      { label: "Ad copy and creative testing", values: [false, false, false, true, false] },
    ],
  },
  {
    group: "Community",
    rows: [
      { label: "Posts and comments in communities", values: [false, true, false, false, false] },
      { label: "Community monitoring", values: [false, true, "Social Plus", false, false] },
    ],
  },
  {
    group: "Search",
    rows: [
      { label: "Google rankings work", values: [true, false, false, false, false] },
      { label: "Reddit search visibility", values: [false, "Growth & Visibility", false, false, false] },
    ],
  },
  {
    group: "Advertising",
    rows: [
      { label: "Paid campaigns managed", values: [false, false, false, true, false] },
      { label: "Ad spend included", values: [false, false, false, false, false] },
    ],
  },
  {
    group: "Reporting",
    rows: [{ label: "Monthly report", values: [true, true, true, true, "Integrated plan"] }],
  },
  {
    group: "Consulting",
    rows: [
      { label: "One time options", values: ["Audit", "Research", "Free check", false, "Diagnosis and sprint"] },
      { label: "Cross channel planning", values: [false, false, false, false, true] },
    ],
  },
];

const STEPS = [
  { n: "01", t: "Pick a service or book a call", d: "Choose a package, or tell me what's going on and I'll suggest where to start." },
  { n: "02", t: "Share your goals", d: "Your business, your customers, what you've tried and what's stuck." },
  { n: "03", t: "Confirm the scope", d: "You get the exact work, the price and an onboarding plan before anything starts." },
  { n: "04", t: "Start and review", d: "I do the work and we review progress every month." },
];

const FAQS: [string, string[]][] = [
  ["Are packages customizable?", ["Yes. The packages are starting points. If you need something in between, we agree the scope before we start."]],
  ["Can I start with one service?", ["Yes. Most clients start with one service or a one time option, then add more if it makes sense."]],
  ["What's included in the monthly price?", ["The work listed in your package, planning and reporting. Each service page has a full comparison and a list of what isn't included."]],
  ["Are there extra costs?", ["Only things outside the package, like ad spend or paid tools, and only if you agree to them first."]],
  ["Does ad spend come separately?", ["Yes. You pay Google or Meta directly from your own account. My fee is only for managing it."]],
  ["How do revisions work?", ["Each package says how many rounds of changes are included. Social Media plans list it per content piece."]],
  ["How does billing work?", ["Monthly work is billed weekly or every two weeks. One time services are agreed and billed before they start."]],
  ["Can I cancel?", ["There are no long contracts. Notice terms are agreed in writing before we start, so you know them up front."]],
  ["How quickly can work start?", ["Usually once the scope is confirmed and I have access to what I need. I'll give you a start date before you commit."]],
  ["Will you guarantee results?", ["No. Nobody honest can guarantee rankings, sales or ad returns. You get clear work, clear reports and honest advice about what's working."]],
  ["Who owns the accounts and content?", ["You do. I work inside your accounts, and the content made for you is yours."]],
];

export default function PricingPage() {
  return (
    <main id="top" style={{ overflowX: "clip" }}>
      {/* Hero */}
      <section style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(64px,8vw,112px) clamp(20px,4vw,48px) 0", textAlign: "center" }}>
        <h1 style={{ ...HERO_H1_STYLE, maxWidth: 850, margin: "0 auto" }}>
          Growth marketing pricing. <em style={H1_ACCENT_STYLE}>No guesswork.</em>
        </h1>
        <p style={{ margin: "24px auto 0", maxWidth: 650, fontSize: 18, lineHeight: 1.6, color: "#4E4C48" }}>
          Growth marketing pricing for SEO, Reddit, social media, paid ads and strategy, all public. Compare packages, see exactly what&apos;s included and pick the one that fits.
        </p>
      </section>

      {/* Browse services */}
      <section className={s.section} aria-labelledby="browse-heading">
        <PricingHeading id="browse-heading" eyebrow="Services" regular="Start with the work" accent="you need." intro="Each service has its own packages and a full comparison on its page." />
        <div className={s.grid}>
          {SERVICE_ORDER.map((id) => {
            const svc = SERVICES[id];
            const from = startingPrice(svc);
            const price = formatPrice(from);
            return (
              <article key={id} className={s.card} aria-labelledby={`svc-${id}`}>
                <div className={s.cardLabel} />
                <h3 id={`svc-${id}`} className={s.cardName}>
                  {svc.name}
                </h3>
                <p className={s.cardFor}>{svc.forWho}</p>
                <div className={s.price}>
                  <span className={s.amount}>{from.priceType === "fixed" ? `From ${price.amount}` : price.amount}</span>
                  <span className={s.per}>{price.note}</span>
                </div>
                <p className={s.benefit}>{svc.summary}</p>
                <div />
                <p className={s.notIncluded} />
                <div className={s.cardFoot}>
                  <a href={`${svc.href}#pricing`} className={s.btn}>
                    See {svc.name} packages
                    <ArrowIcon />
                  </a>
                </div>
              </article>
            );
          })}
          <article className={`${s.card} ${s.cardLabeled}`} aria-labelledby="svc-complete">
            <div className={s.cardLabel}>For several channels</div>
            <h3 id="svc-complete" className={s.cardName}>
              Complete Growth
            </h3>
            <p className={s.cardFor}>{COMPLETE_GROWTH.forWho}</p>
            <div className={s.price}>
              <span className={s.amount}>{formatPrice(COMPLETE_GROWTH).amount}</span>
              <span className={s.per}>{formatPrice(COMPLETE_GROWTH).note}</span>
            </div>
            <p className={s.benefit}>{COMPLETE_GROWTH.benefit}</p>
            <div />
            <p className={s.notIncluded} />
            <div className={s.cardFoot}>
              <a href="#complete-growth" className={`${s.btn} ${s.btnDark}`}>
                How Complete Growth works
                <ArrowIcon />
              </a>
            </div>
          </article>
        </div>
      </section>

      {/* Complete Growth */}
      <section id="complete-growth" className={`${s.section} ${s.readable}`} aria-labelledby="complete-heading">
        <PricingHeading
          id="complete-heading"
          eyebrow="Complete Growth"
          regular="One plan across channels,"
          accent="coordinated for you."
          intro="For businesses that want strategy and execution in one place, without hiring a separate person for every channel."
        />
        <Art id="A104" maxWidth={720} style={{ marginBottom: "clamp(24px,3vw,40px)" }} />
        <div className={s.twoCol}>
          <div>
            <h3 className={s.smallHeading}>Who it&apos;s for</h3>
            <ul className={s.list}>
              <li>You need more than one channel working toward the same goal.</li>
              <li>You want one person deciding what matters this month.</li>
              <li>You&apos;d rather not manage several specialists.</li>
            </ul>
            <h3 className={s.smallHeading}>
              How priorities are picked
            </h3>
            <ul className={s.list}>
              <li>We start from your goals and what&apos;s already working.</li>
              <li>We choose up to two active channels at a time.</li>
              <li>Each month we review results and move effort where it pays off.</li>
            </ul>
          </div>
          <div>
            <h3 className={s.smallHeading}>What&apos;s included</h3>
            <ul className={s.list}>
              {COMPLETE_GROWTH.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={s.smallHeading}>How it differs from single services</h3>
            <p className={s.benefit} style={{ marginTop: 0 }}>
              Work is allocated by the strategy, not by package. It isn&apos;t the same as buying every service package at once, and it isn&apos;t unlimited. If one channel needs more for a while, it gets more, and another gets less.
            </p>
            <h3 className={s.smallHeading}>
              Not included
            </h3>
            <ul className={s.list}>
              {SERVICES.growth.excluded.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <p className={s.notIncluded}>
              It starts at ${COMPLETE_GROWTH.price?.toLocaleString("en-US")} a month because it covers strategy, coordination and hands on work across two channels. Bigger scopes are priced after a call.
            </p>
          </div>
        </div>
        <p className={s.helpLine}>
          <a href={CONTACT_HREF} className={s.textLink}>
            Talk about Complete Growth <ArrowIcon />
          </a>
        </p>
      </section>

      {/* Comparison */}
      <section className={s.section} aria-labelledby="compare-heading">
        <PricingHeading id="compare-heading" eyebrow="Compare" regular="What each service" accent="is for." intro="The services do different jobs, so this compares what each one handles, not how much." />
        <ComparisonTable caption="What each service handles" columns={SERVICE_ORDER.map((id) => SERVICES[id].name)} groups={SERVICE_COMPARE} />
      </section>

      {/* One time services */}
      <section className={s.section} aria-labelledby="onetime-heading">
        <PricingHeading id="onetime-heading" eyebrow="One time" regular="Not ready for monthly?" accent="Start here." intro="Fixed scope, fixed price, and a clear next step at the end." />
        <div className={`${s.grid} ${s.gridFive}`}>
          {ONE_TIME.map((o) => (
            <article key={o.name} className={s.otCard} aria-labelledby={`ot-${o.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}>
              <div className={s.otHead}>
                <h3 id={`ot-${o.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`} className={s.otTitle}>
                  {o.name}
                </h3>
              </div>
              <div className={s.otPrice}>
                <span className={s.amount}>{o.price ? `$${o.price.toLocaleString("en-US")}` : "Free"}</span>
                <span className={s.per}>{o.price ? "one time" : "no cost"}</span>
              </div>
              <p className={s.otScope}>{o.scope}</p>
              <p className={s.otNext}>
                <b>Next step:</b> {o.next}
              </p>
              <div className={s.cardFoot}>
                <a href={o.href} className={s.btn}>
                  {o.price ? "See details" : "Get the free check"}
                  <ArrowIcon />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Proof: existing case studies and reviews, unchanged */}
      <Work />
      <Reviews />

      {/* How it works */}
      <section className={s.section} aria-labelledby="how-heading">
        <PricingHeading id="how-heading" eyebrow="How it works" regular="From first message" accent="to first results." />
        <ol className={`${s.grid} ${s.gridFour}`} style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {STEPS.map((st) => (
            <li key={st.n} className={s.card} style={{ gridRow: "auto", gridTemplateRows: "none", textAlign: "center" }}>
              <span className={s.cardLabel}>{st.n}</span>
              <h3 className={s.cardName}>{st.t}</h3>
              <p className={s.cardFor}>{st.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQs */}
      <section className={s.section} aria-labelledby="faq-heading">
        <PricingHeading id="faq-heading" eyebrow="FAQ" regular="Pricing questions," accent="answered." />
        <div style={{ maxWidth: 850, margin: "0 auto" }}>
          <FAQAccordion faqs={FAQS} />
        </div>
      </section>

      {/* Final CTA */}
      <section className={s.section} style={{ paddingBottom: "clamp(64px,7vw,96px)" }}>
        <PricingCTA heading="Not sure where to start?" accent="Tell me what's stuck." text="Send a short message about your business and goals. I'll reply with where I'd start, even if that's the free check." href={CONTACT_HREF} label="Get in touch" />
      </section>
    </main>
  );
}
