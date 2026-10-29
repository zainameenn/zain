import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { H1_ACCENT_STYLE, HERO_H1_STYLE } from "@/app/HomeComponents/heading";
import { JsonLd, breadcrumbList } from "@/app/blog/_components/JsonLd";
import { SITE_URL } from "@/lib/markdown";
import { buildMetadata } from "@/lib/seo";
import { ILLUSTRATIONS } from "@/lib/illustrations";
import { HUB_META } from "@/lib/tools/meta";
import { HERO_TOOL, HUB_CARDS, HUB_CATEGORIES, choosers, helps, hubFaqs, hubImage, startPicks, toolKinds, type HelpExample } from "@/lib/tools/hub";
import { LINK_CONTACT, LINK_SERVICES } from "@/lib/tools/links";
import { ALL_TOOLS, TOOLS, toolPath } from "@/lib/tools/registry";
import { Crumbs, rich } from "./_components/content";
import { Directory, ToolCard, type DirectoryGroup, type DirectoryTool } from "./_hub/Directory";
import h from "./_hub/hub.module.css";
import { bodyFont, displayFont } from "@/app/_design/fonts";
import s from "./_studio/studio.module.css";

// The /tools hub: hero with one featured tool, starting points, the full directory with search,
// then short guides that point to the right tool. Built from lib/tools/hub.ts, so only live tools ever appear.

const TITLE = HUB_META.title;
const DESCRIPTION = HUB_META.description;

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: "/tools" });

const card = (slug: string): DirectoryTool => ({ slug, href: toolPath(slug), name: TOOLS[slug].name, image: hubImage(slug), ...HUB_CARDS[slug] });

function Head({ eyebrow, heading, accent, intro }: { eyebrow: string; heading: string; accent?: string; intro?: ReactNode }) {
  return (
    <header className={`${s.sectionHead} ${s.sectionHeadCenter}`}>
      <div>
        <p className={s.kicker}>{eyebrow}</p>
        <h2 className={s.h2}>
          {heading}
          {accent ? <em className={s.h2Accent}> {accent}</em> : null}
        </h2>
      </div>
      {intro ? <p className={s.intro}>{intro}</p> : null}
    </header>
  );
}

const Arrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

function Example({ example }: { example: HelpExample }) {
  if (example.kind === "bio") return <p className={h.exBio}>{example.text}</p>;
  if (example.kind === "serp")
    return (
      <div className={h.exSerp}>
        <span className={h.exUrl}>{example.url}</span>
        <span className={h.exTitle}>{example.title}</span>
        <span className={h.exDesc}>{example.text}</span>
      </div>
    );
  if (example.kind === "plan")
    return (
      <ol className={h.exPlan}>
        {example.weeks.map((w) => (
          <li key={w}>{w}</li>
        ))}
      </ol>
    );
  return (
    <p className={h.exUtm}>
      {example.base}
      {example.params.map(([k, v], i) => (
        <span key={k}>
          {i ? "&" : "?"}
          <b>{k}</b>={v}
        </span>
      ))}
    </p>
  );
}

const ToolLinks = ({ slugs, dark }: { slugs: string[]; dark?: boolean }) => (
  <ul className={dark ? `${h.links} ${h.linksDark}` : h.links}>
    {slugs.map((slug) => (
      <li key={slug}>
        <Link href={toolPath(slug)}>
          {TOOLS[slug].name}
          <Arrow />
        </Link>
      </li>
    ))}
  </ul>
);

