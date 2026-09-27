import { ArrowIcon } from "./icons";

export default function About() {
  return (
    <section id="about" style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(80px,9vw,128px) clamp(20px,4vw,48px) 0" }}>
      <div style={{ display: "grid", gap: "24px clamp(40px,5vw,80px)", alignItems: "start" }} className="md:!grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#8B877F" }}>About</div>
          <h2 style={{ margin: "12px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(34px,3.8vw,52px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
            I came into growth
            <br />
            <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.1em" }}>through the work itself.</em>
          </h2>
        </div>
        <div style={{ maxWidth: 520, display: "flex", flexDirection: "column", gap: 14, fontSize: 17, lineHeight: 1.6, color: "#4E4C48" }}>
          <p style={{ margin: 0 }}>I started writing, then SEO, then distribution and community.</p>
          <p style={{ margin: 0 }}>Somewhere along the way, they stopped looking like separate channels.</p>
          <p style={{ margin: 0 }}>Before marketing, I ran a sales floor, so I care about closed deals more than likes.</p>
          <p style={{ margin: 0, color: "#1C1C1C", fontWeight: 500 }}>My job isn&apos;t to make every channel look important. It&apos;s to find the one that matters right now.</p>
          <p style={{ margin: "8px 0 0", paddingTop: 14, borderTop: "1px solid #DDDAD3", fontSize: 13.5, lineHeight: 1.5, color: "#77746E" }}>
            Based in Lahore.
            <br />
            Working with teams in the US, UAE and Europe.
          </p>
          <a href="/about" style={{ marginTop: 12, alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 10, height: 44, fontSize: 15, fontWeight: 600, color: "#1C1C1C", borderBottom: "1.5px solid #1C1C1C" }}>
            More about me
            <ArrowIcon />
          </a>
        </div>
      </div>
      <figure style={{ margin: "clamp(40px,5vw,64px) 0 0" }}>
        <div
          role="img"
          aria-label="Illustration: a path from content, search, community and experiments up to a growth summit"
          style={{ aspectRatio: "1672/640", background: "url('/assets/v9/g09.png') 50% 50%/100% auto no-repeat" }}
        />
      </figure>
      <div style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid #DDDAD3", display: "flex", flexWrap: "wrap", gap: "8px 20px", fontSize: 14, color: "#5A5854" }}>
        <span>SaaS</span>
        <span style={{ color: "#C4A47C" }}>/</span>
        <span>AI</span>
        <span style={{ color: "#C4A47C" }}>/</span>
        <span>Technology</span>
        <span style={{ color: "#C4A47C" }}>/</span>
        <span>Home Services</span>
        <span style={{ color: "#C4A47C" }}>/</span>
        <span>Ecommerce</span>
      </div>
    </section>
  );
}
