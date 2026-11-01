"use client";

import { useEffect, useRef, useState } from "react";
import { ETSY_CATEGORIES, ETSY_FORMATS, ETSY_LANGUAGES, ETSY_PERSONALIZATION, ETSY_PHOTO_MAX_BYTES, ETSY_PHOTO_TYPES, ETSY_STYLES, ETSY_TITLE_LIMIT, type EtsyTitle } from "@/lib/tools/families/etsy-title-choices";
import { track } from "@/lib/tools/v3/track";
import f from "../facebook-bio-generator/fb.module.css";
import s from "./etsy.module.css";

// The Etsy Title Generator. Same three stage card as the Facebook Bio Generator (form, a short writing
// state, editable results), plus a product photo that a vision model reads. Titles come from
// /api/tools/etsy-title; nothing is generated locally or faked.

const SLUG = "etsy-title-generator";
const MESSAGES = ["Looking at your product...", "Trying a few different wordings...", "Checking the length of each title..."];
/** Photos are shrunk to this many pixels on the long side before upload: plenty for the model, small for the request. */
const MAX_SIDE = 1280;

const count = (t: string) => [...t].length;
const words = (t: string) => t.trim().split(/\s+/).filter(Boolean).length;

type Photo = { name: string; url: string; mimeType: string; data: string };

/** Reads, checks and shrinks one image file. Throws a visitor friendly message. */
async function readPhoto(file: File): Promise<Photo> {
  if (!ETSY_PHOTO_TYPES.includes(file.type)) throw new Error("Please choose a JPG, PNG or WebP image.");
  if (file.size > ETSY_PHOTO_MAX_BYTES) throw new Error("That image is over 10MB. Please choose a smaller one.");
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
    // White behind transparent PNGs, so the JPEG doesn't turn them black.
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const url = canvas.toDataURL("image/jpeg", 0.85);
    return { name: file.name, url, mimeType: "image/jpeg", data: url.slice(url.indexOf(",") + 1) };
  } catch {
    throw new Error("That image couldn't be opened. Please try another photo.");
  } finally {
    URL.revokeObjectURL(src);
  }
}

const EMPTY = { item: "", category: "", categoryOther: "", format: "", style: "None", styleOther: "", color: "", material: "", size: "", personalization: "", personalizationDetail: "", phrase: "", existing: "", notes: "", language: "English" };
type Details = typeof EMPTY;

