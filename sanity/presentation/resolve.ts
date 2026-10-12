import { defineDocuments, defineLocations, type PresentationPluginOptions } from "sanity/presentation";

// Tells the preview tool which page shows which document, so "Preview" opens the right URL.
export const resolve: PresentationPluginOptions["resolve"] = {
  mainDocuments: defineDocuments([
    { route: "/blog/:slug", filter: `_type == "post" && slug.current == $slug` },
    { route: "/blog/author/:slug", filter: `_type == "author" && slug.current == $slug` },
  ]),
  locations: {
    post: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || "Untitled", href: `/blog/${doc?.slug}` },
          { title: "Blog", href: "/blog" },
        ],
      }),
    }),
    author: defineLocations({
      select: { title: "name", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || "Author", href: `/blog/author/${doc?.slug}` }],
      }),
    }),
    category: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || "Category", href: `/blog?category=${doc?.slug}` }],
      }),
    }),
  },
};
