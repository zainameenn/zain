import { KIT } from "@/lib/tools/kit/content";
import { KitPage, kitMetadata } from "../_kit/KitPage";
import { StartupRunway } from "../_kit/StartupRunway";

export const metadata = kitMetadata("startup-runway-calculator");

export default function Page() {
  return (
    <KitPage c={KIT["startup-runway-calculator"]}>
      <StartupRunway />
    </KitPage>
  );
}
