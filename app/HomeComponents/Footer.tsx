import { ArrowIcon, ChevronIcon, MailIcon, LinkedInIcon } from "./icons";

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

// Tablet: four columns under the brand block. Desktop: brand plus four columns in one row.
// Phones: these columns are hidden and the same links appear as tap-to-open rows instead.
const GROUP_CLASS = "max-md:!hidden";
const CONNECT_CLASS = "col-span-2 md:col-span-1";

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
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 16 }} className="col-span-2 md:col-span-4 lg:col-span-1 max-md:!items-center max-md:!text-center">
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

          {/* Phones only: link groups as tap-to-open rows (native details, works without JavaScript) */}
          <div className="col-span-2 md:hidden" style={{ borderTop: "1px solid #2F2E2B" }}>
            {FOOT_GROUPS.map((g) => (
              <details key={g.h} className="group" style={{ borderBottom: "1px solid #2F2E2B" }}>
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between [&::-webkit-details-marker]:hidden" style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#D9D5CC" }}>
                  {g.h}
                  <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-200 group-open:rotate-180" style={{ border: "1px solid #33322F", color: "#D3AE82" }}>
                    <ChevronIcon size={12} />
                  </span>
                </summary>
                <div style={{ display: "flex", flexDirection: "column", paddingBottom: 12 }}>
                  {g.items.map(([t, href]) => (
                    <a key={t} href={href} className="flex min-h-11 items-center" style={{ fontSize: 15, color: "#B7B2A8" }}>
                      {t}
                    </a>
                  ))}
                </div>
              </details>
            ))}
          </div>

          {FOOT_GROUPS.map((g) => (
            <div key={g.h} className={GROUP_CLASS}>
              <div style={HEADING_STYLE}>{g.h}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }} className="max-md:!gap-0">
                {g.items.map(([t, href]) => (
                  <a key={t} href={href} style={{ fontSize: 15, color: "#D9D5CC" }} className="max-md:!flex max-md:!min-h-11 max-md:!items-center">
                    {t}
                  </a>
                ))}
              </div>
            </div>
          ))}

          <div className={CONNECT_CLASS}>
            <div style={HEADING_STYLE} className="max-md:!text-center">Connect</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 36px)", gap: 10, justifyContent: "start" }} className="max-md:!mx-auto max-md:!flex max-md:!max-w-[260px] max-md:!flex-wrap max-md:!justify-center">
              {SOCIALS.map((so) => (
                <a
                  key={so.t}
                  href={so.href}
                  target={so.kind === "mail" ? undefined : "_blank"}
                  rel={so.kind === "mail" ? undefined : "noreferrer"}
                  aria-label={so.t}
                  title={so.t}
                  style={{ width: 36, height: 36, borderRadius: 8, border: "1px solid #33322F", display: "flex", alignItems: "center", justifyContent: "center", color: "#D9D5CC" }}
                  className="max-md:!h-11 max-md:!w-11"
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

        <div style={{ padding: "24px 0", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: "12px 32px", fontSize: 13, color: "#8B877F" }} className="max-md:!flex-col max-md:!items-center max-md:!gap-1 max-md:!text-center">
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }} className="max-md:!items-center">
            <span>© 2026 Zain Ul Abdin</span>
            <span>Built for useful growth, not vanity metrics.</span>
          </div>
          <a href="#top" style={{ color: "#8B877F" }} className="max-md:!inline-flex max-md:!min-h-11 max-md:!items-center">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
