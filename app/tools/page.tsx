import type { Metadata } from "next";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/markdown";
import { GROUPS, toolPath, toolsIn } from "@/lib/tools/registry";
import { H1_ACCENT_STYLE, HERO_H1_STYLE } from "@/app/HomeComponents/heading";
import { ArrowIcon } from "@/app/HomeComponents/icons";
import { JsonLd, breadcrumbList } from "@/app/blog/_components/JsonLd";
import { Crumbs } from "./_components/content";
import s from "./tools.module.css";

// The /tools hub: every free tool, grouped by Social, SEO, Ecommerce and LinkedIn.

const TITLE = "Free Marketing Tools: AI Bio and Caption Generators";
const DESCRIPTION = "Free marketing tools for social media: write bios and captions from your real details, preview them live, and copy the one you like.";

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: "/tools" });

/** The first sentence of a tool's hero description, used as its card summary. */
const summary = (text: string) => `${text.split(". ")[0].replace(/\.$/, "")}.`;

export default function ToolsHub() {
  const all = GROUPS.flatMap((g) => toolsIn(g.group));
  return (
    <main className={s.main}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbList([
              { name: "Home", url: `${SITE_URL}/` },
              { name: "Free Tools", url: `${SITE_URL}/tools` },
            ]),
            {
              "@type": "CollectionPage",
              name: TITLE,
              description: DESCRIPTION,
              url: `${SITE_URL}/tools`,
              mainEntity: {
                "@type": "ItemList",
                itemListElement: all.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, url: `${SITE_URL}${toolPath(t.slug)}` })),
              },
            },
          ],
        }}
      />
      <Crumbs items={[{ name: "Home", href: "/" }, { name: "Free Tools" }]} />

      <header className={s.hero}>
        <h1 style={HERO_H1_STYLE}>
          Free Marketing <em style={H1_ACCENT_STYLE}>Tools</em>
        </h1>
        <p className={s.lede}>
          These free marketing tools write bios and captions from the details you give them, then show them on a live preview before you post. Nothing gets invented, and nothing gets posted for you. More tools are on the way.
        </p>
      </header>

      {GROUPS.filter((g) => toolsIn(g.group).length).map((g) => (
        <section key={g.group} className={s.hubSection} aria-labelledby={`group-${g.group}`}>
          <h2 id={`group-${g.group}`} className={s.h2}>
            {g.heading}
          </h2>
          <ul className={s.hubGrid}>
            {toolsIn(g.group).map((t) => (
              <li key={t.slug}>
                <Link href={toolPath(t.slug)} className={s.hubCard}>
                  <span className={s.hubName}>
                    {t.name}
                    <ArrowIcon size={12} />
                  </span>
                  <span className={s.hubText}>{summary(t.heroDescription)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </main>
  );
}
