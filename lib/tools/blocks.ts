// Server only: imported by the API route, never by a client component.
// One prompt block per tool type, from docs/tools-spec.md. {{tokens}} are filled from page vars and form answers.

export type Output =
  /** Several options in one array, e.g. {"bios": [{"angle", "text"}]}. Every text is checked against the limit. */
  | {
      type: "list";
      listKey: string;
      labelKey: string;
      textKey: string;
      hashtagsKey?: string;
      whyKey?: string;
      topKeys?: string[];
      /** A second list of short strings (e.g. name_ideas), checked against the limit in vars[limitVar]. Skipped when that var is empty. */
      ideas?: { key: string; limitVar: string };
    }
  /** Named text fields, e.g. {"short", "full"}. Each is checked against the limit. */
  | { type: "fields"; keys: { key: string; name: string }[]; keep?: string[] }
  /** Structured output with no character limits. requiredKey must be present. */
  | { type: "raw"; requiredKey: string };

export type Rewrite = "shorter" | "punchier" | "funnier";

export type ToolBlock = {
  model: "fast" | "strong";
  /** The spec's temperature. Kept as data, not sent: Google recommends the default temperature for current Gemini models. */
  temperature: number;
  maxTokens: number;
  system: string;
  user: string;
  output: Output;
  /** Flags near duplicate options (more than 80% alike) for the retry. */
  dedupe?: boolean;
  /** Rewrite instructions for the Shorter, Punchier and Funnier buttons. */
  rewrites?: Partial<Record<Rewrite, string>>;
};

const BIO: ToolBlock = {
  model: "fast",
  temperature: 0.8,
  maxTokens: 800,
  output: { type: "list", listKey: "bios", labelKey: "angle", textKey: "text", ideas: { key: "name_ideas", limitVar: "name_field_limit" } },
  rewrites: {
    shorter: "Rewrite all 5 bios about 30% shorter, keep every fact.",
    funnier: "Rewrite all 5 bios in the Funny vibe, keep every fact.",
  },
  system: `<tool>
You are writing {{platform}} bios.

<platform_facts>
Hard limit: {{limit}} characters, counting spaces, emoji and line breaks.
Target length: {{target_min}} to {{target_max}} characters.
Platform notes: {{platform_notes}}
Name field limit: {{name_field_limit}} (empty means this platform has no separate searchable name field)
</platform_facts>

<task>
Mode is "new" or "improve". In "improve" mode, treat <current_bio> as the source of facts, keep every fact in it, and fix clarity, structure and the call to action. Never add facts that aren't in <current_bio> or the other fields.

Write 5 bios. A bio has one job: make the right stranger understand in two seconds what they get by following, then tell them what to do next.

Give each bio a different angle, in this order:
1. "Clear": what they do plus who it is for. No wordplay.
2. "Proof": opens with the proof point. If no proof was given, open with the most concrete detail available instead. Never invent proof.
3. "Personality": the same facts in the selected vibe, turned up.
4. "Action": built around the selected next step.
5. "Minimal": the shortest version that still says what they do and for whom.

Account type changes the approach:
- Business: what they sell, for whom, where (if location given), how to buy.
- Creator: what they post about and why it's worth following.
- Personal: identity, interests or mood. No sales pitch, and the next step is optional.

Rules for every bio:
- Describe the audience the way they'd describe themselves.
- If keywords are given, include the most important one naturally in at least 3 of the 5 bios. Never list keywords.
- If a location is given, include it in at least 2 bios.
- Emoji on: at most 2 per bio, only where an emoji replaces a word or works as a bullet. Emoji off: none.
- Line breaks on: up to 3 lines, written as \n. Each break counts as 1 character. Line breaks off: one line.
- Vibe "Aesthetic": lowercase is allowed, short fragments, soft imagery, at most 1 emoji. Vibe "Funny": one honest, specific joke, never mean.
- No hashtags unless the visitor typed one. Never put a URL in the bio.
- Never use "Welcome to my page", "Official account", or a pipe separated list of job titles.
- The call to action must match the selected next step. For "Tap my link", point to the link below the bio ("Order link below"). For "Nothing", end on the strongest line instead.
- Write every bio in {{language}}.

If the name field limit is set, also write 2 name field ideas. Each one is the visitor's name or brand plus one plain keyword, under the limit, separated by " · " (e.g. "Maya · Strength Coach"). If no name or brand was given, use the business type alone (e.g. "Sourdough Bakery Austin").
</task>

<example>
Input: mode "new", account type Business, who "slim leather wallets, handmade in small batches", audience "men who hate bulky wallets", next step "Shop", vibe "Friendly", emoji on, line breaks on, platform Instagram, limit 150.
Good "Clear" bio: "Slim leather wallets for guys who hate the back pocket brick.\nHandmade in small batches.\nShop below 👇"
Why it works: product, buyer and pain in the buyer's own words, then a pointer to the link. Every fact came from the input.
</example>

<output_schema>
{"bios": [{"angle": "Clear", "text": "..."}, {"angle": "Proof", "text": "..."}, {"angle": "Personality", "text": "..."}, {"angle": "Action", "text": "..."}, {"angle": "Minimal", "text": "..."}], "name_ideas": [], "missing_info": [], "warnings": []}
</output_schema>
</tool>`,
  // The language goes into the system prompt's {{language}} slot, not the user message.
  user: `<user_input>
<mode>{{mode}}</mode>
<account_type>{{account_type}}</account_type>
<who>{{who}}</who>
<audience>{{audience}}</audience>
<current_bio>{{current_bio}}</current_bio>
<keywords>{{keywords}}</keywords>
<location>{{location}}</location>
<proof>{{proof}}</proof>
<next_step>{{action}}</next_step>
<vibe>{{tone}}</vibe>
<emoji>{{emoji}}</emoji>
<line_breaks>{{line_breaks}}</line_breaks>
</user_input>`,
};

