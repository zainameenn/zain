/** A character window from the library's "Code check" line. */
export type Window = { min: number; max: number };

/** One tool's entry in the Prompt Library. */
export type LibraryPrompt = {
  /** The tool prompt, word for word, with each {field} placeholder removed so INPUTS lists labels only. */
  prompt: string;
  /** Shared core sent between MASTER and this prompt. */
  family?: "naming" | "checker" | "data" | "calculator";
  /** "text": one piece of writing in {"text"}. "json": the shape under RETURN. */
  output: "text" | "json";
  /** For "text" tools, what the result is ("bio", "caption"), used in the JSON wrapper. */
  what?: string;
  /** Character windows to enforce in code: one window, or one per Length option. */
  window?: Window | Record<string, Window>;
  /** Short tools run with low thinking, long ones with the default. */
  short?: boolean;
};
