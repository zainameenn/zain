"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { checkPage, extractFacts, type Finding, type PageFacts } from "@/lib/tools/seo/html";
import { csvCell, downloadFile, track } from "@/lib/tools/v3/track";
import { Disclosure, Segmented, Select, Spinner, StudioField } from "./controls";
import { CopyButton, mono } from "./V3Batch3";
import { Empty, TONE, Table, Text, TextArea } from "./V3Batch4";
import { Rows } from "./V3Utilities";
import s from "./studio.module.css";

// The October 2026 SEO tools. Each one asks /api/tools/seo for real data: a safe page fetch, or a free
// data source behind the monthly quota ledger. Results show their source and check time. Missing data
// is shown as missing, never as zero.

const COUNTRIES = ["US", "GB", "CA", "AU", "IN", "DE", "FR", "ES", "IT", "NL", "BR", "MX", "JP", "PK", "AE", "ZA", "NZ", "IE", "SG"];
const when = (iso?: string) => (iso ? new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }) : "");

type CheckState<T> = { res: T | null; error: string; quota: boolean; loading: boolean; slow: 0 | 1 | 2 };

/** Shared request lifecycle: no double submits, honest waiting messages, results get focus. */
function useCheck<T>(slug: string, formRef: RefObject<HTMLFormElement | null>, resultRef: RefObject<HTMLDivElement | null>) {
  const [st, set] = useState<CheckState<T>>({ res: null, error: "", quota: false, loading: false, slow: 0 });
  useEffect(() => {
    if (!st.loading) return;
    const a = setTimeout(() => set((x) => ({ ...x, slow: 1 })), 5000);
    const b = setTimeout(() => set((x) => ({ ...x, slow: 2 })), 10000);
    return () => (clearTimeout(a), clearTimeout(b));
  }, [st.loading]);
  useEffect(() => {
    if (st.res && resultRef.current) {
      resultRef.current.focus({ preventScroll: true });
      if (window.matchMedia("(max-width: 900px)").matches) resultRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [st.res, resultRef]);
  const run = async (payload: Record<string, unknown>) => {
    if (st.loading) return;
    set((x) => ({ ...x, loading: true, error: "", quota: false, slow: 0 }));
    track("tool_generate", slug, { action: String(payload.action) });
    try {
      const r = await fetch("/api/tools/seo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const body = await r.json().catch(() => ({}));
      if (!r.ok || body.error) {
        track("tool_error", slug);
        // Keep the last good result on screen; just explain what went wrong.
        set((x) => ({ ...x, loading: false, error: (body.error ?? "The check didn't work. Try again.") + (body.renews ? ` It renews on ${body.renews}.` : ""), quota: Boolean(body.quota) }));
      } else {
        track("tool_success", slug);
        set({ res: body as T, error: "", quota: false, loading: false, slow: 0 });
      }
    } catch {
      set((x) => ({ ...x, loading: false, error: "The check didn't work. Check your connection and try again." }));
    }
  };
  const setLocal = (res: T) => set({ res, error: "", quota: false, loading: false, slow: 0 });
  const edit = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    formRef.current?.querySelector<HTMLElement>("input,textarea")?.focus({ preventScroll: true });
  };
  return { ...st, run, setLocal, edit };
}

function Status({ loading, slow, error, quota }: { loading: boolean; slow: number; error: string; quota: boolean }) {
  return (
    <div role="status" aria-live="polite">
      {loading && slow === 1 ? <p className={s.note}>Still working. Some sites take a few seconds to answer.</p> : null}
      {loading && slow === 2 ? <p className={s.note}>Nearly there. Slow sites can take up to 30 seconds; your inputs are kept.</p> : null}
      {error ? (
        <p className={s.countOver} style={quota ? { color: TONE.warn } : undefined}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ResultBar({ label, onEdit, children }: { label: ReactNode; onEdit: () => void; children?: ReactNode }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
      <span className={s.resultLabel}>{label}</span>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {children}
        <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={onEdit}>
          Edit inputs
        </button>
      </div>
    </div>
  );
}

function SubmitRow({ loading, disabled, label, example }: { loading: boolean; disabled: boolean; label: string; example?: () => void }) {
  return (
    <div className={s.actions}>
      {example ? (
        <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnLg}`} onClick={example}>
          Try an example
        </button>
      ) : null}
      <button type="submit" className={`${s.btn} ${s.btnPrimary} ${s.btnLg}`} disabled={loading || disabled} aria-busy={loading}>
        {loading ? <Spinner /> : null}
        {label}
      </button>
    </div>
  );
}

const Source = ({ children }: { children: ReactNode }) => <p className={s.note} style={{ marginTop: 12 }}>{children}</p>;

const STATUS_WORD = { bad: "Fix", warn: "Review", info: "Note", ok: "OK" } as const;

/** Findings as a stacked list: readable on a phone, with the evidence under each check. */
function FindingList({ list }: { list: Finding[] }) {
  return (
    <ul style={{ listStyle: "none", margin: "8px 0 12px", padding: 0, border: "1px solid #DDDAD3", borderRadius: 12 }}>
      {list.map((f, i) => (
        <li key={f.label + i} style={{ padding: "12px 14px", borderTop: i ? "1px solid #EEEBE6" : undefined }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "4px 10px" }}>
            <strong style={{ fontSize: 15 }}>{f.label}</strong>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", color: TONE[f.status] }}>{STATUS_WORD[f.status]}</span>
          </div>
          <p style={{ margin: "4px 0 0", fontSize: 14, lineHeight: 1.5 }}>{f.text}</p>
          {f.evidence ? <p style={{ ...mono, margin: "6px 0 0", fontSize: 13, color: TONE.info, wordBreak: "break-word" }}>{f.evidence}</p> : null}
        </li>
      ))}
    </ul>
  );
}

/** Label and value pairs that wrap long URLs instead of widening the page. */
function Facts({ rows }: { rows: [string, string, boolean?][] }) {
  return (
    <dl style={{ display: "grid", gridTemplateColumns: "minmax(0, auto) minmax(0, 1fr)", gap: "6px 14px", margin: "0 0 12px", fontSize: 14 }}>
      {rows.map(([k, v, bad]) => (
        <div key={k} style={{ display: "contents" }}>
          <dt style={{ fontWeight: 600 }}>{k}</dt>
          <dd style={{ margin: 0, wordBreak: "break-all", color: bad ? TONE.bad : undefined }}>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

// ---------- Website Metadata Extractor ----------

type MetaFacts = Omit<PageFacts, "links" | "images"> & { linkCount?: number; imageCount?: number };
type MetaResult = { requestedUrl?: string; finalUrl?: string; httpStatus?: number; redirects?: number; xRobots?: string | null; checkedAt?: string; facts: MetaFacts; pasted?: boolean };

export function MetadataExtractor() {
  const slug = "website-metadata-extractor";
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const c = useCheck<MetaResult>(slug, formRef, resultRef);
  const [mode, setMode] = useState("Public URL");
  const [url, setUrl] = useState("");
  const [html, setHtml] = useState("");
  const submit = () => {
    if (mode === "Paste HTML") {
      if (html.length > 2_000_000) return;
      const f = extractFacts(html, url.trim() || undefined);
      c.setLocal({ facts: { ...f, linkCount: f.links.length, imageCount: f.images.length }, pasted: true });
      return;
    }
    c.run({ action: "metadata", url });
  };
  const f = c.res?.facts;
  const rows: [string, string][] = f
    ? [
        ["Title", f.title.join(" | ") || "Not found"],
        ["Meta description", f.description.join(" | ") || "Not found"],
        ["Canonical", f.canonicals.join(" | ") || "Not found"],
        ["Robots meta", [...f.robots, ...f.googlebot].join(" | ") || "Not found"],
        ...(c.res?.xRobots !== undefined ? [["X-Robots-Tag header", c.res.xRobots || "Not sent"] as [string, string]] : []),
        ["Language", f.lang ?? "Not found"],
        ["Viewport", f.viewport ?? "Not found"],
        ["Charset", f.charset ?? "Not found"],
        ...f.og.map(([k, v]) => [k, v] as [string, string]),
        ...f.twitter.map(([k, v]) => [k, v] as [string, string]),
        ...f.hreflang.map((h) => [`hreflang ${h.lang}`, h.href] as [string, string]),
        ["H1", f.headings.filter((h) => h.level === 1).map((h) => h.text).join(" | ") || "Not found"],
        ["JSON-LD blocks", String(f.jsonLdBlocks)],
      ]
    : [];
  const asText = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  return (
    <section className={s.tool} aria-label="Website metadata extractor">
      <form ref={formRef} className={s.panel} onSubmit={(e) => (e.preventDefault(), submit())}>
        <div className={s.group}>
          <StudioField id="me-mode" label="How do you want to check?" as="group">
            <Segmented id="me-mode" options={["Public URL", "Paste HTML"]} value={mode} onChange={setMode} />
          </StudioField>
          <Text id="me-url" label={mode === "Public URL" ? "Page URL" : "Page URL (optional, to resolve relative links)"} value={url} onChange={setUrl} placeholder="https://example.com/blog/post" />
          {mode === "Paste HTML" ? <TextArea id="me-html" label="Page HTML" value={html} onChange={setHtml} rows={8} placeholder="<html>...</html>" /> : null}
        </div>
        <SubmitRow loading={c.loading} disabled={mode === "Public URL" ? !url.trim() : !html.trim()} label="Extract metadata" example={() => (setMode("Public URL"), setUrl("https://www.zainameen.com/tools"))} />
        {html.length > 2_000_000 ? <p className={s.countOver}>That HTML is over 2 MB. Paste just the head.</p> : null}
        <p className={s.note}>{mode === "Public URL" ? "Our server fetches the public page once and reads its HTML. Tags added later by JavaScript won't appear. Private addresses are refused. Nothing is stored." : "Pasted HTML is read in your browser and isn't sent anywhere."}</p>
      </form>
      <div className={s.output}>
        <Status loading={c.loading} slow={c.slow} error={c.error} quota={c.quota} />
        {!c.res ? (
          !c.error ? <Empty>Enter a public URL to see the metadata in its HTML.</Empty> : null
        ) : (
          <div className={s.result} ref={resultRef} tabIndex={-1} aria-live="polite">
            <ResultBar label="Metadata found" onEdit={c.edit}>
              <CopyButton text={asText} slug={slug} label="Copy all" primary={false} />
              <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => (track("tool_download", slug), downloadFile("metadata.csv", ["Field,Value", ...rows.map((r) => r.map(csvCell).join(","))].join("\n"), "text/csv"))}>
                Download CSV
              </button>
            </ResultBar>
            {c.res.finalUrl ? <Facts rows={[["Final URL", c.res.finalUrl], ["HTTP status", String(c.res.httpStatus), (c.res.httpStatus ?? 0) >= 400], ["Redirects followed", String(c.res.redirects ?? 0)]]} /> : null}
            <Table columns={["Field", "Value found"]} minWidth={0} rows={rows.map(([k, v]) => [<strong key="k">{k}</strong>, <span key="v" style={{ wordBreak: "break-word", color: v === "Not found" ? TONE.info : undefined }}>{v}</span>])} />
            <Source>{c.res.pasted ? "Read from the HTML you pasted." : `Read from the page's HTML response, ${when(c.res.checkedAt)}.`} A missing description isn&apos;t automatically a problem, and a canonical is a hint, not a guarantee.</Source>
          </div>
        )}
      </div>
    </section>
  );
}

// ---------- Website SEO Checker ----------

type PageResult = { finalUrl: string; httpStatus: number; redirects: number; checkedAt: string; findings: Finding[]; headings: { level: number; text: string }[] };

export function WebsiteSeoChecker() {
  const slug = "website-seo-checker";
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const c = useCheck<PageResult>(slug, formRef, resultRef);
  const [url, setUrl] = useState("");
  const [keyword, setKeyword] = useState("");
  const order = { bad: 0, warn: 1, info: 2, ok: 3 } as const;
  const list = c.res ? [...c.res.findings].sort((a, b) => Math.min(order[a.status], 2) - Math.min(order[b.status], 2)) : [];
  const issues = list.filter((f) => f.status === "bad" || f.status === "warn").length;
  return (
    <section className={s.tool} aria-label="Website SEO checker">
      <form ref={formRef} className={s.panel} onSubmit={(e) => (e.preventDefault(), c.run({ action: "page-check", url, keyword }))}>
        <div className={s.group}>
          <Text id="sc-url" label="Public page URL" value={url} onChange={setUrl} placeholder="https://example.com/services/seo" />
        </div>
        <Disclosure label="More options">
          <div className={s.group}>
            <Text id="sc-kw" label="Target keyword (optional)" value={keyword} onChange={setKeyword} placeholder="seo services for saas" hint="Only used to show where the exact phrase appears." />
          </div>
        </Disclosure>
        <SubmitRow loading={c.loading} disabled={!url.trim()} label="Check this page" example={() => setUrl("https://www.zainameen.com/services/seo-specialist-for-saas")} />
        <p className={s.note}>Checks one page&apos;s HTML response. Not a full site crawl and not a Google indexing verdict. Private addresses are refused. Nothing is stored.</p>
      </form>
      <div className={s.output}>
        <Status loading={c.loading} slow={c.slow} error={c.error} quota={c.quota} />
        {!c.res ? (
          !c.error ? <Empty>Enter a public URL to see what its HTML shows: title, description, headings, canonical, indexing directives and more.</Empty> : null
        ) : (
          <div className={s.result} ref={resultRef} tabIndex={-1} aria-live="polite">
            <ResultBar label={issues ? `${issues} thing${issues === 1 ? "" : "s"} worth a look` : "No issues found in these checks"} onEdit={c.edit}>
              <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => (track("tool_download", slug), downloadFile("seo-check.csv", ["Check,Status,Finding,Evidence", ...list.map((f) => [f.label, f.status, f.text, f.evidence ?? ""].map(csvCell).join(","))].join("\n"), "text/csv"))}>
                Download CSV
              </button>
            </ResultBar>
            <Facts rows={[["Final URL", c.res.finalUrl], ["HTTP status", String(c.res.httpStatus), c.res.httpStatus >= 400], ["Redirects followed", String(c.res.redirects)]]} />
            <FindingList list={list} />
            {c.res.headings.length ? (
              <Disclosure label={`Heading outline (${c.res.headings.length})`}>
                <ol style={{ margin: 0, paddingLeft: 0, listStyle: "none", fontSize: 14, lineHeight: 1.6 }}>
                  {c.res.headings.map((h, i) => (
                    <li key={i} style={{ paddingLeft: (h.level - 1) * 14 }}>
                      <span style={{ color: TONE.info }}>H{h.level}</span> {h.text}
                    </li>
                  ))}
                </ol>
              </Disclosure>
            ) : null}
            <Source>From the page&apos;s HTML response, {when(c.res.checkedAt)}. These are checks with evidence, not a score, and fixing them doesn&apos;t guarantee rankings.</Source>
          </div>
        )}
      </div>
    </section>
  );
}

/** Pasted HTML version of the checker runs in the browser; exported for tests. */
export const checkPastedHtml = (html: string, url?: string) => checkPage(extractFacts(html, url), { finalUrl: url });

// ---------- Broken Link Checker ----------

type LinkRow = { href: string; text: string; status: number | null; final: string; error?: string; redirects: number };
type LinkResult = { pageUrl: string; found: number; tested: number; skipped: number; results: LinkRow[]; checkedAt: string };

// 401, 403, 429 and LinkedIn's 999 usually mean the site refused an automated request, not a dead link.
const BLOCKED = new Set([401, 403, 429, 999]);
const linkState = (r: LinkRow) => (r.status === null ? (r.error?.includes("too long") ? "Timed out" : "Couldn't reach") : BLOCKED.has(r.status) ? "Blocked our check" : r.status >= 400 ? "Broken" : r.redirects ? "Redirects" : "OK");

export function BrokenLinkChecker() {
  const slug = "broken-link-checker";
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const c = useCheck<LinkResult>(slug, formRef, resultRef);
  const [url, setUrl] = useState("");
  const [scope, setScope] = useState("All links");
  const [show, setShow] = useState("Problems");
  const rows = c.res ? c.res.results.filter((r) => show === "All" || linkState(r) !== "OK") : [];
  const broken = c.res?.results.filter((r) => linkState(r) === "Broken").length ?? 0;
  const unreachable = c.res?.results.filter((r) => r.status === null || BLOCKED.has(r.status)).length ?? 0;
  return (
    <section className={s.tool} aria-label="Broken link checker">
      <form ref={formRef} className={s.panel} onSubmit={(e) => (e.preventDefault(), c.run({ action: "links", url, scope: scope === "Internal only" ? "internal" : "all" }))}>
        <div className={s.group}>
          <Text id="bl-url" label="Public page URL" value={url} onChange={setUrl} placeholder="https://example.com/blog/post" />
          <StudioField id="bl-scope" label="Which links?" as="group">
            <Segmented id="bl-scope" options={["All links", "Internal only"]} value={scope} onChange={setScope} />
          </StudioField>
        </div>
        <SubmitRow loading={c.loading} disabled={!url.trim()} label="Check links" example={() => setUrl("https://www.zainameen.com/tools")} />
        <p className={s.note}>Checks up to 40 unique links on one page. Some sites block automated requests, so a timeout or refusal is reported separately from a real 404. Private addresses are refused. Nothing is stored.</p>
      </form>
      <div className={s.output}>
        <Status loading={c.loading} slow={c.slow} error={c.error} quota={c.quota} />
        {!c.res ? (
          !c.error ? <Empty>Enter a page URL to test the links on it.</Empty> : null
        ) : (
          <div className={s.result} ref={resultRef} tabIndex={-1} aria-live="polite">
            <ResultBar label={`${broken} broken, ${unreachable} couldn't be checked, of ${c.res.tested} tested`} onEdit={c.edit}>
              <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => (track("tool_download", slug), downloadFile("links.csv", ["Source page,Link,Anchor text,Result,Status,Final URL,Checked", ...c.res!.results.map((r) => [c.res!.pageUrl, r.href, r.text, linkState(r), r.status ?? r.error ?? "", r.final, c.res!.checkedAt].map(csvCell).join(","))].join("\n"), "text/csv"))}>
                Download CSV
              </button>
            </ResultBar>
            {c.res.skipped ? <p className={s.note}>{c.res.found} unique links found; the first {c.res.tested} were tested and {c.res.skipped} were skipped.</p> : null}
            <Segmented id="bl-show" options={["Problems", "All"]} value={show} onChange={setShow} />
            {rows.length ? (
              <Table
                columns={["Link", "Anchor text", "Result"]}
                rows={rows.map((r) => [
                  <span key="h" style={{ ...mono, fontSize: 13, wordBreak: "break-all" }}>{r.href}</span>,
                  r.text || <span key="t" style={{ color: TONE.info }}>No text</span>,
                  <span key="s" style={{ color: linkState(r) === "Broken" ? TONE.bad : r.status === null || BLOCKED.has(r.status) ? TONE.warn : TONE.info }}>
                    {linkState(r)}
                    {r.status !== null ? (linkState(r) === "Redirects" ? `, final ${r.status}` : ` (${r.status})`) : ""}
                    {r.error ? `: ${r.error}` : ""}
                    {r.redirects && r.final !== r.href ? <span style={{ display: "block", ...mono, fontSize: 12, wordBreak: "break-all" }}>to {r.final}</span> : null}
                  </span>,
                ])}
              />
            ) : (
              <p className={s.note}>No problems among the links tested.</p>
            )}
            <Source>Tested from our server, {when(c.res.checkedAt)}. Results can differ from a browser when a site blocks automated requests.</Source>
          </div>
        )}
      </div>
    </section>
  );
}

// ---------- Sitemap URL Status Checker ----------

type SitemapRow = { url: string; status: number | null; error?: string; redirectTo?: string | null; canonical?: string | null; canonicalElsewhere?: boolean; noindex?: boolean };
type SitemapResult = { sitemapUrl: string; index: boolean; children: string[]; listed: number; tested: number; skipped: number; results: SitemapRow[]; checkedAt: string };

const sitemapIssue = (r: SitemapRow) => (r.status === null ? `Couldn't reach: ${r.error}` : r.status >= 400 ? `Returns ${r.status}` : r.status >= 300 ? `Redirects (${r.status})` : r.noindex ? "Marked noindex" : r.canonicalElsewhere ? "Canonical points elsewhere" : "");

export function SitemapUrlStatusChecker() {
  const slug = "sitemap-url-status-checker";
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const c = useCheck<SitemapResult>(slug, formRef, resultRef);
  const [url, setUrl] = useState("");
  const [show, setShow] = useState("Problems");
  const rows = c.res ? c.res.results.filter((r) => show === "All" || sitemapIssue(r)) : [];
  const problems = c.res?.results.filter((r) => sitemapIssue(r)).length ?? 0;
  return (
    <section className={s.tool} aria-label="Sitemap URL status checker">
      <form ref={formRef} className={s.panel} onSubmit={(e) => (e.preventDefault(), c.run({ action: "sitemap-status", url }))}>
        <div className={s.group}>
          <Text id="su-url" label="XML sitemap URL" value={url} onChange={setUrl} placeholder="https://example.com/sitemap.xml" />
        </div>
        <SubmitRow loading={c.loading} disabled={!url.trim()} label="Audit sitemap URLs" example={() => setUrl("https://www.zainameen.com/sitemap.xml")} />
        <p className={s.note}>Tests the first 25 listed URLs (for a sitemap index, from its first three sitemaps) and says how many were skipped. To check the XML structure itself, use the XML Sitemap Validator. Nothing is stored.</p>
      </form>
      <div className={s.output}>
        <Status loading={c.loading} slow={c.slow} error={c.error} quota={c.quota} />
        {!c.res ? (
          !c.error ? <Empty>Enter a sitemap URL to test the pages it lists.</Empty> : null
        ) : (
          <div className={s.result} ref={resultRef} tabIndex={-1} aria-live="polite">
            <ResultBar label={`${problems} of ${c.res.tested} tested URLs worth a look`} onEdit={c.edit}>
              <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => (track("tool_download", slug), downloadFile("sitemap-urls.csv", ["URL,Status,Issue,Redirects to,Canonical,Checked", ...c.res!.results.map((r) => [r.url, r.status ?? r.error ?? "", sitemapIssue(r), r.redirectTo ?? "", r.canonical ?? "", c.res!.checkedAt].map(csvCell).join(","))].join("\n"), "text/csv"))}>
                Download CSV
              </button>
            </ResultBar>
            <p className={s.note}>
              {c.res.listed} URLs read{c.res.index ? ` from ${c.res.children.length} child sitemap${c.res.children.length === 1 ? "" : "s"} of an index` : ""}. {c.res.tested} tested{c.res.skipped ? `, ${c.res.skipped} skipped` : ""}.
            </p>
            <Segmented id="su-show" options={["Problems", "All"]} value={show} onChange={setShow} />
            {rows.length ? (
              <Table
                columns={["URL", "Status", "What we found"]}
                rows={rows.map((r) => [
                  <span key="u" style={{ ...mono, fontSize: 13, wordBreak: "break-all" }}>{r.url}</span>,
                  r.status ?? "None",
                  <span key="i" style={{ color: sitemapIssue(r) ? TONE.warn : TONE.ok }}>
                    {sitemapIssue(r) || "OK"}
                    {r.redirectTo ? <span style={{ display: "block", ...mono, fontSize: 12, wordBreak: "break-all" }}>to {r.redirectTo}</span> : null}
                    {r.canonicalElsewhere && r.canonical ? <span style={{ display: "block", ...mono, fontSize: 12, wordBreak: "break-all" }}>{r.canonical}</span> : null}
                  </span>,
                ])}
              />
            ) : (
              <p className={s.note}>No problems among the URLs tested.</p>
            )}
            <Source>Tested from our server, {when(c.res.checkedAt)}. A 200 response doesn&apos;t prove Google has indexed a page.</Source>
          </div>
        )}
      </div>
    </section>
  );
}

// ---------- Suggestion tools: Long Tail Keyword Generator and SEO Question Generator ----------

type SuggestResult = { query: string; country: string; suggestions: string[]; source: string; checkedAt: string; cached: boolean };

const MODIFIERS = ["No modifier", "for", "best", "vs", "without", "with", "near me", "free", "alternative", "how to", "for small business", "for beginners"];
const QUESTION_WORDS = ["how", "what", "why", "can", "is", "does", "which", "when", "where", "should", "are", "who"];

function SuggestTool({ slug, kind }: { slug: string; kind: "longtail" | "questions" }) {
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const c = useCheck<SuggestResult>(slug, formRef, resultRef);
  const [seed, setSeed] = useState("");
  const [country, setCountry] = useState("US");
  const [word, setWord] = useState(kind === "questions" ? "how" : "No modifier");
  const [picked, setPicked] = useState<string[]>([]);
  const payload = () => (kind === "questions" ? { action: "suggest", seed, country, prefix: word } : /^(how to)$/.test(word) ? { action: "suggest", seed, country, prefix: word } : { action: "suggest", seed, country, suffix: word === "No modifier" ? "" : word });
  const all = c.res?.suggestions ?? [];
  const seedLc = seed.trim().toLowerCase();
  // Long tail: keep phrases longer than the seed. Questions: keep question shaped suggestions.
  const list = kind === "questions" ? all.filter((x) => /^(how|what|why|can|is|does|which|when|where|should|are|who|do|will)\b/i.test(x)) : all.filter((x) => x.toLowerCase() !== seedLc && x.split(/\s+/).length > Math.max(2, seedLc.split(/\s+/).length));
  const other = all.filter((x) => !list.includes(x));
  const chosen = picked.length ? picked : list;
  return (
    <section className={s.tool} aria-label={kind === "questions" ? "SEO question generator" : "Long tail keyword generator"}>
      <form ref={formRef} className={s.panel} onSubmit={(e) => (e.preventDefault(), setPicked([]), c.run(payload()))}>
        <div className={s.group}>
          <Text id={`${slug}-seed`} label={kind === "questions" ? "Topic or keyword" : "Broad topic"} value={seed} onChange={setSeed} placeholder={kind === "questions" ? "keyword research" : "time tracking software"} />
          <StudioField id={`${slug}-word`} label={kind === "questions" ? "Question word" : "Add a modifier (optional)"}>
            <Select id={`${slug}-word`} options={kind === "questions" ? QUESTION_WORDS : MODIFIERS} value={word} onChange={setWord} />
          </StudioField>
          <StudioField id={`${slug}-cc`} label="Country">
            <Select id={`${slug}-cc`} options={COUNTRIES} value={country} onChange={setCountry} />
          </StudioField>
        </div>
        <SubmitRow loading={c.loading} disabled={seed.trim().length < 2} label={kind === "questions" ? "Find SEO questions" : "Find long tail keywords"} example={() => (setSeed(kind === "questions" ? "keyword research" : "time tracking software"), setWord(kind === "questions" ? "how" : "for"))} />
        <p className={s.note}>Each run makes one request to Brave Search suggestions, a free source with a monthly allowance. Suggestions are real suggested queries, not search volumes or difficulty.</p>
      </form>
      <div className={s.output}>
        <Status loading={c.loading} slow={c.slow} error={c.error} quota={c.quota} />
        {!c.res ? (
          !c.error ? <Empty>{kind === "questions" ? "Enter a topic to see question style search suggestions." : "Enter a topic to see longer, more specific search suggestions."}</Empty> : null
        ) : (
          <div className={s.result} ref={resultRef} tabIndex={-1} aria-live="polite">
            <ResultBar label={`${list.length} ${kind === "questions" ? "questions" : "longer phrases"} for "${c.res.query}"`} onEdit={c.edit}>
              <CopyButton text={chosen.join("\n")} slug={slug} label={picked.length ? `Copy ${picked.length} selected` : "Copy all"} primary={false} />
              <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => (track("tool_download", slug), downloadFile(`${kind}.csv`, ["Suggestion,Source,Country,Query,Checked", ...chosen.map((x) => [x, c.res!.source, c.res!.country, c.res!.query, c.res!.checkedAt].map(csvCell).join(","))].join("\n"), "text/csv"))}>
                Download CSV
              </button>
            </ResultBar>
            {list.length ? (
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 6 }}>
                {list.map((x) => (
                  <li key={x}>
                    <label style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 15 }}>
                      <input type="checkbox" checked={picked.includes(x)} onChange={(e) => setPicked((p) => (e.target.checked ? [...p, x] : p.filter((y) => y !== x)))} />
                      {x}
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={s.note}>{kind === "questions" ? "No question style suggestions came back. Try another question word or a broader topic." : "No longer phrases came back. Try a broader topic or a different modifier."}</p>
            )}
            {other.length ? (
              <Disclosure label={`Other suggestions returned (${other.length})`}>
                <p className={s.note} style={{ marginTop: 0 }}>{other.join(" · ")}</p>
              </Disclosure>
            ) : null}
            <Source>
              Source: {c.res.source}, country {c.res.country}, {when(c.res.checkedAt)}
              {c.res.cached ? " (saved from an earlier identical check)" : ""}. Suggestions show that a phrase is suggested, not how many people search for it.
            </Source>
          </div>
        )}
      </div>
    </section>
  );
}

