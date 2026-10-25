import Link from "next/link";
import { ArrowIcon, MailIcon, LinkedInIcon } from "./icons";
import { Img } from "./Img";
import { TOOLS } from "@/lib/tools/registry";

// Four clear groups, left aligned. Every link here points to a live page.
// Free tools are one link to the directory; the full tool list lives on /tools and /sitemap.
const FOOT_GROUPS: { h: string; items: [string, string][] }[] = [
  {
    h: "Services",
    items: [
      ["Growth Strategy", "/services/saas-growth-consultant"],
      ["SEO", "/services/seo-specialist-for-saas"],
      ["Reddit Marketing", "/services/reddit-marketing-specialist"],
      ["Social Media Management", "/services/social-media-marketing-specialist"],
      ["Google & Meta Ads", "/services/google-and-meta-ads-specialist"],
    ],
  },
  {
    h: "Work",
    items: [
      ["Case Studies", "/case-studies"],
      ["Blainy", "/case-studies/blainy"],
      ["Everdry Waterproofing", "/case-studies/everdry"],
      ["Virtarix", "/case-studies/virtarix"],
      ["LoomPad", "/case-studies/loompad"],
    ],
  },
  {
    h: "Resources",
    items: [
      ["Blog", "/blog"],
      ["Free Tools", "/tools"],
      ["Changelog", "/changelog"],
      ["Sitemap", "/sitemap"],
    ],
  },
  {
    h: "Explore",
    items: [
      ["About", "/about"],
      ["Pricing", "/pricing"],
      ["Contact", "/contact"],
      ["Privacy Policy", "/privacy"],
    ],
  },
];

const HEADING_STYLE: React.CSSProperties = { margin: "0 0 16px", fontSize: 11.5, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#8B877F" };

const SOCIALS: { t: string; href: string; kind: "in" | "mail" | "icon"; icon?: string }[] = [
  { t: "LinkedIn", href: "https://www.linkedin.com/in/zain-ameen/", kind: "in" },
  { t: "Facebook", href: "https://www.facebook.com/profile.php?id=61560222560607", kind: "icon", icon: "facebook" },
  { t: "Instagram", href: "https://www.instagram.com/zainn.ms/", kind: "icon", icon: "instagram" },
  { t: "X", href: "https://x.com/zainnameen", kind: "icon", icon: "x" },
  { t: "Threads", href: "https://www.threads.com/@zainn.ms", kind: "icon", icon: "threads" },
  { t: "Pinterest", href: "https://www.pinterest.com/zainameenn", kind: "icon", icon: "pinterest" },
  { t: "GitHub", href: "https://github.com/zainameenn", kind: "icon", icon: "github" },
  { t: "Upwork", href: "https://www.upwork.com/freelancers/~0135cf0916aa8d26bf", kind: "icon", icon: "upwork" },
  { t: "Substack", href: "https://substack.com/@zainameen", kind: "icon", icon: "substack" },
  { t: "Calendly", href: "https://calendly.com/zain-ameen/30min", kind: "icon", icon: "calendly" },
  { t: "Email", href: "mailto:hello@zainameen.com", kind: "mail" },
];

const LINK_CLASS = "footer-link inline-flex min-h-10 items-center md:min-h-0";

export default function Footer() {
  return (
    <footer style={{ background: "#171717", color: "#F2EFEA", overflow: "hidden" }}>
      <style>{`.footer-link{color:#C9C4BA;transition:color 150ms}.footer-link:hover{color:#F2EFEA}.footer-link:focus-visible,.footer-social:focus-visible{outline:2px solid #D3AE82;outline-offset:3px;border-radius:4px}.footer-social{transition:border-color 150ms}.footer-social:hover{border-color:#8B877F}`}</style>
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(64px,7vw,96px) clamp(20px,4vw,48px) 0" }}>
        <div style={{ display: "grid", gap: "48px clamp(32px,4vw,64px)", alignItems: "start", paddingBottom: "clamp(40px,5vw,56px)", borderBottom: "1px solid #2F2E2B" }} className="lg:grid-cols-[auto_minmax(0,1fr)]">
          {/* Brand */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 20 }}>
            <Link href="/" aria-label="Zain Ul Abdin, home" style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* logo-dark.png has empty space around the mark; this window crops to the mark. */}
              <span style={{ position: "relative", display: "block", width: 44, height: 40, overflow: "hidden", flex: "0 0 auto" }}>
                <Img loading="lazy" src="/logo-dark-288.png" alt="" style={{ position: "absolute", left: -13.4, top: -13.8, width: 67, height: 67, maxWidth: "none" }} />
              </span>
              <span style={{ fontFamily: "var(--nf-general-sans)", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>Zain Ul Abdin</span>
            </Link>
            <p style={{ margin: 0, fontSize: 15.5, lineHeight: 1.6, color: "#B7B2A8" }}>
              Helping SaaS and service businesses
              <br />
              grow through SEO, Reddit, social media
              <br />
              and practical marketing.
            </p>
            <a href="mailto:hello@zainameen.com" className="footer-link" style={{ display: "inline-flex", alignItems: "center", gap: 10, minHeight: 40, fontSize: 15, fontWeight: 500, color: "#D3AE82" }}>
              <MailIcon size={15} color="#D3AE82" />
              hello@zainameen.com
            </a>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 42px)", gap: 10 }} aria-label="Social profiles">
              {SOCIALS.filter((so) => so.kind !== "mail").map((so) => (
                <a
                  key={so.t}
                  href={so.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={so.t}
                  title={so.t}
                  className="footer-social"
                  style={{ width: 42, height: 42, borderRadius: 8, border: "1px solid #33322F", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                  {so.kind === "in" ? <LinkedInIcon size={14} color="#F2EFEA" /> : <Img src={`/icons/${so.icon}-F2EFEA.svg`} alt="" aria-hidden="true" width={15} height={15} style={{ display: "block", width: 15, height: 15, objectFit: "contain" }} />}
                </a>
              ))}
            </div>
          </div>

          {/* Link groups: four columns on desktop and tablet, two on phones */}
          <nav aria-label="Footer" style={{ display: "grid", gap: "36px 24px" }} className="grid-cols-2 md:grid-cols-[repeat(4,max-content)] md:justify-between lg:pl-[clamp(32px,6vw,120px)]">
            {FOOT_GROUPS.map((g) => (
              <div key={g.h}>
                <h2 style={HEADING_STYLE}>{g.h}</h2>
                <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }} className="max-md:!gap-0">
                  {g.items.map(([t, href]) => (
                    <li key={href}>
                      <Link href={href} className={LINK_CLASS} style={{ fontSize: 15, lineHeight: 1.35 }}>
                        {t === "Free Tools" ? (
                          <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                            Free Tools
                            <span style={{ padding: "2px 7px", borderRadius: 999, border: "1px solid #4A473F", fontSize: 11, fontWeight: 600, color: "#D3AE82" }}>{Object.keys(TOOLS).length}</span>
                          </span>
                        ) : (
                          t
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div style={{ padding: "22px 0 26px", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "8px 24px", fontSize: 13.5, color: "#8B877F" }}>
          <span>© {new Date().getFullYear()} Zain Ul Abdin. Built for useful growth, not vanity metrics.</span>
          <a href="#top" className="footer-link inline-flex min-h-11 items-center gap-2" style={{ color: "#8B877F" }}>
            Back to top <ArrowIcon style={{ transform: "rotate(-90deg)" }} />
          </a>
        </div>
      </div>
    </footer>
  );
}
