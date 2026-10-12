import { BLOCKS, calendarSlots, fill, type ToolBlock } from "@/lib/tools/blocks";
import { CORE_PROMPT } from "@/lib/tools/core";
import { ModelError, generate, type Turn } from "@/lib/tools/gemini";
import { getTool } from "@/lib/tools/registry";
import type { ToolInput, ToolPage } from "@/lib/tools/types";
import { countChars, fullText, nearDuplicates, resolveLimit, retryMessage, stripTrailingSeparators, type Option, type Problem } from "@/lib/tools/validate";

// One route for every AI tool. Prompts never leave the server.
// Rate limiting happens before this route, in a Vercel Firewall rule on /api/tools.
// Visitor inputs are never logged.

export const runtime = "nodejs";
export const maxDuration = 60;

// Google keeps these aliases pointed at its current Flash and Pro models. Override with env vars to pin a version.
const MODELS = {
  fast: process.env.TOOLS_MODEL_FAST || "gemini-flash-latest",
  strong: process.env.TOOLS_MODEL_STRONG || "gemini-pro-latest",
};
/** Room for the model's thinking on top of the spec's output budget, so replies are never cut short. */
const THINKING_ROOM = { fast: 4000, strong: 8000 };
const MAX_BODY = 16000;
const MAX_DRAFT = 8000;

type Reply = Record<string, unknown>;
type Extra = { rewrite?: unknown; current?: unknown; selected_hook?: unknown; slot?: unknown };

const json = (body: unknown, status = 200) => Response.json(body, { status });
/** Angle brackets are removed so visitor text can't close a prompt tag. */
const clean = (s: string) => s.replace(/[<>]/g, "");
const strings = (v: unknown) => (Array.isArray(v) ? v.filter((s): s is string => typeof s === "string") : []);

/** Checks every answer against the page's fields. Returns prompt ready strings or a message for the visitor. */
function readInput(tool: ToolPage, raw: unknown): Record<string, string> | string {
  const input = (raw && typeof raw === "object" ? raw : {}) as ToolInput;
  const out: Record<string, string> = {};
  for (const f of tool.workspace.fields) {
    const v = input[f.name];
    // Fields that only show in another mode (e.g. "current bio" in Improve mode) are ignored when hidden.
    if (f.when && input[f.when.field] !== f.when.equals) {
      out[f.name] = "";
      continue;
    }
    if (f.type === "mode") {
      out[f.name] = typeof v === "string" && f.options.some((o) => o.value === v) ? v : f.defaultValue;
      continue;
    }
    if (f.type === "toggle") {
      out[f.name] = (typeof v === "boolean" ? v : f.defaultOn) ? "on" : "off";
      continue;
    }
    const s = typeof v === "string" ? v.trim() : "";
    if (!s && "required" in f && f.required) return `Please fill in "${f.label}".`;
    if ((f.type === "text" || f.type === "textarea") && s.length > f.maxLength) return `"${f.label}" is too long. Keep it under ${f.maxLength} characters.`;
    if ((f.type === "select" || f.type === "chips") && s && !f.options.includes(s)) return `Please pick an option for "${f.label}".`;
    if (f.type === "multi" && s) {
      const picked = s.split(",").map((x) => x.trim()).filter(Boolean);
      if (picked.some((p) => !f.options.includes(p))) return `Please pick options for "${f.label}".`;
      if (picked.length > f.max) return `Pick up to ${f.max} for "${f.label}".`;
    }
    if (f.type === "date" && s && !/^\d{4}-\d{2}-\d{2}$/.test(s)) return `Please pick a date for "${f.label}".`;
    out[f.name] = clean(s);
  }
  return out;
}

function parseReply(text: string): Reply | null {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end < start) return null;
  try {
    const parsed = JSON.parse(text.slice(start, end + 1));
    return parsed && typeof parsed === "object" ? (parsed as Reply) : null;
  } catch {
    return null;
  }
}

