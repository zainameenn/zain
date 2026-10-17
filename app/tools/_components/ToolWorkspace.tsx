"use client";

import { useRef, useState } from "react";
import { BUSY_MESSAGE } from "@/lib/tools/links";
import type { ToolField, ToolInput, Workspace } from "@/lib/tools/types";
import { fullText, type Option } from "@/lib/tools/validate";
import s from "../tools.module.css";
import { CalendarResult } from "./CalendarResult";
import { focusForm, requestFill, useFillListener } from "./fill";
import { PlanResult } from "./PlanResult";
import { ProfilePreview, type LiveBio } from "./ProfilePreview";
import { AboutResult, OptionsResult, PostResult, ProductResult } from "./Results";
import { FieldShell, Tabs, Tips } from "./ui";
import { UtmBuilder } from "./UtmBuilder";

// The interactive part of a tool page: form, results, counters, copy buttons, and the profile preview on bio pages.

export type Extra = { rewrite?: "shorter" | "punchier" | "funnier"; current?: string; selected_hook?: string; slot?: number };
export type ApiOk = { data: Record<string, unknown>; missingInfo: string[]; warnings: string[] };

export type ViewProps = {
  ws: Workspace;
  values: ToolInput;
  data: Record<string, unknown>;
  setData: (d: Record<string, unknown>) => void;
  generate: (extra?: Extra) => void;
  call: (extra?: Extra) => Promise<ApiOk | null>;
  loading: boolean;
  missing: string[];
  warnings: string[];
  /** Bio pages: which result is on the profile preview. */
  preview?: { index: number; show: (i: number) => void };
};

