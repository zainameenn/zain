import assert from "node:assert/strict";
import { test } from "node:test";
import { ETSY_DEFAULTS, buildLlmsTxt, checkLlmsTxt, etsyOffsite, reviewLink, shopifyMargin } from "../lib/tools/v3/calc";
import { SPECS, cleanInput, parseKeywords } from "../lib/tools/v3/specs";

// Calculator cases worked out by hand. Run with: npm test

const etsyBase = { price: 40, shippingCharged: 5, giftWrap: 0, productCost: 12, shippingCost: 5, packaging: 1, otherCosts: 0, transactionPct: 6.5, listingFee: 0.2, processingPct: 3, processingFixed: 0.25, offsitePct: 15, offsiteCap: 100 };

test("Etsy Offsite Ads: fees on the order total, matches a hand calculation", () => {
  const r = etsyOffsite(etsyBase);
  // revenue 45; transaction 2.925; processing 1.35 + 0.25 = 1.60; offsite 6.75; costs 18; listing 0.20
  assert.equal(r.revenue, 45);
  assert.equal(r.transactionFee, 2.93);
  assert.equal(r.processingFee, 1.6);
  assert.equal(r.offsiteFee, 6.75);
  assert.equal(r.profitWithoutOffsite, 22.28); // 45 - 2.925 - 0.2 - 1.6 - 18 = 22.275
  assert.ok(Math.abs(r.profit - 15.525) < 0.006); // 22.275 - 6.75, half a cent rounds either way in floating point
  assert.equal(r.margin, 34.5);
  // Break even: 18.45 / (1 - 0.245) = 24.437 order total, minus 5 shipping
  assert.equal(r.breakEvenPrice, 19.44);
});

test("Etsy Offsite Ads: the 100 cap applies on big orders, including at break even", () => {
  const r = etsyOffsite({ ...etsyBase, price: 1000, shippingCharged: 0, productCost: 900, shippingCost: 0, packaging: 0, offsitePct: 12 });
  assert.equal(r.offsiteFee, 100);
  assert.equal(r.offsiteCapped, true);
  // Fixed costs 900.45. Uncapped: 900.45 / 0.785 = 1147.07, a fee of 137.65 > 100, so the cap applies: 1000.45 / 0.905
  assert.equal(r.breakEvenPrice, 1105.47);
  assert.equal(ETSY_DEFAULTS.offsiteCap, 100);
});

test("Shopify margin: gross, net, markup and break even", () => {
  const r = shopifyMargin({ price: 50, discountPct: 10, cogs: 15, shipping: 6, packaging: 1, paymentPct: 2.9, paymentFixed: 0.3, adsPerOrder: 8, otherPerOrder: 0, monthlyFixed: 300, monthlyOrders: 100, targetMarginPct: 20 });
  // revenue 45; payment 1.305 + 0.3 = 1.605; fixed per order 3; total cost 15+6+1+1.605+8+3 = 34.605
  assert.equal(r.revenue, 45);
  assert.equal(r.paymentFee, 1.61);
  assert.equal(r.grossProfit, 30);
  assert.equal(r.grossMargin, 66.67);
  assert.ok(Math.abs(r.totalCostPerOrder - 34.605) < 0.006);
  assert.equal(r.netProfit, 10.4); // 45 - 34.605 = 10.395
  assert.equal(r.markup, 200);
  // Break even revenue = 33.3 / 0.971 = 34.295; list price = / 0.9 = 38.105
  assert.equal(r.breakEvenPrice, 38.11);
  // 20% target: 33.3 / 0.771 / 0.9 = 47.99
  assert.equal(r.targetPrice, 47.99);
});

