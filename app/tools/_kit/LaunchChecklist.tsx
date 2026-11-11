"use client";

import { useEffect, useState } from "react";
import { Disclosure, Field, download, useKitAi } from "./parts";
import k from "./kit.module.css";
import c from "./checklist.module.css";

type Task = { id: string; task: string; priority: "high" | "medium" | "low"; output: string; owner: string; dependsOn: string; done: boolean };
type Phase = "before" | "day" | "after";
type Plan = Record<Phase, Task[]>;
type Raw = Record<Phase, Omit<Task, "id" | "done">[]>;

const PHASES: [Phase, string][] = [["before", "Before launch"], ["day", "Launch day"], ["after", "After launch"]];
const KEY = "zainameen-launch-checklist";
const uid = () => Math.random().toString(36).slice(2, 10);

const csvCell = (s: string) => `"${s.replace(/"/g, '""')}"`;
export function toCsv(plan: Plan) {
  const rows = [["Phase", "Task", "Priority", "Expected output", "Owner", "Depends on", "Status"]];
  for (const [p, label] of PHASES) for (const t of plan[p]) rows.push([label, t.task, t.priority, t.output, t.owner, t.dependsOn, t.done ? "Done" : "To do"]);
  return rows.map((r) => r.map(csvCell).join(",")).join("\r\n");
}
export function toMd(plan: Plan) {
  return `# Launch checklist\n\n${PHASES.map(([p, label]) => `## ${label}\n\n${plan[p].map((t) => `- [${t.done ? "x" : " "}] **${t.task}** (${t.priority}). Output: ${t.output}. Owner: ${t.owner}.${t.dependsOn ? ` Depends on: ${t.dependsOn}.` : ""}`).join("\n")}`).join("\n\n")}\n`;
}

