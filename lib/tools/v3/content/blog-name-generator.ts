import type { NewToolContent } from "../content-types";

export default {
  slug: "blog-name-generator",
  name: "Blog Name Generator",
  keyword: "blog name generator",
  metaTitle: "Blog Name Generator (100% FREE)",
  metaDescription: "Find a memorable blog name from your topic, readers and writing style. Get one blog name and a short description, with tips for checking availability.",
  lede: "This blog name generator uses what you write about and who reads it to give you one blog name with a clear theme and a reason it fits.",
  sub: "Give your blog a name worth coming back to.",
  trust: "Free, no signup. What you type is sent to an AI provider to write your result and isn't stored, so don't include anything private.",
  steps: [
    { title: "Describe your blog", text: "Add your topic and who your readers are." },
    { title: "Pick a voice", text: "Choose the voice you want to be known for." },
    { title: "Check it has room", text: "Make sure the name will still fit as your content expands." },
  ],
  examples: {
    heading: "Blog names,",
    accent: "with the thinking behind them.",
    intro: "Illustrative suggestions only. Availability was not checked for any of them.",
    items: [
      { title: "Small business SEO", input: "Approachable website SEO for independent business owners.", output: "The Search Notebook: Clear notes on making small websites easier to find.", why: "Feels like practical working notes, and the tagline explains the focus." },
      { title: "Running after 40", input: "Running and strength training for people over 40, encouraging.", output: "Second Wind Miles: Training notes for runners who started later.", why: "Hints at age and running without boxing out nutrition or recovery posts later." },
      { title: "Budget travel", input: "Slow, low cost travel around Europe by train, relaxed.", output: "Platform Days: Unhurried European trips on a modest budget.", why: "Trains and slow travel in two words, with room for any destination." },
    ],
  },
  guidance: {
    heading: "What makes a good",
    accent: "blog name.",
    items: [
      { title: "Keep the subject clear without trapping the blog", text: "A good blog name can hint at the subject without listing every keyword. A writer covering running and strength after 40 may eventually discuss nutrition and recovery. The best name leaves room for adjacent topics." },
      { title: "Choose a name that works as a URL", text: "Check spelling, capitalization, how it sounds aloud and whether a matching domain or social profile is available. You can still use a great blog name without an identical domain, but consistency helps readers recognize it." },
    ],
  },
  faqs: [
    { q: "Should my blog name contain my target keyword?", a: "Only if it reads naturally. Search engines evaluate pages and content, not a blog name stuffed with keywords." },
    { q: "Can I use my own name as the blog name?", a: "Yes, especially for a personal blog or portfolio. A topic name can be clearer for a publication with several contributors." },
    { q: "What if my blog covers several topics?", a: "Choose an umbrella idea that links them instead of fitting every topic into the title." },
    { q: "Do I need an exact match domain?", a: "No. A related, memorable domain can work well. Check registration and existing brands first." },
    { q: "Can I rename a blog after publishing?", a: "Yes, but consider reader recognition and links. If URLs change, plan redirects." },
    { q: "Are blog names copyrighted?", a: "Names and trademarks involve different legal rules by country. This generator isn't legal clearance." },
  ],
  related: [
    { slug: "newsletter-name-generator", text: "Name a newsletter to go with the blog." },
    { slug: "domain-name-ideas-generator", text: "Find a domain idea for the name." },
    { slug: "seo-content-brief-generator", text: "Plan your first posts." },
  ],
  cta: { heading: "Want the blog", accent: "to bring in traffic?", copy: "I help SaaS companies turn blogs into a steady source of search traffic and signups.", button: "See SEO for SaaS", href: "/services/seo-specialist-for-saas" },
  hubCard: { description: "Get one blog name and a short description that fit your topic, readers and voice.", cta: "Name your blog" },
  sources: [],
} satisfies NewToolContent;
