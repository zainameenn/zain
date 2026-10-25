import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { CHANGELOG_CATEGORIES, allEntries, neighbours, publishedEntries, relatedEntries } from "../lib/changelog";
import { SITE_PAGES } from "../lib/site-pages";

// Run with: npm test

const all = allEntries();
const published = publishedEntries();

test("every entry parses with a known category and a unique slug", () => {
  assert.ok(all.length > 0);
  assert.equal(new Set(all.map((e) => e.slug)).size, all.length);
  for (const e of all) {
    assert.ok(e.title && e.summary, `${e.slug}: title and summary`);
    assert.ok(e.category in CHANGELOG_CATEGORIES, `${e.slug}: category`);
    assert.ok(e.content.length > 40, `${e.slug}: content`);
  }
});

test("drafts never show up as published, and published entries always have a date", () => {
  for (const e of published) assert.ok(e.status === "published" && /^\d{4}-\d{2}-\d{2}$/.test(e.publishedAt ?? ""), e.slug);
  for (const e of all.filter((x) => x.status === "draft")) assert.ok(!published.includes(e), `${e.slug} is a draft`);
});

test("published entries are newest first, and updatedAt is never before publishedAt", () => {
  for (let i = 1; i < published.length; i++) assert.ok(published[i - 1].publishedAt! >= published[i].publishedAt!);
  for (const e of published) if (e.updatedAt) assert.ok(e.updatedAt >= e.publishedAt!, e.slug);
});

test("images exist and related links point at real pages", () => {
  const known = new Set([...SITE_PAGES.map((p) => p.path), "/case-studies/blainy", "/case-studies/everdry", "/case-studies/virtarix", "/case-studies/loompad"]);
  for (const e of published) {
    if (e.featuredImage) assert.ok(existsSync(`public${e.featuredImage}`), `${e.slug}: ${e.featuredImage} missing`);
    if (e.relatedUrl) assert.ok(known.has(e.relatedUrl) || /^\/tools\/[a-z0-9-]+$/.test(e.relatedUrl), `${e.slug}: ${e.relatedUrl}`);
    for (const r of e.relatedUpdates ?? []) assert.ok(all.some((x) => x.slug === r), `${e.slug}: related ${r} doesn't exist`);
  }
});

test("related and previous/next only use published entries", () => {
  const slugs = new Set(published.map((e) => e.slug));
  for (const e of published) {
    for (const r of relatedEntries(e)) assert.ok(slugs.has(r.slug));
    const { newer, older } = neighbours(e);
    if (newer) assert.ok(slugs.has(newer.slug));
    if (older) assert.ok(slugs.has(older.slug));
  }
});

test("no em or en dashes in changelog copy", () => {
  for (const e of all) assert.ok(!/[–—]/.test(`${e.title} ${e.summary} ${e.content}`), e.slug);
});

test("lastmod dates are real dates, never in the future", () => {
  const lastmod = JSON.parse(readFileSync("lib/lastmod.json", "utf8")) as Record<string, string>;
  const today = new Date().toISOString().slice(0, 10);
  for (const [path, d] of Object.entries(lastmod)) assert.ok(/^\d{4}-\d{2}-\d{2}$/.test(d) && d <= today, `${path}: ${d}`);
});
