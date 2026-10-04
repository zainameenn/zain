import { cloneElement } from "react";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { H1_STYLE } from "@/app/HomeComponents/heading";
import { CASES } from "../HomeComponents/Work";
import { ArrowIcon } from "../HomeComponents/icons";
import CTA from "../HomeComponents/CTA";

export const metadata = buildMetadata({
  title: "Growth Marketing Case Studies | SaaS and Services | Zain",
  description:
    "Growth marketing case studies from SaaS, AI, home services and ecommerce. 0 to 85K+ users without ads, ~30M search impressions and what changed.",
  path: "/case-studies",
});

const LIST = [
  { slug: "blainy", label: "Blainy case study", card: cloneElement(CASES.blainy, { headingLevel: 2 }) },
  { slug: "everdry", label: "Everdry case study", card: cloneElement(CASES.everdry, { headingLevel: 2 }) },
  { slug: "virtarix", label: "Virtarix case study", card: cloneElement(CASES.virtarix, { headingLevel: 2 }) },
];

export default function CaseStudiesPage() {
  return (
    <main id="top" style={{ overflowX: "clip" }}>
      <section style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(64px,8vw,112px) clamp(20px,4vw,48px) 0", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <h1 style={{ ...H1_STYLE, maxWidth: 900 }}>Growth marketing case studies</h1>
        <p style={{ margin: "24px auto 0", maxWidth: 640, fontSize: 18, lineHeight: 1.6, color: "#4E4C48" }}>
          These growth marketing case studies show what was broken, what I changed, and what happened next.
        </p>
      </section>
      <section style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(56px,6vw,80px) clamp(20px,4vw,48px) 0" }}>
        {LIST.map((c) => (
          <div key={c.slug} style={{ marginBottom: 40 }}>
            {c.card}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Link href={`/case-studies/${c.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: 10, minHeight: 44, fontSize: 15, fontWeight: 600, color: "#1C1C1C", borderBottom: "1.5px solid #1C1C1C" }}>
                {c.label}
                <ArrowIcon />
              </Link>
            </div>
          </div>
        ))}
      </section>
      <CTA />
    </main>
  );
}
