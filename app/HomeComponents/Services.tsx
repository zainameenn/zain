"use client";

import { useState } from "react";
import { ArrowIcon } from "./icons";
import { BgImage } from "./Img";

const SERVICES = [
  { name: "SaaS Growth Marketing Consultant", line: "Growth strategy, go-to-market planning, customer acquisition and conversion improvements. I help identify what's holding a SaaS product back, prioritize the opportunities and work on the channels most likely to bring the right users.", href: "/services/saas-growth-consultant", linkLabel: "Explore SaaS Growth Consulting" },
  { name: "SEO Specialist for SaaS", line: "Keyword research, search intent analysis, technical SEO, content strategy, on-page optimization and internal linking. I help software businesses make their websites easier to discover through Google and other search experiences, with a focus on attracting relevant visitors.", href: "/services/seo-specialist-for-saas", linkLabel: "Explore SaaS SEO Services" },
  { name: "Reddit Marketing Specialist", line: "Reddit audience research, community analysis, useful content, relevant conversations and organic distribution. I help businesses understand what people are discussing in their niche and participate in ways that are genuinely useful.", href: "/services/reddit-marketing-specialist", linkLabel: "Explore Reddit Marketing" },
  { name: "Social Media Marketing Specialist", line: "Social media strategy, content planning, writing, branded graphics, platform-specific publishing and performance reviews. I work on social content that supports your business goals instead of treating the number of posts published as the result.", href: "/services/social-media-marketing-specialist", linkLabel: "Explore Social Media Marketing" },
  { name: "Google Ads and Meta Ads Specialist", line: "Campaign research, targeting, ad copy, creative testing, conversion tracking and performance optimization. I can help set up and improve paid acquisition once your offer, landing pages and tracking are ready.", href: "/services/google-and-meta-ads-specialist", linkLabel: "Explore Paid Advertising Services" },
];

export default function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(80px,9vw,128px) clamp(20px,4vw,48px) 0" }}>
      <div style={{ maxWidth: 720, margin: "0 auto 32px", textAlign: "center" }}>
        <div>
          <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#6F6B64" }}>Marketing Services</div>
          <h2 style={{ margin: "12px 0 0", fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(34px,3.8vw,52px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
            Marketing Services for SaaS, <em style={{ fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.1em" }}>Startups and Growing Businesses</em>
          </h2>
        </div>
        <p style={{ margin: "16px auto 0", fontSize: 17, lineHeight: 1.55, color: "#5A5854", maxWidth: 520 }}>I work with founders and small teams that need practical marketing help without building a full department.</p>
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
                    <h3 style={{ margin: 0, fontFamily: "var(--nf-general-sans)", fontSize: "clamp(21px,1.8vw,26px)", fontWeight: 600, letterSpacing: "-0.02em" }}>{s.name}</h3>
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
            src="/assets/v9/g10.webp"
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
