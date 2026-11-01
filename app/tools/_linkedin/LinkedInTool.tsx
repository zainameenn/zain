"use client";

import { useEffect, useRef, useState } from "react";
import { LINKEDIN_ACTIONS, LINKEDIN_TOOLS, liCount, windowFor, type LinkedInAction, type LinkedInField, type LinkedInKind } from "@/lib/tools/families/linkedin-choices";
import { track } from "@/lib/tools/v3/track";
import f from "../facebook-bio-generator/fb.module.css";
import l from "./linkedin.module.css";

// The six LinkedIn tools share this card: a short form, a writing state, then ONE editable result with a
// live count, one step refinements and an illustrative preview (or, for Skills, one organised list).
// Results come from /api/tools/linkedin, which runs the Prompt Library prompts. Nothing is generated locally.

const MESSAGES = ["Reading your answers...", "Writing one strong draft...", "Checking the length and the facts..."];
const FAIL = "That couldn't be written just now. Please try again.";
/** Roughly where LinkedIn cuts each field with "see more". It varies by device, so the preview says so. */
const FOLD: Record<LinkedInKind, number> = { post: 210, comment: 0, headline: 0, about: 260, experience: 200, skills: 0 };

type Skill = { skill: string; group: string; evidence?: string; why?: string };
type Lists = { confirmed: Skill[]; suggested: Skill[]; gaps: Skill[] };

const fresh = (fields: LinkedInField[]) => Object.fromEntries(fields.map((x) => [x.key, x.type === "select" ? x.options[0] : ""])) as Record<string, string>;

