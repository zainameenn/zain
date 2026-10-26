// robots.txt evaluation following RFC 9309 and Google's documented behaviour. No AI, runs anywhere.
// Group selection: the most specific user-agent token that matches the crawler, else "*". Groups with the
// same user-agent are merged. Rule matching: the longest matching path wins; on a tie, Allow wins.
// Supports * wildcards and a trailing $ end anchor. Paths are compared case sensitively.

export type RobotsRule = { type: "allow" | "disallow"; path: string; line: number; text: string };
export type RobotsGroup = { agents: string[]; rules: RobotsRule[] };
export type RobotsReport = {
  decision: "allowed" | "disallowed";
  group: string;
  matched: RobotsRule | null;
  explanation: string;
  warnings: string[];
  sitemaps: string[];
};

const KNOWN = new Set(["user-agent", "allow", "disallow", "sitemap", "crawl-delay", "host", "clean-param"]);

export function parseRobots(text: string): { groups: RobotsGroup[]; warnings: string[]; sitemaps: string[] } {
  const groups: RobotsGroup[] = [];
  const warnings: string[] = [];
  const sitemaps: string[] = [];
  let current: RobotsGroup | null = null;
  let lastWasAgent = false;
  if (new TextEncoder().encode(text).length > 500 * 1024) warnings.push("Google only reads the first 500 KiB of a robots.txt file. Rules after that are ignored.");
  text
    .replace(/^﻿/, "")
    .split(/\r\n|\r|\n/)
    .forEach((raw, i) => {
      const line = raw.replace(/#.*$/, "").trim();
      if (!line) return;
      const m = line.match(/^([A-Za-z-]+)\s*:\s*(.*)$/);
      if (!m) {
        warnings.push(`Line ${i + 1} isn't a "field: value" line and is ignored: ${raw.trim().slice(0, 60)}`);
        return;
      }
      const field = m[1].toLowerCase();
      const value = m[2].trim();
      if (field === "user-agent") {
        // Consecutive User-agent lines share one group.
        if (!current || !lastWasAgent) {
          current = { agents: [], rules: [] };
          groups.push(current);
        }
        current.agents.push(value.toLowerCase());
        lastWasAgent = true;
        return;
      }
      lastWasAgent = false;
      if (field === "sitemap") {
        sitemaps.push(value);
        return;
      }
      if (field === "allow" || field === "disallow") {
        if (!current) {
          warnings.push(`Line ${i + 1}: "${field}" comes before any User-agent line and is ignored.`);
          return;
        }
        // An empty Disallow means nothing is disallowed, so it matches no path.
        if (value) current.rules.push({ type: field, path: value, line: i + 1, text: raw.trim() });
        return;
      }
      if (!KNOWN.has(field)) warnings.push(`Line ${i + 1}: "${m[1]}" isn't a directive crawlers understand.`);
      else if (field === "crawl-delay") warnings.push(`Line ${i + 1}: Googlebot ignores Crawl-delay. Some other crawlers use it.`);
    });
  return { groups, warnings, sitemaps };
}

/** The product token of a crawler name, e.g. "Googlebot-Image/1.0" becomes "googlebot-image". */
const token = (agent: string) => agent.toLowerCase().split("/")[0].trim();

function pickGroups(groups: RobotsGroup[], crawler: string): { agents: string; rules: RobotsRule[] } {
  const t = token(crawler);
  let best = "";
  for (const g of groups) for (const a of g.agents) if (a !== "*" && t.startsWith(a) && a.length > best.length) best = a;
  const want = best || "*";
  const matching = groups.filter((g) => g.agents.includes(want));
  return { agents: matching.length ? want : "", rules: matching.flatMap((g) => g.rules) };
}

const decode = (s: string) => {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
};

/** A robots.txt path pattern as a regular expression anchored at the start of the path. */
function patternToRegex(pattern: string): RegExp {
  const anchored = pattern.endsWith("$");
  const body = (anchored ? pattern.slice(0, -1) : pattern)
    .split("*")
    .map((part) => decode(part).replace(/[.+?^${}()|[\]\\]/g, "\\$&"))
    .join(".*");
  return new RegExp(`^${body}${anchored ? "$" : ""}`);
}

/** The path plus query that robots.txt rules are matched against. */
export function toPath(input: string): string {
  const s = input.trim();
  if (!s) return "/";
  try {
    const u = new URL(s);
    return decode(u.pathname + u.search) || "/";
  } catch {
    return decode(s.startsWith("/") ? s : `/${s}`);
  }
}

export function testRobots(text: string, crawler: string, urlOrPath: string): RobotsReport {
  const { groups, warnings, sitemaps } = parseRobots(text);
  const path = toPath(urlOrPath);
  const { agents, rules } = pickGroups(groups, crawler);
  if (path === "/robots.txt") return { decision: "allowed", group: agents || "none", matched: null, explanation: "Crawlers can always fetch /robots.txt itself.", warnings, sitemaps };
  if (!agents) return { decision: "allowed", group: "none", matched: null, explanation: `No group names ${crawler} and there's no "User-agent: *" group, so nothing is blocked for it.`, warnings, sitemaps };

  let matched: RobotsRule | null = null;
  let len = -1;
  let tie = false;
  for (const r of rules) {
    if (!patternToRegex(r.path).test(path)) continue;
    // Specificity is the length of the rule's path. Allow wins a tie.
    const l = r.path.length;
    if (l > len) tie = false;
    else if (l === len && matched && matched.type !== r.type) tie = true;
    if (l > len || (l === len && r.type === "allow")) {
      matched = r;
      len = l;
    }
  }
  const groupLabel = agents === "*" ? 'the "User-agent: *" group' : `the "User-agent: ${agents}" group`;
  if (!matched) return { decision: "allowed", group: agents, matched: null, explanation: `No rule in ${groupLabel} matches ${path}, so it's allowed.`, warnings, sitemaps };
  return {
    decision: matched.type === "allow" ? "allowed" : "disallowed",
    group: agents,
    matched,
    explanation: `In ${groupLabel}, line ${matched.line} (${matched.text}) is the most specific rule that matches ${path}.${tie ? " An Allow and a Disallow rule were equally specific, and Allow wins a tie." : ""}`,
    warnings,
    sitemaps,
  };
}
