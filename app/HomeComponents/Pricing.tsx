"use client";

import { useState } from "react";
import { ArrowIcon } from "./icons";

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
        borderTop: "1px solid #DDDAD3",
        background: hover ? "#F3F0EA" : "transparent",
        transition: "background 200ms",
      }}
      className="md:!grid-cols-[minmax(0,0.8fr)_minmax(0,2.6fr)_minmax(0,4.5fr)_minmax(0,2.1fr)] max-md:!justify-items-center max-md:!text-center"
    >
      <span style={{ fontSize: 13, fontWeight: 600, color: "#9A7646", fontVariantNumeric: "tabular-nums" }}>{n}</span>
      <h3 style={{ margin: 0, fontFamily: "'General Sans'", fontSize: "clamp(20px,1.7vw,24px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{title}</h3>
      <div style={{ maxWidth: 540 }}>{children}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }} className="items-start md:!items-end md:text-right max-md:!items-center">
        <p style={{ margin: 0, fontFamily: "'General Sans'", fontSize: "clamp(24px,2.2vw,32px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05, whiteSpace: "nowrap" }}>{price}</p>
        {sub && <span style={{ fontSize: 13, fontWeight: 500, color: "#77746E" }}>{sub}</span>}
        {cta && (
          <a href="#contact" className="max-md:relative max-md:after:absolute max-md:after:inset-x-0 max-md:after:-inset-y-3.5 max-md:after:content-['']" style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "#1C1C1C", borderBottom: "1.5px solid #1C1C1C", paddingBottom: 2 }}>
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
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#8B877F" }}>Pricing</div>
          <h2 style={{ margin: "12px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(36px,3.6vw,50px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
            Senior work.
            <br />
            <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.12em" }}>Freelancer pricing.</em>
          </h2>
        </div>
        <p style={{ margin: "16px auto 0", fontSize: 16.5, lineHeight: 1.55, color: "#5A5854", maxWidth: 420 }}>No long contracts. No agency markup. Monthly work is billed weekly or every two weeks.</p>
      </div>

      <div className="max-md:!justify-center" style={{ display: "flex", alignItems: "center", gap: 12, margin: "0 0 4px", fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#8B877F" }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C4A47C" }} />
        Start here
      </div>
      <div style={{ borderBottom: "1px solid #DDDAD3" }}>
        <Row n="01" title="Social media check" price="Free" cta={{ label: "Get the free check" }}>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "#4E4C48" }}>I&apos;ll look at why your posts aren&apos;t getting seen.</p>
          <p style={{ margin: "6px 0 0", fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: 19, lineHeight: 1.3, color: "#77746E" }}>Coffee&apos;s on me.</p>
        </Row>
        <Row n="02" title="Full website & SEO audit" price="$499" sub="one time" cta={{ label: "Start with an audit" }}>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "#4E4C48" }}>
            Everything on your site, ranked by what to fix first. Most audits give you a list. This one tells you the order.
          </p>
        </Row>
      </div>

      <div style={{ height: "clamp(48px,5vw,64px)" }} />

      <div className="max-md:!justify-center" style={{ display: "flex", alignItems: "center", gap: 12, margin: "0 0 4px", fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#8B877F" }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C4A47C" }} />
        Ongoing
      </div>
      <div style={{ borderBottom: "1px solid #DDDAD3" }}>
        <Row n="03" title="Social media management" price="$1,199" sub="per month">
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "#4E4C48" }}>
            Five posts a week, strategy, graphics, and I keep an eye on the groups and communities where your buyers hang out.
          </p>
          <p className="max-md:!text-base" style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.5, color: "#77746E" }}>Adding video or extra platforms? $1,199 to $1,499, depending on how many platforms I&apos;m handling.</p>
        </Row>
        <Row n="04" title="Reddit marketing" price="$1,199" sub="per month">
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "#4E4C48" }}>
            Posts, comments and threads in the communities your buyers actually read. Built to rank on Google and get picked up by AI answers, without getting banned.
          </p>
          <p className="max-md:!text-base" style={{ margin: "8px 0 0", fontSize: 14, lineHeight: 1.5, color: "#77746E" }}>The same approach behind thousands of Reddit conversions with $0 on ads.</p>
        </Row>
        <Row n="05" title="SEO" price="$1,999" sub="per month">
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: "#4E4C48" }}>Research, original articles and backlinks.</p>
          <p style={{ margin: "6px 0 0", fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: 19, lineHeight: 1.3, color: "#77746E" }}>
            The part everyone quietly hates doing.
          </p>
        </Row>
      </div>

      <div
        style={{ marginTop: "clamp(40px,4vw,56px)", borderRadius: 28, background: "#171717", color: "#F2EFEA", padding: "clamp(32px,4vw,56px)", display: "grid", gap: "40px clamp(32px,5vw,72px)", alignItems: "center" }}
        className="md:!grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]"
      >
        <div className="max-md:!text-center">
          <div className="max-md:!justify-center" style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#D3AE82" }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#D3AE82" }} />
            06 · Best value
          </div>
          <h3 style={{ margin: "18px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(34px,3.4vw,48px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
            Everything, <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.1em", color: "#D3AE82" }}>handled.</em>
          </h3>
          <p className="max-md:!mx-auto" style={{ margin: "18px 0 0", maxWidth: 460, fontSize: 17, lineHeight: 1.55, color: "#C9C4BA" }}>
            SEO, Reddit, social media, content and design.
            <br />
            <span style={{ color: "#F2EFEA" }}>One person, one plan, one invoice.</span>
          </p>
          <ul style={{ margin: "28px 0 0", padding: 0, listStyle: "none", display: "grid", gap: "0 32px", maxWidth: 520, borderTop: "1px solid #33322F" }} className="grid-cols-1 sm:!grid-cols-2 max-md:!mx-auto max-md:!text-left">
            {["Growth strategy", "SEO", "Reddit marketing", "Social media", "Content", "Design"].map((t) => (
              <li key={t} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 0", borderBottom: "1px solid #33322F", fontSize: 15, color: "#E6E1D8" }}>
                <span aria-hidden="true" style={{ width: 5, height: 5, borderRadius: "50%", background: "#C4A47C", flex: "0 0 auto" }} />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }} className="md:!pl-[clamp(32px,4vw,56px)] md:!border-l md:!border-[#33322F] max-md:!text-center">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, paddingBottom: 14, borderBottom: "1px solid #33322F", fontSize: 14.5, color: "#9C978D" }}>
            <span>Separately</span>
            <span style={{ textDecoration: "line-through", textDecorationColor: "#6B675F", fontVariantNumeric: "tabular-nums" }}>$4,397/month</span>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#9C978D" }}>Together</div>
            <div className="max-md:!justify-center" style={{ marginTop: 6, display: "flex", alignItems: "baseline", gap: 10 }}>
              <span style={{ fontFamily: "'General Sans'", fontSize: "clamp(48px,5vw,68px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>$3,999</span>
              <span style={{ fontSize: 15, color: "#9C978D" }}>per month</span>
            </div>
          </div>
          <p className="max-md:!mx-auto max-md:!text-base" style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: "#9C978D", maxWidth: 340 }}>
            Plus you&apos;d skip managing four freelancers, which is honestly worth more than the $398.
          </p>
          <a
            href="#contact"
            className="max-md:!w-full max-md:!max-w-[400px] max-md:!justify-center max-md:!self-center"
            onMouseEnter={() => setWayHover(true)}
            onMouseLeave={() => setWayHover(false)}
            style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 12, height: 52, padding: "0 24px", borderRadius: 12, background: wayHover ? "#D3AE82" : "#F2EFEA", color: "#171717", fontSize: 15.5, fontWeight: 600, transition: "background 180ms" }}
          >
            Tell me what&apos;s stuck
            <ArrowIcon style={{ transform: wayHover ? "translateX(4px)" : "none", transition: "transform 200ms" }} />
          </a>
          <p className="max-md:!text-base" style={{ margin: 0, fontSize: 13.5, lineHeight: 1.5, color: "#8B877F" }}>
            Not sure you need all of it?
            <br />
            <a href="#contact" className="max-md:relative max-md:after:absolute max-md:after:inset-x-0 max-md:after:-inset-y-3.5 max-md:after:content-['']" style={{ color: "#D3AE82", borderBottom: "1px solid #6B5A40" }}>Start with the free check.</a>
          </p>
        </div>
      </div>

      <div style={{ marginTop: "clamp(40px,4vw,56px)", display: "flex", flexDirection: "column", alignItems: "center", gap: 16, textAlign: "center" }}>
        <a href="#contact" className="max-md:!w-full max-md:!max-w-[400px] max-md:!justify-center max-md:!self-center" style={{ display: "inline-flex", alignItems: "center", gap: 12, height: 48, padding: "0 22px", borderRadius: 12, border: "1px solid #1C1C1C", color: "#1C1C1C", fontSize: 15, fontWeight: 600 }}>
          Not sure which? Tell me what&apos;s stuck
          <ArrowIcon />
        </a>
      </div>
    </section>
  );
}
