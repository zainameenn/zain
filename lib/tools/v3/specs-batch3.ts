import { INSTAGRAM_HANDLE_MAX, TIKTOK_HANDLE_MAX } from "./fields";

// Server only: prompts and code checks for tools 21 to 40 (the AI ones). Every tool returns the shared
// "fields" result: a few labelled, editable text fields, optional lists, and notes for the visitor.

export type ResultField = { key: string; label: string; value: string; multiline?: boolean; limit?: number; prefix?: string; large?: boolean };
export type ResultList = { label: string; items: string[] };
export type ResultTable = { columns: string[]; rows: string[][]; file: string };
export type FieldsResult = { fields: ResultField[]; lists: ResultList[]; notes: string[]; markdown?: string; table?: ResultTable };

type Validated<T> = { ok: true; value: T } | { ok: false; reason: string };
type Spec = { task: string; schema: object; maxTokens: number; validate: (raw: unknown, input: Record<string, string>) => Validated<unknown> };

const S = { type: "string" };
const A = { type: "array", items: S };
const obj = (properties: Record<string, object>) => ({ type: "object", properties, required: Object.keys(properties), additionalProperties: false });
const str = (v: unknown, max = 600) => (typeof v === "string" ? v.replace(/[–—]/g, ",").replace(/<[^>]*>/g, "").trim().slice(0, max) : "");
const arr = (v: unknown, n = 10, max = 200) => (Array.isArray(v) ? v.map((x) => str(x, max)).filter(Boolean).slice(0, n) : []);
const words = (s: string) => s.split(/\s+/).filter(Boolean).length;
const avoidHit = (text: string, input: Record<string, string>) =>
  (input.avoid ?? "")
    .split(",")
    .map((w) => w.trim().toLowerCase())
    .filter(Boolean)
    .find((w) => text.toLowerCase().includes(w));
const ok = (value: FieldsResult): Validated<FieldsResult> => ({ ok: true, value });
const bad = (reason: string): Validated<FieldsResult> => ({ ok: false, reason });

const AVAILABILITY = "Availability hasn't been checked. Confirm it on the platform before you use it anywhere else.";

/** Instagram: letters, numbers, periods and underscores, 30 max, no period at either end or twice in a row. */
export function cleanInstagram(raw: string): string {
  return raw.replace(/^@/, "").toLowerCase().replace(/[^a-z0-9._]/g, "").replace(/\.{2,}/g, ".").replace(/^\.+|\.+$/g, "").slice(0, INSTAGRAM_HANDLE_MAX).replace(/\.+$/, "");
}
/** TikTok: letters, numbers, periods and underscores, can't end with a period. */
export function cleanTiktok(raw: string): string {
  return raw.replace(/^@/, "").toLowerCase().replace(/[^a-z0-9._]/g, "").slice(0, TIKTOK_HANDLE_MAX).replace(/\.+$/, "");
}

function handle(clean: (s: string) => string, platform: string) {
  return (raw: unknown, input: Record<string, string>): Validated<FieldsResult> => {
    const r = raw as Record<string, unknown>;
    const h = clean(str(r?.handle, 80));
    if (h.length < 2) return bad("handle too short");
    if (avoidHit(h, input)) return bad("used an avoided word");
    return ok({ fields: [{ key: "handle", label: `Your ${platform} username`, value: h, prefix: "@", large: true, limit: platform === "TikTok" ? TIKTOK_HANDLE_MAX : INSTAGRAM_HANDLE_MAX }], lists: [], notes: [str(r.why ?? r.reason, 300), AVAILABILITY].filter(Boolean) });
  };
}

export type ChapterAiResult = { chapters: { startSeconds: number; title: string }[] };

