// Shared by the Facebook Bio Generator page (client) and its API field list (server). Keep it data only.
// Every profile type has an optional free text box and four dropdown questions; each question ends
// with "Other", which opens a small text input on the page.

export type FacebookBioKind = "Personal Profile" | "Business Page" | "Creator" | "Facebook Group";

type Question = { label: string; options: string[] };
type KindConfig = { title: string; hint: string; placeholder: string; questions: [Question, Question, Question, Question] };

export const FACEBOOK_BIO_CHOICES: Record<FacebookBioKind, KindConfig> = {
  "Personal Profile": {
    title: "Tell us a little about yourself",
    hint: "A detail about your life, work, or interests makes the bio sound more like you. It's fine to leave this blank.",
    placeholder: "For example: I love books, cozy cafes, and taking photos on weekend walks.",
    questions: [
      { label: "What best describes you?", options: ["Student", "Gamer", "Traveler", "Creative", "Fitness Enthusiast", "Book Lover", "Food Lover", "Tech Lover", "Working Professional", "Just Myself", "Other"] },
      { label: "What should your bio focus on?", options: ["My Interests", "My Personality", "My Work", "My Goals", "Positive Vibes", "My Everyday Life", "Keeping It Simple", "Other"] },
      { label: "What kind of vibe feels like you?", options: ["Calm and Thoughtful", "Fun and Playful", "Curious", "Ambitious", "Cozy and Relaxed", "Bold and Confident", "Low Key", "Other"] },
      { label: "What should people take away?", options: ["A Quick Introduction", "What I Enjoy", "A Little Personality", "Something Memorable", "Just the Basics", "Other"] },
    ],
  },
  "Business Page": {
    title: "Tell us about your business",
    hint: "Mention what you actually offer, your location, or what makes the business yours. Even one detail helps.",
    placeholder: "For example: We run a small salon in Lahore, specializing in haircuts and natural hair care.",
    questions: [
      { label: "What kind of business do you have?", options: ["Beauty Salon", "Hair Salon", "Barbershop", "Nail Studio", "Spa and Skincare", "Clothing Brand", "Online Store", "Restaurant", "Cafe", "Bakery", "Fitness Studio", "Personal Training", "Photography", "Marketing Agency", "Software Agency", "Coaching", "Real Estate", "Home Services", "Education", "Healthcare", "Events", "Nonprofit", "Other"] },
      { label: "Who do you want to reach?", options: ["Local Customers", "Online Shoppers", "Small Business Owners", "Professionals", "Families", "Students", "Women", "Men", "Anyone Interested", "Other"] },
      { label: "What should your bio highlight?", options: ["Our Products", "Our Services", "How We Help", "Our Specialty", "Our Values", "Our Local Presence", "Quality and Care", "Other"] },
      { label: "What should people do next?", options: ["Send Us a Message", "Book an Appointment", "Explore Our Products", "Visit Our Store", "Follow Our Page", "Learn More", "No Call to Action", "Other"] },
    ],
  },
  Creator: {
    title: "Tell us about what you create",
    hint: "A quick note about your content, style, or what people can expect makes your bio more specific.",
    placeholder: "For example: I make short videos about simple phone photography tips and creative editing.",
    questions: [
      { label: "What do you create content about?", options: ["Lifestyle", "Gaming", "Technology", "Fashion", "Beauty", "Fitness", "Travel", "Food", "Education", "Photography", "Art", "Music", "Comedy", "Business", "Parenting", "Other"] },
      { label: "Who is your content for?", options: ["Beginners", "People Who Share My Interests", "Everyday Learners", "Creators", "Professionals", "Local Community", "Anyone Interested", "Other"] },
      { label: "What kind of content do you share?", options: ["Helpful Tips", "Tutorials", "Personal Stories", "Reviews", "Behind the Scenes", "Entertainment", "Creative Projects", "Other"] },
      { label: "What should visitors do?", options: ["Follow for More", "Explore My Content", "Join the Conversation", "Get Inspired", "Learn Something New", "Just Get to Know Me", "Other"] },
    ],
  },
  "Facebook Group": {
    title: "Tell us about your Facebook Group",
    hint: "What brings people together? Mention a specific interest, location, or who the group is for.",
    placeholder: "For example: A friendly group for new gardeners in Lahore to share tips, photos, and questions.",
    questions: [
      { label: "What's your community about?", options: ["Hobbies", "Gaming", "Business", "Fitness", "Education", "Technology", "Local Community", "Travel", "Parenting", "Books", "Gardening", "Arts and Crafts", "Job Networking", "Other"] },
      { label: "Who is this group for?", options: ["Beginners", "Local People", "Professionals", "Students", "Parents", "Enthusiasts", "Creators", "Everyone Welcome", "Other"] },
      { label: "What's the group's main purpose?", options: ["Helping Each Other", "Sharing Ideas", "Learning Together", "Connecting People", "Asking Questions", "Sharing Resources", "Finding Opportunities", "Other"] },
      { label: "What kind of community do you want?", options: ["Friendly and Welcoming", "Supportive and Helpful", "Practical and Informative", "Fun and Casual", "Focused and Professional", "Creative and Inspiring", "Other"] },
    ],
  },
};

export const FACEBOOK_BIO_TONES = ["Simple and Natural", "Friendly", "Professional", "A Little Funny", "Aesthetic", "Confident"];
export const FACEBOOK_BIO_LANGUAGES = ["English", "Hindi", "Urdu", "Bangla"];
/** Group descriptions are a longer field than the 101 character Intro. */
export const FACEBOOK_BIO_LIMITS: Record<FacebookBioKind, number> = { "Personal Profile": 101, "Business Page": 101, Creator: 101, "Facebook Group": 220 };
