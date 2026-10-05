import { buildMetadata } from "@/lib/seo";
import { H1_ACCENT_STYLE, HERO_H1_STYLE } from "@/app/HomeComponents/heading";
import { ArrowIcon, Emphasis } from "../HomeComponents/icons";
import { FAQAccordion } from "../HomeComponents/FAQAccordion";
import { Img, BgImage } from "../HomeComponents/Img";

export const metadata = buildMetadata({
  title: "Zain Ul Abdin | Growth Marketing Specialist in Lahore",
  description:
    "Zain Ul Abdin is a growth marketing specialist in Lahore working with SaaS and service teams in the US, UAE and Europe. Writer, then SEO, then growth.",
  path: "/about",
});

const MAX = 1280;
const PAD = "clamp(20px,2.5vw,32px)";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#6F6B64" }}>{children}</div>;
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", height: 32, padding: "0 14px", borderRadius: 999, background: "#1C1C1C", color: "#F2EFEA", fontSize: 13.5, fontWeight: 500, whiteSpace: "nowrap" }}>
      {children}
    </span>
  );
}

function CenteredHead({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", margin: "0 auto 40px", maxWidth: 900 }}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="max-md:!text-balance" style={{ margin: "12px 0 0", fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(34px,3.4vw,50px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>{title}</h2>
      {sub && <p style={{ margin: "20px auto 0", maxWidth: 640, fontSize: 17, lineHeight: 1.6, color: "#5A5854" }}>{sub}</p>}
    </div>
  );
}

const PROOF = [
  { v: "100K+", l: "users brought in" },
  { v: "50M+", l: "search impressions" },
  { v: "100M+", l: "total impressions" },
  { v: "7+ years", l: "in content and growth" },
];

const STORY_STEPS = [
  { n: "01", t: "Computer science", d: "A degree that taught me to think in systems. Also why tracking setups don’t scare me." },
  { n: "02", t: "Content writer", d: "Three years writing SEO blogs, branding and LinkedIn content for international clients. Repeat business and five star ratings taught me that clear beats clever." },
  { n: "03", t: "Lead Generation Sales Specialist", d: "Lead sales rep, then floor manager. I trained a telesales team, rewrote the scripts and hit monthly targets. That’s where I learned nobody cares about your product until it solves their problem." },
  { n: "04", t: "Lead generation", d: "Reddit and SEO campaigns for AI tools. Thousands of Reddit conversions in a single month, with zero ad spend." },
  { n: "05", t: "Product growth", d: "Scaled Blainy, an AI SaaS, from zero to 85K+ users without paid acquisition." },
  { n: "06", t: "Growth for multiple businesses", d: "Now I help SaaS and service businesses build and scale, from US home services to a platform I’m helping build from the ground up.", accent: true },
];

const GROWTH_PATH = [
  { n: "01", t: "Content", d: "I could write things people wanted to read. But nobody was finding them." },
  { n: "02", t: "SEO", d: "So I learned how search works. Traffic came, but traffic alone didn’t grow anything." },
  { n: "03", t: "Distribution", d: "So I learned how to put content where buyers already are." },
  { n: "04", t: "Community", d: "Reddit taught me that trust comes from helping first and selling second." },
  { n: "05", t: "Growth", d: "Eventually they stopped looking like separate channels. They were all parts of the same problem.", dark: true },
];

const LESSONS = [
  { n: "01", t: "Clarity sells", d: "If people have to work to understand you, they leave." },
  { n: "02", t: "Nobody cares until it helps them", d: "Features don’t close deals. Solving someone’s problem does." },
  { n: "03", t: "Distribution beats volume", d: "A great post nobody sees does less than a good post in the right place." },
  { n: "04", t: "Numbers should change decisions", d: "If a metric doesn’t change what you do next, it’s decoration." },
];

const COMPANIES: { t: string; img?: string; h?: string; w?: string }[] = [
  { t: "Amoxt Solutions", img: "/assets/v9/l_amoxt.png", h: "30px", w: "130px" },
  { t: "Blainy", img: "/assets/site/logo-blainy.png", h: "40px", w: "150px" },
  { t: "Everdry Waterproofing", img: "/assets/v8/logo-everdry.gif", h: "44px", w: "170px" },
  { t: "Virtarix", img: "/assets/v8/logos/virtarix.png", h: "38px", w: "150px" },
  { t: "LoomPad", img: "/assets/v8/logos/loompad.png", h: "32px", w: "150px" },
  { t: "Eplie", img: "/assets/v8/logos/eplie.png", h: "34px", w: "110px" },
  { t: "NeonRev", img: "/assets/v9/l_neonrev.png", h: "30px", w: "150px" },
  { t: "TechEon", img: "/assets/v8/logos/techeon.png", h: "32px", w: "150px" },
  { t: "HiFy", img: "/assets/v8/logos/hify.png", h: "36px", w: "90px" },
  { t: "Commenty" },
];

