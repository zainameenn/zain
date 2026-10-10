import type { Metadata } from "next";

const SITE_NAME = "Zain Ul Abdin";
const TWITTER_HANDLE = "@zainnameen";
const OG_IMAGE = {
  url: "/assets/v9/g07.png",
  width: 1448,
  height: 1086,
  alt: "Zain Ul Abdin, Growth Marketing Specialist",
};

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  /** Overrides the default share image. */
  image?: { url: string; width: number; height: number; alt: string };
  type?: "website" | "article";
};

// Next.js replaces a parent's openGraph/twitter objects entirely when a page
// defines them, so every page gets the full set from here.
export function buildMetadata({ title, description, path, noindex, image = OG_IMAGE, type = "website" }: BuildMetadataInput): Metadata {
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
      type,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title,
      description,
      images: [image],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
