import { FB_CAPTION_ACTIONS, FB_CAPTION_CHOICES, FB_CAPTION_CTAS, FB_CAPTION_LABELS, FB_CAPTION_LANGUAGES, FB_CAPTION_LENGTHS, FB_CAPTION_TEXT, FB_CAPTION_TONES, type FbCaptionKind } from "@/lib/tools/families/facebook-caption-choices";
import { ModelError, generateWithFallback, type Turn } from "@/lib/tools/gemini";
import { nearDuplicates } from "@/lib/tools/validate";

// The Facebook Caption Generator's own endpoint: five captions from dropdowns, text and an optional
// photo, plus single caption actions (shorter, more natural, rewrite, another). The photo goes to
// Gemini (a vision model) and is never stored or logged. Rate limiting happens before this route, in
// the Vercel Firewall rule on /api/tools.

export const runtime = "nodejs";
export const maxDuration = 60;

// Flash Lite reads images too, and answers in seconds where full Flash stalled past 55s in testing (Oct 2026).
const MODEL = process.env.TOOLS_MODEL_VISION || "gemini-flash-lite-latest";
/** The page shrinks photos to about 1280px before sending, so 3MB is plenty and stays under Vercel's body cap. */
const MAX_BODY = 3_000_000;
const FAIL = "The captions couldn't be written just now. Your choices are still here, so please try again.";
/** A generous ceiling per length setting, so a "Short" caption that runs on gets one retry. */
const MAX_CHARS: Record<string, number> = { Short: 260, Medium: 650, "Longer story": 1600 };

const json = (body: unknown, status = 200) => Response.json(body, { status });
const clean = (s: string) => s.replace(/[<>]/g, "").trim();

type Caption = { label: string; text: string };

/** The page sends a re-encoded JPEG; anything else must still look like a real image file. */
function looksLikeImage(mime: string, data: string) {
  const head = Buffer.from(data.slice(0, 24), "base64");
  if (mime === "image/jpeg") return head[0] === 0xff && head[1] === 0xd8 && head[2] === 0xff;
  if (mime === "image/png") return head[0] === 0x89 && head.toString("latin1", 1, 4) === "PNG";
  if (mime === "image/webp") return head.toString("latin1", 0, 4) === "RIFF" && head.toString("latin1", 8, 12) === "WEBP";
  return false;
}

function readInput(raw: Record<string, unknown>) {
  const text: Record<string, string> = {};
  for (const [k, max] of Object.entries(FB_CAPTION_TEXT)) {
    const v = typeof raw[k] === "string" ? (raw[k] as string).trim() : "";
    if (v.length > max) return "One of your answers is too long. Please shorten it.";
    text[k] = clean(v);
  }
  const pick = (k: string, options: string[], fallback: string) => (typeof raw[k] === "string" && options.includes(raw[k] as string) ? (raw[k] as string) : fallback);
  const kind = pick("kind", Object.keys(FB_CAPTION_CHOICES), "Personal Profile") as FbCaptionKind;
  const picks = Array.isArray(raw.picks) ? raw.picks : [];
  const answers = FB_CAPTION_CHOICES[kind].questions.map((q, i) => {
    const v = typeof picks[i] === "string" && q.options.includes(picks[i]) ? (picks[i] as string) : q.options[0];
    return `${q.label}: ${v === "Other" ? text[`other${i}`] || "Not specified" : v}`;
  });
  let image: { mimeType: string; data: string } | undefined;
  const img = raw.image as { mimeType?: unknown; data?: unknown } | undefined;
  if (img && typeof img === "object") {
    if (typeof img.mimeType !== "string" || typeof img.data !== "string" || !/^[A-Za-z0-9+/=]+$/.test(img.data) || !looksLikeImage(img.mimeType, img.data)) return "We couldn't read this photo. Try another image or describe your post instead.";
    image = { mimeType: img.mimeType, data: img.data };
  }
  const cta = raw.ctaOn === true ? pick("cta", FB_CAPTION_CTAS, FB_CAPTION_CTAS[0]) : "No CTA";
  if (text.url && !/^https?:\/\/[^\s]+\.[^\s]+$/i.test(text.url)) return "Please enter the full link, starting with https://";
  const action = typeof raw.action === "string" && raw.action in FB_CAPTION_ACTIONS ? (raw.action as keyof typeof FB_CAPTION_ACTIONS) : null;
  const one = typeof raw.one === "number" && raw.one >= 0 && raw.one < 5 ? Math.floor(raw.one) : null;
  if (action && (one === null || !text.current)) return FAIL;
  return {
    kind,
    answers,
    text,
    image,
    cta,
    action,
    one,
    tone: pick("tone", FB_CAPTION_TONES, "Simple and natural"),
    length: pick("length", FB_CAPTION_LENGTHS, "Short"),
    language: pick("language", FB_CAPTION_LANGUAGES, "English"),
    emoji: raw.emoji === true,
    hashtags: raw.hashtags === true,
  };
}
type Input = Exclude<ReturnType<typeof readInput>, string>;

