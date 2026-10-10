import type { CaseStudy, Phase } from "../_data/types";
import { ArrowIcon } from "../../HomeComponents/icons";
import { ScreenshotFigure } from "./Lightbox";
import { Rich } from "./Rich";
import { ACCENT_LINE, BODY, CARD, EYEBROW, GENERAL_SANS, GOLD, GOLD_TEXT, INK, LINE, MUTED, SECTION_GAP, SECTION_H2 } from "./styles";

const WIDE_SIZES = "(max-width: 1023px) 90vw, 1000px";
const HALF_SIZES = "(max-width: 1023px) 90vw, 500px";
const SINGLE_SIZES = "(max-width: 1023px) 90vw, 760px";

const TEXT_LINK = "inline-flex items-center gap-[10px] min-h-[44px] text-[15px] font-semibold border-b-[1.5px] border-[#1C1C1C] hover:!text-[#7A5C33] hover:border-[#7A5C33]";

function ExternalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true" style={{ flex: "0 0 auto" }}>
      <path d="M3 11L11 3M5 3H11V9" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

const BODY_TEXT: React.CSSProperties = { margin: "12px 0 0", maxWidth: 680, fontSize: 16.5, lineHeight: 1.65, color: BODY, textWrap: "pretty" };

const ASIDE: React.CSSProperties = { marginTop: 28, maxWidth: 760, borderRadius: 20, background: CARD, padding: "clamp(20px,2.4vw,28px)" };
const ASIDE_TITLE: React.CSSProperties = { ...EYEBROW, margin: 0, color: GOLD_TEXT };

