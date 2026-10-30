"use client";

import { useEffect, useRef, useState } from "react";
import { TIKTOK_BIO_CHOICES, TIKTOK_BIO_EMOJI, TIKTOK_BIO_LANGUAGES, TIKTOK_BIO_LIMIT, TIKTOK_BIO_TONES, TIKTOK_CONTACT_CTAS, TIKTOK_LINK_CTAS, tiktokCount, type TikTokBioKind } from "@/lib/tools/families/tiktok-bio-choices";
import { track } from "@/lib/tools/v3/track";
import f from "../facebook-bio-generator/fb.module.css";
import k from "./tiktok.module.css";

// The TikTok Bio Generator. The Facebook and X tools' three stage card (form, a short writing state,
// editable results), with five angles, a phone preview and per bio regeneration. Bios come from
// /api/tools/tiktok-bio; nothing is generated locally or faked.

const SLUG = "tiktok-bio-generator";
type Kind = TikTokBioKind;
const KINDS = Object.keys(TIKTOK_BIO_CHOICES) as Kind[];
const MESSAGES = ["Finding the right words...", "Keeping it short...", "Making it sound like you..."];
const FAIL = "The bios couldn't be written just now. Please try again.";

type Answers = { about: string; picks: string[]; others: string[] };
const fresh = (kind: Kind): Answers => ({ about: "", picks: TIKTOK_BIO_CHOICES[kind].questions.map((q) => q.options[0]), others: ["", "", "", ""] });
const MORE = { proof: "", location: "", rhythm: "", avoid: "" };
type Bio = { angle: string; text: string; why: string };

