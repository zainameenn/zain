"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import s from "../changelog.module.css";

// Category filters, search and Load More, all in the browser. The page passes summaries only, never full articles.

export type ListItem = {
  slug: string;
  title: string;
  summary: string;
  category: string;
  categoryLabel: string;
  date: string;
  dateLabel: string;
  subject?: string;
  image?: string;
  imageAlt?: string;
};

const PAGE = 8;

export function ChangelogList({ items, categories }: { items: ListItem[]; categories: { id: string; label: string }[] }) {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");
  const [shown, setShown] = useState(PAGE);
  const searchId = useId();
  const sentinel = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const words = q.toLowerCase().split(/\s+/).filter(Boolean);
    return items.filter((it) => (cat === "all" || it.category === cat) && words.every((w) => `${it.title} ${it.summary} ${it.subject ?? ""} ${it.categoryLabel}`.toLowerCase().includes(w)));
  }, [items, cat, q]);

  const counts = useMemo(() => Object.fromEntries(categories.map((c) => [c.id, items.filter((i) => i.category === c.id).length])), [items, categories]);
  const visible = filtered.slice(0, shown);
  const hasMore = filtered.length > shown;

  // Load the next batch automatically as the reader gets near the end of the list.
  // The button stays as a fallback for keyboards and browsers without IntersectionObserver.
  useEffect(() => {
    const el = sentinel.current;
    if (!el || !hasMore || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) setShown((n) => n + PAGE);
    }, { rootMargin: "600px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, shown]);

  return (
    <div className={s.listWrap}>
      <div className={s.controls}>
        <div className={s.filters} role="group" aria-label="Filter by category">
          {[{ id: "all", label: "All Updates" }, ...categories.filter((c) => counts[c.id] > 0)].map((c) => (
            <button
              key={c.id}
              type="button"
              aria-pressed={cat === c.id}
              className={cat === c.id ? `${s.filter} ${s.filterOn}` : s.filter}
              onClick={() => {
                setCat(c.id);
                setShown(PAGE);
              }}
            >
              {c.label}
              <span className={s.filterCount}>{c.id === "all" ? items.length : counts[c.id]}</span>
            </button>
          ))}
        </div>
        <label htmlFor={searchId} className={s.sr}>
          Search updates
        </label>
        <input
          id={searchId}
          type="search"
          className={s.search}
          placeholder="Search updates, tools or services"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setShown(PAGE);
          }}
        />
      </div>

      <p className={s.sr} aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "update" : "updates"} shown
      </p>

      {visible.length ? (
        <ol className={s.list}>
          {visible.map((it) => (
            <li key={it.slug} className={s.item}>
              <div className={s.itemMeta}>
                <time dateTime={it.date}>{it.dateLabel}</time>
              </div>
              <article className={s.itemBody}>
                <div className={s.itemTop}>
                  <span className={s.badge}>{it.categoryLabel}</span>
                  {it.subject ? <span className={s.subject}>{it.subject}</span> : null}
                </div>
                <h2 className={s.itemTitle}>
                  <Link href={`/changelog/${it.slug}`}>{it.title}</Link>
                </h2>
                <p className={s.itemSummary}>{it.summary}</p>
                {it.image ? (
                  <Link href={`/changelog/${it.slug}`} className={s.thumb} tabIndex={-1} aria-hidden>
                    <Image src={it.image} alt="" width={1440} height={900} sizes="(max-width: 767px) 100vw, 640px" />
                  </Link>
                ) : null}
                <Link href={`/changelog/${it.slug}`} className={s.readMore}>
                  Read the update <span aria-hidden>→</span>
                  <span className={s.sr}>: {it.title}</span>
                </Link>
              </article>
            </li>
          ))}
        </ol>
      ) : (
        <p className={s.empty}>No updates match that. Try another word or category.</p>
      )}

      {hasMore ? (
        <div className={s.more} ref={sentinel}>
          <button type="button" className={s.moreBtn} onClick={() => setShown((n) => n + PAGE)}>
            Load more updates
            <span className={s.filterCount}>{filtered.length - shown} more</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
