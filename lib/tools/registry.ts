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

export const TOOLS: Record<string, ToolPage> = Object.fromEntries(PAGES.map((p) => [p.slug, p]));

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

export const toolsIn = (group: ToolGroup) => PAGES.filter((p) => p.group === group);
