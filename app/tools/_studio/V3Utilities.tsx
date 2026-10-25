"use client";

import qrcode from "qrcode-generator";
import { useEffect, useMemo, useRef, useState } from "react";
import { ETSY_DEFAULTS, buildLlmsTxt, checkLlmsTxt, etsyOffsite, isHttpUrl, reviewLink, shopifyMargin, type LlmsSection } from "@/lib/tools/v3/calc";
import { downloadFile, track } from "@/lib/tools/v3/track";
import { Disclosure, Segmented, StudioField } from "./controls";
import s from "./studio.module.css";

// The four tools that need no AI: two calculators, the review link generator and the llms.txt generator.
// Everything runs in the browser. Nothing is sent anywhere.

const money = (n: number) => `${n < 0 ? "-" : ""}$${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const num = (v: string) => {
  const n = Number(v.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

function NumberField({ id, label, value, onChange, prefix = "$", hint }: { id: string; label: string; value: string; onChange: (v: string) => void; prefix?: string; hint?: string }) {
  return (
    <StudioField id={id} label={label} hint={hint}>
      <div style={{ position: "relative" }}>
        {prefix ? (
          <span aria-hidden style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#6F6B64", pointerEvents: "none" }}>
            {prefix}
          </span>
        ) : null}
        <input id={id} className={s.input} inputMode="decimal" value={value} onChange={(e) => onChange(e.target.value)} style={prefix ? { paddingLeft: prefix.length > 1 ? 34 : 28 } : undefined} />
      </div>
    </StudioField>
  );
}

function Rows({ rows }: { rows: [string, string, ("good" | "bad" | "strong")?][] }) {
  return (
    <table className={s.v2Table}>
      <tbody>
        {rows.map(([k, v, tone]) => (
          <tr key={k}>
            <th scope="row" style={{ fontWeight: tone === "strong" ? 700 : 500 }}>
              {k}
            </th>
            <td style={{ textAlign: "right", fontVariantNumeric: "tabular-nums", fontWeight: tone ? 700 : 400, color: tone === "bad" ? "#A23B2A" : tone === "good" ? "#2F6B3A" : undefined }}>{v}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function useTracked(slug: string, deps: unknown[]) {
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    if (deps.some(Boolean)) {
      done.current = true;
      track("tool_calculate", slug);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

// ---------- Etsy Offsite Ads ----------

export function EtsyOffsiteCalculator() {
  const [v, setV] = useState<Record<string, string>>({ price: "40", shippingCharged: "5", giftWrap: "0", productCost: "12", shippingCost: "5", packaging: "1", otherCosts: "0", transactionPct: String(ETSY_DEFAULTS.transactionPct), listingFee: String(ETSY_DEFAULTS.listingFee), processingPct: String(ETSY_DEFAULTS.processingPct), processingFixed: String(ETSY_DEFAULTS.processingFixed) });
  const [rate, setRate] = useState("15%");
  const set = (k: string) => (x: string) => setV((o) => ({ ...o, [k]: x }));
  const r = useMemo(() => etsyOffsite({ ...Object.fromEntries(Object.entries(v).map(([k, x]) => [k, num(x)])), offsitePct: rate === "12%" ? 12 : 15, offsiteCap: ETSY_DEFAULTS.offsiteCap } as Parameters<typeof etsyOffsite>[0]), [v, rate]);
  useTracked("etsy-offsite-ads-calculator", [v, rate]);
  const id = (k: string) => `etsy-${k}`;

  return (
    <section className={s.tool} aria-label="Etsy Offsite Ads calculator">
      <form className={s.panel} onSubmit={(e) => e.preventDefault()}>
        <div className={s.group}>
          <NumberField id={id("price")} label="Item price" value={v.price} onChange={set("price")} />
          <NumberField id={id("shippingCharged")} label="Shipping you charge the buyer" value={v.shippingCharged} onChange={set("shippingCharged")} />
          <NumberField id={id("productCost")} label="Product cost (materials or production)" value={v.productCost} onChange={set("productCost")} />
          <NumberField id={id("shippingCost")} label="Shipping you pay" value={v.shippingCost} onChange={set("shippingCost")} />
          <StudioField id={id("rate")} label="Your Offsite Ads rate" hint="15% if your shop has never made USD 10,000 in a year on Etsy, 12% if it has." as="group">
            <Segmented id={id("rate")} options={["15%", "12%"]} value={rate} onChange={setRate} />
          </StudioField>
        </div>
        <Disclosure label="More costs and fees">
          <div className={s.group}>
            <NumberField id={id("giftWrap")} label="Gift wrap you charge" value={v.giftWrap} onChange={set("giftWrap")} />
            <NumberField id={id("packaging")} label="Packaging" value={v.packaging} onChange={set("packaging")} />
            <NumberField id={id("otherCosts")} label="Other costs per order" value={v.otherCosts} onChange={set("otherCosts")} />
            <NumberField id={id("transactionPct")} label="Transaction fee" prefix="%" value={v.transactionPct} onChange={set("transactionPct")} />
            <NumberField id={id("listingFee")} label="Listing fee" value={v.listingFee} onChange={set("listingFee")} />
            <NumberField id={id("processingPct")} label="Payment processing rate" prefix="%" value={v.processingPct} onChange={set("processingPct")} hint="Depends on your bank's country. 3% + $0.25 is the US rate." />
            <NumberField id={id("processingFixed")} label="Payment processing fixed fee" value={v.processingFixed} onChange={set("processingFixed")} />
          </div>
        </Disclosure>
        <p className={s.note}>Runs in your browser. Nothing is sent anywhere. Sales tax, VAT and currency conversion aren&apos;t included.</p>
      </form>

      <div className={s.output}>
        <div className={s.result} aria-live="polite">
          <div className={s.resultTop}>
            <span className={s.resultLabel}>Profit on an Offsite Ads order</span>
          </div>
          <p style={{ margin: "4px 0 2px", fontFamily: "var(--nf-general-sans)", fontSize: 40, fontWeight: 600, letterSpacing: "-0.03em", color: r.profit < 0 ? "#A23B2A" : undefined }}>{money(r.profit)}</p>
          <p className={s.note} style={{ marginTop: 0 }}>
            {r.margin}% margin. Without Offsite Ads: {money(r.profitWithoutOffsite)} ({r.marginWithoutOffsite}%).
          </p>
          <Rows
            rows={[
              ["Order total (item, shipping, gift wrap)", money(r.revenue)],
              ["Transaction fee", `-${money(r.transactionFee)}`],
              ["Listing fee", `-${money(r.listingFee)}`],
              ["Payment processing", `-${money(r.processingFee)}`],
              [`Offsite Ads fee${r.offsiteCapped ? " (capped at $100)" : ""}`, `-${money(r.offsiteFee)}`, "bad"],
              ["Product, shipping and other costs", `-${money(r.costs)}`],
              ["Profit", money(r.profit), "strong"],
              ["Break-even item price with Offsite Ads", r.breakEvenPrice === null ? "Not reachable" : money(r.breakEvenPrice)],
              ["Break-even item price without", r.breakEvenPriceWithoutOffsite === null ? "Not reachable" : money(r.breakEvenPriceWithoutOffsite)],
            ]}
          />
          <p className={s.note}>Fees on the order total: transaction {v.transactionPct}%, processing {v.processingPct}% + {money(num(v.processingFixed))}, Offsite Ads {rate} up to $100. Check Etsy&apos;s fee policy for your country.</p>
        </div>
      </div>
    </section>
  );
}

// ---------- Shopify profit margin ----------

export function ShopifyMarginCalculator() {
  const [v, setV] = useState<Record<string, string>>({ price: "40", discountPct: "0", cogs: "12", shipping: "5", packaging: "1", paymentPct: "2.9", paymentFixed: "0.30", adsPerOrder: "6", otherPerOrder: "0", monthlyFixed: "300", monthlyOrders: "200", targetMarginPct: "25" });
  const set = (k: string) => (x: string) => setV((o) => ({ ...o, [k]: x }));
  const r = useMemo(() => shopifyMargin(Object.fromEntries(Object.entries(v).map(([k, x]) => [k, num(x)])) as Parameters<typeof shopifyMargin>[0]), [v]);
  useTracked("shopify-profit-margin-calculator", [v]);
  const id = (k: string) => `shop-${k}`;

  return (
    <section className={s.tool} aria-label="Shopify profit margin calculator">
      <form className={s.panel} onSubmit={(e) => e.preventDefault()}>
        <div className={s.group}>
          <NumberField id={id("price")} label="Selling price" value={v.price} onChange={set("price")} />
          <NumberField id={id("cogs")} label="Cost of goods" value={v.cogs} onChange={set("cogs")} />
          <NumberField id={id("shipping")} label="Shipping cost per order" value={v.shipping} onChange={set("shipping")} />
          <NumberField id={id("adsPerOrder")} label="Ad spend per order" value={v.adsPerOrder} onChange={set("adsPerOrder")} hint="Monthly ad spend divided by orders from ads." />
        </div>
        <Disclosure label="Fees, fixed costs and targets">
          <div className={s.group}>
            <NumberField id={id("discountPct")} label="Discount" prefix="%" value={v.discountPct} onChange={set("discountPct")} />
            <NumberField id={id("packaging")} label="Packaging" value={v.packaging} onChange={set("packaging")} />
            <NumberField id={id("paymentPct")} label="Payment fee rate" prefix="%" value={v.paymentPct} onChange={set("paymentPct")} hint="Use the rate for your plan, country and processor." />
            <NumberField id={id("paymentFixed")} label="Payment fixed fee" value={v.paymentFixed} onChange={set("paymentFixed")} />
            <NumberField id={id("otherPerOrder")} label="Other costs per order" value={v.otherPerOrder} onChange={set("otherPerOrder")} hint="Apps billed per order, returns, inserts." />
            <NumberField id={id("monthlyFixed")} label="Monthly fixed costs" value={v.monthlyFixed} onChange={set("monthlyFixed")} hint="Shopify plan, apps, tools." />
            <NumberField id={id("monthlyOrders")} label="Orders per month" prefix="" value={v.monthlyOrders} onChange={set("monthlyOrders")} />
            <NumberField id={id("targetMarginPct")} label="Target net margin" prefix="%" value={v.targetMarginPct} onChange={set("targetMarginPct")} />
          </div>
        </Disclosure>
        <p className={s.note}>Runs in your browser. Nothing is sent anywhere. Taxes aren&apos;t included.</p>
      </form>

      <div className={s.output}>
        <div className={s.result} aria-live="polite">
          <div className={s.resultTop}>
            <span className={s.resultLabel}>Net profit per order</span>
          </div>
          <p style={{ margin: "4px 0 2px", fontFamily: "var(--nf-general-sans)", fontSize: 40, fontWeight: 600, letterSpacing: "-0.03em", color: r.netProfit < 0 ? "#A23B2A" : undefined }}>{money(r.netProfit)}</p>
          <p className={s.note} style={{ marginTop: 0 }}>
            {r.netMargin}% net margin. About {money(r.monthlyNet)} a month at {v.monthlyOrders || 0} orders.
          </p>
          <Rows
            rows={[
              ["Revenue per order", money(r.revenue)],
              ["Gross profit (revenue minus cost of goods)", money(r.grossProfit)],
              ["Gross margin", `${r.grossMargin}%`],
              ["Markup on cost of goods", r.markup === null ? "Add a cost of goods" : `${r.markup}%`],
              ["Payment fees", `-${money(r.paymentFee)}`],
              ["Fixed costs per order", `-${money(r.fixedPerOrder)}`],
              ["Total cost per order", money(r.totalCostPerOrder)],
              ["Net profit", money(r.netProfit), "strong"],
              ["Break-even price", r.breakEvenPrice === null ? "Not reachable" : money(r.breakEvenPrice)],
              [`Price for a ${v.targetMarginPct || 0}% net margin`, r.targetPrice === null ? "Not reachable" : money(r.targetPrice), "good"],
            ]}
          />
          <p className={s.note}>Gross margin only counts the product cost. Net margin counts every cost per order, including shipping, fees, ads and a share of your fixed costs.</p>
        </div>
      </div>
    </section>
  );
}

// ---------- Google review link ----------

export function GoogleReviewLinkTool() {
  const [raw, setRaw] = useState("");
  const [business, setBusiness] = useState("");
  const [copied, setCopied] = useState(false);
  const res = raw.trim() ? reviewLink(raw) : null;
  const svg = useMemo(() => {
    if (!res?.ok) return "";
    const qr = qrcode(0, "M");
    qr.addData(res.url);
    qr.make();
    return qr.createSvgTag({ cellSize: 8, margin: 4, scalable: true });
  }, [res?.ok, res && res.ok ? res.url : ""]); // eslint-disable-line react-hooks/exhaustive-deps

  const downloadPng = () => {
    if (!res?.ok) return;
    const img = new Image();
    img.onload = () => {
      const size = 1024;
      const c = document.createElement("canvas");
      c.width = c.height = size;
      const ctx = c.getContext("2d")!;
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      const a = document.createElement("a");
      a.href = c.toDataURL("image/png");
      a.download = `${(business || "google-review").toLowerCase().replace(/[^a-z0-9]+/g, "-")}-qr.png`;
      a.click();
      track("tool_download", "google-review-link-generator");
    };
    img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  };

  return (
    <section className={s.tool} aria-label="Google review link generator">
      <form className={s.panel} onSubmit={(e) => e.preventDefault()}>
        <div className={s.group}>
          <StudioField id="rl-input" label="Your review link or Place ID" hint={'From Google Business Profile: "Ask for reviews" (or "Get more reviews"), then copy the link. Or paste a Place ID that starts with ChIJ.'}>
            <input id="rl-input" className={s.input} value={raw} onChange={(e) => setRaw(e.target.value)} placeholder="https://g.page/r/... or ChIJ..." />
          </StudioField>
          <StudioField id="rl-name" label="Business name (optional, for the QR file name)">
            <input id="rl-name" className={s.input} value={business} onChange={(e) => setBusiness(e.target.value)} maxLength={80} />
          </StudioField>
        </div>
        <p className={s.note}>Runs in your browser. Nothing is sent anywhere. We never guess a Place ID from a business name.</p>
      </form>
      <div className={s.output}>
        {!res ? (
          <p className={s.draftNote} style={{ margin: "24px auto" }}>
            Your direct review link and QR code show up here.
          </p>
        ) : !res.ok ? (
          <div className={s.error} role="alert">
            <p>{res.error}</p>
          </div>
        ) : (
          <div className={s.result} aria-live="polite">
            <span className={s.resultLabel}>Your review link</span>
            <p className={s.resultText} style={{ fontFamily: "ui-monospace, Menlo, Consolas, monospace", fontSize: 14, wordBreak: "break-all" }}>
              {res.url}
            </p>
            {/* The QR code is generated locally from the link above. */}
            <div style={{ width: 200, margin: "12px 0", border: "1px solid #DDDAD3", borderRadius: 12, overflow: "hidden", background: "#fff" }} dangerouslySetInnerHTML={{ __html: svg }} role="img" aria-label="QR code for the review link" />
            <div className={s.resultActions}>
              <button
                type="button"
                className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`}
                onClick={async () => {
                  await navigator.clipboard.writeText(res.url).catch(() => undefined);
                  setCopied(true);
                  track("tool_copy", "google-review-link-generator");
                  setTimeout(() => setCopied(false), 1800);
                }}
              >
                {copied ? "Copied" : "Copy link"}
              </button>
              <a href={res.url} target="_blank" rel="noreferrer" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`}>
                Test the link
              </a>
              <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnSm}`} onClick={downloadPng}>
                Download QR code
              </button>
            </div>
            <p className={s.note}>Test it while signed in to a Google account: it should open the review box for your business. Ask every customer the same way, and never offer anything in exchange for a review.</p>
          </div>
        )}
      </div>
    </section>
  );
}