const CASES = [
  { logo: "/assets/site/logo-blainy.png", logoAlt: "Blainy", logoH: 34, cat: "AI SaaS", sr: "Blainy: ", title: "Zero to 85K+ users, no paid ads.", stat1v: "85K+", stat1l: "users", stat2v: "~30M", stat2l: "search impressions" },
  { logo: "/assets/v8/logo-everdry.gif", logoAlt: "Everdry Waterproofing", logoH: 40, cat: "Home services", sr: "Everdry Waterproofing: ", title: "Social and local SEO for a US home services company.", stat1v: "160K+", stat1l: "Facebook views", stat2v: "603", stat2l: "calls from Google" },
  { logo: "/assets/v8/logos/virtarix.png", logoAlt: "Virtarix", logoH: 30, cat: "AI and tech", sr: "Virtarix: ", title: "A new Facebook page to 70K+ views in 3 months.", stat1v: "70K+", stat1l: "Facebook views", stat2v: "1.2K+", stat2l: "Pinterest visits" },
  { logo: "/assets/v8/logos/loompad.png", logoAlt: "LoomPad", logoH: 30, cat: "Etsy store", sr: "LoomPad: ", title: "Sales from a store nobody could find.", stat1v: "$3,401", stat1l: "in sales", stat2v: "93", stat2l: "orders" },
];

const SKILLS_GROUPS = [
  { n: "01", t: "Growth and GTM", tags: ["Growth strategy", "Go to market planning", "Positioning", "Funnel diagnosis"] },
  { n: "02", t: "SEO and content", tags: ["Keyword research", "Technical SEO", "Article writing", "GEO"] },
  { n: "03", t: "Reddit and community", tags: ["Subreddit research", "Community engagement", "Reddit SEO"] },
  { n: "04", t: "Social and distribution", tags: ["Social media management", "Graphic design", "Pinterest", "Facebook groups"] },
  { n: "05", t: "Paid acquisition", tags: ["Google Ads", "Meta Ads", "Retargeting", "Landing page review"] },
  { n: "06", t: "Analytics and experimentation", tags: ["GA4", "Search Console", "Conversion tracking", "Testing"] },
];

const SI = (s: string) => `/icons/${s}.svg`;
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
  ["Multilogin", null, "t_multilogin.png", 22, 4.8],
  ["HubSpot", "hubspot"],
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
  src: s ? SI(s) : img ? V9 + img : "",
  h: (lh || 24) + "px",
  lw: img ? Math.round((lh || 24) * (ar || 1)) + "px" : "0px",
}));

const PHILOSOPHY_FLOW = ["Diagnose", "Prioritize", "Execute", "Measure"];
const PHILOSOPHY_CARDS = [
  { t: "Diagnose before adding.", d: "Most growth problems aren’t solved by another channel." },
  { t: "Qualified beats big.", d: "100 buyers beat 10,000 random visitors." },
  { t: "Communities aren’t ad space.", d: "Help first. Mention the product second." },
  { t: "Strategy has to survive execution.", d: "If a plan can’t be run, it isn’t a plan." },
];

const WORKING = [
  { n: "01", t: "Two clients at a time", d: "I usually work with two clients at once, so every task gets the time it actually needs." },
  { n: "02", t: "Weekly updates, in writing", d: "Every week you get a shared sheet showing what got done, what moved and what’s next. Want daily updates instead? Sure." },
  { n: "03", t: "Explain the why", d: "Every recommendation comes with the reason behind it. You’ll understand your marketing better after working with me, not worse." },
  { n: "04", t: "Do the work", d: "I don’t hand over a plan and vanish. I execute it too." },
];

const REVIEWS = [
  { name: "Khalid Bashir", role: "Founder, Blainy", src: "LinkedIn", avatar: "/assets/avatars/khalid.png", link: "/assets/reviews/linkedin-khalid-mirza.png", q: "I can confidently say he played a key role in driving our product Blainy from 0 to 80,000 users organically. His ability to craft smart growth strategies and execute them effectively made a real difference in our journey." },
  { name: "Cam Kaminsky", role: "Director, Everdry Waterproofing", src: "Upwork", initials: "CK", link: "/assets/reviews/upwork-virtarix-everdry.png", q: "He came in, got up to speed quick, and delivered what we needed without me having to micromanage. His communication is clean, turnaround time is solid, and he takes feedback well. Critically, he suggested how to approach things I didn't know that we needed to approach and the results were phenomenal." },
  { name: "Peter French", role: "Virtarix", src: "Upwork", initials: "PF", link: "/assets/reviews/upwork-virtarix-everdry.png", q: "Zain is an exceptionally skilled and professional freelancer. We hired him to optimize our online and social media presence, and his work directly addressed our goal of turning our growth plateau into predictable, scalable momentum." },
  { name: "Muhammad Dawood Ahmad", role: "Founder & CEO, Elixs Bikes", src: "LinkedIn", avatar: "/assets/avatars/dawood.png", link: "/assets/reviews/linkedin-dawood-fahad.png", q: "He shared some of the smartest ideas I've ever come across after just hearing about my idea, with quick strategies and clear advice." },
  { name: "Mirza Zain Ali Nasir", role: "AI Product Development, AEC Automations", src: "LinkedIn", avatar: "/assets/avatars/mirza.png", link: "/assets/reviews/linkedin-khalid-mirza.png", q: "Great Experience while Working with Zain ul Abidin, strong grasp on business flows, attention to details." },
  { name: "Muhammad Faique Arshad", role: "GTME, managed Zain directly", src: "LinkedIn", avatar: "/assets/avatars/faique.png", link: "/assets/reviews/linkedin-usman-faique.png", q: "He consistently delivers high-quality work, driving tangible business growth. An outstanding professional with a strategic mindset." },
].map((r, i) => ({ ...r, bg: i < 3 ? "#F2EFEA" : "#E6E2D9", srcLabel: r.src === "Upwork" ? "Upwork ★ 5.0" : "LinkedIn recommendation" }));