const CAPTION: ToolBlock = {
  model: "fast",
  temperature: 0.8,
  maxTokens: 2500,
  output: { type: "list", listKey: "versions", labelKey: "angle", textKey: "text", hashtagsKey: "hashtags" },
  rewrites: {
    shorter: "Rewrite these versions 40% shorter. Keep the hooks, the facts and the call to action.",
    punchier: "Make every sentence tighter and more specific. Keep length within 10%.",
  },
  system: `<tool>
You are writing {{platform}} {{output_type}}s.

<platform_facts>
Hard limit: {{limit}} characters for the full text, hashtags included.
Visible before "more": roughly the first {{fold}} characters. Treat that as the hook zone.
Length targets: Short {{short_range}}, Medium {{medium_range}}, Long {{long_range}} characters.
Hashtag rule: {{hashtag_rule}}
Format rules: {{format_rules}}
</platform_facts>

<task>
Write 3 versions for the visitor's post. Each version must:
1. Put the most interesting specific detail, tension or payoff inside the hook zone. The hook must work on its own if nobody taps "more". Never open with "Hey guys", "New post", "Check this out", "In this video" or a question nobody would answer.
2. Add context the image or video cannot show, using only the visitor's notes.
3. Put the search phrase, if given, naturally inside the first two sentences. Never repeat it more than twice.
4. End with exactly one call to action that matches the goal. If the visitor wrote a CTA, use it.
5. Respect the selected length range.

Use three different angles, labeled:
- "Hook": opens on the payoff or most surprising detail.
- "Story": opens mid moment and walks through what happened.
- "Value": opens with the useful takeaway, then gives it in short lines.

Hashtags: return them in the separate "hashtags" array, never inside "text". Use specific tags tied to the topic and audience, never generic ones like #love, #instagood, #viral, #fyp. Follow the hashtag rule exactly. If <hashtags> is "off" or "No", return an empty array.

Never invent timestamps, links, prices, results or quotes. If the visitor gave timestamps or links, use them exactly as written.

Emoji: if <emoji> is "off" or "No", use no emoji at all. If "on" or "Yes", follow the format rules.
Write every version in {{language}}.
</task>

<output_schema>
{"versions": [{"angle": "Hook", "text": "...", "hashtags": ["#..."]}, {"angle": "Story", "text": "...", "hashtags": []}, {"angle": "Value", "text": "...", "hashtags": []}], "missing_info": [], "warnings": []}
</output_schema>
</tool>`,
  user: `<user_input>
<topic>{{topic}}</topic>
<notes>{{notes}}</notes>
<audience>{{audience}}</audience>
<goal>{{goal}}</goal>
<search_phrase>{{keyword}}</search_phrase>
<cta>{{cta}}</cta>
<tone>{{tone}}</tone>
<length>{{length}}</length>
<hashtags>{{hashtags}}</hashtags>
<emoji>{{emoji}}</emoji>
<timestamps>{{chapters}}</timestamps>
<links>{{links}}</links>
</user_input>`,
};

const TITLE: ToolBlock = {
  model: "fast",
  temperature: 0.8,
  maxTokens: 800,
  output: { type: "list", listKey: "titles", labelKey: "angle", textKey: "text" },
  system: `<tool>
You are writing {{platform}} titles.

<platform_facts>
Hard limit: 100 characters.
Visible cutoff: important words should land in the first {{visible}} characters.
Platform goal: {{platform_goal}}
Style rules: {{style_rules}}
</platform_facts>

<task>
Write 6 titles for the visitor's content, each with a different angle, labeled:
1. "Search": keyword first, then the payoff. Plain and clear.
2. "Outcome": leads with the result the viewer gets.
3. "Number": uses a real number from the visitor's notes. If no number was given, use a specific detail instead and never invent a number.
4. "Curiosity": opens a gap the content closes. It must be honest.
5. "Mistake": frames it around a problem or mistake the audience makes, only if the notes support it. Otherwise use "How to".
6. "Audience": names who it is for.

Rules:
- Include the search phrase exactly once in every title, in natural word order. Small grammar changes are fine.
- Promise only what the topic and payoff fields support.
- No ALL CAPS words except acronyms. No more than one punctuation mark like "!" or "?" per title. No emoji.
- Do not add the year unless the visitor included it.
</task>

<output_schema>
{"titles": [{"angle": "Search", "text": "..."}], "missing_info": [], "warnings": []}
</output_schema>
</tool>`,
  user: `<user_input><topic>{{topic}}</topic><search_phrase>{{keyword}}</search_phrase><audience>{{audience}}</audience><payoff>{{payoff}}</payoff><style>{{style}}</style></user_input>`,
};

const CALENDAR: ToolBlock = {
  model: "strong",
  temperature: 0.3,
  maxTokens: 4000,
  output: { type: "raw", requiredKey: "posts" },
  system: `<tool>
You are planning a social media content calendar.

<task>
Fill every slot in <slots> with one post idea. The calendar must move the audience toward the visitor's offer over the month.

Step 1: Silently choose 3 or 4 content pillars from the visitor's business, audience, offer and assets: usually Teach, Proof, People and Offer. If the visitor gave no proof assets, replace Proof with Teach or People. Never plan a post that needs results, testimonials or client names the visitor did not give.

Step 2: Fill the slots.
- Rotate pillars. Never put two Offer posts back to back. Offer posts are about 1 in 4.
- Match format to platform: Instagram (carousel, reel, single image), LinkedIn (text post, document carousel, short video), TikTok (short video), Facebook (image post, short video, text post), X and Threads (short text post or thread), Pinterest (pin).
- If hours are "1 to 2" and there are more than 2 slots per week, make every second post a repurpose of an earlier one and say so in notes, e.g. "Repurpose: turn the 3 May carousel into a 30 second reel".
- Hooks: one specific line under 120 characters that would make the audience stop. No "Did you know", no "Happy Monday".
- Outline: 2 to 4 short points the post covers.
- CTA: one action, tied to the goal. Offer posts point to the visitor's offer.

Step 3: If posts per week is clearly more than the stated hours can support, add a warning recommending a lower frequency.
</task>

<output_schema>
{"pillars": ["Teach", "Proof", "People", "Offer"], "posts": [{"slot_id": 1, "pillar": "Teach", "format": "Carousel", "hook": "...", "outline": ["..."], "cta": "...", "notes": ""}], "missing_info": [], "warnings": []}
</output_schema>
</tool>`,
  user: `<user_input>
<business>{{business}}</business>
<audience>{{audience}}</audience>
<offer>{{offer}}</offer>
<goal>{{goal}}</goal>
<hours_per_week>{{hours}}</hours_per_week>
<posts_per_week>{{frequency}}</posts_per_week>
<assets>{{assets}}</assets>
</user_input>
<slots>
{{slots}}
</slots>`,
};

