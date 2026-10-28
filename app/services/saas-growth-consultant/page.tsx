import { buildMetadata } from "@/lib/seo";
import { ServicePricing } from "@/app/_pricing/Pricing";
import { ILLUSTRATIONS } from "@/lib/illustrations";
import Link from "next/link";
import { ArrowIcon } from "../../HomeComponents/icons";
import { FAQAccordion } from "../../HomeComponents/FAQAccordion";
import { Img } from "../../HomeComponents/Img";
import { EditorialPage, Em, Illustration, SectionHeading, ed as e } from "../../_design/ui";

export const metadata = buildMetadata({
  title: "SaaS Growth Consultant | Fix the Bottleneck First | Zain",
  description:
    "SaaS growth consultant who finds what's actually blocking growth, fixes it first, then scales what works. Go to market plans and $499 audits.",
  path: "/services/saas-growth-consultant",
});

// The first page on the editorial design system (Lora and Figtree, forest and ivory).
// Layout: hero split, proof, problem, the six parts, how I work, evidence, deliverables, pricing, fit, FAQ, CTA.

const PROOF = [
  { v: "100K+", l: "Users brought in", sub: "Across projects" },
  { v: "85K+", l: "For one SaaS", sub: "Blainy, no paid acquisition" },
  { v: "50M+", l: "Search impressions", sub: "Across projects" },
  { v: "3.9M+", l: "Instagram views", sub: "Blainy, 90 days" },
];

const SYMPTOMS = [
  { k: "Positioning", d: "People don't get what you do." },
  { k: "Acquisition", d: "The right people never find you." },
  { k: "Conversion", d: "Visitors come. Nobody signs up." },
  { k: "Activation", d: "Signups never use the product." },
  { k: "Retention", d: "Customers quietly leave." },
  { k: "Distribution", d: "One channel is carrying everything." },
];

const SYMPTOM_QUOTES = [
  { q: "“People like it but don't buy.”", to: "Positioning or offer" },
  { q: "“Traffic comes but nobody signs up.”", to: "Conversion" },
  { q: "“People sign up but disappear.”", to: "Activation" },
  { q: "“Customers leave quickly.”", to: "Retention" },
];

const SIX_PARTS = [
  { n: "01", t: "Positioning", d: "Who it's for, what it replaces and why it's better. If this is fuzzy, every channel underperforms.", tags: "ICP, competitors, differentiation, messaging" },
  { n: "02", t: "Offer", d: "What people get, what it costs and why now.", tags: "Pricing, packaging, free entry points, risk reversal" },
  { n: "03", t: "Acquisition", d: "The channels that bring the right people. Usually one or two, not seven.", tags: "SEO, Reddit, social, paid, partnerships" },
  { n: "04", t: "Conversion", d: "What happens after someone lands. The page, the pitch and the next step.", tags: "Landing pages, CTAs, signup flow, tracking" },
  { n: "05", t: "Activation and retention", d: "Getting signups to actually use the product, then keeping them.", tags: "Onboarding, lifecycle email, segmentation, churn signals" },
  { n: "06", t: "Measurement and prioritization", d: "Knowing which numbers matter and deciding what to fix first.", tags: "KPIs, attribution, experiments, priorities" },
];

const PROCESS_STEPS = [
  { t: "Diagnose", d: "Look at the whole system, from market and ICP to retention and revenue, not just one channel." },
  { t: "Prioritize", d: "Rank every problem by impact, confidence and effort." },
  { t: "Build the plan", d: "Channels, messaging and a 30, 60 and 90 day roadmap." },
  { t: "Execute and test", d: "Do the work, or work alongside your team. Run small and measure honestly." },
  { t: "Learn and scale", d: "Keep what works, cut what doesn't, repeat." },
];

const PRIORITIZE = [
  { t: "Fix now", items: ["High impact.", "High confidence.", "Low enough effort."], tone: "accent" },
  { t: "Test next", items: ["Potentially high impact.", "Still uncertain.", "Needs evidence."], tone: "" },
  { t: "Ignore for now", items: ["Low impact.", "High distraction.", "Not worth the time yet."], tone: "muted" },
];

