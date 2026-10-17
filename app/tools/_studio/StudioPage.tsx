import Image from "next/image";
import Link from "next/link";
import { H1_ACCENT_STYLE, HERO_H1_STYLE } from "@/app/HomeComponents/heading";
import { JsonLd } from "@/app/blog/_components/JsonLd";
import { TOOLS, toolPath } from "@/lib/tools/registry";
import type { BrandExample, RelatedIcon, StudioImage, StudioSection, ToolPage } from "@/lib/tools/types";
import { countChars } from "@/lib/tools/validate";
import { Crumbs, rich } from "../_components/content";
import { BioStudio } from "./BioStudio";
import { lora } from "./fonts";
import { InstaPreview } from "./InstaPreview";
import s from "./studio.module.css";

// The studio tool page: hero, the generator, then teaching sections built from the page config.
// Server rendered: every section is plain HTML, so the page is useful (and indexable) before anyone generates a bio.

function Figure({ image, priority }: { image: StudioImage; priority?: boolean }) {
  return (
    <figure className={s.figure}>
      <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 1023px) 92vw, 560px" priority={priority} className={s.figureImg} />
    </figure>
  );
}

function SectionHead({ heading, intro }: { heading: string; intro?: string }) {
  return (
    <header className={s.sectionHead}>
      <h2 className={s.h2}>{heading}</h2>
      {intro ? <p className={s.intro}>{rich(intro)}</p> : null}
    </header>
  );
}

function BrandCard({ b }: { b: BrandExample }) {
  const verified = b.bio !== null;
  return (
    <li className={s.brand}>
      <InstaPreview
        compact
        username={b.handle}
        name={b.brand}
        bio={verified ? b.bio : b.illustrative}
        empty={verified && !b.bio ? "No bio right now. Just the name." : undefined}
        avatar={
          b.logo ? (
            // Small local SVGs: next/image would only add an optimization round trip here.
            // eslint-disable-next-line @next/next/no-img-element
            <img src={b.logo.src} alt="" width={b.logo.width} height={b.logo.height} className={s.brandLogo} loading="lazy" />
          ) : undefined
        }
      />
      <p className={s.brandMeta}>
        {verified ? (b.bio ? `${countChars(b.bio)} / 150 characters` : "0 / 150 characters") : "Illustrative example"}
        <span aria-hidden> · </span>
        {b.style}
      </p>
      <p className={s.brandWhy}>
        <strong>Why it works:</strong> {rich(b.why)}
      </p>
      <p className={s.brandLesson}>
        <span className={s.lessonMark}>Try it:</span> {rich(b.lesson)}
      </p>
      <a className={s.textLink} href={b.url} target="_blank" rel="noopener noreferrer">
        View {b.brand} on Instagram
      </a>
    </li>
  );
}

const ICONS: Record<RelatedIcon, React.ReactNode> = {
  caption: <path d="M5 6h14M5 11h14M5 16h9" />,
  bio: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" />,
  chat: <path d="M5 6h14v9H9l-4 3V6Z" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
};

