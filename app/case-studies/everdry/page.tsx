import { everdry as study } from "../_data/everdry";
import { CaseStudyPage } from "../_components/CaseStudyPage";
import { CaseStudyJsonLd, caseStudyMetadata } from "../_components/seo";

export const metadata = caseStudyMetadata(study);

export default function EverdryCaseStudyPage() {
  return (
    <>
      <CaseStudyJsonLd study={study} />
      <CaseStudyPage study={study} />
    </>
  );
}
