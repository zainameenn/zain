# Instagram Bio Generator: page copy v2

This file replaces the Instagram Bio Generator copy in docs/tools-spec.md. Everything in sections 1 to 8 is visible page copy. Copy it verbatim. Section 9 is the design spec. Section 10 is the updated backend prompt.

All examples are illustrative. Character counts on example cards are computed by code, not typed.

---

## 1. SEO fields

| Field | Copy |
| --- | --- |
| URL | /tools/instagram-bio-generator |
| Meta title | Instagram Bio Generator: Free AI Bios Under 150 Characters |
| Meta description | Use this free Instagram bio generator to write 5 bios from your real details, see them on a live profile preview, and copy one that fits 150 characters. |
| H1 | Free AI Instagram Bio Generator |
| Primary keyword | instagram bio generator |
| Supporting phrases | AI Instagram bio generator, Instagram bio ideas, Instagram bio examples, Instagram bio for business, what to put in your Instagram bio, Instagram bio character limit, aesthetic Instagram bio, funny Instagram bio |

---

## 2. Hero

**H1:** Free AI Instagram Bio Generator

**Description:** This Instagram bio generator writes five bios from a few quick answers, then shows them on a live profile so you can see exactly how they'll look. Every bio fits Instagram's 150 characters. None of them invent achievements you don't have.

**Access note:** Free to use. Fair use limits apply.

---

## 3. Tool workspace

**Mode tabs (above the form):** Write a new bio · Improve my current bio

| Field | Label | Placeholder or options | Type |
| --- | --- | --- | --- |
| account_type | Account type | Creator / Business / Personal | Chips, required, default Business |
| who | What do you do or sell? | Sourdough bakery | Text, required |
| audience | Who is it for? | Busy families who want real bread | Text, optional, hint: "This one makes your bio much sharper" |
| current_bio | Paste your current bio | (only in Improve mode) | Textarea, required in Improve mode |
| keywords | Words people search to find you (optional) | sourdough, bakery | Text |
| location | Location (optional, great for local businesses) | Austin, TX | Text |
| proof | Anything real worth bragging about? (optional) | Baking since 2019, 4.9 stars on Google | Text |
| action | What should visitors do next? | Follow / DM me / Tap my link / Book / Shop / Nothing | Dropdown, default Tap my link |
| tone | Vibe | Friendly / Funny / Bold / Professional / Minimal / Aesthetic | Chips, default Friendly |
| emoji | Use emoji | On | Toggle |
| line_breaks | Use line breaks | On | Toggle |
| language | Language | English, Spanish, Portuguese, French, German, Italian, Hindi, Urdu, Arabic, Indonesian | Dropdown, default English |

**Main button:** Write my Instagram bios
**Secondary button:** Try an example

**Note under the button:** AI can get things wrong. Read your bio before you post it, because it goes out under your name.

**Results heading (plain text, not an H2):** Your Instagram bios

**Each result card:** angle label (Clear, Proof, Personality, Action, Minimal), the bio with real line breaks, a live counter "118 / 150", buttons: Preview · Copy · Edit. Clicking Preview puts that bio on the profile mockup.

**Name field ideas (under the cards):** "Bonus: ideas for your Name field" with 2 suggestions and their counts out of 30. Small helper text: "Your name field is searchable, so a keyword here helps people find you."

**Below the cards:** Write 5 more · Make them shorter · Make them funnier

**Soft tip (from missing_info):** "Add a real number to the proof field and your Proof bio gets a lot stronger."

**Error state:** Something broke on our side. Your answers are still here, so hit the button again.

---

## 4. Page sections (below the tool)

### H2: How to use the Instagram bio generator

Using it takes about a minute. Writing a good bio from scratch takes most people an afternoon and three existential crises.

1. **Pick your account type.** Creator, business or personal. A bakery and a fitness coach need different bios, and the tool writes for each one differently.
2. **Say what you do and who it's for.** Use the words your audience would use. "Help small businesses grow" gets you mush. "Fresh sourdough for busy families" gets you a bio.
3. **Add the extras that make it yours.** Search keywords, your city, one real proof point and the next step you want visitors to take. All optional, all worth it.
4. **Preview, tweak, paste.** Click Preview to see each bio on a real looking profile. Pick one, copy it, then in Instagram go to your profile, tap Edit profile, and paste it into the Bio field.

