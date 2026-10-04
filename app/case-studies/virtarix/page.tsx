import { cloneElement } from "react";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { H1_STYLE } from "@/app/HomeComponents/heading";
import { CASES } from "../../HomeComponents/Work";
import { ArrowIcon } from "../../HomeComponents/icons";
import CTA from "../../HomeComponents/CTA";

export const metadata = buildMetadata({
  title: "Virtarix Case Study: 70K+ Facebook Views in 3 Months | Zain",
  description:
    "This Virtarix case study shows how a new Facebook page hit 70K+ views in 3 months and Pinterest went from 0 to 1.2K+ monthly visits.",
  path: "/case-studies/virtarix",
});

export default function VirtarixCaseStudyPage() {
  return (
    <main id="top" style={{ overflowX: "clip" }}>
      <section style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(64px,8vw,112px) clamp(20px,4vw,48px) 0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <h1 style={{ ...H1_STYLE, maxWidth: 900 }}>Virtarix case study: 70K+ Facebook views in 3 months</h1>
        <p style={{ margin: "24px auto 0", maxWidth: 640, fontSize: 18, lineHeight: 1.6, color: "#4E4C48" }}>
          This Virtarix case study shows how a new Facebook page hit 70K+ views in 3 months and Pinterest went from 0 to 1.2K+ monthly visits.
        </p>
      </section>
      <section style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(56px,6vw,80px) clamp(20px,4vw,48px) 0" }}>
        {cloneElement(CASES.virtarix, { headingLevel: 2 })}
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
