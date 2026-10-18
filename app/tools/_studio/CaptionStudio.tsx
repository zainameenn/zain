"use client";

import { useEffect, useRef, useState } from "react";
import { draftCaption } from "@/lib/tools/draft";
import { BUSY_MESSAGE } from "@/lib/tools/links";
import type { StyleSettings, ToolField, ToolInput, Workspace } from "@/lib/tools/types";
import { countChars, fullText, resolveLimit, type Option } from "@/lib/tools/validate";
import { STYLE_EVENT } from "./BioStudio";
import { Disclosure, FieldControl, Segmented, Spinner } from "./controls";
import { initialsOf, PhoneFrame } from "./Phone";
import { InstaPostScreen, TikTokVideoScreen, foldCaption, type PostType } from "./PostScreen";
import s from "./studio.module.css";

// The caption generator studio. Left: a short form. Right: a feed post that shows a live draft while you type,
// then three captions, as a list or one at a time in the post. Hashtags are chips you can remove before copying.

type Status = "idle" | "loading" | "done" | "error";
type View = "list" | "phone";

function defaults(fields: ToolField[]): ToolInput {
  return Object.fromEntries(fields.map((f) => [f.name, f.type === "toggle" ? f.defaultOn : "defaultValue" in f && f.defaultValue ? f.defaultValue : ""]));
}
const shows = (f: ToolField, v: ToolInput) => !f.when || v[f.when.field] === f.when.equals;

