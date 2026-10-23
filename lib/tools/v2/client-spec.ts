import registry from "./prompts.json";

// What the browser needs to draw a v2 tool: fields with their options resolved, limits, upload rules,
// refine chips and an example input. Built on the server, so the prompts never ship to the client.

export type V2Field = {
  key: string;
  label: string;
  type: "segmented" | "select" | "combobox" | "text" | "textarea" | "toggle" | "file" | "multiselect" | "date";
  required: boolean;
  basic: boolean;
  options?: string[];
  default?: string | boolean | string[];
  placeholder?: string;
  maxLength?: number;
  allowCustom?: boolean;
  help?: string;
};

export type V2Spec = {
  toolId: string;
  slug: string;
  name: string;
  contract: "content" | "calendar" | "deterministic_url";
  format: string;
  limits: { hardMax?: number; byField?: Record<string, number>; emojiWeight: number; maxHashtags?: number };
  media: { accepts: string[]; maxFiles: number; purpose?: string };
  chips: string[];
  fields: V2Field[];
  example: Record<string, unknown>;
};

/* eslint-disable @typescript-eslint/no-explicit-any */
const REG = registry as any;

/** The first example input in the tool spec, used by "Try an example". Only keys the form has. */
function exampleFrom(tool: any, keys: Set<string>): Record<string, unknown> {
  const m = String(tool.tool_spec ?? "").match(/<example_1>\s*<input>([\s\S]*?)<\/input>/);
  if (!m) return {};
  try {
    const raw = JSON.parse(m[1]) as Record<string, unknown>;
    return Object.fromEntries(Object.entries(raw).filter(([k]) => keys.has(k)));
  } catch {
    return {};
  }
}

export function v2SpecForSlug(slug: string): V2Spec | null {
  const entry = Object.entries(REG.tools as Record<string, any>).find(([, t]) => t.slug === slug);
  if (!entry) return null;
  const [toolId, tool] = entry;
  const fields: V2Field[] = (tool.fields as any[]).map((f) => ({
    key: f.key,
    label: f.label,
    type: f.type,
    required: Boolean(f.required),
    basic: f.section === "basic",
    options: f.options ?? (f.options_ref ? REG.option_sets[f.options_ref] : undefined),
    default: f.default,
    placeholder: f.placeholder,
    maxLength: f.max_length,
    allowCustom: Boolean(f.allow_custom),
    help: f.help,
  }));
  return {
    toolId,
    slug,
    name: tool.display_name,
    contract: tool.output_contract,
    format: tool.format,
    limits: { hardMax: tool.limits?.hard_max_chars, byField: tool.limits?.hard_max_chars_by_field, emojiWeight: tool.limits?.emoji_weight ?? 1, maxHashtags: tool.limits?.max_hashtags },
    media: { accepts: tool.media?.accepts ?? [], maxFiles: tool.media?.max_files ?? 0, purpose: tool.media?.purpose },
    chips: tool.refine_chips ? (REG.refine_chips[tool.refine_chips] ?? []) : [],
    fields,
    example: exampleFrom(tool, new Set(fields.map((f) => f.key))),
  };
}
