import type { ReactNode } from "react";
import type { ToolArt } from "@/lib/tools/art";
import x from "./explainer.module.css";

// Shared layouts for teaching sections on tool pages: copy beside an illustration that shows the same idea,
// and a quiet step flow (input, what happens, result) in place of big decorative numbers.
// Used by the studio template, the editorial SEO template and the hand built tool pages.

/** A local image: an SVG or a pre sized WebP, so next/image would only add a round trip. Lazy, with its real size to stop layout shift. */
export function ArtImage({ art, className }: { art: ToolArt; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={art.src} alt={art.alt} width={art.width} height={art.height} loading="lazy" decoding="async" className={className ?? x.img} />;
}

/** Copy on one side, the illustration on the other. `flip` puts the image first on wide screens; phones always read the copy first. */
export function Explainer({ art, flip, children, className }: { art: ToolArt; flip?: boolean; children: ReactNode; className?: string }) {
  return (
    <div className={`${x.explainer} ${flip ? x.flip : ""} ${className ?? ""}`}>
      <div className={x.copy}>{children}</div>
      <figure className={x.figure}>
        <ArtImage art={art} />
      </figure>
    </div>
  );
}

/** How a tool works, as a short vertical flow. The step label stays small: the order matters, the number is not decoration. */
export function FlowSteps({ steps, className }: { steps: { title: ReactNode; text: ReactNode }[]; className?: string }) {
  return (
    <ol className={`${x.flow} ${className ?? ""}`}>
      {steps.map((s, i) => (
        <li key={i} className={x.flowStep}>
          <span className={x.flowLabel}>Step {i + 1}</span>
          <h3 className={x.flowTitle}>{s.title}</h3>
          <p className={x.flowText}>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
