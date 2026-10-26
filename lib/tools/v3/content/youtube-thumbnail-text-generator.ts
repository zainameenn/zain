import type { NewToolContent } from "../content-types";

export default {
  slug: "youtube-thumbnail-text-generator",
  name: "YouTube Thumbnail Text Generator",
  keyword: "youtube thumbnail text generator",
  metaTitle: "YouTube Thumbnail Text Generator (100% FREE)",
  metaDescription: "Write short YouTube thumbnail text that complements your video title. Generate one clear text overlay idea for your video without creating an image.",
  lede: "This YouTube thumbnail text generator takes your video topic and title and gives you one short line that adds useful context without repeating the whole headline.",
  sub: "Make the thumbnail text worth reading.",
  trust: "Free, no signup. What you type is sent to an AI provider to write your result and isn't stored, so don't include anything private. This tool creates words only. It does not generate a thumbnail image.",
  steps: [
    { title: "Add your title or topic", text: "Paste your video title or describe the topic." },
    { title: "Say what matters most", text: "Tell the tool which detail matters most." },
    { title: "Test it at phone size", text: "Place the short text on your own thumbnail and check readability at phone size." },
  ],
  examples: {
    heading: "Thumbnail text,",
    accent: "with the thinking behind it.",
    intro: "Illustrative suggestions only. Use any of them only if the video really delivers it.",
    items: [
      { title: "Coffee grinder test", input: "Title \"I Tested 5 Budget Coffee Grinders at Home\", one inexpensive grinder did surprisingly well.", output: "THE CHEAP ONE WON", why: "Highlights the surprise the title leaves out. Use only if that outcome really is in the video." },
      { title: "Spreadsheet tutorial", input: "Title \"Excel Lookup Formulas for Beginners\", the video shows XLOOKUP replacing VLOOKUP.", output: "STOP USING VLOOKUP", why: "Points to the key change the lesson teaches instead of restating the title." },
      { title: "Garden makeover", input: "Title \"Small Garden Makeover on a Budget\", total spend was about 200 pounds.", output: "ALL FOR £200", why: "Adds the concrete number the viewer wants, taken from the video itself." },
    ],
  },
  guidance: {
    heading: "What makes good",
    accent: "thumbnail text.",
    items: [
      { title: "Thumbnail text works with the title", text: "Your title may explain the subject while the thumbnail highlights a tension or result. Repeating the entire title wastes space. If the title says \"How I tested five coffee grinders\", the thumbnail might point to the surprising comparison, provided the video actually supports it." },
      { title: "Curiosity without misleading viewers", text: "Avoid a dramatic promise the video never delivers. The best text invites the right audience, not just any click. Text must stay readable in small previews and shouldn't depend on heavy punctuation." },
    ],
  },
  faqs: [
    { q: "How many words should I put on a YouTube thumbnail?", a: "There's no fixed YouTube limit, but short phrases are easier to read when the preview is small. Test at real display sizes." },
    { q: "Should thumbnail text repeat the title?", a: "Usually not word for word. Add an angle or highlight one part of the story." },
    { q: "Can this generator create the thumbnail image?", a: "No. It creates one text suggestion. You design the image separately." },
    { q: "Is all caps text better?", a: "It can work for a few words, if it fits your channel style and stays readable." },
    { q: "What if my video is educational?", a: "Lead with the key question, result or misconception the lesson resolves, without unsupported promises." },
    { q: "Will thumbnail text guarantee more views?", a: "No. Packaging can influence clicks, but relevance, video quality and distribution matter too." },
  ],
  related: [
    { slug: "youtube-title-generator", text: "Write the title it pairs with." },
    { slug: "youtube-shorts-script-generator", text: "Script a Short to promote the video." },
    { slug: "youtube-video-script-generator", text: "Script the full video." },
  ],
  cta: { heading: "Want video", accent: "that brings in customers?", copy: "I help brands plan social and video content that reaches the right audience, not just any click.", button: "See social media marketing", href: "/services/social-media-marketing-specialist" },
  hubCard: { description: "Get one short line of thumbnail text that adds context to your YouTube title.", cta: "Write thumbnail text" },
  sources: [],
} satisfies NewToolContent;
