"use client";

import Link from "next/link";
import { useMemo, useState, type ReactNode } from "react";
import { AVAILABILITY, CONDITION, MODIFIER_GROUPS, SITEMAP_INPUT_MAX, abSampleSize, buildHreflang, buildOpenGraph, buildProductSchema, buildSitemap, buildSkus, checkCanonical, findLinkOpportunities, localKeywords, mrr, parsePages, retention, csvRow, validateJsonLd, type CanonicalCheck, type Hop, type ModifierGroup, type Plan } from "@/lib/tools/v3/batch4";
import { csvCell, downloadFile, track } from "@/lib/tools/v3/track";
import { Disclosure, Segmented, Select, Spinner, StudioField } from "./controls";
import { CopyButton, mono } from "./V3Batch3";
import { NumberField, Rows, num } from "./V3Utilities";
import s from "./studio.module.css";

// Tools 41 to 60 that run without AI. Everything is computed in the browser, except the canonical and
// redirect checkers, which ask /api/tools/check to fetch a public URL safely.

const code = { ...mono, margin: "6px 0 0", padding: 14, maxHeight: 420, overflow: "auto", background: "#F8F6F4", border: "1px solid #DDDAD3", borderRadius: 12, whiteSpace: "pre-wrap", wordBreak: "break-word" } as const;
const big = { margin: "4px 0 2px", fontFamily: "var(--nf-general-sans)", fontSize: 40, fontWeight: 600, letterSpacing: "-0.03em" } as const;
const tableWrap = { overflowX: "auto", margin: "8px 0 12px", border: "1px solid #DDDAD3", borderRadius: 12 } as const;
const th = { textAlign: "left", padding: "8px 10px", background: "#F8F6F4", borderBottom: "1px solid #DDDAD3", fontWeight: 600, whiteSpace: "nowrap" } as const;
const td = (i: number) => ({ padding: "8px 10px", borderTop: i ? "1px solid #EEEBE6" : undefined, verticalAlign: "top", wordBreak: "break-word" }) as const;
export const TONE = { ok: "#2F6B3A", warn: "#8A5A12", bad: "#A23B2A", info: "#5B5853" } as const;

export function Table({ columns, rows, minWidth = 520 }: { columns: string[]; rows: ReactNode[][]; minWidth?: number }) {
  return (
    <div style={tableWrap}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, lineHeight: 1.5, minWidth, tableLayout: minWidth ? "auto" : "fixed" }}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c} scope="col" style={th}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j} style={td(i)}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Messages({ items, tone }: { items: string[]; tone: "bad" | "warn" }) {
  if (!items.length) return null;
  return (
    <ul style={{ margin: "8px 0", paddingLeft: 20, display: "grid", gap: 4, fontSize: 14, lineHeight: 1.5, color: TONE[tone] }}>
      {items.map((m) => (
        <li key={m}>{m}</li>
      ))}
    </ul>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return (
    <p className={s.draftNote} style={{ margin: "24px auto" }}>
      {children}
    </p>
  );
}

export function TextArea({ id, label, value, onChange, placeholder, rows = 8, hint }: { id: string; label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number; hint?: string }) {
  return (
    <StudioField id={id} label={label} hint={hint}>
      <textarea id={id} className={`${s.input} ${s.textarea}`} rows={rows} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} style={{ ...mono, lineHeight: 1.5 }} />
    </StudioField>
  );
}

export function Text({ id, label, value, onChange, placeholder, hint }: { id: string; label: string; value: string; onChange: (v: string) => void; placeholder?: string; hint?: string }) {
  return (
    <StudioField id={id} label={label} hint={hint}>
      <input id={id} className={s.input} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
    </StudioField>
  );
}

function FileButton({ accept, onText, label }: { accept: string; onText: (t: string) => void; label: string }) {
  return (
    <label className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} style={{ cursor: "pointer" }}>
      {label}
      <input
        type="file"
        accept={accept}
        hidden
        onChange={async (e) => {
          const f = e.target.files?.[0];
          if (!f) return;
          if (f.size > 5_000_000) return alert("That file is over 5 MB. Split it and try again.");
          onText(await f.text());
          e.target.value = "";
        }}
      />
    </label>
  );
}

// ---------- 41. XML Sitemap Generator ----------

