import { buildMetadata } from "@/lib/seo";
import { PERSON_ID, SITE } from "@/lib/structuredData";
import { H1_ACCENT_STYLE, HERO_H1_STYLE } from "@/app/HomeComponents/heading";
import { Emphasis } from "../HomeComponents/icons";
import CTA from "../HomeComponents/CTA";
import { CASE_STUDIES } from "./_data";
import { CaseStudyCard } from "./_components/CaseStudyCard";
import { ACCENT_LINE, EYEBROW, SECTION_H2 } from "./_components/styles";

export const metadata = buildMetadata({
  title: "Growth Marketing Case Studies | SaaS and Services | Zain",
  description:
    "Growth marketing case studies from SaaS, AI, home services and ecommerce. 0 to 85K+ users without ads, ~30M search impressions and what changed.",
  path: "/case-studies",
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Case studies", item: `${SITE}/case-studies` },
      ],
    },
    {
      "@type": "CollectionPage",
      name: "Growth marketing case studies",
      url: `${SITE}/case-studies`,
      author: { "@id": PERSON_ID },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: CASE_STUDIES.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: `${s.name} case study`, url: `${SITE}/case-studies/${s.slug}` })),
      },
    },
  ],
};

const MAX = 1360;
const PAD = "clamp(20px,4vw,48px)";

export default function CaseStudiesPage() {
  return (
    <main id="top" style={{ overflowX: "clip" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      {/* Hero */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(64px,8vw,112px) ${PAD} 0`, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <h1 style={{ ...HERO_H1_STYLE, maxWidth: 900 }}>
          Growth marketing case studies,{" "}
          <em style={H1_ACCENT_STYLE}>
            <Emphasis>receipts included.</Emphasis>
          </em>
        </h1>
        <p style={{ margin: "28px auto 0", maxWidth: 640, fontSize: 18, lineHeight: 1.6, color: "#4E4C48" }}>
          These growth marketing case studies show real work, real results and the real screenshots behind them. What was broken, what I changed and what happened next. No vanity metrics, no rounding up.
        </p>
      </section>

      {/* The four case studies */}
      <section aria-labelledby="all-case-studies" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(56px,6vw,80px) ${PAD} 0` }}>
        <div style={{ textAlign: "center", maxWidth: 820, margin: "0 auto" }}>
          <div style={EYEBROW}>The work</div>
          <h2 id="all-case-studies" style={SECTION_H2}>
            Four businesses.<span style={ACCENT_LINE}>Four very different problems.</span>
          </h2>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2" style={{ margin: "clamp(28px,3vw,40px) auto 0", maxWidth: 1040, padding: 0, listStyle: "none", gap: 16 }}>
          {CASE_STUDIES.map((s) => (
            <CaseStudyCard key={s.slug} study={s} linkLabel="Read the case study" />
          ))}
        </ul>
      </section>

      <CTA />
    </main>
  );
}
