import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { H1_ACCENT_STYLE, HERO_H1_STYLE } from "@/app/HomeComponents/heading";
import { Emphasis } from "../HomeComponents/icons";

// ─── DRAFT FOR REVIEW ─────────────────────────────────────────────────────────
// Zain: read this page, then set REVIEWED to true. Until then the page shows a
// draft note and asks search engines not to index it.
const REVIEWED = true;
const LAST_UPDATED = "October 25, 2026";
// ─────────────────────────────────────────────────────────────────────────────

export const metadata = buildMetadata({
  title: "Privacy Policy | Zain Ul Abdin",
  description: "Privacy policy for zainameen.com: what the site collects through analytics, the contact form and the booking calendar, why, and how to reach me about it.",
  path: "/privacy",
  noindex: !REVIEWED,
});

const MAX = 760;
const PAD = "clamp(20px,4vw,48px)";
const H2: React.CSSProperties = { margin: "44px 0 0", fontFamily: "var(--nf-general-sans)", fontSize: "clamp(22px,2.2vw,28px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2 };
const P: React.CSSProperties = { margin: "14px 0 0", fontSize: 16.5, lineHeight: 1.65, color: "#4E4C48" };
const LI: React.CSSProperties = { marginTop: 8, fontSize: 16.5, lineHeight: 1.6, color: "#4E4C48" };
const A = "font-semibold border-b-[1.5px] border-[#1C1C1C] hover:!text-[#7A5C33] hover:border-[#7A5C33]";

const SECTIONS: { h: string; body: React.ReactNode }[] = [
  {
    h: "The short version",
    body: (
      <>
        <p style={P}>
          I collect as little as I can. Analytics tell me which pages people read. The contact form and booking calendar exist so you can reach me. I don&apos;t sell your data, I don&apos;t run ads on this site, and there&apos;s no mailing list you&apos;ll be quietly added to.
        </p>
      </>
    ),
  },
  {
    h: "Analytics",
    body: (
      <>
        <p style={P}>Two tools help me understand how the site is used, so I can make it better:</p>
        <ul style={{ margin: "10px 0 0", paddingLeft: 20 }}>
          <li style={LI}>
            <strong style={{ color: "#1C1C1C" }}>Google Analytics</strong> counts visits and shows which pages are read, roughly where visitors come from and what device they use. It loads after the page has finished loading.
          </li>
          <li style={LI}>
            <strong style={{ color: "#1C1C1C" }}>Microsoft Clarity</strong> shows how people move through a page, such as scrolls, clicks and heatmaps, so I can spot what&apos;s confusing. It only starts after you first scroll, tap, click or press a key.
          </li>
        </ul>
        <p style={P}>Both set cookies or similar identifiers in your browser. You can block them with your browser&apos;s privacy settings or a content blocker, and the site will still work.</p>
      </>
    ),
  },
  {
    h: "The contact form",
    body: (
      <>
        <p style={P}>
          When you send the form on the <a href="/contact" className={A}>contact page</a>, it collects your name, email, what you need help with and your message, plus your company or website and monthly budget if you choose to add them. It also records the time you sent it and the page you sent it from.
        </p>
        <p style={P}>
          The form is delivered by <strong style={{ color: "#1C1C1C" }}>Web3Forms</strong>, which emails your message to me. I use it only to reply to you. Your email is set as the reply address, so my answer goes straight back to you.
        </p>
      </>
    ),
  },
  {
    h: "Booking a call",
    body: (
      <p style={P}>
        The booking calendar is run by <strong style={{ color: "#1C1C1C" }}>Calendly</strong>. It only loads when you click to open it. If you book, Calendly collects the details you enter, like your name, email and the time you pick, under its own privacy policy, and shares them with me so I can show up for the call.
      </p>
    ),
  },
  {
    h: "The free tools",
    body: (
      <>
        <p style={P}>
          When you use one of the <Link href="/tools" className={A}>free tools</Link>, what you type and any photo, PDF or text file you upload are sent to <strong style={{ color: "#1C1C1C" }}>Google&apos;s Gemini API</strong> to write your result. This site doesn&apos;t store your inputs, your uploads or your results, and doesn&apos;t log what they say. Photos are resized in your browser before they&apos;re sent, which also removes their location data. A few newer tools (the name generators, the Shorts script, negative keyword and search intent tools) send what you type to <strong style={{ color: "#1C1C1C" }}>OpenRouter</strong> instead, which passes it to an NVIDIA model. The calculators, the review link generator and the llms.txt generator run in your browser and send nothing.
        </p>
        <p style={P}>
          Google handles that content under its own terms. While the tools run on Gemini&apos;s free tier, Google may use what&apos;s sent to improve its products, so please don&apos;t enter anything private or sensitive. The UTM link builder runs entirely in your browser and sends nothing.
        </p>
      </>
    ),
  },
  {
    h: "Email and the waitlist",
    body: (
      <p style={P}>
        Email links and the insights waitlist simply open your own email app with a message to hello@zainameen.com. Nothing is stored on this site. If you email me, I keep the conversation in my inbox so I can reply and follow up.
      </p>
    ),
  },
  {
    h: "Hosting",
    body: (
      <p style={P}>
        The site is hosted by <strong style={{ color: "#1C1C1C" }}>Vercel</strong>, which keeps standard technical logs, such as IP address, browser and the pages requested, to run the site and keep it secure. Fonts are served from this site, not from a third party.
      </p>
    ),
  },
  {
    h: "Your choices",
    body: (
      <p style={P}>
        You can ask me what I hold about you, ask me to correct it, or ask me to delete it. Email <a href="mailto:hello@zainameen.com" className={A}>hello@zainameen.com</a> and I&apos;ll sort it out. I read every email myself.
      </p>
    ),
  },
  {
    h: "Changes",
    body: <p style={P}>If what the site collects changes, I&apos;ll update this page and the date below.</p>,
  },
];

export default function PrivacyPage() {
  return (
    <main id="top" style={{ overflowX: "clip" }}>
      <section style={{ maxWidth: MAX + 96, margin: "0 auto", padding: `clamp(64px,8vw,112px) ${PAD} clamp(56px,6vw,88px)` }}>
        {!REVIEWED && (
          <p role="note" style={{ margin: "0 0 32px", padding: "14px 18px", borderRadius: 12, border: "1.5px dashed #B9A584", background: "#F4F0E8", fontSize: 14.5, lineHeight: 1.5, color: "#7A5C33", fontWeight: 600 }}>
            Draft for review. This page isn&apos;t final yet.
          </p>
        )}
        <h1 style={{ ...HERO_H1_STYLE, textAlign: "left" }}>
          Privacy policy,{" "}
          <em style={H1_ACCENT_STYLE}>
            <Emphasis>in plain English.</Emphasis>
          </em>
        </h1>
        <p style={{ ...P, margin: "24px 0 0", fontSize: 18, color: "#1C1C1C" }}>
          This privacy policy explains what zainameen.com collects, why, and what you can do about it. No legalese marathon.
        </p>
        {SECTIONS.map((s) => (
          <div key={s.h}>
            <h2 style={H2}>{s.h}</h2>
            {s.body}
          </div>
        ))}
        <p style={{ margin: "44px 0 0", fontSize: 14, color: "#6F6B64" }}>Last updated: {LAST_UPDATED}</p>
      </section>
    </main>
  );
}
