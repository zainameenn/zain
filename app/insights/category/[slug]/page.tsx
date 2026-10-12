import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { stegaClean } from "next-sanity";
import { buildMetadata } from "@/lib/seo";
import { H1_ACCENT_STYLE, HERO_H1_STYLE } from "@/app/HomeComponents/heading";
import { fetchPublished, sanityFetch } from "@/sanity/lib/fetch";
import { CATEGORIES_WITH_POSTS_QUERY, CATEGORY_QUERY, CATEGORY_SLUGS_QUERY } from "@/sanity/lib/queries";
import type { Category, CategoryRef } from "@/sanity/lib/types";
import { JsonLd, breadcrumbList } from "../../_components/JsonLd";
import { PostListing } from "../../_components/PostListing";
import { Breadcrumbs } from "../../_components/parts";
import { MAX, PAD, absolute, categoryPath } from "../../_components/utils";

type Props = { params: Promise<{ slug: string }> };

const getCategory = cache((slug: string) => sanityFetch<Category | null>(CATEGORY_QUERY, { slug }));

export async function generateStaticParams() {
  const slugs = await fetchPublished<string[]>(CATEGORY_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

const describe = (c: Category) => stegaClean(c.description)?.trim() || `Growth marketing insights about ${stegaClean(c.title)}, written from real client work.`;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) return { title: "Category not found | Zain", robots: { index: false, follow: true } };
  return buildMetadata({
    title: `${stegaClean(category.title)} | Growth Marketing Insights | Zain`,
    description: describe(category),
    path: categoryPath(stegaClean(category.slug)),
    // A category with no published articles yet stays out of search results.
    noindex: category.posts.length === 0,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const [category, categories] = await Promise.all([getCategory(slug), sanityFetch<CategoryRef[]>(CATEGORIES_WITH_POSTS_QUERY)]);
  if (!category) notFound();

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Insights", href: "/insights" },
    { name: category.title },
  ];

  return (
    <main id="top" style={{ overflowX: "clip" }}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            breadcrumbList([
              { name: "Home", url: absolute("/") },
              { name: "Insights", url: absolute("/insights") },
              { name: stegaClean(category.title), url: absolute(categoryPath(stegaClean(category.slug))) },
            ]),
          ],
        }}
      />
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(32px,4vw,56px) ${PAD} 0` }}>
        <Breadcrumbs items={crumbs} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "clamp(40px,5vw,72px) 0 clamp(48px,5vw,72px)" }}>
          <h1 style={{ ...HERO_H1_STYLE, maxWidth: 900 }}>
            {category.title} <em style={H1_ACCENT_STYLE}>insights.</em>
          </h1>
          <p style={{ margin: "24px auto 0", maxWidth: 640, fontSize: 18, lineHeight: 1.6, color: "#4E4C48" }}>{describe(category)}</p>
        </div>
      </section>
      <section aria-label="Articles" style={{ maxWidth: MAX, margin: "0 auto", padding: `0 ${PAD} clamp(64px,7vw,96px)` }}>
        {category.posts.length ? (
          <PostListing posts={category.posts} categories={categories} active={stegaClean(category.slug)} />
        ) : (
          <p style={{ margin: 0, padding: "48px 24px", borderRadius: 20, border: "1px dashed #D6CFC2", textAlign: "center", fontSize: 16, color: "#5A5854" }}>
            No articles in this category yet. <Link href="/insights" style={{ color: "#1C1C1C", borderBottom: "1px solid #CFCBC2" }}>See all insights</Link>
          </p>
        )}
      </section>
    </main>
  );
}