export const LongTailKeywordGenerator = () => <SuggestTool slug="long-tail-keyword-generator" kind="longtail" />;
export const SeoQuestionGenerator = () => <SuggestTool slug="seo-question-generator" kind="questions" />;

// ---------- Core Web Vitals Checker ----------

type Metric = { p75: number | null; good: number | null; ni: number | null; poor: number | null } | null;
type CwvResult = { url: string; record: { scope: "url" | "origin"; key: string; formFactor: string; period: { first: string; last: string } | null; metrics: Record<string, Metric> } | null; source: string; checkedAt: string };

const CWV = [
  { k: "lcp", name: "Largest Contentful Paint", unit: "s", good: 2500, poor: 4000, fmt: (v: number) => `${(v / 1000).toFixed(2)} s` },
  { k: "inp", name: "Interaction to Next Paint", unit: "ms", good: 200, poor: 500, fmt: (v: number) => `${Math.round(v)} ms` },
  { k: "cls", name: "Cumulative Layout Shift", unit: "", good: 0.1, poor: 0.25, fmt: (v: number) => v.toFixed(2) },
] as const;
const EXTRA = [
  { k: "fcp", name: "First Contentful Paint", fmt: (v: number) => `${(v / 1000).toFixed(2)} s` },
  { k: "ttfb", name: "Time to First Byte", fmt: (v: number) => `${(v / 1000).toFixed(2)} s` },
] as const;
const pct = (n: number | null) => (n === null ? "No data" : `${Math.round(n * 100)}%`);

