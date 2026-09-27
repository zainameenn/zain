import { ArrowIcon, MailIcon, CalendarIcon, LinkedInIcon } from "./icons";

const FOOT_GROUPS = [
  {
    h: "Work",
    items: [
      ["All Case Studies", "#all-work"],
      ["Blainy", "#case-blainy"],
      ["Everdry Waterproofing", "#case-everdry"],
      ["Virtarix", "#case-virtarix"],
      ["LoomPad", "#case-loompad"],
      ["Reddit Growth", "#reddit-growth"],
      ["HiFy", "#hify"],
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
      ["Content and design", "/services/content-design"],
    ],
  },
  {
    h: "Explore",
    items: [
      ["Pricing", "#pricing"],
      ["About", "/about"],
      ["Insights", "/insights"],
      ["Contact", "#contact"],
    ],
  },
];

const SOCIALS: { t: string; href: string; kind: "in" | "mail" | "icon"; icon?: string }[] = [
  { t: "LinkedIn", href: "#linkedin", kind: "in" },
  { t: "Email", href: "mailto:hello@zainameen.com", kind: "mail" },
  { t: "Calendly", href: "#calendly", kind: "icon", icon: "calendly" },
  { t: "Pinterest", href: "#pinterest", kind: "icon", icon: "pinterest" },
  { t: "Facebook", href: "#facebook", kind: "icon", icon: "facebook" },
  { t: "Instagram", href: "#instagram", kind: "icon", icon: "instagram" },
  { t: "Threads", href: "#threads", kind: "icon", icon: "threads" },
];

export default function Footer() {
  return (
    <footer style={{ background: "#171717", color: "#F2EFEA", overflow: "hidden" }}>
      <div style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(64px,7vw,96px) clamp(20px,4vw,48px) 0" }}>
        <div
          style={{ display: "grid", gap: "32px 48px", alignItems: "end", paddingBottom: "clamp(40px,5vw,56px)", borderBottom: "1px solid #2F2E2B" }}
          className="md:!grid-cols-[minmax(0,1fr)_auto]"
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 20 }}>
            <span style={{ width: 60, height: 60, borderRadius: 16, background: "#F2EFEA", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <img loading="lazy" src="/assets/v8/logos/zain.png" alt="Zain Ul Abdin logo" style={{ display: "block", height: 36, width: "auto" }} />
            </span>
            <p style={{ margin: 0, fontFamily: "'General Sans'", fontSize: "clamp(24px,2.4vw,34px)", fontWeight: 600, letterSpacing: "-0.025em", lineHeight: 1.15, maxWidth: 460 }}>
              Growth marketing without the stress.
            </p>
            <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 10, height: 44, fontSize: 15, fontWeight: 600, color: "#D3AE82", borderBottom: "1.5px solid #D3AE82" }}>
              Tell me what&apos;s stuck
              <ArrowIcon />
            </a>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }} className="md:justify-end">
            <a href="#calendly" style={{ display: "flex", alignItems: "center", gap: 10, height: 48, padding: "0 18px", borderRadius: 12, border: "1px solid #3A3935", fontSize: 15, fontWeight: 500, color: "#F2EFEA" }}>
              <CalendarIcon />
              Book a meeting
            </a>
            <a href="mailto:hello@zainameen.com" style={{ display: "flex", alignItems: "center", gap: 10, height: 48, padding: "0 18px", borderRadius: 12, border: "1px solid #3A3935", fontSize: 15, fontWeight: 500, color: "#F2EFEA" }}>
              <MailIcon />
              Email
            </a>
            <a href="#linkedin" style={{ display: "flex", alignItems: "center", gap: 10, height: 48, padding: "0 18px", borderRadius: 12, border: "1px solid #3A3935", fontSize: 15, fontWeight: 500, color: "#F2EFEA" }}>
              <LinkedInIcon size={15} />
              LinkedIn
            </a>
          </div>
        </div>

        <div style={{ display: "grid", gap: "40px 32px", padding: "clamp(40px,5vw,56px) 0", borderBottom: "1px solid #2F2E2B" }} className="grid-cols-2 md:!grid-cols-4">
          {FOOT_GROUPS.map((g) => (
            <div key={g.h}>
              <div style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#8B877F", marginBottom: 18 }}>{g.h}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
                {g.items.map(([t, href]) => (
                  <a key={t} href={href} style={{ fontSize: 15, color: "#D9D5CC" }}>
                    {t}
                  </a>
                ))}
              </div>
            </div>
          ))}
          <div>
            <div style={{ fontSize: 11.5, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#8B877F", marginBottom: 18 }}>Connect</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {SOCIALS.map((so) => (
                <a key={so.t} href={so.href} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 15, color: "#D9D5CC" }}>
                  <span style={{ width: 28, height: 28, flex: "0 0 auto", borderRadius: 8, border: "1px solid #33322F", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {so.kind === "in" && <LinkedInIcon size={12} color="#F2EFEA" />}
                    {so.kind === "mail" && <MailIcon size={13} color="#F2EFEA" />}
                    {so.kind === "icon" && (
                      <span
                        aria-hidden="true"
                        style={{ display: "block", width: 13, height: 13, backgroundImage: `url("https://cdn.simpleicons.org/${so.icon}/F2EFEA")`, backgroundSize: "contain", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}
                      />
                    )}
                  </span>
                  {so.t}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ padding: "24px 0", display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 12, fontSize: 13, color: "#8B877F" }}>
          <span>© 2026 Zain Ul Abdin</span>
          <span style={{ display: "flex", flexWrap: "wrap", gap: 20 }}>
            <span>Built for useful growth, not vanity metrics.</span>
            <a href="#top" style={{ color: "#8B877F" }}>
              Back to top ↑
            </a>
          </span>
        </div>
        <div aria-hidden="true" style={{ margin: "clamp(8px,2vw,24px) 0 -0.2em", textAlign: "center", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(56px,11.6vw,176px)", lineHeight: 0.9, letterSpacing: "-0.05em", color: "#262522", whiteSpace: "nowrap" }}>
          ZAIN UL ABDIN
        </div>
      </div>
    </footer>
  );
}
