import { buildMetadata } from "@/lib/seo";
import { H1_STYLE } from "@/app/HomeComponents/heading";
import Pricing from "../HomeComponents/Pricing";
import CTA from "../HomeComponents/CTA";

export const metadata = buildMetadata({
  title: "Growth Marketing Pricing | SEO, Reddit, Social, Ads | Zain",
  description:
    "SEO $1,999/mo, Reddit and social $1,199/mo, ads $1,499/mo, everything $3,999/mo. Free social check and $499 audit. No long contracts.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <main id="top" style={{ overflowX: "clip" }}>
      <section style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(64px,8vw,112px) clamp(20px,4vw,48px) 0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <h1 style={{ ...H1_STYLE, maxWidth: 900 }}>Growth marketing pricing in plain numbers</h1>
        <p style={{ margin: "24px auto 0", maxWidth: 640, fontSize: 18, lineHeight: 1.6, color: "#4E4C48" }}>
          Growth marketing pricing here is monthly and public, so you know the cost before we ever talk.
        </p>
      </section>
      <Pricing />
      <CTA />
    </main>
  );
}
