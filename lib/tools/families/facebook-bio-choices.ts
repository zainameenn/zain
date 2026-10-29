// Shared by the Facebook Bio Generator page (client) and its API field list (server). Keep it data only.

/** The dropdown choices on the Facebook Bio Generator, per profile type. The page and the API both read these. */
export const FACEBOOK_BIO_CHOICES = {
  "Personal Profile": {
    describes: { label: "What best describes you?", options: ["Just Myself", "Student", "Professional", "Parent", "Gamer", "Traveler", "Creative", "Fitness Enthusiast", "Book Lover", "Food Lover", "Music Lover", "Sports Fan", "Pet Lover", "Entrepreneur"] },
    focus: { label: "What should your bio focus on?", options: ["Personality", "Interests", "Positive Vibes", "Life Goals", "Something Simple"] },
  },
  "Business Page": {
    describes: { label: "What type of business?", options: ["Local Business", "Restaurant or Cafe", "Bakery or Desserts", "Retail Shop", "Online Store", "Beauty or Salon", "Fitness or Gym", "Health and Wellness", "Clinic or Healthcare", "Real Estate", "Education or Tutoring", "Photography", "Events or Weddings", "Home Services", "Construction or Trades", "Cleaning Services", "Travel or Tourism", "Fashion or Clothing", "Marketing Agency", "Tech or Software", "Coaching", "Professional Services", "Nonprofit", "Something Else"] },
    focus: { label: "What should your bio highlight?", options: ["Services", "What Makes Us Different", "Helping Customers", "Getting More Inquiries"] },
  },
  Creator: {
    describes: { label: "What kind of content do you create?", options: ["Lifestyle", "Gaming", "Technology", "Fashion", "Beauty", "Fitness", "Travel", "Food", "Education", "Comedy", "Music", "Art", "Photography", "Business", "Parenting"] },
    focus: { label: "What should your bio communicate?", options: ["What I Create", "My Personality", "Building a Community", "My Creative Journey"] },
  },
  "Facebook Group": {
    describes: { label: "What's your community about?", options: ["Hobbies", "Gaming", "Business", "Fitness", "Education", "Technology", "Local Community", "Networking"] },
    focus: { label: "What's the group's purpose?", options: ["Helping Each Other", "Sharing Ideas", "Learning Together", "Connecting People"] },
  },
} as const;
export const FACEBOOK_BIO_TONES = ["Simple and Natural", "Friendly", "Professional", "Funny", "Aesthetic", "Confident"];
export const FACEBOOK_BIO_LANGUAGES = ["English", "Hindi", "Urdu", "Bangla"];

/**
 * Optional extra details, behind "Add more details". Every one is optional, so a bio still works with
 * none of them. Labels and placeholders change with the profile type; the field names don't.
 */
export const FACEBOOK_BIO_DETAILS: Record<keyof typeof FACEBOOK_BIO_CHOICES, { about: [string, string]; name: [string, string]; offer: [string, string] | null; location: [string, string] }> = {
  "Personal Profile": { about: ["Tell us about yourself", "e.g. coffee addict, learning guitar, always planning the next trip"], name: ["Your name or nickname", "e.g. Sara"], offer: null, location: ["Where you're from", "e.g. Lahore"] },
  "Business Page": { about: ["Tell us about your business", "e.g. family run, everything baked fresh each morning"], name: ["Business name", "e.g. Sweet Crumbs"], offer: ["What you sell or do", "e.g. custom birthday cakes and brownies"], location: ["Where you're based or serve", "e.g. Lahore, delivery across the city"] },
  Creator: { about: ["Tell us about your content", "e.g. quick recipes under 15 minutes, posted every Friday"], name: ["Your name or creator name", "e.g. Chef Ali"], offer: ["What people get from following", "e.g. easy weeknight dinners"], location: ["Where you're based", "e.g. Toronto"] },
  "Facebook Group": { about: ["Tell us about the group", "e.g. beginners welcome, weekly Q&A threads"], name: ["Group name", "e.g. Lahore Home Gardeners"], offer: ["Who the group is for", "e.g. first time gardeners and balcony growers"], location: ["Area it serves", "e.g. Lahore"] },
};
export const FACEBOOK_BIO_CTAS = ["No call to action", "Follow for more", "Send a message", "Call us", "Visit us", "Shop online", "Book now", "Join the group"];
