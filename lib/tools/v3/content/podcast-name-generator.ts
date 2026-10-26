import type { NewToolContent } from "../content-types";

export default {
  slug: "podcast-name-generator",
  name: "Podcast Name Generator",
  keyword: "podcast name generator",
  metaTitle: "Podcast Name Generator (100% FREE)",
  metaDescription: "Get one podcast name tailored to your subject, listeners and style. Generate a short tagline and learn how to check an idea before launching.",
  lede: "This podcast name generator gives you one memorable name and a tagline that explains why people should tune in, based on your show, its listeners and your style.",
  sub: "Name your show before you record the first episode.",
  trust: "Free, no signup. What you type is sent to an AI provider to write your result and isn't stored, so don't include anything private.",
  steps: [
    { title: "Explain the concept", text: "What will listeners consistently hear on your show?" },
    { title: "Describe the audience", text: "A technical founder interview show and a pop culture chat need different names." },
    { title: "Check the suggestion", text: "Search podcast apps and existing brands before you publish." },
  ],
  examples: {
    heading: "Podcast names,",
    accent: "and why they work.",
    intro: "Illustrative suggestions only. Name and trademark availability must be checked.",
    items: [
      { title: "Shop owner interviews", input: "Weekly interviews with independent shop owners about early mistakes, practical wins and real numbers. Straightforward style.", output: "The Shopkeeper Files: Real stories from people running small online shops.", why: "Says who's on the show and promises the inside story." },
      { title: "A gardening chat", input: "Two friends answering listener questions about small space gardening. Playful.", output: "Pots and Plots: Small space gardening questions, answered by two friends.", why: "Easy to say in an intro and hints at the format." },
      { title: "A product design show", input: "Solo host breaking down one great product decision each episode. Editorial.", output: "Design Decisions: One product choice, taken apart each week.", why: "Clear enough for search, flexible enough for any product." },
    ],
  },
  guidance: {
    heading: "Choosing a name",
    accent: "listeners remember.",
    items: [
      { title: "How to choose a podcast name", text: "Make it memorable, easy to say and connected to what your show promises. You don't need \"podcast\" in the title. If the name is abstract, let the tagline and show description explain the topic. Try it in an intro: \"Welcome back to...\" If you stumble, listeners will too." },
      { title: "Descriptive or brandable", text: "A descriptive title tells new listeners what to expect but can box you in if your subjects change. A brandable name stands out but may need explaining. Choose for the show you'll actually make, not just the first episode, and let the tagline add clarity." },
      { title: "Check before publishing", text: "Search podcast directories and the wider web, not just domain registrars. Look for clashes with other shows and established brands. Domain and handle availability are separate checks, and an unused phrase can still raise trademark issues. This tool can't verify ownership or reserve a name." },
    ],
  },
  faqs: [
    { q: "How do I find a good podcast name?", a: "Decide who the show is for, what you cover and the tone you want. Pick a name people can remember after hearing it once, then search podcast directories and brand records." },
    { q: "Should I include the word podcast in my title?", a: "Only if it makes the name clearer. Podcast apps already show listeners it's a podcast." },
    { q: "Can two podcasts use the same name?", a: "Names can overlap, but using a name that already identifies another show can confuse listeners and cause legal or branding problems. Check before launch." },
    { q: "How long should my podcast name be?", a: "Short and easy to repeat is usually practical, but there's no ideal length. Avoid names that wrap awkwardly or sound confusing when spoken." },
    { q: "Can I change a podcast name later?", a: "Usually yes through your hosting setup, though apps can take time to update. A rebrand can confuse subscribers, so explain it clearly." },
    { q: "What if my podcast covers several subjects?", a: "Build the name around the audience or your point of view instead of one narrow topic, and explain the range in the tagline and description." },
    { q: "Does this generator check Spotify or Apple Podcasts?", a: "No. It suggests wording based on your inputs. Search the directories yourself before you commit." },
    { q: "Can I use the name commercially?", a: "The suggestion isn't legal clearance. Do your own trademark and brand checks before investing in artwork, domains or merchandise." },
  ],
  related: [
    { slug: "newsletter-name-generator", text: "Name a newsletter for the show." },
    { slug: "youtube-channel-name-generator", text: "Name the video version." },
    { slug: "domain-name-ideas-generator", text: "Find a domain idea." },
    { slug: "youtube-video-script-generator", text: "Script a video episode." },
  ],
  cta: { heading: "Need listeners,", accent: "not just a name?", copy: "I help shows and brands grow through social, Reddit and search.", button: "See social media services", href: "/services/social-media-marketing-specialist" },
  hubCard: { description: "Get one memorable podcast name and a short tagline that fit your show and listeners.", cta: "Name your podcast" },
  sources: [
    { label: "Apple Podcasts: presenting your podcast", url: "https://podcasters.apple.com/support/867-featured-present-your-podcast", checked: "October 2026" },
    { label: "Castos podcast name generator (competitor reference)", url: "https://castos.com/tools/podcast-name-generator/", checked: "October 2026" },
  ],
} satisfies NewToolContent;
