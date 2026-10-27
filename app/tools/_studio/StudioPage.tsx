import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { H1_ACCENT_STYLE, HERO_H1_STYLE } from "@/app/HomeComponents/heading";
import { JsonLd } from "@/app/blog/_components/JsonLd";
import { TOOLS, toolPath } from "@/lib/tools/registry";
import type { BrandExample, RelatedIcon, StudioHead, StudioImage, StudioSection, ToolPage } from "@/lib/tools/types";
import { countChars } from "@/lib/tools/validate";
import { Crumbs, rich } from "../_components/content";
import { BioStudio } from "./BioStudio";
import { CaptionStudio } from "./CaptionStudio";
import { V2Tool } from "./V2Tool";
import { V3Generator } from "./V3Generator";
import { v2SpecForSlug } from "@/lib/tools/v2/client-spec";
import { ToolWorkspace } from "../_components/ToolWorkspace";
import { lora } from "./fonts";
import { toolIllustration } from "@/lib/illustrations";
import { hubImage } from "@/lib/tools/hub";
import { Mark, PhoneFrame, ProfileScreen, initialsOf } from "./Phone";
import { FacebookPostScreen, InstaPostScreen, TikTokVideoScreen, YouTubeResultsScreen } from "./PostScreen";
import { StyleButton } from "./StyleButton";
import s from "./studio.module.css";

// The studio tool page: hero, the generator, then teaching sections built from the page config.
// Server rendered: every section is plain HTML, so the page is useful (and indexable) before anyone generates a bio.
// Sections sit on alternating cream and warm white bands, and every one opens like the service pages do.

const pad = (n: number) => String(n).padStart(2, "0");

function Figure({ image }: { image: StudioImage }) {
  return (
    <figure className={s.figure}>
      <Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 1023px) 92vw, 720px" className={s.figureImg} />
    </figure>
  );
}

function SectionHead({ head }: { head: StudioHead }) {
  return (
    <header className={`${s.sectionHead} ${s.sectionHeadCenter}`}>
      <div>
        {head.eyebrow ? <p className={s.kicker}>{head.eyebrow}</p> : null}
        <h2 className={s.h2}>
          {head.heading}
          {head.accent ? <em className={s.h2Accent}> {head.accent}</em> : null}
        </h2>
      </div>
      {head.intro ? <p className={s.intro}>{rich(head.intro)}</p> : null}
    </header>
  );
}

/** Small decorative versions of the generator, one per step. Hidden from screen readers: the step text says it all. */
function StepVisual({ kind }: { kind: "account" | "style" | "copy" }) {
  if (kind === "account") {
    return (
      <div className={s.mini} aria-hidden>
        <div className={s.miniSeg}>
          <span>Personal</span>
          <span>Creator</span>
          <span className={s.miniOn}>Business</span>
        </div>
        <div className={s.miniField}>Food &amp; Restaurants</div>
      </div>
    );
  }
  if (kind === "style") {
    return (
      <div className={s.mini} aria-hidden>
        <div className={s.miniChips}>
          <span className={s.miniOn}>Friendly</span>
          <span>Bold</span>
          <span>Minimal</span>
        </div>
        <div className={s.miniChips}>
          <span>None</span>
          <span className={s.miniOn}>Subtle</span>
          <span>Expressive</span>
        </div>
      </div>
    );
  }
  return (
    <div className={s.mini} aria-hidden>
      <div className={s.miniCard}>
        <span className={s.miniLine} />
        <span className={s.miniLine} style={{ width: "72%" }} />
        <span className={s.miniBtn}>Copy bio</span>
      </div>
    </div>
  );
}

