"use client";

import { useMemo, useState } from "react";
import { LOCAL_TYPES, breakEvenRoas, buildLocalBusiness, buildRobotsTxt, chaptersText, checkChapters, formatTime, ltvCac, parseTimestamps, toSeconds, validateSitemap, type ChapterRow, type SitemapReport } from "@/lib/tools/v3/batch3";
import { testRobots } from "@/lib/tools/v3/robots";
import { csvCell, downloadFile, track } from "@/lib/tools/v3/track";
import { Disclosure, Segmented, Select, Spinner, StudioField } from "./controls";
import { NumberField, Rows, num } from "./V3Utilities";
import s from "./studio.module.css";

// Tools 21 to 40 that run in the browser: YouTube chapters (AI optional), robots.txt generator,
// XML sitemap validator, LocalBusiness schema, break-even ROAS and LTV to CAC.

export function CopyButton({ text, slug, label = "Copy", primary = true }: { text: string; slug: string; label?: string; primary?: boolean }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={`${s.btn} ${primary ? s.btnPrimary : s.btnGhost} ${s.btnSm}`}
      onClick={async () => {
        await navigator.clipboard.writeText(text).catch(() => undefined);
        setDone(true);
        track("tool_copy", slug);
        setTimeout(() => setDone(false), 1800);
      }}
    >
      {done ? "Copied" : label}
    </button>
  );
}

export const mono = { fontFamily: "ui-monospace, Menlo, Consolas, monospace", fontSize: 14 } as const;
const big = (danger?: boolean) => ({ margin: "4px 0 2px", fontFamily: "var(--nf-general-sans)", fontSize: 40, fontWeight: 600, letterSpacing: "-0.03em", color: danger ? "#A23B2A" : undefined }) as const;

// ---------- YouTube chapters ----------

