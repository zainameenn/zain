"use client";

import { download } from "@/lib/tools/utm";
import s from "../tools.module.css";
import type { ViewProps } from "./ToolWorkspace";
import { CopyButton } from "./ui";

// Marketing plan: first priority, not yet, four weeks, numbers to watch, assumptions, change triggers.

type Named = { name?: string; why?: string };
type Week = { week?: number; focus?: string; actions?: { task?: string; owner?: string; hours?: number | string }[] };
type Metric = { name?: string; target?: string };
type Trigger = { signal?: string; do_instead?: string };

const arr = <T,>(v: unknown) => (Array.isArray(v) ? (v as T[]) : []);
const esc = (t: string) => t.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] as string);

function toMarkdown(d: Record<string, unknown>): string {
  const first = (d.first_priority ?? {}) as Named;
  const lines = ["# 30 day marketing plan", "", "## First priority", `**${first.name ?? ""}**`, first.why ?? "", "", "## Not yet"];
  for (const n of arr<Named>(d.not_yet)) lines.push(`- **${n.name}:** ${n.why}`);
  for (const w of arr<Week>(d.weeks)) {
    lines.push("", `## Week ${w.week}${w.focus ? `: ${w.focus}` : ""}`);
    for (const a of w.actions ?? []) lines.push(`- ${a.task} (${a.owner}, ${a.hours} h)`);
  }
  lines.push("", "## Numbers to watch");
  for (const m of arr<Metric>(d.metrics)) lines.push(`- ${m.name}: ${m.target}`);
  lines.push("", "## Assumptions");
  for (const a of arr<string>(d.assumptions)) lines.push(`- ${a}`);
  lines.push("", "## This plan changes if...");
  for (const t of arr<Trigger>(d.change_triggers)) lines.push(`- ${t.signal}: ${t.do_instead}`);
  return lines.join("\n");
}

/** Opens the plan on its own in a new window and starts the browser's print dialog, where it can be saved as a PDF. */
function printPlan(markdown: string) {
  const win = window.open("", "_blank");
  if (!win) return;
  const html = markdown
    .split("\n")
    .map((l) =>
      l.startsWith("# ")
        ? `<h1>${esc(l.slice(2))}</h1>`
        : l.startsWith("## ")
          ? `<h2>${esc(l.slice(3))}</h2>`
          : l.startsWith("- ")
            ? `<li>${esc(l.slice(2)).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")}</li>`
            : l
              ? `<p>${esc(l).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")}</p>`
              : "",
    )
    .join("");
  win.document.write(`<!doctype html><meta charset="utf-8"><title>30 day marketing plan</title><style>body{font:15px/1.6 Arial,sans-serif;max-width:720px;margin:40px auto;color:#1C1C1C}h2{margin-top:28px}</style>${html}`);
  win.document.close();
  win.focus();
  win.print();
}

/** Text the visitor can edit in place. */
function Edit({ value, onChange, label }: { value: string; onChange: (v: string) => void; label: string }) {
  return <textarea className={s.cell} aria-label={label} value={value} rows={Math.max(1, Math.ceil(value.length / 70))} onChange={(e) => onChange(e.target.value)} />;
}

export function PlanResult({ ws, data, setData, generate }: ViewProps) {
  const first = (data.first_priority ?? {}) as Named;
  const notYet = arr<Named>(data.not_yet);
  const weeks = arr<Week>(data.weeks);
  const metrics = arr<Metric>(data.metrics);
  const assumptions = arr<string>(data.assumptions);
  const triggers = arr<Trigger>(data.change_triggers);
  const set = (key: string, value: unknown) => setData({ ...data, [key]: value });

  return (
    <>
      <div className={s.planGrid}>
        <article className={`${s.planCard} ${s.planFirst}`}>
          <p className={s.angle}>First priority</p>
          <p className={s.planTitle}>{first.name}</p>
          <Edit label="Why this priority" value={first.why ?? ""} onChange={(why) => set("first_priority", { ...first, why })} />
        </article>
        <article className={s.planCard}>
          <p className={s.angle}>Not yet</p>
          <ul className={s.planList}>
            {notYet.map((n, i) => (
              <li key={i}>
                <strong>{n.name}:</strong> {n.why}
              </li>
            ))}
          </ul>
        </article>
        {weeks.map((w, wi) => (
          <article key={wi} className={s.planCard}>
            <p className={s.angle}>Week {w.week ?? wi + 1}</p>
            {w.focus ? <p className={s.planTitle}>{w.focus}</p> : null}
            <ul className={s.planList}>
              {(w.actions ?? []).map((a, ai) => (
                <li key={ai}>
                  <Edit
                    label={`Week ${w.week ?? wi + 1}, action ${ai + 1}`}
                    value={a.task ?? ""}
                    onChange={(task) => set("weeks", weeks.map((x, xi) => (xi === wi ? { ...x, actions: (x.actions ?? []).map((y, yi) => (yi === ai ? { ...y, task } : y)) } : x)))}
                  />
                  <span className={s.counter}>
                    {a.owner} · {a.hours} h
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
        <article className={s.planCard}>
          <p className={s.angle}>Numbers to watch</p>
          <ul className={s.planList}>
            {metrics.map((m, i) => (
              <li key={i}>
                <strong>{m.name}:</strong> {m.target}
              </li>
            ))}
          </ul>
        </article>
        <article className={s.planCard}>
          <p className={s.angle}>Assumptions</p>
          <ul className={s.planList}>
            {assumptions.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </article>
        <article className={s.planCard}>
          <p className={s.angle}>This plan changes if...</p>
          <ul className={s.planList}>
            {triggers.map((t, i) => (
              <li key={i}>
                <strong>{t.signal}:</strong> {t.do_instead}
              </li>
            ))}
          </ul>
        </article>
      </div>
      <div className={s.actions}>
        <CopyButton text={() => toMarkdown(data)} className={s.primarySmall} />
        <button type="button" className={s.ghostSmall} onClick={() => download("marketing-plan.md", toMarkdown(data), "text/markdown;charset=utf-8")}>
          Download Markdown
        </button>
        <button type="button" className={s.ghostSmall} onClick={() => printPlan(toMarkdown(data))}>
          Download PDF
        </button>
        <button type="button" className={s.ghostSmall} onClick={() => generate()}>
          {ws.more}
        </button>
      </div>
    </>
  );
}