const SYSTEM = `You are an editor who writes natural Facebook post captions in the user's voice, inside a free tool on zainameen.com. People paste what you write onto their own Facebook posts.

Produce FIVE distinct captions for the user's chosen account type, subject, goal, audience, tone, length and language. Use supplied facts and actual visible image observations when available. The captions must sound as if a person wrote them for Facebook, not as if an AI marketing tool wrote them.

Every caption makes a different editorial choice while staying faithful to the same facts. Do not simply rearrange the words. When a fact is missing, leave it out. Never fabricate a price, time, date, location, offer, service detail, customer review, claim, personal experience, event, result, statistic, partnership or link. If no specific event is given, write cautious, evergreen captions with no invented dates or claims.

Photos: describe only what is plainly visible (objects, setting, colors, visible text). Never infer who a person is, their emotions, age, ethnicity or any other demographic, a precise address, or business facts such as price, stock, handmade status or opening hours from the picture. If the written details disagree with the photo, use the written details. A name, word or design printed on an item doesn't mean it's personalized, custom or for sale that way; never say so unless the user wrote it, and don't copy sample names from the photo.

Do not start with generic phrases such as "We're thrilled to announce", "Exciting news", "In today's fast-paced world", "Get ready to" or "Unlock your potential". Avoid corporate fluff, unnecessary exclamation marks and sales clichés. Use short natural sentences. No em dashes or en dashes.

Never ask for likes, shares, tags or comments merely to drive engagement. A genuinely relevant question is allowed only when it fits the selected goal. Not every caption needs a question or a call to action.

Emoji: none unless Emoji is On; then use them sparingly. Hashtags: none unless Hashtags is On; then at most two genuinely relevant ones, never #viral or generic popularity tags. Call to action: only the one chosen; a link only if the user supplied it, copied exactly. Contact wording ("message us", "call us", "DM") only if the user chose "Contact the business".

Length: Short is one or two sentences. Medium is two to four sentences. Longer story is a few short paragraphs. Never add filler to reach a length. Put the useful point in the first sentence.

Never promise views, reach, engagement or ranking. Never say the post is scheduled or published.

The five captions, in this order:
1. Straight to the point: direct and useful.
2. Conversational: natural and friendly.
3. Story-first: opens with a relevant moment, only when the facts support one; otherwise a gentle narrative framing without invented events.
4. Useful and informative: highlights context, benefit or explanation.
5. A different angle: fresh but faithful, never provocative for the sake of it.

In languages with gendered verbs or adjectives, never assume the writer's gender. Respect the requested language.

If you truly cannot tell what the post is about (for example a blurry or unrelated photo with no text and no topic), return {"needsClarification": true, "question": "one short question"} instead. Don't ask when the dropdowns already give a usable topic.

Otherwise return only JSON: {"needsClarification": false, "captions": [{"label": "...", "text": "..."}]}`;

