import type { CSSProperties } from "react";
import Link from "next/link";
import { JsonLd } from "@/app/blog/_components/JsonLd";
import { FAQAccordion } from "@/app/HomeComponents/FAQAccordion";
import { ArrowIcon } from "@/app/HomeComponents/icons";
import { EditorialPage, ed as e } from "@/app/_design/ui";
import { HUB_CARDS, hubImage } from "@/lib/tools/hub";
import { TOOLS, toolPath } from "@/lib/tools/registry";
import type { NewToolContent } from "@/lib/tools/v3/content-types";
import { V3Generator } from "./V3Generator";
import s from "./studio.module.css";
import t from "./edtool.module.css";

// Tool pages on the editorial design (the SEO tools added from October 29, 2026). Same fonts, palette and
// rhythm as the Black Friday page: sections without art are centred, cards sit on white over ivory bands.
// The tool widget keeps its studio markup; its tokens are remapped to the editorial palette below.

export const EDITORIAL_TOOLS = new Set(["website-metadata-extractor", "website-seo-checker", "broken-link-checker", "sitemap-url-status-checker", "long-tail-keyword-generator", "seo-question-generator", "core-web-vitals-checker"]);

/** Studio tokens re-pointed at the editorial ones, so the shared widgets match the page. */
const WIDGET_TOKENS = {
  "--cream": "#ffffff",
  "--ink": "#202821",
  "--ink-2": "#4a524b",
  "--muted": "#687068",
  "--gold": "#b38842",
  "--gold-text": "#7f5f26",
  "--gold-soft": "#d8e4d7",
  "--surface": "#ffffff",
  "--surface-2": "#f8f5ee",
  "--line": "#e4e0d6",
  "--line-strong": "#cbc5b7",
  "--error": "#a4472a",
  "--nf-inter": "var(--ed-body)",
  padding: 0,
  background: "transparent",
} as CSSProperties;

const rich = (text: string) => text.replace(/\*\*([^*]+)\*\*/g, "$1");

export function EditorialToolPage({ c, jsonLd }: { c: NewToolContent; jsonLd: Record<string, unknown> }) {
  const related = c.related.filter((r) => TOOLS[r.slug]);
  return (
    <EditorialPage>
      <JsonLd data={jsonLd} />
      <section className={t.hero}>
        <div className={e.container}>
          <nav aria-label="Breadcrumb">
            <ol className={t.crumbs}>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/tools">Free Tools</Link></li>
              <li><Link href="/tools/seo">SEO Tools</Link></li>
              <li aria-current="page">{c.name}</li>
            </ol>
          </nav>
          <p className={e.eyebrow}>Free SEO tool</p>
          <h1 className={`${e.h1} ${t.h1}`}>
            {c.name} <span className={t.accent}>(100% FREE)</span>
          </h1>
          <p className={e.lede} style={{ marginTop: 20 }}>{c.lede}</p>
          <p className={t.trust}>{c.trust}</p>
          <div className={`${s.page} ${t.workspace}`} style={WIDGET_TOKENS}>
            <V3Generator slug={c.slug} name={c.name} />
          </div>
        </div>
      </section>

      <section className={t.sec}>
        <div className={`${e.container} ${t.center}`}>
          <p className={e.eyebrow}>How it works</p>
          <h2 className={e.h2}>How to use the {c.name} <em className={e.emGreen}>in three steps.</em></h2>
          <ol className={t.steps}>
            {c.steps.map((st, i) => (
              <li key={st.title}>
                <span className={t.num}>{String(i + 1).padStart(2, "0")}</span>
                <h3>{st.title}</h3>
                <p>{st.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <div className={t.band}>
        <section className={t.sec}>
          <div className={`${e.container} ${t.center}`}>
            <p className={e.eyebrow}>Examples</p>
            <h2 className={e.h2}>{c.examples.heading} {c.examples.accent ? <em className={e.emGreen}>{c.examples.accent}</em> : null}</h2>
            {c.examples.intro ? <p className={e.body} style={{ marginTop: 14 }}>{c.examples.intro}</p> : null}
            <ul className={t.examples}>
              {c.examples.items.map((x) => (
                <li key={x.title} className={t.example}>
                  <h3>{x.title}</h3>
                  <p><span className={t.tag}>Input</span>{x.input}</p>
                  <p className={t.out}><span className={t.tag}>Result</span>{x.output}</p>
                  <p>{x.why}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>

      <section className={t.sec}>
        <div className={`${e.container} ${t.center}`}>
          <p className={e.eyebrow}>Good to know</p>
          <h2 className={e.h2}>{c.guidance.heading} {c.guidance.accent ? <em className={e.emGreen}>{c.guidance.accent}</em> : null}</h2>
          <ul className={t.guide}>
            {c.guidance.items.map((g) => (
              <li key={g.title}>
                <h3>{g.title}</h3>
                <p>{rich(g.text)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className={t.sec}>
        <div className={`${e.container} ${e.faq}`}>
          <div>
            <p className={e.eyebrow}>FAQ</p>
            <h2 className={e.h2}>Questions, <em className={e.emGreen}>answered.</em></h2>
          </div>
          <FAQAccordion faqs={c.faqs.map((f) => [f.q, [f.a]] as [string, string[]])} />
        </div>
      </section>

      {related.length ? (
        <div className={t.band}>
          <section className={t.sec}>
            <div className={`${e.container} ${t.center}`}>
              <p className={e.eyebrow}>Keep going</p>
              <h2 className={e.h2}>More free tools <em className={e.emGreen}>for the next step.</em></h2>
              <ul className={t.cards}>
                {related.map((r) => (
                  <li key={r.slug} className={t.card}>
                    {hubImage(r.slug) ? (
                      <div className={t.thumb}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={hubImage(r.slug)} alt="" width={1200} height={900} loading="lazy" decoding="async" />
                      </div>
                    ) : (
                      <div className={`${t.thumb} ${t.thumbEmpty}`} aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></svg>
                      </div>
                    )}
                    <div className={t.cardBody}>
                      <h3>{TOOLS[r.slug].name}</h3>
                      <p>{r.text}</p>
                      <Link href={toolPath(r.slug)} className={t.cardLink}>
                        {HUB_CARDS[r.slug]?.cta ?? "Open tool"} <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </li>
                ))}
              </ul>
              <div className={t.actions}>
                <Link href="/tools/seo" className={`${e.btn} ${e.btnSecondary}`}>See all SEO tools</Link>
              </div>
            </div>
          </section>
        </div>
      ) : null}

      <section className={`${t.sec} ${t.last}`}>
        <div className={e.container}>
          <div className={e.cta}>
            <div>
              <h2 className={e.h2}>{c.cta.heading} {c.cta.accent}</h2>
              <p className={e.body} style={{ marginTop: 16 }}>{c.cta.copy}</p>
            </div>
            <div className={e.ctaActions}>
              <Link href={c.cta.href} className={`${e.btn} ${e.btnLight}`}>{c.cta.button} <ArrowIcon /></Link>
              <Link href="/contact" className={`${e.btn} ${e.btnGhostLight}`}>Tell me what&apos;s stuck</Link>
            </div>
          </div>
        </div>
      </section>
    </EditorialPage>
  );
}
