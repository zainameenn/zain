import type { RichText } from "../_data/types";
import { GOLD_LIGHT, GOLD_TEXT, INK, SERIF } from "./styles";

/** Renders data file text with its inline bold, gold and serif accent parts. */
export function Rich({ text }: { text: RichText }) {
  if (typeof text === "string") return <>{text}</>;
  return (
    <>
      {text.map((part, i) => {
        if (typeof part === "string") return <span key={i}>{part}</span>;
        if ("bold" in part) return <strong key={i} style={{ color: INK, fontWeight: 600 }}>{part.bold}</strong>;
        if ("gold" in part) return <span key={i} style={{ color: GOLD_LIGHT }}>{part.gold}</span>;
        return (
          <span key={i} style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: "1.15em", letterSpacing: 0, color: GOLD_TEXT }}>
            {part.accent}
          </span>
        );
      })}
    </>
  );
}
