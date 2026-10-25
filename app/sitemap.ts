import type { MetadataRoute } from "next";
import { SITE, siteUrls } from "@/lib/sitemap-data";

// The XML sitemap, built from the site's published pages (lib/sitemap-data.ts).
// New tools, case studies, blog posts and changelog entries appear here automatically once published.
// <lastmod> is the real date the content last changed; pages without a known date simply leave it out.
// Filtered URLs (like /blog?category=...) and redirecting old URLs are never listed.

// Built on each request (Vercel would otherwise keep a cached copy for up to an hour after a publish).
// The Sanity data itself is still cached and refreshed by the publish webhook, so this stays cheap.
export const revalidate = 0;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { urls } = await siteUrls();
  return urls.map((u) => ({
    url: `${SITE}${u.path === "/" ? "/" : u.path}`,
    ...(u.lastmod ? { lastModified: u.lastmod } : {}),
    priority: u.priority,
  }));
}
