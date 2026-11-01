"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import h from "./hub.module.css";
import d from "./directory.module.css";

// The tool directory: search, category filter, availability filter and sort over one list built from the
// registry. The server renders every available tool card with a real link, so all of them are in the HTML;
// filtering only hides cards in the browser. Filters are mirrored in the URL (?cat=&q=&show=) so a view can be shared.

export type DirectoryTool = { slug: string; href: string; name: string; description: string; cta: string; image: string; aliases?: string; order?: number };
export type DirectoryGroup = { id: string; label: string; heading: string; intro: string; tools: DirectoryTool[] };

/** The tool's thumbnail. Decorative: the card title right below names the tool. A local SVG, so no next/image round trip. */
function Thumb({ src, priority }: { src: string; priority?: boolean }) {
  // New tools whose thumbnail is still being drawn get a plain panel instead of a broken image.
  if (!src) return <span aria-hidden="true" className={h.cardImg} style={{ display: "block", aspectRatio: "4 / 3", background: "#F4F0E8" }} />;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt="" width={1200} height={900} loading={priority ? "eager" : "lazy"} decoding="async" className={h.cardImg} />;
}

export function ToolCard({ tool, featured, priority, category }: { tool: DirectoryTool; featured?: boolean; priority?: boolean; category?: string }) {
  // Tools still being built show only under "In development", without a link or an action.
  if (!tool.href) {
    return (
      <div className={`${h.card} ${h.cardSoon}`}>
        <div className={h.cardArt}>
          <Thumb src={tool.image} />
        </div>
        <div className={h.cardBody}>
          {category ? <span className={d.cardCat}>{category}</span> : null}
          <h3 className={h.cardName}>{tool.name}</h3>
          <p className={h.cardText}>{tool.description}</p>
          <span className={h.soonTag}>In development</span>
        </div>
      </div>
    );
  }
  return (
    <Link href={tool.href} className={featured ? `${h.card} ${h.cardFeatured}` : h.card} onClick={() => hubEvent("tools_directory_open", { tool: tool.slug })}>
      <div className={h.cardArt}>
        <Thumb src={tool.image} priority={priority} />
      </div>
      <div className={h.cardBody}>
        {category ? <span className={d.cardCat}>{category} · Available now</span> : null}
        <h3 className={h.cardName}>{tool.name}</h3>
        <p className={h.cardText}>{tool.description}</p>
        <span className={h.cardCta}>
          {tool.cta}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

/** Directory analytics through the site's Google Analytics tag. Never sends what the visitor typed. */
function hubEvent(name: string, params: Record<string, string | number> = {}) {
  try {
    (window as unknown as { gtag?: (c: "event", n: string, p: Record<string, string | number>) => void }).gtag?.("event", name, params);
  } catch {}
}

/** Lowercase, punctuation and spacing ignored, so "meta-description", "Meta Description" and "metadescription" all match. */
const norm = (s: string) => s.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, " ").trim();
const squash = (s: string) => norm(s).replace(/ /g, "");
function matches(t: DirectoryTool, group: string, q: string) {
  const hay = norm(`${t.name} ${t.description} ${group} ${t.aliases ?? ""}`);
  const flat = hay.replace(/ /g, "");
  return norm(q).split(" ").every((w) => hay.includes(w) || flat.includes(squash(w)));
}

type Show = "available" | "development" | "all";
type Sort = "recommended" | "az";

export function Directory({ groups }: { groups: DirectoryGroup[] }) {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("all");
  const [show, setShow] = useState<Show>("available");
  const [sort, setSort] = useState<Sort>("recommended");
  const ready = useRef(false);
  const zeroLogged = useRef("");

  // Read a shared view from the URL once, then keep the URL in step with the filters. This runs after hydration
  // on purpose: reading the URL during render would make the server HTML (every live card) differ from the browser's.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const c = p.get("cat");
    if (c && groups.some((g) => g.id === c)) setCat(c);
    if (p.get("q")) setQuery(p.get("q")!.slice(0, 80));
    const s = p.get("show");
    if (s === "development" || s === "all") setShow(s);
    if (p.get("sort") === "az") setSort("az");
    ready.current = true;
  }, [groups]);
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!ready.current) return;
    const p = new URLSearchParams();
    if (cat !== "all") p.set("cat", cat);
    if (query.trim()) p.set("q", query.trim());
    if (show !== "available") p.set("show", show);
    if (sort !== "recommended") p.set("sort", sort);
    const qs = p.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${qs ? `?${qs}` : ""}${window.location.hash}`);
  }, [cat, query, show, sort]);

  const q = query.trim();
  const isLive = (t: DirectoryTool) => Boolean(t.href);
  const visible = useMemo(() => {
    const keep = (t: DirectoryTool, g: DirectoryGroup) => (show === "all" || (show === "available" ? isLive(t) : !isLive(t))) && (!q || matches(t, g.label, q));
    const list = groups
      .filter((g) => cat === "all" || g.id === cat)
      .map((g) => ({ ...g, tools: g.tools.filter((t) => keep(t, g)) }))
      .filter((g) => g.tools.length);
    if (sort === "az") {
      const flat = list.flatMap((g) => g.tools.map((t) => ({ t, label: g.label }))).sort((a, b) => a.t.name.localeCompare(b.t.name));
      return { flat, list };
    }
    return { flat: null, list };
  }, [groups, cat, show, sort, q]);

  const count = visible.list.reduce((n, g) => n + g.tools.length, 0);
  const liveCount = (g?: DirectoryGroup) => (g ? g.tools : groups.flatMap((x) => x.tools)).filter(isLive).length;
  const devCount = groups.flatMap((g) => g.tools).filter((t) => !isLive(t)).length;
  // Matching tools that are hidden by the availability filter, so an empty search can point to them.
  const hiddenMatches = q && show === "available" ? groups.flatMap((g) => g.tools.filter((t) => !isLive(t) && matches(t, g.label, q))).length : 0;

  useEffect(() => {
    if (q && !count && zeroLogged.current !== q) {
      zeroLogged.current = q;
      hubEvent("tools_directory_no_results");
    }
  }, [q, count]);

  const reset = () => (setQuery(""), setCat("all"), setShow("available"), setSort("recommended"));
  const pickCat = (id: string) => (setCat(id), hubEvent("tools_directory_filter", { category: id }));

  return (
    <div id="all-tools" className={h.directory}>
      <div className={d.toolbar}>
        <div className={d.searchRow}>
          <div className={h.search}>
            <label htmlFor="tool-search" className={h.srOnly}>
              Search all tools
            </label>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden className={h.searchIcon}>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input id="tool-search" type="search" className={h.searchInput} placeholder="Search by task, platform, or tool name" value={query} onChange={(e) => setQuery(e.target.value)} autoComplete="off" />
          </div>
          <div className={d.selects}>
            <label className={d.select}>
              <span>Show</span>
              <select value={show} onChange={(e) => (setShow(e.target.value as Show), hubEvent("tools_directory_filter", { show: e.target.value }))}>
                <option value="available">Available now ({liveCount()})</option>
                <option value="development">In development ({devCount})</option>
                <option value="all">All tools ({liveCount() + devCount})</option>
              </select>
            </label>
            <label className={d.select}>
              <span>Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                <option value="recommended">Recommended</option>
                <option value="az">A to Z</option>
              </select>
            </label>
          </div>
        </div>
        <div className={d.chips} role="group" aria-label="Filter by category">
          <button type="button" className={d.chip} aria-pressed={cat === "all"} onClick={() => pickCat("all")}>
            All tools
          </button>
          {groups.map((g) => (
            <button key={g.id} type="button" className={d.chip} aria-pressed={cat === g.id} onClick={() => pickCat(g.id)}>
              {g.label} <span className={d.chipCount}>{show === "development" ? g.tools.length - liveCount(g) : liveCount(g)}</span>
            </button>
          ))}
        </div>
      </div>

      <p className={d.status} role="status" aria-live="polite">
        {count} {count === 1 ? "tool" : "tools"}
        {show === "available" ? " available now" : show === "development" ? " in development" : ""}
        {cat !== "all" ? ` in ${groups.find((g) => g.id === cat)?.label}` : ""}
        {q ? ` matching “${q}”` : ""}
        {cat !== "all" || q || show !== "available" || sort !== "recommended" ? (
          <button type="button" className={d.clear} onClick={reset}>
            Clear filters
          </button>
        ) : null}
      </p>

      {count === 0 ? (
        <div className={h.empty}>
          <p className={h.emptyTitle}>Couldn&apos;t find a match.</p>
          <p className={h.emptyText}>Try &ldquo;SEO&rdquo;, &ldquo;caption&rdquo;, &ldquo;Etsy&rdquo;, or &ldquo;LinkedIn&rdquo;.</p>
          {hiddenMatches ? (
            <p className={h.emptyText}>
              {hiddenMatches} {hiddenMatches === 1 ? "tool in development matches" : "tools in development match"}.{" "}
              <button type="button" className={d.clear} onClick={() => setShow("development")}>
                Show them
              </button>
            </p>
          ) : null}
          <button type="button" className={h.emptyButton} onClick={reset}>
            Clear filters
          </button>
        </div>
      ) : visible.flat ? (
        <ul className={h.grid}>
          {visible.flat.map(({ t, label }) => (
            <li key={t.slug}>
              <ToolCard tool={t} category={label} />
            </li>
          ))}
        </ul>
      ) : (
        visible.list.map((g) => (
          <section key={g.id} id={g.id} className={h.group} aria-labelledby={`${g.id}-h`}>
            <header className={h.groupHead}>
              <h3 id={`${g.id}-h`} className={h.groupTitle}>
                {g.heading}
              </h3>
              <p className={h.groupIntro}>{g.intro}</p>
            </header>
            <ul className={h.grid}>
              {g.tools.map((t) => (
                <li key={t.slug}>
                  <ToolCard tool={t} category={g.label} />
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </div>
  );
}
