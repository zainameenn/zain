"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import { rankOptions } from "@/lib/tools/v2/shared";
import s from "./studio.module.css";

// Searchable dropdown following the WAI ARIA combobox pattern.
// Typing filters as you go (case and accent insensitive, ranked by lib/tools/v2/shared rankOptions).
// Up and Down move, Enter picks, Escape closes, Tab leaves. With allowCustom, a final "Use 'typed text'" row appears.

export function V2Combobox({
  id,
  options,
  value,
  onChange,
  placeholder,
  allowCustom,
  required,
  maxLength = 120,
}: {
  id: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  allowCustom?: boolean;
  required?: boolean;
  maxLength?: number;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState<string | null>(null);
  const [active, setActive] = useState(0);
  const listId = useId();
  const wrap = useRef<HTMLDivElement>(null);
  const text = query ?? value;
  const ranked = rankOptions(options, query ?? "");
  const custom = allowCustom && query && query.trim() && !options.some((o) => o.toLowerCase() === query.trim().toLowerCase()) ? query.trim() : null;
  const rows = custom ? [...ranked, `__custom__${custom}`] : ranked;

  const pick = (v: string) => {
    onChange(v.startsWith("__custom__") ? v.slice(10) : v);
    setQuery(null);
    setOpen(false);
  };
  const onKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(rows.length - 1, a + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(0, a - 1));
    } else if (e.key === "Enter" && open && rows[active]) {
      e.preventDefault();
      pick(rows[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
      setQuery(null);
    } else if (e.key === "Tab") {
      if (query !== null && allowCustom && query.trim()) onChange(query.trim());
      setQuery(null);
      setOpen(false);
    }
  };

  return (
    <div
      className={s.combo}
      ref={wrap}
      onBlur={(e) => {
        if (!wrap.current?.contains(e.relatedTarget as Node)) {
          if (query !== null && allowCustom && query.trim()) onChange(query.trim());
          setQuery(null);
          setOpen(false);
        }
      }}
    >
      <input
        id={id}
        className={s.input}
        role="combobox"
        aria-expanded={open}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open && rows[active] ? `${listId}-${active}` : undefined}
        autoComplete="off"
        value={text}
        placeholder={placeholder ?? "Search or type"}
        required={required}
        maxLength={maxLength}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          setActive(0);
          setOpen(true);
        }}
        onKeyDown={onKey}
      />
      <span className={s.comboChevron} aria-hidden />
      {open && rows.length ? (
        <ul id={listId} role="listbox" className={s.listbox} style={{ maxHeight: 8 * 40 }}>
          {rows.map((o, i) => (
            <li
              key={o}
              id={`${listId}-${i}`}
              role="option"
              aria-selected={o === value}
              className={i === active ? `${s.option} ${s.optionActive}` : s.option}
              onMouseDown={(e) => e.preventDefault()}
              onMouseEnter={() => setActive(i)}
              onClick={() => pick(o)}
            >
              {o.startsWith("__custom__") ? `Use "${o.slice(10)}"` : o}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
