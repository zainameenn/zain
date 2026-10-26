import assert from "node:assert/strict";
import { test } from "node:test";
import { abSampleSize, buildHreflang, buildOpenGraph, buildProductSchema, buildSitemap, buildSkus, checkCanonical, checkLocale, csvRow, findLinkOpportunities, headerCanonical, localKeywords, mrr, normInv, parsePages, retention, summariseChain, validateJsonLd } from "../lib/tools/v3/batch4";
import { csvCell } from "../lib/tools/v3/track";

// Tools 41 to 60. Run with: npm test

test("sitemap generator: paths, escaping, duplicates, other hosts, dates, no invented lastmod", () => {
  const r = buildSitemap("https://example.com/\n/about\n/products/desk-mat?a=1&b=2\nhttps://example.com/about\nhttps://other.com/x\nnot a url", { domain: "example.com" });
  assert.equal(r.count, 3);
  assert.equal(r.duplicates, 1);
  assert.equal(r.otherDomain, 1);
  assert.equal(r.invalid, 1);
  assert.ok(r.files[0].xml.includes("<loc>https://example.com/products/desk-mat?a=1&amp;b=2</loc>"));
  assert.ok(!r.files[0].xml.includes("<lastmod>"), "no dates unless given");
  const d = buildSitemap('url,lastmod\nhttps://example.com/a,2026-10-20\n"https://example.com/b",yesterday');
  assert.ok(d.files[0].xml.includes("<lastmod>2026-10-20</lastmod>"));
  assert.equal(d.errors.length, 1);
  const x = buildSitemap('https://example.com/<script>"x"');
  assert.ok(!x.files[0].xml.includes("<script>"));
  assert.ok(buildSitemap("/about").errors[0].message.includes("domain"));
});

test("sitemap generator: splits into several files with an index", () => {
  const lines = Array.from({ length: 25 }, (_, i) => `https://example.com/p${i}`).join("\n");
  const r = buildSitemap(lines, { maxPerFile: 10 });
  assert.deepEqual(r.files.map((f) => f.urls), [10, 10, 5]);
  assert.deepEqual(r.files.map((f) => f.name), ["sitemap-1.xml", "sitemap-2.xml", "sitemap-3.xml"]);
  assert.ok(r.index!.includes("<loc>https://example.com/sitemap-3.xml</loc>"));
});

test("CSV parsing handles quotes, and exports neutralise spreadsheet formulas", () => {
  assert.deepEqual(csvRow('"a, b","say ""hi""",c'), ["a, b", 'say "hi"', "c"]);
  assert.equal(csvCell("=HYPERLINK(1)"), `"'=HYPERLINK(1)"`);
  assert.equal(csvCell("+1"), `"'+1"`);
  assert.equal(csvCell("@x"), `"'@x"`);
  assert.equal(csvCell("plain"), `"plain"`);
});

test("hreflang: reciprocal set, locale checks, x-default, sitemap XML", () => {
  const r = buildHreflang([{ url: "https://example.com/en/product", locale: "en" }, { url: "https://example.com/de/product", locale: "de" }], "https://example.com/");
  assert.deepEqual(r.errors, []);
  assert.equal(r.tags.split("\n").length, 3);
  assert.ok(r.tags.includes('hreflang="x-default" href="https://example.com/"'));
  assert.equal((r.xml.match(/<url>/g) ?? []).length, 2, "one <url> per real version");
  assert.equal((r.xml.match(/<xhtml:link /g) ?? []).length, 6, "each version lists all three");
  assert.equal(checkLocale("en-GB"), null);
  assert.equal(checkLocale("zh-Hant-TW"), null);
  assert.ok(checkLocale("uk-UA") === null, "uk is Ukrainian");
  assert.ok(checkLocale("gb")!.includes("language"));
  assert.ok(checkLocale("en-XYZ")!.includes("region"));
  assert.ok(buildHreflang([{ url: "https://a.com/1", locale: "en" }, { url: "https://a.com/2", locale: "en" }]).errors.some((e) => e.includes("two different URLs")));
  assert.ok(buildHreflang([{ url: "https://a.com/1", locale: "en" }]).errors.some((e) => e.includes("at least two")));
});

