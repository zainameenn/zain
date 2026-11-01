// Section illustrations for tool pages (November 2026 graphics batches 03 to 05 and the raster set).
// Served from public/assets/tools/art. SVG alt text is each file's own <title> and <desc>; the WebP files
// are trimmed, resized copies of the supplied PNG artwork. The words inside every graphic are illustrative
// examples, never live data, so each page keeps its real explanation in HTML beside the image.

export type ToolArt = { src: string; alt: string; width: number; height: number };

const svg = (file: string, alt: string, width = 1200, height = 800): ToolArt => ({ src: `/assets/tools/art/${file}.svg`, alt, width, height });
const webp = (file: string, alt: string, width: number, height: number): ToolArt => ({ src: `/assets/tools/art/${file}.webp`, alt, width, height });

export const ART = {
  facebookBio: svg("facebook-bio-details", "A few profile details, such as photography, travel and a friendly tone, turning into a short Facebook intro ready to copy", 1200, 820),
  twitterBio: svg("twitter-bio-length", "An X bio builder with personality, focus and tone choices next to a profile preview and a 160 character counter", 1200, 820),
  tiktokBio: svg("tiktok-bio-profile", "Aesthetic, funny and creator styles leading to a TikTok profile preview with an 80 character bio counter", 1200, 820),
  etsyTitle: svg("etsy-title-photo", "A product photo turning into an Etsy listing title preview with a 140 character counter", 1200, 820),
  youtubeChannelName: svg("youtube-channel-name-identity", "Three channel name ideas next to a YouTube channel page preview using one of them", 1200, 820),
  websiteAudit: svg("website-audit-checks", "A web page under review next to example SEO checks for the page title, headings, internal links and image text", 1200, 820),
  keywordResearch: svg("keyword-research-intent", "A seed topic branching into buying intent, question and style keyword groups", 1200, 820),
  instagramBio: svg("instagram-bio-profile", "Optional profile details turning into a short Instagram bio shown in a mobile profile preview"),
  pinterest: svg("pinterest-pin-copy", "A Pinterest Pin image paired with a keyword smart title and description"),
  searchIntent: svg("search-intent-groups", "Search phrases sorted into informational, navigational, commercial and transactional intent groups"),
  contentBrief: svg("content-brief-outline", "A keyword, audience and questions compiled into a structured content brief with an outline"),
  metaSnippet: svg("meta-snippet-preview", "A page title and summary turning into a search result snippet preview"),
  longTail: svg("long-tail-branches", "A seed keyword branching into product type, use case and question searches"),
  onPage: svg("on-page-checks", "A page under review next to example on page findings for the title tag, headings, image alt text and internal links"),
  serp: svg("serp-anatomy", "An illustrated search results page showing a sponsored placement, organic listings and answer features as separate elements"),
  keywordGap: svg("keyword-gap-overlap", "Two overlapping circles comparing your website's search terms, shared terms and terms only a competitor covers"),
  brokenLinks: svg("broken-link-map", "A homepage linking to a working product page and a resource link that points to a 404 page, with a fix to update or remove the link"),
  coreWebVitals: svg("core-web-vitals-gauges", "A page preview next to three illustrative gauges for LCP loading, INP responsiveness and CLS visual stability"),
  sitemap: svg("sitemap-url-statuses", "A sitemap.xml file branching into URLs with 200 OK, 301 redirect and 404 error statuses"),
  peopleAlsoAsk: svg("people-also-ask-questions", "One seed topic expanding into three related search questions with their intent"),
  etsyShopName: svg("etsy-shop-name-ideas", "What a shop sells and its brand feel turning into a storefront sign and more shop name ideas to check for availability"),
  rankTracking: svg("rank-tracking-positions", "Illustrative keyword positions moving between two dates, with an example visibility trend"),
  // Raster artwork, converted to WebP.
  toolsSearch: webp("tools-search-ecosystem", "A central tool search panel connected to SEO, social media, content and ecommerce tool groups", 1172, 941),
  toolsCategories: webp("tools-toolkit-categories", "A toolkit at the centre of eight tool categories, from writing and images to keywords, analytics and code", 1182, 909),
  toolsRepurpose: webp("tools-one-idea-many-formats", "One article idea turning into several formats: a carousel, a video, a short clip, a quote and a report", 1182, 886),
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

/** The illustration that sits beside a tool page's "how it works" section, when it has one. */
const BY_SLUG: Record<string, ToolArt> = {
  "instagram-bio-generator": ART.instagramBio,
  "pinterest-description-generator": ART.pinterest,
  "seo-search-intent-classifier": ART.searchIntent,
  "seo-content-brief-generator": ART.contentBrief,
  "meta-description-generator": ART.metaSnippet,
  "etsy-shop-name-generator": ART.etsyShopName,
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
