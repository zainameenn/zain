"use client";

import { useRef, useState, type ReactNode } from "react";
import k from "./kit.module.css";

// Shared pieces for the November 2026 tools batch: fields, result metrics, copy and download, and the AI call.

export const fmtMoney = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: Math.abs(n) < 100 && n % 1 ? 2 : 0, maximumFractionDigits: 2 });
export const fmtNum = (n: number, d = 1) => n.toLocaleString("en-US", { maximumFractionDigits: d });
/** Parses a number field. Empty or invalid is null, so it's never silently treated as 0. */
export const num = (s: string): number | null => {
  const v = s.replace(/[$,\s%]/g, "");
  if (!v) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

export function Field({ id, label, optional, hint, children }: { id: string; label: string; optional?: boolean; hint?: string; children: ReactNode }) {
  return (
    <div className={k.field}>
      <label htmlFor={id} className={k.label}>
        {label} {optional ? <span className={k.opt}>(optional)</span> : null}
      </label>
      {children}
      {hint ? <span className={k.hint}>{hint}</span> : null}
    </div>
  );
}

export function NumberInput({ id, value, onChange, prefix, placeholder, min = 0 }: { id: string; value: string; onChange: (v: string) => void; prefix?: string; placeholder?: string; min?: number }) {
  const input = <input id={id} className={k.input} inputMode="decimal" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} aria-invalid={value !== "" && (num(value) === null || (num(value) ?? 0) < min)} />;
  return prefix ? (
    <div className={k.prefix}>
      <span aria-hidden>{prefix}</span>
      {input}
    </div>
  ) : (
    input
  );
}

/** One result. A null value shows "Cannot calculate" and why, never a misleading 0. */
export function Metric({ label, value, how, missing, lead }: { label: string; value: string | null; how: string; missing?: string; lead?: boolean }) {
  return (
    <div className={lead ? `${k.metric} ${k.lead}` : k.metric}>
      <p className={k.metricLabel}>{label}</p>
      {value === null ? <p className={`${k.metricValue} ${k.na}`}>Cannot calculate</p> : <p className={k.metricValue}>{value}</p>}
      <p className={k.metricHow}>{value === null ? (missing ?? how) : how}</p>
    </div>
  );
}

export function CopyButton({ text, label = "Copy", small }: { text: string; label?: string; small?: boolean }) {
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      className={`${k.btn} ${k.ghost} ${small ? k.small : ""}`}
      disabled={!text}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1600);
        } catch {}
      }}
    >
      <span aria-live="polite">{done ? "Copied" : label}</span>
    </button>
  );
}

export function download(name: string, text: string, type = "text/plain") {
  const url = URL.createObjectURL(new Blob([text], { type: `${type};charset=utf-8` }));
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/** Analytics through the site's Google Analytics tag. Never sends what the visitor typed. */
export function track(name: string, params: Record<string, string> = {}) {
  try {
    (window as unknown as { gtag?: (c: "event", n: string, p: Record<string, string>) => void }).gtag?.("event", name, params);
  } catch {}
}

/** Calls /api/tools/kit once at a time. Inputs live in the caller's state, so a failure never clears them. */
export function useKitAi<T>(tool: string) {
  const [result, setResult] = useState<T | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const busy = useRef(false);
  async function run(input: Record<string, string>, previous?: string) {
    if (busy.current) return;
    busy.current = true;
    setLoading(true);
    setError("");
    track("tool_generate", { tool });
    try {
      const res = await fetch("/api/tools/kit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ tool, input, previous }) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) setError(data.error || "Something went wrong. Your details are still here, so try again.");
      else setResult(data.result as T);
    } catch {
      setError("We couldn't reach the server. Your details are still here, so try again in a moment.");
    } finally {
      busy.current = false;
      setLoading(false);
    }
  }
  return { result, setResult, error, loading, run };
}

export function Disclosure() {
  return <p className={k.disclosure}>This uses a free external AI service. Don&apos;t include personal, private or confidential information. Nothing is stored by this site.</p>;
}
