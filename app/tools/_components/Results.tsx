"use client";

import { useEffect, useState } from "react";
import { countWords, fullText, resolveLimit, type Option } from "@/lib/tools/validate";
import s from "../tools.module.css";
import type { ViewProps } from "./ToolWorkspace";
import { CopyButton, Counter, EditableText, FoldText, Tabs, Tips } from "./ui";

// Result views for list tools (bios, captions, titles, headlines, comments, meta tags),
// the About section, the LinkedIn post and the product description.

const asOptions = (v: unknown): Option[] => (Array.isArray(v) ? (v as Option[]) : []);
const asStrings = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);

// ---------- Title width (canvas, Arial 20px as a rough stand in for Google's desktop title font) ----------

let canvas: HTMLCanvasElement | null = null;
function titleWidth(text: string): number {
  if (typeof document === "undefined") return 0;
  canvas ??= document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return 0;
  ctx.font = "20px Arial";
  return Math.round(ctx.measureText(text).width);
}
const TITLE_MAX_PX = 600;

function WidthBar({ text }: { text: string }) {
  const [px, setPx] = useState(0);
  useEffect(() => {
    const id = requestAnimationFrame(() => setPx(titleWidth(text)));
    return () => cancelAnimationFrame(id);
  }, [text]);
  const tone = px > TITLE_MAX_PX ? s.barRed : px > 580 ? s.barAmber : s.barGreen;
  return (
    <div className={s.widthBar}>
      <div className={s.barTrack} aria-hidden>
        <div className={`${s.barFill} ${tone}`} style={{ width: `${Math.min(100, (px / TITLE_MAX_PX) * 100)}%` }} />
      </div>
      <span className={s.counter}>Width: about {px} px (approximate)</span>
    </div>
  );
}

function Serp({ title, description }: { title: string; description?: string }) {
  return (
    <div className={s.serp} aria-label="Approximate Google preview">
      <span className={s.serpUrl}>example.com</span>
      <span className={s.serpTitle}>{title}</span>
      {description ? <span className={s.serpDesc}>{description}</span> : null}
    </div>
  );
}

// ---------- Etsy before and after ----------

const SUBJECTIVE = ["perfect", "beautiful", "best", "amazing", "stunning", "cute", "lovely", "gorgeous", "unique", "awesome"];
const TINY = ["a", "an", "and", "for", "of", "the", "to", "with", "in", "on", "or"];

