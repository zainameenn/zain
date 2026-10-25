"use client";

import { useEffect, useRef, useState } from "react";
import type { V3Field, V3Tool } from "@/lib/tools/v3/fields";
import type { IntentResult, NameResult, NegativesResult, ScriptResult } from "@/lib/tools/v3/specs";
import { csvCell, downloadFile, track } from "@/lib/tools/v3/track";
import { Disclosure, Select, Spinner, StudioField } from "./controls";
import s from "./studio.module.css";

// The six AI tools added in October 2026 (OpenRouter, free model). One result per run, editable,
// with Copy and Regenerate. Tables (negative keywords, search intent) also export to CSV.

type Result = NameResult | ScriptResult | NegativesResult | IntentResult;

const defaults = (fields: V3Field[]) => Object.fromEntries(fields.filter((f) => f.defaultValue).map((f) => [f.key, f.defaultValue!]));

function scriptText(r: ScriptResult) {
  const t = (n: number) => `${Math.floor(n / 60)}:${String(n % 60).padStart(2, "0")}`;
  return [`HOOK (0:00)\n${r.hook}`, ...r.beats.map((b) => `[${t(b.start)} to ${t(b.end)}]\n${b.spoken}${b.onScreen ? `\nOn screen: ${b.onScreen}` : ""}`), `ENDING\n${r.ending}`].join("\n\n");
}

const RISK: Record<string, string> = { low: "Low risk", medium: "Check", high: "Review carefully" };

export function V3AiTool({ tool, name }: { tool: V3Tool; name: string }) {
  const [values, setValues] = useState<Record<string, string>>(() => defaults(tool.fields));
  const [result, setResult] = useState<Result | null>(null);
  const [text, setText] = useState("");
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");
  const [announce, setAnnounce] = useState("");
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
  }, [result, tool.output]);

  async function run(regenerate = false) {
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
    const r = result as NameResult;
    const etsy = tool.slug === "etsy-shop-name-generator";
    const n = text.length;
    const bad = etsy && (n < 4 || n > 20 || /[^A-Za-z0-9]/.test(text));
    view = (
      <div className={s.result}>
        <div className={s.resultTop}>
          <label htmlFor={`${tool.slug}-name`} className={s.resultLabel}>
            Your {etsy ? "shop" : tool.slug.includes("youtube") ? "channel" : "store"} name
          </label>
          <span className={bad ? `${s.count} ${s.countOver}` : s.count}>{etsy ? `${n} / 20` : `${n} characters`}</span>
        </div>
        <input id={`${tool.slug}-name`} className={s.input} value={text} onChange={(e) => onEdit(e.target.value)} style={{ fontSize: 26, fontWeight: 600, letterSpacing: "-0.02em", height: 60 }} />
        {bad ? <p className={s.countOver}>Etsy shop names need 4 to 20 letters or numbers, with no spaces or symbols.</p> : null}
        <p className={s.note} style={{ marginTop: 10 }}>{r.reason}</p>
        {r.handle ? (
          <p className={s.note}>
            Handle idea: <b>{r.handle}</b> <span className={s.v2Chip} style={{ padding: "2px 8px", fontSize: 12 }}>Not checked</span>
          </p>
        ) : null}
        {r.domain ? (
          <p className={s.note}>
            Domain idea: <b>{r.domain}</b> <span className={s.v2Chip} style={{ padding: "2px 8px", fontSize: 12 }}>Not checked</span>
          </p>
        ) : null}
        <p className={s.note}>We haven&apos;t checked whether this name is available or trademarked. Search {etsy ? "Etsy" : tool.slug.includes("youtube") ? "YouTube" : "for the domain"} and your trademark office before you use it.</p>
        {actions(text)}
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
  }

  const wide = tool.output === "negatives" || tool.output === "intent";

  return (
    <section className={s.tool} aria-label={name} style={wide ? { gridTemplateColumns: "1fr" } : undefined}>
      <form
        className={s.panel}
        onSubmit={(e) => {
          e.preventDefault();
          run(false);
        }}
      >
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
        <p className={s.note}>What you type is sent to an AI provider (OpenRouter) to write your result and isn&apos;t stored. Don&apos;t include anything private. AI can get things wrong, so check the result before you use it.</p>
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