Already have a bio? Switch to **Improve my current bio**, paste it in, and the tool rewrites it five ways while keeping your facts.

### H2: Instagram bio examples for every kind of account

Here are six bios the tool wrote from the inputs shown. Click "Use this example" on any card to load its inputs into the form and make it your own.

*(Render as 6 cards. Each card: account type badge, the input in small text, the bio in a mini profile, counter, a one line "Why it works", and a "Use this example" button. Label the section "Illustrative examples".)*

**1. Local bakery (Business)**
Input: sourdough bakery · busy families · Austin, TX · Tap my link · Friendly
Bio: "Sourdough baked fresh every morning in Austin 🍞
Preorder by 9pm for tomorrow
Order link below 👇"
Why it works: says what, where and how to buy in three short lines. The city doubles as a search keyword.

**2. Fitness coach (Creator)**
Input: online strength coach · busy moms · free 4 week plan · DM me · Bold
Bio: "Strength training for moms with 30 minutes and zero patience 💪
Home workouts, no guilt
DM START for the free plan"
Why it works: the audience sees themselves in line one, and the DM keyword makes replying effortless.

**3. Online shop (Business)**
Input: large felt desk mats · people who work long hours at a desk · Shop · Friendly
Bio: "Big, soft desk mats for long work days 🖥️
Printed to order, made to make Mondays bearable
Shop the collection below"
Why it works: product first, buyer second, a little personality third. Nothing in it needs a fact check.

**4. Brand designer (Business)**
Input: brand designer · coffee shops · 40 cafés branded · Book · Professional
Bio: "Brand designer for coffee shops ☕
40 cafés branded and counting
Book a free intro call below"
Why it works: a niche this narrow attracts exactly the right DMs, and the proof is one specific number.

**5. SaaS founder (Personal)**
Input: building a booking app for dental clinics · founders and clinic owners · Follow · Friendly
Bio: "Building a booking app for dental clinics
Sharing what works and what flopped along the way"
Why it works: the honest second line is the reason to follow. People love a build in public story with real faceplants.

**6. Personal (Aesthetic)**
Input: film photography · personal account · Nothing · Aesthetic · emoji on
Bio: "slow mornings, film photos, too much coffee ☁️"
Why it works: personal accounts don't need a pitch. A mood in one line is plenty.

### H2: What to put in your Instagram bio

Your bio has one job: tell the right stranger, in about two seconds, why they should follow you.

That's not much time. Visitors scroll past profiles with the attention span of Dory from Finding Nemo. So here's the formula that works for almost everyone:

1. **What you do or sell,** in your audience's words.
2. **Who it's for,** as specific as you can stand.
3. **One real proof point,** if you have one.
4. **One next step:** follow, DM, tap the link, book.

**YOU DON'T NEED ALL FOUR.** Two done well beats four crammed into 150 characters like clothes in a carry on.

### H2: Your bio is one part of your profile, so use every part

Most people pour everything into the 150 characters and ignore the rest of the profile. That's like decorating one wall and leaving the room empty. Each part has its own job:

| Profile part | Its job | Quick tip |
| --- | --- | --- |
| Username | How people find and tag you | Short, easy to spell, easy to say out loud |
| Name field | Shows in bold above your bio, and it's searchable | Add a keyword: "Maya · Strength Coach" |
| Bio | Gives people a reason to follow | Use the formula above |
| Links | Sends people somewhere useful | You can add up to 5, and the first one shows on your profile |
| Category and contact buttons | Quick trust and an easy way to reach you | Available on business and creator accounts, and they don't use bio characters |
| Highlights | Proof, FAQs and the stuff that won't fit | Reviews, menu, prices, behind the scenes |

Here's the trick most people miss: **because the name field, links and buttons do their own jobs, your bio is free to just be good.**

### H2: Instagram bio ideas for every vibe

Stuck on a style? Steal one of these fill in the blank formulas. Swap the brackets for your own details, or pick the matching vibe in the tool.

