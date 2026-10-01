"use client";

import { useEffect, useState } from "react";
import { ArrowIcon, UpArrowIcon } from "./icons";

export default function Hero() {
  const [drawn, setDrawn] = useState(false);
  const [ctaHover, setCtaHover] = useState(false);
  const [workHover, setWorkHover] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDrawn(true), 350);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      style={{
        maxWidth: 1360,
        margin: "0 auto",
        padding: "clamp(40px,5vw,72px) clamp(20px,4vw,48px) clamp(48px,5vw,80px)",
        display: "grid",
        gridTemplateColumns: "minmax(0,1.08fr) minmax(0,1fr)",
        gap: "clamp(40px,4vw,64px)",
        alignItems: "center",
      }}
      className="!grid-cols-1 md:!grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)]"
    >
      <div style={{ minWidth: 0 }} className="max-md:!text-center">
        <h1 className="max-md:!block max-md:!text-balance" style={{ margin: 0, display: "flex", alignItems: "center", gap: 10, fontSize: 12.5, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#5A5854" }}>
          <span aria-hidden="true" className="max-md:!mr-2.5 max-md:!inline-block max-md:!align-middle" style={{ width: 8, height: 8, borderRadius: "50%", background: "#C4A47C", flex: "0 0 auto" }} />
          Growth marketing specialist for SaaS and service businesses
        </h1>
        <p
          style={{
            margin: "24px 0 0",
            maxWidth: 600,
            fontFamily: "'General Sans',sans-serif",
            fontWeight: 500,
            fontSize: "clamp(38px,5vw,74px)",
            lineHeight: 1.01,
            letterSpacing: "-0.035em",
          }}
        >
          Marketing <br className="md:hidden" />shouldn&apos;t feel like a{" "}
          <span style={{ display: "block", marginTop: ".04em", fontSize: "1.1em", lineHeight: 0.95 }}>
            <span style={{ position: "relative", display: "inline-block" }}>
              <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "inherit" }}>
                second full time job.
              </em>
              <svg
                aria-hidden="true"
                viewBox="0 0 300 24"
                preserveAspectRatio="none"
                style={{ position: "absolute", left: "-3%", bottom: "-0.16em", width: "109%", height: "0.3em", overflow: "visible", pointerEvents: "none" }}
              >
                <path
                  pathLength={1}
                  d="M3 13 C 60 20, 150 21, 216 15 S 286 6, 297 4"
                  stroke="#C6A47C"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  vectorEffect="non-scaling-stroke"
                  fill="none"
                  style={{ strokeDasharray: 1, strokeDashoffset: drawn ? 0 : 1, transition: "stroke-dashoffset 650ms cubic-bezier(.3,.7,.2,1)" }}
                />
              </svg>
            </span>
          </span>
        </p>
        <p className="max-md:!mx-auto max-md:!mt-7" style={{ margin: "36px 0 0", maxWidth: 540, fontSize: 19, lineHeight: 1.55, color: "#4E4C48" }}>
          I find what&apos;s actually blocking your growth, then fix it myself. SEO, Reddit, social media, content, design and ads, handled by one person instead of five.
        </p>
        <div style={{ marginTop: 36, display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 16px" }} className="max-md:!mx-auto max-md:!mt-8 max-md:!max-w-[400px] max-md:!flex-col max-md:!items-stretch">
          <a
            href="#contact"
            className="max-md:!justify-center"
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
            style={{ display: "flex", alignItems: "center", gap: 12, height: 56, padding: "0 26px", borderRadius: 12, background: ctaHover ? "#33322F" : "#1C1C1C", color: "#F8F6F4", fontSize: 16, fontWeight: 600, transition: "background 180ms" }}
          >
            Tell me what&apos;s stuck
            <ArrowIcon size={14} style={{ transform: ctaHover ? "translateX(4px)" : "none", transition: "transform 200ms" }} />
          </a>
          <a
            href="#work"
            className="max-md:!justify-center"
            onMouseEnter={() => setWorkHover(true)}
            onMouseLeave={() => setWorkHover(false)}
            style={{ display: "flex", alignItems: "center", gap: 10, height: 56, padding: "0 22px", borderRadius: 12, border: `1px solid ${workHover ? "#1C1C1C" : "#CFCBC2"}`, background: workHover ? "#F8F6F4" : "transparent", fontSize: 16, fontWeight: 500, transition: "background 180ms,border-color 180ms" }}
          >
            See the results
            <UpArrowIcon style={{ transform: workHover ? "translateY(3px)" : "none", transition: "transform 200ms" }} />
          </a>
        </div>
        <p className="max-md:!block" style={{ margin: "14px 0 0", display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "#77746E" }}>
          <span aria-hidden="true" className="max-md:!mr-2.5 max-md:!inline-block max-md:!align-middle" style={{ width: 6, height: 6, borderRadius: "50%", background: "#C4A47C", flex: "0 0 auto" }} />
          I usually reply within a couple of hours. No 60 minute discovery call.
        </p>
      </div>

      <figure style={{ margin: "0 0 0 0", minWidth: 0, animation: "zin 800ms cubic-bezier(.2,.7,.2,1) 120ms both" }}>
        <div
          role="img"
          aria-label="Illustration of a founder calmly reviewing marketing dashboards"
          style={{ aspectRatio: "1448/960", background: "url('/assets/v9/g07.png') 50% 50%/100% auto no-repeat" }}
        />
      </figure>
    </section>
  );
}