function readList(reply: Reply, out: Extract<ToolBlock["output"], { type: "list" }>): Option[] | null {
  const list = reply[out.listKey];
  if (!Array.isArray(list)) return null;
  const options = list.flatMap((item): Option[] => {
    const text = item?.[out.textKey];
    if (typeof text !== "string" || !text.trim()) return [];
    const label = item?.[out.labelKey];
    const option: Option = { label: typeof label === "string" ? label : "", text: stripTrailingSeparators(text) };
    if (out.hashtagsKey) option.hashtags = strings(item?.[out.hashtagsKey]).map((h) => (h.startsWith("#") ? h : `#${h}`));
    if (out.whyKey && typeof item?.[out.whyKey] === "string") option.why = item[out.whyKey];
    return [option];
  });
  return options.length ? options : null;
}

function readFields(reply: Reply, keys: { key: string }[]): Record<string, string> | null {
  const out: Record<string, string> = {};
  for (const { key } of keys) {
    const v = reply[key];
    if (typeof v !== "string" || !v.trim()) return null;
    out[key] = v.trim();
  }
  return out;
}

export async function POST(req: Request) {
  const body = await req.text();
  if (body.length > MAX_BODY) return json({ error: "That's more text than this tool can take. Please shorten your answers." }, 413);

  let data: { slug?: unknown; input?: unknown; extra?: Extra };
  try {
    data = JSON.parse(body);
  } catch {
    return json({ error: "Something broke on our side. Your answers are still here, so hit the button again." }, 400);
  }

  const tool = typeof data.slug === "string" ? getTool(data.slug) : undefined;
  const block = tool?.api ? BLOCKS[tool.api.block] : undefined;
  if (!tool?.api || !block) return json({ error: "This tool isn't available." }, 404);

  const answers = readInput(tool, data.input);
  if (typeof answers === "string") return json({ error: answers }, 400);

  const failText = tool.workspace.errorText;
  if (!process.env.GEMINI_API_KEY) {
    console.error("Tools API: GEMINI_API_KEY is not set.");
    return json({ error: failText }, 500);
  }

  const extra: Extra = data.extra && typeof data.extra === "object" ? data.extra : {};
  const vars: Record<string, string> = { ...tool.api.vars, ...answers };
  if (typeof extra.selected_hook === "string") vars.selected_hook = clean(extra.selected_hook.slice(0, 300));

  // Calendar: dates and platforms come from code. "Regenerate one row" sends just that slot.
  let slots =
    tool.api.block === "calendar"
      ? calendarSlots(answers.start ?? "", answers.frequency ?? "", (answers.platforms ?? "").split(",").map((p) => p.trim()).filter(Boolean))
      : null;
  if (slots && typeof extra.slot === "number") slots = slots.filter((s) => s.slot_id === extra.slot);
  if (slots) vars.slots = JSON.stringify(slots);

  let user = fill(block.user, vars);
  const rewrite = extra.rewrite === "shorter" || extra.rewrite === "punchier" || extra.rewrite === "funnier" ? extra.rewrite : null;
  const rewriteLine = rewrite ? block.rewrites?.[rewrite] : undefined;
  if (rewriteLine && typeof extra.current === "string" && extra.current.trim()) {
    user += `\n<current_draft>\n${clean(extra.current.slice(0, MAX_DRAFT))}\n</current_draft>\n${rewriteLine}`;
  }

  const result = tool.workspace.result;
  const limit = result.kind === "options" ? resolveLimit(result.limit, (data.input ?? {}) as ToolInput) : "limit" in result ? result.limit : 0;

  // The spec's temperatures stay in blocks.ts as data only: Google recommends the default temperature for current Gemini models.
  const request = {
    model: MODELS[block.model],
    maxOutputTokens: block.maxTokens + THINKING_ROOM[block.model],
    system: `${CORE_PROMPT}\n\n${fill(block.system, vars)}`,
  };
  const turns: Turn[] = [{ role: "user", text: user }];

  try {
    const first = await generate({ ...request, turns });
    if (first.blocked) return json({ error: failText }, 422);
    const reply = parseReply(first.text);
    if (reply && typeof reply.error === "string") return json({ error: reply.error }, 422);
    if (!reply) return json({ error: failText }, 502);
    const missingInfo = strings(reply.missing_info);
    const warnings = strings(reply.warnings);

    /** One retry naming only the failing items. Anything still over shows with a red counter. */
    const retry = async (problems: Problem[]) => {
      const second = await generate({ ...request, turns: [...turns, { role: "model", text: first.text }, { role: "user", text: retryMessage(problems, limit) }] });
      return second.blocked ? null : parseReply(second.text);
    };

    const out = block.output;
    if (out.type === "list") {
      const options = readList(reply, out);
      if (!options) return json({ error: failText }, 502);
      const over = options.flatMap((o, i) => (countChars(fullText(o)) > limit ? [i + 1] : []));
      const dupes = block.dedupe ? nearDuplicates(options.map((o) => o.text)).filter((n) => !over.includes(n)) : [];
      const failing = [...over, ...dupes];

      // Short idea lists (e.g. Instagram name field ideas) only exist when their limit is set for this platform.
      const ideaLimit = out.ideas ? Number(vars[out.ideas.limitVar]) || 0 : 0;
      const ideas = out.ideas && ideaLimit ? strings(reply[out.ideas.key]).map((s) => stripTrailingSeparators(s.trim())).filter(Boolean) : [];
      const ideasOver = ideas.flatMap((s, i) => (countChars(s) > ideaLimit ? [i + 1] : []));

      let final = options;
      let finalIdeas = ideas;
      if (failing.length || ideasOver.length) {
        const problems: Problem[] = [
          ...over.map((n) => ({ name: `Option ${n}`, count: countChars(fullText(options[n - 1])) })),
          ...dupes.map((n) => ({ name: `Option ${n}`, duplicate: true })),
          ...ideasOver.map((n) => ({ name: `Name idea ${n}`, count: countChars(ideas[n - 1]), limit: ideaLimit })),
        ];
        const retried = await retry(problems);
        const fixed = retried ? readList(retried, out) : null;
        if (fixed) final = options.map((o, i) => (failing.includes(i + 1) && fixed[i] ? fixed[i] : o));
        const fixedIdeas = retried && out.ideas ? strings(retried[out.ideas.key]).map((s) => stripTrailingSeparators(s.trim())) : [];
        finalIdeas = ideas.map((s, i) => (ideasOver.includes(i + 1) && fixedIdeas[i] ? fixedIdeas[i] : s));
      }
      const top = Object.fromEntries((out.topKeys ?? []).map((k) => [k, strings(reply[k])]));
      const ideaData = out.ideas && ideaLimit ? { [out.ideas.key]: finalIdeas } : {};
      return json({ data: { options: final, ...top, ...ideaData }, missingInfo, warnings });
    }

    if (out.type === "fields") {
      const fields = readFields(reply, out.keys);
      if (!fields) return json({ error: failText }, 502);
      const over = out.keys.filter(({ key }) => countChars(fields[key]) > limit);
      let final = fields;
      if (over.length) {
        const retried = await retry(over.map(({ key, name }) => ({ name, count: countChars(fields[key]) })));
        const fixed = retried ? readFields(retried, out.keys) : null;
        if (fixed) final = { ...fields, ...Object.fromEntries(over.map(({ key }) => [key, fixed[key]])) };
      }
      const kept = Object.fromEntries((out.keep ?? []).map((k) => [k, reply[k]]));
      return json({ data: { ...kept, ...final }, missingInfo, warnings });
    }

    if (!(out.requiredKey in reply)) return json({ error: failText }, 502);
    const rest = Object.fromEntries(Object.entries(reply).filter(([k]) => k !== "missing_info" && k !== "warnings"));
    return json({ data: slots ? { ...rest, slots } : rest, missingInfo, warnings });
  } catch (error) {
    // 429: Google's quota or rate limit. 503: Gemini is overloaded. Either way the visitor keeps their answers.
    if (error instanceof ModelError && (error.status === 429 || error.status === 503)) {
      return json({ error: failText }, 503);
    }
    console.error("Tools API: model call failed.", error instanceof ModelError ? error.status : error instanceof Error ? error.name : "unknown");
    return json({ error: failText }, 502);
  }
}