test("canonical: self, conflicts, body placement, header, expected", () => {
  const self = checkCanonical({ html: '<html><head><link rel="canonical" href="https://example.com/p"></head></html>', pageUrl: "https://example.com/p", live: true, status: 200 });
  assert.ok(self.checks.some((c) => c.label === "Self-referencing"));
  const utm = checkCanonical({ html: '<head><link href="/products/mat" rel="canonical"></head>', pageUrl: "https://example.com/products/mat?utm_source=ig", live: false });
  assert.equal(utm.resolved, "https://example.com/products/mat");
  assert.ok(utm.checks.some((c) => c.label === "Same page, cleaner URL"));
  assert.ok(utm.checks.some((c) => c.basis === "Not checked"));
  const conflict = checkCanonical({ html: '<head><link rel=canonical href="https://a.com/1"><link rel="canonical" href="https://a.com/2"></head>', live: true });
  assert.ok(conflict.checks.some((c) => c.status === "bad" && c.label === "Conflicting canonicals"));
  const body = checkCanonical({ html: '<head></head><body><link rel="canonical" href="https://a.com/"></body>', live: true });
  assert.ok(body.checks.some((c) => c.label === "Outside <head>"));
  assert.equal(headerCanonical('<https://a.com/x>; rel="canonical"'), "https://a.com/x");
  const exp = checkCanonical({ html: '<head><link rel="canonical" href="https://a.com/x"></head>', pageUrl: "https://a.com/x", expected: "https://a.com/y", live: true });
  assert.ok(exp.checks.some((c) => c.label === "Expected canonical" && c.status === "bad"));
});

test("redirect chain summary: hops, loops, temporary redirects and blocked checks", () => {
  const s = summariseChain([
    { url: "http://example.com/old", status: 301, location: "https://example.com/old", timeMs: 50 },
    { url: "https://example.com/old", status: 302, location: "https://example.com/new", timeMs: 40 },
    { url: "https://example.com/new", status: 200, location: null, timeMs: 60 },
  ]);
  assert.equal(s.redirects, 2);
  assert.equal(s.loop, false);
  assert.ok(s.notes.some((n) => n.includes("temporary")));
  assert.ok(s.notes.some((n) => n.includes("http to https")));
  assert.equal(summariseChain([{ url: "https://a.com/1", status: 301, location: "/2", timeMs: 1 }, { url: "https://a.com/2", status: 301, location: "/1", timeMs: 1 }, { url: "https://a.com/1", status: 301, location: "/2", timeMs: 1 }]).loop, true);
  assert.ok(summariseChain([{ url: "https://a.com/", status: 403, location: null, timeMs: 1 }]).notes[0].includes("blocking"));
});

test("JSON-LD validator: syntax position, context, required fields, offers, ratings, graphs", () => {
  const ok = validateJsonLd('{"@context":"https://schema.org","@type":"Product","name":"Desk Mat"}');
  assert.equal(ok.validJson, true);
  assert.deepEqual(ok.types, ["Product"]);
  assert.ok(!ok.issues.some((i) => i.level === "error"));
  assert.ok(ok.issues.some((i) => i.message.includes('"offers"')));
  const bad = validateJsonLd('{"@context":"https://schema.org",\n"@type":"Product",}');
  assert.equal(bad.validJson, false);
  assert.ok(bad.issues[0].message.includes("line"));
  const html = validateJsonLd('<script type="application/ld+json">{"@context":"https://schema.org","@graph":[{"@type":"Organization","name":"X"},{"@type":"Offer","price":"$5","priceCurrency":"usd"}]}</script><script>alert(1)</script>');
  assert.equal(html.blocks, 1, "only ld+json scripts, never other scripts");
  assert.ok(html.types.includes("Organization") && html.types.includes("Offer"));
  assert.ok(html.issues.filter((i) => i.level === "error").length >= 2, "price and currency");
  assert.ok(validateJsonLd('{"@type":"Thing"}').issues.some((i) => i.message.includes("@context")));
  assert.ok(validateJsonLd('{"@context":"https://schema.org","@type":"AggregateRating","ratingValue":5}').issues.some((i) => i.message.includes("real")));
});

test("Open Graph: escaping, required fields and card choice", () => {
  const r = buildOpenGraph({ title: 'Guides "for" <you>', url: "https://example.com/blog", description: "Practical guides.", image: "https://example.com/og.png" });
  assert.deepEqual(r.errors, []);
  assert.ok(r.html.includes('content="Guides &quot;for&quot; &lt;you&gt;"'));
  assert.ok(r.html.includes('name="twitter:card" content="summary_large_image"'));
  assert.ok(buildOpenGraph({ title: "x", url: "/blog" }).errors.length);
  assert.ok(buildOpenGraph({ title: "x", url: "https://a.com" }).html.includes('content="summary"'));
});

