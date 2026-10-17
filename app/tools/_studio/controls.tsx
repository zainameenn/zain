"use client";

import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import s from "./studio.module.css";

// Studio form controls, shared by every redesigned tool page.
// One field wrapper (label, optional hint, control), so every control lines up on the same left edge.

export function StudioField({ id, label, hint, as = "label", children }: { id: string; label: string; hint?: string; as?: "label" | "group"; children: ReactNode }) {
  const labelId = `${id}-label`;
  const hintId = hint ? `${id}-hint` : undefined;
  return (
    <div className={s.field} role={as === "group" ? "group" : undefined} aria-labelledby={as === "group" ? labelId : undefined} aria-describedby={as === "group" ? hintId : undefined}>
      {as === "group" ? (
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
      {children}
    </div>
  );
}

/** One choice from a few options. Behaves like a radio group: arrow keys move the selection. */
export function Segmented({ id, options, value, onChange, labels }: { id: string; options: string[]; value: string; onChange: (v: string) => void; labels?: Record<string, string> }) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const index = Math.max(0, options.indexOf(value));
  const move = (e: KeyboardEvent, i: number) => {
    const delta = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (i + delta + options.length) % options.length;
    onChange(options[next]);
    refs.current[next]?.focus();
  };
  return (
    <div className={s.segmented} role="radiogroup" aria-labelledby={`${id}-label`} style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
      {options.map((o, i) => (
        <button
          key={o}
          ref={(el) => {
            refs.current[i] = el;
          }}
          type="button"
          role="radio"
          aria-checked={i === index}
          tabIndex={i === index ? 0 : -1}
          className={i === index ? `${s.segment} ${s.segmentOn}` : s.segment}
          onClick={() => onChange(o)}
          onKeyDown={(e) => move(e, i)}
        >
          {labels?.[o] ?? o}
        </button>
      ))}
    </div>
  );
}

/** Native select (reliable on every device, never clipped), styled to match the studio. */
export function Select({ id, options, value, onChange, describedBy }: { id: string; options: string[]; value: string; onChange: (v: string) => void; describedBy?: string }) {
  return (
    <span className={s.selectWrap}>
      <select id={id} className={s.select} value={value} aria-describedby={describedBy} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </span>
  );
}

/**
 * Searchable list of suggestions that also accepts the visitor's own words.
 * Picking the "Other" option clears the box so they can type their niche.
 */
export function Combobox({
  id,
  options,
  value,
  onChange,
  placeholder,
  otherLabel = "Other",
  required,
  maxLength,
}: {
  id: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  otherLabel?: string;
  required?: boolean;
  maxLength: number;
}) {
  const listId = useId();
  const input = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [custom, setCustom] = useState(false);
  const query = value.trim().toLowerCase();
  const exact = options.some((o) => o.toLowerCase() === query);
  const shown = !query || exact ? options : options.filter((o) => o.toLowerCase().includes(query) || o === otherLabel);

  const pick = (o: string) => {
    if (o === otherLabel) {
      setCustom(true);
      onChange("");
      setOpen(false);
      requestAnimationFrame(() => input.current?.focus());
      return;
    }
    setCustom(false);
    onChange(o);
    setOpen(false);
  };

  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) return setOpen(true);
      setActive((a) => (a + (e.key === "ArrowDown" ? 1 : -1) + shown.length) % shown.length);
    } else if (e.key === "Enter" && open && shown[active]) {
      e.preventDefault();
      pick(shown[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className={s.combo}>
      <input
        ref={input}
        id={id}
        className={s.input}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open && shown[active] ? `${listId}-${active}` : undefined}
        autoComplete="off"
        required={required}
        maxLength={maxLength}
        placeholder={custom ? "Describe your niche in a few words" : placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 120)}
        onKeyDown={onKey}
      />
      <span className={s.comboChevron} aria-hidden />
      {open && shown.length ? (
        <ul id={listId} role="listbox" className={s.listbox}>
          {shown.map((o, i) => (
            <li
              key={o}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={o === value}
              className={i === active ? `${s.option} ${s.optionActive}` : s.option}
              onMouseDown={(e) => {
                e.preventDefault();
                pick(o);
              }}
              onMouseEnter={() => setActive(i)}
            >
              {o === otherLabel ? `${o}: type your own` : o}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/** A collapsed section of optional controls. */
export function Disclosure({ label, children, count }: { label: string; children: ReactNode; count?: number }) {
  const [open, setOpen] = useState(false);
  const panel = useId();
  return (
    <div className={s.disclosure}>
      <button type="button" className={s.disclosureButton} aria-expanded={open} aria-controls={panel} onClick={() => setOpen((o) => !o)}>
        <span>
          {label}
          {count ? <span className={s.disclosureCount}> ({count} added)</span> : null}
        </span>
        <span className={s.disclosureIcon} aria-hidden />
      </button>
      <div id={panel} className={s.disclosurePanel} hidden={!open}>
        {children}
      </div>
    </div>
  );
}

export function Spinner() {
  return <span className={s.spinner} aria-hidden />;
}
