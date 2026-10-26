import { V3_TOOLS } from "@/lib/tools/v3/fields";
import { V3AiTool } from "./V3AiTool";
import { CacCalculator, EtsyFeeCalculator, EtsyOffsiteCalculator, GoogleReviewLinkTool, LlmsTxtTool, RobotsTxtTester, ShopifyMarginCalculator } from "./V3Utilities";

// Picks the generator or calculator for one of the tools added in October 2026.
export function V3Generator({ slug, name }: { slug: string; name: string }) {
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
