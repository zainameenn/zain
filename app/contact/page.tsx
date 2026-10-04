import { buildMetadata } from "@/lib/seo";
import { H1_ACCENT_STYLE, HERO_H1_STYLE } from "@/app/HomeComponents/heading";
import { ArrowIcon, Emphasis, LinkedInIcon, MailIcon } from "../HomeComponents/icons";
import { FAQAccordion } from "../HomeComponents/FAQAccordion";
import { ContactForm } from "./ContactForm";
import { CalendlyEmbed } from "./CalendlyEmbed";
import { Img } from "../HomeComponents/Img";

export const metadata = buildMetadata({
  title: "Contact Zain Ul Abdin | Book a Free 30 Minute Call",
  description:
    "Contact Zain Ul Abdin about SEO, Reddit, social or ads. Book a free 30 minute call, send an email or fill out a short form. Messy briefs welcome.",
  path: "/contact",
});

const MAX = 1280;
const PAD = "clamp(20px,2.5vw,32px)";

function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: dark ? "#D3AE82" : "#6F6B64" }}>
      {children}
    </div>
  );
}

function CenterHead({
  eyebrow,
  title,
  sub,
  dark,
  maxWidth = 900,
  marginBottom = 40,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  dark?: boolean;
  maxWidth?: number;
  marginBottom?: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", margin: `0 auto ${marginBottom}px`, maxWidth }}>
      <Eyebrow dark={dark}>{eyebrow}</Eyebrow>
      <h2
        className="max-md:!text-balance"
        style={{
          margin: "12px 0 0",
          fontFamily: "'General Sans', 'General Sans Fallback'",
          fontWeight: 600,
          fontSize: "clamp(34px,3.4vw,50px)",
          lineHeight: 1.04,
          letterSpacing: "-0.035em",
          color: dark ? "#F2EFEA" : "#1C1C1C",
        }}
      >
        {title}
      </h2>
      {sub && (
        <p style={{ margin: "20px 0 0", maxWidth: 640, fontSize: 17, lineHeight: 1.6, color: dark ? "#B7B2A8" : "#5A5854" }}>
          {sub}
        </p>
      )}
    </div>
  );
}

