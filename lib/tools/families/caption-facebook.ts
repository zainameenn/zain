import { FAIR_USE, LINK_SOCIAL_MEDIA_SERVICE } from "../links";
import type { StudioContent, ToolPage } from "../types";
import { captionStudioPage, type CaptionPlatform } from "./caption-instagram";

// Facebook Caption Generator: the Instagram caption studio with a Facebook Page post preview, Facebook goals and copy.
// No real examples gallery yet: Facebook blocks logged out access to Page posts, so none could be verified (Oct 18, 2026).

const EDIT_HELP = "https://www.facebook.com/help/1376303972644600";

const PLATFORM: CaptionPlatform = {
  platform: "Facebook",
  limit: 2000,
  fold: 180,
  ranges: ["40 to 200", "200 to 500", "500 to 1,200"],
  hashtagMax: 3,
  defaultHashtags: "None",
  formatRules:
    "Plain, warm and conversational, written for a Facebook Page. Short paragraphs with a blank line between them. The first sentence carries the point, because the feed cuts long posts with \"See more\". If the post type is Link, tell people what they'll get when they click. Hashtags are optional on Facebook; when used, keep them to a few at the end.",
  postTypes: ["Photo", "Text only", "Link", "Reel"],
  goals: ["Comments", "Shares", "Link clicks", "Messages", "Sales", "Visits"],
  copy: {
    topic: "Our bakery now opens at 7am on weekdays",
    details: "Starting Monday. Same sourdough, earlier. Coffee from the roaster next door",
    current: "📢📢 BIG NEWS!!! Come check us out!!! Like and share!!!",
    name: "Corner Crumb Bakery",
    audience: "Commuters and locals in the neighborhood",
    keyword: "bakery near me",
    cta: "See you Monday",
  },
  example: {
    post_type: "Photo",
    topic: "Our bakery now opens at 7am on weekdays",
    details: "Starting Monday. Same sourdough, earlier. Coffee from the roaster next door",
    name: "Corner Crumb Bakery",
    audience: "Commuters and locals in the neighborhood",
    tone: "Friendly",
    goal: "Visits",
    length: "Short",
    emoji: "Subtle",
    hashtags: "None",
  },
};