**Funny**
- "[What you do]. Professionally. [Funny honest admission]."
  e.g. "I fix bad resumes. Professionally. Mine still needs work."
- "Here for [thing], stayed for [other thing]."

**Aesthetic and minimal**
- "[three small things you love], [one feeling] [one emoji]"
  e.g. "linen, sourdough, slow sundays 🌾"
- "[city] · [what you make] · [one word mood]"

**Professional**
- "[Role] for [audience] · [result or proof] · [next step]"
  e.g. "Bookkeeper for restaurants · Clean books every month · Book a free review"

**Short**
- "[What you do] for [who]." That's it. Sometimes the shortest bio is the loudest.
  e.g. "Wedding photos for couples who hate posing."

### H2: Do keywords in your Instagram bio help you get found?

Yes, they help. Instagram's own explanation of search says the text people type is the biggest signal, and that Instagram matches it against usernames, bios, captions, hashtags and places. Its advice was to use a relevant handle and name, and to add keywords and your location to your bio. *(Link "Instagram's own explanation of search" to https://blog.hootsuite.com/instagram-search, which summarizes Instagram's August 2021 blog post.)*

So if you're a dentist in Lahore, say "dentist" and "Lahore" somewhere in your name or bio. Plain words beat clever ones here.

**BUT DON'T STUFF IT.** "Dentist Lahore best dentist teeth whitening dentist" reads like a ransom note, and nobody follows a ransom note.

### H2: Instagram bio character limit and formatting

Instagram gives you **150 characters** for your bio. Spaces, emoji and line breaks all count, so a four line bio spends three characters just on breaks. The counter on every result shows the real total, so you'll never get the dreaded "too long" error.

A few formatting rules worth knowing:

1. **Line breaks make bios scannable.** This tool keeps them when you copy, so they paste straight into Instagram.
2. **@mentions in your bio are clickable.** Use them to point to a second account, like your shop or your team.
3. **Hashtags in your bio are clickable too,** but they send visitors away to a page full of other people's posts. Only use your own branded hashtag, if any.
4. **Links typed into the bio text don't work.** Put links in the Links section instead, then point to them with "link below".

### H2: Instagram bio mistakes that cost you followers

1. **The title stack.** "Entrepreneur | Creator | Visionary" tells people about as much as Jon Snow knew. Swap titles for a result: "I help bakeries sell out before noon."
2. **Writing about you instead of them.** Visitors don't care that you're "passionate". They care what's in it for them.
3. **No next step.** A bio without an action is a shop window with the door painted shut.
4. **Copying a template word for word.** "Living my best life ✨" is on a few million profiles. Use the formulas above as a starting point, not the finish line.
5. **Setting it and forgetting it.** New offer, new launch, new city? Update the bio. It takes ten seconds and it's the first thing every visitor reads.

### H2: Frequently asked questions

**Is this Instagram bio generator free?**
Yes. Free to use. Fair use limits apply.

**How many characters can an Instagram bio have?**
150, including spaces, emoji and line breaks. Every bio this tool writes fits, and the counter shows the exact total.

**What should I put in my Instagram bio for a business?**
What you sell, who it's for, your city if you're local, one reason to trust you, and one next step. Use the contact buttons and links for everything else.

**Will the AI make things up about me?**
No. It only uses what you type. If a bio would be stronger with a number or a result, it tells you what to add instead of inventing one.

**Can I put a link in my Instagram bio?**
Not in the bio text itself, because typed links aren't clickable there. Add up to 5 links in the Links section of your profile, and use your bio to point to them.

**Should I use hashtags in my Instagram bio?**
Usually not. They're clickable, so they pull visitors away from your profile. The exception is your own branded hashtag.

**How do I add line breaks to my Instagram bio?**
Turn on line breaks in the tool, then copy your bio. The breaks paste straight into Instagram's Bio field.

**Can it write bios in other languages?**
Yes. Pick your language from the dropdown and all five bios come out in it.

**Can it improve the bio I already have?**
Yes. Switch to "Improve my current bio", paste it in, and you'll get five rewrites that keep your facts.

---

## 5. Service CTA panel

**Heading:** Your bio gets the click. Your content has to keep them.

**Copy:** I help SaaS and service businesses turn social profiles into a steady source of leads. Bio, content plan and posting, handled.

