import type { PortableTextBlock } from "next-sanity";

export type SanityImage = {
  asset?: { _ref: string; _type: "reference" };
  crop?: { top: number; bottom: number; left: number; right: number };
  hotspot?: { x: number; y: number; height: number; width: number };
  alt?: string;
  lqip?: string;
  dimensions?: { width: number; height: number; aspectRatio: number };
};

export type CategoryRef = { title: string; slug: string };

export type PostCard = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  updatedAt?: string | null;
  mainImage?: SanityImage | null;
  author?: { name: string; slug: string } | null;
  categories?: CategoryRef[] | null;
  chars?: number | null;
};

export type Author = {
  name: string;
  slug: string;
  jobTitle?: string | null;
  bio?: string | null;
  website?: string | null;
  linkedin?: string | null;
  socialLinks?: { _key: string; label: string; url: string }[] | null;
  image?: SanityImage | null;
};

export type Post = Omit<PostCard, "author"> & {
  headlineAccent?: string | null;
  tags?: string[] | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  canonicalUrl?: string | null;
  noindex?: boolean | null;
  ogImage?: SanityImage | null;
  author?: Author | null;
  body?: PortableTextBlock[] | null;
  faqs?: { _key: string; question: string; answer: string }[] | null;
  cta?: { mode?: "default" | "custom" | "none"; heading?: string; text?: string; buttonLabel?: string; buttonUrl?: string } | null;
  relatedRefs?: string[] | null;
  relatedPicked?: PostCard[] | null;
  sameCategory?: (PostCard & { tags?: string[] | null })[] | null;
  latest?: PostCard[] | null;
};

export type Category = { title: string; slug: string; description?: string | null; posts: PostCard[] };

export type AuthorWithPosts = Author & { posts: PostCard[] };
