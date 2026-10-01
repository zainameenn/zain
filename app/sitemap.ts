import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { path: "/", priority: 1 },
    { path: "/services", priority: 0.8 },
    { path: "/services/freelance-seo-expert-for-saas", priority: 0.8 },
    { path: "/services/reddit-marketing-for-saas", priority: 0.8 },
    { path: "/services/hire-a-social-media-manager", priority: 0.8 },
    { path: "/services/google-and-meta-ads-specialist", priority: 0.8 },
    { path: "/services/saas-growth-consultant", priority: 0.8 },
    { path: "/case-studies", priority: 0.7 },
    { path: "/case-studies/blainy", priority: 0.6 },
    { path: "/case-studies/everdry", priority: 0.6 },
    { path: "/case-studies/virtarix", priority: 0.6 },
    { path: "/pricing", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.8 },
    { path: "/insights", priority: 0.6 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `https://www.zainameen.com${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  }));
}
