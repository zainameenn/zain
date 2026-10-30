"use client";

import { useEffect, useRef, useState } from "react";
import { FB_CAPTION_CHOICES, FB_CAPTION_CTAS, FB_CAPTION_LANGUAGES, FB_CAPTION_LENGTHS, FB_CAPTION_TONES, FB_PHOTO_MAX_BYTES, FB_PHOTO_TYPES, type FbCaptionKind } from "@/lib/tools/families/facebook-caption-choices";
import { track } from "@/lib/tools/v3/track";
import f from "../facebook-bio-generator/fb.module.css";
import c from "./fbc.module.css";

// The Facebook Caption Generator. The Facebook Bio Generator's three stage card (form, a short writing
// state, editable results) with an optional photo that a vision model reads, five captions, per
// caption actions and a post preview. Captions come from /api/tools/fb-caption; nothing is faked.

const SLUG = "facebook-caption-generator";
type Kind = FbCaptionKind;
const KINDS = Object.keys(FB_CAPTION_CHOICES) as Kind[];
const MESSAGES = ["Checking your post details...", "Writing a few different angles...", "Putting your caption ideas together..."];
const FAIL = "The captions couldn't be written just now. Please try again.";
/** Photos are shrunk to this many pixels on the long side before upload; re-encoding also drops location data. */
const MAX_SIDE = 1280;
/** A soft preview fold, shown as illustrative only: Facebook's real "See more" point varies by device. */
const FOLD = 180;

const words = (t: string) => t.trim().split(/\s+/).filter(Boolean).length;
const tags = (t: string) => t.match(/(^|\s)#[\p{L}\p{N}_]+/gu)?.length ?? 0;

type Photo = { name: string; url: string; mimeType: string; data: string };

async function readPhoto(file: File): Promise<Photo> {
  if (!FB_PHOTO_TYPES.includes(file.type)) throw new Error("Please choose a JPG, PNG or WebP image.");
  if (file.size > FB_PHOTO_MAX_BYTES) throw new Error("That image is over 8MB. Please choose a smaller one.");
  const src = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = src;
    await img.decode();
    const scale = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight));
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
    canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error();
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const url = canvas.toDataURL("image/jpeg", 0.85);
    return { name: file.name, url, mimeType: "image/jpeg", data: url.slice(url.indexOf(",") + 1) };
  } catch {
    throw new Error("We couldn't read this photo. Try another image or describe your post instead.");
  } finally {
    URL.revokeObjectURL(src);
  }
}

type Answers = { about: string; picks: string[]; others: string[] };
const fresh = (k: Kind): Answers => ({ about: "", picks: FB_CAPTION_CHOICES[k].questions.map((q) => q.options[0]), others: ["", "", ""] });
const MORE = { productName: "", price: "", date: "", offerTerms: "", hours: "", location: "", url: "", existing: "", voice: "", avoid: "", toneOther: "" };
type Caption = { label: string; text: string };
type Action = "shorter" | "natural" | "rewrite" | "another";

