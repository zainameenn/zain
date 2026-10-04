const OPTIONS = [
  { t: "Agency", d: "A team, an account manager and a retainer to match. Great if you need ten people. Overkill if you need one bottleneck fixed.", dark: false },
  { t: "Full time hire", d: "Salary, benefits, recruiting time and usually one specialty. Worth it once a channel is proven.", dark: false },
  { t: "Me", d: "One person across SEO, Reddit, social, content and ads. Plans from $1,199/mo, everything handled for $3,999/mo. No 87 slide strategy deck.", dark: true },
];

// 3 columns on desktop and tablet, stacked cards under 768px.
export default function Compare() {
  return (
    <section className="max-md:!pt-20" style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(80px,9vw,128px) clamp(20px,4vw,48px) 0" }}>
      <h2 style={{ margin: "0 auto 40px", maxWidth: 720, textAlign: "center", fontFamily: "'General Sans', 'General Sans Fallback'", fontWeight: 600, fontSize: "clamp(32px,3.4vw,48px)", lineHeight: 1.06, letterSpacing: "-0.035em", textWrap: "balance" }}>
        Growth marketing specialist vs agency{" "}
        <em style={{ fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.1em" }}>vs full time hire</em>
      </h2>
      <div style={{ display: "grid", gap: 16 }} className="grid-cols-1 md:!grid-cols-3">
        {OPTIONS.map((o) => (
          <div
            key={o.t}
            style={{
              minWidth: 0,
              borderRadius: 22,
              padding: "clamp(24px,2.6vw,32px)",
              background: o.dark ? "#1C1C1C" : "#FBFBF9",
              color: o.dark ? "#F2EFEA" : "#1C1C1C",
              border: o.dark ? "1px solid #1C1C1C" : "1px solid #E2DFD8",
            }}
          >
            <h3 style={{ margin: 0, fontFamily: "'General Sans', 'General Sans Fallback'", fontSize: "clamp(22px,2vw,27px)", fontWeight: 600, letterSpacing: "-0.025em", color: o.dark ? "#D3AE82" : "#1C1C1C" }}>{o.t}</h3>
            <p style={{ margin: "12px 0 0", fontSize: 16, lineHeight: 1.6, color: o.dark ? "#C9C4BA" : "#5A5854" }}>{o.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
