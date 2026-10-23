"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { V2Field, V2Spec } from "@/lib/tools/v2/client-spec";
import { buildUtmUrl, countChars, type UtmArgs } from "@/lib/tools/v2/shared";
import { STYLE_EVENT } from "./BioStudio";
import { Disclosure, Segmented, Select, Spinner, StudioField } from "./controls";
import { PhoneFrame } from "./Phone";
import { V2Combobox } from "./V2Combobox";
import { V2Preview } from "./V2Preview";
import s from "./studio.module.css";

// Free tools v2: one tailored result per generation, then Regenerate for a fresh take or Refine to tweak it.
// The form is drawn from the registry spec. Uploads are resized in the browser and sent with the request only.

type Media = { kind: "image" | "pdf" | "text_file"; mimeType: string; name: string; base64?: string; text?: string; preview?: string };
type CalendarPost = { slot_id: string; date: string; platform: string; pillar?: string; format?: string; topic?: string; hook?: string; details?: string; cta?: string; asset_needed?: string };
type Result = { content: string; tip: string; warnings: string[]; posts?: CalendarPost[]; calendar_name?: string; notice?: string };
type Values = Record<string, string | boolean | string[]>;

const PDF_MAX = 5 * 1024 * 1024;

function defaults(fields: V2Field[]): Values {
  return Object.fromEntries(
    fields
      .filter((f) => f.type !== "file")
      .map((f) => [f.key, f.default ?? (f.type === "toggle" ? false : f.type === "multiselect" ? [] : f.type === "date" ? new Date().toISOString().slice(0, 10) : "")]),
  );
}

/** Images: longest edge 1600px, re-encoded as JPEG at 0.85. Drawing to a canvas also strips EXIF. */
async function resizeImage(file: File): Promise<Media> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
  return { kind: "image", mimeType: "image/jpeg", name: file.name, base64: dataUrl.split(",")[1], preview: dataUrl };
}

const readBase64 = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1] ?? "");
    r.onerror = reject;
    r.readAsDataURL(file);
  });

