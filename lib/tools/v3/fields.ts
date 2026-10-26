// Form fields for the six AI tools. Client safe: no prompts here (those live in specs.ts, server only).

export type V3Field = {
  key: string;
  label: string;
  type: "text" | "textarea" | "select";
  required?: boolean;
  /** Shown under "More options". */
  advanced?: boolean;
  max: number;
  placeholder?: string;
  options?: string[];
  defaultValue?: string;
  help?: string;
};

export type V3Output = "name" | "script" | "negatives" | "intent" | "title" | "longscript" | "faq" | "clusters" | "fields";

export type V3Tool = { slug: string; output: V3Output; fields: V3Field[]; button: string; example: Record<string, string> };

const LANG = ["English", "Spanish", "French", "German", "Portuguese", "Italian", "Dutch", "Urdu", "Hindi", "Arabic"];
const AVOID: V3Field = { key: "avoid", label: "Words to avoid", type: "text", advanced: true, max: 120, placeholder: "e.g. shop, store, official" };
const LANGUAGE: V3Field = { key: "language", label: "Language", type: "select", advanced: true, max: 20, options: LANG, defaultValue: "English" };

export const V3_TOOLS: Record<string, V3Tool> = {
  "etsy-shop-name-generator": {
    slug: "etsy-shop-name-generator",
    output: "name",
    button: "Generate shop name",
    fields: [
      { key: "niche", label: "What do you sell?", type: "textarea", required: true, max: 300, placeholder: "e.g. hand poured soy candles with dried flowers" },
      { key: "style", label: "Name style", type: "select", required: true, max: 40, options: ["Warm and cozy", "Modern and minimal", "Playful", "Elegant", "Earthy and natural", "Bold", "Vintage", "Whimsical"], defaultValue: "Warm and cozy" },
      { key: "customers", label: "Who buys from you?", type: "text", advanced: true, max: 150, placeholder: "e.g. people buying thoughtful gifts" },
      { key: "keywords", label: "Words to include", type: "text", advanced: true, max: 100, placeholder: "e.g. wick, glow" },
      AVOID,
      { key: "ideas", label: "Names you've already thought of", type: "text", advanced: true, max: 150, placeholder: "e.g. GlowNest, WickWorks" },
      LANGUAGE,
    ],
    example: { niche: "Hand poured soy candles with dried flowers and natural scents", style: "Warm and cozy", customers: "People buying thoughtful gifts" },
  },
  "youtube-channel-name-generator": {
    slug: "youtube-channel-name-generator",
    output: "name",
    button: "Generate channel name",
    fields: [
      { key: "topic", label: "What is your channel about?", type: "textarea", required: true, max: 300, placeholder: "e.g. budget home workouts for busy parents" },
      { key: "audience", label: "Who is it for?", type: "text", required: true, max: 150, placeholder: "e.g. parents with 20 minutes a day" },
      { key: "brand", label: "Channel type", type: "select", required: true, max: 30, options: ["Personal brand", "Business or product"], defaultValue: "Personal brand" },
      { key: "style", label: "Name style", type: "select", required: true, max: 30, options: ["Friendly", "Clear and descriptive", "Playful", "Professional", "Bold", "Calm"], defaultValue: "Friendly" },
      { key: "creator", label: "Your name (optional)", type: "text", advanced: true, max: 60, placeholder: "e.g. Maya" },
      { key: "keywords", label: "Words to include", type: "text", advanced: true, max: 100 },
      AVOID,
      LANGUAGE,
    ],
    example: { topic: "Budget home workouts for busy parents, no equipment", audience: "Parents with 20 minutes a day", brand: "Personal brand", style: "Friendly", creator: "Maya" },
  },
  "shopify-store-name-generator": {
    slug: "shopify-store-name-generator",
    output: "name",
    button: "Generate store name",
    fields: [
      { key: "niche", label: "What does your store sell?", type: "textarea", required: true, max: 300, placeholder: "e.g. reusable kitchen storage made from silicone" },
      { key: "customers", label: "Who is your customer?", type: "text", required: true, max: 150, placeholder: "e.g. home cooks trying to cut plastic" },
      { key: "personality", label: "Brand personality", type: "select", required: true, max: 40, options: ["Friendly", "Premium", "Minimal", "Playful", "Bold", "Natural", "Technical"], defaultValue: "Friendly" },
      { key: "naming", label: "Naming style", type: "select", advanced: true, max: 40, options: ["Invented word", "Real word with a twist", "Two words combined", "Descriptive"], defaultValue: "Two words combined" },
      { key: "keywords", label: "Words to include", type: "text", advanced: true, max: 100 },
      AVOID,
      LANGUAGE,
    ],
    example: { niche: "Reusable silicone food storage bags and lids", customers: "Home cooks trying to use less plastic", personality: "Friendly" },
  },
  "youtube-shorts-script-generator": {
    slug: "youtube-shorts-script-generator",
    output: "script",
    button: "Write my script",
    fields: [
      { key: "topic", label: "Video topic", type: "textarea", required: true, max: 300, placeholder: "e.g. how to keep basil alive indoors" },
      { key: "audience", label: "Who is it for?", type: "text", required: true, max: 150, placeholder: "e.g. beginners with a sunny windowsill" },
      { key: "message", label: "Main message", type: "text", required: true, max: 200, placeholder: "e.g. water less, cut more" },
      { key: "duration", label: "Length", type: "select", max: 20, options: ["About 30 seconds", "About 45 seconds", "About 60 seconds", "About 90 seconds"], defaultValue: "About 45 seconds" },
      { key: "format", label: "Format", type: "select", advanced: true, max: 40, options: ["Talking to camera", "Tutorial", "Listicle", "Myth vs fact", "Before and after", "Story"], defaultValue: "Talking to camera" },
      { key: "tone", label: "Tone", type: "select", advanced: true, max: 30, options: ["Friendly", "Energetic", "Calm", "Funny", "Expert"], defaultValue: "Friendly" },
      { key: "facts", label: "Facts or examples to include", type: "textarea", advanced: true, max: 600, placeholder: "Only real facts. The script won't add numbers you didn't give." },
      { key: "cta", label: "Call to action", type: "text", advanced: true, max: 120, placeholder: "e.g. follow for part two" },
      AVOID,
      LANGUAGE,
    ],
    example: { topic: "How to keep a supermarket basil plant alive indoors", audience: "Beginners with a sunny windowsill", message: "Repot it, water less often, and pinch the tops", duration: "About 45 seconds", format: "Tutorial" },
  },
  "google-ads-negative-keyword-generator": {
    slug: "google-ads-negative-keyword-generator",
    output: "negatives",
    button: "Find negative keywords",
    fields: [
      { key: "business", label: "Business type", type: "text", required: true, max: 120, placeholder: "e.g. B2B project management software" },
      { key: "offer", label: "Products or services you sell", type: "textarea", required: true, max: 400, placeholder: "e.g. paid plans for teams, 14 day free trial, integrations" },
      { key: "audience", label: "Target customers", type: "text", required: true, max: 150, placeholder: "e.g. agencies with 10 to 50 staff" },
      { key: "market", label: "Market or location", type: "text", advanced: true, max: 80, placeholder: "e.g. US and Canada" },
      { key: "targets", label: "Keywords you target", type: "textarea", advanced: true, max: 600, placeholder: "One per line" },
      { key: "searchTerms", label: "Search terms to review (optional)", type: "textarea", advanced: true, max: 3000, placeholder: "Paste terms from your search terms report, one per line. No customer data." },
      { key: "exclude", label: "Intent you want to exclude", type: "text", advanced: true, max: 200, placeholder: "e.g. jobs, students, DIY" },
      { key: "never", label: "Never exclude", type: "text", advanced: true, max: 200, placeholder: "e.g. free trial, pricing, alternative" },
    ],
    example: { business: "Project management software for agencies", offer: "Paid team plans, 14 day free trial, client portals, time tracking", audience: "Marketing and design agencies with 10 to 50 staff", never: "free trial, pricing" },
  },
  "seo-search-intent-classifier": {
    slug: "seo-search-intent-classifier",
    output: "intent",
    button: "Classify keywords",
    fields: [
      { key: "keywords", label: "Keywords (one per line, up to 25)", type: "textarea", required: true, max: 2500, placeholder: "best running shoes\nhow to clean running shoes\nnike pegasus 41 price" },
      { key: "industry", label: "Industry", type: "text", advanced: true, max: 100, placeholder: "e.g. running gear retailer" },
      { key: "site", label: "Your website type", type: "select", advanced: true, max: 40, options: ["Ecommerce store", "SaaS", "Local business", "Blog or publisher", "Service business", "Other"], defaultValue: "Ecommerce store" },
      { key: "country", label: "Target country", type: "text", advanced: true, max: 60 },
      LANGUAGE,
    ],
    example: { keywords: "best running shoes for flat feet\nhow to clean running shoes\nnike pegasus 41 price\nrunning shoe store near me\nasics login", industry: "Running gear retailer", site: "Ecommerce store" },
  },
  "newsletter-name-generator": {
    slug: "newsletter-name-generator",
    output: "name",
    button: "Generate Newsletter Name",
    fields: [
      { key: "topic", label: "What's your newsletter about?", type: "textarea", required: true, max: 300, placeholder: "e.g. practical marketing experiments for solo founders" },
      { key: "audience", label: "Who is it for?", type: "text", required: true, max: 150, placeholder: "e.g. SaaS founders and early stage marketers" },
      { key: "style", label: "Preferred style", type: "select", required: true, max: 30, options: ["Professional", "Clever", "Simple", "Editorial", "Funny"], defaultValue: "Simple" },
      { key: "frequency", label: "Frequency", type: "select", advanced: true, max: 30, options: ["Don't mention it", "Daily", "Weekly", "Monthly"], defaultValue: "Don't mention it" },
      { key: "publisher", label: "Published by", type: "select", advanced: true, max: 30, options: ["An individual", "A company or team"], defaultValue: "An individual" },
      { key: "keywords", label: "Words to include", type: "text", advanced: true, max: 100 },
      AVOID,
      LANGUAGE,
    ],
    example: { topic: "Short weekly explanations of SEO experiments for independent businesses", audience: "Owners of small online shops and service businesses", style: "Editorial" },
  },
  "podcast-name-generator": {
    slug: "podcast-name-generator",
    output: "name",
    button: "Generate Podcast Name",
    fields: [
      { key: "topic", label: "What's the podcast about?", type: "textarea", required: true, max: 300, placeholder: "e.g. honest stories from small ecommerce founders" },
      { key: "audience", label: "Who listens?", type: "text", required: true, max: 150, placeholder: "e.g. people building their first online store" },
      { key: "style", label: "Naming style", type: "select", required: true, max: 30, options: ["Clear", "Clever", "Serious", "Playful", "Editorial"], defaultValue: "Clear" },
      { key: "led", label: "Host led or brand led", type: "select", advanced: true, max: 30, options: ["Host led", "Brand led"], defaultValue: "Host led" },
      { key: "format", label: "Show format", type: "select", advanced: true, max: 40, options: ["Interviews", "Solo host", "Co-hosts", "Storytelling", "Panel"], defaultValue: "Interviews" },
      { key: "keywords", label: "Words to include", type: "text", advanced: true, max: 100 },
      AVOID,
      LANGUAGE,
    ],
    example: { topic: "Weekly interviews with independent shop owners about early mistakes, practical wins and real numbers", audience: "People running or starting a small online shop", style: "Clear" },
  },
  "domain-name-ideas-generator": {
    slug: "domain-name-ideas-generator",
    output: "name",
    button: "Generate Domain Idea",
    fields: [
      { key: "project", label: "What are you building?", type: "textarea", required: true, max: 300, placeholder: "e.g. an online store for minimal desk accessories" },
      { key: "style", label: "Naming style", type: "select", required: true, max: 30, options: ["Descriptive", "Brandable", "Short", "Playful", "Professional"], defaultValue: "Brandable" },
      { key: "extension", label: "Preferred extension", type: "select", required: true, max: 10, options: [".com", ".co", ".io", ".store", ".shop", ".net", ".org", ".app", ".dev", ".co.uk", ".ca", ".com.au", ".de"], defaultValue: ".com" },
      { key: "keywords", label: "Important keyword", type: "text", advanced: true, max: 60 },
      { key: "brand", label: "Brand or project name", type: "text", advanced: true, max: 60 },
      { key: "place", label: "Place to reference", type: "text", advanced: true, max: 60 },
      AVOID,
      LANGUAGE,
    ],
    example: { project: "A small online store selling desk organisation accessories", style: "Brandable", extension: ".com" },
  },
  "shopify-product-title-generator": {
    slug: "shopify-product-title-generator",
    output: "title",
    button: "Generate Product Title",
    fields: [
      { key: "product", label: "What is the product?", type: "text", required: true, max: 150, placeholder: "e.g. matte hard shell laptop case" },
      { key: "details", label: "Key details customers should know", type: "textarea", required: true, max: 500, placeholder: "e.g. fits 14 inch MacBook Pro 2023, clear finish, snap on" },
      { key: "current", label: "Current product title (optional)", type: "text", max: 255, placeholder: "e.g. Premium Luxury Computer Protector 2026" },
      { key: "brand", label: "Brand", type: "text", advanced: true, max: 60 },
      { key: "keywords", label: "Main keyword", type: "text", advanced: true, max: 80 },
      { key: "length", label: "Preferred length", type: "select", advanced: true, max: 20, options: ["Short", "Medium", "Detailed"], defaultValue: "Medium" },
      { key: "seo", label: "Also write an SEO page title", type: "select", advanced: true, max: 5, options: ["No", "Yes"], defaultValue: "No" },
      AVOID,
      LANGUAGE,
    ],
    example: { product: "Clear matte hard shell laptop case", details: "Fits 14 inch MacBook Pro (2023, M3). Snap on. Matte frosted finish. Includes keyboard cover.", current: "Premium Luxury Computer Protector Shell Cover Case 2026 New" },
  },
  "youtube-video-script-generator": {
    slug: "youtube-video-script-generator",
    output: "longscript",
    button: "Generate Video Script",
    fields: [
      { key: "topic", label: "What's the video about?", type: "textarea", required: true, max: 300, placeholder: "e.g. how to research competitors before launching an Etsy store" },
      { key: "audience", label: "Who is watching?", type: "text", required: true, max: 150, placeholder: "e.g. people opening their first Etsy store" },
      { key: "learn", label: "What should viewers learn?", type: "text", required: true, max: 250, placeholder: "e.g. how to compare listings without copying sellers" },
      { key: "length", label: "Video length", type: "select", required: true, max: 20, options: ["About 3 minutes", "About 5 minutes", "About 8 minutes"], defaultValue: "About 5 minutes" },
      { key: "format", label: "Format", type: "select", advanced: true, max: 30, options: ["Tutorial", "Explainer", "Review", "Story", "Interview intro"], defaultValue: "Tutorial" },
      { key: "points", label: "Key points or outline", type: "textarea", advanced: true, max: 1200 },
      { key: "facts", label: "Facts and real examples to include", type: "textarea", advanced: true, max: 1500, placeholder: "Only real facts. The script won't invent experiences or numbers." },
      { key: "tone", label: "Tone", type: "select", advanced: true, max: 30, options: ["Direct and useful", "Friendly", "Energetic", "Calm", "Expert"], defaultValue: "Direct and useful" },
      { key: "cta", label: "Call to action", type: "text", advanced: true, max: 150 },
      AVOID,
      LANGUAGE,
    ],
    example: { topic: "Three practical ways to improve an Etsy listing without buying ads", audience: "New Etsy sellers", learn: "How photos, the title and product details each answer a buyer's question", length: "About 3 minutes", facts: "Use real photos, list clear product dimensions, use words buyers search for in the title" },
  },
  "local-business-faq-generator": {
    slug: "local-business-faq-generator",
    output: "faq",
    button: "Generate Business FAQs",
    fields: [
      { key: "business", label: "Business type and main service", type: "text", required: true, max: 150, placeholder: "e.g. residential roof repair" },
      { key: "location", label: "Service location", type: "text", required: true, max: 150, placeholder: "e.g. Denver and nearby suburbs" },
      { key: "facts", label: "What customers should know", type: "textarea", required: true, max: 1200, placeholder: "Only confirmed facts: estimates, booking, hours, policies" },
      { key: "hours", label: "Opening hours (only if confirmed)", type: "text", advanced: true, max: 150 },
      { key: "pricing", label: "Pricing approach", type: "text", advanced: true, max: 200, placeholder: "e.g. free written estimate after an inspection" },
      { key: "booking", label: "How booking works", type: "text", advanced: true, max: 200 },
      { key: "policies", label: "Cancellation or other policies", type: "textarea", advanced: true, max: 500 },
      { key: "count", label: "Number of FAQs", type: "select", advanced: true, max: 2, options: ["5", "6", "7", "8"], defaultValue: "5" },
      { key: "tone", label: "Tone", type: "select", advanced: true, max: 30, options: ["Friendly", "Professional", "Plain and direct"], defaultValue: "Friendly" },
      LANGUAGE,
    ],
    example: { business: "Residential roof repair", location: "Denver metro area", facts: "Inspections and written estimates. Service areas confirmed when you call. No guaranteed same day appointments. Repairs and full replacements." },
  },
  "seo-keyword-cluster-generator": {
    slug: "seo-keyword-cluster-generator",
    output: "clusters",
    button: "Cluster Keywords",
    fields: [
      { key: "keywords", label: "Keywords, one per line (up to 80 for AI grouping)", type: "textarea", required: true, max: 6000, placeholder: "best running shoes\nrunning shoes for beginners\nbest shoes for flat feet" },
      { key: "context", label: "Your site or business", type: "text", advanced: true, max: 150, placeholder: "e.g. running gear store" },
      { key: "country", label: "Country (context only)", type: "text", advanced: true, max: 60 },
      { key: "exclude", label: "Terms to leave out", type: "text", advanced: true, max: 150 },
      LANGUAGE,
    ],
    example: { keywords: "etsy listing fee\nhow much does etsy charge per listing\netsy transaction fee\netsy fees calculator\nhow to name an etsy shop\netsy shop name ideas\ncan you change your etsy shop name" },
  },
};

