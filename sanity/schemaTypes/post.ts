import { defineArrayMember, defineField, defineType } from "sanity";
import { apiVersion } from "../env";

// These words are used by other Insights URLs (/insights/category/..., /insights/author/...).
const RESERVED_SLUGS = ["category", "author", "page", "feed"];

export const post = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "details", title: "Author and categories" },
    { name: "seo", title: "SEO and sharing" },
    { name: "extras", title: "FAQ, CTA and related" },
  ],
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Title",
      description: "The article headline. Put the main keyword near the start.",
      group: "content",
      validation: (rule) => [
        rule.required().error("Every post needs a title."),
        rule.max(110).warning("Long titles are hard to read. Try to keep it under 110 characters."),
      ],
    }),
    defineField({
      name: "headlineAccent",
      type: "string",
      title: "Italic ending of the headline (optional)",
      description:
        "To match the rest of the site, the last few words of the headline can be shown in the italic serif font. Copy those words here exactly as they appear at the end of the title.",
      group: "content",
      validation: (rule) =>
        rule.custom((value, context) => {
          if (!value) return true;
          const title = (context.document?.title as string | undefined) ?? "";
          return title.trim().endsWith(value.trim()) || "This must match the last words of the title exactly.";
        }),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "URL slug",
      description: "The article address: zainameen.com/insights/your-slug. Click Generate to create it from the title. Avoid changing it after publishing.",
      group: "content",
      options: {
        source: "title",
        maxLength: 80,
        slugify: (input) =>
          input
            .toLowerCase()
            .normalize("NFKD")
            .replace(/[̀-ͯ]/g, "")
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/[\s-]+/g, "-")
            .slice(0, 80)
            .replace(/-+$/, ""),
      },
      validation: (rule) =>
        rule.required().custom((value) => {
          const current = value?.current ?? "";
          if (!current) return true;
          if (RESERVED_SLUGS.includes(current)) return `"${current}" is reserved for another page. Pick a different slug.`;
          if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(current)) return "Use only lowercase letters, numbers and single hyphens.";
          return true;
        }),
    }),
    defineField({
      name: "excerpt",
      type: "text",
      title: "Excerpt (short introduction)",
      description: "One or two sentences shown under the headline and on article cards. Also used as the Google description if you leave the SEO description empty.",
      rows: 3,
      group: "content",
      validation: (rule) => [
        rule.required().error("Add a short introduction."),
        rule.max(260).warning("Keep it short: under 260 characters reads best on cards."),
      ],
    }),
    defineField({
      name: "mainImage",
      type: "image",
      title: "Featured image",
      description: "Shown at the top of the article and on cards. Use a wide image (at least 1600 pixels wide). Click the crop icon to set the focal point.",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
          description: "Describe what the image shows. Required for accessibility and SEO.",
          validation: (rule) => rule.required().error("Add alt text to the featured image."),
        }),
      ],
      validation: (rule) => rule.required().error("Add a featured image."),
    }),
    defineField({
      name: "body",
      type: "blockContent",
      title: "Article",
      description: "Write or paste your article. Use Heading (H2) for main sections: they build the table of contents automatically.",
      group: "content",
      validation: (rule) => rule.required().error("The article is empty."),
    }),
    defineField({
      name: "author",
      type: "reference",
      title: "Author",
      to: [{ type: "author" }],
      group: "details",
      // Pre-selects the first author (you), so new posts start with the byline filled in.
      initialValue: async (_params, { getClient }) => {
        const id = await getClient({ apiVersion }).fetch<string | null>(`*[_type == "author" && !(_id in path("drafts.**"))] | order(_createdAt asc)[0]._id`);
        // No author yet: leave the field empty (the type doesn't allow undefined, but Sanity does).
        return (id ? { _ref: id } : undefined) as { _ref: string };
      },
      validation: (rule) => rule.required().error("Choose an author."),
    }),
    defineField({
      name: "categories",
      type: "array",
      title: "Categories",
      description: "The first category is the main one: it appears above the headline and in the breadcrumb.",
      group: "details",
      of: [defineArrayMember({ type: "reference", to: [{ type: "category" }] })],
      validation: (rule) => rule.required().min(1).error("Choose at least one category.").unique(),
    }),
    defineField({
      name: "tags",
      type: "array",
      title: "Tags (optional)",
      description: "Extra keywords, for example: Google Search Console, subreddits. Used to suggest related articles. They don't create pages.",
      group: "details",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      title: "Publication date",
      description: "Filled in automatically. A future date schedules the post: it appears on the site after that time (within about an hour).",
      group: "details",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "updatedAt",
      type: "datetime",
      title: "Last updated date (optional)",
      description: "Set this only when you make a meaningful update. It is shown as 'Updated' on the article and tells Google the content is fresh.",
      group: "details",
      validation: (rule) =>
        rule.custom((value, context) => {
          const published = context.document?.publishedAt as string | undefined;
          if (value && published && new Date(value) < new Date(published)) return "The update date can't be before the publication date.";
          return true;
        }),
    }),
    defineField({
      name: "seoTitle",
      type: "string",
      title: "SEO title",
      description: "The blue link title in Google. Leave empty to use the headline. Aim for 50 to 60 characters with the keyword first.",
      group: "seo",
      validation: (rule) => rule.max(65).warning("Google usually cuts titles after about 60 characters."),
    }),
    defineField({
      name: "seoDescription",
      type: "text",
      title: "SEO meta description",
      description: "The grey text under the link in Google. Leave empty to use the excerpt. Aim for 120 to 155 characters with the keyword near the start.",
      rows: 3,
      group: "seo",
      validation: (rule) => rule.max(160).warning("Google usually cuts descriptions after about 155 characters."),
    }),
    defineField({
      name: "ogImage",
      type: "image",
      title: "Social sharing image (optional)",
      description: "Shown when the article is shared on LinkedIn, X, WhatsApp and so on. Leave empty to use the featured image. Best size: 1200 by 630 pixels.",
      group: "seo",
      options: { hotspot: true },
    }),
    defineField({
      name: "canonicalUrl",
      type: "url",
      title: "Canonical URL override (advanced, usually empty)",
      description: "Only fill this in if the same article was first published on another website and that copy should rank instead. Otherwise leave it empty.",
      group: "seo",
      validation: (rule) => rule.uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "noindex",
      type: "boolean",
      title: "Hide from search engines",
      description: "Turn on to keep this article out of Google and the sitemap. It stays visible on the site.",
      group: "seo",
      initialValue: false,
    }),
    defineField({
      name: "faqs",
      type: "array",
      title: "FAQ section (optional)",
      description: "Questions and answers shown at the end of the article. Also added to the page's structured data.",
      group: "extras",
      of: [
        defineArrayMember({
          type: "object",
          name: "faq",
          fields: [
            defineField({ name: "question", type: "string", title: "Question", validation: (rule) => rule.required() }),
            defineField({
              name: "answer",
              type: "text",
              title: "Answer",
              rows: 4,
              description: "Leave an empty line between paragraphs.",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        }),
      ],
    }),
    defineField({
      name: "cta",
      type: "object",
      title: "Call to action box",
      description: "The box shown after the article.",
      group: "extras",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "mode",
          type: "string",
          title: "Show",
          options: {
            list: [
              { title: "Default (Tell me what's stuck, links to Contact)", value: "default" },
              { title: "Custom text and link", value: "custom" },
              { title: "No call to action", value: "none" },
            ],
            layout: "radio",
          },
          initialValue: "default",
        }),
        defineField({
          name: "heading",
          type: "string",
          title: "Heading",
          hidden: ({ parent }) => parent?.mode !== "custom",
          validation: (rule) =>
            rule.custom((value, context) => ((context.parent as { mode?: string })?.mode === "custom" && !value ? "Add a heading." : true)),
        }),
        defineField({
          name: "text",
          type: "text",
          title: "Text",
          rows: 3,
          hidden: ({ parent }) => parent?.mode !== "custom",
        }),
        defineField({
          name: "buttonLabel",
          type: "string",
          title: "Button text",
          hidden: ({ parent }) => parent?.mode !== "custom",
          validation: (rule) =>
            rule.custom((value, context) => ((context.parent as { mode?: string })?.mode === "custom" && !value ? "Add the button text." : true)),
        }),
        defineField({
          name: "buttonUrl",
          type: "url",
          title: "Button link",
          description: "For your own pages use a path, for example /contact, /services or /services/seo-specialist-for-saas.",
          hidden: ({ parent }) => parent?.mode !== "custom",
          validation: (rule) =>
            rule.uri({ allowRelative: true, scheme: ["http", "https", "mailto"] }).custom((value, context) =>
              (context.parent as { mode?: string })?.mode === "custom" && !value ? "Add the button link." : true,
            ),
        }),
      ],
    }),
    defineField({
      name: "related",
      type: "array",
      title: "Related articles (optional)",
      description: "Pick up to 3. If you leave this empty, recent articles from the same category are shown.",
      group: "extras",
      of: [
        defineArrayMember({
          type: "reference",
          to: [{ type: "post" }],
          options: { filter: ({ document }) => ({ filter: "_id != $id && !(_id in path('drafts.**'))", params: { id: document._id.replace(/^drafts\./, "") } }) },
        }),
      ],
      validation: (rule) => rule.max(3).unique(),
    }),
  ],
  orderings: [
    { title: "Publication date, newest first", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "title", author: "author.name", date: "publishedAt", media: "mainImage" },
    prepare: ({ title, author, date, media }) => ({
      title,
      subtitle: [author, date ? new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : null].filter(Boolean).join(" · "),
      media,
    }),
  },
});