// ---------- llms.txt ----------

const blankSection = (): LlmsSection => ({ title: "", links: [{ title: "", url: "" }] });

export function LlmsTxtTool() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");
  const [sections, setSections] = useState<LlmsSection[]>([{ title: "Docs", links: [{ title: "", url: "" }] }]);
  const [copied, setCopied] = useState(false);

  const md = useMemo(() => (name.trim() ? buildLlmsTxt({ name, url, summary, details, sections }) : ""), [name, url, summary, details, sections]);
  const problems = useMemo(() => {
    const list: string[] = [];
    if (url.trim() && !isHttpUrl(url.trim())) list.push("The website URL should start with https://.");
    sections.forEach((sec) => sec.links.forEach((l) => l.url.trim() && !isHttpUrl(l.url.trim()) && list.push(`"${l.url}" isn't a full https URL.`)));
    return md ? [...list, ...checkLlmsTxt(md)] : list;
  }, [md, url, sections]);

  const updateLink = (si: number, li: number, key: "title" | "url" | "note", val: string) =>
    setSections((all) => all.map((sec, i) => (i === si ? { ...sec, links: sec.links.map((l, j) => (j === li ? { ...l, [key]: val } : l)) } : sec)));

  const example = () => {
    setName("Acme Garden Supply");
    setUrl("https://acmegarden.com");
    setSummary("Acme Garden Supply sells organic seeds, soil and tools, and publishes growing guides for home gardeners.");
    setDetails("Prices are in USD. We ship within the US only.");
    setSections([
      { title: "Guides", links: [{ title: "Growing tomatoes", url: "https://acmegarden.com/guides/tomatoes", note: "Step by step for beginners" }, { title: "Soil basics", url: "https://acmegarden.com/guides/soil" }] },
      { title: "Shop", links: [{ title: "Seeds", url: "https://acmegarden.com/seeds", note: "Every seed we sell" }] },
      { title: "Optional", links: [{ title: "About us", url: "https://acmegarden.com/about" }] },
    ]);
  };

  return (
    <section className={s.tool} aria-label="llms.txt generator">
      <form className={s.panel} onSubmit={(e) => e.preventDefault()}>
        <div className={s.group}>
          <StudioField id="llms-name" label="Website name">
            <input id="llms-name" className={s.input} value={name} onChange={(e) => setName(e.target.value)} maxLength={100} placeholder="e.g. Acme Garden Supply" />
          </StudioField>
          <StudioField id="llms-url" label="Website URL">
            <input id="llms-url" className={s.input} value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" />
          </StudioField>
          <StudioField id="llms-summary" label="Short description" hint="One or two sentences. It becomes the summary line under the title.">
            <textarea id="llms-summary" className={`${s.input} ${s.textarea}`} rows={2} maxLength={400} value={summary} onChange={(e) => setSummary(e.target.value)} />
          </StudioField>
        </div>
        {sections.map((sec, si) => (
          <fieldset key={si} className={s.group} style={{ border: "1px solid #DDDAD3", borderRadius: 14, padding: 14, margin: "12px 0 0" }}>
            <legend className={s.label} style={{ padding: "0 6px" }}>
              Section {si + 1}
            </legend>
            <StudioField id={`llms-sec-${si}`} label="Section title" hint={'Use "Optional" for pages that can be skipped.'}>
              <input id={`llms-sec-${si}`} className={s.input} value={sec.title} onChange={(e) => setSections((all) => all.map((x, i) => (i === si ? { ...x, title: e.target.value } : x)))} />
            </StudioField>
            {sec.links.map((l, li) => (
              <div key={li} style={{ display: "grid", gap: 8, gridTemplateColumns: "1fr", padding: "8px 0", borderTop: li ? "1px solid #EEE9E0" : undefined }}>
                <input aria-label={`Section ${si + 1} link ${li + 1} title`} className={s.input} placeholder="Page title" value={l.title} onChange={(e) => updateLink(si, li, "title", e.target.value)} />
                <input aria-label={`Section ${si + 1} link ${li + 1} URL`} className={s.input} placeholder="https://example.com/page" value={l.url} onChange={(e) => updateLink(si, li, "url", e.target.value)} />
                <input aria-label={`Section ${si + 1} link ${li + 1} note`} className={s.input} placeholder="Short note (optional)" value={l.note ?? ""} onChange={(e) => updateLink(si, li, "note", e.target.value)} />
              </div>
            ))}
            <div className={s.v2Chips}>
              <button type="button" className={s.v2Chip} onClick={() => setSections((all) => all.map((x, i) => (i === si ? { ...x, links: [...x.links, { title: "", url: "" }] } : x)))}>
                Add a page
              </button>
              {sections.length > 1 ? (
                <button type="button" className={s.v2Chip} onClick={() => setSections((all) => all.filter((_, i) => i !== si))}>
                  Remove section
                </button>
              ) : null}
            </div>
          </fieldset>
        ))}
        <div className={s.actions}>
          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnLg}`} onClick={() => setSections((all) => [...all, blankSection()])}>
            Add a section
          </button>
          <button type="button" className={`${s.btn} ${s.btnGhost} ${s.btnLg}`} onClick={example}>
            Try an example
          </button>
        </div>
        <Disclosure label="Extra details (optional)">
          <StudioField id="llms-details" label="Details" hint="Plain text that helps a reader understand the site. No headings.">
            <textarea id="llms-details" className={`${s.input} ${s.textarea}`} rows={3} maxLength={1500} value={details} onChange={(e) => setDetails(e.target.value)} />
          </StudioField>
        </Disclosure>
        <p className={s.note}>Runs in your browser. Nothing is sent anywhere.</p>
      </form>

      <div className={s.output}>
        {!md ? (
          <p className={s.draftNote} style={{ margin: "24px auto" }}>
            Add your website name to start. Your llms.txt builds here as you type.
          </p>
        ) : (
          <div className={s.result}>
            <div className={s.resultTop}>
              <span className={s.resultLabel}>llms.txt</span>
              <span className={problems.length ? `${s.count} ${s.countOver}` : s.count}>{problems.length ? `${problems.length} to fix` : "Format looks right"}</span>
            </div>
            <pre style={{ margin: 0, padding: 14, maxHeight: 420, overflow: "auto", background: "#F8F6F4", border: "1px solid #DDDAD3", borderRadius: 12, fontSize: 13.5, lineHeight: 1.55, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{md}</pre>
            {problems.length ? (
              <ul className={s.note} style={{ color: "#A23B2A", paddingLeft: 18 }}>
                {problems.slice(0, 6).map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            ) : null}
            <div className={s.resultActions}>
              <button
                type="button"
                className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`}
                onClick={async () => {
                  await navigator.clipboard.writeText(md).catch(() => undefined);
                  setCopied(true);
                  track("tool_copy", "llms-txt-generator");
                  setTimeout(() => setCopied(false), 1800);
                }}
              >
                {copied ? "Copied" : "Copy"}
              </button>
              <button
                type="button"
                className={`${s.btn} ${s.btnGhost} ${s.btnSm}`}
                onClick={() => {
                  downloadFile("llms.txt", md);
                  track("tool_download", "llms-txt-generator");
                }}
              >
                Download llms.txt
              </button>
            </div>
            <p className={s.note}>Upload it to the root of your site so it opens at {url.trim() && isHttpUrl(url.trim()) ? `${new URL(url.trim()).origin}/llms.txt` : "https://yoursite.com/llms.txt"}. It&apos;s optional, and Google Search doesn&apos;t use it.</p>
          </div>
        )}
      </div>
    </section>
  );
}