export function LinkedInTool({ kind }: { kind: LinkedInKind }) {
  const tool = LINKEDIN_TOOLS[kind];
  const [values, setValues] = useState(() => fresh(tool.fields));
  const [others, setOthers] = useState<Record<string, string>>({});
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<"form" | "loading" | "results">("form");
  const [text, setText] = useState("");
  const [lists, setLists] = useState<Lists | null>(null);
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState<LinkedInAction | "another" | null>(null);
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(MESSAGES[0]);
  const request = useRef(0);
  const shellRef = useRef<HTMLDivElement>(null);
  const resultsHeading = useRef<HTMLHeadingElement>(null);
  const id = (k: string) => `li-${kind}-${k}`;

  useEffect(() => {
    if (stage !== "loading") return;
    const a = setTimeout(() => setMessage(MESSAGES[1]), 1800);
    const b = setTimeout(() => setMessage(MESSAGES[2]), 4500);
    return () => (clearTimeout(a), clearTimeout(b));
  }, [stage]);

  useEffect(() => {
    if (stage === "results") {
      shellRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      resultsHeading.current?.focus({ preventScroll: true });
    }
  }, [stage]);

  const set = (k: string, v: string) => setValues((all) => ({ ...all, [k]: v }));
  const body = (extra: Record<string, unknown> = {}) => ({ slug: tool.slug, values: { ...values, ...Object.fromEntries(Object.entries(others).map(([k, v]) => [`${k}Other`, v])) }, ...extra });

  async function call(extra: Record<string, unknown> = {}) {
    const res = await fetch("/api/tools/linkedin", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body(extra)) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(typeof data?.error === "string" ? data.error : FAIL);
    return data as { text?: string } & Partial<Lists>;
  }

  function show(data: { text?: string } & Partial<Lists>) {
    if (kind === "skills") {
      const next = { confirmed: data.confirmed ?? [], suggested: data.suggested ?? [], gaps: data.gaps ?? [] };
      setLists(next);
      setPicked(new Set(next.confirmed.map((s) => s.skill)));
    } else {
      setText(data.text ?? "");
      setExpanded(false);
    }
  }

  async function generate() {
    const n = ++request.current;
    setError("");
    setMessage(MESSAGES[0]);
    setStage("loading");
    track("tool_generate", tool.slug);
    try {
      const data = await call();
      if (n !== request.current) return;
      show(data);
      setStage("results");
      track("tool_success", tool.slug);
    } catch (err) {
      if (n !== request.current) return;
      setError(err instanceof Error && err.message !== "Failed to fetch" ? err.message : "That couldn't be written just now. Check your connection and try again.");
      setStage(text || lists ? "results" : "form");
      track("tool_error", tool.slug);
    }
  }

  /** "another" writes a fresh version with the library's regenerate note; the rest refine the current draft. */
  async function refine(action: LinkedInAction | "another") {
    if (busy) return;
    setBusy(action);
    setError("");
    track(action === "another" ? "tool_regenerate" : "tool_edit", tool.slug, { action });
    try {
      const previous = kind === "skills" ? [...(lists?.confirmed ?? []), ...(lists?.suggested ?? [])].map((s) => s.skill).join(", ") : text;
      show(await call(action === "another" ? { previous } : { action, current: text }));
    } catch (err) {
      setError(err instanceof Error ? err.message : FAIL);
    }
    setBusy(null);
  }

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      track("tool_copy", tool.slug);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  }

  const field = (x: LinkedInField) =>
    x.type === "select" ? (
      <div key={x.key} className={f.q}>
        <label htmlFor={id(x.key)}>{x.label}</label>
        <span className={f.selectWrap}>
          <select id={id(x.key)} value={values[x.key]} onChange={(e) => set(x.key, e.target.value)}>
            {x.options.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </span>
        {x.other && values[x.key] === "Other" ? (
          <div className={f.other}>
            <label htmlFor={id(`${x.key}-other`)}>Tell us in your words</label>
            <input id={id(`${x.key}-other`)} required maxLength={80} value={others[x.key] ?? ""} onChange={(e) => setOthers((o) => ({ ...o, [x.key]: e.target.value }))} placeholder="Write your own answer" />
          </div>
        ) : null}
      </div>
    ) : (
      <div key={x.key} className={`${f.q} ${x.type === "area" ? l.wide : ""}`}>
        <label htmlFor={id(x.key)}>
          {x.label}
          {x.required ? <span className={l.req}> Required</span> : null}
        </label>
        {x.type === "area" ? (
          <textarea id={id(x.key)} className={l.area} rows={x.required ? 4 : 3} required={x.required} maxLength={x.max} value={values[x.key]} onChange={(e) => set(x.key, e.target.value)} placeholder={x.placeholder} />
        ) : (
          <input id={id(x.key)} className={l.input} required={x.required} maxLength={x.max} value={values[x.key]} onChange={(e) => set(x.key, e.target.value)} placeholder={x.placeholder} />
        )}
        {x.type === "area" ? <small className={l.counter}>{values[x.key].length} / {x.max}</small> : null}
      </div>
    );

  const main = tool.fields.filter((x) => !x.more);
  const more = tool.fields.filter((x) => x.more);
  const win = windowFor(tool, values);
  const n = liCount(text);
  const over = tool.hardMax ? n > tool.hardMax : false;

  return (
    <div className={f.shell} id="linkedin-tool" ref={shellRef}>
      {stage === "form" ? (
        <section className={`${f.stage} ${f.formStage}`} aria-label={`${tool.name} form`}>
          <p className={f.stageLabel}>Your words, your facts</p>
          <h2 className={f.formHeading}>{tool.heading}</h2>
          <p className={f.hint}>Required fields are marked. Everything else is optional, but one real detail makes a big difference.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (e.currentTarget.reportValidity()) generate();
            }}
          >
            <div className={f.questions}>{main.map(field)}</div>
            <p className={l.sampleRow}>
              <button type="button" className={l.linkBtn} onClick={() => (setValues({ ...fresh(tool.fields), ...tool.sample }), setOthers({}))}>
                Try an example
              </button>
            </p>
            <div className={l.details}>
              <button type="button" className={l.detailsToggle} aria-expanded={open} aria-controls={id("more")} onClick={() => setOpen((o) => !o)}>
                <span>Make it more personal <em>(optional)</em></span>
                <span aria-hidden="true" className={l.chev} />
              </button>
              {open ? (
                <div id={id("more")} className={l.detailsBody}>
                  <div className={f.questions}>{more.map(field)}</div>
                </div>
              ) : null}
            </div>
            {error ? <p className={f.error} role="alert">{error}</p> : null}
            <div className={f.submitRow}>
              <button className={f.action} type="submit">
                <span aria-hidden="true">✧</span> {tool.cta} <span aria-hidden="true">→</span>
              </button>
            </div>
            <p className={l.under}>What you type is sent to an AI provider (Google Gemini) to write your result and isn&apos;t stored by this site. No LinkedIn login needed, and nothing is posted for you.</p>
          </form>
        </section>
      ) : null}

      {stage === "loading" ? (
        <section className={`${f.stage} ${f.loading}`} role="status" aria-live="polite" aria-label={`Writing your ${tool.noun}`}>
          <div className={f.stars} aria-hidden="true">
            {[f.starMain, f.starSmall, f.starLeft].map((c, i) => (
              <svg key={i} className={c} viewBox="0 0 64 64" width={i ? 20 : 52} height={i ? 20 : 52}>
                <path d="M32 0c2 19 13 30 32 32-19 2-30 13-32 32C30 45 19 34 0 32 19 30 30 19 32 0Z" fill="currentColor" />
              </svg>
            ))}
          </div>
          <h2 className={f.loadingTitle}>Writing your {tool.noun}.</h2>
          <p className={f.loadingCopy}>{message}</p>
          <div className={f.dots} aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        </section>
      ) : null}

      {stage === "results" ? (
        <section className={`${f.stage} ${f.results}`} aria-labelledby={id("results-h")}>
          <div className={f.resultTop}>
            <div>
              <span className={f.kicker}>Your {tool.noun}</span>
              <h2 id={id("results-h")} ref={resultsHeading} tabIndex={-1} className={f.toolHeading}>
                {kind === "skills" ? "Here is your skills list. Pick the ones you can back up." : "Here is your result. Edit anything before you copy."}
              </h2>
            </div>
            <button type="button" className={f.ghost} onClick={() => setStage("form")}>
              ← Change my details
            </button>
          </div>
          {error ? <p className={f.error} role="alert">{error}</p> : null}

          {kind === "skills" && lists ? (
            <SkillLists lists={lists} picked={picked} setPicked={setPicked} setLists={setLists} />
          ) : (
            <div className={kind === "about" || kind === "experience" ? l.stack : l.grid}>
              <div className={l.editor}>
                <textarea aria-label={`Edit your ${tool.noun}`} className={l.resultText} rows={kind === "headline" || kind === "comment" ? 4 : 12} value={text} onChange={(e) => setText(e.target.value)} />
                <div className={l.meta}>
                  <small className={over ? f.bad : undefined}>
                    {n.toLocaleString()} characters
                    {win ? ` · aim for ${win.min.toLocaleString()} to ${win.max.toLocaleString()}` : ""}
                    {tool.hardMax ? ` · LinkedIn max ${tool.hardMax.toLocaleString()}` : ""}
                    {over ? ` · ${(n - (tool.hardMax ?? 0)).toLocaleString()} over, shorten it to copy` : ""}
                  </small>
                </div>
                <div className={l.actions}>
                  <button type="button" className={f.action} disabled={over || !text} onClick={() => copy(text)}>
                    {copied ? "Copied" : `Copy ${tool.noun}`}
                  </button>
                  {(Object.keys(LINKEDIN_ACTIONS) as LinkedInAction[]).map((a) => (
                    <button key={a} type="button" className={f.ghost} disabled={busy !== null || !text} onClick={() => refine(a)}>
                      {busy === a ? "Rewriting..." : LINKEDIN_ACTIONS[a].label}
                    </button>
                  ))}
                  <button type="button" className={f.ghost} disabled={busy !== null} onClick={() => refine("another")}>
                    {busy === "another" ? "Writing..." : "Try another version"}
                  </button>
                </div>
              </div>
              <Preview kind={kind} text={text} expanded={expanded} setExpanded={setExpanded} />
            </div>
          )}

          {kind === "skills" && lists ? (
            <div className={l.actions} style={{ justifyContent: "center", marginTop: 18 }}>
              <button type="button" className={f.action} disabled={!picked.size} onClick={() => copy([...picked].join(", "))}>
                {copied ? "Copied" : `Copy ${picked.size} selected`}
              </button>
              <button type="button" className={f.ghost} disabled={busy !== null} onClick={() => refine("another")}>
                {busy === "another" ? "Writing..." : "Try another list"}
              </button>
            </div>
          ) : null}
          <p className={f.fine} style={{ textAlign: "center" }}>Written by AI from your answers. Check every fact before you add it to LinkedIn. Nothing is posted for you.</p>
        </section>
      ) : null}

      <div className={f.trust} aria-label="What the tool includes">
        <span>One strong result</span>
        <span>{kind === "skills" ? "Proven vs suggested" : "Live character count"}</span>
        <span>Editable</span>
        <span>No LinkedIn login</span>
      </div>
    </div>
  );
}

