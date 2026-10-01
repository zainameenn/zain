"use client";

import { useEffect, useState } from "react";
import { ArrowIcon, ChevronIcon } from "./icons";

const NAV_LINKS: { t: string; href: string }[] = [
  { t: "Blog", href: "/blog" },
  { t: "Services", href: "/services" },
  { t: "Pricing", href: "/#pricing" },
  { t: "About", href: "/about" },
  { t: "Insights", href: "/insights" },
];

const SERVICE_MENU = [
  { t: "Growth strategy and GTM", d: "Find the real constraint and plan around it.", href: "/services/growth-strategy" },
  { t: "SEO", d: "Original content that ranks on Google and in AI answers.", href: "/services/seo" },
  { t: "Reddit marketing", d: "Show up where buyers ask for recommendations.", href: "/services/reddit-marketing" },
  { t: "Social media management", d: "Content, graphics and posting that bring visits.", href: "/services/social-media-management" },
  { t: "Google and Meta ads", d: "Test small, find what converts, then scale.", href: "/services/google-meta-ads" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [navHover, setNavHover] = useState(-1);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSvcOpen, setMobileSvcOpen] = useState(false);
  const [ctaHover, setCtaHover] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 80,
        background: scrolled || menuOpen ? "rgba(238,237,231,.94)" : "rgba(238,237,231,0)",
        borderBottom: `1px solid ${scrolled ? "#DDDAD3" : "transparent"}`,
        transition: "background 200ms, border-color 200ms",
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        style={{
          maxWidth: 1360,
          margin: "0 auto",
          padding: "0 clamp(20px,4vw,48px)",
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
        }}
      >
        <a href="/" aria-label="Zain Ul Abdin, home" style={{ display: "flex", alignItems: "center", height: 44 }}>
          <img src="/logo.png" alt="Zain Ul Abdin logo" style={{ display: "block", height: 42, width: "auto" }} />
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <nav className="hidden md:flex" onMouseLeave={() => setNavHover(-1)} style={{ gap: 4, fontSize: 15, fontWeight: 500 }}>
            {NAV_LINKS.map((l, i) => {
              const isSvc = l.t === "Services";
              const on = navHover === i;
              const dd = on && isSvc;
              return (
                <div key={l.t} onMouseEnter={() => setNavHover(i)} style={{ position: "relative" }}>
                  <a
                    href={l.href}
                    aria-haspopup={isSvc}
                    aria-expanded={dd}
                    style={{
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      height: 44,
                      padding: "0 12px",
                      color: navHover === -1 || on ? "#1C1C1C" : "#8B877F",
                      transition: "color 180ms",
                    }}
                  >
                    <span style={{ display: "block", transform: on ? "translateY(-1px)" : "none", transition: "transform 220ms cubic-bezier(.2,.7,.2,1)" }}>{l.t}</span>
                    {isSvc && <ChevronIcon style={{ transform: dd ? "rotate(180deg)" : "none", transition: "transform 200ms" }} />}
                    <span
                      style={{
                        position: "absolute",
                        left: 12,
                        right: 12,
                        bottom: 8,
                        height: 1.5,
                        background: "#C4A47C",
                        transform: `scaleX(${on ? 1 : 0})`,
                        transformOrigin: "left",
                        transition: "transform 260ms cubic-bezier(.2,.7,.2,1)",
                      }}
                    />
                  </a>
                  {dd && (
                    <div style={{ position: "absolute", left: -8, top: "100%", paddingTop: 10, width: 380, zIndex: 90, animation: "zddin 180ms ease-out both" }}>
                      <div style={{ background: "#F8F6F4", border: "1px solid #DDDAD3", borderRadius: 16, boxShadow: "0 24px 48px -28px rgba(40,30,15,.35)", padding: 8 }}>
                        {SERVICE_MENU.map((m) => (
                          <a
                            key={m.t}
                            href={m.href}
                            style={{ display: "block", padding: "12px 14px", borderRadius: 10, transition: "background 160ms" }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = "#EEEDE7")}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                          >
                            <span style={{ display: "block", fontSize: 15, fontWeight: 600, color: "#1C1C1C" }}>{m.t}</span>
                            <span style={{ display: "block", marginTop: 3, fontSize: 13.5, fontWeight: 400, color: "#5A5854" }}>{m.d}</span>
                          </a>
                        ))}
                        <a
                          href="/services"
                          style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6, padding: "14px 14px 10px", borderTop: "1px solid #DDDAD3", fontSize: 14, fontWeight: 600, color: "#1C1C1C" }}
                        >
                          View all services
                          <ArrowIcon />
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <a
            href="/contact"
            onMouseEnter={() => setCtaHover(true)}
            onMouseLeave={() => setCtaHover(false)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              height: 44,
              padding: "0 18px",
              borderRadius: 12,
              background: ctaHover ? "#33322F" : "#1C1C1C",
              color: "#F8F6F4",
              fontSize: 14.5,
              fontWeight: 500,
              transition: "background 180ms",
            }}
          >
            <span>Tell me what&apos;s stuck</span>
            <ArrowIcon style={{ transform: ctaHover ? "translateX(4px)" : "none", transition: "transform 200ms" }} />
          </a>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            style={{ background: "none", border: 0, font: "500 15px 'Inter'", color: "#1C1C1C", height: 44, padding: 0, cursor: "pointer" }}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav style={{ padding: "8px clamp(20px,4vw,48px) 24px", display: "flex", flexDirection: "column", borderTop: "1px solid #DDDAD3" }}>
          {NAV_LINKS.map((l) => {
            const isSvc = l.t === "Services";
            if (!isSvc) {
              return (
                <a
                  key={l.t}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  style={{ display: "block", fontFamily: "'General Sans'", fontWeight: 500, fontSize: 24, padding: "12px 0", borderBottom: "1px solid #DDDAD3" }}
                >
                  {l.t}
                </a>
              );
            }
            return (
              <div key={l.t} style={{ borderBottom: "1px solid #DDDAD3" }}>
                <button
                  onClick={() => setMobileSvcOpen((v) => !v)}
                  aria-expanded={mobileSvcOpen}
                  style={{ all: "unset", boxSizing: "border-box", cursor: "pointer", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "'General Sans'", fontWeight: 500, fontSize: 24, padding: "12px 0", color: "#1C1C1C" }}
                >
                  {l.t}
                  <ChevronIcon style={{ transform: mobileSvcOpen ? "rotate(180deg)" : "none", transition: "transform 200ms" }} />
                </button>
                {mobileSvcOpen && (
                  <div style={{ display: "flex", flexDirection: "column", padding: "0 0 12px" }}>
                    {SERVICE_MENU.map((m) => (
                      <a key={m.t} href={m.href} onClick={() => setMenuOpen(false)} style={{ padding: "10px 0", fontSize: 16, color: "#4E4C48" }}>
                        {m.t}
                      </a>
                    ))}
                    <a href="/services" onClick={() => setMenuOpen(false)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 0", fontSize: 15, fontWeight: 600, color: "#1C1C1C" }}>
                      View all services
                      <ArrowIcon />
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      )}
    </header>
  );
}
