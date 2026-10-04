"use client";

import { useState } from "react";
import { BgImage } from "./Img";

const BRANDS: { t: string; img?: string; h: string; w: string }[] = [
  { t: "Amoxt Solutions", img: "/assets/v9/l_amoxt.png", h: "30px", w: "130px" },
  { t: "Blainy", img: "/assets/site/logo-blainy.png", h: "40px", w: "150px" },
  { t: "Everdry Waterproofing", img: "/assets/v8/logo-everdry.gif", h: "44px", w: "170px" },
  { t: "Virtarix", img: "/assets/v8/logos/virtarix.png", h: "38px", w: "150px" },
  { t: "LoomPad", img: "/assets/v8/logos/loompad.png", h: "32px", w: "150px" },
  { t: "Eplie", img: "/assets/v8/logos/eplie.png", h: "34px", w: "110px" },
  { t: "NeonRev", img: "/assets/v9/l_neonrev.png", h: "30px", w: "150px" },
  { t: "TechEon", img: "/assets/v8/logos/techeon.png", h: "32px", w: "150px" },
  { t: "HiFy", img: "/assets/v8/logos/hify.png", h: "36px", w: "90px" },
];

export default function Companies() {
  const [running, setRunning] = useState(true);
  const loop = [...BRANDS, ...BRANDS];

  return (
    <section className="max-md:!pt-14" style={{ padding: "clamp(80px,9vw,128px) 0 0" }}>
      <p className="max-md:!text-center" style={{ margin: "0 auto 24px", maxWidth: 1360, padding: "0 clamp(20px,4vw,48px)", fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#6F6B64" }}>
        Brands and products I&apos;ve worked with
      </p>
      <div
        onMouseEnter={() => setRunning(false)}
        onMouseLeave={() => setRunning(true)}
        style={{
          background: "#EEEDE7",
          overflow: "hidden",
          borderTop: "1px solid #DDDAD3",
          borderBottom: "1px solid #DDDAD3",
          WebkitMaskImage: "linear-gradient(90deg,transparent,#000 80px,#000 calc(100% - 80px),transparent)",
          maskImage: "linear-gradient(90deg,transparent,#000 80px,#000 calc(100% - 80px),transparent)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", width: "max-content", animation: "zmarqL 34s linear infinite", animationPlayState: running ? "running" : "paused" }}>
          {loop.map((b, i) => (
            <div key={i} style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center", height: "clamp(104px,9vw,136px)", padding: "0 clamp(40px,4vw,64px)", background: "#EEEDE7" }}>
              {b.img ? (
                <BgImage src={b.img} alt={b.t} fit="contain" style={{ display: "block", width: b.w, height: b.h, mixBlendMode: "multiply" }} />
              ) : (
                <span style={{ fontFamily: "'General Sans', 'General Sans Fallback'", fontSize: 30, fontWeight: 600, letterSpacing: "-0.03em", color: "#1C1C1C", whiteSpace: "nowrap" }}>{b.t}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
