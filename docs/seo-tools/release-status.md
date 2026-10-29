# SEO tools: release status and asset manifest

Last updated October 29, 2026. Source drafts: the SEO Tools Copy and Graphics Pack (N01 to N32, E01 to E03).

## How the data rules are enforced

- **Page fetches** (`app/api/tools/seo/route.ts`) go through `lib/tools/v3/safe-fetch.ts`:
  - public addresses only, checked when the socket connects and again after every redirect;
  - ports 80 and 443 only, no credentials in the URL;
  - capped bytes, time and redirect hops.
- **Visitor limits:** each visitor gets a per-tool daily cap, and all outgoing fetches share a global per-minute cap.
- **Metered providers** (`lib/tools/seo/quota.ts`):
  - **Monthly ledger:** every provider has its own counter, and the request is reserved before it is sent.
  - **Hard stop:** requests stop at 90% of the configured allowance. The counter resets on the 1st (UTC) and unused allowance never rolls over.
  - **Allowances come from env:** `BRAVE_SUGGEST_MONTHLY`, `BRAVE_SEARCH_MONTHLY` and `CRUX_MONTHLY`.
  - **Fails closed** with no key, or in production with no shared counter (Upstash). Per-instance memory could overspend.
  - **One attempt per request, never retried.** Identical concurrent requests share one call, and results are cached for 12 to 24 hours.
- **Public versus owner mode:** public mode only uses providers marked `publicFree`. Paid keys (DataForSEO, Serper, SerpApi, Mangools, Keywords Everywhere, Bing) are stored in `.env.local` only. No code path reads them yet.
- **No substitute data:** no fallback provider is wired. If a source is unavailable, the tool says so instead of substituting a different kind of data.

## Wave 2 (paid data, approved for public use under caps on October 29, 2026)

- **Serper:** SERP Checker, Keyword Rank Checker (top 30, because Google dropped 100 results per page), People Also Ask Tool, SERP Features Checker and Local SERP Checker. All working against the live API.
- **DataForSEO Labs:** Keyword Search Volume Checker, Keyword Difficulty Checker, Keyword Research Tool, Organic Keywords Finder, Website Traffic Checker, SEO Competitor Finder and Competitor Keyword Gap. All working against the live API.
- **Monthly caps (env):** `SERPER_MONTHLY` (default 500 requests) and `DATAFORSEO_MONTHLY_USD` (default $0.90). Requests stop at 90% of the cap.
- **Daily cap per visitor:** `SEO_PAID_DAILY` (default 8).
- **Backlink tools stay blocked:** the DataForSEO plan's backlink limits are all 0.
- **Publishing:** every metered tool goes live automatically once Upstash (or Vercel KV) env vars are set and the site is redeployed (`METERED` in `lib/tools/registry.ts`). Until then they show only in a local preview build (`TOOLS_PREVIEW=1`).

## Wave 3 (October 29, 2026)

- **AI Overview Checker:** uses SerpApi. `SERPAPI_MONTHLY` defaults to 100 searches, stopping at 90.
- **Keyword Trends Tool:** uses Google Trends via DataForSEO. Each month shows its highest weekly value.
- **Bulk Keyword Rank Checker:** uses Serper. Up to 10 keywords, top 10 each.
- **Domain Comparison Tool:** uses DataForSEO. 2 to 4 domains, organic metrics only, no combined score.
- **Website Audit Tool:** a free crawler of up to 15 public pages. It needs no paid data, so it is in LIVE.
- **Static routes:** every editorial SEO tool has its own route (`app/tools/<slug>/page.tsx` via `app/tools/_studio/editorialRoute.tsx`), so it doesn't ship every older tool's code. On throttled mobile the page's own JS dropped from 378KB to 66KB.
- **AdSense:** about 220KB on every tool page, from `app/tools/layout.tsx`. That is the biggest remaining cost.

## Route status

