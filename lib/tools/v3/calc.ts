// Calculator math for the Etsy Offsite Ads and Shopify profit margin tools. Pure functions, no AI.
// Kept here (client safe) so the pages and the tests use exactly the same formulas.

const r2 = (n: number) => Math.round(n * 100) / 100;

// ---------- Etsy Offsite Ads ----------

/**
 * Defaults from Etsy's Fees & Payments Policy (checked October 2026). Every number is editable on the page,
 * because payment processing and some fees differ by country.
 */
export const ETSY_DEFAULTS = {
  transactionPct: 6.5,
  listingFee: 0.2,
  processingPct: 3,
  processingFixed: 0.25,
  offsiteRates: [15, 12] as const,
  offsiteCap: 100,
};

export type EtsyInput = {
  price: number;
  shippingCharged: number;
  giftWrap: number;
  productCost: number;
  shippingCost: number;
  packaging: number;
  otherCosts: number;
  transactionPct: number;
  listingFee: number;
  processingPct: number;
  processingFixed: number;
  offsitePct: number;
  offsiteCap: number;
};

export type EtsyResult = {
  revenue: number;
  transactionFee: number;
  listingFee: number;
  processingFee: number;
  offsiteFee: number;
  offsiteCapped: boolean;
  costs: number;
  profit: number;
  margin: number;
  profitWithoutOffsite: number;
  marginWithoutOffsite: number;
  offsiteImpact: number;
  breakEvenPrice: number | null;
  breakEvenPriceWithoutOffsite: number | null;
};

export function etsyOffsite(i: EtsyInput): EtsyResult {
  // Etsy charges the transaction fee and Offsite Ads fee on the order total: item price plus shipping and gift wrap.
  const revenue = i.price + i.shippingCharged + i.giftWrap;
  const transactionFee = (revenue * i.transactionPct) / 100;
  const processingFee = (revenue * i.processingPct) / 100 + i.processingFixed;
  const rawOffsite = (revenue * i.offsitePct) / 100;
  const offsiteFee = Math.min(rawOffsite, i.offsiteCap);
  const costs = i.productCost + i.shippingCost + i.packaging + i.otherCosts;
  const base = revenue - transactionFee - i.listingFee - processingFee - costs;
  const profit = base - offsiteFee;

  // Break even: the item price where profit is zero, with shipping and gift wrap charges held fixed.
  const fixed = costs + i.listingFee + i.processingFixed;
  const pctNoAds = (i.transactionPct + i.processingPct) / 100;
  const solve = (pct: number, extra: number) => (pct < 1 ? (fixed + extra) / (1 - pct) - i.shippingCharged - i.giftWrap : null);
  let breakEven = solve(pctNoAds + i.offsitePct / 100, 0);
  // If the Offsite fee would hit the cap at that price, the cap applies instead of the percentage.
  if (breakEven !== null && ((breakEven + i.shippingCharged + i.giftWrap) * i.offsitePct) / 100 > i.offsiteCap) breakEven = solve(pctNoAds, i.offsiteCap);
  const breakEvenNoAds = solve(pctNoAds, 0);

  return {
    revenue: r2(revenue),
    transactionFee: r2(transactionFee),
    listingFee: r2(i.listingFee),
    processingFee: r2(processingFee),
    offsiteFee: r2(offsiteFee),
    offsiteCapped: rawOffsite > i.offsiteCap,
    costs: r2(costs),
    profit: r2(profit),
    margin: revenue > 0 ? r2((profit / revenue) * 100) : 0,
    profitWithoutOffsite: r2(base),
    marginWithoutOffsite: revenue > 0 ? r2((base / revenue) * 100) : 0,
    offsiteImpact: r2(offsiteFee),
    breakEvenPrice: breakEven === null ? null : r2(Math.max(0, breakEven)),
    breakEvenPriceWithoutOffsite: breakEvenNoAds === null ? null : r2(Math.max(0, breakEvenNoAds)),
  };
}

// ---------- Shopify profit margin ----------

export type ShopifyInput = {
  price: number;
  discountPct: number;
  cogs: number;
  shipping: number;
  packaging: number;
  paymentPct: number;
  paymentFixed: number;
  adsPerOrder: number;
  otherPerOrder: number;
  monthlyFixed: number;
  monthlyOrders: number;
  targetMarginPct: number;
};

export type ShopifyResult = {
  revenue: number;
  paymentFee: number;
  grossProfit: number;
  grossMargin: number;
  totalCostPerOrder: number;
  fixedPerOrder: number;
  netProfit: number;
  netMargin: number;
  markup: number | null;
  monthlyNet: number;
  breakEvenPrice: number | null;
  targetPrice: number | null;
};

