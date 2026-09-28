"use client";

import { useEffect, useRef, useState } from "react";

const METRICS = [
  { v: "100K+", l: "users brought in", fs: "clamp(42px,4.2vw,58px)" },
  { v: "85K+", l: "for one SaaS, no ads", fs: "clamp(42px,4.2vw,58px)" },
  { v: "50M+", l: "search impressions", fs: "clamp(42px,4.2vw,58px)" },
  { v: "Thousands", l: "Reddit conversions, $0 ad spend", fs: "clamp(34px,3.4vw,46px)" },
];

export default function Proof() {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window) || !ref.current) {
      queueMicrotask(() => setSeen(true));
      return;
    }
    const io = new IntersectionObserver(
      (es) => {
        if (es.some((e) => e.isIntersecting)) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ maxWidth: 1360, margin: "0 auto", padding: "0 clamp(20px,4vw,48px)" }}>
      <div
        style={{ display: "grid", borderTop: "1px solid #1C1C1C", borderBottom: "1px solid #DDDAD3" }}
        className="!grid-cols-2 sm:!grid-cols-4"
      >
        {METRICS.map((m, i) => (
          <div
            key={m.v}
            style={{
              padding: `32px 16px 32px ${i ? "clamp(24px,2.4vw,32px)" : "0px"}`,
              borderLeft: i ? "1px solid #DDDAD3" : "0",
              minWidth: 0,
            }}
          >
            <div style={{ fontFamily: "'General Sans'", fontSize: m.fs, fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{m.v}</div>
            <div style={{ marginTop: 12, fontSize: 14.5, lineHeight: 1.4, color: "#5A5854", maxWidth: 220 }}>{m.l}</div>
            <span
              style={{
                display: "block",
                marginTop: 16,
                height: 2,
                width: seen ? "40px" : "0px",
                background: "#C4A47C",
                transition: `width 700ms cubic-bezier(.3,.7,.2,1) ${i * 120}ms`,
              }}
            />
          </div>
        ))}
      </div>
      <p style={{ margin: "14px 0 0", fontSize: 13, color: "#8B877F", textAlign: "right" }}>Across SaaS and service clients.</p>
    </section>
  );
}
