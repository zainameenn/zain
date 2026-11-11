import { test } from "node:test";
import assert from "node:assert/strict";
import { adCost, engagement, exhaustionDate, marketingRoi, runway, titleBodyOverlap, titleChecks, REDDIT_TITLE_MAX } from "../lib/tools/kit/calc";
import { inline, renderMarkdown, safeUrl, toPlainText } from "../lib/tools/kit/markdown";
import { appealDraft, appealDestination } from "../lib/tools/kit/appeal";

const near = (a: number | null, b: number, eps = 1e-9) => assert.ok(a !== null && Math.abs(a - b) < eps, `${a} != ${b}`);

// ---------- Markdown ----------

test("markdown: bold, italics, strikethrough, headings, lists, quotes", () => {
  const html = renderMarkdown("# Title\n\n**bold** *it* ~~gone~~\n\n- a\n- b\n\n1. one\n2. two\n\n> quoted");
  assert.match(html, /<h1>Title<\/h1>/);
  assert.match(html, /<strong>bold<\/strong> <em>it<\/em> <del>gone<\/del>/);
  assert.match(html, /<ul><li>a<\/li><li>b<\/li><\/ul>/);
  assert.match(html, /<ol><li>one<\/li><li>two<\/li><\/ol>/);
  assert.match(html, /<blockquote><p>quoted<\/p><\/blockquote>/);
});

test("markdown: spoilers, code blocks and tables", () => {
  assert.match(inline("the end >!he lives!< ok"), /<span class="md-spoiler"[^>]*>he lives<\/span>/);
  assert.match(renderMarkdown("```\n<b>x</b>\n```"), /<pre><code>&lt;b&gt;x&lt;\/b&gt;<\/code><\/pre>/);
  assert.match(renderMarkdown("    indented"), /<pre><code>indented<\/code><\/pre>/);
  const t = renderMarkdown("a | b\n--- | ---\n1 | 2");
  assert.match(t, /<th>a<\/th><th>b<\/th>/);
  assert.match(t, /<td>1<\/td><td>2<\/td>/);
});

test("markdown: single newlines join, two trailing spaces break", () => {
  assert.equal(renderMarkdown("one\ntwo"), "<p>one two</p>");
  assert.equal(renderMarkdown("one  \ntwo"), "<p>one<br>two</p>");
});

test("markdown: script injection is escaped, never rendered", () => {
  const html = renderMarkdown('<script>alert(1)</script>\n\n<img src=x onerror="alert(1)">\n\n**<b onclick=x>hi</b>**');
  assert.ok(!/<script|<img|<b /i.test(html), html);
  assert.match(html, /&lt;script&gt;/);
});

