// The free tools, grouped for the navbar dropdown and the footer.
// Kept separate from the registry so the client navbar doesn't ship tool configs.
// When a tool is added or renamed, update it here too.

export type ToolMenuGroup = { h: string; items: [name: string, href: string][] };

export const TOOL_MENU: ToolMenuGroup[] = [
  {
    h: "Social bios",
    items: [
      ["Instagram bio", "/tools/instagram-bio-generator"],
      ["TikTok bio", "/tools/tiktok-bio-generator"],
      ["X (Twitter) bio", "/tools/twitter-bio-generator"],
      ["Threads bio", "/tools/threads-bio-generator"],
      ["Facebook bio", "/tools/facebook-bio-generator"],
      ["Instagram username", "/tools/instagram-username-generator"],
      ["TikTok username", "/tools/tiktok-username-generator"],
    ],
  },
  {
    h: "Captions and video",
    items: [
      ["Instagram caption", "/tools/instagram-caption-generator"],
      ["TikTok caption", "/tools/tiktok-caption-generator"],
      ["Facebook caption", "/tools/facebook-caption-generator"],
      ["YouTube title", "/tools/youtube-title-generator"],
      ["YouTube description", "/tools/youtube-description-generator"],
      ["Pinterest title", "/tools/pinterest-title-generator"],
      ["Pinterest description", "/tools/pinterest-description-generator"],
      ["YouTube Shorts script", "/tools/youtube-shorts-script-generator"],
      ["YouTube video script", "/tools/youtube-video-script-generator"],
      ["YouTube thumbnail text", "/tools/youtube-thumbnail-text-generator"],
      ["YouTube chapters", "/tools/youtube-chapters-generator"],
    ],
  },
  {
    h: "LinkedIn",
    items: [
      ["LinkedIn headline", "/tools/linkedin-headline-generator"],
      ["LinkedIn summary", "/tools/linkedin-about-section-generator"],
      ["LinkedIn post", "/tools/linkedin-post-generator"],
      ["LinkedIn comment", "/tools/linkedin-comment-generator"],
    ],
  },
  {
    h: "SEO and planning",
    items: [
      ["SEO title", "/tools/seo-title-generator"],
      ["Meta description", "/tools/meta-description-generator"],
      ["Marketing plan", "/tools/marketing-plan-generator"],
      ["Content calendar", "/tools/social-media-content-calendar-generator"],
      ["UTM link builder", "/tools/utm-link-builder"],
      ["Negative keywords", "/tools/google-ads-negative-keyword-generator"],
      ["Search intent classifier", "/tools/seo-search-intent-classifier"],
      ["llms.txt generator", "/tools/llms-txt-generator"],
      ["Keyword clusters", "/tools/seo-keyword-cluster-generator"],
      ["Robots.txt tester", "/tools/robots-txt-tester"],
      ["Local business FAQs", "/tools/local-business-faq-generator"],
      ["SEO content brief", "/tools/seo-content-brief-generator"],
      ["Robots.txt generator", "/tools/robots-txt-generator"],
      ["XML sitemap validator", "/tools/xml-sitemap-validator"],
      ["Local business schema", "/tools/local-business-schema-generator"],
    ],
  },
  {
    h: "Ecommerce",
    items: [
      ["Etsy title", "/tools/etsy-title-generator"],
      ["Product description", "/tools/product-description-generator"],
      ["Shopify product title", "/tools/shopify-product-title-generator"],
      ["Shopify collection description", "/tools/shopify-collection-description-generator"],
      ["Etsy shop announcement", "/tools/etsy-shop-announcement-generator"],
      ["Etsy shop About section", "/tools/etsy-shop-about-section-generator"],
    ],
  },
  {
    h: "Business names",
    items: [
      ["Etsy shop name", "/tools/etsy-shop-name-generator"],
      ["Shopify store name", "/tools/shopify-store-name-generator"],
      ["YouTube channel name", "/tools/youtube-channel-name-generator"],
      ["Newsletter name", "/tools/newsletter-name-generator"],
      ["Podcast name", "/tools/podcast-name-generator"],
      ["Domain name ideas", "/tools/domain-name-ideas-generator"],
      ["Business name", "/tools/business-name-generator"],
      ["Business slogan", "/tools/business-slogan-generator"],
      ["Blog name", "/tools/blog-name-generator"],
    ],
  },
  {
    h: "Copywriting",
    items: [
      ["Website hero headline", "/tools/website-hero-headline-generator"],
      ["SaaS value proposition", "/tools/saas-value-proposition-generator"],
      ["Email preheader", "/tools/email-preheader-generator"],
      ["Changelog entry", "/tools/changelog-entry-generator"],
    ],
  },
  {
    h: "Calculators",
    items: [
      ["Etsy Offsite Ads", "/tools/etsy-offsite-ads-calculator"],
      ["Shopify profit margin", "/tools/shopify-profit-margin-calculator"],
      ["Etsy fees", "/tools/etsy-fee-calculator"],
      ["Customer acquisition cost", "/tools/customer-acquisition-cost-calculator"],
      ["Break-even ROAS", "/tools/break-even-roas-calculator"],
      ["LTV to CAC ratio", "/tools/ltv-cac-ratio-calculator"],
      ["Google review link", "/tools/google-review-link-generator"],
    ],
  },
];
