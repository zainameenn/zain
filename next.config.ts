import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Old URLs permanently redirect to the new keyword URLs.
  async redirects() {
    return [
      { source: "/services/seo", destination: "/services/freelance-seo-expert-for-saas", permanent: true },
      { source: "/services/reddit-marketing", destination: "/services/reddit-marketing-for-saas", permanent: true },
      { source: "/services/social-media-management", destination: "/services/hire-a-social-media-manager", permanent: true },
      { source: "/services/google-meta-ads", destination: "/services/google-and-meta-ads-specialist", permanent: true },
      { source: "/services/growth-strategy", destination: "/services/saas-growth-consultant", permanent: true },
      { source: "/blog", destination: "/insights", permanent: true },
      { source: "/work", destination: "/case-studies", permanent: true },
    ];
  },
};

export default nextConfig;
