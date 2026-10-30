// Shared by the TikTok Bio Generator page (client) and its API route (server). Keep it data only.
// Every account type has four dropdown questions; each list ends with "Other", which opens a small
// text input on the page. Some next-step options only work with a real link or open messages, so the
// page hides them unless the visitor says the feature is available.

export type TikTokBioKind = "Personal" | "Creator" | "Business" | "Gaming & Fan";

type Question = { label: string; options: string[] };
type KindConfig = { placeholder: string; questions: [Question, Question, Question, Question] };

export const TIKTOK_BIO_CHOICES: Record<TikTokBioKind, KindConfig> = {
  Personal: {
    placeholder: "For example: I love rainy days, books and terrible puns.",
    questions: [
      { label: "What are you into?", options: ["Lifestyle", "Fashion", "Books", "Art", "Food", "Travel", "Fitness", "Music", "Study", "Comedy", "Everyday Life", "Other"] },
      { label: "What feels most like you?", options: ["Quiet & Cozy", "Curious", "Funny", "Creative", "Ambitious", "Easygoing", "Bold", "Other"] },
      { label: "What should your bio say about you?", options: ["My Interests", "My Personality", "Just a Short Introduction", "An Inside Joke", "Something Aesthetic", "Other"] },
      { label: "What should people do next?", options: ["Follow", "No CTA", "Check Out My Videos", "Other"] },
    ],
  },
  Creator: {
    placeholder: "For example: I share budget meals for students and post two recipes a week.",
    questions: [
      { label: "What kind of content?", options: ["Cooking", "Beauty", "Fitness", "Tech", "Gaming", "Photography", "DIY", "Finance", "Education", "Travel", "Fashion", "UGC", "Other"] },
      { label: "Who is it for?", options: ["Beginners", "Students", "Busy Professionals", "Hobbyists", "Parents", "Creators", "Shoppers", "Everyone Interested in This Topic", "Other"] },
      { label: "What's your angle?", options: ["Quick Tips", "Tutorials", "Honest Reviews", "Behind the Scenes", "Entertainment", "Budget-Friendly", "My Journey", "Other"] },
      { label: "What should people do next?", options: ["Follow for More", "Watch My Latest Videos", "Check a Series", "DM for Collaborations", "Visit My Link", "Other"] },
    ],
  },
  Business: {
    placeholder: "For example: We sell handmade ceramic mugs and ship across the US.",
    questions: [
      { label: "What kind of business?", options: ["Beauty Salon", "Nail Salon", "Barbershop", "Hair Studio", "Bakery", "Restaurant", "Cafe", "Clothing Boutique", "Jewelry", "Handmade Shop", "Online Store", "Fitness Studio", "Marketing Agency", "Home Services", "Coaching", "Digital Products", "Pet Products", "Other"] },
      { label: "What matters to your customers?", options: ["Easy Shopping", "Product Ideas", "Tutorials", "Booking", "Local Service", "Behind the Scenes", "Gift Ideas", "New Arrivals", "Other"] },
      { label: "What should your bio highlight?", options: ["What We Sell", "Who We Help", "Local Area", "Product Style", "Helpful Tips", "Actual Verified Benefit", "Other"] },
      { label: "What should visitors do?", options: ["Follow", "Message Us", "Book", "See Our Videos", "Shop Link", "Other"] },
    ],
  },
  "Gaming & Fan": {
    placeholder: "For example: I mostly play horror games and post funny clips.",
    questions: [
      { label: "What's the content?", options: ["Horror Games", "Cozy Games", "RPGs", "Competitive Games", "Game Reviews", "Anime", "K-pop", "Fandom Edits", "Cosplay", "Memes", "Other"] },
      { label: "What's your style?", options: ["Funny Clips", "Reviews", "Guides", "Reactions", "Lore", "Fan Edits", "Streams", "Fan Thoughts", "Other"] },
      { label: "Who is it for?", options: ["Other Fans", "Beginners", "Casual Players", "Serious Players", "Anyone Who Likes the Topic", "Other"] },
      { label: "What's the bio goal?", options: ["Show My Interests", "Get Followers", "Make People Laugh", "Build a Community", "Other"] },
    ],
  },
};

/** Next steps that need a working website link on the profile. */
export const TIKTOK_LINK_CTAS = ["Visit My Link", "Shop Link"];
/** Next steps that need open messages or real bookings; only offered when the visitor ticks "I take messages or bookings". */
export const TIKTOK_CONTACT_CTAS = ["DM for Collaborations", "Message Us", "Book"];

export const TIKTOK_BIO_TONES = ["Simple & Natural", "Funny", "Aesthetic", "Cute", "Confident", "Professional", "Minimal", "Playful"];
/** Languages checked with the production model (Gemini Flash Lite), October 2026. */
export const TIKTOK_BIO_LANGUAGES = ["English", "Spanish", "Hindi", "Urdu"];
export const TIKTOK_BIO_EMOJI = ["None", "One if Helpful", "A Little Expressive"];
export const TIKTOK_BIO_ANGLES = ["Clear & Simple", "Personality First", "Audience First", "Action Focused", "Short & Memorable"];

/** TikTok's published bio limit. */
export const TIKTOK_BIO_LIMIT = 80;

/** Free text fields and their length caps. */
export const TIKTOK_BIO_TEXT = {
  about: 300,
  other0: 120,
  other1: 120,
  other2: 120,
  other3: 120,
  current: 200,
  proof: 120,
  location: 60,
  rhythm: 60,
  avoid: 100,
} as const;

/** UTF-16 units, the conservative count the brief asks for: an emoji counts as two or more, never less than TikTok's own counter. */
export const tiktokCount = (s: string) => s.normalize("NFC").length;
