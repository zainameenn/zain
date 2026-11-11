import { ed as e } from "@/app/_design/ui";
import { KIT } from "@/lib/tools/kit/content";
import t from "../_studio/edtool.module.css";
import { KitPage, kitMetadata } from "../_kit/KitPage";
import { GoalService, RedditAdCost } from "../_kit/RedditAdCost";

export const metadata = kitMetadata("reddit-ad-cost-calculator");

export default function Page() {
  return (
    <KitPage
      c={KIT["reddit-ad-cost-calculator"]}
      service={
        <section className={t.sec} id="help">
          <div className={e.container}>
            <GoalService />
          </div>
        </section>
      }
    >
      <RedditAdCost />
    </KitPage>
  );
}
