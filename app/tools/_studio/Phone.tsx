import type { ReactNode } from "react";
import s from "./studio.module.css";

// A realistic phone with an Instagram style profile screen, built in HTML and CSS so every part can change live.
// Decorative chrome (status bar, icons, tiles) is aria-hidden; the bio text itself stays readable to screen readers.
// No follower, post or engagement numbers: those would look like claims about the visitor.

export type ProfileMarks = Partial<Record<"photo" | "name" | "category" | "bio" | "link" | "buttons", number>>;

export function PhoneFrame({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className={s.phone} aria-label={label} role={label ? "img" : undefined}>
      <div className={s.phoneScreen}>
        <div className={s.statusBar} aria-hidden>
          <span>9:41</span>
          <span className={s.island} />
          <span className={s.statusIcons}>
            <i />
            <i />
            <i />
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

export const Mark = ({ n }: { n?: number }) =>
  n ? (
    <span className={s.pmark} aria-hidden>
      {String(n).padStart(2, "0")}
    </span>
  ) : null;

export function InstaScreen({
  username,
  name,
  category,
  bio,
  link,
  avatar,
  highlights = ["New", "About", "Work", "FAQ"],
  marks = {},
  showButtons = true,
}: {
  username: string;
  name: string;
  category?: string;
  bio: ReactNode;
  link?: string;
  avatar: ReactNode;
  highlights?: string[];
  marks?: ProfileMarks;
  showButtons?: boolean;
}) {
  return (
    <div className={s.insta}>
      <div className={s.instaTop} aria-hidden>
        <span className={s.instaBack} />
        <span className={s.instaHandle}>{username}</span>
        <span className={s.instaMenu}>
          <i />
          <i />
          <i />
        </span>
      </div>

      <div className={s.instaHead}>
        <span className={s.instaAvatar} aria-hidden>
          {avatar}
          <Mark n={marks.photo} />
        </span>
        <div className={s.instaStats} aria-hidden>
          {["posts", "followers", "following"].map((l) => (
            <span key={l}>
              <b />
              {l}
            </span>
          ))}
        </div>
      </div>

      <div className={s.instaInfo}>
        <span className={s.instaName}>
          {name}
          <Mark n={marks.name} />
        </span>
        {category ? (
          <span className={s.instaCategory}>
            {category}
            <Mark n={marks.category} />
          </span>
        ) : null}
        <p className={s.instaBio}>
          {bio}
          <Mark n={marks.bio} />
        </p>
        {link ? (
          <span className={s.instaLink}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
              <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
            </svg>
            {link}
            <Mark n={marks.link} />
          </span>
        ) : null}
      </div>

      {showButtons ? (
        <div className={s.instaButtons} aria-hidden>
          <span>Follow</span>
          <span>Message</span>
          <Mark n={marks.buttons} />
        </div>
      ) : null}

      <div className={s.instaHighlights} aria-hidden>
        {highlights.slice(0, 4).map((h) => (
          <span key={h}>
            <i />
            {h}
          </span>
        ))}
      </div>

      <div className={s.instaGrid} aria-hidden>
        {Array.from({ length: 6 }, (_, i) => (
          <i key={i} />
        ))}
      </div>
    </div>
  );
}

/** Up to two initials for the placeholder avatar. */
export function initialsOf(name: string): string {
  const words = name.split(/[\s·.,_|&+-]+/).filter(Boolean);
  const first = (w: string | undefined) => Array.from(w ?? "")[0] ?? "";
  return (words.length > 1 ? first(words[0]) + first(words[1]) : Array.from(words[0] ?? "").slice(0, 2).join("")).toUpperCase();
}