export function TikTokBioTool() {
  const [mode, setMode] = useState<"write" | "improve">("write");
  const [kind, setKind] = useState<Kind>("Personal");
  const [byKind, setByKind] = useState<Record<Kind, Answers>>(() => Object.fromEntries(KINDS.map((y) => [y, fresh(y)])) as Record<Kind, Answers>);
  const [tone, setTone] = useState(TIKTOK_BIO_TONES[0]);
  const [language, setLanguage] = useState("English");
  const [emoji, setEmoji] = useState("None");
  const [current, setCurrent] = useState("");
  const [open, setOpen] = useState(false);
  const [more, setMore] = useState(MORE);
  const [link, setLink] = useState(false);
  const [contact, setContact] = useState(false);
  const [twoLines, setTwoLines] = useState(false);
  const [stage, setStage] = useState<"form" | "loading" | "results">("form");
  const [bios, setBios] = useState<Bio[]>([]);
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState<number | null>(null);
  const [redoing, setRedoing] = useState<number | null>(null);
  const [cardError, setCardError] = useState<{ i: number; msg: string } | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(MESSAGES[0]);
  const busy = useRef(false);
  const request = useRef(0);
  const shellRef = useRef<HTMLDivElement>(null);
  const resultsHeading = useRef<HTMLHeadingElement>(null);
  const currentRef = useRef<HTMLTextAreaElement>(null);

  const cfg = TIKTOK_BIO_CHOICES[kind];
  const cur = byKind[kind];
  const update = (patch: Partial<Answers>) => setByKind((all) => ({ ...all, [kind]: { ...all[kind], ...patch } }));
  const setPick = (i: number, v: string) => update({ picks: cur.picks.map((p, j) => (j === i ? v : p)) });
  const setOther = (i: number, v: string) => update({ others: cur.others.map((p, j) => (j === i ? v : p)) });
  const setM = (key: keyof typeof MORE) => (e: { target: { value: string } }) => setMore((v) => ({ ...v, [key]: e.target.value }));
  /** Next steps the profile can't support are hidden, and a hidden pick shows as the first option. */
  const allowed = (o: string) => (!TIKTOK_LINK_CTAS.includes(o) || link) && (!TIKTOK_CONTACT_CTAS.includes(o) || contact);
  const shown = (i: number) => (allowed(cur.picks[i]) ? cur.picks[i] : cfg.questions[i].options[0]);

  useEffect(() => {
    if (stage !== "loading") return;
    const a = setTimeout(() => setMessage(MESSAGES[1]), 2500);
    const b = setTimeout(() => setMessage(MESSAGES[2]), 5500);
    return () => (clearTimeout(a), clearTimeout(b));
  }, [stage]);

  useEffect(() => {
    if (stage === "results") {
      shellRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      resultsHeading.current?.focus({ preventScroll: true });
    }
  }, [stage]);

  const payload = (extra: Record<string, unknown> = {}) => ({
    mode,
    kind,
    picks: cfg.questions.map((_, i) => shown(i)),
    other0: cur.others[0],
    other1: cur.others[1],
    other2: cur.others[2],
    other3: cur.others[3],
    about: cur.about,
    current: mode === "improve" ? current : "",
    tone,
    language,
    emoji,
    twoLines,
    link,
    contact,
    ...more,
    ...extra,
  });

  async function call(body: Record<string, unknown>) {
    const res = await fetch("/api/tools/tiktok-bio", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const data = await res.json().catch(() => ({}));
    if (res.ok && Array.isArray(data?.bios) && data.bios.length) return data.bios as Bio[];
    throw new Error(typeof data?.error === "string" ? data.error : FAIL);
  }

  async function generate(fresh = false) {
    if (busy.current) return;
    if (mode === "improve" && !current.trim()) {
      setError("Paste the bio you'd like to improve first.");
      currentRef.current?.focus();
      return;
    }
    busy.current = true;
    const id = ++request.current;
    setError("");
    setCardError(null);
    setMessage(MESSAGES[0]);
    setStage("loading");
    track("tool_generate", SLUG, { kind, mode });
    const back = bios.length ? "results" : "form";
    try {
      const list = await call(payload(fresh ? { previous: bios.map((b) => b.text) } : {}));
      if (id !== request.current) return;
      setBios(list);
      setActive(0);
      setStage("results");
      track("tool_success", SLUG);
    } catch (err) {
      if (id !== request.current) return;
      setError(err instanceof Error && err.message !== "Failed to fetch" ? err.message : "The bios couldn't be written just now. Check your connection and try again.");
      setStage(back);
      track("tool_error", SLUG);
    } finally {
      busy.current = false;
    }
  }

  async function redoOne(i: number) {
    if (redoing !== null) return;
    setRedoing(i);
    setCardError(null);
    track("tool_regenerate", SLUG);
    try {
      const [b] = await call(payload({ one: i, previous: [bios[i].text] }));
      setBios((all) => all.map((y, j) => (j === i ? b : y)));
      setActive(i);
    } catch (err) {
      setCardError({ i, msg: err instanceof Error ? err.message : FAIL });
    }
    setRedoing(null);
  }

  async function copy(i: number) {
    try {
      await navigator.clipboard.writeText(bios[i].text);
      setCopied(i);
      track("tool_copy", SLUG);
      setTimeout(() => setCopied((c) => (c === i ? null : c)), 1600);
    } catch {}
  }

  const select = (id: string, label: string, value: string, options: string[], onChange: (v: string) => void) => (
    <div className={f.q}>
      <label htmlFor={id}>{label}</label>
      <span className={f.selectWrap}>
        <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </span>
    </div>
  );
  const input = (key: keyof typeof MORE, label: string, max: number, placeholder: string) => (
    <div className={f.q}>
      <label htmlFor={`tt-${key}`}>{label}</label>
      <input id={`tt-${key}`} className={k.input} maxLength={max} value={more[key]} onChange={setM(key)} placeholder={placeholder} />
    </div>
  );

  const preview = bios[active]?.text ?? "";

  return (
    <div className={f.shell} id="bio-tool" ref={shellRef}>
      {stage === "form" ? (
        <section className={`${f.stage} ${f.formStage}`} aria-label="TikTok bio generator form">
          <div className={k.modes} role="tablist" aria-label="Choose what to do">
            {(["write", "improve"] as const).map((m) => (
              <button key={m} type="button" role="tab" aria-selected={mode === m} className={k.mode} onClick={() => (setMode(m), setError(""))}>
                {m === "write" ? "Write a New Bio" : "Improve My Current Bio"}
              </button>
            ))}
          </div>
          <p className={f.stageLabel}>Your profile, your words</p>
          <h2 className={f.formHeading}>What should your TikTok bio say?</h2>
          <p className={f.hint}>A few quick choices are enough. More detail is optional.</p>
          <div className={f.types} role="group" aria-label="Select account type">
            {KINDS.map((y) => (
              <button key={y} type="button" className={f.type} aria-pressed={kind === y} onClick={() => setKind(y)}>
                {y}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (e.currentTarget.reportValidity()) generate();
            }}
          >
            {mode === "improve" ? (
              <div className={f.optionalIntro}>
                <div className={f.optionalLine}>
                  <label htmlFor="tt-current">Your current bio</label>
                </div>
                <textarea id="tt-current" ref={currentRef} required rows={2} maxLength={200} value={current} onChange={(e) => setCurrent(e.target.value)} placeholder="Paste the bio from your TikTok profile" />
                <div className={f.hintRow}>
                  <span>We keep your real facts and make it shorter and clearer.</span>
                  <span>{tiktokCount(current)} characters</span>
                </div>
              </div>
            ) : (
              <div className={f.optionalIntro}>
                <div className={f.optionalLine}>
                  <label htmlFor="tt-about">Tell us a little about yourself, your content or your business</label>
                  <span className={f.optionalPill}>Optional</span>
                </div>
                <textarea id="tt-about" rows={2} maxLength={300} value={cur.about} onChange={(e) => update({ about: e.target.value })} placeholder={cfg.placeholder} />
                <div className={f.hintRow}>
                  <span>No essay required. One real detail is plenty.</span>
                  <span>{cur.about.length} / 300</span>
                </div>
              </div>
            )}

            {mode === "write" ? (
              <div className={f.questions}>
                {cfg.questions.map((q, i) => (
                  <div key={`${kind}-${i}`} className={f.q}>
                    <label htmlFor={`tt-q${i}`}>{q.label}</label>
                    <span className={f.selectWrap}>
                      <select id={`tt-q${i}`} value={shown(i)} onChange={(e) => setPick(i, e.target.value)}>
                        {q.options.filter(allowed).map((o) => (
                          <option key={o}>{o}</option>
                        ))}
                      </select>
                    </span>
                    {shown(i) === "Other" ? (
                      <div className={f.other}>
                        <label htmlFor={`tt-q${i}-other`}>Tell us in your words</label>
                        <input id={`tt-q${i}-other`} required maxLength={120} value={cur.others[i]} onChange={(e) => setOther(i, e.target.value)} placeholder="Write your own answer" />
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
            <div className={k.row3}>
              {select("tt-tone", "Tone", tone, TIKTOK_BIO_TONES, setTone)}
              {select("tt-language", "Language", language, TIKTOK_BIO_LANGUAGES, setLanguage)}
              {select("tt-emoji", "Emoji", emoji, TIKTOK_BIO_EMOJI, setEmoji)}
            </div>

            <div className={k.details}>
              <button type="button" className={k.detailsToggle} aria-expanded={open} aria-controls="tt-more" onClick={() => setOpen((o) => !o)}>
                <span>More details <em>(optional)</em></span>
                <span aria-hidden="true" className={k.chev} />
              </button>
              {open ? (
                <div id="tt-more" className={k.detailsBody}>
                  <div className={f.questions}>
                    {input("proof", "A real achievement or proof", 120, "Only something true")}
                    {input("location", "Location (if it matters)", 60, "For example: Austin")}
                    {input("rhythm", "Real posting rhythm", 60, "For example: new recipe every Sunday")}
                    {input("avoid", "Words to avoid", 100, "For example: vibes, guru")}
                  </div>
                  <div className={k.checks}>
                    <label className={f.toggle}>
                      <input type="checkbox" checked={link} onChange={(e) => setLink(e.target.checked)} /> I have a clickable website link available on TikTok
                    </label>
                    <label className={f.toggle}>
                      <input type="checkbox" checked={contact} onChange={(e) => setContact(e.target.checked)} /> I take messages or bookings
                    </label>
                    <label className={f.toggle}>
                      <input type="checkbox" checked={twoLines} onChange={(e) => setTwoLines(e.target.checked)} /> Use two short lines
                    </label>
                  </div>
                </div>
              ) : null}
            </div>

            {error ? <p className={f.error} role="alert">{error}</p> : null}
            <div className={f.submitRow}>
              <button className={f.action} type="submit">
                <span aria-hidden="true">✧</span> Generate My TikTok Bios <span aria-hidden="true">→</span>
              </button>
            </div>
            <p className={k.under}>Five editable bios · Character count · Ready to copy</p>
          </form>
        </section>
      ) : null}

      {stage === "loading" ? (
        <section className={`${f.stage} ${f.loading}`} role="status" aria-live="polite" aria-label="Writing your TikTok bios">
          <div className={f.stars} aria-hidden="true">
            {[f.starMain, f.starSmall, f.starLeft].map((c, i) => (
              <svg key={i} className={c} viewBox="0 0 64 64" width={i ? 20 : 52} height={i ? 20 : 52}>
                <path d="M32 0c2 19 13 30 32 32-19 2-30 13-32 32C30 45 19 34 0 32 19 30 30 19 32 0Z" fill="currentColor" />
              </svg>
            ))}
          </div>
          <h2 className={f.loadingTitle}>Making your next bio.</h2>
          <p className={f.loadingCopy}>{message}</p>
          <div className={f.dots} aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        </section>
      ) : null}

      {stage === "results" ? (
        <section className={`${f.stage} ${f.results}`} aria-labelledby="tt-results-h">
          <div className={f.resultTop}>
            <div>
              <span className={f.kicker}>Your TikTok bios</span>
              <h2 id="tt-results-h" ref={resultsHeading} tabIndex={-1} className={f.toolHeading}>
                Five bios. Pick the one that sounds like you.
              </h2>
              <p className={f.hint}>Each one takes a slightly different approach. Edit the words, check the length, preview it, and copy your favorite.</p>
            </div>
            <button type="button" className={f.ghost} onClick={() => setStage("form")}>
              ← Edit My Details
            </button>
          </div>
          {error ? <p className={f.error} role="alert">{error}</p> : null}
          <div className={k.resultsGrid}>
            <div className={f.list} aria-live="polite">
              {bios.map((b, i) => {
                const n = tiktokCount(b.text);
                const over = n > TIKTOK_BIO_LIMIT;
                return (
                  <div key={i} className={`${f.item} ${active === i ? k.activeItem : ""}`}>
                    <div className={f.itemTop}>
                      <span>{b.angle}</span>
                      <em>Edit anything</em>
                    </div>
                    <textarea
                      rows={2}
                      aria-label={`Edit bio option ${i + 1}, ${b.angle}`}
                      maxLength={200}
                      value={b.text}
                      onFocus={() => setActive(i)}
                      onChange={(e) => {
                        const v = e.target.value;
                        setBios((all) => all.map((y, j) => (j === i ? { ...y, text: v } : y)));
                        setActive(i);
                      }}
                    />
                    {b.why ? <p className={k.why}><strong>Why it works:</strong> {b.why}</p> : null}
                    {cardError?.i === i ? <p className={f.error} role="alert">{cardError.msg}</p> : null}
                    <div className={f.itemFoot}>
                      <small className={over ? f.bad : undefined}>
                        {n} / {TIKTOK_BIO_LIMIT} characters{over ? ` · ${n - TIKTOK_BIO_LIMIT} over, shorten it to copy` : ""}
                      </small>
                      <span className={k.itemButtons}>
                        <button type="button" className={f.ghost} aria-pressed={active === i} onClick={() => setActive(i)}>
                          Preview
                        </button>
                        <button type="button" className={f.ghost} disabled={redoing !== null} onClick={() => redoOne(i)}>
                          {redoing === i ? "Writing..." : "Try another version"}
                        </button>
                        <button type="button" className={f.ghost} disabled={over} onClick={() => copy(i)}>
                          {copied === i ? "Copied" : "Copy bio"}
                        </button>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={k.phoneCol}>
              <p className={f.stageLabel}>Illustrative preview</p>
              <div className={k.phone}>
                <span className={k.notch} aria-hidden="true" />
                <span className={k.avatar} aria-hidden="true">Y</span>
                <strong>Your Name</strong>
                <small>@yourname</small>
                <span className={k.editBtn} aria-hidden="true">Edit profile</span>
                <p className={k.bio}>{preview}</p>
              </div>
              <p className={f.fine}>TikTok publishes an 80 character limit. Check your own Edit profile screen before saving.</p>
            </div>
          </div>
          <p className={f.fine} style={{ textAlign: "center" }}>Written by AI from your answers. Please check details before using.</p>
          <div className={k.resultActions}>
            <div className={f.q}>
              <label htmlFor="tt-tone2">Try a different tone</label>
              <span className={f.selectWrap}>
                <select id="tt-tone2" value={tone} onChange={(e) => setTone(e.target.value)}>
                  {TIKTOK_BIO_TONES.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </span>
            </div>
            <button className={f.action} type="button" onClick={() => generate(true)}>
              Regenerate All <span aria-hidden="true">↻</span>
            </button>
          </div>
        </section>
      ) : null}

      <div className={f.trust} aria-label="What the tool includes">
        <span>Free to use</span>
        <span>Five editable ideas</span>
        <span>80 character checker</span>
        <span>No signup</span>
      </div>
    </div>
  );
}
