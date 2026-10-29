import { V3_TOOLS } from "@/lib/tools/v3/fields";
import { V3AiTool } from "./V3AiTool";
import { BreakEvenRoasCalculator, LocalBusinessSchemaGenerator, LtvCacCalculator, RobotsTxtGenerator, XmlSitemapValidator, YouTubeChaptersTool } from "./V3Batch3";
import { AbSampleSizeCalculator, CanonicalChecker, HreflangGenerator, InternalLinkFinder, JsonLdValidator, LocalKeywordModifier, MrrCalculator, OpenGraphGenerator, ProductSchemaGenerator, RedirectChecker, RetentionCalculator, SkuGenerator, XmlSitemapGenerator } from "./V3Batch4";
import { BrokenLinkChecker, CoreWebVitalsChecker, LongTailKeywordGenerator, MetadataExtractor, SeoQuestionGenerator, SitemapUrlStatusChecker, WebsiteSeoChecker } from "./SeoTools";
import { CacCalculator, EtsyFeeCalculator, EtsyOffsiteCalculator, GoogleReviewLinkTool, LlmsTxtTool, RobotsTxtTester, ShopifyMarginCalculator } from "./V3Utilities";

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