**Button:** See how I run social media → (keep the existing social media service link)

---

## 6. Continue with these tools

- **Instagram Caption Generator:** write captions that match your new bio.
- **TikTok Bio Generator:** say the same thing in 80 characters.
- **Threads Bio Generator:** a warmer version for your Threads profile.
- **LinkedIn Headline Generator:** your bio's grown up cousin.
- **Social Media Content Calendar Generator:** plan a month of posts in one go.
- Link: See all free marketing tools → /tools

---

## 7. Copy notes

- The FAQ JSON-LD must match section 4's FAQs exactly.
- The first H2 below the tool is "How to use the Instagram bio generator".
- No em or en dashes anywhere. No "freelance".

---

## 8. Why no real celebrity or brand screenshots

The page uses illustrative profiles, not screenshots of real people or brands. Real bios change often, so screenshots go stale, and using other people's photos and brand assets on a commercial page invites rights problems. The live preview with illustrative profiles shows the same thing, and it's interactive.

---

## 9. Design spec: the right side (live profile preview)

**Goal:** the results panel is never empty. Before the visitor generates anything, it shows a lively demo. After they generate, it becomes a live preview of their own bio.

**The component: `ProfilePreview`**, a phone frame mockup of an Instagram style profile, built with HTML and CSS only (no images, no heavy libraries, no real Instagram logos or icons):

- Avatar: a circle with a soft gradient ring and the account's initials.
- Username row, a "Follow" and a "Message" button (decorative only).
- Three stat counters (posts, followers, following).
- Name field in bold, then the bio with real line breaks, then a link line like "🔗 yoursite.com".
- Five highlight bubbles with short labels.
- A 3 by 3 grid of soft colored tiles using the site's palette, as stand ins for posts.

**State 1, demo mode (before generating):**
- Cycles through the 6 illustrative examples from section 4, about every 5 seconds.
- Each switch fades the profile, then types the bio out character by character while a small counter ticks up to its total, like "112 / 150".
- A small pill above the phone reads "Live preview" with a gently pulsing dot.
- Hovering or focusing the preview pauses the cycle.
- Tiny caption under the phone: "Illustrative profiles. Yours shows up here."

**State 2, live mode (after generating):**
- The first generated bio appears on the profile automatically.
- Clicking Preview on any result card swaps that bio in, with the typing animation.
- The first Name field idea fills the bold name line.
- Editing a bio in a card updates the preview live.
- A small toggle switches between light and dark profile backgrounds.

**Layout:**
- Desktop: form on the left, results cards and the preview on the right. Make the preview sticky so it stays visible while the visitor scrolls through results.
- Mobile: form first, then result cards. The preview sits above the cards in a collapsible "See it on a profile" panel, open by default after the first generation.

**Rules:**
- Respect `prefers-reduced-motion`: no typing or cycling, just a static example.
- Use the site's existing colors, fonts, radius and shadows. Nothing new.
- Make the animation CSS and a small amount of client JS only. No animation library.
- The preview must not shift layout while typing. Reserve height for 4 lines of bio.
- Hide the decorative mockup from screen readers (`aria-hidden`), but keep a visually hidden text version of the currently shown bio.
- Build `ProfilePreview` so other platforms can reuse it later (TikTok, X, Threads, Facebook each get their own skin).

---

## 10. Updated backend prompt: bio family tool block

This replaces the bio family tool block. The new fields apply to all bio pages. Name ideas are returned only when `{{name_field_limit}}` is set (Instagram: 30). For other platforms, pass an empty value.

```text
<tool>
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
</tool>
```

**User message template:**

```text
<user_input>
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
<emoji>{{on_or_off}}</emoji>
<line_breaks>{{on_or_off}}</line_breaks>
</user_input>
```

The language goes into the system prompt's `{{language}}` slot, not the user message.

**Code notes:**
- Validate name ideas against `name_field_limit` with the same counting and retry logic as bios.
- "Make them shorter" and "Make them funnier" resend the current 5 bios with one line: "Rewrite all 5 bios about 30% shorter, keep every fact." or "Rewrite all 5 bios in the Funny vibe, keep every fact."
