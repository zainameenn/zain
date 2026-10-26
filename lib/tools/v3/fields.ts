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

export type V3Output = "name" | "script" | "negatives" | "intent" | "title" | "longscript" | "faq" | "clusters";

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