function BeforeAfter({ before, after, changes }: { before: string; after: string; changes: string[] }) {
  const seen = new Map<string, number>();
  const words = before.split(/(\s+)/);
  const marked = words.map((w, i) => {
    const key = w.toLowerCase().replace(/[^a-z0-9]/g, "");
    if (!key) return w;
    const n = (seen.get(key) ?? 0) + 1;
    seen.set(key, n);
    const repeat = n > 1 && !TINY.includes(key);
    const subjective = SUBJECTIVE.includes(key);
    return repeat || subjective ? (
      <del key={i} className={s.del} title={repeat ? "Repeated word" : "Subjective word"}>
        {w}
      </del>
    ) : (
      w
    );
  });
  return (
    <div className={s.beforeAfter}>
      <div>
        <p className={s.angle}>Before</p>
        <p className={s.baText}>{marked}</p>
      </div>
      <div>
        <p className={s.angle}>After</p>
        <p className={s.baText}>{after}</p>
      </div>
      {changes.length ? (
        <ul className={s.changes}>
          {changes.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

// ---------- Options ----------

export function OptionsResult({ ws, values, data, setData, generate, preview }: ViewProps) {
  const [editing, setEditing] = useState<number | null>(null);
  const r = ws.result;
  if (r.kind !== "options") return null;
  const options = asOptions(data.options);
  const limit = resolveLimit(r.limit, values);
  const update = (i: number, patch: Partial<Option>) => setData({ ...data, options: options.map((o, j) => (j === i ? { ...o, ...patch } : o)) });
  const current = () => options.map((o) => fullText(o)).join("\n\n---\n\n");
  const before = r.beforeAfter ? values[r.beforeAfter] : "";
  const ideas = r.ideas ? asStrings(data[r.ideas.key]) : [];

  return (
    <>
      {typeof before === "string" && before.trim() && options[0] ? <BeforeAfter before={before} after={options[0].text} changes={asStrings(data.changes)} /> : null}
      <ol className={s.cards}>
        {options.map((o, i) => {
          return (
            <li key={i} className={preview?.index === i ? `${s.card} ${s.cardActive}` : s.card}>
              <div className={s.cardHead}>
                <span className={s.angle}>{o.label}</span>
                <span className={s.meta}>
                  {r.words ? <span className={s.counter}>{countWords(o.text)} words</span> : null}
                  <Counter text={fullText(o)} limit={limit} target={r.target} />
                </span>
              </div>
              <EditableText
                value={o.text}
                label={`${o.label} option`}
                onChange={(text) => update(i, { text })}
                editing={editing === i}
                setEditing={(on) => setEditing(on ? i : null)}
                render={(v) => <FoldText text={v} chars={r.fold?.chars} firstLine={r.fold?.firstLine} label={r.fold?.label} />}
              />
              {r.fold?.label ? <p className={s.legend}>Highlighted: {r.fold.label}</p> : null}
              {o.hashtags?.length ? (
                <ul className={s.tags} aria-label="Hashtags">
                  {o.hashtags.map((h) => (
                    <li key={h}>
                      <span>{h}</span>
                      <button type="button" aria-label={`Remove ${h}`} onClick={() => update(i, { hashtags: o.hashtags!.filter((x) => x !== h) })}>
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              ) : null}
              {r.widthBar ? <WidthBar text={o.text} /> : null}
              {r.serp === "title" ? <Serp title={o.text} /> : null}
              {r.serp === "description" ? <Serp title={String(values.title || values.keyword || "")} description={o.text} /> : null}
              {o.why ? <p className={s.why}>Why this works: {o.why}</p> : null}
              <div className={s.cardActions}>
                {preview && ws.preview ? (
                  <button type="button" className={s.small} aria-pressed={preview.index === i} onClick={() => preview.show(i)}>
                    {ws.preview.labels.previewButton}
                  </button>
                ) : null}
                <CopyButton text={() => fullText(o)} />
                <button type="button" className={s.small} onClick={() => setEditing(i)}>
                  Edit
                </button>
              </div>
            </li>
          );
        })}
      </ol>
      {r.ideas && ideas.length ? (
        <div className={s.ideas}>
          <p className={s.label}>{r.ideas.heading}</p>
          <ul>
            {ideas.map((idea) => (
              <li key={idea}>
                <span>{idea}</span>
                <Counter text={idea} limit={r.ideas!.limit} />
                <CopyButton text={idea} />
              </li>
            ))}
          </ul>
          <p className={s.dataNote}>{r.ideas.helper}</p>
        </div>
      ) : null}
      {ws.smallPrint && r.serp ? <p className={s.dataNote}>{ws.smallPrint}</p> : null}
      <div className={s.actions}>
        <button type="button" className={s.ghostSmall} onClick={() => generate()}>
          {ws.more}
        </button>
        {r.shorter ? (
          <button type="button" className={s.ghostSmall} onClick={() => generate({ rewrite: "shorter", current: current() })}>
            {r.shorter}
          </button>
        ) : null}
        {r.punchier ? (
          <button type="button" className={s.ghostSmall} onClick={() => generate({ rewrite: "punchier", current: current() })}>
            {r.punchier}
          </button>
        ) : null}
        {r.funnier ? (
          <button type="button" className={s.ghostSmall} onClick={() => generate({ rewrite: "funnier", current: current() })}>
            {r.funnier}
          </button>
        ) : null}
      </div>
    </>
  );
}

// ---------- LinkedIn About section ----------

export function AboutResult({ ws, data, setData, generate }: ViewProps) {
  const r = ws.result;
  const [tab, setTab] = useState(0);
  const [editing, setEditing] = useState(false);
  if (r.kind !== "about") return null;
  const key = tab === 0 ? "short" : "full";
  const text = typeof data[key] === "string" ? (data[key] as string) : "";
  return (
    <>
      <Tabs tabs={r.tabs} active={tab} onChange={setTab} />
      <div className={s.card} role="tabpanel">
        <div className={s.cardHead}>
          <span className={s.angle}>{r.tabs[tab]}</span>
          <Counter text={text} limit={r.limit} />
        </div>
        <EditableText key={key} value={text} label={`${r.tabs[tab]} About section`} onChange={(v) => setData({ ...data, [key]: v })} editing={editing} setEditing={setEditing} render={(v) => <FoldText text={v} chars={r.fold} />} />
        <p className={s.legend}>Highlighted: {r.foldLabel}</p>
        <div className={s.cardActions}>
          <CopyButton text={text} />
          <button type="button" className={s.small} onClick={() => setEditing(true)}>
            Edit
          </button>
        </div>
      </div>
      <div className={s.actions}>
        <button type="button" className={s.ghostSmall} onClick={() => generate()}>
          {ws.more}
        </button>
      </div>
    </>
  );
}

// ---------- LinkedIn post ----------

type Hook = { type?: string; text?: string };

export function PostResult({ ws, data, setData, generate }: ViewProps) {
  const r = ws.result;
  const [editing, setEditing] = useState(false);
  if (r.kind !== "post") return null;
  const hooks = (Array.isArray(data.hooks) ? (data.hooks as Hook[]) : []).filter((h) => typeof h.text === "string");
  const tags = asStrings(data.hashtags);
  const raw = typeof data.post === "string" ? data.post : "";
  // Hashtags go at the very end of the post, so they're part of what gets copied and counted.
  const post = tags.length && !tags.every((t) => raw.includes(t)) ? `${raw}\n\n${tags.join(" ")}` : raw;
  return (
    <>
      <p className={s.label}>Hooks: click one to rebuild the post around it</p>
      <ul className={s.hooks}>
        {hooks.map((h) => (
          <li key={h.text}>
            <button type="button" className={s.hook} onClick={() => generate({ selected_hook: h.text })}>
              <span className={s.angle}>{h.type}</span>
              <span>{h.text}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className={s.card}>
        <div className={s.cardHead}>
          <span className={s.angle}>Your post</span>
          <Counter text={post} limit={r.limit} />
        </div>
        <EditableText value={post} label="LinkedIn post" onChange={(v) => setData({ ...data, post: v, hashtags: [] })} editing={editing} setEditing={setEditing} render={(v) => <FoldText text={v} chars={r.fold} />} />
        <p className={s.legend}>Highlighted: {r.foldLabel}</p>
        <div className={s.cardActions}>
          <button type="button" className={s.small} onClick={() => generate({ rewrite: "shorter", current: post })}>
            Shorter
          </button>
          <button type="button" className={s.small} onClick={() => generate({ rewrite: "punchier", current: post })}>
            Punchier
          </button>
          <button
            type="button"
            className={s.small}
            onClick={() => {
              const el = document.getElementById("linkedin-post-generator-format");
              el?.scrollIntoView({ behavior: "smooth", block: "center" });
              el?.focus({ preventScroll: true });
            }}
          >
            Change format
          </button>
          <CopyButton text={post} />
        </div>
      </div>
      <div className={s.actions}>
        <button type="button" className={s.ghostSmall} onClick={() => generate()}>
          {ws.more}
        </button>
      </div>
    </>
  );
}

// ---------- Product description ----------

type Faq = { q?: string; a?: string };

export function ProductResult({ ws, data, generate, missing, warnings }: ViewProps) {
  const [tab, setTab] = useState(0);
  const description = typeof data.description === "string" ? data.description : "";
  const bullets = asStrings(data.bullets);
  const faqs = (Array.isArray(data.faqs) ? (data.faqs as Faq[]) : []).filter((f) => f.q && f.a);
  const sections = [description, bullets.map((b) => `• ${b}`).join("\n"), faqs.map((f) => `${f.q}\n${f.a}`).join("\n\n")];
  const all = () => [description, bullets.map((b) => `• ${b}`).join("\n"), faqs.map((f) => `${f.q}\n${f.a}`).join("\n\n")].filter(Boolean).join("\n\n");
  return (
    <>
      <Tabs tabs={["Description", "Feature bullets", "Buyer FAQs"]} active={tab} onChange={setTab} />
      <div className={s.card} role="tabpanel">
        {tab === 0 ? <p className={s.prosePlain}>{description}</p> : null}
        {tab === 1 ? (
          <ul className={s.bullets}>
            {bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        ) : null}
        {tab === 2 ? (
          <dl className={s.faqList}>
            {faqs.map((f) => (
              <div key={f.q}>
                <dt>{f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>
        ) : null}
        <div className={s.cardActions}>
          <CopyButton text={sections[tab]} label="Copy section" />
          <CopyButton text={all} label="Copy all" />
        </div>
      </div>
      {missing.length ? (
        <div className={s.confirm}>
          <p className={s.label}>Details to confirm</p>
          <ul>
            {missing.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <Tips missing={[]} warnings={warnings} />
      <div className={s.actions}>
        <button type="button" className={s.ghostSmall} onClick={() => generate()}>
          {ws.more}
        </button>
      </div>
    </>
  );
}
