"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ToolField, ToolInput, Workspace } from "@/lib/tools/types";
import { UTM_KEYS, UTM_MEDIUMS, UTM_SOURCES, buildUtmUrl, download, likelyChannel, normalize, parseCsv, parseUrl, toCsv, type UtmKey, type UtmValues } from "@/lib/tools/utm";
import s from "../tools.module.css";
import { focusForm, useFillListener } from "./fill";
import { CopyButton, FieldShell, Tabs } from "./ui";

// UTM Link Builder: fully client side. No API, nothing leaves the browser.

const HISTORY_KEY = "zain-tools-utm-history";
const CUSTOM = "Custom";
const CUSTOM_WARNING = "GA4 may not recognize this medium and could file the traffic as Unassigned.";
const BULK_COLUMNS = ["url", "source", "medium", "campaign", "content"] as const;

type Raw = Record<"url" | UtmKey, string>;
const EMPTY: Raw = { url: "", source: "", medium: "", campaign: "", content: "", term: "", id: "" };

function readHistory(): Raw[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(HISTORY_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.slice(0, 10) : [];
  } catch {
    return [];
  }
}

function writeHistory(list: Raw[]) {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(list.slice(0, 10)));
  } catch {
    // Storage blocked: history just doesn't persist.
  }
}

/** Normalized values plus a note for every value that changed. */
function clean(raw: Raw, customMedium: string) {
  const values = {} as UtmValues;
  const notes: string[] = [];
  for (const key of UTM_KEYS) {
    const input = key === "medium" && raw.medium === CUSTOM ? customMedium : raw[key];
    const out = normalize(input);
    values[key] = out;
    if (input.trim() && out !== input.trim()) notes.push(`We changed '${input.trim()}' to '${out}' so your reports don't split.`);
  }
  return { values, notes };
}

