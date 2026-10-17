import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { SITE_URL } from "@/lib/markdown";
import { getTool, toolPath, TOOLS } from "@/lib/tools/registry";
import type { ExampleColumn, ToolExample, ToolPage } from "@/lib/tools/types";
import { countChars } from "@/lib/tools/validate";
import { H1_ACCENT_STYLE, HERO_H1_STYLE } from "@/app/HomeComponents/heading";
import { PlusIcon } from "@/app/HomeComponents/icons";
import { JsonLd, breadcrumbList } from "@/app/blog/_components/JsonLd";
import { BlogCta } from "@/app/blog/_components/parts";
import { Blocks, Crumbs, SectionBody, plain, rich } from "../_components/content";
import { ProfileMockup } from "../_components/ProfileMockup";
import { StudioPage } from "../_studio/StudioPage";
import { ToolWorkspace, UseExampleButton } from "../_components/ToolWorkspace";
import s from "../tools.module.css";

// One template for every tool page. Each page is a config object in lib/tools/registry.ts.

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(TOOLS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tool = getTool((await params).slug);
  if (!tool) return {};
  return buildMetadata({ title: tool.metaTitle, description: tool.metaDescription, path: toolPath(tool.slug) });
}

function jsonLd(tool: ToolPage) {
  const url = `${SITE_URL}${toolPath(tool.slug)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumbList([
        { name: "Home", url: `${SITE_URL}/` },
        { name: "Free Tools", url: `${SITE_URL}/tools` },
        { name: tool.name, url },
      ]),
      {
        "@type": "WebApplication",
        name: tool.name,
        url,
        description: tool.metaDescription,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        creator: { "@type": "Person", name: "Zain Ul Abdin", url: SITE_URL },
      },
      {
        "@type": "FAQPage",
        mainEntity: tool.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plain(f.a) } })),
      },
    ],
  };
}

/** The character limit an example's output is counted against, when the tool has one. */
function exampleLimit(tool: ToolPage): number | null {
  const r = tool.workspace.result;
  if (r.kind === "options") return typeof r.limit === "number" ? r.limit : r.limit.fallback;
  if (r.kind === "about" || r.kind === "post") return r.limit;
  return null;
}

function cell(ex: ToolExample, col: ExampleColumn): string {
  if (col.value.startsWith("input.")) {
    const v = ex.input[col.value.slice(6)];
    return typeof v === "string" ? v : "";
  }
  return (ex[col.value as "inputLabel" | "before" | "output" | "why"] as string | undefined) ?? "";
}

/** Example card for tools with a profile preview: account badge, input summary, the bio on a mini profile, counter, why. */
function ProfileExample({ tool, item, limit }: { tool: ToolPage; item: ToolExample; limit: number | null }) {
  const p = item.profile!;
  const skin = tool.workspace.preview?.skin ?? "instagram";
  return (
    <>
      <div className={s.exampleTop}>
        <p className={s.exampleInput}>{item.inputLabel}</p>
        {p.badge ? <span className={s.badgeSoft}>{p.badge}</span> : null}
      </div>
      {item.inputText ? <p className={s.exampleSummary}>Input: {item.inputText}</p> : null}
      <ProfileMockup skin={skin} username={p.username} name={p.name} text={p.text} link={p.link} compact />
      <p className={s.srOnly}>{p.text}</p>
      {limit ? (
        <p className={s.counter}>
          {countChars(p.text)} / {limit}
        </p>
      ) : null}
      {item.why ? <p className={s.why}>Why it works: {rich(item.why)}</p> : null}
    </>
  );
}

function Examples({ tool }: { tool: ToolPage }) {
  const ex = tool.examples;
  const limit = exampleLimit(tool);
  const fields = tool.workspace.fields;
  return (
    <section className={s.section}>
      <h2 className={s.h2}>{ex.heading}</h2>
      {ex.intro ? <SectionBody blocks={ex.intro} /> : null}
      <p className={`${s.note} ${s.sectionLabel}`}>{ex.label ?? "Examples (illustrative)"}</p>
      {ex.layout === "table" && ex.columns ? (
        <div className={s.tableWrap}>
          <table className={s.contentTable}>
            <thead>
              <tr>
                {ex.columns.map((c) => (
                  <th key={c.label} scope="col">
                    {c.label}
                  </th>
                ))}
                <th scope="col">
                  <span className={s.srOnly}>Try it</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {ex.items.map((item) => (
                <tr key={item.inputLabel + (item.before ?? "")}>
                  {ex.columns!.map((c) => (
                    <td key={c.label}>{cell(item, c)}</td>
                  ))}
                  <td>
                    <UseExampleButton input={item.input} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <ul className={ex.layout === "wide" ? s.exampleWide : s.exampleGrid}>
          {ex.items.map((item) => (
            <li key={item.inputLabel + (item.output ?? "")} className={s.exampleCard}>
              {item.profile ? (
                <ProfileExample tool={tool} item={item} limit={limit} />
              ) : (
                <>
              <p className={s.exampleInput}>{item.inputLabel}</p>
              <dl className={s.exampleFields}>
                {fields.flatMap((f) => {
                  const v = item.input[f.name];
                  if (v === undefined || v === "") return [];
                  return [
                    <div key={f.name}>
                      <dt>{f.label}</dt>
                      <dd>{typeof v === "boolean" ? (v ? "On" : "Off") : v}</dd>
                    </div>,
                  ];
                })}
              </dl>
              {item.before ? (
                <p className={s.exampleBefore}>
                  <span className={s.angle}>{ex.beforeLabel ?? "Before"}</span> {item.before}
                </p>
              ) : null}
              {item.output ? (
                <div>
                  {ex.afterLabel ? <span className={s.angle}>{ex.afterLabel}</span> : null}
                  <p className={s.exampleOutput}>{item.output}</p>
                </div>
              ) : null}
              {item.table ? (
                <div className={s.tableWrap}>
                  <table className={s.contentTable}>
                    <thead>
                      <tr>
                        {item.table.head.map((h) => (
                          <th key={h} scope="col">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {item.table.rows.map((r) => (
                        <tr key={r.join("|")}>
                          {r.map((c, i) => (
                            <td key={i}>{rich(c)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
              {item.output && limit ? (
                <p className={s.counter}>
                  {countChars(item.output).toLocaleString("en-US")} / {limit.toLocaleString("en-US")}
                </p>
              ) : null}
              {item.why ? <p className={s.why}>{rich(item.why)}</p> : null}
                </>
              )}
              <UseExampleButton input={item.input} />
            </li>
          ))}
        </ul>
      )}
      {ex.outro ? <Blocks blocks={ex.outro} /> : null}
    </section>
  );
}

export default async function ToolPageView({ params }: Props) {
  const tool = getTool((await params).slug);
  if (!tool) notFound();
  // Redesigned pages render on the studio layout; the rest keep this template until they move over.
  if (tool.studio) return <StudioPage tool={tool} jsonLd={jsonLd(tool)} />;
  const related = tool.related.flatMap((r) => (TOOLS[r.slug] ? [{ ...r, name: TOOLS[r.slug].name }] : []));
  const extra = tool.extraLinks.filter((l): l is { text: string; href: string } => !!l.href && !!l.text);

  return (
    <main className={s.main}>
      <JsonLd data={jsonLd(tool)} />
      <Crumbs items={[{ name: "Home", href: "/" }, { name: "Free Tools", href: "/tools" }, { name: tool.name }]} />

      <header className={s.hero}>
        <h1 style={HERO_H1_STYLE}>
          {tool.h1.regular} <em style={H1_ACCENT_STYLE}>{tool.h1.accent}</em>
        </h1>
        <p className={s.lede}>{tool.heroDescription}</p>
        <p className={s.note}>{tool.accessNote}</p>
      </header>

      <ToolWorkspace slug={tool.slug} ws={tool.workspace} />

      <section className={s.section}>
        <h2 className={s.h2}>{tool.howTo.heading}</h2>
        {tool.howTo.intro ? <p className={s.sectionIntro}>{rich(tool.howTo.intro)}</p> : null}
        <ol className={s.steps}>
          {tool.howTo.steps.map((step) => (
            <li key={step}>{rich(step)}</li>
          ))}
        </ol>
        {tool.howTo.outro ? <p>{rich(tool.howTo.outro)}</p> : null}
      </section>

      <Examples tool={tool} />

      {tool.sections.map((sec) => (
        <section key={sec.heading} className={`${s.section} ${s.prose}`}>
          <h2 className={s.h2}>{sec.heading}</h2>
          <SectionBody blocks={sec.blocks} />
        </section>
      ))}

      <section className={s.section}>
        <h2 className={s.h2}>Frequently asked questions</h2>
        <div className={s.faq}>
          {tool.faqs.map((f) => (
            <details key={f.q}>
              <summary>
                <h3>{f.q}</h3>
                <span className={s.faqIcon} aria-hidden>
                  <PlusIcon />
                </span>
              </summary>
              <p className={s.faqAnswer}>{rich(f.a)}</p>
            </details>
          ))}
        </div>
      </section>

      {tool.ctas.map((c) => (c.href ? <BlogCta key={c.heading} heading={c.heading} text={c.copy ?? ""} buttonLabel={c.button} buttonUrl={c.href} /> : null))}

      {related.length || extra.length ? (
        <section className={s.section}>
          <h2 className={s.h2}>Continue with these tools</h2>
          <ul className={s.related}>
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={toolPath(r.slug)}>{r.name}</Link>
                {r.text ? `: ${r.text}` : null}
              </li>
            ))}
            {extra.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.text}</Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
