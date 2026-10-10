import type { CaseStudy, FlowIcon } from "../_data/types";
import css from "./case-study.module.css";
import { ACCENT_LINE, BODY, CARD, EYEBROW, GENERAL_SANS, INK, LINE, SECTION_GAP, SECTION_H2 } from "./styles";

const BRAND_ICONS: Partial<Record<FlowIcon, string>> = {
  reddit: "/icons/reddit.svg",
  instagram: "/icons/instagram-1C1C1C.svg",
  pinterest: "/icons/pinterest-1C1C1C.svg",
};

const LINE_ICONS: Partial<Record<FlowIcon, React.ReactNode>> = {
  search: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>,
  trend: <><path d="M22 7 13.5 15.5 8.5 10.5 2 17" /><path d="M16 7h6v6" /></>,
  award: <><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></>,
  sprout: <><path d="M7 20h10" /><path d="M10 20c5.5-2.5.8-6.4 3-10" /><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" /><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z" /></>,
};

function Icon({ name, color }: { name: FlowIcon; color: string }) {
  const brand = BRAND_ICONS[name];
  // eslint-disable-next-line @next/next/no-img-element
  if (brand) return <img src={brand} alt="" width={22} height={22} style={{ display: "block", width: 22, height: 22 }} />;
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {LINE_ICONS[name]}
    </svg>
  );
}

export function Compounding({ data }: { data: CaseStudy["compounding"] }) {
  return (
    <section style={{ paddingTop: SECTION_GAP }}>
      <div style={{ textAlign: "center", maxWidth: 820, margin: "0 auto" }}>
        <div style={EYEBROW}>{data.eyebrow}</div>
        <h2 style={SECTION_H2}>{data.heading.text}<span style={ACCENT_LINE}>{data.heading.accent}</span></h2>
        <p style={{ margin: "16px auto 0", maxWidth: 600, fontSize: 17, lineHeight: 1.6, color: BODY, textWrap: "pretty" }}>{data.intro}</p>
      </div>
      <div role="list" aria-label="How one channel fed the others" style={{ marginTop: "clamp(28px,3vw,40px)", borderRadius: 28, border: `1px solid ${LINE}`, background: CARD, padding: "clamp(12px,2.4vw,28px) clamp(16px,2.4vw,32px)" }}>
        {data.flows.map((steps, row) => (
          <div
            key={row}
            role="listitem"
            aria-label={steps.map((s) => s.label).join(", leads to, ")}
            className="flex flex-col py-[18px] md:flex-row md:py-4"
            style={{ alignItems: "stretch", borderTop: row ? "1px solid #E4E0D7" : undefined }}
          >
            {steps.map((step, i) => {
              const last = i === steps.length - 1;
              return (
                <div key={i} className="contents">
                  {i > 0 && (
                    <span aria-hidden="true" className={css.connector}>
                      <span className={css.dot} style={{ animationDelay: `${(row * 0.3 + (i - 1) * 0.9).toFixed(1)}s` }} />
                    </span>
                  )}
                  <div style={{ flex: "1 1 0", minWidth: 0, display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 16, border: `1px solid ${last ? INK : LINE}`, background: last ? INK : "#FFFFFF", color: last ? "#F2EFEA" : INK }}>
                    <span
                      className={last ? css.pulse : undefined}
                      style={{ flex: "0 0 auto", width: 48, height: 48, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 2, background: last ? "#2A2926" : "#F4F0E8", border: `1px solid ${last ? "#3A3935" : "#E2D8CA"}` }}
                    >
                      {step.icons.map((icon) => <Icon key={icon} name={icon} color={last ? "#D3AE82" : INK} />)}
                    </span>
                    <span style={{ fontSize: 15.5, fontWeight: last ? 600 : 500, lineHeight: 1.35, textWrap: "pretty" }}>{step.label}</span>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <p style={{ margin: "clamp(24px,3vw,32px) 0 0", padding: "18px 0", borderTop: `1px solid ${INK}`, borderBottom: `1px solid ${LINE}`, textAlign: "center", fontFamily: GENERAL_SANS, fontSize: "clamp(17px,1.6vw,20px)", fontWeight: 500, letterSpacing: "-0.01em", textWrap: "balance" }}>
        {data.footnote}
      </p>
    </section>
  );
}
