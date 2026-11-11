import { KIT } from "@/lib/tools/kit/content";
import { KitPage, kitMetadata } from "../_kit/KitPage";
import { ElevatorPitch } from "../_kit/ElevatorPitch";

export const metadata = kitMetadata("elevator-pitch-generator");

export default function Page() {
  return (
    <KitPage c={KIT["elevator-pitch-generator"]}>
      <ElevatorPitch />
    </KitPage>
  );
}