function userPrompt(input: Input) {
  const { text } = input;
  const lines = [`Account type: ${input.kind}`, ...input.answers, `Tone: ${input.tone === "Other" ? text.toneOther || "Simple and natural" : input.tone}`, `Length: ${input.length}`, `Emoji: ${input.emoji ? "On" : "Off"}`, `Hashtags: ${input.hashtags ? "On" : "Off"}`, `Call to action: ${input.cta}`];
  const add = (label: string, v: string) => v && lines.push(`${label}: ${v}`);
  add("What the post is about", text.about);
  add("Product or service name", text.productName);
  add("Confirmed price", text.price);
  add("Confirmed date", text.date);
  add("Offer terms", text.offerTerms);
  add("Opening hours", text.hours);
  add("Location", text.location);
  add("Link to include", input.cta === "Link supplied by me" ? text.url : "");
  add("Phrases to avoid", text.avoid);
  add("Answer to your earlier question", text.answer);
  const extra = [
    text.existing ? `Rewrite this existing caption, keeping its facts, intent and voice:\n<existing_caption>\n${text.existing}\n</existing_caption>` : "",
    text.voice ? `Match the voice of this sample of how they write (don't copy its facts):\n<voice_sample>\n${text.voice}\n</voice_sample>` : "",
  ].filter(Boolean).join("\n");
  return `${input.image ? "A photo is attached." : "No photo was uploaded."}\n<post_details>\n${lines.join("\n")}\n</post_details>\nLanguage: ${input.language}\n${extra}\nWrite the JSON now.`;
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

/** Keeps the user's own link and removes any other URL; drops dashes used as punctuation and fake ticks. */
function tidy(s: string, input: Input) {
  const keep = input.cta === "Link supplied by me" ? input.text.url : "";
  return s
    .replace(/https?:\/\/\S+|www\.\S+/gi, (u) => (keep && u.replace(/[.,!?)]+$/, "") === keep ? u : ""))
    .replace(/\s*[–—]\s*/g, ", ")
    .replace(/[✓✔✅]/g, "")
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const PERSONAL = /\b(personali[sz]ed|custom(i[sz]ed)?|your (own )?name)\b/i;
const BAIT = /\b(like if|share if|tag (a|your|\d+) friends?|like and share|smash (that|the) like|comment below if)\b/i;
const EMOJI = /\p{Extended_Pictographic}/u;
const HASHTAG = /(^|\s)#[\p{L}\p{N}_]+/gu;

function readCaptions(reply: Record<string, unknown>, input: Input): Caption[] {
  const list = Array.isArray(reply.captions) ? reply.captions : [];
  return list.flatMap((c: { text?: unknown }, i): Caption[] => (typeof c?.text === "string" && c.text.trim() ? [{ label: FB_CAPTION_LABELS[i] ?? "Another idea", text: tidy(c.text, input) }] : [])).slice(0, 5);
}

/** Everything the user typed, to check a claim came from them and not from the photo. */
const userFacts = (input: Input) => Object.values(input.text).join(" ");

function problemsOf(c: Caption, input: Input) {
  const out: string[] = [];
  if (c.text.length > MAX_CHARS[input.length]) out.push(`is too long for "${input.length}"; shorten it`);
  if (BAIT.test(c.text)) out.push("asks for likes, shares or tags; remove that");
  if (PERSONAL.test(c.text) && !PERSONAL.test(userFacts(input))) out.push("says the item is personalized or custom, which the user didn't say; remove that");
  if (!input.emoji && EMOJI.test(c.text)) out.push("has emoji, but they are off; remove them");
  const tags = c.text.match(HASHTAG)?.length ?? 0;
  if (!input.hashtags && tags) out.push("has hashtags, but they are off; remove them");
  if (input.hashtags && tags > 2) out.push("has more than two hashtags; keep at most two");
  return out;
}

export async function POST(req: Request) {
  const body = await req.text();
  if (body.length > MAX_BODY) return json({ error: "That photo is too large. Please try a smaller one." }, 413);
  let raw: Record<string, unknown>;
  try {
    raw = JSON.parse(body);
  } catch {
    return json({ error: FAIL }, 400);
  }
  const input = readInput(raw && typeof raw === "object" ? raw : {});
  if (typeof input === "string") return json({ error: input }, 400);
  if (!process.env.GEMINI_API_KEY) {
    console.error("Facebook captions: GEMINI_API_KEY is not set.");
    return json({ error: FAIL }, 500);
  }

  const request = { model: MODEL, system: SYSTEM, maxOutputTokens: 7000 };
  const photo = input.image ? [input.image] : undefined;

  try {
    // One caption, one action: the model returns the full JSON shape with just that caption changed.
    if (input.action && input.one !== null) {
      const label = FB_CAPTION_LABELS[input.one];
      const turns: Turn[] = [{ role: "user", text: `${userPrompt(input)}\nOnly one caption is needed this time, the "${label}" one. Here is the current version:\n<current_caption>\n${input.text.current}\n</current_caption>\n${FB_CAPTION_ACTIONS[input.action]} Return {"needsClarification": false, "captions": [{"label": "${label}", "text": "..."}]}.`, images: photo }];
      const res = await generateWithFallback({ ...request, turns });
      const reply = res.blocked ? null : parse(res.text);
      const [c] = reply ? readCaptions(reply, input) : [];
      if (!c) return json({ error: FAIL }, 502);
      return json({ needsClarification: false, captions: [{ ...c, label }] });
    }

    const turns: Turn[] = [{ role: "user", text: userPrompt(input), images: photo }];
    const first = await generateWithFallback({ ...request, turns });
    if (first.blocked) return json({ error: "That photo or text couldn't be used. Please try a different photo or wording." }, 422);
    const reply = parse(first.text);
    if (!reply) return json({ error: FAIL }, 502);
    if (reply.needsClarification === true && typeof reply.question === "string" && reply.question.trim() && !input.text.answer) {
      return json({ needsClarification: true, question: clean(reply.question).slice(0, 200) });
    }
    let captions = readCaptions(reply, input);
    if (!captions.length) return json({ error: FAIL }, 502);

    // One retry naming every caption that breaks a rule or repeats another.
    const dupes = nearDuplicates(captions.map((c) => c.text));
    const problems = captions.flatMap((c, i) => {
      const p = problemsOf(c, input);
      if (dupes.includes(i + 1)) p.push("is too close to another caption; take a different approach");
      return p.length ? [{ i, text: `Caption ${i + 1} ${p.join(", and ")}.` }] : [];
    });
    if (problems.length || captions.length < 5) {
      const ask = [...problems.map((p) => p.text), ...(captions.length < 5 ? ["Return all five captions."] : [])].join("\n");
      const second = await generateWithFallback({ ...request, turns: [...turns, { role: "model", text: first.text }, { role: "user", text: `${ask}\nKeep the captions that were fine. Return the full JSON again.` }] }).catch(() => null);
      const fixed = second && !second.blocked ? parse(second.text) : null;
      const again = fixed ? readCaptions(fixed, input) : [];
      const bad = new Set(problems.map((p) => p.i));
      if (again.length === 5) captions = captions.length < 5 ? again : captions.map((c, i) => (bad.has(i) && problemsOf(again[i], input).length <= problemsOf(c, input).length ? again[i] : c));
    }
    // Last resort for the settings the visitor switched off.
    captions = captions.map((c) => {
      let t = c.text;
      if (!input.emoji) t = t.replace(/[\p{Extended_Pictographic}️‍]/gu, "");
      if (!input.hashtags) t = t.replace(HASHTAG, "$1");
      return { ...c, text: tidy(t, input) };
    });
    const seen = new Set<string>();
    captions = captions.filter((c) => c.text && !seen.has(c.text.toLowerCase()) && seen.add(c.text.toLowerCase()));
    return json({ needsClarification: false, captions, usedImage: !!input.image });
  } catch (error) {
    if (error instanceof ModelError && error.status === 429) return json({ error: "Lots of people are writing captions right now. Try again in a minute." }, 429);
    console.error("Facebook captions failed", error instanceof ModelError ? error.status : "unknown");
    return json({ error: "The request didn't finish. You can retry without losing your selections." }, 502);
  }
}
