import { defineArrayMember, defineField, defineType } from "sanity";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: "Name",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: "URL slug",
      description: "Used for the author page: /insights/author/your-slug. Click Generate to create it from the name.",
      options: { source: "name", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "jobTitle",
      type: "string",
      title: "Professional title",
      description: "Shown under your name in the article byline. For example: Growth Marketing Specialist.",
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Profile photo",
      description: "A square photo works best. If empty, your initials are shown instead.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
          description: "For example: Photo of Zain Ul Abdin.",
        }),
      ],
    }),
    defineField({
      name: "bio",
      type: "text",
      title: "Biography",
      description: "Shown in the author box at the end of every article and on your author page. Leave an empty line between paragraphs.",
      rows: 6,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "website",
      type: "url",
      title: "Website",
    }),
    defineField({
      name: "linkedin",
      type: "url",
      title: "LinkedIn URL",
    }),
    defineField({
      name: "socialLinks",
      type: "array",
      title: "Other social links",
      description: "Optional. For example X, Instagram or GitHub.",
      of: [
        defineArrayMember({
          type: "object",
          name: "socialLink",
          fields: [
            defineField({ name: "label", type: "string", title: "Platform", validation: (rule) => rule.required() }),
            defineField({ name: "url", type: "url", title: "URL", validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "label", subtitle: "url" } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "jobTitle", media: "image" },
  },
});
