import type { CSSProperties } from "react";

/** Page H1: fluid size so it is the largest headline on every screen, wrapping evenly. */
export const H1_STYLE: CSSProperties = {
  margin: 0,
  fontFamily: "'General Sans', 'General Sans Fallback'",
  fontWeight: 600,
  fontSize: "clamp(2rem, calc(4vw + 1rem), 4rem)",
  lineHeight: 1.1,
  letterSpacing: "-0.035em",
  textWrap: "balance",
};

/** Inner page hero H1: page H1 type at the homepage hero size, so the two part headline fits. */
export const HERO_H1_STYLE: CSSProperties = {
  ...H1_STYLE,
  fontSize: "clamp(2rem, calc(2.6vw + 1.25rem), 3.625rem)",
};

/** Italic serif accent inside a hero H1, matching the homepage hero. */
export const H1_ACCENT_STYLE: CSSProperties = {
  fontFamily: "var(--nf-serif),serif",
  fontStyle: "italic",
  fontWeight: 400,
  letterSpacing: "-0.01em",
  fontSize: "1.1em",
  lineHeight: 0.95,
};

/** Former display lines, now subheads under the H1: always smaller than the H1. */
export const SUBHEAD_SIZE = "clamp(1.5rem, calc(2.2vw + 0.75rem), 2.5rem)";
