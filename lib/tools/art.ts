// Section illustrations for tool pages. Rule (November 2026 cleanup): an illustration explains an idea with
// shapes and objects, never with sentences, so the explanation stays in the HTML beside it.
// - The site illustrations (lib/illustrations.ts) are reused wherever one fits the tool.
// - The SEO tool SVGs in public/assets/tools/art are simplified versions of graphics batch 05 and 03/04:
//   headlines, footnotes and sentences removed, only short labels such as status codes kept.
// - The WebP files are trimmed, resized copies of the supplied raster artwork.

import { ILLUSTRATIONS } from "@/lib/illustrations";

export type ToolArt = { src: string; alt: string; width: number; height: number };

const svg = (file: string, alt: string, width = 1200, height = 510): ToolArt => ({ src: `/assets/tools/art/${file}.svg`, alt, width, height });
const webp = (file: string, alt: string, width: number, height: number): ToolArt => ({ src: `/assets/tools/art/${file}.webp`, alt, width, height });

export const ART = {
  facebookBio: ILLUSTRATIONS.A24,
  twitterBio: ILLUSTRATIONS.A22,
  tiktokBio: ILLUSTRATIONS.A21,
  etsyTitle: ILLUSTRATIONS.A60,
  youtubeChannelName: ILLUSTRATIONS.A73,
  websiteAudit: svg("website-audit-checks", "A web page under review next to a list of example on page checks", 1200, 820),
  keywordResearch: svg("keyword-research-intent", "A seed topic branching into three groups of related keywords", 1200, 820),
  longTail: svg("long-tail-branches", "A seed keyword branching into three more specific searches"),
  onPage: svg("on-page-checks", "A page under review next to example findings, some passed and some to fix"),
  serp: svg("serp-anatomy", "An illustrated search results page with a sponsored placement, organic listings and answer features as separate elements"),
  keywordGap: svg("keyword-gap-overlap", "Two overlapping circles: search terms only you cover, terms you share, and terms only a competitor covers"),
  brokenLinks: svg("broken-link-map", "A homepage linking to a working page and to a link that ends at a 404 page"),
  coreWebVitals: svg("core-web-vitals-gauges", "A page preview next to three illustrative gauges for LCP, INP and CLS"),
  sitemap: svg("sitemap-url-statuses", "A sitemap file branching into URLs with 200, 301 and 404 statuses"),
  peopleAlsoAsk: svg("people-also-ask-questions", "One seed topic expanding into three related search questions"),
  rankTracking: svg("rank-tracking-positions", "Illustrative keyword positions moving between two dates, with an example trend line"),
  // Raster artwork, converted to WebP.
  toolsSearch: webp("tools-search-ecosystem", "A central tool search panel connected to SEO, social media, content and ecommerce tool groups", 1172, 941),
  toolsCategories: webp("tools-toolkit-categories", "A toolkit at the centre of eight tool categories, from writing and images to keywords, analytics and code", 1182, 909),
  facebookCaption: webp("facebook-caption-photo", "A product photo and a few choices turning into a Facebook post with a caption", 1174, 852),
  linkedinPost: webp("linkedin-post-notes", "Rough notes, a goal and a chart turning into a finished LinkedIn post", 1174, 833),
  linkedinComment: webp("linkedin-comment-replies", "A LinkedIn post turning into three different comment drafts to choose from", 1174, 867),
  linkedinHeadline: webp("linkedin-headline-keywords", "Role, experience and audience settings turning a LinkedIn profile into one with a clearer headline", 1172, 1020),
  linkedinAbout: webp("linkedin-about-story", "Notes, a profile card and a few highlights organized into a LinkedIn About section", 1176, 819),
  linkedinExperience: webp("linkedin-experience-timeline", "Rough job notes turning into a LinkedIn experience entry with clear achievements", 1174, 962),
  linkedinSkills: webp("linkedin-skills-ranking", "A LinkedIn profile turned into a checked list of skills, then ordered with the most relevant first", 1172, 1051),
  youtubeChapters: webp("youtube-chapters-timeline", "A video and its audio turning into a timeline split into named chapters", 1182, 845),
  negativeKeywords: webp("negative-keyword-filter", "Search terms passing through a filter: relevant terms continue, irrelevant ones are set aside as negative keywords", 1182, 804),
  keywordClusters: webp("keyword-cluster-groups", "A pile of keywords sorted into four page level groups", 1184, 836),
} satisfies Record<string, ToolArt>;

/** The illustration beside a tool page's "how it works" section. Tools not listed fall back to their site illustration (lib/illustrations.ts). */
const BY_SLUG: Record<string, ToolArt> = {
  "youtube-chapters-generator": ART.youtubeChapters,
  "google-ads-negative-keyword-generator": ART.negativeKeywords,
  "seo-keyword-cluster-generator": ART.keywordClusters,
  "long-tail-keyword-generator": ART.longTail,
  "keyword-research-tool": ART.keywordResearch,
  "website-seo-checker": ART.onPage,
  "website-audit-tool": ART.websiteAudit,
  "serp-checker": ART.serp,
  "competitor-keyword-gap": ART.keywordGap,
  "broken-link-checker": ART.brokenLinks,
  "core-web-vitals-checker": ART.coreWebVitals,
  "sitemap-url-status-checker": ART.sitemap,
  "people-also-ask-tool": ART.peopleAlsoAsk,
  "keyword-rank-checker": ART.rankTracking,
};

export const toolArt = (slug: string): ToolArt | null => BY_SLUG[slug] ?? null;
