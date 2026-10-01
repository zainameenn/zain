import { buildMetadata } from "@/lib/seo";
import { H1_STYLE, SUBHEAD_SIZE } from "@/app/HomeComponents/heading";
import Link from "next/link";
import { ArrowIcon, Emphasis } from "../HomeComponents/icons";
import { ServiceCards } from "./ServiceCards";

export const metadata = buildMetadata({
  title: "Growth Marketing Services for SaaS | Clear Prices | Zain",
  description:
    "Growth marketing services for SaaS and service businesses: SEO, Reddit, social, content, ads and strategy. Clear monthly prices, no long contracts.",
  path: "/services",
});

const MAX = 1360;
const PAD = "clamp(20px,4vw,48px)";

export default function ServicesPage() {
  return (
    <main id="top" style={{ overflowX: "clip" }}>
      {/* HERO */}
      <section className="max-md:!text-center" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(40px,5vw,64px) ${PAD} 0` }}>
        <h1 className="max-md:!mx-auto" style={{ ...H1_STYLE, maxWidth: 680 }}>
          Growth marketing services for SaaS and service businesses
        </h1>
        <p className="max-md:!mx-auto" style={{ margin: "20px 0 0", maxWidth: 760, fontFamily: "'General Sans'", fontWeight: 500, fontSize: SUBHEAD_SIZE, lineHeight: 1.05, letterSpacing: "-0.035em" }}>
          Pick one channel.
          <span style={{ display: "block", marginTop: ".12em" }}>
            <Emphasis>Or let me pick for you.</Emphasis>
          </span>
        </p>
        <p className="max-md:!mx-auto" style={{ margin: "28px 0 0", maxWidth: 560, fontSize: 18, lineHeight: 1.55, color: "#4E4C48" }}>
          Growth marketing services for SaaS work better when one person runs them together, so pick one channel or hand me all of it. Five services, all handled by me. If you already know what you need, jump straight in. If you don&apos;t, that&apos;s kind of my thing.
        </p>
      </section>

      {/* SERVICES */}
      <section className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(56px,6vw,80px) ${PAD} 0` }}>
        <ServiceCards />
      </section>

      {/* WHERE TO START */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(80px,9vw,128px) ${PAD} 0` }}>
        <div style={{ display: "grid", gap: "20px 64px", alignItems: "start" }} className="md:!grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] max-md:!text-center">
          <h2 className="max-md:!text-balance" style={{ margin: 0, fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(34px,3.8vw,52px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>Not sure where to start?</h2>
          <div className="max-md:!mx-auto" style={{ maxWidth: 460 }}>
            <p style={{ margin: 0, fontSize: 17, lineHeight: 1.6, color: "#4E4C48" }}>
              Most clients start with the $499 audit or the free social check. You&apos;ll know what&apos;s wrong and what to fix first, whether we keep working together or not.
            </p>
            <div style={{ marginTop: 28 }}>
              <Link href="/pricing" className="max-md:!flex max-md:!w-full max-md:!max-w-[400px] max-md:!justify-center max-md:!mx-auto" style={{ display: "inline-flex", alignItems: "center", gap: 12, height: 56, padding: "0 26px", borderRadius: 12, background: "#1C1C1C", color: "#F8F6F4", fontSize: 16, fontWeight: 600 }}>
                See pricing
                <ArrowIcon />
              </Link>
            </div>
            <p className="max-md:!text-base" style={{ margin: "20px 0 0", fontSize: 14.5, lineHeight: 1.55, color: "#77746E" }}>
              Want it all? Everything, handled is $3,999/month for SEO, Reddit, social media, content and design.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="max-md:!pt-20" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(88px,8vw,112px) ${PAD} clamp(64px,7vw,96px)` }}>
        <div style={{ borderRadius: 28, background: "#1C1C1C", color: "#F2EFEA", padding: "clamp(48px,6vw,88px) clamp(24px,5vw,72px)", display: "grid", gap: "48px clamp(40px,5vw,80px)", alignItems: "center" }} className="md:!grid-cols-2">
          <div className="max-md:!text-center">
            <h2 className="max-md:!text-balance" style={{ margin: 0, fontFamily: "'General Sans'", fontWeight: 600, fontSize: "clamp(32px,3.4vw,48px)", lineHeight: 1.06, letterSpacing: "-0.035em" }}>
              <span style={{ display: "block", fontSize: "1.12em", color: "#D3AE82", marginBottom: ".08em" }}>
                <em style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "inherit" }}>Take a breath.</em>
              </span>
              Then tell me what&apos;s stuck.
            </h2>
            <p className="max-md:!mx-auto" style={{ margin: "22px 0 0", maxWidth: 480, fontSize: 17, lineHeight: 1.6, color: "#B7B2A8" }}>
              What you&apos;re growing, what&apos;s happening and what you&apos;ve tried. I&apos;ll tell you where I&apos;d start. If I&apos;m not the right fit, I&apos;ll say so.
            </p>
          </div>
          <div className="max-md:!mx-auto max-md:!w-full max-md:!max-w-[400px]" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Link href="/contact" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, height: 64, padding: "0 24px", borderRadius: 12, background: "#F2EFEA", color: "#1C1C1C", fontSize: 17, fontWeight: 600 }}>
              Tell me what&apos;s stuck
              <ArrowIcon size={16} />
            </Link>
            <a href="mailto:hello@zainameen.com" style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 52, borderRadius: 12, border: "1px solid #3A3935", fontSize: 15, fontWeight: 500, color: "#F2EFEA" }}>
              Email me
            </a>
            <span className="max-md:!text-center" style={{ paddingTop: 8, fontSize: 13.5, color: "#8B877F" }}>I usually reply within a couple of hours.</span>
          </div>
        </div>
      </section>
    </main>
  );
}
