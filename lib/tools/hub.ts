import { FAIR_USE } from "./links";
import { TOOLS } from "./registry";
import type { Rich, ToolGroup } from "./types";
import { V3_CONTENT } from "./v3/pages";

// Content for the /tools hub. Everything is keyed by tool slug and filtered against TOOLS,
// so a tool (and every box, link and FAQ that mentions it) only appears once its page is live.
// Adding a tool to the hub: add its card copy below and a graphic at public/assets/tools/hub/<slug>.webp.

export type HubCard = { description: string; cta: string };

export const HUB_CARDS: Record<string, HubCard> = {
  "instagram-bio-generator": { description: "Create an Instagram bio that fits your personality, explains what you do, and gives people a reason to follow.", cta: "Generate Instagram bio" },
  "tiktok-bio-generator": { description: "Write a short TikTok bio that introduces your content and makes your profile worth exploring.", cta: "Generate TikTok bio" },
  "twitter-bio-generator": { description: "Create a clear, memorable X bio that communicates your interests, expertise, or personality.", cta: "Generate X bio" },
  "threads-bio-generator": { description: "Find the right words for your Threads profile, whether you're sharing ideas, building a brand, or meeting new people.", cta: "Generate Threads bio" },
  "facebook-bio-generator": { description: "Write a Facebook bio for your personal profile or business Page that tells visitors what they need to know.", cta: "Generate Facebook bio" },
  "instagram-caption-generator": { description: "Turn your post ideas into engaging Instagram captions with a natural tone and a clear message.", cta: "Write captions" },
  "tiktok-caption-generator": { description: "Write TikTok captions that fit your video, communicate the idea quickly, and encourage conversation.", cta: "Write TikTok captions" },
  "facebook-caption-generator": { description: "Create Facebook captions for updates, announcements, promotions, and everyday posts.", cta: "Write Facebook captions" },
  "youtube-description-generator": { description: "Write organized YouTube descriptions that explain your videos and make important details easier to find.", cta: "Write a description" },
  "pinterest-description-generator": { description: "Create Pinterest descriptions that explain your Pins and include relevant search terms naturally.", cta: "Write Pin descriptions" },
  "youtube-title-generator": { description: "Write a YouTube title that describes your video clearly and gives viewers a reason to click.", cta: "Write a title" },
  "pinterest-title-generator": { description: "Write descriptive Pinterest titles that communicate your content and match what people are searching for.", cta: "Write Pin titles" },
  "social-media-content-calendar-generator": { description: "Build a practical posting plan with content ideas, platforms, and a schedule you can actually follow.", cta: "Plan your content" },
  "marketing-plan-generator": { description: "Create a practical 30 day marketing plan based on your business, audience, goals, and available time.", cta: "Create marketing plan" },
  "seo-title-generator": { description: "Write search friendly page titles that reflect your content, target keyword, and search intent.", cta: "Write SEO titles" },
  "meta-description-generator": { description: "Create concise meta descriptions that summarize your pages and give searchers a reason to visit.", cta: "Write meta descriptions" },
  "utm-link-builder": { description: "Add campaign tracking parameters to your URLs so you can identify where your marketing traffic comes from.", cta: "Build tracking link" },
  "etsy-title-generator": { description: "Create clearer Etsy listing titles that describe your products and use relevant search terms naturally.", cta: "Write Etsy titles" },
  "product-description-generator": { description: "Turn product details into clear, helpful descriptions that explain features, benefits, and important buying information.", cta: "Write product descriptions" },
  "linkedin-headline-generator": { description: "Write a LinkedIn headline that communicates your role, expertise, and the value you bring.", cta: "Write a headline" },
  "linkedin-about-section-generator": { description: "Turn your experience and achievements into a readable LinkedIn About section that sounds like you.", cta: "Write your About section" },
  "linkedin-post-generator": { description: "Create LinkedIn posts from your ideas, experiences, or observations without making them sound overly corporate.", cta: "Write a post" },
  "linkedin-comment-generator": { description: "Write relevant, thoughtful LinkedIn comments that contribute something useful to the conversation.", cta: "Write a comment" },
  ...Object.fromEntries(V3_CONTENT.map((c) => [c.slug, c.hubCard])),
};

export const hubImage = (slug: string) => `/assets/tools/hub/${slug}.webp`;
/** Every hub graphic is trimmed and fitted to the same 4:3 frame. */
export const HUB_IMAGE_SIZE = { width: 800, height: 600 };

const live = (slug: string) => Boolean(TOOLS[slug]) && Boolean(HUB_CARDS[slug]);
const allLive = (slugs: string[]) => slugs.every(live);

