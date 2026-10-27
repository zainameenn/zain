import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import { ILLUSTRATIONS, toolIllustration } from "../lib/illustrations";
import { TOOLS } from "../lib/tools/registry";

// The editorial illustration library. Run with: npm test

test("every illustration points at a real, safe SVG in public with its own alt text", () => {
  assert.equal(Object.keys(ILLUSTRATIONS).length, 116);
  for (const [id, a] of Object.entries(ILLUSTRATIONS)) {
    const file = `public${a.src}`;
    assert.ok(existsSync(file), `${id}: ${file} is missing`);
    const svg = readFileSync(file, "utf8");
    assert.doesNotMatch(svg, /<script|foreignObject|data:|href="http/i, `${id} has unsafe content`);
    assert.ok(a.alt.length > 10, `${id} has no alt text`);
    assert.ok(a.width > 0 && a.height > 0, `${id} has no size`);
  }
});

test("the public copies match the source files in assets/", () => {
  for (const f of readdirSync("assets").filter((f) => f.endsWith(".svg"))) {
    assert.equal(readFileSync(`public/assets/illustrations/${f}`, "utf8"), readFileSync(`assets/${f}`, "utf8"), f);
  }
});

test("every tool page has its own illustration, never shared with another tool", () => {
  const seen = new Map<string, string>();
  for (const slug of Object.keys(TOOLS)) {
    const art = toolIllustration(slug);
    assert.ok(art, `${slug} has no illustration`);
    assert.ok(!seen.has(art.src), `${slug} reuses ${seen.get(art.src)}'s illustration`);
    seen.set(art.src, slug);
  }
});

test("bio form mockups (account type, Copy bio) only appear on the bio generators", () => {
  const page = readFileSync("app/tools/_studio/StudioPage.tsx", "utf8");
  assert.match(page, /isBio \? <StepVisual kind=\{step\.visual\} \/> : null/);
  assert.match(page, /const isBio = !tool\.studio\?\.tool \|\| tool\.studio\.tool === "bio";/);
});
