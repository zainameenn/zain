import { blainy as study } from "../_data/blainy";
import { CaseStudyPage } from "../_components/CaseStudyPage";
import { CaseStudyJsonLd, caseStudyMetadata } from "../_components/seo";

export const metadata = caseStudyMetadata(study);

export default function BlainyCaseStudyPage() {
  return (
    <>
      <CaseStudyJsonLd study={study} />
      <CaseStudyPage study={study} />
    </>
  );
}