function ReachCard({
  alt,
  imgSrc,
  title,
  desc,
  ctaText,
  ctaHref,
  highlight,
}: {
  alt: string;
  imgSrc: string;
  title: string;
  desc: string;
  ctaText: string;
  ctaHref: string;
  highlight?: boolean;
}) {
  const external = ctaHref.startsWith("http");
  return (
    <div
      style={{
        minWidth: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        padding: "28px clamp(20px,2.4vw,32px) 32px",
        borderRadius: 22,
        background: "#FBFBF9",
        border: highlight ? "1px solid #D9CBB6" : "1px solid #E2DFD8",
        boxShadow: highlight ? "0 0 0 4px rgba(196,164,124,.12)" : "none",
      }}
    >
      <div style={{ width: 156, height: 156, margin: "-14px auto -6px" }}>
        <Img
          loading="lazy"
          src={imgSrc}
          alt={alt}
          style={{ display: "block", width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
      <h3 style={{ margin: "4px 0 0", fontFamily: "'General Sans', 'General Sans Fallback'", fontSize: 24, fontWeight: 600, letterSpacing: "-0.02em" }}>{title}</h3>
      <p style={{ margin: "10px 0 0", fontSize: 16, lineHeight: 1.55, color: "#5A5854", flex: 1 }}>{desc}</p>
      <a
        href={ctaHref}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener" : undefined}
        style={
          highlight
            ? { marginTop: 24, alignSelf: "center", display: "inline-flex", alignItems: "center", gap: 10, height: 48, padding: "0 20px", borderRadius: 12, background: "#1C1C1C", color: "#F8F6F4", fontSize: 15, fontWeight: 600 }
            : { marginTop: 24, alignSelf: "center", display: "inline-flex", alignItems: "center", gap: 10, height: 48, padding: "0 20px", borderRadius: 12, border: "1px solid #CFCBC2", color: "#1C1C1C", fontSize: 15, fontWeight: 600 }
        }
      >
        {ctaText}
        <ArrowIcon />
      </a>
    </div>
  );
}

const TOPIC_PILLS = [
  "Growth strategy",
  "SEO",
  "Reddit marketing",
  "Social media",
  "Content and design",
  "Google and Meta ads",
  "Go to market planning",
  "Why my posts aren't getting seen",
  "“I genuinely don't know what's wrong”",
];

const MESSY_STEPS = [
  { n: "01", t: "Bring what you have", d: "Screenshots, links, numbers, or nothing at all." },
  { n: "02", t: "Tell me what hurts", d: "What's not working, and what have you already tried?" },
  { n: "03", t: "We'll find the next step", d: "No homework. No 12 page questionnaire." },
];

const NEXT_STEPS = [
  { n: "01", t: "You send it", d: "Call, email or form. Whatever's easiest." },
  { n: "02", t: "I look at it properly", d: "I check your site and what you sent before recommending anything. No copy and paste replies." },
  { n: "03", t: "We decide what makes sense", d: "A free check, the $499 audit, a monthly plan, or sometimes nothing. If I'm not the right fit, I'll tell you who is." },
];

const SOCIAL_LINKS: { label: string; href: string; kind: "linkedin" | "mail" | "icon"; icon?: string }[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/zain-ameen/", kind: "linkedin" },
  { label: "Email", href: "mailto:hello@zainameen.com", kind: "mail" },
  { label: "Calendly", href: "https://calendly.com/zain-ameen/30min", kind: "icon", icon: "calendly" },
  { label: "Instagram", href: "https://www.instagram.com/zainn.ms/", kind: "icon", icon: "instagram" },
  { label: "Threads", href: "https://www.threads.com/@zainn.ms", kind: "icon", icon: "threads" },
  { label: "X", href: "https://x.com/zainnameen", kind: "icon", icon: "x" },
  { label: "Pinterest", href: "https://www.pinterest.com/zainameenn", kind: "icon", icon: "pinterest" },
  { label: "Upwork", href: "https://www.upwork.com/freelancers/~0135cf0916aa8d26bf", kind: "icon", icon: "upwork" },
];

const FAQS: [string, string[]][] = [
  [
    "How quickly do you reply?",
    [
      "Usually within a couple of hours. If we're on opposite sides of the clock, your message is the first thing I read when I wake up. I read every email, even the scam ones, so yours is in good company.",
    ],
  ],
  ["Is the call really free?", ["Yes. 30 minutes, no pitch. You'll leave with at least one thing to fix, whether we work together or not."]],
  ["Do I need to know which service I need?", ["No. Most people don't, and that's fine. Tell me what's stuck and I'll tell you where I'd start."]],
  ["Can we start with a one time project?", ["Yes. Most clients start with the free social check or the $499 audit before committing to anything monthly."]],
  [
    "Do you work with small companies?",
    [
      "Yes, as long as there's a real product or service and some customers. Most of my clients are small teams where the founder still does too much of the marketing.",
    ],
  ],
  [
    "What should I send before the call?",
    ["Nothing is required. If you want to make the call more useful, send your website link, what's not working and anything you've already tried."],
  ],
];

export default function ContactPage() {
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
        <h1 style={{ ...HERO_H1_STYLE, maxWidth: 820 }}>
          Contact Zain Ul Abdin.{" "}
          <em style={H1_ACCENT_STYLE}>
            Bring the problem, <Emphasis>I&apos;ll bring the coffee.</Emphasis>
          </em>
        </h1>
        <p style={{ margin: "32px 0 0", maxWidth: 620, fontSize: 18, lineHeight: 1.6, color: "#4E4C48" }}>
          Contact me with what you&apos;re working on, what isn&apos;t working, or where you&apos;re trying to get. I&apos;ll help you figure out the clearest next step, even if that step doesn&apos;t involve me.
        </p>
        <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }} className="max-md:!w-full max-md:!max-w-[400px] max-md:!flex-col">
          <a href="#book" className="max-md:!justify-center" style={{ display: "inline-flex", alignItems: "center", gap: 12, height: 56, padding: "0 26px", borderRadius: 12, background: "#1C1C1C", color: "#F8F6F4", fontSize: 16, fontWeight: 600 }}>
            Book a free call
            <ArrowIcon />
          </a>
          <a href="mailto:hello@zainameen.com" className="max-md:!justify-center" style={{ display: "inline-flex", alignItems: "center", gap: 10, height: 56, padding: "0 22px", borderRadius: 12, border: "1px solid #CFCBC2", color: "#1C1C1C", fontSize: 16, fontWeight: 600 }}>
            Send me an email
          </a>
        </div>
        <p className="max-md:!block" style={{ margin: "16px 0 0", display: "flex", alignItems: "center", gap: 10, fontSize: 13.5, color: "#6E6B66" }}>
          <span aria-hidden="true" className="max-md:!mr-2.5 max-md:!inline-block max-md:!align-middle" style={{ width: 6, height: 6, borderRadius: "50%", background: "#C4A47C" }} />
          No sales script. No slide deck. I usually reply within a couple of hours.
        </p>
        <div style={{ width: "100%", maxWidth: 1040, margin: "clamp(12px,2vw,28px) auto 0" }}>
          <Img
            loading="eager" fetchPriority="high"
            src="/assets/pages/contact/01-hero__desk-coffee-30-min-call.png"
            alt="Illustration: scattered questions, a laptop and coffee, a 30 minute calendar slot and clear checked next steps"
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        </div>
      </section>

      {/* REACH */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <CenterHead eyebrow="Three ways" title={<>Pick whatever<em style={{ display: "block", marginTop: 6, fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.08em", lineHeight: 1.05 }}>feels easiest.</em></>} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 16 }} className="md:!grid-cols-3">
          <ReachCard
            alt="Calendar with a booked slot, video call bubble and coffee"
            imgSrc="/assets/pages/contact/02-ways-to-reach__book-a-call.png"
            title="Book a call"
            desc="Bring the problem. I'll bring the coffee. 30 minutes, free, and you'll leave with at least one thing to fix."
            ctaText="Book a meeting"
            ctaHref="https://calendly.com/zain-ameen/30min"
            highlight
          />
          <ReachCard
            alt="Envelope with a paper plane"
            imgSrc="/assets/pages/contact/02-ways-to-reach__email.png"
            title="Email"
            desc="For projects, questions, or if you hate scheduling tools. Fair."
            ctaText="Send an email"
            ctaHref="mailto:hello@zainameen.com"
          />
          <ReachCard
            alt="Connected profiles with a message bubble and briefcase"
            imgSrc="/assets/pages/contact/02-ways-to-reach__linkedin.png"
            title="LinkedIn"
            desc="For a quick hello, a question, or if you want to check I'm a real person first."
            ctaText="Message me"
            ctaHref="https://www.linkedin.com/in/zain-ameen/"
          />
        </div>
      </section>

      {/* BOOKING */}
      <section id="book" className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <CenterHead
          eyebrow="Booking"
          title={<>Prefer talking it through?<em style={{ display: "block", marginTop: 6, fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.08em", lineHeight: 1.05 }}>Grab a coffee slot.</em></>}
          sub="Pick a time that works for you. The calendar shows your time zone automatically."
        />
        <div style={{ maxWidth: 960, margin: "0 auto", borderRadius: 28, background: "#F4F0E8", border: "1px solid #E2D8CA", padding: "clamp(14px,1.6vw,20px)" }}>
          <div className="max-md:!justify-center max-md:!text-center" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px 24px", padding: "10px 12px 18px" }}>
            <div style={{ minWidth: 0 }}>
              <h3 style={{ margin: 0, fontFamily: "'General Sans', 'General Sans Fallback'", fontSize: 20, fontWeight: 600, letterSpacing: "-0.015em" }}>
                Bring the problem. I&apos;ll bring the coffee.
              </h3>
              <p className="max-md:!text-base" style={{ margin: "6px 0 0", maxWidth: 560, fontSize: 14.5, lineHeight: 1.5, color: "#5A5854" }}>
                A free 30 minute call about whatever&apos;s stuck in your growth. Bring your website, your numbers or just the problem. You&apos;ll leave knowing what I&apos;d fix first, whether we work together or not.
              </p>
            </div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 36, padding: "0 14px", borderRadius: 999, background: "#1C1C1C", color: "#F2EFEA", fontSize: 13.5, fontWeight: 600, whiteSpace: "nowrap" }}>
              <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: "#D3AE82" }} />
              30 minutes · Free
            </span>
          </div>
          <div style={{ borderRadius: 18, overflow: "hidden", background: "#FBFBF9", border: "1px solid #E2DFD8" }}>
            <CalendlyEmbed />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "10px 20px", padding: "16px 8px 6px", fontSize: 14, color: "#5A5854" }}>
            <span>Calendar not loading?</span>
            <a href="https://calendly.com/zain-ameen/30min" target="_blank" rel="noopener" className="max-md:relative max-md:after:absolute max-md:after:inset-x-0 max-md:after:-inset-y-3.5 max-md:after:content-['']" style={{ fontWeight: 600, color: "#1C1C1C", borderBottom: "1.5px solid #1C1C1C" }}>
              Open Calendly
            </a>
            <span aria-hidden="true" style={{ color: "#C9B9A2" }}>·</span>
            <a href="https://calendar.app.google/ca5LzpvMmXTPGXbR9" target="_blank" rel="noopener" className="max-md:relative max-md:after:absolute max-md:after:inset-x-0 max-md:after:-inset-y-3.5 max-md:after:content-['']" style={{ fontWeight: 600, color: "#1C1C1C", borderBottom: "1.5px solid #1C1C1C" }}>
              Book with Google Calendar
            </a>
          </div>
        </div>
      </section>

      {/* TOPICS */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <CenterHead
          eyebrow="On the call"
          marginBottom={32}
          title={<>Not sure if it&apos;s worth booking?<em style={{ display: "block", marginTop: 6, fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.08em", lineHeight: 1.05 }}>Here&apos;s what usually ends up on the call.</em></>}
        />
        <div style={{ maxWidth: 980, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10 }}>
          {TOPIC_PILLS.map((t) => (
            <span key={t} style={{ display: "inline-flex", alignItems: "center", height: 40, padding: "0 18px", borderRadius: 999, background: "#1C1C1C", color: "#F2EFEA", fontSize: 14.5, fontWeight: 500, whiteSpace: "nowrap" }}>
              {t}
            </span>
          ))}
        </div>
        <p className="max-md:!text-base" style={{ margin: "22px 0 0", textAlign: "center", fontSize: 14.5, color: "#6E6B66" }}>
          That last one is the most common. It&apos;s also the most fun.
        </p>
        <div style={{ width: "100%", maxWidth: 900, margin: "clamp(8px,2vw,24px) auto 0" }}>
          <Img
            loading="lazy"
            src="/assets/pages/contact/04-topics__video-call-topics.png"
            alt="Illustration: a video call surrounded by growth, SEO, Reddit, social, design, ads and strategy topics"
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        </div>
      </section>

      {/* MESSY (dark) */}
      <section className="max-md:!mt-[72px]" style={{ marginTop: "clamp(88px,8vw,112px)", background: "#171717", color: "#F2EFEA" }}>
        <div style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(64px,6vw,88px) ${PAD}` }}>
          <CenterHead
            dark
            eyebrow="No prep needed"
            marginBottom={48}
            title={<>You don&apos;t need a perfect brief.<em style={{ display: "block", marginTop: 6, fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.08em", lineHeight: 1.05, color: "#D3AE82" }}>Messy is fine.</em></>}
            sub="Send the half finished idea, the dashboard you don't understand, the campaign that stopped working, or the problem you can't quite explain yet. Figuring it out is literally the job."
          />
          <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gridTemplateColumns: "1fr", gap: 16, borderTop: "1px solid #33322F" }} className="md:!grid-cols-3">
            {MESSY_STEPS.map((s) => (
              <li key={s.n} style={{ minWidth: 0, padding: "24px 8px 0 0" }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#D3AE82" }}>{s.n}</span>
                <h3 style={{ margin: "10px 0 0", fontFamily: "'General Sans', 'General Sans Fallback'", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>{s.t}</h3>
                <p style={{ margin: "8px 0 0", fontSize: 16, lineHeight: 1.55, color: "#B7B2A8" }}>{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* FORM */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <CenterHead eyebrow="Contact form" title={<>Rather type it out?<em style={{ display: "block", marginTop: 6, fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.08em", lineHeight: 1.05 }}>That works too.</em></>} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px clamp(24px,3vw,40px)", alignItems: "start" }} className="md:!grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div style={{ minWidth: 0, borderRadius: 28, background: "#FBFBF9", border: "1px solid #E2DFD8", padding: "clamp(24px,3vw,40px)" }}>
            <ContactForm />
          </div>
          <figure style={{ margin: 0, minWidth: 0, borderRadius: 28, background: "#1C1C1C", color: "#F2EFEA", padding: "clamp(28px,3vw,40px)", display: "flex", flexDirection: "column", gap: 24 }}>
            <span style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#D3AE82" }}>Upwork ★ 5.0</span>
            <blockquote style={{ margin: 0, fontFamily: "'General Sans', 'General Sans Fallback'", fontSize: "clamp(19px,1.6vw,22px)", fontWeight: 500, lineHeight: 1.45, letterSpacing: "-0.01em" }}>
              &ldquo;He came in, got up to speed quick, and delivered what we needed without me having to micromanage. His communication is clean, turnaround time is solid, and he takes feedback well. Critically, he suggested how to approach things I didn&apos;t know that we needed to approach and the results were phenomenal.&rdquo;
            </blockquote>
            <figcaption className="max-md:!justify-center" style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 18, borderTop: "1px solid #33322F" }}>
              <span style={{ width: 44, height: 44, borderRadius: "50%", background: "#33322F", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>C</span>
              <span>
                <span style={{ display: "block", fontSize: 15, fontWeight: 600 }}>Cam</span>
                <span style={{ display: "block", fontSize: 13.5, color: "#B7B2A8" }}>Everdry Waterproofing</span>
              </span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* NEXT */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <CenterHead eyebrow="Next steps" title={<>What happens<em style={{ display: "block", marginTop: 6, fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.08em", lineHeight: 1.05 }}>after you reach out?</em></>} />
        <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gridTemplateColumns: "1fr", gap: "32px 48px" }} className="md:!grid-cols-3">
          {NEXT_STEPS.map((s, i) => (
            <li key={s.n} style={{ position: "relative", minWidth: 0, paddingTop: 28 }}>
              {i < NEXT_STEPS.length - 1 && (
                <span aria-hidden="true" className="hidden md:!block" style={{ position: "absolute", left: 0, right: -24, top: 9, height: 1, background: "#DDD0BE" }} />
              )}
              <span aria-hidden="true" style={{ position: "absolute", left: 0, top: 4, width: 11, height: 11, borderRadius: "50%", background: "#C4A47C" }} />
              <span style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#7D6039" }}>{s.n}</span>
              <h3 style={{ margin: "10px 0 0", fontFamily: "'General Sans', 'General Sans Fallback'", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em" }}>{s.t}</h3>
              <p style={{ margin: "8px 0 0", maxWidth: 340, fontSize: 16, lineHeight: 1.55, color: "#5A5854" }}>{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* SOCIAL */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <CenterHead eyebrow="Elsewhere" marginBottom={24} title="I'm around." />
        <div style={{ width: "100%", maxWidth: 1100, margin: "0 auto 8px" }}>
          <Img
            loading="lazy"
            src="/assets/pages/contact/08-social-links__social-banner.png"
            alt="Illustration: working from a desk with coffee while LinkedIn, email, Calendly, Instagram, Threads, X and Pinterest connect around the world"
            style={{ display: "block", width: "100%", height: "auto" }}
          />
        </div>
        <nav aria-label="Social links" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "4px 8px", maxWidth: 760, margin: "0 auto" }}>
          {SOCIAL_LINKS.map((s) => {
            const external = s.href.startsWith("http");
            return (
              <a
                key={s.label}
                href={s.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener" : undefined}
                aria-label={s.label}
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, width: 84, padding: "14px 0", borderRadius: 14, color: "#5A5854", fontSize: 12.5, fontWeight: 500 }}
              >
                <span style={{ width: 48, height: 48, borderRadius: "50%", border: "1px solid #DDD6CA", background: "#FBFBF9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {s.kind === "linkedin" && <LinkedInIcon size={20} color="#1C1C1C" />}
                  {s.kind === "mail" && <MailIcon size={22} color="#1C1C1C" />}
                  {s.kind === "icon" && (
                    <Img src={`/icons/${s.icon}-1C1C1C.svg`} alt="" width={20} height={20} style={{ display: "block" }} />
                  )}
                </span>
                {s.label}
              </a>
            );
          })}
        </nav>
      </section>

      {/* FAQ */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} 0` }}>
        <CenterHead eyebrow="FAQ" title={<>Before you ask,<em style={{ display: "block", marginTop: 6, fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, fontSize: "1.08em", lineHeight: 1.05 }}>you&apos;re probably wondering...</em></>} />
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <FAQAccordion faqs={FAQS} />
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} clamp(64px,7vw,96px)` }}>
        <div style={{ borderRadius: 28, background: "#1C1C1C", color: "#F2EFEA", padding: "clamp(48px,6vw,88px) clamp(24px,5vw,72px)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <h2 style={{ margin: 0, fontFamily: "'General Sans', 'General Sans Fallback'", fontWeight: 600, fontSize: "clamp(34px,3.6vw,52px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
            Still thinking about it?
          </h2>
          <p style={{ margin: "12px 0 0", fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "clamp(30px,3vw,42px)", lineHeight: 1.1, color: "#D3AE82" }}>
            <Emphasis>Just send the message.</Emphasis>
          </p>
          <p style={{ margin: "24px 0 0", maxWidth: 560, fontSize: 17, lineHeight: 1.6, color: "#B7B2A8" }}>
            Worst case, I tell you I&apos;m not the right person and point you to someone who is. Best case, we find the thing that&apos;s been slowing you down.
          </p>
          <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }} className="max-md:!w-full max-md:!max-w-[400px] max-md:!flex-col">
            <a href="https://calendly.com/zain-ameen/30min" target="_blank" rel="noopener" className="max-md:!justify-center" style={{ display: "inline-flex", alignItems: "center", gap: 12, height: 56, padding: "0 26px", borderRadius: 12, background: "#F2EFEA", color: "#1C1C1C", fontSize: 16, fontWeight: 600 }}>
              Book a free call
              <ArrowIcon />
            </a>
            <a href="mailto:hello@zainameen.com" className="max-md:!justify-center" style={{ display: "inline-flex", alignItems: "center", height: 56, padding: "0 22px", borderRadius: 12, border: "1px solid #3A3935", color: "#F2EFEA", fontSize: 16, fontWeight: 600 }}>
              Send an email
            </a>
          </div>
          <a href="https://www.linkedin.com/in/zain-ameen/" target="_blank" rel="noopener" className="max-md:relative max-md:after:absolute max-md:after:inset-x-0 max-md:after:-inset-y-3.5 max-md:after:content-['']" style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14.5, color: "#D3AE82", borderBottom: "1px solid #6B5A40", paddingBottom: 2 }}>
            Or message me on LinkedIn
          </a>
        </div>
      </section>
    </main>
  );
}
