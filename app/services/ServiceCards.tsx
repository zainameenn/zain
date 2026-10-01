"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowIcon } from "../HomeComponents/icons";

// Same names and one line descriptions as SERVICE_MENU in Navbar.tsx.
const SERVICES = [
  { t: "Growth strategy and GTM", d: "Find the real constraint and plan around it.", href: "/services/saas-growth-consultant" },
  { t: "SEO", d: "Original content that ranks on Google and in AI answers.", href: "/services/freelance-seo-expert-for-saas" },
  { t: "Reddit marketing", d: "Show up where buyers ask for recommendations.", href: "/services/reddit-marketing-for-saas" },
  { t: "Social media management", d: "Content, graphics and posting that bring visits.", href: "/services/hire-a-social-media-manager" },
  { t: "Google and Meta ads", d: "Test small, find what converts, then scale.", href: "/services/google-and-meta-ads-specialist" },
];

// Card list styling follows app/HomeComponents/Services.tsx.
export function ServiceCards() {
  const [active, setActive] = useState(0);

  return (
    <div style={{ borderTop: "1px solid #1C1C1C" }}>
      {SERVICES.map((s, i) => {
        const on = active === i;
        return (
          <div key={s.t} style={{ borderBottom: "1px solid #DDDAD3" }}>
            <Link
              href={s.href}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              style={{ display: "flex", flexDirection: "column", gap: 8, padding: "24px 0" }}
              className="lg:!grid lg:!grid-cols-[44px_minmax(0,1fr)_auto] lg:!gap-x-4 lg:!gap-y-2 lg:!items-baseline"
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: on ? "#9A7646" : "#8B877F", fontVariantNumeric: "tabular-nums" }}>{String(i + 1).padStart(2, "0")}</span>
              <span className="max-md:!transform-none" style={{ display: "flex", flexDirection: "column", gap: 8, transform: on ? "translateX(6px)" : "none", transition: "transform 240ms cubic-bezier(.2,.7,.2,1)" }}>
                <h2 className="lg:!whitespace-nowrap" style={{ margin: 0, fontFamily: "'General Sans'", fontSize: "clamp(21px,1.8vw,26px)", fontWeight: 600, letterSpacing: "-0.02em" }}>{s.t}</h2>
                <span style={{ fontSize: 16, lineHeight: 1.5, color: "#5A5854", maxWidth: 520 }}>{s.d}</span>
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14.5, fontWeight: 600, color: on ? "#1C1C1C" : "#8B877F", whiteSpace: "nowrap", transition: "color 200ms" }}>
                <span aria-hidden="true">Explore</span>
                <ArrowIcon style={{ transform: on ? "translateX(4px)" : "none", transition: "transform 200ms" }} />
              </span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