export function CoreWebVitalsChecker() {
  const slug = "core-web-vitals-checker";
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const c = useCheck<CwvResult>(slug, formRef, resultRef);
  const [url, setUrl] = useState("");
  const [device, setDevice] = useState("Mobile");
  const rec = c.res?.record;
  return (
    <section className={s.tool} aria-label="Core Web Vitals checker">
      <form ref={formRef} className={s.panel} onSubmit={(e) => (e.preventDefault(), c.run({ action: "cwv", url, device: device === "Desktop" ? "desktop" : "mobile" }))}>
        <div className={s.group}>
          <Text id="cw-url" label="Page URL" value={url} onChange={setUrl} placeholder="https://example.com/" />
          <StudioField id="cw-dev" label="Device" as="group">
            <Segmented id="cw-dev" options={["Mobile", "Desktop"]} value={device} onChange={setDevice} />
          </StudioField>
        </div>
        <SubmitRow loading={c.loading} disabled={!url.trim()} label="Check Core Web Vitals" example={() => setUrl("https://www.zainameen.com/")} />
        <p className={s.note}>Real user field data from Google&apos;s Chrome UX Report, a free source with usage limits. Pages with too few visits have no data; we never fill the gap with a guess.</p>
      </form>
      <div className={s.output}>
        <Status loading={c.loading} slow={c.slow} error={c.error} quota={c.quota} />
        {!c.res ? (
          !c.error ? <Empty>Enter a URL to see how real Chrome users experience it.</Empty> : null
        ) : !rec ? (
          <div className={s.result} ref={resultRef} tabIndex={-1} aria-live="polite">
            <ResultBar label="No field data available" onEdit={c.edit} />
            <p className={s.note}>The Chrome UX Report doesn&apos;t have enough real visits for this page or its site on {device.toLowerCase()}. That doesn&apos;t mean the page is fast or slow; it means there&apos;s no public field data. A lab test such as PageSpeed Insights can still diagnose loading issues.</p>
            <Source>Checked {when(c.res.checkedAt)}. Source: {c.res.source}.</Source>
          </div>
        ) : (
          <div className={s.result} ref={resultRef} tabIndex={-1} aria-live="polite">
            <ResultBar label={`Field data, ${device.toLowerCase()}, 75th percentile`} onEdit={c.edit} />
            {rec.scope === "origin" ? <p className={s.note} style={{ color: TONE.warn, marginTop: 0 }}>This URL has too little data on its own, so these are the figures for the whole site ({rec.key}).</p> : null}
            <Table
              columns={["Metric", "p75", "Good", "Needs work", "Poor"]}
              minWidth={460}
              rows={CWV.map((m) => {
                const v = rec.metrics[m.k];
                const rating = v?.p75 == null ? null : v.p75 <= m.good ? "Good" : v.p75 <= m.poor ? "Needs improvement" : "Poor";
                return [
                  <strong key="n">{m.name}</strong>,
                  v?.p75 == null ? <span key="v" style={{ color: TONE.info }}>No data</span> : <span key="v" style={{ color: rating === "Good" ? TONE.ok : rating === "Poor" ? TONE.bad : TONE.warn }}>{m.fmt(v.p75)} ({rating})</span>,
                  pct(v?.good ?? null),
                  pct(v?.ni ?? null),
                  pct(v?.poor ?? null),
                ];
              })}
            />
            <Disclosure label="Other loading metrics">
              <Rows rows={EXTRA.map((m) => [m.name, rec.metrics[m.k]?.p75 == null ? "No data" : m.fmt(rec.metrics[m.k]!.p75!)] as [string, string])} />
            </Disclosure>
            <Source>
              Source: {c.res.source}, field data{rec.period ? ` collected ${rec.period.first} to ${rec.period.last}` : ""}. Checked {when(c.res.checkedAt)}. Thresholds: LCP 2.5 s, INP 200 ms, CLS 0.1. Field data is not a lab test, and good scores don&apos;t guarantee rankings.
            </Source>
          </div>
        )}
      </div>
    </section>
  );
}
