import { KIT } from "@/lib/tools/kit/content";
import { KitPage, kitMetadata } from "../_kit/KitPage";
import { MarketingRoi } from "../_kit/MarketingRoi";

export const metadata = kitMetadata("marketing-roi-calculator");

export default function Page() {
  return (
    <KitPage c={KIT["marketing-roi-calculator"]}>
      <MarketingRoi />
    </KitPage>
  );
}
