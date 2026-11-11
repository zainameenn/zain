// Deterministic logic for the November 2026 marketing tools batch. No AI, no network: every number on the
// calculators and every check on the title analyzer comes from here, so it can be tested on its own.
// A value that can't be worked out is null, never 0, and the page shows "Cannot calculate" for it.

export type Maybe = number | null;

/** Money is rounded to cents only for display; intermediate maths stays in floating point with a cents round at the end. */
export const cents = (n: number) => Math.round((n + Number.EPSILON) * 100) / 100;
const div = (a: Maybe, b: Maybe): Maybe => (a === null || b === null || !Number.isFinite(a) || !Number.isFinite(b) || b === 0 ? null : a / b);
const has = (n: Maybe | undefined): n is number => typeof n === "number" && Number.isFinite(n);

// ---------- Reddit engagement ----------

export type EngagementIn = { score: number; comments: number; views?: Maybe; subscribers?: Maybe };
export type EngagementOut = {
  scoreToComment: Maybe; // score per comment
  commentsPerScore: Maybe; // comments per point of score
  proxyPer1kViews: Maybe; // (score + comments) per 1,000 views, a proxy, not unique people
  commentsPer1kViews: Maybe;
  scorePer1kSubscribers: Maybe;
};

export function engagement(i: EngagementIn): EngagementOut {
  const views = has(i.views) && i.views > 0 ? i.views : null;
  const subs = has(i.subscribers) && i.subscribers > 0 ? i.subscribers : null;
  const per1k = (n: number, base: number | null) => (base ? (n / base) * 1000 : null);
  return {
    scoreToComment: div(i.score, i.comments),
    commentsPerScore: i.score > 0 ? i.comments / i.score : null,
    proxyPer1kViews: per1k(Math.max(0, i.score) + i.comments, views),
    commentsPer1kViews: per1k(i.comments, views),
    scorePer1kSubscribers: per1k(i.score, subs),
  };
}

// ---------- Reddit ad cost ----------

export type AdIn = {
  budgetMode: "total" | "daily";
  budget: number;
  days?: Maybe;
  pricing: "cpc" | "cpm";
  rate: number; // CPC in dollars or CPM in dollars per 1,000 impressions
  ctr?: Maybe; // percent
  conversionRate?: Maybe; // percent
  revenuePerConversion?: Maybe;
  grossMarginPct?: Maybe; // percent of revenue left after product and fulfilment costs
};
export type AdOut = {
  spend: Maybe;
  impressions: Maybe;
  clicks: Maybe;
  conversions: Maybe;
  cpa: Maybe;
  revenue: Maybe;
  roas: Maybe;
  grossProfitAfterAds: Maybe; // only when a margin is given
  note: string;
};

export function adCost(i: AdIn): AdOut {
  const spend = i.budgetMode === "daily" ? (has(i.days) && i.days > 0 ? i.budget * i.days : null) : i.budget;
  const rate = i.rate > 0 ? i.rate : null;
  const ctr = has(i.ctr) && i.ctr > 0 ? i.ctr / 100 : null;
  let impressions: Maybe = null;
  let clicks: Maybe = null;
  let note: string;
  if (i.pricing === "cpm") {
    impressions = spend !== null && rate ? (spend / rate) * 1000 : null;
    clicks = impressions !== null && ctr ? impressions * ctr : null;
    note = "CPM drives this estimate: spend buys impressions, and your CTR turns them into clicks.";
  } else {
    clicks = spend !== null && rate ? spend / rate : null;
    impressions = clicks !== null && ctr ? clicks / ctr : null;
    note = "CPC drives this estimate: spend buys clicks. Impressions are only shown when you add a CTR, and are worked backwards from clicks.";
  }
  const cr = has(i.conversionRate) && i.conversionRate > 0 ? i.conversionRate / 100 : null;
  const conversions = clicks !== null && cr ? clicks * cr : null;
  const revenue = conversions !== null && has(i.revenuePerConversion) ? conversions * i.revenuePerConversion : null;
  const margin = has(i.grossMarginPct) ? i.grossMarginPct / 100 : null;
  return {
    spend: spend === null ? null : cents(spend),
    impressions,
    clicks,
    conversions,
    cpa: div(spend, conversions),
    revenue: revenue === null ? null : cents(revenue),
    roas: div(revenue, spend),
    grossProfitAfterAds: revenue !== null && margin !== null && spend !== null ? cents(revenue * margin - spend) : null,
    note,
  };
}

