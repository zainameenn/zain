// Character checks run in code, never in the model. Safe to import on the client (no prompts here).

import type { Limit, ToolInput } from "./types";

const segmenter = typeof Intl !== "undefined" && "Segmenter" in Intl ? new Intl.Segmenter("en", { granularity: "grapheme" }) : null;

/** Counts what a person sees as characters: one emoji is one, a line break is one. */
export function countChars(text: string): number {
  if (!segmenter) return Array.from(text).length;
  return Array.from(segmenter.segment(text)).length;
}

/** Splits text into visible characters, so typing animations never cut an emoji in half. */
export function graphemes(text: string): string[] {
  if (!segmenter) return Array.from(text);
  return Array.from(segmenter.segment(text), (g) => g.segment);
}

export const countWords =(text: string) => text.trim().split(/\s+/).filter(Boolean).length;

/** Removes separators the model sometimes leaves dangling at the end ("Shop now |", "Book today ·"). Never cuts words. */
export function stripTrailingSeparators(text: string): string {
  return text.replace(/[\s|·•,;:/\\-]+$/u, "").replace(/^\s+/, "");
}

/** Resolves a limit that may depend on a form answer. */
export function resolveLimit(limit: Limit, input: ToolInput): number {
  if (typeof limit === "number") return limit;
  const v = input[limit.field];
  return (typeof v === "string" && limit.map[v]) || limit.fallback;
}

export type Option = { label: string; text: string; hashtags?: string[]; why?: string };

/** The full text a visitor copies: hashtags go at the end. */
export const fullText = (o: Option) => (o.hashtags?.length ? `${o.text}\n\n${o.hashtags.join(" ")}` : o.text);

/** Word bigram similarity (0 to 1), used to catch near duplicate options. */
export function similarity(a: string, b: string): number {
  const grams = (s: string) => {
    const w = s.toLowerCase().split(/[\s.,!?:;"'()|·]+/).filter(Boolean);
    const out = new Map<string, number>();
    for (let i = 0; i < Math.max(1, w.length - 1); i++) {
      const g = w.slice(i, i + 2).join(" ");
      out.set(g, (out.get(g) ?? 0) + 1);
    }
    return out;
  };
  const A = grams(a);
  const B = grams(b);
  let shared = 0;
  let total = 0;
  for (const [g, n] of A) {
    shared += Math.min(n, B.get(g) ?? 0);
    total += n;
  }
  for (const n of B.values()) total += n;
  return total ? (2 * shared) / total : 0;
}

/** 1-based positions of options that repeat an earlier one (more than 80% alike). */
export function nearDuplicates(texts: string[]): number[] {
  return texts.flatMap((t, i) => (texts.slice(0, i).some((u) => similarity(t, u) > 0.8) ? [i + 1] : []));
}

/** limit: set when this item has its own limit (e.g. name ideas), otherwise the main limit applies. */
export type Problem = { name: string; count?: number; limit?: number; duplicate?: boolean };

/** The single retry message: names only the failing items. */
export function retryMessage(problems: Problem[], limit: number): string {
  const lower = (p: Problem) => p.name.charAt(0).toLowerCase() + p.name.slice(1);
  const long = problems.filter((p) => !p.duplicate);
  const dup = problems.filter((p) => p.duplicate);
  const parts: string[] = [];
  if (long.length) {
    parts.push(long.map((p) => `${p.name} is ${p.count} characters. The limit is ${p.limit ?? limit}.`).join(" "), `Shorten ${long.map(lower).join(" and ")}.`);
  }
  if (dup.length) {
    parts.push(`${dup.map((p) => p.name).join(" and ")} ${dup.length > 1 ? "are" : "is"} too close to another option. Rewrite ${dup.map(lower).join(" and ")} with a clearly different angle.`);
  }
  parts.push("Change nothing else. Reply with the full JSON again, keeping everything else exactly as it was.");
  return parts.join(" ");
}
