import type { StructureResolver } from "sanity/structure";

// The Studio sidebar: posts first, then authors and categories, then newsletter signups.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.documentTypeListItem("post").title("Blog posts"),
      S.divider(),
      S.documentTypeListItem("author").title("Authors"),
      S.documentTypeListItem("category").title("Categories"),
      S.divider(),
      S.documentTypeListItem("subscriber").title("Newsletter subscribers"),
    ]);
