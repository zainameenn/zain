"use client";

import { useMemo, useState } from "react";
import { REDDIT_TITLE_MAX, titleBodyOverlap, titleChecks } from "@/lib/tools/kit/calc";
import { CopyButton, Disclosure, Field, useKitAi } from "./parts";
import k from "./kit.module.css";

const STATUS = { good: ["Good", k.good], check: ["Check", k.check], fix: ["Fix", k.fix] } as const;

export function RedditTitle() {
  const [v, setV] = useState({ title: "", subreddit: "", postType: "", audience: "", body: "", rules: "" });
  const set = (key: keyof typeof v) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [key]: e.target.value }));
  const r = useMemo(() => titleChecks(v.title), [v.title]);
  const overlap = useMemo(() => (v.body.trim() && v.title.trim() ? titleBodyOverlap(v.title, v.body) : null), [v.title, v.body]);
  const ai = useKitAi<{ title: string; why: string }>("reddit-title-analyzer");
  const has = v.title.trim().length > 0;
  const input = Object.fromEntries(Object.entries(v).filter(([, x]) => x.trim()));

  return (
    <div className={`${k.panel} ${k.grid2}`}>
      <div className={k.fields}>
        <Field id="t-title" label="Your Reddit post title" hint={`${[...v.title].length} / ${REDDIT_TITLE_MAX} characters`}>
          <textarea id="t-title" className={k.textarea} style={{ minHeight: 90 }} value={v.title} onChange={set("title")} placeholder="Paste the title exactly as you plan to post it" />
        </Field>
        <details className={k.more}>
          <summary>Add context for better feedback</summary>
          <div className={k.fields}>
            <div className={k.row2}>
              <Field id="t-sub" label="Subreddit" optional>
                <input id="t-sub" className={k.input} value={v.subreddit} onChange={set("subreddit")} placeholder="r/AskBaking" />
              </Field>
              <Field id="t-type" label="Post type" optional>
                <select id="t-type" className={k.select} value={v.postType} onChange={set("postType")}>
                  <option value="">Choose</option>
                  {["Question", "Personal story", "Discussion", "Guide or tips", "Link or news", "Image or video", "Feedback request"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </Field>
            </div>
            <Field id="t-aud" label="Who it's for" optional>
              <input id="t-aud" className={k.input} value={v.audience} onChange={set("audience")} placeholder="Home bakers who are new to sourdough" />
            </Field>
            <Field id="t-body" label="Short summary of the post" optional hint="Used to check the title matches what the post says.">
              <textarea id="t-body" className={k.textarea} value={v.body} onChange={set("body")} />
            </Field>
            <Field id="t-rules" label="Subreddit rules about titles" optional hint="Paste them from the community's rules page. The rewrite follows them.">
              <textarea id="t-rules" className={k.textarea} value={v.rules} onChange={set("rules")} />
            </Field>
          </div>
        </details>
        <div className={k.actions}>
          <button type="button" className={k.btn} disabled={!has || ai.loading || [...v.title].length > REDDIT_TITLE_MAX} onClick={() => ai.run(input, ai.result?.title)}>
            {ai.loading ? "Writing..." : ai.result ? "Try another rewrite" : "Analyze Title and suggest a rewrite"}
          </button>
        </div>
        <Disclosure />
        <p className={k.disclosure}>The checks on the right run in your browser as you type. Only the rewrite is sent to the AI service.</p>
      </div>

      <div className={k.results} aria-live="polite">
        <p className={k.resultsHead}>Title checks</p>
        {has ? (
          <>
            <div className={k.metrics}>
              <div className={`${k.metric} ${k.lead}`}>
                <p className={k.metricLabel}>Writing quality heuristic</p>
                <p className={k.metricValue}>{r.quality} / 100</p>
                <p className={k.metricHow}>Based only on the checks below. It doesn&apos;t predict votes, comments or reach.</p>
              </div>
              <div className={k.metric}>
                <p className={k.metricLabel}>Length</p>
                <p className={k.metricValue}>{r.length}</p>
                <p className={k.metricHow}>{r.words} words. Reddit allows up to {REDDIT_TITLE_MAX} characters.</p>
              </div>
            </div>
            <ul className={k.checks}>
              {r.checks.map((c) => (
                <li key={c.id}>
                  <span className={`${k.status} ${STATUS[c.status][1]}`}>{STATUS[c.status][0]}</span>
                  <span className={k.checkLabel}>{c.label}</span>
                  <span className={k.checkDetail}>{c.detail}</span>
                </li>
              ))}
              {overlap !== null ? (
                <li>
                  <span className={`${k.status} ${overlap >= 0.4 ? k.good : k.check}`}>{overlap >= 0.4 ? "Good" : "Check"}</span>
                  <span className={k.checkLabel}>Title and post match</span>
                  <span className={k.checkDetail}>{overlap >= 0.4 ? "The title's key words appear in your summary, so it describes the post." : "Few of the title's key words appear in your summary. Make sure the title describes what the post actually says."}</span>
                </li>
              ) : null}
            </ul>
            {!v.subreddit && !v.rules ? <p className={k.note}>Next step: check the subreddit&apos;s rules before posting. Many communities have their own title formats, which these general checks can&apos;t see.</p> : null}
          </>
        ) : (
          <p className={k.note}>Paste a title to see the checks.</p>
        )}
        {ai.error ? <p className={k.error} role="alert">{ai.error}</p> : null}
        {ai.result ? (
          <div className={k.results}>
            <p className={k.resultsHead}>Suggested title</p>
            <div className={k.output}>{ai.result.title}</div>
            <p className={k.counts}>{[...ai.result.title].length} characters · {ai.result.why}</p>
            <div className={k.actions}>
              <CopyButton text={ai.result.title} label="Copy title" />
              <button type="button" className={`${k.btn} ${k.ghost}`} onClick={() => setV((s) => ({ ...s, title: ai.result!.title }))}>Check this title</button>
            </div>
            <p className={k.disclosure}>Check it still says exactly what your post says. Reddit titles can&apos;t be edited after posting.</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
