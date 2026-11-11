"use client";

import { useMemo, useState } from "react";
import { engagement } from "@/lib/tools/kit/calc";
import { Field, Metric, NumberInput, fmtNum, num } from "./parts";
import k from "./kit.module.css";

export function RedditEngagement() {
  const [v, setV] = useState({ score: "", comments: "", views: "", subscribers: "" });
  const set = (key: keyof typeof v) => (x: string) => setV((s) => ({ ...s, [key]: x }));
  const score = num(v.score), comments = num(v.comments), views = num(v.views), subs = num(v.subscribers);
  const bad = [comments, views, subs].some((n) => n !== null && n < 0);
  const ready = score !== null && comments !== null && !bad;
  const r = useMemo(() => (ready ? engagement({ score: score!, comments: comments!, views, subscribers: subs }) : null), [ready, score, comments, views, subs]);
  const f = (n: number | null, d = 2) => (n === null ? null : fmtNum(n, d));

  return (
    <div className={`${k.panel} ${k.grid2}`}>
      <div className={k.fields}>
        <div className={k.row2}>
          <Field id="e-score" label="Displayed score" hint="The number on the post. It isn't the exact upvote count.">
            <NumberInput id="e-score" value={v.score} onChange={set("score")} placeholder="120" min={-100000} />
          </Field>
          <Field id="e-comments" label="Comments">
            <NumberInput id="e-comments" value={v.comments} onChange={set("comments")} placeholder="30" />
          </Field>
        </div>
        <div className={k.row2}>
          <Field id="e-views" label="Post views" optional hint="Shown to the poster in the post's insights.">
            <NumberInput id="e-views" value={v.views} onChange={set("views")} placeholder="15000" />
          </Field>
          <Field id="e-subs" label="Subreddit members" optional hint="From the community's sidebar.">
            <NumberInput id="e-subs" value={v.subscribers} onChange={set("subscribers")} placeholder="200000" />
          </Field>
        </div>
        {bad ? <p className={k.error} role="alert">Comments, views and members can&apos;t be negative.</p> : null}
        <p className={k.disclosure}>Results update as you type. Nothing is saved or sent anywhere.</p>
      </div>

      <div className={k.results} aria-live="polite">
        <p className={k.resultsHead}>Your post&apos;s engagement</p>
        {r ? (
          <>
            <div className={k.metrics}>
              <Metric lead label="Score to comment ratio" value={f(r.scoreToComment, 1)} how={`Score ÷ comments = ${score} ÷ ${comments}. Lower means more discussion for each point of score.`} missing="No comments yet, so there's nothing to divide by." />
              <Metric label="Comments per point of score" value={f(r.commentsPerScore)} how="Comments ÷ score." missing="Needs a score above zero." />
              <Metric label="Interaction proxy per 1,000 views" value={f(r.proxyPer1kViews, 1)} how="(Score + comments) ÷ views × 1,000. A proxy: score isn't a count of people, and one person can vote and comment." missing="Add post views to calculate this." />
              <Metric label="Comments per 1,000 views" value={f(r.commentsPer1kViews, 1)} how="Comments ÷ views × 1,000." missing="Add post views to calculate this." />
              <Metric label="Score per 1,000 members" value={f(r.scorePer1kSubscribers, 2)} how="Score ÷ subreddit members × 1,000. A size adjustment only: most members never see any given post." missing="Add the subreddit's member count to calculate this." />
            </div>
            <p className={k.note}>Compare these with your own earlier posts in the same subreddit. There&apos;s no universal good number, and averages by subreddit size aren&apos;t published, so none are shown.</p>
          </>
        ) : (
          <p className={k.note}>Enter the score and comment count to see the ratios.</p>
        )}
      </div>
    </div>
  );
}