/** The Monday after today, as YYYY-MM-DD, for date fields. */
function nextMonday() {
  const d = new Date();
  d.setDate(d.getDate() + ((8 - d.getDay()) % 7 || 7));
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function defaults(fields: ToolField[]): ToolInput {
  return Object.fromEntries(
    fields.map((f) => [
      f.name,
      f.type === "toggle"
        ? f.defaultOn
        : f.type === "date"
          ? nextMonday()
          : f.type === "select" || f.type === "chips" || f.type === "mode" || f.type === "segmented"
            ? (f.defaultValue ?? "")
            : "",
    ]),
  );
}

/** A field shows unless it belongs to another mode (e.g. "current bio" only in Improve mode). */
const visible = (f: ToolField, values: ToolInput) => f.type !== "mode" && (!f.when || values[f.when.field] === f.when.equals);

type Group = { kind: "inputs" | "style"; fields: ToolField[] };

/**
 * Splits the form into groups, spaced 32px apart: the main inputs, then the style group
 * (toggles, plus any chip rows that lead straight into them, like the vibe above "Use emoji"), then any inputs after.
 */
function groupFields(fields: ToolField[]): Group[] {
  const kind = (i: number): Group["kind"] => {
    const f = fields[i];
    if (f.type === "toggle") return "style";
    if (f.type !== "chips") return "inputs";
    let j = i + 1;
    while (j < fields.length && fields[j].type === "chips") j++;
    return fields[j]?.type === "toggle" ? "style" : "inputs";
  };
  const groups: Group[] = [];
  fields.forEach((f, i) => {
    const k = kind(i);
    const last = groups[groups.length - 1];
    if (last && last.kind === k) last.fields.push(f);
    else groups.push({ kind: k, fields: [f] });
  });
  return groups;
}

/** Consecutive toggles sit in one list, 12px apart. Everything else is its own run. */
function runs(fields: ToolField[]): ToolField[][] {
  const out: ToolField[][] = [];
  for (const f of fields) {
    const last = out[out.length - 1];
    if (f.type === "toggle" && last && last[0].type === "toggle") last.push(f);
    else out.push([f]);
  }
  return out;
}

/** "Use this example" on the server rendered example cards: fills the form above. */
export function UseExampleButton({ input }: { input: ToolInput }) {
  return (
    <button type="button" className={s.ghostSmall} onClick={() => requestFill(input)}>
      Use this example
    </button>
  );
}

export function ToolWorkspace({ slug, ws }: { slug: string; ws: Workspace }) {
  if (ws.result.kind === "utm") return <UtmBuilder ws={ws} />;
  return <AiWorkspace slug={slug} ws={ws} />;
}

type Status = "idle" | "loading" | "done" | "error";

function AiWorkspace({ slug, ws }: { slug: string; ws: Workspace }) {
  const [values, setValues] = useState<ToolInput>(() => defaults(ws.fields));
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [tips, setTips] = useState<{ missing: string[]; warnings: string[] }>({ missing: [], warnings: [] });
  const [error, setError] = useState("");
  const [shown, setShown] = useState({ index: 0, key: 0 });
  const [previewOpen, setPreviewOpen] = useState<boolean | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const fill = (input: ToolInput) => {
    setValues({ ...defaults(ws.fields), ...input });
    focusForm(formRef.current);
  };
  useFillListener(fill);

  const set = (name: string, value: string | boolean) => setValues((v) => ({ ...v, [name]: value }));

  /** One request. Returns null (and shows the error) when it fails. The visitor's answers are never cleared. */
  async function call(extra?: Extra): Promise<ApiOk | null> {
    setError("");
    try {
      const res = await fetch("/api/tools", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug, input: values, extra }) });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.data) {
        setError(res.status === 429 ? BUSY_MESSAGE : typeof body.error === "string" ? body.error : ws.errorText);
        return null;
      }
      return { data: body.data, missingInfo: body.missingInfo ?? [], warnings: body.warnings ?? [] };
    } catch {
      setError(ws.errorText);
      return null;
    }
  }

  async function generate(extra?: Extra) {
    setStatus("loading");
    const body = await call(extra);
    if (!body) {
      setStatus(data ? "done" : "error");
      return;
    }
    setData(body.data);
    setTips({ missing: body.missingInfo, warnings: body.warnings });
    setShown((p) => ({ index: 0, key: p.key + 1 }));
    setStatus("done");
  }

  const loading = status === "loading";
  const kind = ws.result.kind;
  const modeField = ws.fields.find((f) => f.type === "mode");
  const preview = ws.preview;
  const showPreview = (i: number) => {
    setShown((p) => ({ index: i, key: p.key + 1 }));
    setPreviewOpen(true);
  };
  const view: ViewProps | null = data
    ? { ws, values, data, setData, generate, call, loading, missing: tips.missing, warnings: tips.warnings, preview: preview ? { index: shown.index, show: showPreview } : undefined }
    : null;

  // The visitor's own bio on the profile: the chosen result, live as they edit it.
  const options = Array.isArray(data?.options) ? (data.options as Option[]) : [];
  const ideas = Array.isArray(data?.name_ideas) ? (data.name_ideas as string[]) : [];
  const chosen = options[shown.index] ? fullText(options[shown.index]) : "";
  const live: LiveBio | null = preview && chosen ? { text: chosen, name: ideas[0] ?? String(values.who ?? ""), key: shown.key } : null;
  const open = previewOpen ?? !!data;

  const results = (
    <>
      {error ? (
        <p className={s.error} role="alert">
          {error}
        </p>
      ) : null}
      {loading ? (
        <div className={s.cards}>
          {[0, 1, 2].map((i) => (
            <div key={i} className={`${s.card} ${s.skeleton}`} />
          ))}
        </div>
      ) : view ? (
        <>
          {kind === "options" ? <OptionsResult {...view} /> : null}
          {kind === "about" ? <AboutResult {...view} /> : null}
          {kind === "post" ? <PostResult {...view} /> : null}
          {kind === "product" ? <ProductResult {...view} /> : null}
          {kind === "calendar" ? <CalendarResult {...view} /> : null}
          {kind === "plan" ? <PlanResult {...view} /> : null}
          {kind !== "product" ? <Tips missing={tips.missing} warnings={tips.warnings} /> : null}
        </>
      ) : !error && ws.emptyState ? (
        <p className={s.empty}>{ws.emptyState}</p>
      ) : null}
      {ws.resultsNote ? <p className={s.dataNote}>{ws.resultsNote}</p> : null}
    </>
  );

  return (
    <section className={ws.wide ? `${s.workspace} ${s.workspaceWide}` : s.workspace} aria-label="Tool">
      <form
        ref={formRef}
        className={s.form}
        onSubmit={(e) => {
          e.preventDefault();
          generate();
        }}
      >
        {modeField && modeField.type === "mode" ? (
          <div className={s.formGroup}>
            <Tabs
              full
              label={modeField.label}
              tabs={modeField.options.map((o) => o.label)}
              active={Math.max(0, modeField.options.findIndex((o) => o.value === values[modeField.name]))}
              onChange={(i) => set(modeField.name, modeField.options[i].value)}
            />
          </div>
        ) : null}
        {groupFields(ws.fields.filter((f) => visible(f, values))).map((g) => (
          <div key={g.fields[0].name} className={g.kind === "inputs" && ws.wide ? `${s.formGroup} ${s.fieldGrid}` : s.formGroup}>
            {runs(g.fields).map((run) =>
              run[0].type === "toggle" ? (
                <div key={run[0].name} className={s.toggleList}>
                  {run.map((f) => (
                    <Field key={f.name} slug={slug} f={f} value={values[f.name]} set={set} />
                  ))}
                </div>
              ) : (
                run.map((f) => <Field key={f.name} slug={slug} f={f} value={values[f.name]} set={set} />)
              ),
            )}
          </div>
        ))}
        <div className={`${s.formGroup} ${s.formActions}`}>
          <div className={s.actions}>
            <button type="submit" className={s.primary} disabled={loading} aria-busy={loading}>
              {ws.button}
            </button>
            <button type="button" className={s.ghost} onClick={() => fill(ws.exampleInput)}>
              {ws.secondary}
            </button>
          </div>
          <p className={s.dataNote}>{ws.dataNote}</p>
        </div>
      </form>

      <div className={preview ? `${s.results} ${s.resultsSplit}` : s.results} aria-busy={loading}>
        {preview ? (
          <div className={s.previewWrap}>
            <button type="button" className={s.previewToggle} aria-expanded={open} onClick={() => setPreviewOpen(!open)}>
              {preview.labels.disclosure}
            </button>
            <div className={open ? s.previewBody : `${s.previewBody} ${s.previewClosed}`}>
              <ProfilePreview config={preview} live={live} />
            </div>
          </div>
        ) : null}
        <div className={s.resultsMain} aria-live="polite">
          {/* Not an H2: the first H2 on the page is the keyword heading below the tool. */}
          <p className={s.resultsHead}>{ws.resultsHeading}</p>
          {results}
        </div>
      </div>
    </section>
  );
}

