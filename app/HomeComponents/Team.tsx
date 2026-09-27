export default function Team() {
  return (
    <section style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(80px,9vw,128px) clamp(20px,4vw,48px) 0" }}>
      <div
        style={{
          display: "grid",
          gap: "32px clamp(32px,4vw,56px)",
          alignItems: "center",
          padding: "clamp(32px,4vw,56px) clamp(16px,2vw,28px) clamp(32px,4vw,56px) clamp(28px,5.5vw,80px)",
          borderRadius: 28,
          background: "#F8F6F4",
          border: "1px solid #E2DFD8",
        }}
        className="md:!grid-cols-2"
      >
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#8B877F" }}>One person instead of five</div>
          <h2 style={{ margin: "12px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(32px,3vw,42px)", lineHeight: 1.06, letterSpacing: "-0.03em" }}>
            The stuff that usually
            <br />
            takes a whole team.
          </h2>
          <p style={{ margin: "18px 0 0", maxWidth: 460, fontSize: 18, lineHeight: 1.5, color: "#1C1C1C", fontWeight: 500 }}>
            Strategy, SEO, Reddit, social media, articles, graphics and ads. All handled by me.
          </p>
          <p style={{ margin: "14px 0 0", maxWidth: 480, fontSize: 16.5, lineHeight: 1.6, color: "#4E4C48" }}>
            Most founders end up hiring an SEO expert, a social media manager, a designer and an ads person, then managing all four.
          </p>
          <p style={{ margin: "16px 0 0", fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: 26, lineHeight: 1.1, color: "#1C1C1C" }}>
            That&apos;s a job on its own.
          </p>
          <p style={{ margin: "16px 0 0", maxWidth: 480, fontSize: 16.5, lineHeight: 1.6, color: "#4E4C48" }}>
            You get one person, one plan and fewer &quot;wait, who was doing this?&quot; moments.
          </p>
        </div>
        <figure style={{ margin: 0, minWidth: 0, width: "100%" }}>
          <img
            src="/assets/v12/art-a.png"
            alt="Illustration: strategy, search, Reddit, social, design and ads cards all connecting to one marketer at a desk"
            width={1448}
            height={1086}
            loading="lazy"
            style={{ display: "block", width: "100%", height: "auto", objectFit: "contain", mixBlendMode: "multiply" }}
          />
        </figure>
      </div>
    </section>
  );
}
