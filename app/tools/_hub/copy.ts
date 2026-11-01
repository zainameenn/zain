// Copy for the /tools directory, from the November 1, 2026 directory package (PAGE_COPY.md). Tool links are
// slugs, checked against the live registry by the page, so a card or link only shows while its tool is live.
// Two changes from the package: the LTV to CAC link uses the real slug (ltv-cac-ratio-calculator), and the
// first sentence starts with the page keyword.

export const FEATURED: { slug: string; text: string; cta: string }[] = [
  { slug: "seo-title-generator", text: "Write clearer title tags for pages and posts. Preview the wording, check the length, then make it your own.", cta: "Create an SEO title" },
  { slug: "website-audit-tool", text: "Check a small website for missing tags, technical issues and pages that need attention. Review the findings before making changes.", cta: "Audit a website" },
  { slug: "instagram-caption-generator", text: "Turn an idea, an image, or a few details into a caption that sounds like something you'd actually post.", cta: "Write an Instagram caption" },
  { slug: "linkedin-post-generator", text: "Start with an experience or an observation. Get a readable post you can edit instead of another corporate sounding draft.", cta: "Write a LinkedIn post" },
  { slug: "etsy-title-generator", text: "Describe your product clearly and get listing title ideas without repeating the same keyword five times.", cta: "Write an Etsy title" },
  { slug: "social-media-content-calendar-generator", text: "Plan posts around your actual business, platforms, and available time. Then edit the calendar and export it.", cta: "Plan your content" },
];

/** Extra words people search for, so "title tag" finds the SEO Title Generator. */
export const ALIASES: Record<string, string> = {
  "seo-title-generator": "title tag page title seo checker",
  "meta-description-generator": "meta description snippet search description",
  "website-audit-tool": "website audit seo checker site audit technical seo",
  "website-seo-checker": "seo checker on page seo",
  "keyword-to-page-mapper": "keyword map keyword mapping",
  "seo-keyword-cluster-generator": "keyword grouping keyword clustering",
  "instagram-caption-generator": "instagram caption ig caption",
  "facebook-bio-generator": "facebook bio facebook intro",
  "etsy-title-generator": "etsy listing etsy seo",
  "linkedin-post-generator": "linkedin post",
  "utm-link-builder": "utm tracking link campaign url",
  "youtube-chapters-generator": "youtube chapter timestamps",
  "xml-sitemap-generator": "sitemap",
  "xml-sitemap-validator": "sitemap",
  "sitemap-url-status-checker": "sitemap",
  "social-media-content-calendar-generator": "calendar content plan posting schedule",
};

