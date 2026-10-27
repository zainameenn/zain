import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import { hubImage } from "../lib/tools/hub";
import { TOOLS } from "../lib/tools/registry";
import { TOOL_THUMBNAILS, toolThumbnail } from "../lib/tools/thumbnails";

// The Free Tools directory thumbnails, T01 to T83. Run with: npm test

// The tool each thumbnail was drawn for, from the brief. Checked against the registry's tool names.
const BRIEF: string[] = [
  "Pinterest Description Generator", "YouTube Title Generator", "Pinterest Title Generator", "Social Media Content Calendar Generator", "YouTube Shorts Script Generator",
  "YouTube Video Script Generator", "Instagram Caption Generator", "LinkedIn Headline Generator", "SEO Title Generator", "Etsy Title Generator",
  "Instagram Bio Generator", "TikTok Bio Generator", "X Bio Generator", "Threads Bio Generator", "Facebook Bio Generator",
  "TikTok Caption Generator", "Facebook Caption Generator", "YouTube Description Generator", "YouTube Chapter Generator", "Meta Description Generator",
  "LinkedIn About Section Generator", "LinkedIn Post Generator", "LinkedIn Comment Generator", "YouTube Thumbnail Text Generator", "Marketing Plan Generator",
  "UTM Link Builder", "Negative Keyword Generator", "Search Intent Classifier", "SEO Keyword Cluster Generator", "LLMS.txt Generator",
  "Robots.txt Tester", "Robots.txt Generator", "XML Sitemap Validator", "XML Sitemap Generator", "Local Business Schema Generator",
  "JSON-LD Schema Validator", "Hreflang Tag Generator", "Canonical URL Checker", "Redirect Chain Checker", "Product Schema Generator",
  "Open Graph Tags Generator", "Internal Link Opportunity Finder", "SEO Content Brief Generator", "Keyword to Page Mapper", "SEO Content Gap Planner",
  "Local Service Page Outline Generator", "Local SEO Keyword Modifier Generator", "Local Business FAQ Generator", "Google Review Link Generator", "Website Hero Headline Generator",
  "Product Description Generator", "Shopify Product Title Generator", "Shopify Collection Description Generator", "Etsy Shop Announcement Generator", "Etsy Shop About Section Generator",
  "Shopify SKU Generator", "Shopify Abandoned Checkout Email Generator", "Etsy Shop Name Generator", "Shopify Store Name Generator", "Etsy Fee Calculator",
  "YouTube Channel Name Generator", "Newsletter Name Generator", "Podcast Name Generator", "Domain Name Ideas Generator", "Instagram Username Generator",
  "TikTok Username Generator", "Business Name Generator", "Business Slogan Generator", "Blog Name Generator", "SaaS Product Name Generator",
  "Email Preheader Generator", "SaaS Value Proposition Generator", "Changelog Entry Generator", "Product Hunt Launch Copy Generator", "Landing Page Copy Generator",
  "Etsy Offsite Ads Calculator", "Shopify Profit Margin Calculator", "Customer Acquisition Cost Calculator", "Break-even ROAS Calculator", "LTV to CAC Ratio Calculator",
  "MRR Calculator", "Customer Retention Rate Calculator", "A/B Test Sample Size Calculator",
];

// Every word of the brief's title must appear in the registry name (ignoring case, punctuation and plurals).
const words = (s: string) => s.toLowerCase().replace(/\(.*?\)/g, " ").replace(/[^a-z0-9]+/g, " ").trim().split(" ").filter(Boolean).map((w) => w.replace(/s$/, ""));

test("all 83 thumbnails are mapped, one per tool, to the tool they were drawn for", () => {
  assert.equal(BRIEF.length, 83);
  assert.equal(Object.keys(TOOL_THUMBNAILS).length, 83);
  const bySlug = Object.entries(TOOL_THUMBNAILS);
  for (const [slug, file] of bySlug) {
    assert.ok(TOOLS[slug], `${file} maps to ${slug}, which is not a tool route`);
    const n = Number(file.match(/^T(\d\d)-/)?.[1]);
    const name = words(TOOLS[slug].name);
    for (const w of words(BRIEF[n - 1])) assert.ok(name.includes(w), `${file}: "${BRIEF[n - 1]}" doesn't match ${slug} (${TOOLS[slug].name})`);
  }
  assert.equal(new Set(Object.values(TOOL_THUMBNAILS)).size, 83, "two tools share a thumbnail");
});

test("every tool in the registry has a thumbnail file that exists, is 4:3 and is safe", () => {
  for (const slug of Object.keys(TOOLS)) {
    const src = toolThumbnail(slug);
    assert.ok(src, `${slug} has no thumbnail`);
    assert.equal(hubImage(slug), src, `${slug}: the directory resolves a different image`);
    const svg = readFileSync(`public${src}`, "utf8");
    assert.match(svg, /viewBox="0 0 1200 900"/, `${slug} is not 4:3`);
    assert.doesNotMatch(svg, /<script|foreignObject|data:|href="http/i, `${slug} has unsafe content`);
  }
});

test("the public copies match the source thumbnails", () => {
  const dir = "assets/free tools tumbail";
  const files = readdirSync(dir).filter((f) => f.endsWith(".svg"));
  assert.equal(files.length, 83);
  for (const f of files) assert.equal(readFileSync(`public/assets/tools/thumbnails/${f}`, "utf8"), readFileSync(`${dir}/${f}`, "utf8"), f);
});

test("tool card components no longer reference the old webp hub graphics", () => {
  for (const f of ["app/tools/page.tsx", "app/tools/_hub/Directory.tsx", "app/tools/_studio/StudioPage.tsx", "lib/tools/hub.ts"]) {
    assert.ok(existsSync(f));
    assert.doesNotMatch(readFileSync(f, "utf8"), /assets\/tools\/hub\//, `${f} still points at the old graphics`);
  }
});
