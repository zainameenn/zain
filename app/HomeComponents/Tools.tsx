"use client";

import { useState } from "react";

const SI = (s: string) => `https://cdn.simpleicons.org/${s}`;
const V9 = "/assets/v9/";

const TOOLS_DEF: [string, string | null, string?, number?, number?][] = [
  ["Ahrefs", null, "t_ahrefs.png", 26, 3.49],
  ["Semrush", "semrush"],
  ["Ubersuggest", null, "t_ubersuggest.png", 20, 6.03],
  ["Google Search Console", "googlesearchconsole"],
  ["Google Analytics", "googleanalytics"],
  ["Google Tag Manager", "googletagmanager"],
  ["Google Ads", "googleads"],
  ["Meta Ads Manager", "meta"],
  ["Looker Studio", "looker"],
  ["Screaming Frog", null, "t_sfword.png", 22, 6.18],
  ["Buffer", "buffer"],
  ["HubSpot", "hubspot"],
  ["Multilogin", null, "t_multilogin.png", 22, 4.8],
  ["GoLogin", null, "t_gologin.png", 38, 1.36],
  ["Microsoft Clarity", null, "t_clarity2.png", 30, 3.11],
  ["Hotjar", "hotjar"],
  ["Notion", "notion"],
  ["Canva", null, "t_canva.png", 30, 3.08],
  ["WordPress", "wordpress"],
  ["Reddit", "reddit"],
  ["LinkedIn", null, "t_linkedin.png", 24, 4.05],
];

const TOOLS = TOOLS_DEF.map(([t, s, img, lh, ar]) => ({
  t,
  hasIcon: !!s,
  hasLogo: !!img,
  showText: !img,
  bg: s ? `url("${SI(s)}")` : img ? `url("${V9 + img}")` : "none",
  h: (lh || 24) + "px",
  lw: img ? Math.round((lh || 24) * (ar || 1)) + "px" : "0px",
}));

export default function Tools() {
  const [running, setRunning] = useState(true);
  const loop = [...TOOLS, ...TOOLS];

  return (
    <section style={{ padding: "clamp(80px,9vw,128px) 0 0" }}>
      <div style={{ maxWidth: 720, margin: "0 auto 24px", padding: "0 clamp(20px,4vw,48px)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center" }}>
        <h2 style={{ margin: 0, fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(28px,2.8vw,38px)", letterSpacing: "-0.03em" }}>Tools I work with</h2>
        <p style={{ margin: 0, fontSize: 16, color: "#5A5854" }}>The stack changes. The job doesn&apos;t.</p>
      </div>
      <div
        onMouseEnter={() => setRunning(false)}
        onMouseLeave={() => setRunning(true)}
        className="max-md:![-webkit-mask-image:linear-gradient(90deg,transparent,#000_16px,#000_calc(100%_-_16px),transparent)] max-md:![mask-image:linear-gradient(90deg,transparent,#000_16px,#000_calc(100%_-_16px),transparent)]"
        style={{
          overflow: "hidden",
          background: "#F8F6F4",
          borderTop: "1px solid #DDDAD3",
          borderBottom: "1px solid #DDDAD3",
          WebkitMaskImage: "linear-gradient(90deg,transparent,#000 64px,#000 calc(100% - 64px),transparent)",
          maskImage: "linear-gradient(90deg,transparent,#000 64px,#000 calc(100% - 64px),transparent)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", width: "max-content", animation: "zmarqL 44s linear infinite", animationPlayState: running ? "running" : "paused" }}>
          {loop.map((t, i) => (
            <div key={i} style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: 10, height: 88, padding: "0 clamp(24px,2.4vw,32px)", fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em", color: "#1C1C1C", whiteSpace: "nowrap" }}>
              {t.hasIcon && <span aria-hidden="true" style={{ display: "block", width: 26, height: 26, backgroundImage: t.bg, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }} />}
              {t.hasLogo && <span role="img" aria-label={t.t} style={{ display: "block", height: t.h, width: t.lw, backgroundImage: t.bg, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }} />}
              {t.showText && <span>{t.t}</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