function PhaseItem({ phase }: { phase: Phase }) {
  const { articleExample: art, example: ex, attribution: attr } = phase;
  const single = phase.screenshotsLayout === "single";
  const id = `phase-${phase.number}`;
  return (
    <li className="grid grid-cols-[40px_minmax(0,1fr)] gap-x-4 md:grid-cols-[56px_minmax(0,1fr)] md:gap-x-[clamp(20px,2.4vw,32px)]" style={{ position: "relative" }}>
      <span
        aria-hidden="true"
        className="size-10 text-[14px] md:size-14 md:text-[17px]"
        style={{ position: "relative", borderRadius: "50%", background: "#EEEDE7", border: `1px solid ${INK}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: GENERAL_SANS, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}
      >
        {phase.number}
      </span>
      <div className="pt-2 md:pt-[14px]" style={{ minWidth: 0 }}>
        <div style={{ ...EYEBROW, color: GOLD_TEXT }}>{phase.eyebrow}</div>
        <h3 style={{ margin: "10px 0 0", fontFamily: GENERAL_SANS, fontWeight: 600, fontSize: "clamp(26px,2.6vw,36px)", lineHeight: 1.1, letterSpacing: "-0.03em" }}>{phase.title}</h3>
        <p style={{ margin: "14px 0 0", maxWidth: 680, fontSize: 17, lineHeight: 1.6, color: phase.introStrong ? INK : BODY, textWrap: "pretty" }}>{phase.intro}</p>
        {phase.body && !phase.bodyAfterBullets && <p style={BODY_TEXT}>{phase.body}</p>}

        {phase.bullets && (
          <ul style={{ margin: "22px 0 0", padding: 0, listStyle: "none", borderTop: `1px solid ${LINE}`, maxWidth: 760 }}>
            {phase.bullets.map((b, i) => (
              <li key={i} style={{ display: "grid", gridTemplateColumns: "22px minmax(0,1fr)", gap: 8, padding: "14px 0", borderBottom: `1px solid ${LINE}`, fontSize: 16, lineHeight: 1.6, color: BODY }}>
                <span aria-hidden="true" style={{ marginTop: 9, width: 8, height: 8, borderRadius: "50%", border: `1.5px solid ${GOLD}` }} />
                <span><Rich text={b} /></span>
              </li>
            ))}
          </ul>
        )}
        {phase.body && phase.bodyAfterBullets && <p style={BODY_TEXT}>{phase.body}</p>}

        {phase.link?.href && (
          <a href={phase.link.href} target="_blank" rel="noopener" className={TEXT_LINK} style={{ marginTop: 20 }}>
            {phase.link.label}
            <ArrowIcon />
          </a>
        )}

        {phase.screenshots.length > 0 && (single ? (
          <div style={{ marginTop: 28, maxWidth: 760, display: "flex", flexDirection: "column", gap: 24 }}>
            {phase.screenshots.map((s) => <ScreenshotFigure key={s.src} shot={s} sizes={SINGLE_SIZES} />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-5 gap-y-6 lg:grid-cols-2" style={{ marginTop: 28, alignItems: "start" }}>
            {phase.screenshots.map((s) => (
              <ScreenshotFigure key={s.src} shot={s} sizes={s.wide ? WIDE_SIZES : HALF_SIZES} className={s.wide ? "lg:col-span-2" : undefined} />
            ))}
          </div>
        ))}
        {phase.screenshotsNote && <p style={{ margin: "14px 0 0", fontSize: 13, lineHeight: 1.5, color: MUTED }}>{phase.screenshotsNote}</p>}

        {phase.driveLink?.href && (
          <a href={phase.driveLink.href} target="_blank" rel="noopener" className={TEXT_LINK} style={{ marginTop: 16 }}>
            {phase.driveLink.label}
            <ExternalIcon />
          </a>
        )}

        {art?.title && art.url && (
          <aside aria-labelledby={`${id}-article`} style={{ ...ASIDE, border: `1px solid ${LINE}` }}>
            <h4 id={`${id}-article`} style={ASIDE_TITLE}>An article that worked</h4>
            <a href={art.url} target="_blank" rel="noopener" className="inline-flex items-center gap-[10px] min-h-[44px] border-b-[1.5px] border-[#1C1C1C] hover:!text-[#7A5C33] hover:border-[#7A5C33]" style={{ marginTop: 12, fontFamily: GENERAL_SANS, fontSize: "clamp(18px,1.6vw,21px)", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.3 }}>
              {art.title}
              <ExternalIcon />
            </a>
            {art.result && <p style={{ margin: "10px 0 0", fontSize: 15.5, lineHeight: 1.6, color: BODY }}>{art.result}</p>}
          </aside>
        )}

        {phase.callout && (
          <aside aria-labelledby={`${id}-callout`} style={{ ...ASIDE, border: "1.5px dashed #B9A584" }}>
            <h4 id={`${id}-callout`} style={{ ...ASIDE_TITLE, display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" /></svg>
              {phase.callout.title}
            </h4>
            <p style={{ margin: "12px 0 0", fontFamily: GENERAL_SANS, fontSize: "clamp(18px,1.6vw,21px)", fontWeight: 500, lineHeight: 1.45, letterSpacing: "-0.01em", textWrap: "pretty" }}>
              <Rich text={phase.callout.text} />
            </p>
          </aside>
        )}

        {ex?.title && ex.views && (
          <aside aria-labelledby={`${id}-example`} style={{ ...ASIDE, border: `1px solid ${LINE}` }}>
            <h4 id={`${id}-example`} style={ASIDE_TITLE}>{ex.heading}</h4>
            <div style={{ marginTop: 14, padding: "16px 18px", borderRadius: 12, border: `1px solid ${LINE}`, background: "#FFFFFF" }}>
              {ex.label && <div style={{ fontSize: 13.5, fontWeight: 600, color: MUTED }}>{ex.label}</div>}
              <p style={{ margin: ex.label ? "8px 0 0" : 0, fontFamily: GENERAL_SANS, fontSize: "clamp(17px,1.5vw,20px)", fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.35 }}>{ex.title}</p>
              <div style={{ ...EYEBROW, marginTop: 12, fontVariantNumeric: "tabular-nums" }}>{ex.views} views</div>
            </div>
          </aside>
        )}

        {attr && (
          <div style={{ marginTop: 32, borderRadius: 20, background: "#F4F0E8", border: "1px solid #E2D8CA", padding: "clamp(22px,3vw,36px)" }}>
            <h4 style={{ margin: 0, fontFamily: GENERAL_SANS, fontSize: "clamp(21px,2vw,26px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{attr.title}</h4>
            <p style={{ margin: "14px 0 0", maxWidth: 720, fontSize: 16.5, lineHeight: 1.65, color: BODY, textWrap: "pretty" }}><Rich text={attr.text} /></p>
            <figure style={{ margin: "24px 0 0" }}>
              <div aria-hidden="true" style={{ display: "flex", height: 56, borderRadius: 10, overflow: "hidden", gap: 4 }}>
                <span style={{ flex: `${attr.ratio[0]} 1 0`, background: INK, borderRadius: 10 }} />
                <span style={{ flex: `${attr.ratio[1]} 1 0`, borderRadius: 10, border: "1.5px dashed #9A7646", background: "repeating-linear-gradient(135deg,transparent 0 8px,rgba(196,164,124,.22) 8px 9px)" }} />
              </div>
              <figcaption className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)]" style={{ marginTop: 14, gap: "10px 16px", fontSize: 14.5, lineHeight: 1.45 }}>
                <span style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span aria-hidden="true" style={{ flex: "0 0 auto", marginTop: 3, width: 14, height: 14, borderRadius: 4, background: INK }} />
                  <span><strong style={{ fontWeight: 600 }}>{attr.tracked[0]}</strong> {attr.tracked[1]}</span>
                </span>
                <span className="md:justify-self-end" style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span aria-hidden="true" style={{ flex: "0 0 auto", marginTop: 3, width: 14, height: 14, borderRadius: 4, border: "1.5px dashed #9A7646" }} />
                  <span><strong style={{ fontWeight: 600 }}>{attr.untracked[0]}</strong> {attr.untracked[1]}</span>
                </span>
              </figcaption>
            </figure>
          </div>
        )}
      </div>
    </li>
  );
}

export function Phases({ data }: { data: CaseStudy["phases"] }) {
  return (
    <section id="what-i-did" style={{ paddingTop: SECTION_GAP, scrollMarginTop: 96 }}>
      <div style={{ textAlign: "center", maxWidth: 820, margin: "0 auto" }}>
        <div style={EYEBROW}>{data.eyebrow}</div>
        <h2 style={SECTION_H2}>{data.heading.text}<span style={ACCENT_LINE}>{data.heading.accent}</span></h2>
      </div>
      <div style={{ position: "relative", marginTop: "clamp(36px,4vw,56px)" }}>
        <span aria-hidden="true" className="left-[19.5px] md:left-[27.5px]" style={{ position: "absolute", top: 8, bottom: 8, width: 1, background: "#CFCBC2" }} />
        <ol style={{ position: "relative", margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "clamp(48px,5vw,72px)" }}>
          {data.items.map((p) => <PhaseItem key={p.number} phase={p} />)}
        </ol>
      </div>
    </section>
  );
}
