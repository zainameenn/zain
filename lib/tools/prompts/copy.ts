import type { LibraryPrompt } from "./types";

// Prompt Library: Copywriting tools, Semrush style tools and Technical SEO generators.
// Word for word from the PDF; {field} placeholders removed.

export const COPY: Record<string, LibraryPrompt> = {
  "email-preheader-generator": {
    output: "text",
    what: "preheader",
    short: true,
    window: { min: 50, max: 90 },
    prompt: `TASK: Write one email preheader.

INPUTS
Subject line
What the email is about
Audience
Goal of the email
Tone
Language

LENGTH
50 to 90 characters, so most inboxes show it in full.

WHAT GOOD LOOKS LIKE
The preheader is the second half of the subject line. It must never repeat the subject. It answers the question the subject raises, adds the most concrete detail (what, when, how much, how long), or gives the reason to open now.
Examples of the idea: subject "Your March numbers are in", preheader "Two channels doubled, one quietly cost you money". Subject "We moved your call", preheader "New time is Thursday 3pm, same link as before".
No "View in browser", no "Hi there", no emoji unless the tone calls for one. Use only details from the inputs.

Return only the preheader.`,
  },

  "website-hero-headline-generator": {
    output: "json",
    short: true,
    prompt: `TASK: Write one hero headline and subheading for a homepage or landing page.

INPUTS
What the business or product is
Who it is for
The main problem it solves
The outcome customers get
What makes it different
Proof (optional)
Primary call to action
Tone
Language

WHAT GOOD LOOKS LIKE
A visitor should understand in five seconds what this is, who it is for and why it is better. Clarity first, cleverness second.
Headline: the outcome or the transformation for this audience, in their words. If the outcome alone is vague, combine it with what the product is ("Payroll for small restaurants, done in 10 minutes a week"). 30 to 70 characters.
Subheading: how it delivers that outcome and what makes it different, in one or two sentences, 80 to 180 characters. Name the product type here if the headline did not.
CTA button text: 2 to 4 words that describe what happens next ("Book a free audit", "Start my trial"), not "Submit" or "Learn more".
No invented numbers, customer counts or awards. No "Revolutionize", "All in one", "Next generation".

RETURN
JSON: {"headline": "...", "subheading": "...", "cta": "..."}`,
  },

  "saas-value-proposition-generator": {
    output: "text",
    what: "value proposition",
    short: true,
    window: { min: 120, max: 260 },
    prompt: `TASK: Write one SaaS value proposition.

INPUTS
Product
Target customer (role and company type)
The painful problem
How they solve it today
What the product does differently
Main outcome
Proof (optional)
Language

LENGTH
120 to 260 characters. One or two sentences.

WHAT GOOD LOOKS LIKE
A strong value proposition names the customer, the outcome they care about and why this product gets them there better than what they do today.
Structure guide: For [customer] who [problem], [product] [does what] so they [outcome], unlike [current alternative] which [its specific limitation]. Use it as a skeleton, then rewrite until it sounds like a person said it.
The outcome must be something the customer would say in a meeting ("close the books in two days"), not a feature ("automated reconciliation engine").
Use proof only if given. No buzzwords.

Return only the value proposition.`,
  },

  "changelog-entry-generator": {
    output: "json",
    short: true,
    prompt: `TASK: Write one changelog entry.

INPUTS
What changed (technical notes are fine)
Type (new feature, improvement, fix, removal)
Who it affects
How to use it or where to find it
Tone
Language

WHAT GOOD LOOKS LIKE
Customers read changelogs to answer one question: what is different for me? Translate the technical change into the user's benefit.
Title: what they can now do, or what now works, in plain words ("Export reports as CSV", "Fixed: calendar sync skipping recurring events").
Body: one or two sentences on what changed and why it helps, then how to use it or where to find it. If it is a fix, say what was broken and that it is now fixed, without blame or excuses.
No internal ticket numbers, code names or engineering jargon unless the audience is developers.

RETURN
JSON: {"title": "...", "type": "New|Improved|Fixed|Removed", "body": "..."}`,
  },

  "product-hunt-launch-copy-generator": {
    output: "json",
    prompt: `TASK: Write one set of Product Hunt launch copy.

INPUTS
Product name
What it does
Who it is for
The problem and why existing tools fall short
Key features (3 to 5)
What is free or the launch offer
Maker story (why they built it)
Language

WHAT GOOD LOOKS LIKE
Tagline: 30 to 60 characters, no period at the end. Say what it does and for whom, plainly. No superlatives, no hype, and do not repeat the product name. Product Hunt rejects over the top language.
Description: 180 to 260 characters. First sentence: what it is and who it is for. Then the two most useful capabilities and what is free. Do not repeat the tagline.
Maker comment: 600 to 1,500 characters. Start with a short, human hello and the real reason they built it, from the maker story. Then what it does in a few lines, what makes it different, the launch offer if any, and a specific question that invites feedback ("What would you want it to connect to next?"). Warm and honest, not salesy. Do not ask for upvotes.
Use only features, numbers and offers from the inputs.

RETURN
JSON: {"tagline": "...", "description": "...", "maker_comment": "..."}`,
  },

  "google-business-profile-description-generator": {
    output: "text",
    what: "description",
    window: { min: 600, max: 750 },
    prompt: `TASK: Write one Google Business Profile description.

INPUTS
Business name and category
Services or products
Service area or location
Who they serve
What sets them apart
History or mission (optional)
Credentials, years, certifications (optional)
Language

LENGTH
600 to 750 characters. Never over 750.

STRUCTURE
First 250 characters: what the business is, the main service and the location, plus the strongest reason to choose them. This part shows before "More" and must work alone.
Then: the full range of services in a natural sentence or two, who they serve, how they work, and the history or mission if given.
End with an informational line about how to get started (call, book online, visit), without a phone number or link.

GOOGLE RULES
No links or URLs. No phone numbers. No prices, discounts, sales or promotions. No emoji, no all caps, no gimmicky characters. No keyword stuffing or lists of cities. Nothing misleading. Use only credentials and facts from the inputs.

Return only the description.`,
  },

  "google-review-reply-generator": {
    output: "text",
    what: "reply",
    short: true,
    window: { min: 150, max: 500 },
    prompt: `TASK: Write one reply to a Google review.

INPUTS
Business name
The review text
Star rating
Reviewer first name (if shown)
What actually happened, from the business side (optional)
Who signs the reply
Language

LENGTH
150 to 500 characters.

WHAT GOOD LOOKS LIKE
Write for two readers: the reviewer and every future customer reading the reply.
4 to 5 stars: thank them by name, mention the specific thing they praised so it doesn't read like a template, and add one warm, natural line. Mention the service and area only if it sounds natural.
3 stars: thank them, acknowledge what fell short, and say what the business does about it.
1 to 2 stars: stay calm and professional. Acknowledge their experience without admitting legal fault, correct facts politely only if context was given, and invite them to continue offline with a contact route. Never argue, never reveal private customer details, never accuse them of lying.
Never offer refunds, discounts or compensation unless the context says so.
Sign off with the signer's name.

Return only the reply.`,
  },

  "llms-txt-generator": {
    output: "text",
    what: "llms.txt file content",
    prompt: `TASK: Write one llms.txt file for the site.

INPUTS
Site or brand name
What the business does and for whom
Important pages (title, URL, optional note), one per line
Lower priority pages (optional)
Language

FORMAT (llmstxt.org)
# Site or brand name
> One or two sentence summary: what the business does, who it serves and what the linked pages cover.
Optional short paragraph with any context an AI assistant needs to answer questions correctly (for example: which products exist, which regions are served, what the business does not do).
## Section name
- [Page title](https://full.url): one sentence on what this page answers.
## Optional
- [Page title](https://full.url): one sentence.

RULES
Group pages into 2 to 6 H2 sections named the way a visitor thinks (Services, Pricing, Guides, Case Studies, Support, About).
Each note says what question the page answers, in under 20 words. No marketing fluff.
Put blog archives, changelogs, legal pages and anything secondary under Optional.
Only use URLs from the input. Never invent a page or a URL.
No headings other than one H1 and the H2 sections.

Return only the file content.`,
  },

  "local-business-schema-generator": {
    output: "json",
    prompt: `TASK: Build one LocalBusiness JSON-LD block from the details given.

INPUTS
Business name
Business type
Address (street, city, region, postcode, country)
Phone
Website URL
Opening hours
Service area (optional)
Logo or photo URL (optional)
Price range (optional)
Social profile URLs (optional)
Language

RULES
Pick the most specific schema.org subtype that truly fits (Plumber, Dentist, Restaurant, HairSalon, AutoRepair, etc.). Use LocalBusiness if none fits exactly.
Split the address into PostalAddress fields. Use the two letter country code.
Convert hours into openingHoursSpecification objects, grouping days with the same hours. Use 24 hour time.
Format the phone in international format if the country is clear.
Use sameAs only for the social URLs given. Add areaServed only if a service area was given.
Use only the details given. Never add ratings, reviews, geo coordinates, founding dates or prices the user did not provide.
Omit any property that has no value. Never output empty strings or placeholders.

Return only the JSON object, starting with { and including "@context": "https://schema.org".`,
  },

  "product-schema-generator": {
    output: "json",
    prompt: `TASK: Build one Product JSON-LD block from the details given.

INPUTS
Product name
Description
Image URLs
Brand
SKU, GTIN or MPN (optional)
Price and currency
Availability
Product page URL
Condition (optional)
Rating value and review count (optional, real only)
Language

RULES
Build offers with price, priceCurrency, availability (schema.org URL such as https://schema.org/InStock) and url.
Write the description field as one or two plain sentences based only on the given description. No hype.
Include aggregateRating only if both a real rating value and review count were provided. Never invent ratings, reviews, prices or identifiers.
Omit any property with no value. Never output placeholders.
If no price and no rating were provided, return exactly: NEEDS_PRICE_OR_RATING

Return only the JSON object, starting with { and including "@context": "https://schema.org".`,
  },

  "open-graph-tags-generator": {
    output: "json",
    short: true,
    prompt: `TASK: Write the social sharing title and description for one page.

INPUTS
Page title
Meta description (optional)
What the page is about
Page URL
Image URL
Site name
Page type (website, article, product)
Language

WHAT GOOD LOOKS LIKE
Social titles are read in a feed, not a search result, so they can be more conversational than the SEO title. Make someone want to tap the link when a friend shares it.
og:title: 40 to 65 characters. The clearest promise of the page. No brand suffix unless the brand is the point.
og:description: 100 to 160 characters. One or two sentences that add what the title leaves out. Do not repeat the title.
Use only facts from the inputs. No emoji, no hashtags.

RETURN
JSON: {"og_title": "...", "og_description": "...", "og_type": "website|article|product", "twitter_card": "summary_large_image"}`,
  },

  "utm-link-builder": {
    output: "json",
    short: true,
    prompt: `TASK: Review these UTM values and suggest clean versions.
INPUTS: URL. utm_source. utm_medium. utm_campaign. utm_term. utm_content.
RULES: Recommend lowercase everywhere, underscores or hyphens instead of spaces, and a consistent naming pattern. Source is where the click comes from (instagram, newsletter, google). Medium is the channel type, and should match standard values analytics tools recognise for channel grouping (social, email, cpc, referral, organic_social) where the user's intent is clear. Flag if source and medium look swapped, if the URL already has UTMs, or if UTMs are used on internal links on the user's own site.
RETURN JSON: {"suggested": {"utm_source": "", "utm_medium": "", "utm_campaign": "", "utm_term": "", "utm_content": ""}, "notes": ["one line each, at most 3"]}`,
  },

  "shopify-sku-generator": {
    output: "json",
    short: true,
    prompt: `TASK: Propose one SKU pattern for this product catalogue.
INPUTS: Product types. Variant attributes (size, colour, material). Store prefix (optional).
RULES: Pattern of 3 to 5 segments, most general first (category, product, then variants). Each segment 2 to 4 characters, uppercase letters and numbers, separated by hyphens. Never use the letters O and I or the digits 0 and 1 where they could be confused. Never start with zero. Never include price or anything that changes over time.
RETURN JSON: {"pattern": "e.g. TEE-CLS-BLK-M", "segments": [{"name": "...", "codes": {"value": "code"}}], "example": "..."}`,
  },
};