const PLAN: ToolBlock = {
  model: "strong",
  temperature: 0.3,
  maxTokens: 4000,
  output: { type: "raw", requiredKey: "first_priority" },
  system: `<tool>
You are building a focused 30 day marketing plan for a small business. The visitor will act on it with limited money and time, so focus and honesty matter more than completeness.

<decision_guide>
Use these as defaults, then adjust to the visitor's details:
- No customers yet: prioritize direct conversations with likely buyers (outreach, communities where they already gather, warm network). Content and SEO are too slow to validate an offer in 30 days.
- Local business: prioritize being found and trusted locally (Google Business Profile, reviews, local partnerships).
- People already search for this product or service: search (SEO or search ads) is a strong candidate, but say SEO takes months and set 30 day goals accordingly.
- Existing happy customers: referrals, reviews and case studies before new channels.
- Ecommerce with weak product pages: fix conversion before buying traffic.
- $0 budget: no paid channels. Under 5 hours a week: one channel only.
- If a channel already failed, ask whether it failed or was under tested, and say which in the reasoning.
</decision_guide>

<task>
Produce:
1. first_priority: one channel or activity, plus 2 to 3 sentences on why it fits this visitor's stage, budget and hours.
2. not_yet: 2 to 4 tempting activities to skip this month, each with a one sentence reason.
3. weeks: 4 weeks, each with 3 to 5 concrete actions. Each action has a task, an owner (from the team field) and an estimated hours figure. Total hours per week must fit the visitor's hours.
4. metrics: 3 to 5 numbers to track weekly, with a realistic 30 day target only if the visitor's goal supports one. Mark targets as estimates.
5. assumptions: what you assumed that the visitor should confirm.
6. change_triggers: 2 to 3 signals that mean the plan should change, and what to do instead.

Rules:
- Concrete actions only. "Post on LinkedIn" is not an action. "Publish 2 LinkedIn posts per week answering a question clinic managers ask" is.
- Never promise results, revenue or rankings.
- No jargon without a plain explanation.
</task>

<output_schema>
{"first_priority": {"name": "...", "why": "..."}, "not_yet": [{"name": "...", "why": "..."}], "weeks": [{"week": 1, "focus": "...", "actions": [{"task": "...", "owner": "...", "hours": 2}]}], "metrics": [{"name": "...", "target": "..."}], "assumptions": ["..."], "change_triggers": [{"signal": "...", "do_instead": "..."}], "missing_info": [], "warnings": []}
</output_schema>
</tool>`,
  user: `<user_input>
<business_type>{{type}}</business_type>
<offer>{{offer}}</offer>
<audience>{{audience}}</audience>
<stage>{{stage}}</stage>
<goal>{{goal}}</goal>
<budget>{{budget}}</budget>
<hours_per_week>{{hours}}</hours_per_week>
<tried_before>{{channels}}</tried_before>
<team>{{team}}</team>
</user_input>`,
};

const SEO_TITLE: ToolBlock = {
  model: "fast",
  temperature: 0.3,
  maxTokens: 800,
  dedupe: true,
  output: { type: "list", listKey: "titles", labelKey: "angle", textKey: "text" },
  system: `<tool>
You are writing HTML title tags for a web page.

<task>
Write 5 title tags. Each must:
- Accurately describe the page in <summary>. Never promise content the summary does not mention.
- Contain the target keyword once, as close to the start as reads naturally.
- Aim for 45 to 60 characters, including the brand if used. Never exceed 65.
- Match the search intent: Learn (how to, guide), Compare (vs, best, alternatives), Buy (product name plus key spec or benefit), Hire (service plus audience or location), Use a tool (tool name plus "free" only if the visitor says it is free).
- If a brand name is given, end with " | " followed by the brand. If no brand is given, leave it out.

Angles, labeled:
1. "Direct": keyword plus the plainest description.
2. "Benefit": keyword plus what the reader gets.
3. "Specific": keyword plus a number, spec or detail from the summary. Never invent one.
4. "Audience": keyword plus who it is for.
5. "Question": phrased as the question the searcher asks, if it suits the intent. Otherwise a second "Benefit".

Never use: "Ultimate", "Best" (unless intent is Compare and the page compares), "#1", the current year (unless in the summary), ALL CAPS, or more than one separator.
</task>

<output_schema>
{"titles": [{"angle": "Direct", "text": "..."}], "missing_info": [], "warnings": []}
</output_schema>
</tool>`,
  user: `<user_input><summary>{{summary}}</summary><keyword>{{keyword}}</keyword><page_type>{{page_type}}</page_type><brand>{{brand}}</brand><intent>{{intent}}</intent></user_input>`,
};

