// Writes lib/lastmod.json: the date each page's source files last changed on master, from git history.
// The XML sitemap uses these dates as <lastmod>. Pages with no known date get no <lastmod> at all,
// rather than a made up one. Redeploying never changes a date; only a real content commit does.
//
// Runs before every build (prebuild). If the checkout has no full git history (shallow clones on
// some build servers), it keeps the committed file instead of writing worse data.
// Run it yourself with: npm run lastmod

import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";

const OUT = "lib/lastmod.json";
const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();

try {
  if (git("rev-parse", "--is-shallow-repository") === "true") {
    console.log("lastmod: shallow clone, keeping the committed lib/lastmod.json");
    process.exit(0);
  }
} catch {
  console.log("lastmod: no git here, keeping the committed lib/lastmod.json");
  process.exit(0);
}

// The page list lives in TypeScript; read the paths and file lists out of it without a TS loader.
const src = readFileSync("lib/site-pages.ts", "utf8");
const pages = [...src.matchAll(/path: "([^"]+)"[^\n]*?files: \[([^\]]*)\]/g)].map((m) => ({ path: m[1], files: [...m[2].matchAll(/"([^"]+)"/g)].map((f) => f[1]) }));
const caseSlugs = [...readFileSync("app/case-studies/_data/index.ts", "utf8").matchAll(/import \{ (\w+) \} from "\.\/(\w+)"/g)].map((m) => m[2]).filter((s) => s !== "types");
const toolFiles = [...src.match(/TOOL_FILES = \[([\s\S]*?)\];/)[1].matchAll(/"([^"]+)"/g)].map((f) => f[1]);

const lastChange = (files) => {
  if (!files.length) return null;
  try {
    return git("log", "-1", "--format=%cs", "--", ...files.map((f) => (f.startsWith("!") ? `:(exclude,literal)${f.slice(1)}` : `:(literal)${f}`))) || null;
  } catch {
    return null;
  }
};

const out = {};
for (const p of pages) {
  const d = lastChange(p.files);
  if (d) out[p.path] = d;
}
for (const slug of caseSlugs) {
  const d = lastChange([`app/case-studies/${slug}`, `app/case-studies/_data/${slug}.ts`, "app/case-studies/_components"]);
  if (d) out[`/case-studies/${slug}`] = d;
}
const tools = lastChange(toolFiles);
if (tools) out["/tools/*"] = tools;

const sorted = Object.fromEntries(Object.entries(out).sort(([a], [b]) => a.localeCompare(b)));
const next = JSON.stringify(sorted, null, 2) + "\n";
let prev = "";
try {
  prev = readFileSync(OUT, "utf8");
} catch {}
if (prev !== next) writeFileSync(OUT, next);
console.log(`lastmod: ${Object.keys(sorted).length} pages dated${prev === next ? " (unchanged)" : ""}`);