export const GROUP_COPY: Record<string, { heading: string; intro: string; picks: [string, string][]; note?: string }> = {
  "seo-planning": {
    heading: "Free SEO tools for your website",
    intro: "Start with tasks you can complete today. Write a better page title, check metadata, map keywords to pages, or identify issues on your site.",
    picks: [
      ["seo-title-generator", "Write a descriptive search title for a specific page."],
      ["meta-description-generator", "Draft a clear summary for searchers."],
      ["website-audit-tool", "Check a small set of pages for technical and on page issues."],
      ["keyword-to-page-mapper", "Organize target search phrases by URL and intent."],
      ["internal-link-opportunity-finder", "Find relevant connections between your existing pages."],
      ["utm-link-builder", "Create consistent tracking links for campaigns."],
    ],
    note: "Live search volume, rank tracking and SERP tools have different data requirements. If a tool is marked In development, it cannot produce those metrics yet.",
  },
  "social-media": {
    heading: "Free social media tools",
    intro: "A bio, caption, or posting plan should match the platform and what you're trying to say. Choose the right generator, add your own details, and edit the result before you post.",
    picks: [
      ["instagram-bio-generator", "Introduce yourself or your business."],
      ["facebook-bio-generator", "Write a personal or business Page bio."],
      ["tiktok-bio-generator", "Create a short, useful TikTok intro."],
      ["facebook-caption-generator", "Draft captions for everyday posts, promotions, and updates."],
      ["pinterest-description-generator", "Explain what a Pin is about in natural language."],
      ["social-media-content-calendar-generator", "Turn scattered ideas into a plan."],
    ],
  },
  ecommerce: {
    heading: "Free ecommerce tools",
    intro: "Better product listings start with accurate details. Make it easier for shoppers to understand what you're selling, whether that's an Etsy product or a Shopify collection.",
    picks: [
      ["etsy-title-generator", "Write concise, relevant listing titles."],
      ["product-description-generator", "Turn real product features into readable copy."],
      ["shopify-product-title-generator", "Clean up vague supplier titles."],
      ["shopify-collection-description-generator", "Describe a collection with useful shopping context."],
      ["etsy-shop-announcement-generator", "Explain an update without writing a long message."],
    ],
  },
  linkedin: {
    heading: "Free LinkedIn tools",
    intro: "Your profile and posts should sound like you, not a template everybody else is using. Start with your experience, your work, and the point you actually want to make.",
    picks: [
      ["linkedin-headline-generator", "Explain your role and focus."],
      ["linkedin-about-section-generator", "Write a professional introduction using real experience."],
      ["linkedin-post-generator", "Turn observations into posts."],
      ["linkedin-comment-generator", "Contribute something useful to a conversation."],
    ],
  },
  "business-naming": {
    heading: "Business naming and writing tools",
    intro: "Need a name, a headline, a small piece of copy, or a better starting point for a launch? Pick the task, then check that the result fits your brand and is available to use.",
    picks: [
      ["etsy-shop-name-generator", "Name a shop that can grow with your craft."],
      ["youtube-channel-name-generator", "Find a channel name and handle ideas."],
      ["business-name-generator", "Name a new business."],
      ["business-slogan-generator", "Write a short line people remember."],
    ],
  },
  "calculators-utilities": {
    heading: "Calculators and practical utilities",
    intro: "Not every marketing problem needs AI. Sometimes you just need a consistent link, a clear number, or a quick calculation with its assumptions explained.",
    picks: [
      ["utm-link-builder", "Build consistent campaign links."],
      ["mrr-calculator", "Work out monthly recurring revenue."],
      ["ltv-cac-ratio-calculator", "Compare customer value with acquisition cost."],
      ["ab-test-sample-size-calculator", "See how many visitors a test needs."],
    ],
  },
};

export const WORKFLOWS: { title: string; steps: [string, string, string]; nextText?: string; text: string; cta: [string, string]; fig?: { name: string; alt: string } }[] = [
  {
    title: "I'm publishing a new website page",
    steps: ["seo-title-generator", "meta-description-generator", "website-audit-tool"],
    text: "A page needs a clear title and description, but those are only part of the work. Check how the page is structured, make sure the content answers its main question, and confirm that important links work.",
    cta: ["Start with an SEO title", "seo-title-generator"],
    fig: { name: "04-seo-workflow", alt: "Example SEO workflow turning restaurant bookkeeping research into a useful service page with title, content and checks." },
  },
  {
    title: "I have a keyword list but don't know what to publish",
    steps: ["keyword-to-page-mapper", "seo-content-gap-planner", "internal-link-opportunity-finder"],
    text: "Put similar search intents together, identify pages you already have, and decide which topics deserve their own page. Don't create several near identical articles just because the keywords are slightly different.",
    cta: ["Map your keywords", "keyword-to-page-mapper"],
  },
  {
    title: "I need to post more consistently",
    steps: ["social-media-content-calendar-generator", "instagram-caption-generator", "utm-link-builder"],
    text: "Make a manageable plan first. Use the writing tools to draft individual posts (the LinkedIn Post Generator works too), then edit them to match what actually happened. Add a UTM link when you're sharing a tracked campaign link.",
    cta: ["Build a content calendar", "social-media-content-calendar-generator"],
  },
  {
    title: "I'm improving an online store",
    steps: ["etsy-title-generator", "shopify-product-title-generator", "product-description-generator"],
    text: "Start with a clear title, then the description. Then review your product photos, variants, shipping details and policies. The copy matters, but it must describe the actual product. Don't add materials, sizes, delivery promises, or benefits you can't support.",
    cta: ["Write a product title", "etsy-title-generator"],
    fig: { name: "05-commerce-workflow", alt: "Diagram showing a tote bag's visible details turned into an accurate product title, with a checklist for unverified claims." },
  },
];

