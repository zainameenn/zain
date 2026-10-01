import { buildMetadata } from "@/lib/seo";
import { ArrowIcon, Emphasis } from "../HomeComponents/icons";
import { WaitlistForm } from "./WaitlistForm";

export const metadata = buildMetadata({
  title: "Free Marketing Guides & Keybooks | Zain Ul Abdin",
  description:
    "Free Keybooks and practical guides on SEO, Reddit, social media and SaaS growth, built from real client work. Join the list to get them first.",
  path: "/insights",
});

const MAX = 1280;
const PAD = "clamp(20px,2.5vw,32px)";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#8B877F" }}>{children}</div>;
}

function CenterHead({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", margin: "0 auto 40px", maxWidth: 900 }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        className="max-md:!text-balance"
        style={{
          margin: "12px 0 0",
          fontFamily: "'General Sans'",
          fontWeight: 600,
          fontSize: "clamp(34px,3.4vw,50px)",
          lineHeight: 1.04,
          letterSpacing: "-0.035em",
        }}
      >
        {title}
      </h2>
      {sub ? (
        <p style={{ margin: "20px auto 0", maxWidth: 640, fontSize: 17, lineHeight: 1.6, color: "#5A5854" }}>{sub}</p>
      ) : null}
    </div>
  );
}

const COMING: { n: string; t: string; d: string; tags?: string[]; italic?: string }[] = [
  {
    n: "01",
    t: "Free Keybooks",
    d: "Practical guides built from the things I've actually worked on.",
    tags: ["SEO", "Reddit", "Social media", "Content", "Growth", "GTM", "Paid acquisition"],
  },
  {
    n: "02",
    t: "Deep dive blogs",
    d: "Straightforward breakdowns of what to do, what not to do, what I'd test first, and why.",
    italic: "No 4,000 word article written just to rank for a keyword.",
  },
  {
    n: "03",
    t: "Real lessons",
    d: "Things that worked. Things that failed. Things I would do differently now.",
    italic: "The useful part is usually somewhere between all three.",
  },
];

const KEYBOOKS = [
  {
    n: "01",
    dark: false,
    labelColor: "#9A7646",
    badgeBorder: "#D6CFC2",
    badgeColor: "#5A5854",
    subColor: "#5A5854",
    ringBorder: "#D3C7B3",
    ringDash: "#C9BBA4",
    shape: { width: 56, aspectRatio: "1", borderRadius: "50%", background: "#1C1C1C", boxShadow: "0 0 0 10px rgba(28,28,28,.06)" },
  },
  {
    n: "02",
    dark: true,
    labelColor: "#D3AE82",
    badgeBorder: "#3A3935",
    badgeColor: "#C9C4BA",
    subColor: "#B7B2A8",
    ringBorder: "#4A4843",
    ringDash: "#5A5750",
    shape: { width: 48, aspectRatio: "1", borderRadius: 14, background: "#D3AE82", boxShadow: "0 0 0 10px rgba(211,174,130,.14)" },
  },
  {
    n: "03",
    dark: false,
    labelColor: "#9A7646",
    badgeBorder: "#D6CFC2",
    badgeColor: "#5A5854",
    subColor: "#5A5854",
    ringBorder: "#D3C7B3",
    ringDash: "#C9BBA4",
    shape: { width: 64, aspectRatio: "1", borderRadius: "50% 50% 12px 12px", background: "#1C1C1C", boxShadow: "0 0 0 10px rgba(28,28,28,.06)" },
  },
];

const TOPICS = [
  "SEO",
  "Reddit marketing",
  "Social media",
  "Content strategy",
  "Growth marketing",
  "GTM",
  "Google Ads",
  "Meta Ads",
  "Analytics",
  "Conversion",
  "Distribution",
  "AI search / GEO",
  "Experiments",
  "SaaS growth",
  "Community",
];