function BrandCard({ b, limit, platform }: { b: BrandExample; limit: number; platform: string }) {
  const verified = b.bio !== null;
  const text = verified ? b.bio : (b.illustrative ?? "");
  return (
    <li className={s.brand}>
      <div className={s.brandHead}>
        {b.logo ? (
          // Small local SVGs: next/image would only add an optimization round trip here.
          // eslint-disable-next-line @next/next/no-img-element
          <img src={b.logo.src} alt="" width={40} height={40} className={s.brandLogo} loading="lazy" />
        ) : (
          // No freely licensed logo for this brand, so a neutral monogram stands in.
          <span className={`${s.brandLogo} ${s.brandMono}`} aria-hidden>
            {initialsOf(b.brand)}
          </span>
        )}
        <div className={s.brandNames}>
          <span className={s.brandName}>{b.brand}</span>
          <span className={s.brandHandle}>@{b.handle}</span>
        </div>
        <span className={s.tag}>{b.style}</span>
      </div>
      <div className={s.inset}>
        {text ? <p className={s.insetBio}>{text}</p> : <p className={s.insetEmpty}>No bio right now. Just the name.</p>}
        <span className={s.count}>{verified ? `${countChars(text ?? "").toLocaleString()} / ${limit.toLocaleString()}` : "Illustrative example"}</span>
      </div>
      <p className={s.why}>
        <span className={s.whyLabel}>Why it works</span>
        {rich(b.why)}
      </p>
      <a className={s.cardFoot} href={b.url} target="_blank" rel="noopener noreferrer">
        {b.linkLabel ?? `View ${platform} profile`}
        <span className={s.srOnly}> for {b.brand} (opens in a new tab)</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </a>
    </li>
  );
}

const ICONS: Record<RelatedIcon, ReactNode> = {
  caption: <path d="M5 6h14M5 11h14M5 16h9" />,
  bio: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0" />,
  chat: <path d="M5 6h14v9H9l-4 3V6Z" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
};

