"use client";

import { useState } from "react";

const STEPS: { t: string; d: string }[] = [
  { t: "Audit", d: "Find the technical, content and search problems." },
  { t: "Map demand", d: "Work out what your buyers search for and what you can realistically win." },
  { t: "Fix", d: "Improve existing pages and technical foundations." },
  { t: "Build", d: "Create content and pages around opportunities worth targeting." },
  { t: "Measure", d: "Rankings, qualified traffic, conversions and AI referrals. Keep what works, change what doesn't." },
];

export function SeoStepsTabs() {
  const [active, setActive] = useState(0);

  return (
    <div role="tablist" style={{ marginTop: 28, borderTop: "1px solid #DDDAD3" }}>
      {STEPS.map((s, i) => {
        const on = active === i;
        return (
          <div key={s.t} style={{ position: "relative", borderBottom: "1px solid #DDDAD3" }}>
            <button
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              style={{
                all: "unset",
                boxSizing: "border-box",
                cursor: "pointer",
                width: "100%",
                display: "grid",
                gridTemplateColumns: "44px minmax(0,1fr)",
                gap: "4px 0",
                padding: "16px 0",
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: on ? "#7D6039" : "#6F6B64", paddingTop: 6 }}>{String(i + 1).padStart(2, "0")}</span>
              <h3
                style={{
                  margin: 0,
                  fontFamily: "var(--nf-general-sans)",
                  fontSize: "clamp(20px,1.8vw,24px)",
                  fontWeight: 600,
                  letterSpacing: "-0.02em",
                  color: on ? "#1C1C1C" : "#706B61",
                  transition: "color 250ms",
                }}
              >
                {s.t}
              </h3>
              <span className="max-md:!text-base" style={{ gridColumn: 2, fontSize: 15.5, lineHeight: 1.5, color: "#5A5854", maxWidth: 440 }}>{s.d}</span>
            </button>
            <span
              style={{
                position: "absolute",
                left: 0,
                bottom: -1,
                height: 2,
                width: "100%",
                transform: on ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                background: "#1C1C1C",
                transition: "transform 450ms cubic-bezier(.3,.7,.2,1)",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
