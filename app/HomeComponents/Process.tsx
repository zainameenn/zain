"use client";

import { useEffect, useRef, useState } from "react";
import { BgImage } from "./Img";

const STEPS = [
  { t: "Understand the Business", d: ["I start with your product, customers, competitors, positioning and existing marketing.", "What have you tried? What's working? Where are customers coming from? Where are you losing them?"], art: "Signals, one problem" },
  { t: "Find the Opportunities", d: ["I look at the search demand, content gaps, customer conversations, competitors and current performance.", "Then I identify the problems and opportunities that are worth addressing first."], art: "One constraint in focus" },
  { t: "Build and Execute", d: ["Depending on the business, that might mean SEO improvements, new landing page copy, content marketing, social media campaigns, Reddit distribution or paid advertising.", "I don't just hand over a document and disappear. I work on the execution too."], art: "Work around the constraint" },
  { t: "Measure and Improve", d: ["We review the results, understand what changed and adjust the strategy.", "The goal is to build repeatable customer acquisition rather than depend on one successful campaign."], art: "Evidence and feedback" },
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
        <h2 className="max-md:!text-balance" style={{ margin: 0, fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(32px,3.4vw,46px)", lineHeight: 1.06, letterSpacing: "-0.035em" }}>
          How I Approach SaaS and{" "}
          <em style={{ fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.1em" }}>Digital Marketing Growth</em>
        </h2>
      </div>
      <div style={{ display: "grid", gap: "clamp(32px,5vw,72px)", alignItems: "center" }} className="md:!grid-cols-[minmax(0,0.82fr)_minmax(0,1fr)]">
        <div>
          <div
            role="tablist"
            onMouseEnter={lock}
            onMouseLeave={unlock}
            style={{ borderTop: "1px solid #E4E0D6" }}
          >
            {STEPS.map((s, i) => {
              const on = step === i;
              return (
                <div key={s.t} style={{ position: "relative", borderBottom: "1px solid #E4E0D6" }}>
                  <button
                    role="tab"
                    aria-selected={on}
                    onClick={() => setStep(i)}
                    onMouseEnter={() => setStep(i)}
                    onFocus={() => setStep(i)}
                    style={{ all: "unset", boxSizing: "border-box", cursor: "pointer", width: "100%", display: "grid", gridTemplateColumns: "48px minmax(0,1fr)", gap: "6px 0", padding: "20px 0" }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 600, color: on ? "#7F5F26" : "#687068", fontVariantNumeric: "tabular-nums", paddingTop: 8 }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{ fontFamily: "var(--nf-general-sans)", fontSize: "clamp(22px,2vw,28px)", fontWeight: 600, letterSpacing: "-0.025em", color: on ? "#202821" : "#687068", transition: "color 250ms" }}>{s.t}</span>
                    <span style={{ gridColumn: 2, fontSize: 16, lineHeight: 1.5, color: "#4A524B", maxWidth: 440 }}>
                      {s.d.map((p) => (
                        <span key={p.slice(0, 20)} style={{ display: "block", marginTop: 6 }}>{p}</span>
                      ))}
                    </span>
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
                      background: "#174B3A",
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
              src="/assets/v9/g08.webp"
              alt="Illustration: diagnose, prioritize, execute and learn, with a loop back to the start"
              fit={100}
              style={{ aspectRatio: "1448/620" }}
            />
            <div style={{ position: "relative", height: 3, marginTop: 12, borderRadius: 2, background: "#E2DBCD" }}>
              <span style={{ position: "absolute", top: 0, height: 3, width: "19%", borderRadius: 2, background: "#B38842", left: 0, transform: `translateX(${(parseFloat(BAR_LEFT[step]) / 19) * 100}%)`, transition: "transform 500ms cubic-bezier(.3,.7,.2,1)" }} />
            </div>
          </div>
          <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#687068" }}>
            <span>{STEPS[step].art}</span>
            <span style={{ color: "#7F5F26", whiteSpace: "nowrap" }}>{String(step + 1).padStart(2, "0")} / 04</span>
          </div>
        </div>
      </div>
    </section>
  );
}
