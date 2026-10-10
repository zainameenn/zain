"use client";

import Image from "next/image";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import type { Screenshot } from "../_data/types";
import { EYEBROW, GOLD } from "./styles";

const LightboxContext = createContext<(shot: Screenshot) => void>(() => {});

function Highlights({ shot }: { shot: Screenshot }) {
  return (
    <>
      {shot.highlights?.map((h, i) => (
        <span
          key={i}
          aria-hidden="true"
          style={{ position: "absolute", left: h.left, top: h.top, width: h.width, height: h.height, border: `2.5px solid ${GOLD}`, borderRadius: 8, boxShadow: "0 0 0 4px rgba(196,164,124,.28)", pointerEvents: "none" }}
        />
      ))}
    </>
  );
}

/** Holds the enlarged screenshot dialog for every ScreenshotFigure inside it. */
export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [shot, setShot] = useState<Screenshot | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  const open = useCallback((s: Screenshot) => {
    opener.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    setShot(s);
  }, []);

  const close = useCallback(() => {
    document.body.style.overflow = "";
    setShot(null);
    const o = opener.current;
    if (o) setTimeout(() => o.focus(), 0);
  }, []);

  useEffect(() => {
    if (!shot) return;
    closeBtn.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { e.preventDefault(); close(); }
      // The close button is the only focusable element, so keep focus on it.
      else if (e.key === "Tab") { e.preventDefault(); closeBtn.current?.focus(); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [shot, close]);

  return (
    <LightboxContext.Provider value={open}>
      {children}
      {shot && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Enlarged screenshot: ${shot.caption}`}
          onClick={close}
          style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(23,23,23,.88)", display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(16px,4vw,56px)" }}
        >
          <button
            ref={closeBtn}
            type="button"
            onClick={close}
            aria-label="Close enlarged screenshot"
            className="border-[#3A3935] hover:border-[#C4A47C]"
            style={{ position: "absolute", top: 16, right: 16, width: 48, height: 48, borderRadius: 12, borderWidth: 1, borderStyle: "solid", background: "#1C1C1C", color: "#F2EFEA", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
          <figure onClick={(e) => e.stopPropagation()} style={{ margin: 0, maxWidth: "min(1400px,100%)", maxHeight: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
            <div style={{ position: "relative", lineHeight: 0 }}>
              <Image
                src={shot.src}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                sizes="min(1400px, 92vw)"
                style={{ display: "block", maxWidth: "100%", maxHeight: "calc(100vh - 140px)", width: "auto", height: "auto", borderRadius: 10, background: "#fff" }}
              />
              <Highlights shot={shot} />
            </div>
            <figcaption style={{ ...EYEBROW, color: "#D9D5CC", textAlign: "center" }}>{shot.caption}</figcaption>
          </figure>
        </div>
      )}
    </LightboxContext.Provider>
  );
}

/** A screenshot with a caption. Clicking it opens the enlarged view. */
export function ScreenshotFigure({ shot, sizes, className }: { shot: Screenshot; sizes: string; className?: string }) {
  const open = useContext(LightboxContext);
  return (
    <figure className={className} style={{ margin: 0, minWidth: 0 }}>
      <button
        type="button"
        onClick={() => open(shot)}
        aria-label={`Enlarge screenshot: ${shot.caption}`}
        className="border-[#DAD8D1] transition-colors hover:border-[#C4A47C]"
        style={{ position: "relative", display: "block", width: "100%", padding: 0, borderWidth: 1, borderStyle: "solid", borderRadius: 12, overflow: "hidden", background: shot.background ?? "#fff", cursor: "zoom-in" }}
      >
        <Image src={shot.src} alt={shot.alt} width={shot.width} height={shot.height} sizes={sizes} style={{ display: "block", width: "100%", height: "auto" }} />
        <Highlights shot={shot} />
      </button>
      <figcaption style={{ ...EYEBROW, marginTop: 10, lineHeight: 1.5 }}>{shot.caption}</figcaption>
    </figure>
  );
}