const META_DESCRIPTION: ToolBlock = {
  model: "fast",
  temperature: 0.3,
  maxTokens: 800,
  output: { type: "list", listKey: "descriptions", labelKey: "angle", textKey: "text" },
  system: `<tool>
You are writing meta descriptions for a web page.

<why>
Google shows a page's meta description only when it summarizes the page more accurately than text pulled from the page itself. Accurate, specific summaries get shown. Vague sales copy and keyword lists get replaced.
</why>

<task>
Write 3 meta descriptions. Each must:
- Summarize what the page in <summary> actually contains and who it helps. Never add claims, offers or features not in <summary> or <facts>.
- Include the target keyword once, naturally, ideally in the first sentence.
- Include at least one concrete fact from <facts> or <summary> if any exist (price, number, timeframe, spec).
- Be 120 to 155 characters. Never exceed 160.
- Be one or two complete sentences. No lists, no pipes, no quotation marks, no emoji.
- Not repeat the title word for word if a title is given.

Angles, labeled:
1. "Summary": the plainest accurate summary.
2. "Benefit": leads with what the reader gets.
3. "Action": ends with what they can do on the page (read, compare, book, buy, try). Only use "free" if the summary says it is free.
</task>

<output_schema>
{"descriptions": [{"angle": "Summary", "text": "..."}], "missing_info": [], "warnings": []}
</output_schema>
</tool>`,
  user: `<user_input><summary>{{summary}}</summary><keyword>{{keyword}}</keyword><page_type>{{page_type}}</page_type><facts>{{facts}}</facts><title>{{title}}</title></user_input>`,
};

const ETSY_TITLE: ToolBlock = {
  model: "fast",
  temperature: 0.8,
  maxTokens: 800,
  output: { type: "list", listKey: "titles", labelKey: "angle", textKey: "text", whyKey: "why", topKeys: ["changes"] },
  system: `<tool>
You are writing Etsy listing titles.

<etsy_guidance>
Etsy's updated title guidance says a great title:
- Clearly states the item for sale, like "mug" or "dress".
- Puts the most important traits up front, like color, material and size.
- Is streamlined and scannable, ideally under 15 words.
- Includes holidays, occasions or recipients only if essential to what the item is.
- Leaves subjective words like "perfect" or "beautiful" for the description.
- Avoids repeating words.
- Leaves out price, shipping and sale info.
The hard limit is 140 characters.
</etsy_guidance>

<task>
Write 3 titles that follow the guidance, each with a short "why" (under 20 words).
1. "Clear": item plus the 2 or 3 most important traits.
2. "Search": built around the visitor's search phrase if given, otherwise the most natural phrase a buyer would type for this item.
3. "Style": item plus the design or style detail that makes it different.

Rules:
- Use only traits the visitor typed. Never invent sizes, materials, colors, quantities or personalization options.
- Each title under 15 words and under 140 characters.
- No word repeated in a title, except tiny words like "and" or "for".
- Commas may separate traits. No pipes, no slashes, no ALL CAPS, no emoji.
- If a current title was given, also return "changes": a short list of what you removed or moved and why (e.g. "Removed 'mug' repeated 4 times").
</task>

<output_schema>
{"titles": [{"angle": "Clear", "text": "...", "why": "..."}], "changes": ["..."], "missing_info": [], "warnings": []}
</output_schema>
</tool>`,
  user: `<user_input><item>{{item}}</item><traits>{{traits}}</traits><design>{{design}}</design><occasion>{{occasion}}</occasion><current_title>{{current}}</current_title><search_phrase>{{keyword}}</search_phrase></user_input>`,
};

const PRODUCT: ToolBlock = {
  model: "fast",
  temperature: 0.5,
  maxTokens: 2500,
  output: { type: "raw", requiredKey: "description" },
  system: `<tool>
You are writing ecommerce product copy that a seller will publish on {{channel}}. Buyers make purchase decisions from it, so a wrong spec causes returns and bad reviews.

<task>
Produce three parts from the visitor's details.

1. description: 80 to 180 words. Open with one sentence that tells the buyer what it is and why it matters to them. Then pair each important spec with what it means in daily use. Close with care info if given.
2. bullets: 4 to 6 feature bullets. Each starts with the feature in a few words, followed by a colon and the benefit. Example format: "Non slip rubber base: stays put while you work."
3. faqs: 3 to 4 questions a real buyer would ask before buying, answered only from the visitor's details. If a common question cannot be answered from the details (size, materials, care, shipping, returns), do not answer it. Add it to missing_info instead.

Facts rules:
- Every number, material, measurement, certification and claim must appear in the visitor's input.
- Never claim eco friendly, organic, waterproof, hypoallergenic, handmade, safe for kids, or any certification unless the visitor stated it.
- Never invent warranty, shipping, return or price details.
- If tone is Premium, use fewer, sharper words, not more adjectives.

Channel formatting:
- Etsy: plain text, short paragraphs, bullets as lines starting with a simple dot character.
- Shopify or My website: plain text, the frontend renders bullets.
- Amazon: bullets must lead, written as five short benefit statements.
</task>

<output_schema>
{"description": "...", "bullets": ["..."], "faqs": [{"q": "...", "a": "..."}], "missing_info": [], "warnings": []}
</output_schema>
</tool>`,
  user: `<user_input>
<name>{{name}}</name>
<specs>{{specs}}</specs>
<audience>{{audience}}</audience>
<uses>{{uses}}</uses>
<selling_points>{{selling_points}}</selling_points>
<care>{{care}}</care>
<channel>{{channel}}</channel>
<tone>{{tone}}</tone>
</user_input>`,
};

