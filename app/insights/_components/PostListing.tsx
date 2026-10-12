import Link from "next/link";
import { stegaClean } from "next-sanity";
import type { CategoryRef, PostCard as PostCardData } from "@/sanity/lib/types";
import { InsightsBrowser } from "./InsightsBrowser";
import { PostCard } from "./parts";
import { categoryPath } from "./utils";
import s from "../insights.module.css";

/** Category links. They are real pages, so they work without JavaScript and can be indexed. */
export function CategoryFilters({ categories, active }: { categories: CategoryRef[]; active?: string }) {
  if (!categories.length) return null;
  return (
    <nav aria-label="Categories">
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", gap: 8 }}>
        <li>
          <Link href="/insights" className={`${s.chip} ${!active ? s.chipActive : ""}`} aria-current={!active ? "page" : undefined}>
            All
          </Link>
        </li>
        {categories.map((c) => (
          <li key={c.slug}>
            <Link href={categoryPath(c.slug)} className={`${s.chip} ${active === c.slug ? s.chipActive : ""}`} aria-current={active === c.slug ? "page" : undefined}>
              {c.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function PostListing({ posts, categories, active }: { posts: PostCardData[]; categories: CategoryRef[]; active?: string }) {
  const index = posts.map((p) => stegaClean([p.title, p.excerpt, ...(p.categories ?? []).map((c) => c.title)].join(" ")).toLowerCase());
  return (
    <InsightsBrowser
      filters={<CategoryFilters categories={categories} active={active} />}
      index={index}
      cards={posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    />
  );
}
