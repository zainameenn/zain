// The six LinkedIn tools: their form fields, length windows and result actions, shared by the form
// (app/tools/_linkedin/LinkedInTool.tsx) and the route (/api/tools/linkedin) so both validate the same way.
// Field choices come from the November 2026 LinkedIn package; each field's `prompt` is the matching INPUTS
// label from the Prompt Library, so the labeled user lines line up with the tool prompt.

export type Window = { min: number; max: number };

export type LinkedInField =
  | { type: "select"; key: string; label: string; prompt: string; options: string[]; other?: boolean; more?: boolean }
  | { type: "text" | "area"; key: string; label: string; prompt: string; placeholder: string; max: number; required?: boolean; more?: boolean };

export type LinkedInKind = "post" | "comment" | "headline" | "about" | "experience" | "skills";

export type LinkedInTool = {
  kind: LinkedInKind;
  slug: string;
  name: string;
  /** What one result is called in the UI. */
  noun: string;
  fields: LinkedInField[];
  /** The select whose value picks the window, or a single window for every run. */
  windowBy?: string;
  windows?: Record<string, Window> | Window;
  /** Never go over this, whatever the window. */
  hardMax?: number;
  cta: string;
  heading: string;
  sample: Record<string, string>;
};

export const LANGUAGES = ["English", "Spanish", "Hindi", "Urdu"];
const TONES = ["Simple and natural", "Direct", "Thoughtful", "Professional", "Light humor", "Contrarian but respectful"];
const AVOID = (key = "avoid"): LinkedInField => ({ type: "text", key, label: "Words or phrases to avoid", prompt: "Words or phrases to avoid", placeholder: "For example: thrilled, game changer", max: 120, more: true });
const LANGUAGE: LinkedInField = { type: "select", key: "language", label: "Language", prompt: "Language", options: LANGUAGES };