/** Category labels and anchors for the directory navigation. */
export const HUB_CATEGORIES: { group: ToolGroup; label: string; id: string; heading: string; intro: string }[] = [
  { group: "Social", label: "Social Media", id: "social-media", heading: "Free social media tools", intro: "Bios, captions, titles and a posting plan for every major platform." },
  { group: "SEO", label: "SEO & Planning", id: "seo-planning", heading: "Free SEO and planning tools", intro: "Page titles, meta descriptions, campaign links and a marketing plan." },
  { group: "Ecommerce", label: "Ecommerce", id: "ecommerce", heading: "Free ecommerce tools", intro: "Listing titles and product descriptions that help people buy." },
  { group: "LinkedIn", label: "LinkedIn", id: "linkedin", heading: "Free LinkedIn tools", intro: "Headlines, About sections, posts and comments that sound like you." },
  { group: "Naming", label: "Business Naming", id: "business-naming", heading: "Free business name generators", intro: "Names for Etsy shops, Shopify stores and YouTube channels." },
  { group: "Utilities", label: "Calculators & Utilities", id: "calculators-utilities", heading: "Free calculators and utilities", intro: "Profit calculators, review links and an llms.txt builder. No AI, all in your browser." },
];

/** The hero's featured tool. */
export const HERO_TOOL = {
  slug: "instagram-bio-generator",
  copy: "Write a bio that tells people who you are, what you do, and why they should follow.",
  button: "Try Instagram Bio Generator",
};

/** Editorial starting points, in order of preference. The first three live ones show (never the hero tool), once the hub has 9 or more tools, so a short directory isn't repeated. */
const START_PICKS = ["instagram-caption-generator", "seo-title-generator", "marketing-plan-generator", "tiktok-bio-generator", "twitter-bio-generator", "threads-bio-generator"];
export const startPicks = () => START_PICKS.filter((s) => s !== HERO_TOOL.slug && live(s)).slice(0, 3);

/** "Not sure which tool you need?" boxes. A box shows when at least one of its tools is live, and lists only live ones. */
export const CHOOSERS: { title: string; text: string; tools: string[]; tone: "white" | "cream" | "dark" }[] = [
  {
    title: "Make your profile easier to understand",
    text: "Your bio should tell visitors who you are, what you share, and why they should stay. Start with a profile bio generator that matches your platform.",
    tools: ["instagram-bio-generator", "tiktok-bio-generator", "twitter-bio-generator", "linkedin-headline-generator"],
    tone: "white",
  },
  {
    title: "Spend less time staring at a blank caption",
    text: "Use caption generators to turn an idea into a first draft, then adjust the wording to match your voice.",
    tools: ["instagram-caption-generator", "facebook-caption-generator", "linkedin-post-generator"],
    tone: "dark",
  },
  {
    title: "Make your pages easier to understand in search",
    text: "Write titles and descriptions that clearly represent your content and give searchers useful context.",
    tools: ["seo-title-generator", "meta-description-generator"],
    tone: "cream",
  },
  {
    title: "Turn scattered ideas into a workable plan",
    text: "Outline your next month of marketing and organize what you'll publish, promote, and measure.",
    tools: ["marketing-plan-generator", "social-media-content-calendar-generator", "utm-link-builder"],
    tone: "white",
  },
];
export const choosers = () => CHOOSERS.map((c) => ({ ...c, tools: c.tools.filter(live) })).filter((c) => c.tools.length);