test("Product schema: only supplied fields, offer checks, no ratings, script safe", () => {
  const r = buildProductSchema({ name: "Matte Desk Mat", url: "https://example.com/products/matte-mat", brand: "Example Studio", image: "https://example.com/mat.jpg", price: "35", currency: "usd", availability: "InStock" });
  assert.deepEqual(r.errors, []);
  const o = JSON.parse(r.json);
  assert.equal(o.offers.price, "35.00");
  assert.equal(o.offers.priceCurrency, "USD");
  assert.equal(o.offers.availability, "https://schema.org/InStock");
  assert.equal(o.aggregateRating, undefined);
  assert.equal(o.review, undefined);
  const basic = buildProductSchema({ name: "Mat", url: "https://a.com/p" });
  assert.ok(basic.missing.some((m) => m.startsWith("offers")));
  assert.ok(buildProductSchema({ name: "</script><b>", url: "https://a.com/p" }).json.includes("\\u003c/script>"));
  assert.ok(buildProductSchema({ name: "x", url: "https://a.com", price: "35", currency: "dollars" }).errors.length);
});

test("internal links: related pages, no self links, existing pairs skipped", () => {
  const { pages, errors } = parsePages("url,title,topic\n/blog/etsy-store,How to set up an Etsy store,etsy seller fees listing setup\n/tools/etsy-fee-calculator,Etsy Fee Calculator,etsy fees seller calculator\n/blog/sourdough,Sourdough starter guide,baking bread\n/x");
  assert.equal(pages.length, 3);
  assert.equal(errors.length, 1);
  const s = findLinkOpportunities(pages);
  assert.ok(s.some((x) => x.source === "/blog/etsy-store" && x.target === "/tools/etsy-fee-calculator"));
  assert.ok(!s.some((x) => x.source === x.target));
  assert.ok(!s.some((x) => x.source.includes("sourdough") || x.target.includes("sourdough")));
  assert.ok(!findLinkOpportunities(pages, [["/blog/etsy-store", "/tools/etsy-fee-calculator"]]).some((x) => x.source === "/blog/etsy-store" && x.target === "/tools/etsy-fee-calculator"));
});

test("SKUs: combinations, sequence, clashes with existing SKUs and abbreviation collisions", () => {
  const r = buildSkus({ prefix: "mat", options: [["Black", "Blue"], ["S", "L"]], sequence: true });
  assert.deepEqual(r.rows.map((x) => x.sku), ["MAT-BLA-S-001", "MAT-BLA-L-002", "MAT-BLU-S-003", "MAT-BLU-L-004"]);
  const c = buildSkus({ prefix: "MAT", options: [["Black", "Blue"]], existing: ["mat-blu"] });
  assert.equal(c.rows.find((x) => x.sku === "MAT-BLU")!.clash, true);
  assert.ok(buildSkus({ prefix: "T", options: [["Blackberry", "Blackcurrant"]] }).warnings.some((w) => w.includes("both shorten")));
  assert.ok(buildSkus({ prefix: "T", options: [Array.from({ length: 30 }, (_, i) => `a${i}`), Array.from({ length: 30 }, (_, i) => `b${i}`)] }).errors[0].includes("500"));
  assert.equal(buildSkus({ prefix: "Café", options: [] }).rows[0].sku, "CAFE");
});

test("local keyword modifiers: combinations, dedupe, cap, no invented places", () => {
  const g = localKeywords(["Basement waterproofing", "basement waterproofing"], ["Lahore"], ["Service and location", "Cost and pricing"]);
  const all = g.flatMap((x) => x.keywords);
  assert.ok(all.includes("basement waterproofing lahore"));
  assert.ok(all.includes("basement waterproofing cost lahore"));
  assert.equal(new Set(all).size, all.length);
  assert.ok(all.every((k) => k.includes("lahore")));
  const big = localKeywords(Array.from({ length: 40 }, (_, i) => `s${i}`), Array.from({ length: 40 }, (_, i) => `c${i}`), ["Service and location"]);
  assert.equal(big.flatMap((x) => x.keywords).length, 500);
});

