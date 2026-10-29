import { V3_TOOLS } from "@/lib/tools/v3/fields";
import { V3AiTool } from "./V3AiTool";
import { BreakEvenRoasCalculator, LocalBusinessSchemaGenerator, LtvCacCalculator, RobotsTxtGenerator, XmlSitemapValidator, YouTubeChaptersTool } from "./V3Batch3";
import { AbSampleSizeCalculator, CanonicalChecker, HreflangGenerator, InternalLinkFinder, JsonLdValidator, LocalKeywordModifier, MrrCalculator, OpenGraphGenerator, ProductSchemaGenerator, RedirectChecker, RetentionCalculator, SkuGenerator, XmlSitemapGenerator } from "./V3Batch4";
import { BrokenLinkChecker, CoreWebVitalsChecker, DataTool, LongTailKeywordGenerator, MetadataExtractor, SeoQuestionGenerator, SitemapUrlStatusChecker, WebsiteSeoChecker } from "./SeoTools";
import { CacCalculator, EtsyFeeCalculator, EtsyOffsiteCalculator, GoogleReviewLinkTool, LlmsTxtTool, RobotsTxtTester, ShopifyMarginCalculator } from "./V3Utilities";

// The paid data tools share one component; a plain list here because objects from a client module
// can't be read on the server.
const DATA_TOOL_SLUGS = ["serp-checker", "keyword-rank-checker", "people-also-ask-tool", "serp-features-checker", "local-serp-checker", "keyword-search-volume-checker", "keyword-difficulty-checker", "keyword-research-tool", "organic-keywords-finder", "website-traffic-checker", "seo-competitor-finder", "competitor-keyword-gap"];

// Picks the generator or calculator for one of the tools added in October 2026.
export function V3Generator({ slug, name }: { slug: string; name: string }) {
  if (slug === "youtube-chapters-generator") return <YouTubeChaptersTool />;
  if (slug === "robots-txt-generator") return <RobotsTxtGenerator />;
  if (slug === "xml-sitemap-validator") return <XmlSitemapValidator />;
  if (slug === "local-business-schema-generator") return <LocalBusinessSchemaGenerator />;
  if (slug === "break-even-roas-calculator") return <BreakEvenRoasCalculator />;
  if (slug === "ltv-cac-ratio-calculator") return <LtvCacCalculator />;
  if (slug === "xml-sitemap-generator") return <XmlSitemapGenerator />;
  if (slug === "hreflang-tag-generator") return <HreflangGenerator />;
  if (slug === "canonical-url-checker") return <CanonicalChecker />;
  if (slug === "redirect-chain-checker") return <RedirectChecker />;
  if (slug === "json-ld-schema-validator") return <JsonLdValidator />;
  if (slug === "open-graph-tags-generator") return <OpenGraphGenerator />;
  if (slug === "product-schema-generator") return <ProductSchemaGenerator />;
  if (slug === "internal-link-opportunity-finder") return <InternalLinkFinder />;
  if (slug === "shopify-sku-generator") return <SkuGenerator />;
  if (slug === "local-seo-keyword-modifier-generator") return <LocalKeywordModifier />;
  if (slug === "mrr-calculator") return <MrrCalculator />;
  if (slug === "customer-retention-rate-calculator") return <RetentionCalculator />;
  if (slug === "ab-test-sample-size-calculator") return <AbSampleSizeCalculator />;
  if (DATA_TOOL_SLUGS.includes(slug)) return <DataTool slug={slug} />;
  if (slug === "website-metadata-extractor") return <MetadataExtractor />;
  if (slug === "website-seo-checker") return <WebsiteSeoChecker />;
  if (slug === "broken-link-checker") return <BrokenLinkChecker />;
  if (slug === "sitemap-url-status-checker") return <SitemapUrlStatusChecker />;
  if (slug === "long-tail-keyword-generator") return <LongTailKeywordGenerator />;
  if (slug === "seo-question-generator") return <SeoQuestionGenerator />;
  if (slug === "core-web-vitals-checker") return <CoreWebVitalsChecker />;
  if (V3_TOOLS[slug]) return <V3AiTool tool={V3_TOOLS[slug]} name={name} />;
  if (slug === "etsy-offsite-ads-calculator") return <EtsyOffsiteCalculator />;
  if (slug === "shopify-profit-margin-calculator") return <ShopifyMarginCalculator />;
  if (slug === "google-review-link-generator") return <GoogleReviewLinkTool />;
  if (slug === "llms-txt-generator") return <LlmsTxtTool />;
  if (slug === "etsy-fee-calculator") return <EtsyFeeCalculator />;
  if (slug === "customer-acquisition-cost-calculator") return <CacCalculator />;
  if (slug === "robots-txt-tester") return <RobotsTxtTester />;
  return null;
}