export function LaunchChecklist() {
  const [v, setV] = useState({ product: "", audience: "", stage: "Ready to launch", date: "", team: "", budget: "", channels: "", existing: "", assets: "" });
  const set = (key: keyof typeof v) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [key]: e.target.value }));
  const ai = useKitAi<Raw>("startup-launch-checklist-generator");
  const [plan, setPlan] = useState<Plan | null>(null);

  // Restore a saved checklist from this browser, once.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) setPlan(JSON.parse(saved));
    } catch {}
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (!ai.result) return;
    const next = Object.fromEntries(PHASES.map(([p]) => [p, ai.result![p].map((t) => ({ ...t, id: uid(), done: false }))])) as Plan;
    setPlan(next); // eslint-disable-line react-hooks/set-state-in-effect
  }, [ai.result]);
  useEffect(() => {
    try {
      if (plan) localStorage.setItem(KEY, JSON.stringify(plan));
    } catch {}
  }, [plan]);

  const update = (p: Phase, id: string, patch: Partial<Task>) => setPlan((pl) => (pl ? { ...pl, [p]: pl[p].map((t) => (t.id === id ? { ...t, ...patch } : t)) } : pl));
  const remove = (p: Phase, id: string) => setPlan((pl) => (pl ? { ...pl, [p]: pl[p].filter((t) => t.id !== id) } : pl));
  const add = (p: Phase) => setPlan((pl) => (pl ? { ...pl, [p]: [...pl[p], { id: uid(), task: "New task", priority: "medium", output: "", owner: "", dependsOn: "", done: false }] } : pl));
  const all = plan ? PHASES.flatMap(([p]) => plan[p]) : [];
  const done = all.filter((t) => t.done).length;
  const ready = v.product.trim() && v.audience.trim();

  return (
    <div className={k.panel}>
      <div className={k.grid2}>
        <div className={k.fields}>
          <Field id="l-product" label="What you're launching">
            <input id="l-product" className={k.input} value={v.product} onChange={set("product")} placeholder="Scheduling tool for physiotherapy clinics" />
          </Field>
          <Field id="l-audience" label="Who it's for">
            <input id="l-audience" className={k.input} value={v.audience} onChange={set("audience")} placeholder="Clinic owners and front desk staff" />
          </Field>
          <Field id="l-stage" label="Current stage">
            <select id="l-stage" className={k.select} value={v.stage} onChange={set("stage")}>
              {["Idea or prototype", "Private beta", "Ready to launch", "Already launched, relaunching"].map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>
          <details className={k.more}>
            <summary>Add details for a better fit</summary>
            <div className={k.fields}>
              <div className={k.row2}>
                <Field id="l-date" label="Launch date" optional>
                  <input id="l-date" type="date" className={k.input} value={v.date} onChange={set("date")} />
                </Field>
                <Field id="l-team" label="Team size" optional>
                  <input id="l-team" className={k.input} value={v.team} onChange={set("team")} placeholder="2 founders" />
                </Field>
              </div>
              <Field id="l-budget" label="Marketing budget" optional>
                <select id="l-budget" className={k.select} value={v.budget} onChange={set("budget")}>
                  <option value="">Choose</option>
                  {["No budget", "Under $1,000", "$1,000 to $5,000", "Over $5,000"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
              <Field id="l-channels" label="Channels you plan to use" optional>
                <input id="l-channels" className={k.input} value={v.channels} onChange={set("channels")} placeholder="Email list, LinkedIn" />
              </Field>
              <Field id="l-existing" label="Existing audience" optional>
                <input id="l-existing" className={k.input} value={v.existing} onChange={set("existing")} placeholder="Waitlist of beta clinics" />
              </Field>
              <Field id="l-assets" label="Launch assets you already have" optional>
                <input id="l-assets" className={k.input} value={v.assets} onChange={set("assets")} placeholder="Landing page, demo video" />
              </Field>
            </div>
          </details>
          <div className={k.actions}>
            <button type="button" className={k.btn} disabled={!ready || ai.loading} onClick={() => ai.run(Object.fromEntries(Object.entries(v).filter(([, x]) => x.trim())))}>
              {ai.loading ? "Building your checklist..." : plan ? "Create a new checklist" : "Create Launch Checklist"}
            </button>
          </div>
          <Disclosure />
          {ai.error ? <p className={k.error} role="alert">{ai.error}</p> : null}
        </div>
        <div className={k.results}>
          <p className={k.resultsHead}>Progress</p>
          {plan ? (
            <>
              <div className={c.bar} role="progressbar" aria-valuemin={0} aria-valuemax={all.length} aria-valuenow={done} aria-label="Tasks done">
                <i style={{ width: `${all.length ? (done / all.length) * 100 : 0}%` }} />
              </div>
              <p className={k.counts}>{done} of {all.length} tasks done</p>
              <div className={k.actions}>
                <button type="button" className={`${k.btn} ${k.ghost} ${k.small}`} onClick={() => download("launch-checklist.md", toMd(plan), "text/markdown")}>Download Markdown</button>
                <button type="button" className={`${k.btn} ${k.ghost} ${k.small}`} onClick={() => download("launch-checklist.csv", toCsv(plan), "text/csv")}>Download CSV</button>
                <button type="button" className={`${k.btn} ${k.ghost} ${k.small}`} onClick={() => navigator.clipboard?.writeText(toMd(plan)).catch(() => {})}>Copy</button>
              </div>
              <p className={k.disclosure}>Your ticks and edits are saved in this browser only. Clearing site data or using another device starts fresh, so download a copy.</p>
            </>
          ) : (
            <p className={k.note}>Describe what you&apos;re launching to get one prioritised checklist. You can tick tasks off, edit and add your own.</p>
          )}
        </div>
      </div>

      {plan
        ? PHASES.map(([p, label]) => (
            <section key={p} className={c.phase} aria-labelledby={`ph-${p}`}>
              <h3 id={`ph-${p}`} className={c.phaseH}>{label}</h3>
              <ul className={c.tasks}>
                {plan[p].map((t) => (
                  <li key={t.id} className={t.done ? `${c.task} ${c.done}` : c.task}>
                    <input type="checkbox" checked={t.done} onChange={(e) => update(p, t.id, { done: e.target.checked })} aria-label={`Done: ${t.task}`} />
                    <div className={c.body}>
                      <input className={c.title} value={t.task} onChange={(e) => update(p, t.id, { task: e.target.value })} aria-label="Task" />
                      <p className={c.meta}>
                        <span className={`${k.status} ${t.priority === "high" ? k.fix : t.priority === "medium" ? k.check : k.na2}`}>{t.priority}</span>
                        {t.owner ? <span>Owner: {t.owner}</span> : null}
                        {t.dependsOn ? <span>Needs: {t.dependsOn}</span> : null}
                      </p>
                      {t.output ? <p className={c.output}>Output: {t.output}</p> : null}
                    </div>
                    <button type="button" className={c.remove} onClick={() => remove(p, t.id)} aria-label={`Remove ${t.task}`}>×</button>
                  </li>
                ))}
              </ul>
              <button type="button" className={`${k.btn} ${k.ghost} ${k.small}`} onClick={() => add(p)}>Add a task</button>
            </section>
          ))
        : null}
    </div>
  );
}
