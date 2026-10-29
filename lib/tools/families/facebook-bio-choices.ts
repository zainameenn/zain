// Shared by the Facebook Bio Generator page (client) and its API field list (server). Keep it data only.

/** The dropdown choices on the Facebook Bio Generator, per profile type. The page and the API both read these. */
export const FACEBOOK_BIO_CHOICES = {
  "Personal Profile": {
    describes: { label: "What best describes you?", options: ["Just Myself", "Student", "Gamer", "Traveler", "Creative", "Fitness Enthusiast", "Book Lover", "Food Lover"] },
    focus: { label: "What should your bio focus on?", options: ["Personality", "Interests", "Positive Vibes", "Life Goals", "Something Simple"] },
  },
  "Business Page": {
    describes: { label: "What type of business?", options: ["Local Business", "Online Store", "Marketing Agency", "Restaurant", "Beauty", "Fitness", "Coaching", "Professional Services"] },
    focus: { label: "What should your bio highlight?", options: ["Services", "What Makes Us Different", "Helping Customers", "Getting More Inquiries"] },
  },
  Creator: {
    describes: { label: "What kind of content do you create?", options: ["Lifestyle", "Gaming", "Technology", "Fashion", "Fitness", "Travel", "Food", "Education"] },
    focus: { label: "What should your bio communicate?", options: ["What I Create", "My Personality", "Building a Community", "My Creative Journey"] },
  },
  "Facebook Group": {
    describes: { label: "What's your community about?", options: ["Hobbies", "Gaming", "Business", "Fitness", "Education", "Technology", "Local Community", "Networking"] },
    focus: { label: "What's the group's purpose?", options: ["Helping Each Other", "Sharing Ideas", "Learning Together", "Connecting People"] },
  },
} as const;
export const FACEBOOK_BIO_TONES = ["Simple and Natural", "Friendly", "Professional", "Funny", "Aesthetic", "Confident"];
export const FACEBOOK_BIO_LANGUAGES = ["English", "Hindi", "Urdu", "Bangla"];
