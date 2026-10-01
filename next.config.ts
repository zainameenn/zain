import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      { source: "/blog", destination: "/insights", permanent: true },
      { source: "/work", destination: "/case-studies", permanent: true },
    ];
  },
};

export default nextConfig;