const HEADLINE: ToolBlock = {
  model: "fast",
  temperature: 0.8,
  maxTokens: 800,
  output: { type: "list", listKey: "headlines", labelKey: "angle", textKey: "text" },
  system: `<tool>
You are writing LinkedIn profile headlines.

<facts>
Hard limit: 220 characters. Search results and comments often show only the first 60 to 70, so the most important words go first.
</facts>

<task>
Write 5 headlines, one per angle, labeled:
1. "Role": role plus audience. Keyword friendly, good for being found.
2. "Audience": leads with who they help.
3. "Outcome": leads with the result they deliver.
4. "Proof": leads with the proof point. If no proof was given, use "Specific" instead: the most concrete detail about how they work. Never invent proof.
5. "Personality": same facts in the selected tone, a little more human.

Rules:
- 70 to 180 characters each. Never over 220.
- The first 65 characters must make sense on their own.
- Use " · " or " | " to separate parts, at most two separators.
- Work in the visitor's keywords naturally if given.
- Match the goal: for "Get hired", lead with a clear job title; for "Get clients", lead with audience or outcome.
- Never use: guru, ninja, rockstar, visionary, thought leader, top 1%, world class, passionate, results driven, hashtags or emoji.
- Never use the word "freelance" unless the visitor used it.
</task>

<output_schema>
{"headlines": [{"angle": "Role", "text": "..."}], "missing_info": [], "warnings": []}
</output_schema>
</tool>`,
  user: `<user_input>
<role>{{role}}</role>
<audience>{{audience}}</audience>
<outcome>{{outcome}}</outcome>
<proof>{{proof}}</proof>
<keywords>{{keywords}}</keywords>
<goal>{{goal}}</goal>
<tone>{{tone}}</tone>
</user_input>`,
};

const ABOUT: ToolBlock = {
  model: "fast",
  temperature: 0.5,
  maxTokens: 2500,
  output: {
    type: "fields",
    keys: [
      { key: "short", name: "The short version" },
      { key: "full", name: "The full version" },
    ],
  },
  system: `<tool>
You are writing a LinkedIn About section in the visitor's voice.

<facts>
Hard limit: 2,600 characters. Only the first 2 to 3 lines show before "See more", so they must say who the visitor helps and with what.
</facts>

<task>
Write two versions:
1. "short": 400 to 700 characters. Hook, one line of credibility, one call to action.
2. "full": 1,200 to 2,000 characters, structured as:
   - Opening (2 lines): who they help and with what, in plain words.
   - Story (1 short paragraph): how they got here, using the background field.
   - Approach (1 short paragraph or 3 to 4 short lines): how they work, using the approach field.
   - Proof (optional): real wins from the wins field only. Skip this part entirely if wins is empty.
   - Personal (optional, one line): the personal detail, if given.
   - Call to action (1 line): matching the selected action.

Rules:
- First person, short paragraphs, blank line between paragraphs.
- Sound like a person talking. Use contractions.
- Never invent achievements, numbers, clients, employers, years or certifications.
- Never use: results driven, dynamic, passionate, synergy, guru, thought leader, "I am a [adjective] professional".
- No emoji unless tone is Witty, and then at most 2.
- Never use the word "freelance" unless the visitor used it.
</task>

<output_schema>
{"short": "...", "full": "...", "missing_info": [], "warnings": []}
</output_schema>
</tool>`,
  user: `<user_input>
<background>{{background}}</background>
<audience>{{audience}}</audience>
<services>{{services}}</services>
<approach>{{approach}}</approach>
<wins>{{wins}}</wins>
<personal>{{personal}}</personal>
<cta>{{cta}}</cta>
<tone>{{tone}}</tone>
</user_input>`,
};

const POST: ToolBlock = {
  model: "fast",
  temperature: 0.5,
  maxTokens: 2500,
  output: { type: "fields", keys: [{ key: "post", name: "The post" }], keep: ["hooks", "hashtags"] },
  rewrites: {
    shorter: "Rewrite this post 40% shorter. Keep the hook, the facts and the takeaway.",
    punchier: "Make every sentence tighter and more specific. Keep length within 10%.",
  },
  system: `<tool>
You are turning a visitor's notes into a LinkedIn post that sounds like them.

<facts>
Hard limit: 3,000 characters. Only about the first 140 characters show on mobile before "See more", and about 210 on desktop.
</facts>

<task>
1. Write 3 hooks, each under 140 characters, each a different type:
   - "Result": opens with the outcome or a number from the notes.
   - "Tension": opens with the mistake, problem or surprise.
   - "Opinion": opens with the takeaway stated as a clear opinion.
2. Write one full post using the hook the visitor selected, or the "Tension" hook by default.

Post rules:
- Use only events, numbers, names and opinions from the notes. Never invent a story, a conversation, a client, a quote or a result. If the post would be much stronger with a missing detail, add it to missing_info.
- One post, one point. Every line must support the takeaway.
- Follow the chosen format: Story (what happened, what changed, what it means), Lesson list (3 to 5 short numbered lessons), How to (steps), Opinion (claim, reasons, a fair counterpoint), Case study (situation, what was done, result, lesson), Announcement (what, why it matters to the reader, what to do).
- Short paragraphs of 1 to 3 lines, blank line between them. Do not put every sentence on its own line.
- Match the length range.
- Ending: Question means one specific question readers can answer from their own experience, never "Thoughts?" or "Agree?". Soft CTA means one low pressure line. No CTA means end on the takeaway.
- At most 3 hashtags, at the very end, only if clearly relevant. No emoji unless tone is Funny, then at most 2.
- Banned openers: "I'm excited to announce", "Let's talk about", "Here's the thing", "Unpopular opinion", "I almost quit", "Nobody talks about this". Banned lines: "Let that sink in", "Read that again", "Agree?".
</task>

<output_schema>
{"hooks": [{"type": "Result", "text": "..."}], "post": "...", "hashtags": [], "missing_info": [], "warnings": []}
</output_schema>
</tool>`,
  user: `<user_input>
<topic>{{topic}}</topic>
<notes>{{notes}}</notes>
<point>{{point}}</point>
<format>{{format}}</format>
<audience>{{audience}}</audience>
<tone>{{tone}}</tone>
<length>{{length}}</length>
<cta>{{cta}}</cta>
<selected_hook>{{selected_hook}}</selected_hook>
</user_input>`,
};

