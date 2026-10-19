import type { StudioContent, ToolField, ToolPage } from "../types";
import { studioFields, studioWriterPage, writerStudio } from "./studio-writer";

// The last four tools. LinkedIn comments run on the shared writing studio. The content calendar, marketing plan
// and UTM builder keep their own working interfaces (calendar grid, plan timeline, link builder) inside the studio page.

const DISPLAY_NAME: ToolField = { name: "display_name", label: "Your name", type: "text", placeholder: "Maya Ortiz", hint: "Shows on the preview only.", maxLength: 60, group: "advanced" };

/** A studio page whose tool area is the tool's existing interface, not the writing studio. */
const legacyStudioPage = (page: ToolPage, studio: StudioContent): ToolPage => ({ ...page, heroDescription: studio.lede, studio: { tool: "legacy", platform: page.name, ...studio } });

export function linkedinCommentPage(page: ToolPage): ToolPage {
  const studio = writerStudio(
    {
      tool: "LinkedIn comment generator",
      noun: "LinkedIn comment",
      steps: [
        ["Paste the post", "Copy the LinkedIn post you want to reply to."],
        ["Add your take", "One line on what you think, plus any related experience. Pick the kind of comment and the length."],
        ["Copy your favorite", "Compare comments under the post, then copy the one that sounds like you."],
      ],
      compare: {
        intro: "Most weak comments say \"Great post!\" A good one adds something the author and readers didn't have.",
        before: "Great post! Totally agree 🙌",
        after: "Agree, with one caveat: this only worked for us once we had some brand awareness. At a 5 person startup it flopped until month 3.",
        changes: ["Praise became a real point of view.", "A specific experience backs it up.", "It invites a reply instead of ending the conversation."],
      },
      styles: {
        intro: "Three kinds of comments the tool can write.",
        items: [
          { name: "Add insight", when: "When you have relevant experience.", text: "We saw the same thing: switching to LinkedIn outreach got us 6 calls in 3 weeks.", why: "A real result adds to the post.", settings: { type: "Add insight" } },
          { name: "Ask a question", when: "When you want to learn more.", text: "Did the outreach work as well for smaller deals, or mostly enterprise?", why: "A specific question the author can actually answer.", settings: { type: "Ask a question" } },
          { name: "Respectful pushback", when: "When you see it differently.", text: "I'd push back a little: for local businesses, Facebook still brings our best leads.", why: "Disagrees with the idea, not the person.", settings: { type: "Respectful pushback" } },
        ],
      },
      practices: [
        { title: "Add something new", text: "An example, a number or a different angle. Agreement alone isn't a comment.", good: "We saw the same: 6 calls in 3 weeks", bad: "Great post!" },
        { title: "Be specific", text: "Mention a detail from the post so it's clear you read it." },
        { title: "Keep it short", text: "Two or three sentences usually say enough." },
        { title: "Disagree kindly", text: "Push back on the idea, never the person." },
        { title: "Don't pitch", text: "A comment that sells gets ignored. Let your profile do that." },
        { title: "Use your real experience", text: "The tool only uses what you type, so add your own take.", good: "Tried this at a 5 person startup" },
      ],
      related: [
        { slug: "linkedin-post-generator", text: "Write posts of your own." },
        { slug: "linkedin-headline-generator", text: "A headline people click when they see your comment." },
        { slug: "linkedin-about-section-generator", text: "An About section for your profile." },
        { slug: "twitter-bio-generator", text: "A bio for X." },
      ],
      cta: "social",
    },
    "This LinkedIn comment generator turns your take on a post into thoughtful comments that add insight, ask a real question or push back respectfully.",
    "Paste the post, add your take, and see each comment under the post before you copy it.",
  );
  return studioWriterPage(
    { ...page, heroDescription: studio.lede },
    { platform: "LinkedIn", noun: "comment", skin: "linkedin-comment", fields: studioFields(page.workspace.fields, [DISPLAY_NAME]), button: "Write comments", limit: 600, example: { ...page.workspace.exampleInput, display_name: "Maya Ortiz" }, dataNote: "AI can get things wrong. Only post comments that reflect what you really think." },
    studio,
  );
}