export function YouTubeChaptersTool() {
  const slug = "youtube-chapters-generator";
  const [text, setText] = useState("");
  const [duration, setDuration] = useState("");
  const [style, setStyle] = useState("Descriptive");
  const [count, setCount] = useState("6");
  const [rows, setRows] = useState<ChapterRow[]>([]);
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dur = toSeconds(duration);
  const checks = rows.length ? checkChapters(rows, dur) : [];

  const create = () => {
    setError("");
    const { cues, kind, ignored } = parseTimestamps(text);
    if (!cues.length) {
      setRows([]);
      setError("No timestamps found. Chapters need real times like 01:20, from subtitles, your editor or your notes. This tool won't guess them.");
      return;
    }
    let next = cues.map((c) => ({ startSeconds: c.startSeconds, title: c.text.slice(0, 80) }));
    if (kind === "subtitles" && cues.length > 12) {
      setNote(`Found ${cues.length} subtitle lines. Use "Pick chapters with AI" to choose where topics change, or edit the list yourself.`);
    } else setNote(ignored ? `${ignored} line${ignored === 1 ? "" : "s"} without a timestamp were skipped.` : "");
    if (next[0].startSeconds !== 0) {
      next = [{ startSeconds: 0, title: "Introduction" }, ...next];
      setNote((n) => `${n ? `${n} ` : ""}Added a 0:00 chapter, because YouTube requires one.`);
    }
    setRows(next);
    track("tool_calculate", slug);
  };

  const ai = async (mode: "titles" | "pick") => {
    const { cues } = parseTimestamps(text);
    const source = mode === "pick" ? cues : rows.map((r) => ({ startSeconds: r.startSeconds, text: r.title }));
    const sections = JSON.stringify(source.slice(0, 400).map((c) => ({ s: c.startSeconds, t: c.text.slice(0, 200) })));
    if (sections.length > 24000) {
      setError("That transcript is too long for the free AI step. Trim it, or edit the chapter titles yourself.");
      return;
    }
    setLoading(true);
    setError("");
    track("tool_generate", slug, { mode });
    try {
      const res = await fetch("/api/tools/v3", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug, input: { sections, mode, style, count } }) });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.result) {
        setError(typeof body.error === "string" ? body.error : "Something went wrong. Try again in a moment.");
        track("tool_error", slug, { code: String(body.code ?? res.status) });
        return;
      }
      let next = body.result.chapters as ChapterRow[];
      if (next[0]?.startSeconds !== 0) next = [{ startSeconds: 0, title: "Introduction" }, ...next];
      setRows(next);
      track("tool_success", slug);
    } catch {
      setError("We couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const update = (i: number, key: "time" | "title", v: string) =>
    setRows((all) =>
      all.map((r, j) => {
        if (j !== i) return r;
        if (key === "title") return { ...r, title: v };
        const sec = toSeconds(v);
        return sec === null ? r : { ...r, startSeconds: sec };
      }),
    );
  const output = chaptersText(rows);
  const subtitles = /-->/.test(text);

  return (
    <section className={s.tool} aria-label="YouTube chapter generator">
      <form
        className={s.panel}
        onSubmit={(e) => {
          e.preventDefault();
          create();
        }}
      >
        <div className={s.group}>
          <StudioField id="yc-text" label="Paste timestamps or a timestamped transcript" hint="Lines like 01:20 The problem, or an SRT or WebVTT subtitle file.">
            <textarea id="yc-text" className={`${s.input} ${s.textarea}`} rows={9} value={text} onChange={(e) => setText(e.target.value)} spellCheck={false} style={mono} placeholder={"00:00 Welcome\n01:20 The problem\n03:45 Test results\n06:30 Conclusion"} />
          </StudioField>
          <StudioField id="yc-dur" label="Video length (optional)" hint="Like 7:15. Used to check the last chapter.">
            <input id="yc-dur" className={s.input} value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="7:15" />
          </StudioField>
        </div>
        <Disclosure label="More options">
          <div className={s.group}>
            <StudioField id="yc-style" label="AI title style" as="group">
              <Segmented id="yc-style" options={["Descriptive", "Short"]} value={style} onChange={setStyle} />
            </StudioField>
            <StudioField id="yc-count" label="Chapters to aim for when picking from subtitles">
              <Select id="yc-count" options={["4", "5", "6", "8", "10", "12"]} value={count} onChange={setCount} />
            </StudioField>
          </div>
        </Disclosure>
        <div className={s.actions}>
          <button type="submit" className={`${s.btn} ${s.btnPrimary} ${s.btnLg}`}>
            Create YouTube Chapters
          </button>
          <button
            type="button"
            className={`${s.btn} ${s.btnGhost} ${s.btnLg}`}
            onClick={() => {
              setText("00:00 Welcome\n01:20 The problem\n03:45 Test results\n06:30 Conclusion");
              setDuration("7:15");
            }}
          >
            Try an example
          </button>
        </div>
        <p className={s.note}>Times are read from what you paste and never guessed. The AI buttons only rewrite titles or choose among your own times, and send the text to a free AI provider (Groq, Google Gemini or OpenRouter) without storing it.</p>
      </form>
      <div className={s.output}>
        {error ? (
          <div className={s.error} role="alert">
            <p>{error}</p>
          </div>
        ) : null}
        {!rows.length ? (
          <p className={s.draftNote} style={{ margin: "24px auto" }}>
            Your chapter list shows up here, ready to edit and paste into your video description.
          </p>
        ) : (
          <div className={s.result} aria-live="polite">
            <span className={s.resultLabel}>Chapters</span>
            {note ? <p className={s.note}>{note}</p> : null}
            <ol style={{ listStyle: "none", margin: "8px 0 0", padding: 0, display: "grid", gap: 6 }}>
              {rows.map((r, i) => (
                <li key={i} style={{ display: "grid", gridTemplateColumns: "84px 1fr auto", gap: 6, alignItems: "center" }}>
                  <input aria-label={`Chapter ${i + 1} time`} className={s.input} defaultValue={formatTime(r.startSeconds)} onBlur={(e) => update(i, "time", e.target.value)} style={{ ...mono, height: 40, padding: "0 8px" }} />
                  <input aria-label={`Chapter ${i + 1} title`} className={s.input} value={r.title} onChange={(e) => update(i, "title", e.target.value)} style={{ height: 40 }} />
                  <button type="button" className={s.v2Chip} aria-label={`Remove chapter ${i + 1}`} onClick={() => setRows((all) => all.filter((_, j) => j !== i))}>
                    ×
                  </button>
                </li>
              ))}
            </ol>
            <ul style={{ listStyle: "none", margin: "12px 0 0", padding: 0, display: "grid", gap: 4, fontSize: 14 }}>
              {checks.map((c) => (
                <li key={c.message} style={{ color: c.ok ? "#2F6B3A" : "#A23B2A" }}>
                  {c.ok ? "✓" : "✗"} {c.message}
                </li>
              ))}
            </ul>
            <pre style={{ ...mono, margin: "12px 0 0", padding: 12, background: "#F8F6F4", border: "1px solid #DDDAD3", borderRadius: 12, whiteSpace: "pre-wrap" }}>{output}</pre>
            <div className={s.resultActions}>
              <CopyButton text={output} slug={slug} />
              <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => downloadFile("youtube-chapters.txt", output)}>
                Download .txt
              </button>
              <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} disabled={loading} onClick={() => ai(subtitles ? "pick" : "titles")}>
                {loading ? <Spinner /> : null}
                {subtitles ? "Pick chapters with AI" : "Improve titles with AI"}
              </button>
            </div>
            <p className={s.note}>Passing these checks doesn&apos;t guarantee YouTube shows chapters; eligibility depends on the video and account too.</p>
          </div>
        )}
      </div>
    </section>
  );
}

