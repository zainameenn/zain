import { LinkedInPage, linkedInMetadata } from "../_linkedin/LinkedInPage";
import { HEADLINE } from "../_linkedin/content";

// Built from the November 2026 LinkedIn package. It overrides app/tools/[slug] for this slug.
export const metadata = linkedInMetadata(HEADLINE);

export default function Page() {
  return <LinkedInPage c={HEADLINE} />;
}
