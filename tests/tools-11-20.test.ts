import assert from "node:assert/strict";
import { test } from "node:test";
import { cac, etsyOffsite } from "../lib/tools/v3/calc";
import { lexicalClusters, parseKeywordList } from "../lib/tools/v3/cluster";
import { testRobots } from "../lib/tools/v3/robots";
import { SPECS } from "../lib/tools/v3/specs";

// Tools 11 to 20. Run with: npm test

test("robots.txt: the most specific rule wins, Allow wins ties, wildcards and $ work", () => {
  const txt = "User-agent: *\nDisallow: /drafts/\nAllow: /drafts/public/\nDisallow: /*.pdf$\n\nUser-agent: GPTBot\nDisallow: /";
  assert.equal(testRobots(txt, "Googlebot", "/drafts/public/guide").decision, "allowed");
  assert.equal(testRobots(txt, "Googlebot", "/drafts/secret/").decision, "disallowed");
  assert.equal(testRobots(txt, "Googlebot", "/files/report.pdf").decision, "disallowed");
  assert.equal(testRobots(txt, "Googlebot", "/files/report.pdf?x=1").decision, "allowed", "$ anchors the end");
  assert.equal(testRobots(txt, "GPTBot", "/anything").decision, "disallowed", "the specific group applies");
  assert.equal(testRobots(txt, "GPTBot/1.1", "/anything").group, "gptbot", "version suffix ignored");
  assert.equal(testRobots("User-agent: *\nAllow: /p\nDisallow: /p", "Bingbot", "/page").decision, "allowed", "equal length: Allow wins");
  assert.equal(testRobots("User-agent: *\nDisallow:", "Googlebot", "/x").decision, "allowed", "empty Disallow blocks nothing");
  assert.equal(testRobots("User-agent: Bingbot\nDisallow: /", "Googlebot", "/x").decision, "allowed", "no matching group");
  assert.equal(testRobots("User-agent: *\nDisallow: /", "Googlebot", "https://example.com/robots.txt").decision, "allowed");
  assert.ok(testRobots("User-agent: *\nNoindex: /x\nDisallow /y", "Googlebot", "/").warnings.length >= 2);
});

test("robots.txt: groups with the same user agent are merged, paths are case sensitive", () => {
  const txt = "User-agent: googlebot\nDisallow: /a\n\nUser-agent: Googlebot\nDisallow: /b";
  assert.equal(testRobots(txt, "Googlebot", "/b/1").decision, "disallowed");
  assert.equal(testRobots("User-agent: *\nDisallow: /Private", "Googlebot", "/private").decision, "allowed");
});

test("CAC: formula, zero customers, LTV ratio", () => {
  const r = cac({ marketing: 2000, sales: 1000, customers: 30 });
  assert.equal(r.cac, 100);
  assert.equal(r.total, 3000);
  assert.equal(r.marketingShare, 66.67);
  assert.equal(cac({ marketing: 500, sales: 0, customers: 0 }).cac, null);
  assert.equal(cac({ marketing: 2000, sales: 1000, customers: 30, ltv: 450 }).ltvToCac, 4.5);
});

test("Etsy fee calculator: no Offsite Ads means no ad fee, brief example matches", () => {
  const r = etsyOffsite({ price: 30, shippingCharged: 5, giftWrap: 0, productCost: 9, shippingCost: 4, packaging: 0, otherCosts: 0, transactionPct: 6.5, listingFee: 0.2, processingPct: 3, processingFixed: 0.25, offsitePct: 0, offsiteCap: 100 });
  assert.equal(r.offsiteFee, 0);
  assert.equal(r.transactionFee, 2.28); // 6.5% of 35 = 2.275
  assert.equal(r.processingFee, 1.3); // 3% of 35 + 0.25
});

test("keyword grouping: shared words cluster, duplicates and volumes are read", () => {
  const { keywords, duplicates, volumes } = parseKeywordList("etsy listing fee\t900\nEtsy listing fee\netsy transaction fee,400\nhow to name an etsy shop\netsy shop name ideas\nbanana bread", 100);
  assert.equal(keywords.length, 5);
  assert.deepEqual(duplicates, ["Etsy listing fee"]);
  assert.equal(volumes["etsy listing fee"], 900);
  const { clusters, ungrouped } = lexicalClusters(keywords, 0.5, volumes);
  assert.ok(clusters.some((c) => c.keywords.includes("etsy listing fee") && c.keywords.includes("etsy transaction fee")));
  assert.ok(ungrouped.includes("banana bread"));
  assert.equal(clusters.find((c) => c.keywords.includes("etsy listing fee"))!.primaryKeyword, "etsy listing fee", "highest volume is primary");
});

test("AI validators: domains, FAQs and clusters are checked in code", () => {
  const d = SPECS["domain-name-ideas-generator"].validate({ name: "Tidy Foundry.io", extension: ".io", reason: "x" }, { extension: ".com" });
  assert.ok(d.ok && (d.value as { name: string }).name === "tidyfoundry.com", "visitor's extension wins, junk stripped");

  const faq = SPECS["local-business-faq-generator"].validate(
    { items: Array.from({ length: 6 }, (_, i) => ({ question: `Q${i}<b>?</b>`, answer: "A <script>x</script>", needsVerification: false, missingFact: i === 0 ? "hours" : "" })) },
    { count: "5" },
  );
  assert.ok(faq.ok);
  const items = (faq.value as { items: { question: string; answer: string; needsVerification: boolean }[] }).items;
  assert.equal(items.length, 5);
  assert.ok(!items[0].question.includes("<") && !items[0].answer.includes("<script"));
  assert.equal(items[0].needsVerification, true, "a missing fact flags the answer");

  const cl = SPECS["seo-keyword-cluster-generator"].validate(
    { clusters: [{ label: "Fees", primaryKeyword: "etsy fees", secondaryKeywords: ["etsy fees", "made up keyword", "etsy listing fee"], intent: "commercial", pageType: "tool", rationale: "", confidence: "high" }], ungrouped: [] },
    { keywords: "etsy fees\netsy listing fee\netsy shop name" },
  );
  assert.ok(cl.ok);
  const v = cl.value as { clusters: { secondaryKeywords: string[] }[]; ungrouped: string[] };
  assert.deepEqual(v.clusters[0].secondaryKeywords, ["etsy listing fee"], "no duplicates, no invented keywords");
  assert.deepEqual(v.ungrouped, ["etsy shop name"], "dropped keywords come back as ungrouped");
});
