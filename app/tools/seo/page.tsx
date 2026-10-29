import type { Metadata } from "next";
import Link from "next/link";
import { H1_ACCENT_STYLE, HERO_H1_STYLE } from "@/app/HomeComponents/heading";
import { JsonLd, breadcrumbList } from "@/app/blog/_components/JsonLd";
import { SITE_URL } from "@/lib/markdown";
import { buildMetadata } from "@/lib/seo";
import { HUB_CARDS, hubImage } from "@/lib/tools/hub";
import { TOOLS, toolPath } from "@/lib/tools/registry";
import { FAQAccordion } from "@/app/HomeComponents/FAQAccordion";
import { Crumbs } from "../_components/content";
import { ToolCard, type DirectoryTool } from "../_hub/Directory";
import h from "../_hub/hub.module.css";
import { lora } from "../_studio/fonts";
import s from "../_studio/studio.module.css";

// The SEO tools directory. Lists only tools whose pages are live (TOOLS), grouped by the job they do,
// so an unfinished or unavailable tool never appears here.

const TITLE = "Free SEO Tools for Keywords, Rankings & Site Checks | Zainameen";
const DESCRIPTION = "Free SEO tools for keyword ideas, website checks, links, sitemaps and search previews. Find a tool for the task you need to finish, with real data only.";

export const metadata: Metadata = buildMetadata({ title: TITLE, description: DESCRIPTION, path: "/tools/seo" });

const TASKS: { id: string; heading: string; intro: string; slugs: string[] }[] = [
  {
    id: "keywords",
    heading: "Find the right keywords",
    intro: "Start with a topic. Explore longer phrases and questions, then use clustering and keyword to page mapping to turn useful ideas into a plan.",
    slugs: ["long-tail-keyword-generator", "seo-question-generator", "seo-keyword-cluster-generator", "seo-search-intent-classifier", "keyword-to-page-mapper", "local-seo-keyword-modifier-generator"],
  },
  {
    id: "website",
    heading: "Check your website",
    intro: "Review page titles, metadata, indexing directives, links, sitemaps and real user performance. See the issue and the evidence, not just a generic grade.",
    slugs: ["website-seo-checker", "website-metadata-extractor", "broken-link-checker", "core-web-vitals-checker", "canonical-url-checker", "redirect-chain-checker", "sitemap-url-status-checker", "xml-sitemap-validator", "robots-txt-tester", "json-ld-schema-validator"],
  },
  {
    id: "write",
    heading: "Write and plan pages",
    intro: "Draft titles and descriptions, plan content around real questions, and fill the gaps between what you have and what searchers need.",
    slugs: ["seo-title-generator", "meta-description-generator", "seo-content-brief-generator", "seo-content-gap-planner", "internal-link-opportunity-finder", "local-service-page-outline-generator"],
  },
  {
    id: "technical",
    heading: "Build technical files",
    intro: "Generate the files and tags search engines read: sitemaps, robots.txt, hreflang, structured data and social previews.",
    slugs: ["xml-sitemap-generator", "robots-txt-generator", "hreflang-tag-generator", "product-schema-generator", "local-business-schema-generator", "open-graph-tags-generator", "llms-txt-generator"],
  },
];

const FAQS: [string, string[]][] = [
  ["Can I do SEO without paying for software?", ["Yes. You can research search intent, improve your content, review titles and links, and use Search Console for your own website. Some competitor data and large scale monitoring need paid datasets, so check a tool's limits before relying on it for that."]],
  ["Which free SEO tool should I use first?", ["Start with the problem. If you need content ideas, start with keyword research. If a page isn't working, check the URL itself. If something looks broken, check its links, redirects and canonical."]],
  ["Do I need to use every SEO tool?", ["No. A few tools used for a clear purpose are more useful than running every possible report."]],
  ["Can an SEO checker guarantee a number one ranking?", ["No. A checker can point out observable issues or opportunities, but rankings depend on the usefulness and relevance of a page and many other factors."]],
  ["Why do keyword volumes and SEO scores differ between tools?", ["Each provider has different coverage, update schedules, sampling and formulas. Compare data with its source and date, and don't treat different proprietary scores as interchangeable. Our tools label the source of every number and show missing data as missing."]],
];

const card = (slug: string): DirectoryTool => ({ slug, href: toolPath(slug), name: TOOLS[slug].name, image: hubImage(slug), ...HUB_CARDS[slug] });

