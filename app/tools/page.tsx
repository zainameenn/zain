import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { H1_ACCENT_STYLE, HERO_H1_STYLE } from "@/app/HomeComponents/heading";
import { JsonLd, breadcrumbList } from "@/app/blog/_components/JsonLd";
import { SITE_URL } from "@/lib/markdown";
import { buildMetadata } from "@/lib/seo";
import { HUB_CARDS, HUB_CATEGORIES, hubImage } from "@/lib/tools/hub";
import { LINK_SEO_SERVICE } from "@/lib/tools/links";
import { ALL_TOOLS, TOOLS, toolPath } from "@/lib/tools/registry";
import { Crumbs } from "./_components/content";
import { ALIASES, AUDIENCES, FAQS, FEATURED, GROUP_COPY, GUIDE, KINDS, WORKFLOWS } from "./_hub/copy";
import { Directory, ToolCard, type DirectoryGroup, type DirectoryTool } from "./_hub/Directory";
import d from "./_hub/directory.module.css";
import h from "./_hub/hub.module.css";
import { bodyFont, displayFont } from "@/app/_design/fonts";
import s from "./_studio/studio.module.css";

// The /tools directory (November 1, 2026 package): a search-first hero, six featured live tools, the full
// directory with filters, then short task workflows and guides. Everything is built from the tool registry,
// so a card, link or count only ever shows a tool that is live; tools still being built are labelled.

const TITLE = "Free Marketing Tools for SEO & Social Media | Zainameen";
const DESCRIPTION = "Explore free SEO, social media and ecommerce tools. Write captions, improve website pages, plan content and build better listings. Start without signing up.";

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: "/tools" });

const ART = "/assets/tools/directory";
const live = (slug: string) => Boolean(TOOLS[slug]);
const name = (slug: string) => TOOLS[slug]?.name ?? slug;
const card = (slug: string): DirectoryTool => ({ slug, href: toolPath(slug), name: TOOLS[slug].name, image: hubImage(slug), aliases: ALIASES[slug], ...HUB_CARDS[slug] });

// The same profiles the site footer links to (app/HomeComponents/Footer.tsx).
const SOCIALS = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/zain-ameen/" },
  { name: "X", href: "https://x.com/zainnameen" },
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61560222560607" },
  { name: "Instagram", href: "https://www.instagram.com/zainn.ms/" },
];

function Head({ eyebrow, heading, accent, intro, id }: { eyebrow: string; heading: string; accent?: string; intro?: ReactNode; id?: string }) {
  return (
    <header className={`${s.sectionHead} ${s.sectionHeadCenter}`}>
      <div>
        <p className={s.kicker}>{eyebrow}</p>
        <h2 className={s.h2} id={id}>
          {heading}
          {accent ? <em className={s.h2Accent}> {accent}</em> : null}
        </h2>
      </div>
      {intro ? <p className={s.intro}>{intro}</p> : null}
    </header>
  );
}

const Art = ({ file, alt, eager, max }: { file: string; alt: string; eager?: boolean; max?: number }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img className={d.art} style={max ? { maxWidth: max } : undefined} src={`${ART}/${file}.svg`} alt={alt} width={1600} height={960} loading={eager ? "eager" : "lazy"} decoding="async" fetchPriority={eager ? "high" : undefined} />
);

const ToolLink = ({ slug }: { slug: string }) => (live(slug) ? <Link href={toolPath(slug)}>{name(slug)}</Link> : null);

