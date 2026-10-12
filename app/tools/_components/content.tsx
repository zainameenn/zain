import Link from "next/link";
import type { ReactNode } from "react";
import type { Rich, SectionBlock } from "@/lib/tools/types";
import s from "../tools.module.css";

// Server rendered content pieces for tool pages and the hub.

const TOKEN = /(\*\*[^*]+\*\*|\[[^\]]+\]\(https?:\/\/[^)\s]+\))/g;

/** Renders the only markup the configs use: **bold** and [text](https://link). */
export function rich(text: Rich): ReactNode[] {
  return text.split(TOKEN).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={i}>{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)$/);
    if (link) {
      return (
        <a key={i} href={link[2]} target="_blank" rel="noopener noreferrer">
          {link[1]}
        </a>
      );
    }
    return part;
  });
}

/** Same text without markup, for structured data. */
export const plain = (text: Rich) => text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

export function Blocks({ blocks }: { blocks: SectionBlock[] }) {
  return (
    <>
      {blocks.map((b, i) =>
        "p" in b ? (
          <p key={i}>{rich(b.p)}</p>
        ) : "ol" in b ? (
          <ol key={i}>
            {b.ol.map((item) => (
              <li key={item}>{rich(item)}</li>
            ))}
          </ol>
        ) : "ul" in b ? (
          <ul key={i} className={s.formulas}>
            {b.ul.map((item) => (
              <li key={item}>{rich(item)}</li>
            ))}
          </ul>
        ) : "h3" in b ? (
          <h3 key={i} className={s.h3}>
            {b.h3}
          </h3>
        ) : (
          <div key={i} className={s.tableWrap}>
            <table className={s.contentTable}>
              <thead>
                <tr>
                  {b.table.head.map((h) => (
                    <th key={h} scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.table.rows.map((r) => (
                  <tr key={r.join("|")}>
                    {r.map((c, j) => (
                      <td key={j}>{rich(c)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
      )}
    </>
  );
}

/** Section content: a paragraph right under the H2 becomes the centered intro; everything else stays left aligned. */
export function SectionBody({ blocks }: { blocks: SectionBlock[] }) {
  const [first, ...rest] = blocks;
  if (first && "p" in first) {
    return (
      <>
        <p className={s.sectionIntro}>{rich(first.p)}</p>
        <Blocks blocks={rest} />
      </>
    );
  }
  return <Blocks blocks={blocks} />;
}

export function Crumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className={s.crumbs}>
      <ol>
        {items.map((item) => (
          <li key={item.name} aria-current={item.href ? undefined : "page"}>
            {item.href ? <Link href={item.href}>{item.name}</Link> : item.name}
          </li>
        ))}
      </ol>
    </nav>
  );
}
