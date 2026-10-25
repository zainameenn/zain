import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

// Changelog content system. Every entry is one Markdown file in content/changelog/<slug>.md
// with a small frontmatter block on top. Publishing = status: published plus a publishedAt date.
// Drafts never reach a public page, the sitemap or the RSS feed. See docs/CHANGELOG_AND_SITEMAP.md.

export const CHANGELOG_CATEGORIES = {
  "new-tool": "New Tools",
  improvement: "Improvements",
  fix: "Fixes",
  website: "Website Updates",
  "services-pricing": "Services & Pricing",
  "case-study": "Case Studies",
} as const;

export type ChangelogCategory = keyof typeof CHANGELOG_CATEGORIES;

export type ChangelogEntry = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: ChangelogCategory;
  /** YYYY-MM-DD, the day the change went live. Null while it's a draft. */
  publishedAt: string | null;
  /** Only set when the entry was materially revised after publishing. */
  updatedAt?: string | null;
  status: "draft" | "published";
  featuredImage?: string;
  imageAlt?: string;
  /** Where the CTA points: the tool, service, pricing page or case study. */
  relatedUrl?: string;
  relatedLabel?: string;
  /** Tool or service name, shown on the card. */
  subject?: string;
  relatedUpdates?: string[];
  seoTitle?: string;
  seoDescription?: string;
  /** Markdown body: ## headings, - lists, paragraphs, [links](url), **bold**. */
  content: string;
};

const DIR = path.join(process.cwd(), "content", "changelog");

function parse(file: string): ChangelogEntry {
  const raw = readFileSync(path.join(DIR, file), "utf8").replace(/\r\n/g, "\n");
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`Changelog: ${file} has no frontmatter block.`);
  const fm: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) fm[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  const slug = file.replace(/\.md$/, "");
  const category = fm.category as ChangelogCategory;
  if (!(category in CHANGELOG_CATEGORIES)) throw new Error(`Changelog: ${file} has an unknown category "${fm.category}".`);
  const status = fm.status === "published" ? "published" : "draft";
  const date = (v?: string) => (v && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : null);
  return {
    id: fm.id || slug,
    slug,
    title: fm.title,
    summary: fm.summary,
    category,
    publishedAt: date(fm.publishedAt),
    updatedAt: date(fm.updatedAt),
    status,
    featuredImage: fm.featuredImage || undefined,
    imageAlt: fm.imageAlt || undefined,
    relatedUrl: fm.relatedUrl || undefined,
    relatedLabel: fm.relatedLabel || undefined,
    subject: fm.subject || undefined,
    relatedUpdates: fm.relatedUpdates ? fm.relatedUpdates.split(",").map((s) => s.trim()).filter(Boolean) : undefined,
    seoTitle: fm.seoTitle || undefined,
    seoDescription: fm.seoDescription || undefined,
    content: m[2].trim(),
  };
}

let cache: ChangelogEntry[] | null = null;

/** Every entry, drafts included. Only use this for checks and tests. */
export function allEntries(): ChangelogEntry[] {
  if (!cache || process.env.NODE_ENV === "development") {
    cache = readdirSync(DIR)
      .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
      .map(parse);
  }
  return cache;
}

/** Published entries, newest first. A published entry must have a date, or it stays hidden. */
export function publishedEntries(): ChangelogEntry[] {
  return allEntries()
    .filter((e) => e.status === "published" && e.publishedAt)
    .sort((a, b) => b.publishedAt!.localeCompare(a.publishedAt!) || a.title.localeCompare(b.title));
}

export function getEntry(slug: string): ChangelogEntry | undefined {
  return publishedEntries().find((e) => e.slug === slug);
}

/** The date search engines should see as last modified. */
export const entryModified = (e: ChangelogEntry) => e.updatedAt || e.publishedAt!;

export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}

/** Explicit related entries first, then the newest from the same category. */
export function relatedEntries(e: ChangelogEntry, max = 3): ChangelogEntry[] {
  const all = publishedEntries().filter((x) => x.slug !== e.slug);
  const picked = (e.relatedUpdates ?? []).map((s) => all.find((x) => x.slug === s)).filter(Boolean) as ChangelogEntry[];
  for (const x of all) if (picked.length < max && x.category === e.category && !picked.includes(x)) picked.push(x);
  return picked.slice(0, max);
}

/** Newer and older neighbours in the published list. */
export function neighbours(e: ChangelogEntry): { newer?: ChangelogEntry; older?: ChangelogEntry } {
  const list = publishedEntries();
  const i = list.findIndex((x) => x.slug === e.slug);
  return { newer: list[i - 1], older: list[i + 1] };
}
