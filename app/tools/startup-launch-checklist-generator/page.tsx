import { KIT } from "@/lib/tools/kit/content";
import { KitPage, kitMetadata } from "../_kit/KitPage";
import { LaunchChecklist } from "../_kit/LaunchChecklist";

export const metadata = kitMetadata("startup-launch-checklist-generator");

export default function Page() {
  return (
    <KitPage c={KIT["startup-launch-checklist-generator"]}>
      <LaunchChecklist />
    </KitPage>
  );
}