export function contentCalendarPage(page: ToolPage): ToolPage {
  return legacyStudioPage(
    page,
    writerStudio(
      {
        tool: "content calendar generator",
        noun: "content calendar",
        steps: [
          ["Describe your business", "What you do, who you want to reach, and what you want to promote this month."],
          ["Pick platforms and pace", "Up to three platforms, how many posts a week, and how much time you have."],
          ["Get your month", "Every post gets a date, a hook, an outline and a call to action. Download it as a CSV."],
        ],
        compare: {
          intro: "Most content calendars are a list of topics. A useful one tells you exactly what to post, when and why.",
          before: "Monday: tip\nWednesday: product\nFriday: something fun",
          after: "Mon 3: \"3 bookkeeping mistakes restaurants make\" (Teach)\nWed 5: Before and after of a client's books (Proof)\nFri 7: Free 20 minute review, link in bio (Offer)",
          changes: ["Vague slots became specific posts with hooks.", "Each post has a job: teach, prove or sell.", "The month builds toward your offer."],
        },
        styles: {
          intro: "Three posting rhythms for different amounts of time.",
          items: [
            { name: "2 a week", when: "When you have an hour or two.", text: "One teaching post and one proof post every week.", why: "Enough to stay visible without burning out.", settings: { frequency: "2" } },
            { name: "3 a week", when: "The usual starting point.", text: "Teach, prove, then offer, every week.", why: "Balances value and selling.", settings: { frequency: "3" } },
            { name: "5 a week", when: "When content is a main channel.", text: "Daily posts across two platforms, with the offer once a week.", why: "More chances to be seen, still focused.", settings: { frequency: "5" } },
          ],
        },
        practices: [
          { title: "Plan around one offer", text: "A month of posts should lead somewhere. Pick what you want people to do." },
          { title: "Mix the post types", text: "Teach, show proof, share people and make offers. Mostly teaching, sometimes selling." },
          { title: "Post less, but finish", text: "Three posts a week you actually publish beat seven you don't." },
          { title: "Use what you have", text: "The calendar only plans proof posts if you have real results to show." },
          { title: "Batch the work", text: "Write a week of posts in one sitting. The outlines make it quick." },
          { title: "Review at month end", text: "Keep what got replies and clicks, drop what didn't." },
        ],
        related: [
          { slug: "marketing-plan-generator", text: "A 30 day plan for your whole marketing." },
          { slug: "instagram-caption-generator", text: "Write the captions for your planned posts." },
          { slug: "linkedin-post-generator", text: "Write your LinkedIn posts." },
          { slug: "utm-link-builder", text: "Track which posts bring visits." },
        ],
        cta: "social",
      },
      "This social media content calendar generator plans a month of posts around your offer, your platforms and the time you actually have, with a date, hook, outline and call to action for every post.",
      "Describe your business, pick your platforms, and download the whole month as a CSV.",
    ),
  );
}

