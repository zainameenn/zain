"use client";

import { useState, type ReactNode } from "react";
import { track } from "@/lib/tools/v3/track";
import { StudioField } from "./controls";
import s from "./studio.module.css";

// Small UI pieces for the SEO tools, copied from the shared tool files so the SEO pages
// don't download the code for every other tool on the site.

export const mono = { fontFamily: "ui-monospace, Menlo, Consolas, monospace", fontSize: 14 } as const;

export const TONE = { ok: "#2F6B3A", warn: "#8A5A12", bad: "#A23B2A", info: "#5B5853" } as const;

const tableWrap = { overflowX: "auto", margin: "8px 0 12px", border: "1px solid #DDDAD3", borderRadius: 12 } as const;
const th = { textAlign: "left", padding: "8px 10px", background: "#F8F6F4", borderBottom: "1px solid #DDDAD3", fontWeight: 600, whiteSpace: "nowrap" } as const;
const td = (i: number) => ({ padding: "8px 10px", borderTop: i ? "1px solid #EEEBE6" : undefined, verticalAlign: "top", wordBreak: "break-word" }) as const;

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

export function Rows({ rows }: { rows: [string, string, ("good" | "bad" | "strong")?][] }) {
  return (
    <table className={s.v2Table}>
      <tbody>
        {rows.map(([k, v, tone]) => (
          <tr key={k}>
            <th scope="row" style={{ fontWeight: tone === "strong" ? 700 : 500, whiteSpace: "normal" }}>
              {k}
            </th>
            <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums", fontWeight: tone ? 700 : 400, color: tone === "bad" ? "#A23B2A" : tone === "good" ? "#2F6B3A" : undefined }}>{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
