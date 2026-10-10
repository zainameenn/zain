import { virtarix as study } from "../_data/virtarix";
import { CaseStudyPage } from "../_components/CaseStudyPage";
import { CaseStudyJsonLd, caseStudyMetadata } from "../_components/seo";

export const metadata = caseStudyMetadata(study);

export default function VirtarixCaseStudyPage() {
  return (
    <>
      <CaseStudyJsonLd study={study} />
      <CaseStudyPage study={study} />
    </>
  );
}
