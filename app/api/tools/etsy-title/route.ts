import { ETSY_CATEGORIES, ETSY_FORMATS, ETSY_LANGUAGES, ETSY_PERSONALIZATION, ETSY_PHOTO_TYPES, ETSY_STYLES, ETSY_TEXT_FIELDS, ETSY_TITLE_LABELS, ETSY_TITLE_LIMIT, type EtsyTitle } from "@/lib/tools/families/etsy-title-choices";
import { ModelError, generateWithFallback, type Turn } from "@/lib/tools/gemini";
import { countChars, nearDuplicates } from "@/lib/tools/validate";

// The Etsy Title Generator's own endpoint: it takes an optional product photo, which the shared
// /api/tools route can't. The photo goes to Gemini (a vision model) and is never stored or logged.
// Rate limiting happens before this route, in the Vercel Firewall rule on /api/tools.

export const runtime = "nodejs";
export const maxDuration = 60;

// Flash Lite reads images too, and answers in seconds where full Flash stalled past 55s in testing (Oct 2026).
const MODEL = process.env.TOOLS_MODEL_VISION || "gemini-flash-lite-latest";
/** The page shrinks photos to about 1280px before sending, so 3MB is plenty and stays under Vercel's body cap. */
const MAX_BODY = 3_000_000;
const FAIL = "The titles couldn't be written just now. Your details are still here, so please try again.";

const json = (body: unknown, status = 200) => Response.json(body, { status });
const clean = (s: string) => s.replace(/[<>]/g, "").trim();

type Input = Record<string, unknown>;

function readInput(raw: Input) {
  const text: Record<string, string> = {};
  for (const [k, max] of Object.entries(ETSY_TEXT_FIELDS)) {
    const v = typeof raw[k] === "string" ? (raw[k] as string).trim() : "";
    if (v.length > max) return "One of the fields is too long. Please shorten it.";
    text[k] = clean(v);
  }
  const pick = (k: string, options: string[], fallback: string) => {
    const v = raw[k];
    return typeof v === "string" && options.includes(v) ? v : fallback;
  };
  let image: { mimeType: string; data: string } | undefined;
  const img = raw.image as { mimeType?: unknown; data?: unknown } | undefined;
  if (img && typeof img === "object") {
    if (typeof img.mimeType !== "string" || !ETSY_PHOTO_TYPES.includes(img.mimeType) || typeof img.data !== "string" || !/^[A-Za-z0-9+/=]+$/.test(img.data)) return "Please upload a JPG, PNG or WebP photo.";
    image = { mimeType: img.mimeType, data: img.data };
  }
  if (!image && !text.item) return "Upload a photo or tell us what the item is.";
  return {
    image,
    text,
    category: pick("category", ["", ...ETSY_CATEGORIES], ""),
    format: pick("format", ["", ...ETSY_FORMATS], ""),
    style: pick("style", ETSY_STYLES, "None"),
    personalization: pick("personalization", ["", ...ETSY_PERSONALIZATION], ""),
    language: pick("language", ETSY_LANGUAGES, "English"),
  };
}