/** Very small Markdown renderer for the marketing plan: headings, bullets, numbered lists, bold. */
function Markdownish({ text }: { text: string }) {
  const bold = (line: string) => line.split(/(\*\*[^*]+\*\*)/g).map((p, i) => (p.startsWith("**") ? <strong key={i}>{p.slice(2, -2)}</strong> : p));
  const out: ReactNode[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  const flush = () => {
    if (!list) return;
    const Tag = list.ordered ? "ol" : "ul";
    out.push(
      <Tag key={out.length} className={s.v2List}>
        {list.items.map((it, i) => (
          <li key={i}>{bold(it)}</li>
        ))}
      </Tag>,
    );
    list = null;
  };
  for (const raw of text.split("\n")) {
    const line = raw.trimEnd();
    const h = line.match(/^(#{1,4})\s+(.*)/);
    const ul = line.match(/^\s*[-*•]\s+(.*)/);
    const ol = line.match(/^\s*\d+[.)]\s+(.*)/);
    if (h) {
      flush();
      out.push(<p key={out.length} className={s.v2Heading}>{bold(h[2])}</p>);
    } else if (ul || ol) {
      const ordered = Boolean(ol);
      if (!list || list.ordered !== ordered) {
        flush();
        list = { ordered, items: [] };
      }
      list.items.push((ul ?? ol)![1]);
    } else if (line.trim()) {
      flush();
      out.push(<p key={out.length}>{bold(line)}</p>);
    } else flush();
  }
  flush();
  return <div className={s.v2Markdown}>{out}</div>;
}

function csvOf(posts: CalendarPost[]) {
  const cols: (keyof CalendarPost)[] = ["date", "platform", "pillar", "format", "topic", "hook", "details", "cta", "asset_needed"];
  const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  return [cols.join(","), ...posts.map((p) => cols.map((c) => esc(p[c])).join(","))].join("\n");
}

export function V2Tool({ spec, skin, label }: { spec: V2Spec; skin?: string; label?: string }) {
  const [values, setValues] = useState<Values>(() => defaults(spec.fields));
  const [media, setMedia] = useState<Media[]>([]);
  const [custom, setCustom] = useState("");
  const [refine, setRefine] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [regenCount, setRegenCount] = useState(0);
  const [lastRefine, setLastRefine] = useState("");
  const [loading, setLoading] = useState<"" | "generate" | "regenerate" | "refine">("");
  const [error, setError] = useState("");
  const [fileError, setFileError] = useState("");
  const [copied, setCopied] = useState(false);
  const [announce, setAnnounce] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const outRef = useRef<HTMLDivElement>(null);

  const isUtm = spec.contract === "deterministic_url";
  const isCalendar = spec.contract === "calendar";
  const fileField = spec.fields.find((f) => f.type === "file");
  const basic = spec.fields.filter((f) => f.basic && f.type !== "file");
  const more = spec.fields.filter((f) => !f.basic && f.type !== "file");
  const str = (k: string) => (typeof values[k] === "string" ? (values[k] as string) : "");

  // Any form edit starts a new round, so Regenerate history only covers the current inputs.
  const set = (k: string, v: Values[string]) => {
    setValues((old) => ({ ...old, [k]: v }));
    setHistory([]);
    setRegenCount(0);
  };

  // "Use this style" buttons on the page prefill matching fields.
  useEffect(() => {
    const onStyle = (e: Event) => {
      const detail = (e as CustomEvent<Record<string, string>>).detail ?? {};
      const keys = new Set(spec.fields.map((f) => f.key));
      setValues((old) => ({ ...old, ...Object.fromEntries(Object.entries(detail).filter(([k, v]) => keys.has(k) && v)) }));
      setAnnounce("Style applied to the form");
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener(STYLE_EVENT, onStyle);
    return () => window.removeEventListener(STYLE_EVENT, onStyle);
  }, [spec.fields]);

  const cap = spec.limits.byField ? (spec.limits.byField[str("profile_kind")] ?? Math.min(...Object.values(spec.limits.byField))) : spec.limits.hardMax;

  // UTM: built in the browser as you type. No AI, nothing sent anywhere.
  const utm = useMemo(() => {
    if (!isUtm) return null;
    try {
      return { ...buildUtmUrl({ ...(values as unknown as UtmArgs), lowercase: values.lowercase !== false }), error: "" };
    } catch (e) {
      return { url: "", warnings: [], error: e instanceof Error ? e.message : "Check the fields." };
    }
  }, [isUtm, values]);

  async function addFiles(list: FileList | null) {
    setFileError("");
    if (!list || !fileField) return;
    const room = spec.media.maxFiles - media.length;
    const files = Array.from(list).slice(0, Math.max(0, room));
    if (list.length > room) setFileError(`You can attach up to ${spec.media.maxFiles} file${spec.media.maxFiles === 1 ? "" : "s"}.`);
    const added: Media[] = [];
    for (const f of files) {
      try {
        if (f.type.startsWith("image/") && spec.media.accepts.includes("image")) added.push(await resizeImage(f));
        else if (f.type === "application/pdf" && spec.media.accepts.includes("pdf")) {
          if (f.size > PDF_MAX) {
            setFileError("PDFs can be up to 5MB.");
            continue;
          }
          added.push({ kind: "pdf", mimeType: "application/pdf", name: f.name, base64: await readBase64(f) });
        } else if (/\.(txt|srt|vtt)$/i.test(f.name) && spec.media.accepts.includes("text_file")) added.push({ kind: "text_file", mimeType: "text/plain", name: f.name, text: (await f.text()).slice(0, 60000) });
        else setFileError("That file type isn't supported here.");
      } catch {
        setFileError("We couldn't read that file. Try another one.");
      }
    }
    setMedia((m) => [...m, ...added]);
    setHistory([]);
  }

  async function run(mode: "GENERATE" | "REGENERATE" | "REFINE", instruction?: string) {
    setError("");
    if (mode === "GENERATE") {
      // "Upload or describe": tools with both in the basic section need at least one.
      const descField = basic.find((f) => f.type === "textarea" && !f.required);
      if (fileField?.basic && descField && !media.length && !str(descField.key).trim()) {
        setError(`Upload a file or fill in "${descField.label}" so there's something to write about.`);
        return;
      }
    }
    setLoading(mode === "GENERATE" ? "generate" : mode === "REGENERATE" ? "regenerate" : "refine");
    setAnnounce(mode === "REFINE" ? "Updating your result" : "Writing your result");
    const nextRegen = mode === "REGENERATE" ? regenCount + 1 : 0;
    try {
      const res = await fetch("/api/tools/v2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: spec.slug,
          input: values,
          mode,
          media: media.map(({ kind, mimeType, base64, text }) => ({ kind, mimeType, base64, text })),
          customInstruction: mode === "REFINE" ? instruction : mode === "REGENERATE" ? lastRefine || custom : custom,
          previousOutput: mode === "REFINE" ? result?.content : undefined,
          previousOutputs: mode === "REGENERATE" ? history.slice(-3) : undefined,
          regenCount: nextRegen,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof body.error === "string" ? body.error : "Something broke on our side. Your answers are still here, so try again.");
        setAnnounce("");
        return;
      }
      const r = body as Result;
      setResult(r);
      if (r.content) setHistory((h) => [...(mode === "GENERATE" ? [] : h), r.content].slice(-3));
      setRegenCount(nextRegen);
      if (mode === "REFINE") {
        setLastRefine(instruction ?? "");
        setRefine("");
      }
      if (mode === "GENERATE") setLastRefine("");
      setAnnounce(r.content || r.posts ? "Your result is ready." : "No result this time.");
      if (window.matchMedia("(max-width: 1023.98px)").matches) outRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setError("We couldn't reach the server. Check your connection and try again.");
    } finally {
      setLoading("");
    }
  }

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setAnnounce("Copied");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setAnnounce("Copy didn't work. Select the text and copy it instead.");
    }
  }

  const control = (f: V2Field) => {
    const id = `${spec.slug}-${f.key}`;
    const v = values[f.key];
    const sv = typeof v === "string" ? v : "";
    if (f.type === "segmented" && f.options)
      return (
        <StudioField key={f.key} id={id} label={f.label} hint={f.help} as="group">
          <Segmented id={id} options={f.options} value={sv} onChange={(x) => set(f.key, x)} />
        </StudioField>
      );
    if (f.type === "select" && f.options)
      return (
        <StudioField key={f.key} id={id} label={f.label} hint={f.help}>
          <Select id={id} options={f.options} value={sv} onChange={(x) => set(f.key, x)} />
        </StudioField>
      );
    if (f.type === "combobox")
      return (
        <StudioField key={f.key} id={id} label={f.label} hint={f.help}>
          <V2Combobox id={id} options={f.options ?? []} value={sv} onChange={(x) => set(f.key, x)} placeholder={f.placeholder} allowCustom={f.allowCustom || !f.options?.length} required={f.required} maxLength={f.maxLength} />
        </StudioField>
      );
    if (f.type === "toggle")
      return (
        <label key={f.key} className={s.v2Toggle}>
          <input type="checkbox" role="switch" checked={v === true} onChange={(e) => set(f.key, e.target.checked)} />
          <span className={s.v2Switch} aria-hidden />
          <span>
            <span className={s.label}>{f.label}</span>
            {f.help ? <span className={s.hint} style={{ display: "block", marginTop: 2 }}>{f.help}</span> : null}
          </span>
        </label>
      );
    if (f.type === "multiselect") {
      const picked = Array.isArray(v) ? v : [];
      return (
        <StudioField key={f.key} id={id} label={f.label} hint={f.help} as="group">
          <div className={s.v2Chips} role="group" aria-labelledby={`${id}-label`}>
            {(f.options ?? []).map((o) => (
              <button key={o} type="button" aria-pressed={picked.includes(o)} className={picked.includes(o) ? `${s.v2Chip} ${s.v2ChipOn}` : s.v2Chip} onClick={() => set(f.key, picked.includes(o) ? picked.filter((p) => p !== o) : [...picked, o])}>
                {o}
              </button>
            ))}
          </div>
        </StudioField>
      );
    }
    if (f.type === "date")
      return (
        <StudioField key={f.key} id={id} label={f.label} hint={f.help}>
          <input id={id} type="date" className={s.input} required={f.required} value={sv} onChange={(e) => set(f.key, e.target.value)} />
        </StudioField>
      );
    if (f.type === "textarea")
      return (
        <StudioField key={f.key} id={id} label={f.label} hint={f.help}>
          <textarea id={id} className={`${s.input} ${s.textarea}`} rows={3} required={f.required} maxLength={f.maxLength} placeholder={f.placeholder} value={sv} onChange={(e) => set(f.key, e.target.value)} />
        </StudioField>
      );
    return (
      <StudioField key={f.key} id={id} label={f.label} hint={f.help}>
        <input id={id} type="text" className={s.input} required={f.required} maxLength={f.maxLength} placeholder={f.placeholder} value={sv} onChange={(e) => set(f.key, e.target.value)} />
      </StudioField>
    );
  };

  const accept = [spec.media.accepts.includes("image") ? "image/jpeg,image/png,image/webp" : "", spec.media.accepts.includes("pdf") ? "application/pdf" : "", spec.media.accepts.includes("text_file") ? ".txt,.srt,.vtt" : ""].filter(Boolean).join(",");
  const uploader = fileField ? (
    <div className={s.field}>
      <span className={s.label}>{fileField.label}</span>
      {fileField.help ? <span className={s.hint}>{fileField.help}</span> : null}
      <label
        className={s.v2Drop}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          addFiles(e.dataTransfer.files);
        }}
      >
        <input type="file" accept={accept} multiple={spec.media.maxFiles > 1} className={s.srOnly} onChange={(e) => addFiles(e.target.files)} />
        <span>
          <b>Choose a file</b> or drop it here
        </span>
        <span className={s.hint}>We only use this to write your result. It isn&apos;t stored.</span>
      </label>
      {media.length ? (
        <ul className={s.v2Files}>
          {media.map((m, i) => (
            <li key={i}>
              {m.preview ? (
                // A local data URL preview, so next/image would add nothing.
                // eslint-disable-next-line @next/next/no-img-element
                <img src={m.preview} alt="" width={44} height={44} />
              ) : (
                <span className={s.v2FileIcon}>{m.kind === "pdf" ? "PDF" : "TXT"}</span>
              )}
              <span className={s.v2FileName}>{m.name}</span>
              <button type="button" className={s.tagRemove} aria-label={`Remove ${m.name}`} onClick={() => setMedia((all) => all.filter((_, j) => j !== i))}>
                ×
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {fileError ? <span className={s.countOver} role="alert">{fileError}</span> : null}
    </div>
  ) : null;

  const content = result?.content ?? "";
  const n = countChars(content, spec.limits.emojiWeight);
  const over = Boolean(cap && n > cap);
  const busy = Boolean(loading);

  // ---------- Result area ----------
  const resultCard =
    isUtm ? (
      <div className={s.result}>
        <span className={s.resultLabel}>Your campaign link</span>
        {utm?.url ? (
          <>
            <p className={s.resultText} style={{ fontFamily: "ui-monospace, Menlo, Consolas, monospace", fontSize: 14 }}>
              {utm.url}
            </p>
            {utm.warnings.map((w) => (
              <p key={w} className={s.note}>{w}</p>
            ))}
            <table className={s.v2Table}>
              <tbody>
                {[...new URL(utm.url).searchParams.entries()].filter(([k]) => k.startsWith("utm_")).map(([k, v]) => (
                  <tr key={k}>
                    <th scope="row">{k}</th>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={s.resultActions}>
              <button type="button" className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`} onClick={() => copy(utm.url)}>
                {copied ? "Copied" : "Copy link"}
              </button>
            </div>
          </>
        ) : (
          <p className={s.note}>{utm?.error || "Fill in the page URL, source, medium and campaign to build your link."}</p>
        )}
      </div>
    ) : !result && !busy ? (
      <p className={s.draftNote} style={{ margin: "24px auto" }}>
        Your result shows up here. You get one tailored result, then you can regenerate it for a fresh take or ask for a change.
      </p>
    ) : busy && !result ? (
      <div className={`${s.result} ${s.skeleton}`} aria-hidden />
    ) : result && !content && !result.posts ? (
      <div className={s.error} role="status">
        <p>{result.tip || "We couldn't write that one. Try changing your details."}</p>
      </div>
    ) : result ? (
      <div className={s.result} aria-busy={busy}>
        <div className={s.resultTop}>
          <span className={s.resultLabel}>{isCalendar ? result.calendar_name || "Your content calendar" : "Your result"}</span>
          {!isCalendar && cap ? (
            <span className={over ? `${s.count} ${s.countOver}` : s.count}>
              {n.toLocaleString()} / {cap.toLocaleString()}
            </span>
          ) : null}
        </div>
        {isCalendar && result.posts ? (
          <div className={s.v2TableWrap}>
            <table className={s.v2Table}>
              <thead>
                <tr>
                  <th scope="col">Date</th>
                  <th scope="col">Platform</th>
                  <th scope="col">Post</th>
                </tr>
              </thead>
              <tbody>
                {result.posts.map((p) => (
                  <tr key={p.slot_id}>
                    <td>{new Date(`${p.date}T00:00:00Z`).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" })}</td>
                    <td>{p.platform}</td>
                    <td>
                      <b>{p.hook || p.topic}</b>
                      <br />
                      <span className={s.note}>
                        {[p.pillar, p.format].filter(Boolean).join(" · ")}
                        {p.details ? ` · ${p.details}` : ""}
                        {p.cta ? ` · CTA: ${p.cta}` : ""}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : spec.format === "markdown" ? (
          <Markdownish text={content} />
        ) : (
          <p className={s.resultText}>{content}</p>
        )}
        {result.tip ? <p className={s.note}>Tip: {result.tip}</p> : null}
        {result.notice ? <p className={s.note}>{result.notice}</p> : null}
        <div className={s.resultActions}>
          {isCalendar && result.posts ? (
            <button
              type="button"
              className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`}
              onClick={() => {
                const blob = new Blob([csvOf(result.posts!)], { type: "text/csv" });
                const a = document.createElement("a");
                a.href = URL.createObjectURL(blob);
                a.download = "content-calendar.csv";
                a.click();
                URL.revokeObjectURL(a.href);
              }}
            >
              Download CSV
            </button>
          ) : (
            <button type="button" className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`} onClick={() => copy(content)}>
              {copied ? "Copied" : "Copy"}
            </button>
          )}
          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} disabled={busy} aria-busy={loading === "regenerate"} onClick={() => run("REGENERATE")}>
            {loading === "regenerate" ? <Spinner /> : null}
            Regenerate
          </button>
        </div>
        {!isCalendar ? (
          <form
            className={s.v2Refine}
            onSubmit={(e) => {
              e.preventDefault();
              if (refine.trim()) run("REFINE", refine.trim());
            }}
          >
            <label htmlFor={`${spec.slug}-refine`} className={s.label}>
              Change something about this result
            </label>
            <div className={s.v2RefineRow}>
              <input id={`${spec.slug}-refine`} className={s.input} maxLength={500} placeholder="e.g. make it warmer and mention Saturdays" value={refine} onChange={(e) => setRefine(e.target.value)} />
              <button type="submit" className={`${s.btn} ${s.btnGhost} ${s.btnMd}`} disabled={busy || !refine.trim()} aria-busy={loading === "refine"}>
                {loading === "refine" ? <Spinner /> : null}
                Refine
              </button>
            </div>
            {spec.chips.length ? (
              <div className={s.v2Chips}>
                {spec.chips.map((c) => (
                  <button key={c} type="button" className={s.v2Chip} disabled={busy} onClick={() => run("REFINE", c)}>
                    {c}
                  </button>
                ))}
              </div>
            ) : null}
          </form>
        ) : null}
      </div>
    ) : null;

  const showPhone = Boolean(skin) && !isCalendar && !isUtm && spec.format !== "markdown";

  return (
    <section className={s.tool} aria-label={label ?? spec.name}>
      <form
        ref={formRef}
        className={s.panel}
        onSubmit={(e) => {
          e.preventDefault();
          if (!isUtm) run("GENERATE");
        }}
      >
        <div className={s.group}>
          {basic.map(control)}
          {fileField?.basic ? uploader : null}
        </div>
        {more.length || (fileField && !fileField.basic) ? (
          <Disclosure label="More options" count={more.filter((f) => typeof values[f.key] === "string" && (values[f.key] as string).trim() && values[f.key] !== f.default).length}>
            <div className={s.group}>
              {more.map(control)}
              {fileField && !fileField.basic ? uploader : null}
            </div>
          </Disclosure>
        ) : null}
        {!isUtm ? (
          <StudioField id={`${spec.slug}-custom`} label="Anything else? (optional)">
            <textarea id={`${spec.slug}-custom`} className={`${s.input} ${s.textarea}`} rows={2} maxLength={500} placeholder="e.g. mention our free delivery, keep it under two lines, no emojis" value={custom} onChange={(e) => setCustom(e.target.value)} />
          </StudioField>
        ) : null}
        <div className={s.actions}>
          {!isUtm ? (
            <button type="submit" className={`${s.btn} ${s.btnPrimary} ${s.btnLg}`} disabled={busy} aria-busy={loading === "generate"}>
              {loading === "generate" ? <Spinner /> : null}
              {loading === "generate" ? "Writing" : `Generate ${isCalendar ? "calendar" : spec.format === "markdown" ? "plan" : ""}`.trim()}
            </button>
          ) : null}
          {Object.keys(spec.example).length ? (
            <button
              type="button"
              className={`${s.btn} ${s.btnGhost} ${s.btnLg}`}
              onClick={() => {
                setValues({ ...defaults(spec.fields), ...(spec.example as Values) });
                setHistory([]);
              }}
            >
              Try an example
            </button>
          ) : null}
        </div>
        {!isUtm ? <p className={s.note}>AI can get things wrong. Read your result before you post it.</p> : <p className={s.note}>Built in your browser. Nothing is sent anywhere.</p>}
      </form>

      <div className={s.output} ref={outRef}>
        <p className={s.srOnly} aria-live="polite" role="status">
          {announce}
        </p>
        {error ? (
          <div className={s.error} role="alert">
            <p>{error}</p>
          </div>
        ) : null}
        {showPhone ? (
          <div className={s.phoneStage}>
            <PhoneFrame>
              <V2Preview skin={skin!} profile={spec.toolId.endsWith("-bio")} content={content} values={values} image={media.find((m) => m.preview)?.preview} />
            </PhoneFrame>
            {busy && !result ? (
              <div className={s.phoneBusy} aria-hidden>
                <Spinner />
                Writing
              </div>
            ) : null}
          </div>
        ) : null}
        {resultCard}
      </div>
    </section>
  );
}