export function CaptionStudio({ slug, ws, label = "Instagram caption generator", skin = "instagram" }: { slug: string; ws: Workspace; label?: string; skin?: string }) {
  const [values, setValues] = useState<ToolInput>(() => defaults(ws.fields));
  const [status, setStatus] = useState<Status>("idle");
  const [options, setOptions] = useState<Option[]>([]);
  const [tips, setTips] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(0);
  const [view, setView] = useState<View>("list");
  const [editing, setEditing] = useState<number | null>(null);
  const [copied, setCopied] = useState<number | null>(null);
  const [announce, setAnnounce] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const r = ws.result;
  const limit = r.kind === "options" ? resolveLimit(r.limit, values) : 2200;
  const set = (name: string, v: string | boolean) => setValues((old) => ({ ...old, [name]: v }));
  const str = (name: string) => (typeof values[name] === "string" ? (values[name] as string) : "");
  const mode = str("mode") || "new";
  const inGroup = (g: ToolField["group"]) => ws.fields.filter((f) => f.group === g && shows(f, values));
  const advancedCount = ws.fields.filter((f) => f.group === "advanced" && f.type !== "select" && str(f.name).trim()).length;

  // "Use this style" buttons on the page send their settings here; whatever the visitor typed stays.
  useEffect(() => {
    const onStyle = (e: Event) => {
      const detail = (e as CustomEvent<StyleSettings & Record<string, string>>).detail ?? {};
      setValues((old) => ({ ...old, mode: "new", ...Object.fromEntries(Object.entries(detail).filter(([, v]) => v)) }));
      setAnnounce("Style applied to the generator");
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    window.addEventListener(STYLE_EVENT, onStyle);
    return () => window.removeEventListener(STYLE_EVENT, onStyle);
  }, []);

  async function generate(rewrite?: "shorter") {
    setStatus("loading");
    setError("");
    setEditing(null);
    setAnnounce("Writing your captions");
    try {
      const res = await fetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, input: values, extra: rewrite ? { rewrite, current: options.map((o) => fullText(o)).join("\n\n---\n\n") } : undefined }),
      });
      const body = await res.json().catch(() => ({}));
      const list = Array.isArray(body?.data?.options) ? (body.data.options as Option[]) : null;
      if (!res.ok || !list) {
        setError(res.status === 429 ? BUSY_MESSAGE : typeof body.error === "string" ? body.error : ws.errorText);
        setStatus(options.length ? "done" : "error");
        setAnnounce("");
        return;
      }
      setOptions(list);
      setTips(Array.isArray(body.missingInfo) ? body.missingInfo : []);
      setSelected(0);
      setView("list");
      setStatus("done");
      setAnnounce(`${list.length} captions ready.`);
      if (window.matchMedia("(max-width: 1023.98px)").matches) outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setError(ws.errorText);
      setStatus(options.length ? "done" : "error");
      setAnnounce("");
    }
  }

  async function copy(i: number) {
    try {
      // The exact text with line breaks, plus the hashtags still on the card, so it pastes into Instagram as shown.
      await navigator.clipboard.writeText(fullText(options[i]));
      setCopied(i);
      setAnnounce("Caption copied");
      setTimeout(() => setCopied((c) => (c === i ? null : c)), 1800);
    } catch {
      setAnnounce("Copy didn't work. Select the text and copy it instead.");
      setView("list");
      setEditing(i);
    }
  }

  const removeTag = (i: number, tag: string) => {
    setOptions((all) => all.map((o, j) => (j === i ? { ...o, hashtags: (o.hashtags ?? []).filter((t) => t !== tag) } : o)));
    setAnnounce(`Removed ${tag}`);
  };

  const preview = (i: number) => {
    setSelected(i);
    setView("phone");
    setEditing(null);
    setAnnounce(`Showing ${options[i].label} in the post preview`);
  };

  // ---------- What the phone shows ----------
  const loading = status === "loading";
  const has = options.length > 0;
  const name = str("name").trim();
  const postType = (str("post_type") || "Photo") as PostType;
  const draft = draftCaption({ mode, topic: str("topic"), details: str("details"), currentCaption: str("current_caption"), cta: str("cta"), goal: str("goal"), emoji: str("emoji"), tone: str("tone") });
  const current = has ? options[Math.min(selected, options.length - 1)] : null;
  const phoneText = current ? current.text : draft;
  const phoneTags = current?.hashtags ?? [];
  const phoneCount = current ? countChars(fullText(current)) : countChars(draft);
  const username = (name || "your.account").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, ".").replace(/^\.+|\.+$/g, "").slice(0, 24) || "your.account";
  const avatar = <span className={s.instaInitials}>{name ? initialsOf(name) : "?"}</span>;
  const showPhone = !has || view === "phone";
  const fold =
    skin === "tiktok"
      ? foldCaption(phoneTags.length ? `${phoneText} ${phoneTags.join(" ")}` : phoneText, 80)
      : foldCaption(phoneTags.length ? `${phoneText}\n\n${phoneTags.join(" ")}` : phoneText);

  const phone = (
    <div className={s.phoneStage}>
      <PhoneFrame>
        {skin === "tiktok" ? (
          <TikTokVideoScreen key={`${selected}-${has}`} username={`@${username}`} avatar={avatar} type={postType} caption={phoneText} hashtags={phoneTags} />
        ) : (
          <InstaPostScreen key={`${selected}-${has}`} username={username} avatar={avatar} type={postType} caption={phoneText} hashtags={phoneTags} />
        )}
      </PhoneFrame>
      {loading && !has ? (
        <div className={s.phoneBusy} aria-hidden>
          <Spinner />
          Writing three captions
        </div>
      ) : null}
    </div>
  );

  return (
    <section className={s.tool} aria-label={label}>
      <form
        ref={formRef}
        className={s.panel}
        onSubmit={(e) => {
          e.preventDefault();
          generate();
        }}
      >
        <div className={s.modeRow}>
          <span className={s.srOnly}>What do you want to do?</span>
          <Segmented id={`${slug}-mode`} options={["new", "improve"]} labels={{ new: "Write a caption", improve: "Improve my caption" }} value={mode} onChange={(v) => set("mode", v)} />
        </div>

        <div className={s.group}>
          {inGroup("essentials").map((f) => (
            <FieldControl key={f.name} f={f} slug={slug} value={str(f.name)} onChange={(v) => set(f.name, v)} />
          ))}
        </div>

        <div className={s.group}>
          <div className={s.row}>
            {inGroup("style").map((f) => (
              <FieldControl key={f.name} f={f} slug={slug} value={str(f.name)} onChange={(v) => set(f.name, v)} />
            ))}
          </div>
          <div className={s.rowWide}>
            {inGroup("format").map((f) => (
              <FieldControl key={f.name} f={f} slug={slug} value={str(f.name)} onChange={(v) => set(f.name, v)} />
            ))}
          </div>
        </div>

        <Disclosure label="More ways to personalize" count={advancedCount}>
          <div className={s.group}>
            {inGroup("advanced").map((f) => (
              <FieldControl key={f.name} f={f} slug={slug} value={str(f.name)} onChange={(v) => set(f.name, v)} />
            ))}
          </div>
        </Disclosure>

        <div className={s.actions}>
          <button type="submit" className={`${s.btn} ${s.btnPrimary} ${s.btnLg}`} disabled={loading} aria-busy={loading}>
            {loading ? <Spinner /> : null}
            {loading ? "Writing your captions" : mode === "improve" ? "Improve my caption" : ws.button}
          </button>
          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnLg}`} onClick={() => setValues({ ...defaults(ws.fields), ...ws.exampleInput })}>
            {ws.secondary}
          </button>
        </div>
        <p className={s.note}>{ws.dataNote}</p>
      </form>

      <div className={s.output} ref={outputRef}>
        <p className={s.srOnly} aria-live="polite" role="status">
          {announce}
        </p>

        <div className={s.outputBar}>
          {has ? (
            <div className={s.viewTabs} role="tablist" aria-label="Results view">
              <button type="button" role="tab" aria-selected={view === "list"} className={view === "list" ? `${s.viewTab} ${s.viewTabOn}` : s.viewTab} onClick={() => setView("list")}>
                All {options.length} captions
              </button>
              <button type="button" role="tab" aria-selected={view === "phone"} className={view === "phone" ? `${s.viewTab} ${s.viewTabOn}` : s.viewTab} onClick={() => setView("phone")}>
                Post preview
              </button>
            </div>
          ) : (
            <span className={s.draftPill}>
              <span className={s.draftDot} aria-hidden />
              {mode === "improve" ? "Your current caption" : "Live draft"}
            </span>
          )}
          <span className={phoneCount > limit ? `${s.count} ${s.countOver}` : s.count}>{showPhone ? `${phoneCount.toLocaleString()} / ${limit.toLocaleString()}` : `${limit.toLocaleString()} characters max`}</span>
        </div>

        {error ? (
          <div className={s.error} role="alert">
            <p>{error}</p>
            <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => generate()}>
              Try again
            </button>
          </div>
        ) : null}

        {showPhone ? (
          <div className={s.viewPane} key="phone">
            {phone}
            {phoneText && fold.cut ? (
              <p className={s.foldNote} style={{ textAlign: "center" }}>
                In the feed, people see <b>{countChars(fold.head)} characters</b> before &ldquo;more&rdquo;. Tap more to see the rest.
              </p>
            ) : null}
            {has ? (
              <div className={s.phoneControls}>
                <div className={s.picker} role="group" aria-label="Choose which caption to preview">
                  {options.map((o, i) => (
                    <button key={i} type="button" className={i === selected ? `${s.pick} ${s.pickOn}` : s.pick} aria-pressed={i === selected} aria-label={`Preview caption ${i + 1}: ${o.label}`} onClick={() => setSelected(i)}>
                      {i + 1}
                    </button>
                  ))}
                </div>
                <p className={s.pickLabel}>{options[selected]?.label}</p>
                <div className={s.actionsCenter}>
                  <button type="button" className={`${s.btn} ${s.btnPrimary} ${s.btnMd}`} onClick={() => copy(selected)}>
                    {copied === selected ? "Copied" : "Copy this caption"}
                  </button>
                  <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnMd}`} onClick={() => setView("list")}>
                    Back to all {options.length} captions
                  </button>
                </div>
              </div>
            ) : (
              <p className={s.draftNote}>
                {mode === "improve"
                  ? "This is your current caption. Hit Improve my caption for three rewrites that keep your facts."
                  : "A quick draft from your answers, updating as you type. Hit Generate for three AI written captions."}
              </p>
            )}
          </div>
        ) : (
          <div className={s.viewPane} key="list">
            {loading ? (
              <ol className={s.results} aria-hidden>
                {[0, 1, 2].map((i) => (
                  <li key={i} className={`${s.result} ${s.skeleton}`} />
                ))}
              </ol>
            ) : (
              <>
                <ol className={s.results}>
                  {options.map((o, i) => {
                    const n = countChars(fullText(o));
                    return (
                      <li key={i} className={i === selected ? `${s.result} ${s.resultOn}` : s.result}>
                        <div className={s.resultTop}>
                          <span className={s.resultLabel}>
                            <span className={s.resultNum}>{String(i + 1).padStart(2, "0")}</span>
                            {o.label}
                          </span>
                          <span className={n > limit ? `${s.count} ${s.countOver}` : s.count}>
                            {n.toLocaleString()} / {limit.toLocaleString()}
                          </span>
                        </div>
                        {editing === i ? (
                          <textarea
                            // Opened by "Edit", so focus moves straight into the text.
                            autoFocus
                            className={`${s.input} ${s.textarea} ${s.resultEdit}`}
                            aria-label={`Edit the ${o.label} caption`}
                            rows={Math.max(4, o.text.split("\n").length + 1)}
                            value={o.text}
                            onChange={(e) => setOptions((all) => all.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)))}
                            onBlur={() => setEditing(null)}
                          />
                        ) : (
                          <p className={s.resultText}>{o.text}</p>
                        )}
                        {o.hashtags?.length ? (
                          <ul className={s.hashChips} aria-label="Hashtags">
                            {o.hashtags.map((t) => (
                              <li key={t} className={s.hashChip}>
                                {t}
                                <button type="button" className={s.tagRemove} aria-label={`Remove ${t}`} onClick={() => removeTag(i, t)}>
                                  ×
                                </button>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                        <div className={s.resultActions}>
                          <button type="button" className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`} onClick={() => copy(i)}>
                            {copied === i ? "Copied" : "Copy caption"}
                          </button>
                          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => preview(i)}>
                            Preview in post
                          </button>
                          <button type="button" className={`${s.btn} ${s.btnText} ${s.btnSm}`} onClick={() => setEditing(editing === i ? null : i)}>
                            {editing === i ? "Done" : "Edit"}
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ol>

                {tips.length ? (
                  <ul className={s.tips}>
                    {tips.map((t) => (
                      <li key={t}>Tip: {t}</li>
                    ))}
                  </ul>
                ) : null}

                <div className={s.actions}>
                  <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnMd}`} onClick={() => generate()}>
                    {ws.more}
                  </button>
                  {r.kind === "options" && r.shorter ? (
                    <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnMd}`} onClick={() => generate("shorter")}>
                      {r.shorter}
                    </button>
                  ) : null}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
