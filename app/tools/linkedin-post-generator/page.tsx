import { LinkedInPage, linkedInMetadata } from "../_linkedin/LinkedInPage";
import { POST } from "../_linkedin/content";

// Built from the November 2026 LinkedIn package. It overrides app/tools/[slug] for this slug.
export const metadata = linkedInMetadata(POST);

export default function Page() {
  return <LinkedInPage c={POST} />;
}
