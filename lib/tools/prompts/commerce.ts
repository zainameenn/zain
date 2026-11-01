import type { LibraryPrompt } from "./types";

// Prompt Library: Ecommerce and Naming tools. Word for word from the PDF; {field} placeholders removed.
// Naming tools are sent with NAMING_CORE (family: "naming") between MASTER and the tool block.

export const COMMERCE: Record<string, LibraryPrompt> = {
  "etsy-title-generator": {
    output: "text",
    what: "title",
    short: true,
    window: { min: 60, max: 140 },
    prompt: `TASK: Write one Etsy listing title.

INPUTS
What the item is
Key traits (material, colour, size, style, personalisation)
Who buys it or the occasion (optional)
Main search phrase (optional)
Language

LENGTH
8 to 15 words and no more than 140 characters.

WHAT GOOD LOOKS LIKE
Etsy asks for short, clear, descriptive titles that a shopper scanning a busy results page understands instantly.
Start with what the item is, using the words a buyer would search ("Personalised Leather Dog Collar", not "Adorable Handmade Gift").
Then add the two or three traits that make this item different: material, colour, size, style or personalisation.
Add the occasion or recipient only if it is a real reason people buy it, at the end.
Do not repeat words. Do not stack synonyms. Leave subjective words (beautiful, perfect, unique, cute) for the description.
Commas between phrases are fine. Use % : & at most once each. Never use $ ^ \`. No more than three words in capitals.

Return only the title.`,
  },

  "product-description-generator": {
    output: "text",
    what: "description",
    window: { Short: { min: 300, max: 600 }, Standard: { min: 700, max: 1400 }, Detailed: { min: 1500, max: 2500 } },
    prompt: `TASK: Write one product description.

INPUTS
Product name
What it is and what it does
Features and specs
Who it is for
Platform (Shopify, Etsy, Amazon, own site)
Price position (optional)
Care, sizing, shipping or warranty notes (optional)
Length
Tone
Language

LENGTH
Short: 300 to 600 characters. Standard: 700 to 1,400. Detailed: 1,500 to 2,500.

STRUCTURE
1. Opening (1 to 2 sentences): who it is for and the main reason they will love it, in their language. Picture the moment they use it.
2. Benefits: turn the most important features into what they mean for the buyer. Feature then why it matters, for example "Double walled steel, so coffee stays hot through a two hour meeting."
3. Details: a short scannable list of specs the buyer needs to decide (size, materials, what is included, compatibility). Only specs from the inputs.
4. Practical notes: care, sizing, shipping or warranty, only if given.
5. Closing line that removes a final doubt or nudges the purchase.
Use a bulleted list only for the details part. Everything else in short paragraphs.
No claims the inputs do not support (no "best on the market", no health or safety claims, no invented certifications).

Return only the description.`,
  },

  "shopify-product-title-generator": {
    output: "text",
    what: "title",
    short: true,
    window: { min: 30, max: 80 },
    prompt: `TASK: Write one Shopify product title.

INPUTS
Product details or supplier title
Brand (optional)
Key attribute that buyers filter or search by
Language

LENGTH
30 to 80 characters.

WHAT GOOD LOOKS LIKE
A clean, accurate title that works in the store, in Google Shopping and in search. Pattern: Brand (if given) + product type + the one or two attributes that matter most (material, size, model, style).
If the input is a messy supplier title, keep the facts and remove the junk: keyword stuffing, "2024 NEW Hot Sale", repeated words, random capitals, model codes buyers don't search for.
Do not include colour or size if they are variants the buyer selects on the page, unless the product only comes in one.
Title case. No promotional words (Sale, Free Shipping, Best). No emoji.

Return only the title.`,
  },

  "shopify-collection-description-generator": {
    output: "text",
    what: "description",
    window: { min: 250, max: 600 },
    prompt: `TASK: Write one Shopify collection description.

INPUTS
Collection name
What products are in it
Who shops this collection
What they are looking for (shopping intent)
Main keyword (optional)
Tone
Language

LENGTH
250 to 600 characters. It sits above or below the product grid, so it must be short enough not to push products down.

WHAT GOOD LOOKS LIKE
Sentence 1: what this collection is and who it is for, using the main keyword or collection name naturally.
Sentences 2 to 3: help the shopper choose: what ranges, styles, materials or price points are inside and what to consider.
Optional last sentence: a gentle pointer, such as a best seller type or a sizing tip, only if it comes from the inputs.
No fluff openers ("Welcome to our amazing collection"). No invented claims about quality or reviews.

Return only the description.`,
  },

  "etsy-shop-announcement-generator": {
    output: "text",
    what: "announcement",
    window: { min: 150, max: 600 },
    prompt: `TASK: Write one Etsy shop announcement.

INPUTS
Shop name
Announcement type (launch, sale, shipping update, holiday cut off, closure or vacation, restock, general welcome)
Key details (dates, discount, code, product, deadline)
Tone
Language

LENGTH
150 to 600 characters. The first sentence shows in the shop preview, so it must carry the main message alone.

WHAT GOOD LOOKS LIKE
First sentence: the news itself, with the key date, deadline or discount. No warm up.
Then: what the shopper should do and any detail they need (code, what is included, when shipping resumes).
End with one warm line that sounds like the maker, not a corporation.
Copy every date, code and number exactly as given. Never invent a discount, date or deadline.

Return only the announcement.`,
  },

  "etsy-shop-about-section-generator": {
    output: "text",
    what: "About section text",
    window: { min: 800, max: 2000 },
    prompt: `TASK: Write one Etsy shop About section (the shop story).

INPUTS
Shop name
Who runs it
How and why the shop started
What they make and how (materials, process, tools)
Where they work (optional)
What they care about (values, sustainability, quality)
Tone
Language

LENGTH
800 to 2,000 characters.

STRUCTURE
1. Open with a specific moment or detail from the story, not "Welcome to my shop".
2. Who they are and why they make what they make.
3. How the items are made: materials, steps, the care involved. This is what builds trust on Etsy.
4. What buyers can expect: quality, personal touches, communication.
5. A warm closing line that invites a message or a browse.
First person. Short paragraphs. Use only facts from the inputs. No invented awards, years, press mentions or eco claims.

Return only the About section text.`,
  },

  "shopify-abandoned-checkout-email-generator": {
    output: "json",
    prompt: `TASK: Write one abandoned checkout email.

INPUTS
Store name
What the store sells
Typical customer
Incentive (optional, exactly as offered)
Reassurances available (free returns, shipping time, guarantee, support)
Email number in sequence (1, 2 or 3)
Tone
Language

WHAT GOOD LOOKS LIKE
Write like a helpful store owner, not a debt collector. Assume the person was interrupted or unsure, not that they forgot.
Email 1 (within hours): simple reminder, the cart is saved, one reassurance.
Email 2: address the most likely doubt for this product (fit, quality, delivery time, returns) using the reassurances given.
Email 3: last reminder; include the incentive only if one was provided.
Use {{product_name}} and {{checkout_url}} as placeholders where the store will insert them. Never invent prices, discounts, stock levels or deadlines.
No fake urgency ("Only 2 left!") unless the user provided it.

RETURN
JSON: {"subject": "...", "preview_text": "...", "body": "...", "button_text": "2 to 4 words"}
The preview text must add to the subject, not repeat it.`,
  },

  "business-name-generator": {
    output: "json",
    family: "naming",
    short: true,
    prompt: `TASK: Name one business.
INPUTS: What it does. Customers. Location or market. Personality. Words to include or avoid. Language.
RULES: 1 to 3 words. Must still make sense if the business grows into a related product or second city, so avoid tying it to one tiny product or street unless asked.
RETURN JSON: {"name": "...", "reason": "one sentence on why it fits", "check": "one line"}`,
  },

  "business-slogan-generator": {
    output: "json",
    short: true,
    prompt: `TASK: Write one business slogan.
INPUTS: Business name. What it sells. Customer. Strongest benefit or feeling. Tone. Language.
RULES: 3 to 8 words. Built on the strongest real benefit, not a generic virtue ("quality", "excellence", "passion"). Rhythm matters: it should be easy to say. Rhyme or wordplay only if it sounds natural. Do not repeat the business name unless the tone calls for it. No claims like "best" or "#1".
RETURN JSON: {"slogan": "...", "reason": "one sentence"}`,
  },

  "etsy-shop-name-generator": {
    output: "json",
    family: "naming",
    short: true,
    prompt: `TASK: Name one Etsy shop.
INPUTS: What they make or sell. Style. Buyers. Maker name (optional). Language.
ETSY RULES: 4 to 20 characters. Letters and numbers only. No spaces, no symbols. Use CamelCase so it reads clearly (for example "WillowAndThread").
RULES: Broad enough to fit future products in the same craft, specific enough to signal the style.
RETURN JSON: {"name": "...", "reason": "one sentence", "check": "one line"}`,
  },

  "shopify-store-name-generator": {
    output: "json",
    family: "naming",
    short: true,
    prompt: `TASK: Name one Shopify store.
INPUTS: Products. Audience. Brand personality. Price position. Language.
RULES: 1 to 2 words, ideally under 12 letters, so the .com or a close variant is realistic. Must look good as a logo and sound like a brand, not a category.
RETURN JSON: {"name": "...", "domain_idea": "one domain to check, such as getname.com or name.co", "reason": "one sentence", "check": "one line"}`,
  },

  "youtube-channel-name-generator": {
    output: "json",
    family: "naming",
    short: true,
    prompt: `TASK: Name one YouTube channel.
INPUTS: Channel topic. Audience. Creator name (optional). Format and personality. Language.
RULES: Display name under 25 characters so it doesn't truncate on mobile. It should hint at the topic or the creator's personality and still work if the content evolves. The handle should match the display name as closely as possible.
HANDLE RULES: 3 to 30 characters. Letters, numbers, underscores, hyphens, periods. No punctuation at the start or end.
RETURN JSON: {"name": "...", "handle": "@...", "reason": "one sentence", "check": "one line"}`,
  },

  "newsletter-name-generator": {
    output: "json",
    family: "naming",
    short: true,
    prompt: `TASK: Name one newsletter.
INPUTS: Topic. Readers. Frequency. Voice. Writer name (optional). Language.
RULES: 1 to 4 words. It should promise what lands in the inbox or capture the writer's point of view. The tagline says what readers get and how often, in under 60 characters.
RETURN JSON: {"name": "...", "tagline": "...", "check": "one line"}`,
  },

  "podcast-name-generator": {
    output: "json",
    family: "naming",
    short: true,
    prompt: `TASK: Name one podcast.
INPUTS: Show topic. Listeners. Format (interview, solo, co hosted, narrative). Tone. Host name (optional). Language.
RULES: 1 to 4 words, easy to say aloud and spell after hearing it, because most people find podcasts by voice or word of mouth. The tagline says what the listener gets, under 60 characters, using a searchable topic word because podcast apps search titles.
RETURN JSON: {"name": "...", "tagline": "...", "check": "one line"}`,
  },

  "domain-name-ideas-generator": {
    output: "json",
    family: "naming",
    short: true,
    prompt: `TASK: Suggest one domain name.
INPUTS: Business or project. Keywords (optional). Preferred extension. Style. Language.
RULES: Use the extension the user chose. 6 to 15 characters before the extension. Letters only where possible, no hyphens, no doubled letters across word joins (as in "bestteacup"). It must pass the radio test: someone hears it once and types it correctly.
If a plain brandable name is likely taken, use one natural modifier (get, try, use, hq, the) rather than a misspelling.
RETURN JSON: {"domain": "...", "reason": "one sentence", "check": "Check availability at a registrar before buying"}`,
  },

  "instagram-username-generator": {
    output: "json",
    family: "naming",
    short: true,
    prompt: `TASK: Suggest one Instagram username.
INPUTS: Name or brand. Niche. Style. Language.
RULES: Readable at a glance, easy to say. Prefer the real name or brand plus at most one short niche word or natural modifier (.studio, .co, .eats, hq). Use a period or underscore only to separate words. No random numbers, no repeated underscores.
RETURN JSON: {"username": "...", "reason": "one sentence", "check": "one line"}`,
  },

  "tiktok-username-generator": {
    output: "json",
    family: "naming",
    short: true,
    prompt: `TASK: Suggest one TikTok username.
INPUTS: Name or brand. Content topic. Style. Language.
RULES: 2 to 24 characters. Letters, numbers, underscores, periods. Must not end with a period. Short and punchy beats descriptive. If it hints at the content, viewers know what they are following.
RETURN JSON: {"username": "...", "reason": "one sentence", "check": "one line"}`,
  },

  "blog-name-generator": {
    output: "json",
    family: "naming",
    short: true,
    prompt: `TASK: Name one blog.
INPUTS: Topic. Readers. Voice. Author name (optional). Language.
RULES: 1 to 4 words. It should signal the topic or the angle, and leave room to grow into related subjects. The description is one sentence under 120 characters that could sit under the logo.
RETURN JSON: {"name": "...", "description": "...", "check": "one line"}`,
  },

  "saas-product-name-generator": {
    output: "json",
    family: "naming",
    short: true,
    prompt: `TASK: Name one SaaS product.
INPUTS: Category. What it does. Buyers. Brand feel. Competitors to avoid sounding like (optional). Language.
RULES: 1 word or a tight 2 word compound, 4 to 10 letters ideal. Brandable over descriptive, but with a hint of the job or the feeling it creates. Must not sound like the listed competitors or any well known software. Works in sentences ("Just send it in Name").
RETURN JSON: {"name": "...", "reason": "one sentence", "domain_idea": "...", "check": "one line"}`,
  },
};
