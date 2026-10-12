// Every [link] placeholder from docs/tools-spec.md lives here.
// A non-null value points at a page that already exists in this repo (or a URL the spec itself gives).
// null means "not decided yet": the page hides that button or link until a real URL is set.

/** Shown wherever the spec asked for a real daily limit. */
export const FAIR_USE = "Free to use. Fair use limits apply.";

/** Shown when the visitor hits the /api/tools rate limit (429 from the Vercel Firewall). */
export const BUSY_MESSAGE = "Easy there, speed typer. Too many requests in a minute. Give it a few seconds and try again. Your answers are still here.";

// ---------- Service CTA buttons ----------

/** [link: social media service page]. Exists: app/services/social-media-marketing-specialist. */
export const LINK_SOCIAL_MEDIA_SERVICE: string | null = "/services/social-media-marketing-specialist";
/** [link: SEO or content service page] and the "free SEO audit" buttons. Exists: app/services/seo-specialist-for-saas. */
export const LINK_SEO_SERVICE: string | null = "/services/seo-specialist-for-saas";
/** [link: contact or audit page] on the marketing plan CTA. Exists: app/contact. */
export const LINK_CONTACT: string | null = "/contact";
/** "See how I can help" (LinkedIn headline) and "See my LinkedIn service" (LinkedIn comment). Exists: app/services (all services). */
export const LINK_SERVICES: string | null = "/services";
/** [link: Etsy or ecommerce service page, or the Loompad case study]. Exists: app/case-studies/loompad. */
export const LINK_LOOMPAD_CASE_STUDY: string | null = "/case-studies/loompad";
/** "Let's talk positioning" on the LinkedIn About page. Exists: app/contact. */
export const LINK_POSITIONING: string | null = "/contact";
/** "Get a free tracking audit" on the UTM builder. TODO: no tracking or audit page exists yet. */
export const LINK_TRACKING_AUDIT: string | null = null;
/** "See ecommerce copy help" on the product description page. TODO: no ecommerce service page exists yet. */
export const LINK_ECOMMERCE_SERVICE: string | null = null;
/** "See my content service" on the LinkedIn post page. TODO: no content service page exists yet. */
export const LINK_CONTENT_SERVICE: string | null = null;

// ---------- Guides and case studies after the related tools. TODO: add text and URL once each article exists. ----------

type ExtraLink = { text: string; href: string | null };
export const GUIDE_SOCIAL_MEDIA: ExtraLink = { text: "", href: null }; // [your social media article, if one exists]
export const GUIDE_CONTENT_WRITING: ExtraLink = { text: "", href: null }; // [your content writing article]
export const GUIDE_CONTENT_CALENDAR: ExtraLink = { text: "", href: null }; // [service business content calendar article]
export const GUIDE_SMALL_BUSINESS_MARKETING: ExtraLink = { text: "", href: null }; // [small business marketing article]
export const GUIDE_SEO_AUDIT: ExtraLink = { text: "", href: null }; // [SEO audit checklist article]
export const GUIDE_LEAD_TRACKING: ExtraLink = { text: "", href: null }; // [lead tracking article]
export const GUIDE_ETSY_TITLES: ExtraLink = { text: "", href: null }; // [Etsy title examples article]
/** "Case study: [Loompad case study]" on the product description page. */
export const CASE_STUDY_LOOMPAD: ExtraLink = { text: "Case study: Loompad", href: LINK_LOOMPAD_CASE_STUDY };
