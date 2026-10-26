import { V3_TOOLS } from "@/lib/tools/v3/fields";
import { V3AiTool } from "./V3AiTool";
import { BreakEvenRoasCalculator, LocalBusinessSchemaGenerator, LtvCacCalculator, RobotsTxtGenerator, XmlSitemapValidator, YouTubeChaptersTool } from "./V3Batch3";
import { CacCalculator, EtsyFeeCalculator, EtsyOffsiteCalculator, GoogleReviewLinkTool, LlmsTxtTool, RobotsTxtTester, ShopifyMarginCalculator } from "./V3Utilities";

// Picks the generator or calculator for one of the tools added in October 2026.
export function V3Generator({ slug, name }: { slug: string; name: string }) {
  if (slug === "youtube-chapters-generator") return <YouTubeChaptersTool />;
  if (slug === "robots-txt-generator") return <RobotsTxtGenerator />;
  if (slug === "xml-sitemap-validator") return <XmlSitemapValidator />;
  if (slug === "local-business-schema-generator") return <LocalBusinessSchemaGenerator />;
  if (slug === "break-even-roas-calculator") return <BreakEvenRoasCalculator />;
  if (slug === "ltv-cac-ratio-calculator") return <LtvCacCalculator />;
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
