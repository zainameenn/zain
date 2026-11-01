import type { LibraryPrompt } from "./types";

// Prompt Library: YouTube and Pinterest. Word for word from the PDF; {field} placeholders removed.

export const VIDEO: Record<string, LibraryPrompt> = {
  "youtube-title-generator": {
    output: "text",
    what: "title",
    short: true,
    window: { min: 40, max: 70 },
    prompt: `TASK: Write one YouTube video title.

INPUTS
What the video is about
Who it is for
Main keyword (optional)
Video type (tutorial, review, story, list, challenge, commentary, vlog)
The payoff or most interesting moment
Tone
Language

LENGTH
40 to 70 characters so it reads in full on mobile and in search. Never over 100.

WHAT GOOD LOOKS LIKE
A great title makes one clear promise and creates a gap the viewer wants closed. It is specific enough to be believed and curious enough to be clicked.
Use the main keyword naturally, as early as it reads well, when the video is search driven (tutorials, reviews, how to). For story or entertainment videos, curiosity and stakes matter more than the keyword.
Good patterns: a specific result ("I Grew 40 Tomato Plants on a 2m Balcony"), a strong outcome plus constraint ("Learn Excel Pivot Tables in 10 Minutes"), a surprising contrast, a direct question the viewer already has.
The title must be true to the video. No promise the payoff can't keep. Use numbers only from the inputs.
Title case or sentence case, whichever fits the tone. No all caps sentences (one capitalised word for emphasis is fine). No emoji, no hashtags, no clickbait like "You Won't Believe".

Return only the title.`,
  },

  "youtube-thumbnail-text-generator": {
    output: "text",
    what: "thumbnail text",
    short: true,
    window: { min: 2, max: 30 },
    prompt: `TASK: Write one line of YouTube thumbnail text.

INPUTS
Video title
What the video is about
What the thumbnail image shows
Tone
Language

LENGTH
2 to 5 words, 30 characters or fewer. It must be readable on a phone in under a second.

WHAT GOOD LOOKS LIKE
Thumbnail text never repeats the title. It adds the emotion, stakes or twist the title leaves out. The title says what; the thumbnail says why it matters or what went wrong.
Examples of the idea: title "I Tried Every Cheap Air Fryer", thumbnail "ONE WAS DANGEROUS". Title "How I Paid Off $40k in Debt", thumbnail "No side hustle".
Use plain, punchy words. A number, a result or a short reaction works well.
Do not describe what is already visible in the image.

Return only the thumbnail text.`,
  },

  "youtube-description-generator": {
    output: "text",
    what: "description, in plain text with line breaks",
    window: { min: 600, max: 1800 },
    prompt: `TASK: Write one YouTube video description.

INPUTS
Video title
What the video covers
Main keyword
Audience
Links to include (optional)
Chapters or timestamps (optional)
Call to action (optional)
Tone
Language

LENGTH
600 to 1,800 characters. Never over 5,000.

STRUCTURE
1. Opening two lines: these show before "more" and in search. Say exactly what the viewer gets from this video and include the main keyword naturally in the first sentence. No "In this video" opener.
2. A short paragraph (2 to 4 sentences) expanding on what is covered and who it helps. Use one or two related search terms naturally. No keyword stuffing.
3. Chapters: if timestamps are given, include them exactly as provided, one per line, under a short label. If none are given, skip this part. Never invent timestamps.
4. Links: list provided links with a short label each. Never invent links.
5. One closing call to action (subscribe, comment, watch next) that fits the video.
At most three hashtags on the last line, only if they are specific to the topic.

Return only the description in plain text with line breaks.`,
  },

  "youtube-shorts-script-generator": {
    output: "text",
    what: "script, in the format above",
    prompt: `TASK: Write one YouTube Shorts script.

INPUTS
Topic or idea
Audience
Target length (15, 30, 45 or 60 seconds)
Goal (teach, entertain, sell, tell a story)
On camera or voiceover
Tone
Language

LENGTH
About 2.5 spoken words per second. 15 seconds is about 35 words, 30 seconds about 75, 45 seconds about 110, 60 seconds about 150.

STRUCTURE
HOOK (0 to 3 seconds): one line that drops the viewer into the middle of the idea. A bold claim, a result shown first, a mistake, or a question with stakes. No greetings, no "In this video", no name intro.
BEATS: 2 to 4 short beats. Each beat is one idea and one visual. Every line must make them want the next line.
PAYOFF: deliver what the hook promised, clearly.
ENDING: one line that loops back to the hook or gives a reason to follow. Keep it under 3 seconds.

FORMAT
Write each beat as:
[time range] VISUAL: what is on screen
SAY: the spoken line
TEXT: on screen text, 2 to 6 words (optional)
Write spoken lines the way people talk: short sentences, contractions, no jargon unless the audience uses it.

Return only the script in this format.`,
  },

  "youtube-video-script-generator": {
    output: "text",
    what: "script",
    prompt: `TASK: Write one YouTube video script.

INPUTS
Topic
Key points to cover
Audience and their level
Target length in minutes
Goal
Call to action
Tone
Language

LENGTH
About 150 spoken words per minute of target length.

STRUCTURE
HOOK (first 20 to 30 seconds): open on the problem, the result or the most interesting moment. Tell viewers exactly what they will get by the end and why it is worth staying. No channel intro, no "before we start, subscribe".
SECTIONS: one section per key point, in the order that builds best. Each section opens with a one line setup, explains the point with a concrete example, and ends with a line that pulls into the next section. Add a short pattern break (a question, a quick story, a visual change) every 60 to 90 seconds.
PAYOFF: deliver the strongest point or result near the end, not at the start.
CLOSE: a short recap in one or two lines, then one call to action. Point to a related video if it fits.

FORMAT
Use section headings in capitals. Under each, write the spoken lines in short paragraphs. Add [B ROLL: ...] or [ON SCREEN: ...] notes where a visual would help.
Write for the ear: short sentences, contractions, direct "you". Cover every key point the user gave. Use only facts and numbers from the inputs; where a stat would help but none was given, write [ADD STAT].

Return only the script.`,
  },

  "youtube-chapters-generator": {
    output: "text",
    what: "chapter list, one per line, or exactly NOT_ENOUGH_TIMING",
    prompt: `TASK: Turn the transcript or notes into one YouTube chapter list.

INPUTS
Timestamped transcript or notes
Video length
Video title
Language

RULES FROM YOUTUBE
The first chapter starts at 00:00. At least three chapters, in ascending order. Every chapter lasts at least 10 seconds.

WHAT GOOD LOOKS LIKE
Create a chapter only where the topic genuinely changes. Aim for one chapter every 1 to 3 minutes of video, fewer for short videos.
Use only timestamps that appear in the input or fall on a clear topic change in it. Never invent a time that is not supported by the transcript.
Chapter titles: 2 to 6 words, specific and scannable, written the way a viewer would look for that part ("Mixing the dough", "Fixing a slow WiFi"). Use searchable words. No "Part 1", no emoji, no clickbait.
Format: mm:ss for videos under an hour, h:mm:ss for longer ones, consistently.

OUTPUT
One chapter per line: timestamp, a space, the title.
If the input does not contain enough timing to make three valid chapters, return exactly: NOT_ENOUGH_TIMING`,
  },

  "youtube-channel-description-generator": {
    output: "text",
    what: "description",
    window: { min: 600, max: 1000 },
    prompt: `TASK: Write one YouTube channel description.

INPUTS
Channel name
What the channel is about
Who it is for
What makes it different
Upload schedule (optional)
Contact or links (optional)
Tone
Language

LENGTH
600 to 1,000 characters. Never over 1,000.

STRUCTURE
1. First sentence: what the channel is about and who it is for, using the words people search on YouTube. This line shows in search and on the channel page, so it must stand alone.
2. What viewers get: the types of videos, series or formats, as specific as the inputs allow.
3. Why this channel: the difference, point of view or experience behind it, taken from the inputs.
4. Upload schedule if given.
5. A subscribe line that gives a reason, not just "Subscribe!".
6. Contact or business email if given, on its own line.
Short paragraphs. No hashtags, no keyword lists, no emoji unless the tone asks for one.

Return only the description.`,
  },

  "pinterest-title-generator": {
    output: "text",
    what: "title",
    short: true,
    window: { min: 40, max: 100 },
    prompt: `TASK: Write one Pinterest Pin title.

INPUTS
What the Pin links to or shows
Main keyword
Audience
Pin type (recipe, DIY, product, blog post, guide, inspiration)
Language

LENGTH
40 to 100 characters. Put the main keyword inside the first 35 characters, because feeds often show only the start.

WHAT GOOD LOOKS LIKE
Write the title the way a person types into Pinterest search, then add the benefit or detail that makes them pick this Pin over the next one.
Pattern: keyword + specific detail or benefit. For example: "Easy Sourdough Discard Crackers, Ready in 30 Minutes" or "Small Balcony Garden Ideas for Renters on a Budget".
Be literal and descriptive. Pinterest users search for things, not puns. No clickbait, no emoji, no hashtags, no all caps.
Use numbers, times or prices only if given.

Return only the title.`,
  },

  "pinterest-description-generator": {
    output: "text",
    what: "description",
    window: { min: 300, max: 500 },
    prompt: `TASK: Write one Pinterest Pin description.

INPUTS
Pin title
What the Pin links to or shows
Main keyword
Related keywords (optional)
Audience
Call to action
Language

LENGTH
300 to 500 characters. Never over 800.

WHAT GOOD LOOKS LIKE
The description helps Pinterest match the Pin to searches and convinces the person who opens it to click through.
Sentence 1: say what this is and who it helps, using the main keyword naturally.
Sentences 2 to 3: the specific details a searcher cares about: steps, time, materials, style, occasion, season, budget, results. Weave in one or two related keywords where they read naturally.
Last sentence: a clear reason to tap through (get the full recipe, see all 12 ideas, shop the look, grab the free template).
Write full sentences, not keyword lists. No more than two hashtags, and only if they are specific; zero is fine. No emoji.

Return only the description.`,
  },
};