// ---------- Robots.txt generator ----------

export function RobotsTxtGenerator() {
  const slug = "robots-txt-generator";
  const [site, setSite] = useState("");
  const [block, setBlock] = useState("");
  const [allow, setAllow] = useState("");
  const [sitemap, setSitemap] = useState("");
  const [extraAgent, setExtraAgent] = useState("");
  const [extraBlock, setExtraBlock] = useState("");
  const [testPath, setTestPath] = useState("");
  const lines = (s2: string) => s2.split(/\n/).map((x) => x.trim()).filter(Boolean);
  const origin = (() => {
    try {
      return new URL(/^https?:\/\//.test(site.trim()) ? site.trim() : `https://${site.trim()}`).origin;
    } catch {
      return "";
    }
  })();
  const sm = sitemap.trim() || (origin ? `${origin}/sitemap.xml` : "");
  const { text, warnings } = useMemo(
    () => buildRobotsTxt([{ agent: "*", disallow: lines(block), allow: lines(allow) }, ...(extraAgent.trim() ? [{ agent: extraAgent.trim(), disallow: lines(extraBlock), allow: [] }] : [])], sm),
    [block, allow, extraAgent, extraBlock, sm],
  );
  const test = testPath.trim() ? testRobots(text, "Googlebot", testPath) : null;

  return (
    <section className={s.tool} aria-label="Robots.txt generator">
      <form className={s.panel} onSubmit={(e) => e.preventDefault()}>
        <div className={s.group}>
          <StudioField id="rg-site" label="Website URL">
            <input id="rg-site" className={s.input} value={site} onChange={(e) => setSite(e.target.value)} placeholder="https://example.com" />
          </StudioField>
          <StudioField id="rg-block" label="Paths crawlers should avoid (one per line)" hint="Leave empty to allow everything. Never list secret folders: this file is public.">
            <textarea id="rg-block" className={`${s.input} ${s.textarea}`} rows={4} value={block} onChange={(e) => setBlock(e.target.value)} placeholder={"/staging/\n/search"} style={mono} />
          </StudioField>
          <StudioField id="rg-sitemap" label="Sitemap URL" hint={origin && !sitemap ? `Using ${origin}/sitemap.xml. Check that it exists.` : undefined}>
            <input id="rg-sitemap" className={s.input} value={sitemap} onChange={(e) => setSitemap(e.target.value)} placeholder="https://example.com/sitemap.xml" />
          </StudioField>
        </div>
        <Disclosure label="More options">
          <div className={s.group}>
            <StudioField id="rg-allow" label="Allow exceptions inside blocked paths (one per line)">
              <textarea id="rg-allow" className={`${s.input} ${s.textarea}`} rows={2} value={allow} onChange={(e) => setAllow(e.target.value)} placeholder="/staging/public/" style={mono} />
            </StudioField>
            <StudioField id="rg-agent" label="Rules for one specific crawler" hint="e.g. GPTBot. Leave empty to skip.">
              <input id="rg-agent" className={s.input} value={extraAgent} onChange={(e) => setExtraAgent(e.target.value)} placeholder="GPTBot" />
            </StudioField>
            {extraAgent.trim() ? (
              <StudioField id="rg-agent-block" label={`Paths ${extraAgent.trim()} should avoid`} hint="Use / to block that crawler from the whole site.">
                <textarea id="rg-agent-block" className={`${s.input} ${s.textarea}`} rows={2} value={extraBlock} onChange={(e) => setExtraBlock(e.target.value)} style={mono} />
              </StudioField>
            ) : null}
          </div>
        </Disclosure>
        <p className={s.note}>Runs in your browser. Robots.txt doesn&apos;t password protect anything and can&apos;t reliably keep a URL out of search results.</p>
      </form>
      <div className={s.output}>
        <div className={s.result} aria-live="polite">
          <span className={s.resultLabel}>robots.txt</span>
          <pre style={{ ...mono, margin: "6px 0 0", padding: 14, background: "#F8F6F4", border: "1px solid #DDDAD3", borderRadius: 12, whiteSpace: "pre-wrap" }}>{text}</pre>
          {warnings.map((w) => (
            <p key={w} className={s.countOver} style={{ fontSize: 14 }}>
              {w}
            </p>
          ))}
          <StudioField id="rg-test" label="Test a path against these rules (as Googlebot)">
            <input id="rg-test" className={s.input} value={testPath} onChange={(e) => setTestPath(e.target.value)} placeholder="/staging/page" />
          </StudioField>
          {test ? <p className={s.note} style={{ color: test.decision === "allowed" ? "#2F6B3A" : "#A23B2A" }}>{test.decision === "allowed" ? "Allowed" : "Disallowed"}. {test.explanation}</p> : null}
          <div className={s.resultActions}>
            <CopyButton text={text} slug={slug} />
            <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => { downloadFile("robots.txt", text); track("tool_download", slug); }}>
              Download robots.txt
            </button>
          </div>
          <p className={s.note}>Upload it to the root of your site so it opens at {origin ? `${origin}/robots.txt` : "https://yoursite.com/robots.txt"}.</p>
        </div>
      </div>
    </section>
  );
}