export function XmlSitemapGenerator() {
  const slug = "xml-sitemap-generator";
  const [text, setText] = useState("");
  const [domain, setDomain] = useState("");
  const [allowOther, setAllowOther] = useState(false);
  const [sort, setSort] = useState(false);
  const [exclude, setExclude] = useState("");
  const [built, setBuilt] = useState<ReturnType<typeof buildSitemap> | null>(null);
  const too = text.length > SITEMAP_INPUT_MAX * 120;
  const run = () => {
    setBuilt(buildSitemap(text, { domain, allowOtherHosts: allowOther, sort, exclude: exclude.split(/[,\n]/).map((x) => x.trim()).filter(Boolean) }));
    track("tool_calculate", slug);
  };
  return (
    <section className={s.tool} aria-label="XML sitemap generator">
      <form className={s.panel} onSubmit={(e) => (e.preventDefault(), run())}>
        <div className={s.group}>
          <TextArea id="sg-urls" label="URLs or paths, one per line" value={text} onChange={setText} rows={10} placeholder={"https://example.com/\n/about\n/products/desk-mat"} hint="A CSV works too: URL in the first column, an optional real lastmod date (like 2026-10-26) in the second." />
          <Text id="sg-domain" label="Website domain (needed for paths)" value={domain} onChange={setDomain} placeholder="https://example.com" />
        </div>
        <Disclosure label="More options">
          <div className={s.group}>
            <Text id="sg-exclude" label="Leave out URLs containing" value={exclude} onChange={setExclude} placeholder="/cart, /account, ?sort=" />
            <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 15 }}>
              <input type="checkbox" checked={sort} onChange={(e) => setSort(e.target.checked)} /> Sort URLs alphabetically
            </label>
            <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 15 }}>
              <input type="checkbox" checked={allowOther} onChange={(e) => setAllowOther(e.target.checked)} /> Allow URLs from other domains
            </label>
          </div>
        </Disclosure>
        <div className={s.actions}>
          <FileButton accept=".csv,.txt,text/csv,text/plain" label="Upload CSV or TXT" onText={setText} />
          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnLg}`} onClick={() => (setText("https://example.com/\n/about\n/products/desk-mat"), setDomain("https://example.com"))}>
            Try an example
          </button>
          <button type="submit" className={`${s.btn} ${s.btnPrimary} ${s.btnLg}`} disabled={!text.trim() || too}>
            Generate Sitemap
          </button>
        </div>
        {too ? <p className={s.countOver}>That list is too long to process here. Split it into smaller files.</p> : null}
        <p className={s.note}>Runs in your browser. URLs aren&apos;t fetched or crawled: only the pages you list are included, and no dates are added unless you supply them.</p>
      </form>
      <div className={s.output}>
        {!built ? (
          <Empty>Paste your URLs and press Generate Sitemap. Your sitemap.xml appears here.</Empty>
        ) : (
          <div className={s.result} aria-live="polite">
            <Rows rows={[["Valid URLs", built.count.toLocaleString(), "strong"], ["Duplicates removed", String(built.duplicates)], ["Invalid entries", String(built.invalid), built.invalid ? "bad" : undefined], ["Other domain URLs", String(built.otherDomain), built.otherDomain ? "bad" : undefined], ["Files", String(built.files.length)]]} />
            <Messages tone="warn" items={built.errors.slice(0, 12).map((e) => (e.row ? `Row ${e.row}: ${e.message}` : e.message))} />
            {built.errors.length > 12 ? <p className={s.note}>And {built.errors.length - 12} more.</p> : null}
            {built.files.length ? (
              <>
                <span className={s.resultLabel}>{built.files.length > 1 ? `${built.files[0].name} (first of ${built.files.length})` : "sitemap.xml"}</span>
                <pre style={code}>{built.files[0].xml.length > 20000 ? `${built.files[0].xml.slice(0, 20000)}\n…` : built.files[0].xml}</pre>
                <div className={s.resultActions}>
                  {built.files.length === 1 ? <CopyButton text={built.files[0].xml} slug={slug} label="Copy XML" /> : null}
                  {built.files.map((f) => (
                    <button key={f.name} type="button" className={`${s.btn} ${built.files.length === 1 ? s.btnGhost : s.btnPrimary} ${s.btnSm}`} onClick={() => (downloadFile(f.name, f.xml, "application/xml"), track("tool_download", slug))}>
                      Download {f.name}
                    </button>
                  ))}
                  {built.index ? (
                    <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => (downloadFile("sitemap-index.xml", built.index!, "application/xml"), track("tool_download", slug))}>
                      Download sitemap index
                    </button>
                  ) : null}
                  <Link className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} href="/tools/xml-sitemap-validator">
                    Check in XML Sitemap Validator
                  </Link>
                </div>
                <p className={s.note}>Upload it to your site (usually /sitemap.xml), add it to robots.txt, and submit it in Search Console. A sitemap helps discovery; it doesn&apos;t guarantee indexing.</p>
              </>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}

// ---------- 42. Hreflang Tag Generator ----------

export function HreflangGenerator() {
  const slug = "hreflang-tag-generator";
  const [rows, setRows] = useState([{ url: "", locale: "" }, { url: "", locale: "" }]);
  const [xd, setXd] = useState("");
  const [tab, setTab] = useState("HTML tags");
  const out = useMemo(() => buildHreflang(rows, xd), [rows, xd]);
  const filled = rows.filter((r) => r.url.trim()).length >= 2;
  const setRow = (i: number, k: "url" | "locale", v: string) => setRows((o) => o.map((r, j) => (j === i ? { ...r, [k]: v } : r)));
  return (
    <section className={s.tool} aria-label="Hreflang tag generator">
      <form className={s.panel} onSubmit={(e) => e.preventDefault()}>
        <div className={s.group}>
          {rows.map((r, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 110px", gap: 8 }}>
              <Text id={`hl-url-${i}`} label={`Page URL ${i + 1}`} value={r.url} onChange={(v) => setRow(i, "url", v)} placeholder="https://example.com/de/product" />
              <Text id={`hl-loc-${i}`} label="Language" value={r.locale} onChange={(v) => setRow(i, "locale", v)} placeholder="de or de-AT" />
            </div>
          ))}
          <div className={s.actions} style={{ justifyContent: "flex-start" }}>
            <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => setRows((o) => [...o, { url: "", locale: "" }])} disabled={rows.length >= 40}>
              Add another version
            </button>
            {rows.length > 2 ? (
              <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => setRows((o) => o.slice(0, -1))}>
                Remove last
              </button>
            ) : null}
          </div>
        </div>
        <Disclosure label="More options">
          <div className={s.group}>
            <Text id="hl-xd" label="x-default fallback URL" value={xd} onChange={setXd} placeholder="https://example.com/" hint="Shown when no language or region matches the visitor." />
          </div>
        </Disclosure>
        <div className={s.actions}>
          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnLg}`} onClick={() => (setRows([{ url: "https://example.com/en/product", locale: "en" }, { url: "https://example.com/de/product", locale: "de" }]), setXd("https://example.com/"))}>
            Try an example
          </button>
        </div>
        <p className={s.note}>Runs in your browser. Codes: ISO 639-1 language, optional ISO 3166-1 region (en, en-GB, pt-BR). The tool never guesses a page&apos;s language from its URL.</p>
      </form>
      <div className={s.output}>
        {!filled ? (
          <Empty>Add at least two translated page URLs with their language codes.</Empty>
        ) : (
          <div className={s.result} aria-live="polite">
            <Messages tone="bad" items={out.errors} />
            <Messages tone="warn" items={out.warnings} />
            {!out.errors.length ? (
              <>
                <StudioField id="hl-tab" label="Format" as="group">
                  <Segmented id="hl-tab" options={["HTML tags", "XML sitemap"]} value={tab} onChange={setTab} />
                </StudioField>
                {tab === "HTML tags" ? (
                  <>
                    <span className={s.resultLabel}>Add this same set to the &lt;head&gt; of every version</span>
                    <pre style={code}>{out.tags}</pre>
                    <div className={s.resultActions}>
                      <CopyButton text={out.tags} slug={slug} label="Copy HTML" />
                      <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => (downloadFile("hreflang.csv", ["Page URL,hreflang", ...out.variants.map((v) => [v.url, v.locale].map(csvCell).join(","))].join("\n"), "text/csv"), track("tool_download", slug))}>
                        Export CSV
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span className={s.resultLabel}>Sitemap annotations</span>
                    <pre style={code}>{out.xml}</pre>
                    <div className={s.resultActions}>
                      <CopyButton text={out.xml} slug={slug} label="Copy XML" />
                    </div>
                  </>
                )}
                <p className={s.note}>Use one method (HTML, HTTP headers or sitemap), not all three. Each version must list itself and every other version.</p>
              </>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}

// ---------- 43. Canonical URL Checker ----------

type CanonicalResult = { requestedUrl?: string; finalUrl?: string; httpStatus?: number; redirects?: number; canonicals: string[]; resolved: string | null; checks: CanonicalCheck[] };

export function CanonicalChecker() {
  const slug = "canonical-url-checker";
  const [mode, setMode] = useState("Public URL");
  const [url, setUrl] = useState("");
  const [html, setHtml] = useState("");
  const [expected, setExpected] = useState("");
  const [res, setRes] = useState<CanonicalResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const run = async () => {
    setError("");
    setRes(null);
    track("tool_calculate", slug, { mode });
    if (mode === "Paste HTML") {
      if (html.length > 2_000_000) return setError("That HTML is over 2 MB. Paste just the <head>.");
      setRes(checkCanonical({ html, pageUrl: url.trim() || undefined, expected, live: false }));
      return;
    }
    setLoading(true);
    try {
      const r = await fetch("/api/tools/check", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "canonical", url, expected }) });
      const body = await r.json().catch(() => ({}));
      if (!r.ok || body.error) setError(body.error ?? "The check didn't work. Try again.");
      else setRes(body);
    } catch {
      setError("The check didn't work. Try again.");
    }
    setLoading(false);
  };
  return (
    <section className={s.tool} aria-label="Canonical URL checker">
      <form className={s.panel} onSubmit={(e) => (e.preventDefault(), run())}>
        <div className={s.group}>
          <StudioField id="cc-mode" label="How do you want to check?" as="group">
            <Segmented id="cc-mode" options={["Public URL", "Paste HTML"]} value={mode} onChange={setMode} />
          </StudioField>
          <Text id="cc-url" label={mode === "Public URL" ? "Page URL" : "Page URL (optional, to resolve relative links)"} value={url} onChange={setUrl} placeholder="https://example.com/products/mat?utm_source=ig" />
          {mode === "Paste HTML" ? <TextArea id="cc-html" label="Page HTML" value={html} onChange={setHtml} rows={8} placeholder={'<head>\n  <link rel="canonical" href="https://example.com/products/mat">\n</head>'} /> : null}
        </div>
        <Disclosure label="More options">
          <div className={s.group}>
            <Text id="cc-exp" label="Canonical you expect (optional)" value={expected} onChange={setExpected} placeholder="https://example.com/products/mat" />
          </div>
        </Disclosure>
        <div className={s.actions}>
          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnLg}`} onClick={() => (setMode("Public URL"), setUrl("https://www.zainameen.com/tools/etsy-fee-calculator?utm_source=ig"))}>
            Try an example
          </button>
          <button type="submit" className={`${s.btn} ${s.btnPrimary} ${s.btnLg}`} disabled={loading || (mode === "Public URL" ? !url.trim() : !html.trim())}>
            {loading ? <Spinner /> : null}
            Check Canonical
          </button>
        </div>
        <p className={s.note}>{mode === "Public URL" ? "Our server fetches the public page once, follows its redirects and reads the canonical. Private and internal addresses are refused. Nothing is stored." : "Pasted HTML is checked in your browser and isn't sent anywhere."}</p>
      </form>
      <div className={s.output}>
        {error ? <p className={s.countOver}>{error}</p> : null}
        {!res ? (
          !error ? <Empty>Enter a page URL or paste HTML to see its canonical declaration.</Empty> : null
        ) : (
          <div className={s.result} aria-live="polite">
            <span className={s.resultLabel}>Declared canonical</span>
            <p style={{ ...mono, fontSize: 16, margin: "6px 0 10px", wordBreak: "break-all" }}>{res.resolved ?? "None found"}</p>
            {res.finalUrl ? <Rows rows={[["Requested", res.requestedUrl ?? ""], ["Final URL", res.finalUrl], ["HTTP status", String(res.httpStatus), (res.httpStatus ?? 0) >= 400 ? "bad" : undefined], ["Redirects followed", String(res.redirects ?? 0)]]} /> : null}
            <Table
              columns={["Check", "Result", "Basis"]}
              rows={res.checks.map((c) => [
                <strong key="l" style={{ color: TONE[c.status] }}>{c.label}</strong>,
                c.text,
                c.basis,
              ])}
            />
            <p className={s.note}>A canonical is a preference. Google may still choose a different URL; check URL Inspection in Search Console for that.</p>
          </div>
        )}
      </div>
    </section>
  );
}

// ---------- 44. Redirect Chain Checker ----------

type ChainResult = { url: string; hops: Hop[]; redirects: number; loop: boolean; finalStatus: number | null; notes: string[] };

export function RedirectChecker() {
  const slug = "redirect-chain-checker";
  const [text, setText] = useState("");
  const [getMode, setGetMode] = useState(false);
  const [res, setRes] = useState<ChainResult[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const urls = text.split(/\r?\n/).map((x) => x.trim()).filter(Boolean);
  const run = async () => {
    setError("");
    setLoading(true);
    track("tool_calculate", slug, { urls: urls.length });
    try {
      const r = await fetch("/api/tools/check", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action: "redirects", urls, method: getMode ? "GET" : "HEAD" }) });
      const body = await r.json().catch(() => ({}));
      if (!r.ok || body.error) setError(body.error ?? "The check didn't work. Try again.");
      else setRes(body.results);
    } catch {
      setError("The check didn't work. Try again.");
    }
    setLoading(false);
  };
  const csv = () => ["Start URL,Hop,URL,Status,Location,Time ms", ...(res ?? []).flatMap((r) => r.hops.map((h, i) => [r.url, i + 1, h.url, h.status ?? h.error ?? "", h.location ?? "", h.timeMs].map(csvCell).join(",")))].join("\n");
  return (
    <section className={s.tool} aria-label="Redirect chain checker">
      <form className={s.panel} onSubmit={(e) => (e.preventDefault(), run())}>
        <div className={s.group}>
          <TextArea id="rc-urls" label="Public URL (up to 5, one per line)" value={text} onChange={setText} rows={4} placeholder="http://example.com/old-page" />
        </div>
        <Disclosure label="More options">
          <label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 15 }}>
            <input type="checkbox" checked={getMode} onChange={(e) => setGetMode(e.target.checked)} /> Use GET requests instead of HEAD
          </label>
        </Disclosure>
        <div className={s.actions}>
          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnLg}`} onClick={() => setText("http://zainameen.com/tools")}>
            Try an example
          </button>
          <button type="submit" className={`${s.btn} ${s.btnPrimary} ${s.btnLg}`} disabled={loading || !urls.length || urls.length > 5}>
            {loading ? <Spinner /> : null}
            Check Redirects
          </button>
        </div>
        {urls.length > 5 ? <p className={s.countOver}>Up to 5 URLs at a time.</p> : null}
        <p className={s.note}>Our server follows up to 8 server redirects for each URL. JavaScript and meta refresh redirects aren&apos;t followed. Private and internal addresses are refused. Nothing is stored.</p>
      </form>
      <div className={s.output}>
        {error ? <p className={s.countOver}>{error}</p> : null}
        {!res ? (
          !error ? <Empty>Enter a URL to see every redirect between it and the final page.</Empty> : null
        ) : (
          <div className={s.result} aria-live="polite">
            {res.map((r) => (
              <div key={r.url} style={{ marginBottom: 18 }}>
                <span className={s.resultLabel}>
                  {r.url}: {r.loop ? "loop" : `${r.redirects} redirect${r.redirects === 1 ? "" : "s"}`}, final {r.finalStatus ?? "error"}
                </span>
                <Table
                  minWidth={480}
                  columns={["#", "URL", "Status", "Goes to", "Time"]}
                  rows={r.hops.map((h, i) => [String(i + 1), <span key="u" style={{ wordBreak: "break-all" }}>{h.url}</span>, h.status ? <strong key="s" style={{ color: h.status >= 400 ? TONE.bad : h.status >= 300 ? TONE.warn : TONE.ok }}>{h.status}</strong> : <span key="e" style={{ color: TONE.bad }}>{h.error}</span>, h.location ? <span key="l" style={{ wordBreak: "break-all" }}>{h.location}</span> : "", h.timeMs ? `${h.timeMs} ms` : ""])}
                />
                <Messages tone="warn" items={r.notes} />
              </div>
            ))}
            <div className={s.resultActions}>
              <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => (downloadFile("redirect-chains.csv", csv(), "text/csv"), track("tool_download", slug))}>
                Download CSV
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ---------- 45. JSON-LD Schema Validator ----------

export function JsonLdValidator() {
  const slug = "json-ld-schema-validator";
  const [text, setText] = useState("");
  const [report, setReport] = useState<ReturnType<typeof validateJsonLd> | null>(null);
  const run = () => (setReport(validateJsonLd(text)), track("tool_calculate", slug));
  const errors = report?.issues.filter((i) => i.level === "error") ?? [];
  const warnings = report?.issues.filter((i) => i.level === "warning") ?? [];
  const summary = report ? [`Valid JSON: ${report.validJson ? "yes" : "no"}`, `Blocks: ${report.blocks}`, `Types: ${report.types.join(", ") || "none"}`, "", "Errors:", ...errors.map((e) => `- ${e.path ? `${e.path}: ` : ""}${e.message}`), "", "Warnings:", ...warnings.map((e) => `- ${e.path ? `${e.path}: ` : ""}${e.message}`)].join("\n") : "";
  return (
    <section className={s.tool} aria-label="JSON-LD schema validator">
      <form className={s.panel} onSubmit={(e) => (e.preventDefault(), run())}>
        <div className={s.group}>
          <TextArea id="jl-text" label="JSON-LD, or HTML with JSON-LD script blocks" value={text} onChange={setText} rows={12} placeholder={'{"@context":"https://schema.org","@type":"Product","name":"Desk Mat"}'} />
        </div>
        <div className={s.actions}>
          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnLg}`} onClick={() => setText('{\n  "@context": "https://schema.org",\n  "@type": "Product",\n  "name": "Desk Mat"\n}')}>
            Try an example
          </button>
          <button type="submit" className={`${s.btn} ${s.btnPrimary} ${s.btnLg}`} disabled={!text.trim()}>
            Validate JSON-LD
          </button>
        </div>
        <p className={s.note}>Runs in your browser. Your code is parsed as text, never run, and nothing is uploaded.</p>
      </form>
      <div className={s.output}>
        {!report ? (
          <Empty>Paste your structured data and press Validate JSON-LD.</Empty>
        ) : (
          <div className={s.result} aria-live="polite">
            <span className={s.resultLabel}>Result</span>
            <p style={{ ...big, fontSize: 30, color: errors.length ? TONE.bad : TONE.ok }}>{errors.length ? `${errors.length} error${errors.length === 1 ? "" : "s"}` : "No errors found"}</p>
            <Rows rows={[["Valid JSON", report.validJson ? "Yes" : "No", report.validJson ? "good" : "bad"], ["JSON-LD blocks", String(report.blocks)], ["Types found", report.types.join(", ") || "None"], ["@id values", String(report.ids.length)], ["Warnings", String(warnings.length)]]} />
            {errors.length ? <Table columns={["Error", "Where"]} rows={errors.map((e) => [e.message, e.path])} minWidth={0} /> : null}
            {warnings.length ? <Table columns={["Worth reviewing", "Where"]} rows={warnings.map((e) => [e.message, e.path])} minWidth={0} /> : null}
            <div className={s.resultActions}>
              <CopyButton text={summary} slug={slug} label="Copy findings" />
              <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => (downloadFile("json-ld-report.txt", summary), track("tool_download", slug))}>
                Download report
              </button>
              <a className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} href="https://search.google.com/test/rich-results" target="_blank" rel="noreferrer">
                Rich Results Test
              </a>
              <a className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} href="https://validator.schema.org/" target="_blank" rel="noreferrer">
                Schema.org validator
              </a>
            </div>
            <p className={s.note}>This checks syntax and common documented properties. Google&apos;s Rich Results Test decides eligibility for Google features.</p>
          </div>
        )}
      </div>
    </section>
  );
}

// ---------- 46. Open Graph Tags Generator ----------

export function OpenGraphGenerator() {
  const slug = "open-graph-tags-generator";
  const [v, setV] = useState<Record<string, string>>({ type: "website", card: "summary_large_image" });
  const set = (k: string) => (x: string) => setV((o) => ({ ...o, [k]: x }));
  const out = useMemo(() => buildOpenGraph({ title: v.title ?? "", url: v.url ?? "", description: v.description, image: v.image, imageAlt: v.imageAlt, siteName: v.siteName, type: v.type, locale: v.locale, card: v.card, twitterSite: v.twitterSite }), [v]);
  const ready = Boolean(v.title?.trim() && v.url?.trim());
  let host = "";
  try {
    host = new URL(v.url ?? "").host;
  } catch {}
  return (
    <section className={s.tool} aria-label="Open Graph tags generator">
      <form className={s.panel} onSubmit={(e) => e.preventDefault()}>
        <div className={s.group}>
          <Text id="og-title" label="Page title" value={v.title ?? ""} onChange={set("title")} placeholder="Marketing Guides" />
          <Text id="og-url" label="Canonical page URL" value={v.url ?? ""} onChange={set("url")} placeholder="https://example.com/blog" />
          <TextArea id="og-desc" label="Short description" value={v.description ?? ""} onChange={set("description")} rows={3} placeholder="Practical research and guides for growing a small business." />
          <Text id="og-image" label="Preview image URL" value={v.image ?? ""} onChange={set("image")} placeholder="https://example.com/og.png" hint="A public image you already have, ideally 1200 × 630." />
        </div>
        <Disclosure label="More options">
          <div className={s.group}>
            <Text id="og-site" label="Website name" value={v.siteName ?? ""} onChange={set("siteName")} />
            <StudioField id="og-type" label="og:type">
              <Select id="og-type" options={["website", "article"]} value={v.type ?? "website"} onChange={set("type")} />
            </StudioField>
            <Text id="og-alt" label="Image description (alt text)" value={v.imageAlt ?? ""} onChange={set("imageAlt")} />
            <Text id="og-locale" label="Locale" value={v.locale ?? ""} onChange={set("locale")} placeholder="en_US" />
            <StudioField id="og-card" label="X card">
              <Select id="og-card" options={["summary_large_image", "summary"]} value={v.card ?? "summary_large_image"} onChange={set("card")} />
            </StudioField>
            <Text id="og-tw" label="X account (optional)" value={v.twitterSite ?? ""} onChange={set("twitterSite")} placeholder="@yourbrand" />
          </div>
        </Disclosure>
        <div className={s.actions}>
          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnLg}`} onClick={() => setV({ type: "website", card: "summary_large_image", title: "Marketing Guides", url: "https://example.com/blog", description: "Practical research and guides for growing a small business." })}>
            Try an example
          </button>
        </div>
        <p className={s.note}>Runs in your browser. Your image URL is only written into the tags; it isn&apos;t loaded or checked.</p>
      </form>
      <div className={s.output}>
        {!ready ? (
          <Empty>Add the page title and URL. Your meta tags build here as you type.</Empty>
        ) : (
          <div className={s.result} aria-live="polite">
            <Messages tone="bad" items={out.errors} />
            <span className={s.resultLabel}>Illustrative preview (each platform renders differently)</span>
            <div style={{ border: "1px solid #DDDAD3", borderRadius: 12, overflow: "hidden", margin: "6px 0 14px", maxWidth: 520 }}>
              <div style={{ aspectRatio: "1.91 / 1", background: "#EEEBE6", display: "grid", placeItems: "center", color: "#7A766F", fontSize: 14 }}>{v.image?.trim() ? "Your image appears here" : "No image"}</div>
              <div style={{ padding: "10px 14px" }}>
                <div style={{ fontSize: 12, color: "#7A766F", textTransform: "uppercase" }}>{host}</div>
                <div style={{ fontWeight: 600, fontSize: 16, lineHeight: 1.35 }}>{v.title}</div>
                {v.description ? <div style={{ fontSize: 14, color: "#5B5853", lineHeight: 1.45, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{v.description}</div> : null}
              </div>
            </div>
            <span className={s.resultLabel}>Meta tags for your &lt;head&gt;</span>
            <pre style={code}>{out.html}</pre>
            <Messages tone="warn" items={out.warnings} />
            <div className={s.resultActions}>
              <CopyButton text={out.html} slug={slug} label="Copy tags" />
              <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => (downloadFile("open-graph-tags.html", out.html, "text/html"), track("tool_download", slug))}>
                Download HTML
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ---------- 47. Product Schema Generator ----------

export function ProductSchemaGenerator() {
  const slug = "product-schema-generator";
  const [v, setV] = useState<Record<string, string>>({ currency: "USD" });
  const set = (k: string) => (x: string) => setV((o) => ({ ...o, [k]: x }));
  const out = useMemo(() => buildProductSchema({ name: v.name ?? "", url: v.url ?? "", ...v }), [v]);
  const ready = Boolean(v.name?.trim() && v.url?.trim());
  const snippet = `<script type="application/ld+json">\n${out.json}\n</script>`;
  return (
    <section className={s.tool} aria-label="Product schema generator">
      <form className={s.panel} onSubmit={(e) => e.preventDefault()}>
        <div className={s.group}>
          <Text id="ps-name" label="Product name" value={v.name ?? ""} onChange={set("name")} placeholder="Matte Desk Mat" />
          <Text id="ps-url" label="Product page URL" value={v.url ?? ""} onChange={set("url")} placeholder="https://example.com/products/matte-mat" />
          <Text id="ps-image" label="Image URL" value={v.image ?? ""} onChange={set("image")} hint="Separate several with spaces." />
          <Text id="ps-brand" label="Brand" value={v.brand ?? ""} onChange={set("brand")} />
        </div>
        <Disclosure label="More options">
          <div className={s.group}>
            <TextArea id="ps-desc" label="Description (as shown on the page)" value={v.description ?? ""} onChange={set("description")} rows={3} />
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 110px", gap: 8 }}>
              <Text id="ps-price" label="Price (only if correct)" value={v.price ?? ""} onChange={set("price")} placeholder="35.00" />
              <Text id="ps-cur" label="Currency" value={v.currency ?? ""} onChange={set("currency")} placeholder="USD" />
            </div>
            <StudioField id="ps-av" label="Availability (only if known)">
              <Select id="ps-av" options={[...AVAILABILITY]} value={v.availability ?? ""} onChange={set("availability")} />
            </StudioField>
            <StudioField id="ps-cond" label="Condition">
              <Select id="ps-cond" options={[...CONDITION]} value={v.condition ?? ""} onChange={set("condition")} />
            </StudioField>
            <Text id="ps-sku" label="SKU" value={v.sku ?? ""} onChange={set("sku")} />
            <Text id="ps-gtin" label="GTIN (barcode number)" value={v.gtin ?? ""} onChange={set("gtin")} />
            <Text id="ps-seller" label="Seller name" value={v.seller ?? ""} onChange={set("seller")} />
          </div>
        </Disclosure>
        <div className={s.actions}>
          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnLg}`} onClick={() => setV({ name: "Matte Desk Mat", url: "https://example.com/products/matte-mat", brand: "Example Studio", image: "https://example.com/images/matte-mat.jpg", price: "35.00", currency: "USD", availability: "InStock" })}>
            Try an example
          </button>
        </div>
        <p className={s.note}>Runs in your browser. Only what you enter goes into the markup. Ratings and reviews are never added.</p>
      </form>
      <div className={s.output}>
        {!ready ? (
          <Empty>Add the product name and page URL. Your JSON-LD builds here as you type.</Empty>
        ) : (
          <div className={s.result} aria-live="polite">
            <Messages tone="bad" items={out.errors} />
            <span className={s.resultLabel}>Product JSON-LD</span>
            <pre style={code}>{snippet}</pre>
            {out.missing.length ? <p className={s.note}>For Google merchant listings you may also need: {out.missing.join(", ")}. Basic Product markup is still valid without them.</p> : null}
            <Messages tone="warn" items={out.warnings} />
            <div className={s.resultActions}>
              <CopyButton text={snippet} slug={slug} label="Copy script tag" />
              <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => (downloadFile("product-schema.json", out.json, "application/json"), track("tool_download", slug))}>
                Download .json
              </button>
              <a className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} href="https://search.google.com/test/rich-results" target="_blank" rel="noreferrer">
                Rich Results Test
              </a>
              <Link className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} href="/tools/json-ld-schema-validator">
                JSON-LD Validator
              </Link>
            </div>
            <p className={s.note}>Keep the markup matching what&apos;s visible on the product page. It doesn&apos;t guarantee stars or Shopping visibility.</p>
          </div>
        )}
      </div>
    </section>
  );
}

// ---------- 48. Internal Link Opportunity Finder ----------

export function InternalLinkFinder() {
  const slug = "internal-link-opportunity-finder";
  const [pagesText, setPagesText] = useState("");
  const [existingText, setExistingText] = useState("");
  const [focus, setFocus] = useState("");
  const [res, setRes] = useState<{ list: ReturnType<typeof findLinkOpportunities>; errors: string[]; pages: number } | null>(null);
  const run = () => {
    const { pages, errors } = parsePages(pagesText);
    if (pages.length > 2000) return setRes({ list: [], errors: ["Up to 2,000 pages at a time."], pages: pages.length });
    const existing = existingText.split(/\r?\n/).map((l) => csvRow(l)).filter((r) => r.length >= 2 && r[0] && !/^source/i.test(r[0])).map((r) => [r[0], r[1]] as [string, string]);
    const list = findLinkOpportunities(pages, existing, { focus: focus.split(/[,\n]/).map((x) => x.trim()).filter(Boolean) });
    setRes({ list, errors, pages: pages.length });
    track("tool_calculate", slug);
  };
  return (
    <section className={s.tool} aria-label="Internal link opportunity finder">
      <form className={s.panel} onSubmit={(e) => (e.preventDefault(), run())}>
        <div className={s.group}>
          <TextArea id="il-pages" label="Your pages: url, title, topic (one per line)" value={pagesText} onChange={setPagesText} rows={10} placeholder={"/blog/etsy-store-setup,How to set up an Etsy store,etsy seller setup fees listings\n/tools/etsy-fee-calculator,Etsy Fee Calculator,etsy fees seller calculator"} hint="CSV or tab separated. A sitemap's URLs alone aren't enough: titles or topics are needed to match pages." />
        </div>
        <Disclosure label="More options">
          <div className={s.group}>
            <TextArea id="il-existing" label="Links that already exist: source, target" value={existingText} onChange={setExistingText} rows={4} hint="These pairs are skipped." />
            <Text id="il-focus" label="Only suggest links to these URLs" value={focus} onChange={setFocus} placeholder="/tools/etsy-fee-calculator" />
          </div>
        </Disclosure>
        <div className={s.actions}>
          <FileButton accept=".csv,.txt,.tsv" label="Upload CSV" onText={setPagesText} />
          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnLg}`} onClick={() => setPagesText("url,title,topic\n/blog/etsy-store-setup,How to set up an Etsy store,etsy seller setup fees listings\n/tools/etsy-fee-calculator,Etsy Fee Calculator,etsy seller fees calculator\n/blog/etsy-pricing,How to price Etsy products,etsy pricing fees profit margin\n/tools/shopify-profit-margin-calculator,Shopify Profit Margin Calculator,profit margin pricing calculator")}>
            Try an example
          </button>
          <button type="submit" className={`${s.btn} ${s.btnPrimary} ${s.btnLg}`} disabled={!pagesText.trim()}>
            Find Internal Links
          </button>
        </div>
        <p className={s.note}>Runs in your browser. Matches are based only on the titles and topics you give, not on reading your pages.</p>
      </form>
      <div className={s.output}>
        {!res ? (
          <Empty>Paste your pages to see where links could help readers.</Empty>
        ) : (
          <div className={s.result} aria-live="polite">
            <p className={s.note} style={{ marginTop: 0, fontWeight: 600 }}>Review suggested links on the live pages before adding them.</p>
            <Messages tone="warn" items={res.errors.slice(0, 8)} />
            {res.list.length ? (
              <>
                <span className={s.resultLabel}>
                  {res.list.length} possible link{res.list.length === 1 ? "" : "s"} across {res.pages} pages
                </span>
                <Table columns={["From", "Link to", "Why related", "Anchor idea", "Match"]} rows={res.list.slice(0, 100).map((x) => [x.sourceTitle || x.source, x.targetTitle || x.target, x.shared.slice(0, 5).join(", "), x.anchor, `${x.score}`])} minWidth={640} />
                <div className={s.resultActions}>
                  <button type="button" className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`} onClick={() => (downloadFile("internal-link-ideas.csv", ["Source URL,Source title,Target URL,Target title,Shared terms,Anchor idea,Match score", ...res.list.map((x) => [x.source, x.sourceTitle, x.target, x.targetTitle, x.shared.join(" "), x.anchor, x.score].map(csvCell).join(","))].join("\n"), "text/csv"), track("tool_download", slug))}>
                    Download CSV
                  </button>
                </div>
                <p className={s.note}>The match score is a simple word overlap measure, not page authority. Anchor ideas describe the target; write the final wording to fit your sentence.</p>
              </>
            ) : (
              <p className={s.note}>No strong matches. Add more descriptive topics, or more pages.</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

// ---------- 53. Shopify SKU Generator ----------

export function SkuGenerator() {
  const slug = "shopify-sku-generator";
  const [v, setV] = useState<Record<string, string>>({ prefix: "", o1: "", o2: "", o3: "", sep: "-", abbr: "3", seq: "No", start: "1", width: "3", brand: "", existing: "", max: "" });
  const set = (k: string) => (x: string) => setV((o) => ({ ...o, [k]: x }));
  const list = (x: string) => x.split(/[,\n]/).map((y) => y.trim()).filter(Boolean);
  const out = useMemo(() => (v.prefix.trim() ? buildSkus({ prefix: v.prefix, brand: v.brand, options: [list(v.o1), list(v.o2), list(v.o3)], separator: v.sep === "none" ? "" : v.sep, abbreviation: num(v.abbr) || 3, sequence: v.seq === "Yes", start: num(v.start) || 1, width: num(v.width) || 3, maxLength: num(v.max) || 0, existing: list(v.existing) }) : null), [v]);
  return (
    <section className={s.tool} aria-label="Shopify SKU generator">
      <form className={s.panel} onSubmit={(e) => e.preventDefault()}>
        <div className={s.group}>
          <Text id="sku-prefix" label="Product prefix" value={v.prefix} onChange={set("prefix")} placeholder="MAT" />
          <Text id="sku-o1" label="Option 1 values (e.g. colours)" value={v.o1} onChange={set("o1")} placeholder="Black, Blue" />
          <Text id="sku-o2" label="Option 2 values (e.g. sizes)" value={v.o2} onChange={set("o2")} placeholder="S, L" />
        </div>
        <Disclosure label="More options">
          <div className={s.group}>
            <Text id="sku-o3" label="Option 3 values" value={v.o3} onChange={set("o3")} />
            <Text id="sku-brand" label="Brand prefix" value={v.brand} onChange={set("brand")} />
            <StudioField id="sku-sep" label="Separator">
              <Select id="sku-sep" options={["-", "_", "none"]} value={v.sep} onChange={set("sep")} />
            </StudioField>
            <NumberField id="sku-abbr" label="Letters per option value" prefix="" value={v.abbr} onChange={set("abbr")} />
            <StudioField id="sku-seq" label="Add a sequence number">
              <Select id="sku-seq" options={["No", "Yes"]} value={v.seq} onChange={set("seq")} />
            </StudioField>
            {v.seq === "Yes" ? (
              <>
                <NumberField id="sku-start" label="Start at" prefix="" value={v.start} onChange={set("start")} />
                <NumberField id="sku-width" label="Digits (leading zeros)" prefix="" value={v.width} onChange={set("width")} />
              </>
            ) : null}
            <NumberField id="sku-max" label="Maximum SKU length (optional)" prefix="" value={v.max} onChange={set("max")} />
            <TextArea id="sku-existing" label="Existing SKUs in your store (to catch clashes)" value={v.existing} onChange={set("existing")} rows={3} hint="Paste from a Shopify product export." />
          </div>
        </Disclosure>
        <div className={s.actions}>
          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnLg}`} onClick={() => setV((o) => ({ ...o, prefix: "MAT", o1: "Black, Blue", o2: "S, L", seq: "Yes" }))}>
            Try an example
          </button>
        </div>
        <p className={s.note}>Runs in your browser. No Shopify login or store access.</p>
      </form>
      <div className={s.output}>
        {!out ? (
          <Empty>Add a prefix and your option values. SKUs appear here as you type.</Empty>
        ) : (
          <div className={s.result} aria-live="polite">
            <Messages tone="bad" items={out.errors} />
            <Messages tone="warn" items={out.warnings} />
            {out.rows.length ? (
              <>
                <span className={s.resultLabel}>
                  {out.rows.length} SKU{out.rows.length === 1 ? "" : "s"}, format {out.rows[0].sku}
                </span>
                <Table columns={["Variant", "SKU", ""]} rows={out.rows.map((r) => [r.variant, <code key="c" style={mono}>{r.sku}</code>, r.clash ? <strong key="x" style={{ color: TONE.bad }}>Clash</strong> : ""])} minWidth={320} />
                <div className={s.resultActions}>
                  <CopyButton text={out.rows.map((r) => r.sku).join("\n")} slug={slug} label="Copy SKUs" />
                  <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => (downloadFile("skus.csv", ["Variant,SKU", ...out.rows.map((r) => [r.variant, r.sku].map(csvCell).join(","))].join("\n"), "text/csv"), track("tool_download", slug))}>
                    Download CSV
                  </button>
                </div>
                <p className={s.note}>Uniqueness is only checked against this list and any SKUs you pasted, not your live store.</p>
              </>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}

// ---------- 56. Local SEO Keyword Modifier Generator ----------

export function LocalKeywordModifier() {
  const slug = "local-seo-keyword-modifier-generator";
  const [services, setServices] = useState("");
  const [areas, setAreas] = useState("");
  const [extra, setExtra] = useState("");
  const [groups, setGroups] = useState<ModifierGroup[]>(["Service and location", "Questions", "Cost and pricing"]);
  const split = (x: string) => x.split(/[,\n]/).map((y) => y.trim()).filter(Boolean);
  const out = useMemo(() => localKeywords(split(services), split(areas), groups, split(extra)), [services, areas, groups, extra]);
  const ready = split(services).length && split(areas).length;
  const all = out.flatMap((g) => g.keywords);
  return (
    <section className={s.tool} aria-label="Local SEO keyword modifier generator">
      <form className={s.panel} onSubmit={(e) => e.preventDefault()}>
        <div className={s.group}>
          <Text id="lk-s" label="Services (comma separated)" value={services} onChange={setServices} placeholder="basement waterproofing, basement leak repair" />
          <Text id="lk-a" label="City or areas you actually serve" value={areas} onChange={setAreas} placeholder="Lahore" />
          <StudioField id="lk-g" label="Modifier groups" as="group">
            <div style={{ display: "grid", gap: 6 }}>
              {(Object.keys(MODIFIER_GROUPS) as ModifierGroup[]).map((g) => (
                <label key={g} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 15 }}>
                  <input type="checkbox" checked={groups.includes(g)} onChange={(e) => setGroups((o) => (e.target.checked ? [...o, g] : o.filter((x) => x !== g)))} /> {g}
                </label>
              ))}
            </div>
          </StudioField>
        </div>
        <Disclosure label="More options">
          <Text id="lk-x" label="Your own modifiers" value={extra} onChange={setExtra} placeholder="licensed, residential" />
        </Disclosure>
        <div className={s.actions}>
          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnLg}`} onClick={() => (setServices("basement waterproofing"), setAreas("Lahore"))}>
            Try an example
          </button>
        </div>
        <p className={s.note}>Runs in your browser. Only include services you offer and places you genuinely cover.</p>
      </form>
      <div className={s.output}>
        {!ready ? (
          <Empty>Add a service and an area. Keyword ideas appear here.</Empty>
        ) : (
          <div className={s.result} aria-live="polite">
            <p className={s.note} style={{ marginTop: 0, fontWeight: 600 }}>Ideas only: no verified search volume, ranking difficulty or Google autocomplete data.</p>
            {out.map((g) => (
              <div key={g.group} style={{ marginBottom: 12 }}>
                <span className={s.resultLabel}>
                  {g.group} ({g.keywords.length})
                </span>
                <ul style={{ margin: "6px 0 0", paddingLeft: 20, display: "grid", gap: 2, fontSize: 15, lineHeight: 1.55 }}>
                  {g.keywords.slice(0, 60).map((k) => (
                    <li key={k}>{k}</li>
                  ))}
                </ul>
                {g.keywords.length > 60 ? <p className={s.note}>And {g.keywords.length - 60} more in the download.</p> : null}
              </div>
            ))}
            <div className={s.resultActions}>
              <CopyButton text={all.join("\n")} slug={slug} label="Copy all" />
              <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => (downloadFile("local-keyword-ideas.csv", ["Group,Keyword idea", ...out.flatMap((g) => g.keywords.map((k) => [g.group, k].map(csvCell).join(",")))].join("\n"), "text/csv"), track("tool_download", slug))}>
                Download CSV
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ---------- 58. MRR Calculator ----------

export function MrrCalculator() {
  const [plans, setPlans] = useState<{ name: string; price: string; interval: "month" | "year"; customers: string; discount: string }[]>([{ name: "Monthly", price: "20", interval: "month", customers: "100", discount: "" }]);
  const [cur, setCur] = useState("$");
  const parsed: Plan[] = plans.map((p) => ({ name: p.name, price: num(p.price), interval: p.interval, customers: num(p.customers), discount: num(p.discount) }));
  const r = mrr(parsed);
  const money = (n: number) => `${cur}${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const setP = (i: number, k: string, v: string) => setPlans((o) => o.map((p, j) => (j === i ? { ...p, [k]: v } : p)));
  return (
    <section className={s.tool} aria-label="MRR calculator">
      <form className={s.panel} onSubmit={(e) => e.preventDefault()}>
        {plans.map((p, i) => (
          <div key={i} className={s.group} style={{ borderBottom: i < plans.length - 1 ? "1px solid #EEEBE6" : undefined, paddingBottom: 12 }}>
            {plans.length > 1 ? <Text id={`mrr-n-${i}`} label="Plan name" value={p.name} onChange={(v) => setP(i, "name", v)} /> : null}
            <NumberField id={`mrr-p-${i}`} label="Plan price" prefix={cur} value={p.price} onChange={(v) => setP(i, "price", v)} />
            <StudioField id={`mrr-i-${i}`} label="Billing interval" as="group">
              <Segmented id={`mrr-i-${i}`} options={["month", "year"]} labels={{ month: "Monthly", year: "Yearly" }} value={p.interval} onChange={(v) => setP(i, "interval", v)} />
            </StudioField>
            <NumberField id={`mrr-c-${i}`} label="Active subscribers" prefix="" value={p.customers} onChange={(v) => setP(i, "customers", v)} />
          </div>
        ))}
        <div className={s.actions} style={{ justifyContent: "flex-start" }}>
          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => setPlans((o) => [...o, { name: `Plan ${o.length + 1}`, price: "", interval: "year", customers: "", discount: "" }])} disabled={plans.length >= 20}>
            Add a plan
          </button>
          {plans.length > 1 ? (
            <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => setPlans((o) => o.slice(0, -1))}>
              Remove last
            </button>
          ) : null}
        </div>
        <Disclosure label="More options">
          <div className={s.group}>
            <Text id="mrr-cur" label="Currency symbol" value={cur} onChange={setCur} />
            {plans.map((p, i) => (
              <NumberField key={i} id={`mrr-d-${i}`} label={`Recurring discount on ${p.name || `plan ${i + 1}`}`} prefix="%" value={p.discount} onChange={(v) => setP(i, "discount", v)} />
            ))}
          </div>
        </Disclosure>
        <p className={s.note}>Runs in your browser. Leave out one time setup fees and refunds: MRR counts recurring subscription revenue only.</p>
      </form>
      <div className={s.output}>
        <div className={s.result} aria-live="polite">
          <span className={s.resultLabel}>Monthly recurring revenue</span>
          <p style={big}>{money(r.mrr)}</p>
          <Messages tone="bad" items={r.errors} />
          <Rows rows={[...r.rows.map((x) => [`${x.name} (${x.monthly ? money(x.monthly) : money(0)} a month each)`, money(x.mrr)] as [string, string]), ["Total MRR", money(r.mrr), "strong"], ["Annualised run rate (MRR × 12)", money(r.arr)]]} />
          <p className={s.note}>Annual plans are divided by 12. This is a normalised run rate, not cash collected or recognised revenue.</p>
        </div>
      </div>
    </section>
  );
}

// ---------- 59. Customer Retention Rate Calculator ----------

export function RetentionCalculator() {
  const [v, setV] = useState({ s: "200", n: "50", e: "210" });
  const set = (k: "s" | "n" | "e") => (x: string) => setV((o) => ({ ...o, [k]: x }));
  const r = retention(num(v.s), num(v.n), num(v.e));
  return (
    <section className={s.tool} aria-label="Customer retention rate calculator">
      <form className={s.panel} onSubmit={(e) => e.preventDefault()}>
        <div className={s.group}>
          <NumberField id="rt-s" label="Customers at the start (S)" prefix="" value={v.s} onChange={set("s")} />
          <NumberField id="rt-n" label="New customers during the period (N)" prefix="" value={v.n} onChange={set("n")} />
          <NumberField id="rt-e" label="Customers at the end (E)" prefix="" value={v.e} onChange={set("e")} />
        </div>
        <p className={s.note}>Runs in your browser. Use one period and one definition of an active customer for all three numbers.</p>
      </form>
      <div className={s.output}>
        <div className={s.result} aria-live="polite">
          <span className={s.resultLabel}>Customer retention rate</span>
          <p style={{ ...big, color: r.warning ? TONE.bad : undefined }}>{r.rate === null ? "Check your numbers" : `${r.rate}%`}</p>
          {r.warning ? <p className={s.countOver}>{r.warning}</p> : null}
          {r.rate !== null ? (
            <Rows rows={[["Existing customers still with you (E − N)", r.retained.toLocaleString(), "strong"], ["Existing customers lost", Math.max(0, r.lost).toLocaleString(), r.lost > 0 ? "bad" : undefined], ["Implied customer churn", `${Math.round((100 - r.rate) * 100) / 100}%`]]} />
          ) : null}
          <p className={s.note}>Retention = (E − N) ÷ S × 100. Reactivations and account merges can break this simple formula; cohort data is more precise.</p>
        </div>
      </div>
    </section>
  );
}

// ---------- 60. A/B Test Sample Size Calculator ----------

export function AbSampleSizeCalculator() {
  const [v, setV] = useState({ base: "5", mde: "10", power: "80", alpha: "5", ratio: "1", daily: "" });
  const set = (k: keyof typeof v) => (x: string) => setV((o) => ({ ...o, [k]: x }));
  const r = abSampleSize(num(v.base), num(v.mde), { power: num(v.power) / 100, alpha: num(v.alpha) / 100, ratio: num(v.ratio) || 1, daily: num(v.daily) });
  return (
    <section className={s.tool} aria-label="A/B test sample size calculator">
      <form className={s.panel} onSubmit={(e) => e.preventDefault()}>
        <div className={s.group}>
          <NumberField id="ab-base" label="Baseline conversion rate" prefix="%" value={v.base} onChange={set("base")} />
          <NumberField id="ab-mde" label="Minimum detectable effect (relative)" prefix="%" value={v.mde} onChange={set("mde")} hint={num(v.base) > 0 ? `${v.mde || 0}% relative means ${v.base}% → ${((num(v.base) * (1 + num(v.mde) / 100)) || 0).toFixed(2)}%.` : undefined} />
        </div>
        <Disclosure label="More options">
          <div className={s.group}>
            <NumberField id="ab-power" label="Statistical power" prefix="%" value={v.power} onChange={set("power")} />
            <NumberField id="ab-alpha" label="Significance level (two sided)" prefix="%" value={v.alpha} onChange={set("alpha")} hint="5% is the same as 95% confidence." />
            <NumberField id="ab-ratio" label="Variant to control traffic ratio" prefix="" value={v.ratio} onChange={set("ratio")} hint="1 means an even 50/50 split." />
            <NumberField id="ab-daily" label="Eligible visitors a day (optional)" prefix="" value={v.daily} onChange={set("daily")} />
          </div>
        </Disclosure>
        <p className={s.note}>Runs in your browser. Two sided z test for two independent proportions, normal approximation.</p>
      </form>
      <div className={s.output}>
        <div className={s.result} aria-live="polite">
          <span className={s.resultLabel}>Visitors needed per variant</span>
          <p style={{ ...big, color: r.error ? TONE.bad : undefined }}>{r.error ? "Check your inputs" : r.control.toLocaleString()}</p>
          {r.error ? <p className={s.countOver}>{r.error}</p> : null}
          {!r.error ? (
            <Rows
              rows={[
                ["Control", r.control.toLocaleString()],
                ["Variant", r.treatment.toLocaleString()],
                ["Total", r.total.toLocaleString(), "strong"],
                ["Baseline → expected variant rate", `${(r.baseline * 100).toFixed(2)}% → ${(r.variant * 100).toFixed(2)}%`],
                ["Power, significance", `${v.power}%, ${v.alpha}% two sided`],
                ...(r.days !== null ? ([["Estimated duration", `${r.days} day${r.days === 1 ? "" : "s"}`]] as [string, string][]) : []),
              ]}
            />
          ) : null}
          <Messages tone="warn" items={r.warnings} />
          <p className={s.note}>A planning estimate, not a guarantee of a significant result. Decide the sample size up front and don&apos;t stop early when results look good: repeated peeking inflates false positives.</p>
        </div>
      </div>
    </section>
  );
}