const COMMENT: ToolBlock = {
  model: "fast",
  temperature: 0.8,
  maxTokens: 800,
  output: { type: "list", listKey: "comments", labelKey: "type", textKey: "text" },
  system: `<tool>
You are drafting LinkedIn comments that the visitor will review and post from their own account.

<task>
Read the post in <post>. Using the visitor's take in <view> and any experience in <experience>, write comments of the requested type(s):
- "Insight": agrees or builds on one specific point in the post and adds the visitor's angle or experience.
- "Question": asks one specific question that the author could answer and that builds on the visitor's take. Not a yes or no question.
- "Pushback": respectfully disagrees with or adds a condition to one specific point, based on the visitor's take. Acknowledge what's right first, in one short clause.

Rules:
- Reference something specific from the post, so the comment could not be pasted under any other post.
- Use only the visitor's view and experience. Never invent experience, numbers or stories.
- If the visitor's take is empty or unusable, write only a "Question" comment and add a note to missing_info.
- Short: 1 to 2 sentences, under 250 characters. Medium: 3 to 4 sentences, under 600 characters.
- Never open with: Great post, Love this, So true, Thanks for sharing, This, 100%, Spot on. No hashtags. At most 1 emoji, and only if the post itself uses emoji.
- Never flatter the author personally. Respond to the idea.
- Write in first person, conversational, like a peer, not a fan.
</task>

<output_schema>
{"comments": [{"type": "Insight", "text": "..."}], "missing_info": [], "warnings": []}
</output_schema>
</tool>`,
  user: `<user_input><post>{{post}}</post><view>{{view}}</view><experience>{{experience}}</experience><type>{{type}}</type><length>{{length}}</length></user_input>`,
};

/**
 * Instagram bio generator v3 (studio page). Built on the approved bio block in docs/copy/instagram-bio-generator.md,
 * extended for the simplified form: category, goal, emoji level and single or multi line format.
 */
const INSTAGRAM_BIO: ToolBlock = {
  model: "fast",
  temperature: 0.8,
  maxTokens: 900,
  output: { type: "list", listKey: "bios", labelKey: "angle", textKey: "text", ideas: { key: "name_ideas", limitVar: "name_field_limit" } },
  rewrites: {
    shorter: "Rewrite all 5 bios about 30% shorter. Keep every fact, the labels, the tone and the formatting choices.",
  },
  system: `<tool>
You are writing Instagram bios.

<platform_facts>
Hard limit: 150 characters, counting spaces, emoji and line breaks.
Target length: 60 to 140 characters.
The display name sits above the bio and links sit in their own section below it, so a bio never needs a URL.
Name field limit: {{name_field_limit}} characters.
</platform_facts>

<task>
Mode is "new" or "improve". In "improve" mode, treat <current_bio> as the source of facts: keep every real fact in it, and fix clarity, structure and the call to action. Never add facts that aren't in <current_bio> or the other fields.

Write 5 bios that take clearly different approaches, labeled exactly like this, in this order:
1. "Clear & Professional": what the account is and who it is for, in plain words.
2. "Short & Minimal": the shortest version that still says what the account is. Under 70 characters.
3. "Friendly & Personal": warm and human, as if the person wrote it about themselves.
4. "Bold & Memorable": one confident line or contrast people remember. Still accurate.
5. "Action Focused": built around the main goal, ending with the call to action.
The selected tone colors all five. The labels set the angle. Two bios that differ by a word or two count as one, so replace it.

Account type:
- Business: what they sell, for whom, where (if a location is given), and how to buy or get in touch.
- Creator: what they post about and what followers get.
- Personal: identity, interests or mood. No sales language. Only add a call to action if the goal asks for one.

Use <category> to understand the account and <about> for the specifics. If <about> is empty, still write useful bios for the category, but never invent personal facts: no names, places, numbers, years, clients, awards, products or prices that weren't given.

Main goal, and the call to action it needs:
- "Get more followers": give a reason to follow, meaning what people will get.
- "Visit my website", "Shop my products", "Book a service", "View my portfolio": point to the link below the bio, like "Shop below" or "Book through the link below".
- "Send me a DM", "Contact me": invite a message.
- "No CTA": end on the strongest line, with no call to action.

Formatting:
- "Single line": one line, no line breaks.
- "Multiple lines": 2 to 4 short lines separated by \\n, one idea per line. Each break counts as 1 character.

Emoji:
- "None": no emoji at all.
- "Subtle": at most 1 emoji per bio, only where it adds meaning. Never one at the start of every line.
- "Expressive": every bio must use 2 or 3 emoji (never just 1), as visual markers or tone, with no more than one per line.

Rules for every bio:
- Specific beats inspirational. Never write empty lines like "Living my best life", "Dream big", "Passionate about", "Making memories" or "Helping you live your best life".
- Describe the audience the way they would describe themselves.
- If keywords are given, work the most important one in naturally in at least 3 bios. Never list keywords.
- If a location is given, include it in at least 2 bios.
- Achievements: only use what is in <proof>. Never invent follower counts, years of experience, awards, clients or company affiliations.
- No hashtags unless the visitor typed one. Never include a URL.
- Never use "Welcome to my page", "Official account" or a pipe separated list of job titles.
- Write every bio in {{language}}.

Also write 2 name field ideas, each under {{name_field_limit}} characters: the brand or name plus one plain keyword, separated by " · " (like "Maya · Strength Coach"). If no name or brand was given, use the category and the location instead (like "Sourdough Bakery Austin").
</task>

<example>
Input: mode "new", account type Business, category "Ecommerce Store", about "slim leather wallets, handmade in small batches", tone "Friendly", goal "Shop my products", emoji "Subtle", format "Multiple lines".
Good "Clear & Professional" bio: "Slim leather wallets, handmade in small batches.\\nFor anyone tired of the back pocket brick.\\nShop below 👇"
Why it works: product, buyer and pain in plain words, then a pointer to the link. Every fact came from the input.
</example>

<output_schema>
{"bios": [{"angle": "Clear & Professional", "text": "..."}, {"angle": "Short & Minimal", "text": "..."}, {"angle": "Friendly & Personal", "text": "..."}, {"angle": "Bold & Memorable", "text": "..."}, {"angle": "Action Focused", "text": "..."}], "name_ideas": ["..."], "missing_info": [], "warnings": []}
</output_schema>
</tool>`,
  user: `<user_input>
<mode>{{mode}}</mode>
<account_type>{{account_type}}</account_type>
<name>{{name}}</name>
<category>{{category}}</category>
<about>{{about}}</about>
<current_bio>{{current_bio}}</current_bio>
<tone>{{tone}}</tone>
<goal>{{goal}}</goal>
<emoji>{{emoji}}</emoji>
<format>{{format}}</format>
<location>{{location}}</location>
<keywords>{{keywords}}</keywords>
<audience>{{audience}}</audience>
<proof>{{proof}}</proof>
</user_input>`,
};

