import type { NextConfig } from "next";
import convertedImages from "./scripts/converted-images.json";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Off: the site CSS is now about 240 KB, and inlining copied it into every prerendered page and its RSC
    // payload. That made each deployment about 246 MB of prerendered output instead of 56 MB (measured Nov 2, 2026).
    inlineCss: false,
    // Server source maps were about 67 MB of every deployment. Stack traces in logs are less readable without them.
    serverSourceMaps: false,
  },
  productionBrowserSourceMaps: false,
  // The sitemap and changelog pages read content/changelog/*.md at request time on the server.
  outputFileTracingIncludes: {
    "/sitemap.xml": ["./content/changelog/**/*"],
    "/sitemap": ["./content/changelog/**/*"],
    "/changelog/**": ["./content/changelog/**/*"],
  },
  // Old URLs permanently redirect to the new keyword URLs.
  async redirects() {
    return [
      { source: "/services/seo", destination: "/services/seo-specialist-for-saas", permanent: true },
      { source: "/services/reddit-marketing", destination: "/services/reddit-marketing-specialist", permanent: true },
      { source: "/services/social-media-management", destination: "/services/social-media-marketing-specialist", permanent: true },
      { source: "/services/freelance-seo-expert-for-saas", destination: "/services/seo-specialist-for-saas", permanent: true },
      { source: "/services/reddit-marketing-for-saas", destination: "/services/reddit-marketing-specialist", permanent: true },
      { source: "/services/hire-a-social-media-manager", destination: "/services/social-media-marketing-specialist", permanent: true },
      { source: "/services/google-meta-ads", destination: "/services/google-and-meta-ads-specialist", permanent: true },
      { source: "/services/growth-strategy", destination: "/services/saas-growth-consultant", permanent: true },
      // Blog articles used to live under /insights. /insights itself stays as the Keybooks page.
      { source: "/insights/category/:slug", destination: "/blog?category=:slug", permanent: true },
      { source: "/insights/author/:slug", destination: "/blog/author/:slug", permanent: true },
      { source: "/insights/:slug", destination: "/blog/:slug", permanent: true },
      { source: "/work", destination: "/case-studies", permanent: true },
      // Illustrations converted from PNG to WebP (Oct 2026). Old image URLs keep working.
      ...convertedImages.map((p: string) => ({ source: p, destination: p.replace(/\.png$/i, ".webp"), permanent: true })),
    ];
  },
};

export default nextConfig;