export function UtmBuilder({ ws }: { ws: Workspace }) {
  const [raw, setRaw] = useState<Raw>(EMPTY);
  const [customMedium, setCustomMedium] = useState("");
  const [tab, setTab] = useState(0);
  const [history, setHistory] = useState<Raw[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const field = (name: string) => ws.fields.find((f) => f.name === name) as ToolField;

  useEffect(() => {
    const id = requestAnimationFrame(() => setHistory(readHistory()));
    return () => cancelAnimationFrame(id);
  }, []);

  const apply = (input: ToolInput | Raw) => {
    const next = { ...EMPTY };
    for (const k of Object.keys(EMPTY) as (keyof Raw)[]) next[k] = typeof input[k] === "string" ? (input[k] as string) : "";
    if (next.medium && !UTM_MEDIUMS.includes(next.medium)) {
      setCustomMedium(next.medium);
      next.medium = CUSTOM;
    }
    setRaw(next);
    setTab(0);
    focusForm(formRef.current);
  };
  useFillListener(apply);

  const url = parseUrl(raw.url);
  const { values, notes } = clean(raw, customMedium);
  const ready = url && values.source && values.medium && values.campaign;
  const link = ready ? buildUtmUrl(url, values) : "";
  const channel = ready ? likelyChannel(values.source, values.medium) : "";

  async function downloadQr() {
    if (!link) return;
    const { default: qrcode } = await import("qrcode-generator");
    const qr = qrcode(0, "M");
    qr.addData(link);
    qr.make();
    const a = document.createElement("a");
    a.href = qr.createDataURL(8, 4);
    a.download = "utm-qr-code.gif";
    a.click();
  }

  function remember() {
    const entry: Raw = { ...raw, medium: raw.medium === CUSTOM ? customMedium : raw.medium };
    const next = [entry, ...history.filter((h) => JSON.stringify(h) !== JSON.stringify(entry))].slice(0, 10);
    setHistory(next);
    writeHistory(next);
  }

  const input = (name: keyof Raw, extra?: { list?: string }) => {
    const f = field(name);
    if (!f || (f.type !== "text" && f.type !== "textarea")) return null;
    return (
      <FieldShell id={`utm-${name}`} label={f.label} hint={f.hint}>
        <input id={`utm-${name}`} className={s.input} type="text" list={extra?.list} required={f.required} maxLength={f.maxLength} placeholder={f.placeholder} value={raw[name]} onChange={(e) => setRaw({ ...raw, [name]: e.target.value })} />
      </FieldShell>
    );
  };
  const medium = field("medium");

  return (
    <section className={s.workspace} aria-label="Tool">
      <div className={s.form}>
        <div className={s.formGroup}>
          <Tabs full label="Mode" tabs={["Single link", "Bulk mode"]} active={tab} onChange={setTab} />
        </div>
        {tab === 0 ? (
          <form ref={formRef} className={s.formGroup} onSubmit={(e) => e.preventDefault()}>
            {input("url")}
            {input("source", { list: "utm-sources" })}
            <datalist id="utm-sources">
              {UTM_SOURCES.map((x) => (
                <option key={x} value={x} />
              ))}
            </datalist>
            {medium && medium.type === "select" ? (
              <FieldShell id="utm-medium" label={medium.label}>
                <select id="utm-medium" className={s.input} required value={raw.medium} onChange={(e) => setRaw({ ...raw, medium: e.target.value })}>
                  <option value="" disabled>
                    {UTM_MEDIUMS.join(" / ")}
                  </option>
                  {medium.options.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                {raw.medium === CUSTOM ? (
                  <>
                    <input className={s.input} type="text" aria-label="Custom medium" maxLength={100} value={customMedium} onChange={(e) => setCustomMedium(e.target.value)} />
                    <p className={s.warn} role="note">
                      {CUSTOM_WARNING}
                    </p>
                  </>
                ) : null}
              </FieldShell>
            ) : null}
            {input("campaign")}
            {input("content")}
            {input("term")}
            {input("id")}
          </form>
        ) : (
          <BulkMode />
        )}
        {tab === 0 ? (
          <div className={`${s.formGroup} ${s.formActions}`}>
            <div className={s.actions}>
              <button type="button" className={s.ghost} onClick={() => apply(ws.exampleInput)}>
                {ws.secondary}
              </button>
            </div>
            <p className={s.dataNote}>{ws.dataNote}</p>
          </div>
        ) : null}
      </div>

      <div className={s.results} aria-live="polite">
        <p className={s.resultsHead}>{ws.resultsHeading}</p>
        {tab === 1 ? (
          <p className={s.empty}>Bulk results show on the left, ready to download.</p>
        ) : raw.url && !url ? (
          <p className={s.error} role="alert">
            Enter a valid URL, like https://example.com/pricing.
          </p>
        ) : link ? (
          <>
            <p className={s.link}>{link}</p>
            <div className={s.cardActions}>
              <CopyButton text={link} label={ws.button} className={s.primarySmall} onDone={remember} />
              <button type="button" className={s.ghostSmall} onClick={downloadQr}>
                Download QR code
              </button>
            </div>
            <p className={channel === "Unassigned" ? `${s.badge} ${s.badgeWarn}` : s.badge}>Likely GA4 channel: {channel} (estimate)</p>
            {notes.map((n) => (
              <p key={n} className={s.tip}>
                {n}
              </p>
            ))}
            <table className={s.breakdown}>
              <thead>
                <tr>
                  <th scope="col">Parameter</th>
                  <th scope="col">Value</th>
                </tr>
              </thead>
              <tbody>
                {UTM_KEYS.filter((k) => values[k]).map((k) => (
                  <tr key={k}>
                    <td>utm_{k}</td>
                    <td>{values[k]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p className={s.empty}>{ws.emptyState}</p>
        )}
        {history.length && tab === 0 ? (
          <div className={s.history}>
            <p className={s.label}>Recent links</p>
            <ul>
              {history.map((h, i) => (
                <li key={i}>
                  <button type="button" className={s.linkButton} onClick={() => apply(h)}>
                    {[h.source, h.medium, h.campaign].filter(Boolean).join(" / ")}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </section>
  );
}

type BulkRow = { cells: string[]; link: string; channel: string; error: string };

function BulkMode() {
  const [text, setText] = useState("");
  const rows = useMemo<BulkRow[]>(() => {
    const parsed = parseCsv(text);
    if (!parsed.length) return [];
    const header = parsed[0].map((h) => h.trim().toLowerCase());
    const hasHeader = header.includes("url");
    const index = BULK_COLUMNS.map((c, i) => (hasHeader ? header.indexOf(c) : i));
    return (hasHeader ? parsed.slice(1) : parsed).map((r) => {
      const cells = index.map((i) => (i >= 0 ? (r[i] ?? "").trim() : ""));
      const [rawUrl, source, medium, campaign, content] = cells;
      const url = parseUrl(rawUrl);
      const values: UtmValues = { source: normalize(source), medium: normalize(medium), campaign: normalize(campaign), content: normalize(content), term: "", id: "" };
      const error = !url ? "Invalid URL" : !values.source || !values.medium || !values.campaign ? "Source, medium and campaign are required" : "";
      return { cells, link: error || !url ? "" : buildUtmUrl(url, values), channel: error ? "" : likelyChannel(values.source, values.medium), error };
    });
  }, [text]);

  return (
    <div className={s.formGroup}>
      <FieldShell id="utm-bulk" label="Paste a CSV with url, source, medium, campaign and content columns">
        <textarea id="utm-bulk" className={`${s.input} ${s.textarea}`} rows={8} placeholder={"url,source,medium,campaign,content\nhttps://example.com/pricing,linkedin,social,spring_sale,launch_post"} value={text} onChange={(e) => setText(e.target.value)} />
      </FieldShell>
      <FieldShell id="utm-file" label="Or upload a CSV file">
        <input
          id="utm-file"
          type="file"
          accept=".csv,text/csv"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) setText(await file.text());
          }}
        />
      </FieldShell>
      {rows.length ? (
        <>
          <div className={s.tableWrap}>
            <table className={s.breakdown}>
              <thead>
                <tr>
                  <th scope="col">Tagged URL</th>
                  <th scope="col">Likely GA4 channel</th>
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, 50).map((r, i) => (
                  <tr key={i}>
                    <td className={r.error ? s.over : undefined}>{r.error || r.link}</td>
                    <td>{r.channel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={s.actions}>
            <button
              type="button"
              className={s.primarySmall}
              onClick={() => download("tagged-links.csv", toCsv([[...BULK_COLUMNS, "tagged_url", "likely_ga4_channel", "error"], ...rows.map((r) => [...r.cells, r.link, r.channel, r.error])]))}
            >
              Download tagged CSV
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}