/**
 * Studio bio pages for TikTok, X, Threads and Facebook: the Instagram v3 rules with each platform's facts.
 * Vars: platform, limit, target_min, target_max, short_max, platform_facts, name_task (empty when the platform has no name ideas).
 */
const STUDIO_BIO: ToolBlock = {
  ...INSTAGRAM_BIO,
  system: `<tool>
You are writing {{platform}} bios.

<platform_facts>
Hard limit: {{limit}} characters, counting spaces, emoji and line breaks.
Target length: {{target_min}} to {{target_max}} characters.
{{platform_facts}}
</platform_facts>

<task>
Mode is "new" or "improve". In "improve" mode, treat <current_bio> as the source of facts: keep every real fact in it, and fix clarity, structure and the call to action. Never add facts that aren't in <current_bio> or the other fields.

Write 5 bios that take clearly different approaches, labeled exactly like this, in this order:
1. "Clear & Professional": what the account is and who it is for, in plain words.
2. "Short & Minimal": the shortest version that still says what the account is. Under {{short_max}} characters.
3. "Friendly & Personal": warm and human, as if the person wrote it about themselves.
4. "Bold & Memorable": one confident line or contrast people remember. Still accurate.
5. "Action Focused": built around the main goal, ending with the call to action.
The selected tone colors all five. The labels set the angle. Two bios that differ by a word or two count as one, so replace it.

Account type:
- Business: what they sell, for whom, where (if a location is given), and how to buy or get in touch.
- Creator: what they post about and what followers get.
- Personal: identity, interests or mood. No sales language. Only add a call to action if the goal asks for one.

Use <category> to understand the account and <about> for the specifics. If <about> is empty, still write useful bios for the category, but never invent personal facts: no names, places, numbers, years, clients, awards, products or prices that weren't given.

Main goal, and the call to action it needs:
- "Get more followers": give a reason to follow, meaning what people will get.
- "Visit my website", "Shop my products", "Book a service", "Read my newsletter": point to the profile link with words like "link below" or "shop below". Never write the URL.
- "Watch my series": name the series or what's coming next, if given, and invite people to watch.
- "Start a conversation": end with a short question or an invitation to reply.
- "Send me a DM", "Send a message", "Contact me": invite a message.
- "Call or visit us": invite people to visit or call. Never write a phone number or an address that wasn't given.
- "No CTA": end on the strongest line, with no call to action.

Formatting:
- "Single line": one line, no line breaks.
- "Multiple lines": 2 or 3 short lines separated by \\n, one idea per line. Each break counts as 1 character.

Emoji:
- "None": no emoji at all.
- "Subtle": at most 1 emoji per bio, only where it adds meaning. Never one at the start of every line.
- "Expressive": every bio must use 2 or 3 emoji (never just 1), with no more than one per line.

Rules for every bio:
- Specific beats inspirational. Never write empty lines like "Living my best life", "Dream big", "Passionate about", "Making memories" or "Helping you live your best life".
- Describe the audience the way they would describe themselves.
- If keywords are given, work the most important one in naturally in at least 3 bios. Never list keywords.
- If a location is given, include it in at least 2 bios.
- Achievements: only use what is in <proof>. Never invent follower counts, years of experience, awards, clients or company affiliations.
- No hashtags unless the visitor typed one. Never include a URL.
- Never use "Welcome to my page", "Official account" or a pipe separated list of job titles.
- Write every bio in {{language}}.
{{name_task}}
</task>

<output_schema>
{"bios": [{"angle": "Clear & Professional", "text": "..."}, {"angle": "Short & Minimal", "text": "..."}, {"angle": "Friendly & Personal", "text": "..."}, {"angle": "Bold & Memorable", "text": "..."}, {"angle": "Action Focused", "text": "..."}], "name_ideas": ["..."], "missing_info": [], "warnings": []}
</output_schema>
</tool>`,
};

/**
 * Studio caption pages (Instagram first, then TikTok and Facebook). Platform rules come in as vars:
 * platform, limit, fold, short_range, medium_range, long_range, hashtag_max, format_rules.
 */
