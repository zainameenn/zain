"use client";

import { useEffect, useRef, useState } from "react";
import { BgImage } from "./Img";

const STEPS = [
  { t: "Diagnose", d: "Find where growth is leaking.", art: "Signals, one problem" },
  { t: "Prioritize", d: "Pick what matters. Ignore the rest, guilt free.", art: "One constraint in focus" },
  { t: "Execute", d: "I do the work, not just point at it.", art: "Work around the constraint" },
  { t: "Learn", d: "Keep what works, cut what doesn't, repeat.", art: "Evidence and feedback" },
];

const BAR_LEFT = ["4%", "30%", "52%", "75.5%"];

export default function Process() {
  const [step, setStep] = useState(0);
  const [locked, setLocked] = useState(false);
  const lockedRef = useRef(false);

  useEffect(() => {
    const t = setInterval(() => {
      if (!lockedRef.current) setStep((s) => (s + 1) % 4);
    }, 4200);
    return () => clearInterval(t);
  }, []);

  const lock = () => {
    lockedRef.current = true;
    setLocked(true);
  };
  const unlock = () => {
    lockedRef.current = false;
    setLocked(false);
  };

  return (
    <section style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(80px,9vw,128px) clamp(20px,4vw,48px) 0" }}>
      <div style={{ maxWidth: 720, margin: "0 auto clamp(32px,4vw,48px)", textAlign: "center" }}>
        <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#6F6B64" }}>How I work</div>
        <h2 className="max-md:!text-balance" style={{ margin: "12px 0 0", fontFamily: "'General Sans', 'General Sans Fallback'", fontWeight: 600, fontSize: "clamp(32px,3.4vw,46px)", lineHeight: 1.06, letterSpacing: "-0.035em" }}>
          Four steps.
          <br />
          <em style={{ fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.1em" }}>No 87 slide strategy deck.</em>
        </h2>
      </div>
      <div style={{ display: "grid", gap: "clamp(32px,5vw,72px)", alignItems: "center" }} className="md:!grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)]">
        <div>
          <div
            role="tablist"
            onMouseEnter={lock}
            onMouseLeave={unlock}
            style={{ borderTop: "1px solid #DDDAD3" }}
          >
            {STEPS.map((s, i) => {
              const on = step === i;
              return (
                <div key={s.t} style={{ position: "relative", borderBottom: "1px solid #DDDAD3" }}>
                  <button
                    role="tab"
                    aria-selected={on}
                    onClick={() => setStep(i)}
                    onMouseEnter={() => setStep(i)}
                    onFocus={() => setStep(i)}
                    style={{ all: "unset", boxSizing: "border-box", cursor: "pointer", width: "100%", display: "grid", gridTemplateColumns: "48px minmax(0,1fr)", gap: "6px 0", padding: "20px 0" }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 600, color: on ? "#7D6039" : "#6F6B64", fontVariantNumeric: "tabular-nums", paddingTop: 8 }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ fontFamily: "'General Sans', 'General Sans Fallback'", fontSize: "clamp(22px,2vw,28px)", fontWeight: 600, letterSpacing: "-0.025em", color: on ? "#1C1C1C" : "#706B61", transition: "color 250ms" }}>{s.t}</span>
                    <span style={{ gridColumn: 2, fontSize: 16, lineHeight: 1.5, color: "#5A5854", maxWidth: 440 }}>{s.d}</span>
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
                      transition: `transform ${on && !locked ? "4200ms" : "300ms"} linear`,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ borderRadius: 28, background: "#F4F0E8", border: "1px solid #E2DBCD", padding: "clamp(24px,3vw,40px) clamp(16px,2vw,28px)" }}>
            <BgImage
              src="/assets/v9/g08.png"
              alt="Illustration: diagnose, prioritize, execute and learn, with a loop back to the start"
              fit={100}
              style={{ aspectRatio: "1448/620" }}
            />
            <div style={{ position: "relative", height: 3, marginTop: 12, borderRadius: 2, background: "#E2DBCD" }}>
              <span style={{ position: "absolute", top: 0, height: 3, width: "19%", borderRadius: 2, background: "#C4A47C", left: 0, transform: `translateX(${(parseFloat(BAR_LEFT[step]) / 19) * 100}%)`, transition: "transform 500ms cubic-bezier(.3,.7,.2,1)" }} />
            </div>
          </div>
          <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#6F6B64" }}>
            <span>{STEPS[step].art}</span>
            <span style={{ color: "#7D6039", whiteSpace: "nowrap" }}>{String(step + 1).padStart(2, "0")} / 04</span>
          </div>
        </div>
      </div>
    </section>
  );
}