// ---------- Marketing ROI ----------

export type RoiIn = {
  spend: number; // marketing spend, including ad spend
  adSpend?: Maybe; // part of spend that is advertising, for ROAS; defaults to spend
  revenue?: Maybe; // attributable revenue
  grossProfit?: Maybe; // attributable gross profit, wins over revenue x margin
  grossMarginPct?: Maybe;
  otherCosts?: Maybe; // other attributable campaign costs: tools, agency, sales commission
  leads?: Maybe;
  customers?: Maybe;
};
export type RoiOut = {
  totalCost: number;
  grossProfit: Maybe;
  roiPct: Maybe;
  roas: Maybe;
  costPerLead: Maybe;
  cac: Maybe;
  breakEvenRevenue: Maybe; // revenue needed for gross profit to cover total cost
  profitBasis: "given" | "margin" | "none";
};

export function marketingRoi(i: RoiIn): RoiOut {
  const totalCost = cents(i.spend + (has(i.otherCosts) ? i.otherCosts : 0));
  const margin = has(i.grossMarginPct) ? i.grossMarginPct / 100 : null;
  let grossProfit: Maybe = null;
  let profitBasis: RoiOut["profitBasis"] = "none";
  if (has(i.grossProfit)) {
    grossProfit = i.grossProfit;
    profitBasis = "given";
  } else if (has(i.revenue) && margin !== null) {
    grossProfit = cents(i.revenue * margin);
    profitBasis = "margin";
  }
  const ad = has(i.adSpend) ? i.adSpend : i.spend;
  return {
    totalCost,
    grossProfit,
    roiPct: grossProfit === null || totalCost <= 0 ? null : ((grossProfit - totalCost) / totalCost) * 100,
    roas: has(i.revenue) ? div(i.revenue, ad) : null,
    costPerLead: has(i.leads) ? div(totalCost, i.leads) : null,
    cac: has(i.customers) ? div(totalCost, i.customers) : null,
    breakEvenRevenue: margin !== null && margin > 0 ? cents(totalCost / margin) : null,
    profitBasis,
  };
}

// ---------- Startup runway ----------

export type RunwayIn = { cash: number; expenses: number; receipts?: Maybe; plannedMonthly?: Maybe };
export type RunwayOut = {
  grossBurn: number;
  netBurn: number;
  months: Maybe; // null when cash is stable or growing, or already gone
  state: "burning" | "stable" | "growing" | "no-cash";
};

export function runway(i: RunwayIn): RunwayOut {
  const grossBurn = cents(i.expenses + (has(i.plannedMonthly) ? i.plannedMonthly : 0));
  const netBurn = cents(grossBurn - (has(i.receipts) ? i.receipts : 0));
  if (i.cash <= 0) return { grossBurn, netBurn, months: null, state: "no-cash" };
  if (netBurn < 0) return { grossBurn, netBurn, months: null, state: "growing" };
  if (netBurn === 0) return { grossBurn, netBurn, months: null, state: "stable" };
  return { grossBurn, netBurn, months: i.cash / netBurn, state: "burning" };
}

/** The month cash would run out, from `from`. Only for a burning state. */
export function exhaustionDate(months: number, from = new Date()): Date {
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const whole = Math.floor(months);
  d.setMonth(d.getMonth() + whole);
  d.setDate(d.getDate() + Math.round((months - whole) * 30));
  return d;
}

// ---------- Reddit title checks ----------

export const REDDIT_TITLE_MAX = 300;
export type TitleCheck = { id: string; label: string; status: "good" | "check" | "fix"; detail: string };

