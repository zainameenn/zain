"use client";

import { useState } from "react";
import { CopyButton, Disclosure, Field, useKitAi } from "./parts";
import k from "./kit.module.css";

type Check = { id: string; status: "clear" | "unclear" | "missing" | "not_verified"; note: string };
type Result = { summary: string; clear: string[]; confusing: string[]; priorities: string[]; missing: string[]; wording: { before: string; after: string }[]; checks: Check[] };

const LABELS: Record<string, string> = {
  pricing_clarity: "Pricing clarity",
  package_differences: "Package differences",
  deliverables: "What's included",
  buyer_fit: "Who each option is for",
  billing_terms: "Billing terms",
  cta_clarity: "Calls to action",
  hidden_costs: "Hidden or extra costs",
  trust_proof: "Trust and proof",
  faq_coverage: "FAQ coverage",
  mobile_readability: "Mobile readability",
  comparison_usability: "Comparison",
  scope_limits: "Scope and limits",
};
const STATUS: Record<Check["status"], [string, string]> = { clear: ["Clear", k.good], unclear: ["Unclear", k.check], missing: ["Missing", k.fix], not_verified: ["Not verified", k.na2] };

function toMarkdown(r: Result) {
  const list = (h: string, xs: string[]) => (xs.length ? `## ${h}\n${xs.map((x) => `- ${x}`).join("\n")}\n\n` : "");
  return `# Pricing page review\n\n${r.summary}\n\n${list("Priority fixes", r.priorities)}${list("What's clear", r.clear)}${list("What's confusing", r.confusing)}${list("Missing information", r.missing)}${r.wording.length ? `## Wording suggestions\n${r.wording.map((w) => `- Before: ${w.before}\n  After: ${w.after}`).join("\n")}\n\n` : ""}## Checklist\n${r.checks.map((c) => `- [${c.status === "clear" ? "x" : " "}] ${LABELS[c.id]}: ${STATUS[c.status][0]}. ${c.note}`).join("\n")}\n`;
}

export function PricingAnalyzer() {
  const [v, setV] = useState({ content: "", url: "", business: "", customer: "", model: "", sales: "", concern: "" });
  const set = (key: keyof typeof v) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [key]: e.target.value }));
  const ai = useKitAi<Result>("pricing-page-analyzer");
  const r = ai.result;
  const tooShort = v.content.trim().length < 80;

  return (
    <div className={k.panel}>
      <div className={k.grid2}>
        <div className={k.fields}>
          <Field id="pr-content" label="Your pricing page text" hint={`Copy everything from the page: plan names, prices, what's included, billing terms and the FAQ. ${v.content.length.toLocaleString()} / 12,000 characters.`}>
            <textarea id="pr-content" className={k.textarea} style={{ minHeight: 260 }} maxLength={12000} value={v.content} onChange={set("content")} placeholder={"Starter: $19 per month\nFor freelancers. 3 projects, email support.\n\nPro: $49 per month\n..."} />
          </Field>
          <details className={k.more}>
            <summary>Add context</summary>
            <div className={k.fields}>
              <div className={k.row2}>
                <Field id="pr-biz" label="Business type" optional>
                  <input id="pr-biz" className={k.input} value={v.business} onChange={set("business")} placeholder="B2B SaaS" />
                </Field>
                <Field id="pr-cust" label="Customer" optional>
                  <input id="pr-cust" className={k.input} value={v.customer} onChange={set("customer")} placeholder="Small agencies" />
                </Field>
              </div>
              <div className={k.row2}>
                <Field id="pr-model" label="Pricing model" optional>
                  <select id="pr-model" className={k.select} value={v.model} onChange={set("model")}>
                    <option value="">Choose</option>
                    {["Subscription", "One time", "Usage based", "Per seat", "Custom quotes", "Mixed"].map((o) => <option key={o}>{o}</option>)}
                  </select>
                </Field>
                <Field id="pr-sales" label="How people buy" optional>
                  <select id="pr-sales" className={k.select} value={v.sales} onChange={set("sales")}>
                    <option value="">Choose</option>
                    {["Self serve checkout", "Sales call first", "Both"].map((o) => <option key={o}>{o}</option>)}
                  </select>
                </Field>
              </div>
              <Field id="pr-url" label="Page URL, for your reference" optional hint="Not fetched. The review only reads the text you paste.">
                <input id="pr-url" className={k.input} value={v.url} onChange={set("url")} placeholder="https://example.com/pricing" />
              </Field>
              <Field id="pr-concern" label="Your main concern" optional>
                <input id="pr-concern" className={k.input} value={v.concern} onChange={set("concern")} placeholder="People keep asking which plan to choose" />
              </Field>
            </div>
          </details>
          <div className={k.actions}>
            <button type="button" className={k.btn} disabled={tooShort || ai.loading} onClick={() => ai.run(Object.fromEntries(Object.entries(v).filter(([, x]) => x.trim())))}>
              {ai.loading ? "Reviewing..." : r ? "Review again" : "Analyze Pricing Page"}
            </button>
          </div>
          <Disclosure />
          <p className={k.disclosure}>Only paste public page text. The review judges what the text shows; it can&apos;t measure conversions or see your layout.</p>
        </div>

        <div className={k.results} aria-live="polite">
          <p className={k.resultsHead}>Review</p>
          {ai.error ? <p className={k.error} role="alert">{ai.error}</p> : null}
          {r ? (
            <>
              <p className={k.output} style={{ whiteSpace: "normal" }}>{r.summary}</p>
              {r.priorities.length ? (
                <>
                  <p className={k.resultsHead}>Fix these first</p>
                  <ol className={k.serviceList} style={{ listStyle: "decimal" }}>
                    {r.priorities.map((x) => <li key={x}>{x}</li>)}
                  </ol>
                </>
              ) : null}
              <div className={k.actions}>
                <CopyButton text={toMarkdown(r)} label="Copy the full review" />
              </div>
            </>
          ) : (
            <p className={k.note}>Paste at least a few lines of pricing text to start. The review has 12 checks; any it can&apos;t judge from text are marked Not verified.</p>
          )}
        </div>
      </div>

      {r ? (
        <div className={k.grid2} style={{ marginTop: 28 }}>
          <div className={k.results}>
            <p className={k.resultsHead}>Checklist</p>
            <ul className={k.checks}>
              {r.checks.map((c) => (
                <li key={c.id}>
                  <span className={`${k.status} ${STATUS[c.status][1]}`}>{STATUS[c.status][0]}</span>
                  <span className={k.checkLabel}>{LABELS[c.id]}</span>
                  <span className={k.checkDetail}>{c.note}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={k.results}>
            {[["What looks clear", r.clear], ["What looks confusing", r.confusing], ["Missing information", r.missing]].map(([h, xs]) =>
              (xs as string[]).length ? (
                <div key={h as string}>
                  <p className={k.resultsHead}>{h}</p>
                  <ul className={k.serviceList}>{(xs as string[]).map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
              ) : null,
            )}
            {r.wording.length ? (
              <div>
                <p className={k.resultsHead}>Wording suggestions</p>
                {r.wording.map((w) => (
                  <div key={w.before} className={k.note} style={{ marginTop: 10 }}>
                    <strong>Before:</strong> {w.before}
                    <br />
                    <strong>After:</strong> {w.after}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
