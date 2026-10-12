"use client";

import { useId, useMemo, useState } from "react";
import s from "../insights.module.css";

type Props = {
  /** Cards rendered on the server, in order. */
  cards: React.ReactNode[];
  /** Lowercased searchable text for each card (title, excerpt, categories). */
  index: string[];
  /** Category links shown beside the search box. */
  filters?: React.ReactNode;
  pageSize?: number;
};

/** Search and "Load more" over server-rendered cards. Every card is in the HTML, so links stay crawlable. */
export function InsightsBrowser({ cards, index, filters, pageSize = 9 }: Props) {
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(pageSize);
  const inputId = useId();

  const matches = useMemo(() => {
    const words = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    return index.map((text, i) => (words.every((w) => text.includes(w)) ? i : -1)).filter((i) => i !== -1);
  }, [index, query]);

  const visible = new Set(matches.slice(0, shown));
  const searching = query.trim().length > 0;

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, marginBottom: 36 }}>
        <div style={{ flex: "1 1 520px", minWidth: 0 }}>{filters}</div>
        <div role="search" style={{ position: "relative", flex: "1 1 280px", maxWidth: 380 }} className="max-md:!max-w-none">
          <label htmlFor={inputId} style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
            Search articles
          </label>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ position: "absolute", left: 16, top: 16, color: "#6F6B64" }}>
            <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.5" />
            <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            id={inputId}
            type="search"
            className={s.search}
            placeholder="Search articles"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShown(pageSize);
            }}
          />
        </div>
      </div>

      <p aria-live="polite" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
        {searching ? `${matches.length} ${matches.length === 1 ? "article" : "articles"} found` : ""}
      </p>

      <div className={s.grid}>
        {cards.map((card, i) => (
          <div key={i} hidden={!visible.has(i)} style={{ minWidth: 0 }}>
            {card}
          </div>
        ))}
      </div>

      {matches.length === 0 ? (
        <div style={{ padding: "48px 24px", borderRadius: 20, border: "1px dashed #D6CFC2", textAlign: "center" }}>
          <p style={{ margin: 0, fontFamily: "var(--nf-general-sans)", fontSize: 20, fontWeight: 600, letterSpacing: "-0.02em" }}>Nothing matches &ldquo;{query.trim()}&rdquo;.</p>
          <p style={{ margin: "8px 0 18px", fontSize: 15.5, color: "#5A5854" }}>Try a shorter word, or browse a category instead.</p>
          <button type="button" className={s.button} onClick={() => setQuery("")}>
            Clear search
          </button>
        </div>
      ) : null}

      {matches.length > shown ? (
        <div style={{ marginTop: 48, display: "flex", justifyContent: "center" }}>
          <button type="button" className={s.button} onClick={() => setShown((n) => n + pageSize)}>
            Load more articles
          </button>
        </div>
      ) : null}
    </div>
  );
}
