import type { LibraryPrompt } from "./types";

// Prompt Library: LinkedIn and SEO writing tools. Word for word from the PDF; {field} placeholders removed.

export const PROFESSIONAL: Record<string, LibraryPrompt> = {
  "linkedin-headline-generator": {
    output: "text",
    what: "headline",
    short: true,
    window: { min: 150, max: 220 },
    prompt: `TASK: Write one LinkedIn headline.

INPUTS
Current role or title
Who they help or work with
What they help with or the result they deliver
Skills or keywords recruiters and clients search for
Proof (optional)
Goal of the profile (get hired, win clients, build authority, recruit)
Tone
Language

LENGTH
150 to 220 characters. Never over 220.

STRUCTURE
First 60 characters: the role or identity plus the main searchable keyword. This is the only part shown in search results, comments and connection requests, so it must make sense alone.
Rest: who they help and the outcome they deliver, then one proof point or speciality from the inputs.
Use | or a comma to separate two or three parts. Never more than three parts.

RULES
Write in the language people search, not internal job titles ("B2B SaaS SEO" beats "Growth Ninja").
The proof must come from the inputs. No invented clients, numbers or companies.
No buzzword strings ("Strategist | Visionary | Leader"). No emoji. No "Open to work" unless the goal is get hired and the user asks for it.

Return only the headline.`,
  },

  "linkedin-about-section-generator": {
    output: "text",
    what: "About section",
    window: { min: 1200, max: 2400 },
    prompt: `TASK: Write one LinkedIn About section.

INPUTS
Name and current role
Experience and background
Who they help and how
Achievements and proof
Skills and keywords
What makes them different
What they want readers to do
Person (first person or third person; default first person)
Tone
Language

LENGTH
Follow the Length input: Short 400 to 800 characters, Medium 800 to 1,500, Detailed 1,500 to 2,400. Never over 2,600. A Short section keeps the same order but uses one or two sentences per part.

STRUCTURE
1. Opening (2 lines, under 250 characters): this shows before "see more". Lead with what they do and for whom, or with the problem they solve, in a way that makes the right reader want to keep going. No "Welcome to my profile", no "I am a results driven professional".
2. The story or point of view (one short paragraph): how they got here or what they believe about their work, using real details from the background.
3. What they do (one short paragraph or 3 to 5 short lines): services, specialities or areas of expertise in plain words, using the main keywords naturally.
4. Proof: two or three concrete achievements from the inputs. Never invent numbers, employers or clients. If no proof was given, describe the type of work and results they focus on instead.
5. Call to action: one clear line on how to reach them or what to do next.

RULES
Short paragraphs with blank lines between them. Readable on a phone.
Write like the person talks to a smart peer. First person unless they chose third person.
No emoji unless the tone is casual. No hashtags.

Return only the About section.`,
  },

  "linkedin-post-generator": {
    output: "text",
    what: "post",
    window: { Short: { min: 400, max: 800 }, Medium: { min: 900, max: 1600 }, Long: { min: 1700, max: 2800 } },
    prompt: `TASK: Write one LinkedIn post.

INPUTS
Idea, experience or opinion
Who is posting (role, industry)
Target reader
Post type (lesson learned, story, opinion, how to, case study, announcement, list)
Goal
Call to action (optional)
Length
Tone
Language

LENGTH
Short: 400 to 800 characters. Medium: 900 to 1,600. Long: 1,700 to 2,800. Never over 3,000.

STRUCTURE
1. Hook: the first one or two lines, under 200 characters, are all most people see before "see more". Make them earn the click: a specific result, a surprising admission, a strong opinion, or a concrete moment. No "I'm excited to share", no "Let's talk about", no question as the first line.
2. Body: deliver on the hook. Use the real details from the idea. One idea per paragraph, one to two sentences each, with blank lines between. Show the specific thing that happened, what they did, what changed and what they learned.
3. Takeaway: one line the reader can use or remember.
4. Close: one call to action or a specific question that invites useful comments. Not "Thoughts?" or "Agree?".

RULES
Sound like a person telling a colleague something useful, not a press release.
No fake drama, no invented stories, no invented numbers. Use only what is in the inputs.
No one word lines for effect. No more than one list, and only if the post type is how to or list.
At most 3 hashtags at the end, only if relevant. Emoji only if the tone is casual, two at most.
Do not put external links in the post body unless the user provides one and asks for it.

Return only the post.`,
  },

  "linkedin-comment-generator": {
    output: "text",
    what: "comment",
    short: true,
    window: { min: 150, max: 600 },
    prompt: `TASK: Write one LinkedIn comment on someone else's post.

INPUTS
The post
Who is commenting (role, expertise)
Their angle (optional) (agree and add, respectful disagreement, share experience, ask a question, add a resource)
Tone
Language

LENGTH
Follow the Length input: One sentence is 60 to 220 characters, 2 to 3 sentences is 150 to 450, 4 to 5 sentences is 300 to 600.

WHAT GOOD LOOKS LIKE
A comment worth writing adds something the post did not say. Pick the single most interesting point in the post and respond to that, by name or by idea, so the author knows the commenter actually read it.
Then add one of: a related experience from the commenter's work, a practical tip that extends the point, a respectful counterpoint with a reason, or a sharp question the author would enjoy answering.
Write to the author directly and naturally. Use their first name only if it appears in the post.

RULES
Never open with "Great post", "Love this", "So true", "Thanks for sharing", "This resonates" or any praise opener.
Never summarise the post back to the author.
No self promotion, no links, no hashtags, no emoji unless the tone is casual (one at most).
Do not invent the commenter's results or numbers. Speak from the role and expertise given.

Return only the comment.`,
  },

  "seo-title-generator": {
    output: "text",
    what: "title",
    short: true,
    window: { min: 45, max: 60 },
    prompt: `TASK: Write one SEO title tag.

INPUTS
Page topic and what it offers
Primary keyword
Page type (blog post, service page, product, category, homepage, local landing page, tool)
Brand name (optional)
Location (optional)
What makes this page better than the others ranking
Language

LENGTH
45 to 60 characters including the brand, so it is unlikely to be cut off. Never over 65.

WHAT GOOD LOOKS LIKE
The title must describe the page accurately and match the search intent behind the keyword. Someone scanning ten results should know in one glance that this page answers their search, and why it is the best click.
Put the primary keyword near the start in its natural form. Use it once.
Add one click reason from the inputs: the angle, a year if the page is updated content, a location, a format ("Free Template", "Checklist", "Pricing"), or an outcome.
Blog posts and guides: keyword + specific promise. Service pages: service + location or audience + differentiator. Product pages: product name + key attribute. Homepage: what the business does + for whom, then brand.
If a brand is given and there is room, add it at the end after " | ". Drop the brand before dropping the click reason if space is tight.
No keyword stuffing, no all caps, no clickbait, no dashes. Use ":" or "|" as separators.

Return only the title.`,
  },

  "meta-description-generator": {
    output: "text",
    what: "meta description",
    short: true,
    window: { min: 140, max: 158 },
    prompt: `TASK: Write one meta description.

INPUTS
Page title
What the page covers or offers
Primary keyword
Audience
Key benefit, offer or differentiator
Page type
Language

LENGTH
140 to 158 characters.

WHAT GOOD LOOKS LIKE
A meta description is the ad copy under the title in search results. It should make the searcher confident this page has their answer.
Sentence 1: say what the page gives them, using the primary keyword naturally. Google bolds words that match the search.
Sentence 2: the specific reason to click: the benefit, the offer, what is inside, or what makes it different. Use real details from the inputs (price, time, location, format).
End with a soft action when it fits the page type (Book online, See pricing, Get the free template, Learn how).
Do not repeat the title word for word. Each description must be unique to this page. No quotes (they can break the tag), no emoji, no dashes, no "Click here".

Return only the meta description.`,
  },

  "local-business-faq-generator": {
    output: "json",
    prompt: `TASK: Write one set of website FAQs for a local business.

INPUTS
Business name and type
Services
Service area
Pricing approach or prices (optional)
Policies (booking, payment, cancellation, warranty, hours)
Questions customers actually ask (optional)
Tone
Language

OUTPUT SIZE
6 to 10 question and answer pairs. Each answer 40 to 90 words.

WHAT GOOD LOOKS LIKE
Write the questions a real customer asks before calling: cost, timing, area covered, what is included, what happens if something goes wrong, how to book, what to prepare. Start with any questions the user listed.
Phrase each question the way a customer would type or say it ("How much does a boiler service cost in Leeds?"). Include the service and the area naturally in some questions, never forced.
Answer the question directly in the first sentence. Then add the detail that helps them decide.
Use only the services, prices, policies and areas the user gave. If a good question needs a fact that was not given, answer it with a clear placeholder in square brackets, for example [add your call out fee], instead of making it up.
No guarantees, licences, insurance claims or response times unless they are in the inputs.

RETURN
JSON array: [{"question": "...", "answer": "..."}]`,
  },

  "seo-content-brief-generator": {
    output: "text",
    what: "brief, in Markdown with the nine headings",
    prompt: `TASK: Write one SEO content brief a writer can work from.

INPUTS
Target keyword
Secondary keywords (optional)
Audience and their level
Business and what it sells
Page goal
Competitor URLs or titles (optional)
What the business knows that others don't (optional)
Language

WHAT GOOD LOOKS LIKE
A brief is useful when a writer who has never met the business can produce a page that deserves to rank. It must be specific to this keyword and business, not a generic template.

SECTIONS (in this order)
1. Search intent: what the searcher wants, the stage they are at, and the format that best serves them (guide, list, comparison, tool, landing page). One short paragraph.
2. Recommended title and H1: one of each. Title 45 to 60 characters.
3. Meta description: one, 140 to 158 characters.
4. Reader questions to answer: 6 to 10 real questions this searcher has, in the order they would ask them.
5. Outline: H2s and H3s in order, with one line under each saying what it must cover and any example, number or visual it needs.
6. Information gain: two or three things this page must add that typical pages on this topic do not, built from the business's unique knowledge. If none was given, suggest what the business should supply.
7. Evidence still needed: facts, data, quotes, screenshots or examples the writer must get from the business. Never invent statistics; list them here as gaps.
8. Internal link ideas: page types on the site to link to and from, described generically unless URLs were given.
9. Word count range: a sensible range for this intent and format, with one line of reasoning.

Return the brief in Markdown with these nine headings.`,
  },

  "local-service-page-outline-generator": {
    output: "text",
    what: "outline, in Markdown",
    prompt: `TASK: Write one outline for a local service page.

INPUTS
Service
City or area
Business name
How the service works (process)
What makes them different
Pricing approach (optional)
Proof available (reviews, years, photos, guarantees)
Audience
Language

WHAT GOOD LOOKS LIKE
The page must rank for "service in area" style searches and convert the visitor into a call or booking. It must read as written for this business in this area, not a template with the city swapped in.

RETURN, in Markdown
1. Title tag (45 to 60 characters) and meta description (140 to 158 characters).
2. H1.
3. Hero: one subheading line and the primary call to action.
4. Sections as H2s, each with 2 to 4 bullet notes on what to write. Include: the problem and when to call, what the service includes, the step by step process from the inputs, pricing or how quotes work, areas served (only areas the user named), why choose them (only real differentiators), proof placement, FAQ topics (4 to 6 questions), final call to action.
5. Local relevance notes: two or three ideas for genuinely local details the owner should add (common local property types, local regulations to mention if relevant, landmarks they serve near). Mark these as ideas to confirm, not facts.
6. Missing information: anything the owner must provide before writing.
Never invent reviews, years in business, licences, guarantees, prices or service areas.`,
  },
};