export const KINDS: { tag: string; title: string; text: string[] }[] = [
  { tag: "AI writing tools", title: "Drafts and ideas", text: ["Use these when you need a starting point for a bio, caption, headline, description, outline, or plan.", "They're best when you include real context. Review the draft for accuracy, tone, platform rules, and details that might have been guessed."] },
  { tag: "SEO checkers and utilities", title: "Page and tag signals", text: ["Use these when you want to inspect a webpage, review tags, organize keywords, generate structured information, or build links with consistent tracking parameters.", "A checker can flag an issue without deciding whether it matters to your business. Review its finding before changing your site."] },
  { tag: "Search data tools", title: "Sourced metrics", text: ["Search volumes, rankings, backlinks, and competitor traffic estimates require actual datasets or API access. AI generated prose is not a substitute for measured data.", "If a feature is still being built, we label it that way instead of displaying made up metrics."] },
];

export const GUIDE: [string, string][] = [
  ["Decide what the page is meant to do", "Is it answering a question, describing a service, or helping someone compare products? That decision should guide the page title, structure, and content."],
  ["Choose one main topic", "A page can answer related questions, but it still needs a clear purpose. Use the Keyword to Page Mapper when a long keyword list starts turning into duplicate article ideas."],
  ["Write a readable search title and description", "Tell people what they will find. Avoid keyword lists pretending to be headlines. Try the SEO Title Generator and Meta Description Generator as drafts, not automated ranking fixes."],
  ["Check the page itself", "Look for missing or conflicting tags, broken links, confusing headings, and navigation issues. The Website Audit Tool is a practical starting point, not a replacement for a full technical audit."],
  ["Improve the page, then measure", "Publish useful content, fix meaningful issues, and use Google Search Console to see how your own verified website performs in Search. Don't treat a tool's score as the outcome. Traffic, relevant visits, and conversions matter more."],
];

export const AUDIENCES: { who: string; text: string; tools: string[] }[] = [
  { who: "Small business owner", text: "Clean up service pages, write customer facing copy, and make a manageable posting plan.", tools: ["seo-title-generator", "facebook-caption-generator", "marketing-plan-generator"] },
  { who: "Creator or freelancer", text: "Write a clearer bio, shape posts around your actual experiences, and keep your message consistent across platforms.", tools: ["linkedin-headline-generator", "tiktok-bio-generator", "social-media-content-calendar-generator"] },
  { who: "Ecommerce seller", text: "Improve product titles and descriptions, and check the claims your listing makes.", tools: ["etsy-title-generator", "shopify-product-title-generator"] },
  { who: "SEO specialist or marketer", text: "Organize search intent, review page metadata, and work through site issues.", tools: ["keyword-to-page-mapper", "internal-link-opportunity-finder", "website-audit-tool"] },
  { who: "SaaS founder", text: "Explain the product more clearly, build a content plan from real customer problems, and track campaigns consistently.", tools: ["marketing-plan-generator", "seo-title-generator", "utm-link-builder"] },
];