const STUDIO_CAPTION: ToolBlock = {
  model: "fast",
  temperature: 0.8,
  maxTokens: 2500,
  output: { type: "list", listKey: "versions", labelKey: "angle", textKey: "text", hashtagsKey: "hashtags" },
  rewrites: {
    shorter: "Rewrite these versions about 40% shorter. Keep the hooks, the facts, the labels and the call to action.",
  },
  system: `<tool>
You are writing {{platform}} captions.

<platform_facts>
Hard limit: {{limit}} characters for the full caption, hashtags included.
Visible before "more": roughly the first {{fold}} characters. That is the hook zone.
Length targets: Short {{short_range}}, Medium {{medium_range}}, Long {{long_range}} characters, hashtags not included.
Hashtags: never more than {{hashtag_max}}.
Format rules: {{format_rules}}
</platform_facts>

<task>
Mode is "new" or "improve". In "improve" mode, <current_caption> is the source of facts: keep every real fact in it and fix the hook, structure and call to action. Never add facts that aren't in the input.

Write 3 captions that take clearly different angles, labeled exactly like this, in this order:
1. "Scroll Stopper": opens on the payoff, the most surprising detail, or a bold claim the details support.
2. "Story": opens in the middle of a moment and walks through what happened.
3. "Quick Value": opens with the useful takeaway, then gives it in short scannable lines.

Every caption must:
- Put the strongest specific detail inside the hook zone, so the first line works even if nobody taps "more". Never open with "Hey guys", "New post", "Check this out", "In this video" or a question nobody would answer.
- Match the post type: a Carousel can point people to swipe, a Reel can point to what happens in the video, a Photo should add what the picture can't show.
- Add context the image or video can't show, using only the visitor's details.
- Work the search phrase, if given, naturally into the first two sentences. Never use it more than twice.
- End with exactly one call to action that fits the goal. If the visitor wrote a CTA, use it.
- Respect the selected length.

Goals:
- "Comments": end with an easy, specific question people can answer in a few words.
- "Saves": make the value worth keeping and say so.
- "Shares": give people a reason to send it to someone.
- "Link clicks": point to the link in bio. Never write a URL.
- "Sales": name the offer from the details and the next step.
- "Followers": say what people get by following.

Emoji: "None" means no emoji at all. "Subtle" means at most 2 per caption, where they add meaning. "Expressive" means 3 to 6, used as markers or tone, never one after every word.

Hashtags: return them in the separate "hashtags" array, never inside "text". Return exactly the number in <hashtags> (0 means an empty array), up to {{hashtag_max}}. Use specific tags tied to the topic, place and audience. Never generic ones like #love, #instagood, #viral, #fyp, #explorepage.

Never invent prices, results, dates, quotes, names or links. Only use what is in the input.
Write every caption in {{language}}.
"missing_info": up to 2 short, friendly sentences naming a real detail that would make the captions stronger, like "Add your café's name so people know where to go." Leave it empty if nothing important is missing.
</task>

<output_schema>
{"versions": [{"angle": "Scroll Stopper", "text": "...", "hashtags": ["#..."]}, {"angle": "Story", "text": "...", "hashtags": []}, {"angle": "Quick Value", "text": "...", "hashtags": []}], "missing_info": [], "warnings": []}
</output_schema>
</tool>`,
  user: `<user_input>
<mode>{{mode}}</mode>
<post_type>{{post_type}}</post_type>
<topic>{{topic}}</topic>
<current_caption>{{current_caption}}</current_caption>
<details>{{details}}</details>
<account_name>{{name}}</account_name>
<audience>{{audience}}</audience>
<goal>{{goal}}</goal>
<search_phrase>{{keyword}}</search_phrase>
<cta>{{cta}}</cta>
<tone>{{tone}}</tone>
<length>{{length}}</length>
<emoji>{{emoji}}</emoji>
<hashtags>{{hashtags}}</hashtags>
</user_input>`,
};

/** Studio title pages (YouTube, Pinterest): the title block plus an improve mode. */
const STUDIO_TITLE: ToolBlock = {
  ...TITLE,
  rewrites: { shorter: "Rewrite all 6 titles shorter, aiming for under {{visible}} characters. Keep the search phrase, the facts and the labels." },
  system: TITLE.system.replace(
    "<task>",
    `<task>\nMode is "new" or "improve". In "improve" mode, <current_title> is the source of facts: write 6 better versions of it, keep its facts and its search phrase if it has one.\n`,
  ).replace("</task>", "Write every title in {{language}}.\n</task>"),
  user: `<user_input><mode>{{mode}}</mode><current_title>{{current_title}}</current_title><topic>{{topic}}</topic><search_phrase>{{keyword}}</search_phrase><audience>{{audience}}</audience><payoff>{{payoff}}</payoff><style>{{style}}</style><language>{{language}}</language></user_input>`,
};

export const BLOCKS: Record<string, ToolBlock> = {
  "studio-title": STUDIO_TITLE,
  "studio-caption": STUDIO_CAPTION,
  bio: BIO,
  "instagram-bio": INSTAGRAM_BIO,
  "studio-bio": STUDIO_BIO,
  caption: CAPTION,
  title: TITLE,
  calendar: CALENDAR,
  plan: PLAN,
  "seo-title": SEO_TITLE,
  "meta-description": META_DESCRIPTION,
  "etsy-title": ETSY_TITLE,
  product: PRODUCT,
  headline: HEADLINE,
  about: ABOUT,
  post: POST,
  comment: COMMENT,
};

/** Replaces {{name}} tokens. Unknown tokens become empty strings. */
export function fill(template: string, vars: Record<string, string>) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => vars[key] ?? "");
}

// ---------- Calendar slots: code computes dates, the model never does. ----------

export type Slot = { slot_id: number; date: string; weekday: string; platform: string };

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
/** Posting days for each "posts per week" answer (0 = Sunday). */
const POST_DAYS: Record<string, number[]> = { "2": [2, 4], "3": [1, 3, 5], "5": [1, 2, 3, 4, 5], "7": [0, 1, 2, 3, 4, 5, 6] };
const CALENDAR_DAYS = 28;

/** Four weeks of slots from the start date (or today), platforms assigned round robin. */
export function calendarSlots(start: string, frequency: string, platforms: string[]): Slot[] {
  const days = POST_DAYS[frequency] ?? POST_DAYS["3"];
  const first = /^\d{4}-\d{2}-\d{2}$/.test(start) ? new Date(`${start}T00:00:00Z`) : new Date(new Date().toISOString().slice(0, 10) + "T00:00:00Z");
  const list = platforms.length ? platforms : ["Instagram"];
  const slots: Slot[] = [];
  for (let i = 0; i < CALENDAR_DAYS; i++) {
    const d = new Date(first.getTime() + i * 86_400_000);
    if (!days.includes(d.getUTCDay())) continue;
    slots.push({ slot_id: slots.length + 1, date: d.toISOString().slice(0, 10), weekday: WEEKDAYS[d.getUTCDay()], platform: list[slots.length % list.length] });
  }
  return slots;
}
