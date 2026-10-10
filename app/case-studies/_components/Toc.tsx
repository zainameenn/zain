"use client";

import { useEffect, useState } from "react";
import { EYEBROW, GOLD, INK, LINE } from "./styles";

/** "On this page" side rail. Highlights the section currently in view. */
export function Toc({ items }: { items: { id: string; label: string }[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const onScroll = () => {
      let current = items[0]?.id;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <aside aria-label="On this page" className="hidden xl:block" style={{ position: "relative" }}>
      <nav style={{ position: "sticky", top: 112, paddingTop: "clamp(40px,4vw,56px)" }}>
        <div style={{ ...EYEBROW, textAlign: "center" }}>On this page</div>
        <ol style={{ margin: "16px 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", borderTop: `1px solid ${LINE}` }}>
          {items.map(({ id, label }) => {
            const on = active === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={on ? "true" : undefined}
                  className={on ? "" : "!text-[#5A5854] hover:!text-[#1C1C1C]"}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: 44, borderBottom: `2px solid ${on ? GOLD : "transparent"}`, fontSize: 14.5, fontWeight: on ? 600 : 500, color: on ? INK : undefined }}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}
