"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import h from "./hub.module.css";

// The tool directory: category links, an instant search, and the cards grouped by category.
// It renders in full on the server, so every card and link is in the HTML; search only hides cards in the browser.

export type DirectoryTool = { slug: string; href: string; name: string; description: string; cta: string; image: string };
export type DirectoryGroup = { id: string; label: string; heading: string; intro: string; tools: DirectoryTool[] };

export function ToolCard({ tool, featured, priority }: { tool: DirectoryTool; featured?: boolean; priority?: boolean }) {
  return (
    <Link href={tool.href} className={featured ? `${h.card} ${h.cardFeatured}` : h.card}>
      <div className={h.cardArt}>
        <Image
          src={tool.image}
          alt=""
          width={800}
          height={600}
          sizes={featured ? "(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 380px" : "(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 360px"}
          className={h.cardImg}
          priority={priority}
        />
      </div>
      <div className={h.cardBody}>
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

const matches = (t: DirectoryTool, q: string) => `${t.name} ${t.description}`.toLowerCase().includes(q);

export function Directory({ groups }: { groups: DirectoryGroup[] }) {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const shown = useMemo(() => groups.map((g) => ({ ...g, tools: q ? g.tools.filter((t) => matches(t, q)) : g.tools })).filter((g) => g.tools.length), [groups, q]);
  const count = shown.reduce((n, g) => n + g.tools.length, 0);
  const total = groups.reduce((n, g) => n + g.tools.length, 0);

  return (
    <div id="all-tools" className={h.directory}>
      <div className={h.toolbar}>
        <nav aria-label="Tool categories" className={h.catNav}>
          <a href="#all-tools" className={h.cat}>
            All tools <span className={h.catCount}>{total}</span>
          </a>
          {groups.map((g) => (
            <a key={g.id} href={`#${g.id}`} className={h.cat} onClick={() => setQuery("")}>
              {g.label} <span className={h.catCount}>{g.tools.length}</span>
            </a>
          ))}
        </nav>
        <div className={h.search}>
          <label htmlFor="tool-search" className={h.srOnly}>
            Search free tools
          </label>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden className={h.searchIcon}>
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input id="tool-search" type="search" className={h.searchInput} placeholder="Search free tools..." value={query} onChange={(e) => setQuery(e.target.value)} autoComplete="off" />
        </div>
      </div>

      <p className={h.srOnly} aria-live="polite" role="status">
        {q ? `${count} ${count === 1 ? "tool matches" : "tools match"} "${query.trim()}"` : ""}
      </p>

      {shown.length ? (
        shown.map((g) => (
          <section key={g.id} id={g.id} className={h.group} aria-labelledby={`${g.id}-h`}>
            <header className={h.groupHead}>
              <h2 id={`${g.id}-h`} className={h.groupTitle}>
                {g.heading}
              </h2>
              <p className={h.groupIntro}>{g.intro}</p>
            </header>
            <ul className={h.grid}>
              {g.tools.map((t) => (
                <li key={t.slug}>
                  <ToolCard tool={t} />
                </li>
              ))}
            </ul>
          </section>
        ))
      ) : (
        <div className={h.empty}>
          <p className={h.emptyTitle}>No tools match &ldquo;{query.trim()}&rdquo;</p>
          <p className={h.emptyText}>Try a platform or a task, like &ldquo;Instagram&rdquo;, &ldquo;bio&rdquo; or &ldquo;caption&rdquo;.</p>
          <button type="button" className={h.emptyButton} onClick={() => setQuery("")}>
            Show all tools
          </button>
        </div>
      )}
    </div>
  );
}