const PERSONAL_LIST = [
  { n: "02", t: "Anime and manhwa", d: "Always something on the watchlist, always something on the reading list." },
  { n: "03", t: "Big foodie", d: "Which, living in Lahore, is less a hobby and more a lifestyle." },
  { n: "04", t: "Manual car loyalist", d: "Automatic just feels wrong. I’m aware this is a minority opinion." },
  { n: "05", t: "I read every email", d: "Including the scam ones. Professional curiosity." },
];

const RESUME_ITEMS = [
  { org: "TechEon", role: "Senior Marketing Specialist", desc: null as string | null, range: "Feb 2026 to present" },
  { org: "Everdry Waterproofing of Michiana", role: "Marketing specialist (contract)", desc: "Social media and Google Business Profile for a US home services company.", range: "Jul 2025 to present" },
  { org: "Virtarix", role: "Marketing specialist (contract)", desc: "New Facebook page to 70K+ views in 3 months, and Pinterest built from scratch to 1.2K+ monthly visits.", range: "Aug 2025 to Feb 2026" },
  { org: "Amoxt Solutions", role: "Product growth specialist", desc: "Scaled Blainy to 85K+ users organically, with ~30M search impressions in 12 months.", range: "Apr 2024 to Oct 2025" },
  { org: "Amoxt Solutions", role: "Lead generation", desc: "Reddit and SEO campaigns with thousands of conversions in one month, zero ad spend.", range: "Sep 2023 to Apr 2024" },
  { org: "Infinix Solutions", role: "Floor manager and lead sales rep", desc: "Trained a telesales team, rewrote scripts, hit monthly targets.", range: "Jul 2022 to Sep 2023" },
  { org: "Upwork", role: "Content writer", desc: "SEO, branding and LinkedIn content for international clients, with five star ratings.", range: "Apr 2019 to Jul 2022" },
  { org: "Virtual University of Pakistan", role: "BS Computer Science", desc: "Degree completed.", range: "Completed" },
];

const CERTIFICATIONS = ["Growth Marketing", "Marketing Analytics", "Create a Go to Market Plan", "Social Media Marketing", "Semrush SEO Crash Course with Brian Dean"];

const FAQS: [string, string[]][] = [
  ["Where are you based, and what about time zones?", ["Lahore, Pakistan, which is UTC+5. I work with teams in the US, UAE and Europe. If we’re on opposite sides of the clock, your message is the first thing I read when I wake up, and we’ll find overlap for calls."]],
  ["Who do you work with?", ["SaaS and service businesses with a real product and some customers, where growth has stalled or the founder is doing too much of the marketing."]],
  ["How often will I hear from you?", ["Weekly, at minimum. You get a shared sheet showing what got done that week, what moved and what’s next. If you’d rather have daily updates, just say so."]],
  ["Are you taking new clients?", ["Yes. I usually work with two clients at a time so each one gets proper attention, so it’s worth reaching out early."]],
  ["What kinds of engagements do you take?", ["The free social check, the $499 audit, monthly plans and one time projects. All my client work is contract based."]],
  ["Are you open to full time roles?", ["Yes. For full time roles, my rate starts at $5,000 a month. If that’s outside your range, no hard feelings. I’d rather tell you upfront than waste your time, and I’m happy to suggest a monthly plan that fits your budget instead."]],
  ["Can you work with our existing team?", ["Yes. I can lead a channel, fill gaps, or support the people you already have."]],
  ["Do you do the work yourself?", ["Yes. The person you talk to is the person doing the work. No handoff to a junior you’ve never met."]],
];

