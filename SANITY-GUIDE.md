# Your blog: how to use it

This is the plain English guide to writing and publishing on zainameen.com/blog.

## 1. Open your dashboard

Go to **https://www.zainameen.com/studio** and sign in with **Google** (the same account you use for sanity.io).

Make sure **Structure** is selected at the top. On the left you'll see:

- **Blog posts**: your articles
- **Authors**: your profile
- **Categories**: SEO, Reddit Marketing, SaaS Growth, Social Media, Content Marketing, AI Search, Growth Strategy, Case Studies
- **Newsletter subscribers**: everyone who signed up on the blog (read only)

sanity.io/manage is the account admin area. It never shows your posts.

## 2. Write and publish an article

1. Click **Blog posts**, then the **pencil / +** icon.
2. **Title**: the headline. Put the main keyword near the start.
3. **Italic ending of the headline** (optional): copy only the last few words of the title here (for example `What's Stuck`) to show them in the italic serif font. Leave it empty for a plain headline. If you paste the whole title, the whole headline turns italic.
4. **URL slug**: click **Generate**. This becomes `zainameen.com/blog/your-slug`. Try not to change it after publishing.
5. **Excerpt**: one or two sentences. Shown under the headline and on cards.
6. **Featured image**: upload a wide image and fill in **Alt text**. **Caption** is optional.
7. **Article**: write here, or paste from Google Docs or Word.
   - **Heading (H2)** for main sections, **Subheading (H3)** inside them. With 3 or more headings, an "On this page" menu appears automatically.
   - The **+** button adds an image, a **Callout box**, a **Code block** or a **Table**.
   - To link, highlight words and click the link icon. Use **Link to another article** for your own posts.
8. **Author and categories** tab: you're pre-selected as the author. Pick at least one category (the first one is the main category). Until you do, this tab shows a red **!** and Publish stays blocked. That's on purpose.
   - **Feature this post on the blog page**: puts it in the big slot at the top of /blog. If nothing is featured, the newest post is used. If several are featured, the highest **Featured priority** wins.
9. **SEO and sharing** tab: **SEO title** (50 to 60 characters) and **SEO meta description** (120 to 155 characters). Empty means the headline and excerpt are used.
10. Optional, **FAQ, CTA and related** tab: FAQ, the call to action box (default is "Got the same problem in your business?" linking to Contact), and up to 3 related articles.
11. Click **Publish**.

It goes live within seconds, appears on /blog under its category, becomes searchable, and is added to the sitemap.

**Drafts** are saved automatically and are never public. **Scheduling**: set a future Publication date and publish; it appears after that time (within about an hour).

## 3. Preview before publishing

Open the post and click **Presentation** at the top of the Studio. You see the real page with your unpublished changes. Turn on **Edit** to click any text and jump to that field. The dark "Preview: you are seeing drafts" badge means you're in preview; **Exit preview** goes back to normal.

## 4. Edit, update or remove

Change the post and click **Publish** again. For a meaningful update, also set **Last updated date**. To take an article down, use the **⋯** menu next to Publish: **Unpublish** (keeps the draft) or **Delete**. It disappears from the site, the blog list and the sitemap.

## 5. Images

Upload straight into image fields. They're resized and compressed automatically. Click the **crop icon** to set the focal point used when cards crop the image. Always add alt text.

## 6. Categories

Categories only show as filters on /blog once at least one published post uses them. **Display order** sets their order (lower first). **Hide from the blog filters** removes one from the filter row without touching posts. The older "Paid ads" and "Content strategy" categories are still there at the end; delete them if you don't need them.

## 7. Newsletter

The form on /blog saves each email once in Sanity (**Newsletter subscribers**). Emails are private: the public API can't read them. Nothing is sent automatically. When you're ready to send emails, export the list or connect an email tool (for example Kit, Buttondown or Mailchimp), and use its unsubscribe link. Until then, the form tells people to email hello@zainameen.com to be removed, so delete them from **Newsletter subscribers** when they ask (open the entry, then the ⋯ menu, then Delete).

## 8. Where things are

| Page | Address |
| --- | --- |
| Blog | zainameen.com/blog |
| One article | zainameen.com/blog/your-slug |
| A category | zainameen.com/blog?category=seo |
| Search | zainameen.com/blog?q=reddit (not indexed by Google) |
| Your author page | zainameen.com/blog/author/zain-ul-abdin |
| Keybooks page | zainameen.com/insights (in the footer) |
| Dashboard | zainameen.com/studio |

Old article links under /insights/... redirect permanently to /blog/....

## 9. Settings in Vercel (already done)

These are set as hidden secrets for Preview and Production. Their values are only in the `.env.local` file on your computer, which is never uploaded to GitHub.

- `SANITY_API_READ_TOKEN`: lets preview mode show drafts. Read only.
- `SANITY_REVALIDATE_SECRET`: proves "something was published" messages really come from Sanity, so pages update instantly.
- `SANITY_API_WRITE_TOKEN`: lets the newsletter form save signups.

You can see or revoke the tokens at https://www.sanity.io/manage/project/uziw3l77 under **API**.

## 10. After a deploy

Once a change is live, run `npm run indexnow` once, ideally after your first article is published, so search engines hear about the new URL.
