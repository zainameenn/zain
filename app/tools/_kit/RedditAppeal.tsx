"use client";

import { useMemo, useState } from "react";
import { ACTION_LABELS, appealDestination, appealDraft, type AppealAction, type AppealTone } from "@/lib/tools/kit/appeal";
import { wordCount } from "@/lib/tools/kit/calc";
import { CopyButton, Field, track } from "./parts";
import k from "./kit.module.css";

// Built from a template in the browser. Nothing typed here leaves the visitor's device.

export function RedditAppeal() {
  const [action, setAction] = useState<AppealAction>("subreddit");
  const [tone, setTone] = useState<AppealTone>("neutral");
  const [v, setV] = useState({ what: "", subreddit: "", rule: "", why: "", facts: "" });
  const set = (key: keyof typeof v) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [key]: e.target.value }));
  const [draft, setDraft] = useState("");
  const dest = useMemo(() => appealDestination(action, v.subreddit), [action, v.subreddit]);
  const needsSub = action === "subreddit" || action === "removal";
  const ready = v.what.trim().length >= 10;

  return (
    <div className={`${k.panel} ${k.grid2}`}>
      <div className={k.fields}>
        <Field id="b-action" label="What happened to your account or post?">
          <select id="b-action" className={k.select} value={action} onChange={(e) => setAction(e.target.value as AppealAction)}>
            {(Object.keys(ACTION_LABELS) as AppealAction[]).map((a) => (
              <option key={a} value={a}>{ACTION_LABELS[a]}</option>
            ))}
          </select>
        </Field>
        {needsSub ? (
          <Field id="b-sub" label="Subreddit" optional>
            <input id="b-sub" className={k.input} value={v.subreddit} onChange={set("subreddit")} placeholder="r/AskBaking" />
          </Field>
        ) : null}
        <Field id="b-what" label="What happened, in your words" hint="One or two honest sentences about what you posted or did.">
          <textarea id="b-what" className={k.textarea} value={v.what} onChange={set("what")} placeholder="I posted a link to my own blog in a thread about starters." />
        </Field>
        <details className={k.more}>
          <summary>Add details</summary>
          <div className={k.fields}>
            <Field id="b-rule" label="The rule or reason you were given" optional>
              <input id="b-rule" className={k.input} value={v.rule} onChange={set("rule")} placeholder="Rule 4: no self promotion" />
            </Field>
            <Field id="b-why" label="Why you're asking for a review" optional>
              <textarea id="b-why" className={k.textarea} value={v.why} onChange={set("why")} placeholder="I didn't realise blog links counted as promotion." />
            </Field>
            <Field id="b-facts" label="Other relevant facts" optional>
              <textarea id="b-facts" className={k.textarea} value={v.facts} onChange={set("facts")} />
            </Field>
            <Field id="b-tone" label="Tone">
              <select id="b-tone" className={k.select} value={tone} onChange={(e) => setTone(e.target.value as AppealTone)}>
                <option value="neutral">Neutral and factual</option>
                <option value="apologetic">I broke a rule and I&apos;m sorry</option>
                <option value="clarifying">I think it was a misunderstanding</option>
              </select>
            </Field>
          </div>
        </details>
        <div className={k.actions}>
          <button type="button" className={k.btn} disabled={!ready} onClick={() => (setDraft(appealDraft({ action, tone, ...v })), track("tool_generate", { tool: "reddit-ban-appeal-generator" }))}>
            Create Appeal
          </button>
        </div>
        <p className={k.disclosure}>Private by design: the appeal is written in your browser from a template. Nothing you type is uploaded or sent to an AI service.</p>
      </div>

      <div className={k.results} aria-live="polite">
        <p className={k.resultsHead}>Where to send it</p>
        <div className={k.note}>
          <strong>{dest.label}.</strong> {dest.how}{" "}
          <a href={dest.href} target="_blank" rel="noopener noreferrer" className={k.textLink}>Open it on Reddit</a>
        </div>
        {draft ? (
          <>
            <p className={k.resultsHead}>Your appeal</p>
            <label htmlFor="b-draft" className={k.srOnly}>Your appeal, editable</label>
            <textarea id="b-draft" className={`${k.textarea} ${k.outputEdit}`} value={draft} onChange={(e) => setDraft(e.target.value)} />
            <p className={k.counts}>{wordCount(draft)} words · {[...draft].length} characters</p>
            <div className={k.actions}>
              <CopyButton text={draft} label="Copy appeal" />
            </div>
            <p className={k.disclosure}>Read it as the moderator would. Remove anything that isn&apos;t true. Send it once, then wait: repeated messages can get you muted. Never use another account to get around a ban.</p>
          </>
        ) : (
          <p className={k.note}>Describe what happened, then select Create Appeal. You can edit every word before copying.</p>
        )}
      </div>
    </div>
  );
}