export const LINKEDIN_TOOLS: Record<LinkedInKind, LinkedInTool> = {
  post: {
    kind: "post",
    slug: "linkedin-post-generator",
    name: "LinkedIn Post Generator",
    noun: "post",
    heading: "What do you want to post about?",
    cta: "Generate My Post",
    windowBy: "length",
    windows: { Short: { min: 400, max: 800 }, Medium: { min: 900, max: 1600 }, Long: { min: 1700, max: 2800 } },
    hardMax: 3000,
    fields: [
      { type: "area", key: "idea", label: "What are you posting about?", prompt: "Idea, experience or opinion", placeholder: "For example: we stopped publishing new blog posts for a month and fixed our old product pages instead", max: 1500, required: true },
      { type: "select", key: "who", label: "Who is posting?", prompt: "Who is posting (role, industry)", options: ["Personal profile", "Founder", "Freelancer", "Employee", "Company Page", "Job seeker", "Other"], other: true },
      { type: "select", key: "goal", label: "What is the goal?", prompt: "Goal", options: ["Share a lesson", "Explain an idea", "Start a useful discussion", "Tell a story", "Announce an update", "Promote a service", "Hiring", "Other"], other: true },
      { type: "select", key: "format", label: "Post format", prompt: "Post type", options: ["Short insight", "Story", "How to", "List", "Personal update", "Announcement", "Before and after", "Other"], other: true },
      { type: "select", key: "audience", label: "Audience", prompt: "Target reader", options: ["General professionals", "Founders", "Marketers", "Recruiters", "Job seekers", "Students", "Business owners", "Other"], other: true },
      { type: "select", key: "tone", label: "Tone", prompt: "Tone", options: TONES },
      { type: "select", key: "length", label: "Length", prompt: "Length", options: ["Short", "Medium", "Long"] },
      LANGUAGE,
      { type: "text", key: "role", label: "Your role and industry", prompt: "Their role and industry", placeholder: "For example: product marketer at a B2B SaaS company", max: 120, more: true },
      { type: "area", key: "context", label: "What really happened (optional)", prompt: "Real details from their experience", placeholder: "What you tried, what changed, what you genuinely believe. Real details only.", max: 1500, more: true },
      { type: "text", key: "cta", label: "Call to action (optional)", prompt: "Call to action (optional)", placeholder: "For example: ask readers what they would audit first", max: 160, more: true },
      AVOID(),
    ],
    sample: { idea: "We stopped writing new blog posts for a month and rewrote our five weakest product pages instead.", context: "Two of the pages had no clear next step. After the rewrite, demo requests from those pages went up. I don't have exact numbers I can share.", who: "Founder", goal: "Share a lesson", format: "Story", audience: "Founders", role: "Founder of a small B2B SaaS company" },
  },

  comment: {
    kind: "comment",
    slug: "linkedin-comment-generator",
    name: "LinkedIn Comment Generator",
    noun: "comment",
    heading: "Which post are you replying to?",
    cta: "Generate My Comment",
    windowBy: "length",
    windows: { "One sentence": { min: 60, max: 220 }, "2 to 3 sentences": { min: 150, max: 450 }, "4 to 5 sentences": { min: 300, max: 600 } },
    hardMax: 1250,
    fields: [
      { type: "area", key: "post", label: "Paste the LinkedIn post", prompt: "The post", placeholder: "Paste the text of the post or comment you want to reply to", max: 3000, required: true },
      { type: "select", key: "reaction", label: "What is your reaction?", prompt: "Their angle", options: ["Agree and add detail", "Respectfully disagree", "Share a related experience", "Ask a genuine question", "Add a practical tip", "Unsure"] },
      { type: "select", key: "perspective", label: "Your perspective", prompt: "Who is commenting (role, expertise)", options: ["Marketing", "Product", "Engineering", "Sales", "Recruitment", "Education", "Business owner", "Student", "Other"], other: true },
      { type: "select", key: "length", label: "Comment length", prompt: "Length", options: ["2 to 3 sentences", "One sentence", "4 to 5 sentences"] },
      { type: "select", key: "tone", label: "Tone", prompt: "Tone", options: ["Straightforward", "Friendly", "Thoughtful", "Professional", "Witty, when suitable"] },
      LANGUAGE,
      { type: "area", key: "take", label: "What do you actually think? (optional)", prompt: "What the commenter actually thinks or has seen (true only)", placeholder: "One experience, observation or fact you can stand behind", max: 600, more: true },
      AVOID(),
    ],
    sample: { post: "We cut our onboarding from seven steps to three. Support tickets in the first week dropped noticeably. Simple beats clever.", reaction: "Agree and add detail", perspective: "Product", take: "We saw something similar, but activation only moved after we also changed the welcome email." },
  },

  headline: {
    kind: "headline",
    slug: "linkedin-headline-generator",
    name: "LinkedIn Headline Generator",
    noun: "headline",
    heading: "What should your headline say?",
    cta: "Generate My Headline",
    windows: { min: 150, max: 220 },
    hardMax: 220,
    fields: [
      { type: "text", key: "role", label: "Your current role or field", prompt: "Current role or title", placeholder: "For example: marketing analyst", max: 100, required: true },
      { type: "select", key: "describes", label: "What describes you?", prompt: "What describes them", options: ["Employee", "Student", "Job seeker", "Founder", "Freelancer", "Consultant", "Career changer", "Other"], other: true },
      { type: "select", key: "goal", label: "What do you want from your profile?", prompt: "Goal of the profile", options: ["Get hired", "Find clients", "Build credibility", "Network", "Show expertise", "Other"], other: true },
      { type: "select", key: "industry", label: "Industry", prompt: "Industry", options: ["Technology", "Marketing", "Finance", "Education", "Healthcare", "Design", "Retail", "Other"], other: true },
      { type: "select", key: "style", label: "Headline style", prompt: "Headline style", options: ["Role and specialties", "Clear sentence", "Audience and outcome"] },
      LANGUAGE,
      { type: "text", key: "skills", label: "Skills you actually use (optional)", prompt: "Skills or keywords recruiters and clients search for", placeholder: "For example: GA4, Excel, campaign reporting", max: 160, more: true },
      { type: "text", key: "help", label: "Who you help or work with (optional)", prompt: "Who they help or work with", placeholder: "For example: SaaS marketing teams", max: 120, more: true },
      { type: "text", key: "value", label: "What you help with (optional)", prompt: "What they help with or the result they deliver", placeholder: "For example: clearer campaign reporting", max: 140, more: true },
      { type: "text", key: "proof", label: "Proof you can back up (optional)", prompt: "Proof (optional)", placeholder: "Only real credentials or figures", max: 140, more: true },
      { type: "text", key: "target", label: "Role you are aiming for (optional)", prompt: "Target role they are aiming for (an aspiration, never a current title)", placeholder: "For example: growth marketing roles", max: 100, more: true },
    ],
    sample: { role: "Marketing analyst", describes: "Job seeker", goal: "Get hired", industry: "Marketing", skills: "GA4, Excel, campaign reporting, SQL basics", target: "growth marketing roles" },
  },

  about: {
    kind: "about",
    slug: "linkedin-about-section-generator",
    name: "LinkedIn About Section Generator",
    noun: "About section",
    heading: "Who is this About section for?",
    cta: "Write My About Section",
    windowBy: "length",
    windows: { Short: { min: 400, max: 800 }, Medium: { min: 800, max: 1500 }, Detailed: { min: 1500, max: 2400 } },
    hardMax: 2600,
    fields: [
      { type: "area", key: "background", label: "Your role or background", prompt: "Experience and background", placeholder: "For example: three years in customer support at a software company, now studying product operations", max: 1500, required: true },
      { type: "select", key: "who", label: "Who is this about?", prompt: "Who they are", options: ["Professional", "Student", "New graduate", "Job seeker", "Founder", "Freelancer", "Career changer", "Other"], other: true },
      { type: "select", key: "goal", label: "Goal", prompt: "What they want readers to do", options: ["Find opportunities", "Explain expertise", "Find clients", "Network", "Build credibility", "Other"], other: true },
      { type: "select", key: "audience", label: "Audience", prompt: "Who they help and how", options: ["Recruiters", "Potential clients", "Colleagues", "Founders", "General professionals"] },
      { type: "select", key: "approach", label: "Writing approach", prompt: "Person and tone", options: ["First person", "Conversational", "Direct and concise", "Story-led", "Professional"] },
      { type: "select", key: "length", label: "Length", prompt: "Length", options: ["Medium", "Short", "Detailed"] },
      LANGUAGE,
      { type: "text", key: "role", label: "Name and current role (optional)", prompt: "Name and current role", placeholder: "For example: Sara, support lead", max: 120, more: true },
      { type: "area", key: "achievements", label: "Achievements and proof (optional)", prompt: "Achievements and proof", placeholder: "Only confirmed numbers, projects, certifications", max: 800, more: true },
      { type: "text", key: "skills", label: "Skills and keywords (optional)", prompt: "Skills and keywords", placeholder: "For example: process documentation, ticket analysis", max: 200, more: true },
      { type: "text", key: "difference", label: "What makes you different (optional)", prompt: "What makes them different", placeholder: "A real point of view or way of working", max: 200, more: true },
      AVOID(),
    ],
    sample: { background: "Three years in customer support at a B2B software company. I turned recurring tickets into help articles and process docs. Now taking a product operations course and building small workflow projects.", who: "Career changer", goal: "Find opportunities", audience: "Recruiters", skills: "process documentation, ticket analysis, cross team communication" },
  },

  experience: {
    kind: "experience",
    slug: "linkedin-experience-description-generator",
    name: "LinkedIn Experience Description Generator",
    noun: "description",
    heading: "Which role are you describing?",
    cta: "Write My Experience",
    windowBy: "format",
    windows: { "3 to 5 bullet points": { min: 250, max: 1000 }, "Short paragraph": { min: 250, max: 700 }, Both: { min: 500, max: 1600 } },
    hardMax: 2000,
    fields: [
      { type: "text", key: "role", label: "What was your role?", prompt: "Job title", placeholder: "For example: social media coordinator", max: 100, required: true },
      { type: "area", key: "duties", label: "What did you actually do?", prompt: "Main responsibilities (their own notes)", placeholder: "Rough notes are fine: what you worked on, owned or improved", max: 1500, required: true },
      { type: "select", key: "employment", label: "Employment type", prompt: "Employment type", options: ["Full-time", "Part-time", "Contract", "Freelance", "Internship", "Volunteer", "Other"], other: true },
      { type: "select", key: "level", label: "Career level", prompt: "Career level", options: ["Entry level", "Student", "Mid level", "Senior", "Manager", "Director", "Founder", "Other"], other: true },
      { type: "select", key: "work", label: "Type of work", prompt: "Type of work", options: ["Marketing", "Software", "Data", "Sales", "Operations", "Finance", "Design", "Education", "Other"], other: true },
      { type: "select", key: "format", label: "Preferred format", prompt: "Format", options: ["3 to 5 bullet points", "Short paragraph", "Both"] },
      { type: "select", key: "focus", label: "Focus", prompt: "Focus", options: ["Responsibilities", "Projects", "Outcomes", "Leadership", "Technical tools"] },
      LANGUAGE,
      { type: "text", key: "company", label: "Company or client type (optional)", prompt: "Company or client type", placeholder: "For example: a regional retail chain", max: 120, more: true },
      { type: "area", key: "results", label: "Real achievements (optional)", prompt: "Confirmed results (figures, team sizes, dates)", placeholder: "Only figures and results you can confirm", max: 800, more: true },
      { type: "area", key: "jd", label: "Job description, for wording only (optional)", prompt: "Job posting text (vocabulary only, never evidence)", placeholder: "Paste a job posting to borrow its wording. It is never treated as proof of your experience.", max: 3000, more: true },
      AVOID(),
    ],
    sample: { role: "Social media coordinator", duties: "planned weekly posts for LinkedIn and Facebook, wrote design briefs, checked post analytics every Monday and shared what worked with the team", employment: "Full-time", level: "Entry level", work: "Marketing", focus: "Responsibilities" },
  },

  skills: {
    kind: "skills",
    slug: "linkedin-skills-generator",
    name: "LinkedIn Skills Generator",
    noun: "skills list",
    heading: "Which role are the skills for?",
    cta: "Find My Skills",
    fields: [
      { type: "text", key: "role", label: "Your current or target role", prompt: "Role", placeholder: "For example: junior data analyst", max: 100, required: true },
      { type: "select", key: "need", label: "What do you need?", prompt: "What they need", options: ["Skills for my current role", "Skills for a target role", "Improve my existing skills list", "Skills gap ideas"] },
      { type: "select", key: "stage", label: "Career stage", prompt: "Career stage", options: ["Entry level", "Student", "Mid level", "Senior", "Manager", "Career changer", "Other"], other: true },
      { type: "select", key: "field", label: "Your field", prompt: "Field", options: ["Marketing", "Technology", "Data", "Design", "Sales", "Finance", "Healthcare", "Education", "Other"], other: true },
      { type: "select", key: "count", label: "How many suggestions?", prompt: "Number of suggestions", options: ["10", "15", "20"] },
      { type: "select", key: "mix", label: "Skills mix", prompt: "Skills mix", options: ["Balanced", "Tools and software", "Technical methods", "Business skills"] },
      { type: "area", key: "have", label: "Skills you genuinely have (optional)", prompt: "Skills they confirm they have", placeholder: "Separate with commas. For example: Excel, SQL, dashboard design", max: 600, more: true },
      { type: "area", key: "jd", label: "Job description (optional)", prompt: "Job posting text", placeholder: "Paste a job posting to compare against", max: 4000, more: true },
    ],
    sample: { role: "Junior data analyst", need: "Skills for a target role", stage: "Career changer", field: "Data", have: "Excel, pivot tables, customer support reporting, documentation" },
  },
};