// ---------- XML sitemap validator ----------

const MAX_FILE = 50 * 1024 * 1024;

export function XmlSitemapValidator() {
  const slug = "xml-sitemap-validator";
  const [xml, setXml] = useState("");
  const [report, setReport] = useState<SitemapReport | null>(null);
  const [error, setError] = useState("");

  const run = (source = xml) => {
    setError("");
    if (!source.trim()) {
      setError("Paste your sitemap XML or choose a file first.");
      return;
    }
    // The browser's XML parser doesn't load external entities, so it's safe for a well formedness check.
    const doc = new DOMParser().parseFromString(source, "application/xml");
    const parseError = doc.querySelector("parsererror")?.textContent ?? null;
    setReport(validateSitemap(source, parseError));
    track("tool_calculate", slug);
  };

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setError("");
    try {
      let text: string;
      if (file.name.endsWith(".gz")) {
        if (file.size > 10 * 1024 * 1024) throw new Error("That .gz file is too large to check in the browser.");
        const stream = file.stream().pipeThrough(new DecompressionStream("gzip"));
        const reader = stream.getReader();
        const chunks: Uint8Array[] = [];
        let total = 0;
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          total += value.length;
          // Stop decompression bombs before they fill memory.
          if (total > MAX_FILE) throw new Error("Uncompressed, this file is over 50MB, which is past the sitemap limit.");
          chunks.push(value);
        }
        text = new TextDecoder().decode(await new Blob(chunks as BlobPart[]).arrayBuffer());
      } else {
        if (file.size > MAX_FILE) throw new Error("This file is over 50MB, which is past the sitemap limit.");
        text = await file.text();
      }
      setXml(text.length > 200_000 ? `${text.slice(0, 200_000)}\n<!-- preview truncated, full file checked -->` : text);
      run(text);
    } catch (e) {
      setError(e instanceof Error ? e.message : "We couldn't read that file.");
    }
  };

  const errors = report?.issues.filter((i) => i.severity === "error") ?? [];
  const warns = report?.issues.filter((i) => i.severity === "warning") ?? [];

  return (
    <section className={s.tool} aria-label="XML sitemap validator" style={{ gridTemplateColumns: "1fr" }}>
      <form
        className={s.panel}
        onSubmit={(e) => {
          e.preventDefault();
          run();
        }}
      >
        <div className={s.group}>
          <StudioField id="sv-xml" label="Paste your sitemap XML">
            <textarea id="sv-xml" className={`${s.input} ${s.textarea}`} rows={9} value={xml} onChange={(e) => setXml(e.target.value)} spellCheck={false} style={mono} placeholder={'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://example.com/</loc></url>\n</urlset>'} />
          </StudioField>
          <StudioField id="sv-file" label="Or choose a file (.xml or .xml.gz)">
            <input id="sv-file" type="file" accept=".xml,.gz,application/xml,text/xml,application/gzip" className={s.input} style={{ paddingTop: 10 }} onChange={(e) => onFile(e.target.files?.[0])} />
          </StudioField>
        </div>
        <div className={s.actions}>
          <button type="submit" className={`${s.btn} ${s.btnPrimary} ${s.btnLg}`}>
            Validate Sitemap
          </button>
          <button
            type="button"
            className={`${s.btn} ${s.btnGhost} ${s.btnLg}`}
            onClick={() => setXml('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>https://example.com/a</loc><lastmod>2026-10-20</lastmod></url>\n  <url><loc>https://example.com/a</loc><lastmod>tomorrow</lastmod></url>\n</urlset>')}
          >
            Try an example
          </button>
        </div>
        <p className={s.note}>Runs in your browser. Nothing is uploaded. This checks the file itself, not whether Google crawls or indexes the pages.</p>
      </form>
      <div className={s.output}>
        {error ? (
          <div className={s.error} role="alert">
            <p>{error}</p>
          </div>
        ) : null}
        {report ? (
          <div className={s.result} aria-live="polite">
            <span className={s.resultLabel}>Result</span>
            <p style={big(!report.valid)}>{report.valid ? (warns.length ? "Valid, with warnings" : "Valid") : `${errors.length} error${errors.length === 1 ? "" : "s"} to fix`}</p>
            <Rows rows={[["Type", report.type === "unknown" ? "Not recognised" : report.type], ["Entries", report.count.toLocaleString()], ["Size", `${(report.sizeBytes / 1024).toFixed(1)} KB`], ["Hosts", report.hosts.join(", ") || "None"], ["Errors", String(errors.length), errors.length ? "bad" : "good"], ["Warnings", String(warns.length)]]} />
            {[...errors, ...warns].length ? (
              <ul style={{ margin: "12px 0 0", paddingLeft: 18, display: "grid", gap: 6, fontSize: 14.5, lineHeight: 1.5 }}>
                {[...errors, ...warns].slice(0, 100).map((i, n) => (
                  <li key={n} style={{ color: i.severity === "error" ? "#A23B2A" : "#7D6039" }}>
                    <b>{i.severity === "error" ? "Error" : "Warning"}:</b> {i.message}
                    {i.url ? <span style={{ ...mono, display: "block", color: "#4E4C48", wordBreak: "break-all" }}>{i.url}</span> : null}
                  </li>
                ))}
              </ul>
            ) : null}
            <div className={s.resultActions}>
              <button
                type="button"
                className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`}
                onClick={() => {
                  downloadFile("sitemap-findings.csv", ["Severity,Code,Message,URL", ...report.issues.map((i) => [i.severity, i.code, i.message, i.url ?? ""].map(csvCell).join(","))].join("\n"), "text/csv");
                  track("tool_download", slug);
                }}
              >
                Download findings CSV
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

// ---------- LocalBusiness schema ----------

export function LocalBusinessSchemaGenerator() {
  const slug = "local-business-schema-generator";
  const [v, setV] = useState<Record<string, string>>({ type: "LocalBusiness" });
  const set = (k: string) => (x: string) => setV((o) => ({ ...o, [k]: x }));
  const field = (k: string, label: string, placeholder?: string, hint?: string) => (
    <StudioField key={k} id={`lb-${k}`} label={label} hint={hint}>
      <input id={`lb-${k}`} className={s.input} value={v[k] ?? ""} onChange={(e) => set(k)(e.target.value)} placeholder={placeholder} />
    </StudioField>
  );
  const out = useMemo(() => buildLocalBusiness({ type: v.type ?? "LocalBusiness", name: v.name ?? "", url: v.url ?? "", ...v } as Parameters<typeof buildLocalBusiness>[0]), [v]);
  const ready = Boolean(v.name?.trim() && v.url?.trim());
  const snippet = `<script type="application/ld+json">\n${out.json}\n</script>`;

  return (
    <section className={s.tool} aria-label="Local business schema generator">
      <form className={s.panel} onSubmit={(e) => e.preventDefault()}>
        <div className={s.group}>
          {field("name", "Business name", "North Shore Bicycle Repairs")}
          {field("url", "Website URL", "https://example.com")}
          <StudioField id="lb-type" label="Business type" hint="Pick the most specific type that's true.">
            <Select id="lb-type" options={[...LOCAL_TYPES]} value={v.type ?? "LocalBusiness"} onChange={set("type")} />
          </StudioField>
          {field("street", "Street address (public only)", "1 Pier Road", "Leave empty if customers don't visit you. Never publish a private home address.")}
          {field("locality", "City or town", "Leeds")}
          {field("country", "Country code", "GB")}
        </div>
        <Disclosure label="More options">
          <div className={s.group}>
            {field("region", "Region or state")}
            {field("postalCode", "Postcode or ZIP")}
            {field("phone", "Public phone number", "+44 113 000 0000")}
            {field("hours", "Opening hours", "Mo-Fr 09:00-17:00, Sa 10:00-14:00", "Two letter days and 24 hour times.")}
            {field("priceRange", "Price range (only if real)", "££")}
            {field("image", "Logo or photo URL")}
            {field("sameAs", "Public profile links (space or comma separated)")}
            {field("lat", "Latitude")}
            {field("lng", "Longitude")}
          </div>
        </Disclosure>
        <div className={s.actions}>
          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnLg}`} onClick={() => setV({ type: "BikeStore", name: "North Shore Bicycle Repairs", url: "https://example.com", street: "1 Pier Road", locality: "Leeds", country: "GB", phone: "+44 113 000 0000", hours: "Mo-Fr 09:00-17:00, Sa 10:00-14:00" })}>
            Try an example
          </button>
        </div>
        <p className={s.note}>Runs in your browser. Only the details you enter go into the markup. No ratings or reviews are ever added.</p>
      </form>
      <div className={s.output}>
        {!ready ? (
          <p className={s.draftNote} style={{ margin: "24px auto" }}>
            Add the business name and website to start. Your JSON-LD builds here as you type.
          </p>
        ) : (
          <div className={s.result} aria-live="polite">
            <span className={s.resultLabel}>LocalBusiness JSON-LD</span>
            <pre style={{ ...mono, margin: "6px 0 0", padding: 14, maxHeight: 420, overflow: "auto", background: "#F8F6F4", border: "1px solid #DDDAD3", borderRadius: 12, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{snippet}</pre>
            {out.errors.map((e) => (
              <p key={e} className={s.countOver} style={{ fontSize: 14 }}>
                {e}
              </p>
            ))}
            {out.missing.length ? <p className={s.note}>Not included because you didn&apos;t add them: {out.missing.join(", ")}.</p> : null}
            <div className={s.resultActions}>
              <CopyButton text={snippet} slug={slug} label="Copy script tag" />
              <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => { downloadFile("local-business-schema.json", out.json, "application/json"); track("tool_download", slug); }}>
                Download .json
              </button>
              <a className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} href="https://search.google.com/test/rich-results" target="_blank" rel="noreferrer">
                Rich Results Test
              </a>
            </div>
            <p className={s.note}>Markup doesn&apos;t guarantee a special search result or better rankings. Keep it matching what&apos;s visible on the page.</p>
          </div>
        )}
      </div>
    </section>
  );
}

