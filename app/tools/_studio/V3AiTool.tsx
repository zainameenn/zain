"use client";

import { useEffect, useRef, useState } from "react";
import type { V3Field, V3Tool } from "@/lib/tools/v3/fields";
import type { FieldsResult } from "@/lib/tools/v3/specs-batch3";
import type { ClusterResult, FaqResult, IntentResult, LongScriptResult, NameResult, NegativesResult, ScriptResult, TaglineResult, TitleResult } from "@/lib/tools/v3/specs";
import { lexicalClusters, parseKeywordList } from "@/lib/tools/v3/cluster";
import { csvCell, downloadFile, track } from "@/lib/tools/v3/track";
import { Disclosure, Segmented, Select, Spinner, StudioField } from "./controls";
import s from "./studio.module.css";

// The six AI tools added in October 2026 (OpenRouter, free model). One result per run, editable,
// with Copy and Regenerate. Tables (negative keywords, search intent) also export to CSV.

type Result = NameResult | ScriptResult | NegativesResult | IntentResult | TitleResult | LongScriptResult | FaqResult | ClusterResult | FieldsResult;

const faqText = (items: FaqResult["items"]) => items.map((f) => `${f.question}\n${f.answer}`).join("\n\n");
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const faqHtml = (items: FaqResult["items"]) => `<section class="faq">\n${items.map((f) => `  <h3>${esc(f.question)}</h3>\n  <p>${esc(f.answer)}</p>`).join("\n")}\n</section>`;

const defaults = (fields: V3Field[]) => Object.fromEntries(fields.filter((f) => f.defaultValue).map((f) => [f.key, f.defaultValue!]));

function scriptText(r: ScriptResult) {
  const t = (n: number) => `${Math.floor(n / 60)}:${String(n % 60).padStart(2, "0")}`;
  return [`HOOK (0:00)\n${r.hook}`, ...r.beats.map((b) => `[${t(b.start)} to ${t(b.end)}]\n${b.spoken}${b.onScreen ? `\nOn screen: ${b.onScreen}` : ""}`), `ENDING\n${r.ending}`].join("\n\n");
}

const RISK: Record<string, string> = { low: "Low risk", medium: "Check", high: "Review carefully" };

/** What the result card calls the name, and where the visitor should check it. */
const NAMES: Record<string, { noun: string; check: string; limit?: [number, number] }> = {
  "etsy-shop-name-generator": { noun: "shop name", check: "Search Etsy and your trademark office before you use it.", limit: [4, 20] },
  "youtube-channel-name-generator": { noun: "channel name", check: "Search YouTube and check the handle when you set it up." },
  "shopify-store-name-generator": { noun: "store name", check: "Check the domain at a registrar and search your trademark office." },
  "newsletter-name-generator": { noun: "newsletter name", check: "Search existing newsletters, domains, social handles and trademarks before you use it." },
  "podcast-name-generator": { noun: "podcast name", check: "Search Apple Podcasts, Spotify, the web and trademark records before launch." },
  "domain-name-ideas-generator": { noun: "domain", check: "Availability, price and trademarks haven't been checked. Confirm at a registrar before buying." },
};

type EditableCluster = { label: string; keywords: string[]; intent?: string; pageType?: string; rationale?: string; confidence?: string };
const CLUSTER_MODES = ["Similar wording", "Topic + intent (AI)"];

