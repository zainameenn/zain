import { BIO_PLATFORMS, bioPage } from "./families/bio";
import { CAPTION_PLATFORMS, captionPage } from "./families/caption";
import { TITLE_PLATFORMS, titlePage } from "./families/title";
import { ETSY_TITLE, PRODUCT_DESCRIPTION } from "./pages/ecommerce";
import { ABOUT, COMMENT, HEADLINE, POST } from "./pages/linkedin";
import { CALENDAR, MARKETING_PLAN } from "./pages/planning";
import { META_DESCRIPTION, SEO_TITLE, UTM_BUILDER } from "./pages/seo";
import type { ToolGroup, ToolPage } from "./types";

// Every tool page, keyed by slug. Family pages are built from one family config plus a platform override.
const PAGES: ToolPage[] = [
  ...BIO_PLATFORMS.map(bioPage),
  ...CAPTION_PLATFORMS.map(captionPage),
  ...TITLE_PLATFORMS.map(titlePage),
  CALENDAR,
  MARKETING_PLAN,
  SEO_TITLE,
  META_DESCRIPTION,
  UTM_BUILDER,
  ETSY_TITLE,
  PRODUCT_DESCRIPTION,
  HEADLINE,
  ABOUT,
  POST,
  COMMENT,
];

/**
 * Pages rebuilt to the Instagram bio standard and approved to go live. Add a slug here when its batch is approved.
 * In local dev every page renders, so unfinished batches can still be reviewed on localhost.
 */
const LIVE = new Set([
  "instagram-bio-generator",
  "tiktok-bio-generator",
  "twitter-bio-generator",
  "threads-bio-generator",
  "facebook-bio-generator",
  "instagram-caption-generator",
]);
const SHOWN = process.env.NODE_ENV === "development" ? PAGES : PAGES.filter((p) => LIVE.has(p.slug));

/** Every page that renders: the hub, sitemap, static params, related links and the API all read from this. */
export const TOOLS: Record<string, ToolPage> = Object.fromEntries(SHOWN.map((p) => [p.slug, p]));

export const toolPath = (slug: string) => `/tools/${slug}`;

export function getTool(slug: string): ToolPage | undefined {
  return Object.prototype.hasOwnProperty.call(TOOLS, slug) ? TOOLS[slug] : undefined;
}

/** Hub groups, in display order. */
export const GROUPS: { group: ToolGroup; heading: string }[] = [
  { group: "Social", heading: "Free social media tools" },
  { group: "SEO", heading: "Free SEO and planning tools" },
  { group: "Ecommerce", heading: "Free ecommerce tools" },
  { group: "LinkedIn", heading: "Free LinkedIn tools" },
];

export const toolsIn = (group: ToolGroup) => SHOWN.filter((p) => p.group === group);

/**
 * Development status of every tool, the single source of truth for the hub and the progress doc.
 * published: live on zainameen.com. review: rebuilt on the studio layout, waiting for approval to merge.
 * development: page exists in the codebase but isn't rebuilt or approved, so the hub shows it without a link.
 */
export type ToolStatus = "published" | "review" | "development" | "not-started";
export const STATUS: Record<string, ToolStatus> = {
  "instagram-bio-generator": "published",
  "instagram-caption-generator": "review",
  "tiktok-bio-generator": "published",
  "twitter-bio-generator": "published",
  "threads-bio-generator": "published",
  "facebook-bio-generator": "published",
};
export const statusOf = (slug: string): ToolStatus => STATUS[slug] ?? "development";

/** Every tool in the collection, live or not, for the hub directory. Unshown tools carry no link. */
export const ALL_TOOLS = PAGES.map((p) => ({ slug: p.slug, name: p.name, group: p.group, linked: Boolean(TOOLS[p.slug]) }));
