# Changelog and sitemap: how it works

Everything here updates itself once content is published. You never edit a page component to publish an update.

## Where things live

| What | Where |
|---|---|
| Changelog entries | `content/changelog/<slug>.md` (one file per entry) |
| Entry screenshots | `public/assets/changelog/<slug>.jpg` |
| Changelog pages | `/changelog`, `/changelog/<slug>`, RSS at `/changelog/rss.xml` |
| Fixed site pages (home, services, pricing...) | `lib/site-pages.ts` |
| Free tools | `lib/tools/registry.ts` (the `LIVE` list decides what's public) |
| Case studies | `app/case-studies/_data/index.ts` |
| Blog posts | Sanity (the Studio at `/studio`) |
| XML sitemap | `/sitemap.xml`, built by `app/sitemap.ts` from all of the above |
| Human sitemap | `/sitemap`, built from the same data |
| Real "last modified" dates | `lib/lastmod.json`, written by `npm run lastmod` |
| robots.txt | `/robots.txt` (`app/robots.ts`), already points to the sitemap |

## Add a changelog entry

1. Copy any file in `content/changelog/` and rename it to the new slug, for example `content/changelog/new-tiktok-hooks-tool.md`. The file name becomes the URL: `/changelog/new-tiktok-hooks-tool`.
2. Fill in the top block:

```
---
title: Introducing the TikTok Hook Generator
summary: One or two sentences shown in the list and in search results.
category: new-tool
status: draft
publishedAt:
updatedAt:
featuredImage: /assets/changelog/new-tiktok-hooks-tool.jpg
imageAlt: The TikTok Hook Generator
relatedUrl: /tools/tiktok-hook-generator
relatedLabel: Open the TikTok Hook Generator
subject: TikTok Hook Generator
relatedUpdates: tiktok-caption-generator, tiktok-bio-generator
---
```

   - `category` is one of: `new-tool`, `improvement`, `fix`, `website`, `services-pricing`, `case-study`.
   - `relatedUpdates` is optional: other entry slugs, comma separated.
   - `seoTitle` and `seoDescription` are optional overrides.
3. Write the body under the block in simple Markdown: `## Heading`, `- list item`, `[link text](/path)`, `**bold**`. Empty sections are just left out.
4. Add a real screenshot at the `featuredImage` path (1440 by 900 works best). Never use a made up interface image.
5. Keep `status: draft` while you work. Drafts are a 404 and stay out of the sitemap and RSS.

## Publish it

Only when the feature is actually live on zainameen.com:

1. Set `status: published` and `publishedAt: YYYY-MM-DD` (the day it went live, not the day you wrote it).
2. Commit and merge to master. Vercel deploys it.

That's it. The entry appears on `/changelog`, gets its own page, shows up in the RSS feed, in related updates, on `/sitemap`, and in `/sitemap.xml`.

## Update an entry

- Small wording fixes: just edit the file. Don't change any dates.
- A real change to what the entry says (new information, a corrected claim): also set `updatedAt: YYYY-MM-DD`. The page shows "Updated" and the sitemap uses that date.

## Remove or unpublish an entry

Set `status: draft` (or delete the file). The page becomes a 404 and it drops out of the list, the RSS feed and the sitemap. If other entries list it in `relatedUpdates`, remove it there too (`npm test` will tell you).

## Publish a new tool

1. Add the tool's page config as usual and put its slug in the `LIVE` set in `lib/tools/registry.ts`.
2. Add it to `lib/tools/menu.ts` so it appears in the navbar dropdown.
3. Merge to master. The tool appears on `/tools`, `/sitemap`, `/sitemap.xml` and the footer count automatically.
4. Optional: add a changelog entry for it (see above).

## Publish a blog article

Publish it in Sanity. It appears on `/blog`, `/sitemap` (within an hour) and `/sitemap.xml` (right away) with no code change. Posts marked noindex or with a canonical URL elsewhere are left out of the sitemap.

## Add a new service page (or any fixed page)

1. Build the page under `app/`.
2. Add one line to `SITE_PAGES` in `lib/site-pages.ts`: its path, name, section and the source files that make up its content.
3. Merge. It's now in both sitemaps. Add it to the footer in `app/HomeComponents/Footer.tsx` if it should be there.

## How "last modified" dates work

- `npm run lastmod` reads git history and writes, for each page, the date its source files last changed. It also runs before every build.
- Only content files count. Changing the navbar, footer or global styles doesn't mark every page as modified.
- Redeploying never changes a date. If a date isn't known, the sitemap leaves `<lastmod>` out instead of guessing.
- Blog dates come from Sanity (`updatedAt`, else `publishedAt`). Changelog dates come from `updatedAt`, else `publishedAt`.
- Run `npm run lastmod` and commit `lib/lastmod.json` after merging content changes, in case the build server only has a shallow copy of git history.

## Remove a page

1. Delete it, or for a tool remove its slug from `LIVE`.
2. If a replacement exists, add a permanent redirect in `next.config.ts`. Otherwise it returns 404.
3. Remove it from `SITE_PAGES` (fixed pages) and from the footer if listed. Run `npm test` and `npm run build` to catch broken links.

## Verify the sitemap

- Open https://www.zainameen.com/sitemap.xml. Every URL should start with `https://www.zainameen.com`, with no `?` filters, no drafts, no redirects.
- `npm test` checks the changelog content and dates.
- Google Search Console: Indexing, Sitemaps, then check the status says Success and the discovered URL count looks right.

## Submit the sitemap to Google Search Console

1. Open https://search.google.com/search-console and pick the `zainameen.com` property.
2. In the left menu, open **Indexing, Sitemaps**.
3. Under "Add a new sitemap" type `sitemap.xml` and press **Submit**.
4. Wait a day, then check the row says **Success** and how many pages were discovered.
5. To see indexing, open **Indexing, Pages**. A sitemap helps Google find pages; it can't force them to be indexed.

## Check whether a URL is indexable

1. Paste the URL into the search bar at the top of Search Console (URL inspection).
2. Look for "URL is on Google", or the reason it isn't.
3. On the page itself, view source and check: no `noindex` in `<meta name="robots">`, the `<link rel="canonical">` points to itself, and the status is 200.
