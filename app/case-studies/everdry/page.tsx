import { cloneElement } from "react";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { H1_STYLE } from "@/app/HomeComponents/heading";
import { CASES } from "../../HomeComponents/Work";
import { ArrowIcon } from "../../HomeComponents/icons";
import CTA from "../../HomeComponents/CTA";

export const metadata = buildMetadata({
  title: "Everdry Case Study: Social Media and Local SEO | Zain",
  description:
    "This Everdry case study shows how a US waterproofing company turned quiet social pages into steady visibility.",
  path: "/case-studies/everdry",
});

export default function EverdryCaseStudyPage() {
  return (
    <main id="top" style={{ overflowX: "clip" }}>
      <section style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(64px,8vw,112px) clamp(20px,4vw,48px) 0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <h1 style={{ ...H1_STYLE, maxWidth: 900 }}>Everdry case study: social media and local SEO for home services</h1>
        <p style={{ margin: "24px auto 0", maxWidth: 640, fontSize: 18, lineHeight: 1.6, color: "#4E4C48" }}>
          This Everdry case study shows how a US waterproofing company turned quiet social pages into steady visibility.
        </p>
      </section>
      <section style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(56px,6vw,80px) clamp(20px,4vw,48px) 0" }}>
        {cloneElement(CASES.everdry, { headingLevel: 2 })}
        <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
          <Link href="/case-studies" style={{ display: "inline-flex", alignItems: "center", gap: 10, minHeight: 44, fontSize: 15, fontWeight: 600, color: "#1C1C1C", borderBottom: "1.5px solid #1C1C1C" }}>
            All growth marketing case studies
            <ArrowIcon />
          </Link>
        </div>
      </section>
      <CTA />
    </main>
  );
}
