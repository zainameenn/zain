import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd, breadcrumbList } from "@/app/blog/_components/JsonLd";
import { FAQAccordion } from "@/app/HomeComponents/FAQAccordion";
import { EditorialPage, ed as e } from "@/app/_design/ui";
import { SITE_URL } from "@/lib/markdown";
import { buildMetadata } from "@/lib/seo";
import { HUB_CARDS } from "@/lib/tools/hub";
import { TOOLS, toolPath } from "@/lib/tools/registry";
import { KIT, type KitCopy, type KitSlug } from "@/lib/tools/kit/content";
import { FlowSteps } from "../_components/Explainer";
import t from "../_studio/edtool.module.css";
import k from "./kit.module.css";
import { ServiceCard } from "./ServiceCard";

// The shared page for the November 2026 tools batch. Section order: breadcrumbs, hero, the working tool,
// how to use it, examples, the guide, one service card, FAQ, related tools. Headings are centred; long
// text, forms, results and FAQ answers stay left aligned. The tool itself is passed in as children.

export const kitMetadata = (slug: KitSlug): Metadata => buildMetadata({ title: KIT[slug].title, description: KIT[slug].description, path: toolPath(slug) });

const Head = ({ kicker, title, intro, id }: { kicker: string; title: ReactNode; intro?: string; id?: string }) => (
  <div className={t.center}>
    <p className={e.eyebrow}>{kicker}</p>
    <h2 className={e.h2} id={id} style={{ maxWidth: 820 }}>{title}</h2>
    {intro ? <p className={e.body} style={{ marginTop: 14, maxWidth: 680 }}>{intro}</p> : null}
  </div>
);

export function KitPage({ c, children, service }: { c: KitCopy; children: ReactNode; service?: ReactNode }) {
  const url = `${SITE_URL}${toolPath(c.slug)}`;
  const related = c.related.filter((s) => TOOLS[s]);
  return (
    <EditorialPage>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbList([
              { name: "Home", url: `${SITE_URL}/` },
              { name: "Free Tools", url: `${SITE_URL}/tools` },
              { name: c.category.label, url: `${SITE_URL}/tools?cat=${c.category.id}` },
              { name: c.name, url },
            ]),
            { "@type": "WebApplication", name: c.name, url, description: c.description, applicationCategory: "BusinessApplication", operatingSystem: "Any", isAccessibleForFree: true, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }, creator: { "@type": "Person", name: "Zain Ul Abdin", url: SITE_URL } },
            { "@type": "FAQPage", mainEntity: c.faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
          ],
        }}
      />

      <section className={k.hero} id="top">
        <div className={e.container}>
          <nav aria-label="Breadcrumb">
            <ol className={t.crumbs}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/tools">Free Tools</Link></li>
              <li><Link href={`/tools?cat=${c.category.id}#all-tools`}>{c.category.label}</Link></li>
              <li aria-current="page">{c.name}</li>
            </ol>
          </nav>
          <div className={k.heroText}>
            <p className={e.eyebrow}>{c.category.label}</p>
            <h1 className={`${e.h1} ${t.h1}`}>
              {c.name} <span className={t.accent}>(100% FREE)</span>
            </h1>
            <p className={k.sub}>{c.sub}</p>
            <p className={e.lede}>{c.lede}</p>
            <p className={k.usage}>{c.usage}</p>
          </div>
          <div className={k.tool}>{children}</div>
        </div>
      </section>

      <div className={t.band}>
        <section className={t.sec} id="how-to-use">
          <div className={e.container}>
            <Head kicker="How to use it" title={<>How to use the {c.name} <em className={e.emGreen}>step by step</em></>} />
            <div className={k.flow}>
              <FlowSteps steps={c.steps.map(([title, text]) => ({ title, text }))} />
            </div>
          </div>
        </section>
      </div>

      <section className={t.sec} id="examples">
        <div className={e.container}>
          <Head kicker="Examples" title={<>Worked <em className={e.emGreen}>examples</em></>} intro="Hypothetical examples, written to show what the tool does with typical input." />
          <ul className={k.examples}>
            {c.examples.map((x) => (
              <li key={x.title}>
                <h3>{x.title}</h3>
                <p><span className={k.tag}>Input</span>{x.input}</p>
                <p><span className={k.tag}>Result</span>{x.result}</p>
                <p className={k.exNote}>{x.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <div className={t.band}>
        <section className={t.sec} id="guide">
          <div className={e.container}>
            <Head kicker="The guide" title={<>What you need to <em className={e.emGreen}>know</em></>} />
            <div className={k.guide}>
              {c.guide.map((g) => (
                <section key={g.h}>
                  <h2 className={k.guideH}>{g.h}</h2>
                  {g.p.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </section>
              ))}
              {c.sources?.length ? (
                <p className={k.sources}>
                  Sources:{" "}
                  {c.sources.map((s, i) => (
                    <span key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
                      {i < c.sources!.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
              ) : null}
            </div>
          </div>
        </section>
      </div>

      {service ?? (c.service ? (
        <section className={t.sec} id="help">
          <div className={e.container}>
            <ServiceCard id={c.service} why={c.serviceWhy} />
          </div>
        </section>
      ) : null)}

      <section className={t.sec} id="faq">
        <div className={`${e.container} ${e.faq}`}>
          <div>
            <p className={e.eyebrow}>Questions, answered</p>
            <h2 className={e.h2}>Frequently asked <em className={e.emGreen}>questions</em></h2>
          </div>
          <FAQAccordion faqs={c.faqs.map(([q, a]) => [q, [a]] as [string, string[]])} />
        </div>
      </section>

      {related.length ? (
        <div className={t.band}>
          <section className={`${t.sec} ${t.last}`} id="related-tools">
            <div className={e.container}>
              <Head kicker="Next step" title={<>Related free <em className={e.emGreen}>tools</em></>} />
              <ul className={k.related}>
                {related.map((s) => (
                  <li key={s}>
                    <Link href={toolPath(s)}>
                      <span className={k.relName}>{TOOLS[s].name}</span>
                      <span className={k.relText}>{HUB_CARDS[s]?.description ?? TOOLS[s].metaDescription}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <p style={{ textAlign: "center", marginTop: 28 }}>
                <Link href="/tools" className={`${e.btn} ${e.btnSecondary}`}>Browse all free tools</Link>
              </p>
            </div>
          </section>
        </div>
      ) : null}
    </EditorialPage>
  );
}
