// The site's fixed public pages, in one place. The XML sitemap (app/sitemap.ts), the human sitemap
// (/sitemap) and the last modified script (scripts/lastmod.mjs) all read this list.
// Case studies, tools, blog posts and changelog entries are added automatically from their own data.
//
// `files` are the source files whose changes count as a real content change for that page.
// Shared chrome (navbar, footer, global CSS) is left out on purpose, so a footer tweak doesn't
// mark every page as modified.

export type SitePage = {
  path: string;
  name: string;
  section: "main" | "services" | "resources" | "legal";
  priority: number;
  files: string[];
};

export const SITE_PAGES: SitePage[] = [
  { path: "/", name: "Home", section: "main", priority: 1, files: ["app/page.tsx", "app/HomeComponents/Hero.tsx", "app/HomeComponents/Proof.tsx", "app/HomeComponents/WhatIDo.tsx", "app/HomeComponents/Compare.tsx", "app/HomeComponents/Work.tsx", "app/HomeComponents/Pricing.tsx", "app/HomeComponents/Services.tsx", "app/HomeComponents/FAQ.tsx", "app/HomeComponents/faqData.ts", "app/HomeComponents/Reviews.tsx", "app/HomeComponents/Process.tsx"] },
  { path: "/about", name: "About", section: "main", priority: 0.7, files: ["app/about"] },
  { path: "/pricing", name: "Pricing", section: "main", priority: 0.8, files: ["app/pricing", "app/_pricing", "lib/pricing.ts"] },
  { path: "/contact", name: "Contact", section: "main", priority: 0.8, files: ["app/contact"] },
  { path: "/black-friday-marketing-deals", name: "Black Friday Marketing Deals", section: "main", priority: 0.7, files: ["app/black-friday-marketing-deals", "lib/pricing.ts"] },

  { path: "/services", name: "All services", section: "services", priority: 0.8, files: ["app/services/page.tsx"] },
  { path: "/services/saas-growth-consultant", name: "Growth Strategy", section: "services", priority: 0.8, files: ["app/services/saas-growth-consultant", "app/_pricing", "lib/pricing.ts"] },
  { path: "/services/seo-specialist-for-saas", name: "SEO", section: "services", priority: 0.8, files: ["app/services/seo-specialist-for-saas", "app/_pricing", "lib/pricing.ts"] },
  { path: "/services/reddit-marketing-specialist", name: "Reddit Marketing", section: "services", priority: 0.8, files: ["app/services/reddit-marketing-specialist", "app/_pricing", "lib/pricing.ts"] },
  { path: "/services/social-media-marketing-specialist", name: "Social Media Management", section: "services", priority: 0.8, files: ["app/services/social-media-marketing-specialist", "app/_pricing", "lib/pricing.ts"] },
  { path: "/services/google-and-meta-ads-specialist", name: "Google & Meta Ads", section: "services", priority: 0.8, files: ["app/services/google-and-meta-ads-specialist", "app/_pricing", "lib/pricing.ts"] },

  { path: "/case-studies", name: "All case studies", section: "resources", priority: 0.7, files: ["app/case-studies/page.tsx", "app/case-studies/_data/index.ts"] },
  { path: "/blog", name: "Blog", section: "resources", priority: 0.7, files: [] },
  { path: "/tools", name: "Free Tools", section: "resources", priority: 0.7, files: ["app/tools/page.tsx", "lib/tools/hub.ts"] },
  { path: "/changelog", name: "Changelog", section: "resources", priority: 0.6, files: [] },
  { path: "/insights", name: "Insights", section: "resources", priority: 0.5, files: ["app/insights"] },
  { path: "/sitemap", name: "Sitemap", section: "resources", priority: 0.3, files: ["app/sitemap/page.tsx"] },

  { path: "/privacy", name: "Privacy Policy", section: "legal", priority: 0.3, files: ["app/privacy"] },
];

/** Source files for each case study page. */
export const caseStudyFiles = (slug: string) => [`app/case-studies/${slug}`, `app/case-studies/_data/${slug}.ts`, "app/case-studies/_components"];

/** Source files shared by every tool page (template, studio, prompts and copy). A leading "!" excludes a path: lib/tools/menu.ts only feeds the navbar. */
export const TOOL_FILES = ["app/tools/[slug]", "app/tools/_studio", "app/tools/_components", "lib/tools", "!lib/tools/menu.ts"];
