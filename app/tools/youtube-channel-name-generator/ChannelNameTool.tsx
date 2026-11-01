"use client";

import { useEffect, useRef, useState } from "react";
import { YT_NAME_AUDIENCES, YT_NAME_KINDS, YT_NAME_LANGUAGES, YT_NAME_LENGTHS, YT_NAME_MAX, YT_NAME_STYLES, YT_NAME_TEXT, handleProblem } from "@/lib/tools/families/youtube-channel-name-choices";
import { track } from "@/lib/tools/v3/track";
import f from "../facebook-bio-generator/fb.module.css";
import y from "./ytname.module.css";

// The YouTube Channel Name Generator. The same three stage card as the bio tools (form, a short writing
// state, editable results), with five angles, two unverified handle ideas per name, a shortlist and an
// availability checklist. Names come from /api/tools/yt-channel-name; nothing is generated locally.

const SLUG = "youtube-channel-name-generator";
const MESSAGES = ["Working on your names...", "Checking the details you gave us...", "Writing handle ideas..."];
const FAIL = "The names couldn't be written just now. Please try again.";

type Idea = { angle: string; name: string; handles: string[]; reason: string };
const START = { kind: "Gaming", audience: "General audience", style: "Simple", language: "English", length: "Any length" };
const TEXT = { about: "", kindOther: "", audienceOther: "", styleOther: "", include: "", avoid: "", person: "" };
const SAMPLE = { ...TEXT, about: "I restore old handheld consoles and play forgotten games from the 90s." };

const ytSearch = (name: string) => `https://www.youtube.com/results?search_query=${encodeURIComponent(name)}&sp=EgIQAg%253D%253D`;

