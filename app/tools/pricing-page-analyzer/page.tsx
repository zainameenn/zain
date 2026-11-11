import { KIT } from "@/lib/tools/kit/content";
import { KitPage, kitMetadata } from "../_kit/KitPage";
import { PricingAnalyzer } from "../_kit/PricingAnalyzer";

export const metadata = kitMetadata("pricing-page-analyzer");

export default function Page() {
  return (
    <KitPage c={KIT["pricing-page-analyzer"]}>
      <PricingAnalyzer />
    </KitPage>
  );
}