| ID | Tool | Route | Status | Data |
|---|---|---|---|---|
| E03 | Website Metadata Extractor | /tools/website-metadata-extractor | **Working, ready to publish** | Safe page fetch; paste mode runs in the browser |
| N05 | Website SEO Checker | /tools/website-seo-checker | **Working, ready to publish** | Safe page fetch |
| N09 | Broken Link Checker | /tools/broken-link-checker | **Working, ready to publish** (one page, 40 links) | Safe fetch, HEAD with GET fallback |
| N32 | Sitemap URL Status Checker | /tools/sitemap-url-status-checker | **Working, ready to publish** (25 URLs) | Safe fetch; different job from the existing XML Sitemap Validator |
| N10 | Core Web Vitals Checker | /tools/core-web-vitals-checker | **Built and tested against the live API; hidden in production** | CrUX API (free). Needs the Upstash shared counter before it can go public. Lab data (PageSpeed) not included yet. |
| E01 | Long Tail Keyword Generator | /tools/long-tail-keyword-generator | **Built; blocked** | Brave Suggest returns `OPTION_NOT_IN_PLAN` for both keys. Enable the free Autosuggest plan, then connect Upstash. |
| E02 | SEO Question Generator | /tools/seo-question-generator | **Built; blocked** | Same as E01 |
| Hub | SEO tools directory | /tools/seo | **Working, ready to publish** | Lists only live tools |
| N01 | Keyword Research Tool | not built | Needs a decision | Suggestion mode can reuse E01. Volumes need DataForSEO or Keywords Everywhere: paid, owner only. |
| N02, N06, N07, N08, N11 to N15, N20, N27, N28 | Volume, backlinks, authority, difficulty, organic keywords, gaps, traffic, competitors, bulk rank, domain comparison | not built | Paid data only | Owner mode only. Keep public routes unpublished. |
| N03, N04, N17, N18, N19, N29 | SERP, rank, PAA, SERP features, local SERP, AI Overview | not built | Paid SERP data | Serper, SerpApi or DataForSEO, owner only. Brave Search is not Google results, so it can't stand in. |
| N16 | Website Audit Crawler | not built | Needs a background job | 30 second serverless limit |
| N21 to N24 | GSC tools | not built | Phase 2 | Needs Google OAuth (read-only scope) or CSV import. An API key alone can't read Search Console. |
| N25 | Website Change Monitor | not built | Needs storage and a scheduler | |
| N26 | Keyword Trends | not built | No licensed free source | |
| N30 | AI Visibility | not built | Needs a licensed method | |
| N31 | Domain Rating Checker | **Blocked** | Legal review | Do not publish |

## Asset manifest

Every new tool currently uses a plain placeholder panel (listed in `ART_PENDING` in `lib/tools/thumbnails.ts`). No existing illustration is a good fit that isn't already used by another tool, and the site rule is one illustration per tool.

| Tool | Thumbnail (1200x900) | Page art (1200x800) | Brief |
|---|---|---|---|
| Website Metadata Extractor | needed | needed | ART-03 website structure diagnostic |
| Website SEO Checker | needed | needed | ART-03 variant: one page with annotated checks |
| Broken Link Checker | needed | needed | ART-17: extend A55 linework with a broken link |
| Sitemap URL Status Checker | needed | needed | ART-10: a sitemap list with per-URL status ticks, distinct from A46 and A48 |
| Core Web Vitals Checker | needed | needed | ART-05 three signals |
| Long Tail Keyword Generator | needed | needed | ART-01 keyword branches |
| SEO Question Generator | needed | needed | ART-20 question cards |
| Shared states | n/a | ART-13 error, ART-14 quota, ART-15 empty (400x400) | Not needed yet: current states are text only |

Reuse checked: A37, A46, A48, A55, A56 and A57 are each already assigned to a live tool. Reusing them would break the one illustration per tool rule.

## Copy changes made because of the real implementation

- **Titles:** they follow the site convention `Name (100% FREE)`, which a site test enforces, instead of the draft `| Zainameen` titles.
- **First sentence:** every lede starts with "This <keyword>", per the site keyword rule.
- **Broken Link Checker:** "a bounded set of pages" became "one page, up to 40 links".
- **Sitemap URL Status Checker:** states its 25 URL cap and the three-sitemap limit for an index.
- **Long Tail Keyword Generator:** the draft's "clearly marked generated research ideas" were removed. The tool shows observed suggestions only.
- **SEO Question Generator:** the draft's "AI brainstorming ideas" were removed. The tool shows observed suggestions only.
- **Core Web Vitals Checker:** says lab diagnostics are not included yet.
- **FAQs:** two FAQs were added to each tool, to meet the site minimum of six.
