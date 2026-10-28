import type { ReactNode } from "react";
import { bodyFont, displayFont } from "./fonts";
import e from "./editorial.module.css";

// Shared building blocks for pages on the editorial design system.

/** Wraps a page: loads Lora and Figtree and applies the design tokens. */
export function EditorialPage({ children }: { children: ReactNode }) {
  return <main id="top" className={`${e.theme} ${displayFont.variable} ${bodyFont.variable}`} style={{ overflowX: "clip" }}>{children}</main>;
}

/** Selective emphasis inside a heading. Use at most one per heading, and only where it adds meaning. */
export function Em({ children, variant = "green" }: { children: ReactNode; variant?: "green" | "bold" | "mark" }) {
  const cls = variant === "mark" ? e.emMark : variant === "bold" ? e.emBold : e.emGreen;
  return <em className={cls}>{children}</em>;
}

/** Eyebrow, H2, optional supporting text and action. Left aligned; "split" puts the text beside the heading. */
export function SectionHeading({ eyebrow, title, intro, action, split, id }: { eyebrow?: string; title: ReactNode; intro?: ReactNode; action?: ReactNode; split?: boolean; id?: string }) {
  return (
    <header className={split ? `${e.head} ${e.headSplit}` : e.head}>
      <div className={e.headText}>
        {eyebrow ? <p className={e.eyebrow} style={{ margin: 0 }}>{eyebrow}</p> : null}
        <h2 id={id} className={e.h2}>{title}</h2>
      </div>
      {intro || action ? (
        <div className={e.headText}>
          {intro ? <p className={e.body}>{intro}</p> : null}
          {action}
        </div>
      ) : null}
    </header>
  );
}

/** One of the local SVG illustrations, sized from its viewBox so it never shifts the layout. */
export function Illustration({ src, alt, width, height, priority }: { src: string; alt: string; width: number; height: number; priority?: boolean }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} width={width} height={height} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : undefined} decoding="async" className={e.art} />;
}

export { e as ed };
