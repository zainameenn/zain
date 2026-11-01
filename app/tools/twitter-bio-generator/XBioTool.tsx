"use client";

import { useEffect, useRef, useState } from "react";
import { X_BIO_CHOICES, X_BIO_CTA, X_BIO_EMOJI, X_BIO_IMPROVE, X_BIO_LANGUAGES, X_BIO_LIMIT, X_BIO_TONES, xCount, type XBioKind } from "@/lib/tools/families/x-bio-choices";
import { track } from "@/lib/tools/v3/track";
import f from "../facebook-bio-generator/fb.module.css";
import x from "./x.module.css";

// The Twitter (X) Bio Generator. The Facebook Bio Generator's three stage card (form, a short writing
// state, editable results), with two modes and five results. Bios come from /api/tools/x-bio; nothing is
// generated locally or faked.

const SLUG = "twitter-bio-generator";
type Kind = XBioKind;
const KINDS = Object.keys(X_BIO_CHOICES) as Kind[];
const MESSAGES = ["Finding the right words...", "Keeping it under 160 characters...", "Making each version sound different..."];
const FAIL = "The bios couldn't be written just now. Please try again.";

type Answers = { about: string; picks: string[]; others: string[] };
const fresh = (k: Kind): Answers => ({ about: "", picks: X_BIO_CHOICES[k].questions.map((q) => q.options[0]), others: ["", "", ""] });
const EXTRA = { businessName: "", offer: "", audience: "", topics: "", handle: "", proof: "", avoid: "", ctaOther: "" };
type Bio = { style: string; text: string; why: string };

