"use client";

import { useState } from "react";
import { ArrowIcon, MailIcon, LinkedInIcon } from "./icons";

export default function CTA() {
  const [ctaHover, setCtaHover] = useState(false);

  return (
    <section id="contact" style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(80px,9vw,128px) clamp(20px,4vw,48px) clamp(24px,3vw,40px)" }}>
      <div
        style={{ borderRadius: 28, background: "#1C1C1C", color: "#F2EFEA", padding: "clamp(48px,6vw,88px) clamp(24px,5vw,72px)", display: "grid", gap: "48px clamp(40px,5vw,80px)", alignItems: "center" }}
        className="md:!grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]"
      >
        <div>
          <h2 style={{ margin: 0, fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(36px,4vw,56px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
            <span style={{ display: "block", fontSize: "1.12em", color: "#D3AE82", marginBottom: ".08em" }}>
              <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "inherit" }}>Take a breath.</em>
            </span>
            Then tell me what&apos;s stuck.
          </h2>
          <p style={{ margin: "24px 0 0", maxWidth: 480, fontSize: 17, lineHeight: 1.6, color: "#B7B2A8" }}>
            What you&apos;re growing, what&apos;s happening and what you&apos;ve tried. I&apos;ll tell you where I&apos;d start. If I&apos;m not the right fit, I&apos;ll say so.
          </p>
        </div>
        <div id="book" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <a
            href="/contact"
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
            style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, height: 64, padding: "0 24px", borderRadius: 12, background: ctaHover ? "#FFFFFF" : "#F2EFEA", color: "#1C1C1C", fontSize: 17, fontWeight: 600, transition: "background 180ms" }}
          >
            Tell me what&apos;s happening
            <ArrowIcon size={16} style={{ transform: ctaHover ? "translateX(4px)" : "none", transition: "transform 200ms" }} />
          </a>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <a href="/contact" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, height: 52, borderRadius: 12, border: "1px solid #3A3935", fontSize: 15, fontWeight: 500, color: "#F2EFEA" }}>
              Get a free social check
            </a>
            <a href="mailto:hello@zainameen.com" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, height: 52, borderRadius: 12, border: "1px solid #3A3935", fontSize: 15, fontWeight: 500, color: "#F2EFEA" }}>
              <MailIcon />
              Email me
            </a>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, paddingTop: 12 }}>
            <span style={{ fontSize: 13.5, color: "#8B877F" }}>I usually reply within a couple of hours.</span>
            <a href="https://www.linkedin.com/in/zain-ameen/" target="_blank" rel="noreferrer" aria-label="LinkedIn" style={{ flex: "0 0 auto", width: 44, height: 44, borderRadius: 12, border: "1px solid #3A3935", display: "flex", alignItems: "center", justifyContent: "center", color: "#F2EFEA" }}>
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