function Body({ section, tool }: { section: StudioSection; tool: ToolPage }) {
  const r = tool.workspace.result;
  const limit = r.kind === "options" && typeof r.limit === "number" ? r.limit : 150;
  const platform = tool.studio?.platform ?? "Instagram";
  switch (section.kind) {
    case "steps": {
      // The small form mockups (account type, style, Copy bio) only describe the bio generators.
      // Every tool shows its own illustration above the steps.
      const isBio = !tool.studio?.tool || tool.studio.tool === "bio";
      const art = toolIllustration(tool.slug);
      return (
        <>
        {art ? (
          <figure className={s.figure}>
            {/* A local SVG: next/image would only add an optimization round trip. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={art.src} alt={art.alt} width={art.width} height={art.height} loading="lazy" decoding="async" className={s.figureImg} />
          </figure>
        ) : null}
        <ol className={s.steps}>
          {section.steps.map((step, i) => (
            <li key={step.title} className={s.step}>
              {isBio ? <StepVisual kind={step.visual} /> : null}
              <span className={`${s.stepNum} ${lora.className}`}>{pad(i + 1)}</span>
              <h3 className={s.h3}>{step.title}</h3>
              <p className={s.body}>{rich(step.text)}</p>
            </li>
          ))}
        </ol>
        </>
      );
    }
    case "gallery":
      return (
        <>
          <ul className={s.gallery}>
            {section.items.map((b) => (
              <BrandCard key={b.handle} b={b} limit={limit} platform={platform} />
            ))}
          </ul>
          {section.note ? <p className={s.smallNote}>{rich(section.note)}</p> : null}
        </>
      );
    case "creator": {
      const p = section.profile;
      const bio = section.lines.map((l, i) => (
        <span key={l.text}>
          {l.text}
          <Mark n={l.mark} />
          {i < section.lines.length - 1 ? (section.join ?? "\n") : ""}
        </span>
      ));
      return (
        <div className={s.creator}>
          <ol className={s.points}>
            {section.points.map((pt, i) => {
              const marked = i + 1 === section.nameMark || i + 1 === section.linkMark || i + 1 === section.categoryMark || section.lines.some((l) => l.mark === i + 1);
              return (
                <li key={pt.title} className={marked ? s.point : `${s.point} ${s.pointMissing}`}>
                  <span className={s.pointNum} aria-hidden>
                    {marked ? pad(i + 1) : "?"}
                  </span>
                  <div>
                    <h3 className={s.h3}>{pt.title}</h3>
                    <p className={s.body}>{rich(pt.text)}</p>
                  </div>
                </li>
              );
            })}
          </ol>
          <figure className={s.creatorPhone}>
            <PhoneFrame>
              {tool.studio?.tool === "caption" && tool.studio.skin === "youtube" ? (
                <YouTubeResultsScreen username={p.name} caption="" captionNode={bio} />
              ) : tool.studio?.tool === "caption" && tool.studio.skin === "tiktok" ? (
                <TikTokVideoScreen
                  username={`@${p.handle}`}
                  type={p.postType ?? "Video"}
                  caption=""
                  captionNode={bio}
                  mediaLabel="Video not shown"
                  avatar={<Image src={p.photo.src} alt="" width={p.photo.width} height={p.photo.height} className={s.instaPhoto} />}
                />
              ) : tool.studio?.tool === "caption" && tool.studio.skin === "facebook" ? (
                <FacebookPostScreen
                  username={p.name}
                  type={p.postType ?? "Photo"}
                  caption=""
                  captionNode={bio}
                  mediaLabel="Post image not shown"
                  avatar={<Image src={p.photo.src} alt="" width={p.photo.width} height={p.photo.height} className={s.instaPhoto} />}
                />
              ) : tool.studio?.tool === "caption" ? (
                <InstaPostScreen
                  username={p.handle}
                  type={(p.postType ?? "Photo") as "Photo"}
                  caption=""
                  captionNode={bio}
                  mediaLabel="Post image not shown"
                  avatar={<Image src={p.photo.src} alt="" width={p.photo.width} height={p.photo.height} className={s.instaPhoto} />}
                />
              ) : (
              <ProfileScreen
                skin={tool.studio?.skin ?? "instagram"}
                username={p.handle}
                name={p.name}
                category={p.category}
                link={p.link}
                location={p.location}
                bio={bio}
                marks={{ name: section.nameMark, link: section.linkMark, category: section.categoryMark }}
                highlights={[]}
                avatar={<Image src={p.photo.src} alt="" width={p.photo.width} height={p.photo.height} className={s.instaPhoto} />}
              />
              )}
            </PhoneFrame>
            <figcaption className={s.smallNote}>
              {section.note ? <>{rich(section.note)} </> : null}
              Posts and buttons are placeholders. {rich(p.photo.credit)}{" "}
              <a href={p.url} target="_blank" rel="noopener noreferrer">
                View @{p.handle} on {platform}
              </a>
            </figcaption>
          </figure>
        </div>
      );
    }
    case "compare":
      return (
        <>
          {section.image ? <Figure image={section.image} /> : null}
          <div className={s.compare}>
            <div className={s.compareCol}>
              <p className={s.compareLabel}>Before</p>
              <p className={s.compareBio}>{section.before}</p>
              <p className={s.count}>{countChars(section.before)} / {limit.toLocaleString()}</p>
            </div>
            <div className={`${s.compareCol} ${s.compareAfter}`}>
              <p className={s.compareLabel}>After</p>
              <p className={s.compareBio}>{section.after}</p>
              <p className={s.count}>{countChars(section.after)} / {limit.toLocaleString()}</p>
            </div>
          </div>
          <ul className={s.changes}>
            {section.changes.map((c) => (
              <li key={c}>{rich(c)}</li>
            ))}
          </ul>
        </>
      );
    case "styles":
      return (
        <ul className={s.styles}>
          {section.styles.map((st) => (
            <li key={st.name} className={st.dark ? `${s.styleCard} ${s.dark}` : s.styleCard}>
              <span className={s.tag}>{st.name}</span>
              <p className={s.styleWhen}>{st.when}</p>
              <div className={s.inset}>
                <p className={s.insetBio}>{st.bio}</p>
                <span className={s.count}>{countChars(st.bio)} / {limit.toLocaleString()}</span>
              </div>
              <p className={s.why}>
                <span className={s.whyLabel}>Why it works</span>
                {rich(st.why)}
              </p>
              {/* Only tools on the studio form can take a style's settings. */}
              {tool.studio?.tool !== "legacy" && Object.keys(st.settings).length ? (
                <div className={s.cardActions}>
                  <StyleButton name={st.name} settings={st.settings} dark={st.dark} />
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      );
    case "practices":
      return (
        <ol className={s.practices}>
          {section.items.map((p, i) => (
            <li key={p.title} className={p.featured ? `${s.practice} ${s.dark}` : s.practice}>
              <span className={`${s.bigNum} ${lora.className}`} aria-hidden>
                {pad(i + 1)}
              </span>
              <h3 className={s.h3}>{p.title}</h3>
              <p className={s.body}>{rich(p.text)}</p>
              {p.example && "count" in p.example ? (
                <div className={s.meter} aria-hidden>
                  <span className={s.meterBar}>
                    <i style={{ width: `${(p.example.count / limit) * 100}%` }} />
                  </span>
                  <span className={s.count}>{p.example.count} / {limit.toLocaleString()}</span>
                </div>
              ) : p.example ? (
                <div className={s.examples}>
                  <p className={s.exGood}>
                    <span className={s.exMark}>{p.example.goodLabel ?? "Do"}</span>
                    <span className={s.exText}>{p.example.good}</span>
                  </p>
                  {p.example.bad ? (
                    <p className={s.exBad}>
                      <span className={s.exMark}>Skip</span>
                      <span className={s.exText}>{p.example.bad}</span>
                    </p>
                  ) : null}
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      );
    case "faq":
      return (
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
      );
    case "related": {
      // Only tools that are live right now, so there's never a dead link.
      const live = section.tools.filter((t) => TOOLS[t.slug]);
      return (
        <>
          <ul className={s.related}>
            {live.map((t) => (
              <li key={t.slug}>
                <Link href={toolPath(t.slug)} className={s.relatedCard}>
                  {hubImage(t.slug) ? (
                    // The same directory thumbnail the tool has everywhere. Decorative: its name follows.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={hubImage(t.slug)} alt="" width={1200} height={900} loading="lazy" decoding="async" className={s.relatedThumb} />
                  ) : (
                    <svg className={s.relatedIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      {ICONS[t.icon]}
                    </svg>
                  )}
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
        </>
      );
    }
    case "cta":
      return null;
  }
}

export function StudioPage({ tool, jsonLd }: { tool: ToolPage; jsonLd: Record<string, unknown> }) {
  const studio = tool.studio!;
  const v2 = v2SpecForSlug(tool.slug);
  const cta = studio.sections.find((x) => x.kind === "cta");
  const bands = studio.sections.filter((x) => x.kind !== "cta" && (x.kind !== "related" || x.tools.some((t) => TOOLS[t.slug])));
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
        {studio.tool === "v3" ? <V3Generator slug={tool.slug} name={tool.name} /> : v2 ? <V2Tool spec={v2} skin={("skin" in studio ? studio.skin : undefined) ?? (studio.tool === "legacy" ? undefined : "instagram")} label={"label" in studio ? studio.label : undefined} /> : studio.tool === "legacy" ? <ToolWorkspace slug={tool.slug} ws={tool.workspace} /> : studio.tool === "caption" ? <CaptionStudio slug={tool.slug} ws={tool.workspace} label={studio.label} skin={studio.skin} noun={studio.noun} /> : <BioStudio slug={tool.slug} ws={tool.workspace} skin={studio.skin} label={studio.label} />}
      </div>

      {bands.map((section, i) => (
        <section key={i} className={i % 2 === 0 ? `${s.band} ${s.bandWarm}` : s.band}>
          <div className={s.wrap}>
            <SectionHead head={section} />
            <Body section={section} tool={tool} />
          </div>
        </section>
      ))}

      {cta && cta.kind === "cta" ? (
        <div className={s.wrap}>
          <section className={s.cta}>
            {cta.eyebrow ? <p className={s.kicker}>{cta.eyebrow}</p> : null}
            <h2 className={s.ctaHeading}>
              {cta.heading}
              {cta.accent ? <em className={s.h2Accent}> {cta.accent}</em> : null}
            </h2>
            <p className={s.ctaCopy}>{cta.copy}</p>
            <Link href={cta.href} className={`${s.btn} ${s.btnLight} ${s.btnLg}`}>
              {cta.button}
            </Link>
          </section>
        </div>
      ) : null}
    </main>
  );
}