export function marketingPlanPage(page: ToolPage): ToolPage {
  return legacyStudioPage(
    page,
    writerStudio(
      {
        tool: "marketing plan generator",
        noun: "marketing plan",
        steps: [
          ["Describe your business", "What you sell, who buys it, and the one goal that matters this month."],
          ["Add budget and time", "How much you can spend and how many hours you have each week."],
          ["Get your 30 day plan", "One first priority, weekly actions, the numbers to watch, and why."],
        ],
        compare: {
          intro: "Most marketing plans list every channel. A useful one picks the first thing to fix.",
          before: "Do SEO, post on social, run ads, start a newsletter, try TikTok.",
          after: "Week 1: fix the homepage offer\nWeek 2: three posts answering buyer questions\nWeek 3: ask five clients for reviews\nWeek 4: check which source brought leads",
          changes: ["Five channels became one priority at a time.", "Each week has a concrete action.", "It ends with measuring what worked."],
        },
        styles: {
          intro: "Three starting points the plan adapts to.",
          items: [
            { name: "Small budget", when: "When time is your main resource.", text: "Organic first: fix the website, then content and reviews.", why: "Free channels before paid ones.", settings: {} },
            { name: "Some budget", when: "When you can test a little paid.", text: "Fix tracking, then a small ad test once the page converts.", why: "Never pay to send people to a weak page.", settings: {} },
            { name: "Launch", when: "When something new goes out.", text: "Warm up your audience, launch, then follow up.", why: "A month built around one moment.", settings: {} },
          ],
        },
        practices: [
          { title: "Pick one goal", text: "Leads, sales or signups. A plan that chases everything moves nothing." },
          { title: "Fix the leak first", text: "More traffic won't help if the page or offer isn't working." },
          { title: "Match the plan to your time", text: "A plan you can't keep up with is just a wish list." },
          { title: "Measure a few numbers", text: "Visits, leads and where they came from. That's enough to decide." },
          { title: "Review weekly", text: "Look at the numbers every Friday and adjust next week." },
          { title: "Know the reasoning", text: "Every action in the plan comes with why, so you can change it with confidence." },
        ],
        related: [
          { slug: "social-media-content-calendar-generator", text: "Turn the plan into a month of posts." },
          { slug: "utm-link-builder", text: "Track where your leads come from." },
          { slug: "seo-title-generator", text: "Improve your page titles." },
          { slug: "meta-description-generator", text: "Write better search snippets." },
        ],
        cta: "seo",
      },
      "This marketing plan generator builds a practical 30 day plan around your business, budget, time and one goal, with weekly actions and the numbers to watch.",
      "Describe your business and your goal, and get a plan you can actually follow.",
    ),
  );
}

export function utmBuilderPage(page: ToolPage): ToolPage {
  return legacyStudioPage(
    page,
    writerStudio(
      {
        tool: "UTM link builder",
        noun: "campaign link",
        steps: [
          ["Paste your page URL", "The page people should land on."],
          ["Fill in the campaign details", "Source, medium and campaign name. Content and term are optional."],
          ["Copy the tracked link", "Use it in your post, email or ad, then see the traffic in your analytics."],
        ],
        compare: {
          intro: "Untracked links all show up as the same traffic. Tagged ones tell you which post, email or ad worked.",
          before: "https://example.com/spring-sale",
          after: "https://example.com/spring-sale?utm_source=instagram&utm_medium=social&utm_campaign=spring_sale",
          changes: ["utm_source says where the click came from.", "utm_medium says what kind of traffic it is.", "utm_campaign groups every link for one promotion."],
        },
        styles: {
          intro: "Three common setups.",
          items: [
            { name: "Social post", when: "For links in posts and bios.", text: "utm_source=instagram\nutm_medium=social\nutm_campaign=spring_sale", why: "Shows which platform drove the visit.", settings: {} },
            { name: "Email", when: "For newsletters.", text: "utm_source=newsletter\nutm_medium=email\nutm_campaign=october_issue", why: "Separates email clicks from everything else.", settings: {} },
            { name: "Paid ad", when: "For ads with keywords.", text: "utm_source=google\nutm_medium=cpc\nutm_campaign=brand\nutm_term=crm_software", why: "Term shows which keyword earned the click.", settings: {} },
          ],
        },
        practices: [
          { title: "Use lowercase, always", text: "Instagram and instagram show up as two different sources in most analytics tools." },
          { title: "Pick a naming rule", text: "Use the same words every time, like social, email and cpc for medium." },
          { title: "No spaces", text: "Use underscores or hyphens. Spaces break or get encoded strangely." },
          { title: "Don't tag internal links", text: "UTM tags on links within your own site can overwrite where the visitor really came from." },
          { title: "Keep a list", text: "Save the links you make, so the whole team uses the same names." },
          { title: "Check the result", text: "Click the link once and look for it in your analytics before you share it widely." },
        ],
        related: [
          { slug: "marketing-plan-generator", text: "A 30 day plan to go with your tracking." },
          { slug: "social-media-content-calendar-generator", text: "Plan the posts you'll link from." },
          { slug: "seo-title-generator", text: "Titles for the pages you link to." },
          { slug: "meta-description-generator", text: "Snippets for the pages you link to." },
        ],
        cta: "seo",
      },
      "This UTM link builder adds campaign tracking to any URL in your browser, so you can see exactly which post, email or ad brought each visit.",
      "Paste your URL, fill in the campaign details, and copy a clean tracked link.",
    ),
  );
}
