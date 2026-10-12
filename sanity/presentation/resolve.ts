import { defineDocuments, defineLocations, type PresentationPluginOptions } from "sanity/presentation";

// Tells the preview tool which page shows which document, so "Preview" opens the right URL.
export const resolve: PresentationPluginOptions["resolve"] = {
  mainDocuments: defineDocuments([
    { route: "/insights/:slug", filter: `_type == "post" && slug.current == $slug` },
    { route: "/insights/category/:slug", filter: `_type == "category" && slug.current == $slug` },
    { route: "/insights/author/:slug", filter: `_type == "author" && slug.current == $slug` },
  ]),
  locations: {
    post: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || "Untitled", href: `/insights/${doc?.slug}` },
          { title: "Insights", href: "/insights" },
        ],
      }),
    }),
    author: defineLocations({
      select: { title: "name", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || "Author", href: `/insights/author/${doc?.slug}` }],
      }),
    }),
    category: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [{ title: doc?.title || "Category", href: `/insights/category/${doc?.slug}` }],
      }),
    }),
  },
};
