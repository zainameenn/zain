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
    ],
  },
  {
    h: "Ecommerce",
    items: [
      ["Etsy title", "/tools/etsy-title-generator"],
      ["Product description", "/tools/product-description-generator"],
    ],
  },
];
