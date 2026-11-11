"use client";

import { useMemo, useRef, useState } from "react";
import { charCount, wordCount } from "@/lib/tools/kit/calc";
import { renderMarkdown, toPlainText } from "@/lib/tools/kit/markdown";
import { CopyButton, track } from "./parts";
import k from "./kit.module.css";
import f from "./formatter.module.css";

const EXAMPLE = `## Three things that fixed my sourdough

I've been baking for a year and these made the biggest difference:

1. **Feed the starter twice a day** for a week before baking
2. Keep it somewhere *warm*, around 24°C
3. Weigh everything instead of using cups

> Tip: a rubber band on the jar shows how much it rose.

The full schedule is [on my blog](https://example.com/sourdough). Spoiler for the final loaf: >!it finally had an open crumb!<

| Day | Feeds |
| --- | --- |
| 1 to 3 | 2 a day |
| 4 to 7 | 1 a day |`;

type Wrap = { label: string; aria: string; before: string; after?: string; line?: boolean; placeholder: string };
const TOOLS: Wrap[] = [
  { label: "B", aria: "Bold", before: "**", after: "**", placeholder: "bold text" },
  { label: "I", aria: "Italic", before: "*", after: "*", placeholder: "italic text" },
  { label: "S", aria: "Strikethrough", before: "~~", after: "~~", placeholder: "struck text" },
  { label: "H", aria: "Heading", before: "## ", line: true, placeholder: "Heading" },
  { label: "•", aria: "Bulleted list", before: "- ", line: true, placeholder: "List item" },
  { label: "1.", aria: "Numbered list", before: "1. ", line: true, placeholder: "List item" },
  { label: "❝", aria: "Quote", before: "> ", line: true, placeholder: "Quoted text" },
  { label: "</>", aria: "Inline code", before: "`", after: "`", placeholder: "code" },
  { label: "Link", aria: "Link", before: "[", after: "](https://)", placeholder: "link text" },
  { label: "Spoiler", aria: "Spoiler", before: ">!", after: "!<", placeholder: "hidden text" },
];

export function RedditFormatter() {
  const [text, setText] = useState("");
  const [view, setView] = useState<"write" | "preview">("write");
  const ref = useRef<HTMLTextAreaElement>(null);
  // renderMarkdown escapes every character of input before adding its own fixed tags (see lib/tools/kit/markdown.ts).
  const html = useMemo(() => renderMarkdown(text), [text]);
  const plain = useMemo(() => toPlainText(text), [text]);

  function apply(t: Wrap) {
    const el = ref.current;
    if (!el) return;
    const { selectionStart: a, selectionEnd: b, value } = el;
    const picked = value.slice(a, b) || t.placeholder;
    let next: string, from: number, to: number;
    if (t.line) {
      const start = value.lastIndexOf("\n", a - 1) + 1;
      const lines = (value.slice(a, b) || t.placeholder).split("\n").map((l) => t.before + l).join("\n");
      next = value.slice(0, start) + (start === a ? "" : value.slice(start, a)) + lines + value.slice(b);
      from = a + t.before.length;
      to = from + lines.length - t.before.length;
    } else {
      next = value.slice(0, a) + t.before + picked + (t.after ?? "") + value.slice(b);
      from = a + t.before.length;
      to = from + picked.length;
    }
    setText(next);
    requestAnimationFrame(() => {
      el.focus();
      el.setSelectionRange(from, to);
    });
  }

  return (
    <div className={k.panel}>
      <div className={f.top}>
        <div className={f.toolbar} role="toolbar" aria-label="Formatting">
          {TOOLS.map((t) => (
            <button key={t.aria} type="button" aria-label={t.aria} title={t.aria} onClick={() => apply(t)}>
              {t.label}
            </button>
          ))}
        </div>
        <div className={`${k.seg} ${f.switch}`} role="group" aria-label="Show">
          <button type="button" aria-pressed={view === "write"} onClick={() => setView("write")}>Write</button>
          <button type="button" aria-pressed={view === "preview"} onClick={() => (setView("preview"), track("tool_generate", { tool: "reddit-post-formatter" }))}>Preview My Post</button>
        </div>
      </div>
      <div className={f.split} data-view={view}>
        <div className={f.pane}>
          <label htmlFor="md" className={k.srOnly}>Your Reddit post in Markdown</label>
          <textarea id="md" ref={ref} className={`${k.textarea} ${f.editor}`} value={text} onChange={(e) => setText(e.target.value)} placeholder="Write or paste your post here. Use the toolbar, or type Markdown like **bold** and [link](https://...)." spellCheck />
          <p className={k.counts} aria-live="polite">
            {wordCount(text).toLocaleString()} words · {charCount(text).toLocaleString()} characters
            {charCount(text) > 40000 ? " · Reddit text posts are limited to 40,000 characters" : ""}
          </p>
        </div>
        <div className={f.pane}>
          <p className={f.previewLabel}>Preview</p>
          {text.trim() ? (
            <div
              className={f.preview}
              dangerouslySetInnerHTML={{ __html: html }}
              onClick={(e) => (e.target as HTMLElement).closest(".md-spoiler")?.classList.toggle("md-open")}
              onKeyDown={(e) => {
                const s = (e.target as HTMLElement).closest(".md-spoiler");
                if (s && (e.key === "Enter" || e.key === " ")) {
                  e.preventDefault();
                  s.classList.toggle("md-open");
                }
              }}
            />
          ) : (
            <p className={f.empty}>Your formatted post shows here as you type.</p>
          )}
        </div>
      </div>
      <div className={k.actions} style={{ marginTop: 18 }}>
        <CopyButton text={text} label="Copy Markdown" />
        <CopyButton text={plain} label="Copy Plain Text" />
        <button type="button" className={`${k.btn} ${k.ghost}`} onClick={() => setText(EXAMPLE)}>Insert Example</button>
        <button type="button" className={`${k.btn} ${k.ghost}`} disabled={!text} onClick={() => setText("")}>Clear</button>
      </div>
      <p className={k.disclosure} style={{ marginTop: 14 }}>The preview approximates new Reddit&apos;s Markdown editor on desktop. The mobile apps use a rich text composer, so paste Markdown on desktop and switch the composer to Markdown first.</p>
    </div>
  );
}
