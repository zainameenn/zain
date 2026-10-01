export default function Philosophy() {
  return (
    <section style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(80px,9vw,128px) clamp(20px,4vw,48px) 0" }}>
      <div style={{ display: "grid", gap: "40px clamp(40px,5vw,80px)", alignItems: "center" }} className="md:!grid-cols-[minmax(0,0.86fr)_minmax(0,1fr)]">
        <div>
          <h2 className="max-md:!text-center max-md:!text-balance" style={{ margin: 0, fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(36px,3.6vw,50px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
            More marketing isn&apos;t
            <br />
            always the answer.
          </h2>
          <p className="max-md:!text-center" style={{ margin: "12px 0 0", fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "clamp(28px,2.7vw,38px)", lineHeight: 1.05, color: "#6B6862" }}>
            Sometimes it&apos;s just more tabs open.
          </p>
          <p style={{ margin: "28px 0 0", maxWidth: 460, fontSize: 18.5, lineHeight: 1.5, color: "#1C1C1C", fontWeight: 500 }}>
            Three dashboards, two freelancers and one Reddit thread you keep meaning to reply to.
          </p>
          <p style={{ margin: "12px 0 0", maxWidth: 460, fontSize: 16.5, lineHeight: 1.6, color: "#4E4C48" }}>
            Everything looks busy and growth still feels stuck. Usually one or two things are holding the rest back. We find those first. Everything else can wait.
          </p>
          <p className="max-md:!text-center" style={{ margin: "32px 0 0", paddingTop: 24, borderTop: "1px solid #DDDAD3", fontFamily: "'General Sans'", fontSize: "clamp(22px,2vw,28px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            Diagnose first.{" "}
            <em style={{ fontFamily: "'Instrument Serif',serif", fontWeight: 400, fontSize: "1.1em" }}>Panic never.</em>
          </p>
        </div>
        <figure style={{ margin: 0, minWidth: 0 }}>
          <div
            role="img"
            aria-label="Illustration: disconnected channels pouring into a leaking funnel, next to a connected system feeding growth"
            style={{ aspectRatio: "1672/900", background: "url('/assets/v9/g04.png') 50% 50%/100% auto no-repeat" }}
          />
          <figcaption
            className="max-md:!text-center"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginTop: 8,
              paddingTop: 14,
              borderTop: "1px solid #DDDAD3",
              fontSize: 11.5,
              fontWeight: 600,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              color: "#77746E",
            }}
          >
            <span>More activity, same leaks</span>
            <span style={{ color: "#9A7646" }}>Constraint fixed, growth compounds</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
