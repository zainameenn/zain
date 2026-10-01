import type { CSSProperties } from "react";

/** Page H1: fluid size so it is the largest headline on every screen, wrapping evenly. */
export const H1_STYLE: CSSProperties = {
  margin: 0,
  fontFamily: "'General Sans'",
  fontWeight: 600,
  fontSize: "clamp(2rem, calc(4vw + 1rem), 4rem)",
  lineHeight: 1.1,
  letterSpacing: "-0.035em",
  textWrap: "balance",
};

/** Former display lines, now subheads under the H1: always smaller than the H1. */
export const SUBHEAD_SIZE = "clamp(1.5rem, calc(2.2vw + 0.75rem), 2.5rem)";
