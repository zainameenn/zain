import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * The article editor. Kept to what an article needs: headings, text, lists, quotes, links,
 * images, callout boxes and simple tables. No layout or page builder blocks.
 */
export const blockContent = defineType({
  name: "blockContent",
  title: "Article body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      // H1 is the article title, so the body starts at H2. H2 and H3 build the table of contents.
      styles: [
        { title: "Paragraph", value: "normal" },
        { title: "Heading (H2)", value: "h2" },
        { title: "Subheading (H3)", value: "h3" },
        { title: "Small heading (H4)", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet list", value: "bullet" },
        { title: "Numbered list", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Bold", value: "strong" },
          { title: "Italic", value: "em" },
          { title: "Code", value: "code" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            type: "object",
            title: "Link",
            description: "Link to any page. For your own pages you can use a short path like /contact or /services.",
            fields: [
              defineField({
                name: "href",
                type: "url",
                title: "URL",
                validation: (rule) =>
                  rule.required().uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
              }),
              defineField({
                name: "openInNewTab",
                type: "boolean",
                title: "Open in a new tab",
                initialValue: false,
              }),
            ],
          }),
          defineArrayMember({
            name: "internalLink",
            type: "object",
            title: "Link to another article",
            description: "Pick one of your articles. The link keeps working even if that article's URL changes.",
            fields: [
              defineField({
                name: "reference",
                type: "reference",
                title: "Article",
                to: [{ type: "post" }],
                validation: (rule) => rule.required(),
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      title: "Image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alt text",
          description: "Describe what the image shows for people using screen readers and for Google. Required.",
          validation: (rule) => rule.required().error("Add alt text so the image is accessible."),
        }),
        defineField({
          name: "caption",
          type: "string",
          title: "Caption",
          description: "Optional. Shown under the image.",
        }),
      ],
    }),
    defineArrayMember({
      name: "callout",
      type: "object",
      title: "Callout box",
      description: "A highlighted box for a key takeaway, tip or warning.",
      fields: [
        defineField({
          name: "tone",
          type: "string",
          title: "Type",
          options: {
            list: [
              { title: "Key takeaway", value: "takeaway" },
              { title: "Tip", value: "tip" },
              { title: "Warning", value: "warning" },
              { title: "Note", value: "note" },
            ],
            layout: "radio",
            direction: "horizontal",
          },
          initialValue: "takeaway",
        }),
        defineField({ name: "title", type: "string", title: "Title", description: "Optional. For example: Key takeaway." }),
        defineField({
          name: "body",
          type: "text",
          title: "Text",
          rows: 4,
          validation: (rule) => rule.required(),
        }),
      ],
      preview: {
        select: { title: "title", body: "body", tone: "tone" },
        prepare: ({ title, body, tone }) => ({
          title: title || body || "Callout",
          subtitle: `Callout: ${tone ?? "takeaway"}`,
        }),
      },
    }),
    defineArrayMember({
      name: "tableBlock",
      type: "object",
      title: "Table",
      fields: [
        defineField({
          name: "table",
          type: "table",
          title: "Table",
          description: "The first row is shown as the header row.",
          validation: (rule) => rule.required(),
        }),
        defineField({ name: "caption", type: "string", title: "Caption", description: "Optional. Shown under the table." }),
      ],
      preview: {
        select: { caption: "caption", rows: "table.rows" },
        prepare: ({ caption, rows }) => ({
          title: caption || "Table",
          subtitle: `${Array.isArray(rows) ? rows.length : 0} rows`,
        }),
      },
    }),
  ],
});
