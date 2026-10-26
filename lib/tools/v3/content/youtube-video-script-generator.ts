import type { NewToolContent } from "../content-types";

export default {
  slug: "youtube-video-script-generator",
  name: "YouTube Video Script Generator",
  keyword: "youtube video script generator",
  metaTitle: "YouTube Video Script Generator (100% FREE)",
  metaDescription: "Turn your topic and key points into a natural YouTube video script. Get one structured draft with a hook, sections, examples and closing.",
  lede: "This YouTube video script generator turns your topic, audience and key points into one structured script that sounds natural and stays on the video you want to make.",
  sub: "Turn a video idea into a script you can actually record.",
  trust: "Free, no signup. What you type is sent to an AI provider to write your result and isn't stored, so don't include anything private.",
  steps: [
    { title: "Describe the video", text: "Choose a specific topic and audience instead of a vague category." },
    { title: "Add what must be covered", text: "Real points, opinions and examples make the script far more useful." },
    { title: "Review the draft aloud", text: "Check accuracy, timing, tone and transitions before filming." },
  ],
  examples: {
    heading: "What a script",
    accent: "opening looks like.",
    intro: "Illustrative excerpts, not whole generated scripts.",
    items: [
      { title: "Etsy listing tips", input: "Three ways to improve an Etsy listing without ads. New sellers. Direct. Must cover real photos, clear dimensions and keyword relevance.", output: "\"Before you spend money promoting an Etsy listing, check three things the buyer sees first: the photos, the title, and the product details. Each one should answer a question before someone needs to message you.\"", why: "States the promise in the first breath and starts delivering." },
      { title: "A software tutorial", input: "How to set up a content calendar in Notion. Beginners. Friendly. 5 minutes.", output: "\"By the end of this video you'll have a content calendar in Notion that shows what's due this week, and it'll take about ten minutes to build.\"", why: "Tells viewers exactly what they'll have at the end." },
    ],
  },
  guidance: {
    heading: "Writing scripts",
    accent: "that sound like you.",
    items: [
      { title: "How to write a YouTube video script", text: "Start with the question your viewer wants answered and what they should understand by the end. Break the answer into a few logical steps. Open with the promise without repeating the title for a minute. Every section should move the viewer forward. A good script cuts rambling; it shouldn't make you sound like a brochure." },
      { title: "Script versus outline", text: "An outline lists talking points and leaves room to improvise. A full script gives you the exact words. Technical tutorials benefit from careful wording; interviews and casual commentary often only need an outline. This tool writes one full draft, so trim or loosen it before recording." },
      { title: "How long should the script be?", text: "Speaking speed varies. A rough guide is 120 to 160 words a minute, so a five minute script is around 600 to 800 words before demos and pauses. The word count and time estimate update as you edit. Read it aloud to check." },
      { title: "Avoid invented experience", text: "AI can structure your ideas, but it doesn't know what happened in your project. If you want a case study, test or result in the script, give it the real facts. Otherwise it stays general. For reviews, never pretend to have used something you haven't." },
    ],
  },
  faqs: [
    { q: "How do I make a YouTube video script?", a: "Decide on one central viewer question, make a short outline, write the spoken explanation section by section, add examples, then edit it aloud for accuracy and natural delivery." },
    { q: "Should I script every word?", a: "It depends on how you present. Tutorials and explainers often benefit from a full draft; conversational videos may work better with bullet points. Use the script as a starting point." },
    { q: "How many words do I need for a five minute video?", a: "Roughly 600 to 800 words at 120 to 160 words a minute, but demos and pauses change the final length." },
    { q: "How do I write a good YouTube intro?", a: "Tell viewers what they'll learn or see and start delivering on it quickly. Skip unrelated background and sensational claims." },
    { q: "Can the tool write a video review?", a: "Yes, using the product information and real experiences you supply. It won't invent hands on testing, specifications or endorsements." },
    { q: "Can I turn a blog article into a YouTube script?", a: "Yes. Paste the key points or an outline into More options. The script adapts them for speaking rather than reading the article word for word." },
    { q: "What's the difference between this and the Shorts Script Generator?", a: "This tool writes longer scripts with fuller explanations and transitions. The [Shorts tool](https://www.zainameen.com/tools/youtube-shorts-script-generator) is built for brief videos with a tighter structure." },
    { q: "Does this tool guarantee views or audience retention?", a: "No. Accuracy, delivery, editing, topic demand and much more affect performance. A script is one part of the video." },
    { q: "Can I generate a script in another language?", a: "Yes, pick the language under More options. Review fluency, specialist terms and local phrasing before recording." },
  ],
  related: [
    { slug: "youtube-shorts-script-generator", text: "Cut a Short from the same idea." },
    { slug: "youtube-title-generator", text: "Write the title." },
    { slug: "youtube-description-generator", text: "Write the description." },
  ],
  cta: { heading: "Want your videos", accent: "to reach more people?", copy: "I help creators and brands grow through social, search and Reddit.", button: "See social media services", href: "/services/social-media-marketing-specialist" },
  hubCard: { description: "Turn a topic and key points into one structured YouTube script with a hook, sections and a closing.", cta: "Write a video script" },
  sources: [{ label: "YouTube Help: video metadata", url: "https://support.google.com/youtube/answer/57407?hl=en", checked: "October 2026" }],
} satisfies NewToolContent;
