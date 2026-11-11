"use client";

import { useEffect, useState } from "react";
import { adCost, type AdIn } from "@/lib/tools/kit/calc";
import { Field, Metric, NumberInput, fmtMoney, fmtNum, num } from "./parts";
import { ServiceCard } from "./ServiceCard";
import k from "./kit.module.css";

// The goal the visitor picks decides which service card shows further down the page (see GoalService).
const GOAL_EVENT = "kit-ad-goal";
type Goal = "ads" | "organic";

export function RedditAdCost() {
  const [mode, setMode] = useState<AdIn["budgetMode"]>("daily");
  const [pricing, setPricing] = useState<AdIn["pricing"]>("cpc");
  const [goal, setGoal] = useState<Goal>("ads");
  const [v, setV] = useState({ budget: "", days: "14", rate: "", ctr: "", cr: "", rev: "", margin: "" });
  const set = (key: keyof typeof v) => (x: string) => setV((s) => ({ ...s, [key]: x }));
  useEffect(() => {
    window.dispatchEvent(new CustomEvent(GOAL_EVENT, { detail: goal }));
  }, [goal]);

  const n = { budget: num(v.budget), days: num(v.days), rate: num(v.rate), ctr: num(v.ctr), cr: num(v.cr), rev: num(v.rev), margin: num(v.margin) };
  const invalid = Object.values(n).some((x) => x !== null && x < 0) || (n.ctr ?? 0) > 100 || (n.cr ?? 0) > 100 || (n.margin ?? 0) > 100;
  const ready = n.budget !== null && n.budget > 0 && n.rate !== null && n.rate > 0 && !invalid;
  const base: AdIn | null = ready ? { budgetMode: mode, budget: n.budget!, days: n.days, pricing, rate: n.rate!, ctr: n.ctr, conversionRate: n.cr, revenuePerConversion: n.rev, grossMarginPct: n.margin } : null;
  const r = base ? adCost(base) : null;
  // Scenarios move only the price assumption: 25% cheaper and 25% dearer than what was entered.
  const scenarios = base ? ([["Lower cost", 0.75], ["Your assumption", 1], ["Higher cost", 1.25]] as const).map(([label, m]) => ({ label, r: adCost({ ...base, rate: base.rate * m }), rate: base.rate * m })) : [];
  const m = (x: number | null) => (x === null ? null : fmtMoney(x));
  const c = (x: number | null) => (x === null ? null : fmtNum(x, 0));

  return (
    <div className={`${k.panel} ${k.grid2}`}>
      <div className={k.fields}>
        <Field id="a-goal" label="What are you deciding?">
          <select id="a-goal" className={k.select} value={goal} onChange={(e) => setGoal(e.target.value as Goal)}>
            <option value="ads">Whether to run Reddit ads</option>
            <option value="organic">Ads or organic Reddit participation</option>
          </select>
        </Field>
        <div className={k.field}>
          <span className={k.label}>Budget type</span>
          <div className={k.seg} role="group" aria-label="Budget type">
            <button type="button" aria-pressed={mode === "daily"} onClick={() => setMode("daily")}>Daily budget</button>
            <button type="button" aria-pressed={mode === "total"} onClick={() => setMode("total")}>Total budget</button>
          </div>
        </div>
        <div className={k.row2}>
          <Field id="a-budget" label={mode === "daily" ? "Daily budget" : "Total budget"}>
            <NumberInput id="a-budget" prefix="$" value={v.budget} onChange={set("budget")} placeholder={mode === "daily" ? "50" : "700"} />
          </Field>
          {mode === "daily" ? (
            <Field id="a-days" label="Campaign length in days">
              <NumberInput id="a-days" value={v.days} onChange={set("days")} placeholder="14" />
            </Field>
          ) : null}
        </div>
        <div className={k.field}>
          <span className={k.label}>Pricing assumption</span>
          <div className={k.seg} role="group" aria-label="Pricing">
            <button type="button" aria-pressed={pricing === "cpc"} onClick={() => setPricing("cpc")}>CPC (per click)</button>
            <button type="button" aria-pressed={pricing === "cpm"} onClick={() => setPricing("cpm")}>CPM (per 1,000 views)</button>
          </div>
        </div>
        <Field id="a-rate" label={pricing === "cpc" ? "Your cost per click" : "Your cost per 1,000 impressions"} hint="Your own assumption, ideally from a past campaign. This tool doesn't supply Reddit averages.">
          <NumberInput id="a-rate" prefix="$" value={v.rate} onChange={set("rate")} placeholder={pricing === "cpc" ? "0.70" : "4.00"} />
        </Field>
        <details className={k.more} open>
          <summary>Funnel assumptions</summary>
          <div className={k.fields}>
            <div className={k.row2}>
              <Field id="a-ctr" label="Click through rate %" optional hint={pricing === "cpm" ? "Needed to turn impressions into clicks." : "Used to estimate impressions."}>
                <NumberInput id="a-ctr" value={v.ctr} onChange={set("ctr")} placeholder="0.4" />
              </Field>
              <Field id="a-cr" label="Conversion rate %" optional>
                <NumberInput id="a-cr" value={v.cr} onChange={set("cr")} placeholder="2.5" />
              </Field>
            </div>
            <div className={k.row2}>
              <Field id="a-rev" label="Revenue per conversion" optional>
                <NumberInput id="a-rev" prefix="$" value={v.rev} onChange={set("rev")} placeholder="80" />
              </Field>
              <Field id="a-margin" label="Gross margin %" optional hint="What's left of revenue after product and fulfilment costs.">
                <NumberInput id="a-margin" value={v.margin} onChange={set("margin")} placeholder="50" />
              </Field>
            </div>
          </div>
        </details>
        {invalid ? <p className={k.error} role="alert">Values can&apos;t be negative, and percentages can&apos;t be over 100.</p> : null}
      </div>

      <div className={k.results} aria-live="polite">
        <p className={k.resultsHead}>Estimated results</p>
        {r ? (
          <>
            <p className={k.note}>{r.note}</p>
            <div className={k.metrics}>
              <Metric lead label="Total ad spend" value={m(r.spend)} how={mode === "daily" ? `${fmtMoney(n.budget!)} a day × ${n.days} days.` : "Your total budget."} missing="Add the number of days to total a daily budget." />
              <Metric label="Estimated clicks" value={c(r.clicks)} how={pricing === "cpc" ? "Spend ÷ CPC." : "Impressions × CTR."} missing="Add a click through rate to turn impressions into clicks." />
              <Metric label="Estimated impressions" value={c(r.impressions)} how={pricing === "cpm" ? "Spend ÷ CPM × 1,000." : "Clicks ÷ CTR."} missing="Add a click through rate to estimate impressions." />
              <Metric label="Estimated conversions" value={r.conversions === null ? null : fmtNum(r.conversions, 1)} how="Clicks × conversion rate." missing="Add a conversion rate." />
              <Metric label="Cost per acquisition" value={m(r.cpa)} how="Spend ÷ conversions." missing="Needs estimated conversions above zero." />
              <Metric label="Estimated revenue" value={m(r.revenue)} how="Conversions × revenue per conversion." missing="Add revenue per conversion." />
              <Metric label="ROAS" value={r.roas === null ? null : `${fmtNum(r.roas, 2)}×`} how="Revenue ÷ ad spend. Not profit." missing="Needs estimated revenue." />
              <Metric label="Gross profit after ads" value={m(r.grossProfitAfterAds)} how="Revenue × gross margin − ad spend. Other costs such as tools or staff aren't included." missing="Add your gross margin to estimate profit. Revenue minus ad spend isn't profit." />
            </div>
            <p className={k.resultsHead} style={{ marginTop: 8 }}>Scenarios</p>
            <div className={k.tableWrap}>
              <table className={k.table}>
                <thead>
                  <tr>
                    <th scope="col">Scenario</th>
                    <th scope="col">{pricing.toUpperCase()}</th>
                    <th scope="col">Clicks</th>
                    <th scope="col">CPA</th>
                    <th scope="col">ROAS</th>
                  </tr>
                </thead>
                <tbody>
                  {scenarios.map((s) => (
                    <tr key={s.label}>
                      <th scope="row">{s.label}</th>
                      <td>{fmtMoney(s.rate)}</td>
                      <td>{s.r.clicks === null ? "n/a" : fmtNum(s.r.clicks, 0)}</td>
                      <td>{s.r.cpa === null ? "n/a" : fmtMoney(s.r.cpa)}</td>
                      <td>{s.r.roas === null ? "n/a" : `${fmtNum(s.r.roas, 2)}×`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className={k.disclosure}>Estimates from your assumptions only. Real Reddit costs come from an auction and change with the audience, bid and competition.</p>
          </>
        ) : (
          <p className={k.note}>Enter a budget and your {pricing === "cpc" ? "cost per click" : "CPM"} to see the estimate.</p>
        )}
      </div>
    </div>
  );
}

/** The service card for this page: paid ads by default, Reddit marketing when the visitor is weighing organic. */
export function GoalService() {
  const [goal, setGoal] = useState<Goal>("ads");
  useEffect(() => {
    const on = (e: Event) => setGoal((e as CustomEvent<Goal>).detail);
    window.addEventListener(GOAL_EVENT, on);
    return () => window.removeEventListener(GOAL_EVENT, on);
  }, []);
  return goal === "ads" ? (
    <ServiceCard id="ads" why="Estimates help you plan. Setting up the campaign, tracking it properly and adjusting it week by week is the hands on part." />
  ) : (
    <ServiceCard id="reddit" why="Organic Reddit participation costs time instead of ad spend. Finding the right communities and taking part within their rules is what the Reddit work covers." />
  );
}
