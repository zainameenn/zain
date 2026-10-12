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
      description: "For example: SEO, Reddit marketing, Social media.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "URL slug",
      description: "Used for the category page: /insights/category/your-slug. Click Generate.",
      options: { source: "title", maxLength: 60 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      description: "One or two sentences shown at the top of the category page and used as its Google description.",
      rows: 3,
      validation: (rule) => rule.max(200).warning("Keep it under 200 characters."),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});