export default function InsightsPage() {
  return (
    <main id="top" style={{ overflowX: "clip" }}>
      {/* HERO */}
      <section
        style={{
          maxWidth: MAX,
          margin: "0 auto",
          padding: `clamp(64px,8vw,112px) ${PAD} 0`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#5A5854" }}>
          <span aria-hidden="true" style={{ width: 8, height: 8, borderRadius: "50%", background: "#C4A47C" }} />
          Insights
        </div>
        <h1
          className="max-md:!text-balance"
          style={{
            margin: "20px 0 0",
            fontFamily: "'General Sans'",
            fontWeight: 600,
            fontSize: "clamp(44px,5.6vw,80px)",
            lineHeight: 1,
            letterSpacing: "-0.04em",
          }}
        >
          I&apos;m working on this page.
        </h1>
        <p
          style={{
            margin: "14px 0 0",
            fontFamily: "'Instrument Serif',serif",
            fontStyle: "italic",
            fontWeight: 400,
            letterSpacing: "-0.01em",
            fontSize: "clamp(32px,3.6vw,52px)",
            lineHeight: 1.1,
            color: "#1C1C1C",
          }}
        >
          <Emphasis>The good stuff is coming.</Emphasis>
        </p>
        <p style={{ margin: "28px auto 0", maxWidth: 640, fontSize: 18, lineHeight: 1.6, color: "#4E4C48" }}>
          I&apos;m putting together a collection of practical marketing Keybooks, useful breakdowns and blogs about what works, what doesn&apos;t, and what I&apos;d probably avoid completely.
        </p>
        <p style={{ margin: "14px auto 0", maxWidth: 640, fontSize: 18, lineHeight: 1.6, color: "#1C1C1C", fontWeight: 500 }}>
          A lot of it will be free. Because useful marketing advice probably shouldn&apos;t always start with a checkout page.
        </p>
        <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }} className="max-md:!w-full max-md:!max-w-[400px]">
          <a
            href="#waitlist"
            className="max-md:!flex max-md:!w-full max-md:!max-w-[400px] max-md:!justify-center max-md:!mx-auto"
            style={{ display: "inline-flex", alignItems: "center", gap: 12, height: 56, padding: "0 26px", borderRadius: 12, background: "#1C1C1C", color: "#F8F6F4", fontSize: 16, fontWeight: 600 }}
          >
            Join the waitlist
            <ArrowIcon />
          </a>
        </div>
        <img
          loading="lazy"
          src="/assets/about/content-hub-t.png"
          alt="Illustration: one guide at the centre, connected to research, email, distribution, sharing, analytics and the website"
          style={{ display: "block", width: "100%", maxWidth: 820, height: "auto", margin: "clamp(40px,4vw,56px) auto 0", mixBlendMode: "multiply" }}
        />
      </section>

      {/* WHAT'S COMING */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <CenterHead
          eyebrow="What's coming"
          title={
            <>
              What I&rsquo;m
              <em style={{ display: "block", marginTop: 6, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.08em", lineHeight: 1.05, color: "#1C1C1C" }}>
                working on.
              </em>
            </>
          }
        />
        <div style={{ display: "grid", gap: "32px clamp(24px,3vw,48px)" }} className="grid-cols-1 md:!grid-cols-3">
          {COMING.map((c) => (
            <div key={c.n} style={{ paddingTop: 22, borderTop: "1px solid #1C1C1C", textAlign: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#9A7646", fontVariantNumeric: "tabular-nums" }}>{c.n}</div>
              <h3 style={{ margin: "12px 0 0", fontFamily: "'General Sans'", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>{c.t}</h3>
              <p className="max-md:!text-base" style={{ margin: "10px auto 0", maxWidth: 340, fontSize: 15.5, lineHeight: 1.6, color: "#4E4C48" }}>{c.d}</p>
              {c.tags ? (
                <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6 }}>
                  {c.tags.map((tag) => (
                    <span key={tag} style={{ display: "inline-flex", alignItems: "center", height: 28, padding: "0 12px", borderRadius: 999, border: "1px solid #D6CFC2", fontSize: 12.5, color: "#4E4C48" }}>
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
              {c.italic ? (
                <p style={{ margin: "12px 0 0", fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: 18, lineHeight: 1.3, color: "#77746E" }}>
                  {c.italic}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      {/* KEYBOOKS */}
      <section id="keybooks" className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <CenterHead
          eyebrow="Keybooks"
          title={
            <>
              The Keybooks are
              <em style={{ display: "block", marginTop: 6, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.08em", lineHeight: 1.05, color: "#1C1C1C" }}>
                probably the fun part.
              </em>
            </>
          }
          sub={
            <>
              I&apos;m working on a few practical guides that I&apos;ll share here for free. Think less &ldquo;ultimate marketing ebook&rdquo; and more: here&apos;s the system, here&apos;s what I learned, here&apos;s how I&apos;d actually do it.
            </>
          }
        />
        <div style={{ display: "grid", gap: 16 }} className="grid-cols-1 md:!grid-cols-3">
          {KEYBOOKS.map((k) => (
            <article
              key={k.n}
              style={{
                borderRadius: 24,
                background: k.dark ? "#1C1C1C" : "#F4F0E8",
                color: k.dark ? "#F2EFEA" : "#1C1C1C",
                border: `1px solid ${k.dark ? "#1C1C1C" : "#E2D8CA"}`,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                gap: 20,
                minHeight: 360,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: k.labelColor }}>Keybook {k.n}</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 26, padding: "0 10px", borderRadius: 999, border: `1px solid ${k.badgeBorder}`, fontSize: 11.5, fontWeight: 600, color: k.badgeColor }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C4A47C" }} />
                  Coming soon
                </span>
              </div>
              <div aria-hidden="true" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ position: "relative", width: 132, aspectRatio: "1", borderRadius: "50%", border: `1px solid ${k.ringBorder}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ position: "absolute", inset: 18, borderRadius: "50%", border: `1px dashed ${k.ringDash}` }} />
                  <span style={{ ...k.shape } as React.CSSProperties} />
                  <span style={{ position: "absolute", top: 8, right: 14, width: 10, height: 10, borderRadius: "50%", background: "#E0673F" }} />
                </span>
              </div>
              <div style={{ textAlign: "center" }}>
                <h3 style={{ margin: 0, fontFamily: "'General Sans'", fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em" }}>Working on it.</h3>
                <p style={{ margin: "6px 0 0", fontSize: 14.5, color: k.subColor }}>Free when it&apos;s ready.</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* TOPICS */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", margin: "0 auto 28px", maxWidth: 900 }}>
          <Eyebrow>Topics</Eyebrow>
          <h2
            className="max-md:!text-balance"
            style={{
              margin: "12px 0 0",
              fontFamily: "'General Sans'",
              fontWeight: 600,
              fontSize: "clamp(34px,3.4vw,50px)",
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
            }}
          >
            Things I&apos;ll probably
            <em style={{ display: "block", marginTop: 6, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.08em", lineHeight: 1.05, color: "#1C1C1C" }}>
              write too much about.
            </em>
          </h2>
        </div>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
          {TOPICS.map((t) => (
            <span key={t} style={{ display: "inline-flex", alignItems: "center", height: 36, padding: "0 16px", borderRadius: 999, background: "#1C1C1C", color: "#F2EFEA", fontSize: 14, fontWeight: 500, whiteSpace: "nowrap" }}>
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* WAITLIST */}
      <section id="waitlist" className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <div
          style={{
            borderRadius: 28,
            background: "#1C1C1C",
            color: "#F2EFEA",
            padding: "clamp(48px,6vw,88px) clamp(24px,5vw,72px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#C4A47C" }}>Get it first</div>
          <h2 style={{ margin: "14px 0 0", fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(34px,3.6vw,52px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
            Want me to tell you
            <em style={{ display: "block", marginTop: 6, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.08em", lineHeight: 1.05, color: "#D3AE82" }}>
              when something useful drops?
            </em>
          </h2>
          <p style={{ margin: "22px auto 0", maxWidth: 560, fontSize: 17, lineHeight: 1.6, color: "#B7B2A8" }}>
            Join the list and I&apos;ll send you the new Keybooks, guides and genuinely useful posts when they&apos;re ready. No daily &ldquo;10x your growth&rdquo; emails. Promise.
          </p>
          <WaitlistForm />
          <p style={{ margin: "16px 0 0", fontSize: 13.5, lineHeight: 1.5, color: "#8B877F" }}>
            Free resources, new posts and the occasional &ldquo;I learned this the hard way.&rdquo; Unsubscribe whenever you want.
          </p>
        </div>
      </section>

      {/* UNTIL THEN */}
      <section className="max-md:!pt-[68px]" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} clamp(64px,7vw,96px)` }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", margin: "0 auto 28px", maxWidth: 900 }}>
          <h2
            style={{
              margin: "12px 0 0",
              fontFamily: "'General Sans'",
              fontWeight: 600,
              fontSize: "clamp(34px,3.4vw,50px)",
              lineHeight: 1.04,
              letterSpacing: "-0.035em",
            }}
          >
            Until then...
            <em style={{ display: "block", marginTop: 6, fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.08em", lineHeight: 1.05, color: "#1C1C1C" }}>
              I&apos;m probably still writing.
            </em>
          </h2>
          <p style={{ margin: "20px auto 0", maxWidth: 640, fontSize: 17, lineHeight: 1.6, color: "#5A5854" }}>
            I&apos;m building this properly instead of filling it with five rushed posts just so the page looks busy. When there&apos;s something worth reading, it&apos;ll be here.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
          <a
            href="https://www.linkedin.com/in/zain-ameen/"
            target="_blank"
            rel="noopener"
            className="max-md:relative max-md:after:absolute max-md:after:inset-x-0 max-md:after:-inset-y-3.5 max-md:after:content-['']"
            style={{ fontSize: 14.5, color: "#1C1C1C", borderBottom: "1px solid #CFCBC2", paddingBottom: 2 }}
          >
            Or say hi on LinkedIn
          </a>
          <p style={{ margin: "24px 0 0", fontSize: 13, color: "#A09B91" }}>
            That&apos;s it for now. <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, fontSize: 15 }}>Ta-da. Bye.</em>
          </p>
        </div>
      </section>
    </main>
  );
}
