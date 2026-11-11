"use client";

import { useState } from "react";
import { speakingSeconds, wordCount } from "@/lib/tools/kit/calc";
import { CopyButton, Disclosure, Field, useKitAi } from "./parts";
import k from "./kit.module.css";

export function ElevatorPitch() {
  const [v, setV] = useState({ product: "", audience: "", problem: "", useful: "", listener: "Customer", length: "30", stage: "", different: "", tone: "Conversational", proof: "" });
  const set = (key: keyof typeof v) => (e: { target: { value: string } }) => setV((s) => ({ ...s, [key]: e.target.value }));
  const ai = useKitAi<{ pitch: string; structure: string }>("elevator-pitch-generator");
  const [text, setText] = useState("");
  const ready = v.product.trim() && v.audience.trim() && v.problem.trim() && v.useful.trim();
  const go = async () => {
    await ai.run(Object.fromEntries(Object.entries(v).filter(([, x]) => x.trim())), ai.result?.pitch);
  };
  const shown = text || ai.result?.pitch || "";
  const words = wordCount(shown);

  return (
    <div className={`${k.panel} ${k.grid2}`}>
      <div className={k.fields}>
        <Field id="p-product" label="What you're building or selling">
          <input id="p-product" className={k.input} value={v.product} onChange={set("product")} placeholder="Bookkeeping for independent restaurants" />
        </Field>
        <Field id="p-audience" label="Who it's for">
          <input id="p-audience" className={k.input} value={v.audience} onChange={set("audience")} placeholder="Restaurant owners with one to three locations" />
        </Field>
        <Field id="p-problem" label="The problem it solves">
          <textarea id="p-problem" className={k.textarea} style={{ minHeight: 80 }} value={v.problem} onChange={set("problem")} placeholder="Owners end up doing their books at midnight after service" />
        </Field>
        <Field id="p-useful" label="What makes your solution useful">
          <textarea id="p-useful" className={k.textarea} style={{ minHeight: 80 }} value={v.useful} onChange={set("useful")} placeholder="We reconcile every day straight from the till system" />
        </Field>
        <div className={k.row2}>
          <Field id="p-listener" label="Who's listening">
            <select id="p-listener" className={k.select} value={v.listener} onChange={set("listener")}>
              {["Customer", "Investor", "Partner", "Networking event", "Job interview"].map((o) => <option key={o}>{o}</option>)}
            </select>
          </Field>
          <Field id="p-length" label="Length">
            <select id="p-length" className={k.select} value={v.length} onChange={set("length")}>
              <option value="30">30 seconds</option>
              <option value="60">60 seconds</option>
              <option value="90">90 seconds</option>
            </select>
          </Field>
        </div>
        <details className={k.more}>
          <summary>More options</summary>
          <div className={k.fields}>
            <div className={k.row2}>
              <Field id="p-stage" label="Stage" optional>
                <input id="p-stage" className={k.input} value={v.stage} onChange={set("stage")} placeholder="Pilot with first customers" />
              </Field>
              <Field id="p-tone" label="Tone">
                <select id="p-tone" className={k.select} value={v.tone} onChange={set("tone")}>
                  {["Conversational", "Confident", "Warm", "Direct"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </Field>
            </div>
            <Field id="p-diff" label="How you're different" optional>
              <input id="p-diff" className={k.input} value={v.different} onChange={set("different")} />
            </Field>
            <Field id="p-proof" label="Real traction or proof" optional hint="Only what's true and shareable. The pitch never adds numbers you didn't give.">
              <input id="p-proof" className={k.input} value={v.proof} onChange={set("proof")} placeholder="12 restaurants in our pilot" />
            </Field>
          </div>
        </details>
        <div className={k.actions}>
          <button type="button" className={k.btn} disabled={!ready || ai.loading} onClick={() => (setText(""), go())}>
            {ai.loading ? "Writing your pitch..." : ai.result ? "Write a different version" : "Generate Elevator Pitch"}
          </button>
        </div>
        <Disclosure />
      </div>

      <div className={k.results} aria-live="polite">
        <p className={k.resultsHead}>Your pitch</p>
        {ai.error ? <p className={k.error} role="alert">{ai.error}</p> : null}
        {ai.result ? (
          <>
            <label htmlFor="p-out" className={k.srOnly}>Your pitch, editable</label>
            <textarea id="p-out" className={`${k.textarea} ${k.outputEdit}`} value={shown} onChange={(e) => setText(e.target.value)} />
            <div className={k.metrics}>
              <div className={k.metric}>
                <p className={k.metricLabel}>Words</p>
                <p className={k.metricValue}>{words}</p>
              </div>
              <div className={k.metric}>
                <p className={k.metricLabel}>Speaking time</p>
                <p className={k.metricValue}>About {speakingSeconds(words)}s</p>
                <p className={k.metricHow}>At a relaxed 140 words a minute.</p>
              </div>
            </div>
            <p className={k.note}>{ai.result.structure}</p>
            <div className={k.actions}>
              <CopyButton text={shown} label="Copy pitch" />
            </div>
            <p className={k.disclosure}>Say it out loud once and change any phrase you wouldn&apos;t say naturally.</p>
          </>
        ) : (
          <p className={k.note}>Fill in the four required fields and generate. You&apos;ll get one pitch you can edit, timed for the length you picked.</p>
        )}
      </div>
    </div>
  );
}
