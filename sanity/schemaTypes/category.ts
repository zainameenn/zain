import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Name",
      description: "For example: SEO, Reddit Marketing, SaaS Growth.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "URL slug",
      description: "Used in the blog filter link: /blog?category=your-slug. Click Generate.",
      options: { source: "title", maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      description: "One or two sentences shown on the blog page when this category is selected.",
      rows: 3,
      validation: (rule) => rule.max(200).warning("Keep it under 200 characters."),
    }),
    defineField({
      name: "order",
      type: "number",
      title: "Display order",
      description: "Lower numbers appear first in the blog filters. Categories only appear once they have a published post.",
      validation: (rule) => rule.integer(),
    }),
    defineField({
      name: "hidden",
      type: "boolean",
      title: "Hide from the blog filters",
      description: "Posts in this category still show on the blog. The category just isn't offered as a filter.",
      initialValue: false,
    }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "description", hidden: "hidden" },
    prepare: ({ title, subtitle, hidden }) => ({ title: hidden ? `${title} (hidden)` : title, subtitle }),
  },
});
