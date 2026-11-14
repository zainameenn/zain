"use client";

import { useEffect, useRef, useState } from "react";

const METRICS: { v: string; l: string; fs: string; mobile?: string }[] = [
  { v: "100K+", l: "Users acquired across projects", fs: "clamp(42px,4.2vw,58px)" },
  { v: "85K+", l: "Signups for one SaaS without paid ads", fs: "clamp(42px,4.2vw,58px)" },
  { v: "50M+", l: "Search impressions across projects", fs: "clamp(42px,4.2vw,58px)" },
  { v: "160K+", l: "Facebook views in 28 days for a service business", fs: "clamp(42px,4.2vw,58px)" },
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
        style={{ display: "grid", borderTop: "1px solid #202821", borderBottom: "1px solid #E4E0D6" }}
        className="!grid-cols-2 sm:!grid-cols-4"
      >
        {METRICS.map((m, i) => (
          <div
            key={m.v}
            className={`max-md:!px-2 max-md:!text-center ${i % 2 === 0 ? "max-sm:!border-l-0" : ""} ${i >= 2 ? "max-sm:!border-t max-sm:!border-t-[#E4E0D6]" : ""}`}
            style={{
              padding: `32px 16px 32px ${i ? "clamp(24px,2.4vw,32px)" : "0px"}`,
              borderLeft: i ? "1px solid #E4E0D6" : "0",
              minWidth: 0,
            }}
          >
            <div className={m.mobile} style={{ fontFamily: "var(--nf-general-sans)", fontSize: m.fs, fontWeight: 600, letterSpacing: "-0.035em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{m.v}</div>
            <div className="max-md:!mx-auto max-md:!text-balance" style={{ marginTop: 12, fontSize: 14.5, lineHeight: 1.4, color: "#4A524B", maxWidth: 220 }}>{m.l}</div>
            <span
              className="max-md:!mx-auto max-md:!origin-center"
              style={{
                display: "block",
                marginTop: 16,
                height: 2,
                width: 40,
                transform: seen ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
                background: "#B38842",
                transition: `transform 700ms cubic-bezier(.3,.7,.2,1) ${i * 120}ms`,
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
