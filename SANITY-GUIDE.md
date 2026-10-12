# Your blog: how to use it

This is the plain English guide to writing and publishing on zainameen.com/insights.

## 1. Open your dashboard

Go to **https://www.zainameen.com/studio** and sign in with **Google** (the same account you use for sanity.io).

On the left you'll see three things:

- **Blog posts**: your articles
- **Authors**: your profile (already set up)
- **Categories**: SEO, Reddit marketing, Social media, Paid ads, Growth strategy, Content strategy

You can bookmark the Studio. It works in any browser, and you don't need to install anything.

## 2. Write and publish an article

1. Click **Blog posts**, then the **pencil / +** icon at the top to create a new post.
2. **Title**: type the headline. Put the main keyword near the start.
3. **URL slug**: click **Generate**. This becomes the address, for example `zainameen.com/insights/how-to-rank-on-reddit`. Try not to change it after publishing.
4. **Italic ending of the headline** (optional): copy the last few words of your title here to show them in the italic serif font, like the headlines on the rest of the site.
5. **Excerpt**: one or two sentences. They appear under the headline and on the article cards.
6. **Featured image**: upload a wide image (at least 1600 pixels wide), then fill in **Alt text** (a short description of what's in the image).
7. **Article**: write here, or paste from Google Docs or Word. Headings, bold, links and lists come across when you paste.
   - Use **Heading (H2)** for main sections. They build the "On this page" menu automatically.
   - Use **Subheading (H3)** for sections inside a section.
   - The **+** button inside the editor adds an image, a **Callout box** (key takeaway, tip, warning) or a **Table**.
   - To add a link, highlight the words and click the link icon. Use **Link to another article** for your own posts: those links keep working even if a slug changes.
8. Open the **Author and categories** tab: you're already selected as the author. Pick at least one category (the first one is the main category).
9. Open the **SEO and sharing** tab: add an **SEO title** (50 to 60 characters) and an **SEO meta description** (120 to 155 characters). If you leave them empty, the headline and excerpt are used instead.
10. Optional, in the **FAQ, CTA and related** tab:
    - **FAQ section**: questions and answers shown at the end of the article.
    - **Call to action box**: the default is your normal "Take a breath. Then tell me what's stuck." box. You can write a custom one or turn it off.
    - **Related articles**: pick up to 3, or leave it empty and recent articles from the same category are shown.
11. Click **Publish** (bottom right).

The article goes live within a few seconds and is added to your sitemap automatically.

If something important is missing (title, slug, excerpt, image, alt text, author, category or article text), the Publish button is blocked and the field is marked in red. Yellow warnings (like a long SEO title) are only advice and don't block publishing.

**Drafts:** everything you type is saved automatically as a draft. Drafts are never visible on the website. Only clicking Publish makes them public.

**Scheduling:** set the **Publication date** to a future time and publish. The article appears after that time (within about an hour).

## 3. Preview before publishing

Open a draft and click the **Presentation** tab at the top of the Studio (or the eye icon). You'll see the article exactly as it will look on the site, with your unpublished changes, and you can click any text to jump to that field.

A dark "Preview: you are seeing drafts" badge in the corner means you're in preview mode. Click **Exit preview** to go back to the normal site.

(Preview needs the one-off setup in section 7.)

## 4. Edit or update an article

Open the post, make your changes and click **Publish** again. For a meaningful update, also set **Last updated date** (Author and categories tab), so readers and Google see "Updated" on the article.

To take an article down, open it, click the **⋯** menu next to Publish, and choose **Unpublish** (keeps it as a draft) or **Delete**.

## 5. Images

- Upload images directly into the image fields or the article. They're resized and compressed automatically for phones and desktops.
- After uploading, click the **crop icon** on the image to set the focal point. When the image is cropped (on cards, for example), that spot always stays visible.
- Always fill in **Alt text**.
- To reuse an image you uploaded before, click **Select** on any image field instead of Upload.
- **Social sharing image** (SEO tab) is optional. Use 1200 by 630 pixels if you want a special image for LinkedIn and X.

## 6. Your author profile

Click **Authors**, then **Zain Ul Abdin**. You can change your photo, professional title, biography, website, LinkedIn and other social links. Click **Publish** to save.

Your profile currently has **no photo**, so your initials are shown. Upload a square photo whenever you like.

Your author page is at **zainameen.com/insights/author/zain-ul-abdin**.

## 7. One-off setup still needed (about 5 minutes)

These steps need your Vercel login, so only you can do them.

### a) Add two settings to Vercel

They live in the file `.env.local` in this project folder (it is never uploaded to GitHub). Open it in VS Code to copy the values. Don't paste them anywhere else.

1. Go to vercel.com, open your **zain** project, then **Settings → Environment Variables**.
2. Add `SANITY_API_READ_TOKEN` with the value from `.env.local`. Tick **Production** and **Preview**. Save.
3. Add `SANITY_REVALIDATE_SECRET` with the value from `.env.local`. Tick **Production** and **Preview**. Save.

What they do:

- `SANITY_API_READ_TOKEN` lets the site show drafts in the preview, and only there. It's read-only.
- `SANITY_REVALIDATE_SECRET` lets Sanity tell the website "something was just published, refresh now". A webhook called "Refresh website on publish" has already been created in Sanity for this.

Without them the blog still works: published articles still appear (within about a minute instead of instantly), but preview won't work.

### b) Deploy

The blog is on the branch `sanity-blog`. Once it's merged into `master`, Vercel deploys it. After the live site has finished deploying, run `npm run indexnow` once.

## What was already set up for you

- Your author profile, with the bio you provided, and six categories.
- Studio access for `https://www.zainameen.com` and `http://localhost:3000` (Sanity "CORS origins").
- A read-only token called "Website preview (read drafts)".
- The "Refresh website on publish" webhook.

You can see or change all of these at https://www.sanity.io/manage/project/uziw3l77 under **API**.

## Where things show up

| Page | Address |
| --- | --- |
| All articles | zainameen.com/insights |
| One article | zainameen.com/insights/your-slug |
| A category | zainameen.com/insights/category/seo |
| Your author page | zainameen.com/insights/author/zain-ul-abdin |
| Dashboard | zainameen.com/studio |

Until the first article is published, /insights keeps showing the current "coming soon" page exactly as it is today.
