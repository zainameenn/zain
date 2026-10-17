"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronIcon } from "@/app/HomeComponents/icons";
import s from "../blog.module.css";

// Article navigation: the sticky "On this page" outline (desktop sidebar and a compact mobile bar),
// the active section tracking that drives both, and the thin reading progress line.
// The outline links are plain anchors rendered on the server, so they work without JavaScript too.

export type OutlineItem = { id: string; text: string };

/**
 * Where a heading counts as "being read": just below the 72px sticky site header, plus the outline bar on smaller screens.
 * Matches scroll-margin-top on headings in blog.module.css.
 */
const line = () => (window.matchMedia("(min-width: 1100px)").matches ? 112 : 148);

const reducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Keeps track of the section the reader is in. Uses IntersectionObserver plus scrollend, never a per frame scroll loop. */
function useActiveSection(ids: string[], endId: string) {
  const [active, setActive] = useState<string | null>(null);
  const lockUntil = useRef(0);

  const compute = useCallback(() => {
    if (Date.now() < lockUntil.current) return;
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;
    let current: string | null = null;
    for (const el of els) if (el.getBoundingClientRect().top <= line() + 4) current = el.id;
    // If the page can't scroll far enough for the last heading to reach the line, it wins once the article's end is in view.
    const end = document.getElementById(endId);
    const last = els[els.length - 1];
    const remaining = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
    const lastTop = last.getBoundingClientRect().top;
    if (end && end.getBoundingClientRect().top <= window.innerHeight && lastTop - line() > remaining + 4) current = last.id;
    setActive(current);
  }, [ids, endId]);

  useEffect(() => {
    let io: IntersectionObserver | null = null;
    const observe = () => {
      io?.disconnect();
      // The observed area runs from the reading line to the bottom of the screen, so a heading crossing the line fires a callback.
      io = new IntersectionObserver(compute, { rootMargin: `-${line()}px 0px 0px 0px`, threshold: [0, 1] });
      for (const id of [...ids, endId]) {
        const el = document.getElementById(id);
        if (el) io.observe(el);
      }
    };
    observe();
    // First reading after layout settles (also covers loading the page on a #hash).
    const first = requestAnimationFrame(compute);
    const settle = () => {
      lockUntil.current = 0;
      compute();
    };
    // scrollend catches big jumps (hash links, back and forward) that skip past the observed area in one frame.
    window.addEventListener("scrollend", settle);
    window.addEventListener("hashchange", settle);
    window.addEventListener("popstate", settle);
    window.addEventListener("resize", observe);
    window.addEventListener("load", settle);
    return () => {
      cancelAnimationFrame(first);
      io?.disconnect();
      window.removeEventListener("scrollend", settle);
      window.removeEventListener("hashchange", settle);
      window.removeEventListener("popstate", settle);
      window.removeEventListener("resize", observe);
      window.removeEventListener("load", settle);
    };
  }, [ids, endId, compute]);

  /** Jump to a section: smooth scroll, update the URL hash (so back and forward work), and mark it active right away. */
  const go = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return false;
    if (window.location.hash !== `#${id}`) history.pushState(null, "", `#${id}`);
    lockUntil.current = Date.now() + 1200;
    setActive(id);
    el.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
    return true;
  }, []);

  return { active, go };
}

function OutlineList({ items, active, onPick, listRef }: { items: OutlineItem[]; active: string | null; onPick: (id: string) => void; listRef?: React.Ref<HTMLOListElement> }) {
  return (
    <ol className={s.outline} ref={listRef}>
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={`#${item.id}`}
            title={item.text}
            aria-current={active === item.id ? "location" : undefined}
            className={active === item.id ? s.outlineActive : undefined}
            onClick={(e) => {
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
              e.preventDefault();
              onPick(item.id);
            }}
          >
            <span>{item.text}</span>
          </a>
        </li>
      ))}
    </ol>
  );
}

/** Desktop: a sticky sidebar outline. Mobile and tablet: a compact sticky bar that opens the same list. */
export function ArticleOutline({ items, endId }: { items: OutlineItem[]; endId: string }) {
  // Stable across renders, so the observers are only rebuilt when the headings change.
  const key = items.map((i) => i.id).join(" ");
  const ids = useMemo(() => key.split(" "), [key]);
  const { active, go } = useActiveSection(ids, endId);
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLOListElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);

  // Keep the active item visible inside the sidebar when the outline is taller than the screen. Only the sidebar scrolls.
  useEffect(() => {
    const box = boxRef.current;
    const link = active ? listRef.current?.querySelector<HTMLElement>(`a[href="#${CSS.escape(active)}"]`) : null;
    if (!box || !link || box.scrollHeight <= box.clientHeight) return;
    const top = link.offsetTop - box.offsetTop;
    if (top < box.scrollTop + 8 || top + link.offsetHeight > box.scrollTop + box.clientHeight - 8) {
      box.scrollTo({ top: Math.max(0, top - box.clientHeight / 3), behavior: reducedMotion() ? "auto" : "smooth" });
    }
  }, [active]);

  // The mobile list closes on Escape or a tap outside it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => !mobileRef.current?.contains(e.target as Node) && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  const current = items.find((i) => i.id === active);

  return (
    <>
      <nav className={s.outlineDesktop} aria-label="On this page">
        <p className={s.outlineLabel}>On this page</p>
        <div className={s.outlineBox} ref={boxRef}>
          <OutlineList items={items} active={active} onPick={go} listRef={listRef} />
        </div>
      </nav>

      <div className={s.outlineMobile} ref={mobileRef}>
        <button type="button" className={s.outlineToggle} aria-expanded={open} aria-controls="mobile-outline" onClick={() => setOpen((o) => !o)}>
          <span className={s.outlineToggleText}>
            <span className={s.outlineToggleLabel}>On this page</span>
            {current ? <span className={s.outlineToggleCurrent}>{current.text}</span> : null}
          </span>
          <ChevronIcon size={12} />
        </button>
        <nav id="mobile-outline" className={s.outlinePanel} aria-label="On this page" hidden={!open}>
          <OutlineList
            items={items}
            active={active}
            onPick={(id) => {
              setOpen(false);
              go(id);
            }}
          />
        </nav>
      </div>
    </>
  );
}

/** A thin progress line at the top of the screen, measured across the article body only, not the footer. */
export function ArticleProgress({ targetId }: { targetId: string }) {
  const bar = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    let start = 0;
    let span = 1;
    let frame = 0;
    const measure = () => {
      const rect = el.getBoundingClientRect();
      start = rect.top + window.scrollY - line();
      span = Math.max(1, rect.height - window.innerHeight + line());
      paint();
    };
    const paint = () => {
      frame = 0;
      const p = Math.min(1, Math.max(0, (window.scrollY - start) / span));
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
    };
    // Only a cheap transform update per frame; positions are measured on resize and when the body changes size.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
    };
  }, [targetId]);
  return (
    <div className={s.progress} aria-hidden="true">
      <div ref={bar} className={s.progressBar} />
    </div>
  );
}
