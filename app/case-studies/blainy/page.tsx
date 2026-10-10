import { buildMetadata } from "@/lib/seo";
import { blainy as study } from "../_data/blainy";
import { CaseStudyPage } from "../_components/CaseStudyPage";

const SITE = "https://www.zainameen.com";
const path = `/case-studies/${study.slug}`;
const { title, description, ogImage } = study.seo;

export const metadata = buildMetadata({
  title,
  description,
  path,
  type: "article",
  image: { url: ogImage.src, width: ogImage.width, height: ogImage.height, alt: ogImage.alt },
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE}/` },
        { "@type": "ListItem", position: 2, name: "Case studies", item: `${SITE}/case-studies` },
        { "@type": "ListItem", position: 3, name: study.name, item: `${SITE}${path}` },
      ],
    },
    {
      "@type": "Article",
      headline: title.replace(/ \| Zain$/, ""),
      description,
      image: `${SITE}${ogImage.src}`,
      author: { "@type": "Person", name: "Zain Ul Abdin", url: SITE },
      url: `${SITE}${path}`,
      mainEntityOfPage: `${SITE}${path}`,
    },
  ],
};

export default function BlainyCaseStudyPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <CaseStudyPage study={study} />
    </>
  );
}
