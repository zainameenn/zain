import { buildMetadata } from "@/lib/seo";
import { ORG_ID, PERSON_ID, SITE } from "@/lib/structuredData";
import type { CaseStudy } from "../_data/types";

const pathOf = (study: CaseStudy) => `/case-studies/${study.slug}`;

/** Title, description, canonical URL and Open Graph tags for a case study page. */
export function caseStudyMetadata(study: CaseStudy) {
  const { title, description, ogImage } = study.seo;
  return buildMetadata({
    title,
    description,
    path: pathOf(study),
    type: "article",
    image: { url: ogImage.src, width: ogImage.width, height: ogImage.height, alt: ogImage.alt },
  });
}

/** Breadcrumb and article structured data for a case study page. */
export function CaseStudyJsonLd({ study }: { study: CaseStudy }) {
  const { title, description, ogImage } = study.seo;
  const url = `${SITE}${pathOf(study)}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
          { "@type": "ListItem", position: 2, name: "Case studies", item: `${SITE}/case-studies` },
          { "@type": "ListItem", position: 3, name: study.name, item: url },
        ],
      },
      {
        "@type": "Article",
        headline: title.replace(/ \| Zain$/, ""),
        description,
        image: `${SITE}${ogImage.src}`,
        author: { "@type": "Person", "@id": PERSON_ID, name: "Zain Ul Abdin", url: `${SITE}/about` },
        publisher: { "@id": ORG_ID },
        url,
        mainEntityOfPage: url,
        about: study.name,
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
