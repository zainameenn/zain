"use client";

import { useEffect, useRef, useState } from "react";
import { FACEBOOK_BIO_CHOICES, FACEBOOK_BIO_LANGUAGES, FACEBOOK_BIO_TONES } from "@/lib/tools/families/facebook-bio-choices";
import { track } from "@/lib/tools/v3/track";
import f from "./fb.module.css";

// The Facebook Bio Generator. Three stages in one footprint: the form, a short writing state and three
// editable results with a live Intro preview. Bios come from the site's AI endpoint (/api/tools), the
// same one every bio generator uses; nothing is generated locally or faked.

const SLUG = "facebook-bio-generator";
type Kind = keyof typeof FACEBOOK_BIO_CHOICES;
const KINDS = Object.keys(FACEBOOK_BIO_CHOICES) as Kind[];
// Facebook Group descriptions are a longer field than the 101 character Intro.
const limitFor = (k: Kind) => (k === "Facebook Group" ? 255 : 101);
const PREVIEW_NAME: Record<Kind, string> = { "Personal Profile": "Your profile", "Business Page": "Your business Page", Creator: "Your creator profile", "Facebook Group": "Your group" };
const first = (k: Kind) => ({ describes: FACEBOOK_BIO_CHOICES[k].describes.options[0] as string, focus: FACEBOOK_BIO_CHOICES[k].focus.options[0] as string });
const LABELS = ["Clear and simple", "A little personality", "Short and punchy"];
const MESSAGES = ["Putting your words together...", "Trying a few different angles...", "Finishing your bio ideas..."];

const count = (t: string) => [...t].length;

