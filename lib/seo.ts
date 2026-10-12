import type { Metadata } from "next";

const SITE_NAME = "Zain Ul Abdin";
const TWITTER_HANDLE = "@zainnameen";
const OG_IMAGE = {
  url: "/assets/v9/g07.png",
  width: 1448,
  height: 1086,
  alt: "Zain Ul Abdin, Growth Marketing Specialist",
};

type OgImage = { url: string; width: number; height: number; alt: string };

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  /** Replaces the default sharing image (blog posts use their own). */
  image?: OgImage;
  /** Blog posts are shared as articles, with their dates and author. */
  article?: { publishedTime: string; modifiedTime?: string; authors?: string[]; section?: string; tags?: string[] };
};

// Next.js replaces a parent's openGraph/twitter objects entirely when a page
// defines them, so every page gets the full set from here.
export function buildMetadata({ title, description, path, noindex, image, article }: BuildMetadataInput): Metadata {
  const images = [image ?? OG_IMAGE];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: SITE_NAME,
      locale: "en_US",
      images,
      ...(article ? { type: "article", ...article } : { type: "website" }),
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title,
      description,
      images,
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
