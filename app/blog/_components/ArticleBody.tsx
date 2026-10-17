import Link from "next/link";
import { PortableText, stegaClean, type PortableTextBlock, type PortableTextComponents } from "next-sanity";
import type { SanityImage as SanityImageValue } from "@/sanity/lib/types";
import { SanityImage } from "./SanityImage";
import { paragraphs, postPath, type TocItem } from "./utils";
import s from "../blog.module.css";

type CalloutValue = { tone?: "takeaway" | "tip" | "warning" | "note" | "example" | "experience"; title?: string; body?: string };
type TableValue = { table?: { rows?: { _key: string; cells?: string[] }[] }; caption?: string };

const TONE_CLASS: Record<string, string> = { warning: s.calloutWarning, tip: s.calloutTip, note: s.calloutNote, example: s.calloutExample, experience: s.calloutExperience };
const TONE_LABEL: Record<string, string> = { takeaway: "Key takeaway", tip: "Tip", warning: "Warning", note: "Important note", example: "Practical example", experience: "From my experience" };

const isOwnSite = (href: string) => href.startsWith("/") || href.startsWith("#") || /^https?:\/\/(www\.)?zainameen\.com/.test(href);

/** H2 and H3 get stable ids (used by the table of contents) and a "#" link to copy the section address. */
function Heading({ level, id, children }: { level: 2 | 3; id?: string; children: React.ReactNode }) {
  const Tag = level === 2 ? "h2" : "h3";
  return (
    <Tag id={id}>
      {children}
      {id ? (
        <a href={`#${id}`} className={s.anchor} aria-label="Link to this section">
          #
        </a>
      ) : null}
    </Tag>
  );
}

export function ArticleBody({ value, toc }: { value: PortableTextBlock[]; toc: TocItem[] }) {
  const ids = new Map(toc.map((t) => [t.key, t.id]));
  const idFor = (key?: string) => (key ? ids.get(key) : undefined);

  const components: PortableTextComponents = {
    block: {
      h2: ({ children, value }) => <Heading level={2} id={idFor(value._key)}>{children}</Heading>,
      h3: ({ children, value }) => <Heading level={3} id={idFor(value._key)}>{children}</Heading>,
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
      codeBlock: ({ value }: { value: { filename?: string; code?: string } }) =>
        value.code ? (
          <figure className={s.code}>
            {value.filename ? <figcaption>{value.filename}</figcaption> : null}
            <pre>
              <code>{stegaClean(value.code)}</code>
            </pre>
          </figure>
        ) : null,
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