export function V3AiTool({ tool, name }: { tool: V3Tool; name: string }) {
  const [values, setValues] = useState<Record<string, string>>(() => defaults(tool.fields));
  const [result, setResult] = useState<Result | null>(null);
  const [text, setText] = useState("");
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");
  const [announce, setAnnounce] = useState("");
  const [faqs, setFaqs] = useState<FaqResult["items"]>([]);
  const [fv, setFv] = useState<Record<string, string>>({});
  const [clusters, setClusters] = useState<EditableCluster[]>([]);
  const [ungrouped, setUngrouped] = useState<string[]>([]);
  const [clusterMode, setClusterMode] = useState(CLUSTER_MODES[0]);
  const [clusterMethod, setClusterMethod] = useState<"lexical" | "ai">("lexical");
  const outRef = useRef<HTMLDivElement>(null);
  const edited = useRef(false);
  const basic = tool.fields.filter((f) => !f.advanced);
  const more = tool.fields.filter((f) => f.advanced);

  useEffect(() => {
    if (!result) return;
    edited.current = false;
    if (tool.output === "name") setText((result as NameResult).name);
    if (tool.output === "script") setText(scriptText(result as ScriptResult));
    if (tool.output === "negatives") setPicked(new Set((result as NegativesResult).items.filter((i) => i.risk !== "high").map((i) => i.formatted)));
    if (tool.output === "title") setText((result as TitleResult).productTitle);
    if (tool.output === "longscript") setText((result as LongScriptResult).sections.map((s) => `${s.heading.toUpperCase()}\n${s.spokenText}`).join("\n\n"));
    if (tool.output === "faq") setFaqs((result as FaqResult).items);
    if (tool.output === "fields") setFv(Object.fromEntries((result as FieldsResult).fields.map((f) => [f.key, f.value])));
    if (tool.output === "clusters") {
      const r = result as ClusterResult;
      setClusters(r.clusters.map((c) => ({ label: c.label, keywords: [c.primaryKeyword, ...c.secondaryKeywords], intent: c.intent, pageType: c.pageType, rationale: c.rationale, confidence: c.confidence })));
      setUngrouped(r.ungrouped);
      setClusterMethod("ai");
    }
  }, [result, tool.output]);

  /** Word grouping runs in the browser: instant, free and no AI call. */
  function clusterLocally() {
    const parsed = parseKeywordList(values.keywords ?? "", 500);
    const excluded = (values.exclude ?? "").toLowerCase().split(",").map((x) => x.trim()).filter(Boolean);
    const kws = parsed.keywords.filter((k) => !excluded.some((x) => k.toLowerCase().includes(x)));
    if (kws.length < 3) {
      setError("Add at least 3 keywords to group.");
      return;
    }
    setError("");
    const { clusters: groups, ungrouped: rest } = lexicalClusters(kws, 0.5, parsed.volumes);
    setClusters(groups.map((g) => ({ label: g.label, keywords: [g.primaryKeyword, ...g.keywords.filter((k) => k !== g.primaryKeyword)] })));
    setUngrouped(rest);
    setClusterMethod("lexical");
    track("tool_success", tool.slug, { mode: "lexical" });
    setAnnounce(`${groups.length} clusters ready.`);
    if (parsed.duplicates.length) setAnnounce(`${groups.length} clusters ready. ${parsed.duplicates.length} duplicate keywords removed.`);
  }

  async function run(regenerate = false) {
    if (tool.output === "clusters" && clusterMode === CLUSTER_MODES[0]) {
      clusterLocally();
      return;
    }
    setError("");
    setLoading(true);
    setAnnounce("Writing your result");
    track(regenerate ? "tool_regenerate" : "tool_generate", tool.slug);
    try {
      const previous = regenerate && result && tool.output === "name" ? (result as NameResult).name : undefined;
      const res = await fetch("/api/tools/v3", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug: tool.slug, input: values, previous }) });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.result) {
        setError(typeof body.error === "string" ? body.error : "Something went wrong. Try again in a moment.");
        track("tool_error", tool.slug, { code: String(body.code ?? res.status) });
        setAnnounce("");
        return;
      }
      setResult(body.result);
      track("tool_success", tool.slug);
      setAnnounce("Your result is ready.");
      if (window.matchMedia("(max-width: 1023.98px)").matches) outRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setError("We couldn't reach the server. Check your connection and try again.");
      track("tool_error", tool.slug, { code: "network" });
    } finally {
      setLoading(false);
    }
  }

  async function copy(value: string, label = "Copied") {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setAnnounce(label);
      track("tool_copy", tool.slug);
      setTimeout(() => setCopied(""), 1800);
    } catch {
      setAnnounce("Copy didn't work. Select the text and copy it instead.");
    }
  }

  const onEdit = (v: string) => {
    setText(v);
    if (!edited.current) {
      edited.current = true;
      track("tool_edit", tool.slug);
    }
  };

  const control = (f: V3Field) => {
    const id = `${tool.slug}-${f.key}`;
    const v = values[f.key] ?? "";
    const set = (x: string) => setValues((o) => ({ ...o, [f.key]: x }));
    if (f.type === "select" && f.options)
      return (
        <StudioField key={f.key} id={id} label={f.label} hint={f.help}>
          <Select id={id} options={f.options} value={v || f.options[0]} onChange={set} />
        </StudioField>
      );
    return (
      <StudioField key={f.key} id={id} label={f.label} hint={f.help}>
        {f.type === "textarea" ? (
          <textarea id={id} className={`${s.input} ${s.textarea}`} rows={f.max > 1000 ? 6 : 3} required={f.required} maxLength={f.max} placeholder={f.placeholder} value={v} onChange={(e) => set(e.target.value)} />
        ) : (
          <input id={id} type="text" className={s.input} required={f.required} maxLength={f.max} placeholder={f.placeholder} value={v} onChange={(e) => set(e.target.value)} />
        )}
      </StudioField>
    );
  };

  const actions = (copyValue: string, copyLabel = "Copy") => (
    <div className={s.resultActions}>
      <button type="button" className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`} onClick={() => copy(copyValue)}>
        {copied ? "Copied" : copyLabel}
      </button>
      <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} disabled={loading} onClick={() => run(true)}>
        {loading ? <Spinner /> : null}
        Regenerate
      </button>
    </div>
  );

  let view = null;
  if (result && tool.output === "name") {
    const r = result as NameResult & Partial<TaglineResult>;
    const meta = NAMES[tool.slug] ?? { noun: "name", check: "Check availability and trademarks before you use it." };
    const etsy = tool.slug === "etsy-shop-name-generator";
    const isDomain = tool.slug === "domain-name-ideas-generator";
    const n = text.length;
    const bad = etsy && (n < 4 || n > 20 || /[^A-Za-z0-9]/.test(text));
    view = (
      <div className={s.result}>
        <div className={s.resultTop}>
          <label htmlFor={`${tool.slug}-name`} className={s.resultLabel}>
            Your {meta.noun}
          </label>
          <span className={bad ? `${s.count} ${s.countOver}` : s.count}>{etsy ? `${n} / 20` : `${n} characters`}</span>
        </div>
        <input id={`${tool.slug}-name`} className={s.input} value={text} onChange={(e) => onEdit(e.target.value)} style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em", height: 60 }} />
        {bad ? <p className={s.countOver}>Etsy shop names need 4 to 20 letters or numbers, with no spaces or symbols.</p> : null}
        {r.tagline ? <p style={{ margin: "10px 0 0", fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontSize: 21, lineHeight: 1.35 }}>{r.tagline}</p> : null}
        <p className={s.note} style={{ marginTop: 10 }}>{r.reason}</p>
        {r.handle ? (
          <p className={s.note}>
            Handle idea: <b>{r.handle}</b> <span className={s.v2Chip} style={{ padding: "2px 8px", fontSize: 12 }}>Not checked</span>
          </p>
        ) : null}
        {r.domain && !isDomain ? (
          <p className={s.note}>
            Domain idea: <b>{r.domain}</b> <span className={s.v2Chip} style={{ padding: "2px 8px", fontSize: 12 }}>Not checked</span>
          </p>
        ) : null}
        <p className={s.note}>
          <span className={s.v2Chip} style={{ padding: "2px 8px", fontSize: 12, marginRight: 6 }}>Availability not checked</span>
          {meta.check}
        </p>
        {actions(r.tagline ? `${text}\n${r.tagline}` : text)}
      </div>
    );
  } else if (result && tool.output === "script") {
    const r = result as ScriptResult;
    view = (
      <div className={s.result}>
        <div className={s.resultTop}>
          <label htmlFor={`${tool.slug}-script`} className={s.resultLabel}>
            Your script
          </label>
          <span className={s.count}>
            About {r.estimatedDurationSeconds} seconds · {r.words} words
          </span>
        </div>
        <textarea id={`${tool.slug}-script`} className={`${s.input} ${s.textarea}`} rows={16} value={text} onChange={(e) => onEdit(e.target.value)} style={{ lineHeight: 1.6 }} />
        <p className={s.note}>Timing is an estimate at about 2.5 words a second. Read it out loud once and trim anything that feels long.</p>
        {actions(text, "Copy script")}
      </div>
    );
  } else if (result && tool.output === "negatives") {
    const r = result as NegativesResult;
    const chosen = r.items.filter((i) => picked.has(i.formatted));
    view = (
      <div className={s.result}>
        <div className={s.resultTop}>
          <span className={s.resultLabel}>Negative keyword candidates</span>
          <span className={s.count}>
            {chosen.length} of {r.items.length} selected
          </span>
        </div>
        <p className={s.error} role="note" style={{ margin: "4px 0 12px" }}>
          {r.warning}
        </p>
        <div className={s.v2TableWrap}>
          <table className={s.v2Table}>
            <thead>
              <tr>
                <th scope="col">
                  <span className={s.srOnly}>Select</span>
                </th>
                <th scope="col">Keyword</th>
                <th scope="col">Match</th>
                <th scope="col">Risk</th>
                <th scope="col">Why</th>
              </tr>
            </thead>
            <tbody>
              {r.items.map((i) => (
                <tr key={i.formatted}>
                  <td>
                    <input
                      type="checkbox"
                      aria-label={`Include ${i.formatted}`}
                      checked={picked.has(i.formatted)}
                      onChange={(e) => setPicked((p) => {
                        const n = new Set(p);
                        if (e.target.checked) n.add(i.formatted);
                        else n.delete(i.formatted);
                        return n;
                      })}
                    />
                  </td>
                  <td>
                    <code>{i.formatted}</code>
                  </td>
                  <td>{i.matchType}</td>
                  <td style={{ color: i.risk === "high" ? "#A23B2A" : i.risk === "medium" ? "#7D6039" : undefined, fontWeight: 600 }}>{RISK[i.risk]}</td>
                  <td>
                    {i.reason}
                    {i.conflict ? <span className={s.countOver} style={{ display: "block" }}>{i.conflict}</span> : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className={s.resultActions}>
          <button type="button" className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`} disabled={!chosen.length} onClick={() => copy(chosen.map((i) => i.formatted).join("\n"), "Copied selected")}>
            {copied ? copied : "Copy selected"}
          </button>
          <button
            type="button"
            className={`${s.btn} ${s.btnGhost} ${s.btnSm}`}
            onClick={() => {
              downloadFile("negative-keywords.csv", ["Keyword,Match type,Formatted,Risk,Reason", ...r.items.map((i) => [i.keyword, i.matchType, i.formatted, i.risk, i.reason + (i.conflict ? ` (${i.conflict})` : "")].map(csvCell).join(","))].join("\n"), "text/csv");
              track("tool_download", tool.slug);
            }}
          >
            Download CSV
          </button>
          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} disabled={loading} onClick={() => run(true)}>
            {loading ? <Spinner /> : null}
            Regenerate
          </button>
        </div>
      </div>
    );
  } else if (result && tool.output === "intent") {
    const r = result as IntentResult;
    const counts = r.rows.reduce<Record<string, number>>((m, x) => ({ ...m, [x.primary]: (m[x.primary] ?? 0) + 1 }), {});
    view = (
      <div className={s.result}>
        <div className={s.resultTop}>
          <span className={s.resultLabel}>Search intent</span>
          <span className={s.count}>{r.rows.length} keywords</span>
        </div>
        <div className={s.v2Chips} style={{ marginBottom: 12 }}>
          {Object.entries(counts).map(([k, n]) => (
            <span key={k} className={s.v2Chip}>
              {k}: {n}
            </span>
          ))}
        </div>
        <div className={s.v2TableWrap}>
          <table className={s.v2Table}>
            <thead>
              <tr>
                <th scope="col">Keyword</th>
                <th scope="col">Intent</th>
                <th scope="col">Confidence</th>
                <th scope="col">Page type</th>
                <th scope="col">Why</th>
              </tr>
            </thead>
            <tbody>
              {r.rows.map((x) => (
                <tr key={x.keyword}>
                  <th scope="row">{x.keyword}</th>
                  <td>
                    <b>{x.primary}</b>
                    {x.secondary ? <span className={s.note} style={{ display: "block" }}>also {x.secondary}</span> : null}
                  </td>
                  <td>{x.confidence === "low" ? "Low, check the results page" : x.confidence}</td>
                  <td>{x.pageType}</td>
                  <td>{x.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className={s.note}>Based on the wording and your context only. Search each keyword yourself to see what Google actually shows before you plan a page.</p>
        <div className={s.resultActions}>
          <button
            type="button"
            className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`}
            onClick={() => {
              downloadFile("search-intent.csv", ["Keyword,Primary intent,Secondary intent,Confidence,Suggested page type,Reason", ...r.rows.map((x) => [x.keyword, x.primary, x.secondary ?? "", x.confidence, x.pageType, x.reason].map(csvCell).join(","))].join("\n"), "text/csv");
              track("tool_download", tool.slug);
            }}
          >
            Download CSV
          </button>
          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => copy(r.rows.map((x) => `${x.keyword}\t${x.primary}${x.secondary ? `/${x.secondary}` : ""}\t${x.pageType}`).join("\n"))}>
            {copied ? "Copied" : "Copy table"}
          </button>
          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} disabled={loading} onClick={() => run(true)}>
            {loading ? <Spinner /> : null}
            Regenerate
          </button>
        </div>
      </div>
    );
  } else if (result && tool.output === "title") {
    const r = result as TitleResult;
    view = (
      <div className={s.result}>
        <div className={s.resultTop}>
          <label htmlFor={`${tool.slug}-title`} className={s.resultLabel}>
            Product title
          </label>
          <span className={text.length > 255 ? `${s.count} ${s.countOver}` : s.count}>{text.length} / 255</span>
        </div>
        <textarea id={`${tool.slug}-title`} className={`${s.input} ${s.textarea}`} rows={2} value={text} onChange={(e) => onEdit(e.target.value)} style={{ fontSize: 20, fontWeight: 600, lineHeight: 1.35 }} />
        {r.seoTitle ? (
          <div style={{ marginTop: 12 }}>
            <div className={s.resultTop}>
              <span className={s.resultLabel}>SEO page title (search engine listing)</span>
              <span className={r.seoLength > 70 ? `${s.count} ${s.countOver}` : s.count}>{r.seoLength} / 70</span>
            </div>
            <p className={s.resultText} style={{ margin: 0 }}>{r.seoTitle}</p>
          </div>
        ) : null}
        {r.factsUsed.length ? <p className={s.note}>Details used: {r.factsUsed.join(", ")}.</p> : null}
        {r.unverifiedClaims.length ? <p className={s.countOver}>Double check before publishing: {r.unverifiedClaims.join(", ")}.</p> : null}
        {actions(r.seoTitle ? `${text}\n\nSEO title: ${r.seoTitle}` : text)}
      </div>
    );
  } else if (result && tool.output === "longscript") {
    const r = result as LongScriptResult;
    const liveWords = text.split(/\s+/).filter(Boolean).length;
    view = (
      <div className={s.result}>
        <div className={s.resultTop}>
          <label htmlFor={`${tool.slug}-script`} className={s.resultLabel}>
            {r.titleIdea ? `Script: ${r.titleIdea}` : "Your script"}
          </label>
          <span className={s.count}>
            {liveWords} words · about {Math.max(1, Math.round((liveWords / 140) * 10) / 10)} min
          </span>
        </div>
        <textarea id={`${tool.slug}-script`} className={`${s.input} ${s.textarea}`} rows={20} value={text} onChange={(e) => onEdit(e.target.value)} style={{ lineHeight: 1.65 }} />
        {r.unverifiedClaims.length ? <p className={s.countOver}>Fact check before recording: {r.unverifiedClaims.join(" · ")}</p> : null}
        <p className={s.note}>Timing assumes about 140 spoken words a minute. Demos and pauses make the video longer.</p>
        <div className={s.resultActions}>
          <button type="button" className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`} onClick={() => copy(text)}>
            {copied ? "Copied" : "Copy script"}
          </button>
          <button
            type="button"
            className={`${s.btn} ${s.btnGhost} ${s.btnSm}`}
            onClick={() => {
              downloadFile("video-script.txt", text);
              track("tool_download", tool.slug);
            }}
          >
            Download .txt
          </button>
          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} disabled={loading} onClick={() => run(true)}>
            {loading ? <Spinner /> : null}
            Regenerate
          </button>
        </div>
      </div>
    );
  } else if (result && tool.output === "faq") {
    const r = result as FaqResult;
    const update = (i: number, key: "question" | "answer", v: string) => {
      setFaqs((all) => all.map((f, j) => (j === i ? { ...f, [key]: v } : f)));
      if (!edited.current) {
        edited.current = true;
        track("tool_edit", tool.slug);
      }
    };
    view = (
      <div className={s.result}>
        <div className={s.resultTop}>
          <span className={s.resultLabel}>Your FAQs</span>
          <span className={s.count}>{faqs.length} questions</span>
        </div>
        <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: 14 }}>
          {faqs.map((f, i) => (
            <li key={i} style={{ padding: 14, border: `1px solid ${f.needsVerification ? "#D9A08F" : "#E3DED3"}`, borderRadius: 12, background: "#fff" }}>
              <label className={s.srOnly} htmlFor={`faq-q-${i}`}>
                Question {i + 1}
              </label>
              <input id={`faq-q-${i}`} className={s.input} value={f.question} onChange={(e) => update(i, "question", e.target.value)} style={{ fontWeight: 600 }} />
              <label className={s.srOnly} htmlFor={`faq-a-${i}`}>
                Answer {i + 1}
              </label>
              <textarea id={`faq-a-${i}`} className={`${s.input} ${s.textarea}`} rows={3} value={f.answer} onChange={(e) => update(i, "answer", e.target.value)} style={{ marginTop: 8 }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, marginTop: 6 }}>
                {f.needsVerification ? <span className={s.countOver} style={{ fontSize: 13 }}>Check: {f.missingFact ?? "this depends on a fact you didn't give"}</span> : <span />}
                <button type="button" className={s.v2Chip} onClick={() => setFaqs((all) => all.filter((_, j) => j !== i))}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ol>
        <p className={s.note}>{r.disclaimer}</p>
        <div className={s.resultActions}>
          <button type="button" className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`} disabled={!faqs.length} onClick={() => copy(faqText(faqs))}>
            {copied ? "Copied" : "Copy as text"}
          </button>
          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} disabled={!faqs.length} onClick={() => copy(faqHtml(faqs), "Copied HTML")}>
            Copy as HTML
          </button>
          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} disabled={loading} onClick={() => run(true)}>
            {loading ? <Spinner /> : null}
            Regenerate
          </button>
        </div>
      </div>
    );
  } else if (result && tool.output === "fields") {
    const r = result as FieldsResult;
    const val = (k: string) => fv[k] ?? "";
    const all = [...r.fields.map((f) => `${r.fields.length > 1 ? `${f.label}: ` : ""}${f.prefix ?? ""}${val(f.key)}`), ...r.lists.map((l) => `${l.label}:\n${l.items.map((i) => `- ${i}`).join("\n")}`)].join("\n\n");
    view = (
      <div className={s.result}>
        {r.fields.map((f) => {
          const id = `${tool.slug}-out-${f.key}`;
          const n = val(f.key).length;
          return (
            <div key={f.key} style={{ marginBottom: 14 }}>
              <div className={s.resultTop}>
                <label htmlFor={id} className={s.resultLabel}>
                  {f.label}
                </label>
                {f.limit ? <span className={n > f.limit ? `${s.count} ${s.countOver}` : s.count}>{n} / {f.limit.toLocaleString()}</span> : null}
              </div>
              <div style={{ position: "relative" }}>
                {f.prefix ? <span aria-hidden style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", fontSize: f.large ? 24 : 16, fontWeight: 600, color: "#7D6039" }}>{f.prefix}</span> : null}
                {f.multiline ? (
                  <textarea id={id} className={`${s.input} ${s.textarea}`} rows={Math.min(14, Math.max(3, Math.ceil(n / 70)))} value={val(f.key)} onChange={(e) => { setFv((o) => ({ ...o, [f.key]: e.target.value })); onEdit(e.target.value); }} style={{ lineHeight: 1.6, fontSize: f.large ? 18 : undefined, fontWeight: f.large ? 600 : undefined }} />
                ) : (
                  <input id={id} className={s.input} value={val(f.key)} onChange={(e) => { setFv((o) => ({ ...o, [f.key]: e.target.value })); onEdit(e.target.value); }} style={{ fontSize: f.large ? 24 : undefined, fontWeight: f.large ? 600 : undefined, height: f.large ? 58 : undefined, paddingLeft: f.prefix ? (f.large ? 34 : 28) : undefined }} />
                )}
              </div>
            </div>
          );
        })}
        {r.lists.map((l) => (
          <div key={l.label} style={{ marginBottom: 12 }}>
            <span className={s.resultLabel}>{l.label}</span>
            <ul style={{ margin: "6px 0 0", paddingLeft: 20, display: "grid", gap: 4, fontSize: 15, lineHeight: 1.55 }}>
              {l.items.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </div>
        ))}
        {r.table ? (
          <div style={{ overflowX: "auto", margin: "4px 0 14px", border: "1px solid #DDDAD3", borderRadius: 12 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, lineHeight: 1.5, minWidth: 560 }}>
              <thead>
                <tr>
                  {r.table.columns.map((c) => (
                    <th key={c} scope="col" style={{ textAlign: "left", padding: "8px 10px", background: "#F8F6F4", borderBottom: "1px solid #DDDAD3", fontWeight: 600 }}>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {r.table.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} style={{ padding: "8px 10px", borderTop: i ? "1px solid #EEEBE6" : undefined, verticalAlign: "top" }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
        {r.notes.map((n) => (
          <p key={n} className={s.note}>
            {n}
          </p>
        ))}
        <div className={s.resultActions}>
          <button type="button" className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`} onClick={() => copy(r.table ? [r.table.columns.join("\t"), ...r.table.rows.map((x) => x.join("\t"))].join("\n") : r.fields.length === 1 && !r.lists.length ? `${r.fields[0].prefix ?? ""}${val(r.fields[0].key)}` : all)}>
            {copied ? "Copied" : "Copy"}
          </button>
          {r.markdown ? (
            <button
              type="button"
              className={`${s.btn} ${s.btnGhost} ${s.btnSm}`}
              onClick={() => {
                downloadFile(`${tool.slug.replace(/-generator$/, "")}.md`, r.markdown!, "text/markdown");
                track("tool_download", tool.slug);
              }}
            >
              Download .md
            </button>
          ) : null}
          {r.table ? (
            <button
              type="button"
              className={`${s.btn} ${s.btnGhost} ${s.btnSm}`}
              onClick={() => {
                downloadFile(r.table!.file, [r.table!.columns, ...r.table!.rows].map((x) => x.map(csvCell).join(",")).join("\n"), "text/csv");
                track("tool_download", tool.slug);
              }}
            >
              Download CSV
            </button>
          ) : null}
          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} disabled={loading} onClick={() => run(true)}>
            {loading ? <Spinner /> : null}
            Regenerate
          </button>
        </div>
      </div>
    );
  } else if (tool.output === "clusters" && (clusters.length || ungrouped.length)) {
    const move = (kw: string, to: number) => {
      setClusters((all) => {
        const next = all.map((c) => ({ ...c, keywords: c.keywords.filter((k) => k !== kw) }));
        if (to >= 0) next[to].keywords.push(kw);
        return next.filter((c) => c.keywords.length);
      });
      setUngrouped((u) => (to < 0 ? [...u.filter((k) => k !== kw), kw] : u.filter((k) => k !== kw)));
    };
    const rows = [...clusters.flatMap((c) => c.keywords.map((k, i) => [c.label, k, i === 0 ? "primary" : "secondary", c.intent ?? "", c.pageType ?? "", c.confidence ?? ""])), ...ungrouped.map((k) => ["Ungrouped", k, "", "", "", ""])];
    view = (
      <div className={s.result}>
        <div className={s.resultTop}>
          <span className={s.resultLabel}>
            {clusters.length} clusters · {rows.length} keywords
          </span>
          <span className={s.v2Chip} style={{ padding: "2px 8px", fontSize: 12 }}>
            {clusterMethod === "ai" ? "AI-assisted topic grouping, not checked against live results" : "Based on wording"}
          </span>
        </div>
        <div style={{ display: "grid", gap: 12 }}>
          {clusters.map((c, ci) => (
            <div key={ci} style={{ padding: 14, border: "1px solid #E3DED3", borderRadius: 12, background: "#fff" }}>
              <label className={s.srOnly} htmlFor={`cl-${ci}`}>
                Cluster {ci + 1} name
              </label>
              <input id={`cl-${ci}`} className={s.input} value={c.label} onChange={(e) => setClusters((all) => all.map((x, j) => (j === ci ? { ...x, label: e.target.value } : x)))} style={{ fontWeight: 600 }} />
              {c.intent ? (
                <p className={s.note} style={{ marginTop: 6 }}>
                  {c.intent} · {c.pageType}
                  {c.confidence ? ` · ${c.confidence} confidence` : ""}
                  {c.rationale ? `. ${c.rationale}` : ""}
                </p>
              ) : null}
              <ul style={{ listStyle: "none", margin: "8px 0 0", padding: 0, display: "grid", gap: 4 }}>
                {c.keywords.map((k, ki) => (
                  <li key={k} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, fontSize: 15 }}>
                    <span>
                      {k}
                      {ki === 0 ? <b style={{ marginLeft: 8, fontSize: 12, color: "#7D6039" }}>PRIMARY</b> : null}
                    </span>
                    <select aria-label={`Move ${k}`} className={s.input} style={{ width: "auto", height: 34, padding: "0 8px", fontSize: 13 }} value={ci} onChange={(e) => move(k, Number(e.target.value))}>
                      {clusters.map((o, oi) => (
                        <option key={oi} value={oi}>
                          {oi === ci ? "Move to…" : o.label.slice(0, 30)}
                        </option>
                      ))}
                      <option value={-1}>Ungrouped</option>
                    </select>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {ungrouped.length ? (
            <div style={{ padding: 14, border: "1px dashed #D6CFC2", borderRadius: 12 }}>
              <b style={{ fontSize: 14 }}>Ungrouped</b>
              <p className={s.note} style={{ marginTop: 4 }}>{ungrouped.join(", ")}</p>
            </div>
          ) : null}
        </div>
        <p className={s.note}>No search volume or difficulty is estimated here. Search a few keywords from each cluster yourself before deciding one page can cover them.</p>
        <div className={s.resultActions}>
          <button
            type="button"
            className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`}
            onClick={() => {
              downloadFile("keyword-clusters.csv", ["Cluster,Keyword,Role,Intent,Page type,Confidence", ...rows.map((r) => r.map(csvCell).join(","))].join("\n"), "text/csv");
              track("tool_download", tool.slug);
            }}
          >
            Download CSV
          </button>
          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => copy(rows.map((r) => r.slice(0, 3).join("\t")).join("\n"))}>
            {copied ? "Copied" : "Copy table"}
          </button>
        </div>
      </div>
    );
  }

  const wide = tool.output === "negatives" || tool.output === "intent" || tool.output === "clusters" || tool.output === "faq" || tool.slug === "seo-content-brief-generator";

  return (
    <section className={s.tool} aria-label={name} style={wide ? { gridTemplateColumns: "1fr" } : undefined}>
      <form
        className={s.panel}
        onSubmit={(e) => {
          e.preventDefault();
          run(false);
        }}
      >
        {tool.output === "clusters" ? (
          <StudioField id={`${tool.slug}-mode`} label="Grouping approach" hint="Similar wording runs instantly in your browser. AI groups by meaning and intent, up to 80 keywords." as="group">
            <Segmented id={`${tool.slug}-mode`} options={CLUSTER_MODES} value={clusterMode} onChange={setClusterMode} />
          </StudioField>
        ) : null}
        <div className={s.group}>{basic.map(control)}</div>
        {more.length ? (
          <Disclosure label="More options" count={more.filter((f) => values[f.key] && values[f.key] !== f.defaultValue).length}>
            <div className={s.group}>{more.map(control)}</div>
          </Disclosure>
        ) : null}
        <div className={s.actions}>
          <button type="submit" className={`${s.btn} ${s.btnPrimary} ${s.btnLg}`} disabled={loading} aria-busy={loading}>
            {loading ? <Spinner /> : null}
            {loading ? "Working" : tool.button}
          </button>
          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnLg}`} onClick={() => setValues({ ...defaults(tool.fields), ...tool.example })}>
            Try an example
          </button>
        </div>
        <p className={s.note}>
          {tool.output === "clusters" && clusterMode === CLUSTER_MODES[0]
            ? "Similar wording runs in your browser. Nothing is sent anywhere."
            : "What you type is sent to a free AI provider (Groq, Google Gemini or OpenRouter) to write your result and isn't stored. Don't include anything private. AI can get things wrong, so check the result before you use it."}
        </p>
      </form>

      <div className={s.output} ref={outRef}>
        <p className={s.srOnly} aria-live="polite" role="status">
          {announce}
        </p>
        {error ? (
          <div className={s.error} role="alert">
            <p>{error}</p>
          </div>
        ) : null}
        {view ?? (loading ? <div className={`${s.result} ${s.skeleton}`} aria-hidden /> : <p className={s.draftNote} style={{ margin: "24px auto" }}>Your result shows up here. You get one result, and you can regenerate it or edit it.</p>)}
      </div>
    </section>
  );
}