/** The model may only use start times that were in the visitor's input. Anything else is rejected. */
function checkChapterAi(raw: unknown, input: Record<string, string>): Validated<ChapterAiResult> {
  let sections: { s: number; t: string }[] = [];
  try {
    sections = JSON.parse(input.sections ?? "[]");
  } catch {
    return { ok: false, reason: "bad sections" };
  }
  const allowed = new Set(sections.map((x) => x.s));
  const r = raw as Record<string, unknown>;
  const seen = new Set<number>();
  const chapters = (Array.isArray(r?.chapters) ? (r.chapters as Record<string, unknown>[]) : [])
    .map((c) => ({ startSeconds: Number(c?.startSeconds), title: str(c?.title, 100) }))
    .filter((c) => allowed.has(c.startSeconds) && c.title && !seen.has(c.startSeconds) && seen.add(c.startSeconds))
    .sort((a, b) => a.startSeconds - b.startSeconds);
  if (input.mode === "titles" && chapters.length !== sections.length) return { ok: false, reason: "dropped rows" };
  if (chapters.length < 2) return { ok: false, reason: "too few" };
  return { ok: true, value: { chapters } };
}

export const BATCH3_SPECS: Record<string, Spec> = {
  "youtube-chapters-generator": {
    task: `Task: write YouTube chapter titles for timestamped sections. "sections" is JSON: each item has "s" (start time in seconds) and "t" (the text spoken or noted from that time).
NEVER invent, shift, guess or alter a time. Every "startSeconds" you return must be one of the "s" values given.
If "mode" is "titles": return one chapter for EVERY section, same times, with a better title based only on that section's text.
If "mode" is "pick": choose about "count" sections (default 6) where a new topic starts, always including the first one, and give each a title based only on the text from that time until the next chosen chapter.
Titles: "style" Short means 2 to 4 words, Descriptive means up to 8 words. Specific, no clickbait, no topics that aren't in the text.`,
    schema: obj({ chapters: { type: "array", items: obj({ startSeconds: { type: "number" }, title: S }) } }),
    maxTokens: 900,
    validate: checkChapterAi,
  },
  "instagram-username-generator": {
    task: `Task: you are an Instagram handle naming specialist. Return exactly ONE handle idea based on the name, niche, style and optional constraints.
Use only lowercase letters, digits, periods or underscores, at most ${INSTAGRAM_HANDLE_MAX} characters, no spaces, no @, no period at the start or end. No imitation of famous or protected handles, no uniqueness or availability claim. Prefer short, pronounceable and legible over keyword stuffing.
"why": one sentence.`,
    schema: obj({ handle: S, why: S }),
    maxTokens: 200,
    validate: handle(cleanInstagram, "Instagram"),
  },
  "tiktok-username-generator": {
    task: `Task: write ONE TikTok username idea for the supplied identity and niche.
Use only lowercase letters, numbers, underscores or periods; do not end in a period; at most ${TIKTOK_HANDLE_MAX} characters; no @. Prefer legibility, simple pronunciation and room to grow beyond one joke or topic. Do not claim availability or uniqueness.
"reason": one sentence.`,
    schema: obj({ handle: S, reason: S }),
    maxTokens: 200,
    validate: handle(cleanTiktok, "TikTok"),
  },
  "business-name-generator": {
    task: `Task: you are a practical brand naming strategist. Generate exactly ONE business name from the industry, audience, style and optional words to use or avoid.
Favour clear pronunciation, brand coherence and a credible impression on customers. Follow "type" if it says Descriptive or Invented. Do not imitate famous brands, claim uniqueness or say it's legally available or free to register.
"reason": one specific sentence.`,
    schema: obj({ name: S, reason: S }),
    maxTokens: 250,
    validate: (raw, input) => {
      const r = raw as Record<string, unknown>;
      const name = str(r?.name, 60);
      if (name.length < 2) return bad("empty");
      if (avoidHit(name, input)) return bad("used an avoided word");
      return ok({ fields: [{ key: "name", label: "Your business name", value: name, large: true }], lists: [{ label: "Check separately before you use it", items: ["Your business registration authority", "Trademark databases for your countries", "Domain registrars", "Social media handles"] }], notes: [str(r.reason, 300), "A creative name isn't proof that it's legally available or free to register."].filter(Boolean) });
    },
  },
  "business-slogan-generator": {
    task: `Task: create ONE short brand slogan based on the real product and customer benefit given.
Make it specific, memorable, easy to say and in the requested style and length. No tired advertising cliches, no unsupported guarantees or measurable claims the visitor didn't give, no imitation of famous slogans.
"explanation": one sentence on the promise it communicates.`,
    schema: obj({ slogan: S, explanation: S }),
    maxTokens: 200,
    validate: (raw, input) => {
      const r = raw as Record<string, unknown>;
      const slogan = str(r?.slogan, 120).replace(/^["']|["']$/g, "");
      if (!slogan || words(slogan) > 14) return bad("missing or too long");
      if (avoidHit(slogan, input)) return bad("used an avoided word");
      return ok({ fields: [{ key: "slogan", label: "Your slogan", value: slogan, large: true }], lists: [], notes: [str(r.explanation, 300), "Originality isn't checked. Search the phrase and trademark databases before you use it."].filter(Boolean) });
    },
  },
  "blog-name-generator": {
    task: `Task: act as an editorial naming strategist. Write ONE blog name and ONE short tagline for the topic, readers and voice given.
Favour repeat readership, a recognisable subject and room for future topics. Never say the name or domain is available, unique or legally safe.
"reason": one sentence.`,
    schema: obj({ name: S, tagline: S, reason: S }),
    maxTokens: 250,
    validate: (raw, input) => {
      const r = raw as Record<string, unknown>;
      const name = str(r?.name, 60);
      if (name.length < 2) return bad("empty");
      if (avoidHit(name, input)) return bad("used an avoided word");
      return ok({ fields: [{ key: "name", label: "Your blog name", value: name, large: true }, { key: "tagline", label: "Tagline", value: str(r.tagline, 140) }], lists: [], notes: [str(r.reason, 300), "Availability isn't checked. Search the name and look for a matching domain before you commit."].filter(Boolean) });
    },
  },
  "youtube-thumbnail-text-generator": {
    task: `Task: write ONE YouTube thumbnail overlay phrase from the video title, takeaway and tone given.
Use 2 to "words" words (4 if missing), high signal, no repeating the title, no fake suspense, no clickbait that misrepresents the video, no results the visitor didn't give. Text only, never an image prompt.
"emphasis": the one word to highlight, or an empty string. "why": one sentence on how it complements the title.`,
    schema: obj({ overlay: S, emphasis: S, why: S }),
    maxTokens: 150,
    validate: (raw, input) => {
      const r = raw as Record<string, unknown>;
      const overlay = str(r?.overlay, 60).replace(/^["']|["']$/g, "");
      const max = Number(input.words) || 6;
      if (!overlay || words(overlay) > Math.max(max, 6)) return bad("missing or too long");
      if (avoidHit(overlay, input)) return bad("used an avoided word");
      const emphasis = str(r.emphasis, 30);
      return ok({ fields: [{ key: "overlay", label: "Thumbnail text", value: overlay, large: true }], lists: emphasis && overlay.toLowerCase().includes(emphasis.toLowerCase()) ? [{ label: "Word to emphasise", items: [emphasis] }] : [], notes: [str(r.why, 300), "Words only, no image. Check it's readable at phone size, and only use it if the video really delivers it."].filter(Boolean) });
    },
  },
  "seo-content-brief-generator": {
    task: `Task: act as a rigorous SEO content strategist. Write ONE actionable content brief from the topic, reader, page goal and any facts given.
Never invent keyword volumes, live rankings, competitor analysis, SERP features, citations or "People also ask" questions. Separate what the visitor confirmed from ideas that need checking.
Fields: "reader" (who and what they need), "primaryIntent", "angle" (what makes this page more useful than a generic overview), "h1", "outline" (5 to 8 sections, each "heading" and "purpose"), "questions" (must answer), "researchToVerify" (facts and evidence the writer must check), "internalLinks" (only pages the visitor listed, else empty), "cta" (a fitting next step).`,
    schema: obj({ reader: S, primaryIntent: S, angle: S, h1: S, outline: { type: "array", items: obj({ heading: S, purpose: S }) }, questions: A, researchToVerify: A, internalLinks: A, cta: S }),
    maxTokens: 2000,
    validate: (raw) => {
      const r = raw as Record<string, unknown>;
      const outline = (Array.isArray(r?.outline) ? (r.outline as Record<string, unknown>[]) : []).map((o) => ({ heading: str(o?.heading, 120), purpose: str(o?.purpose, 240) })).filter((o) => o.heading).slice(0, 10);
      const h1 = str(r?.h1, 140);
      if (!h1 || outline.length < 3) return bad("thin brief");
      const questions = arr(r.questions, 10);
      const research = arr(r.researchToVerify, 10);
      const links = arr(r.internalLinks, 10);
      const markdown = [`# Content brief: ${h1}`, "", `**Reader:** ${str(r.reader, 300)}`, `**Primary intent:** ${str(r.primaryIntent, 120)}`, `**Angle:** ${str(r.angle, 300)}`, "", "## Outline", ...outline.map((o) => `- **${o.heading}**: ${o.purpose}`), "", "## Questions to answer", ...questions.map((q) => `- ${q}`), "", "## Research to verify", ...research.map((q) => `- ${q}`), ...(links.length ? ["", "## Internal links", ...links.map((q) => `- ${q}`)] : []), "", `**CTA:** ${str(r.cta, 200)}`, "", "_No live search results were analysed. Check the current results before you finalise._"].join("\n");
      return ok({
        fields: [
          { key: "h1", label: "Recommended H1", value: h1, large: true },
          { key: "reader", label: "Reader and their task", value: str(r.reader, 300), multiline: true },
          { key: "intent", label: "Primary intent", value: str(r.primaryIntent, 120) },
          { key: "angle", label: "Angle", value: str(r.angle, 300), multiline: true },
          { key: "cta", label: "Call to action", value: str(r.cta, 200) },
        ],
        lists: [
          { label: "Outline", items: outline.map((o) => `${o.heading}: ${o.purpose}`) },
          { label: "Questions to answer", items: questions },
          { label: "Research to verify before publishing", items: research },
          ...(links.length ? [{ label: "Internal links", items: links }] : []),
        ],
        notes: ["No live search results were analysed. Check what currently ranks before you treat this as final."],
        markdown,
      });
    },
  },
  "shopify-collection-description-generator": {
    task: `Task: write ONE Shopify collection description using only the collection, products, shopper and confirmed facts given.
Start with what the collection includes, then a practical buying or use angle. Natural prose in the requested tone and length, no salesy hype, no keyword stuffing, no invented product details, materials, discounts, guarantees, shipping policies or certifications.
"summary": one short sentence that could sit above the products. "factsUsed": the supplied facts you used.`,
    schema: obj({ description: S, summary: S, factsUsed: A }),
    maxTokens: 500,
    validate: (raw, input) => {
      const r = raw as Record<string, unknown>;
      // The model sometimes repeats the other JSON keys inside the text; cut them off.
      const description = str(r?.description, 1500).split(/\n\s*(?:summary|factsUsed|facts used)\s*:/i)[0].trim();
      if (words(description) < 15) return bad("too short");
      if (avoidHit(description, input)) return bad("used an avoided word");
      const facts = arr(r.factsUsed, 8);
      return ok({ fields: [{ key: "summary", label: "One line summary", value: str(r.summary, 200) }, { key: "description", label: "Collection description", value: description, multiline: true }], lists: facts.length ? [{ label: "Details used", items: facts }] : [], notes: ["Remove anything you're not sure is true before you paste it into Shopify."] });
    },
  },
  "etsy-shop-announcement-generator": {
    task: `Task: draft exactly ONE Etsy shop announcement for the notice type, shop context and change given.
Make the key update clear in the first sentence. Short, natural, friendly and specific, in the shop's voice. Use dates only if "dates" gives them. Never invent discounts, dates, policies, cutoff times, holidays or shipping promises.
"checks": things the seller should confirm before publishing (dates, policy accuracy).`,
    schema: obj({ announcement: S, checks: A }),
    maxTokens: 350,
    validate: (raw, input) => {
      const r = raw as Record<string, unknown>;
      const text = str(r?.announcement, 1200);
      if (words(text) < 8) return bad("too short");
      // A date that wasn't supplied is a made up promise.
      if (!input.dates && /\b(january|february|march|april|may|june|july|august|september|october|november|december)\s+\d{1,2}\b/i.test(text) && !/\d/.test(`${input.change} ${input.context}`)) return bad("invented a date");
      return ok({ fields: [{ key: "announcement", label: "Shop announcement", value: text, multiline: true }], lists: [{ label: "Check before publishing", items: arr(r.checks, 5).length ? arr(r.checks, 5) : ["Dates and policy details are accurate"] }], notes: ["Paste it into Shop Manager, then your shop, then Announcement. Update it when the notice goes out of date."] });
    },
  },
  "etsy-shop-about-section-generator": {
    task: `Task: write ONE honest Etsy shop About section in the seller's own voice, using only the products, origin and real production roles given.
2 to 4 short paragraphs, warm, modest and readable. Never invent personal stories, ages, founding dates, years in business, manufacturing claims, materials, ethical certifications or testimonials. If a production partner makes the item, say so plainly and don't call it handmade by the seller. Under 5,000 characters.
"factsToConfirm": any statement the seller should double check.`,
    schema: obj({ about: S, factsToConfirm: A }),
    maxTokens: 900,
    validate: (raw, input) => {
      const r = raw as Record<string, unknown>;
      const about = str(r?.about, 5000);
      if (words(about) < 30) return bad("too short");
      const given = Object.values(input).join(" ").toLowerCase();
      // Flag claims the seller never made, rather than silently publishing them.
      const risky = ["handmade", "hand made", "eco friendly", "eco-friendly", "sustainable", "family run", "family-run", "organic", "years of experience"].filter((w) => about.toLowerCase().includes(w) && !given.includes(w.replace("-", " ").split(" ")[0]));
      const confirm = [...arr(r.factsToConfirm, 6), ...risky.map((w) => `You didn't mention "${w}". Remove it unless it's true.`)];
      return ok({ fields: [{ key: "about", label: "Shop story", value: about, multiline: true, limit: 5000 }], lists: confirm.length ? [{ label: "Confirm before publishing", items: confirm }] : [], notes: ["Paste it into your shop's About section. Etsy allows up to 5,000 characters."] });
    },
  },
  "email-preheader-generator": {
    task: `Task: write exactly ONE email preheader that complements the subject line and accurately reflects the email summary.
Front load the most useful detail. Don't repeat the subject, no fake urgency, invented discounts, false deadlines, unsupported personalisation or heavy promotion. Follow the requested length.
"why": one sentence.`,
    schema: obj({ preheader: S, why: S }),
    maxTokens: 150,
    validate: (raw, input) => {
      const r = raw as Record<string, unknown>;
      const p = str(r?.preheader, 200);
      if (p.length < 10) return bad("too short");
      if (p.toLowerCase() === (input.subject ?? "").toLowerCase()) return bad("repeats subject");
      if (avoidHit(p, input)) return bad("used an avoided word");
      return ok({ fields: [{ key: "subject", label: "Subject (yours)", value: input.subject ?? "" }, { key: "preheader", label: "Preheader", value: p, limit: 130, large: true }], lists: [], notes: [str(r.why, 300), "How much shows depends on the inbox and device. Put the key point first and test in the inboxes your readers use."].filter(Boolean) });
    },
  },
  "website-hero-headline-generator": {
    task: `Task: act as a clarity focused website copywriter. Produce ONE hero headline and ONE supporting subheading from the real offer, audience and benefit given.
Say what it is and who it's for before anything clever. No vague transformation language, invented metrics, superlatives, risk free promises or features the visitor didn't give.
"ctaLabel": a short button label matching the visitor's stated next step (or "Get in touch" if none).`,
    schema: obj({ headline: S, subheading: S, ctaLabel: S }),
    maxTokens: 300,
    validate: (raw, input) => {
      const r = raw as Record<string, unknown>;
      const headline = str(r?.headline, 140);
      const sub = str(r?.subheading, 300);
      if (!headline || !sub) return bad("missing parts");
      if (avoidHit(`${headline} ${sub}`, input)) return bad("used an avoided word");
      return ok({ fields: [{ key: "headline", label: "Headline (H1)", value: headline, large: true }, { key: "subheading", label: "Subheading", value: sub, multiline: true }, { key: "cta", label: "Button label", value: str(r.ctaLabel, 40) }], lists: [], notes: ["Make sure the button leads to that exact action. Test the copy with real visitors before calling it a winner."] });
    },
  },
  "saas-value-proposition-generator": {
    task: `Task: write ONE clear SaaS value proposition using only the product's stated capability, the target customer and the problem described.
Never invent market share, competitive advantage, testimonials, ROI, features, security certifications or guaranteed outcomes. If the differentiator isn't confirmed, avoid "only" and "best".
"supportingExplanation": two or three sentences. "assumptionsToValidate": what to test with real customers. "verifiedClaimsUsed": the supplied facts you relied on.`,
    schema: obj({ statement: S, supportingExplanation: S, assumptionsToValidate: A, verifiedClaimsUsed: A }),
    maxTokens: 500,
    validate: (raw) => {
      const r = raw as Record<string, unknown>;
      const statement = str(r?.statement, 400);
      if (words(statement) < 8) return bad("too short");
      const assumptions = arr(r.assumptionsToValidate, 6);
      const used = arr(r.verifiedClaimsUsed, 6);
      return ok({ fields: [{ key: "statement", label: "Value proposition", value: statement, multiline: true, large: true }, { key: "explanation", label: "Supporting explanation", value: str(r.supportingExplanation, 600), multiline: true }], lists: [...(assumptions.length ? [{ label: "Assumptions to validate", items: assumptions }] : []), ...(used.length ? [{ label: "Facts used", items: used }] : [])], notes: ["Treat it as a hypothesis until customers confirm it in interviews or tests."] });
    },
  },
  "changelog-entry-generator": {
    task: `Task: draft exactly ONE user facing changelog entry from the public change details given.
Say what actually shipped, what users can now do, and any limits given. Use only the needed sections: Added, Changed, Fixed, Removed. Never invent release dates, availability, screenshots, security details, usage stats or version numbers. If "status" is "Not shipped yet", write it as an upcoming note, not as live.
"factsToVerify": e.g. release date, availability.`,
    schema: obj({ title: S, summary: S, sections: { type: "array", items: obj({ heading: { type: "string", enum: ["Added", "Changed", "Fixed", "Removed"] }, body: S }) }, factsToVerify: A }),
    maxTokens: 700,
    validate: (raw, input) => {
      const r = raw as Record<string, unknown>;
      const title = str(r?.title, 120);
      const sections = (Array.isArray(r?.sections) ? (r.sections as Record<string, unknown>[]) : []).map((s) => ({ heading: str(s?.heading, 20), body: str(s?.body, 800) })).filter((s) => ["Added", "Changed", "Fixed", "Removed"].includes(s.heading) && s.body).slice(0, 4);
      if (!title || !sections.length) return bad("missing parts");
      const body = sections.map((s) => `${s.heading}\n${s.body}`).join("\n\n");
      const verify = arr(r.factsToVerify, 5);
      const markdown = [`## ${title}`, "", str(r.summary, 400), "", ...sections.flatMap((s) => [`### ${s.heading}`, "", s.body, ""])].join("\n").trim();
      return ok({ fields: [{ key: "title", label: "Title", value: title, large: true }, { key: "summary", label: "Summary", value: str(r.summary, 400), multiline: true }, { key: "body", label: "Details", value: body, multiline: true }], lists: [{ label: "Verify before publishing", items: verify.length ? verify : ["Release date", "Who has access"] }], notes: [input.status === "Not shipped yet" ? "Status: draft. This change isn't live yet, so don't publish it as shipped." : "Status: draft. Review it before you publish."], markdown });
    },
  },
};