export function shopifyMargin(i: ShopifyInput): ShopifyResult {
  const keep = 1 - i.discountPct / 100;
  // Revenue per order is what the customer actually pays for the product after the discount.
  const revenue = i.price * keep;
  const paymentFee = (revenue * i.paymentPct) / 100 + i.paymentFixed;
  const fixedPerOrder = i.monthlyOrders > 0 ? i.monthlyFixed / i.monthlyOrders : 0;
  const otherCosts = i.cogs + i.shipping + i.packaging + i.paymentFixed + i.adsPerOrder + i.otherPerOrder + fixedPerOrder;
  const totalCostPerOrder = otherCosts + (revenue * i.paymentPct) / 100;
  // Gross profit: revenue minus the cost of the product itself. Net: after every cost per order.
  const grossProfit = revenue - i.cogs;
  const netProfit = revenue - totalCostPerOrder;
  const pct = i.paymentPct / 100;
  // Price before discount needed for a given net margin m: revenue (1 - pct - m) = other costs.
  const priceFor = (m: number) => (1 - pct - m > 0 && keep > 0 ? otherCosts / (1 - pct - m) / keep : null);

  return {
    revenue: r2(revenue),
    paymentFee: r2(paymentFee),
    grossProfit: r2(grossProfit),
    grossMargin: revenue > 0 ? r2((grossProfit / revenue) * 100) : 0,
    totalCostPerOrder: r2(totalCostPerOrder),
    fixedPerOrder: r2(fixedPerOrder),
    netProfit: r2(netProfit),
    netMargin: revenue > 0 ? r2((netProfit / revenue) * 100) : 0,
    markup: i.cogs > 0 ? r2(((revenue - i.cogs) / i.cogs) * 100) : null,
    monthlyNet: r2(netProfit * i.monthlyOrders),
    breakEvenPrice: priceFor(0) === null ? null : r2(priceFor(0)!),
    targetPrice: i.targetMarginPct > 0 && priceFor(i.targetMarginPct / 100) !== null ? r2(priceFor(i.targetMarginPct / 100)!) : null,
  };
}

// ---------- Google review link ----------

export type ReviewLink = { ok: true; url: string; kind: "placeid" | "short" } | { ok: false; error: string };

/** Builds a direct review link from a Place ID or an official review link. Never guesses an ID. */
export function reviewLink(raw: string): ReviewLink {
  const s = raw.trim();
  if (!s) return { ok: false, error: "Paste your review link or Place ID." };
  const idOk = (id: string) => /^[A-Za-z0-9_-]{16,300}$/.test(id);
  if (idOk(s) && !s.includes(".")) return { ok: true, kind: "placeid", url: `https://search.google.com/local/writereview?placeid=${s}` };
  let u: URL;
  try {
    u = new URL(/^https?:\/\//i.test(s) ? s : `https://${s}`);
  } catch {
    return { ok: false, error: "That doesn't look like a link or a Place ID." };
  }
  const host = u.hostname.replace(/^www\./, "");
  const pid = u.searchParams.get("placeid") ?? u.searchParams.get("place_id") ?? u.searchParams.get("query_place_id");
  if (pid && idOk(pid)) return { ok: true, kind: "placeid", url: `https://search.google.com/local/writereview?placeid=${pid}` };
  // The "Ask for reviews" link from Google Business Profile: g.page/r/<code>/review
  if (host === "g.page" && /^\/r\/[A-Za-z0-9_-]+(\/review)?\/?$/.test(u.pathname)) {
    const path = u.pathname.replace(/\/?$/, "").replace(/(\/review)?$/, "/review");
    return { ok: true, kind: "short", url: `https://g.page${path}` };
  }
  if (host === "maps.app.goo.gl" || host === "goo.gl" || host.endsWith("google.com")) {
    return { ok: false, error: "That's a Google Maps link, not a review link. Use the \"Ask for reviews\" link from your Business Profile, or your Place ID." };
  }
  return { ok: false, error: "We couldn't find a Place ID in that link. Use the \"Ask for reviews\" link from your Business Profile, or your Place ID." };
}

// ---------- llms.txt ----------

export type LlmsSection = { title: string; links: { title: string; url: string; note?: string }[] };
export type LlmsInput = { name: string; url: string; summary: string; details: string; sections: LlmsSection[] };

export const isHttpUrl = (s: string) => {
  try {
    const u = new URL(s);
    return u.protocol === "https:" || u.protocol === "http:";
  } catch {
    return false;
  }
};

/** Markdown in the shape the llms.txt proposal (llmstxt.org) describes. */
export function buildLlmsTxt(i: LlmsInput): string {
  const clean = (s: string) => s.replace(/[\r\n]+/g, " ").trim();
  const out = [`# ${clean(i.name)}`, ""];
  if (i.summary.trim()) out.push(`> ${clean(i.summary)}`, "");
  if (i.details.trim()) out.push(i.details.trim(), "");
  for (const sec of i.sections) {
    const links = sec.links.filter((l) => l.title.trim() && l.url.trim());
    if (!sec.title.trim() || !links.length) continue;
    out.push(`## ${clean(sec.title)}`, "");
    for (const l of links) out.push(`- [${clean(l.title)}](${l.url.trim()})${l.note?.trim() ? `: ${clean(l.note)}` : ""}`);
    out.push("");
  }
  return out.join("\n").trimEnd() + "\n";
}

/** Checks a generated or pasted llms.txt against the proposal's structure. Returns problems, empty when valid. */
export function checkLlmsTxt(md: string): string[] {
  const problems: string[] = [];
  const lines = md.split("\n");
  const first = lines.find((l) => l.trim());
  if (!first?.startsWith("# ")) problems.push("The file must start with an H1: # Your site name.");
  if (lines.filter((l) => /^# /.test(l)).length > 1) problems.push("Only one H1 is allowed.");
  let inSection = false;
  for (const l of lines) {
    if (/^## /.test(l)) inSection = true;
    else if (/^#{3,} /.test(l)) problems.push(`Use H2 (##) for sections, not "${l.trim()}".`);
    else if (inSection && /^- /.test(l)) {
      const m = l.match(/^- \[([^\]]+)\]\(([^)]+)\)(: .*)?$/);
      if (!m) problems.push(`Links in sections should look like "- [Title](https://url): optional note". Check: ${l.slice(0, 60)}`);
      else if (!isHttpUrl(m[2])) problems.push(`"${m[2]}" isn't a full http or https URL.`);
    }
  }
  return problems;
}