function Field({ slug, f, value, set }: { slug: string; f: ToolField; value: string | boolean | undefined; set: (n: string, v: string | boolean) => void }) {
  const id = `${slug}-${f.name}`;
  const str = typeof value === "string" ? value : "";
  const hintId = f.hint ? `${id}-hint` : undefined;

  // Mode tabs render above the form; segmented and combobox fields only exist on studio pages.
  if (f.type === "mode" || f.type === "segmented" || f.type === "combobox") return null;

  if (f.type === "toggle") {
    return (
      <label className={s.toggle} htmlFor={id}>
        <input id={id} type="checkbox" role="switch" checked={value === true} onChange={(e) => set(f.name, e.target.checked)} />
        <span className={s.switch} aria-hidden />
        {f.label}
      </label>
    );
  }

  if (f.type === "chips" || f.type === "multi") {
    const picked = f.type === "multi" ? str.split(",").map((x) => x.trim()).filter(Boolean) : [str];
    const toggle = (o: string) => {
      if (f.type !== "multi") return set(f.name, o);
      const next = picked.includes(o) ? picked.filter((p) => p !== o) : picked.length < f.max ? [...picked, o] : picked;
      set(f.name, f.options.filter((x) => next.includes(x)).join(", "));
    };
    return (
      <FieldShell id={id} label={f.type === "multi" ? `${f.label} (up to ${f.max})` : f.label} hint={f.hint} group>
        <div className={s.chips}>
          {f.options.map((o) => (
            <label key={o} className={s.chip}>
              <input
                type={f.type === "multi" ? "checkbox" : "radio"}
                name={id}
                value={o}
                checked={picked.includes(o)}
                disabled={f.type === "multi" && !picked.includes(o) && picked.length >= f.max}
                onChange={() => toggle(o)}
              />
              <span>{o}</span>
            </label>
          ))}
        </div>
      </FieldShell>
    );
  }

  return (
    <FieldShell id={id} label={f.label} hint={f.hint}>
      {f.type === "select" ? (
        <select id={id} className={s.input} required={f.required} aria-describedby={hintId} value={str} onChange={(e) => set(f.name, e.target.value)}>
          {f.defaultValue ? null : (
            <option value="" disabled={f.required}>
              {f.placeholder ?? f.options.join(" / ")}
            </option>
          )}
          {f.options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      ) : f.type === "textarea" ? (
        <textarea
          id={id}
          className={`${s.input} ${s.textarea}`}
          required={f.required}
          aria-describedby={hintId}
          maxLength={f.maxLength}
          placeholder={f.placeholder}
          value={str}
          rows={3}
          onChange={(e) => set(f.name, e.target.value)}
        />
      ) : f.type === "date" ? (
        <input id={id} className={s.input} type="date" required={f.required} aria-describedby={hintId} value={str} onChange={(e) => set(f.name, e.target.value)} />
      ) : (
        <input
          id={id}
          className={s.input}
          type="text"
          required={f.required}
          aria-describedby={hintId}
          maxLength={f.maxLength}
          placeholder={f.placeholder}
          value={str}
          onChange={(e) => set(f.name, e.target.value)}
        />
      )}
    </FieldShell>
  );
}
