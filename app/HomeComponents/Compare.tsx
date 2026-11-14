const OPTIONS = [
  { t: "Marketing Agency", d: ["A team of specialists, multiple people to communicate with and usually a larger monthly commitment.", "Great when your business needs several dedicated teams. Not always necessary when you're still figuring out which channels work."], dark: false },
  { t: "Full-Time Marketing Hire", d: ["Someone inside your business every day.", "A good choice when you have enough ongoing work and need a permanent person to manage it."], dark: false },
  { t: "Working With Me", d: ["You work directly with the person developing and executing your marketing strategy.", "I can help with SEO, Reddit, content, social media, growth strategy and paid campaigns without having to coordinate a different freelancer for every task.", "One person who understands your business, knows what's happening across channels and takes responsibility for the work."], dark: true },
];

// 3 columns on desktop and tablet, stacked cards under 768px.
export default function Compare() {
  return (
    <section className="max-md:!pt-20" style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(80px,9vw,128px) clamp(20px,4vw,48px) 0" }}>
      <h2 style={{ margin: "0 auto 40px", maxWidth: 720, textAlign: "center", fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(32px,3.4vw,48px)", lineHeight: 1.06, letterSpacing: "-0.035em", textWrap: "balance" }}>
        Hiring a Marketing Specialist vs an Agency{" "}
        <em style={{ fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.1em" }}>vs a Full-Time Employee</em>
      </h2>
      <div style={{ display: "grid", gap: 16 }} className="grid-cols-1 md:!grid-cols-3">
        {OPTIONS.map((o) => (
          <div
            key={o.t}
            style={{
              minWidth: 0,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              borderRadius: 22,
              padding: "clamp(24px,2.6vw,32px)",
              background: o.dark ? "#174B3A" : "#FBFBF9",
              color: o.dark ? "#F2EFEA" : "#202821",
              border: o.dark ? "1px solid #202821" : "1px solid #E4E0D6",
            }}
          >
            <h3 style={{ margin: 0, fontFamily: "var(--nf-general-sans)", fontSize: "clamp(22px,2vw,27px)", fontWeight: 600, letterSpacing: "-0.025em", color: o.dark ? "#D3AE82" : "#202821" }}>{o.t}</h3>
            {o.d.map((p) => (
              <p key={p.slice(0, 30)} style={{ margin: "12px 0 0", fontSize: 16, lineHeight: 1.6, color: o.dark ? "#D6E0DA" : "#4A524B" }}>{p}</p>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
