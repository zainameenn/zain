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

export type V3Output = "name" | "script" | "negatives" | "intent";

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
};

export const MAX_INTENT_KEYWORDS = 25;
