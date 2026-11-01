import { LINKEDIN_ACTIONS, LINKEDIN_BY_SLUG, liCount, windowFor, type LinkedInAction, type LinkedInTool } from "@/lib/tools/families/linkedin-choices";
import { sensitiveIn } from "@/lib/tools/ai/gateway";
import { ModelError, generateWithFallback, type Turn } from "@/lib/tools/gemini";
import { labeled, lengthRetry, missBy, regenerate } from "@/lib/tools/prompts/core";
import { systemFor } from "@/lib/tools/prompts";

// One endpoint for the six LinkedIn tools. Each run sends the Prompt Library's MASTER prompt plus the tool's
// own prompt as the system instruction, and the visitor's answers as one labeled line per field.
// Every writing tool returns ONE result; the Skills tool returns one organised list.
// Rate limiting happens before this route, in the Vercel Firewall rule on /api/tools.

export const runtime = "nodejs";
export const maxDuration = 60;

const MODEL = process.env.TOOLS_MODEL_FAST || "gemini-flash-lite-latest";
const MAX_BODY = 16000;
const FAIL = "That couldn't be written just now. Your answers are still here, so please try again.";

const json = (body: unknown, status = 200) => Response.json(body, { status });
const clean = (s: string) => s.replace(/[<>]/g, "").trim();

/** The library's banned words and phrases, checked in code because a model can slip. */
const BANNED = /\b(elevate[sd]?|unlock(s|ed|ing)?|unleash(es|ed)?|delve|dive in|seamless(ly)?|game ?changer|cutting edge|robust|leverag(e|es|ed|ing)|synergy|empower(s|ed|ing)?|transform your|journey|tapestry|realm|navigate the|testament|embark|in today's fast paced world|look no further|passionate about|take it to the next level|one stop shop|here's the thing|let's be honest|thrilled to|excited to share)\b/gi;

type Input = { tool: LinkedInTool; values: Record<string, string>; lines: string; previous: string; action: LinkedInAction | null; current: string };

function readInput(raw: Record<string, unknown>): Input | string {
  const tool = LINKEDIN_BY_SLUG[String(raw.slug ?? "")];
  if (!tool) return "That tool doesn't exist.";
  const given = raw.values && typeof raw.values === "object" ? (raw.values as Record<string, unknown>) : {};
  const values: Record<string, string> = {};
  const rows: [string, unknown][] = [];
  for (const f of tool.fields) {
    const v = typeof given[f.key] === "string" ? (given[f.key] as string).trim() : "";
    if (f.type === "select") {
      const pick = f.options.includes(v) ? v : f.options[0];
      values[f.key] = pick;
      if (pick === "Other") {
        const other = typeof given[`${f.key}Other`] === "string" ? clean((given[`${f.key}Other`] as string).slice(0, 80)) : "";
        rows.push([f.prompt, other || "Other"]);
      } else rows.push([f.prompt, pick]);
    } else {
      if (v.length > f.max) return "One of your answers is too long. Please shorten it.";
      if (f.required && !v) return `Please fill in "${f.label}".`;
      values[f.key] = clean(v);
      rows.push([f.prompt, values[f.key]]);
    }
  }
  const found = sensitiveIn(Object.values(values).join("\n"));
  if (found) return `It looks like you included ${found}. Please remove it before generating.`;
  const action = typeof raw.action === "string" && raw.action in LINKEDIN_ACTIONS ? (raw.action as LinkedInAction) : null;
  const current = typeof raw.current === "string" ? clean(raw.current.slice(0, 3200)) : "";
  const previous = typeof raw.previous === "string" ? clean(raw.previous.slice(0, 3200)) : "";
  return { tool, values, lines: labeled(rows), previous, action: action && current ? action : null, current };
}

function parse(text: string): Record<string, unknown> | null {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end < start) return null;
  const raw = text.slice(start, end + 1);
  for (const candidate of [raw, escapeControls(raw)]) {
    try {
      const v = JSON.parse(candidate);
      if (v && typeof v === "object") return v;
    } catch {}
  }
  return null;
}

