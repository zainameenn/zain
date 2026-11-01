import type { LibraryPrompt } from "./types";

// Prompt Library: SEO list tools and Planning tools. Word for word from the PDF; {field} placeholders removed.
// List tools are the exception to one result: one complete, deduplicated list per run.

export const LISTS: Record<string, LibraryPrompt> = {
  "google-ads-negative-keyword-generator": {
    output: "json",
    prompt: `TASK: Build one list of negative keywords for a Google Ads campaign.

INPUTS
What the business sells
Target keywords
Who the ideal customer is
Who they do not serve or what they do not sell
Price position (budget, mid, premium)
Location served
Search terms report (optional)
Language

OUTPUT SIZE
25 to 60 negative keywords.

WHAT GOOD LOOKS LIKE
Find the searches that would trigger these keywords but will never buy. Cover these groups where they apply: jobs and careers, free and DIY intent, education and definitions, wrong product or service, wrong audience (B2C vs B2B, students), price mismatch (cheap or luxury), competitors only if the user lists them, wrong locations, support and login searches for other brands, used, second hand and rental.
If a search terms report is given, mine it first and prioritise real wasted terms.
Pick the match type that blocks waste without blocking buyers: exact for one specific bad query, phrase for a bad idea that appears in many queries, broad only for single words that are never relevant. Remember negative keywords do not match close variants, so include plural or misspelled forms only when they matter.
Never include a term that would block the user's own target keywords or their core offer.

RETURN
JSON array: [{"keyword": "...", "match_type": "broad|phrase|exact", "group": "...", "reason": "one short line", "risk": "low|medium|high"}]
Risk means the chance of blocking a real buyer. Sort by group, then risk low to high.`,
  },

  "seo-search-intent-classifier": {
    output: "json",
    prompt: `TASK: Classify the search intent of every keyword in the list.

INPUTS
Keywords (one per line)
What the site sells or covers
Language and market

WHAT GOOD LOOKS LIKE
For each keyword, decide what the searcher most likely wants right now, based on the words and on what Google usually shows for that kind of query.
Primary intent: informational (learn), commercial (compare before buying), transactional (buy, book, sign up, download), navigational (reach a specific brand or page), local (find a nearby provider).
Give a secondary intent only when the query is genuinely mixed ("best crm for small business" is commercial with informational).
Recommend the page type that would serve it best: blog guide, how to, listicle, comparison, alternatives page, product page, category page, service page, local landing page, pricing page, tool or template, homepage.
Use cues like how, what, why, best, vs, review, price, buy, near me, a city name, brand names and templates.

RETURN
JSON array, same order as the input: [{"keyword": "...", "primary_intent": "...", "secondary_intent": "... or null", "page_type": "...", "funnel_stage": "top|middle|bottom", "confidence": "high|medium|low", "note": "one short line"}]`,
  },

  "seo-keyword-cluster-generator": {
    output: "json",
    prompt: `TASK: Group a keyword list into page level clusters.

INPUTS
Keywords (one per line, optional volume)
What the site sells or covers
Existing pages (optional)
Language and market

HOW TO CLUSTER
Put two keywords in the same cluster only if one page can rank for both, meaning they share the same intent and Google would likely show mostly the same results. Different intent means different cluster, even when the words are similar ("crm software" and "what is a crm" are different pages).
Name each cluster by its main keyword: the clearest, highest volume term that captures the group.
Assign a page type and say whether an existing page matches (only from the list given) or a new page is needed.
Put keywords that fit no cluster in a final cluster called "Unclustered" rather than forcing them.
Group clusters under a few parent topics so the user can see their topic hubs.

RETURN
JSON: {"topics": [{"topic": "...", "clusters": [{"cluster": "...", "main_keyword": "...", "keywords": ["..."], "intent": "...", "page_type": "...", "existing_page": "url or null", "priority": "high|medium|low"}]}]}
Priority is based on intent closeness to revenue and the volume given, if any.`,
  },

  "internal-link-opportunity-finder": {
    output: "json",
    prompt: `TASK: Suggest internal links between the pages provided.

INPUTS
Pages (URL, title and topic or summary, one per line)
Priority pages to boost (optional)
Language

WHAT GOOD LOOKS LIKE
Suggest links a reader would actually want to click: from a page that mentions a subject to the page that covers it in depth. Relevance first, then priority pages.
Favour links from broad or high traffic pages to deeper or money pages, and between closely related pages in the same topic.
Anchor text: a short, natural phrase that describes the target page, varied across suggestions. Never "click here" and never the exact same anchor for one target more than twice.
Only use URLs from the input. Never invent a page.

RETURN
JSON array: [{"from_url": "...", "to_url": "...", "anchor_text": "...", "placement_hint": "where in the source page it fits", "reason": "one short line", "priority": "high|medium|low"}]`,
  },

  "keyword-to-page-mapper": {
    output: "json",
    prompt: `TASK: Map each keyword to the best existing or planned page.

INPUTS
Keywords
Existing pages (URL, title, topic)
What the site sells
Language and market

RULES
One primary keyword per page. Secondary keywords must share the primary's intent.
If two existing pages fit the same keyword, flag a cannibalisation risk and say which page should own it.
If no existing page matches the intent, propose a new page with a suggested slug and page type.
Only use existing URLs from the input.

RETURN
JSON array: [{"keyword": "...", "role": "primary|secondary", "page": "existing url or proposed slug", "page_status": "existing|new", "page_type": "...", "intent": "...", "overlap_warning": "... or null"}]`,
  },

  "seo-content-gap-planner": {
    output: "json",
    prompt: `TASK: Find content gaps and turn them into a prioritised plan.

INPUTS
Topics or pages the site already covers
Audience questions or competitor titles (public)
What the site sells
Audience
Language and market

WHAT GOOD LOOKS LIKE
A gap is a question or topic the audience cares about that the site does not answer well. Compare the lists and find what is missing, what is covered only thinly, and which competitor topics matter for this business (skip topics that bring traffic but no customers).
For each gap suggest one page: working title, target keyword idea, intent, page type and why it matters for this business.
Prioritise by closeness to buying, then by how often the theme appears in the comparison list.
Do not claim search volumes. If volume matters, say "check volume".

RETURN
JSON array: [{"gap": "...", "gap_type": "missing|thin|outdated", "working_title": "...", "keyword_idea": "...", "intent": "...", "page_type": "...", "why_it_matters": "one line", "priority": "high|medium|low"}]`,
  },

  "local-seo-keyword-modifier-generator": {
    output: "json",
    prompt: `TASK: Generate local keyword ideas from services and locations.

INPUTS
Services
Locations served (cities, neighbourhoods, postcodes)
Business type
Language and market

WHAT GOOD LOOKS LIKE
Combine each service with each location in the forms people actually search: "service city", "service in city", "city service", "service near me", plus useful modifiers such as emergency, same day, 24 hour, cost, price, best, affordable, residential, commercial, only where they fit the business.
Use only the locations given. Never add nearby towns the user did not list.
Drop awkward or unnatural combinations. Group by service.
Mark which ideas suit a dedicated location page and which belong on the main service page or in FAQs.

RETURN
JSON array: [{"keyword": "...", "service": "...", "location": "...", "modifier": "... or null", "suggested_use": "location page|service page|faq|gbp post"}]`,
  },

  "marketing-plan-generator": {
    output: "text",
    what: "plan, in Markdown",
    prompt: `TASK: Write one practical 30 day marketing plan.

INPUTS
Business and what it sells
Target customer
Main goal for the next 30 days
Current channels and what is working
Budget for ads or tools
Hours per week available
Biggest problem right now (optional)
Location or market
Language

WHAT GOOD LOOKS LIKE
A plan the owner can start tomorrow and finish in 30 days with the hours they have. Fewer actions done well beat a long list. Total planned work must fit inside hours per week times four.
Pick at most two or three channels, chosen for this business, this customer and this budget, not a list of every platform. Explain the choice in one line each.
Fix the foundation first when it is broken (unclear offer, no way to capture leads, no reviews, slow follow up) before adding new channels.

RETURN, in Markdown
1. The focus: one paragraph stating the goal, the two or three channels and why.
2. Week 1 to Week 4: for each week, 3 to 5 tasks. Each task is one line with a verb, the specific output and an hour estimate, for example "Ask your last 10 customers for a Google review by text (1 hr)".
3. What to measure: three numbers to track weekly and how to get each one.
4. What to skip this month: two or three tempting things to ignore for now, with a one line reason.
Use only facts from the inputs about the business. No guaranteed results, no invented benchmarks.`,
  },

  "social-media-content-calendar-generator": {
    output: "json",
    prompt: `TASK: Build one social media content calendar.

INPUTS
Business or creator and what they offer
Audience
Platforms
Posts per week
Number of weeks
Goal
Themes, launches, events or dates to include
Content they can realistically make (photos, video, text only, team, products)
Tone
Language

WHAT GOOD LOOKS LIKE
A calendar someone can actually follow. Every post has a specific idea, not a category ("Show the three fabrics we test before cutting" beats "Behind the scenes").
Balance the mix across the period: roughly helpful or educational, proof and stories, personality or behind the scenes, and direct offers, with offers no more than one in five posts unless the goal is a launch.
Match format to platform and to what they can make. No video ideas for a text only creator.
Place key dates and launches correctly, with a teaser before and a reminder after.

RETURN
JSON array: [{"week": 1, "day": "Mon", "platform": "...", "format": "reel|carousel|photo|text|video|story|short", "pillar": "educate|proof|personality|offer", "idea": "one specific sentence", "hook": "the first line or on screen text", "cta": "..."}]`,
  },
};