// ---------- Break-even ROAS ----------

export function BreakEvenRoasCalculator() {
  const [v, setV] = useState<Record<string, string>>({ revenue: "80", product: "30", shipping: "10", packaging: "2", fees: "3", refunds: "3", other: "0", target: "0", current: "" });
  const [split, setSplit] = useState("Total");
  const [total, setTotal] = useState("48");
  const set = (k: string) => (x: string) => setV((o) => ({ ...o, [k]: x }));
  const costs = split === "Total" ? num(total) : ["product", "shipping", "packaging", "fees", "refunds", "other"].reduce((n, k) => n + num(v[k]), 0);
  const r = breakEvenRoas(num(v.revenue), costs, num(v.target), num(v.current));
  const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <section className={s.tool} aria-label="Break-even ROAS calculator">
      <form className={s.panel} onSubmit={(e) => e.preventDefault()}>
        <div className={s.group}>
          <NumberField id="roas-rev" label="Average order value (net of tax and discounts)" value={v.revenue} onChange={set("revenue")} />
          <StudioField id="roas-split" label="Variable costs per order, excluding ads" as="group">
            <Segmented id="roas-split" options={["Total", "Breakdown"]} value={split} onChange={setSplit} />
          </StudioField>
          {split === "Total" ? (
            <NumberField id="roas-total" label="Total variable costs per order" value={total} onChange={setTotal} hint="Product, shipping, packaging, payment fees and expected refunds." />
          ) : (
            <>
              <NumberField id="roas-product" label="Product cost" value={v.product} onChange={set("product")} />
              <NumberField id="roas-ship" label="Shipping" value={v.shipping} onChange={set("shipping")} />
              <NumberField id="roas-pack" label="Packaging" value={v.packaging} onChange={set("packaging")} />
              <NumberField id="roas-fees" label="Payment and platform fees" value={v.fees} onChange={set("fees")} />
              <NumberField id="roas-refunds" label="Expected refunds per order" value={v.refunds} onChange={set("refunds")} />
              <NumberField id="roas-other" label="Other variable costs" value={v.other} onChange={set("other")} />
            </>
          )}
        </div>
        <Disclosure label="More options">
          <div className={s.group}>
            <NumberField id="roas-target" label="Profit you want per order" value={v.target} onChange={set("target")} />
            <NumberField id="roas-current" label="Your current ROAS (optional)" prefix="" value={v.current} onChange={set("current")} hint="Like 3.2. Compared with break even below." />
          </div>
        </Disclosure>
        <p className={s.note}>Runs in your browser. Use the same tax basis for revenue and costs. Fixed overhead isn&apos;t included.</p>
      </form>
      <div className={s.output}>
        <div className={s.result} aria-live="polite">
          <span className={s.resultLabel}>Break-even ROAS</span>
          <p style={big(r.breakEvenRoas === null)}>{r.breakEvenRoas === null ? "No finite break even" : `${r.breakEvenRoas.toFixed(2)}x`}</p>
          <p className={s.note} style={{ marginTop: 0 }}>
            {r.breakEvenRoas === null ? "Your variable costs use up all the revenue before ads, so there's nothing left to pay for advertising." : `Below ${r.breakEvenRoas.toFixed(2)}x, each ad driven order loses money.`}
          </p>
          <Rows
            rows={[
              ["Revenue per order", money(num(v.revenue))],
              ["Variable costs (no ads)", `-${money(costs)}`],
              ["Contribution before ads", money(r.contribution), "strong"],
              ["Contribution margin", `${r.margin}%`],
              ["Most you can spend on ads per order", money(r.allowableAdSpend), "good"],
              ...(r.targetRoas !== null ? ([[`ROAS needed for ${money(num(v.target))} profit`, `${r.targetRoas.toFixed(2)}x`]] as [string, string][]) : []),
              ...(r.currentProfitPerOrder !== null ? ([[`Profit per order at ${num(v.current)}x`, money(r.currentProfitPerOrder), r.currentProfitPerOrder < 0 ? "bad" : "good"]] as [string, string, "bad" | "good"][]) : []),
            ]}
          />
          <p className={s.note}>Break-even ROAS = revenue ÷ (revenue − variable costs). Ad platform numbers and your real sales can differ, so compare with your store data.</p>
        </div>
      </div>
    </section>
  );
}