export function EtsyTitleTool() {
  const [d, setD] = useState<Details>(EMPTY);
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [photoError, setPhotoError] = useState("");
  const [reading, setReading] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<"form" | "loading" | "clarify" | "results">("form");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [titles, setTitles] = useState<EtsyTitle[]>([]);
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState(MESSAGES[0]);
  const busy = useRef(false);
  const lastFile = useRef<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const itemRef = useRef<HTMLInputElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const set = (k: keyof Details) => (e: { target: { value: string } }) => setD((x) => ({ ...x, [k]: e.target.value }));

  useEffect(() => {
    if (stage !== "loading") return;
    const a = setTimeout(() => setMessage(MESSAGES[1]), 2500);
    const b = setTimeout(() => setMessage(MESSAGES[2]), 6000);
    return () => (clearTimeout(a), clearTimeout(b));
  }, [stage]);

  useEffect(() => {
    if (stage === "results" || stage === "clarify") stageRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [stage]);

  async function takeFile(file: File | undefined) {
    if (!file) return;
    lastFile.current = file;
    setPhotoError("");
    setReading(true);
    try {
      setPhoto(await readPhoto(file));
    } catch (err) {
      setPhoto(null);
      setPhotoError(err instanceof Error && err.message ? err.message : "That image couldn't be opened.");
    }
    setReading(false);
  }

  function removePhoto() {
    setPhoto(null);
    setPhotoError("");
    lastFile.current = null;
    if (fileRef.current) fileRef.current.value = "";
  }

  async function generate(withAnswer = "") {
    if (busy.current) return;
    if (!photo && !d.item.trim()) {
      setError("Upload a photo or tell us what the item is.");
      itemRef.current?.focus();
      return;
    }
    busy.current = true;
    setError("");
    setMessage(MESSAGES[0]);
    setStage("loading");
    track("tool_generate", SLUG, { photo: photo ? "yes" : "no" });
    const payload = { ...d, answer: withAnswer, image: photo ? { mimeType: photo.mimeType, data: photo.data } : undefined };
    const back = titles.length ? "results" : "form";
    try {
      const res = await fetch("/api/tools/etsy-title", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body?.needsClarification && typeof body.question === "string") {
        setQuestion(body.question);
        setAnswer("");
        setStage("clarify");
      } else if (res.ok && Array.isArray(body?.titles) && body.titles.length) {
        setTitles(body.titles as EtsyTitle[]);
        setActive(0);
        setStage("results");
        track("tool_success", SLUG);
      } else {
        setError(typeof body?.error === "string" ? body.error : "The titles couldn't be written just now. Please try again.");
        setStage(back);
      }
    } catch {
      setError("The titles couldn't be written just now. Check your connection and try again.");
      setStage(back);
    }
    busy.current = false;
  }

  async function copy(i: number) {
    try {
      await navigator.clipboard.writeText(titles[i].title);
      setCopied(i);
      track("tool_copy", SLUG);
      setTimeout(() => setCopied((c) => (c === i ? null : c)), 1600);
    } catch {}
  }

  const text = (id: keyof Details, label: string, max: number, placeholder: string) => (
    <div className={f.q}>
      <label htmlFor={`et-${id}`}>{label}</label>
      <input id={`et-${id}`} className={s.input} maxLength={max} value={d[id]} onChange={set(id)} placeholder={placeholder} />
    </div>
  );
  const select = (id: keyof Details, label: string, options: string[], blank?: string) => (
    <div className={f.q}>
      <label htmlFor={`et-${id}`}>{label}</label>
      <span className={f.selectWrap}>
        <select id={`et-${id}`} value={d[id]} onChange={set(id)}>
          {blank ? <option value="">{blank}</option> : null}
          {options.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </span>
    </div>
  );

  const previewTitle = titles[active]?.title ?? "";

  return (
    <div className={f.shell} id="etsy-tool" ref={stageRef}>
      {stage === "form" ? (
        <section className={`${f.stage} ${f.formStage}`} aria-label="Etsy title generator form">
          <p className={f.stageLabel}>Your listing title, in a few clicks</p>
          <h2 className={f.formHeading}>What are you selling?</h2>
          <p className={f.hint}>Upload a product photo, describe the item, or do both. The more real details you add, the more accurate your titles.</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (e.currentTarget.reportValidity()) generate();
            }}
          >
            <div
              className={`${s.drop} ${dragging ? s.dropActive : ""}`}
              onDragOver={(e) => (e.preventDefault(), setDragging(true))}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                takeFile(e.dataTransfer.files?.[0]);
              }}
            >
              <input ref={fileRef} id="et-photo" type="file" accept={ETSY_PHOTO_TYPES.join(",")} className={s.file} onChange={(e) => takeFile(e.target.files?.[0])} />
              {photo ? (
                <div className={s.thumbRow}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo.url} alt="Your product photo" className={s.thumb} />
                  <div className={s.thumbText}>
                    <strong>{photo.name}</strong>
                    <span>Photo ready. We&apos;ll describe only what is clearly visible.</span>
                    <span className={s.thumbActions}>
                      <button type="button" className={f.ghost} onClick={() => fileRef.current?.click()}>Replace</button>
                      <button type="button" className={f.ghost} onClick={removePhoto}>Remove</button>
                    </span>
                  </div>
                </div>
              ) : (
                <label htmlFor="et-photo" className={s.dropLabel}>
                  <svg viewBox="0 0 24 24" width="30" height="30" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="5" width="18" height="14" rx="2.5" />
                    <circle cx="9" cy="10" r="1.8" />
                    <path d="m4 17 5-4.5 3.5 3 3-2.5 4.5 4" />
                  </svg>
                  <strong>{reading ? "Preparing your photo..." : "Drop a product photo here, or choose a file"}</strong>
                  <span>JPG, PNG or WebP, up to 10MB. Optional.</span>
                </label>
              )}
              {photoError ? (
                <p className={f.error} role="alert">
                  {photoError}{" "}
                  {lastFile.current && ETSY_PHOTO_TYPES.includes(lastFile.current.type) && lastFile.current.size <= ETSY_PHOTO_MAX_BYTES ? (
                    <button type="button" className={s.linkBtn} onClick={() => takeFile(lastFile.current ?? undefined)}>Retry</button>
                  ) : null}
                </p>
              ) : null}
            </div>

            <div className={s.itemField}>
              <label htmlFor="et-item">
                What is the item? {photo ? <span className={f.optionalPill}>Optional with a photo</span> : null}
              </label>
              <input id="et-item" ref={itemRef} className={s.input} required={!photo} maxLength={120} value={d.item} onChange={set("item")} placeholder="For example: personalized dog collar, gold hoop earrings, wedding welcome sign" />
            </div>

            <div className={s.details}>
              <button type="button" className={s.detailsToggle} aria-expanded={open} aria-controls="et-details" onClick={() => setOpen((o) => !o)}>
                <span>Add product details <em>(optional)</em></span>
                <span aria-hidden="true" className={s.chev} />
              </button>
              {open ? (
                <div id="et-details" className={s.detailsBody}>
                  <p className={f.optionalDesc}>Only add what is true. Material, size and personalization go into a title only when you give them here.</p>
                  <div className={f.questions}>
                    <div className={f.q}>
                      {select("category", "Category", ETSY_CATEGORIES, "Choose a category")}
                      {d.category === "Other" ? (
                        <div className={f.other}>
                          <label htmlFor="et-categoryOther">Which category?</label>
                          <input id="et-categoryOther" required maxLength={60} value={d.categoryOther} onChange={set("categoryOther")} placeholder="Write your own category" />
                        </div>
                      ) : null}
                    </div>
                    {select("format", "Format", ETSY_FORMATS, "Choose a format")}
                    <div className={f.q}>
                      {select("style", "Style", ETSY_STYLES)}
                      {d.style === "Other" ? (
                        <div className={f.other}>
                          <label htmlFor="et-styleOther">Which style?</label>
                          <input id="et-styleOther" required maxLength={60} value={d.styleOther} onChange={set("styleOther")} placeholder="For example: cottagecore" />
                        </div>
                      ) : null}
                    </div>
                    {text("color", "Color or finish", 60, "For example: sage green, matte black")}
                    {text("material", "Material", 80, "For example: sterling silver, linen")}
                    {text("size", "Size or dimensions", 60, "For example: 8 x 10 inch, 18 inch chain")}
                    <div className={f.q}>
                      {select("personalization", "Personalization", ETSY_PERSONALIZATION, "Choose one")}
                      {d.personalization === "Yes" ? (
                        <div className={f.other}>
                          <label htmlFor="et-personalizationDetail">What can buyers personalize?</label>
                          <input id="et-personalizationDetail" maxLength={120} value={d.personalizationDetail} onChange={set("personalizationDetail")} placeholder="For example: name and date" />
                        </div>
                      ) : null}
                    </div>
                    {text("phrase", "A search phrase to include", 80, "For example: bridesmaid gift")}
                    {select("language", "Title language", ETSY_LANGUAGES)}
                    <div className={f.q}>
                      <label htmlFor="et-existing">Your current title</label>
                      <input id="et-existing" className={s.input} maxLength={160} value={d.existing} onChange={set("existing")} placeholder="Paste it to get a clearer version" />
                    </div>
                  </div>
                  <div className={s.notes}>
                    <label htmlFor="et-notes">Anything the photo can&apos;t show?</label>
                    <textarea id="et-notes" rows={3} maxLength={300} value={d.notes} onChange={set("notes")} placeholder="For example: comes in a set of 3, made to order, fits A4 frames" />
                    <div className={f.hintRow}>
                      <span>Materials, sizes, quantities or who it&apos;s for.</span>
                      <span>{d.notes.length} / 300</span>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {error ? <p className={f.error} role="alert">{error}</p> : null}
            <p className={f.lengthNote}>Three editable titles, each within Etsy&apos;s 140 character limit.</p>
            <div className={f.submitRow}>
              <button className={f.action} type="submit" disabled={reading}>
                <span aria-hidden="true">✧</span> Generate Etsy Titles <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        </section>
      ) : null}

      {stage === "loading" ? (
        <section className={`${f.stage} ${f.loading}`} role="status" aria-live="polite" aria-label="Writing your Etsy titles">
          <div className={f.stars} aria-hidden="true">
            {[f.starMain, f.starSmall, f.starLeft].map((c, i) => (
              <svg key={i} className={c} viewBox="0 0 64 64" width={i ? 20 : 52} height={i ? 20 : 52}>
                <path d="M32 0c2 19 13 30 32 32-19 2-30 13-32 32C30 45 19 34 0 32 19 30 30 19 32 0Z" fill="currentColor" />
              </svg>
            ))}
          </div>
          <h2 className={f.loadingTitle}>Writing your titles.</h2>
          <p className={f.loadingCopy}>{message}</p>
          <div className={f.dots} aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
        </section>
      ) : null}

      {stage === "clarify" ? (
        <section className={`${f.stage} ${f.formStage}`} aria-label="One quick question">
          <p className={f.stageLabel}>One quick question</p>
          <h2 className={f.formHeading}>{question}</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (answer.trim()) generate(answer.trim());
            }}
          >
            <div className={s.itemField}>
              <label htmlFor="et-answer">Your answer</label>
              <input id="et-answer" className={s.input} autoFocus required maxLength={160} value={answer} onChange={(e) => setAnswer(e.target.value)} />
            </div>
            <div className={s.footButtons}>
              <button type="button" className={f.ghost} onClick={() => setStage("form")}>← Change details</button>
              <button className={f.action} type="submit">
                Continue <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        </section>
      ) : null}

      {stage === "results" ? (
        <section className={`${f.stage} ${f.results}`} aria-label="Your Etsy titles">
          <div className={f.resultTop}>
            <div>
              <span className={f.kicker}>Your Etsy titles</span>
              <h2 className={f.toolHeading}>Three ways to title your listing.</h2>
              <p className={f.hint}>Edit any wording, check the length, then copy your favorite.</p>
            </div>
            <button type="button" className={f.ghost} onClick={() => setStage("form")}>
              ← Change details
            </button>
          </div>
          {error ? <p className={f.error} role="alert">{error}</p> : null}
          <div className={f.list} aria-live="polite">
            {titles.map((t, i) => {
              const n = count(t.title);
              const w = words(t.title);
              const over = n > ETSY_TITLE_LIMIT;
              return (
                <div key={i} className={f.item}>
                  <div className={f.itemTop}>
                    <span>{t.label}</span>
                    <em>Edit anything</em>
                  </div>
                  <textarea
                    rows={2}
                    aria-label={`Edit title option ${i + 1}`}
                    maxLength={200}
                    value={t.title}
                    onFocus={() => setActive(i)}
                    onChange={(e) => {
                      const v = e.target.value;
                      setTitles((all) => all.map((x, j) => (j === i ? { ...x, title: v } : x)));
                      setActive(i);
                    }}
                  />
                  {t.why ? <p className={s.why}><strong>Why it works:</strong> {t.why}</p> : null}
                  {over ? (
                    <p className={s.warn}>This is over Etsy&apos;s 140 character limit. Remove a detail before you copy it.</p>
                  ) : w >= 15 ? (
                    <p className={s.note}>This one is on the long side. Shorter titles are easier to scan, so consider trimming a detail.</p>
                  ) : null}
                  <div className={f.itemFoot}>
                    <small className={over ? f.bad : undefined}>
                      {n} / {ETSY_TITLE_LIMIT} characters · {w} {w === 1 ? "word" : "words"}
                    </small>
                    <button type="button" className={f.ghost} disabled={over} onClick={() => copy(i)}>
                      {copied === i ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={f.preview}>
            <p className={f.stageLabel}>Search result preview</p>
            <div className={s.result}>
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo.url} alt="" className={s.resultImg} />
              ) : (
                <span className={s.resultImg} aria-hidden="true" />
              )}
              <div className={s.resultText}>
                <p className={s.resultTitle}>{previewTitle}</p>
                <small>Your shop name</small>
                <strong>Your price</strong>
              </div>
            </div>
            <p className={f.fine}>An approximate preview. Etsy cuts long titles short in search, so the first words matter most.</p>
          </div>
          <div className={f.resultFoot}>
            <p className={f.fine}>Written by AI from your photo and details. Check every word is true before you publish.</p>
            <button className={f.action} type="button" onClick={() => generate()}>
              Generate more <span aria-hidden="true">↻</span>
            </button>
          </div>
        </section>
      ) : null}

      <div className={f.trust} aria-label="What the tool includes">
        <span>Photo or text</span>
        <span>140 character check</span>
        <span>Copy and paste</span>
        <span>No sign in</span>
      </div>
    </div>
  );
}
