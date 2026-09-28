import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { path: "/", priority: 1 },
    { path: "/about", priority: 0.7 },
    { path: "/blog", priority: 0.6 },
    { path: "/contact", priority: 0.8 },
    { path: "/insights", priority: 0.6 },
    { path: "/services/growth-strategy", priority: 0.8 },
    { path: "/services/seo", priority: 0.8 },
    { path: "/services/reddit-marketing", priority: 0.8 },
    { path: "/services/social-media-management", priority: 0.8 },
    { path: "/services/google-meta-ads", priority: 0.8 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `https://www.zainameen.com${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  }));
}
