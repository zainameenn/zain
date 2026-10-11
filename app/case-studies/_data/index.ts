import { blainy } from "./blainy";
import { everdry } from "./everdry";
import { loompad } from "./loompad";
import type { CaseStudy } from "./types";
import { virtarix } from "./virtarix";

/** Every case study, in display order. Add new ones here to list them in cards, the navbar and /case-studies. */
export const CASE_STUDIES: CaseStudy[] = [blainy, everdry, virtarix, loompad];

export const caseStudyPath = (s: CaseStudy) => `/case-studies/${s.slug}`;

/** The other case studies, for "Read another case study". */
export const otherCaseStudies = (slug: string) => CASE_STUDIES.filter((s) => s.slug !== slug);
