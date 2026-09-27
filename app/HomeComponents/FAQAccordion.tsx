"use client";

import { useState } from "react";
import { PlusIcon } from "./icons";

export function FAQAccordion({ faqs }: { faqs: [string, string[]][] }) {
  const [open, setOpen] = useState(-1);

  return (
    <div style={{ borderTop: "1px solid #1C1C1C" }}>
      {faqs.map(([q, paras], i) => {
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
  );
}
