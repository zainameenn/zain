import type { LibraryPrompt } from "./types";

// Prompt Library: Profile bios, Captions and posts. Word for word from the PDF; {field} placeholders removed.

export const SOCIAL: Record<string, LibraryPrompt> = {
  "facebook-bio-generator": {
    output: "text",
    what: "bio",
    short: true,
    window: { "Personal Profile": { min: 88, max: 101 }, Creator: { min: 88, max: 101 }, "Facebook Group": { min: 88, max: 101 }, "Business Page": { min: 200, max: 255 } },
    prompt: `TASK: Write one Facebook bio.

INPUTS
Profile type
About them
What describes them
Focus
Vibe
What visitors should take away
Tone
Language
Emoji allowed

LENGTH
Personal Profile, Creator or Facebook Group: 88 to 101 characters including spaces. Never go over 101. Facebook cuts the intro at 101.
Business Page: 200 to 255 characters. Never go over 255.
A bio under the minimum is a failed result. Use the space.

WHAT GOOD LOOKS LIKE
Personal Profile: one or two natural sentences built from the real details in "About them". Mix a work or life fact with a personal quirk so it reads like a person, not a quote card.
Creator: say what they post and who it is for in the first half. Add one detail that shows personality or a posting rhythm.
Business Page: what the business does, for whom, and where (if local), then one concrete reason to choose them taken from the inputs, then a simple next step such as message us, call or book.
Facebook Group: who the group is for, what members share or get, and the tone of the space.

RULES
Use the user's own words and details wherever possible. If "About them" is empty, build from the quick choices but stay concrete, never generic.
No inspirational quotes, no lists of adjectives (Dreamer. Hustler. Believer.), no "living my best life".
If emoji is allowed, use at most one, placed where it adds meaning. If not allowed, use none.
No hashtags. No line breaks.

EXAMPLES OF THE STANDARD (do not reuse their wording)
Personal, 92 characters: Weekend baker, weekday accountant. Learning the perfect croissant one burnt batch at a time.
Business Page, 202 characters: Family run plumbers serving Leeds since 2009. Same day leak repairs, boiler servicing and full bathroom fits, with a fixed quote before any work starts. Message us and we will find you a slot this week.

Return only the bio text.`,
  },

  "instagram-bio-generator": {
    output: "text",
    what: "bio, with its line breaks",
    short: true,
    window: { min: 125, max: 150 },
    prompt: `TASK: Write one Instagram bio.

INPUTS
Account type
Name or brand
What they do or post
Who it is for
Location (optional)
Proof or detail worth mentioning (optional)
What visitors should do next
Tone
Language
Emoji allowed

LENGTH
125 to 150 characters including spaces and line breaks. Never exceed 150, Instagram rejects it.

STRUCTURE
Line 1: what they do or post, using the words their audience would search for (for example "wedding photographer", "plant based meal prep", "B2B copywriter"). Add the location here if it matters.
Line 2: why follow or buy. One concrete detail from the inputs: a result, a speciality, a posting rhythm, a point of view.
Line 3: one call to action that points at the link or DMs, written naturally (for example "New recipes every Sunday, grab the list below").
Use 2 or 3 short lines separated by line breaks. Each line must earn its place.

RULES
Do not repeat the name or brand, it already shows above the bio.
No hashtags. They pull visitors away from the profile.
If emoji is allowed, use one or two that replace words or act as line markers. If not, none.
Personal accounts can lead with personality, but the main keyword must still appear.

EXAMPLE OF THE STANDARD (do not reuse its wording), 138 characters:
Custom birthday and wedding cakes in Austin
Baked the morning you pick them up, never frozen
Orders open 3 weeks out. Book your date below

Return only the bio text with its line breaks.`,
  },

  "tiktok-bio-generator": {
    output: "text",
    what: "bio",
    short: true,
    window: { min: 65, max: 80 },
    prompt: `TASK: Write one TikTok bio.

INPUTS
What their videos are about
Who watches
Posting rhythm or series (optional)
What viewers should do
Tone
Language
Emoji allowed

LENGTH
65 to 80 characters. TikTok's limit is 80. Every character counts, so cut filler words, not meaning.

WHAT GOOD LOOKS LIKE
A TikTok bio answers one question in a second: what will I get if I follow?
Lead with the content promise in searchable words. Then add a hook: a series name, a posting day, a result or a playful twist that matches the tone.
One line, or two very short lines. No hashtags. If emoji is allowed, one at most.

EXAMPLE OF THE STANDARD (do not reuse its wording), 78 characters:
Turning cheap IKEA finds into rooms that look expensive. New flip every Sunday

Return only the bio text.`,
  },

  "twitter-bio-generator": {
    output: "text",
    what: "bio",
    short: true,
    window: { min: 135, max: 160 },
    prompt: `TASK: Write one X bio.

INPUTS
Who they are or their role
What they post about
Proof, credential or detail (optional)
Personality detail (optional)
Goal of the profile
Tone
Language

LENGTH
135 to 160 characters. Never exceed 160.

WHAT GOOD LOOKS LIKE
Open with the role or identity in plain words people search for. Then say what they post about, as specific topics, not categories ("pricing pages and onboarding" beats "design and tech"). Close with one human detail, credential or point of view from the inputs that makes someone want to read their posts.
Commas or short sentences. Avoid stacked separators like | or • unless the tone asks for a clean, minimal style.
No hashtags, no emoji unless the user's custom instructions ask for them. No "Views are my own".

EXAMPLE OF THE STANDARD (do not reuse its wording), 156 characters:
Product designer at a fintech startup. Writing about onboarding, pricing pages and the UX choices that quietly kill conversions. Coffee snob, Figma hoarder.

Return only the bio text.`,
  },

  "threads-bio-generator": {
    output: "text",
    what: "bio",
    short: true,
    window: { min: 125, max: 150 },
    prompt: `TASK: Write one Threads bio.

INPUTS
Who they are
What they post or talk about
Who they want to talk with
Personality detail (optional)
Tone
Language
Emoji allowed

LENGTH
125 to 150 characters. Never exceed 150.

WHAT GOOD LOOKS LIKE
Threads is conversation first, so the bio should read like a friendly introduction someone would say out loud. Say who they are and what they post in specific words, then invite conversation: what people can ask them, argue with them about, or swap with them.
One to two sentences. No hashtags. Emoji only if allowed, one at most.

EXAMPLE OF THE STANDARD (do not reuse its wording), 141 characters:
Nurse turned meal prep cook. Posting the cheap, high protein lunches I actually eat on 12 hour shifts. Ask me anything about cooking for one.

Return only the bio text.`,
  },

  "instagram-caption-generator": {
    output: "text",
    what: "caption, with line breaks, then hashtags if allowed",
    short: true,
    window: { Short: { min: 80, max: 220 }, Medium: { min: 300, max: 700 }, Long: { min: 900, max: 1600 } },
    prompt: `TASK: Write one Instagram caption.

INPUTS
What the post shows or is about
Post format
Account type and niche
Audience
Goal
Call to action (optional)
Length
Tone
Hashtags allowed
Emoji allowed
Language

LENGTH (not counting hashtags)
Short: 80 to 220 characters. Medium: 300 to 700. Long: 900 to 1,600.

STRUCTURE
1. Hook: the first line must make someone stop and tap "more". Use a specific claim, a surprising detail, a tension, or a promise of what they will learn. Keep it under 125 characters so it shows in full before the cut. Do not describe the image ("Here is our new cake").
2. Body: add what the image cannot say. Story, steps, the why behind it, or the useful detail. Short paragraphs of one to three lines with blank lines between them. Use the words people would search for on Instagram naturally in the first two lines.
3. Close: one clear next step that fits the goal. Save this, comment a word, tap the link in bio, book, or reply with an opinion. One CTA only.

HASHTAGS
If allowed: 3 to 5 specific hashtags on a new line at the very end. Mix one niche topic tag, one audience or community tag and, if local, one location tag. Never generic tags like #love #instagood #reels #explore. Instagram caps posts at 5.
If not allowed: none.

EMOJI
If allowed, at most three, used as markers or to replace a word. Never at the start of every line.

Return only the caption, with line breaks, then hashtags if allowed.`,
  },

  "tiktok-caption-generator": {
    output: "text",
    what: "caption",
    short: true,
    window: { min: 100, max: 300 },
    prompt: `TASK: Write one TikTok caption.

INPUTS
What happens in the video
On screen text or hook already in the video (optional)
Niche and audience
Goal
Tone
Hashtags allowed
Emoji allowed
Language

LENGTH
100 to 300 characters in total.

WHAT GOOD LOOKS LIKE
TikTok captions are read while the video plays and indexed for TikTok search. So the caption must do two jobs: add a reason to keep watching and describe the video in words people search.
Line 1: a hook that adds to the video instead of repeating the on screen text. A twist, the payoff tease, a strong opinion or a question that invites comments.
Line 2 (optional): the searchable description in plain words, such as "easy 15 minute high protein dinner".
End with a comment prompt or a follow reason if it fits the goal.

HASHTAGS
If allowed: 3 to 5 at the end. Topic specific and audience specific. No #fyp #foryou #viral.
EMOJI
If allowed, one or two.

Return only the caption.`,
  },

  "facebook-caption-generator": {
    output: "text",
    what: "caption",
    short: true,
    window: { Short: { min: 60, max: 200 }, Medium: { min: 250, max: 600 }, Long: { min: 700, max: 1400 } },
    prompt: `TASK: Write one Facebook post caption.

INPUTS
What the post is about
Post type
Who posts it (person, business, creator, group admin)
Audience
Goal
Link, offer, date or location to include (optional)
Length
Tone
Emoji allowed
Language

LENGTH
Short: 60 to 200 characters. Medium: 250 to 600. Long: 700 to 1,400.

WHAT GOOD LOOKS LIKE
Facebook audiences skew toward people who already know the person or business: neighbours, customers, friends, group members. Write like a message to them, not an ad.
Open with the most interesting or useful part. For announcements and promotions, put the key fact (what, when, where, price) in the first two lines and repeat nothing.
Use short paragraphs. Include every detail from the details field exactly as given: dates, times, prices, links.
End with one clear action: comment, share with someone, message us, book, come by. For community posts, a specific question that is easy to answer beats "thoughts?".
No hashtags unless the user asks. Emoji only if allowed, three at most.

Return only the caption.`,
  },

  "threads-post-generator": {
    output: "text",
    what: "post",
    short: true,
    window: { Short: { min: 80, max: 200 }, Medium: { min: 200, max: 380 }, Long: { min: 380, max: 500 } },
    prompt: `TASK: Write one Threads post.

INPUTS
Topic, idea or opinion
Who they are and what they usually post
Audience
Post style (hot take, lesson, story, question, tip, observation)
Length
Tone
Topic tag allowed
Language

LENGTH
Short: 80 to 200 characters. Medium: 200 to 380. Long: 380 to 500. Hard limit 500.

WHAT GOOD LOOKS LIKE
Threads rewards posts that start conversations. Write like a smart person thinking out loud, not a brand.
First line: the point, stated plainly and a little boldly. No warm up.
Then: one reason, example or detail from their real experience that makes the point credible.
End: either a clean final line that lands the idea, or a genuine question people will want to answer. Not both.
One idea per post. No lists longer than three items. No "Thread" or "1/" numbering. No links unless given.
Topic tag: if allowed, add one relevant tag at the end. Threads allows one.

Return only the post.`,
  },

  "twitter-post-generator": {
    output: "text",
    what: "post",
    short: true,
    window: { Short: { min: 70, max: 140 }, Standard: { min: 140, max: 240 }, Full: { min: 240, max: 280 } },
    prompt: `TASK: Write one X post.

INPUTS
Topic, idea or opinion
Who they are and what they post about
Audience
Post style (insight, hot take, tip, story, announcement, question)
Link to include (optional)
Length
Tone
Language

LENGTH
Short: 70 to 140 characters. Standard: 140 to 240. Full: 240 to 280. Hard limit 280. A link counts as 23 characters on X.

WHAT GOOD LOOKS LIKE
One idea, said sharper than most people would say it. The best posts are specific, a little contrarian or surprisingly practical.
Open with the claim or the most concrete detail. Cut every word that does not change the meaning.
Use line breaks only if they create rhythm, for example a setup line and a payoff line.
A number, a named example or a before and after makes a post more believable. Use only numbers the user gave.
No hashtags unless the user asks. No emoji unless the tone calls for one. No "Thread", "1/" or "Here's why" endings.
If a link is given, put it on its own line at the end.

Return only the post.`,
  },
};
