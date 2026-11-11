"use client";

import { useState } from "react";
import { marketingRoi } from "@/lib/tools/kit/calc";
import { Field, Metric, NumberInput, fmtMoney, fmtNum, num } from "./parts";
import k from "./kit.module.css";

export function MarketingRoi() {
  const [v, setV] = useState({ spend: "", adSpend: "", revenue: "", margin: "", profit: "", other: "", leads: "", customers: "", period: "" });
  const set = (key: keyof typeof v) => (x: string) => setV((s) => ({ ...s, [key]: x }));
  const n = Object.fromEntries(Object.entries(v).map(([key, x]) => [key, key === "period" ? null : num(x)])) as Record<keyof typeof v, number | null>;
  const invalid = Object.entries(n).some(([key, x]) => x !== null && x < 0 && key !== "profit") || (n.margin ?? 0) > 100 || (n.adSpend !== null && n.spend !== null && n.adSpend > n.spend);
  const ready = n.spend !== null && (n.revenue !== null || n.profit !== null) && !invalid;
  const r = ready ? marketingRoi({ spend: n.spend!, adSpend: n.adSpend, revenue: n.revenue, grossProfit: n.profit, grossMarginPct: n.margin, otherCosts: n.other, leads: n.leads, customers: n.customers }) : null;
  const m = (x: number | null) => (x === null ? null : fmtMoney(x));

  return (
    <div className={`${k.panel} ${k.grid2}`}>
      <div className={k.fields}>
        <Field id="r-spend" label="Marketing spend" hint="Everything spent on the campaign or period: ads, tools, content, agency fees.">
          <NumberInput id="r-spend" prefix="$" value={v.spend} onChange={set("spend")} placeholder="2000" />
        </Field>
        <div className={k.row2}>
          <Field id="r-revenue" label="Attributable revenue" hint="Revenue you can trace to this marketing.">
            <NumberInput id="r-revenue" prefix="$" value={v.revenue} onChange={set("revenue")} placeholder="10000" />
          </Field>
          <Field id="r-margin" label="Gross margin %" optional hint="Needed to turn revenue into profit.">
            <NumberInput id="r-margin" value={v.margin} onChange={set("margin")} placeholder="40" />
          </Field>
        </div>
        <details className={k.more}>
          <summary>More detail</summary>
          <div className={k.fields}>
            <Field id="r-profit" label="Attributable gross profit" optional hint="If you know it directly. Used instead of revenue × margin.">
              <NumberInput id="r-profit" prefix="$" value={v.profit} onChange={set("profit")} min={-1e12} />
            </Field>
            <div className={k.row2}>
              <Field id="r-ad" label="Of which ad spend" optional hint="For ROAS. Defaults to all marketing spend.">
                <NumberInput id="r-ad" prefix="$" value={v.adSpend} onChange={set("adSpend")} />
              </Field>
              <Field id="r-other" label="Other campaign costs" optional hint="Sales commission, extra tools, freelancers.">
                <NumberInput id="r-other" prefix="$" value={v.other} onChange={set("other")} placeholder="500" />
              </Field>
            </div>
            <div className={k.row2}>
              <Field id="r-leads" label="Leads" optional>
                <NumberInput id="r-leads" value={v.leads} onChange={set("leads")} placeholder="100" />
              </Field>
              <Field id="r-customers" label="New customers" optional>
                <NumberInput id="r-customers" value={v.customers} onChange={set("customers")} placeholder="20" />
              </Field>
            </div>
            <Field id="r-period" label="Campaign period" optional hint="For your own notes, such as March 2026.">
              <input id="r-period" className={k.input} value={v.period} onChange={(e) => set("period")(e.target.value)} />
            </Field>
          </div>
        </details>
        {invalid ? <p className={k.error} role="alert">Check the numbers: values can&apos;t be negative (except gross profit), margin can&apos;t be over 100%, and ad spend can&apos;t be more than total spend.</p> : null}
        <p className={k.disclosure}>Results update as you type. Nothing is saved or sent anywhere.</p>
      </div>

      <div className={k.results} aria-live="polite">
        <p className={k.resultsHead}>Your return{v.period ? ` for ${v.period}` : ""}</p>
        {r ? (
          <>
            <div className={k.metrics}>
              <Metric
                lead
                label="Marketing ROI"
                value={r.roiPct === null ? null : `${fmtNum(r.roiPct, 1)}%`}
                how={`(Gross profit ${fmtMoney(r.grossProfit ?? 0)} − total cost ${fmtMoney(r.totalCost)}) ÷ total cost × 100.`}
                missing={r.totalCost <= 0 ? "Marketing cost is zero, so there's nothing to divide by." : "Add your gross margin or gross profit. ROI uses profit, never revenue."}
              />
              <Metric label="ROAS" value={r.roas === null ? null : `${fmtNum(r.roas, 2)}×`} how="Revenue ÷ ad spend. Says nothing about profit." missing="Needs revenue and ad spend above zero." />
              <Metric label="Total marketing cost" value={fmtMoney(r.totalCost)} how="Spend plus other campaign costs." />
              <Metric label="Attributable gross profit" value={m(r.grossProfit)} how={r.profitBasis === "given" ? "As you entered it." : "Revenue × gross margin."} missing="Add a gross margin or gross profit." />
              <Metric label="Cost per lead" value={m(r.costPerLead)} how="Total cost ÷ leads." missing="Add the number of leads." />
              <Metric label="Customer acquisition cost" value={m(r.cac)} how="Total cost ÷ new customers." missing="Add the number of new customers." />
            </div>
            <p className={k.note}>
              {r.breakEvenRevenue !== null ? (
                <>
                  <strong>Break even:</strong> at your margin, the marketing pays for itself once attributable revenue reaches {fmtMoney(r.breakEvenRevenue)} (total cost ÷ margin).{" "}
                  {n.revenue !== null ? (n.revenue >= r.breakEvenRevenue ? "You're above it." : `You're ${fmtMoney(r.breakEvenRevenue - n.revenue)} short.`) : null}
                </>
              ) : (
                <>Add your gross margin to see the break even revenue.</>
              )}
            </p>
            {r.roiPct !== null && r.roiPct < 0 && r.roas !== null && r.roas >= 1 ? <p className={k.note}>ROAS is above 1 but ROI is negative: the revenue came in, but after product costs the profit didn&apos;t cover the marketing.</p> : null}
          </>
        ) : (
          <p className={k.note}>Enter your marketing spend and attributable revenue (or gross profit) to see the results.</p>
        )}
      </div>
    </div>
  );
}
