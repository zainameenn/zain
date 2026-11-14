const GOOD = [
  "You're building or growing a SaaS product and need help acquiring users.",
  "Your business gets traffic but struggles to turn visitors into customers.",
  "You're looking for an independent marketing specialist who can both plan and execute.",
  "You want to grow through SEO, content, Reddit or social media.",
  "You need someone who can work with your existing team without adding unnecessary meetings.",
  "You care about useful results, not just impressions and likes.",
];

const BAD = [
  "You expect guaranteed Google rankings within a few days.",
  "You need a large agency team working across dozens of campaigns.",
  "You're only interested in publishing more content without checking whether it helps the business.",
];

export default function Fit() {
  return (
    <section id="fit" className="max-md:!pt-20" style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(96px,9vw,128px) clamp(20px,4vw,48px) 0" }}>
      <div style={{ display: "grid", gap: "24px clamp(32px,5vw,80px)", alignItems: "start" }} className="md:!grid-cols-[minmax(0,0.34fr)_minmax(0,1fr)]">
        <div className="max-md:!text-center">
          <h2 style={{ margin: 0, fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(34px,3.2vw,46px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
            Is This the <em style={{ fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.1em" }}>Right Fit?</em>
          </h2>
        </div>
        <div style={{ display: "grid", gap: "32px clamp(24px,3vw,48px)" }} className="sm:!grid-cols-2">
          <div>
            <h3 style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#7F5F26" }}>We&apos;re probably a good fit if</h3>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", borderBottom: "1px solid #E4E0D6" }}>
              {GOOD.map((t) => (
                <li key={t} style={{ display: "grid", gridTemplateColumns: "24px minmax(0,1fr)", gap: 12, alignItems: "baseline", padding: "16px 0", borderTop: "1px solid #E4E0D6", fontSize: 17, lineHeight: 1.45, color: "#202821" }}>
                  <span aria-hidden="true" style={{ fontSize: 14, fontWeight: 600, color: "#7F5F26" }}>✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#687068" }}>Probably not the right fit if</h3>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", borderBottom: "1px solid #E4E0D6" }}>
              {BAD.map((t) => (
                <li key={t} style={{ display: "grid", gridTemplateColumns: "24px minmax(0,1fr)", gap: 12, alignItems: "baseline", padding: "16px 0", borderTop: "1px solid #E4E0D6", fontSize: 17, lineHeight: 1.45, color: "#4A524B" }}>
                  <span aria-hidden="true" style={{ fontSize: 14 }}><span style={{ display: "inline-block", width: "0.91em", height: 2, verticalAlign: "0.214em", background: "#687068" }} /></span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
