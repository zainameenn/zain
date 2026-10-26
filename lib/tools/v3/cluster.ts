// Word based keyword grouping (no AI). Fast and transparent: keywords that share meaningful words are
// grouped together. It doesn't understand synonyms or intent; the AI mode and a manual check of live
// results cover that.

const STOP = new Set("a an and are as at be best buy by can cheap do does for free from get how i in is it my near of on or the to top vs what when where which who why will with you your me".split(" "));

/** Very light stemming so "shoe" and "shoes", "running" and "run" line up. */
function stem(w: string) {
  return w.replace(/ings?$/, "").replace(/ies$/, "y").replace(/(es|s)$/, "").replace(/(.)\1$/, "$1");
}

export const tokens = (kw: string) => [
  ...new Set(
    kw
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .split(/\s+/)
      .filter((w) => w && !STOP.has(w))
      .map(stem),
  ),
];

export type LexCluster = { label: string; primaryKeyword: string; keywords: string[] };

/** Reads one keyword per line. Accepts "keyword<TAB>volume" or "keyword,volume" from research tool exports. */
export function parseKeywordList(text: string, max: number): { keywords: string[]; duplicates: string[]; volumes: Record<string, number>; truncated: number } {
  const seen = new Map<string, string>();
  const duplicates: string[] = [];
  const volumes: Record<string, number> = {};
  for (const line of text.split(/\r?\n/)) {
    const [rawKw, rawVol] = line.split(/\t|,(?=\s*\d[\d,.]*\s*$)/);
    const kw = (rawKw ?? "").trim().replace(/\s+/g, " ");
    if (!kw || /^keywords?$/i.test(kw)) continue;
    const key = kw.toLowerCase();
    if (seen.has(key)) {
      duplicates.push(kw);
      continue;
    }
    seen.set(key, kw);
    const vol = Number((rawVol ?? "").replace(/[^\d.]/g, ""));
    if (rawVol && Number.isFinite(vol)) volumes[kw] = vol;
  }
  const all = [...seen.values()];
  return { keywords: all.slice(0, max), duplicates, volumes, truncated: Math.max(0, all.length - max) };
}

/** Greedy grouping by shared word stems. threshold: share of the smaller side's words that must overlap. */
export function lexicalClusters(keywords: string[], threshold = 0.5, volumes: Record<string, number> = {}): { clusters: LexCluster[]; ungrouped: string[] } {
  const toks = new Map(keywords.map((k) => [k, tokens(k)]));
  const groups: string[][] = [];
  for (const k of keywords) {
    const t = toks.get(k)!;
    let best: string[] | null = null;
    let bestScore = 0;
    for (const g of groups) {
      const gt = new Set(g.flatMap((x) => toks.get(x)!));
      const shared = t.filter((w) => gt.has(w)).length;
      const score = t.length && gt.size ? shared / Math.min(t.length, gt.size) : 0;
      if (score > bestScore) {
        bestScore = score;
        best = g;
      }
    }
    if (best && bestScore >= threshold) best.push(k);
    else groups.push([k]);
  }
  const clusters: LexCluster[] = [];
  const ungrouped: string[] = [];
  for (const g of groups) {
    if (g.length < 2) {
      ungrouped.push(g[0]);
      continue;
    }
    // Primary: the highest imported volume if given, otherwise the keyword sharing the most words with the rest.
    const overlap = (k: string) => g.reduce((n, o) => n + toks.get(k)!.filter((w) => toks.get(o)!.includes(w)).length, 0);
    const primary = [...g].sort((a, b) => (volumes[b] ?? -1) - (volumes[a] ?? -1) || overlap(b) - overlap(a) || a.length - b.length)[0];
    const common = toks.get(primary)!.filter((w) => g.every((o) => toks.get(o)!.includes(w)));
    clusters.push({ label: (common.length ? common.join(" ") : primary).replace(/^\p{L}/u, (c) => c.toUpperCase()), primaryKeyword: primary, keywords: g });
  }
  clusters.sort((a, b) => b.keywords.length - a.keywords.length);
  return { clusters, ungrouped };
}