const HYPE = /\b(you won'?t believe|shocking|insane|mind[- ]?blowing|this one trick|destroyed|guaranteed|secret|nobody talks about|game[- ]?changer|must see|viral)\b/i;
const VAGUE = /^(help|question|quick question|need advice|advice|thoughts|thoughts\?|hmm|look at this|check this out|what do you think)[.!?]*$/i;

export function titleChecks(raw: string): { length: number; words: number; checks: TitleCheck[]; quality: number } {
  const t = raw.trim();
  const length = [...t].length;
  const words = t ? t.split(/\s+/).length : 0;
  const letters = t.replace(/[^A-Za-z]/g, "");
  const upper = letters.replace(/[^A-Z]/g, "").length;
  const capsWords = (t.match(/\b[A-Z]{3,}\b/g) || []).filter((w) => !/^(USA|UK|EU|API|SEO|CEO|AI|SaaS|PC|PS5|NYC|FAQ|USD|DIY|TV|GPU|CPU|RAM|SSD|ADHD|LLC)$/.test(w));
  const checks: TitleCheck[] = [];
  const add = (id: string, label: string, status: TitleCheck["status"], detail: string) => checks.push({ id, label, status, detail });

  if (length === 0) add("length", "Length", "fix", "Add a title first.");
  else if (length > REDDIT_TITLE_MAX) add("length", "Length", "fix", `${length} characters. Reddit stops post titles at ${REDDIT_TITLE_MAX}, so it won't submit as written.`);
  else if (length < 15) add("length", "Length", "check", `${length} characters. Very short titles often leave readers guessing what the post is about.`);
  else if (length > 160) add("length", "Length", "check", `${length} characters. Allowed, but long titles get cut off in feeds. Put the main point in the first 80 or so characters.`);
  else add("length", "Length", "good", `${length} characters, well inside Reddit's ${REDDIT_TITLE_MAX} character limit.`);

  if (letters.length >= 8 && upper / letters.length > 0.6) add("caps", "Capital letters", "fix", "Most of the title is in capitals, which reads as shouting and some subreddits remove it.");
  else if (capsWords.length >= 2) add("caps", "Capital letters", "check", `Several words in all caps (${capsWords.slice(0, 3).join(", ")}). Keep caps for acronyms.`);
  else add("caps", "Capital letters", "good", "Normal capitalisation.");

  if (/([!?])\1{1,}|[!?]{3,}|\.{4,}/.test(t)) add("punct", "Punctuation", "fix", "Repeated punctuation (like !!! or ???) makes a title look like spam.");
  else add("punct", "Punctuation", "good", "No repeated punctuation.");

  if (/[*_~`#>]{2,}|\[[^\]]*\]\(/.test(t)) add("format", "Formatting symbols", "check", "Titles don't render Markdown, so symbols like ** or links show as raw text.");
  else add("format", "Formatting symbols", "good", "No Markdown symbols that would show as raw text.");

  if (HYPE.test(t)) add("hype", "Exaggeration", "fix", "Phrases like \"you won't believe\" or \"guaranteed\" read as clickbait and many communities remove them. Say what actually happened.");
  else add("hype", "Exaggeration", "good", "No clickbait phrases found.");

  if (VAGUE.test(t) || (words > 0 && words <= 3)) add("specific", "Specificity", "fix", "The title doesn't say what the post is about. Add the subject and the detail that makes it yours.");
  else if (!/\d|\b(how|why|what|which|when|where|should|can|is|are|does|do|my|our|i|we)\b/i.test(t)) add("specific", "Specificity", "check", "There's no concrete detail, question or personal angle yet. Adding one (a number you know, a place, a situation) usually makes it clearer.");
  else add("specific", "Specificity", "good", "Includes a concrete detail, question or personal angle.");

  // A writing quality heuristic: good = 2, check = 1, fix = 0, scaled to 100. Not a prediction of votes or reach.
  const quality = checks.length ? Math.round((checks.reduce((n, c) => n + (c.status === "good" ? 2 : c.status === "check" ? 1 : 0), 0) / (checks.length * 2)) * 100) : 0;
  return { length, words, checks, quality };
}

/** How much a title and a short body summary share, by meaningful words. Low overlap suggests the title promises something else. */
export function titleBodyOverlap(title: string, body: string): Maybe {
  const STOP = new Set("the a an and or but of to in on for with my our your i we you is are was were be it this that how what why when do does did can should would from at by about as just so".split(" "));
  const bag = (s: string) => new Set(s.toLowerCase().match(/[a-z0-9']{3,}/g)?.filter((w) => !STOP.has(w)) ?? []);
  const a = bag(title), b = bag(body);
  if (!a.size || !b.size) return null;
  let shared = 0;
  for (const w of a) if (b.has(w) || [...b].some((x) => x.startsWith(w.slice(0, 5)) && w.length >= 5)) shared++;
  return shared / a.size;
}

// ---------- Text counts ----------

export const wordCount = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);
export const charCount = (s: string) => [...s].length;
/** Approximate speaking time at a relaxed 140 words per minute. */
export const speakingSeconds = (words: number) => Math.round((words / 140) * 60);
