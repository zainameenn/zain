"use client";

import { useState } from "react";
import { ArrowIcon } from "./icons";
import { COMPLETE_GROWTH, SEO_AUDIT, SERVICES } from "@/lib/pricing";

// Prices come from lib/pricing.ts so the homepage always matches the pricing and service pages.
const monthlyFrom = (id: keyof typeof SERVICES) => `$${Math.min(...SERVICES[id].packages.filter((p) => p.interval === "month" && p.price).map((p) => p.price!)).toLocaleString("en-US")}`;

function Row({ n, title, children, price, sub, cta }: { n: string; title: string; children: React.ReactNode; price: string; sub?: string; cta?: { label: string } }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "grid",
        gap: "10px 24px",
        alignItems: "center",
        padding: "clamp(28px,3vw,38px) clamp(0px,1vw,16px)",
        borderTop: "1px solid #E4E0D6",
        background: hover ? "#F3F0EA" : "transparent",
        transition: "background 200ms",
      }}
      className="md:!grid-cols-[minmax(0,0.8fr)_minmax(0,2.6fr)_minmax(0,4.5fr)_minmax(0,2.1fr)] max-md:!justify-items-center max-md:!text-center"
    >
      <span style={{ fontSize: 13, fontWeight: 600, color: "#7F5F26", fontVariantNumeric: "tabular-nums" }}>{n}</span>
      <h3 style={{ margin: 0, fontFamily: "var(--nf-general-sans)", fontSize: "clamp(20px,1.7vw,24px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{title}</h3>
      <div style={{ maxWidth: 540 }}>{children}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }} className="items-start md:!items-end md:text-right max-md:!items-center">
        <p style={{ margin: 0, fontFamily: "var(--nf-general-sans)", fontSize: "clamp(24px,2.2vw,32px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, whiteSpace: "nowrap" }}>{price}</p>
        {sub && <span style={{ fontSize: 13, fontWeight: 500, color: "#687068" }}>{sub}</span>}
        {cta && (
          <a href="#contact" className="max-md:relative max-md:after:absolute max-md:after:inset-x-0 max-md:after:-inset-y-3.5 max-md:after:content-['']" style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "#202821", borderBottom: "1.5px solid #202821", paddingBottom: 2 }}>
            {cta.label}
            <ArrowIcon />
          </a>
        )}
      </div>
    </div>
  );
}