test("MRR: monthly and annual plans, cents exact, negatives rejected", () => {
  const r = mrr([{ name: "Monthly", price: 20, interval: "month", customers: 100 }, { name: "Annual", price: 240, interval: "year", customers: 10 }]);
  assert.equal(r.mrr, 2200);
  assert.equal(r.arr, 26400);
  assert.equal(mrr([{ name: "x", price: 0.1, interval: "month", customers: 3 }]).mrr, 0.3);
  assert.equal(mrr([{ name: "x", price: 19.99, interval: "year", customers: 0 }]).mrr, 0);
  assert.ok(mrr([{ name: "x", price: -5, interval: "month", customers: 1 }]).errors.length);
});

test("retention: the worked example, impossible inputs warn instead of clamping", () => {
  assert.deepEqual(retention(200, 50, 210), { rate: 80, retained: 160, lost: 40, warning: null });
  assert.equal(retention(0, 1, 1).rate, null);
  assert.ok(retention(100, 50, 160).warning!.includes("over 100%"));
  assert.ok(retention(100, 80, 50).warning!.includes("new customers"));
});

test("A/B sample size matches the standard two proportion formula", () => {
  assert.ok(Math.abs(normInv(0.975) - 1.959964) < 1e-5);
  assert.ok(Math.abs(normInv(0.8) - 0.841621) < 1e-5);
  const r = abSampleSize(5, 10, { daily: 2000 });
  assert.equal(r.error, null);
  assert.ok(r.control > 31100 && r.control < 31300, `got ${r.control}`);
  assert.equal(r.treatment, r.control);
  assert.equal(r.days, Math.ceil(r.total / 2000));
  assert.ok(Math.abs(r.variant - 0.055) < 1e-12);
  const uneven = abSampleSize(5, 10, { ratio: 2 });
  assert.ok(uneven.treatment > uneven.control);
  assert.ok(abSampleSize(0, 10).error);
  assert.ok(abSampleSize(95, 10).error, "rate would pass 100%");
  assert.ok(abSampleSize(50, 0).error);
});

