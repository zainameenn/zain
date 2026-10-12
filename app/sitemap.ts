import type { MetadataRoute } from "next";
import { fetchPublished } from "@/sanity/lib/fetch";
import { SITEMAP_QUERY } from "@/sanity/lib/queries";

type SitemapContent = {
  posts: { slug: string; date: string }[];
  categories: { slug: string; _updatedAt: string }[];
  authors: { slug: string; _updatedAt: string }[];
};

// Built on each request (Vercel would otherwise keep a cached copy for up to an hour after a publish).
// The Sanity data itself is still cached and refreshed by the publish webhook, so this stays cheap.
export const revalidate = 0;

// Published blog content from Sanity. Drafts never appear (the query only sees published documents).
// If Sanity can't be reached, the sitemap still lists every fixed page.
async function blogRoutes(): Promise<MetadataRoute.Sitemap> {
  try {
    const { posts, categories, authors } = await fetchPublished<SitemapContent>(SITEMAP_QUERY);
    return [
      ...posts.map((p) => ({ url: `https://www.zainameen.com/insights/${p.slug}`, lastModified: new Date(p.date), changeFrequency: "monthly" as const, priority: 0.6 })),
      ...categories.map((c) => ({ url: `https://www.zainameen.com/insights/category/${c.slug}`, lastModified: new Date(c._updatedAt), changeFrequency: "weekly" as const, priority: 0.4 })),
      ...authors.map((a) => ({ url: `https://www.zainameen.com/insights/author/${a.slug}`, lastModified: new Date(a._updatedAt), changeFrequency: "monthly" as const, priority: 0.3 })),
    ];
  } catch (error) {
    console.error("Sitemap: could not load blog posts from Sanity.", error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const routes = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.8 },
    { path: "/services/seo-specialist-for-saas", priority: 0.8 },
    { path: "/services/reddit-marketing-specialist", priority: 0.8 },
    { path: "/services/social-media-marketing-specialist", priority: 0.8 },
    { path: "/services/google-and-meta-ads-specialist", priority: 0.8 },
    { path: "/services/saas-growth-consultant", priority: 0.8 },
    { path: "/case-studies", priority: 0.7 },
    { path: "/case-studies/blainy", priority: 0.6 },
    { path: "/case-studies/everdry", priority: 0.6 },
    { path: "/case-studies/virtarix", priority: 0.6 },
    { path: "/case-studies/loompad", priority: 0.6 },
    { path: "/pricing", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    { path: "/insights", priority: 0.6 },
    { path: "/privacy", priority: 0.3 },
  ];

  return [
    ...routes.map(({ path, priority }) => ({
      url: `https://www.zainameen.com${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority,
    })),
    ...(await blogRoutes()),
  ];
}
