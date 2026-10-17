"use client";

import { useEffect, useRef, useState } from "react";
import { BUSY_MESSAGE } from "@/lib/tools/links";
import { LINK_GOALS, draftBio, nicheFor, usernameFrom } from "@/lib/tools/draft";
import type { StyleSettings, ToolField, ToolInput, Workspace } from "@/lib/tools/types";
import { countChars, resolveLimit, type Option } from "@/lib/tools/validate";
import { Combobox, Disclosure, Segmented, Select, Spinner, StudioField } from "./controls";
import { InstaScreen, PhoneFrame, initialsOf } from "./Phone";
import s from "./studio.module.css";

// The redesigned bio generator.
// Left: a short form. Right: a phone that shows a live draft while you type, then the five generated bios,
// either as a list or one at a time on the phone. Results and the selected bio survive every view change.

/** "Use this style" buttons elsewhere on the page send their settings through this event. */
export const STYLE_EVENT = "studio:style";

type Status = "idle" | "loading" | "done" | "error";
type View = "list" | "phone";

function defaults(fields: ToolField[]): ToolInput {
  return Object.fromEntries(fields.map((f) => [f.name, f.type === "toggle" ? f.defaultOn : "defaultValue" in f && f.defaultValue ? f.defaultValue : ""]));
}

const shows = (f: ToolField, v: ToolInput) => !f.when || v[f.when.field] === f.when.equals;