const SYSTEM = `You write Etsy listing titles for real sellers inside a free tool on zainameen.com. Sellers publish what you write on their own listings, so accuracy matters more than flair.

How Etsy titles work (from Etsy's own Seller Handbook guidance):
- A title is at most ${ETSY_TITLE_LIMIT} characters. Short, clear titles that read like a description work best.
- The first few words matter most, because search results and phones cut titles short. Put what the item is first, in the plain words a buyer would search.
- Each phrase once. Never repeat the same keyword, never stuff synonyms. Tags and attributes cover the extra phrases.
- Add only the traits buyers filter or decide by: type, color, material, size, style, personalization, occasion when the product is made for it.
- Separate phrases with commas or a single dash. No ALL CAPS, no emoji, no symbols such as ★ or |, no "best", "cheapest", "#1", "sale", "free shipping", no brand names the seller hasn't given.

Truth rules (never break these):
- Never invent the material, size, measurements, brand, origin, quantity, or that the item is handmade, vintage or personalized. Use those only when the seller wrote them.
- From a photo you may describe only what is plainly visible: the type of item, the main colors, the visible shape, pattern or style. If a material or finish only looks likely (for example "looks like gold" or "looks like wood"), don't state it as fact.
- If the seller's details disagree with the photo, trust the seller.
- A name, word or design printed on the item in the photo doesn't mean buyers can personalize it. Say "personalized", "custom" or "custom name" only when the seller's Personalization detail is Yes or Optional. Never copy a name or sample text printed on the item into the title; it's usually just an example.
- Never claim search volume, rankings, sales or "trending". Never mention SEO in the title.
- If personalization is "Optional", don't make the title sound like personalization is always included.
- A digital download must read as one ("Printable", "Digital Download", "Instant Download") only when the seller chose Digital download or the item is clearly a digital file.

When you can't tell what the item is (blurry, dark, several unrelated products, a photo that isn't a product, or vague text), don't guess. Ask one short, friendly question instead. Never ask about missing details such as material, size or color: when you can tell what the item is, write the titles and simply leave unknown details out.

Return strict JSON only, in one of two shapes:
{"needsClarification": true, "question": "one short question"}
{"needsClarification": false, "titles": [{"label": "Clear & Direct", "title": "...", "why": "..."}, {"label": "Detail-led", "title": "...", "why": "..."}, {"label": "Alternative Wording", "title": "...", "why": "..."}]}

The three titles:
1. Clear & Direct: the item first, then the two or three most useful traits. The shortest of the three.
2. Detail-led: the item first, then more of the confirmed details buyers check (size, material, personalization, use).
3. Alternative Wording: a different but natural way buyers might search for the same item (a synonym for the item type, or the style or occasion leading), still accurate.
Each title must be ${ETSY_TITLE_LIMIT} characters or fewer (aim for 60 to 120) and clearly different from the others. Each "why" is one plain sentence (under 20 words) saying what the title does well, written for a beginner. Write the titles and the question in the requested language; keep "label" in English.`;

function userPrompt(input: Exclude<ReturnType<typeof readInput>, string>, answer: string) {
  const { text } = input;
  const lines: string[] = [];
  const add = (label: string, v: string) => v && lines.push(`${label}: ${v}`);
  add("What the item is", text.item);
  add("Category", input.category === "Other" ? text.categoryOther || "Other" : input.category);
  add("Format", input.format);
  add("Style", input.style === "None" ? "" : input.style === "Other" ? text.styleOther : input.style);
  add("Color or finish", text.color);
  add("Material", text.material);
  add("Size or dimensions", text.size);
  if (input.personalization) add("Personalization", input.personalization === "Yes" && text.personalizationDetail ? `Yes: ${text.personalizationDetail}` : input.personalization);
  add("Search phrase the seller wants to include", text.phrase);
  add("Their current title", text.existing);
  add("Details the photo can't show", text.notes);
  add("Seller's answer to your question", answer);
  return `${input.image ? "A product photo is attached." : "No photo was uploaded."}
<seller_details>
${lines.join("\n") || "None given."}
</seller_details>
Language for the titles: ${input.language}
Write the JSON now.`;
}

function parse(text: string): Record<string, unknown> | null {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start < 0 || end < start) return null;
  try {
    const v = JSON.parse(text.slice(start, end + 1));
    return v && typeof v === "object" ? v : null;
  } catch {
    return null;
  }
}

/** Tidies one title: single spaces, no trailing separators, no emoji or decorative symbols. */
const tidy = (s: string) =>
  s
    .replace(/[\p{Extended_Pictographic}★☆|]/gu, "")
    .replace(/\s+/g, " ")
    .replace(/[\s,\-–—:;|]+$/u, "")
    .trim();

function readTitles(reply: Record<string, unknown>): EtsyTitle[] {
  const list = Array.isArray(reply.titles) ? reply.titles : [];
  return list
    .flatMap((t: { title?: unknown; why?: unknown }, i): EtsyTitle[] => (typeof t?.title === "string" && t.title.trim() ? [{ label: ETSY_TITLE_LABELS[i] ?? "Another idea", title: tidy(t.title), why: typeof t.why === "string" ? t.why.trim() : "" }] : []))
    .slice(0, 3);
}

/** "Personalized" and "custom" are claims only the seller can make, however clearly a name shows in the photo. */
const PERSONAL = /\b(personali[sz]ed|personali[sz]able|custom(i[sz]ed|i[sz]able)?)\b/i;
/**
 * Last resort when the retry still claims personalization: drop the words (and a "name" right after them),
 * then drop any comma phrase left empty or already said earlier in the title.
 */
