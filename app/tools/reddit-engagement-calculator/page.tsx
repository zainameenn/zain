import { KIT } from "@/lib/tools/kit/content";
import { KitPage, kitMetadata } from "../_kit/KitPage";
import { RedditEngagement } from "../_kit/RedditEngagement";

export const metadata = kitMetadata("reddit-engagement-calculator");

export default function Page() {
  return (
    <KitPage c={KIT["reddit-engagement-calculator"]}>
      <RedditEngagement />
    </KitPage>
  );
}