const LEAVE_WITH = [
  { t: "The diagnosis", items: ["Where growth is breaking and why", "Who your best customers really are", "How clear your positioning is", "What is currently wasting time or budget"] },
  { t: "The plan", items: ["Which channels to focus on", "Which channels to ignore", "Messaging and offer changes", "What should happen first", "A 30, 60 and 90 day direction"] },
  { t: "The system", items: ["Experiments ranked by importance", "KPIs to track", "Funnel fixes in priority order", "What “good” should look like"] },
];

const ROADMAP = [
  { range: "Days 1 to 30", t: "Diagnose and fix the obvious", items: ["Audit everything.", "Fix tracking.", "Clean up messaging.", "Fix the leaks that don't need testing."] },
  { range: "Days 31 to 60", t: "Build and test", items: ["Launch priority channels.", "Run small experiments.", "Measure honestly."] },
  { range: "Days 61 to 90", t: "Scale what works", items: ["Double down on what proved itself.", "Cut what didn't.", "No guilt."] },
];

const FIT_GOOD = ["Your product or service already exists and has customers.", "You have some traction but growth is inconsistent.", "You're running several channels with no clear priority.", "You're launching something new or repositioning.", "The founder still owns too much of the growth work."];
const FIT_BAD = ["You want guaranteed growth.", "You haven't validated the product yet.", "You only want a list of random tactics.", "You would rather not measure anything."];