export const FAQS: [string, string][] = [
  ["What are free marketing tools?", "They're online utilities that help with specific marketing tasks. Some write drafts. Others check a URL, organize information, calculate a metric, or create something you can use in a campaign."],
  ["Are Zainameen's tools free?", "The public tools are free to use, with fair use limits. Some requests may be temporarily limited when demand is high. A tool marked In development is not ready to use yet."],
  ["Do I need to create an account?", "No account is required for the public generators currently offered here. If a future feature needs an authorized account connection, its page will explain that requirement before asking for access."],
  ["What are the best free SEO tools for beginners?", "Start with tools you can understand and act on. An SEO Title Generator, Meta Description Generator, and Website Audit Tool can help you improve a specific page. Google Search Console is also useful for measuring your verified site's actual search performance."],
  ["Can free SEO tools improve my Google rankings?", "They can help you find and fix problems, but no tool guarantees rankings. A better title, cleaner page structure, or useful content can support your SEO work. Search performance depends on the page, competition, technical accessibility, and many other factors."],
  ["Can I do SEO for my website without paying for software?", "Yes. You can make useful improvements with free tools, Google Search Console, and a clear content plan. Paid tools may offer deeper datasets, automation, or larger usage limits, but they're not a requirement for starting."],
  ["Do these tools show real keyword search volumes?", "Only tools connected to a real search data provider should show numerical search volumes. Keyword suggestions and AI generated ideas are not the same as measured monthly searches. Check each tool's data source notes and status."],
  ["How can I find keywords for my website?", "Start with the questions your customers ask. Group related searches by intent, then decide which page should answer each topic. Use the Keyword to Page Mapper for organizing terms. For measured volumes or live rankings, use a properly sourced data tool when available."],
  ["What's the difference between an SEO audit and a keyword tool?", "An SEO audit checks the condition of a page or site. A keyword tool helps you explore what people search for. You'll often need both, but they answer different questions."],
  ["Are there free SEO tools for WordPress and Shopify?", "Yes. URL based tools can be useful for checking publicly accessible pages regardless of the CMS. Your website platform may also have its own free SEO features or integrations. A generic checker cannot automatically edit your store or website for you."],
  ["Can I use these tools for Etsy SEO?", "You can use the Etsy Title Generator and ecommerce writing tools to improve product wording. Etsy search also considers listing details and other factors, so a generated title alone won't guarantee sales or visibility."],
  ["Do you have tools for YouTube and Pinterest?", "Yes. The directory includes tools for YouTube titles, descriptions, chapters and naming, as well as Pinterest titles and descriptions. Use the search or the Social Media category to find the one that fits your task."],
  ["Are there free tools for LinkedIn profiles and posts?", "Yes. You can work on a headline, About section, post, or comment. Add your real experience and review the text before copying it to LinkedIn."],
  ["Can I generate posts for Instagram, Facebook, and TikTok?", "Yes. Choose a generator designed for that platform. A TikTok bio, Facebook caption, and LinkedIn post need different lengths and writing styles, so one generic draft isn't always enough."],
  ["Do these tools publish posts for me?", "No. The writing tools are for drafting, editing, and copying content. They don't publish to your social accounts. Review the result and post it yourself."],
  ["What's the difference between an AI generator and a checker?", "An AI generator writes or reshapes content based on your input. A checker evaluates something against specific rules or available data. Each tool's page explains exactly what its output means."],
  ["Can I trust every AI generated result?", "Use it as a draft, not as verified fact. Double check names, prices, dates, achievements, product specifications, and platform limits. An AI generator can make mistakes even when a result sounds convincing."],
  ["Why isn't a tool generating results?", "Try removing unsupported input, refreshing the page, or waiting a little if the fair use limit has been reached. If an error continues, use the contact page and include the tool name and error message, without sharing private account credentials."],
  ["Are the tools safe to use?", "Each tool explains what it does and what information it needs. Don't enter passwords, confidential customer records, or private keys into public generators. Read the privacy policy for how submitted data is handled."],
  ["Which marketing tool should I start with if I have no idea?", "Start with the task you need to finish today. Updating a profile? Pick a bio generator. Publishing a webpage? Start with an SEO title. Planning content? Try the Social Media Content Calendar Generator. A specific task is easier to solve than a vague goal like “do more marketing.”"],
];
