"use client";

import { useState } from "react";
import { CalendarIcon } from "../HomeComponents/icons";

const BOOKING_URL = "https://calendly.com/zain-ameen/30min";
const EMBED_URL = `${BOOKING_URL}?hide_gdpr_banner=1&background_color=fbfbf9&text_color=1c1c1c&primary_color=1c1c1c`;
const HEIGHT = 720;

/** Calendly only loads after a click, so its 2.6 MB of scripts don't weigh down the contact page. Same box size before and after. */
export function CalendlyEmbed() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div style={{ position: "relative", height: HEIGHT }}>
      {open && (
        <iframe
          src={EMBED_URL}
          title="Book a free 30 minute call with Zain"
          onLoad={() => setLoaded(true)}
          style={{ display: "block", width: "100%", height: HEIGHT, border: 0 }}
        />
      )}
      {!loaded && (
        <div
          style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18, padding: 24, textAlign: "center", background: "#FBFBF9" }}
        >
          <span aria-hidden="true" style={{ width: 56, height: 56, borderRadius: "50%", border: "1px solid #DDD6CA", background: "#F4F0E8", display: "flex", alignItems: "center", justifyContent: "center", color: "#1C1C1C" }}>
            <CalendarIcon size={22} />
          </span>
          <p style={{ margin: 0, fontFamily: "'General Sans', 'General Sans Fallback'", fontSize: 20, fontWeight: 600, letterSpacing: "-0.015em", color: "#1C1C1C" }}>Pick a time that works for you</p>
          <button
            type="button"
            onClick={() => setOpen(true)}
            disabled={open}
            aria-live="polite"
            className="transition-colors hover:!bg-[#33322F]"
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 12, height: 56, padding: "0 26px", border: 0, borderRadius: 12, background: "#1C1C1C", color: "#F8F6F4", fontFamily: "inherit", fontSize: 16, fontWeight: 600, cursor: open ? "progress" : "pointer" }}
          >
            {open ? "Loading available times…" : "Show available times"}
          </button>
          <a href={BOOKING_URL} target="_blank" rel="noopener" style={{ fontSize: 14, color: "#5A5854", borderBottom: "1px solid #CFCBC2" }}>
            Or open the calendar in a new tab
          </a>
        </div>
      )}
    </div>
  );
}
