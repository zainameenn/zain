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
