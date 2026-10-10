import Image from "next/image";
import Link from "next/link";
import type { CaseStudy } from "../_data/types";
import { H1_ACCENT_STYLE, HERO_H1_STYLE } from "../../HomeComponents/heading";
import { ArrowIcon, Squiggle, UpArrowIcon } from "../../HomeComponents/icons";
import { Compounding } from "./Compounding";
import { LightboxProvider, ScreenshotFigure } from "./Lightbox";
import { Phases } from "./Phases";
import { Rich } from "./Rich";
import { Toc } from "./Toc";
import { ACCENT_LINE, BODY, CARD, CARD_PAD, EYEBROW, GENERAL_SANS, GOLD, GOLD_LIGHT, GOLD_TEXT, INK, LINE, MUTED, SECTION_GAP, SECTION_H2, SERIF } from "./styles";

// `case-headline` keeps small label headings out of the phone heading size rule in globals.css.
const LABEL_H2 = "case-headline";

const DARK_BUTTON = "inline-flex items-center whitespace-nowrap rounded-[12px] bg-[#1C1C1C] !text-[#F8F6F4] transition-colors hover:bg-[#33322F] active:bg-black";
const OUTLINE_BUTTON = "inline-flex items-center whitespace-nowrap rounded-[12px] border border-[#1C1C1C] transition-colors hover:bg-[#E4E1D9]";
const TEXT_LINK = "inline-flex items-center gap-[10px] min-h-[44px] font-semibold border-b-[1.5px] border-[#1C1C1C] hover:!text-[#7A5C33] hover:border-[#7A5C33]";
const UNDERLINE_LINK = "inline-flex items-center min-h-[32px] border-b border-[#CFCBC2] hover:!text-[#7A5C33] hover:border-[#7A5C33]";

function ExternalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M3 11L11 3M5 3H11V9" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function SectionIntro({ eyebrow, heading }: { eyebrow: string; heading: CaseStudy["results"]["heading"] }) {
  return (
    <div style={{ textAlign: "center", maxWidth: 820, margin: "0 auto" }}>
      <div style={EYEBROW}>{eyebrow}</div>
      <h2 style={SECTION_H2}>{heading.text}<span style={ACCENT_LINE}>{heading.accent}</span></h2>
    </div>
  );
}

