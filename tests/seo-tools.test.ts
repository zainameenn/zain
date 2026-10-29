import assert from "node:assert/strict";
import { test } from "node:test";
import type { CounterStore } from "../lib/tools/ai/store";
import { checkPage, extractFacts, parseSitemap } from "../lib/tools/seo/html";
import { PROVIDERS, renewsOn, reserve, stopLimit } from "../lib/tools/seo/quota";

// SEO tools wave 1. Run with: npm test

function memStore(shared: boolean): CounterStore {
  const m = new Map<string, number>();
  return {
    shared,
    async incr(k, _t, by = 1) {
      m.set(k, (m.get(k) ?? 0) + by);
      return m.get(k)!;
    },
    async get(k) {
      return m.get(k) ?? 0;
    },
    async setIfAbsent() {
      return true;
    },
    async ttl() {
      return 1;
    },
  };
}

test("quota: stops at 90% of the monthly allowance and says when it renews", async () => {
  process.env.BRAVE_AUTOSUGGEST_KEY = "test";
  const store = memStore(true);
  const now = new Date("2026-10-29T12:00:00Z");
  const limit = stopLimit(PROVIDERS["brave-suggest"]);
  assert.equal(limit, Math.floor(PROVIDERS["brave-suggest"].monthlyAllowance * 0.9));
  for (let i = 0; i < limit; i++) assert.equal((await reserve("brave-suggest", 1, { store, production: true, now })).ok, true);
  const over = await reserve("brave-suggest", 1, { store, production: true, now });
  assert.equal(over.ok, false);
  assert.equal(!over.ok && over.reason, "exhausted");
  assert.equal(!over.ok && over.renews, "2026-11-01");
  // A new month starts a fresh counter: allowance never rolls over, and never carries a deficit.
  assert.equal((await reserve("brave-suggest", 1, { store, production: true, now: new Date("2026-11-01T00:00:01Z") })).ok, true);
  assert.equal(renewsOn(new Date("2026-12-15T00:00:00Z")), "2027-01-01");
});

test("quota: fails closed without a key, or in production without a shared counter", async () => {
  delete process.env.BRAVE_SEARCH_KEY;
  const r1 = await reserve("brave-search", 1, { store: memStore(true), production: true });
  assert.equal(!r1.ok && r1.reason, "no-key");
  process.env.BRAVE_SEARCH_KEY = "test";
  const r2 = await reserve("brave-search", 1, { store: memStore(false), production: true });
  assert.equal(!r2.ok && r2.reason, "no-shared-store");
  assert.equal((await reserve("brave-search", 1, { store: memStore(false), production: false })).ok, true);
});

test("html: extracts metadata exactly as written, resolving relative URLs", () => {
  const html = `<!doctype html><html lang="en-GB"><head>
    <title>Mat &amp; Co | Shop</title>
    <meta name="description" content="Yoga mats.">
    <link rel="canonical" href="/products/mat">
    <meta name="robots" content="index, follow">
    <meta property="og:title" content="Mat">
    <meta name="twitter:card" content="summary">
    <link rel="alternate" hreflang="de" href="https://example.com/de/">
    <script type="application/ld+json">{"@type":"Product"}</script>
    <!-- <title>commented out</title> -->
  </head><body><h1>Our <em>mats</em></h1><a href="/about">About</a><a href="https://other.com/x">X</a><a href="#top">Top</a><img src="a.png"><img src="b.png" alt=""></body></html>`;
  const f = extractFacts(html, "https://example.com/products/mat?utm_source=ig");
  assert.deepEqual(f.title, ["Mat & Co | Shop"]);
  assert.deepEqual(f.canonicals, ["https://example.com/products/mat"]);
  assert.equal(f.lang, "en-GB");
  assert.deepEqual(f.og, [["og:title", "Mat"]]);
  assert.deepEqual(f.hreflang, [{ lang: "de", href: "https://example.com/de/" }]);
  assert.deepEqual(f.headings, [{ level: 1, text: "Our mats" }]);
  assert.equal(f.links.length, 2);
  assert.deepEqual(f.links.map((l) => l.internal), [true, false]);
  assert.equal(f.images.filter((i) => i.alt === null).length, 1);
  assert.equal(f.jsonLdBlocks, 1);
});

test("page checks: noindex and conflicting canonicals are flagged with evidence; short titles are not errors", () => {
  const f = extractFacts(`<html><head><title>Pricing</title><meta name="robots" content="noindex"><link rel="canonical" href="https://a.com/x"><link rel="canonical" href="https://a.com/y"></head><body><h1>Pricing</h1></body></html>`);
  const by = Object.fromEntries(checkPage(f, { status: 200 }).map((c) => [c.label, c]));
  assert.equal(by["Indexing directives"].status, "bad");
  assert.equal(by.Canonical.status, "bad");
  assert.match(by.Canonical.evidence ?? "", /a\.com\/x \| https:\/\/a\.com\/y/);
  assert.equal(by.Title.status, "ok");
  assert.equal(by["Meta description"].status, "info");
  // An X-Robots-Tag header counts too.
  const h = Object.fromEntries(checkPage(extractFacts("<title>T</title>"), { xRobots: "noindex, nofollow" }).map((c) => [c.label, c]));
  assert.equal(h["Indexing directives"].status, "bad");
});

test("sitemap parsing: urlset, index and CDATA", () => {
  assert.deepEqual(parseSitemap(`<urlset><url><loc> https://a.com/1 </loc></url><url><loc><![CDATA[https://a.com/2?x=1&y=2]]></loc></url></urlset>`), { index: false, locs: ["https://a.com/1", "https://a.com/2?x=1&y=2"] });
  assert.deepEqual(parseSitemap(`<sitemapindex><sitemap><loc>https://a.com/s1.xml</loc></sitemap></sitemapindex>`), { index: true, locs: ["https://a.com/s1.xml"] });
});