export const MAX_INTENT_KEYWORDS = 25;
export const MAX_CLUSTER_KEYWORDS = 80;

// ---------- Tools 21 to 40 (AI). They all return the shared "fields" result. ----------

const t = (key: string, label: string, required: boolean, max: number, placeholder?: string, advanced = false): V3Field => ({ key, label, type: "text", required, max, placeholder, advanced });
const ta = (key: string, label: string, required: boolean, max: number, placeholder?: string, advanced = false): V3Field => ({ key, label, type: "textarea", required, max, placeholder, advanced });
const sel = (key: string, label: string, options: string[], advanced = false): V3Field => ({ key, label, type: "select", required: !advanced, max: 60, options, defaultValue: options[0], advanced });

const BATCH3: V3Tool[] = [
  {
    slug: "instagram-username-generator",
    output: "fields",
    button: "Generate Username",
    fields: [t("name", "Name, brand or theme", true, 80, "e.g. Quiet Morning Studio"), t("niche", "What do you post about?", true, 150, "e.g. pottery and handmade home decor"), sel("style", "Style", ["Simple", "Playful", "Professional", "Creative"]), t("keyword", "Word to include", false, 40, undefined, true), { ...AVOID }, t("modifier", "Location or topic modifier", false, 40, "e.g. leeds, studio", true)],
    example: { name: "Quiet Morning Studio", niche: "Handmade ceramic mugs and bowls", style: "Simple" },
  },
  {
    slug: "tiktok-username-generator",
    output: "fields",
    button: "Generate TikTok Username",
    fields: [t("name", "Creator name or theme", true, 80, "e.g. Mia"), t("niche", "What's your content about?", true, 150, "e.g. easy apartment cooking"), sel("style", "Style", ["Clean", "Fun", "Bold", "Creator led"]), t("keyword", "Word to include", false, 40, undefined, true), { ...AVOID }, LANGUAGE],
    example: { name: "Mia", niche: "Easy apartment cooking for one", style: "Fun" },
  },
  {
    slug: "business-name-generator",
    output: "fields",
    button: "Generate Business Name",
    fields: [ta("business", "What does the business do?", true, 300, "e.g. easy bookkeeping software for independent coffee shops"), t("customers", "Who are your customers?", true, 150, "e.g. owners of small coffee shops"), sel("style", "Naming style", ["Minimal", "Friendly", "Premium", "Distinctive"]), sel("type", "Descriptive or invented", ["Either", "Descriptive", "Invented"], true), t("keywords", "Words to include", false, 80, undefined, true), { ...AVOID }, sel("market", "Audience", ["Local", "International"], true), LANGUAGE],
    example: { business: "Easy to use bookkeeping software for independent coffee shops", customers: "Owners of small coffee shops", style: "Friendly" },
  },
  {
    slug: "business-slogan-generator",
    output: "fields",
    button: "Generate Slogan",
    fields: [t("business", "Business or product", true, 200, "e.g. small bookkeeping studio for independent professionals"), t("benefit", "Main customer benefit", true, 200, "e.g. monthly records handled, nothing to chase"), sel("style", "Style", ["Direct", "Bold", "Warm", "Clever"]), t("brand", "Brand name", false, 60, undefined, true), t("audience", "Audience", false, 120, undefined, true), sel("length", "Length", ["Short (2 to 5 words)", "Medium (6 to 9 words)"], true), { ...AVOID }, LANGUAGE],
    example: { business: "Small bookkeeping studio that keeps monthly records simple for independent professionals", benefit: "Your books are handled every month so you can stop worrying about them", style: "Warm" },
  },
  {
    slug: "blog-name-generator",
    output: "fields",
    button: "Generate Blog Name",
    fields: [ta("topic", "Blog topic", true, 300, "e.g. approachable website SEO for small businesses"), t("readers", "Who reads it?", true, 150, "e.g. independent business owners"), sel("voice", "Voice", ["Personal", "Editorial", "Playful", "Expert"]), t("creator", "Creator or company name", false, 60, undefined, true), t("keywords", "Word to include", false, 60, undefined, true), { ...AVOID }, LANGUAGE],
    example: { topic: "Approachable website SEO for independent business owners", readers: "Small business owners doing their own marketing", voice: "Editorial" },
  },
  {
    slug: "youtube-thumbnail-text-generator",
    output: "fields",
    button: "Generate Thumbnail Text",
    fields: [t("title", "Video title or topic", true, 150, "e.g. I Tested 5 Budget Coffee Grinders at Home"), t("takeaway", "Main takeaway or surprise", true, 200, "e.g. one cheap grinder did surprisingly well"), sel("tone", "Tone", ["Straightforward", "Curious", "Bold"]), sel("format", "Video format", ["Tutorial", "Review", "Story", "Explainer"], true), sel("words", "Maximum words", ["4", "3", "5", "6"], true), { ...AVOID }],
    example: { title: "I Tested 5 Budget Coffee Grinders at Home", takeaway: "The cheapest grinder ground more evenly than two pricier ones", tone: "Curious" },
  },
  {
    slug: "seo-content-brief-generator",
    output: "fields",
    button: "Create Content Brief",
    fields: [t("topic", "Primary topic or keyword", true, 150, "e.g. how to choose a CRM for a small wholesale bakery"), t("reader", "Who is the reader?", true, 150, "e.g. owner of a small wholesale bakery"), sel("goal", "Page goal", ["Inform", "Compare", "Convert", "Educate"]), t("intent", "Search intent (your assumption)", false, 80, undefined, true), ta("related", "Related keywords", false, 600, "One per line", true), ta("facts", "Verified facts to include", false, 1500, undefined, true), ta("links", "Your pages to link to", false, 600, "One URL or page name per line", true), t("country", "Target country", false, 60, undefined, true), LANGUAGE],
    example: { topic: "How to choose a CRM for a small wholesale bakery", reader: "Owner of a wholesale bakery with a small team", goal: "Compare" },
  },
  {
    slug: "shopify-collection-description-generator",
    output: "fields",
    button: "Generate Collection Description",
    fields: [t("collection", "Collection name or type", true, 100, "e.g. Minimal Desk Accessories"), ta("products", "Products included", true, 400, "e.g. desk organizers, cable clips, felt trays"), t("shopper", "Who shops it and why?", true, 200, "e.g. remote workers tidying a home desk"), ta("facts", "Confirmed facts (materials, sizes, compatibility)", false, 600, undefined, true), sel("length", "Length", ["Short (2 to 3 sentences)", "Medium (one paragraph)"], true), sel("tone", "Tone", ["Friendly", "Minimal", "Premium", "Playful"], true), t("keyword", "Key phrase", false, 60, undefined, true), { ...AVOID }, LANGUAGE],
    example: { collection: "Minimal Desk Accessories", products: "Desk organizers, cable clips and felt trays", shopper: "Remote workers who want a tidy, simple desk" },
  },
  {
    slug: "etsy-shop-announcement-generator",
    output: "fields",
    button: "Generate Shop Announcement",
    fields: [sel("type", "Announcement type", ["New shop", "New item", "Promotion", "Processing update", "Holiday", "General note"]), t("context", "Shop or product context", true, 200, "e.g. handmade notebook covers"), ta("change", "What is changing?", true, 400, "e.g. custom initials orders close November 20"), t("dates", "Dates (only if confirmed)", false, 100, undefined, true), t("action", "What should buyers do?", false, 150, undefined, true), sel("tone", "Shop voice", ["Friendly", "Warm", "Simple", "Playful"], true), LANGUAGE],
    example: { type: "Processing update", context: "Handmade personalized notebook covers", change: "Orders with custom initials close on November 20, 2026 so they arrive before the holidays", dates: "Orders with initials close November 20, 2026" },
  },
  {
    slug: "etsy-shop-about-section-generator",
    output: "fields",
    button: "Write My Shop Story",
    fields: [t("products", "What do you sell?", true, 200, "e.g. personalized notebook covers"), t("maker", "Who makes or designs it?", true, 200, "e.g. I design the artwork and a production partner prints it"), t("why", "Why did you start the shop?", true, 250, "One real sentence"), ta("process", "Your process", false, 600, undefined, true), t("materials", "Materials (only if true)", false, 200, undefined, true), t("place", "City or region (only if you want it public)", false, 60, undefined, true), sel("tone", "Tone", ["Warm", "Simple", "Playful", "Professional"], true), sel("length", "Length", ["Short (2 paragraphs)", "Medium (3 to 4 paragraphs)"], true), LANGUAGE],
    example: { products: "Personalized notebook covers", maker: "I design the artwork and personalization layouts, and a production partner prints and finishes each order", why: "I wanted notebook covers that felt personal without being complicated" },
  },
  {
    slug: "email-preheader-generator",
    output: "fields",
    button: "Generate Preheader",
    fields: [t("subject", "Subject line", true, 150, "e.g. Your October product update"), ta("summary", "What does the email say?", true, 500, "e.g. three product improvements and one bug fix"), sel("audience", "Who gets it?", ["Customers", "Newsletter readers", "Leads", "Team"]), sel("tone", "Tone", ["Friendly", "Direct", "Professional", "Playful"], true), sel("length", "Length", ["Medium (40 to 90 characters)", "Short (under 40)", "Long (90 to 130)"], true), t("offer", "Verified offer details", false, 200, undefined, true), { ...AVOID }, LANGUAGE],
    example: { subject: "Your October product update", summary: "Three improvements: keyboard shortcuts, cleaner reports, faster exports. One bug fix: CSV dates now use your time zone.", audience: "Customers" },
  },
  {
    slug: "website-hero-headline-generator",
    output: "fields",
    button: "Generate Hero Copy",
    fields: [t("offer", "Product or service", true, 200, "e.g. invoicing and stock tracking for wholesale bakeries"), t("audience", "Who is it for?", true, 150, "e.g. small bakery teams"), t("benefit", "Main problem solved or real outcome", true, 250, "e.g. stock and customer balances in one place"), t("differentiator", "What makes it different (confirmed)", false, 200, undefined, true), sel("style", "Style", ["Clear and direct", "Warm", "Bold", "Technical"], true), t("cta", "What should visitors do next?", false, 100, "e.g. book a demo", true), { ...AVOID }, LANGUAGE],
    example: { offer: "Invoicing and stock tracking for wholesale bakeries", audience: "Small wholesale bakery teams", benefit: "Keep stock, orders and customer balances in one place instead of spreadsheets", cta: "Book a demo" },
  },
  {
    slug: "saas-value-proposition-generator",
    output: "fields",
    button: "Generate Value Proposition",
    fields: [ta("product", "Product and what it does", true, 400, "e.g. a simple CRM that tracks orders and credit alongside stock"), t("customer", "Ideal customer", true, 150, "e.g. independent wholesale bakeries"), t("problem", "Problem they face", true, 250, "e.g. orders, stock and credit live in separate spreadsheets"), t("differentiator", "Confirmed differentiator", false, 200, undefined, true), t("alternatives", "What they use today", false, 200, undefined, true), t("outcome", "Supported outcome (only if proven)", false, 200, undefined, true), sel("stage", "Stage", ["Live", "Beta", "Idea"], true), LANGUAGE],
    example: { product: "A simple CRM that keeps customer orders and credit balances next to shared stock", customer: "Independent wholesale bakeries", problem: "Orders, stock and customer credit live in separate spreadsheets, so handover mistakes happen", alternatives: "Spreadsheets and paper order books" },
  },
  {
    slug: "changelog-entry-generator",
    output: "fields",
    button: "Write Changelog Entry",
    fields: [ta("change", "What changed? (public details only)", true, 600, "e.g. added CSV export to keyword groups"), sel("type", "Type", ["New", "Improved", "Fixed", "Removed"]), t("who", "Who does it affect?", true, 150, "e.g. SEO marketers using keyword groups"), t("product", "Product name", false, 60, undefined, true), t("date", "Release date (only if confirmed)", false, 40, undefined, true), sel("status", "Availability", ["Live for everyone", "Beta", "Rolling out", "Not shipped yet"], true), ta("steps", "How users use it", false, 400, undefined, true), t("limits", "Limits or plans it applies to", false, 200, undefined, true), LANGUAGE],
    example: { change: "Added CSV export to keyword groups. The file contains each keyword and the cluster it was put in.", type: "New", who: "SEO marketers using the keyword cluster tool", status: "Live for everyone" },
  },
];

for (const tool of BATCH3) V3_TOOLS[tool.slug] = tool;

/** YouTube chapters: the page has its own component; this entry only defines what its AI step may send. */
V3_TOOLS["youtube-chapters-generator"] = {
  slug: "youtube-chapters-generator",
  output: "fields",
  button: "Improve titles with AI",
  fields: [ta("sections", "Timestamped sections (JSON)", true, 24000), sel("mode", "Mode", ["titles", "pick"]), sel("style", "Title style", ["Descriptive", "Short"]), t("count", "Chapters to aim for", false, 3)],
  example: {},
};

/** TikTok's username length limit. Kept in one place so it can change with TikTok's rules. */
export const TIKTOK_HANDLE_MAX = 24;
export const INSTAGRAM_HANDLE_MAX = 30;
