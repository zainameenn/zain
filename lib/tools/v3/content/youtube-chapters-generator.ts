import type { NewToolContent } from "../content-types";

export default {
  slug: "youtube-chapters-generator",
  name: "YouTube Chapter Generator",
  keyword: "youtube chapter generator",
  metaTitle: "YouTube Chapter Generator (100% FREE)",
  metaDescription: "Turn timestamped transcripts or video notes into editable YouTube chapters. Check timestamp order, chapter length and YouTube's minimum chapter rules.",
  lede: "This YouTube chapter generator turns a timestamped transcript or your chapter notes into a clean chapter list you can edit and add to your YouTube description.",
  sub: "Make long videos easier to navigate.",
  trust: "Free, no signup. Times are read from what you paste, never guessed. Rewriting titles with AI is optional. Exact chapter times require timestamps, so plain text without timecodes cannot produce verified timings.",
  steps: [
    { title: "Paste your timestamps", text: "Copy a timestamped transcript or type the times where topics change." },
    { title: "Generate and edit", text: "Adjust the chapter titles and times." },
    { title: "Validate and paste", text: "Check the validation messages, then paste the list into YouTube Studio's video description." },
  ],
  examples: {
    heading: "YouTube chapters,",
    accent: "built from real timestamps.",
    intro: "Illustrative inputs only. In every case the times come from the input, never from the tool.",
    items: [
      { title: "Product test video", input: "00:00 Welcome / 01:20 The problem / 03:45 Test results / 06:30 Conclusion, length 07:15.", output: "0:00 Introduction / 1:20 What We're Testing / 3:45 Results and Lessons / 6:30 Final Takeaways", why: "All times come from the input. Only the titles were rewritten." },
      { title: "Recipe video", input: "0:00 intro / 0:45 ingredients / 2:10 making the dough / 6:00 baking / 9:30 tasting, length 11:00.", output: "0:00 Intro / 0:45 Ingredients / 2:10 Making the Dough / 6:00 Baking / 9:30 Taste Test", why: "Five chapters, each well over 10 seconds, starting at 0:00." },
      { title: "Untimed notes", input: "Intro, setup, common mistakes, summary, with no timecodes.", output: "No chapter list. The tool asks for timestamps.", why: "Without timecodes there's no reliable way to know when each topic starts." },
    ],
  },
  guidance: {
    heading: "How chapters work,",
    accent: "and why times matter.",
    items: [
      { title: "How YouTube chapters work", text: "Chapters divide a long video into clickable sections. YouTube's rules require the first timestamp to begin at 00:00, at least three timestamps, each chapter at least 10 seconds long, in ascending order. A validator can check formatting but can't guarantee your video or account will show chapters." },
      { title: "Why timestamps cannot be guessed", text: "A plain transcript without timing can't tell a program whether an explanation started at 2:10 or 4:20. Bring real timecodes from subtitles, a video editor or notes made while reviewing the footage. AI may improve labels but never invents times." },
      { title: "Sources", text: "Chapter rules come from [YouTube Help on video chapters](https://support.google.com/youtube/answer/9884579?hl=en-GB), checked October 2026." },
    ],
  },
  faqs: [
    { q: "How do I add chapters to a YouTube video?", a: "Put correctly formatted timestamps and titles in the video description in YouTube Studio, starting with 0:00, then save." },
    { q: "How many chapters do I need?", a: "At least three timestamps, each chapter at least 10 seconds long." },
    { q: "Does the first timestamp need to be 0:00?", a: "Yes." },
    { q: "Can I make chapters from an untimed transcript?", a: "You can draft titles, but reliable times need timecodes. This tool won't invent them." },
    { q: "Why aren't my chapters appearing?", a: "Check the starting timestamp, number of chapters, minimum length and video or account eligibility." },
    { q: "Can I edit the generated chapters?", a: "Yes. Every time and title is editable before you copy." },
  ],
  related: [
    { slug: "youtube-description-generator", text: "Write the description the chapters go in." },
    { slug: "youtube-video-script-generator", text: "Script the next video." },
    { slug: "youtube-title-generator", text: "Write a stronger title." },
  ],
  cta: { heading: "Want video", accent: "that brings in customers?", copy: "I help brands plan social and video content that reaches the right audience and turns viewers into buyers.", button: "See social media marketing", href: "/services/social-media-marketing-specialist" },
  hubCard: { description: "Turn timestamped transcripts or notes into a validated YouTube chapter list.", cta: "Create chapters" },
  sources: [
    { label: "YouTube Help: video chapters", url: "https://support.google.com/youtube/answer/9884579?hl=en-GB", checked: "October 2026" },
  ],
} satisfies NewToolContent;
