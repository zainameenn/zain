// Checks the agent readiness items: Markdown content negotiation, agent friendly 404s,
// llms.txt instructions, JSON-LD identity and the sitemap. Plain HTTP requests, like curl.
//
// Usage: node scripts/check-agent-readiness.mjs [baseUrl]
// Run against a production build: pnpm build && pnpm start, then
// node scripts/check-agent-readiness.mjs http://localhost:3000

const BASE = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");
const PAGES = ["/", "/services", "/pricing", "/about", "/contact", "/case-studies", "/case-studies/blainy", "/case-studies/everdry", "/case-studies/virtarix", "/case-studies/loompad"];
const CASE_STUDIES = PAGES.filter((p) => p.startsWith("/case-studies/"));

let failed = 0;
const pass = (msg) => console.log(`PASS  ${msg}`);
const fail = (msg) => { failed++; console.log(`FAIL  ${msg}`); };
const warn = (msg) => console.log(`WARN  ${msg}`);
const check = (ok, msg) => (ok ? pass(msg) : fail(msg));

async function get(path, accept) {
  const res = await fetch(BASE + path, { headers: accept ? { accept } : {}, redirect: "manual" });
  return { status: res.status, type: res.headers.get("content-type") ?? "", vary: res.headers.get("vary") ?? "", body: await res.text() };
}

const varyHasAccept = (v) => v.split(",").map((s) => s.trim().toLowerCase()).includes("accept");

// 1. Markdown content negotiation
console.log("\n# Markdown content negotiation");
for (const p of PAGES) {
  const md = await get(p, "text/markdown");
  const h1 = md.body.match(/^# .+/m)?.[0];
  check(
    md.status === 200 && md.type === "text/markdown; charset=utf-8" && varyHasAccept(md.vary) && md.body.length > 300 && !!h1 && !/<html/i.test(md.body),
    `${p} as Markdown: ${md.status}, "${md.type}", Vary: ${md.vary || "none"}, ${md.body.length} chars, ${h1 ? `H1 "${h1.slice(2, 60)}"` : "no H1"}`,
  );
  const html = await get(p, "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8");
  check(html.status === 200 && html.type.startsWith("text/html") && /<html/i.test(html.body), `${p} as HTML for browsers: ${html.status}, "${html.type}"`);
  if (!varyHasAccept(html.vary)) warn(`${p} HTML response Vary is "${html.vary}" (no Accept; see report)`);
}

// 2. Agent friendly 404s
console.log("\n# 404s");
const missing = "/this-page-does-not-exist";
const md404 = await get(missing, "text/markdown");
check(
  md404.status === 404 && md404.type.startsWith("text/markdown") && md404.body.length >= 20 && md404.body.includes("/sitemap.xml") && md404.body.includes("/llms.txt") && /\]\(https:\/\/www\.zainameen\.com\/\)/.test(md404.body),
  `Markdown 404: ${md404.status}, "${md404.type}", ${md404.body.length} chars, links to home, sitemap and llms.txt`,
);
const html404 = await get(missing, "text/html");
check(html404.status === 404 && html404.type.startsWith("text/html"), `HTML 404 for browsers: ${html404.status}, "${html404.type}"`);

// 3. llms.txt agent instructions
console.log("\n# llms.txt");
const llms = await get("/llms.txt");
check(llms.status === 200, `llms.txt: ${llms.status}`);
check(/^## When to use$/m.test(llms.body), `has a "When to use" section`);
check(["$499", "$1,199", "$1,499", "$1,999", "$3,999"].every((p) => llms.body.includes(p)), "lists starting prices from the site");
check(llms.body.includes("hello@zainameen.com") && llms.body.includes("/contact"), "says how to get in touch");
check(CASE_STUDIES.every((p) => llms.body.includes(`https://www.zainameen.com${p}`)), "links all four case studies");
check(/Not a good match/i.test(llms.body), "says who it's not right for");

// 4. JSON-LD
console.log("\n# JSON-LD");
function jsonLd(html) {
  const nodes = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    let data;
    try { data = JSON.parse(m[1]); } catch (e) { fail(`JSON-LD block does not parse: ${e.message}`); continue; }
    for (const n of data["@graph"] ?? [data]) nodes.push(n);
  }
  return nodes;
}
const isType = (n, t) => [].concat(n["@type"]).includes(t);

const home = jsonLd((await get("/", "text/html")).body);
check(home.length > 0 && home.every((n) => n["@type"]), `homepage: ${home.length} JSON-LD nodes in the raw HTML, all typed`);
const person = home.find((n) => isType(n, "Person"));
check(person?.name === "Zain Ul Abdin" && /growth marketing specialist/i.test(person?.jobTitle ?? ""), `Person: ${person?.name}, ${person?.jobTitle}`);
const org = home.find((n) => isType(n, "Organization"));
const a = org?.address ?? {};
check(!!(org?.name && org.url && org.logo && org.description && org.sameAs?.length), `Organization: name, url, logo, description, ${org?.sameAs?.length ?? 0} sameAs profiles`);
check(org?.contactPoint?.contactType && org.contactPoint.email === "hello@zainameen.com", `Organization contactPoint: ${org?.contactPoint?.contactType}, ${org?.contactPoint?.email}`);
check(a["@type"] === "PostalAddress" && a.addressLocality === "Lahore" && a.addressRegion === "Punjab" && a.addressCountry === "PK" && !a.streetAddress, `Organization address: ${a.addressLocality}, ${a.addressRegion}, ${a.addressCountry}, no street`);
if (!org?.contactPoint?.telephone) warn("No telephone in contactPoint (none on the site, so left out on purpose)");

for (const p of CASE_STUDIES) {
  const nodes = jsonLd((await get(p, "text/html")).body);
  const art = nodes.find((n) => isType(n, "Article"));
  const crumbs = nodes.find((n) => isType(n, "BreadcrumbList"));
  check(art?.headline && art.author && art.image && crumbs?.itemListElement?.length === 3, `${p}: Article "${art?.headline}", BreadcrumbList with ${crumbs?.itemListElement?.length ?? 0} items`);
}
const listNodes = jsonLd((await get("/case-studies", "text/html")).body);
check(listNodes.some((n) => isType(n, "BreadcrumbList")) && listNodes.some((n) => isType(n, "CollectionPage")), "/case-studies: BreadcrumbList and CollectionPage");

// 5. Sitemap and trust pages
console.log("\n# Sitemap and trust pages");
const sitemap = (await get("/sitemap.xml")).body;
check(["/case-studies", ...CASE_STUDIES].every((p) => sitemap.includes(`https://www.zainameen.com${p}</loc>`)), "sitemap lists /case-studies and all four case studies");
for (const p of ["/about", "/contact"]) check((await get(p, "text/html")).status === 200, `${p} exists`);
const privacy = await get("/privacy", "text/html");
if (privacy.status === 200) pass("/privacy exists");
else warn(`/privacy returns ${privacy.status}: there's no privacy page yet (left for you to decide)`);

console.log(`\n${failed ? `${failed} check(s) failed` : "All checks passed"}`);
process.exitCode = failed ? 1 : 0;
