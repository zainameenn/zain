import Link from "next/link";
import type { ReactNode } from "react";
import s from "../changelog.module.css";

// Small Markdown renderer for changelog entries: ## and ### headings, - lists, paragraphs,
// [links](url) and **bold**. Enough for release notes without adding a Markdown dependency.

function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) {
      const href = m[2];
      out.push(
        href.startsWith("/") ? (
          <Link key={m.index} href={href}>
            {m[1]}
          </Link>
        ) : (
          <a key={m.index} href={href} target="_blank" rel="noreferrer">
            {m[1]}
          </a>
        ),
      );
    } else out.push(<strong key={m.index}>{m[3]}</strong>);
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Markdown({ source }: { source: string }) {
  const blocks: ReactNode[] = [];
  let list: string[] = [];
  let para: string[] = [];
  const flush = () => {
    if (para.length) blocks.push(<p key={blocks.length}>{inline(para.join(" "))}</p>);
    if (list.length)
      blocks.push(
        <ul key={blocks.length}>
          {list.map((li, i) => (
            <li key={i}>{inline(li)}</li>
          ))}
        </ul>,
      );
    para = [];
    list = [];
  };
  for (const raw of source.split("\n")) {
    const line = raw.trim();
    const h = line.match(/^(#{2,4})\s+(.*)$/);
    const li = line.match(/^[-*]\s+(.*)$/);
    if (h) {
      flush();
      const Tag = h[1].length === 2 ? "h2" : "h3";
      blocks.push(<Tag key={blocks.length}>{inline(h[2])}</Tag>);
    } else if (li) {
      if (para.length) flush();
      list.push(li[1]);
    } else if (!line) flush();
    else {
      if (list.length) flush();
      para.push(line);
    }
  }
  flush();
  return <div className={s.prose}>{blocks}</div>;
}
