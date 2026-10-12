"use client";

import { useState } from "react";
import { download, toCsv } from "@/lib/tools/utm";
import s from "../tools.module.css";
import type { ViewProps } from "./ToolWorkspace";
import { CopyButton } from "./ui";

// Content calendar: an editable table on desktop, stacked cards on mobile. CSV download, copy, regenerate.

type Row = { slot_id: number; date: string; weekday: string; platform: string; format: string; pillar: string; hook: string; outline: string; cta: string; notes: string };
type Slot = { slot_id: number; date: string; weekday: string; platform: string };
type Post = { slot_id?: number; pillar?: string; format?: string; hook?: string; outline?: unknown; cta?: string; notes?: string };

const COLUMNS: { key: keyof Row; label: string }[] = [
  { key: "date", label: "Date" },
  { key: "platform", label: "Platform" },
  { key: "format", label: "Format" },
  { key: "pillar", label: "Pillar" },
  { key: "hook", label: "Hook" },
  { key: "outline", label: "Outline" },
  { key: "cta", label: "CTA" },
  { key: "notes", label: "Notes" },
];
const EDITABLE = new Set<keyof Row>(["format", "pillar", "hook", "outline", "cta", "notes"]);

const str = (v: unknown) => (typeof v === "string" ? v : "");
const outline = (v: unknown) => (Array.isArray(v) ? v.filter((x) => typeof x === "string").map((x) => `• ${x}`).join("\n") : str(v));

/** Joins the code's slots (dates, platforms) with the model's posts. Rows already edited are kept as they are. */
export function toRows(data: Record<string, unknown>): Row[] {
  if (Array.isArray(data.rows)) return data.rows as Row[];
  const slots = (Array.isArray(data.slots) ? data.slots : []) as Slot[];
  const posts = (Array.isArray(data.posts) ? data.posts : []) as Post[];
  return slots.map((slot) => {
    const p = posts.find((x) => x.slot_id === slot.slot_id) ?? {};
    return { ...slot, format: str(p.format), pillar: str(p.pillar), hook: str(p.hook), outline: outline(p.outline), cta: str(p.cta), notes: str(p.notes) };
  });
}

export function CalendarResult({ ws, data, setData, generate, call }: ViewProps) {
  const [busyRow, setBusyRow] = useState<number | null>(null);
  const rows = toRows(data);
  const pillars = Array.isArray(data.pillars) ? data.pillars.filter((p): p is string => typeof p === "string") : [];
  const save = (next: Row[]) => setData({ ...data, rows: next });
  const edit = (id: number, key: keyof Row, value: string) => save(rows.map((r) => (r.slot_id === id ? { ...r, [key]: value } : r)));
  const table = () => [COLUMNS.map((c) => c.label), ...rows.map((r) => COLUMNS.map((c) => (c.key === "date" ? `${r.weekday} ${r.date}` : String(r[c.key]))))];

  async function regenerateRow(id: number) {
    setBusyRow(id);
    const body = await call({ slot: id });
    setBusyRow(null);
    const fresh = body ? toRows(body.data)[0] : null;
    if (fresh) save(rows.map((r) => (r.slot_id === id ? { ...fresh, slot_id: id } : r)));
  }

  return (
    <>
      {pillars.length ? <p className={s.legend}>Pillars: {pillars.join(", ")}</p> : null}
      <div className={s.tableWrap}>
        <table className={s.calendar}>
          <thead>
            <tr>
              {COLUMNS.map((c) => (
                <th key={c.key} scope="col">
                  {c.label}
                </th>
              ))}
              <th scope="col">
                <span className={s.srOnly}>Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.slot_id} aria-busy={busyRow === r.slot_id}>
                {COLUMNS.map((c) => (
                  <td key={c.key} data-label={c.label}>
                    {c.key === "date" ? (
                      <span>
                        {r.weekday}
                        <br />
                        {r.date}
                      </span>
                    ) : EDITABLE.has(c.key) ? (
                      <textarea className={s.cell} aria-label={`${c.label}, ${r.weekday} ${r.date}`} value={String(r[c.key])} rows={c.key === "outline" ? 4 : 2} onChange={(e) => edit(r.slot_id, c.key, e.target.value)} />
                    ) : (
                      String(r[c.key])
                    )}
                  </td>
                ))}
                <td data-label="">
                  <button type="button" className={s.small} disabled={busyRow !== null} onClick={() => regenerateRow(r.slot_id)}>
                    {busyRow === r.slot_id ? "Working" : "Regenerate row"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={s.actions}>
        <button type="button" className={s.primarySmall} onClick={() => download("content-calendar.csv", toCsv(table()))}>
          Download CSV
        </button>
        <CopyButton text={() => table().map((r) => r.map((c) => c.replace(/\s*\n\s*/g, " ")).join("\t")).join("\n")} label="Copy table" className={s.ghostSmall} />
        <button type="button" className={s.ghostSmall} onClick={() => generate()}>
          {ws.more}
        </button>
      </div>
    </>
  );
}
