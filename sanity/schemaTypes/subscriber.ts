import { defineField, defineType } from "sanity";

// Created by the blog's newsletter form (app/api/subscribe). Stored under a private ID,
// so subscriber emails are never readable through the public API. Fields are read only; entries can still be deleted.
export const subscriber = defineType({
  name: "subscriber",
  title: "Newsletter subscriber",
  type: "document",
  fields: [
    defineField({ name: "email", type: "string", title: "Email", readOnly: true }),
    defineField({ name: "subscribedAt", type: "datetime", title: "Subscribed at", readOnly: true }),
    defineField({ name: "source", type: "string", title: "Signed up on", readOnly: true }),
  ],
  orderings: [{ title: "Newest first", name: "subscribedAtDesc", by: [{ field: "subscribedAt", direction: "desc" }] }],
  preview: {
    select: { title: "email", date: "subscribedAt", source: "source" },
    prepare: ({ title, date, source }) => ({
      title,
      subtitle: [source, date ? new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : null].filter(Boolean).join(" · "),
    }),
  },
});