export default function AboutPage() {
  const toolsLoop = [...TOOLS, ...TOOLS];
  const companiesLoop = [...COMPANIES, ...COMPANIES];

  return (
    <main id="top" style={{ overflowX: "clip" }}>
      {/* HERO */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(64px,8vw,112px) ${PAD} 0`, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <h1 style={{ ...HERO_H1_STYLE, maxWidth: 820 }}>
          Hi, I&apos;m Zain Ul Abdin.{" "}
          <em style={H1_ACCENT_STYLE}>
            I&nbsp;fix growth problems for a living. <Emphasis>Mostly on purpose.</Emphasis>
          </em>
        </h1>
        <p style={{ margin: "28px auto 0", maxWidth: 640, fontSize: 18, lineHeight: 1.6, color: "#4E4C48" }}>
          I&apos;m a growth marketing specialist from Lahore, working with SaaS and service businesses in the US, UAE and Europe. I started as a writer, ran a sales floor, then spent years figuring out why good products don&apos;t grow. Now I find that reason and fix it myself.
        </p>
        <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }} className="max-md:!w-full max-md:!max-w-[400px]">
          <a href="#resume" className="max-md:!flex max-md:!w-full max-md:!max-w-[400px] max-md:!justify-center" style={{ display: "inline-flex", alignItems: "center", height: 56, padding: "0 22px", borderRadius: 12, background: "#1C1C1C", color: "#F8F6F4", fontSize: 16, fontWeight: 600 }}>
            Download resume
          </a>
        </div>
        <Img
          loading="eager" fetchPriority="high"
          src="/assets/about/hero-t.png"
          alt="Illustration: content, search, testing, community, distribution and growth all orbiting one central growth system"
          style={{ display: "block", width: "100%", maxWidth: 820, height: "auto", margin: "clamp(40px,4vw,56px) auto 0", mixBlendMode: "multiply" }}
        />
      </section>

      {/* PROOF */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(56px,6vw,80px) ${PAD} 0` }}>
        <div style={{ display: "grid", borderTop: "1px solid #DDDAD3", borderBottom: "1px solid #DDDAD3" }} className="grid-cols-2 sm:!grid-cols-4">
          {PROOF.map((s) => (
            <div key={s.l} style={{ padding: "28px 16px", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--nf-general-sans)", fontSize: "clamp(36px,3.6vw,52px)", fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{s.v}</div>
              <div style={{ marginTop: 10, fontSize: 14, color: "#5A5854" }}>{s.l}</div>
            </div>
          ))}
        </div>
        <p style={{ margin: "16px 0 0", textAlign: "center", fontSize: 13.5, color: "#6F6B64" }}>Across SaaS, AI, tech, home services and ecommerce.</p>
      </section>

      {/* MY STORY */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <CenteredHead
          eyebrow="My story"
          title={
            <>
              I didn&apos;t plan to become a growth marketer.
              <em style={{ display: "block", marginTop: 6, fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.08em", lineHeight: 1.05 }}>One problem just kept leading to the next.</em>
            </>
          }
          sub="I studied computer science, started writing to pay the bills, and realized the writing only mattered if people found it, read it and did something about it. Everything since has been chasing that one question."
        />
        <Img loading="lazy" src="/assets/about/story-t.png" alt="Illustration: ideas, writing, research, distribution, testing and growth connected around one centre" style={{ display: "block", width: "100%", maxWidth: 760, height: "auto", margin: "-12px auto 28px", mixBlendMode: "multiply" }} />
        <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: "32px 24px" }} className="grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-6">
          {STORY_STEPS.map((s) => (
            <li key={s.n} style={{ position: "relative", paddingTop: 28, borderTop: "1px solid #1C1C1C", textAlign: "center" }}>
              <span aria-hidden="true" style={{ position: "absolute", top: -6, left: "calc(50% - 5.5px)", width: 11, height: 11, borderRadius: "50%", background: s.accent ? "#C4A47C" : "#1C1C1C", boxShadow: "0 0 0 4px #EEEDE7" }} />
              <div style={{ fontSize: 12, fontWeight: 600, color: "#7D6039", fontVariantNumeric: "tabular-nums" }}>{s.n}</div>
              <h3 style={{ margin: "10px 0 0", fontFamily: "var(--nf-general-sans)", fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{s.t}</h3>
              <p className="max-md:!text-base" style={{ margin: "10px 0 0", fontSize: 14.5, lineHeight: 1.6, color: "#4E4C48" }}>{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* GROWTH PATH */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <div style={{ borderRadius: 28, background: "#F4F0E8", border: "1px solid #E2D8CA", padding: "clamp(40px,5vw,64px) clamp(20px,3vw,48px)" }}>
          <CenteredHead
            eyebrow="How I got into growth"
            title={
              <>
                Content, then SEO,
                <em style={{ display: "block", marginTop: 6, fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.08em", lineHeight: 1.05 }}>then everything else.</em>
              </>
            }
            sub="Each skill exposed a problem the last one couldn’t solve."
          />
          <Img loading="lazy" src="/assets/about/growth-path-t.png" alt="Illustration: a path from writing to search to community to growth to a hit target" style={{ display: "block", width: "100%", maxWidth: 900, height: "auto", margin: "-12px auto 28px", mixBlendMode: "multiply" }} />
          <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 16 }} className="grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-5">
            {GROWTH_PATH.map((p) => (
              <li
                key={p.n}
                style={{
                  position: "relative",
                  borderRadius: 20,
                  background: p.dark ? "#1C1C1C" : "#FBFAF7",
                  color: p.dark ? "#F2EFEA" : "#1C1C1C",
                  border: `1px solid ${p.dark ? "#1C1C1C" : "#E2D8CA"}`,
                  padding: "24px 20px 26px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: 10,
                }}
              >
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: p.dark ? "#D3AE82" : "#7D6039", fontVariantNumeric: "tabular-nums" }}>{p.n}</span>
                  {!p.dark && (
                    <span aria-hidden="true" style={{ color: "#C4A47C" }}>
                      <ArrowIcon />
                    </span>
                  )}
                </div>
                <h3 style={{ margin: 0, fontFamily: "var(--nf-general-sans)", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>{p.t}</h3>
                <p className="max-md:!text-base" style={{ margin: 0, fontSize: 14.5, lineHeight: 1.55, color: p.dark ? "#C9C4BA" : "#4E4C48" }}>{p.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* LESSONS */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <CenteredHead
          eyebrow="Lessons"
          title={
            <>
              The work taught me
              <em style={{ display: "block", marginTop: 6, fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.08em", lineHeight: 1.05 }}>more than courses did.</em>
            </>
          }
          sub="I have the certifications. But the lessons that stuck came from real campaigns, real clients and real mistakes."
        />
        <Img loading="lazy" src="/assets/about/loop-t.png" alt="Illustration: writing, testing, measuring, conversation and distribution feeding back into one loop" style={{ display: "block", width: "100%", maxWidth: 720, height: "auto", margin: "-12px auto 28px", mixBlendMode: "multiply" }} />
        <div style={{ display: "grid", gap: "32px clamp(24px,3vw,40px)" }} className="grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4">
          {LESSONS.map((l) => (
            <div key={l.n} style={{ paddingTop: 20, borderTop: "1px solid #1C1C1C", textAlign: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#7D6039", fontVariantNumeric: "tabular-nums" }}>{l.n}</div>
              <h3 style={{ margin: "12px 0 0", fontFamily: "var(--nf-general-sans)", fontSize: "clamp(19px,1.6vw,22px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{l.t}</h3>
              <p className="max-md:!text-base" style={{ margin: "10px 0 0", fontSize: 15.5, lineHeight: 1.6, color: "#4E4C48" }}>{l.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMPANIES */}
      <section className="max-md:!pt-20" style={{ padding: "clamp(88px,8vw,112px) 0 0" }}>
        <div style={{ padding: `0 ${PAD}` }}>
          <CenteredHead
            eyebrow="Companies"
            title={
              <>
                Companies and products
                <em style={{ display: "block", marginTop: 6, fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.08em", lineHeight: 1.05 }}>I&apos;ve worked with.</em>
              </>
            }
            sub="SaaS, AI, tech, home services and ecommerce."
          />
        </div>
        <div
          className="max-md:![-webkit-mask-image:linear-gradient(90deg,transparent,#000_16px,#000_calc(100%_-_16px),transparent)] max-md:![mask-image:linear-gradient(90deg,transparent,#000_16px,#000_calc(100%_-_16px),transparent)]"
          style={{
            background: "#EEEDE7",
            overflow: "hidden",
            borderTop: "1px solid #DDDAD3",
            borderBottom: "1px solid #DDDAD3",
            WebkitMaskImage: "linear-gradient(90deg,transparent,#000 80px,#000 calc(100% - 80px),transparent)",
            maskImage: "linear-gradient(90deg,transparent,#000 80px,#000 calc(100% - 80px),transparent)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", width: "max-content", animation: "zmarqL 34s linear infinite" }}>
            {companiesLoop.map((b, i) => (
              <div key={i} style={{ flex: "0 0 auto", display: "flex", alignItems: "center", justifyContent: "center", height: "clamp(104px,9vw,136px)", padding: "0 clamp(40px,4vw,64px)", background: "#EEEDE7" }}>
                {b.img ? (
                  <Img loading="lazy" src={b.img} alt={b.t} style={{ display: "block", width: b.w, height: b.h, objectFit: "contain", mixBlendMode: "multiply" }} />
                ) : (
                  <span style={{ fontFamily: "var(--nf-general-sans)", fontSize: 30, fontWeight: 600, letterSpacing: "-0.03em", color: "#1C1C1C", whiteSpace: "nowrap" }}>{b.t}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASES */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <CenteredHead
          eyebrow="Selected work"
          title={
            <>
              A few things
              <em style={{ display: "block", marginTop: 6, fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.08em", lineHeight: 1.05 }}>I&apos;ve helped grow.</em>
            </>
          }
          sub="The short version."
        />
        <Img loading="lazy" src="/assets/about/results-t.png" alt="Illustration: several growth dashboards rising around one central result" style={{ display: "block", width: "100%", maxWidth: 720, height: "auto", margin: "-12px auto 28px", mixBlendMode: "multiply" }} />
        <div style={{ display: "grid", gap: 16 }} className="grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4">
          {CASES.map((c) => (
            <article key={c.logoAlt} style={{ borderRadius: 24, background: "#F8F6F4", border: "1px solid #E2DFD8", padding: "28px 24px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 18 }}>
              <div style={{ height: 48, width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Img loading="lazy" src={c.logo} alt={c.logoAlt} style={{ display: "block", height: c.logoH, width: "auto", maxWidth: 170, mixBlendMode: "multiply" }} />
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#7D6039" }}>{c.cat}</div>
                <h3 style={{ margin: "8px 0 0", fontFamily: "var(--nf-general-sans)", fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.25 }}>
                  <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>{c.sr}</span>
                  {c.title}
                </h3>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "start", width: "100%", borderTop: "1px solid #DDDAD3", marginTop: "auto" }}>
                <div style={{ padding: "18px 8px 0" }}>
                  <div style={{ fontFamily: "var(--nf-general-sans)", fontSize: 26, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{c.stat1v}</div>
                  <div style={{ marginTop: 6, fontSize: 13, color: "#5A5854" }}>{c.stat1l}</div>
                </div>
                <div style={{ padding: "18px 8px 0", borderLeft: "1px solid #DDDAD3" }}>
                  <div style={{ fontFamily: "var(--nf-general-sans)", fontSize: 26, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>{c.stat2v}</div>
                  <div style={{ marginTop: 6, fontSize: 13, color: "#5A5854" }}>{c.stat2l}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SKILLS */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <CenteredHead
          eyebrow="Skills"
          title={
            <>
              What I&apos;m
              <em style={{ display: "block", marginTop: 6, fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.08em", lineHeight: 1.05 }}>actually good at.</em>
            </>
          }
          sub="Grouped, because keyword soup helps nobody."
        />
        <Img loading="lazy" src="/assets/about/skills-t.png" alt="Illustration: analytics, content, targeting, search, sharing and conversation around one core skill set" style={{ display: "block", width: "100%", maxWidth: 720, height: "auto", margin: "-12px auto 28px", mixBlendMode: "multiply" }} />
        <div style={{ display: "grid", gap: 16 }} className="grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3">
          {SKILLS_GROUPS.map((g) => (
            <div key={g.n} style={{ borderRadius: 20, background: "#F8F6F4", border: "1px solid #E2DFD8", padding: "24px 22px 26px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: "#7D6039", fontVariantNumeric: "tabular-nums" }}>{g.n}</span>
                <h3 style={{ margin: 0, fontFamily: "var(--nf-general-sans)", fontSize: 19, fontWeight: 600, letterSpacing: "-0.02em" }}>{g.t}</h3>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
                {g.tags.map((tag) => (
                  <Pill key={tag}>{tag}</Pill>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TOOLS */}
      <section className="max-md:!pt-20" style={{ padding: "clamp(88px,8vw,112px) 0 0" }}>
        <div style={{ padding: `0 ${PAD}` }}>
          <CenteredHead
            eyebrow="Tools"
            title={
              <>
                Tools I work with.
                <em style={{ display: "block", marginTop: 6, fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.08em", lineHeight: 1.05 }}>The stack changes. The job doesn&apos;t.</em>
              </>
            }
          />
        </div>
        <div
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
          <div style={{ display: "flex", alignItems: "center", width: "max-content", animation: "zmarqL 44s linear infinite" }}>
            {toolsLoop.map((t, i) => (
              <div key={i} style={{ flex: "0 0 auto", display: "flex", alignItems: "center", gap: 10, height: 88, padding: "0 clamp(24px,2.4vw,32px)", fontSize: 16, fontWeight: 600, letterSpacing: "-0.01em", color: "#1C1C1C", whiteSpace: "nowrap" }}>
                {t.hasIcon && <Img src={t.src} alt="" aria-hidden="true" width={26} height={26} style={{ display: "block", width: 26, height: 26, objectFit: "contain" }} />}
                {t.hasLogo && <BgImage src={t.src} alt={t.t} fit="contain" style={{ display: "block", height: t.h, width: t.lw }} />}
                {t.showText && <span>{t.t}</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <CenteredHead
          eyebrow="How I think about marketing"
          title={
            <>
              More marketing is rarely
              <em style={{ display: "block", marginTop: 6, fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.08em", lineHeight: 1.05 }}>the first answer.</em>
            </>
          }
          sub="Usually it’s fixing the thing already there."
        />
        <Img loading="lazy" src="/assets/about/bottleneck-t.png" alt="Illustration: many channels pouring into a funnel where a magnifying glass finds the blockage before growth" style={{ display: "block", width: "100%", maxWidth: 820, height: "auto", margin: "-12px auto 28px", mixBlendMode: "multiply" }} />
        <div role="img" aria-label="Diagnose, prioritize, execute, measure, learn, then repeat" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "10px 8px", margin: "0 auto 48px", maxWidth: 980 }}>
          {PHILOSOPHY_FLOW.map((t, i) => (
            <span key={t} style={{ display: "contents" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 10, height: 48, padding: "0 20px", borderRadius: 999, background: i === 0 ? "#1C1C1C" : "#F8F6F4", color: i === 0 ? "#F2EFEA" : "#1C1C1C", border: i === 0 ? "1px solid #1C1C1C" : "1px solid #DDD6C8", fontFamily: "var(--nf-general-sans)", fontSize: 16, fontWeight: 600 }}>
                <span style={{ fontSize: 11.5, color: i === 0 ? "#D3AE82" : "#7D6039" }}>{String(i + 1).padStart(2, "0")}</span>
                {t}
              </span>
              <span aria-hidden="true" style={{ color: "#C4A47C" }}>
                <ArrowIcon />
              </span>
            </span>
          ))}
          <span aria-hidden="true" style={{ fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: 18, color: "#6E6B66", paddingLeft: 6 }}>
            and repeat
          </span>
        </div>
        <div style={{ display: "grid", gap: "32px clamp(24px,3vw,40px)" }} className="grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4">
          {PHILOSOPHY_CARDS.map((c) => (
            <div key={c.t} style={{ paddingTop: 20, borderTop: "1px solid #1C1C1C", textAlign: "center" }}>
              <h3 style={{ margin: 0, fontFamily: "var(--nf-general-sans)", fontSize: "clamp(19px,1.6vw,22px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{c.t}</h3>
              <p className="max-md:!text-base" style={{ margin: "10px 0 0", fontSize: 15.5, lineHeight: 1.6, color: "#4E4C48" }}>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW I WORK */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <CenteredHead
          eyebrow="Working together"
          title={
            <>
              How I work
              <em style={{ display: "block", marginTop: 6, fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.08em", lineHeight: 1.05 }}>with people.</em>
            </>
          }
          sub="The short version: you’ll always know what I’m doing and why."
        />
        <Img loading="lazy" src="/assets/about/how-i-work-t.png" alt="Illustration: conversation, plan, execution and results linked in order" style={{ display: "block", width: "100%", maxWidth: 820, height: "auto", margin: "-12px auto 28px", mixBlendMode: "multiply" }} />
        <div style={{ display: "grid", gap: "32px clamp(24px,3vw,40px)" }} className="grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4">
          {WORKING.map((w) => (
            <div key={w.n} style={{ paddingTop: 20, borderTop: "1px solid #1C1C1C", textAlign: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#7D6039", fontVariantNumeric: "tabular-nums" }}>{w.n}</div>
              <h3 style={{ margin: "12px 0 0", fontFamily: "var(--nf-general-sans)", fontSize: "clamp(19px,1.6vw,22px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{w.t}</h3>
              <p className="max-md:!text-base" style={{ margin: "10px 0 0", fontSize: 15.5, lineHeight: 1.6, color: "#4E4C48" }}>{w.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CLIENT PROOF */}
      <section id="reviews" className="max-md:!mt-20" style={{ marginTop: "clamp(88px,8vw,112px)", background: "#171717", color: "#F2EFEA" }}>
        <div style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(80px,8vw,104px) ${PAD} 0` }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", margin: "0 auto", maxWidth: 900 }}>
            <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#C4A47C" }}>Client proof</div>
            <h2 className="max-md:!text-balance" style={{ margin: "12px 0 0", fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(34px,3.4vw,50px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
              What people say
              <em style={{ display: "block", marginTop: 6, fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.08em", lineHeight: 1.05, color: "#D3AE82" }}>about working with me.</em>
            </h2>
            <p style={{ margin: "20px auto 0", maxWidth: 640, fontSize: 17, lineHeight: 1.6, color: "#B7B2A8" }}>Luckily, I don&apos;t have to write this part myself.</p>
          </div>
        </div>
        <div
          className="max-md:![-webkit-mask-image:linear-gradient(90deg,transparent,#000_16px,#000_calc(100%_-_16px),transparent)] max-md:![mask-image:linear-gradient(90deg,transparent,#000_16px,#000_calc(100%_-_16px),transparent)]"
          style={{
            marginTop: "clamp(40px,4vw,56px)",
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            WebkitMaskImage: "linear-gradient(90deg,transparent,#000 64px,#000 calc(100% - 64px),transparent)",
            maskImage: "linear-gradient(90deg,transparent,#000 64px,#000 calc(100% - 64px),transparent)",
          }}
        >
          <div style={{ display: "flex", alignItems: "stretch", width: "max-content", padding: "0 20px 8px" }}>
            {REVIEWS.map((r) => (
              <figure key={r.name} style={{ flex: "0 0 auto", width: "clamp(300px,26vw,380px)", margin: "0 16px 0 0", borderRadius: 20, background: r.bg, color: "#1C1C1C", padding: "clamp(24px,2.2vw,32px)", display: "flex", flexDirection: "column", gap: 20, scrollSnapAlign: "center" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#7D6039" }}>{r.srcLabel}</span>
                  <a href={r.link} target="_blank" rel="noopener noreferrer" className="max-md:!whitespace-nowrap max-md:relative max-md:after:absolute max-md:after:inset-x-0 max-md:after:-inset-y-3.5 max-md:after:content-['']" style={{ fontSize: 12.5, color: "#5A5854", borderBottom: "1px solid #CFCBC2" }}>
                    View original ↗
                  </a>
                </div>
                <blockquote style={{ margin: 0, fontFamily: "var(--nf-general-sans)", fontWeight: 500, fontSize: 16.5, lineHeight: 1.4, letterSpacing: "-0.01em", flex: 1 }}>&quot;{r.q}&quot;</blockquote>
                <figcaption className="max-md:!justify-center" style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 16, borderTop: "1px solid #DAD6CC" }}>
                  {r.avatar ? (
                    <Img loading="lazy" src={r.avatar} alt={r.name} style={{ width: 44, height: 44, borderRadius: "50%", flex: "0 0 auto", objectFit: "cover" }} />
                  ) : (
                    <span style={{ width: 44, height: 44, borderRadius: "50%", flex: "0 0 auto", background: "#DDD7CB", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>{r.initials}</span>
                  )}
                  <span style={{ minWidth: 0 }}>
                    <span style={{ display: "block", fontSize: 15, fontWeight: 600 }}>{r.name}</span>
                    <span style={{ display: "block", fontSize: 13, color: "#5A5854", lineHeight: 1.35 }}>{r.role}</span>
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
        <p style={{ margin: "24px 0 0", textAlign: "center", fontSize: 13.5, color: "#8B877F" }}>Real reviews from real clients, including Upwork.</p>
        <div style={{ height: "clamp(72px,7vw,96px)" }} />
      </section>

      {/* PERSONAL */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <div style={{ borderRadius: 28, background: "#1C1C1C", color: "#F2EFEA", padding: "clamp(40px,5vw,72px) clamp(24px,4vw,64px)", display: "grid", gap: "40px clamp(32px,5vw,72px)", alignItems: "stretch" }} className="md:!grid-cols-2">
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 32 }}>
            <div className="max-md:!text-center">
              <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#C4A47C" }}>Outside the dashboard</div>
              <h2 className="max-md:!text-balance" style={{ margin: "14px 0 0", fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(34px,3.4vw,50px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
                There&apos;s a person
                <em style={{ display: "block", marginTop: 6, fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.08em", lineHeight: 1.05, color: "#D3AE82" }}>behind the dashboards.</em>
              </h2>
              <p className="max-md:!mx-auto" style={{ margin: "18px 0 0", maxWidth: 420, fontSize: 16.5, lineHeight: 1.6, color: "#B7B2A8" }}>A few things that have nothing to do with click through rates.</p>
            </div>
            <figure style={{ margin: 0, padding: 28, borderRadius: 20, background: "#262523", border: "1px solid #3A3935" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontFamily: "var(--nf-general-sans)", fontSize: 13, fontWeight: 600, color: "#1C1C1C", background: "#D3AE82", borderRadius: 999, height: 28, padding: "0 12px", display: "inline-flex", alignItems: "center" }}>01</span>
                <h3 style={{ margin: 0, fontFamily: "var(--nf-general-sans)", fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em" }}>Gamer with a serious backlog</h3>
              </div>
              <p className="max-md:!text-base" style={{ margin: "14px 0 0", fontSize: 15.5, lineHeight: 1.6, color: "#C9C4BA" }}>Resident Evil is my all time favorite. Right now I&apos;m rotating between Sekiro, Elden Ring and Black Myth: Wukong.</p>
              <blockquote style={{ margin: "18px 0 0", paddingTop: 18, borderTop: "1px solid #3A3935", fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "clamp(22px,2vw,28px)", lineHeight: 1.2, color: "#F2EFEA" }}>
                &ldquo;Dying to the same boss 40 times turns out to be great training for Google algorithm updates.&rdquo;
              </blockquote>
            </figure>
          </div>
          <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", justifyContent: "center", borderTop: "1px solid #3A3935" }}>
            {PERSONAL_LIST.map((p) => (
              <li key={p.n} style={{ display: "grid", gridTemplateColumns: "64px minmax(0,1fr)", gap: "4px 20px", alignItems: "baseline", padding: "26px 0", borderBottom: "1px solid #3A3935" }}>
                <span style={{ fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: 40, lineHeight: 1, color: "#D3AE82" }}>{p.n}</span>
                <div>
                  <h3 style={{ margin: 0, fontFamily: "var(--nf-general-sans)", fontSize: "clamp(20px,1.8vw,24px)", fontWeight: 600, letterSpacing: "-0.02em" }}>{p.t}</h3>
                  <p className="max-md:!text-base" style={{ margin: "8px 0 0", fontSize: 15.5, lineHeight: 1.6, color: "#B7B2A8" }}>{p.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* RESUME */}
      <section id="resume" className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <CenteredHead
          eyebrow="Resume"
          title={
            <>
              Want the boring
              <em style={{ display: "block", marginTop: 6, fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.08em", lineHeight: 1.05 }}>chronological version?</em>
            </>
          }
          sub="Here it is. Dates and everything."
        />
        <Img loading="lazy" src="/assets/about/resume-t.png" alt="Illustration: calendar, checklists, timeline, documents and invoices organised around one folder" style={{ display: "block", width: "100%", maxWidth: 640, height: "auto", margin: "-12px auto 28px", mixBlendMode: "multiply" }} />
        <div style={{ maxWidth: 1040, margin: "0 auto", borderTop: "1px solid #1C1C1C" }}>
          {RESUME_ITEMS.map((r, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", gap: 6, padding: "20px 0", borderBottom: "1px solid #DDDAD3" }} className="md:!grid md:!grid-cols-[minmax(0,260px)_minmax(0,1fr)_140px] md:!gap-x-6 md:!items-baseline">
              <h3 style={{ margin: 0, fontFamily: "var(--nf-general-sans)", fontSize: 18, fontWeight: 600, letterSpacing: "-0.015em" }}>{r.org}</h3>
              <div>
                <div className="max-md:!text-base" style={{ fontSize: 15.5, fontWeight: 500, color: "#1C1C1C" }}>{r.role}</div>
                {r.desc && <p className="max-md:!text-base" style={{ margin: "4px 0 0", fontSize: 14.5, lineHeight: 1.55, color: "#5A5854" }}>{r.desc}</p>}
              </div>
              <span style={{ fontSize: 13.5, color: "#6E6B66", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }} className="md:!text-right">
                {r.range}
              </span>
            </div>
          ))}
          <div style={{ padding: "24px 0 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#6F6B64" }}>Certifications</div>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
              {CERTIFICATIONS.map((c) => (
                <Pill key={c}>{c}</Pill>
              ))}
            </div>
          </div>
        </div>
        <div style={{ marginTop: 36, display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center" }}>
          <a href="#resume-pdf" className="max-md:!flex max-md:!w-full max-md:!max-w-[400px] max-md:!justify-center" style={{ display: "inline-flex", alignItems: "center", gap: 12, height: 56, padding: "0 26px", borderRadius: 12, background: "#1C1C1C", color: "#F8F6F4", fontSize: 16, fontWeight: 600 }}>
            Download resume
            <ArrowIcon />
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <CenteredHead
          eyebrow="FAQ"
          title={
            <>
              Working with me,
              <em style={{ display: "block", marginTop: 6, fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.08em", lineHeight: 1.05 }}>answered straight.</em>
            </>
          }
        />
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <FAQAccordion faqs={FAQS} />
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} clamp(64px,7vw,96px)` }}>
        <div style={{ borderRadius: 28, background: "#1C1C1C", color: "#F2EFEA", padding: "clamp(48px,6vw,88px) clamp(24px,5vw,72px)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <h2 style={{ margin: 0, fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(34px,3.6vw,52px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>That&apos;s the story.</h2>
          <p style={{ margin: "12px 0 0", fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "clamp(30px,3vw,42px)", lineHeight: 1.1, color: "#D3AE82" }}>
            <Emphasis>Now tell me yours.</Emphasis>
          </p>
          <p style={{ margin: "24px 0 0", maxWidth: 560, fontSize: 17, lineHeight: 1.6, color: "#B7B2A8" }}>
            What are you growing, and what&apos;s getting in the way? I&apos;ll tell you where I&apos;d start. I only take two clients at a time, so the sooner the better.
          </p>
          <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }} className="max-md:!w-full max-md:!max-w-[400px] max-md:!flex-col">
            <a href="https://calendly.com/zain-ameen/30min" target="_blank" rel="noopener noreferrer" className="max-md:!justify-center" style={{ display: "inline-flex", alignItems: "center", gap: 12, height: 56, padding: "0 26px", borderRadius: 12, background: "#F2EFEA", color: "#1C1C1C", fontSize: 16, fontWeight: 600 }}>
              Book a free call
              <ArrowIcon />
            </a>
            <a href="mailto:hello@zainameen.com" className="max-md:!justify-center" style={{ display: "inline-flex", alignItems: "center", height: 56, padding: "0 22px", borderRadius: 12, border: "1px solid #3A3935", color: "#F2EFEA", fontSize: 16, fontWeight: 600 }}>
              Send me an email
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
