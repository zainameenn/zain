const GOOD = [
  "You have a real product and real customers.",
  "You're marketing but can't tell what's working.",
  "You'd like to stop thinking about it at 2am.",
];

const BAD = [
  "You want page one of Google by Friday.",
  "You need a 20 person agency.",
  'You want someone to "just post more."',
];

export default function Fit() {
  return (
    <section id="fit" className="max-md:!pt-20" style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(96px,9vw,128px) clamp(20px,4vw,48px) 0" }}>
      <div style={{ display: "grid", gap: "24px clamp(32px,5vw,80px)", alignItems: "start" }} className="md:!grid-cols-[minmax(0,0.34fr)_minmax(0,1fr)]">
        <div className="max-md:!text-center">
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#6F6B64" }}>Who it&apos;s for</div>
          <h2 style={{ margin: "12px 0 0", fontFamily: "'General Sans', 'General Sans Fallback'", fontWeight: 600, fontSize: "clamp(34px,3.2vw,46px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>Is this a fit?</h2>
        </div>
        <div style={{ display: "grid", gap: "32px clamp(24px,3vw,48px)" }} className="sm:!grid-cols-2">
          <div>
            <h3 style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#7D6039" }}>Good fit</h3>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", borderBottom: "1px solid #DDDAD3" }}>
              {GOOD.map((t) => (
                <li key={t} style={{ display: "grid", gridTemplateColumns: "24px minmax(0,1fr)", gap: 12, alignItems: "baseline", padding: "16px 0", borderTop: "1px solid #DDDAD3", fontSize: 17, lineHeight: 1.45, color: "#1C1C1C" }}>
                  <span aria-hidden="true" style={{ fontSize: 14, fontWeight: 600, color: "#7D6039" }}>✓</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#6F6B64" }}>Not a fit</h3>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", borderBottom: "1px solid #DDDAD3" }}>
              {BAD.map((t) => (
                <li key={t} style={{ display: "grid", gridTemplateColumns: "24px minmax(0,1fr)", gap: 12, alignItems: "baseline", padding: "16px 0", borderTop: "1px solid #DDDAD3", fontSize: 17, lineHeight: 1.45, color: "#5A5854" }}>
                  <span aria-hidden="true" style={{ fontSize: 14 }}><span style={{ display: "inline-block", width: "0.91em", height: 2, verticalAlign: "0.214em", background: "#706B61" }} /></span>
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
