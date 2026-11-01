// Shared by the Facebook Caption Generator page (client) and its API route (server). Keep it data only.
// Every account type has three dropdown questions (topic or category, post idea, goal); tone, length
// and language are shared. "Other" opens a small text input on the page.

export type FbCaptionKind = "Personal Profile" | "Business Page" | "Creator" | "Facebook Group";

type Question = { label: string; options: string[] };
type KindConfig = { about: string; placeholder: string; questions: [Question, Question, Question] };

export const FB_CAPTION_CHOICES: Record<FbCaptionKind, KindConfig> = {
  "Personal Profile": {
    about: "What are you posting about?",
    placeholder: "For example: First hike of the year with my sister. We got lost twice.",
    questions: [
      { label: "Post idea", options: ["Weekend photo", "Food", "Family moment", "Travel", "Hobby", "Milestone", "Daily life", "Funny observation", "Other"] },
      { label: "Who is this for?", options: ["Friends", "Family", "Everyone", "Specific community", "Other"] },
      { label: "What is the goal?", options: ["Share an update", "Tell a story", "Make people smile", "Ask a genuine question", "No action"] },
    ],
  },
  "Business Page": {
    about: "What are you posting about?",
    placeholder: "For example: We're showing the new latte at our cafe. It's available from Friday.",
    questions: [
      { label: "Business category", options: ["Beauty salon", "Hair salon", "Barber", "Bakery", "Restaurant", "Cafe", "Fitness", "Online store", "Clothing", "Home decor", "Photography", "Real estate", "Education", "Marketing agency", "Software or SaaS", "Local services", "Professional services", "Other"] },
      { label: "Post idea", options: ["New product", "Product highlight", "Service explanation", "Offer", "Event", "Business hours", "Behind the scenes", "Customer education", "Milestone", "Other"] },
      { label: "What is the goal?", options: ["Inform customers", "Explain value", "Get inquiries", "Encourage visits", "Explain a product", "Share a real offer", "No action"] },
    ],
  },
  Creator: {
    about: "What are you posting about?",
    placeholder: "For example: A Reel about the three lighting mistakes I made filming at home.",
    questions: [
      { label: "Content niche", options: ["Lifestyle", "Gaming", "Technology", "Food", "Fitness", "Travel", "Education", "Beauty", "Books", "Comedy", "Art", "Design", "Other"] },
      { label: "Post idea", options: ["Behind the scenes", "New Reel", "Tutorial", "Work in progress", "Opinion", "Personal learning", "Community update", "Other"] },
      { label: "What is the goal?", options: ["Explain the content", "Tell a story", "Share a useful tip", "Invite a relevant comment", "Send to link", "No action"] },
    ],
  },
  "Facebook Group": {
    about: "What are you posting about?",
    placeholder: "For example: Reminder that the monthly meetup moved to the library this time.",
    questions: [
      { label: "Community topic", options: ["Business", "Gaming", "Fitness", "Parenting", "Technology", "Local community", "Education", "Hobbies", "Travel", "Other"] },
      { label: "Post idea", options: ["Announcement", "Welcome", "Reminder", "Discussion", "Weekly thread", "Community resource", "Event", "Moderator update", "Other"] },
      { label: "What is the goal?", options: ["Help members", "Explain rules", "Share a resource", "Invite helpful discussion", "No action"] },
    ],
  },
};

export const FB_CAPTION_TONES = ["Simple and natural", "Friendly", "Funny", "Professional", "Informative", "Storytelling", "Warm", "Bold", "Other"];
export const FB_CAPTION_LENGTHS = ["Short", "Medium", "Longer story"];
/** Languages checked with the production model (Gemini Flash Lite), October 2026. */
export const FB_CAPTION_LANGUAGES = ["English", "Spanish", "Hindi", "Urdu"];
export const FB_CAPTION_CTAS = ["Give a practical next step", "Link supplied by me", "Invite a genuine reply", "Contact the business"];
export const FB_CAPTION_LABELS = ["Straight to the point", "Conversational", "Story-first", "Useful and informative", "A different angle"];
/** Per caption actions; "another" writes a fresh version of the same angle. */
export const FB_CAPTION_ACTIONS = { shorter: "Make it noticeably shorter, keeping every fact.", natural: "Make it sound more natural, like a person talking.", rewrite: "Rewrite it with different wording, keeping every fact.", another: "Write a fresh version of this angle." } as const;

export const FB_PHOTO_MAX_BYTES = 8 * 1024 * 1024;
export const FB_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp"];

/** Free text fields and their length caps. */
export const FB_CAPTION_TEXT = {
  about: 400,
  other0: 80,
  other1: 80,
  other2: 80,
  toneOther: 60,
  productName: 80,
  price: 40,
  date: 60,
  offerTerms: 200,
  hours: 80,
  location: 80,
  url: 200,
  existing: 1500,
  voice: 500,
  avoid: 150,
  answer: 200,
  current: 2000,
} as const;
