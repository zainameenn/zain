import { FAIR_USE, LINK_SOCIAL_MEDIA_SERVICE } from "../links";
import type { BrandExample, StudioContent, ToolPage } from "../types";
import { studioBioPage, type StudioBioPlatform } from "./studio-bio";

// Facebook Bio Generator on the studio layout, same structure as the Instagram page.

/** Old form copy, still read by the bio family. The studio form below replaces the fields on this page. */
export const FACEBOOK_FIELD_COPY = {
  who: { placeholder: "Family run plumbing business" },
  current_bio: { label: "Paste your current bio or Page intro" },
};

const CHECKED = "October 17, 2026";
const logo = (path: string, alt: string) => ({ src: path, alt, width: 64, height: 64 });
const IG = "/assets/tools/instagram-bio/brands";

const PLATFORM: StudioBioPlatform = {
  platform: "Facebook",
  skin: "facebook",
  limit: 101,
  target: [40, 95],
  shortMax: 40,
  facts:
    "The bio shows in the Intro section of a profile or Page, which is always public. Plain and trustworthy reads best, in one or two short lines. Website, phone, hours and address have their own fields, so never put them in the bio. Local businesses should name the area if one is given.",
  goals: ["Get more followers", "Visit my website", "Shop my products", "Book a service", "Send a message", "Call or visit us", "No CTA"],
  defaultFormat: "Single line",
  copy: {
    about: "Family run plumbing for Austin homes",
    currentBio: "Welcome to our official Facebook page!! Like and share",
    name: "Garcia Plumbing",
    nameHint: "Shows on the preview as your profile or Page name.",
    audience: "Homeowners who need a plumber they can trust",
    proof: "25 years in business, 4.8 stars on Google",
    keywords: "plumber, emergency repairs",
    location: "Austin, TX",
  },
  example: {
    account_type: "Business",
    category: "Small Business",
    about: "Family run plumbing for homes, same day repairs",
    name: "Garcia Plumbing",
    location: "Austin, TX",
    proof: "25 years in business",
    tone: "Professional",
    goal: "Send a message",
    emoji: "None",
    format: "Single line",
  },
};

/**
 * Real Pages. Each bio is the Intro text on the brand's live Facebook Page on the date in CHECKED.
 * Bios change often (Duolingo's is seasonal), so recheck before relying on them. Brands without a free logo get a neutral monogram.
 */
const BRANDS: BrandExample[] = [
  {
    brand: "Patagonia",
    handle: "PATAGONIA",
    url: "https://www.facebook.com/PATAGONIA/",
    logo: null,
    bio: "We're in business to save our home planet.",
    checked: CHECKED,
    style: "Brand-focused",
    why: "Its mission in one sentence. No product, no offer, just why the company exists, which is what its customers care about.",
    lesson: "If people buy from you because of what you stand for, say that first.",
  },
  {
    brand: "Duolingo",
    handle: "duolingo",
    url: "https://www.facebook.com/duolingo/",
    logo: logo(`${IG}/duolingo.svg`, "Duolingo logo"),
    bio: "educated girl autumn 🎃🦉",
    checked: CHECKED,
    style: "Personality",
    why: "The same seasonal joke it uses on other platforms, so the brand sounds the same wherever you meet it.",
    lesson: "Keep one voice across every profile.",
  },
  {
    brand: "Canva",
    handle: "canva",
    url: "https://www.facebook.com/canva/",
    logo: logo(`${IG}/canva.svg`, "Canva logo"),
    bio: "Amazingly simple graphic design. Need a little help? https://support.canva.com",
    checked: CHECKED,
    style: "Action-focused",
    why: "What it is in four words, then the most common reason people visit the Page, then where to go.",
    lesson: "Answer the question most visitors arrive with.",
  },
  {
    brand: "Starbucks",
    handle: "Starbucks",
    url: "https://www.facebook.com/Starbucks/",
    logo: null,
    bio: "The Starbucks Coffee Company ☕️",
    checked: CHECKED,
    style: "Minimal",
    why: "Just the full company name and one emoji. The Page category and website fill in the rest.",
    lesson: "Only famous brands can get away with this little.",
  },
  {
    brand: "Katz's Delicatessen",
    handle: "katzsdeli",
    url: "https://www.facebook.com/katzsdeli/",
    logo: null,
    bio: "New York City's most iconic deli.",
    checked: CHECKED,
    style: "Brand-focused",
    why: "Place and a confident claim in six words. The Intro card adds the address, hours and contact details from their own fields.",
    lesson: "Local business? Name the place in the bio and let the fields carry the details.",
  },
  {
    brand: "Stumptown Coffee",
    handle: "stumptowncoffee",
    url: "https://www.facebook.com/stumptowncoffee/",
    logo: null,
    bio: "Highest Quality ☕ Roasted Daily\nCertified B Corporation\n#stumptowncoffee",
    checked: CHECKED,
    style: "Brand-focused",
    why: "Three short lines: a promise, a real credential and its own hashtag. Easy to scan in the Intro box.",
    lesson: "A real credential, stated once, builds trust fast.",
  },
];