function Section({ section, tool }: { section: StudioSection; tool: ToolPage }) {
  switch (section.kind) {
    case "steps":
      return (
        <section className={s.section}>
          <SectionHead heading={section.heading} intro={section.intro} />
          {section.image ? <Figure image={section.image} /> : null}
          <ol className={s.steps}>
            {section.steps.map((step, i) => (
              <li key={step.title}>
                <span className={`${s.stepNum} ${lora.className}`}>{i + 1}</span>
                <h3 className={s.h3}>{step.title}</h3>
                <p>{rich(step.text)}</p>
              </li>
            ))}
          </ol>
        </section>
      );
    case "gallery":
      return (
        <section className={s.section}>
          <SectionHead heading={section.heading} intro={section.intro} />
          <ul className={s.gallery}>
            {section.items.map((b) => (
              <BrandCard key={b.handle} b={b} />
            ))}
          </ul>
          {section.note ? <p className={s.galleryNote}>{rich(section.note)}</p> : null}
        </section>
      );
    case "anatomy": {
      // Each part gets a number; the same number marks where it appears on the sample profile.
      const num = (key: string) => section.parts.findIndex((p) => p.key === key) + 1;
      const mark = (key: string) =>
        num(key) ? (
          <span className={s.mark} aria-hidden>
            {num(key)}
          </span>
        ) : null;
      return (
        <section className={s.section}>
          <SectionHead heading={section.heading} intro={section.intro} />
          <div className={s.split}>
            <div className={s.anatomy}>
              <InstaPreview
                username={section.profile.username}
                name={section.profile.name}
                category={section.profile.category}
                link={section.profile.link}
                nameMark={mark("name")}
                linkMark={mark("link")}
                bio={section.lines.map((l, i) => (
                  <span key={l.text}>
                    {l.text}
                    {mark(l.part)}
                    {i < section.lines.length - 1 ? "\n" : ""}
                  </span>
                ))}
              />
              <ol className={s.parts}>
                {section.parts.map((p, i) => (
                  <li key={p.key}>
                    <span className={s.mark} aria-hidden>
                      {i + 1}
                    </span>
                    <div>
                      <h3 className={s.h3}>{p.label}</h3>
                      <p>{rich(p.text)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            {section.image ? <Figure image={section.image} /> : null}
          </div>
        </section>
      );
    }
    case "compare":
      return (
        <section className={s.section}>
          <SectionHead heading={section.heading} intro={section.intro} />
          {section.image ? <Figure image={section.image} /> : null}
          <div className={s.compare}>
            <div className={s.compareCol}>
              <p className={s.compareLabel}>Before</p>
              <p className={s.compareBio}>{section.before}</p>
              <p className={s.count}>{countChars(section.before)} / 150</p>
            </div>
            <div className={`${s.compareCol} ${s.compareAfter}`}>
              <p className={s.compareLabel}>After</p>
              <p className={s.compareBio}>{section.after}</p>
              <p className={s.count}>{countChars(section.after)} / 150</p>
            </div>
          </div>
          <ul className={s.changes}>
            {section.changes.map((c) => (
              <li key={c}>{rich(c)}</li>
            ))}
          </ul>
        </section>
      );
    case "styles":
      return (
        <section className={s.section}>
          <SectionHead heading={section.heading} intro={section.intro} />
          <ul className={s.styles}>
            {section.styles.map((st) => (
              <li key={st.name}>
                <h3 className={s.h3}>{st.name}</h3>
                <p className={s.styleBio}>{st.bio}</p>
                <p className={s.styleNote}>{rich(st.note)}</p>
              </li>
            ))}
          </ul>
          <div className={s.split}>
            <div>
              <h3 className={s.h3}>Same bio, three formats</h3>
              <ul className={s.formats}>
                {section.formats.map((f) => (
                  <li key={f.label}>
                    <p className={s.formatLabel}>
                      {f.label}
                      <span className={s.count}> {countChars(f.bio)} / 150</span>
                    </p>
                    <p className={s.styleBio}>{f.bio}</p>
                  </li>
                ))}
              </ul>
            </div>
            {section.image ? <Figure image={section.image} /> : null}
          </div>
        </section>
      );
    case "practices":
      return (
        <section className={s.section}>
          <SectionHead heading={section.heading} intro={section.intro} />
          <ul className={s.practices}>
            {section.items.map((p) => (
              <li key={p.title}>
                <h3 className={s.h3}>{p.title}</h3>
                <p>{rich(p.text)}</p>
              </li>
            ))}
          </ul>
        </section>
      );
    case "faq":
      return (
        <section className={s.section}>
          <SectionHead heading={section.heading} intro={section.intro} />
          <div className={s.faq}>
            {tool.faqs.map((f) => (
              <details key={f.q}>
                <summary>
                  <h3 className={s.faqQ}>{f.q}</h3>
                  <span className={s.faqIcon} aria-hidden />
                </summary>
                <p className={s.faqA}>{rich(f.a)}</p>
              </details>
            ))}
          </div>
        </section>
      );
    case "related": {
      // Only tools that are live right now, so there's never a dead link.
      const live = section.tools.filter((t) => TOOLS[t.slug]);
      if (!live.length) return null;
      return (
        <section className={s.section}>
          <SectionHead heading={section.heading} intro={section.intro} />
          <ul className={s.related}>
            {live.map((t) => (
              <li key={t.slug}>
                <Link href={toolPath(t.slug)} className={s.relatedCard}>
                  <svg className={s.relatedIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    {ICONS[t.icon]}
                  </svg>
                  <span className={s.relatedName}>{TOOLS[t.slug].name}</span>
                  <span className={s.relatedText}>{t.text}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className={s.relatedAll}>
            <Link href="/tools" className={s.textLink}>
              Explore all free tools
            </Link>
          </p>
        </section>
      );
    }
    case "cta":
      return (
        <section className={s.cta}>
          <h2 className={s.ctaHeading}>
            {section.heading} <em style={H1_ACCENT_STYLE}>{section.accent}</em>
          </h2>
          <p className={s.ctaCopy}>{section.copy}</p>
          <Link href={section.href} className={`${s.btn} ${s.btnLight} ${s.btnLg}`}>
            {section.button}
          </Link>
        </section>
      );
  }
}

export function StudioPage({ tool, jsonLd }: { tool: ToolPage; jsonLd: Record<string, unknown> }) {
  const studio = tool.studio!;
  return (
    <main className={`${s.page} ${lora.variable}`}>
      <JsonLd data={jsonLd} />
      <div className={s.wrap}>
        <Crumbs items={[{ name: "Home", href: "/" }, { name: "Free Tools", href: "/tools" }, { name: tool.name }]} />
        <header className={s.hero}>
          <h1 style={HERO_H1_STYLE}>
            {tool.h1.regular} <em style={H1_ACCENT_STYLE}>{tool.h1.accent}</em>
          </h1>
          <p className={s.lede}>{rich(studio.lede)}</p>
          <p className={s.sub}>{studio.sub}</p>
          <p className={s.trust}>{studio.trust}</p>
        </header>
        <BioStudio slug={tool.slug} ws={tool.workspace} />
        {studio.sections.map((section, i) => (section.kind === "cta" ? null : <Section key={i} section={section} tool={tool} />))}
      </div>
      {studio.sections.map((section, i) => (section.kind === "cta" ? <div key={i} className={s.wrap}><Section section={section} tool={tool} /></div> : null))}
    </main>
  );
}
