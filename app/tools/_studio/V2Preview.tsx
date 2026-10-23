"use client";

import type { ProfileSkin } from "@/lib/tools/types";
import { ProfileScreen, initialsOf } from "./Phone";
import { EtsyScreen, FacebookPostScreen, InstaPostScreen, LinkedInCommentScreen, LinkedInPostScreen, LinkedInProfileScreen, PinScreen, ProductScreen, SerpScreen, TikTokVideoScreen, YouTubeResultsScreen, YouTubeWatchScreen, foldCaption } from "./PostScreen";
import s from "./studio.module.css";

// The v2 phone preview: shows the one result inside the same screens the studios use.
// Bio tools draw a profile; every other skin draws a post, listing or search result.

type Values = Record<string, string | boolean | string[]>;

export function V2Preview({ skin, profile, content, values, image }: { skin: string; profile: boolean; content: string; values: Values; image?: string }) {
  const str = (k: string) => (typeof values[k] === "string" ? (values[k] as string).trim() : "");
  const name = str("name") || str("business_name") || str("brand_name") || str("shop_name");
  const username = (name || "your.account").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, ".").replace(/^\.+|\.+$/g, "").slice(0, 24) || "your.account";
  const avatar = <span className={s.instaInitials}>{name ? initialsOf(name) : "?"}</span>;
  // A local data URL preview, so next/image would add nothing.
  // eslint-disable-next-line @next/next/no-img-element
  const media = image ? <img src={image} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : undefined;
  const placeholder = "Your result shows up here";

  if (profile)
    return (
      <ProfileScreen
        skin={skin as ProfileSkin}
        username={username}
        name={name || "Your Name"}
        bio={content || <span className={s.instaPlaceholder}>Your bio shows up here</span>}
        link={str("link") || undefined}
        avatar={avatar}
      />
    );

  const caption = skin === "tiktok" ? content : foldCaption(content, skin === "facebook" ? 180 : 125).head;
  switch (skin) {
    case "etsy":
      return <EtsyScreen username={name || "Your shop"} title={content} placeholder={placeholder} />;
    case "product":
      return <ProductScreen name={str("product_name") || name} caption={content} placeholder={placeholder} />;
    case "linkedin-headline":
    case "linkedin-about":
      return <LinkedInProfileScreen name={str("display_name") || "Your Name"} headline={skin === "linkedin-headline" ? content : ""} about={skin === "linkedin-about" ? content : ""} focus={skin === "linkedin-headline" ? "headline" : "about"} placeholder={placeholder} />;
    case "linkedin-comment":
      return <LinkedInCommentScreen name={str("display_name") || "Your Name"} post={str("post")} caption={content} placeholder={placeholder} />;
    case "linkedin-post":
      return <LinkedInPostScreen name={str("display_name") || "Your Name"} caption={content} placeholder={placeholder} />;
    case "google-title":
    case "google-description":
      return <SerpScreen site={name || "Your site"} url={(name || "yoursite").toLowerCase().replace(/[^a-z0-9]+/g, "") + ".com › page"} title={skin === "google-title" ? content : str("title")} description={skin === "google-description" ? content : ""} focus={skin === "google-title" ? "title" : "description"} placeholder={placeholder} />;
    case "pinterest-title":
    case "pinterest-description":
      return <PinScreen username={name || "Your account"} title={skin === "pinterest-title" ? content : ""} description={skin === "pinterest-description" ? content : ""} focus={skin === "pinterest-title" ? "title" : "description"} placeholder={placeholder} />;
    case "youtube-watch":
      return <YouTubeWatchScreen username={name || "Your channel"} title={str("title") || str("topic")} caption={content} placeholder={placeholder} />;
    case "youtube":
      return <YouTubeResultsScreen username={name || "Your channel"} caption={content} keyword={str("keyword")} placeholder={placeholder} />;
    case "tiktok":
      return <TikTokVideoScreen username={`@${username}`} avatar={avatar} type="Reel" caption={caption} placeholder={placeholder} />;
    case "facebook":
      return <FacebookPostScreen username={name || "Your Page"} avatar={avatar} type="Photo" caption={caption} placeholder={placeholder} />;
    default:
      return <InstaPostScreen username={username} avatar={avatar} type="Photo" caption={caption} placeholder={placeholder} media={media} />;
  }
}