const STUDIO: StudioContent = {
  lede: "This Facebook bio generator writes short, trustworthy bios for your profile or Page that fit about 101 characters.",
  sub: "Choose your style, tell us what your account is about, and get five bios ready to copy.",
  trust: `Free to use, no signup required. ${FAIR_USE.replace("Free to use. ", "")}`,
  sections: [
    {
      kind: "steps",
      eyebrow: "How it works",
      heading: "How to use the",
      accent: "Facebook bio generator",
      intro: "Three steps, about thirty seconds. The phone preview updates while you go.",
      steps: [
        { title: "Tell us about your account", text: "Pick a personal profile, creator or business Page, then choose your niche or type your own.", visual: "account" },
        { title: "Choose your style", text: "Pick a tone, how many emoji you want, and one line or two.", visual: "style" },
        { title: "Copy your favorite", text: "Compare five bios, preview any of them on the phone, then paste one into the Intro section on Facebook.", visual: "copy" },
      ],
    },
    {
      kind: "gallery",
      eyebrow: "Real examples",
      heading: "6 Facebook bios",
      accent: "worth learning from",
      intro: "How well known brands and a famous local deli use the Intro section, from a mission statement to three tidy lines.",
      note: `Big brands can lean on name recognition, so copy the habits, not the brevity. Intros as shown on each official Facebook Page on ${CHECKED}, and they may have changed since. Logos are trademarks of their owners, shown only to identify each account.`,
      items: BRANDS,
    },
    {
      kind: "creator",
      eyebrow: "Bio breakdown",
      heading: "What makes a good",
      accent: "Facebook bio",
      intro: "People often check a Facebook Page to see if you're real and what you do. Here's a real creator Intro, taken apart piece by piece.",
      profile: {
        handle: "gordonramsay",
        name: "Gordon Ramsay",
        url: "https://www.facebook.com/gordonramsay/",
        checked: CHECKED,
        category: "Chef",
        link: "gordonramsay.com",
        photo: {
          src: "/assets/tools/facebook-bio/gordon-ramsay.webp",
          alt: "Gordon Ramsay",
          width: 256,
          height: 256,
          credit: "Photo: Dave Pullig, [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/), via Wikimedia Commons, cropped.",
        },
      },
      nameMark: 1,
      categoryMark: 4,
      linkMark: 5,
      join: " ",
      lines: [{ text: "The official Facebook page of" }, { text: "Chef, Restaurateur, TV Personality,", mark: 2 }, { text: "Prankster and Dad", mark: 3 }],
      points: [
        { title: "Page name", text: "Just his name. The category and the Intro do the describing, so the name stays clean and easy to search." },
        { title: "Roles, most important first", text: "Chef comes first, which matches the Page category underneath. Then the other things he's known for." },
        { title: "Personality at the end", text: "\"Prankster and Dad\" turns a list of job titles into a person. It's the line people remember." },
        { title: "Category", text: "\"Page · Chef\" sits in the Intro and tells visitors what kind of Page this is before they read anything else." },
        { title: "Website in its own field", text: "gordonramsay.com sits in the Links field, so the bio doesn't spend characters on it." },
        { title: "What's missing", text: "\"The official Facebook page of\" uses almost a third of the space on something the name already says. A smaller Page should lead with what it does." },
      ],
      note: `Intro, category and website as shown on Gordon Ramsay's Facebook Page on ${CHECKED}. Follower counts and posts are left out on purpose.`,
    },
    {
      kind: "compare",
      eyebrow: "Before and after",
      heading: "Fixing a weak",
      accent: "Facebook bio",
      intro: "Visitors want to know what you do and whether they can trust you. A greeting answers neither.",
      before: "Welcome to our official Facebook page!! 🙏 Like and share ❤️",
      after: "Family run plumbers serving Austin homes. Same day repairs, upfront prices.",
      changes: [
        "The welcome became what the business actually does.",
        "Naming the city tells locals it's for them.",
        "Two concrete promises replaced a request to like and share.",
      ],
    },
    {
      kind: "styles",
      eyebrow: "Bio ideas",
      heading: "Facebook bio ideas",
      accent: "for every style",
      intro: "Six different approaches for profiles and Pages. Find one that sounds like you, then send its settings straight to the generator.",
      styles: [
        {
          name: "Minimal",
          when: "For photographers, artists and personal profiles.",
          bio: "Wedding photographer · Lake District",
          why: "What and where. People who need you know at a glance.",
          settings: { tone: "Minimal", emoji: "None", format: "Single line" },
        },
        {
          name: "Professional",
          when: "For trades, clinics and service businesses.",
          bio: "Family run plumbing for Austin homes. Same day repairs, upfront prices.",
          why: "Who you are, where you work and two reasons to trust you.",
          settings: { tone: "Professional", emoji: "None", format: "Single line" },
          dark: true,
        },
        {
          name: "Funny",
          when: "For personal profiles with a sense of humor.",
          bio: "Dad, runner and the slowest marathon finisher in Leeds",
          why: "Three real facts, and the last one makes you smile.",
          settings: { tone: "Funny", emoji: "None", format: "Single line" },
        },
        {
          name: "Aesthetic",
          when: "For makers and lifestyle accounts.",
          bio: "plants, pottery and slow sundays 🌿",
          why: "A mood in a few soft words. It works when the photos match.",
          settings: { tone: "Aesthetic", emoji: "Subtle", format: "Single line" },
        },
        {
          name: "Creator",
          when: "For food, parenting and how to creators.",
          bio: "Easy weeknight recipes for busy families 🍝\nNew video every Sunday",
          why: "What you make, who it's for and when to come back.",
          settings: { tone: "Friendly", emoji: "Subtle", format: "Multiple lines" },
        },
        {
          name: "Local business",
          when: "For cafés, shops and anyone with a front door.",
          bio: "Neighborhood bakery in Portland 🥐\nFresh bread daily, come and say hello",
          why: "The place and a warm invitation. Hours and address go in their own fields.",
          settings: { tone: "Friendly", emoji: "Subtle", format: "Multiple lines", goal: "Call or visit us" },
        },
      ],
    },
    {
      kind: "practices",
      eyebrow: "Best practices",
      heading: "Facebook bio",
      accent: "best practices",
      intro: "Six habits that make the biggest difference, each one a different idea.",
      items: [
        {
          title: "Make it trustworthy",
          text: "People often visit a Facebook profile or Page to check you're legit. Say plainly what you do.",
          featured: true,
          example: { good: "Family run plumbers serving Austin", bad: "Living the dream ✨🙏" },
        },
        {
          title: "Remember it's public",
          text: "Facebook says the Intro section is [always public](https://www.facebook.com/help/1090724464274188), so only write what you'd tell a stranger.",
          example: { good: "Nurse and weekend baker", bad: "Nurse at St Mary's, Ward 4, nights" },
        },
        {
          title: "Use the right fields",
          text: "Pages have separate fields for [links, contact info, hours and address](https://www.facebook.com/help/160672070698623).",
          example: { good: "Same day repairs, upfront prices", bad: "Call 555 0123 · Open 8 to 6" },
        },
        { title: "Name your area", text: "Local customers want to know you serve them, and a place name tells them in one word.", example: { good: "Bakery in Portland's Pearl District" } },
        { title: "Skip \"official page\"", text: "Your name already says it. Spend the characters on what you do.", example: { good: "New York City's most iconic deli.", bad: "The official Facebook page of us" } },
        {
          title: "Keep it to about 101 characters",
          text: "Facebook doesn't publish an exact limit. 101 is the figure most guides use, and the tool keeps every bio within it.",
          example: { count: 84 },
        },
      ],
    },
    { kind: "faq", eyebrow: "FAQ", heading: "Frequently asked", accent: "questions" },
    {
      kind: "related",
      eyebrow: "Keep going",
      heading: "More free tools for",
      accent: "your social profiles",
      tools: [
        { slug: "instagram-bio-generator", text: "Your bio for Instagram, in 150 characters.", icon: "bio" },
        { slug: "twitter-bio-generator", text: "A sharper 160 character bio for X.", icon: "x" },
        { slug: "threads-bio-generator", text: "A warmer, chattier bio for Threads.", icon: "chat" },
        { slug: "instagram-caption-generator", text: "Captions for the posts your bio promises.", icon: "caption" },
      ],
    },
    {
      kind: "cta",
      heading: "A better bio is a start.",
      accent: "Let's fix the rest of your social presence.",
      copy: "I help SaaS and service businesses turn content, profiles and organic social into real growth.",
      button: "Explore social media marketing",
      href: LINK_SOCIAL_MEDIA_SERVICE ?? "/services",
    },
  ],
};

