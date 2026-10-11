import type { CaseStudy, RichText, Screenshot } from "../_data/types";
import { ScreenshotFigure } from "./Lightbox";
import { Rich } from "./Rich";
import { ACCENT_LINE, BODY, CARD, EYEBROW, GENERAL_SANS, GOLD, GOLD_TEXT, INK, LINE, MUTED, SECTION_GAP, SECTION_H2 } from "./styles";

// `case-headline` keeps small label headings out of the phone heading size rule in globals.css.
const LABEL_H2 = "case-headline";
const WIDE_SIZES = "(max-width: 1023px) 90vw, 1000px";
const HALF_SIZES = "(max-width: 1023px) 90vw, 500px";
const TEXT_LINK = "inline-flex items-center gap-[10px] min-h-[44px] text-[15px] font-semibold border-b-[1.5px] border-[#1C1C1C] hover:!text-[#7A5C33] hover:border-[#7A5C33]";

/** Two column screenshot grid; wide shots span both columns on desktop. */
export function ScreenshotGrid({ shots, style }: { shots: Screenshot[]; style?: React.CSSProperties }) {
  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-6 lg:grid-cols-2" style={{ alignItems: "start", ...style }}>
      {shots.map((s) => (
        <ScreenshotFigure key={s.src} shot={s} sizes={s.wide ? WIDE_SIZES : HALF_SIZES} className={s.wide ? "lg:col-span-2" : undefined} />
      ))}
    </div>
  );
}