export function XBioTool() {
  const [mode, setMode] = useState<"write" | "improve">("write");
  const [kind, setKind] = useState<Kind>("Personal");
  const [byKind, setByKind] = useState<Record<Kind, Answers>>(() => Object.fromEntries(KINDS.map((k) => [k, fresh(k)])) as Record<Kind, Answers>);
  const [tone, setTone] = useState(X_BIO_TONES[0]);
  const [current, setCurrent] = useState("");
  const [improve, setImprove] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [extra, setExtra] = useState(EXTRA);
  const [language, setLanguage] = useState("English");
  const [emoji, setEmoji] = useState("None");
  const [lineBreaks, setLineBreaks] = useState(false);
  const [cta, setCta] = useState("No CTA");
  const [stage, setStage] = useState<"form" | "loading" | "results">("form");
  const [bios, setBios] = useState<Bio[]>([]);
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState<number | "all" | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(MESSAGES[0]);
  const busy = useRef(false);
  const shellRef = useRef<HTMLDivElement>(null);
  const resultsHeading = useRef<HTMLHeadingElement>(null);
  const currentRef = useRef<HTMLTextAreaElement>(null);

  const cfg = X_BIO_CHOICES[kind];
  const cur = byKind[kind];
  const update = (patch: Partial<Answers>) => setByKind((all) => ({ ...all, [kind]: { ...all[kind], ...patch } }));
  const setPick = (i: number, v: string) => update({ picks: cur.picks.map((p, j) => (j === i ? v : p)) });
  const setOther = (i: number, v: string) => update({ others: cur.others.map((p, j) => (j === i ? v : p)) });
  const setX = (k: keyof typeof EXTRA) => (e: { target: { value: string } }) => setExtra((v) => ({ ...v, [k]: e.target.value }));

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

  async function generate() {
    if (busy.current) return;
    if (mode === "improve" && !current.trim()) {
      setError("Paste the bio you'd like to improve first.");
      currentRef.current?.focus();
      return;
    }
    busy.current = true;
    setError("");
    setMessage(MESSAGES[0]);
    setStage("loading");
    track("tool_generate", SLUG, { kind, mode });
    const payload = {
      mode,
      kind,
      picks: cur.picks,
      other0: cur.others[0],
      other1: cur.others[1],
      other2: cur.others[2],
      about: cur.about,
      tone,
      current: mode === "improve" ? current : "",
      improve,
      language,
      emoji,
      lineBreaks,
      cta,
      ...extra,
      businessName: kind === "Business" ? extra.businessName : "",
      offer: kind === "Business" ? extra.offer : "",
    };
    const back = bios.length ? "results" : "form";
    try {
      const res = await fetch("/api/tools/x-bio", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const body = await res.json().catch(() => ({}));
      if (res.ok && Array.isArray(body?.bios) && body.bios.length) {
        setBios(body.bios as Bio[]);
        setActive(0);
        setStage("results");
        track("tool_success", SLUG);
      } else {
        setError(typeof body?.error === "string" ? body.error : FAIL);
        setStage(back);
      }
    } catch {
      setError("The bios couldn't be written just now. Check your connection and try again.");
      setStage(back);
    }
    busy.current = false;
  }

  async function copy(i: number | "all") {
    const text = i === "all" ? bios.filter((b) => xCount(b.text) <= X_BIO_LIMIT).map((b) => b.text).join("\n\n") : bios[i].text;
    try {
      await navigator.clipboard.writeText(text);
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
  const input = (k: keyof typeof EXTRA, label: string, max: number, placeholder: string) => (
    <div className={f.q}>
      <label htmlFor={`xb-${k}`}>{label}</label>
      <input id={`xb-${k}`} className={x.input} maxLength={max} value={extra[k]} onChange={setX(k)} placeholder={placeholder} />
    </div>
  );

  const preview = bios[active]?.text ?? "";

  return (
    <div className={f.shell} id="bio-tool" ref={shellRef}>
      {stage === "form" ? (
        <section className={`${f.stage} ${f.formStage}`} aria-label="X bio generator form">
          <div className={x.modes} role="tablist" aria-label="Choose what to do">
            {(["write", "improve"] as const).map((m) => (
              <button key={m} type="button" role="tab" aria-selected={mode === m} className={x.mode} onClick={() => (setMode(m), setError(""))}>
                {m === "write" ? "Write a New Bio" : "Improve My Current Bio"}
              </button>
            ))}
          </div>
          <h2 className={f.formHeading}>{mode === "write" ? "What kind of account is it?" : "Let's make your bio better"}</h2>
          <p className={f.hint}>You don&apos;t need to write a whole introduction. The dropdowns are enough to get started.</p>
          <div className={f.types} role="group" aria-label="Select account type">
            {KINDS.map((k) => (
              <button key={k} type="button" className={f.type} aria-pressed={kind === k} onClick={() => setKind(k)}>
                {k}
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
                  <label htmlFor="xb-current">Your current bio</label>
                </div>
                <textarea id="xb-current" ref={currentRef} required rows={3} maxLength={320} value={current} onChange={(e) => setCurrent(e.target.value)} placeholder="Paste the bio from your X profile" />
                <div className={f.hintRow}>
                  <span>We keep your real facts and change the wording.</span>
                  <span>{xCount(current)} characters</span>
                </div>
                <fieldset className={x.chips}>
                  <legend>What would you like to improve?</legend>
                  {X_BIO_IMPROVE.map((o) => (
                    <label key={o} className={x.chip}>
                      <input type="checkbox" checked={improve.includes(o)} onChange={(e) => setImprove((v) => (e.target.checked ? [...v, o] : v.filter((y) => y !== o)))} />
                      <span>{o}</span>
                    </label>
                  ))}
                </fieldset>
              </div>
            ) : (
              <div className={f.optionalIntro}>
                <div className={f.optionalLine}>
                  <label htmlFor="xb-about">{cfg.about}</label>
                  <span className={f.optionalPill}>Optional</span>
                </div>
                <p className={f.optionalDesc} id="xb-about-hint">One real detail makes the bios sound much more like you.</p>
                <textarea id="xb-about" aria-describedby="xb-about-hint" rows={2} maxLength={250} value={cur.about} onChange={(e) => update({ about: e.target.value })} placeholder={cfg.placeholder} />
                <div className={f.hintRow}>
                  <span>Don&apos;t enter passwords or private details.</span>
                  <span>{cur.about.length} / 250</span>
                </div>
              </div>
            )}

            <div className={f.questions}>
              {mode === "write"
                ? cfg.questions.map((q, i) => (
                    <div key={`${kind}-${i}`} className={f.q}>
                      <label htmlFor={`xb-q${i}`}>{q.label}</label>
                      <span className={f.selectWrap}>
                        <select id={`xb-q${i}`} value={cur.picks[i]} onChange={(e) => setPick(i, e.target.value)}>
                          {q.options.map((o) => (
                            <option key={o}>{o}</option>
                          ))}
                        </select>
                      </span>
                      {cur.picks[i] === "Other" ? (
                        <div className={f.other}>
                          <label htmlFor={`xb-q${i}-other`}>Tell us in your words</label>
                          <input id={`xb-q${i}-other`} required maxLength={60} value={cur.others[i]} onChange={(e) => setOther(i, e.target.value)} placeholder="Write your own answer" />
                        </div>
                      ) : null}
                    </div>
                  ))
                : null}
              {select("xb-tone", "Tone", tone, X_BIO_TONES, setTone)}
            </div>

            <div className={x.details}>
              <button type="button" className={x.detailsToggle} aria-expanded={open} aria-controls="xb-more" onClick={() => setOpen((o) => !o)}>
                <span>Make it more personal <em>(optional)</em></span>
                <span aria-hidden="true" className={x.chev} />
              </button>
              {open ? (
                <div id="xb-more" className={x.detailsBody}>
                  <div className={f.questions}>
                    {kind === "Business" ? input("businessName", "Business name", 60, "For example: Rise Bakery") : null}
                    {kind === "Business" ? input("offer", "What do you sell or help with?", 120, "For example: sourdough, pastries and custom cakes") : null}
                    {input("audience", "Who is it for?", 80, "For example: new runners")}
                    {input("topics", "Specific topics", 100, "For example: Elden Ring, speedruns")}
                    {input("proof", "A real achievement or credential", 120, "Only something true")}
                    {input("handle", "Your @handle (only if you want it used)", 16, "@yourhandle")}
                    {input("avoid", "Words to avoid", 100, "For example: guru, ninja")}
                    {select("xb-language", "Language", language, X_BIO_LANGUAGES, setLanguage)}
                    {select("xb-emoji", "Emoji", emoji, X_BIO_EMOJI, setEmoji)}
                    <div className={f.q}>
                      {select("xb-cta", "Call to action", cta, X_BIO_CTA, setCta)}
                      {cta === "Other" ? (
                        <div className={f.other}>
                          <label htmlFor="xb-ctaOther">Your call to action</label>
                          <input id="xb-ctaOther" required maxLength={60} value={extra.ctaOther} onChange={setX("ctaOther")} placeholder="For example: Join the newsletter" />
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <label className={f.toggle}>
                    <input type="checkbox" checked={lineBreaks} onChange={(e) => setLineBreaks(e.target.checked)} /> Allow line breaks
                  </label>
                </div>
              ) : null}
            </div>

            {error ? <p className={f.error} role="alert">{error}</p> : null}
            <p className={f.lengthNote}>We use your answers only to write your bios. Five editable options, each within X&apos;s 160 character limit.</p>
            <div className={f.submitRow}>
              <button className={f.action} type="submit">
                <span aria-hidden="true">✧</span> Generate My X Bios <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        </section>
      ) : null}

      {stage === "loading" ? (
        <section className={`${f.stage} ${f.loading}`} role="status" aria-live="polite" aria-label="Writing your X bios">
          <div className={f.stars} aria-hidden="true">
            {[f.starMain, f.starSmall, f.starLeft].map((c, i) => (
              <svg key={i} className={c} viewBox="0 0 64 64" width={i ? 20 : 52} height={i ? 20 : 52}>
                <path d="M32 0c2 19 13 30 32 32-19 2-30 13-32 32C30 45 19 34 0 32 19 30 30 19 32 0Z" fill="currentColor" />
              </svg>
            ))}
          </div>
          <h2 className={f.loadingTitle}>Writing your bios.</h2>
          <p className={f.loadingCopy}>{message}</p>
          <div className={f.dots} aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        </section>
      ) : null}

      {stage === "results" ? (
        <section className={`${f.stage} ${f.results}`} aria-labelledby="xb-results-h">
          <div className={f.resultTop}>
            <div>
              <span className={f.kicker}>Your X bios</span>
              <h2 id="xb-results-h" ref={resultsHeading} tabIndex={-1} className={f.toolHeading}>
                Here are five ways to introduce yourself
              </h2>
              <p className={f.hint}>Pick the one that sounds most like you. Edit anything, preview it on an X profile, or generate another set.</p>
            </div>
            <div className={x.topActions}>
              <button type="button" className={f.ghost} onClick={() => setStage("form")}>
                ← Change details
              </button>
              <button type="button" className={f.ghost} onClick={() => copy("all")}>
                {copied === "all" ? "Copied" : "Copy all"}
              </button>
            </div>
          </div>
          {error ? <p className={f.error} role="alert">{error}</p> : null}
          <div className={f.list} aria-live="polite">
            {bios.map((b, i) => {
              const n = xCount(b.text);
              const over = n > X_BIO_LIMIT;
              return (
                <div key={i} className={`${f.item} ${active === i ? x.activeItem : ""}`}>
                  <div className={f.itemTop}>
                    <span>{b.style}</span>
                    <em>Edit anything</em>
                  </div>
                  <textarea
                    rows={2}
                    aria-label={`Edit bio option ${i + 1}, ${b.style}`}
                    maxLength={400}
                    value={b.text}
                    onFocus={() => setActive(i)}
                    onChange={(e) => {
                      const v = e.target.value;
                      setBios((all) => all.map((y, j) => (j === i ? { ...y, text: v } : y)));
                      setActive(i);
                    }}
                  />
                  {b.why ? <p className={x.why}><strong>Why it works:</strong> {b.why}</p> : null}
                  <div className={f.itemFoot}>
                    <small className={over ? f.bad : undefined}>
                      {n} / {X_BIO_LIMIT} characters{over ? ` · ${n - X_BIO_LIMIT} over, shorten it to copy` : ""}
                    </small>
                    <span className={x.itemButtons}>
                      <button type="button" className={f.ghost} aria-pressed={active === i} onClick={() => setActive(i)}>
                        Preview
                      </button>
                      <button type="button" className={f.ghost} disabled={over} onClick={() => copy(i)}>
                        {copied === i ? "Copied" : "Copy"}
                      </button>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={f.preview}>
            <p className={f.stageLabel}>Profile preview (illustrative)</p>
            <div className={x.profile}>
              <div className={x.banner} aria-hidden="true" />
              <div className={x.profileBody}>
                <span className={x.pfp} aria-hidden="true">Y</span>
                <strong>{kind === "Business" && extra.businessName.trim() ? extra.businessName.trim() : "Your name"}</strong>
                <small>@{extra.handle.replace(/^@/, "").trim() || "yourhandle"}</small>
                <p className={x.bioText}>{preview}</p>
              </div>
            </div>
            <p className={f.fine}>Counts are a close estimate. Check the count again after you paste into X.</p>
          </div>
          <div className={f.resultFoot}>
            <p className={f.fine}>Written by AI from your answers. Read each one through before you publish.</p>
            <button className={f.action} type="button" onClick={generate}>
              Generate more <span aria-hidden="true">↻</span>
            </button>
          </div>
        </section>
      ) : null}

      <div className={f.trust} aria-label="What the tool includes">
        <span>Free to use</span>
        <span>No signup required</span>
        <span>Five editable options</span>
        <span>160 character limit</span>
      </div>
    </div>
  );
}
