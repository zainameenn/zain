"use client";

import { useId, useState, type ReactNode } from "react";
import { countChars } from "@/lib/tools/validate";
import s from "../tools.module.css";

// Small pieces shared by every result view.

export function CopyButton({ text, label = "Copy", className = s.small, onDone }: { text: string | (() => string); label?: string; className?: string; onDone?: () => void }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={className}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(typeof text === "function" ? text() : text);
          setDone(true);
          onDone?.();
          setTimeout(() => setDone(false), 1600);
        } catch {
          setDone(false);
        }
      }}
    >
      {done ? "Copied" : label}
    </button>
  );
}

/** Character counter: amber outside the target range, red over the limit. */
export function Counter({ text, limit, target }: { text: string; limit: number; target?: [number, number] }) {
  const n = countChars(text);
  const cls = n > limit ? `${s.counter} ${s.over}` : target && (n < target[0] || n > target[1]) ? `${s.counter} ${s.near}` : s.counter;
  return (
    <span className={cls}>
      {n.toLocaleString("en-US")} / {limit.toLocaleString("en-US")}
    </span>
  );
}

/** Text the visitor can click to edit. Shows a rendered view (with highlights) until clicked. The parent owns `editing`, so an "Edit" button can open it too. */
export function EditableText({
  value,
  onChange,
  label,
  render,
  editing,
  setEditing,
}: {
  value: string;
  onChange: (v: string) => void;
  label: string;
  render?: (v: string) => ReactNode;
  editing: boolean;
  setEditing: (on: boolean) => void;
}) {
  if (editing) {
    return (
      <textarea
        autoFocus
        className={s.output}
        aria-label={label}
        rows={Math.min(24, Math.max(3, value.split("\n").length + 1))}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={() => setEditing(false)}
      />
    );
  }
  return (
    <button type="button" className={s.outputView} aria-label={`${label}. Click to edit`} onClick={() => setEditing(true)}>
      {render ? render(value) : value}
    </button>
  );
}

/** Highlights the part people see first: the first line, or the first N characters. */
export function FoldText({ text, chars, firstLine, label }: { text: string; chars?: number; firstLine?: boolean; label?: string }) {
  if (firstLine) {
    const i = text.indexOf("\n");
    const head = i < 0 ? text : text.slice(0, i);
    return (
      <>
        <mark className={s.mark}>{head}</mark>
        {i < 0 ? null : text.slice(i)}
      </>
    );
  }
  if (chars) {
    const parts = Array.from(text);
    if (parts.length <= chars) return <mark className={s.mark}>{text}</mark>;
    return (
      <>
        <mark className={s.mark}>{parts.slice(0, chars).join("")}</mark>
        <span className={s.cut} title={label} aria-hidden />
        <span className={s.afterCut}>{parts.slice(chars).join("")}</span>
      </>
    );
  }
  return <>{text}</>;
}

/** Accessible tabs: arrow keys move between tabs. */
export function Tabs({ tabs, active, onChange, full = false, label = "Result sections" }: { tabs: string[]; active: number; onChange: (i: number) => void; full?: boolean; label?: string }) {
  const id = useId();
  return (
    <div role="tablist" className={full ? `${s.tabs} ${s.tabsFull}` : s.tabs} aria-label={label}>
      {tabs.map((t, i) => (
        <button
          key={t}
          id={`${id}-${i}`}
          type="button"
          role="tab"
          aria-selected={active === i}
          tabIndex={active === i ? 0 : -1}
          className={active === i ? `${s.tab} ${s.tabActive}` : s.tab}
          onClick={() => onChange(i)}
          onKeyDown={(e) => {
            if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
            const next = (i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
            onChange(next);
            document.getElementById(`${id}-${next}`)?.focus();
          }}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

/** Missing info and warnings from the model, shown as soft tips. */
export function Tips({ missing, warnings, missingLabel = "Tip:" }: { missing: string[]; warnings: string[]; missingLabel?: string }) {
  if (!missing.length && !warnings.length) return null;
  return (
    <>
      {missing.map((t) => (
        <p key={`m-${t}`} className={s.tip}>
          {missingLabel} {t}
        </p>
      ))}
      {warnings.map((t) => (
        <p key={`w-${t}`} className={s.tip}>
          Check: {t}
        </p>
      ))}
    </>
  );
}
/**
 * The one wrapper every field uses: label, optional helper text 4px under it, then the control 8px below.
 * Chip rows are a labelled group instead of a fieldset, so they share the exact same left edge as inputs.
 */
export function FieldShell({ id, label, hint, group, children }: { id: string; label: string; hint?: string; group?: boolean; children: ReactNode }) {
  const labelId = `${id}-label`;
  const hintId = hint ? `${id}-hint` : undefined;
  return (
    <div className={s.field} role={group ? "group" : undefined} aria-labelledby={group ? labelId : undefined} aria-describedby={group ? hintId : undefined}>
      <div className={s.labelBlock}>
        {group ? (
          <span id={labelId} className={s.label}>
            {label}
          </span>
        ) : (
          <label id={labelId} className={s.label} htmlFor={id}>
            {label}
          </label>
        )}
        {hint ? (
          <span id={hintId} className={s.hint}>
            {hint}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

