const SKILLS = [
  "Growth Marketing Strategy",
  "SaaS Customer Acquisition",
  "Search Engine Optimization",
  "Reddit Marketing",
  "Social Media Marketing",
  "Content Marketing and SEO Writing",
  "Organic Growth Strategy",
  "Go-to-Market Planning",
  "Conversion Rate Optimization",
  "Community Marketing",
  "Google and Meta Advertising",
  "Marketing Analytics and Attribution",
  "Landing Page Optimization",
  "Audience and Competitor Research",
];

export default function Skills() {
  return (
    <section style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(80px,9vw,128px) clamp(20px,4vw,48px) 0" }}>
      <h2 className="max-md:!text-balance" style={{ maxWidth: 720, textAlign: "center", margin: "0 auto 40px", fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(34px,3.8vw,52px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
        My Core <em style={{ fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.1em" }}>Marketing Skills</em>
      </h2>
      <div style={{ display: "grid", columnGap: "clamp(24px,3vw,48px)" }} className="grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3">
        {SKILLS.map((t, i) => (
          <div key={t} style={{ display: "flex", alignItems: "baseline", gap: 16, padding: "20px 0", borderTop: "1px solid #DDDAD3" }}>
            <span style={{ width: 28, flex: "0 0 auto", fontSize: 12, fontWeight: 600, color: "#7D6039", fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</span>
            <span style={{ fontFamily: "var(--nf-general-sans)", fontSize: "clamp(20px,1.8vw,26px)", fontWeight: 500, letterSpacing: "-0.02em" }}>{t}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
