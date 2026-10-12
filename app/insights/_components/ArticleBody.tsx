import Link from "next/link";
import { PortableText, stegaClean, type PortableTextBlock, type PortableTextComponents } from "next-sanity";
import type { SanityImage as SanityImageValue } from "@/sanity/lib/types";
import { SanityImage } from "./SanityImage";
import { paragraphs, postPath, type TocItem } from "./utils";
import s from "../insights.module.css";

type CalloutValue = { tone?: "takeaway" | "tip" | "warning" | "note"; title?: string; body?: string };
type TableValue = { table?: { rows?: { _key: string; cells?: string[] }[] }; caption?: string };

const TONE_CLASS: Record<string, string> = { warning: s.calloutWarning, tip: s.calloutTip };
const TONE_LABEL: Record<string, string> = { takeaway: "Key takeaway", tip: "Tip", warning: "Warning", note: "Note" };

const isOwnSite = (href: string) => href.startsWith("/") || href.startsWith("#") || /^https?:\/\/(www\.)?zainameen\.com/.test(href);

export function ArticleBody({ value, toc }: { value: PortableTextBlock[]; toc: TocItem[] }) {
  const ids = new Map(toc.map((t) => [t.key, t.id]));
  const idFor = (key?: string) => (key ? ids.get(key) : undefined);

  const components: PortableTextComponents = {
    block: {
      h2: ({ children, value }) => <h2 id={idFor(value._key)}>{children}</h2>,
      h3: ({ children, value }) => <h3 id={idFor(value._key)}>{children}</h3>,
      h4: ({ children }) => <h4>{children}</h4>,
      blockquote: ({ children }) => <blockquote>{children}</blockquote>,
    },
    marks: {
      link: ({ children, value }) => {
        const href = stegaClean((value?.href as string) ?? "");
        const newTab = Boolean(value?.openInNewTab);
        if (isOwnSite(href) && !newTab) {
          return <Link href={href.replace(/^https?:\/\/(www\.)?zainameen\.com/, "") || "/"}>{children}</Link>;
        }
        return (
          <a href={href} {...(newTab ? { target: "_blank", rel: isOwnSite(href) ? "noopener" : "noopener noreferrer" } : {})}>
            {children}
          </a>
        );
      },
      internalLink: ({ children, value }) => {
        const slug = value?.slug as string | undefined;
        // If the linked article was deleted or unpublished, keep the text and drop the link.
        return slug ? <Link href={postPath(stegaClean(slug))}>{children}</Link> : <>{children}</>;
      },
    },
    types: {
      image: ({ value }: { value: SanityImageValue & { caption?: string } }) => (
        <figure>
          <SanityImage image={value} sizes="(min-width: 800px) 760px, 100vw" widths={[480, 760, 1080, 1520]} />
          {value.caption ? <figcaption>{value.caption}</figcaption> : null}
        </figure>
      ),
      callout: ({ value }: { value: CalloutValue }) => {
        const tone = stegaClean(value.tone) ?? "takeaway";
        return (
          <aside className={`${s.callout} ${TONE_CLASS[tone] ?? ""}`}>
            <strong className={s.calloutTitle}>{value.title || TONE_LABEL[tone] || "Note"}</strong>
            {paragraphs(value.body).map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </aside>
        );
      },
      tableBlock: ({ value }: { value: TableValue }) => {
        const rows = value.table?.rows ?? [];
        if (!rows.length) return null;
        const [head, ...rest] = rows;
        return (
          <div>
            <div className={s.tableWrap}>
              <table>
                <thead>
                  <tr>
                    {(head.cells ?? []).map((cell, i) => (
                      <th key={i} scope="col">
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rest.map((row) => (
                    <tr key={row._key}>
                      {(row.cells ?? []).map((cell, i) => (
                        <td key={i}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {value.caption ? <p className={s.tableCaption}>{value.caption}</p> : null}
          </div>
        );
      },
    },
  };

  return (
    <div className={s.body}>
      <PortableText value={value} components={components} />
    </div>
  );
}
