import { ANALYSIS } from "./analysis";
import { COMMERCE } from "./commerce";
import { COPY } from "./copy";
import { CALCULATOR_CORE, CHECKER_CORE, DATA_CORE, MASTER, NAMING_CORE, asText } from "./core";
import { LINKEDIN_NEW } from "./linkedin";
import { LISTS } from "./lists";
import { PROFESSIONAL } from "./professional";
import { SOCIAL } from "./social";
import type { LibraryPrompt } from "./types";
import { VIDEO } from "./video";

// The zainameen.com Free Tools Prompt Library, keyed by tool slug.

export const LIBRARY: Record<string, LibraryPrompt> = { ...SOCIAL, ...VIDEO, ...PROFESSIONAL, ...LISTS, ...COMMERCE, ...COPY, ...ANALYSIS, ...LINKEDIN_NEW };

const CORES = { naming: NAMING_CORE, checker: CHECKER_CORE, data: DATA_CORE, calculator: CALCULATOR_CORE };

/** Gemini's systemInstruction for a tool: MASTER, the family core when there is one, then the tool prompt and our JSON wrapper. */
export function systemFor(slug: string): string {
  const p = LIBRARY[slug];
  if (!p) throw new Error(`No library prompt for ${slug}`);
  const parts = [MASTER, p.family ? CORES[p.family] : "", p.prompt, p.output === "text" ? asText(p.what ?? "result").trim() : ""];
  return parts.filter(Boolean).join("\n\n");
}

export type { LibraryPrompt } from "./types";
