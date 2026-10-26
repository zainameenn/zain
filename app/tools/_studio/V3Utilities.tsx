"use client";

import qrcode from "qrcode-generator";
import { useEffect, useMemo, useRef, useState } from "react";
import { ETSY_DEFAULTS, ETSY_FEE_RULES_REVIEWED_AT, ETSY_PROCESSING, buildLlmsTxt, cac, checkLlmsTxt, etsyOffsite, isHttpUrl, reviewLink, shopifyMargin, type LlmsSection } from "@/lib/tools/v3/calc";
import { testRobots } from "@/lib/tools/v3/robots";
import { csvCell, downloadFile, track } from "@/lib/tools/v3/track";
import { Disclosure, Segmented, Select, StudioField } from "./controls";
import s from "./studio.module.css";

// The four tools that need no AI: two calculators, the review link generator and the llms.txt generator.
// Everything runs in the browser. Nothing is sent anywhere.

const money = (n: number) => `${n < 0 ? "-" : ""}$${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
export const num = (v: string) => {
  const n = Number(v.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? n : 0;
};

export function NumberField({ id, label, value, onChange, prefix = "$", hint }: { id: string; label: string; value: string; onChange: (v: string) => void; prefix?: string; hint?: string }) {
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

export function Rows({ rows }: { rows: [string, string, ("good" | "bad" | "strong")?][] }) {
  return (
    <table className={s.v2Table}>
      <tbody>
        {rows.map(([k, v, tone]) => (
          <tr key={k}>
            <th scope="row" style={{ fontWeight: tone === "strong" ? 700 : 500, whiteSpace: "normal" }}>
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

// ---------- Etsy fee calculator ----------

const OTHER_COUNTRY = "Other country (enter your rates)";

export function EtsyFeeCalculator() {
  const [country, setCountry] = useState("United States");
  const preset = ETSY_PROCESSING.find((p) => p.country === country);
  const [international, setInternational] = useState("Domestic");
  const [v, setV] = useState<Record<string, string>>({ price: "30", shippingCharged: "5", productCost: "9", shippingCost: "4", giftWrap: "0", packaging: "0", otherCosts: "0", adsPerOrder: "0", transactionPct: String(ETSY_DEFAULTS.transactionPct), listingFee: String(ETSY_DEFAULTS.listingFee), processingPct: "3", processingFixed: "0.25" });
  const [offsite, setOffsite] = useState("No");
  const [rate, setRate] = useState("15%");
  const [includeListing, setIncludeListing] = useState("Yes");
  const [copied, setCopied] = useState(false);
  const set = (k: string) => (x: string) => setV((o) => ({ ...o, [k]: x }));

  // Picking a confirmed country fills its processing rate. Every rate stays editable.
  const applyPreset = (c: string, where: string) => {
    const p = ETSY_PROCESSING.find((x) => x.country === c);
    if (!p) return;
    const pct = where === "International" && p.intlPct ? p.intlPct : p.pct;
    setV((o) => ({ ...o, processingPct: String(pct), processingFixed: String(p.fixed) }));
  };

  const sym = preset?.symbol ?? "";
  const cur = (n: number) => `${n < 0 ? "-" : ""}${sym}${Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const r = useMemo(
    () =>
      etsyOffsite({
        price: num(v.price),
        shippingCharged: num(v.shippingCharged),
        giftWrap: num(v.giftWrap),
        productCost: num(v.productCost),
        shippingCost: num(v.shippingCost),
        packaging: num(v.packaging),
        otherCosts: num(v.otherCosts) + num(v.adsPerOrder),
        transactionPct: num(v.transactionPct),
        listingFee: includeListing === "Yes" ? num(v.listingFee) : 0,
        processingPct: num(v.processingPct),
        processingFixed: num(v.processingFixed),
        offsitePct: offsite === "Yes" ? (rate === "12%" ? 12 : 15) : 0,
        offsiteCap: ETSY_DEFAULTS.offsiteCap,
      }),
    [v, offsite, rate, includeListing],
  );
  useTracked("etsy-fee-calculator", [v, offsite, country]);
  const id = (k: string) => `ef-${k}`;
  const etsyFees = r.transactionFee + r.listingFee + r.processingFee + r.offsiteFee;
  const rows: [string, string, ("good" | "bad" | "strong")?][] = [
    ["Order revenue (item, shipping, gift wrap)", cur(r.revenue)],
    [`Transaction fee (${v.transactionPct}%)`, `-${cur(r.transactionFee)}`],
    ["Listing fee", includeListing === "Yes" ? `-${cur(r.listingFee)}` : "Not included"],
    [`Payment processing (${v.processingPct}% + ${cur(num(v.processingFixed))})`, `-${cur(r.processingFee)}`],
    ...(offsite === "Yes" ? ([[`Offsite Ads (${rate}${r.offsiteCapped ? ", capped" : ""})`, `-${cur(r.offsiteFee)}`, "bad"]] as [string, string, "bad"][]) : []),
    ["Total Etsy fees", `-${cur(etsyFees)}`],
    ["Your costs (product, shipping, packaging, other)", `-${cur(r.costs)}`],
    ["Estimated profit", cur(r.profit), "strong"],
    ["Break-even item price", r.breakEvenPrice === null ? "Not reachable" : cur(r.breakEvenPrice)],
  ];
  const summary = rows.map(([k, x]) => `${k}: ${x}`).join("\n") + `\nEstimated margin: ${r.margin}%`;

  return (
    <section className={s.tool} aria-label="Etsy fee calculator">
      <form className={s.panel} onSubmit={(e) => e.preventDefault()}>
        <div className={s.group}>
          <StudioField id={id("country")} label="Seller country (your bank account)">
            <Select
              id={id("country")}
              options={[...ETSY_PROCESSING.map((p) => p.country), OTHER_COUNTRY]}
              value={country}
              onChange={(c) => {
                setCountry(c);
                setInternational("Domestic");
                applyPreset(c, "Domestic");
              }}
            />
          </StudioField>
          {preset?.intlPct ? (
            <StudioField id={id("intl")} label="Where is the buyer?" as="group">
              <Segmented
                id={id("intl")}
                options={["Domestic", "International"]}
                value={international}
                onChange={(w) => {
                  setInternational(w);
                  applyPreset(country, w);
                }}
              />
            </StudioField>
          ) : null}
          <NumberField id={id("price")} label="Item selling price" prefix={sym} value={v.price} onChange={set("price")} />
          <NumberField id={id("shippingCharged")} label="Shipping charged to buyer" prefix={sym} value={v.shippingCharged} onChange={set("shippingCharged")} />
          <NumberField id={id("productCost")} label="Product cost" prefix={sym} value={v.productCost} onChange={set("productCost")} />
          <NumberField id={id("shippingCost")} label="Shipping you pay" prefix={sym} value={v.shippingCost} onChange={set("shippingCost")} />
          <StudioField id={id("offsite")} label="Did this order come from Offsite Ads?" as="group">
            <Segmented id={id("offsite")} options={["No", "Yes"]} value={offsite} onChange={setOffsite} />
          </StudioField>
          {offsite === "Yes" ? (
            <StudioField id={id("rate")} label="Your Offsite Ads rate" hint="15% until your shop makes USD 10,000 in a year, then 12%. Capped at USD 100 per order." as="group">
              <Segmented id={id("rate")} options={["15%", "12%"]} value={rate} onChange={setRate} />
            </StudioField>
          ) : null}
        </div>
        <Disclosure label="More options">
          <div className={s.group}>
            <NumberField id={id("giftWrap")} label="Gift wrap charged" prefix={sym} value={v.giftWrap} onChange={set("giftWrap")} />
            <NumberField id={id("packaging")} label="Packaging" prefix={sym} value={v.packaging} onChange={set("packaging")} />
            <NumberField id={id("otherCosts")} label="Other costs per order" prefix={sym} value={v.otherCosts} onChange={set("otherCosts")} />
            <NumberField id={id("adsPerOrder")} label="Etsy Ads spend per order" prefix={sym} value={v.adsPerOrder} onChange={set("adsPerOrder")} hint="Your Etsy Ads budget divided by the orders it brought in." />
            <StudioField id={id("listing")} label="Count a listing fee for this sale?" hint="Etsy charges USD 0.20 when you list, and again when a sale auto renews the listing." as="group">
              <Segmented id={id("listing")} options={["Yes", "No"]} value={includeListing} onChange={setIncludeListing} />
            </StudioField>
            <NumberField id={id("listingFee")} label="Listing fee (in your currency)" prefix={sym} value={v.listingFee} onChange={set("listingFee")} />
            <NumberField id={id("transactionPct")} label="Transaction fee" prefix="%" value={v.transactionPct} onChange={set("transactionPct")} />
            <NumberField id={id("processingPct")} label="Payment processing rate" prefix="%" value={v.processingPct} onChange={set("processingPct")} hint={preset ? `Filled in from Etsy's published rate for ${country}.` : "Find your rate on Etsy's payment processing fees page."} />
            <NumberField id={id("processingFixed")} label="Payment processing fixed fee" prefix={sym} value={v.processingFixed} onChange={set("processingFixed")} />
          </div>
        </Disclosure>
        <p className={s.note}>Runs in your browser. Single item order. Sales tax, VAT on fees, regulatory fees and currency conversion aren&apos;t included. Rates checked {ETSY_FEE_RULES_REVIEWED_AT}; verify final charges in your Etsy Payment account.</p>
      </form>
      <div className={s.output}>
        <div className={s.result} aria-live="polite">
          <span className={s.resultLabel}>Estimated profit per order</span>
          <p style={{ margin: "4px 0 2px", fontFamily: "var(--nf-general-sans)", fontSize: 40, fontWeight: 600, letterSpacing: "-0.03em", color: r.profit < 0 ? "#A23B2A" : undefined }}>{cur(r.profit)}</p>
          <p className={s.note} style={{ marginTop: 0 }}>
            {r.margin}% estimated margin.{offsite === "Yes" ? ` Without Offsite Ads: ${cur(r.profitWithoutOffsite)}.` : ""}
          </p>
          <Rows rows={rows} />
          <p className={s.note}>Estimated profit = order revenue minus Etsy fees minus the costs you entered. Margin = profit divided by order revenue.</p>
          <div className={s.resultActions}>
            <button
              type="button"
              className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`}
              onClick={async () => {
                await navigator.clipboard.writeText(summary).catch(() => undefined);
                setCopied(true);
                track("tool_copy", "etsy-fee-calculator");
                setTimeout(() => setCopied(false), 1800);
              }}
            >
              {copied ? "Copied" : "Copy summary"}
            </button>
            <button
              type="button"
              className={`${s.btn} ${s.btnGhost} ${s.btnSm}`}
              onClick={() => {
                downloadFile("etsy-fees.csv", ["Line,Amount", ...rows.map(([k, x]) => [k, x].map(csvCell).join(","))].join("\n"), "text/csv");
                track("tool_download", "etsy-fee-calculator");
              }}
            >
              Download CSV
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---------- Customer acquisition cost ----------

const CAC_BREAKDOWN: [string, "marketing" | "sales"][] = [
  ["Paid advertising", "marketing"],
  ["Content and creative", "marketing"],
  ["Marketing tools", "marketing"],
  ["Agencies and contractors", "marketing"],
  ["Marketing salaries (acquisition share)", "marketing"],
  ["Sales salaries and commissions", "sales"],
  ["Sales tools", "sales"],
  ["Other acquisition costs", "marketing"],
];
const CURRENCIES: Record<string, string> = { USD: "$", EUR: "€", GBP: "£", CAD: "$", AUD: "$", INR: "₹", PKR: "Rs " };

export function CacCalculator() {
  const [currency, setCurrency] = useState("USD");
  const [period, setPeriod] = useState("Month");
  const [v, setV] = useState<Record<string, string>>({ marketing: "2000", sales: "1000", customers: "30", ltv: "" });
  const [parts, setParts] = useState<Record<string, string>>({});
  const set = (k: string) => (x: string) => setV((o) => ({ ...o, [k]: x }));
  const sym = CURRENCIES[currency];
  // When a breakdown is filled in, its totals replace the two main fields, so nothing is counted twice.
  const usingBreakdown = Object.values(parts).some((x) => num(x) > 0);
  const marketing = usingBreakdown ? CAC_BREAKDOWN.filter(([, t]) => t === "marketing").reduce((n, [k]) => n + num(parts[k] ?? ""), 0) : num(v.marketing);
  const sales = usingBreakdown ? CAC_BREAKDOWN.filter(([, t]) => t === "sales").reduce((n, [k]) => n + num(parts[k] ?? ""), 0) : num(v.sales);
  const customers = Math.floor(num(v.customers));
  const r = cac({ marketing, sales, customers, ltv: num(v.ltv) || undefined });
  useTracked("customer-acquisition-cost-calculator", [v, parts]);
  const cur = (n: number) => `${sym}${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const id = (k: string) => `cac-${k}`;

  return (
    <section className={s.tool} aria-label="Customer acquisition cost calculator">
      <form className={s.panel} onSubmit={(e) => e.preventDefault()}>
        <div className={s.group}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <StudioField id={id("currency")} label="Currency">
              <Select id={id("currency")} options={Object.keys(CURRENCIES)} value={currency} onChange={setCurrency} />
            </StudioField>
            <StudioField id={id("period")} label="Period">
              <Select id={id("period")} options={["Month", "Quarter", "Year"]} value={period} onChange={setPeriod} />
            </StudioField>
          </div>
          {usingBreakdown ? (
            <p className={s.note}>Using your breakdown below: marketing {cur(marketing)}, sales {cur(sales)}.</p>
          ) : (
            <>
              <NumberField id={id("marketing")} label={`Marketing costs this ${period.toLowerCase()}`} prefix={sym} value={v.marketing} onChange={set("marketing")} />
              <NumberField id={id("sales")} label={`Sales costs this ${period.toLowerCase()}`} prefix={sym} value={v.sales} onChange={set("sales")} />
            </>
          )}
          <NumberField id={id("customers")} label={`New customers this ${period.toLowerCase()}`} prefix="" value={v.customers} onChange={set("customers")} />
        </div>
        <Disclosure label="Cost breakdown and LTV (optional)">
          <div className={s.group}>
            <p className={s.note} style={{ margin: 0 }}>Fill these in instead of the two totals above. Leave them empty to use the totals.</p>
            {CAC_BREAKDOWN.map(([k]) => (
              <NumberField key={k} id={id(k.replace(/\W+/g, "-").toLowerCase())} label={k} prefix={sym} value={parts[k] ?? ""} onChange={(x) => setParts((o) => ({ ...o, [k]: x }))} />
            ))}
            <NumberField id={id("ltv")} label="Customer lifetime value (gross profit), if you know it" prefix={sym} value={v.ltv} onChange={set("ltv")} hint="Only fill this in if you've worked it out from real retention and margin data." />
          </div>
        </Disclosure>
        <p className={s.note}>Runs in your browser. Nothing is sent anywhere.</p>
      </form>
      <div className={s.output}>
        <div className={s.result} aria-live="polite">
          <span className={s.resultLabel}>Customer acquisition cost</span>
          <p style={{ margin: "4px 0 2px", fontFamily: "var(--nf-general-sans)", fontSize: 40, fontWeight: 600, letterSpacing: "-0.03em" }}>{r.cac === null ? "No customers acquired" : cur(r.cac)}</p>
          <p className={s.note} style={{ marginTop: 0 }}>
            {r.cac === null ? `You spent ${cur(r.total)} with no new customers, so CAC can't be calculated.` : `Blended CAC for one ${period.toLowerCase()}.`}
          </p>
          <Rows
            rows={[
              ["Marketing costs", cur(marketing)],
              ["Sales costs", cur(sales)],
              ["Total acquisition costs", cur(r.total), "strong"],
              ["New customers", customers.toLocaleString("en-US")],
              ["Marketing share", `${r.marketingShare}%`],
              ["Sales share", `${r.salesShare}%`],
              ...(r.ltvToCac !== null ? ([["LTV to CAC", `${r.ltvToCac} : 1`, "good"]] as [string, string, "good"][]) : []),
            ]}
          />
          <p className={s.note}>
            CAC = ({cur(marketing)} + {cur(sales)}) ÷ {customers || 0}
            {r.cac !== null ? ` = ${cur(r.cac)}` : ""}. It&apos;s an average across every channel, not the cost of any one customer.
          </p>
        </div>
      </div>
    </section>
  );
}

// ---------- Robots.txt tester ----------

const CRAWLERS = ["Googlebot", "Googlebot-Image", "Bingbot", "GPTBot", "ClaudeBot", "PerplexityBot", "Custom"];

export function RobotsTxtTester() {
  const [text, setText] = useState("");
  const [crawler, setCrawler] = useState("Googlebot");
  const [custom, setCustom] = useState("");
  const [path, setPath] = useState("");
  const [copied, setCopied] = useState(false);
  const agent = crawler === "Custom" ? custom.trim() || "*" : crawler;
  const report = useMemo(() => (text.trim() && path.trim() ? testRobots(text, agent, path) : null), [text, agent, path]);
  useTracked("robots-txt-tester", [report?.decision]);

  return (
    <section className={s.tool} aria-label="Robots.txt tester">
      <form className={s.panel} onSubmit={(e) => e.preventDefault()}>
        <div className={s.group}>
          <StudioField id="rt-text" label="Robots.txt content" hint="Copy it from yoursite.com/robots.txt and paste it here.">
            <textarea id="rt-text" className={`${s.input} ${s.textarea}`} rows={9} value={text} onChange={(e) => setText(e.target.value)} placeholder={"User-agent: *\nDisallow: /private/"} spellCheck={false} style={{ fontFamily: "ui-monospace, Menlo, Consolas, monospace", fontSize: 14 }} />
          </StudioField>
          <StudioField id="rt-path" label="URL or path to test">
            <input id="rt-path" className={s.input} value={path} onChange={(e) => setPath(e.target.value)} placeholder="/private/report/ or https://example.com/page" />
          </StudioField>
          <StudioField id="rt-crawler" label="Crawler">
            <Select id="rt-crawler" options={CRAWLERS} value={crawler} onChange={setCrawler} />
          </StudioField>
          {crawler === "Custom" ? (
            <StudioField id="rt-custom" label="Custom user agent token">
              <input id="rt-custom" className={s.input} value={custom} onChange={(e) => setCustom(e.target.value)} placeholder="e.g. AhrefsBot" />
            </StudioField>
          ) : null}
        </div>
        <div className={s.actions}>
          <button
            type="button"
            className={`${s.btn} ${s.btnGhost} ${s.btnLg}`}
            onClick={() => {
              setText("User-agent: *\nDisallow: /drafts/\nAllow: /drafts/public/\n\nUser-agent: GPTBot\nDisallow: /\n\nSitemap: https://example.com/sitemap.xml");
              setPath("/drafts/public/guide");
            }}
          >
            Try an example
          </button>
        </div>
        <p className={s.note}>Runs in your browser. This checks the rules you paste, not a live crawl, and says nothing about indexing or rankings.</p>
      </form>
      <div className={s.output}>
        {!report ? (
          <p className={s.draftNote} style={{ margin: "24px auto" }}>
            Paste your robots.txt and a URL to see whether that crawler may request it.
          </p>
        ) : (
          <div className={s.result} aria-live="polite">
            <span className={s.resultLabel}>Result for {agent}</span>
            <p style={{ margin: "4px 0 6px", fontFamily: "var(--nf-general-sans)", fontSize: 36, fontWeight: 600, letterSpacing: "-0.03em", color: report.decision === "allowed" ? "#2F6B3A" : "#A23B2A" }}>{report.decision === "allowed" ? "Allowed" : "Disallowed"}</p>
            <p className={s.resultText} style={{ margin: 0 }}>{report.explanation}</p>
            {report.matched ? (
              <p className={s.note}>
                Matched rule: <code>{report.matched.text}</code> (line {report.matched.line})
              </p>
            ) : null}
            {report.sitemaps.length ? <p className={s.note}>Sitemaps listed: {report.sitemaps.join(", ")}</p> : null}
            {report.warnings.length ? (
              <ul className={s.note} style={{ color: "#7D6039", paddingLeft: 18 }}>
                {report.warnings.slice(0, 8).map((w) => (
                  <li key={w}>{w}</li>
                ))}
              </ul>
            ) : null}
            <div className={s.resultActions}>
              <button
                type="button"
                className={`${s.btn} ${s.btnPrimary} ${s.btnSm}`}
                onClick={async () => {
                  await navigator.clipboard.writeText(`${agent} ${path}: ${report.decision}\n${report.explanation}${report.warnings.length ? `\nWarnings:\n${report.warnings.join("\n")}` : ""}`).catch(() => undefined);
                  setCopied(true);
                  track("tool_copy", "robots-txt-tester");
                  setTimeout(() => setCopied(false), 1800);
                }}
              >
                {copied ? "Copied" : "Copy report"}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

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
