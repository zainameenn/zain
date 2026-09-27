"use client";

import { useState } from "react";
import { PlusIcon } from "./icons";
import { FAQS } from "./faqData";

export default function FAQ() {
  const [open, setOpen] = useState(-1);

  return (
    <section
      style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(80px,9vw,128px) clamp(20px,4vw,48px) 0", display: "grid", gap: "24px clamp(40px,5vw,80px)", alignItems: "start" }}
      className="md:!grid-cols-[minmax(0,0.58fr)_minmax(0,1fr)]"
    >
      <div>
        <div style={{ fontSize: 12.5, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#8B877F" }}>FAQ</div>
        <h2 style={{ margin: "12px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(30px,3vw,42px)", lineHeight: 1.06, letterSpacing: "-0.03em" }}>
          Questions people
          <br />
          usually ask first.
        </h2>
        <img
          src="/assets/v12/art-b.png"
          alt="Illustration: questions flowing to a marketer at a desk and coming out as checked answers"
          width={1086}
          height={1448}
          loading="lazy"
          style={{ display: "block", marginTop: "clamp(28px,3vw,40px)", width: "100%", maxWidth: "420px", height: "auto", objectFit: "contain", mixBlendMode: "multiply" }}
        />
      </div>
      <div style={{ borderTop: "1px solid #1C1C1C" }}>
        {FAQS.map(([q, paras], i) => {
          const isOpen = open === i;
          return (
            <div key={q} style={{ borderBottom: "1px solid #DDDAD3" }}>
              <button
                onClick={() => setOpen((o) => (o === i ? -1 : i))}
                aria-expanded={isOpen}
                style={{
                  all: "unset",
                  boxSizing: "border-box",
                  cursor: "pointer",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 24,
                  padding: "22px 0",
                  fontFamily: "'General Sans'",
                  fontSize: "clamp(18px,1.4vw,20px)",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  lineHeight: 1.3,
                }}
              >
                <h3 style={{ margin: 0, font: "inherit", letterSpacing: "inherit" }}>{q}</h3>
                <span style={{ flex: "0 0 auto", width: 28, height: 28, borderRadius: "50%", border: "1px solid #CFCBC2", display: "flex", alignItems: "center", justifyContent: "center", transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 220ms" }}>
                  <PlusIcon />
                </span>
              </button>
              {isOpen && (
                <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "0 48px 28px 0", maxWidth: 720 }}>
                  {paras.map((p, j) => (
                    <p key={j} style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: "#4E4C48" }}>
                      {p}
                    </p>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