test("markdown: unsafe link protocols are refused", () => {
  assert.equal(safeUrl("javascript:alert(1)"), null);
  assert.equal(safeUrl("data:text/html,hi"), null);
  assert.equal(safeUrl("/relative"), null);
  assert.equal(safeUrl("https://example.com/a"), "https://example.com/a");
  const html = inline("[click](javascript:alert(1)) and [ok](https://example.com)");
  assert.ok(!/href="javascript/i.test(html));
  assert.match(html, /<a href="https:\/\/example.com\/" rel="nofollow noopener noreferrer" target="_blank">ok<\/a>/);
});

test("markdown: link text cannot break out of the attribute", () => {
  const html = inline('[x](https://example.com/"onmouseover="alert(1))');
  assert.ok(!/onmouseover="/.test(html), html);
});

test("plain text strips symbols and keeps links readable", () => {
  assert.equal(toPlainText("# Hi\n**bold** [site](https://a.com) >!s!<"), "Hi\nbold site (https://a.com) s");
});

// ---------- Title analyzer ----------

test("title: length limit and empty title", () => {
  assert.equal(titleChecks("").checks[0].status, "fix");
  const long = titleChecks("a ".repeat(200));
  assert.ok(long.length > REDDIT_TITLE_MAX && long.checks[0].status === "fix");
  assert.equal(titleChecks("How I cut my grocery bill by planning meals on Sundays").checks[0].status, "good");
});

test("title: caps, repeated punctuation and clickbait are flagged", () => {
  const r = titleChecks("YOU WON'T BELIEVE THIS TRICK!!!");
  const by = Object.fromEntries(r.checks.map((c) => [c.id, c.status]));
  assert.equal(by.caps, "fix");
  assert.equal(by.punct, "fix");
  assert.equal(by.hype, "fix");
  assert.ok(r.quality < 50);
});

test("title: acronyms are not treated as shouting", () => {
  const r = titleChecks("Is SEO still worth it for a small SaaS in the UK?");
  assert.equal(r.checks.find((c) => c.id === "caps")!.status, "good");
});

test("title: vague titles fail specificity, no virality words anywhere", () => {
  assert.equal(titleChecks("Help!").checks.find((c) => c.id === "specific")!.status, "fix");
  const all = JSON.stringify(titleChecks("My first post here"));
  assert.ok(!/viral|upvote|predict/i.test(all));
});

test("title and body overlap", () => {
  assert.equal(titleBodyOverlap("", "x"), null);
  assert.ok((titleBodyOverlap("Sourdough starter smells like acetone", "my sourdough starter smells of acetone after feeding") ?? 0) > 0.6);
  assert.ok((titleBodyOverlap("Sourdough starter smells", "I'm selling my bike") ?? 1) < 0.2);
});

// ---------- Engagement ----------

test("engagement: ratios, and nothing invented without views or subscribers", () => {
  const r = engagement({ score: 120, comments: 30 });
  near(r.scoreToComment, 4);
  near(r.commentsPerScore, 0.25);
  assert.equal(r.proxyPer1kViews, null);
  assert.equal(r.scorePer1kSubscribers, null);
});

test("engagement: per 1,000 views and subscribers", () => {
  const r = engagement({ score: 120, comments: 30, views: 15000, subscribers: 200000 });
  near(r.proxyPer1kViews, 10); // (120 + 30) / 15,000 x 1,000
  near(r.commentsPer1kViews, 2);
  near(r.scorePer1kSubscribers, 0.6);
});

test("engagement: zero comments and zero score don't divide by zero", () => {
  assert.equal(engagement({ score: 50, comments: 0 }).scoreToComment, null);
  assert.equal(engagement({ score: 0, comments: 5 }).commentsPerScore, null);
});

// ---------- Ad cost ----------

test("ad cost: CPC mode", () => {
  const r = adCost({ budgetMode: "daily", budget: 50, days: 14, pricing: "cpc", rate: 0.7, conversionRate: 2.5, revenuePerConversion: 80 });
  assert.equal(r.spend, 700);
  near(r.clicks, 1000);
  near(r.conversions, 25);
  near(r.cpa, 28);
  assert.equal(r.revenue, 2000);
  near(r.roas, 2000 / 700);
  assert.equal(r.impressions, null); // no CTR given
  assert.equal(r.grossProfitAfterAds, null); // no margin given, so no profit claim
});

test("ad cost: CPM mode needs CTR for clicks", () => {
  const r = adCost({ budgetMode: "total", budget: 1000, pricing: "cpm", rate: 4 });
  near(r.impressions, 250000);
  assert.equal(r.clicks, null);
  const r2 = adCost({ budgetMode: "total", budget: 1000, pricing: "cpm", rate: 4, ctr: 0.4, conversionRate: 2, revenuePerConversion: 60, grossMarginPct: 50 });
  near(r2.clicks, 1000);
  near(r2.conversions, 20);
  assert.equal(r2.revenue, 1200);
  assert.equal(r2.grossProfitAfterAds, -400); // 1,200 x 50% - 1,000
});

test("ad cost: daily budget without days can't be totalled", () => {
  assert.equal(adCost({ budgetMode: "daily", budget: 50, pricing: "cpc", rate: 1 }).spend, null);
});

// ---------- Marketing ROI ----------

test("roi: uses gross profit, never revenue, for ROI", () => {
  const r = marketingRoi({ spend: 2000, revenue: 10000 });
  assert.equal(r.roiPct, null);
  near(r.roas, 5);
  const m = marketingRoi({ spend: 2000, revenue: 10000, grossMarginPct: 40, otherCosts: 500, leads: 100, customers: 20 });
  assert.equal(m.totalCost, 2500);
  assert.equal(m.grossProfit, 4000);
  near(m.roiPct, 60); // (4,000 - 2,500) / 2,500
  near(m.costPerLead, 25);
  near(m.cac, 125);
  assert.equal(m.breakEvenRevenue, 6250);
});

test("roi: negative ROI, zero spend and currency precision", () => {
  near(marketingRoi({ spend: 1000, grossProfit: 400 }).roiPct, -60);
  assert.equal(marketingRoi({ spend: 0, grossProfit: 400 }).roiPct, null);
  assert.equal(marketingRoi({ spend: 0.1, otherCosts: 0.2 }).totalCost, 0.3);
  assert.equal(marketingRoi({ spend: 100, leads: 0 }).costPerLead, null);
});

// ---------- Runway ----------

test("runway: positive burn", () => {
  const r = runway({ cash: 120000, expenses: 25000, receipts: 10000 });
  assert.equal(r.netBurn, 15000);
  near(r.months, 8);
  assert.equal(r.state, "burning");
});

test("runway: zero burn, negative burn and no cash", () => {
  assert.equal(runway({ cash: 50000, expenses: 10000, receipts: 10000 }).state, "stable");
  const g = runway({ cash: 50000, expenses: 10000, receipts: 12000 });
  assert.equal(g.state, "growing");
  assert.equal(g.months, null);
  assert.equal(runway({ cash: 0, expenses: 1000 }).state, "no-cash");
  assert.equal(runway({ cash: -500, expenses: 1000 }).months, null);
});

test("runway: planned expenses add to gross burn, exhaustion date", () => {
  assert.equal(runway({ cash: 60000, expenses: 8000, plannedMonthly: 2000 }).grossBurn, 10000);
  const d = exhaustionDate(6, new Date(2026, 0, 15));
  assert.equal(d.getFullYear(), 2026);
  assert.equal(d.getMonth(), 6);
});

// ---------- Ban appeal ----------

test("appeal: destination by action type", () => {
  assert.match(appealDestination("subreddit", "r/AskBaking").href, /reddit\.com\/message\/compose\?to=%2Fr%2FAskBaking/);
  assert.match(appealDestination("suspension").href, /reddit\.com\/appeals/);
  assert.match(appealDestination("removal", "AskBaking").label, /moderators/i);
});

test("appeal: concise, respectful, uses only given facts, no evasion", () => {
  const d = appealDraft({ action: "subreddit", what: "I posted a link to my own blog in a thread.", subreddit: "AskBaking", rule: "Rule 4: no self promotion", why: "I didn't realise blog links counted as promotion.", tone: "apologetic" });
  const words = d.split(/\s+/).length;
  assert.ok(words <= 200, `${words} words`);
  assert.match(d, /r\/AskBaking/);
  assert.match(d, /Rule 4/);
  assert.ok(!/new account|alt account|guarantee/i.test(d));
  assert.ok(!/!{2,}/.test(d));
});