// ---------- LTV to CAC ----------

export function LtvCacCalculator() {
  const [v, setV] = useState<Record<string, string>>({ revenue: "100", margin: "80", churn: "4", cac: "500", observed: "" });
  const set = (k: string) => (x: string) => setV((o) => ({ ...o, [k]: x }));
  const margin = num(v.margin);
  const churn = num(v.churn);
  const invalid = margin > 100 || churn > 100;
  const r = ltvCac(num(v.revenue), margin, churn, num(v.cac));
  const observed = num(v.observed);
  const ltv = observed > 0 ? observed : r.ltv;
  const ratio = ltv !== null && num(v.cac) > 0 ? Math.round((ltv / num(v.cac)) * 100) / 100 : null;
  const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;

  return (
    <section className={s.tool} aria-label="LTV to CAC ratio calculator">
      <form className={s.panel} onSubmit={(e) => e.preventDefault()}>
        <div className={s.group}>
          <NumberField id="ltv-rev" label="Average monthly revenue per customer" value={v.revenue} onChange={set("revenue")} />
          <NumberField id="ltv-margin" label="Gross margin" prefix="%" value={v.margin} onChange={set("margin")} />
          <NumberField id="ltv-churn" label="Monthly customer churn" prefix="%" value={v.churn} onChange={set("churn")} hint="Customers lost per month, not revenue churn." />
          <NumberField id="ltv-cac" label="Customer acquisition cost (CAC)" value={v.cac} onChange={set("cac")} />
        </div>
        <Disclosure label="More options">
          <div className={s.group}>
            <NumberField id="ltv-observed" label="Use an observed LTV instead (gross profit)" value={v.observed} onChange={set("observed")} hint="From real cohort data. Leave empty to use the formula." />
          </div>
        </Disclosure>
        <p className={s.note}>Runs in your browser. Uses a simple constant churn model.</p>
      </form>
      <div className={s.output}>
        <div className={s.result} aria-live="polite">
          <span className={s.resultLabel}>LTV to CAC</span>
          <p style={big(invalid || ratio === null)}>{invalid ? "Check your percentages" : ratio === null ? (churn === 0 && !observed ? "Can't estimate" : "Add your CAC") : `${ratio} : 1`}</p>
          <p className={s.note} style={{ marginTop: 0 }}>
            {invalid ? "Gross margin and churn must be between 0% and 100%." : churn === 0 && !observed ? "With zero churn, this model can't estimate a finite lifetime. Use observed retention data under More options." : observed ? "Using your observed LTV." : "Estimated with constant churn and margin, not real cohort cash flow."}
          </p>
          {!invalid ? (
            <Rows
              rows={[
                ["Monthly gross profit per customer", money(r.monthlyGrossProfit)],
                ["Estimated customer lifetime", r.lifetimeMonths === null ? "Not finite" : `${r.lifetimeMonths} months`],
                ["Lifetime value (LTV)", ltv === null ? "Can't estimate" : money(ltv), "strong"],
                ["CAC", money(num(v.cac))],
                ["CAC payback", r.paybackMonths === null ? "n/a" : `${r.paybackMonths} months`],
              ]}
            />
          ) : null}
          <p className={s.note}>LTV = monthly revenue × gross margin ÷ monthly churn. Treat the ratio as a diagnostic: check payback time and cohorts too.</p>
        </div>
      </div>
    </section>
  );
}