test("URL checker refuses private networks, odd ports, credentials and non http schemes", async () => {
  const { isPrivateIp, urlProblem, safeRequest } = await import("../lib/tools/v3/safe-fetch");
  for (const ip of ["127.0.0.1", "10.1.2.3", "172.20.0.1", "192.168.1.1", "169.254.169.254", "100.64.0.1", "0.0.0.0", "::1", "fd00::1", "fe80::1", "::ffff:127.0.0.1", "::ffff:7f00:1", "224.0.0.1"]) assert.equal(isPrivateIp(ip), true, ip);
  for (const ip of ["8.8.8.8", "1.1.1.1", "2606:4700:4700::1111"]) assert.equal(isPrivateIp(ip), false, ip);
  assert.ok(urlProblem("http://169.254.169.254/latest/meta-data/"));
  assert.ok(urlProblem("http://localhost:3000/"));
  assert.ok(urlProblem("https://example.com:8080/"));
  assert.ok(urlProblem("https://user:pass@example.com/"));
  assert.ok(urlProblem("file:///etc/passwd"));
  assert.ok(urlProblem("http://[::1]/"));
  assert.ok(urlProblem("http://metadata.google.internal/"));
  assert.equal(urlProblem("https://example.com/page"), null);
  // A public looking name that resolves to loopback is refused when the socket connects.
  await assert.rejects(safeRequest("http://localtest.me/"), /private network|couldn't|ENOTFOUND|EAI_AGAIN/);
});

test("tool page copy follows the site rules", async () => {
  const { V3_CONTENT } = await import("../lib/tools/v3/pages");
  const { TOOLS } = await import("../lib/tools/registry");
  const slugs = new Set(V3_CONTENT.map((c) => c.slug));
  for (const c of V3_CONTENT) {
    const text = JSON.stringify({ ...c, sources: [] });
    assert.ok(!/[–—]/.test(text), `${c.slug}: no em or en dashes`);
    assert.ok(!/freelanc/i.test(text), `${c.slug}: no "freelance"`);
    assert.ok(c.lede.toLowerCase().startsWith(`this ${c.keyword}`) || c.lede.toLowerCase().startsWith(c.keyword), `${c.slug}: lede starts with the keyword`);
    assert.equal(c.metaTitle, `${c.name} (100% FREE)`, `${c.slug}: meta title`);
    assert.ok(c.metaDescription.length >= 100 && c.metaDescription.length <= 165, `${c.slug}: meta description length ${c.metaDescription.length}`);
    assert.equal(c.steps.length, 3, `${c.slug}: three steps`);
    assert.ok(c.faqs.length >= 6, `${c.slug}: FAQs`);
    for (const r of c.related) assert.ok(slugs.has(r.slug) || TOOLS[r.slug], `${c.slug}: related ${r.slug} exists`);
  }
  assert.equal(new Set(V3_CONTENT.map((c) => c.metaTitle)).size, V3_CONTENT.length, "unique titles");
  assert.equal(new Set(V3_CONTENT.map((c) => c.metaDescription)).size, V3_CONTENT.length, "unique descriptions");
});

test("AI validators for tools 41 to 60 reject invented facts", async () => {
  const { SPECS, cleanInput } = await import("../lib/tools/v3/specs");
  const map = SPECS["keyword-to-page-mapper"].validate({ pages: [{ pageTitle: "Etsy Fee Calculator", url: "/tools/etsy-fee-calculator", status: "existing", primaryKeyword: "etsy fee calculator", secondaryKeywords: ["etsy transaction fee", "made up keyword", "etsy fee calculator"], pageType: "tool", reason: "r", confidence: "high", overlap: "" }, { pageTitle: "Refunds", url: "https://invented.com/x", status: "existing", primaryKeyword: "etsy refund policy", secondaryKeywords: [], pageType: "guide", reason: "r", confidence: "weird", overlap: "" }], warnings: [] }, { keywords: "etsy fee calculator\netsy transaction fee\netsy refund policy\netsy listing fee", pages: "/tools/etsy-fee-calculator | Etsy Fee Calculator", plan: "My pages, plus proposed new ones" });
  assert.ok(map.ok);
  const v = (map as { value: { table: { rows: string[][] }; lists: { items: string[] }[] } }).value;
  assert.equal(v.table.rows[0][4], "etsy transaction fee", "unknown and repeated keywords dropped");
  assert.equal(v.table.rows[1][1], "New page", "invented URL removed");
  assert.equal(v.table.rows[1][2], "Proposed");
  assert.equal(v.table.rows[1][6], "low");
  assert.deepEqual(v.lists[0].items, ["etsy listing fee"], "unmapped keywords listed");
  const ph = SPECS["product-hunt-launch-copy-generator"];
  const input = { name: "ChatShelf", does: "saves AI chats", who: "AI users" };
  assert.equal(ph.validate({ tagline: "x".repeat(61), description: "d", makerComment: "m", suggestedTopics: [] }, input).ok, false);
  assert.equal(ph.validate({ tagline: "Save your AI chats", description: "d", makerComment: "Please upvote us!", suggestedTopics: [] }, input).ok, false);
  assert.equal(ph.validate({ tagline: "Save your AI chats", description: "Used by 10,000 users", makerComment: "Hi", suggestedTopics: [] }, input).ok, false);
  assert.equal(ph.validate({ tagline: "Save your AI chats", description: "Saves and organises AI chats.", makerComment: "Hi, I built this. Feedback welcome.", suggestedTopics: ["Productivity"] }, input).ok, true);
  const email = SPECS["shopify-abandoned-checkout-email-generator"];
  const e = { product: "desk mats", tone: "Friendly" };
  assert.equal(email.validate({ subject: "Still thinking?", preheader: "p", body: "Hurry, only 2 left!", ctaLabel: "Go" }, e).ok, false);
  assert.equal(email.validate({ subject: "Still thinking?", preheader: "p", body: "Take 10% off today", ctaLabel: "Go" }, e).ok, false);
  assert.equal(email.validate({ subject: "Still thinking?", preheader: "p", body: "Your desk mat is waiting. [Insert checkout link in Shopify]", ctaLabel: "Go" }, e).ok, true);
  const name = SPECS["saas-product-name-generator"];
  assert.equal(name.validate({ name: "Calendly", pronunciation: "", reason: "", tagline: "" }, { product: "p", users: "u", competitors: "Calendly" }).ok, false);
  assert.ok("error" in cleanInput("keyword-to-page-mapper", { keywords: Array.from({ length: 31 }, (_, i) => `k${i}`).join("\n"), plan: "My pages, plus proposed new ones" }));
});
