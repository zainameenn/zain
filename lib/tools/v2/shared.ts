// Free tools v2 helpers that are safe in the browser: no API key, no Node modules.
// Used by both the server pipeline and the client forms (UTM builder, combobox, counters).

const segmenter = typeof Intl !== "undefined" && "Segmenter" in Intl ? new Intl.Segmenter(undefined, { granularity: "grapheme" }) : null;
const EMOJI = /\p{Extended_Pictographic}/u;

/** Characters as people see them. Emoji count as `emojiWeight` (X counts them as 2). */
export function countChars(text: string, emojiWeight = 1): number {
  if (!segmenter) return [...text].length;
  let n = 0;
  for (const { segment } of segmenter.segment(text)) n += EMOJI.test(segment) ? emojiWeight : 1;
  return n;
}

// ---------- Combobox ranking ----------

const fold = (s: string) => s.normalize("NFD").replace(/\p{M}/gu, "").toLowerCase();

/**
 * Filters and ranks options for a typed query, case and accent insensitive:
 * starts with the query first, then any later word starts with it, then contains it anywhere.
 */
export function rankOptions(options: string[], query: string): string[] {
  const q = fold(query.trim());
  if (!q) return options;
  const starts: string[] = [];
  const word: string[] = [];
  const contains: string[] = [];
  for (const o of options) {
    const f = fold(o);
    if (f.startsWith(q)) starts.push(o);
    else if (f.split(/[\s/&,()-]+/).some((w, i) => i > 0 && w.startsWith(q))) word.push(o);
    else if (f.includes(q)) contains.push(o);
  }
  return [...starts, ...word, ...contains];
}

// ---------- Calendar slots (no AI) ----------

const DAY_PATTERNS: Record<number, number[]> = { 1: [1], 2: [1, 4], 3: [0, 2, 4], 4: [0, 1, 3, 5], 5: [0, 1, 2, 3, 4], 7: [0, 1, 2, 3, 4, 5, 6] };
/** LinkedIn and Facebook business posts belong on weekdays. */
const WEEKDAY_ONLY = new Set(["LinkedIn", "Facebook"]);

export type Slot = { slot_id: string; date: string; platform: string };

export function computeCalendarSlots(a: { startDate: string; platforms: string[]; postsPerWeek: number; weeks: number }): Slot[] {
  const [y, m, d] = a.startDate.split("-").map(Number);
  const start = new Date(Date.UTC(y, m - 1, d));
  if (Number.isNaN(start.getTime())) throw new Error("Invalid start date.");
  const pattern = DAY_PATTERNS[a.postsPerWeek] ?? DAY_PATTERNS[3];
  const slots: Slot[] = [];
  a.platforms.forEach((platform, pIndex) => {
    for (let w = 0; w < a.weeks; w++) {
      const used = new Set<string>();
      for (const offset of pattern) {
        const day = new Date(start);
        day.setUTCDate(start.getUTCDate() + w * 7 + ((offset + pIndex) % 7));
        // Weekend slots for weekday only platforms move to the next free weekday.
        if (WEEKDAY_ONLY.has(platform)) {
          while (day.getUTCDay() === 0 || day.getUTCDay() === 6 || used.has(day.toISOString().slice(0, 10))) day.setUTCDate(day.getUTCDate() + 1);
        }
        const iso = day.toISOString().slice(0, 10);
        used.add(iso);
        slots.push({ slot_id: "", date: iso, platform });
      }
    }
  });
  slots.sort((x, z) => x.date.localeCompare(z.date) || x.platform.localeCompare(z.platform));
  slots.forEach((s, i) => (s.slot_id = `s${String(i + 1).padStart(2, "0")}`));
  return slots.slice(0, 60);
}

// ---------- UTM builder (no AI) ----------

export type UtmArgs = {
  destination_url: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content?: string;
  utm_term?: string;
  utm_id?: string;
  lowercase?: boolean;
  spaces?: "_" | "-" | "Keep spaces";
};

/** Adds UTM parameters to a URL. set() means repeated edits never duplicate keys, and the #fragment is kept. */
export function buildUtmUrl(args: UtmArgs): { url: string; warnings: string[] } {
  const warnings: string[] = [];
  let raw = String(args.destination_url ?? "").trim();
  if (!raw) throw new Error("Add the page URL.");
  if (!/^https?:\/\//i.test(raw)) {
    raw = `https://${raw}`;
    warnings.push("Added https:// to your URL.");
  }
  const url = new URL(raw);
  const clean = (v?: string) => {
    if (!v || !String(v).trim()) return "";
    let out = String(v).trim();
    if (args.lowercase !== false) out = out.toLowerCase();
    if (args.spaces !== "Keep spaces") out = out.replace(/\s+/g, args.spaces ?? "_");
    return out;
  };
  for (const key of ["utm_source", "utm_medium", "utm_campaign"] as const) {
    if (!clean(args[key])) throw new Error(`${key.replace("utm_", "Campaign ")} is required.`);
  }
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "utm_id"] as const) {
    const value = clean(args[key]);
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
  }
  return { url: url.toString(), warnings };
}
