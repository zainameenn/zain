import type { NextConfig } from "next";
import convertedImages from "./scripts/converted-images.json";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The Tailwind CSS is small, so ship it inside the HTML instead of as a render-blocking file.
  experimental: {
    inlineCss: true,
    // Server source maps were about 67 MB of every deployment. Stack traces in logs are less readable without them.
    serverSourceMaps: false,
  },
  productionBrowserSourceMaps: false,
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