function unclaim(title: string) {
  const parts = title
    .replace(/\b(personali[sz]ed|personali[sz]able|custom(i[sz]ed|i[sz]able)?)\b(\s+name)?/gi, "")
    .split(",")
    .map((p) => p.replace(/\s+/g, " ").trim())
    .filter(Boolean);
  const kept = parts.filter((p, i) => !parts.slice(0, i).some((q) => q.toLowerCase().includes(p.toLowerCase())));
  return tidy(kept.join(", ")).replace(/^./, (c) => c.toUpperCase());
}

export async function POST(req: Request) {
  const body = await req.text();
  if (body.length > MAX_BODY) return json({ error: "That photo is too large. Please try a smaller one." }, 413);
  let raw: Input;
  try {
    raw = JSON.parse(body);
  } catch {
    return json({ error: FAIL }, 400);
  }
  const input = readInput(raw && typeof raw === "object" ? raw : {});
  if (typeof input === "string") return json({ error: input }, 400);
  if (!process.env.GEMINI_API_KEY) {
    console.error("Etsy titles: GEMINI_API_KEY is not set.");
    return json({ error: FAIL }, 500);
  }

  const turns: Turn[] = [{ role: "user", text: userPrompt(input, input.text.answer), images: input.image ? [input.image] : undefined }];
  const request = { model: MODEL, system: SYSTEM, maxOutputTokens: 6000 };

  try {
    const first = await generateWithFallback({ ...request, turns });
    if (first.blocked) return json({ error: "That photo or text couldn't be used. Please try a different product photo." }, 422);
    const reply = parse(first.text);
    if (!reply) return json({ error: FAIL }, 502);
    // A question is only allowed before the seller has answered one.
    if (reply.needsClarification === true && typeof reply.question === "string" && reply.question.trim() && !input.text.answer) {
      return json({ needsClarification: true, question: clean(reply.question).slice(0, 200) });
    }
    let titles = readTitles(reply);
    if (!titles.length) return json({ error: FAIL }, 502);

    // One retry for titles over the limit, too close to another or claiming personalization the seller didn't
    // give; anything still over shows with a warning on the page.
    const personal = input.personalization === "Yes" || input.personalization === "Optional";
    const over = titles.flatMap((t, i) => (countChars(t.title) > ETSY_TITLE_LIMIT ? [i + 1] : []));
    const dupes = nearDuplicates(titles.map((t) => t.title)).filter((n) => !over.includes(n));
    const claims = personal ? [] : titles.flatMap((t, i) => (PERSONAL.test(t.title) && !over.includes(i + 1) && !dupes.includes(i + 1) ? [i + 1] : []));
    if (over.length || dupes.length || claims.length || titles.length < 3) {
      const problems = [
        ...over.map((n) => `Title ${n} is ${countChars(titles[n - 1].title)} characters; make it ${ETSY_TITLE_LIMIT} or fewer.`),
        ...dupes.map((n) => `Title ${n} is too close to another title; reword it.`),
        ...claims.map((n) => `Title ${n} says the item is personalized or custom, but the seller didn't say so. Remove that claim.`),
        ...(titles.length < 3 ? ["Return all three titles."] : []),
      ];
      const second = await generateWithFallback({ ...request, turns: [...turns, { role: "model", text: first.text }, { role: "user", text: `${problems.join("\n")}\nKeep the titles that were fine. Return the full JSON again.` }] }).catch(() => null);
      const fixed = second && !second.blocked ? parse(second.text) : null;
      const again = fixed ? readTitles(fixed) : [];
      if (again.length === 3) titles = titles.length < 3 ? again : titles.map((t, i) => (over.includes(i + 1) || dupes.includes(i + 1) || claims.includes(i + 1) ? again[i] : t));
    }
    if (!personal) titles = titles.map((t) => (PERSONAL.test(t.title) ? { ...t, title: unclaim(t.title) } : t));
    // Exact duplicates never reach the page.
    const seen = new Set<string>();
    titles = titles.filter((t) => !seen.has(t.title.toLowerCase()) && seen.add(t.title.toLowerCase()));
    return json({ needsClarification: false, titles });
  } catch (error) {
    if (error instanceof ModelError && error.status === 429) return json({ error: "Lots of people are writing titles right now. Try again in a minute." }, 429);
    console.error("Etsy titles failed", error instanceof ModelError ? error.status : "unknown");
    return json({ error: FAIL }, 502);
  }
}