export function ChannelNameTool() {
  const [picks, setPicks] = useState(START);
  const [text, setText] = useState(TEXT);
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<"form" | "loading" | "results">("form");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [saved, setSaved] = useState<Idea[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [redoing, setRedoing] = useState<number | null>(null);
  const [cardError, setCardError] = useState<{ i: number; msg: string } | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(MESSAGES[0]);
  const busy = useRef(false);
  const request = useRef(0);
  const shellRef = useRef<HTMLDivElement>(null);
  const resultsHeading = useRef<HTMLHeadingElement>(null);

  const setPick = (k: keyof typeof START) => (v: string) => setPicks((p) => ({ ...p, [k]: v }));
  const setT = (k: keyof typeof TEXT) => (e: { target: { value: string } }) => setText((v) => ({ ...v, [k]: e.target.value }));

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

  async function call(extra: Record<string, unknown>) {
    const res = await fetch("/api/tools/yt-channel-name", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...picks, ...text, ...extra }) });
    const data = await res.json().catch(() => ({}));
    if (res.ok && Array.isArray(data?.names) && data.names.length) return data.names as Idea[];
    throw new Error(typeof data?.error === "string" ? data.error : FAIL);
  }

  async function generate(more = false) {
    if (busy.current) return;
    busy.current = true;
    const id = ++request.current;
    setError("");
    setCardError(null);
    setMessage(MESSAGES[0]);
    setStage("loading");
    track("tool_generate", SLUG, { kind: picks.kind, style: picks.style });
    const back = ideas.length ? "results" : "form";
    try {
      const list = await call(more ? { previous: [...ideas.map((b) => b.name), ...saved.map((b) => b.name)] } : {});
      if (id !== request.current) return;
      setIdeas(list);
      setStage("results");
      track("tool_success", SLUG);
    } catch (err) {
      if (id !== request.current) return;
      setError(err instanceof Error && err.message !== "Failed to fetch" ? err.message : "The names couldn't be written just now. Check your connection and try again.");
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
      const [b] = await call({ one: i, previous: [...ideas.map((x) => x.name), ...saved.map((x) => x.name)] });
      setIdeas((all) => all.map((x, j) => (j === i ? b : x)));
    } catch (err) {
      setCardError({ i, msg: err instanceof Error ? err.message : FAIL });
    }
    setRedoing(null);
  }

  async function copyText(value: string, key: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      track("tool_copy", SLUG);
      setTimeout(() => setCopied((c) => (c === key ? null : c)), 1600);
    } catch {}
  }

  const toggleSave = (b: Idea) => setSaved((s) => (s.some((x) => x.name === b.name) ? s.filter((x) => x.name !== b.name) : [...s, b]));
  const editName = (i: number, v: string) => {
    const old = ideas[i].name;
    setIdeas((all) => all.map((x, j) => (j === i ? { ...x, name: v } : x)));
    setSaved((s) => s.map((x) => (x.name === old ? { ...x, name: v } : x)));
  };

  const shortlist = saved.map((x) => ideas.find((b) => b.name === x.name) ?? x);
  const listText = (list: Idea[]) => list.map((b) => `${b.name}${b.handles.length ? `  (handle ideas, unverified: ${b.handles.map((h) => `@${h}`).join(", ")})` : ""}`).join("\n");

  function download() {
    const list = shortlist.length ? shortlist : ideas;
    const body = `YouTube channel name ideas\n\n${listText(list)}\n\nNone of these names or handles have been checked. Search YouTube, try each handle in YouTube Studio and check trademarks before using one.\n`;
    const url = URL.createObjectURL(new Blob([body], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "youtube-channel-names.txt";
    a.click();
    URL.revokeObjectURL(url);
    track("tool_download", SLUG);
  }

  const select = (id: string, label: string, key: keyof typeof START, options: string[], other?: keyof typeof TEXT) => (
    <div className={f.q}>
      <label htmlFor={id}>{label}</label>
      <span className={f.selectWrap}>
        <select id={id} value={picks[key]} onChange={(e) => setPick(key)(e.target.value)}>
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </span>
      {other && picks[key] === "Other" ? (
        <div className={f.other}>
          <label htmlFor={`${id}-other`}>Tell us in your words</label>
          <input id={`${id}-other`} required maxLength={YT_NAME_TEXT[other]} value={text[other]} onChange={setT(other)} placeholder="Write your own answer" />
        </div>
      ) : null}
    </div>
  );
  const input = (key: keyof typeof TEXT, label: string, placeholder: string) => (
    <div className={f.q}>
      <label htmlFor={`yn-${key}`}>{label}</label>
      <input id={`yn-${key}`} className={y.input} maxLength={YT_NAME_TEXT[key]} value={text[key]} onChange={setT(key)} placeholder={placeholder} />
    </div>
  );

  return (
    <div className={f.shell} id="name-tool" ref={shellRef}>
      {stage === "form" ? (
        <section className={`${f.stage} ${f.formStage}`} aria-label="YouTube channel name generator form">
          <p className={f.stageLabel}>Your channel, your call</p>
          <h2 className={f.formHeading}>What kind of channel are you naming?</h2>
          <p className={f.hint}>Four quick choices are enough. Everything else is optional.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (e.currentTarget.reportValidity()) generate();
            }}
          >
            <div className={f.questions}>
              {select("yn-kind", "What kind of channel?", "kind", YT_NAME_KINDS, "kindOther")}
              {select("yn-audience", "Who is it for?", "audience", YT_NAME_AUDIENCES, "audienceOther")}
              {select("yn-style", "Naming style", "style", YT_NAME_STYLES, "styleOther")}
              {select("yn-language", "Name language", "language", YT_NAME_LANGUAGES)}
            </div>

            <div className={f.optionalIntro} style={{ marginTop: 22 }}>
              <div className={f.optionalLine}>
                <label htmlFor="yn-about">Tell us what you make, and your name or existing brand</label>
                <span className={f.optionalPill}>Optional</span>
              </div>
              <textarea id="yn-about" rows={2} maxLength={YT_NAME_TEXT.about} value={text.about} onChange={setT("about")} placeholder="For example: quick vegetarian dinners for students, filmed in a tiny kitchen" />
              <div className={f.hintRow}>
                <button type="button" className={y.linkBtn} onClick={() => (setText(SAMPLE), setPicks(START))}>
                  Try an example
                </button>
                <span>{text.about.length} / {YT_NAME_TEXT.about}</span>
              </div>
            </div>

            <div className={y.details}>
              <button type="button" className={y.detailsToggle} aria-expanded={open} aria-controls="yn-more" onClick={() => setOpen((o) => !o)}>
                <span>Advanced options <em>(optional)</em></span>
                <span aria-hidden="true" className={y.chev} />
              </button>
              {open ? (
                <div id="yn-more" className={y.detailsBody}>
                  <div className={f.questions}>
                    {input("person", "Your name, if you want it used", "For example: Maya")}
                    {select("yn-length", "Name length", "length", YT_NAME_LENGTHS)}
                    {input("include", "Words to include", "For example: kitchen, pocket")}
                    {input("avoid", "Words to avoid", "For example: gamer, official")}
                  </div>
                </div>
              ) : null}
            </div>

            {error ? <p className={f.error} role="alert">{error}</p> : null}
            <div className={f.submitRow}>
              <button className={f.action} type="submit">
                <span aria-hidden="true">✧</span> Generate Channel Names <span aria-hidden="true">→</span>
              </button>
            </div>
            <p className={y.under}>What you type is sent to an AI provider (Google Gemini) to write your names and isn&apos;t stored by this site.</p>
          </form>
        </section>
      ) : null}

      {stage === "loading" ? (
        <section className={`${f.stage} ${f.loading}`} role="status" aria-live="polite" aria-label="Writing your channel names">
          <div className={f.stars} aria-hidden="true">
            {[f.starMain, f.starSmall, f.starLeft].map((c, i) => (
              <svg key={i} className={c} viewBox="0 0 64 64" width={i ? 20 : 52} height={i ? 20 : 52}>
                <path d="M32 0c2 19 13 30 32 32-19 2-30 13-32 32C30 45 19 34 0 32 19 30 30 19 32 0Z" fill="currentColor" />
              </svg>
            ))}
          </div>
          <h2 className={f.loadingTitle}>Naming your channel.</h2>
          <p className={f.loadingCopy}>{message}</p>
          <div className={f.dots} aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        </section>
      ) : null}

      {stage === "results" ? (
        <section className={`${f.stage} ${f.results}`} aria-labelledby="yn-results-h">
          <div className={f.resultTop}>
            <div>
              <span className={f.kicker}>Your channel names</span>
              <h2 id="yn-results-h" ref={resultsHeading} tabIndex={-1} className={f.toolHeading}>
                Here are your results. Edit anything before you copy.
              </h2>
              <p className={f.hint}>Five names, each with two handle ideas. Save the ones worth checking and compare them side by side.</p>
            </div>
            <button type="button" className={f.ghost} onClick={() => setStage("form")}>
              ← Change my details
            </button>
          </div>
          {error ? <p className={f.error} role="alert">{error}</p> : null}
          <div className={y.resultsGrid}>
            <div className={f.list} aria-live="polite">
              {ideas.map((b, i) => {
                const n = [...b.name].length;
                const over = n > YT_NAME_MAX;
                const isSaved = saved.some((x) => x.name === b.name);
                return (
                  <div key={i} className={`${f.item} ${isSaved ? y.savedItem : ""}`}>
                    <div className={f.itemTop}>
                      <span>{b.angle}</span>
                      <em>Edit anything</em>
                    </div>
                    <input className={y.nameInput} aria-label={`Edit name option ${i + 1}, ${b.angle}`} maxLength={80} value={b.name} onChange={(e) => editName(i, e.target.value)} />
                    {b.handles.length ? (
                      <p className={y.handles}>
                        <span className={y.handleLabel}>Handle ideas, not checked:</span>
                        {b.handles.map((h) => (
                          <a key={h} className={y.handle} href={`https://www.youtube.com/@${h}`} target="_blank" rel="noopener noreferrer" title={handleProblem(h) ?? "Opens YouTube so you can see if this handle is in use"}>
                            @{h}
                          </a>
                        ))}
                      </p>
                    ) : null}
                    {b.reason ? <p className={y.why}><strong>Why it might work:</strong> {b.reason}</p> : null}
                    {cardError?.i === i ? <p className={f.error} role="alert">{cardError.msg}</p> : null}
                    <div className={`${f.itemFoot} ${y.foot}`}>
                      <small className={over ? f.bad : undefined}>
                        {n} / {YT_NAME_MAX} characters{over ? " · too long for a channel name" : ""}
                      </small>
                      <span className={y.itemButtons}>
                        <button type="button" className={f.ghost} aria-pressed={isSaved} onClick={() => toggleSave(b)}>
                          {isSaved ? "★ Saved" : "☆ Save"}
                        </button>
                        <a className={f.ghost} href={ytSearch(b.name)} target="_blank" rel="noopener noreferrer">
                          Search YouTube
                        </a>
                        <button type="button" className={f.ghost} disabled={redoing !== null} onClick={() => redoOne(i)}>
                          {redoing === i ? "Writing..." : "Try another"}
                        </button>
                        <button type="button" className={f.ghost} onClick={() => copyText(b.name, `n${i}`)}>
                          {copied === `n${i}` ? "Copied" : "Copy name"}
                        </button>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <aside className={y.side} aria-label="Your shortlist and checks">
              <div className={y.panel}>
                <h3>Your shortlist</h3>
                {shortlist.length ? (
                  <ul className={y.shortlist}>
                    {shortlist.map((b) => (
                      <li key={b.name}>
                        <strong>{b.name}</strong>
                        {b.handles.length ? <small>{b.handles.map((h) => `@${h}`).join(" · ")}</small> : null}
                        <button type="button" className={y.linkBtn} onClick={() => toggleSave(b)} aria-label={`Remove ${b.name} from your shortlist`}>
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className={y.empty}>Press ☆ Save on any name to compare it here.</p>
                )}
                <div className={y.panelButtons}>
                  <button type="button" className={f.ghost} onClick={() => copyText(listText(shortlist.length ? shortlist : ideas), "list")}>
                    {copied === "list" ? "Copied" : shortlist.length ? "Copy shortlist" : "Copy all names"}
                  </button>
                  <button type="button" className={f.ghost} onClick={download}>
                    Download .txt
                  </button>
                </div>
              </div>
              <div className={y.panel}>
                <h3>Before you claim a name</h3>
                <ol className={y.checklist}>
                  <li>Search YouTube for the name and lookalikes.</li>
                  <li>Try the exact handle in YouTube Studio. It tells you if it&apos;s taken.</li>
                  <li>Check the same handle on the other social sites you use.</li>
                  <li>
                    Search a trademark database such as{" "}
                    <a href="https://branddb.wipo.int/" target="_blank" rel="noopener noreferrer">WIPO&apos;s Global Brand Database</a> if the name will be a brand.
                  </li>
                  <li>Say it out loud. Could someone type it after hearing it once?</li>
                </ol>
                <p className={f.fine}>Nothing here has been checked for availability. Handle ideas follow YouTube&apos;s format rules only.</p>
              </div>
            </aside>
          </div>
          <p className={f.fine} style={{ textAlign: "center" }}>Written by AI from your answers. Please check every name before using it.</p>
          <div className={y.resultActions}>
            <div className={f.q}>
              <label htmlFor="yn-style2">Try a different style</label>
              <span className={f.selectWrap}>
                <select id="yn-style2" value={picks.style} onChange={(e) => setPick("style")(e.target.value)}>
                  {YT_NAME_STYLES.filter((o) => o !== "Other" || picks.style === "Other").map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </span>
            </div>
            <button className={f.action} type="button" onClick={() => generate(true)}>
              Try five more <span aria-hidden="true">↻</span>
            </button>
          </div>
          <p style={{ textAlign: "center", marginTop: 14 }}>
            <button type="button" className={y.linkBtn} onClick={() => (setPicks(START), setText(TEXT), setIdeas([]), setSaved([]), setError(""), setStage("form"))}>
              Start over
            </button>
          </p>
        </section>
      ) : null}

      <div className={f.trust} aria-label="What the tool includes">
        <span>5 name ideas</span>
        <span>Handle suggestions</span>
        <span>Editable results</span>
        <span>No signup</span>
      </div>
    </div>
  );
}
