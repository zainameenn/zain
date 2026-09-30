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
};

// Next.js replaces a parent's openGraph/twitter objects entirely when a page
// defines them, so every page gets the full set from here.
export function buildMetadata({ title, description, path, noindex }: BuildMetadataInput): Metadata {
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
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title,
      description,
      images: [OG_IMAGE],
    },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