export function facebookPage(page: ToolPage): ToolPage {
  return studioBioPage(
    {
      ...page,
      metaTitle: "Facebook Bio Generator: Free AI Bios for Profiles and Pages",
      metaDescription: "Use this free Facebook bio generator to write 5 short bios for your profile or Page, see them in a live Intro preview, and copy one that fits.",
      h1: { regular: "Free Facebook", accent: "Bio Generator" },
      heroDescription: STUDIO.lede,
      accessNote: FAIR_USE,
      faqs: [
        { q: "Is this Facebook bio generator free?", a: `Yes. ${FAIR_USE}` },
        { q: "How many characters can a Facebook bio have?", a: "Facebook doesn't publish an exact limit, and most guides put it at 101 characters. Every bio this tool writes stays within that, and the counter shows the exact total." },
        { q: "Who can see my Facebook bio?", a: "Everyone. Meta says the information in the Intro section of your profile is always public, so only write what you're happy for anyone to read." },
        { q: "Where do I find my bio on Facebook?", a: "In the Intro section of your profile, below your profile picture. Edit it there and paste in your new bio." },
        { q: "Can I put a link in my Facebook bio?", a: "Use the Links and Contact info fields instead. They're built for websites, phone numbers and social links, so the bio can stay short." },
        { q: "Is a Page bio different from a profile bio?", a: "Pages also have an Intro, plus a category that shows on the Page. Write the Page bio for customers and keep your personal bio personal." },
        { q: "What should a local business put in its Facebook bio?", a: "What you do, the city or area you serve, and one reason to trust you. Use the contact fields for the phone number and the Links field for your website." },
        { q: "Will the AI make things up about me?", a: "No. It only uses what you type. If a bio would be stronger with a real number or result, it tells you what to add." },
        { q: "Can it write my bio in another language?", a: "Yes. Open \"More ways to personalize\", pick your language, and all five bios come out in it." },
      ],
      related: [],
      extraLinks: [],
    },
    PLATFORM,
    STUDIO,
  );
}
