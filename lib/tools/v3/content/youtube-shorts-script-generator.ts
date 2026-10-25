import type { NewToolContent } from "../content-types";

export default {
  slug: "youtube-shorts-script-generator",
  name: "YouTube Shorts Script Generator",
  keyword: "youtube shorts script generator",
  metaTitle: "YouTube Shorts Script Generator (100% FREE)",
  metaDescription: "YouTube Shorts script generator that writes one filmable script with a hook, timed beats, on screen text ideas and an ending. Free, no signup.",
  lede: "This YouTube Shorts script generator writes one script you can film right away. Tell it your topic, audience and main point, and it gives you a hook, timed beats and a clean ending.",
  sub: "One script with spoken lines, optional on screen text and an estimated length. Regenerate for another take.",
  trust: "Free, no signup. What you type is sent to an AI provider to write your result and isn't stored, so don't include anything private.",
  steps: [
    { title: "Set the basics", text: "Add your topic, who it's for and the one thing you want viewers to take away." },
    { title: "Shape it", text: "Pick a length, format and tone if you want. Add facts to include, a call to action and words to avoid." },
    { title: "Film it", text: "You get one script with a hook, timed beats and an ending. Press Regenerate for a different take." },
  ],
  examples: {
    heading: "Example Shorts",
    accent: "scripts",
    items: [
      { title: "Cooking tip", input: "Topic: crispy roast potatoes. Audience: home cooks. Format: quick tip. About 30 seconds.", output: "Hook: \"Your roast potatoes aren't crispy because of one step.\" Beats: parboil, rough them up, hot oil, high heat. Ending: \"Try it Sunday and tell me how it went.\" About 28 seconds.", why: "The hook names the problem, and every beat is one action you can show." },
      { title: "Software tutorial", input: "Topic: freeze rows in Google Sheets. Audience: beginners. Format: tutorial.", output: "Hook: \"Stop losing your headers when you scroll.\" Beats: click View, Freeze, choose 1 row, scroll to show it works. Ending: \"Save this for later.\" About 25 seconds.", why: "Short steps that match what is on screen." },
      { title: "Myth busting", input: "Topic: cracking knuckles. Audience: curious viewers. Tone: friendly. Fact: the sound comes from gas bubbles in the joint.", output: "Hook: \"Does cracking your knuckles cause arthritis?\" Beats: the myth, what the sound really is, a simple takeaway. Ending: \"Follow for more body myths.\" About 35 seconds.", why: "Uses only the fact you gave and doesn't invent numbers." },
    ],
  },
  guidance: {
    heading: "What makes a good Shorts",
    accent: "script",
    items: [
      { title: "Hook in the first line", text: "Say the problem, the promise or the surprise right away. Skip greetings and intros." },
      { title: "One idea per Short", text: "Pick one message and cut everything else. If you have three tips, think about three Shorts." },
      { title: "Write for speaking", text: "Use short sentences and everyday words. Read it out loud and change anything that feels stiff." },
      { title: "Match words to visuals", text: "Each beat should have something to show. On screen text works best when it adds a word or two, not the whole line." },
      { title: "Keep length honest", text: "Shorts can now run up to 3 minutes, but most ideas land better when they're tight. Cut until each line earns its place." },
    ],
  },
  faqs: [
    { q: "How do you write a YouTube Shorts script?", a: "Start with a one line hook, then list a few short beats that each make one point, and finish with a clear ending. Write the way you talk, and plan what viewers will see for each beat." },
    { q: "How many words should a short script contain?", a: "Many people speak at roughly 130 to 160 words a minute, so a 30 second Short is often around 65 to 80 words. That's a guide, not a rule. Read it aloud with a timer to be sure." },
    { q: "How should a Short begin?", a: "With the reason to keep watching. A question, a claim you can back up, or the end result shown first all work. Avoid long greetings or setups." },
    { q: "Should Shorts have a CTA?", a: "A light one can help, like asking a question for the comments or pointing to a longer video. Keep it short and natural so it doesn't feel like an ad." },
    { q: "How do you script tutorials?", a: "Show the result first, then give each step as one short line that matches what's on screen. Leave out anything viewers don't need to do." },
    { q: "How do you write educational Shorts?", a: "Pick one idea, explain it with one clear example, and use only facts you can check. Simple words beat jargon." },
    { q: "How can you turn a long video into a Short?", a: "Find one moment that stands on its own, like a single tip or a surprising result. Add a new hook at the start and trim everything around it. YouTube also lets you [create a Short from your longer videos](https://support.google.com/youtube/answer/11903584)." },
    { q: "How do you avoid sounding scripted?", a: "Write in short, spoken sentences, practise a few times, and allow small changes as you film. Use the script as a guide, not something to read word for word." },
  ],
  related: [
    { slug: "youtube-title-generator", text: "Write a clear title for your Short or video." },
    { slug: "youtube-description-generator", text: "Write a helpful description to go with it." },
    { slug: "tiktok-caption-generator", text: "Post the same idea on TikTok with a fitting caption." },
    { slug: "social-media-content-calendar-generator", text: "Plan what to post and when." },
  ],
  cta: {
    heading: "Want a plan for your",
    accent: "videos?",
    copy: "Zain helps businesses build social media that brings in real customers, not just views.",
    button: "See social media marketing",
    href: "/services/social-media-marketing-specialist",
  },
  hubCard: { description: "Get one filmable Shorts script with a hook, timed beats and an ending.", cta: "Write my script" },
  sources: [
    { label: "YouTube Help: Upload YouTube Shorts (length up to 3 minutes)", url: "https://support.google.com/youtube/answer/12779649", checked: "October 2026" },
    { label: "YouTube Help: Create Shorts from your videos", url: "https://support.google.com/youtube/answer/11903584", checked: "October 2026" },
  ],
} satisfies NewToolContent;