/** An illustrative LinkedIn style preview. LinkedIn's own fold point varies, so this is a guide only. */
function Preview({ kind, text, expanded, setExpanded }: { kind: LinkedInKind; text: string; expanded: boolean; setExpanded: (v: boolean) => void }) {
  const fold = FOLD[kind];
  const cut = fold && [...text].length > fold && !expanded;
  const shown = cut ? `${[...text].slice(0, fold).join("").trimEnd()}...` : text;
  return (
    <div className={l.previewCol}>
      <p className={f.stageLabel}>Illustrative preview</p>
      <div className={l.card}>
        {kind === "headline" ? (
          <>
            <div className={l.banner} aria-hidden="true" />
            <span className={`${l.avatar} ${l.big}`} aria-hidden="true">Y</span>
            <strong className={l.name}>Your Name</strong>
            <p className={l.headline}>{text}</p>
            <p className={l.snippetLabel}>In search and comments, roughly the first 60 characters show:</p>
            <p className={l.snippet}>{[...text].length > 60 ? `${[...text].slice(0, 60).join("").trimEnd()}...` : text}</p>
          </>
        ) : (
          <>
            <div className={l.head}>
              <span className={l.avatar} aria-hidden="true">Y</span>
              <div>
                <strong>Your Name</strong>
                <small>{kind === "comment" ? "Replying to a post" : kind === "post" ? "Now" : kind === "about" ? "About" : "Experience"}</small>
              </div>
            </div>
            <p className={kind === "comment" ? l.bubble : l.body}>
              {shown}
              {cut ? (
                <button type="button" className={l.seeMore} onClick={() => setExpanded(true)}>
                  see more
                </button>
              ) : null}
            </p>
            {kind === "post" ? (
              <div className={l.bar} aria-hidden="true">
                <span>Like</span>
                <span>Comment</span>
                <span>Repost</span>
                <span>Send</span>
              </div>
            ) : null}
          </>
        )}
      </div>
      <p className={f.fine}>{fold ? `The "see more" cut is an estimate. It varies by device and placement on LinkedIn.` : "A visual guide only, not a pixel perfect LinkedIn screen."}</p>
    </div>
  );
}

