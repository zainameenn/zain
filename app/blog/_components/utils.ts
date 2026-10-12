import { stegaClean } from "next-sanity";
import type { PortableTextBlock } from "next-sanity";
import { SITE_URL } from "@/sanity/env";
import type { PostCard } from "@/sanity/lib/types";

export const MAX = 1280;
export const PAD = "clamp(20px,2.5vw,32px)";

/** "Oct 12, 2026". UTC so the server and browser always agree. */
export function formatDate(iso: string | null | undefined) {
  if (!iso) return "";
  return new Date(stegaClean(iso)).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

/** About 230 words a minute, about 5.5 characters a word including the space. */
export function readingMinutes(chars: number | null | undefined) {
  return Math.max(1, Math.round((chars ?? 0) / 5.5 / 230));
}

export const postPath = (slug: string) => `/blog/${slug}`;
export const categoryPath = (slug: string) => `/blog?category=${encodeURIComponent(slug)}`;
export const authorPath = (slug: string) => `/blog/author/${slug}`;
export const absolute = (path: string) => (path.startsWith("http") ? path : `${SITE_URL}${path}`);

export function slugify(text: string) {
  return stegaClean(text)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/[\s-]+/g, "-");
}

export type TocItem = { id: string; text: string; level: 2 | 3; key: string };

/** Builds the table of contents from H2 and H3 blocks, with unique ids for anchor links. */
export function buildToc(body: PortableTextBlock[] | null | undefined): TocItem[] {
  const seen = new Map<string, number>();
  const items: TocItem[] = [];
  for (const block of body ?? []) {
    if (block._type !== "block" || (block.style !== "h2" && block.style !== "h3")) continue;
    const text = (block.children as { text?: string }[] | undefined)?.map((c) => c.text ?? "").join("").trim() ?? "";
    if (!text) continue;
    const base = slugify(text) || "section";
    const count = seen.get(base) ?? 0;
    seen.set(base, count + 1);
    items.push({ id: count ? `${base}-${count + 1}` : base, text: stegaClean(text), level: block.style === "h2" ? 2 : 3, key: block._key as string });
  }
  return items;
}

/** Splits text into paragraphs on blank lines. */
export const paragraphs = (text: string | null | undefined) =>
  (text ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

export const initials = (name: string) =>
  stegaClean(name)
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

/** Picks up to 3 related posts: the ones chosen in the Studio first, then same category (shared tags first), then the latest. */
export function pickRelated(
  self: { _id: string; tags?: string[] | null },
  picked: PostCard[] | null | undefined,
  refs: string[] | null | undefined,
  sameCategory: (PostCard & { tags?: string[] | null })[] | null | undefined,
  latest: PostCard[] | null | undefined,
) {
  const order = new Map((refs ?? []).map((r, i) => [r, i]));
  const chosen = [...(picked ?? [])].sort((a, b) => (order.get(a._id) ?? 0) - (order.get(b._id) ?? 0));
  const tags = new Set((self.tags ?? []).map((t) => stegaClean(t).toLowerCase()));
  const shared = (p: { tags?: string[] | null }) => (p.tags ?? []).filter((t) => tags.has(stegaClean(t).toLowerCase())).length;
  const byTags = [...(sameCategory ?? [])].sort((a, b) => shared(b) - shared(a));
  const out: PostCard[] = [];
  for (const p of [...chosen, ...byTags, ...(latest ?? [])]) {
    if (out.length === 3) break;
    if (p._id !== self._id && !out.some((o) => o._id === p._id)) out.push(p);
  }
  return out;
}
