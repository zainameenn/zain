"use client";

import { useRef, useState } from "react";
import { BUSY_MESSAGE } from "@/lib/tools/links";
import type { ToolField, ToolInput, Workspace } from "@/lib/tools/types";
import { countChars, resolveLimit, type Option } from "@/lib/tools/validate";
import { Combobox, Disclosure, Segmented, Select, Spinner, StudioField } from "./controls";
import { InstaPreview } from "./InstaPreview";
import s from "./studio.module.css";

// The redesigned bio generator: a short form on the left, a profile preview and five results on the right.

type Status = "idle" | "loading" | "done" | "error";
type Extra = { rewrite?: "shorter" };

/** Goals that send people to a link, so the preview shows a link under the bio. */
const LINK_GOALS = ["Visit my website", "Shop my products", "Book a service", "View my portfolio"];
const EXAMPLE_BIO = "Sourdough baked fresh every morning 🍞\nPreorder by 9pm for tomorrow\nOrder link below 👇";

function defaults(fields: ToolField[]): ToolInput {
  return Object.fromEntries(
    fields.map((f) => [f.name, f.type === "toggle" ? f.defaultOn : "defaultValue" in f && f.defaultValue ? f.defaultValue : ""]),
  );
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
  const [editing, setEditing] = useState<number | null>(null);
  const [copied, setCopied] = useState<number | null>(null);
  const [announce, setAnnounce] = useState("");
  const [original, setOriginal] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);

  const r = ws.result;
  const limit = r.kind === "options" ? resolveLimit(r.limit, values) : 150;
  const ideaInfo = r.kind === "options" ? r.ideas : undefined;
  const set = (name: string, v: string | boolean) => setValues((old) => ({ ...old, [name]: v }));
  const str = (name: string) => (typeof values[name] === "string" ? (values[name] as string) : "");
  const mode = str("mode") || "new";
  const field = (name: string) => ws.fields.find((f) => f.name === name);
  const inGroup = (g: ToolField["group"]) => ws.fields.filter((f) => f.group === g && shows(f, values));
  const advancedCount = ws.fields.filter((f) => f.group === "advanced" && f.type !== "select" && str(f.name).trim()).length;

  async function generate(extra?: Extra) {
    setStatus("loading");
    setError("");
    setEditing(null);
    setAnnounce("Writing your bios");
    try {
      const res = await fetch("/api/tools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, input: values, extra: extra?.rewrite ? { rewrite: extra.rewrite, current: options.map((o) => o.text).join("\n\n---\n\n") } : undefined }),
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
      setOriginal(mode === "improve" ? str("current_bio") : "");
      setStatus("done");
      setAnnounce(`${list.length} bios ready. The first one is on the profile preview.`);
      if (window.matchMedia("(max-width: 1023.98px)").matches) resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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
      setEditing(i);
    }
  }

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

  const modeField = field("mode");
  const loading = status === "loading";
  const has = options.length > 0;
  const shown = has ? options[Math.min(selected, options.length - 1)]?.text ?? "" : EXAMPLE_BIO;
  const category = mode === "improve" ? "" : str("category");
  const displayName = ideas[0] ?? (category ? `Your name · ${category.split(" / ")[0]}` : "Your name");
  const link = LINK_GOALS.includes(str("goal")) ? "yourwebsite.com" : undefined;

  return (
    <section className={s.tool} aria-label="Instagram bio generator">
      <form
        className={s.panel}
        onSubmit={(e) => {
          e.preventDefault();
          generate();
        }}
      >
        {modeField && modeField.type === "mode" ? (
          <div className={s.modeRow}>
            <Segmented
              id={`${slug}-mode`}
              options={modeField.options.map((o) => o.value)}
              labels={Object.fromEntries(modeField.options.map((o) => [o.value, o.label]))}
              value={mode}
              onChange={(v) => set("mode", v)}
            />
            <span id={`${slug}-mode-label`} className={s.srOnly}>
              {modeField.label}
            </span>
          </div>
        ) : null}

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

      <div className={s.output} ref={resultsRef}>
        <div className={s.previewHead}>
          <span className={s.eyebrow}>{has ? "Profile preview" : "Example preview"}</span>
          <span className={countChars(shown) > limit ? `${s.count} ${s.countOver}` : s.count}>
            {countChars(shown)} / {limit}
          </span>
        </div>
        <InstaPreview username="yourusername" name={displayName} category={category} bio={shown} link={link} />
        {has ? null : <p className={s.note}>Your bios show up here, on the profile and in a list you can copy from.</p>}

        <p className={s.srOnly} aria-live="polite" role="status">
          {announce}
        </p>

        {error ? (
          <div className={s.error} role="alert">
            <p>{error}</p>
            <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => generate()}>
              Try again
            </button>
          </div>
        ) : null}

        {loading ? (
          <ol className={s.results} aria-hidden>
            {[0, 1, 2, 3, 4].map((i) => (
              <li key={i} className={`${s.result} ${s.skeleton}`} />
            ))}
          </ol>
        ) : has ? (
          <>
            <p className={s.resultsTitle}>{ws.resultsHeading}</p>
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
                const isOn = i === selected;
                return (
                  <li key={i} className={isOn ? `${s.result} ${s.resultOn}` : s.result}>
                    <div className={s.resultTop}>
                      <span className={s.resultLabel}>{o.label}</span>
                      <span className={n > limit ? `${s.count} ${s.countOver}` : s.count}>
                        {n} / {limit}
                      </span>
                    </div>
                    {editing === i ? (
                      <textarea
                        // Opened by "Edit bio", so focus moves straight into the text.
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
                      <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={() => setEditing(editing === i ? null : i)}>
                        {editing === i ? "Done" : "Edit bio"}
                      </button>
                      <button type="button" className={`${s.btn} ${s.btnText} ${s.btnSm}`} aria-pressed={isOn} onClick={() => setSelected(i)} disabled={isOn}>
                        {isOn ? "On the preview" : "See profile"}
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
                <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnMd}`} onClick={() => generate({ rewrite: "shorter" })}>
                  {r.shorter}
                </button>
              ) : null}
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}
