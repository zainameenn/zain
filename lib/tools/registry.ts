import { BIO_PLATFORMS, bioPage } from "./families/bio";
import { CAPTION_PLATFORMS, captionPage } from "./families/caption";
import { TITLE_PLATFORMS, titlePage } from "./families/title";
import { ETSY_TITLE, PRODUCT_DESCRIPTION } from "./pages/ecommerce";
import { ABOUT, COMMENT, HEADLINE, POST } from "./pages/linkedin";
import { CALENDAR, MARKETING_PLAN } from "./pages/planning";
import { META_DESCRIPTION, SEO_TITLE, UTM_BUILDER } from "./pages/seo";
import { TOOL_META } from "./meta";
import type { ToolGroup, ToolPage } from "./types";
import { V3_PAGES } from "./v3/pages";
import { metaDescriptionPage, seoTitlePage } from "./families/writers";
import { contentCalendarPage, linkedinCommentPage, marketingPlanPage, utmBuilderPage } from "./families/writers-final";
import { etsyTitlePage, linkedinAboutPage, linkedinHeadlinePage, linkedinPostPage, productDescriptionPage } from "./families/writers-more";

// Every tool page, keyed by slug. Family pages are built from one family config plus a platform override.
const PAGES: ToolPage[] = [
  ...BIO_PLATFORMS.map(bioPage),
  ...CAPTION_PLATFORMS.map(captionPage),
  ...TITLE_PLATFORMS.map(titlePage),
  contentCalendarPage(CALENDAR),
  marketingPlanPage(MARKETING_PLAN),
  seoTitlePage(SEO_TITLE),
  metaDescriptionPage(META_DESCRIPTION),
  utmBuilderPage(UTM_BUILDER),
  etsyTitlePage(ETSY_TITLE),
  productDescriptionPage(PRODUCT_DESCRIPTION),
  linkedinHeadlinePage(HEADLINE),
  linkedinAboutPage(ABOUT),
  linkedinPostPage(POST),
  linkedinCommentPage(COMMENT),
  ...V3_PAGES,
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
  "tiktok-caption-generator",
  "facebook-caption-generator",
  "youtube-title-generator",
  "youtube-description-generator",
  "pinterest-title-generator",
  "pinterest-description-generator",
  "seo-title-generator",
  "meta-description-generator",
  "etsy-title-generator",
  "product-description-generator",
  "linkedin-headline-generator",
  "linkedin-about-section-generator",
  "linkedin-post-generator",
  "linkedin-comment-generator",
  "social-media-content-calendar-generator",
  "marketing-plan-generator",
  "utm-link-builder",
  // October 2026: ten new tools (lib/tools/v3).
  "etsy-shop-name-generator",
  "shopify-store-name-generator",
  "youtube-channel-name-generator",
  "youtube-shorts-script-generator",
  "google-ads-negative-keyword-generator",
  "seo-search-intent-classifier",
  "llms-txt-generator",
  "etsy-offsite-ads-calculator",
  "shopify-profit-margin-calculator",
  "google-review-link-generator",
  // October 26, 2026: tools 11 to 20.
  "etsy-fee-calculator",
  "newsletter-name-generator",
  "shopify-product-title-generator",
  "customer-acquisition-cost-calculator",
  "podcast-name-generator",
  "seo-keyword-cluster-generator",
  "robots-txt-tester",
  "domain-name-ideas-generator",
  "youtube-video-script-generator",
  "local-business-faq-generator",
  // October 26, 2026: tools 21 to 40.
  "instagram-username-generator",
  "tiktok-username-generator",
  "business-name-generator",
  "business-slogan-generator",
  "blog-name-generator",
  "youtube-thumbnail-text-generator",
  "youtube-chapters-generator",
  "seo-content-brief-generator",
  "robots-txt-generator",
  "xml-sitemap-validator",
  "local-business-schema-generator",
  "shopify-collection-description-generator",
  "etsy-shop-announcement-generator",
  "etsy-shop-about-section-generator",
  "break-even-roas-calculator",
  "ltv-cac-ratio-calculator",
  "email-preheader-generator",
  "website-hero-headline-generator",
  "saas-value-proposition-generator",
  "changelog-entry-generator",
]);
// SEO titles and descriptions from lib/tools/meta.ts override the page configs.
const WITH_META = PAGES.map((p) => (TOOL_META[p.slug] ? { ...p, metaTitle: TOOL_META[p.slug].title, metaDescription: TOOL_META[p.slug].description } : p));
const SHOWN = process.env.NODE_ENV === "development" ? WITH_META : WITH_META.filter((p) => LIVE.has(p.slug));

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
  "instagram-caption-generator": "published",
  "tiktok-caption-generator": "published",
  "facebook-caption-generator": "published",
  "youtube-title-generator": "published",
  "youtube-description-generator": "published",
  "pinterest-title-generator": "published",
  "pinterest-description-generator": "published",
  "seo-title-generator": "published",
  "meta-description-generator": "published",
  "etsy-title-generator": "published",
  "product-description-generator": "published",
  "linkedin-headline-generator": "published",
  "linkedin-about-section-generator": "published",
  "linkedin-post-generator": "published",
  "linkedin-comment-generator": "published",
  "social-media-content-calendar-generator": "published",
  "marketing-plan-generator": "published",
  "utm-link-builder": "published",
  "tiktok-bio-generator": "published",
  "twitter-bio-generator": "published",
  "threads-bio-generator": "published",
  "facebook-bio-generator": "published",
};
export const statusOf = (slug: string): ToolStatus => STATUS[slug] ?? "development";

/** Every tool in the collection, live or not, for the hub directory. Unshown tools carry no link. */
export const ALL_TOOLS = PAGES.map((p) => ({ slug: p.slug, name: p.name, group: p.group, linked: Boolean(TOOLS[p.slug]) }));