test("Google review link: Place IDs and official short links only", () => {
  assert.deepEqual(reviewLink("ChIJN1t_tDeuEmsRUsoyG83frY4"), { ok: true, kind: "placeid", url: "https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4" });
  assert.equal((reviewLink("https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4") as { url: string }).url.endsWith("ChIJN1t_tDeuEmsRUsoyG83frY4"), true);
  assert.deepEqual(reviewLink("g.page/r/CdEf123AbC/review"), { ok: true, kind: "short", url: "https://g.page/r/CdEf123AbC/review" });
  assert.equal(reviewLink("https://maps.app.goo.gl/abc123").ok, false);
  assert.equal(reviewLink("Joe's Pizza").ok, false);
});

test("llms.txt: builds the proposed structure and the checker accepts it", () => {
  const md = buildLlmsTxt({ name: "Acme", url: "https://acme.com", summary: "Acme makes tools.", details: "", sections: [{ title: "Docs", links: [{ title: "Guide", url: "https://acme.com/guide", note: "Start here" }] }, { title: "Empty", links: [] }] });
  assert.equal(md, "# Acme\n\n> Acme makes tools.\n\n## Docs\n\n- [Guide](https://acme.com/guide): Start here\n");
  assert.deepEqual(checkLlmsTxt(md), []);
  assert.ok(checkLlmsTxt("## No title\n- [x](notaurl)").length >= 2);
});

test("AI validators: Etsy names follow Etsy's rules, negatives keep core terms, intent covers every keyword", () => {
  const etsy = SPECS["etsy-shop-name-generator"].validate({ name: "Honey Glow Candles!", reason: "x" }, {});
  assert.ok(etsy.ok && (etsy.value as { name: string }).name === "HoneyGlowCandles");
  assert.equal(SPECS["etsy-shop-name-generator"].validate({ name: "AVeryLongCandleShopNameIndeed", reason: "x" }, {}).ok, false);
  assert.equal(SPECS["etsy-shop-name-generator"].validate({ name: "GlowNest", reason: "x" }, { ideas: "GlowNest, Wick" }).ok, false);

  const neg = SPECS["google-ads-negative-keyword-generator"].validate(
    { items: [{ keyword: "jobs", matchType: "broad", reason: "", risk: "low" }, { keyword: "[free trial]", matchType: "exact", reason: "", risk: "low" }, { keyword: "jobs", matchType: "broad", reason: "", risk: "low" }, { keyword: "diy template", matchType: "phrase", reason: "", risk: "medium" }] },
    { never: "free trial" },
  );
  assert.ok(neg.ok);
  const items = (neg.value as { items: { keyword: string; risk: string; formatted: string; conflict?: string }[] }).items;
  assert.equal(items.length, 3, "duplicates removed");
  const trial = items.find((i) => i.keyword === "free trial")!;
  assert.equal(trial.risk, "high");
  assert.ok(trial.conflict);
  assert.equal(trial.formatted, "[free trial]");
  assert.equal(items.find((i) => i.keyword === "diy template")!.formatted, '"diy template"');

  const intent = SPECS["seo-search-intent-classifier"];
  assert.equal(intent.validate({ rows: [{ keyword: "a b", primaryIntent: "informational", secondaryIntent: "", confidence: "high", reason: "", suggestedPageType: "guide" }] }, { keywords: "a b\nc d" }).ok, false, "a missing keyword fails");
  assert.deepEqual(parseKeywords(" one \n\none\ntwo  words"), ["one", "two words"]);
});

test("input cleaning rejects missing fields, unknown options and oversized batches", () => {
  assert.ok("error" in cleanInput("etsy-shop-name-generator", { style: "Bold" }));
  assert.ok("error" in cleanInput("etsy-shop-name-generator", { niche: "candles", style: "Not an option" }));
  assert.ok("error" in cleanInput("seo-search-intent-classifier", { keywords: Array.from({ length: 30 }, (_, i) => `kw ${i}`).join("\n") }));
  const ok = cleanInput("etsy-shop-name-generator", { niche: " candles ", style: "Bold", hacker: "ignore me" });
  assert.deepEqual(ok, { input: { niche: "candles", style: "Bold" } });
});