export default function Pricing() {
  const [wayHover, setWayHover] = useState(false);

  return (
    <section id="pricing" className="max-md:!pt-20" style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(96px,9vw,128px) clamp(20px,4vw,48px) 0" }}>
      <div style={{ maxWidth: 720, margin: "0 auto clamp(40px,4vw,56px)", textAlign: "center" }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#687068" }}>Working Together</div>
          <h2 style={{ margin: "12px 0 0", fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(36px,3.6vw,50px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
            Hire a Marketing Specialist{" "}
            <em style={{ fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.12em" }}>Without Building a Whole Marketing Team.</em>
          </h2>
        </div>
        {[
          "Not every business needs the same marketing package.",
          "Some need a one-time SEO audit. Others need someone to take ownership of social media or Reddit marketing. And some need help connecting several acquisition channels.",
          "I offer smaller starting points and ongoing marketing services, depending on what you need.",
        ].map((t, i) => (
          <p key={t.slice(0, 20)} style={{ margin: `${i ? 10 : 16}px auto 0`, fontSize: 16.5, lineHeight: 1.55, color: "#4A524B", maxWidth: 560 }}>{t}</p>
        ))}
      </div>

      <div className="max-md:!justify-center" style={{ display: "flex", alignItems: "center", gap: 12, margin: "0 0 4px", fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#687068" }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#B38842" }} />
        Start here
      </div>
      <div style={{ borderBottom: "1px solid #E4E0D6" }}>
        <Row n="01" title="Free Social Media Check" price="Free" cta={{ label: "Get a Free Social Media Check" }}>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "#4A524B" }}>I&apos;ll review your current social media presence and identify where I&apos;d start improving it.</p>
        </Row>
        <Row n="02" title="SEO Audit" price={`$${SEO_AUDIT.price}`} sub="one time" cta={{ label: "Request an SEO Audit" }}>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "#4A524B" }}>A review of your site&apos;s technical health, search opportunities, content and on-page SEO issues.</p>
          <p style={{ margin: "6px 0 0", fontSize: 16, lineHeight: 1.55, color: "#4A524B" }}>You&apos;ll get a prioritized list of what needs attention.</p>
        </Row>
      </div>

      <div style={{ height: "clamp(48px,5vw,64px)" }} />

      <div className="max-md:!justify-center" style={{ display: "flex", alignItems: "center", gap: 12, margin: "0 0 4px", fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#687068" }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#B38842" }} />
        Ongoing
      </div>
      <div style={{ borderBottom: "1px solid #E4E0D6" }}>
        <Row n="03" title="Social Media Management" price={`From ${monthlyFrom("social")}`} sub="per month">
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "#4A524B" }}>Content strategy, writing, branded graphics and scheduling for the platforms that matter to your business.</p>
        </Row>
        <Row n="04" title="Reddit Marketing" price={`From ${monthlyFrom("reddit")}`} sub="per month">
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "#4A524B" }}>Community research, content development and relevant Reddit participation focused on your target audience.</p>
        </Row>
        <Row n="05" title="SaaS SEO Services" price={`From ${monthlyFrom("seo")}`} sub="per month">
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "#4A524B" }}>Search strategy, keyword research, technical assessments, on-page optimization and ongoing organic growth work.</p>
        </Row>
      </div>

      <div
        style={{ marginTop: "clamp(40px,4vw,56px)", borderRadius: 28, background: "#174B3A", color: "#F2EFEA", padding: "clamp(32px,4vw,56px)", display: "grid", gap: "40px clamp(32px,5vw,72px)", alignItems: "center" }}
        className="md:!grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]"
      >
        <div className="max-md:!text-center">
          <div className="max-md:!justify-center" style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#D3AE82" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#D3AE82" }} />
            06
          </div>
          <h3 style={{ margin: "18px 0 0", fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(34px,3.4vw,48px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
            Complete <em style={{ fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.1em", color: "#D3AE82" }}>Growth</em>
          </h3>
          <p className="max-md:!mx-auto" style={{ margin: "18px 0 0", maxWidth: 460, fontSize: 17, lineHeight: 1.55, color: "#D6E0DA" }}>
            For businesses that need help across more than one marketing channel.
          </p>
          <p className="max-md:!mx-auto" style={{ margin: "10px 0 0", maxWidth: 460, fontSize: 17, lineHeight: 1.55, color: "#F2EFEA" }}>
            Strategy, execution planning and up to two active channels at a time, based on the agreed scope.
          </p>
          <ul style={{ margin: "28px 0 0", padding: 0, listStyle: "none", display: "grid", gap: "0 32px", maxWidth: 520, borderTop: "1px solid #2E6150" }} className="grid-cols-1 sm:!grid-cols-2 max-md:!mx-auto max-md:!text-left">
            {COMPLETE_GROWTH.highlights.map((t) => (
              <li key={t} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0", borderBottom: "1px solid #2E6150", fontSize: 15, color: "#E6E1D8" }}>
                <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: "50%", background: "#B38842", flex: "0 0 auto" }} />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }} className="md:!pl-[clamp(32px,4vw,56px)] md:!border-l md:!border-[#2E6150] max-md:!text-center">
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#A9BDB3" }}>Starts at</div>
            <div className="max-md:!justify-center" style={{ marginTop: 6, display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontFamily: "var(--nf-general-sans)", fontSize: "clamp(48px,5vw,68px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>${COMPLETE_GROWTH.price?.toLocaleString("en-US")}</span>
              <span style={{ fontSize: 15, color: "#A9BDB3" }}>per month</span>
            </div>
          </div>
          <a
            href="#contact"
            className="max-md:!w-full max-md:!max-w-[400px] max-md:!justify-center max-md:!self-center"
            onMouseEnter={() => setWayHover(true)}
            onMouseLeave={() => setWayHover(false)}
            style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 12, height: 52, padding: "0 24px", borderRadius: 12, background: wayHover ? "#D3AE82" : "#F2EFEA", color: "#202821", fontSize: 15.5, fontWeight: 600, transition: "background 180ms" }}
          >
            Discuss Your Marketing Needs
            <ArrowIcon style={{ transform: wayHover ? "translateX(4px)" : "none", transition: "transform 200ms" }} />
          </a>
        </div>
      </div>

    </section>
  );
}
