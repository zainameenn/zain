import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { breadcrumbList } from "@/app/blog/_components/JsonLd";
import { SITE_URL } from "@/lib/markdown";
import { buildMetadata } from "@/lib/seo";
import { getTool, toolPath } from "@/lib/tools/registry";
import { V3_CONTENT } from "@/lib/tools/v3/pages";
import { EditorialToolPage } from "./EditorialToolPage";

// Each editorial SEO tool has its own static route (app/tools/<slug>/page.tsx) built from this, instead
// of going through app/tools/[slug]. That route imports every older tool's client code, which would ship
// to these pages too; a route of their own keeps them light.

const plain = (s: string) => s.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

export function editorialRoute(slug: string) {
  async function generateMetadata(): Promise<Metadata> {
    const tool = getTool(slug);
    if (!tool) return {};
    return buildMetadata({ title: tool.metaTitle, description: tool.metaDescription, path: toolPath(slug) });
  }
  function Page() {
    const tool = getTool(slug);
    const c = V3_CONTENT.find((x) => x.slug === slug);
    // Unreleased tools (not in TOOLS for this build) stay a 404, exactly as under app/tools/[slug].
    if (!tool || !c) notFound();
    const url = `${SITE_URL}${toolPath(slug)}`;
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        breadcrumbList([
          { name: "Home", url: `${SITE_URL}/` },
          { name: "Free Tools", url: `${SITE_URL}/tools` },
          { name: "SEO Tools", url: `${SITE_URL}/tools/seo` },
          { name: tool.name, url },
        ]),
        {
          "@type": "WebApplication",
          name: tool.name,
          url,
          description: tool.metaDescription,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Any",
          browserRequirements: "Requires JavaScript",
          isAccessibleForFree: true,
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          creator: { "@type": "Person", name: "Zain Ul Abdin", url: SITE_URL },
        },
        { "@type": "FAQPage", mainEntity: c.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: plain(f.a) } })) },
      ],
    };
    return <EditorialToolPage c={c} jsonLd={jsonLd} />;
  }
  return { generateMetadata, Page };
}
