"use client";

import { useState } from "react";
import { exhaustionDate, runway, type RunwayOut } from "@/lib/tools/kit/calc";
import { Field, NumberInput, fmtMoney, fmtNum, num } from "./parts";
import k from "./kit.module.css";

const describe = (r: RunwayOut) =>
  r.state === "burning" ? `${fmtNum(r.months!, 1)} months` : r.state === "stable" ? "Cash is stable" : r.state === "growing" ? "Cash is growing" : "No cash left";

export function StartupRunway() {
  const [v, setV] = useState({ cash: "", expenses: "", receipts: "", planned: "", cut: "10", grow: "20", event: "", eventMonth: "3" });
  const set = (key: keyof typeof v) => (x: string) => setV((s) => ({ ...s, [key]: x }));
  const n = Object.fromEntries(Object.entries(v).map(([key, x]) => [key, num(x)])) as Record<keyof typeof v, number | null>;
  const invalid = [n.expenses, n.receipts, n.planned, n.cut, n.grow, n.event].some((x) => x !== null && x < 0) || (n.cut ?? 0) > 100;
  const ready = n.cash !== null && n.expenses !== null && !invalid;
  const base = ready ? { cash: n.cash!, expenses: n.expenses!, receipts: n.receipts, plannedMonthly: n.planned } : null;
  const r = base ? runway(base) : null;

  // Hypothetical scenarios, each changing one thing.
  const scenarios = base
    ? [
        { label: "Current situation", note: "Your numbers as entered.", r: r! },
        { label: `Cut expenses by ${n.cut ?? 0}%`, note: "Monthly expenses reduced.", r: runway({ ...base, expenses: base.expenses * (1 - (n.cut ?? 0) / 100) }) },
        { label: `Grow receipts by ${n.grow ?? 0}%`, note: "Monthly cash in increased.", r: runway({ ...base, receipts: (base.receipts ?? 0) * (1 + (n.grow ?? 0) / 100) }) },
        ...(n.event
          ? [{ label: `${fmtMoney(n.event)} arrives in month ${n.eventMonth ?? 1}`, note: "Only if it actually happens. Added to cash for comparison.", r: runway({ ...base, cash: base.cash + n.event }) }]
          : []),
      ]
    : [];
  const eventLate = r && r.state === "burning" && n.event && (n.eventMonth ?? 1) > r.months!;

  return (
    <div className={`${k.panel} ${k.grid2}`}>
      <div className={k.fields}>
        <Field id="w-cash" label="Cash available today" hint="Cash you can actually spend, across your accounts.">
          <NumberInput id="w-cash" prefix="$" value={v.cash} onChange={set("cash")} placeholder="120000" min={-1e12} />
        </Field>
        <div className={k.row2}>
          <Field id="w-exp" label="Monthly cash expenses">
            <NumberInput id="w-exp" prefix="$" value={v.expenses} onChange={set("expenses")} placeholder="25000" />
          </Field>
          <Field id="w-rec" label="Monthly cash receipts" optional hint="Cash actually received, not invoiced.">
            <NumberInput id="w-rec" prefix="$" value={v.receipts} onChange={set("receipts")} placeholder="10000" />
          </Field>
        </div>
        <details className={k.more}>
          <summary>Planned costs and scenarios</summary>
          <div className={k.fields}>
            <Field id="w-plan" label="New monthly costs you've committed to" optional hint="A hire or a contract starting soon. Added to the monthly burn.">
              <NumberInput id="w-plan" prefix="$" value={v.planned} onChange={set("planned")} />
            </Field>
            <div className={k.row2}>
              <Field id="w-cut" label="Scenario: cut expenses by %">
                <NumberInput id="w-cut" value={v.cut} onChange={set("cut")} />
              </Field>
              <Field id="w-grow" label="Scenario: grow receipts by %">
                <NumberInput id="w-grow" value={v.grow} onChange={set("grow")} />
              </Field>
            </div>
            <div className={k.row2}>
              <Field id="w-event" label="Scenario: one off cash in" optional hint="Funding, a grant or a big invoice. Never in the main result.">
                <NumberInput id="w-event" prefix="$" value={v.event} onChange={set("event")} />
              </Field>
              <Field id="w-month" label="Expected in month">
                <NumberInput id="w-month" value={v.eventMonth} onChange={set("eventMonth")} />
              </Field>
            </div>
          </div>
        </details>
        {invalid ? <p className={k.error} role="alert">Expenses, receipts and scenario values can&apos;t be negative, and a cut can&apos;t be over 100%.</p> : null}
        <p className={k.disclosure}>Results update as you type. Nothing is saved or sent anywhere.</p>
      </div>

      <div className={k.results} aria-live="polite">
        <p className={k.resultsHead}>Your runway</p>
        {r ? (
          <>
            <div className={`${k.metric} ${k.lead}`}>
              <p className={k.metricLabel}>Estimated runway</p>
              <p className={k.metricValue}>{describe(r)}</p>
              <p className={k.metricHow}>
                {r.state === "burning"
                  ? `Cash ${fmtMoney(n.cash!)} ÷ net burn ${fmtMoney(r.netBurn)} a month. At this rate cash runs out around ${exhaustionDate(r.months!).toLocaleDateString("en-US", { month: "long", year: "numeric" })}.`
                  : r.state === "no-cash"
                    ? "You have no spendable cash, so every month of spending needs new money in. Act on the largest costs and incoming cash now."
                    : r.state === "stable"
                      ? "Money in equals money out, so cash stays level under these assumptions. There's no run out date."
                      : `Money in is ${fmtMoney(-r.netBurn)} a month more than money out, so cash grows under these assumptions. There's no run out date.`}
              </p>
            </div>
            <div className={k.metrics}>
              <div className={k.metric}>
                <p className={k.metricLabel}>Gross monthly burn</p>
                <p className={k.metricValue}>{fmtMoney(r.grossBurn)}</p>
                <p className={k.metricHow}>Expenses plus committed new costs.</p>
              </div>
              <div className={k.metric}>
                <p className={k.metricLabel}>Net monthly burn</p>
                <p className={k.metricValue}>{fmtMoney(r.netBurn)}</p>
                <p className={k.metricHow}>Gross burn minus monthly receipts. Negative means cash grows.</p>
              </div>
            </div>
            <p className={k.resultsHead} style={{ marginTop: 6 }}>Hypothetical scenarios</p>
            <div className={k.tableWrap}>
              <table className={k.table}>
                <thead>
                  <tr>
                    <th scope="col">Scenario</th>
                    <th scope="col">Net burn</th>
                    <th scope="col">Runway</th>
                  </tr>
                </thead>
                <tbody>
                  {scenarios.map((s) => (
                    <tr key={s.label}>
                      <th scope="row">
                        {s.label}
                        <span className={k.hint} style={{ display: "block", fontWeight: 400 }}>{s.note}</span>
                      </th>
                      <td>{fmtMoney(s.r.netBurn)}</td>
                      <td>{describe(s.r)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {eventLate ? <p className={k.note}>The cash event is expected after your current runway ends, so it wouldn&apos;t arrive in time on these numbers.</p> : null}
            {r.state === "burning" ? <p className={k.note}>To add one month of runway at this burn, you&apos;d need about {fmtMoney(r.netBurn)} more cash, or to cut net burn to {fmtMoney(n.cash! / (r.months! + 1))} a month.</p> : null}
          </>
        ) : (
          <p className={k.note}>Enter your cash and monthly expenses to see your runway.</p>
        )}
      </div>
    </div>
  );
}
