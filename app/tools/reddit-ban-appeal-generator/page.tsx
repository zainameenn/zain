import { KIT } from "@/lib/tools/kit/content";
import { KitPage, kitMetadata } from "../_kit/KitPage";
import { RedditAppeal } from "../_kit/RedditAppeal";

export const metadata = kitMetadata("reddit-ban-appeal-generator");

export default function Page() {
  return (
    <KitPage c={KIT["reddit-ban-appeal-generator"]}>
      <RedditAppeal />
    </KitPage>
  );
}
