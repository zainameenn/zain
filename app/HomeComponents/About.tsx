import { ArrowIcon } from "./icons";
import { BgImage } from "./Img";

export default function About() {
  return (
    <section id="about" style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(80px,9vw,128px) clamp(20px,4vw,48px) 0" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#687068" }}>About Me</div>
          <h2 className="max-md:!text-balance" style={{ margin: "12px 0 0", fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(34px,3.8vw,52px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
            Hi, I&apos;m Zain Ul Abdin,{" "}
            <em style={{ fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.1em" }}>a Growth Marketing Specialist.</em>
          </h2>
        </div>
        <div style={{ marginTop: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 14, fontSize: 17, lineHeight: 1.6, color: "#4A524B" }}>
          <p style={{ margin: 0 }}>I&apos;m based in Lahore, Pakistan, and work remotely with SaaS founders and service businesses in the United States, UAE and Europe.</p>
          <p style={{ margin: 0 }}>My career started with content writing. That led me into SEO, then community marketing, social media, customer acquisition and broader growth strategy.</p>
          <p style={{ margin: 0 }}>I also spent time in sales, which taught me something important: getting someone&apos;s attention and convincing them to become a customer are two different things.</p>
          <p style={{ margin: 0 }}>Today, I combine those experiences to help businesses figure out how to find the right people, communicate their value and grow.</p>
          <p style={{ margin: 0, color: "#202821", fontWeight: 500 }}>I like working directly with founders and small teams. Clear expectations, useful work, actual numbers.</p>
          <a href="/about" style={{ marginTop: 12, display: "inline-flex", alignItems: "center", gap: 10, height: 44, fontSize: 15, fontWeight: 600, color: "#202821", borderBottom: "1.5px solid #202821" }}>
            More About Me
            <ArrowIcon />
          </a>
        </div>
      </div>
      <figure style={{ margin: "clamp(40px,5vw,64px) 0 0" }}>
        <BgImage
          src="/assets/v9/g09.webp"
          alt="Illustration: a path from content, search, community and experiments up to a growth summit"
          fit={100}
          style={{ aspectRatio: "1672/640" }}
        />
      </figure>
      <div className="max-md:!justify-center" style={{ marginTop: 32, paddingTop: 20, borderTop: "1px solid #E4E0D6", display: "flex", flexWrap: "wrap", gap: "8px 20px", fontSize: 14, color: "#4A524B" }}>
        <span>SaaS</span>
        <span style={{ color: "#B38842" }}>/</span>
        <span>AI</span>
        <span style={{ color: "#B38842" }}>/</span>
        <span>Technology</span>
        <span style={{ color: "#B38842" }}>/</span>
        <span>Home Services</span>
        <span style={{ color: "#B38842" }}>/</span>
        <span>Ecommerce</span>
      </div>
    </section>
  );
}