/** Dashed callout with a bullet list, e.g. "What didn't work". */
export function BulletCallout({ title, bullets }: { title: string; bullets: RichText[] }) {
  return (
    <aside style={{ margin: "clamp(40px,4vw,56px) auto 0", maxWidth: 820, borderRadius: 20, border: "1.5px dashed #B9A584", background: CARD, padding: "clamp(22px,2.6vw,32px)" }}>
      <h3 className={LABEL_H2} style={{ ...EYEBROW, margin: 0, textAlign: "center", color: GOLD_TEXT }}>{title}</h3>
      <ul style={{ margin: "12px 0 0", padding: 0, listStyle: "none", borderTop: `1px solid ${LINE}` }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ display: "grid", gridTemplateColumns: "22px minmax(0,1fr)", gap: 8, padding: "14px 0", borderBottom: `1px solid ${LINE}`, fontSize: 16, lineHeight: 1.6, color: BODY }}>
            <span aria-hidden="true" style={{ marginTop: 9, width: 8, height: 8, borderRadius: "50%", border: `1.5px solid ${GOLD}` }} />
            <span><Rich text={b} /></span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/** A row of short customer or buyer reviews with star ratings. */
export function Reviews({ data }: { data: NonNullable<CaseStudy["reviews"]> }) {
  return (
    <section aria-labelledby="reviews" style={{ paddingTop: "clamp(48px,5vw,72px)" }}>
      <h2 id="reviews" className={LABEL_H2} style={{ ...EYEBROW, margin: 0, textAlign: "center" }}>{data.heading}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3" style={{ marginTop: 20, gap: 16 }}>
        {data.items.map((r) => (
          <figure key={r.name} style={{ margin: 0, minWidth: 0, borderRadius: 20, background: "#F2EFEA", padding: "clamp(22px,2.4vw,30px)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 18 }}>
            <span role="img" aria-label={`${r.rating} out of 5 stars`} style={{ color: "#9A7646", fontSize: 15, letterSpacing: 3 }}>{"★".repeat(r.rating)}</span>
            <blockquote style={{ margin: 0, flex: 1, fontFamily: GENERAL_SANS, fontWeight: 500, fontSize: "clamp(17px,1.5vw,19px)", lineHeight: 1.5, letterSpacing: "-0.01em", textWrap: "pretty" }}>&ldquo;{r.quote}&rdquo;</blockquote>
            <figcaption style={{ paddingTop: 14, borderTop: "1px solid #DAD6CC", width: "100%" }}>
              <span style={{ display: "block", fontSize: 15.5, fontWeight: 600 }}>{r.name}</span>
              <span style={{ display: "block", fontSize: 13.5, color: MUTED }}>{r.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

/** "What I did" for work that wasn't done in phases: intro, numbered cards, closing line, screenshot galleries. */
export function Approach({ data }: { data: NonNullable<CaseStudy["approach"]> }) {
  return (
    <section id="what-i-did" style={{ paddingTop: SECTION_GAP, scrollMarginTop: 96 }}>
      <div style={{ textAlign: "center", maxWidth: 820, margin: "0 auto" }}>
        <div style={EYEBROW}>{data.eyebrow}</div>
        <h2 style={SECTION_H2}>{data.heading.text}<span style={ACCENT_LINE}>{data.heading.accent}</span></h2>
      </div>
      {data.intro && <p style={{ margin: "18px auto 0", maxWidth: 640, textAlign: "center", fontSize: 17, lineHeight: 1.6, color: BODY, textWrap: "pretty" }}>{data.intro}</p>}
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ margin: "clamp(28px,3vw,40px) 0 0", padding: 0, listStyle: "none", gap: 16 }}>
        {data.items.map((it, i) => (
          <li key={it.title} style={{ borderRadius: 20, border: `1px solid ${LINE}`, background: CARD, padding: "clamp(22px,2.4vw,28px)", textAlign: "center" }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: GOLD_TEXT, fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</div>
            <h3 style={{ margin: "10px 0 0", fontFamily: GENERAL_SANS, fontSize: 20, fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.25 }}>{it.title}</h3>
            <p style={{ margin: "8px 0 0", fontSize: 15.5, lineHeight: 1.6, color: BODY, textWrap: "pretty" }}>{it.text}</p>
          </li>
        ))}
      </ol>
      {data.outro && (
        <p style={{ margin: "24px auto 0", maxWidth: 640, textAlign: "center", fontFamily: GENERAL_SANS, fontSize: "clamp(18px,1.6vw,21px)", fontWeight: 500, lineHeight: 1.45, letterSpacing: "-0.01em", textWrap: "pretty" }}>{data.outro}</p>
      )}
      {data.galleries.map((g, i) => <ScreenshotGrid key={i} shots={g} style={{ marginTop: "clamp(28px,3vw,40px)" }} />)}
      {data.note && <p style={{ margin: "14px 0 0", textAlign: "center", fontSize: 13, lineHeight: 1.5, color: MUTED }}>{data.note}</p>}
      {data.driveLink?.href && (
        <div style={{ marginTop: 16, textAlign: "center" }}>
          <a href={data.driveLink.href} target="_blank" rel="noopener" className={TEXT_LINK}>{data.driveLink.label}</a>
        </div>
      )}
    </section>
  );
}

/** Labelled grid of result numbers, e.g. "Full results". */
export function StatsGrid({ data }: { data: NonNullable<CaseStudy["statsGrid"]> }) {
  return (
    <section id={data.id} aria-labelledby="stats-grid" style={{ paddingTop: SECTION_GAP, scrollMarginTop: 96 }}>
      <h2 id="stats-grid" className={LABEL_H2} style={{ ...EYEBROW, margin: 0, textAlign: "center" }}>{data.heading}</h2>
      <dl style={{ margin: "16px 0 0", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,170px),1fr))", gap: 1, background: LINE, borderTop: `1px solid ${INK}`, borderBottom: `1px solid ${LINE}` }}>
        {data.items.map((s) => (
          <div key={s.label} style={{ background: "#EEEDE7", padding: "28px 16px 26px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <dt style={{ order: 3, marginTop: 14, fontSize: 14.5, lineHeight: 1.4, color: MUTED }}>{s.label}</dt>
            <dd style={{ order: 1, margin: 0, fontFamily: GENERAL_SANS, fontSize: "clamp(34px,3.2vw,46px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{s.value}</dd>
            <span aria-hidden="true" style={{ order: 2, marginTop: 14, width: 28, height: 2, background: GOLD }} />
          </div>
        ))}
      </dl>
      <p style={{ ...EYEBROW, margin: "12px 0 0", lineHeight: 1.5 }}>{data.source}</p>
    </section>
  );
}