export function FacebookCaptionTool() {
  const [kind, setKind] = useState<Kind>("Personal Profile");
  const [byKind, setByKind] = useState<Record<Kind, Answers>>(() => Object.fromEntries(KINDS.map((k) => [k, fresh(k)])) as Record<Kind, Answers>);
  const [tone, setTone] = useState(FB_CAPTION_TONES[0]);
  const [length, setLength] = useState(FB_CAPTION_LENGTHS[0]);
  const [language, setLanguage] = useState("English");
  const [emoji, setEmoji] = useState(false);
  const [hashtags, setHashtags] = useState(false);
  const [ctaOn, setCtaOn] = useState(false);
  const [cta, setCta] = useState(FB_CAPTION_CTAS[0]);
  const [open, setOpen] = useState(false);
  const [more, setMore] = useState(MORE);
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [photoError, setPhotoError] = useState("");
  const [reading, setReading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [stage, setStage] = useState<"form" | "loading" | "clarify" | "results">("form");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState<number | null>(null);
  const [working, setWorking] = useState<{ i: number; action: Action } | null>(null);
  const [cardError, setCardError] = useState<{ i: number; msg: string } | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(MESSAGES[0]);
  const controller = useRef<AbortController | null>(null);
  const lastFile = useRef<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const resultsHeading = useRef<HTMLHeadingElement>(null);

  const cfg = FB_CAPTION_CHOICES[kind];
  const cur = byKind[kind];
  const update = (patch: Partial<Answers>) => setByKind((all) => ({ ...all, [kind]: { ...all[kind], ...patch } }));
  const setPick = (i: number, v: string) => update({ picks: cur.picks.map((p, j) => (j === i ? v : p)) });
  const setOther = (i: number, v: string) => update({ others: cur.others.map((p, j) => (j === i ? v : p)) });
  const setM = (k: keyof typeof MORE) => (e: { target: { value: string } }) => setMore((v) => ({ ...v, [k]: e.target.value }));

  useEffect(() => {
    if (stage !== "loading") return;
    const a = setTimeout(() => setMessage(MESSAGES[1]), 2500);
    const b = setTimeout(() => setMessage(MESSAGES[2]), 6000);
    return () => (clearTimeout(a), clearTimeout(b));
  }, [stage]);

  useEffect(() => {
    if (stage === "results" || stage === "clarify") {
      shellRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      resultsHeading.current?.focus({ preventScroll: true });
    }
  }, [stage]);

  async function takeFile(file: File | undefined) {
    if (!file) return;
    lastFile.current = file;
    setPhotoError("");
    setReading(true);
    try {
      setPhoto(await readPhoto(file));
      track("tool_edit", SLUG, { photo: "added" });
    } catch (err) {
      setPhoto(null);
      setPhotoError(err instanceof Error && err.message ? err.message : "We couldn't read this photo.");
      track("tool_error", SLUG, { reason: "image" });
    }
    setReading(false);
  }

  function removePhoto() {
    setPhoto(null);
    setPhotoError("");
    lastFile.current = null;
    if (fileRef.current) fileRef.current.value = "";
  }

  const payload = (extra: Record<string, unknown> = {}) => ({
    kind,
    picks: cur.picks,
    other0: cur.others[0],
    other1: cur.others[1],
    other2: cur.others[2],
    about: cur.about,
    tone,
    length,
    language,
    emoji,
    hashtags,
    ctaOn,
    cta,
    ...more,
    // Business only fields stay out of other account types.
    ...(kind === "Business Page" ? {} : { productName: "", price: "", date: "", offerTerms: "", hours: "", location: "" }),
    url: ctaOn && cta === "Link supplied by me" ? more.url : "",
    image: photo ? { mimeType: photo.mimeType, data: photo.data } : undefined,
    ...extra,
  });

  async function post(body: Record<string, unknown>, signal?: AbortSignal) {
    const res = await fetch("/api/tools/fb-caption", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), signal });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(typeof data?.error === "string" ? data.error : FAIL);
    return data as { needsClarification?: boolean; question?: string; captions?: Caption[] };
  }

  async function generate(withAnswer = "") {
    if (controller.current) return;
    setError("");
    setCardError(null);
    setMessage(MESSAGES[0]);
    setStage("loading");
    track("tool_generate", SLUG, { kind, photo: photo ? "yes" : "no" });
    const back = captions.length ? "results" : "form";
    const ac = new AbortController();
    controller.current = ac;
    try {
      const data = await post(payload({ answer: withAnswer }), ac.signal);
      if (data.needsClarification && data.question) {
        setQuestion(data.question);
        setAnswer("");
        setStage("clarify");
      } else if (data.captions?.length) {
        setCaptions(data.captions);
        setActive(0);
        setExpanded(false);
        setStage("results");
        track("tool_success", SLUG);
      } else throw new Error(FAIL);
    } catch (err) {
      if (!(err instanceof DOMException && err.name === "AbortError")) {
        setError(err instanceof Error && err.message !== "Failed to fetch" ? err.message : "The request didn't finish. You can retry without losing your selections.");
      }
      setStage(back);
    } finally {
      controller.current = null;
    }
  }

  async function act(i: number, action: Action) {
    if (working) return;
    setWorking({ i, action });
    setCardError(null);
    track("tool_regenerate", SLUG, { action });
    try {
      const data = await post(payload({ one: i, action, current: captions[i].text }));
      const next = data.captions?.[0];
      if (!next) throw new Error(FAIL);
      setCaptions((all) => all.map((y, j) => (j === i ? next : y)));
      setActive(i);
    } catch (err) {
      setCardError({ i, msg: err instanceof Error ? err.message : FAIL });
    }
    setWorking(null);
  }

  async function copy(i: number) {
    try {
      await navigator.clipboard.writeText(captions[i].text);
      setCopied(i);
      track("tool_copy", SLUG);
      setTimeout(() => setCopied((v) => (v === i ? null : v)), 1600);
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
  const input = (k: keyof typeof MORE, label: string, max: number, placeholder: string, type = "text") => (
    <div className={f.q}>
      <label htmlFor={`fc-${k}`}>{label}</label>
      <input id={`fc-${k}`} type={type} className={c.input} maxLength={max} value={more[k]} onChange={setM(k)} placeholder={placeholder} />
    </div>
  );

  const preview = captions[active]?.text ?? "";
  const folded = !expanded && preview.length > FOLD;
  const pageName = kind === "Facebook Group" ? "Your Group" : kind === "Personal Profile" ? "Your Name" : "Your Page";

  return (
    <div className={f.shell} id="caption-tool" ref={shellRef}>
      {stage === "form" ? (
        <section className={`${f.stage} ${f.formStage}`} aria-label="Facebook caption generator form">
          <p className={f.stageLabel}>Your post, in your words</p>
          <h2 className={f.formHeading}>What are we writing a caption for?</h2>
          <p className={f.hint}>Don&apos;t have a description ready? Start with the dropdowns. Adding a few real details makes the results better.</p>
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
            <div className={c.context}>
              <div
                className={`${c.drop} ${dragging ? c.dropActive : ""}`}
                onDragOver={(e) => (e.preventDefault(), setDragging(true))}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setDragging(false);
                  takeFile(e.dataTransfer.files?.[0]);
                }}
              >
                <input ref={fileRef} id="fc-photo" type="file" accept={FB_PHOTO_TYPES.join(",")} className={c.file} onChange={(e) => takeFile(e.target.files?.[0])} />
                {photo ? (
                  <div className={c.thumbRow}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={photo.url} alt="Your uploaded photo" className={c.thumb} />
                    <div className={c.thumbText}>
                      <strong>{photo.name}</strong>
                      <span>We describe only what&apos;s visible.</span>
                      <span className={c.thumbActions}>
                        <button type="button" className={f.ghost} onClick={() => fileRef.current?.click()}>Replace</button>
                        <button type="button" className={f.ghost} onClick={removePhoto}>Remove</button>
                      </span>
                    </div>
                  </div>
                ) : (
                  <label htmlFor="fc-photo" className={c.dropLabel}>
                    <svg viewBox="0 0 24 24" width="28" height="28" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="5" width="18" height="14" rx="2.5" />
                      <circle cx="9" cy="10" r="1.8" />
                      <path d="m4 17 5-4.5 3.5 3 3-2.5 4.5 4" />
                    </svg>
                    <strong>{reading ? "Preparing your photo..." : "Upload a photo (optional)"}</strong>
                    <span>Drop it here or choose a file. JPG, PNG or WebP, up to 8MB.</span>
                  </label>
                )}
                {photoError ? (
                  <p className={f.error} role="alert">
                    {photoError}{" "}
                    {lastFile.current && FB_PHOTO_TYPES.includes(lastFile.current.type) && lastFile.current.size <= FB_PHOTO_MAX_BYTES ? (
                      <button type="button" className={c.linkBtn} onClick={() => takeFile(lastFile.current ?? undefined)}>Retry</button>
                    ) : null}
                  </p>
                ) : null}
              </div>
              <div className={c.about}>
                <div className={f.optionalLine}>
                  <label htmlFor="fc-about">{cfg.about}</label>
                  <span className={f.optionalPill}>Optional</span>
                </div>
                <textarea id="fc-about" rows={4} maxLength={400} value={cur.about} onChange={(e) => update({ about: e.target.value })} placeholder={cfg.placeholder} />
                <div className={f.hintRow}>
                  <span>Choose a starting point below or tell us in your own words.</span>
                  <span>{cur.about.length} / 400</span>
                </div>
              </div>
            </div>
            <p className={c.photoNote}>We use the photo to understand what&apos;s visible, not to guess facts about your business.</p>

            <div className={f.questions}>
              {cfg.questions.map((q, i) => (
                <div key={`${kind}-${i}`} className={f.q}>
                  <label htmlFor={`fc-q${i}`}>{q.label}</label>
                  <span className={f.selectWrap}>
                    <select id={`fc-q${i}`} value={cur.picks[i]} onChange={(e) => setPick(i, e.target.value)}>
                      {q.options.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  </span>
                  {cur.picks[i] === "Other" ? (
                    <div className={f.other}>
                      <label htmlFor={`fc-q${i}-other`}>Tell us in your words</label>
                      <input id={`fc-q${i}-other`} required maxLength={80} value={cur.others[i]} onChange={(e) => setOther(i, e.target.value)} placeholder="Write your own answer" />
                    </div>
                  ) : null}
                </div>
              ))}
              <div className={f.q}>
                {select("fc-tone", "Tone", tone, FB_CAPTION_TONES, setTone)}
                {tone === "Other" ? (
                  <div className={f.other}>
                    <label htmlFor="fc-toneOther">Describe the tone</label>
                    <input id="fc-toneOther" required maxLength={60} value={more.toneOther} onChange={setM("toneOther")} placeholder="For example: dry and understated" />
                  </div>
                ) : null}
              </div>
              {select("fc-length", "Length", length, FB_CAPTION_LENGTHS, setLength)}
              {select("fc-language", "Language", language, FB_CAPTION_LANGUAGES, setLanguage)}
            </div>

            <div className={c.toggles}>
              <label className={f.toggle}>
                <input type="checkbox" checked={emoji} onChange={(e) => setEmoji(e.target.checked)} /> Include emoji
              </label>
              <label className={f.toggle}>
                <input type="checkbox" checked={hashtags} onChange={(e) => setHashtags(e.target.checked)} /> Suggest relevant hashtags
              </label>
              <label className={f.toggle}>
                <input type="checkbox" checked={ctaOn} onChange={(e) => setCtaOn(e.target.checked)} /> Add a call to action
              </label>
            </div>
            {ctaOn ? (
              <div className={c.ctaRow}>
                {select("fc-cta", "Call to action", cta, FB_CAPTION_CTAS, setCta)}
                {cta === "Link supplied by me" ? input("url", "Your link", 200, "https://", "url") : null}
              </div>
            ) : null}

            <div className={c.details}>
              <button type="button" className={c.detailsToggle} aria-expanded={open} aria-controls="fc-more" onClick={() => setOpen((o) => !o)}>
                <span>Add more details <em>(optional)</em></span>
                <span aria-hidden="true" className={c.chev} />
              </button>
              {open ? (
                <div id="fc-more" className={c.detailsBody}>
                  {kind === "Business Page" ? (
                    <>
                      <p className={f.optionalDesc}>Only add what&apos;s confirmed. Captions use these exactly and never invent them.</p>
                      <div className={f.questions}>
                        {input("productName", "Product or service name", 80, "For example: Cinnamon loaf")}
                        {input("price", "Confirmed price", 40, "For example: $8")}
                        {input("date", "Date", 60, "For example: from Friday")}
                        {input("hours", "Opening hours", 80, "For example: 8am to 4pm")}
                        {input("location", "Location", 80, "For example: Main Street")}
                        {input("offerTerms", "Offer terms", 200, "For example: 10% off loaves until Sunday")}
                      </div>
                    </>
                  ) : null}
                  <div className={c.wide}>
                    <label htmlFor="fc-existing">Existing caption to rewrite</label>
                    <textarea id="fc-existing" rows={3} maxLength={1500} value={more.existing} onChange={setM("existing")} placeholder="Paste a draft and we'll keep its facts" />
                  </div>
                  <div className={c.wide}>
                    <label htmlFor="fc-voice">An example of how you normally write</label>
                    <textarea id="fc-voice" rows={2} maxLength={500} value={more.voice} onChange={setM("voice")} placeholder="Paste one of your past posts" />
                  </div>
                  <div className={f.questions} style={{ marginTop: 16 }}>
                    {input("avoid", "Phrases to avoid", 150, "For example: amazing, game changer")}
                  </div>
                </div>
              ) : null}
            </div>

            {error ? <p className={f.error} role="alert">{error}</p> : null}
            <div className={f.submitRow}>
              <button className={f.action} type="submit" disabled={reading}>
                <span aria-hidden="true">✧</span> Generate My Captions <span aria-hidden="true">→</span>
              </button>
            </div>
            <p className={c.under}>Free to use with fair use limits · No signup · Your photo isn&apos;t stored</p>
          </form>
        </section>
      ) : null}

      {stage === "loading" ? (
        <section className={`${f.stage} ${f.loading}`} role="status" aria-live="polite" aria-label="Writing your captions">
          <div className={f.stars} aria-hidden="true">
            {[f.starMain, f.starSmall, f.starLeft].map((cl, i) => (
              <svg key={i} className={cl} viewBox="0 0 64 64" width={i ? 20 : 52} height={i ? 20 : 52}>
                <path d="M32 0c2 19 13 30 32 32-19 2-30 13-32 32C30 45 19 34 0 32 19 30 30 19 32 0Z" fill="currentColor" />
              </svg>
            ))}
          </div>
          <h2 className={f.loadingTitle}>Writing your captions.</h2>
          <p className={f.loadingCopy}>{message}</p>
          <div className={f.dots} aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <button type="button" className={f.ghost} style={{ marginTop: 20 }} onClick={() => controller.current?.abort()}>
            Cancel
          </button>
        </section>
      ) : null}

      {stage === "clarify" ? (
        <section className={`${f.stage} ${f.formStage}`} aria-label="One quick question">
          <p className={f.stageLabel}>One quick question</p>
          <h2 className={f.formHeading} ref={resultsHeading} tabIndex={-1}>{question}</h2>
          <p className={f.hint}>We can see the photo, but we&apos;re not sure what you want to say about it. Tell us one thing that matters.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (answer.trim()) generate(answer.trim());
            }}
          >
            <div className={c.wide}>
              <label htmlFor="fc-answer">Your answer</label>
              <input id="fc-answer" className={c.input} required maxLength={200} value={answer} onChange={(e) => setAnswer(e.target.value)} />
            </div>
            <div className={c.footButtons}>
              <button type="button" className={f.ghost} onClick={() => setStage("form")}>← Change my details</button>
              <button className={f.action} type="submit">
                Continue <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        </section>
      ) : null}

      {stage === "results" ? (
        <section className={`${f.stage} ${f.results}`} aria-labelledby="fc-results-h">
          <div className={f.resultTop}>
            <div>
              <span className={f.kicker}>Your captions</span>
              <h2 id="fc-results-h" ref={resultsHeading} tabIndex={-1} className={f.toolHeading}>
                Five ways to say it
              </h2>
              <p className={f.hint}>Check dates, prices, claims and image details before posting. These are drafts, not published posts.</p>
            </div>
            <button type="button" className={f.ghost} onClick={() => setStage("form")}>
              ← Change my details
            </button>
          </div>
          {error ? <p className={f.error} role="alert">{error}</p> : null}
          <div className={c.resultsGrid}>
            <div className={f.list} aria-live="polite">
              {captions.map((cap, i) => {
                const busy = working?.i === i;
                return (
                  <div key={i} className={`${f.item} ${active === i ? c.activeItem : ""}`}>
                    <div className={f.itemTop}>
                      <span>{cap.label}</span>
                      <em>Edit anything</em>
                    </div>
                    <textarea
                      className={c.autoText}
                      rows={Math.min(14, Math.max(2, Math.ceil(cap.text.length / 70) + (cap.text.match(/\n/g)?.length ?? 0)))}
                      aria-label={`Edit caption ${i + 1}, ${cap.label}`}
                      maxLength={5000}
                      value={cap.text}
                      onFocus={() => setActive(i)}
                      onChange={(e) => {
                        const v = e.target.value;
                        setCaptions((all) => all.map((y, j) => (j === i ? { ...y, text: v } : y)));
                        setActive(i);
                      }}
                    />
                    {cardError?.i === i ? <p className={f.error} role="alert">{cardError.msg}</p> : null}
                    <div className={c.actions}>
                      {(
                        [
                          ["shorter", "Make shorter"],
                          ["natural", "More natural"],
                          ["rewrite", "Rewrite"],
                          ["another", "Try another"],
                        ] as [Action, string][]
                      ).map(([a, label]) => (
                        <button key={a} type="button" className={c.small} disabled={!!working} onClick={() => act(i, a)}>
                          {busy && working?.action === a ? "Writing..." : label}
                        </button>
                      ))}
                    </div>
                    <div className={f.itemFoot}>
                      <small>
                        {cap.text.length} characters · {words(cap.text)} words · {tags(cap.text)} hashtags
                      </small>
                      <span className={c.itemButtons}>
                        <button type="button" className={f.ghost} aria-pressed={active === i} onClick={() => (setActive(i), setExpanded(false))}>
                          Preview
                        </button>
                        <button type="button" className={f.ghost} onClick={() => copy(i)}>
                          {copied === i ? "Copied" : "Copy caption"}
                        </button>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={c.previewCol}>
              <p className={f.stageLabel}>Illustrative post preview</p>
              <div className={c.post}>
                <div className={c.postHead}>
                  <span className={c.avatar} aria-hidden="true">Y</span>
                  <div>
                    <strong>{pageName}</strong>
                    <small>Just now · Public</small>
                  </div>
                </div>
                <p className={c.postText}>
                  {folded ? `${preview.slice(0, FOLD).trimEnd()}... ` : preview}
                  {folded ? (
                    <button type="button" className={c.seeMore} onClick={() => setExpanded(true)}>
                      See more
                    </button>
                  ) : null}
                </p>
                {photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photo.url} alt="" className={c.postImg} />
                ) : null}
                <div className={c.postBar} aria-hidden="true">
                  <span>Like</span>
                  <span>Comment</span>
                  <span>Share</span>
                </div>
              </div>
              <p className={f.fine}>Where Facebook shows &ldquo;See more&rdquo; varies by device. Put the key point in the first line.</p>
            </div>
          </div>
          <div className={c.resultActions}>
            {select("fc-tone2", "Change tone", tone === "Other" ? FB_CAPTION_TONES[0] : tone, FB_CAPTION_TONES.filter((t) => t !== "Other"), setTone)}
            <button className={f.action} type="button" onClick={() => generate()}>
              Try five more <span aria-hidden="true">↻</span>
            </button>
          </div>
        </section>
      ) : null}

      <div className={f.trust} aria-label="What the tool includes">
        <span>Five editable ideas</span>
        <span>Optional photo upload</span>
        <span>Copy and paste</span>
        <span>No signup required</span>
      </div>
    </div>
  );
}
