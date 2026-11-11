import { KIT } from "@/lib/tools/kit/content";
import { KitPage, kitMetadata } from "../_kit/KitPage";
import { RedditTitle } from "../_kit/RedditTitle";

export const metadata = kitMetadata("reddit-title-analyzer");

export default function Page() {
  return (
    <KitPage c={KIT["reddit-title-analyzer"]}>
      <RedditTitle />
    </KitPage>
  );
}
