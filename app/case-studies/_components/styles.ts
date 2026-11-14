import type { CSSProperties } from "react";

export const INK = "#202821";
export const MUTED = "#4A524B";
export const BODY = "#4A524B";
export const LINE = "#E4E0D6";
export const CARD = "#F6F4EF";
export const GOLD = "#B38842";
export const GOLD_TEXT = "#7A5C33";
export const GOLD_LIGHT = "#D3AE82";

export const GENERAL_SANS = "var(--nf-general-sans)";
export const SERIF = "var(--nf-serif),serif";

/** Small uppercase label above headings and on captions. */
export const EYEBROW: CSSProperties = { fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: MUTED };

/** Italic serif second line of a section heading. */
export const ACCENT_LINE: CSSProperties = { display: "block", fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", color: "#687068" };

export const SECTION_H2: CSSProperties = {
  margin: "12px 0 0",
  fontFamily: GENERAL_SANS,
  fontWeight: 600,
  fontSize: "clamp(32px,3.4vw,48px)",
  lineHeight: 1.06,
  letterSpacing: "-0.035em",
  textWrap: "balance",
};

export const SECTION_GAP = "clamp(72px,7vw,104px)";
export const CARD_PAD = "clamp(22px,2.4vw,32px)";