/** Big number with a short gold rule and a label underneath. */
function Stat({ value, label, note, size }: { value: string; label: string; note?: string; size: string }) {
  return (
    <>
      <dt style={{ order: 3, marginTop: 14, fontSize: 14.5, lineHeight: 1.4, color: MUTED }}>
        {label}
        {note && <span style={{ color: MUTED }}> {note}</span>}
      </dt>
      <dd style={{ order: 1, margin: 0, fontFamily: GENERAL_SANS, fontSize: size, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{value}</dd>
      <span aria-hidden="true" style={{ order: 2, marginTop: 14, width: 28, height: 2, background: GOLD }} />
    </>
  );
}

export function CaseStudyPage({ study }: { study: CaseStudy }) {
  const { hero, testimonial, summary, product, problem, effort, results, drive, lessons, servicesUsed, related, cta } = study;
  const gallery = results.gallery.filter((g) => g.src);

  return (
    <LightboxProvider>
      <main id="top" className="grid grid-cols-1 gap-x-12 xl:grid-cols-[172px_minmax(0,1fr)]" style={{ maxWidth: 1360, margin: "0 auto", padding: "0 clamp(20px,2.5vw,32px)", overflowX: "clip" }}>
        <Toc items={study.toc} />

        <div style={{ minWidth: 0 }}>
          {/* Breadcrumb and tags */}
          <div style={{ paddingTop: "clamp(28px,3vw,40px)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "8px 24px" }}>
            <nav aria-label="Breadcrumb">
              <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", alignItems: "center", gap: 8, fontSize: 14, color: MUTED }}>
                <li><Link href="/case-studies" className="inline-flex min-h-[44px] items-center border-b border-transparent hover:border-[#1C1C1C] hover:!text-[#1C1C1C]">Case studies</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href={`/case-studies/${study.slug}`} aria-current="page" style={{ display: "inline-flex", alignItems: "center", minHeight: 44, color: INK, fontWeight: 500 }}>{study.name}</Link></li>
              </ol>
            </nav>
            <ul aria-label="Tags" style={{ ...EYEBROW, margin: 0, padding: 0, listStyle: "none", display: "flex", flexWrap: "wrap", alignItems: "center", gap: "6px 10px" }}>
              {study.tags.map((t, i) => (
                <li key={t} style={{ display: "flex", gap: 10 }}>
                  {i > 0 && <span aria-hidden="true" style={{ color: GOLD }}>·</span>}
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Hero */}
          <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]" style={{ padding: "clamp(24px,3vw,40px) 0 clamp(40px,4vw,56px)", gap: "40px clamp(32px,4vw,64px)", alignItems: "center" }}>
            <div style={{ minWidth: 0 }}>
              <Image src={study.logo.src} alt={study.logo.alt} width={study.logo.width} height={study.logo.height} priority sizes="124px" style={{ display: "block", height: 36, width: "auto" }} />
              <h1 style={{ ...HERO_H1_STYLE, marginTop: 28 }}>
                {hero.title}{" "}
                <span style={{ ...H1_ACCENT_STYLE, display: "block", marginTop: 6, color: "#6B6862" }}>
                  <span style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}>
                    {hero.accent}
                    <Squiggle />
                  </span>
                </span>
              </h1>
              <p style={{ margin: "26px 0 0", maxWidth: 560, fontSize: 18, lineHeight: 1.55, color: INK, textWrap: "pretty" }}>{hero.intro}</p>
              <div style={{ marginTop: 30, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 12 }}>
                <Link href={hero.primaryCta.href} className={DARK_BUTTON} style={{ gap: 12, height: 56, padding: "0 26px", fontSize: 16, fontWeight: 600 }}>
                  {hero.primaryCta.label}
                  <ArrowIcon />
                </Link>
                <a href={hero.secondaryCta.href} className={OUTLINE_BUTTON} style={{ gap: 10, height: 56, padding: "0 24px", fontSize: 16, fontWeight: 600 }}>
                  {hero.secondaryCta.label}
                  <UpArrowIcon />
                </a>
              </div>
            </div>
            <aside aria-labelledby="quick-facts" style={{ minWidth: 0, borderRadius: 20, background: CARD, border: `1px solid ${LINE}`, padding: "clamp(22px,2.4vw,32px)" }}>
              <h2 id="quick-facts" className={LABEL_H2} style={{ ...EYEBROW, margin: 0 }}>Quick facts</h2>
              <dl style={{ margin: "14px 0 0" }}>
                {study.quickFacts.map((f, i) => (
                  <div key={f.label} className="grid grid-cols-1 md:grid-cols-[96px_minmax(0,1fr)]" style={{ gap: "2px 16px", padding: i === study.quickFacts.length - 1 ? "13px 0 0" : "13px 0", borderTop: `1px solid ${i === 0 ? INK : LINE}` }}>
                    <dt style={{ fontSize: 14, color: MUTED }}>{f.label}</dt>
                    {f.links ? (
                      <dd style={{ margin: 0, fontSize: 15.5, fontWeight: 500, lineHeight: 1.45, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "2px 12px" }}>
                        {f.links.map((l) => <Link key={l.href} href={l.href} className={UNDERLINE_LINK}>{l.label}</Link>)}
                      </dd>
                    ) : f.large ? (
                      <dd style={{ margin: 0, fontFamily: GENERAL_SANS, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{f.value}</dd>
                    ) : (
                      <dd style={{ margin: 0, fontSize: 15.5, fontWeight: 500, lineHeight: 1.45 }}>{f.value}</dd>
                    )}
                  </div>
                ))}
              </dl>
            </aside>
          </section>

          {/* Key results strip */}
          <section aria-label="Key results">
            <dl className="grid grid-cols-1 md:grid-cols-3" style={{ margin: 0, gap: 1, background: LINE, borderTop: `1px solid ${INK}`, borderBottom: `1px solid ${LINE}` }}>
              {study.keyResults.map((r) => (
                <div key={r.label} style={{ background: "#EEEDE7", padding: "28px 20px 26px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <Stat value={r.value} label={r.label} size="clamp(40px,4vw,58px)" />
                </div>
              ))}
            </dl>
            <p style={{ ...EYEBROW, margin: "12px 0 0", lineHeight: 1.5 }}>{study.keyResultsSource}</p>
          </section>

          {/* Client quote */}
          {testimonial && (
            <section aria-labelledby="from-the-founder" style={{ paddingTop: "clamp(48px,5vw,72px)" }}>
              <h2 id="from-the-founder" className={LABEL_H2} style={{ ...EYEBROW, margin: 0, textAlign: "center" }}>From the founder</h2>
              <figure style={{ margin: "20px auto 0", maxWidth: 820, borderRadius: 20, background: "#F2EFEA", padding: "clamp(26px,3.6vw,48px)", display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: GOLD_TEXT }}>{testimonial.label}</span>
                  <a href={testimonial.originalHref} target="_blank" rel="noopener" className="inline-flex min-h-[44px] items-center text-[12.5px] !text-[#5A5854] hover:!text-[#1C1C1C]">
                    <span style={{ borderBottom: "1px solid #CFCBC2" }}>View original ↗</span>
                  </a>
                </div>
                <blockquote style={{ margin: 0, fontFamily: GENERAL_SANS, fontWeight: 500, fontSize: "clamp(21px,2.3vw,30px)", lineHeight: 1.38, letterSpacing: "-0.015em", textWrap: "pretty" }}>
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption style={{ display: "flex", alignItems: "center", gap: 14, paddingTop: 20, borderTop: "1px solid #DAD6CC" }}>
                  <Image src={testimonial.avatar.src} alt={testimonial.avatar.alt} width={52} height={52} sizes="52px" style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", display: "block", flex: "0 0 auto" }} />
                  <span>
                    <span style={{ display: "block", fontSize: 16, fontWeight: 600 }}>{testimonial.name}</span>
                    <span style={{ display: "block", fontSize: 14, color: MUTED }}>{testimonial.role}</span>
                  </span>
                </figcaption>
              </figure>
            </section>
          )}

          {/* 30 second version */}
          <section aria-labelledby="summary" style={{ paddingTop: "clamp(48px,5vw,72px)" }}>
            <div style={{ borderRadius: 28, background: "#F4F0E8", border: "1px solid #E2D8CA", padding: "clamp(24px,3.4vw,44px)" }}>
              <h2 id="summary" className={LABEL_H2} style={{ ...EYEBROW, margin: 0, display: "flex", alignItems: "center", gap: 10, color: GOLD_TEXT }}>
                <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: "50%", background: GOLD }} />
                {summary.heading}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3" style={{ marginTop: 20, gap: "0 clamp(24px,3vw,40px)" }}>
                {summary.items.map((s) => (
                  <div key={s.title} style={{ padding: "18px 0 4px", borderTop: `1px solid ${INK}` }}>
                    <h3 style={{ margin: 0, fontFamily: GENERAL_SANS, fontSize: 20, fontWeight: 600, letterSpacing: "-0.015em" }}>{s.title}</h3>
                    <p style={{ margin: "10px 0 0", fontSize: 16, lineHeight: 1.6, color: s.emphasis ? INK : BODY, fontWeight: s.emphasis ? 500 : 400, textWrap: "pretty" }}>{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Product */}
          <section className="grid grid-cols-1 lg:grid-cols-2" style={{ paddingTop: SECTION_GAP, gap: "32px clamp(32px,4vw,64px)", alignItems: "center" }}>
            <div style={{ minWidth: 0 }}>
              <div style={EYEBROW}>{product.eyebrow}</div>
              <h2 style={{ ...SECTION_H2, fontSize: "clamp(30px,3vw,44px)", lineHeight: 1.08 }}>{product.heading}</h2>
              <p style={{ margin: "20px 0 0", fontFamily: GENERAL_SANS, fontSize: "clamp(19px,1.7vw,22px)", fontWeight: 500, lineHeight: 1.4, letterSpacing: "-0.01em", textWrap: "pretty" }}>{product.lead}</p>
              <p style={{ margin: "16px 0 0", fontSize: 16.5, lineHeight: 1.65, color: BODY, textWrap: "pretty" }}>{product.body}</p>
            </div>
            <div style={{ minWidth: 0, aspectRatio: "4/3", borderRadius: 20, border: `1px solid ${LINE}`, background: CARD, display: "flex", alignItems: "center", justifyContent: "center", padding: "12%" }}>
              <Image src={study.logo.src} alt={study.logo.alt} width={study.logo.width} height={study.logo.height} sizes="340px" style={{ display: "block", width: "100%", maxWidth: 340, height: "auto" }} />
            </div>
          </section>

          {/* Problem */}
          <section id="problem" style={{ paddingTop: SECTION_GAP, scrollMarginTop: 96 }}>
            <div style={{ borderRadius: 28, background: INK, color: "#F2EFEA", padding: "clamp(36px,5vw,72px) clamp(22px,4.5vw,64px)" }}>
              <div style={{ ...EYEBROW, textAlign: "center", color: GOLD_LIGHT }}>{problem.eyebrow}</div>
              <h2 style={{ ...SECTION_H2, margin: "14px auto 0", textAlign: "center", maxWidth: 820, fontSize: "clamp(36px,4.2vw,60px)", lineHeight: 1.04, letterSpacing: "-0.04em" }}>
                {problem.heading.text}
                <span style={{ ...ACCENT_LINE, marginTop: 4, color: GOLD_LIGHT }}>{problem.heading.accent}</span>
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2" style={{ marginTop: "clamp(28px,3vw,40px)", gap: "20px clamp(28px,3.5vw,48px)", paddingTop: 24, borderTop: "1px solid #3A3935" }}>
                {problem.paragraphs.map((p, i) => <p key={i} style={{ margin: 0, fontSize: 16.5, lineHeight: 1.65, color: "#D9D5CC", textWrap: "pretty" }}>{p}</p>)}
              </div>
              <p style={{ margin: "clamp(28px,3vw,40px) auto 0", textAlign: "center", maxWidth: 820, fontFamily: GENERAL_SANS, fontSize: "clamp(21px,2.1vw,28px)", fontWeight: 500, lineHeight: 1.35, letterSpacing: "-0.015em", textWrap: "pretty" }}>
                <Rich text={problem.closing} />
              </p>
            </div>
          </section>

          <Phases data={study.phases} />

          <Compounding data={study.compounding} />

          {/* Effort */}
          <section aria-labelledby="what-went-in" style={{ paddingTop: "clamp(56px,6vw,80px)" }}>
            <h2 id="what-went-in" className={LABEL_H2} style={{ ...EYEBROW, margin: 0, textAlign: "center" }}>{effort.heading}</h2>
            <dl className="grid grid-cols-2 md:grid-cols-4" style={{ margin: "16px 0 0", gap: "0 24px" }}>
              {effort.items.map((e) => (
                <div key={e.label} style={{ padding: "18px 12px 4px", borderTop: `1px solid ${LINE}`, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 6 }}>
                  <dt style={{ order: 2, fontSize: 14, lineHeight: 1.4, color: MUTED }}>{e.label}</dt>
                  <dd style={{ order: 1, margin: 0, fontFamily: GENERAL_SANS, fontSize: "clamp(22px,2vw,28px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.1, fontVariantNumeric: "tabular-nums", color: "#33322F" }}>{e.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Results */}
          <section id="results" style={{ paddingTop: SECTION_GAP, scrollMarginTop: 96 }}>
            <SectionIntro eyebrow={results.eyebrow} heading={results.heading} />
            <dl className="grid grid-cols-1 md:grid-cols-3" style={{ margin: "clamp(28px,3vw,40px) 0 0", gap: 16 }}>
              {results.items.map((r) => (
                <div key={r.label} style={{ borderRadius: 20, border: `1px solid ${LINE}`, background: CARD, padding: CARD_PAD, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                  <Stat value={r.value} label={r.label} note={r.note} size="clamp(48px,5vw,76px)" />
                </div>
              ))}
              <div className="md:col-span-3" style={{ borderRadius: 20, border: "1.5px dashed #B9A584", background: "#EEEDE7", padding: CARD_PAD, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", justifyContent: "space-between", gap: 20 }}>
                <dt style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, fontFamily: GENERAL_SANS, fontSize: "clamp(19px,1.7vw,22px)", fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.25 }}>
                  <span style={{ flex: "0 0 auto", width: 44, height: 44, borderRadius: 12, border: "1px solid #CFCBC2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                  </span>
                  {results.privateNote.title}
                </dt>
                <dd style={{ margin: 0, fontSize: 15, lineHeight: 1.5, color: BODY }}>
                  <span className="sr-only">Locked. </span>
                  {results.privateNote.text}
                </dd>
              </div>
            </dl>
            {gallery.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2" style={{ marginTop: 24, gap: 20 }}>
                {gallery.map((g) => <ScreenshotFigure key={g.src} shot={g} sizes="(max-width: 1023px) 90vw, 560px" />)}
              </div>
            )}
          </section>

          {/* All results in Google Drive */}
          {drive.link.href && (
            <section aria-labelledby="all-results" style={{ paddingTop: "clamp(40px,4vw,56px)" }}>
              <div style={{ borderRadius: 20, border: "1.5px dashed #B9A584", background: "#F4F0E8", padding: "clamp(24px,3vw,36px)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 14 }}>
                <h2 id="all-results" style={{ margin: 0, fontFamily: GENERAL_SANS, fontSize: "clamp(22px,2.2vw,28px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{drive.heading}</h2>
                <p style={{ margin: 0, maxWidth: 520, fontSize: 16, lineHeight: 1.6, color: BODY, textWrap: "pretty" }}>{drive.text}</p>
                <a href={drive.link.href} target="_blank" rel="noopener" className={DARK_BUTTON} style={{ marginTop: 6, gap: 12, height: 52, padding: "0 24px", fontSize: 15.5, fontWeight: 600 }}>
                  {drive.link.label}
                  <ExternalIcon />
                </a>
              </div>
            </section>
          )}

          {/* Lessons */}
          <section id="lessons" style={{ paddingTop: SECTION_GAP, scrollMarginTop: 96 }}>
            <SectionIntro eyebrow={lessons.eyebrow} heading={lessons.heading} />
            <ol className="grid grid-cols-1 lg:grid-cols-2" style={{ margin: "clamp(28px,3vw,40px) 0 0", padding: 0, listStyle: "none", gap: 16 }}>
              {lessons.items.map((l, i) => (
                <li key={l.title} style={{ borderRadius: 20, border: `1px solid ${LINE}`, background: CARD, padding: CARD_PAD }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: GOLD_TEXT, fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</div>
                  <h3 style={{ margin: "12px 0 0", fontFamily: GENERAL_SANS, fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{l.title}</h3>
                  <p style={{ margin: "10px 0 0", fontSize: 16, lineHeight: 1.6, color: BODY, textWrap: "pretty" }}>{l.text}</p>
                </li>
              ))}
            </ol>
            {lessons.articleLink.href && (
              <div style={{ marginTop: 24, textAlign: "center" }}>
                <a href={lessons.articleLink.href} className={TEXT_LINK} style={{ fontSize: 15.5 }}>
                  {lessons.articleLink.label}
                  <ArrowIcon />
                </a>
              </div>
            )}
          </section>

          {/* Services used */}
          <section aria-labelledby="services-used" style={{ paddingTop: "clamp(64px,6vw,88px)" }}>
            <h2 id="services-used" className={LABEL_H2} style={{ ...EYEBROW, margin: 0, textAlign: "center" }}>{servicesUsed.heading}</h2>
            <ul className="grid grid-cols-1 md:grid-cols-3" style={{ margin: "16px 0 0", padding: 0, listStyle: "none", gap: 12 }}>
              {servicesUsed.items.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="flex items-center justify-between gap-4 border border-[#DDDAD3] transition-colors hover:border-[#1C1C1C]" style={{ minHeight: 64, padding: "16px 20px", borderRadius: 14, background: CARD, fontFamily: GENERAL_SANS, fontSize: 17, fontWeight: 600, letterSpacing: "-0.01em" }}>
                    {s.label}
                    <ArrowIcon size={14} style={{ flex: "0 0 auto" }} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          {/* More case studies */}
          <section aria-labelledby="more-case-studies" style={{ paddingTop: "clamp(64px,6vw,88px)" }}>
            <div style={{ textAlign: "center" }}>
              <div style={EYEBROW}>{related.eyebrow}</div>
              <h2 id="more-case-studies" style={{ ...SECTION_H2, fontSize: "clamp(28px,3vw,40px)", lineHeight: 1.08 }}>{related.heading}</h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2" style={{ margin: "clamp(24px,3vw,36px) auto 0", maxWidth: 920, padding: 0, listStyle: "none", gap: 16 }}>
              {related.items.map((c) => (
                <li key={c.link.href} style={{ borderRadius: 20, border: `1px solid ${LINE}`, background: CARD, padding: "clamp(22px,2.4vw,28px)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 16 }}>
                  <div style={{ ...EYEBROW, fontSize: 11.5 }}>{c.tags}</div>
                  <span style={{ width: "100%", height: 96, borderRadius: 14, background: "#FFFFFF", border: "1px solid #E4E0D7", display: "flex", alignItems: "center", justifyContent: "center", padding: "16px 24px" }}>
                    <Image src={c.logo.src} alt={c.logo.alt} width={c.logo.width} height={c.logo.height} sizes="200px" unoptimized={c.logo.src.endsWith(".gif")} style={{ display: "block", maxHeight: 56, maxWidth: "80%", width: "auto", height: "auto", objectFit: "contain" }} />
                  </span>
                  <div style={{ width: "100%", paddingTop: 14, borderTop: `1px solid ${LINE}` }}>
                    <div style={{ fontFamily: GENERAL_SANS, fontSize: "clamp(30px,2.8vw,40px)", fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{c.stat}</div>
                    <div style={{ marginTop: 8, fontSize: 14, lineHeight: 1.45, color: MUTED }}>{c.statLabel}</div>
                  </div>
                  <p style={{ margin: 0, flex: 1, fontSize: 15.5, lineHeight: 1.6, color: BODY, textWrap: "pretty" }}>{c.text}</p>
                  <Link href={c.link.href} className={TEXT_LINK} style={{ fontSize: 15 }}>
                    {c.link.label}
                    <ArrowIcon />
                  </Link>
                </li>
              ))}
            </ul>
            <div style={{ marginTop: 24, textAlign: "center" }}>
              <Link href={related.allLink.href} className={OUTLINE_BUTTON} style={{ gap: 10, height: 52, padding: "0 24px", fontSize: 15.5, fontWeight: 600 }}>
                {related.allLink.label}
                <ArrowIcon />
              </Link>
            </div>
          </section>

          {/* Closing call to action */}
          <section id="contact" style={{ padding: "clamp(56px,6vw,88px) 0" }}>
            <div style={{ borderRadius: 28, background: INK, color: "#F2EFEA", padding: "clamp(40px,6vw,80px) clamp(24px,5vw,72px)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 32 }}>
              <div>
                <h2 style={{ ...SECTION_H2, margin: 0 }}>
                  {cta.heading.text}
                  <span style={{ display: "block", marginTop: 10, fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", color: GOLD_LIGHT }}>
                    <span style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}>
                      {cta.heading.accent}
                      <Squiggle />
                    </span>
                  </span>
                </h2>
                <p style={{ margin: "24px auto 0", maxWidth: 480, fontSize: 17, lineHeight: 1.6, color: "#B7B2A8" }}>{cta.text}</p>
              </div>
              <Link href={cta.link.href} className="inline-flex items-center justify-center rounded-[12px] bg-[#F2EFEA] !text-[#1C1C1C] transition-colors hover:bg-white" style={{ gap: 16, height: 64, padding: "0 32px", fontSize: 17, fontWeight: 600 }}>
                {cta.link.label}
                <ArrowIcon size={16} />
              </Link>
            </div>
          </section>
        </div>
      </main>
    </LightboxProvider>
  );
}
