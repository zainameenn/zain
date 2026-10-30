// Shared by the Twitter (X) Bio Generator page (client) and its API route (server). Keep it data only.
// Every account type has three dropdown questions (topic, what people can expect, goal); each list
// ends with "Other", which opens a small text input on the page.

export type XBioKind = "Personal" | "Creator" | "Business" | "Founder" | "Professional" | "Fan / Community";

type Question = { label: string; options: string[] };
type KindConfig = { about: string; placeholder: string; questions: [Question, Question, Question] };

export const X_BIO_CHOICES: Record<XBioKind, KindConfig> = {
  Personal: {
    about: "Tell us about yourself",
    placeholder: "For example: I teach maths and spend weekends hiking and baking bread.",
    questions: [
      { label: "What do you post about?", options: ["Everyday Life", "Books", "Gaming", "Sports", "Travel", "Fitness", "Food", "Photography", "Music", "Anime", "Technology", "Student Life", "Other"] },
      { label: "What should people expect?", options: ["Personal Updates", "Opinions", "Recommendations", "Humor", "Learning in Public", "Creative Projects", "Other"] },
      { label: "What's the goal of your bio?", options: ["Show Personality", "Meet People", "Share Interests", "Grow Following", "Keep It Simple", "Other"] },
    ],
  },
  Creator: {
    about: "What do you create?",
    placeholder: "For example: I make short videos about budget phone photography.",
    questions: [
      { label: "What's your niche?", options: ["Gaming", "Tech", "Art", "Photography", "Education", "Comedy", "Beauty", "Fashion", "Fitness", "Writing", "Cooking", "Music", "Anime", "Other"] },
      { label: "What's your main content?", options: ["Tips", "Tutorials", "Behind the Scenes", "Short Commentary", "Videos", "Art / Portfolio", "Reviews", "Other"] },
      { label: "What's the goal of your bio?", options: ["Get Followers", "Build Community", "Show Work", "Grow Newsletter", "Get Collaborations", "Other"] },
    ],
  },
  Business: {
    about: "Tell us about your business",
    placeholder: "For example: A small bakery in Leeds known for sourdough and weekend pastries.",
    questions: [
      { label: "What kind of business is it?", options: ["Beauty Salon", "Hair Salon", "Barbershop", "Makeup Artist", "Spa", "Clothing Store", "Jewelry", "Bakery", "Cafe", "Restaurant", "Fitness Studio", "Gym", "Local Retail", "Home Decor", "Etsy Shop", "Online Store", "SaaS", "Software Company", "Marketing Agency", "Design Studio", "Real Estate", "Education", "Coaching", "Professional Services", "Other"] },
      { label: "What's your main message?", options: ["What We Sell", "Who We Help", "Daily Updates", "Product Launches", "Local Services", "Customer Questions", "Bookings", "Other"] },
      { label: "What's the goal of your bio?", options: ["Build Trust", "Get Enquiries", "Encourage Visits", "Build Audience", "Introduce Brand", "Other"] },
    ],
  },
  Founder: {
    about: "Tell us about what you're building",
    placeholder: "For example: Building a booking app for yoga studios, two years in.",
    questions: [
      { label: "What are you building?", options: ["SaaS", "Ecommerce", "Indie Hacking", "Agency", "AI Tools", "Mobile Apps", "Community", "Local Business", "Other"] },
      { label: "What do you share?", options: ["Building in Public", "Product Updates", "Lessons", "Marketing", "Revenue Experiments", "Behind the Scenes", "Other"] },
      { label: "What's the goal of your bio?", options: ["Meet Other Founders", "Get Feedback", "Find Early Users", "Share Progress", "Other"] },
    ],
  },
  Professional: {
    about: "Tell us about your work",
    placeholder: "For example: Product designer at a fintech startup, 6 years in design.",
    questions: [
      { label: "What's your field?", options: ["Marketing", "Design", "Engineering", "Writing", "Sales", "Teaching", "Finance", "Healthcare", "Operations", "Recruiting", "Other"] },
      { label: "What do you share?", options: ["Practical Tips", "Work Stories", "Research", "Personal Projects", "Industry Ideas", "Other"] },
      { label: "What's the goal of your bio?", options: ["Networking", "Portfolio", "Freelance Enquiries", "Industry Discussion", "Other"] },
    ],
  },
  "Fan / Community": {
    about: "What is your fan account about?",
    placeholder: "For example: A fan account for a K-pop group, sharing edits and concert news.",
    questions: [
      { label: "What's your interest?", options: ["K-pop", "Anime", "Gaming", "Sports", "Football", "Film", "TV", "Comics", "Books", "Music", "Other"] },
      { label: "What do you share?", options: ["Edits", "Fan Art", "News Commentary", "Memes", "Reviews", "Community Chat", "Other"] },
      { label: "What's the goal of your bio?", options: ["Find Friends", "Share Fandom", "Post Updates", "Just Have Fun", "Other"] },
    ],
  },
};

export const X_BIO_TONES = ["Simple & Natural", "Professional", "Friendly", "Funny", "Minimal", "Aesthetic", "Confident", "Witty", "Cute"];
/** Languages checked with the production model (Gemini Flash Lite), October 2026. */
export const X_BIO_LANGUAGES = ["English", "Spanish", "Portuguese", "French", "German", "Italian", "Indonesian", "Hindi", "Urdu", "Arabic"];
export const X_BIO_EMOJI = ["None", "One or Two", "Playful"];
export const X_BIO_CTA = ["No CTA", "Follow for Updates", "See Website", "DMs Open", "Check Pinned Post", "Other"];
export const X_BIO_IMPROVE = ["Clearer", "More Natural", "Shorter", "More Professional", "More Personality", "Fewer Emojis", "Better Reason to Follow"];
export const X_BIO_STYLES = ["Clear & Direct", "Personality First", "Professional", "Short & Minimal", "A Little Different"];
/** Businesses get "Audience First" in place of a second professional version. */
export const X_BIO_BUSINESS_STYLES = ["Clear & Direct", "Personality First", "Audience First", "Short & Minimal", "A Little Different"];

/** X's bio limit. */
export const X_BIO_LIMIT = 160;

/** Free text fields and their length caps. */
export const X_BIO_TEXT = {
  about: 250,
  other0: 60,
  other1: 60,
  other2: 60,
  ctaOther: 60,
  businessName: 60,
  offer: 120,
  audience: 80,
  topics: 100,
  handle: 16,
  proof: 120,
  avoid: 100,
  current: 320,
} as const;

/** Code points, not UTF-16 units: an emoji counts at least once, and joined emoji count for every part, which keeps a safe margin under X's own count. */
export const xCount = (s: string) => [...s].length;