export default function SeoToolsPage() {
  const groups = TASKS.map((t) => ({ ...t, tools: t.slugs.filter((x) => TOOLS[x] && HUB_CARDS[x]).map(card) })).filter((g) => g.tools.length);
  const all = groups.flatMap((g) => g.tools);
  return (
    <main className={`${s.page} ${lora.variable}`}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbList([
              { name: "Home", url: `${SITE_URL}/` },
              { name: "Free Tools", url: `${SITE_URL}/tools` },
              { name: "SEO Tools", url: `${SITE_URL}/tools/seo` },
            ]),
            {
              "@type": "CollectionPage",
              name: TITLE,
              description: DESCRIPTION,
              url: `${SITE_URL}/tools/seo`,
              mainEntity: { "@type": "ItemList", itemListElement: all.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, url: `${SITE_URL}${t.href}` })) },
            },
          ],
        }}
      />
      <div className={s.wrap}>
        <Crumbs items={[{ name: "Home", href: "/" }, { name: "Free Tools", href: "/tools" }, { name: "SEO Tools" }]} />
        <header className={s.hero}>
          <h1 style={HERO_H1_STYLE}>
            Free SEO tools <em style={H1_ACCENT_STYLE}>for the work you actually need to do.</em>
          </h1>
          <p className={s.lede}>
            Free SEO tools to find keyword ideas, check your pages, fix links and sitemaps, and make better decisions with data you can examine. No complicated dashboard required to get started.
          </p>
          <p className={s.note}>Some tools run in your browser. Others fetch a public page or use a free data source with a monthly allowance. Each tool says what it checks, where its data comes from and its current limits.</p>
          <nav aria-label="SEO tool tasks" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 20 }}>
            {groups.map((g) => (
              <a key={g.id} href={`#${g.id}`} className={`${s.btn} ${s.btnGhost} ${s.btnSm}`}>
                {g.heading}
              </a>
            ))}
          </nav>
        </header>

        {groups.map((g) => (
          <section key={g.id} id={g.id} aria-labelledby={`${g.id}-h`} style={{ marginTop: "clamp(48px,6vw,80px)", scrollMarginTop: 90 }}>
            <h2 id={`${g.id}-h`} className={s.h2} style={{ margin: 0 }}>
              {g.heading}
            </h2>
            <p className={s.note} style={{ maxWidth: 680, fontSize: 16 }}>{g.intro}</p>
            <div className={h.grid} style={{ marginTop: 24 }}>
              {g.tools.map((t) => (
                <ToolCard key={t.slug} tool={t} />
              ))}
            </div>
          </section>
        ))}

        <section aria-labelledby="start-h" style={{ marginTop: "clamp(56px,7vw,96px)" }}>
          <h2 id="start-h" className={s.h2} style={{ margin: 0 }}>
            Start with these practical SEO checks
          </h2>
          <ol style={{ margin: "20px 0 0", paddingLeft: 20, display: "grid", gap: 12, maxWidth: 760, fontSize: 17, lineHeight: 1.6 }}>
            <li><strong>Check one important page.</strong> Review its title, structure, canonical and indexing directives with the <Link href="/tools/website-seo-checker">Website SEO Checker</Link>.</li>
            <li><strong>Research one real customer problem.</strong> Find related searches and questions, then look at the results to see what readers expect.</li>
            <li><strong>Check the evidence you own.</strong> Use Search Console to see which pages and queries already earn impressions and clicks.</li>
            <li><strong>Pick one improvement.</strong> Write a better explanation, fix a broken link or make a page easier to navigate. Then measure what changes.</li>
          </ol>
        </section>

        <section aria-labelledby="useful-h" style={{ marginTop: "clamp(56px,7vw,96px)", maxWidth: 760 }}>
          <h2 id="useful-h" className={s.h2} style={{ margin: 0 }}>
            What makes an SEO tool useful?
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.65 }}>
            A good tool tells you what it checked, where the result came from and what the result means. A keyword suggestion isn&apos;t a search volume estimate. An authority score isn&apos;t Google&apos;s own rating of your website. A page that can be crawled isn&apos;t necessarily indexed.
          </p>
          <p style={{ fontSize: 17, lineHeight: 1.65 }}>That&apos;s why these tools label the source and check time, and show missing data as missing instead of guessing.</p>
        </section>

        <section aria-labelledby="faq-h" style={{ marginTop: "clamp(56px,7vw,96px)", maxWidth: 860 }}>
          <h2 id="faq-h" className={s.h2} style={{ margin: "0 0 20px" }}>
            Questions, answered.
          </h2>
          <FAQAccordion faqs={FAQS} />
        </section>

        <section style={{ margin: "clamp(56px,7vw,96px) 0", maxWidth: 760 }}>
          <h2 className={s.h2} style={{ margin: 0 }}>
            Need help deciding what to fix first?
          </h2>
          <p style={{ fontSize: 17, lineHeight: 1.65 }}>Tell me what your website does and where you&apos;re getting stuck. I can help you make sense of the findings and prioritise useful next steps.</p>
          <Link href="/contact" className={`${s.btn} ${s.btnPrimary} ${s.btnLg}`}>
            Get help with SEO
          </Link>
        </section>
      </div>
    </main>
  );
}
