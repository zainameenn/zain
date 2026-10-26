import assert from "node:assert/strict";
import { test } from "node:test";
import { breakEvenRoas, buildLocalBusiness, buildRobotsTxt, checkChapters, chaptersText, ltvCac, parseHours, parseTimestamps, validateSitemap } from "../lib/tools/v3/batch3";
import { testRobots } from "../lib/tools/v3/robots";
import { cleanInstagram, cleanTiktok } from "../lib/tools/v3/specs-batch3";

// Tools 21 to 40. Run with: npm test

test("chapters: plain lines, brackets, hours, SRT and VTT parse without inventing times", () => {
  const p = parseTimestamps("00:00 Welcome\n[01:20] The problem\n1:03:45 - Results\nno time here");
  assert.deepEqual(p.cues.map((c) => c.startSeconds), [0, 80, 3825]);
  assert.equal(p.cues[2].text, "Results");
  assert.equal(p.ignored, 1);
  const srt = parseTimestamps("1\n00:00:00,000 --> 00:00:04,000\nHello\n\n2\n00:01:20,500 --> 00:01:25,000\nThe problem");
  assert.deepEqual(srt.cues, [{ startSeconds: 0, text: "Hello" }, { startSeconds: 80, text: "The problem" }]);
  const vtt = parseTimestamps("WEBVTT\n\n00:00.000 --> 00:03.000\nHi\n\n00:45.000 --> 00:50.000\n<b>Next</b>");
  assert.deepEqual(vtt.cues.map((c) => c.startSeconds), [0, 45]);
  assert.equal(parseTimestamps("just words").cues.length, 0);
});

test("chapters: YouTube rules are checked", () => {
  const rows = [{ startSeconds: 0, title: "Intro" }, { startSeconds: 80, title: "Problem" }, { startSeconds: 225, title: "Results" }];
  assert.ok(checkChapters(rows, 435).every((c) => c.ok));
  assert.equal(checkChapters([{ startSeconds: 5, title: "a" }, ...rows.slice(1)])[0].ok, false, "must start at 0:00");
  assert.equal(checkChapters(rows.slice(0, 2))[1].ok, false, "needs three");
  assert.equal(checkChapters([...rows.slice(0, 2), { startSeconds: 85, title: "x" }]).find((c) => c.message.includes("10 seconds"))!.ok, false);
  assert.equal(checkChapters(rows, 230).find((c) => c.message.includes("ends"))!.ok, false);
  assert.equal(chaptersText(rows), "0:00 Intro\n1:20 Problem\n3:45 Results");
});

test("robots.txt generator: builds groups, strips injection, warns on blocking everything, and the tester agrees", () => {
  const { text, warnings } = buildRobotsTxt([{ agent: "*", disallow: ["/staging/", "private\nUser-agent: evil"], allow: [] }], "https://example.com/sitemap.xml");
  assert.equal(text, "User-agent: *\nDisallow: /staging/\nDisallow: /privateUser-agent: evil\n\nSitemap: https://example.com/sitemap.xml\n");
  assert.equal(warnings.length, 0);
  assert.equal(testRobots(text, "Googlebot", "/staging/x").decision, "disallowed");
  assert.ok(buildRobotsTxt([{ agent: "*", disallow: ["/"], allow: [] }]).warnings[0].includes("blocks every page"));
  assert.ok(buildRobotsTxt([{ agent: "*", disallow: [], allow: [] }], "sitemap.xml").warnings[0].includes("full URL"));
  assert.ok(buildRobotsTxt([{ agent: "*", disallow: [], allow: [] }]).text.includes("Disallow:\n"));
});

test("sitemap validator: duplicates, bad dates, namespace, escaping and hosts", () => {
  const ok = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://example.com/</loc><lastmod>2026-10-20</lastmod></url><url><loc>https://example.com/a?x=1&amp;y=2</loc></url></urlset>`;
  const r = validateSitemap(ok, null, new Date("2026-10-26"));
  assert.equal(r.valid, true);
  assert.equal(r.count, 2);
  const bad = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://example.com/a</loc><lastmod>tomorrow</lastmod></url><url><loc>https://example.com/a</loc></url><url><loc>/relative</loc></url><url><loc>https://www.example.com/b?x=1&y=2</loc><priority>2</priority></url></urlset>`;
  const b = validateSitemap(bad, null, new Date("2026-10-26"));
  const codes = b.issues.map((i) => i.code);
  assert.equal(b.valid, false);
  for (const c of ["lastmod", "duplicate", "loc-invalid", "escape", "priority", "hosts"]) assert.ok(codes.includes(c), c);
  assert.ok(validateSitemap("<urlset><url><loc>https://a.com/</loc></url></urlset>").issues.some((i) => i.code === "namespace"));
  assert.ok(validateSitemap('<!DOCTYPE x [<!ENTITY a "b">]><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>').issues.some((i) => i.code === "doctype"));
  assert.equal(validateSitemap(`<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>https://example.com/s1.xml</loc></sitemap></sitemapindex>`).type, "sitemapindex");
});

test("LocalBusiness schema: only supplied fields, valid hours, no ratings, safe output", () => {
  const { json, errors } = buildLocalBusiness({ type: "BikeStore", name: "North Shore Bicycle Repairs", url: "https://example.com", street: "1 Pier Rd", locality: "Leeds", country: "gb", phone: "+44 113 000 0000", hours: "Mo-Fr 09:00-17:00, Sa 10:00-14:00" });
  assert.deepEqual(errors, []);
  const o = JSON.parse(json);
  assert.equal(o["@type"], "BikeStore");
  assert.equal(o.address.addressCountry, "GB");
  assert.deepEqual(o.openingHours, ["Mo-Fr 09:00-17:00", "Sa 10:00-14:00"]);
  assert.ok(!("aggregateRating" in o) && !("geo" in o));
  assert.ok(!buildLocalBusiness({ type: "x", name: "</script><b>", url: "https://e.com" }).json.includes("</script>"));
  assert.equal(parseHours("Mon to Fri 9 to 5"), null);
  assert.ok(buildLocalBusiness({ type: "LocalBusiness", name: "A", url: "nope" }).errors.length);
});

test("break-even ROAS and LTV to CAC match hand calculations", () => {
  const r = breakEvenRoas(80, 48);
  assert.equal(r.breakEvenRoas, 2.5);
  assert.equal(r.allowableAdSpend, 32);
  assert.equal(r.margin, 40);
  assert.equal(breakEvenRoas(50, 50).breakEvenRoas, null, "no finite break even");
  assert.equal(breakEvenRoas(80, 48, 12).targetRoas, 4); // 80 / (32 - 12)
  assert.equal(breakEvenRoas(80, 48, 0, 4).currentProfitPerOrder, 12); // 32 - 80/4

  const l = ltvCac(100, 80, 4, 500);
  assert.equal(l.ltv, 2000);
  assert.equal(l.ratio, 4);
  assert.equal(l.lifetimeMonths, 25);
  assert.equal(l.paybackMonths, 6.25);
  assert.equal(ltvCac(100, 80, 0, 500).ltv, null, "zero churn has no finite LTV");
});

test("handle cleaning follows Instagram and TikTok rules", () => {
  assert.equal(cleanInstagram("@Quiet..Morning Studio."), "quiet.morningstudio");
  assert.equal(cleanInstagram("a".repeat(40)).length, 30);
  assert.equal(cleanTiktok("mia.makes.dinner."), "mia.makes.dinner");
  assert.ok(cleanTiktok("x".repeat(40)).length <= 24);
});
