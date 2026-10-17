import type { ReactNode } from "react";
import s from "./studio.module.css";

// The parts of an Instagram profile header that matter for a bio: picture, username, name, category, bio and link.
// No follower counts, posts or engagement numbers: the bio is the point. Pure markup, so it renders on the server too.

export function initialsOf(name: string): string {
  const words = name.split(/[\s·.,_|&+-]+/).filter(Boolean);
  const first = (w: string | undefined) => Array.from(w ?? "")[0] ?? "";
  return (words.length > 1 ? first(words[0]) + first(words[1]) : Array.from(words[0] ?? "").slice(0, 2).join("")).toUpperCase();
}

export function InstaPreview({
  username,
  name,
  category,
  bio,
  link,
  avatar,
  compact = false,
  empty,
  nameMark,
  linkMark,
}: {
  username: string;
  name: string;
  category?: string;
  bio: ReactNode;
  link?: string;
  /** A logo or photo. Falls back to a neutral placeholder with initials. */
  avatar?: ReactNode;
  compact?: boolean;
  /** Shown in place of the bio when there isn't one. */
  empty?: string;
  /** Small annotations after the name and link (the anatomy section numbers them). */
  nameMark?: ReactNode;
  linkMark?: ReactNode;
}) {
  return (
    <div className={compact ? `${s.ig} ${s.igCompact}` : s.ig}>
      <div className={s.igHead}>
        <span className={s.igAvatar} aria-hidden>
          {avatar ?? <span className={s.igInitials}>{initialsOf(name || username) || "?"}</span>}
        </span>
        <div className={s.igNames}>
          <span className={s.igUser}>{username}</span>
          {name ? (
            <span className={s.igName}>
              {name}
              {nameMark}
            </span>
          ) : null}
          {category ? <span className={s.igCategory}>{category}</span> : null}
        </div>
      </div>
      {empty && !bio ? <p className={s.igEmpty}>{empty}</p> : <p className={s.igBio}>{bio}</p>}
      {link ? (
        <span className={s.igLink}>
          <svg className={s.igLinkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
            <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
          </svg>
          {link}
          {linkMark}
        </span>
      ) : null}
      {compact ? null : (
        <div className={s.igButtons} aria-hidden>
          <span>Follow</span>
          <span>Message</span>
        </div>
      )}
    </div>
  );
}
