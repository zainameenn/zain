import { loompad as study } from "../_data/loompad";
import { CaseStudyPage } from "../_components/CaseStudyPage";
import { CaseStudyJsonLd, caseStudyMetadata } from "../_components/seo";

export const metadata = caseStudyMetadata(study);

export default function LoompadCaseStudyPage() {
  return (
    <>
      <CaseStudyJsonLd study={study} />
      <CaseStudyPage study={study} />
    </>
  );
}