export default function ToolsHub() {
  const groups: DirectoryGroup[] = HUB_CATEGORIES.map((c) => ({
    ...c,
    tools: ALL_TOOLS.filter((t) => t.group === c.group && HUB_CARDS[t.slug]).map((t) => (t.linked ? card(t.slug) : { slug: t.slug, href: "", name: t.name, image: hubImage(t.slug), aliases: ALIASES[t.slug], ...HUB_CARDS[t.slug] })),
  })).filter((g) => g.tools.length);
  const featured = FEATURED.filter((f) => live(f.slug)).map((f) => ({ ...card(f.slug), description: f.text, cta: f.cta }));
  const groupFor = (slug: string) => HUB_CATEGORIES.find((c) => c.group === TOOLS[slug]?.group)?.label ?? "";

  return (
    <main className={`${s.page} ${s.edFonts} ${displayFont.variable} ${bodyFont.variable}`}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbList([
              { name: "Home", url: `${SITE_URL}/` },
              { name: "Free Tools", url: `${SITE_URL}/tools` },
            ]),
            {
              "@type": "CollectionPage",
              name: TITLE,
              description: DESCRIPTION,
              url: `${SITE_URL}/tools`,
              mainEntity: {
                "@type": "ItemList",
                itemListElement: groups.flatMap((g) => g.tools).filter((t) => t.href).map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, url: `${SITE_URL}${t.href}` })),
              },
            },
          ],
        }}
      />

      {/* 1 and 2: breadcrumb and a search-first hero */}
      <div className={s.wrap}>
        <Crumbs items={[{ name: "Home", href: "/" }, { name: "Free Tools" }]} />
        <section className={d.hero}>
          <div className={d.heroText}>
            <p className={s.kicker}>Free tools. Real marketing tasks.</p>
            <h1 style={HERO_H1_STYLE} className={d.h1}>
              Free <em style={H1_ACCENT_STYLE}>Marketing Tools</em> for SEO, Social Media &amp; More
            </h1>
            <p className={s.lede}>Free marketing tools for the jobs on your list: finding keywords, improving a web page, writing a caption, or getting a product listing ready.</p>
            <p className={d.heroCopy}>Pick what you&apos;re working on, open the right tool, and get something useful without starting from scratch. Some tools help you write. Others help you check, organize, or improve what you&apos;ve already made.</p>
            <form action="/tools#all-tools" method="get" className={d.heroSearch} role="search">
              <label htmlFor="hero-search" className={h.srOnly}>
                Search a tool or task
              </label>
              <input id="hero-search" name="q" type="search" placeholder="Search a tool or task... Try: SEO title, Instagram bio, Etsy" autoComplete="off" />
              <button type="submit" className={`${s.btn} ${s.btnPrimary}`}>
                Search
              </button>
            </form>
            <ul className={d.heroChips} aria-label="Popular categories">
              {groups.map((g) => (
                <li key={g.id}>
                  <Link href={`/tools?cat=${g.id}#all-tools`}>{g.label}</Link>
                </li>
              ))}
            </ul>
            <p className={d.trust}>Free to start · No account needed for current public tools · Copy and edit results · Fair use limits apply</p>
            <p className={d.note}>Looking for live keyword volumes or rankings? Some data tools are still in development. Working tools and upcoming tools are labeled separately.</p>
          </div>
          <div className={d.heroArt}>
            <Art file="01-directory-hero" eager alt="Illustration of a marketing tool search bar and cards for SEO, social media, ecommerce and understanding tool results." />
          </div>
        </section>
      </div>

      {/* 3: six featured live tools */}
      {featured.length ? (
        <section className={`${s.band} ${s.bandWarm}`} aria-labelledby="featured-h">
          <div className={s.wrap}>
            <Head id="featured-h" eyebrow="A good place to start" heading="Popular tasks," accent="without the extra tabs" intro="Not sure where to begin? These tools cover the work people come back to most often." />
            <ul className={d.featured}>
              {featured.map((t) => (
                <li key={t.slug}>
                  <ToolCard tool={t} featured category={groupFor(t.slug)} />
                </li>
              ))}
            </ul>
            <Art file="02-tool-finder" max={1200} alt="Four task choices: write a social bio, improve a webpage, sell a product online, or plan marketing work." />
          </div>
        </section>
      ) : null}

      {/* 4: the full directory */}
      <section className={s.band} aria-labelledby="directory-h">
        <div className={s.wrap}>
          <Head id="directory-h" eyebrow="The full toolbox" heading="Find the tool that" accent="matches your task" intro="You don't need to know the technical name. Search for what you want to do, or choose a category below." />
          <Directory groups={groups} />
        </div>
      </section>

      {/* Category guides: short, crawlable starting points per category */}
      <section className={`${s.band} ${s.bandWarm}`} aria-labelledby="categories-h">
        <div className={s.wrap}>
          <Head id="categories-h" eyebrow="By category" heading="Where to start in" accent="each category" />
          <div className={d.catGuides}>
            {Object.entries(GROUP_COPY).map(([id, g]) => {
              const picks = g.picks.filter(([slug]) => live(slug));
              return picks.length ? (
                <section key={id} className={d.catGuide} aria-labelledby={`guide-${id}`}>
                  <h3 id={`guide-${id}`} className={s.h3}>{g.heading}</h3>
                  <p className={s.body}>{g.intro}</p>
                  <ul className={d.pickList}>
                    {picks.map(([slug, text]) => (
                      <li key={slug}>
                        <Link href={toolPath(slug)}>{name(slug)}</Link>: {text}
                      </li>
                    ))}
                  </ul>
                  {g.note ? <p className={d.small}>{g.note}</p> : null}
                  <a className={d.more} href={`/tools?cat=${id}#all-tools`}>
                    See all {HUB_CATEGORIES.find((c) => c.id === id)?.label} tools <span aria-hidden="true">→</span>
                  </a>
                </section>
              ) : null;
            })}
          </div>
        </div>
      </section>

      {/* 5: four connected workflows */}
      <section className={s.band} aria-labelledby="workflows-h">
        <div className={s.wrap}>
          <Head id="workflows-h" eyebrow="Start with the job, not the jargon" heading="Four small workflows that" accent="actually make sense" />
          <Art file="03-marketing-workflows" max={1200} alt="Diagram connecting keyword mapping, SEO title writing, website auditing and measuring results." />
          <ol className={d.workflows}>
            {WORKFLOWS.map((w, i) => (
              <li key={w.title} className={d.workflow}>
                <div>
                  <span className={d.num}>{i + 1}</span>
                  <h3 className={s.h3}>{w.title}</h3>
                  <p className={d.path}>
                    {w.steps.filter(live).map((slug, j) => (
                      <span key={slug}>
                        <b>{["Start with", "Then", "Next"][j]}:</b> <ToolLink slug={slug} />
                      </span>
                    ))}
                  </p>
                  <p className={s.body}>{w.text}</p>
                  {live(w.cta[1]) ? (
                    <Link href={toolPath(w.cta[1])} className={`${s.btn} ${s.btnPrimary} ${d.wfBtn}`}>
                      {w.cta[0]}
                    </Link>
                  ) : null}
                </div>
                {w.fig ? <Art file={w.fig.name} alt={w.fig.alt} max={1150} /> : null}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6: AI writing vs checks vs measured data */}
      <section className={`${s.band} ${s.bandWarm}`} aria-labelledby="kinds-h">
        <div className={s.wrap}>
          <Head
            id="kinds-h"
            eyebrow="Good to know"
            heading="Free SEO tools, AI generators and utilities"
            accent="aren't all the same"
            intro="A writing generator uses the information you provide to make a draft. A checker tests something specific. A keyword data tool needs a real search data source. Mixing those up can give you confident looking numbers that aren't real."
          />
          <ul className={d.kinds}>
            {KINDS.map((k) => (
              <li key={k.tag} className={d.kind}>
                <span className={d.kindTag}>{k.tag}</span>
                <h3 className={s.h3}>{k.title}</h3>
                {k.text.map((p) => (
                  <p key={p.slice(0, 30)} className={s.body}>{p}</p>
                ))}
              </li>
            ))}
          </ul>
          <Art file="06-know-your-output" max={1180} alt="Three columns distinguishing AI writing suggestions, technical site checks, and sourced search data." />
        </div>
      </section>

      {/* 7: beginner SEO guide */}
      <section className={s.band} aria-labelledby="guide-h">
        <div className={s.wrap}>
          <Head id="guide-h" eyebrow="The basics, without the overwhelm" heading="How to use free SEO tools when" accent="you're starting from zero" intro="You don't need a huge SEO stack to make progress. Start with a few checks you can understand and repeat." />
          <div className={d.guide}>
            <ol className={d.guideSteps}>
              {GUIDE.map(([t, p], i) => (
                <li key={t}>
                  <h3 className={s.h3}>
                    <span className={d.num}>{i + 1}</span> {t}
                  </h3>
                  <p className={s.body}>{p}</p>
                </li>
              ))}
            </ol>
            <div>
              <Art file="07-audit-priorities" alt="Example website audit issue list showing priority for blocked pages, broken links, missing descriptions and minor wording changes." />
              <p style={{ textAlign: "center", marginTop: 20 }}>
                <Link href="/tools?cat=seo-planning#all-tools" className={`${s.btn} ${s.btnPrimary}`}>
                  Explore available SEO tools
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8: who it is for */}
      <section className={`${s.band} ${s.bandWarm}`} aria-labelledby="who-h">
        <div className={s.wrap}>
          <Head id="who-h" eyebrow="Built for real work" heading="Pick a starting point that" accent="fits what you do" />
          <ul className={d.audiences}>
            {AUDIENCES.map((a) => (
              <li key={a.who} className={d.audience}>
                <h3 className={s.h3}>{a.who}</h3>
                <p className={s.body}>{a.text}</p>
                <p className={d.small}>
                  Start with:{" "}
                  {a.tools.filter(live).map((slug, i, all) => (
                    <span key={slug}>
                      <ToolLink slug={slug} />
                      {i < all.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ul>
          <Art file="08-use-case-map" max={1160} alt="Four user groups, seller, creator, founder and marketer, each connected to an appropriate starting tool." />
        </div>
      </section>

      {/* 9: how it works */}
      <section className={s.band} aria-labelledby="how-h">
        <div className={s.wrap}>
          <Head id="how-h" eyebrow="Three steps" heading="Pick it. Use it." accent="Make it yours." />
          <ol className={s.steps}>
            {[
              { t: "Find your task", d: "Search the directory or choose a category. Every card tells you what the tool is built to do." },
              { t: "Give it useful context", d: "Some tools ask a couple of questions. Others need a URL, a keyword list, or product details. Optional fields can help make results more relevant." },
              { t: "Review before you use it", d: "Edit the draft, check factual details, copy or export your result, and make the final decision yourself." },
            ].map((step, i) => (
              <li key={step.t} className={s.step}>
                <span className={`${s.stepNum} ${displayFont.className}`}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={s.h3}>{step.t}</h3>
                <p className={s.body}>{step.d}</p>
              </li>
            ))}
          </ol>
          <p className={d.small} style={{ textAlign: "center", marginTop: 24 }}>Free to use. Fair use limits help keep these tools available for everyone. No account is required for the public tools currently on the site.</p>
        </div>
      </section>

      {/* 10: FAQ, all in the server HTML */}
      <section className={`${s.band} ${s.bandWarm}`} aria-labelledby="faq-h">
        <div className={s.wrap}>
          <Head id="faq-h" eyebrow="Common questions" heading="Frequently asked questions about" accent="free marketing tools" />
          <div className={s.faq}>
            {FAQS.map(([q, a]) => (
              <details key={q}>
                <summary>
                  <h3 className={s.faqQ}>{q}</h3>
                  <span className={s.faqIcon} aria-hidden />
                </summary>
                <p className={s.faqA}>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 11: soft service CTA and social links */}
      <div className={`${s.wrap} ${h.ctaWrap}`}>
        <section className={s.cta}>
          <p className={s.kicker} style={{ color: "#b9cbb8" }}>One more thing</p>
          <h2 className={s.ctaHeading}>
            Tools make the work easier.
            <em className={s.h2Accent}> A good plan makes it worthwhile.</em>
          </h2>
          <p className={s.ctaCopy}>
            These tools can help you move faster. But which page to improve, what to publish, and how to turn attention into customers still takes some thought. I share practical lessons about SEO, Reddit, social media, and growing businesses without making everything more complicated than it needs to be.
          </p>
          <div className={h.ctaActions}>
            <Link href={LINK_SEO_SERVICE ?? "/services"} className={`${s.btn} ${s.btnLight} ${s.btnLg}`}>
              Explore my SEO services
            </Link>
            <a href="#all-tools" className={h.ctaLink}>
              Browse free tools again
            </a>
          </div>
          <div className={d.social}>
            <p className={d.socialHead}>Follow along for practical marketing ideas</p>
            <p className={d.socialCopy}>Tips, experiments, and lessons from work on real websites and campaigns.</p>
            <ul>
              {SOCIALS.map((x) => (
                <li key={x.name}>
                  <a href={x.href} target="_blank" rel="noopener noreferrer">
                    {x.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