export function BioStudio({ slug, ws }: { slug: string; ws: Workspace }) {
  const [values, setValues] = useState<ToolInput>(() => defaults(ws.fields));
  const [status, setStatus] = useState<Status>("idle");
  const [options, setOptions] = useState<Option[]>([]);
  const [ideas, setIdeas] = useState<string[]>([]);
  const [tips, setTips] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(0);
  const [view, setView] = useState<View>("list");
  const [editing, setEditing] = useState<number | null>(null);
  const [copied, setCopied] = useState<number | null>(null);
  const [announce, setAnnounce] = useState("");
  const [original, setOriginal] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const r = ws.result;
  const limit = r.kind === "options" ? resolveLimit(r.limit, values) : 150;
  const ideaInfo = r.kind === "options" ? r.ideas : undefined;
  const set = (name: string, v: string | boolean) => setValues((old) => ({ ...old, [name]: v }));
  const str = (name: string) => (typeof values[name] === "string" ? (values[name] as string) : "");
  const mode = str("mode") || "new";
  const inGroup = (g: ToolField["group"]) => ws.fields.filter((f) => f.group === g && shows(f, values));
  const advancedCount = ws.fields.filter((f) => f.group === "advanced" && f.type !== "select" && str(f.name).trim()).length;

  // "Use this style" on the style cards: apply the settings, keep everything else, bring the form into view.
  useEffect(() => {
    const onStyle = (e: Event) => {
      const detail = (e as CustomEvent<StyleSettings>).detail ?? {};
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
    setAnnounce("Writing your bios");
    try {
      const res = await fetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, input: values, extra: rewrite ? { rewrite, current: options.map((o) => o.text).join("\n\n---\n\n") } : undefined }),
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
      setIdeas(ideaInfo && Array.isArray(body.data[ideaInfo.key]) ? body.data[ideaInfo.key] : []);
      setTips(Array.isArray(body.missingInfo) ? body.missingInfo : []);
      setSelected(0);
      setView("list");
      setOriginal(mode === "improve" ? str("current_bio") : "");
      setStatus("done");
      setAnnounce(`${list.length} bios ready.`);
      if (window.matchMedia("(max-width: 1023.98px)").matches) outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      setError(ws.errorText);
      setStatus(options.length ? "done" : "error");
      setAnnounce("");
    }
  }

  async function copy(i: number) {
    try {
      // Writes the exact text, so line breaks and emoji paste into Instagram as they look here.
      await navigator.clipboard.writeText(options[i].text);
      setCopied(i);
      setAnnounce("Bio copied");
      setTimeout(() => setCopied((c) => (c === i ? null : c)), 1800);
    } catch {
      setAnnounce("Copy didn't work. Select the text and copy it instead.");
      setView("list");
      setEditing(i);
    }
  }

  const preview = (i: number) => {
    setSelected(i);
    setView("phone");
    setEditing(null);
    setAnnounce(`Showing ${options[i].label} on the profile preview`);
  };

  const control = (f: ToolField) => {
    const id = `${slug}-${f.name}`;
    const hintId = f.hint ? `${id}-hint` : undefined;
    if (f.type === "segmented") {
      return (
        <StudioField key={f.name} id={id} label={f.label} hint={f.hint} as="group">
          <Segmented id={id} options={f.options} value={str(f.name)} onChange={(v) => set(f.name, v)} />
        </StudioField>
      );
    }
    if (f.type === "combobox") {
      return (
        <StudioField key={f.name} id={id} label={f.label} hint={f.hint}>
          <Combobox id={id} options={f.options} value={str(f.name)} onChange={(v) => set(f.name, v)} placeholder={f.placeholder} otherLabel={f.otherLabel} required={f.required} maxLength={f.maxLength} />
        </StudioField>
      );
    }
    if (f.type === "select") {
      return (
        <StudioField key={f.name} id={id} label={f.label} hint={f.hint}>
          <Select id={id} options={f.options} value={str(f.name)} onChange={(v) => set(f.name, v)} describedBy={hintId} />
        </StudioField>
      );
    }
    if (f.type === "textarea") {
      return (
        <StudioField key={f.name} id={id} label={f.label} hint={f.hint}>
          <textarea id={id} className={`${s.input} ${s.textarea}`} rows={4} required={f.required} maxLength={f.maxLength} placeholder={f.placeholder} aria-describedby={hintId} value={str(f.name)} onChange={(e) => set(f.name, e.target.value)} />
        </StudioField>
      );
    }
    if (f.type === "text") {
      return (
        <StudioField key={f.name} id={id} label={f.label} hint={f.hint}>
          <input id={id} className={s.input} type="text" required={f.required} maxLength={f.maxLength} placeholder={f.placeholder} aria-describedby={hintId} value={str(f.name)} onChange={(e) => set(f.name, e.target.value)} />
        </StudioField>
      );
    }
    return null;
  };

  // ---------- What the phone shows ----------
  const loading = status === "loading";
  const has = options.length > 0;
  const category = mode === "improve" ? "" : str("category");
  const niche = nicheFor(category);
  const name = str("name").trim();
  const accountType = str("account_type") || "Business";
  const draft = draftBio({
    mode,
    accountType,
    category,
    about: str("about"),
    currentBio: str("current_bio"),
    tone: str("tone"),
    goal: str("goal"),
    emoji: str("emoji"),
    format: str("format"),
    location: str("location"),
    audience: str("audience"),
  });
  const phoneBio = has ? (options[Math.min(selected, options.length - 1)]?.text ?? "") : draft;
  const displayName = name || ideas[0] || (category ? `Your name · ${category.split(" / ")[0]}` : "Your name");
  const shownCategory = mode === "improve" || accountType === "Personal" ? undefined : category ? category.split(" / ")[0] : "Your category";
  const link = LINK_GOALS.includes(str("goal")) ? "yourwebsite.com" : undefined;
  const avatar = <span className={s.instaInitials}>{name ? initialsOf(name) : category ? niche.emoji : "?"}</span>;
  const showPhone = !has || view === "phone";

  const phone = (
    <div className={s.phoneStage}>
      <PhoneFrame>
        <InstaScreen
          username={usernameFrom(name, category)}
          name={displayName}
          category={shownCategory}
          bio={phoneBio || <span className={s.instaPlaceholder}>Your bio shows up here</span>}
          link={link}
          avatar={avatar}
          highlights={niche.highlights}
        />
      </PhoneFrame>
      {loading && !has ? (
        <div className={s.phoneBusy} aria-hidden>
          <Spinner />
          Writing five bios
        </div>
      ) : null}
    </div>
  );

  return (
    <section className={s.tool} aria-label="Instagram bio generator">
      <form
        ref={formRef}
        className={s.panel}
        onSubmit={(e) => {
          e.preventDefault();
          generate();
        }}
      >
        <div className={s.modeRow}>
          <span id={`${slug}-mode-label`} className={s.srOnly}>
            What do you want to do?
          </span>
          <Segmented
            id={`${slug}-mode`}
            options={["new", "improve"]}
            labels={{ new: "Create a bio", improve: "Improve my bio" }}
            value={mode}
            onChange={(v) => set("mode", v)}
          />
        </div>

        <div className={s.group}>{inGroup("essentials").map(control)}</div>

        <div className={s.group}>
          <div className={s.row}>{inGroup("style").map(control)}</div>
          <div className={s.rowWide}>{inGroup("format").map(control)}</div>
        </div>

        <Disclosure label="More ways to personalize" count={advancedCount}>
          <div className={s.group}>{inGroup("advanced").map(control)}</div>
        </Disclosure>

        <div className={s.actions}>
          <button type="submit" className={`${s.btn} ${s.btnPrimary} ${s.btnLg}`} disabled={loading} aria-busy={loading}>
            {loading ? <Spinner /> : null}
            {loading ? "Writing your bios" : mode === "improve" ? "Improve my bio" : ws.button}
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
                All {options.length} bios
              </button>
              <button type="button" role="tab" aria-selected={view === "phone"} className={view === "phone" ? `${s.viewTab} ${s.viewTabOn}` : s.viewTab} onClick={() => setView("phone")}>
                Profile preview
              </button>
            </div>
          ) : (
            <span className={s.draftPill}>
              <span className={s.draftDot} aria-hidden />
              {mode === "improve" ? "Your current bio" : "Live draft"}
            </span>
          )}
          <span className={countChars(phoneBio) > limit ? `${s.count} ${s.countOver}` : s.count}>
            {showPhone ? `${countChars(phoneBio)} / ${limit}` : `${limit} characters max`}
          </span>
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
            {has ? (
              <div className={s.phoneControls}>
                <div className={s.picker} role="group" aria-label="Choose which bio to preview">
                  {options.map((o, i) => (
                    <button key={i} type="button" className={i === selected ? `${s.pick} ${s.pickOn}` : s.pick} aria-pressed={i === selected} aria-label={`Preview bio ${i + 1}: ${o.label}`} onClick={() => setSelected(i)}>
                      {i + 1}
                    </button>
                  ))}
                </div>
                <p className={s.pickLabel}>{options[selected]?.label}</p>
                <div className={s.actionsCenter}>
                  <button type="button" className={`${s.btn} ${s.btnPrimary} ${s.btnMd}`} onClick={() => copy(selected)}>
                    {copied === selected ? "Copied" : "Copy this bio"}
                  </button>
                  <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnMd}`} onClick={() => setView("list")}>
                    Back to all {options.length} bios
                  </button>
                </div>
              </div>
            ) : (
              <p className={s.draftNote}>
                {mode === "improve"
                  ? "This is your current bio. Hit Improve my bio for five rewrites that keep your facts."
                  : "A quick draft from your answers, updating as you type. Hit Generate for five AI written bios."}
              </p>
            )}
          </div>
        ) : (
          <div className={s.viewPane} key="list">
            {loading ? (
              <ol className={s.results} aria-hidden>
                {[0, 1, 2, 3, 4].map((i) => (
                  <li key={i} className={`${s.result} ${s.skeleton}`} />
                ))}
              </ol>
            ) : (
              <>
                {original ? (
                  <div className={s.original}>
                    <span className={s.resultLabel}>Your current bio</span>
                    <p className={s.resultText}>{original}</p>
                    <span className={s.count}>
                      {countChars(original)} / {limit}
                    </span>
                  </div>
                ) : null}
                <ol className={s.results}>
                  {options.map((o, i) => {
                    const n = countChars(o.text);
                    return (
                      <li key={i} className={i === selected ? `${s.result} ${s.resultOn}` : s.result}>
                        <div className={s.resultTop}>
                          <span className={s.resultLabel}>
                            <span className={s.resultNum}>{String(i + 1).padStart(2, "0")}</span>
                            {o.label}
                          </span>
                          <span className={n > limit ? `${s.count} ${s.countOver}` : s.count}>
                            {n} / {limit}
                          </span>
                        </div>
                        {editing === i ? (
                          <textarea
                            // Opened by "Edit", so focus moves straight into the text.
                            autoFocus
                            className={`${s.input} ${s.textarea} ${s.resultEdit}`}
                            aria-label={`Edit the ${o.label} bio`}
                            rows={Math.max(3, o.text.split("\n").length + 1)}
                            value={o.text}
                            onChange={(e) => setOptions((all) => all.map((x, j) => (j === i ? { ...x, text: e.target.value } : x)))}
                            onBlur={() => setEditing(null)}
                          />
                        ) : (
                          <p className={s.resultText}>{o.text}</p>
                        )}
                        <div className={s.resultActions}>
                          <button type="button" className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`} onClick={() => copy(i)}>
                            {copied === i ? "Copied" : "Copy bio"}
                          </button>
                          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => preview(i)}>
                            Preview in profile
                          </button>
                          <button type="button" className={`${s.btn} ${s.btnText} ${s.btnSm}`} onClick={() => setEditing(editing === i ? null : i)}>
                            {editing === i ? "Done" : "Edit"}
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ol>

                {ideaInfo && ideas.length ? (
                  <div className={s.ideas}>
                    <p className={s.resultLabel}>{ideaInfo.heading}</p>
                    <ul>
                      {ideas.map((idea) => (
                        <li key={idea}>
                          <span>{idea}</span>
                          <span className={countChars(idea) > ideaInfo.limit ? `${s.count} ${s.countOver}` : s.count}>
                            {countChars(idea)} / {ideaInfo.limit}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className={s.note}>{ideaInfo.helper}</p>
                  </div>
                ) : null}

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
