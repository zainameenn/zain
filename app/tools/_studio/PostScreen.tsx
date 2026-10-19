"use client";

import { useState, type ReactNode } from "react";
import { graphemes } from "@/lib/tools/validate";
import s from "./studio.module.css";

// An Instagram feed post, built in HTML and CSS so the caption can change live.
// The caption is cut at the feed's "more" point; tapping "more" shows the rest, like the app.
// No like counts or comments: those would look like claims about the visitor's account.

export type PostType = "Photo" | "Carousel" | "Reel";

/** Roughly where Instagram's feed cuts a caption: about 125 characters, or the second line break, whichever comes first. */
export function foldCaption(text: string, fold = 125): { head: string; cut: boolean } {
  const lines = text.split("\n");
  const twoLines = lines.slice(0, 2).join("\n");
  let head = twoLines.length < text.length ? twoLines : text;
  const g = graphemes(head);
  if (g.length > fold) {
    const sliced = g.slice(0, fold).join("");
    head = sliced.slice(0, Math.max(sliced.lastIndexOf(" "), fold - 20)).trimEnd();
  }
  head = head.trimEnd();
  return { head, cut: head.length < text.length };
}

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);

export function InstaPostScreen({
  username,
  avatar,
  type,
  caption,
  hashtags = [],
  placeholder,
  media,
  captionNode,
  mediaLabel,
}: {
  username: string;
  avatar: ReactNode;
  type: PostType;
  caption: string;
  hashtags?: string[];
  placeholder?: string;
  /** Optional picture for the post area (real examples). Otherwise a neutral placeholder. */
  media?: ReactNode;
  /** A fully shown caption with markup (the breakdown section). Replaces the folded text. */
  captionNode?: ReactNode;
  /** Text in the empty media area, e.g. "Image not shown". */
  mediaLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const full = hashtags.length ? `${caption}\n\n${hashtags.join(" ")}` : caption;
  const { head, cut } = foldCaption(full);
  const shown = open || !cut ? full : head;

  return (
    <div className={`${s.insta} ${s.post}`}>
      <div className={s.postTop}>
        <span className={s.postAvatar} aria-hidden>
          {avatar}
        </span>
        <span className={s.postUser}>{username}</span>
        <span className={s.instaMenu} aria-hidden>
          <i />
          <i />
          <i />
        </span>
      </div>

      <div className={type === "Reel" ? `${s.postMedia} ${s.postReel}` : s.postMedia} aria-hidden>
        {media ?? <span className={s.postPlaceholder}>{mediaLabel ?? (type === "Reel" ? "Your reel" : type === "Carousel" ? "Your carousel" : "Your photo")}</span>}
        {type === "Carousel" ? <span className={s.postCount}>1/5</span> : null}
        {type === "Reel" ? (
          <span className={s.postPlay}>
            <svg viewBox="0 0 24 24" aria-hidden>
              <path d="M8 5v14l11-7z" fill="currentColor" />
            </svg>
          </span>
        ) : null}
      </div>

      <div className={s.postActions} aria-hidden>
        <Icon d="M12 21s-7-4.4-9.3-9A5.3 5.3 0 0 1 12 6a5.3 5.3 0 0 1 9.3 6c-2.3 4.6-9.3 9-9.3 9Z" />
        <Icon d="M21 12a8 8 0 0 1-11.8 7L4 20l1-4.8A8 8 0 1 1 21 12Z" />
        <Icon d="m22 3-9.5 9.5M22 3l-6 18-3.5-8.5L4 9l18-6Z" />
        {type === "Carousel" ? (
          <span className={s.postDots}>
            <i className={s.postDotOn} />
            <i />
            <i />
            <i />
            <i />
          </span>
        ) : (
          <span />
        )}
        <Icon d="M6 3h12v18l-6-4-6 4V3Z" />
      </div>

      <div className={s.postCaption}>
        <p className={s.instaBio}>
          <b className={s.postCapUser}>{username}</b>{" "}
          {captionNode ? (
            captionNode
          ) : full ? (
            <>
              {shown}
              {cut && !open ? (
                <>
                  {"... "}
                  <button type="button" className={s.postMore} onClick={() => setOpen(true)}>
                    more
                  </button>
                </>
              ) : null}
            </>
          ) : (
            <span className={s.instaPlaceholder}>{placeholder ?? "Your caption shows up here"}</span>
          )}
        </p>
        {open && cut ? (
          <button type="button" className={s.postMore} onClick={() => setOpen(false)}>
            Show less
          </button>
        ) : null}
      </div>
    </div>
  );
}

/** A TikTok video in the For You feed: full screen video, action rail on the right, caption at the bottom. */
export function TikTokVideoScreen({
  username,
  avatar,
  type,
  caption,
  hashtags = [],
  placeholder,
  captionNode,
  mediaLabel,
}: {
  username: string;
  avatar: ReactNode;
  type: string;
  caption: string;
  hashtags?: string[];
  placeholder?: string;
  captionNode?: ReactNode;
  mediaLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const full = hashtags.length ? `${caption} ${hashtags.join(" ")}` : caption;
  // TikTok shows about two lines over the video before "more".
  const { head, cut } = foldCaption(full, 80);
  const shown = open || !cut ? full : head;
  return (
    <div className={s.tk}>
      <div className={s.tkTop} aria-hidden>
        <span>Following</span>
        <b>For You</b>
      </div>
      <span className={s.tkLabel} aria-hidden>
        {mediaLabel ?? (type === "Photo carousel" ? "Your photos" : "Your video")}
      </span>
      {type === "Photo carousel" ? (
        <span className={s.tkDots} aria-hidden>
          <i className={s.postDotOn} />
          <i />
          <i />
        </span>
      ) : null}
      <div className={s.tkRail} aria-hidden>
        <span className={s.tkAvatar}>{avatar}</span>
        {["M12 21s-7-4.4-9.3-9A5.3 5.3 0 0 1 12 6a5.3 5.3 0 0 1 9.3 6c-2.3 4.6-9.3 9-9.3 9Z", "M21 12a8 8 0 0 1-11.8 7L4 20l1-4.8A8 8 0 1 1 21 12Z", "M6 3h12v18l-6-4-6 4V3Z", "M14 5l7 7-7 7M21 12H9a6 6 0 0 0-6 6"].map((d) => (
          <span key={d} className={s.tkAction}>
            <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
              <path d={d} />
            </svg>
            <i />
          </span>
        ))}
      </div>
      <div className={s.tkCaption}>
        <b className={s.tkUser}>{username}</b>
        <p className={s.tkText}>
          {captionNode ? (
            captionNode
          ) : full ? (
            <>
              {shown}
              {cut && !open ? (
                <>
                  {"... "}
                  <button type="button" className={s.tkMore} onClick={() => setOpen(true)}>
                    more
                  </button>
                </>
              ) : null}
            </>
          ) : (
            <span className={s.tkPlaceholder}>{placeholder ?? "Your caption shows up here"}</span>
          )}
        </p>
        <span className={s.tkSound} aria-hidden>
          ♪ original sound
        </span>
      </div>
    </div>
  );
}

/** A Facebook Page post in the feed: page header, text above the media with "See more", then Like, Comment, Share. */
export function FacebookPostScreen({
  username,
  avatar,
  type,
  caption,
  hashtags = [],
  placeholder,
  captionNode,
  mediaLabel,
}: {
  username: string;
  avatar: ReactNode;
  type: string;
  caption: string;
  hashtags?: string[];
  placeholder?: string;
  captionNode?: ReactNode;
  mediaLabel?: string;
}) {
  const [open, setOpen] = useState(false);
  const full = hashtags.length ? `${caption}\n\n${hashtags.join(" ")}` : caption;
  // Facebook shows a few lines of text before "See more". Meta doesn't publish an exact number.
  const { head, cut } = foldCaption(full, 180);
  const shown = open || !cut ? full : head;
  return (
    <div className={`${s.insta} ${s.fbp}`}>
      <div className={s.fbpTop}>
        <span className={s.fbpAvatar} aria-hidden>
          {avatar}
        </span>
        <span className={s.fbpNames}>
          <b>{username}</b>
          <span aria-hidden>Just now · 🌐</span>
        </span>
        <span className={s.instaMenu} aria-hidden>
          <i />
          <i />
          <i />
        </span>
      </div>
      <p className={`${s.instaBio} ${s.fbpText}`}>
        {captionNode ? (
          captionNode
        ) : full ? (
          <>
            {shown}
            {cut && !open ? (
              <>
                {"... "}
                <button type="button" className={s.fbpMore} onClick={() => setOpen(true)}>
                  See more
                </button>
              </>
            ) : null}
          </>
        ) : (
          <span className={s.instaPlaceholder}>{placeholder ?? "Your post text shows up here"}</span>
        )}
      </p>
      {type === "Text only" ? null : (
        <div className={type === "Reel" ? `${s.postMedia} ${s.postReel}` : s.postMedia} aria-hidden>
          <span className={s.postPlaceholder}>{mediaLabel ?? (type === "Reel" ? "Your reel" : type === "Link" ? "Your link preview" : "Your photo")}</span>
        </div>
      )}
      <div className={s.fbpBar} aria-hidden>
        <span>👍 Like</span>
        <span>💬 Comment</span>
        <span>↗ Share</span>
      </div>
    </div>
  );
}

/** A YouTube search results list: the visitor's title on the first result, cut where YouTube usually truncates. */
export function YouTubeResultsScreen({ username, caption, placeholder, keyword, fold = 60, captionNode }: { username: string; caption: string; placeholder?: string; keyword?: string; fold?: number; captionNode?: ReactNode }) {
  const g = graphemes(caption);
  const cut = g.length > fold;
  const shown = cut ? `${g.slice(0, fold).join("").trimEnd()}...` : caption;
  return (
    <div className={s.yt}>
      <div className={s.ytBar}>
        <span className={s.ytSearch}>{keyword || "search"}</span>
      </div>
      <div className={s.ytResult}>
        <div className={s.ytThumb} aria-hidden>
          <span className={s.ytTime}>12:48</span>
        </div>
        <div className={s.ytMeta}>
          <p className={s.ytTitle}>{captionNode ? captionNode : caption ? shown : <span className={s.instaPlaceholder}>{placeholder ?? "Your title shows up here"}</span>}</p>
          <span className={s.ytChannel}>{username}</span>
        </div>
      </div>
      {[0, 1].map((i) => (
        <div key={i} className={s.ytResult} aria-hidden>
          <div className={`${s.ytThumb} ${s.ytThumbOther}`} />
          <div className={s.ytMeta}>
            <span className={s.ytLine} />
            <span className={s.ytLine} style={{ width: "60%" }} />
          </div>
        </div>
      ))}
    </div>
  );
}

const cutAt = (text: string, n: number) => {
  const g = graphemes(text);
  return g.length > n ? `${g.slice(0, n).join("").trimEnd()}...` : text;
};

/** A Google result on a phone. `focus` says which line the tool writes; the other comes from the form. */
export function SerpScreen({ site, url, title, description, focus, captionNode, placeholder }: { site: string; url: string; title: string; description: string; focus: "title" | "description"; captionNode?: ReactNode; placeholder?: string }) {
  const empty = <span className={s.instaPlaceholder}>{placeholder ?? `Your ${focus} shows up here`}</span>;
  return (
    <div className={s.serp}>
      <div className={s.serpBar}>
        <b>Google</b>
        <span className={s.ytSearch}>search</span>
      </div>
      <div className={s.serpResult}>
        <div className={s.serpSite}>
          <span className={s.serpFav} aria-hidden>
            {site.charAt(0).toUpperCase() || "W"}
          </span>
          <span>
            <b>{site || "Your site"}</b>
            <br />
            {url}
          </span>
        </div>
        <p className={s.serpTitle}>{focus === "title" ? captionNode ?? (title ? cutAt(title, 60) : empty) : title || "Your page title"}</p>
        <p className={s.serpDesc}>{focus === "description" ? captionNode ?? (description ? cutAt(description, 158) : empty) : description || "Google often writes this line from your page or your meta description."}</p>
      </div>
      {[0, 1].map((i) => (
        <div key={i} className={s.serpResult} aria-hidden>
          <span className={s.ytLine} style={{ width: "40%" }} />
          <span className={s.ytLine} style={{ width: "85%", height: 14 }} />
          <span className={s.ytLine} />
          <span className={s.ytLine} style={{ width: "70%" }} />
        </div>
      ))}
    </div>
  );
}

/** A Pinterest pin close up: image, then title and description. */
export function PinScreen({ username, title, description, focus, captionNode, placeholder }: { username: string; title: string; description: string; focus: "title" | "description"; captionNode?: ReactNode; placeholder?: string }) {
  const empty = <span className={s.instaPlaceholder}>{placeholder ?? `Your ${focus} shows up here`}</span>;
  return (
    <div className={s.pin}>
      <div className={s.pinMedia} aria-hidden>
        <span className={s.postPlaceholder}>Your pin image</span>
        <span className={s.pinSave}>Save</span>
      </div>
      <div className={s.pinBody}>
        <p className={s.pinTitle}>{focus === "title" ? captionNode ?? (title ? title : empty) : title || "Your pin title"}</p>
        <p className={s.pinDesc}>{focus === "description" ? captionNode ?? (description ? cutAt(description, 160) : empty) : description || "Your pin description"}</p>
        <span className={s.pinUser}>
          <i aria-hidden /> {username}
        </span>
      </div>
    </div>
  );
}

/** A YouTube watch page: player, title, channel row, then the description box cut at "...more". */
export function YouTubeWatchScreen({ username, title, caption, captionNode, placeholder }: { username: string; title: string; caption: string; captionNode?: ReactNode; placeholder?: string }) {
  const [open, setOpen] = useState(false);
  const { head, cut } = foldCaption(caption, 150);
  return (
    <div className={s.ytw}>
      <div className={s.ytThumb} style={{ borderRadius: 0 }} aria-hidden>
        <span className={s.ytTime}>12:48</span>
      </div>
      <div className={s.ytwBody}>
        <p className={s.ytTitle}>{title || "Your video title"}</p>
        <span className={s.ytChannel}>
          <b>{username}</b> · Subscribe
        </span>
        <div className={s.ytwDesc}>
          <span className={s.ytChannel}>Views · Just now</span>
          <p className={s.instaBio}>
            {captionNode ??
              (caption ? (
                <>
                  {open || !cut ? caption : head}
                  {cut && !open ? (
                    <>
                      {"... "}
                      <button type="button" className={s.fbpMore} onClick={() => setOpen(true)}>
                        more
                      </button>
                    </>
                  ) : null}
                </>
              ) : (
                <span className={s.instaPlaceholder}>{placeholder ?? "Your description shows up here"}</span>
              ))}
          </p>
        </div>
      </div>
    </div>
  );
}

/** An Etsy listing on a phone: photo, price placeholder, then the title. */
export function EtsyScreen({ username, title, captionNode, placeholder }: { username: string; title: string; captionNode?: ReactNode; placeholder?: string }) {
  return (
    <div className={s.pin}>
      <div className={s.pinMedia} style={{ aspectRatio: "1 / 1", borderRadius: 12 }} aria-hidden>
        <span className={s.postPlaceholder}>Your listing photo</span>
      </div>
      <div className={s.pinBody}>
        <span className={s.ytChannel}>{username} · ★★★★★</span>
        <p className={s.instaBio} style={{ fontSize: 15 }}>
          {captionNode ?? (title || <span className={s.instaPlaceholder}>{placeholder ?? "Your title shows up here"}</span>)}
        </p>
        <span className={s.ytLine} style={{ width: "30%", height: 14 }} aria-hidden />
        <span className={s.etsyBtn} aria-hidden>
          Add to basket
        </span>
      </div>
    </div>
  );
}

/** A LinkedIn profile: banner, photo, name, headline, then the About card. `focus` picks which one the tool writes. */
export function LinkedInProfileScreen({ name, headline, about, focus, captionNode, placeholder }: { name: string; headline: string; about: string; focus: "headline" | "about"; captionNode?: ReactNode; placeholder?: string }) {
  const [open, setOpen] = useState(false);
  const { head, cut } = foldCaption(about, 220);
  const empty = <span className={s.instaPlaceholder}>{placeholder ?? `Your ${focus} shows up here`}</span>;
  return (
    <div className={`${s.insta} ${s.li}`}>
      <div className={s.xBanner} aria-hidden />
      <div className={s.liHead}>
        <span className={s.liAvatar} aria-hidden />
        <b className={s.xName}>{name}</b>
        <p className={s.liHeadline}>{focus === "headline" ? captionNode ?? (headline || empty) : headline || "Your headline"}</p>
        <span className={s.ytChannel} aria-hidden>
          Location · <span style={{ color: "#0A66C2", fontWeight: 600 }}>Contact info</span>
        </span>
        <div className={s.liBtns} aria-hidden>
          <span>Connect</span>
          <span>Message</span>
        </div>
      </div>
      <div className={s.liCard}>
        <b>About</b>
        <p className={s.instaBio}>
          {focus === "about"
            ? captionNode ??
              (about ? (
                <>
                  {open || !cut ? about : head}
                  {cut && !open ? (
                    <>
                      {"... "}
                      <button type="button" className={s.fbpMore} onClick={() => setOpen(true)}>
                        see more
                      </button>
                    </>
                  ) : null}
                </>
              ) : (
                empty
              ))
            : <span className={s.ytLine} aria-hidden />}
        </p>
      </div>
    </div>
  );
}

/** A LinkedIn feed post: author row with headline, then text cut at "...see more". */
export function LinkedInPostScreen({ name, caption, captionNode, placeholder }: { name: string; caption: string; captionNode?: ReactNode; placeholder?: string }) {
  const [open, setOpen] = useState(false);
  const { head, cut } = foldCaption(caption, 210);
  return (
    <div className={`${s.insta} ${s.fbp}`}>
      <div className={s.fbpTop}>
        <span className={s.liAvatar} style={{ width: 40, height: 40, margin: 0, border: 0 }} aria-hidden />
        <span className={s.fbpNames}>
          <b>{name}</b>
          <span aria-hidden>Your headline · 1h · 🌐</span>
        </span>
        <span className={s.instaMenu} aria-hidden>
          <i />
          <i />
          <i />
        </span>
      </div>
      <p className={`${s.instaBio} ${s.fbpText}`}>
        {captionNode ??
          (caption ? (
            <>
              {open || !cut ? caption : head}
              {cut && !open ? (
                <>
                  {"... "}
                  <button type="button" className={s.fbpMore} onClick={() => setOpen(true)}>
                    see more
                  </button>
                </>
              ) : null}
            </>
          ) : (
            <span className={s.instaPlaceholder}>{placeholder ?? "Your post shows up here"}</span>
          ))}
      </p>
      <div className={s.fbpBar} aria-hidden>
        <span>👍 Like</span>
        <span>💬 Comment</span>
        <span>↗ Repost</span>
      </div>
    </div>
  );
}

/** A product page on a phone: photo, name, then the description. */
export function ProductScreen({ name, caption, captionNode, placeholder }: { name: string; caption: string; captionNode?: ReactNode; placeholder?: string }) {
  return (
    <div className={s.pin}>
      <div className={s.pinMedia} style={{ aspectRatio: "1 / 1", borderRadius: 12 }} aria-hidden>
        <span className={s.postPlaceholder}>Your product photo</span>
      </div>
      <div className={s.pinBody}>
        <p className={s.pinTitle}>{name || "Your product"}</p>
        <span className={s.ytLine} style={{ width: "25%", height: 14 }} aria-hidden />
        <span className={s.etsyBtn} aria-hidden>
          Add to cart
        </span>
        <p className={s.pinDesc}>{captionNode ?? (caption || <span className={s.instaPlaceholder}>{placeholder ?? "Your description shows up here"}</span>)}</p>
      </div>
    </div>
  );
}