const GROUP_ORDER = ["Tools and technologies", "Industry knowledge", "Interpersonal skills"];

function SkillLists({ lists, picked, setPicked, setLists }: { lists: Lists; picked: Set<string>; setPicked: (s: Set<string>) => void; setLists: (l: Lists) => void }) {
  const toggle = (s: string) => {
    const next = new Set(picked);
    if (next.has(s)) next.delete(s);
    else next.add(s);
    setPicked(next);
  };
  const remove = (k: keyof Lists, s: string) => {
    setLists({ ...lists, [k]: lists[k].filter((x) => x.skill !== s) });
    const next = new Set(picked);
    next.delete(s);
    setPicked(next);
  };
  const block = (k: keyof Lists, title: string, note: string) =>
    lists[k].length ? (
      <section className={`${l.skillBox} ${k === "confirmed" ? l.proven : k === "gaps" ? l.gap : ""}`} aria-label={title}>
        <h3>{title}</h3>
        <p className={l.skillNote}>{note}</p>
        {GROUP_ORDER.filter((g) => lists[k].some((s) => s.group === g)).map((g) => (
          <div key={g} className={l.groupBlock}>
            <h4>{g}</h4>
            <ul className={l.skillList}>
              {lists[k]
                .filter((s) => s.group === g)
                .map((s) => (
                  <li key={s.skill}>
                    {k === "gaps" ? (
                      <strong>{s.skill}</strong>
                    ) : (
                      <label className={l.skillPick}>
                        <input type="checkbox" checked={picked.has(s.skill)} onChange={() => toggle(s.skill)} /> <strong>{s.skill}</strong>
                      </label>
                    )}
                    {s.evidence || s.why ? <small>{s.evidence ?? s.why}</small> : null}
                    <button type="button" className={l.linkBtn} onClick={() => remove(k, s.skill)} aria-label={`Remove ${s.skill}`}>
                      Remove
                    </button>
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </section>
    ) : null;
  return (
    <div className={l.skills}>
      {block("confirmed", "Skills you confirmed", "From your own list, cleaned into names LinkedIn recognises. Ticked to copy.")}
      {block("suggested", "Suggested, check before adding", "Relevant to the role. Add one only if you can point to real work that shows it.")}
      {block("gaps", "Worth learning", "The role asks for these. Never list them as skills you already have.")}
    </div>
  );
}
