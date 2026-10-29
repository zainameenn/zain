"use client";

import { BrokenLinkChecker, CoreWebVitalsChecker, DataTool, LongTailKeywordGenerator, MetadataExtractor, SeoQuestionGenerator, SitemapUrlStatusChecker, WebsiteSeoChecker } from "./SeoTools";

// The widget for an editorial SEO tool page. Imports only the SEO tools, so these pages don't ship
// the code for every other generator on the site (V3Generator does).
export function SeoWidget({ slug }: { slug: string }) {
  if (slug === "website-metadata-extractor") return <MetadataExtractor />;
  if (slug === "website-seo-checker") return <WebsiteSeoChecker />;
  if (slug === "broken-link-checker") return <BrokenLinkChecker />;
  if (slug === "sitemap-url-status-checker") return <SitemapUrlStatusChecker />;
  if (slug === "long-tail-keyword-generator") return <LongTailKeywordGenerator />;
  if (slug === "seo-question-generator") return <SeoQuestionGenerator />;
  if (slug === "core-web-vitals-checker") return <CoreWebVitalsChecker />;
  return <DataTool slug={slug} />;
}
