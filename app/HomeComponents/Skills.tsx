const SKILLS = [
  "Growth Strategy",
  "Go-to-Market",
  "SEO",
  "Reddit Marketing",
  "Community Growth",
  "Organic Social",
  "Content Strategy",
  "Paid Acquisition",
  "Product Marketing",
  "Lifecycle Marketing",
  "Conversion Optimization",
  "Analytics & Attribution",
  "Ecommerce Growth",
];

export default function Skills() {
  return (
    <section style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(80px,9vw,128px) clamp(20px,4vw,48px) 0" }}>
      <div className="max-md:!text-center" style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#8B877F" }}>Skills</div>
      <h2 className="max-md:!text-center max-md:!text-balance" style={{ margin: "12px 0 40px", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(34px,3.8vw,52px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
        Skills, <em style={{ fontFamily: "'Instrument Serif',serif", fontWeight: 400, fontSize: "1.1em" }}>without the keyword soup.</em>
      </h2>
      <div style={{ display: "grid", columnGap: "clamp(24px,3vw,48px)" }} className="grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3">
        {SKILLS.map((t, i) => (
          <div key={t} style={{ display: "flex", alignItems: "baseline", gap: 16, padding: "20px 0", borderTop: "1px solid #DDDAD3" }}>
            <span style={{ width: 28, flex: "0 0 auto", fontSize: 12, fontWeight: 600, color: "#9A7646", fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</span>
            <span style={{ fontFamily: "'General Sans'", fontSize: "clamp(20px,1.8vw,26px)", fontWeight: 500, letterSpacing: "-0.02em" }}>{t}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
