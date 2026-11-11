import { KIT } from "@/lib/tools/kit/content";
import { KitPage, kitMetadata } from "../_kit/KitPage";
import { RedditFormatter } from "../_kit/RedditFormatter";

export const metadata = kitMetadata("reddit-post-formatter");

export default function Page() {
  return (
    <KitPage c={KIT["reddit-post-formatter"]}>
      <RedditFormatter />
    </KitPage>
  );
}
