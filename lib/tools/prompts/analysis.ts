import type { LibraryPrompt } from "./types";

// Prompt Library: the AI read that sits under a code result. The check, the data and the maths always stay
// in code; these prompts only explain a result the tool already computed. Sent as MASTER, then the family
// core (checker, data or calculator), then the tool block, then the result JSON as the user message.
// Word for word from the PDF.

const block = (family: LibraryPrompt["family"], prompt: string): LibraryPrompt => ({ family, prompt, output: family === "calculator" ? "text" : "json", what: family === "calculator" ? "explanation" : undefined, short: true });

export const ANALYSIS: Record<string, LibraryPrompt> = {
  "robots-txt-generator": {
    output: "text",
    what: "explanation lines, then the warnings",
    short: true,
    prompt: `TASK: Explain this robots.txt file in plain English.

INPUTS
The generated robots.txt
What the user wanted to block or allow

OUTPUT
For each rule group, one short line saying which crawler it applies to and what it does, in plain words ("Stops all crawlers from fetching pages under /cart/").
Then a "Watch out" list of 0 to 3 warnings, only if they apply:
1. Disallowing a page stops crawling, not indexing. A blocked page can still appear in Google if other sites link to it. To keep a page out of search, use a noindex tag and leave it crawlable.
2. A rule that blocks CSS, JavaScript or image folders can stop Google from rendering pages properly.
3. "Disallow: /" for all crawlers blocks the entire site.
4. Blocking AI crawlers such as GPTBot, ClaudeBot, PerplexityBot or Google-Extended can reduce how often the site is used or cited in AI answers. Make sure that is intended.
5. The Sitemap line must be a full absolute URL.
Never claim a rule does something it does not. If the user's goal and the file disagree, say so first.

Return plain text: the explanation lines, then the warnings.`,
  },

  // Technical SEO checkers (CHECKER_CORE)
  "robots-txt-tester": block("checker", `TOOL: Robots.txt Tester. Results include the URL tested, the user agent, the allow or block decision and the matching rule.
FOCUS: Say clearly whether this crawler can fetch this URL and which exact line decides it. If an important page (homepage, product, service, blog post) is blocked, mark it high. If the user seems to be using robots.txt to hide a page from Google, explain that blocking crawling does not remove a page from search; a noindex tag on a crawlable page does. If a more specific user agent group overrides the * group, point that out.`),
  "xml-sitemap-validator": block("checker", `TOOL: XML Sitemap Validator. Results include parse errors, URL count, file size, duplicates, invalid lastmod dates and off domain URLs.
FOCUS: Parse errors first, since they can make the whole file unreadable. Then limits: more than 50,000 URLs or 50MB uncompressed means splitting into a sitemap index. Then duplicates, off domain URLs and bad dates (lastmod must be W3C date format and should reflect real content changes, not today's date on every URL).`),
  "xml-sitemap-generator": block("checker", `TOOL: XML Sitemap Generator. Results include URLs kept, duplicates removed, off domain URLs flagged and the final count.
FOCUS: Confirm what was built in one line. Then flag anything the user should fix before submitting: off domain URLs, URLs with parameters or tracking codes, http and https or www and non www mixed together, and more than 50,000 URLs. End with the next step: upload to the site root, add a Sitemap line to robots.txt and submit it in Google Search Console.`),
  "sitemap-url-status-checker": block("checker", `TOOL: Sitemap URL Status Checker. Results include each URL's status code, redirect target, noindex flag and canonical target.
FOCUS: A sitemap should only list pages that return 200, are indexable and canonicalise to themselves. Group and count: 4xx and 5xx URLs (remove or fix), redirected URLs (replace with the final URL), noindex URLs (remove from the sitemap or remove the noindex, depending on intent), and URLs whose canonical points elsewhere (list the canonical version instead). 5xx errors are high severity.`),
  "hreflang-tag-generator": block("checker", `TOOL: Hreflang Tag Generator. Results include the generated tags per page, language and region codes, x-default and any reciprocity warnings.
FOCUS: Explain in two or three lines what the tags tell Google. Flag: missing return links (every page must list every alternate including itself), invalid codes (language must be ISO 639-1 like en, region ISO 3166-1 like GB, so en-GB, never en-UK), missing x-default, and alternates that redirect or point at non canonical URLs. End with where to place the tags: in the head of each page or in the sitemap, not both inconsistently.`),
  "canonical-url-checker": block("checker", `TOOL: Canonical URL Checker. Results include the canonical tag, its target's status, any HTTP header canonical, og:url and conflicts.
FOCUS: Say whether the page canonicalises to itself or elsewhere, and whether that looks intentional. High severity: canonical points to a 404, a redirect, a noindex page or a different domain; more than one canonical; HTML and header canonicals disagree. Medium: relative canonical URL, http vs https mismatch, trailing slash mismatch. Remind them a canonical is a hint Google can ignore if other signals disagree.`),
  "redirect-chain-checker": block("checker", `TOOL: Redirect Chain Checker. Results include each hop with status code and the final URL and status.
FOCUS: Best case is zero or one hop to a 200 page. Flag: loops (urgent), chains of 2 or more hops (point the first URL straight to the final one and update internal links), temporary 302 or 307 redirects that look permanent (use 301 or 308), and chains that end in 4xx or 5xx (urgent). Mention http to https plus www to non www as one combined hop where possible.`),
  "json-ld-schema-validator": block("checker", `TOOL: JSON-LD Schema Validator. Results include JSON parse errors, detected types, missing required or recommended properties and type errors.
FOCUS: JSON syntax errors first, with the line or character if given, because nothing else works until those are fixed. Then missing required properties per type (for example Product needs name plus offers, review or aggregateRating). Then recommended properties that unlock richer results. Warn if ratings, prices or FAQs in the markup are not visible on the page, since markup must match the visible content. Suggest testing the final version in Google's Rich Results Test.`),
  "website-metadata-extractor": block("checker", `TOOL: Website Metadata Extractor. Results include title, meta description, canonical, robots meta, Open Graph and X tags.
FOCUS: Quick health read of the page's head. Flag: missing or duplicate title, title over about 60 characters, missing meta description, robots noindex or nofollow (urgent if unintended), canonical pointing elsewhere, missing og:image or og:title. One line each. Do not rewrite the title or description here; point to the SEO Title and Meta Description tools instead.`),
  "website-seo-checker": block("checker", `TOOL: Website SEO Checker. Results include title, meta description, headings, canonical, indexing directives, word count, images missing alt text and status.
FOCUS: Is this page indexable and clearly about one topic? Order: indexing blockers (noindex, blocked, non 200, canonical elsewhere), then missing or duplicate H1 and title, then the title and H1 not matching the page's main topic, then thin content, then missing alt text. Finish with the single change most likely to help this page.`),
  "broken-link-checker": block("checker", `TOOL: Broken Link Checker. Results include each link's URL, anchor text, status code and whether it is internal or external.
FOCUS: Internal broken links are high severity because the owner controls them: fix the link or redirect the dead URL to the closest live page. External broken links: replace with a working source or remove. Group redirected links separately as low severity (update to the final URL). Treat 403 and 429 responses as "could not verify", not broken, since many sites block automated checks.`),
  "website-audit-tool": block("checker", `TOOL: Website Audit Tool. Results cover up to 15 crawled pages: status codes, titles, descriptions, H1s, canonicals, noindex, duplicates and missing tags.
FOCUS: Site level, not page by page. Start with anything that blocks indexing across many pages. Then duplicate titles and descriptions, missing H1s, broken internal links and redirect chains. Give a priority order of 3 to 5 fixes for the next week. Mention that only up to 15 pages were crawled, so this is a sample, not the full site.`),

  // Keyword and SERP data tools (DATA_CORE)
  "long-tail-keyword-generator": block("data", `TOOL: Long Tail Keyword Generator. Data: autocomplete or related suggestions for a seed, with volume if available.
FOCUS: Remove near duplicates and irrelevant suggestions, then group the rest by intent (how to, best and comparison, cost and price, local, problem or symptom). Highlight the 5 suggestions most likely to bring buyers for this seed. Add field: "groups": [{"intent": "...", "keywords": ["..."]}]`),
  "seo-question-generator": block("data", `TOOL: SEO Question Generator. Data: question style suggestions for a topic.
FOCUS: Group questions by theme and by stage (learning, comparing, ready to buy). Point out which questions one page could answer together and which deserve their own page or an FAQ entry. Add field: "themes": [{"theme": "...", "questions": ["..."], "suggested_use": "own page|section|faq"}]`),
  "people-also-ask-tool": block("data", `TOOL: People Also Ask Tool. Data: PAA questions Google shows for a keyword, sometimes with the source URL of each answer.
FOCUS: What the questions reveal about what searchers are worried about. Which questions the user's page should answer directly under an H2 or H3, in 40 to 60 word answers that open with the direct answer. If source URLs are present, note which types of sites Google is pulling answers from. Add field: "answer_plan": [{"question": "...", "where": "heading or faq", "answer_must_cover": "one line"}]
Do not write the answers' facts yourself; describe what each answer must cover.`),
  "serp-checker": block("data", `TOOL: SERP Checker. Data: the ranking URLs, titles and positions for a keyword, by country and device.
FOCUS: Read the intent from what ranks: page types (guides, product pages, category pages, tools, forums, videos), content formats and whether big brands or small sites dominate. Say what kind of page the user would need to compete and whether the SERP looks winnable for a smaller site, based only on the domains shown. Add field: "winning_format": "one line"`),
  "serp-features-checker": block("data", `TOOL: SERP Features Checker. Data: which features appear for a keyword (AI Overview, featured snippet, PAA, local pack, video, images, shopping, sitelinks).
FOCUS: Explain what each present feature means for clicks and what the user could realistically target: a featured snippet (answer in 40 to 60 words under a matching heading), PAA (FAQ style sections), video (a YouTube video), local pack (Google Business Profile, not the website). Say which features push organic results down.`),
  "local-serp-checker": block("data", `TOOL: Local SERP Checker. Data: map pack listings (name, rating, review count, category) and organic results for a search in a city.
FOCUS: Compare the top map listings using only the data: review counts, ratings and categories. Say what the user's business would need to compete (for example more reviews than the third listing, a matching primary category). Note that map rankings change with the searcher's exact location, so this is one snapshot. Add field: "gap_to_top3": "one line based on the data"`),
  "keyword-rank-checker": block("data", `TOOL: Keyword Rank Checker. Data: whether and where a domain ranks in the top 30 for a keyword, with the ranking URL.
FOCUS: State the position plainly. Positions 4 to 15: this is a striking distance keyword; suggest improving that exact URL (title, intro, internal links, content depth). Not in top 30: suggest checking whether a page targeting this keyword exists at all. If the ranking URL is not the page the user expected, flag possible cannibalisation.`),
  "bulk-keyword-rank-checker": block("data", `TOOL: Bulk Keyword Rank Checker. Data: positions for up to 10 keywords for one domain.
FOCUS: Sort into three groups: ranking top 3 (protect), positions 4 to 20 (biggest opportunity), not ranking (needs a page or a rethink). Flag any keywords where two different URLs from the domain rank. Add field: "groups": {"protect": [], "push": [], "missing": []}`),
  "keyword-search-volume-checker": block("data", `TOOL: Keyword Search Volume Checker. Data: average monthly searches for up to 20 keywords in a country.
FOCUS: Point out which terms have real demand and which are near zero, and any close variants where one form is clearly searched more. Remind them that a lower volume term with buying intent can be worth more than a big informational one.`),
  "keyword-difficulty-checker": block("data", `TOOL: Keyword Difficulty Checker. Data: a provider's difficulty score for up to 20 keywords.
FOCUS: Translate scores into plain terms using the provider's scale as given in the data. Suggest which keywords a newer or smaller site should start with. Note that difficulty scores are estimates and differ between tools.`),
  "keyword-research-tool": block("data", `TOOL: Keyword Research Tool. Data: related keywords for a seed with volume, difficulty and intent.
FOCUS: Pick a shortlist of up to 10 targets that balance volume, difficulty and buying intent for this seed, and say why in a few words each. Suggest one page per cluster rather than one page per keyword. Add field: "shortlist": [{"keyword": "...", "why": "..."}]`),
  "organic-keywords-finder": block("data", `TOOL: Organic Keywords Finder. Data: keywords a domain ranks for with position and ranking URL.
FOCUS: Which pages carry the domain, which topics it is strongest in, and the striking distance keywords (positions 4 to 20) worth pushing. If it is a competitor's domain, say which of their topics look like gaps for the user.`),
  "website-traffic-checker": block("data", `TOOL: Website Traffic Checker. Data: estimated monthly organic search visits for a domain, sometimes with trend and top pages.
FOCUS: Always call it an estimate of organic search traffic only, not total traffic. Describe the trend if present and which pages drive most of it. Never compare it to the user's own analytics as if it were equivalent.`),
  "seo-competitor-finder": block("data", `TOOL: SEO Competitor Finder. Data: domains that share ranking keywords with the user's domain, with overlap counts.
FOCUS: Separate true business competitors from search competitors (publishers, directories, marketplaces) based on the domain names and overlap shown. Suggest the 2 or 3 most useful domains to study and what to look at on each.`),
  "competitor-keyword-gap": block("data", `TOOL: Competitor Keyword Gap. Data: keywords a competitor ranks for that the user's domain does not, with volume and position.
FOCUS: Filter for relevance to the user's business. Group the gaps into page ideas. Prioritise gaps where the competitor ranks well with a page type the user could realistically build. Add field: "page_ideas": [{"page": "...", "keywords": ["..."], "priority": "high|medium|low"}]`),
  "ai-overview-checker": block("data", `TOOL: AI Overview Checker. Data: whether Google showed an AI Overview for a query and which URLs it cited.
FOCUS: State whether an AI Overview appeared and whether the user's domain was cited. Describe what the cited pages have in common based only on their URLs and titles (guides, forums, brand pages, video). Suggest what kind of page could earn a citation: a clear direct answer near the top, specific facts, and structure that matches the question. Never claim to know how Google chooses citations.`),
  "keyword-trends-tool": block("data", `TOOL: Keyword Trends Tool. Data: relative search interest (0 to 100) for up to 5 keywords over 12 months.
FOCUS: Explain that values are relative, not search volumes. Point out seasonality (peaks and dips by month), which term is growing or fading, and that content for a seasonal peak should be live and indexed before the rise starts, not at the peak.`),
  "domain-comparison-tool": block("data", `TOOL: Domain Comparison Tool. Data: organic metrics for 2 to 4 domains side by side.
FOCUS: Who leads on which metric and by how much, using only the numbers shown. Where the user's domain is behind, name the single metric most worth closing first and why.`),
  "core-web-vitals-checker": block("data", `TOOL: Core Web Vitals Checker. Data: real user LCP, INP and CLS at the 75th percentile from the Chrome UX Report, by device.
THRESHOLDS: LCP good at 2.5s or less, poor above 4s. INP good at 200ms or less, poor above 500ms. CLS good at 0.1 or less, poor above 0.25.
FOCUS: Pass or fail for each metric and device. For each failing metric give the most common causes and fixes in plain words: LCP (heavy hero image, slow server, render blocking scripts or fonts), INP (heavy JavaScript, third party scripts, long tasks on click), CLS (images and ads without set sizes, late loading fonts or banners). If there is not enough real user data for this page, say so and suggest checking the whole origin or using a lab test instead.`),

  // Calculators (CALCULATOR_CORE)
  "etsy-offsite-ads-calculator": block("calculator", `TOOL: Etsy Offsite Ads Calculator. Results: sale price, Offsite Ads fee at 15% or 12%, other fees, profit and break even price.
FOCUS: How much of this sale the Offsite Ads fee takes compared with a normal sale, whether the item is still profitable, and the break even price. If profit is negative or thin, mention raising the price, bundling, or reviewing shipping costs. Only mention opting out of Offsite Ads as possible if the seller's 12 month sales are below the level where Etsy makes it mandatory, and say to check Etsy's current rules.`),
  "etsy-fee-calculator": block("calculator", `TOOL: Etsy Fee Calculator. Results: listing, transaction, processing and Offsite Ads fees, total fees and what the seller keeps.
FOCUS: Which fee takes the biggest share, total fees as a percentage of the order, and what they keep per order. If the margin is thin, point at the inputs the seller controls: price, shipping charged, and cost of goods.`),
  "shopify-profit-margin-calculator": block("calculator", `TOOL: Shopify Profit Margin Calculator. Results: profit per order, margin, markup and break even price.
FOCUS: Explain the difference between margin and markup in one line using their numbers. Say whether there is room for ad spend, using profit per order as the most they could pay to win that order and still break even.`),
  "customer-acquisition-cost-calculator": block("calculator", `TOOL: Customer Acquisition Cost Calculator. Results: total sales and marketing spend, new customers and CAC.
FOCUS: What CAC means for them in one line. CAC only makes sense next to how much a customer is worth, so suggest the LTV to CAC calculator next. If the spend excludes salaries or tools, note the true CAC is higher.`),
  "break-even-roas-calculator": block("calculator", `TOOL: Break-even ROAS Calculator. Results: contribution margin per order, break even ROAS and allowable ad spend per order.
FOCUS: Explain that any campaign below this ROAS loses money on the first order. Translate it into plain terms (for every 1 spent on ads, at least this much in revenue is needed). If repeat purchases are common for them, note that a lower first order ROAS can still work, based on lifetime value.`),
  "ltv-cac-ratio-calculator": block("calculator", `TOOL: LTV to CAC Ratio Calculator. Results: customer lifetime value, CAC and the ratio.
FOCUS: Read the ratio against the common rule of thumb that about 3:1 is healthy, below 1:1 loses money and very high ratios can mean under investing in growth. Name the lever with the most effect in their inputs: churn, margin or acquisition cost. Mention the LTV estimate is only as good as the churn assumption.`),
  "mrr-calculator": block("calculator", `TOOL: MRR Calculator. Results: MRR by plan, annual plans normalised to monthly, total MRR and annual run rate.
FOCUS: Which plan drives most MRR, the share from annual vs monthly billing, and that run rate is a snapshot, not a forecast. If one plan dominates, note the concentration risk.`),
  "customer-retention-rate-calculator": block("calculator", `TOOL: Customer Retention Rate Calculator. Results: start customers, new customers, end customers and retention rate.
FOCUS: Explain that new customers are excluded so the rate reflects only existing customers who stayed. Translate the rate into how many of every 100 customers were kept. Suggest measuring the same period length each time so the numbers are comparable.`),
  "ab-test-sample-size-calculator": block("calculator", `TOOL: A/B Test Sample Size Calculator. Results: baseline rate, minimum detectable effect, power, confidence and visitors needed per variant.
FOCUS: Translate the sample size into time using their traffic only if traffic was given. Explain that stopping the test early when one variant looks ahead makes results unreliable. If the required sample is far beyond their traffic, suggest testing a bigger change (a larger detectable effect) or a higher traffic page.`),
};