/** "What can free marketing tools actually help you do?" blocks, each with a small example. */
export type HelpExample = { kind: "bio"; text: string } | { kind: "serp"; title: string; url: string; text: string } | { kind: "plan"; weeks: string[] } | { kind: "utm"; base: string; params: [string, string][] };
export const HELPS: { title: string; text: Rich; tools: string[]; example: HelpExample }[] = [
  {
    title: "Write social media bios and captions",
    text: "Use bio generators to introduce yourself or your business, and caption generators to turn an idea into something you can publish. Choose the platform, add your details, and edit the result to match your voice.",
    tools: ["instagram-bio-generator", "instagram-caption-generator", "tiktok-bio-generator", "twitter-bio-generator"],
    example: { kind: "bio", text: "Sourdough baked fresh every morning 🍞\nReal bread for busy Austin families\nPreorder below" },
  },
  {
    title: "Improve page titles and meta descriptions",
    text: "Search results often give people only a small amount of information about a page. A clear title and description can help explain what the page offers. Use the SEO tools to draft a title and description, then refine the wording so it best reflects your content and search intent.",
    tools: ["seo-title-generator", "meta-description-generator"],
    example: { kind: "serp", title: "Same Day Plumber in Austin: Upfront Prices", url: "example.com › plumbing", text: "Family run plumbers serving Austin homes. Same day repairs, upfront prices and tidy work. Book online in two minutes." },
  },
  {
    title: "Plan your content and marketing",
    text: "A marketing plan is easier to follow when you know what to work on next. Use the planning tools to organize your goals, choose content topics, and create a realistic publishing schedule.",
    tools: ["marketing-plan-generator", "social-media-content-calendar-generator"],
    example: { kind: "plan", weeks: ["Week 1: Fix the homepage offer", "Week 2: Three posts on common questions", "Week 3: Ask five clients for reviews", "Week 4: Check what brought leads"] },
  },
  {
    title: "Build and track campaign links",
    text: "UTM parameters help identify the source, medium, and campaign associated with visits to your website. The UTM Link Builder can help you create consistent campaign URLs for your marketing activities.",
    tools: ["utm-link-builder"],
    example: { kind: "utm", base: "example.com/spring-sale", params: [["utm_source", "instagram"], ["utm_medium", "social"], ["utm_campaign", "spring_sale"]] },
  },
];
export const helps = () => HELPS.map((h) => ({ ...h, tools: h.tools.filter(live) })).filter((h) => h.tools.length);

/** AI writers and plain utilities. The split only shows when both kinds are live. */
export const AI_TOOLS = ["instagram-bio-generator", "instagram-caption-generator", "seo-title-generator", "linkedin-post-generator"];
export const UTILITY_TOOLS = ["utm-link-builder"];
export const toolKinds = () => {
  const ai = AI_TOOLS.filter((s) => live(s) && TOOLS[s].api);
  const util = UTILITY_TOOLS.filter((s) => live(s) && !TOOLS[s].api);
  return ai.length && util.length ? { ai, util } : null;
};

/** FAQs. `needs` lists tools an answer mentions; the question only shows when all of them are live. */
const FAQS: { q: string; a: Rich; needs?: string[] }[] = [
  { q: "What are free marketing tools?", a: "Free marketing tools are online utilities that help with everyday marketing tasks. They can help you write social media bios, create captions, improve SEO titles, plan content, and build campaign tracking links." },
  { q: "Are these marketing tools free to use?", a: `Yes. ${FAIR_USE} If you send a lot of requests in a row, a tool may ask you to wait a few seconds before trying again.` },
  { q: "Do I need an account to use these tools?", a: "No account is required. Open a tool, enter the relevant details, and generate or create your result." },
  {
    q: "Which free marketing tool should I start with?",
    a: "Start with the task you're working on. If you're updating a social media profile, try a bio generator. If you're planning posts, use the content calendar or caption generators. If you're improving website pages, start with the SEO Title Generator or Meta Description Generator.",
    needs: ["social-media-content-calendar-generator", "seo-title-generator", "meta-description-generator"],
  },
  { q: "Can I use these tools for my business?", a: "Yes. The tools are designed for practical tasks that come up when marketing a business, creating content, or managing an online presence. Review the generated content before publishing to make sure it accurately represents your business." },
  {
    q: "Can these tools help with SEO?",
    a: "The SEO tools can help you write relevant titles and meta descriptions. Other tools can support content planning and organization. They don't guarantee higher rankings, but they can make parts of your SEO workflow easier to manage.",
    needs: ["seo-title-generator", "meta-description-generator"],
  },
  { q: "Are AI generated captions and bios ready to publish?", a: "Not always. Generated text is best treated as a draft. Check the facts, tone, formatting, and platform requirements before publishing. Small changes often make the result sound more natural and specific to your account." },
  {
    q: "Can I use these tools for Instagram, TikTok, Facebook, and LinkedIn?",
    a: "Yes. This collection includes tools for those platforms, along with X, Threads, YouTube, Pinterest, and other marketing tasks. Choose the tool designed for the platform you're working on.",
    needs: ["instagram-bio-generator", "tiktok-bio-generator", "facebook-bio-generator", "linkedin-headline-generator", "youtube-title-generator", "pinterest-title-generator"],
  },
  { q: "Will these tools publish content to my social media accounts?", a: "No. These tools help you create content, but they don't publish it to your social media accounts. You can review, copy, and publish the results yourself." },
  {
    q: "What's the difference between a marketing plan generator and a content calendar generator?",
    a: "A marketing plan generator helps organize broader goals, priorities, and activities. A content calendar generator focuses on what you plan to publish, where you'll publish it, and when.",
    needs: ["marketing-plan-generator", "social-media-content-calendar-generator"],
  },
];
export const hubFaqs = () => FAQS.filter((f) => !f.needs || allLive(f.needs));
