import { ArrowIcon, MailIcon, LinkedInIcon } from "./icons";

const FOOT_GROUPS = [
  {
    h: "Work",
    items: [
      ["Blainy", "/#case-blainy"],
      ["Everdry Waterproofing", "/#case-everdry"],
      ["Virtarix", "/#case-virtarix"],
      ["LoomPad", "/#case-loompad"],
    ],
  },
  {
    h: "Services",
    items: [
      ["Growth strategy and GTM", "/services/growth-strategy"],
      ["SEO", "/services/seo"],
      ["Reddit marketing", "/services/reddit-marketing"],
      ["Social media management", "/services/social-media-management"],
      ["Google and Meta ads", "/services/google-meta-ads"],
    ],
  },
  {
    h: "Explore",
    items: [
      ["Pricing", "/#pricing"],
      ["About", "/about"],
      ["Blog", "/blog"],
      ["Insights", "/insights"],
      ["Contact", "/contact"],
    ],
  },
];

// Grid placement. Mobile: Work and Explore side by side, then Services, then Connect.
// Tablet: four columns under the brand block. Desktop: brand plus four columns in one row.
const GROUP_CLASS: Record<string, string> = {
  Work: "",
  Services: "col-span-2 order-1 md:col-span-1 md:order-none",
  Explore: "",
};
const CONNECT_CLASS = "col-span-2 order-2 md:col-span-1 md:order-none";

const HEADING_STYLE: React.CSSProperties = { fontSize: 11.5, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#8B877F", marginBottom: 18 };

const SOCIALS: { t: string; href: string; kind: "in" | "mail" | "icon"; icon?: string }[] = [
  { t: "LinkedIn", href: "https://www.linkedin.com/in/zain-ameen/", kind: "in" },
  { t: "Facebook", href: "https://www.facebook.com/profile.php?id=61560222560607", kind: "icon", icon: "facebook" },
  { t: "Instagram", href: "https://www.instagram.com/zainn.ms/", kind: "icon", icon: "instagram" },
  { t: "X", href: "https://x.com/zainnameen", kind: "icon", icon: "x" },
  { t: "Threads", href: "https://www.threads.com/@zainn.ms", kind: "icon", icon: "threads" },
  { t: "Pinterest", href: "https://www.pinterest.com/zainameenn", kind: "icon", icon: "pinterest" },
  { t: "GitHub", href: "https://github.com/zainameenn", kind: "icon", icon: "github" },
  { t: "Upwork", href: "https://www.upwork.com/freelancers/~0135cf0916aa8d26bf", kind: "icon", icon: "upwork" },
  { t: "Calendly", href: "https://calendly.com/zain-ameen/30min", kind: "icon", icon: "calendly" },
  { t: "Email", href: "mailto:hello@zainameen.com", kind: "mail" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#171717", color: "#F2EFEA", overflow: "hidden" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(64px,7vw,96px) clamp(20px,4vw,48px) 0" }}>
        <div
          style={{ display: "grid", gap: "40px 24px", alignItems: "start", justifyContent: "space-between", paddingBottom: "clamp(40px,5vw,56px)", borderBottom: "1px solid #2F2E2B" }}
          className="grid-cols-2 md:grid-cols-[repeat(4,auto)] lg:grid-cols-[repeat(5,auto)]"
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }} className="col-span-2 md:col-span-4 lg:col-span-1">
            {/* logo-dark.png has empty space around the mark; this window crops to the mark (56px tall). */}
            <span style={{ position: "relative", display: "block", width: 62, height: 56, overflow: "hidden" }}>
              <img loading="lazy" src="/logo-dark.png" alt="Zain Ul Abdin logo" style={{ position: "absolute", left: -18.9, top: -19.3, width: 93.8, height: 93.8, maxWidth: "none" }} />
            </span>
            <p style={{ margin: 0, fontFamily: "'General Sans'", fontSize: "clamp(22px,2vw,26px)", fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.15, whiteSpace: "nowrap" }}>
              Growth marketing
              <br />
              without the stress.
            </p>
            <p style={{ margin: 0, fontSize: 13, color: "#8B877F", whiteSpace: "nowrap" }}>
              Free 30 minute call.
              <br />
              You&apos;ll leave with at least one thing to fix.
            </p>
            <a href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 10, height: 44, fontSize: 15, fontWeight: 600, color: "#D3AE82", borderBottom: "1.5px solid #D3AE82" }}>
              Tell me what&apos;s stuck
              <ArrowIcon />
            </a>
          </div>

          {FOOT_GROUPS.map((g) => (
            <div key={g.h} className={GROUP_CLASS[g.h]}>
              <div style={HEADING_STYLE}>{g.h}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {g.items.map(([t, href]) => (
                  <a key={t} href={href} style={{ fontSize: 15, color: "#D9D5CC" }}>
                    {t}
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div className={CONNECT_CLASS}>
            <div style={HEADING_STYLE}>Connect</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 36px)", gap: 10, justifyContent: "start" }}>
              {SOCIALS.map((so) => (
                <a
                  key={so.t}
                  href={so.href}
                  target={so.kind === "mail" ? undefined : "_blank"}
                  rel={so.kind === "mail" ? undefined : "noreferrer"}
                  aria-label={so.t}
                  title={so.t}
                  style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid #33322F", display: "flex", alignItems: "center", justifyContent: "center", color: "#D9D5CC" }}
                >
                  {so.kind === "in" && <LinkedInIcon size={14} color="#F2EFEA" />}
                  {so.kind === "mail" && <MailIcon size={15} color="#F2EFEA" />}
                  {so.kind === "icon" && (
                    <span
                      aria-hidden="true"
                      style={{ display: "block", width: 15, height: 15, backgroundImage: `url("https://cdn.simpleicons.org/${so.icon}/F2EFEA")`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
                    />
                  )}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: "24px 0", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "12px 32px", fontSize: 13, color: "#8B877F" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <span>© 2026 Zain Ul Abdin</span>
            <span>Built for useful growth, not vanity metrics.</span>
          </div>
          <a href="#top" style={{ color: "#8B877F" }}>
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
