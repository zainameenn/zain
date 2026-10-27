import type { CSSProperties } from "react";
import { ILLUSTRATIONS, type IllustrationId } from "@/lib/illustrations";

type ArtProps = {
  id: IllustrationId;
  /** Caps the drawing's width; it always shrinks to fit its column. */
  maxWidth?: number;
  /** Only for an above the fold hero. */
  priority?: boolean;
  /** Empty alt when the text next to it already says everything. */
  decorative?: boolean;
  style?: CSSProperties;
  className?: string;
};

/** One of the original editorial SVG illustrations. Sized from its viewBox so it never shifts the layout. */
export function Art({ id, maxWidth, priority, decorative, style, className }: ArtProps) {
  const a = ILLUSTRATIONS[id];
  return (
    <figure className={className} style={{ margin: "0 auto", minWidth: 0, width: "100%", maxWidth, ...style }}>
      {/* Local SVGs: next/image would only add an optimization round trip. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={a.src}
        alt={decorative ? "" : a.alt}
        width={a.width}
        height={a.height}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        style={{ display: "block", width: "100%", height: "auto" }}
      />
    </figure>
  );
}