/** Gemini sometimes puts raw line breaks inside JSON strings, which JSON.parse rejects. Escape them. */
function escapeControls(s: string) {
  let out = "";
  let inString = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inString && c === "\\") {
      out += c + (s[i + 1] ?? "");
      i++;
      continue;
    }
    if (c === '"') inString = !inString;
    out += inString && c === "\n" ? "\\n" : inString && c === "\r" ? "\\r" : inString && c === "\t" ? "\\t" : c;
  }
  return out;
}

/** Dashes used as punctuation become commas, decorative letters go, spacing is tidied. Line breaks stay. */
const tidy = (s: string) =>
  s
    .normalize("NFC")
    .replace(/[\u{1D400}-\u{1D7FF}]/gu, "")
    .replace(/\s*[–—]\s*/g, ", ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim()
    .replace(/^["“]|["”]$/g, "");

const banned = (s: string) => [...new Set((s.match(BANNED) ?? []).map((w) => w.toLowerCase()))];

// ---------- Writing tools: one text result ----------

async function writeOne(input: Input, system: string) {
  const win = windowFor(input.tool, input.values);
  const hard = input.tool.hardMax ?? Infinity;
  const ask = input.action
    ? `${input.lines}\n\nCurrent draft:\n${input.current}\n\n${LINKEDIN_ACTIONS[input.action].instruction}`
    : `${input.lines}${regenerate(input.previous)}`;
  const turns: Turn[] = [{ role: "user", text: ask }];
  const request = { model: MODEL, system, maxOutputTokens: 4000 };

  const first = await generateWithFallback({ ...request, turns });
  if (first.blocked) return { blocked: true as const };
  const read = (t: string) => {
    const r = parse(t);
    if (!r) return "";
    // The model sometimes names the field after the result ("about_section"); take the first string then.
    const v = typeof r.text === "string" ? r.text : Object.values(r).find((x) => typeof x === "string");
    return typeof v === "string" ? tidy(v) : "";
  };
  let text = read(first.text);
  if (!text) {
    console.error("LinkedIn: unreadable reply", input.tool.slug, first.text.length);
    return { text: "" };
  }

  // One retry: the library's length message when the draft misses its window, plus any banned words.
  // "Make it shorter" is allowed to land under the window, so only its upper bound is checked.
  const n = liCount(text);
  const min = input.action === "shorter" ? 0 : (win?.min ?? 0);
  const max = Math.min(win?.max ?? hard, hard);
  const words = banned(text);
  const problems: string[] = [];
  if (n < min || n > max) problems.push(lengthRetry(n, min || 1, max));
  if (words.length) problems.push(`Do not use these words or phrases: ${words.join(", ")}.`);
  if (problems.length) {
    const second = await generateWithFallback({ ...request, turns: [...turns, { role: "model", text: first.text }, { role: "user", text: `${problems.join(" ")} Return the full JSON again.` }] }).catch(() => null);
    const again = second && !second.blocked ? read(second.text) : "";
    if (again) {
      // Keep the closer of the two to the window; a draft with banned words loses a tie.
      const score = (t: string) => missBy(liCount(t), min, max) * 10 + banned(t).length;
      if (score(again) <= score(text)) text = again;
    }
  }
  if (liCount(text) > hard) text = [...text].slice(0, hard).join("").replace(/\s+\S*$/, "");
  return { text, window: win };
}

// ---------- Skills: one organised list ----------

type Skill = { skill: string; group: string; evidence?: string; why?: string };
const GROUPS = ["Tools and technologies", "Industry knowledge", "Interpersonal skills"];
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9+#]/g, "");

async function skillsList(input: Input, system: string) {
  const ask = `${input.lines}${regenerate(input.previous)}`;
  const reply = await generateWithFallback({ model: MODEL, system, maxOutputTokens: 4000, turns: [{ role: "user", text: ask }] });
  if (reply.blocked) return { blocked: true as const };
  const r = parse(reply.text);
  if (!r) return { lists: null };
  const read = (k: string): Skill[] =>
    (Array.isArray(r[k]) ? (r[k] as unknown[]) : []).flatMap((x) => {
      const o = x as Record<string, unknown>;
      const skill = typeof o?.skill === "string" ? tidy(o.skill).slice(0, 60) : "";
      if (!skill || skill.split(/\s+/).length > 6) return [];
      return [{ skill, group: GROUPS.includes(o.group as string) ? (o.group as string) : GROUPS[0], evidence: typeof o.evidence === "string" ? tidy(o.evidence) : undefined, why: typeof o.why === "string" ? tidy(o.why) : undefined }];
    });
  // Confirmed skills must trace back to what the visitor typed; anything else moves to "suggested".
  const typed = input.values.have.split(/[,;\n]+/).map(norm).filter(Boolean);
  const isTyped = (s: string) => typed.some((t) => norm(s).includes(t) || t.includes(norm(s)));
  const seen = new Set<string>();
  const once = (s: Skill) => !seen.has(norm(s.skill)) && seen.add(norm(s.skill));
  const allConfirmed = read("confirmed");
  const confirmed = allConfirmed.filter((s) => isTyped(s.skill)).filter(once);
  const count = Number(input.values.count) || 10;
  const suggested = [...allConfirmed.filter((s) => !isTyped(s.skill)), ...read("suggested")].filter(once).slice(0, count);
  const wantsGaps = input.values.need !== "Skills for my current role" || Boolean(input.values.jd);
  const gaps = wantsGaps ? read("gaps").filter(once).slice(0, 5) : [];
  return { lists: { confirmed, suggested, gaps } };
}

export async function POST(req: Request) {
  const body = await req.text();
  if (body.length > MAX_BODY) return json({ error: "That's more text than this tool can take. Please shorten your answers." }, 413);
  let raw: Record<string, unknown>;
  try {
    raw = JSON.parse(body);
  } catch {
    return json({ error: FAIL }, 400);
  }
  const input = readInput(raw && typeof raw === "object" ? raw : {});
  if (typeof input === "string") return json({ error: input }, 400);
  if (!process.env.GEMINI_API_KEY) {
    console.error("LinkedIn tools: GEMINI_API_KEY is not set.");
    return json({ error: FAIL }, 500);
  }
  // Reinforces the library's FACTS rule where models most often embellish: stories about the visitor's own work.
  const system = `${systemFor(input.tool.slug)}\n\nSTORY FACTS\nDescribe only what the inputs say happened. Do not add steps, methods, tools, data sources, timeframes, metrics, causes or outcomes that are not in the inputs, even small ones. If a detail would help but was not given, leave it out.`;
  try {
    if (input.tool.kind === "skills") {
      const out = await skillsList(input, system);
      if ("blocked" in out) return json({ error: "Those details couldn't be used. Please try different wording." }, 422);
      if (!out.lists || !(out.lists.confirmed.length + out.lists.suggested.length)) return json({ error: FAIL }, 502);
      return json(out.lists);
    }
    const out = await writeOne(input, system);
    if ("blocked" in out) return json({ error: "Those details couldn't be used. Please try different wording." }, 422);
    if (!out.text) return json({ error: FAIL }, 502);
    return json({ text: out.text, window: out.window ?? null });
  } catch (error) {
    if (error instanceof ModelError && error.status === 429) return json({ error: "Lots of people are writing right now. Try again in a minute." }, 429);
    console.error("LinkedIn tool failed", input.tool.slug, error instanceof ModelError ? error.status : "unknown");
    return json({ error: FAIL }, 502);
  }
}
