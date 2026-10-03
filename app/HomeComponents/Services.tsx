"use client";

import { useState } from "react";
import { ArrowIcon } from "./icons";
import { BgImage } from "./Img";

const SERVICES = [
  { name: "Growth strategy and GTM", line: "Find the real constraint and plan around it.", href: "/services/saas-growth-consultant", linkLabel: "SaaS growth consultant" },
  { name: "SEO", line: "Original content that ranks on Google and shows up in AI answers.", href: "/services/seo-specialist-for-saas", linkLabel: "SEO specialist for SaaS" },
  { name: "Reddit marketing", line: "Show up where buyers ask for recommendations, without getting banned.", href: "/services/reddit-marketing-specialist", linkLabel: "Reddit marketing specialist" },
  { name: "Social media management", line: "Content, graphics and posting that bring visits, not just likes.", href: "/services/social-media-marketing-specialist", linkLabel: "Social media marketing specialist" },
  { name: "Google and Meta ads", line: "Test small, find what converts, then scale. Only once the funnel can handle the traffic.", href: "/services/google-and-meta-ads-specialist", linkLabel: "Google and Meta ads specialist" },
];

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(80px,9vw,128px) clamp(20px,4vw,48px) 0" }}>
      <div style={{ maxWidth: 720, margin: "0 auto 32px", textAlign: "center" }}>
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#6F6B64" }}>Capabilities</div>
          <h2 style={{ margin: "12px 0 0", fontFamily: "'General Sans', 'General Sans Fallback'", fontWeight: 600, fontSize: "clamp(34px,3.8vw,52px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>What I can help with.</h2>
        </div>
        <p style={{ margin: "16px auto 0", fontSize: 17, lineHeight: 1.55, color: "#5A5854", maxWidth: 440 }}>If you already know the channel, great. If you don&apos;t, that&apos;s kind of my thing.</p>
      </div>
      <div style={{ display: "grid", gap: "clamp(32px,4vw,64px)", alignItems: "start" }} className="md:!grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div style={{ borderTop: "1px solid #1C1C1C" }}>
          {SERVICES.map((s, i) => {
            const on = active === i;
            return (
              <div key={s.name} style={{ borderBottom: "1px solid #DDDAD3" }}>
                <a
                  href={s.href}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  style={{ display: "flex", flexDirection: "column", gap: 8, padding: "24px 0" }}
                  className="lg:!grid lg:!grid-cols-[44px_minmax(0,1fr)_auto] lg:!gap-x-4 lg:!gap-y-2 lg:!items-baseline"
                >
                  <span style={{ fontSize: 13, fontWeight: 600, color: on ? "#7D6039" : "#6F6B64", fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</span>
                  <span className="max-md:!transform-none" style={{ display: "flex", flexDirection: "column", gap: 8, transform: on ? "translateX(6px)" : "none", transition: "transform 240ms cubic-bezier(.2,.7,.2,1)" }}>
                    <h3 className="lg:!whitespace-nowrap" style={{ margin: 0, fontFamily: "'General Sans', 'General Sans Fallback'", fontSize: "clamp(21px,1.8vw,26px)", fontWeight: 600, letterSpacing: "-0.02em" }}>{s.name}</h3>
                    <span style={{ fontSize: 16, lineHeight: 1.5, color: "#5A5854", maxWidth: 520 }}>{s.line}</span>
                  </span>
                  <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14.5, fontWeight: 600, color: on ? "#1C1C1C" : "#6F6B64", whiteSpace: "nowrap", transition: "color 200ms" }}>
                    <span>{s.linkLabel}</span>
                    <ArrowIcon style={{ transform: on ? "translateX(4px)" : "none", transition: "transform 200ms" }} />
                  </span>
                </a>
              </div>
            );
          })}
        </div>
        <figure style={{ margin: 0, minWidth: 0, position: "sticky", top: 112, borderRadius: 28, background: "#F8F6F4", border: "1px solid #E2DFD8", padding: "clamp(20px,2.4vw,32px) clamp(12px,1.6vw,24px)" }}>
          <BgImage
            src="/assets/v9/g10.png"
            alt="Illustration: ads, search and content channels feeding one growth engine that outputs performance and revenue"
            fit={100}
            style={{ aspectRatio: "1448/880" }}
          />
          <figcaption style={{ display: "flex", justifyContent: "space-between", gap: 16, marginTop: 8, padding: "14px 8px 0", borderTop: "1px solid #E2DFD8", fontSize: 11.5, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#6E6B66" }}>
            <span>Channels</span>
            <span>One system</span>
            <span style={{ color: "#7D6039" }}>Growth</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