export function FacebookBioTool() {
  const [kind, setKind] = useState<Kind>("Personal Profile");
  const [describes, setDescribes] = useState(first("Personal Profile").describes);
  const [focus, setFocus] = useState(first("Personal Profile").focus);
  const [tone, setTone] = useState(FACEBOOK_BIO_TONES[0]);
  const [emoji, setEmoji] = useState(false);
  const [language, setLanguage] = useState("English");
  const [stage, setStage] = useState<"form" | "loading" | "results">("form");
  const [bios, setBios] = useState<string[]>([]);
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(MESSAGES[0]);
  const busy = useRef(false);
  const resultsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (stage !== "loading") return;
    const a = setTimeout(() => setMessage(MESSAGES[1]), 2500);
    const b = setTimeout(() => setMessage(MESSAGES[2]), 6000);
    return () => (clearTimeout(a), clearTimeout(b));
  }, [stage]);

  useEffect(() => {
    if (stage === "results") resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [stage]);

  async function generate() {
    if (busy.current) return;
    busy.current = true;
    setError("");
    setMessage(MESSAGES[0]);
    setStage("loading");
    track("tool_generate", SLUG, { kind });
    // Field names match the Facebook bio fields the API validates (lib/tools/families/bio-facebook.ts).
    const input = { profile_type: kind, describes, focus, tone, language, emoji: emoji ? "Yes" : "No" };
    try {
      const res = await fetch("/api/tools", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ slug: SLUG, input }) });
      const body = await res.json().catch(() => ({}));
      const list = Array.isArray(body?.data?.options) ? (body.data.options as { text?: string }[]).map((o) => (o.text ?? "").replace(/\s*\n\s*/g, " ").trim()).filter(Boolean) : [];
      if (!res.ok || !list.length) {
        setError(res.status === 429 ? "Lots of people are writing bios right now. Try again in a minute." : typeof body?.error === "string" ? body.error : "The bios couldn't be written just now. Please try again.");
        setStage(bios.length ? "results" : "form");
      } else {
        setBios(list.slice(0, 3));
        setActive(0);
        setStage("results");
        track("tool_success", SLUG);
      }
    } catch {
      setError("The bios couldn't be written just now. Check your connection and try again.");
      setStage(bios.length ? "results" : "form");
    }
    busy.current = false;
  }

  async function copy(i: number) {
    try {
      await navigator.clipboard.writeText(bios[i]);
      setCopied(i);
      track("tool_copy", SLUG);
      setTimeout(() => setCopied((c) => (c === i ? null : c)), 1600);
    } catch {}
  }

  const pick = (k: Kind) => {
    setKind(k);
    setDescribes(first(k).describes);
    setFocus(first(k).focus);
  };
  const LIMIT = limitFor(kind);
  const q = FACEBOOK_BIO_CHOICES[kind];

  return (
    <div className={f.shell} id="bio-tool">
      {stage === "form" ? (
        <section className={f.stage} aria-label="Bio generator form">
          <p className={f.stageLabel}>Your intro, in a few clicks</p>
          <h2 className={f.toolHeading}>What are we writing a bio for?</h2>
          <div className={f.types} role="group" aria-label="Select profile type">
            {KINDS.map((k) => (
              <button key={k} type="button" className={f.type} aria-pressed={kind === k} onClick={() => pick(k)}>
                {k}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              generate();
            }}
          >
            <div className={f.row}>
              <div className={f.field}>
                <label htmlFor="fb-describes">{q.describes.label}</label>
                <select id="fb-describes" value={describes} onChange={(e) => setDescribes(e.target.value)}>
                  {q.describes.options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div className={f.field}>
                <label htmlFor="fb-focus">{q.focus.label}</label>
                <select id="fb-focus" value={focus} onChange={(e) => setFocus(e.target.value)}>
                  {q.focus.options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className={f.row}>
              <div className={f.field}>
                <label htmlFor="fb-tone">Tone</label>
                <select id="fb-tone" value={tone} onChange={(e) => setTone(e.target.value)}>
                  {FACEBOOK_BIO_TONES.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
              <div className={f.field}>
                <label htmlFor="fb-lang">Language</label>
                <select id="fb-lang" value={language} onChange={(e) => setLanguage(e.target.value)}>
                  {FACEBOOK_BIO_LANGUAGES.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>
            </div>
            <label className={f.toggle}>
              <input type="checkbox" checked={emoji} onChange={(e) => setEmoji(e.target.checked)} /> Include emoji
            </label>
            {error ? <p className={f.error} role="alert">{error}</p> : null}
            <div className={f.submitRow}>
              <button className={f.action} type="submit">
                <span aria-hidden="true">✧</span> Generate My Bio <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        </section>
      ) : null}

      {stage === "loading" ? (
        <section className={`${f.stage} ${f.loading}`} role="status" aria-live="polite" aria-label="Preparing your bio ideas">
          <div className={f.stars} aria-hidden="true">
            {[f.starMain, f.starSmall, f.starLeft].map((c, i) => (
              <svg key={i} className={c} viewBox="0 0 64 64" width={i ? 20 : 52} height={i ? 20 : 52}>
                <path d="M32 0c2 19 13 30 32 32-19 2-30 13-32 32C30 45 19 34 0 32 19 30 30 19 32 0Z" fill="currentColor" />
              </svg>
            ))}
          </div>
          <h2 className={f.loadingTitle}>Making it sound like you.</h2>
          <p className={f.loadingCopy}>{message}</p>
          <div className={f.dots} aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        </section>
      ) : null}

      {stage === "results" ? (
        <section className={`${f.stage} ${f.results}`} ref={resultsRef} aria-label="Your bio ideas">
          <div className={f.resultTop}>
            <div>
              <span className={f.kicker}>Your bio ideas</span>
              <h2 className={f.toolHeading}>Here are three ways to say it.</h2>
              <p className={f.hint}>Pick one, make any changes, and copy it to Facebook.</p>
            </div>
            <button type="button" className={f.ghost} onClick={() => setStage("form")}>
              ← Change options
            </button>
          </div>
          {error ? <p className={f.error} role="alert">{error}</p> : null}
          <div className={f.list} aria-live="polite">
            {bios.map((bio, i) => {
              const n = count(bio);
              const over = n > LIMIT;
              return (
                <div key={i} className={f.item}>
                  <div className={f.itemTop}>
                    <span>{LABELS[i] ?? `Option ${i + 1}`}</span>
                    <em>Edit anything</em>
                  </div>
                  <textarea
                    rows={2}
                    aria-label={`Edit bio option ${i + 1}`}
                    maxLength={250}
                    value={bio}
                    onFocus={() => setActive(i)}
                    onChange={(e) => {
                      const v = e.target.value;
                      setBios((b) => b.map((x, j) => (j === i ? v : x)));
                      setActive(i);
                    }}
                  />
                  <div className={f.itemFoot}>
                    <small className={over ? f.bad : undefined}>
                      {n} / {LIMIT} characters{over ? " · Too long" : ""}
                    </small>
                    <button type="button" className={f.ghost} disabled={over} onClick={() => copy(i)}>
                      {copied === i ? "Copied" : "Copy bio"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={f.preview}>
            <p className={f.stageLabel}>Live intro preview</p>
            <div className={f.previewHead}>
              <span className={f.avatar} aria-hidden="true">Y</span>
              <div>
                <strong>{PREVIEW_NAME[kind]}</strong>
                <small>Intro · Example preview</small>
              </div>
            </div>
            <p className={f.previewIntro}>{bios[active] ?? "Choose a bio to see it here."}</p>
          </div>
          <div className={f.resultFoot}>
            <p className={f.fine}>Written by AI from your details. Read it through before you publish.</p>
            <button className={f.action} type="button" onClick={generate}>
              Try three more <span aria-hidden="true">↻</span>
            </button>
          </div>
        </section>
      ) : null}

      <div className={f.trust} aria-label="What the tool includes">
        <span>Three editable options</span>
        <span>Character counter</span>
        <span>Copy and paste</span>
        <span>No sign in</span>
      </div>
    </div>
  );
}

/** Example tabs with copy buttons. */
const EXAMPLES: Record<string, [string, string][]> = {
  Personal: [["Simple", "Coffee, good books, and a camera roll full of small moments."], ["Interests", "Learning new things, getting lost in good stories, and always up for a long walk."], ["Low key", "Taking life one interesting day at a time."]],
  Business: [["Local business", "Fresh cakes and brownies made in Lahore. Message us for custom orders."], ["Service business", "Helping small businesses make sense of their marketing."], ["Shop", "Thoughtfully made everyday pieces. Browse our latest collection."]],
  Creator: [["Photography", "Phone photography tips, honest reviews, and little creative experiments."], ["Gaming", "Gaming stories, side quests, and occasional very questionable decisions."], ["Cooking", "Simple recipes for people who love good food and easy instructions."]],
  "Funny & aesthetic": [["Funny", "Professional overthinker. Amateur at everything else."], ["Aesthetic", "Soft mornings, old books, and an unreasonable love for rain."], ["Minimal", "More doing, less explaining."]],
  Group: [["Community", "A friendly place for new gardeners to learn, share, and ask questions."], ["Local group", "Neighbors sharing recommendations, questions, and little wins."], ["Creative group", "A space for artists to show work, swap ideas, and keep making things."]],
};

export function BioExamples() {
  const [tab, setTab] = useState("Personal");
  const [copied, setCopied] = useState<string | null>(null);
  return (
    <>
      <div className={f.tabs} role="tablist" aria-label="Bio example categories">
        {Object.keys(EXAMPLES).map((t) => (
          <button key={t} type="button" role="tab" aria-selected={tab === t} className={f.tab} onClick={() => setTab(t)}>
            {t}
          </button>
        ))}
      </div>
      <div className={f.examples} role="tabpanel">
        {EXAMPLES[tab].map(([label, bio]) => (
          <article key={bio} className={f.exampleCard}>
            <span className={f.tag}>{label}</span>
            <blockquote>{bio}</blockquote>
            <div className={f.cardFoot}>
              <small>{count(bio)} characters</small>
              <button
                type="button"
                className={f.ghost}
                aria-label={`Copy example: ${bio}`}
                onClick={async () => {
                  await navigator.clipboard.writeText(bio).catch(() => undefined);
                  setCopied(bio);
                  setTimeout(() => setCopied((c) => (c === bio ? null : c)), 1600);
                }}
              >
                {copied === bio ? "Copied" : "Copy"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