export default function ToolsHub() {
  const groups: DirectoryGroup[] = HUB_CATEGORIES.map((c) => ({ ...c, tools: ALL_TOOLS.filter((t) => t.group === c.group && HUB_CARDS[t.slug]).map((t) => (t.linked ? card(t.slug) : { slug: t.slug, href: "", name: t.name, image: hubImage(t.slug), ...HUB_CARDS[t.slug] })) })).filter((g) => g.tools.length);
  const all = groups.flatMap((g) => g.tools);
  const hero = TOOLS[HERO_TOOL.slug] ? card(HERO_TOOL.slug) : null;
  const picks = startPicks().map(card);
  const choose = choosers();
  const help = helps();
  const kinds = toolKinds();
  const faqs = hubFaqs();
  // Sections after the directory alternate warm white and cream bands.
  let band = 0;
  const bandClass = () => (band++ % 2 === 0 ? `${s.band} ${s.bandWarm}` : s.band);

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
                itemListElement: all.filter((t) => t.href).map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, url: `${SITE_URL}${t.href}` })),
              },
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
            },
          ],
        }}
      />

      <div className={s.wrap}>
        <Crumbs items={[{ name: "Home", href: "/" }, { name: "Free Tools" }]} />
        <header className={s.hero}>
          <h1 style={HERO_H1_STYLE}>
            Free <em style={H1_ACCENT_STYLE}>Marketing Tools</em> for Social Media, SEO &amp; More
          </h1>
          <p className={s.lede}>
            These free marketing tools help you create better social media bios, write captions, improve your SEO, and plan your marketing without starting from scratch.
          </p>
          <p className={s.sub}>Pick a free tool, add a few details, and get something useful in minutes.</p>
        </header>

        {hero ? (
          <section className={h.feature} aria-labelledby="featured-tool">
            <div className={h.featureText}>
              <p className={s.kicker}>Featured tool</p>
              <h2 id="featured-tool" className={h.featureTitle}>
                {hero.name}
              </h2>
              <p className={h.featureCopy}>{HERO_TOOL.copy}</p>
              <div className={h.featureActions}>
                <Link href={hero.href} className={`${s.btn} ${s.btnPrimary} ${s.btnLg}`}>
                  {HERO_TOOL.button}
                </Link>
                <a href="#all-tools" className={`${s.btn} ${s.btnText} ${s.btnLg}`}>
                  Browse all {all.length} tools
                </a>
              </div>
            </div>
            <div className={h.featureArt}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={hero.image} alt="" width={1200} height={900} fetchPriority="high" className={h.featureImg} />
            </div>
          </section>
        ) : null}
      </div>

      {picks.length === 3 && all.length >= 9 ? (
        <section className={`${s.band} ${s.bandWarm}`}>
          <div className={s.wrap}>
            <Head eyebrow="Where to start" heading="Tools to" accent="start with" intro="Three good first tools, picked by hand. Each one takes about a minute." />
            <ul className={h.startGrid}>
              {picks.map((t) => (
                <li key={t.slug}>
                  <ToolCard tool={t} featured />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className={s.band} aria-label="All free tools">
        <div className={s.wrap}>
          <Head eyebrow="The directory" heading="Every free tool," accent="in one place" intro="Jump to a category or search by platform or task." />
          <Directory groups={groups} />
        </div>
      </section>

      <section className={bandClass()}>
        <div className={s.wrap}>
          <Head
            eyebrow="How it works"
            heading="How to use these"
            accent="free marketing tools"
            intro="You don't need a complicated setup. Pick the task you're working on, provide a little context, and use the result as your starting point."
          />
          <figure className={s.figure}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ILLUSTRATIONS.A100.src} alt={ILLUSTRATIONS.A100.alt} width={ILLUSTRATIONS.A100.width} height={ILLUSTRATIONS.A100.height} loading="lazy" decoding="async" className={s.figureImg} />
          </figure>
          <ol className={s.steps}>
            {[
              { t: "Choose a tool", d: "Find the tool that matches your task, whether you're writing a bio, planning content, or improving a page title." },
              { t: "Add your details", d: "Share your topic, audience, style, or other details the tool needs. The more useful your input, the more relevant the output can be." },
              { t: "Review and use the result", d: "Read the result, regenerate or refine it if you want a different take, and copy what works for your project." },
            ].map((step, i) => (
              <li key={step.t} className={s.step}>
                <span className={`${s.stepNum} ${displayFont.className}`}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className={s.h3}>{step.t}</h3>
                <p className={s.body}>{step.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {choose.length ? (
        <section className={bandClass()}>
          <div className={s.wrap}>
            <Head eyebrow="Find the right tool" heading="Not sure which" accent="marketing tool you need?" intro="Start with what you're trying to improve. Here's where I'd begin." />
            <ul className={h.choose}>
              {choose.map((c) => (
                <li key={c.title} className={`${h.chooseCard} ${c.tone === "dark" ? h.toneDark : c.tone === "cream" ? h.toneCream : ""}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={hubImage(c.tools[0])} alt="" width={1200} height={900} loading="lazy" decoding="async" className={h.chooseImg} />
                  <div>
                    <h3 className={h.chooseTitle}>{c.title}</h3>
                    <p className={h.chooseText}>{c.text}</p>
                    <ToolLinks slugs={c.tools} dark={c.tone === "dark"} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {help.length ? (
        <section className={bandClass()}>
          <div className={s.wrap}>
            <Head
              eyebrow="What they're for"
              heading="What can free marketing tools"
              accent="actually help you do?"
              intro="Marketing involves a lot of small tasks. These tools help with the first draft or setup, so you can spend more time reviewing the work and making decisions."
            />
            <ul className={h.help}>
              {help.map((b) => (
                <li key={b.title} className={h.helpCard}>
                  <div className={h.helpText}>
                    <h3 className={s.h3}>{b.title}</h3>
                    <p className={s.body}>{rich(b.text)}</p>
                    <ToolLinks slugs={b.tools} />
                  </div>
                  <div className={h.helpExample}>
                    <span className={h.exLabel}>Example</span>
                    <Example example={b.example} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {kinds ? (
        <section className={bandClass()}>
          <div className={s.wrap}>
            <Head
              eyebrow="Two kinds of tools"
              heading="AI generators and simple"
              accent="marketing utilities, in one place"
              intro="Some tools help you write. Others help you organize information or build something specific, like a campaign tracking URL."
            />
            <div className={h.split}>
              <div className={`${h.splitCard} ${h.toneDark}`}>
                <span className={h.splitTag}>AI writing tools</span>
                <p className={h.splitText}>
                  AI writing tools write a draft from the details you enter. They&apos;re useful for brainstorming and first drafts, but you should still review names, facts, claims, and wording before publishing.
                </p>
                <ToolLinks slugs={kinds.ai} dark />
              </div>
              <div className={h.splitCard}>
                <span className={h.splitTag}>Practical utilities</span>
                <p className={h.splitText}>Utility tools, such as a UTM link builder, follow a more structured process. They help you complete a specific task without needing to write everything manually.</p>
                <ToolLinks slugs={kinds.util} />
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className={bandClass()}>
        <div className={s.wrap}>
          <Head eyebrow="FAQ" heading="Frequently asked" accent="questions" />
          <div className={s.faq}>
            {faqs.map((f) => (
              <details key={f.q}>
                <summary>
                  <h3 className={s.faqQ}>{f.q}</h3>
                  <span className={s.faqIcon} aria-hidden />
                </summary>
                <p className={s.faqA}>{rich(f.a)}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <div className={`${s.wrap} ${h.ctaWrap}`}>
        <section className={s.cta}>
          <h2 className={s.ctaHeading}>
            The tools help you start.
            <em className={s.h2Accent}> I can help with the rest.</em>
          </h2>
          <p className={s.ctaCopy}>
            Writing a caption or fixing a page title is one part of marketing. If you need help with SEO, Reddit, social media, or a growth strategy that connects everything, that&apos;s what I work on.
          </p>
          <div className={h.ctaActions}>
            <Link href={LINK_SERVICES ?? "/services"} className={`${s.btn} ${s.btnLight} ${s.btnLg}`}>
              Explore my services
            </Link>
            {LINK_CONTACT ? (
              <Link href={LINK_CONTACT} className={h.ctaLink}>
                Or tell me what you&apos;re working on
              </Link>
            ) : null}
          </div>
        </section>
      </div>
    </main>
  );
}
