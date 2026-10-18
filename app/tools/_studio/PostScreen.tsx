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