export const LINKEDIN_BY_SLUG = Object.fromEntries(Object.values(LINKEDIN_TOOLS).map((t) => [t.slug, t])) as Record<string, LinkedInTool>;

/** The window for this run: picked by a select's value, or the tool's single window. */
export function windowFor(tool: LinkedInTool, values: Record<string, string>): Window | null {
  if (!tool.windows) return null;
  if (!tool.windowBy) return tool.windows as Window;
  const w = (tool.windows as Record<string, Window>)[values[tool.windowBy]];
  return w ?? Object.values(tool.windows as Record<string, Window>)[0];
}

/** One step refinements of the current result. "another" is handled as a regenerate. */
export const LINKEDIN_ACTIONS = {
  shorter: { label: "Make it shorter", instruction: "Rewrite this draft about a third shorter. Keep every fact, the main point and the voice." },
  natural: { label: "More natural", instruction: "Rewrite this draft so it sounds more like a real person talking to a colleague: plainer words, varied sentence length, nothing salesy. Keep every fact." },
  simpler: { label: "Simpler words", instruction: "Rewrite this draft with simpler, more common words and shorter sentences. Keep every fact and the structure." },
} as const;
export type LinkedInAction = keyof typeof LINKEDIN_ACTIONS;

/** Characters as LinkedIn and the Prompt Library count them: code points, so an emoji counts once. */
export const liCount = (s: string) => [...s].length;