const FAQS: [string, string[]][] = [
  ["What is GTM?", ["Go-to-market: how a product reaches the people who should buy it. Who it's for, what you say, what it costs, which channels you use and what happens after someone lands."]],
  ["What does a growth strategist actually do?", ["Finds what is actually blocking growth, decides what to fix first, and builds the plan around it. In my case I also do the work: SEO, Reddit, social, content and design."]],
  ["How much does it cost to hire a marketing person?", ["The Growth Diagnosis is $499 one time, and the Growth Strategy Sprint with a full 90 day roadmap is $1,499. Integrated Growth Management, strategy plus hands on work on up to two channels at a time, starts at $4,499 a month. That is one person instead of a strategist and several channel specialists."]],
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

function Shot({ src, alt, dark }: { src: string; alt: string; dark?: boolean }) {
  return (
    <div className={dark ? `${e.shot} ${e.shotDark}` : e.shot}>
      <Img loading="lazy" src={src} alt={alt} />
    </div>
  );
}

function ShotLabel({ name, note }: { name: string; note: string }) {
  return (
    <p className={e.shotLabel}>
      {name}
      <span>{note}</span>
    </p>
  );
}

function Stats({ items, three }: { items: { v: string; l: string }[]; three?: boolean }) {
  return (
    <div className={three ? `${e.stats} ${e.stats3}` : e.stats}>
      {items.map((s) => (
        <div key={s.l} className={e.stat}>
          <div className={e.statValue}>{s.v}</div>
          <div className={e.statSub} style={{ marginTop: 10 }}>{s.l}</div>
        </div>
      ))}
    </div>
  );
}

export default function GrowthStrategyPage() {
  const hero = ILLUSTRATIONS.A03;
  const process = ILLUSTRATIONS.A97;
  return (
    <EditorialPage>
      {/* HERO: editorial split */}
      <section className={e.section} style={{ paddingTop: "clamp(40px,6vw,88px)" }}>
        <div className={`${e.container} ${e.split} ${e.splitWide}`}>
          <div className={e.splitText}>
            <p className={e.eyebrow} style={{ margin: 0 }}>Growth strategy and GTM</p>
            <h1 className={e.h1}>
              SaaS growth consultant who <Em variant="mark">fixes the leak</Em> before buying more water.
            </h1>
            <p className={e.lede}>
              As a SaaS growth consultant, I look at your whole growth system, from positioning to retention, find the one thing actually holding it back, and build the plan around that. Then I help execute it, because a plan nobody runs is just a nice PDF.
            </p>
            <div className={e.actions}>
              <a href="#pricing" className={`${e.btn} ${e.btnPrimary}`}>
                Start with the $499 audit
                <ArrowIcon />
              </a>
              <a href="#work" className={`${e.btn} ${e.btnSecondary}`}>
                See the results
              </a>
            </div>
          </div>
          <Illustration src={hero.src} alt={hero.alt} width={hero.width} height={hero.height} priority />
        </div>
      </section>

      {/* PROOF */}
      <section className={e.section} style={{ paddingTop: "clamp(48px,6vw,72px)" }} aria-label="Results across projects">
        <div className={e.container}>
          <div className={e.stats}>
            {PROOF.map((s) => (
              <div key={s.l} className={e.stat}>
                <div className={e.statValue}>{s.v}</div>
                <div className={e.statLabel}>{s.l}</div>
                <div className={e.statSub}>{s.sub}</div>
              </div>
            ))}
          </div>
          <p className={e.small} style={{ margin: "14px 0 0" }}>Strategy built from doing the work, not just talking about it.</p>
        </div>
      </section>

      {/* PROBLEM: split, symptoms list, then the symptom quotes that used to sit in a separate section */}
      <section className={e.section}>
        <div className={e.container}>
          <div className={e.split} style={{ alignItems: "start" }}>
            <div className={e.splitText}>
              <p className={e.eyebrow} style={{ margin: 0 }}>The problem</p>
              <h2 className={e.h2}>
                More marketing <Em>isn&apos;t a strategy.</Em>
              </h2>
              <p className={e.body}>When growth stalls, the instinct is to add something: another channel, another hire, another agency. It&apos;s usually just a more expensive way to stay stuck.</p>
              <p className={e.body} style={{ color: "var(--ink)" }}>
                If people don&apos;t understand the product, more traffic just means more people leaving confused. The fix depends on where growth is actually stuck, so I check the whole system before recommending anything. If I only looked at SEO, I&apos;d only ever recommend SEO.
              </p>
            </div>
            <ul className={e.rows}>
              {SYMPTOMS.map((s) => (
                <li key={s.k} className={e.row}>
                  <span className={e.rowKey}>{s.k}</span>
                  <span className={e.rowText}>{s.d}</span>
                </li>
              ))}
            </ul>
          </div>
          <ul className={e.quotes}>
            {SYMPTOM_QUOTES.map((s) => (
              <li key={s.q} className={e.quote}>
                <p className={e.quoteText}>{s.q}</p>
                <p className={e.quoteTo}>Look at: {s.to}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SIX PARTS: compact feature grid */}
      <section className={e.section}>
        <div className={e.container}>
          <SectionHeading split eyebrow="What growth involves" title={<>Growth has six parts.</>} intro="A weak one drags down the other five. The diagnosis looks at all six before deciding where to start." />
          <ul className={`${e.features} ${e.features3}`}>
            {SIX_PARTS.map((p) => (
              <li key={p.n} className={e.feature}>
                <span className={e.featureNum}>{p.n}</span>
                <h3 className={e.h3}>{p.t}</h3>
                <p className={e.featureText}>{p.d}</p>
                <p className={e.featureMeta}>{p.tags}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* HOW I WORK: one illustrated process, then how priorities are set */}
      <section className={e.band}>
        <div className={e.container}>
          <SectionHeading eyebrow="How I work" title={<>Five steps. <Em>No strategy that dies in a folder.</Em></>} />
          <div className={e.split}>
            <ol className={e.steps}>
              {PROCESS_STEPS.map((s, i) => (
                <li key={s.t} className={e.step}>
                  <span className={e.stepNum}>{i + 1}</span>
                  <h3 className={e.h3}>{s.t}</h3>
                  <p className={e.stepText}>{s.d}</p>
                </li>
              ))}
            </ol>
            <Illustration src={process.src} alt={process.alt} width={process.width} height={process.height} />
          </div>

          <div style={{ marginTop: "clamp(56px,7vw,88px)" }}>
            <SectionHeading split title={<>Fix now. Test next. Ignore for now.</>} intro="Every idea gets three questions: how much impact it could have, how confident we are, and how much effort it takes." />
            <div className={e.columns}>
              {PRIORITIZE.map((c) => (
                <div key={c.t} className={`${e.column} ${c.tone === "accent" ? e.columnAccent : c.tone === "muted" ? e.columnMuted : ""}`}>
                  <h3 className={e.h3display} style={c.tone === "accent" ? { color: "#fff" } : undefined}>{c.t}</h3>
                  <ul className={e.list} style={{ marginTop: 16 }}>
                    {c.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WORK: evidence features */}
      <section id="work" className={e.section} style={{ scrollMarginTop: 96 }}>
        <div className={e.container}>
          <SectionHeading split eyebrow="Selected growth work" title={<>Growth work that had to <Em>earn its place.</Em></>} intro="Every number below comes from a real screenshot." />

          {/* Blainy */}
          <article className={e.evidence}>
            <div className={e.evidenceHead}>
              <div>
                <div className={e.evidenceMeta}>
                  <Img loading="lazy" src="/assets/site/logo-blainy.png" alt="Blainy logo" className={e.logo} style={{ height: 32 }} />
                  <span>AI SaaS · Multi channel growth and GTM</span>
                </div>
                <h3 className={e.h2} style={{ fontSize: "clamp(1.75rem,2.6vw,2.5rem)" }}>Zero to 85K+ users. No paid acquisition.</h3>
              </div>
              <dl className={e.facts}>
                <div className={e.fact}>
                  <dt className={e.factLabel}>Problem</dt>
                  <dd className={e.factText} style={{ marginLeft: 0 }}>Blainy needed users without an ad budget.</dd>
                </div>
                <div className={e.fact}>
                  <dt className={e.factLabel}>Constraint</dt>
                  <dd className={e.factText} style={{ marginLeft: 0 }}>No budget for paid acquisition meant every channel had to feed the others instead of competing for attention.</dd>
                </div>
                <div className={e.fact}>
                  <dt className={e.factLabel}>Channels</dt>
                  <dd className={e.factText} style={{ marginLeft: 0 }}>SEO, Reddit, social, content, lifecycle, partnerships and retargeting, feeding one growth engine.</dd>
                </div>
              </dl>
            </div>
            <Stats items={[{ v: "85K+", l: "users" }, { v: "~30M", l: "search impressions" }, { v: "3.9M+", l: "Instagram views, 90 days" }, { v: "6,089", l: "tracked Reddit clicks, $0 on ads" }]} />
            <div className={e.shots}>
              <div className={e.shotGroup}>
                <ShotLabel name="Search" note="Google Search Console" />
                <Shot src="/assets/site/blainy-gsc-full.jpg" alt="Blainy Google Search Console: 297K clicks, 25.3M impressions" />
              </div>
            </div>
            <div className={`${e.shots} ${e.shots2}`}>
              <div className={e.shotGroup}>
                <ShotLabel name="Instagram" note="3.9M+ views, last 90 days" />
                <Shot src="/assets/pages/growth-strategy/07-results-blainy__instagram-90-days.webp" alt="Blainy Instagram, last 90 days: 3,952,443 views, 2,139,992 accounts reached" />
                <Shot src="/assets/pages/growth-strategy/07-results-blainy__instagram-top-reels.webp" alt="Blainy Instagram top reels: 53.9K, 24.9K, 21.8K views" />
              </div>
              <div className={e.shotGroup}>
                <ShotLabel name="Threads" note="338K views" />
                <Shot src="/assets/pages/growth-strategy/07-results-blainy__threads-338k-views.png" alt="Blainy Threads insights: 338K views, 11.9K interactions" />
                <Shot src="/assets/pages/growth-strategy/07-results-blainy__threads-post.png" alt="Blainy Threads post, PhD student survival guide: 306 likes, 21 reposts" />
              </div>
            </div>
            <div className={e.shots}>
              <ShotLabel name="Pinterest" note="479K impressions, last 90 days" />
            </div>
            <div className={`${e.shots} ${e.shots2}`} style={{ marginTop: 12 }}>
              <Shot src="/assets/pages/growth-strategy/07-results-blainy__pinterest-90-days.png" alt="Blainy Pinterest, last 90 days: 479k impressions, up 410%" />
              <Shot src="/assets/pages/growth-strategy/07-results-blainy__pinterest-top-pin.webp" alt="Blainy top Pinterest video pin: 225.75k impressions, 8.41k pin clicks" />
            </div>
          </article>

          {/* Everdry */}
          <article className={e.evidence}>
            <div className={e.evidenceHead}>
              <div>
                <div className={e.evidenceMeta}>
                  <Img loading="lazy" src="/assets/v8/logo-everdry.gif" alt="Everdry Waterproofing logo" className={e.logo} style={{ height: 44, mixBlendMode: "multiply" }} />
                  <span>Home services · Local growth</span>
                </div>
                <h3 className={e.h2} style={{ fontSize: "clamp(1.75rem,2.6vw,2.5rem)" }}>A local service business with a page nobody was running.</h3>
              </div>
              <dl className={e.facts}>
                <div className={e.fact}>
                  <dt className={e.factLabel}>Problem</dt>
                  <dd className={e.factText} style={{ marginLeft: 0 }}>The person running their Facebook page had left. Nobody was posting, and nobody was seeing it.</dd>
                </div>
                <div className={e.fact}>
                  <dt className={e.factLabel}>What changed</dt>
                  <dd className={e.factText} style={{ marginLeft: 0 }}>Before and afters, myth busting posts, real reviews and steady Facebook growth.</dd>
                </div>
              </dl>
            </div>
            <Stats three items={[{ v: "160,235", l: "Facebook views, 28 days" }, { v: "40,153", l: "people reached, same 28 days" }, { v: "141,889", l: "views, an earlier 28 days" }]} />
            <div className={`${e.shots} ${e.shots2}`}>
              <div className={e.shotGroup}>
                <ShotLabel name="Facebook" note="Last 28 days" />
                <Shot src="/assets/pages/growth-strategy/07-results-everdry__facebook-160k-views.webp" alt="Everdry Facebook dashboard, last 28 days: 160,235 views" />
                <ShotLabel name="The content behind it" note="" />
                <Shot src="/assets/pages/growth-strategy/07-results-everdry__post-graphics-grid.webp" alt="Grid of Everdry post graphics: client feedback, education and service posts" />
              </div>
              <div className={e.shotGroup}>
                <ShotLabel name="Facebook" note="Earlier 28 day windows" />
                <Shot src="/assets/case-studies/everdry/facebook-141k-views.webp" alt="Everdry Facebook professional dashboard: 141,889 views and 36,284 reach in 28 days" />
                <Shot src="/assets/case-studies/everdry/facebook-50k-views-early.webp" alt="Everdry Facebook professional dashboard early on: 50,881 views and 17,292 reach in 28 days" />
              </div>
            </div>
          </article>

          {/* Virtarix */}
          <article className={e.evidence}>
            <div className={e.evidenceHead}>
              <div>
                <div className={e.evidenceMeta}>
                  <Img loading="lazy" src="/assets/v8/logos/virtarix.png" alt="Virtarix logo" className={e.logo} style={{ height: 26 }} />
                  <span>AI and tech · Content · Reddit · Pinterest</span>
                </div>
                <h3 className={e.h2} style={{ fontSize: "clamp(1.75rem,2.6vw,2.5rem)" }}>Technical expertise. Almost no distribution.</h3>
              </div>
              <dl className={e.facts}>
                <div className={e.fact}>
                  <dt className={e.factLabel}>What changed</dt>
                  <dd className={e.factText} style={{ marginLeft: 0 }}>Technical guides, visual social content, Pinterest from zero and Reddit community work.</dd>
                </div>
              </dl>
            </div>
            <Stats three items={[{ v: "71,459", l: "Facebook views, 4 Oct to 23 Jan" }, { v: "1.2K+", l: "monthly Pinterest visits, from zero" }, { v: "34K", l: "Facebook views in December" }]} />
            <div className={`${e.shots} ${e.shots2}`}>
              <div className={e.shotGroup}>
                <ShotLabel name="Facebook" note="4 Oct to 23 Jan" />
                <Shot dark src="/assets/v8/vx-70k.webp" alt="Virtarix Facebook insights, 4 Oct to 23 Jan: 71,459 views, 3,395 interactions" />
              </div>
              <div className={e.shotGroup}>
                <ShotLabel name="Reddit and AI discovery" note="Reddit Answers recommending Virtarix" />
                <Shot src="/assets/v7/virtarix-reddit-good.jpg" alt="Reddit Answers for 'good vps' listing Virtarix" />
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* DELIVERABLES AND ROADMAP */}
      <section className={e.band}>
        <div className={e.container}>
          <SectionHeading split eyebrow="Deliverables" title={<>Strategy you can <Em>actually use.</Em></>} intro="Not a 60 slide deck. A plan with an order to it." />
          <div className={e.columns}>
            {LEAVE_WITH.map((c) => (
              <div key={c.t} className={e.column}>
                <h3 className={e.h3display}>{c.t}</h3>
                <ul className={e.list} style={{ marginTop: 16 }}>
                  {c.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "clamp(56px,7vw,88px)" }}>
            <SectionHeading title="What the first 90 days usually look like." />
            <div className={e.columns}>
              {ROADMAP.map((r, i) => (
                <div key={r.range} className={`${e.column} ${i === 2 ? e.columnAccent : ""}`}>
                  <span className={e.columnTag}>{r.range}</span>
                  <h3 className={e.h3display} style={i === 2 ? { color: "#fff" } : undefined}>{r.t}</h3>
                  <ul className={e.list} style={{ marginTop: 16 }}>
                    {r.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING (shared component, picks up the page fonts) */}
      <ServicePricing service="growth" />

      {/* FIT */}
      <section className={e.section}>
        <div className={e.container}>
          <SectionHeading eyebrow="Who it's for" title="Growth strategy works best when you already have something to grow." />
          <div className={e.fit}>
            <div>
              <h3 className={e.fitLabel}>Good fit</h3>
              <ul className={`${e.list} ${e.listCheck}`}>
                {FIT_GOOD.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={e.fitLabel}>Not the right fit</h3>
              <ul className={`${e.list} ${e.listDash}`}>
                {FIT_BAD.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className={e.section}>
        <div className={`${e.container} ${e.faq}`}>
          <div className={e.headText}>
            <p className={e.eyebrow} style={{ margin: 0 }}>FAQ</p>
            <h2 className={e.h2}>Growth questions, answered straight.</h2>
          </div>
          <FAQAccordion faqs={FAQS} />
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className={e.section}>
        <div className={e.container}>
          <div className={e.cta}>
            <div className={e.headText}>
              <h2 className={e.h2}>Not sure what&apos;s holding growth back? That&apos;s exactly where I start.</h2>
              <p className={e.body}>Tell me what you&apos;re growing, what&apos;s happening now and what you&apos;ve already tried. I&apos;ll look at the system and tell you where I&apos;d start first.</p>
            </div>
            <div className={e.ctaActions}>
              <a href="#pricing" className={`${e.btn} ${e.btnLight}`} style={{ justifyContent: "space-between" }}>
                Start with the $499 audit
                <ArrowIcon size={16} />
              </a>
              <Link href="/#contact" className={`${e.btn} ${e.btnGhostLight}`}>
                Tell me what&apos;s stuck
              </Link>
              <a href="mailto:hello@zainameen.com" className={`${e.btn} ${e.btnGhostLight}`}>
                Email me
              </a>
              <p className={e.ctaNote}>I usually reply within a couple of hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className={`${e.section} ${e.sectionLast}`}>
        <div className={e.container}>
          <p className={e.eyebrow}>Where the strategy gets executed</p>
          <ul className={e.related}>
            {RELATED.map((r) => (
              <li key={r.t}>
                <Link href={r.href} className={e.relatedLink}>
                  <span className={e.relatedName}>
                    {r.t}
                    <ArrowIcon />
                  </span>
                  <span className={e.relatedText}>{r.d}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </EditorialPage>
  );
}