const STUDIO: StudioContent = {
  skin: "facebook",
  lede: "This Facebook caption generator turns a few notes into a Page post caption that gets to the point fast, sound human, and ask for one clear next step.",
  sub: "Say what you're posting, pick a style, and see your caption on a real looking Facebook post before you copy it.",
  trust: `Free to use, no signup required. ${FAIR_USE.replace("Free to use. ", "")}`,
  sections: [
    {
      kind: "steps",
      eyebrow: "How it works",
      heading: "How to use the",
      accent: "Facebook caption generator",
      intro: "Three steps, about thirty seconds. The post preview updates while you go.",
      steps: [
        { title: "Say what you're posting", text: "Pick photo, text, link or reel, then describe the post in a few words. Add the real details if you have them.", visual: "account" },
        { title: "Choose your style", text: "Pick a tone and a goal, like comments, link clicks, messages or visits, then set the length and emoji.", visual: "style" },
        { title: "Tweak and copy", text: "See your caption on a Facebook post and where \"See more\" cuts in, ask for a fresh take or a small change, then copy and post.", visual: "copy" },
      ],
    },
    {
      kind: "compare",
      eyebrow: "Before and after",
      heading: "Fixing a weak",
      accent: "Facebook caption",
      intro: "Most weak Facebook posts shout. A good one tells people something useful in the first sentence.",
      before: "📢📢 BIG NEWS!!! Come check us out!!! Like and share!!!",
      after: "Good news for early commuters: from Monday, we open at 7am on weekdays ☕\n\nSame sourdough, just earlier, with coffee from the roaster next door.\n\nSee you Monday.",
      changes: [
        "\"Big news\" became the actual news, in the first sentence.",
        "Exclamation marks became details people care about: when, what and who it's for.",
        "\"Like and share\" became a friendly next step that matches the goal.",
      ],
    },
    {
      kind: "styles",
      eyebrow: "Caption ideas",
      heading: "Facebook caption ideas",
      accent: "for every kind of post",
      intro: "Six different approaches for six kinds of Page posts. Find one that fits, then send its settings straight to the generator.",
      styles: [
        { name: "Local update", when: "For opening hours, events and news.", bio: "From Monday we open at 7am on weekdays ☕ Same sourdough, just earlier.", why: "The news first, then the detail that makes it matter.", settings: { tone: "Friendly", emoji: "Subtle", goal: "Visits", length: "Short" } },
        { name: "Question", when: "For community posts and feedback.", bio: "We're adding one pastry to the menu. Almond croissant or cinnamon knot?", why: "A real decision people can help with in two words.", settings: { tone: "Friendly", emoji: "None", goal: "Comments", length: "Short" }, dark: true },
        { name: "Link post", when: "For blog posts, guides and offers.", bio: "Three questions to ask before you hire a roofer, and the answers that should worry you. Full checklist at the link.", why: "Says exactly what's behind the click.", settings: { tone: "Professional", emoji: "None", post_type: "Link", goal: "Link clicks", length: "Short" } },
        { name: "Story", when: "For behind the scenes and milestones.", bio: "Ten years ago we sold 40 loaves on our first day. This morning we baked 400.\n\nThank you for every early queue and every message along the way.", why: "Real numbers and a thank you. People share posts like this.", settings: { tone: "Calm", emoji: "None", goal: "Shares", length: "Medium" } },
        { name: "Offer", when: "For sales and limited deals.", bio: "This weekend only: any two loaves for $10. Order ahead and skip the queue.", why: "The deal, the deadline and how to get it.", settings: { tone: "Bold", emoji: "None", goal: "Sales", length: "Short" } },
        { name: "Message us", when: "For service businesses that take bookings.", bio: "Leaky basement after the storm? Send us a photo in a message and we'll tell you what we'd check first.", why: "Names the problem, then makes the first step tiny.", settings: { tone: "Professional", emoji: "None", goal: "Messages", length: "Short" } },
      ],
    },
    {
      kind: "practices",
      eyebrow: "Best practices",
      heading: "Facebook caption",
      accent: "best practices",
      intro: "Six habits that make the biggest difference, each one a different idea.",
      items: [
        {
          title: "Put the point first",
          text: "Long posts get cut with \"See more\". If the first sentence is the news, people get it even if they never tap.",
          featured: true,
          example: { good: "From Monday we open at 7am", bad: "📢📢 BIG NEWS!!!" },
        },
        { title: "Write like a neighbor", text: "Facebook audiences, especially local ones, respond to plain, warm language more than slogans.", example: { good: "Same sourdough, just earlier", bad: "Elevating your morning experience" } },
        { title: "Say what's behind the link", text: "On a link post, tell people what they'll get when they click, not just \"check this out\".", example: { good: "Full checklist at the link", bad: "Check this out 👇" } },
        { title: "Go easy on hashtags", text: "Hashtags are optional on Facebook. If you use them, a couple of specific ones is plenty. The tool defaults to none.", example: { good: "#portlandbakery", bad: "#food #yum #love #instagood #bakery" } },
        { title: "Ask for one thing", text: "Comment, share, message or visit. Pick the one that matches your goal and ask for it once.", example: { good: "Almond croissant or cinnamon knot?" } },
        { title: "Fix it after posting if needed", text: `You can [edit a published Page post](${EDIT_HELP}). Boosted posts can't be edited, so check those before you pay.`, example: { good: "Edit post, then Save" } },
      ],
    },
    { kind: "faq", eyebrow: "FAQ", heading: "Frequently asked", accent: "questions" },
    {
      kind: "related",
      eyebrow: "Keep going",
      heading: "More free tools for",
      accent: "your social profiles",
      tools: [
        { slug: "facebook-bio-generator", text: "A short, trustworthy intro for your Page.", icon: "bio" },
        { slug: "instagram-caption-generator", text: "Captions for your Instagram posts and reels.", icon: "caption" },
        { slug: "tiktok-caption-generator", text: "Captions for your TikTok videos.", icon: "caption" },
        { slug: "social-media-content-calendar-generator", text: "Plan a month of posts in one go.", icon: "caption" },
      ],
    },
    {
      kind: "cta",
      heading: "A better caption is a start.",
      accent: "Let's fix the rest of your social presence.",
      copy: "I help SaaS and service businesses turn content, profiles and organic social into real growth.",
      button: "Explore social media marketing",
      href: LINK_SOCIAL_MEDIA_SERVICE ?? "/services",
    },
  ],
};

export function facebookCaptionPage(page: ToolPage): ToolPage {
  return captionStudioPage(
    {
      ...page,
      metaTitle: "Facebook Caption Generator: Free AI Captions for Page Posts",
      metaDescription: "Use this free Facebook caption generator to turn your notes into 3 Page post captions with a clear first line and one next step, on a live post preview.",
      h1: { regular: "Free Facebook", accent: "Caption Generator" },
      heroDescription: STUDIO.lede,
      accessNote: FAIR_USE,
      faqs: [
        { q: "Is this Facebook caption generator free?", a: `Yes. ${FAIR_USE}` },
        { q: "How long should a Facebook post be?", a: "Facebook allows very long posts, but the feed cuts them with \"See more\". Put the point in the first sentence. The tool keeps every caption under 2,000 characters." },
        { q: "Should I use hashtags on Facebook?", a: "They're optional. If you use them, a couple of specific ones is enough. The tool defaults to none, and can add up to 3." },
        { q: "Can I edit a Facebook post after publishing?", a: "Yes. Meta's help center explains how to edit a Page post from the three dot menu. Posts that are boosted or part of an ad campaign can't be edited." },
        { q: "Does it work for link posts?", a: "Yes. Pick Link as the post type and the caption tells people what they'll get when they click." },
        { q: "Does the tool see my photo or video?", a: "It sees your photo if you upload one, and uses what it can clearly see to write the caption. The photo isn't stored. It can't watch video, so describe a video in your notes and check the caption matches it." },
        { q: "Will it make things up?", a: "No. It only uses your details. If a stronger caption needs a number or a fact, it tells you what to add instead of inventing one." },
        { q: "Can it rewrite a post I already have?", a: "Yes. Switch to \"Improve my caption\", paste it in, and get a stronger version that keeps your facts." },
        { q: "Can it write Facebook captions in other languages?", a: "Yes. Open \"More ways to personalize\", pick your language, and your caption comes out in it." },
      ],
      related: [],
      extraLinks: [],
    },
    PLATFORM,
    STUDIO,
  );
}
