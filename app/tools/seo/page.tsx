import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, breadcrumbList } from "@/app/blog/_components/JsonLd";
import { SITE_URL } from "@/lib/markdown";
import { buildMetadata } from "@/lib/seo";
import { HUB_CARDS, hubImage } from "@/lib/tools/hub";
import { TOOLS, toolPath } from "@/lib/tools/registry";
import { FAQAccordion } from "@/app/HomeComponents/FAQAccordion";
import { EditorialPage, ed as e } from "@/app/_design/ui";
import { ArrowIcon } from "@/app/HomeComponents/icons";
import t from "../_studio/edtool.module.css";

type DirectoryTool = { slug: string; href: string; name: string; image: string; description: string; cta: string };

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
    slugs: ["keyword-research-tool", "keyword-search-volume-checker", "keyword-difficulty-checker", "keyword-trends-tool", "long-tail-keyword-generator", "seo-question-generator", "seo-keyword-cluster-generator", "seo-search-intent-classifier", "keyword-to-page-mapper", "local-seo-keyword-modifier-generator"],
  },
  {
    id: "website",
    heading: "Check your website",
    intro: "Review page titles, metadata, indexing directives, links, sitemaps and real user performance. See the issue and the evidence, not just a generic grade.",
    slugs: ["website-seo-checker", "website-audit-tool", "website-metadata-extractor", "broken-link-checker", "core-web-vitals-checker", "canonical-url-checker", "redirect-chain-checker", "sitemap-url-status-checker", "xml-sitemap-validator", "robots-txt-tester", "json-ld-schema-validator"],
  },
  {
    id: "search",
    heading: "Understand Google search results",
    intro: "See the pages that rank, the questions and features Google shows, and where a domain appears, for the market you choose. Every result is a dated snapshot.",
    slugs: ["serp-checker", "keyword-rank-checker", "bulk-keyword-rank-checker", "people-also-ask-tool", "serp-features-checker", "local-serp-checker", "ai-overview-checker"],
  },
  {
    id: "competitors",
    heading: "Research competitors",
    intro: "Explore organic keywords, traffic estimates, search competitors and keyword gaps. Each number shows its source and limits before you rely on it.",
    slugs: ["organic-keywords-finder", "website-traffic-checker", "seo-competitor-finder", "competitor-keyword-gap", "domain-comparison-tool"],
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
  const groups = TASKS.map((g) => ({ ...g, tools: g.slugs.filter((x) => TOOLS[x] && HUB_CARDS[x]).map(card) })).filter((g) => g.tools.length);
  const all = groups.flatMap((g) => g.tools);
  return (
    <EditorialPage>
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
              mainEntity: { "@type": "ItemList", itemListElement: all.map((x, i) => ({ "@type": "ListItem", position: i + 1, name: x.name, url: `${SITE_URL}${x.href}` })) },
            },
          ],
        }}
      />
      <section className={t.hero}>
        <div className={e.container}>
          <nav aria-label="Breadcrumb">
            <ol className={t.crumbs}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/tools">Free Tools</Link></li>
              <li aria-current="page">SEO Tools</li>
            </ol>
          </nav>
          <p className={e.eyebrow}>Free SEO tools</p>
          <h1 className={`${e.h1} ${t.h1}`}>
            Free SEO tools <span className={t.accent}>for the work you actually need to do.</span>
          </h1>
          <p className={e.lede} style={{ marginTop: 20 }}>
            Free SEO tools to find keyword ideas, check your pages, fix links and sitemaps, and make better decisions with data you can examine. No complicated dashboard required to get started.
          </p>
          <p className={t.trust}>Some tools run in your browser. Others fetch a public page or use a free data source with a monthly allowance. Each tool says what it checks, where its data comes from and its current limits.</p>
          <nav aria-label="SEO tool tasks" className={t.chips}>
            {groups.map((g) => (
              <a key={g.id} href={`#${g.id}`} className={t.chip}>{g.heading}</a>
            ))}
          </nav>
        </div>
      </section>

      {groups.map((g, gi) => {
        const inner = (
          <section id={g.id} aria-labelledby={`${g.id}-h`} className={t.sec}>
            <div className={`${e.container} ${t.center}`}>
              <h2 id={`${g.id}-h`} className={e.h2}>{g.heading}</h2>
              <p className={e.body} style={{ marginTop: 14 }}>{g.intro}</p>
              <ul className={t.cards}>
                {g.tools.map((x) => (
                  <li key={x.slug} className={t.card}>
                    {x.image ? (
                      <div className={t.thumb}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={x.image} alt="" width={1200} height={900} loading="lazy" decoding="async" />
                      </div>
                    ) : (
                      <div className={`${t.thumb} ${t.thumbEmpty}`} aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>
                      </div>
                    )}
                    <div className={t.cardBody}>
                      <h3>{x.name}</h3>
                      <p>{x.description}</p>
                      <Link href={x.href} className={t.cardLink}>{x.cta} <span aria-hidden="true">→</span></Link>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
        return gi % 2 ? <div key={g.id} className={t.band}>{inner}</div> : <div key={g.id}>{inner}</div>;
      })}

      <section className={t.sec}>
        <div className={`${e.container} ${t.center}`}>
          <p className={e.eyebrow}>Where to start</p>
          <h2 className={e.h2}>Start with these <em className={e.emGreen}>practical SEO checks.</em></h2>
          <ol className={t.ordered}>
            <li><span><strong>Check one important page.</strong> Review its title, structure, canonical and indexing directives with the <Link href="/tools/website-seo-checker" className={e.link}>Website SEO Checker</Link>.</span></li>
            <li><span><strong>Research one real customer problem.</strong> Find related searches and questions, then look at the results to see what readers expect.</span></li>
            <li><span><strong>Check the evidence you own.</strong> Use Search Console to see which pages and queries already earn impressions and clicks.</span></li>
            <li><span><strong>Pick one improvement.</strong> Write a better explanation, fix a broken link or make a page easier to navigate. Then measure what changes.</span></li>
          </ol>
        </div>
      </section>

      <section className={t.sec}>
        <div className={`${e.container} ${t.center}`}>
          <h2 className={e.h2}>What makes an SEO tool <em className={e.emGreen}>useful?</em></h2>
          <p className={e.body} style={{ marginTop: 16 }}>
            A good tool tells you what it checked, where the result came from and what the result means. A keyword suggestion isn&apos;t a search volume estimate. An authority score isn&apos;t Google&apos;s own rating of your website. A page that can be crawled isn&apos;t necessarily indexed. That&apos;s why these tools label the source and check time, and show missing data as missing instead of guessing.
          </p>
        </div>
      </section>

      <section className={t.sec}>
        <div className={`${e.container} ${e.faq}`}>
          <div>
            <p className={e.eyebrow}>FAQ</p>
            <h2 className={e.h2}>Questions, <em className={e.emGreen}>answered.</em></h2>
          </div>
          <FAQAccordion faqs={FAQS} />
        </div>
      </section>

      <section className={`${t.sec} ${t.last}`}>
        <div className={e.container}>
          <div className={e.cta}>
            <div>
              <h2 className={e.h2}>Need help deciding what to fix first?</h2>
              <p className={e.body} style={{ marginTop: 16 }}>Tell me what your website does and where you&apos;re getting stuck. I can help you make sense of the findings and prioritise useful next steps.</p>
            </div>
            <div className={e.ctaActions}>
              <Link href="/contact" className={`${e.btn} ${e.btnLight}`}>Get help with SEO <ArrowIcon /></Link>
              <Link href="/services/seo-specialist-for-saas" className={`${e.btn} ${e.btnGhostLight}`}>See SEO services</Link>
            </div>
          </div>
        </div>
      </section>
    </EditorialPage>
  );
}
