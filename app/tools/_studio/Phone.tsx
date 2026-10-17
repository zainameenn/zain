import type { ReactNode } from "react";
import type { ProfileSkin } from "@/lib/tools/types";
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

// ---------- Other platforms. Same props everywhere, so the generator and the creator breakdown can swap skins. ----------

export type { ProfileSkin };

export type ProfileProps = {
  username: string;
  name: string;
  category?: string;
  bio: ReactNode;
  link?: string;
  /** X shows a location field next to the link. */
  location?: string;
  avatar: ReactNode;
  highlights?: string[];
  marks?: ProfileMarks;
  showButtons?: boolean;
};

const LinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
    <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
  </svg>
);

const Avatar = ({ avatar, mark, className }: { avatar: ReactNode; mark?: number; className: string }) => (
  <span className={className} aria-hidden>
    {avatar}
    <Mark n={mark} />
  </span>
);

const Link = ({ link, mark, className }: { link?: string; mark?: number; className: string }) =>
  link ? (
    <span className={className}>
      <LinkIcon />
      {link}
      <Mark n={mark} />
    </span>
  ) : null;

/** Placeholder lines for posts, so the screen looks lived in without inventing content. */
const PostSkeleton = ({ className }: { className: string }) => (
  <div className={className} aria-hidden>
    <i />
    <span>
      <b />
      <b />
      <b />
    </span>
  </div>
);

export function TikTokScreen({ username, name, bio, link, avatar, marks = {}, showButtons = true }: ProfileProps) {
  return (
    <div className={`${s.insta} ${s.tt}`}>
      {/* TikTok shows the name in the top bar, so this bar stays readable; only the icons are hidden. */}
      <div className={s.instaTop}>
        <span className={s.instaBack} aria-hidden />
        <span className={s.instaHandle}>
          {name}
          <Mark n={marks.name} />
        </span>
        <span className={s.instaMenu} aria-hidden>
          <i />
          <i />
          <i />
        </span>
      </div>
      <Avatar avatar={avatar} mark={marks.photo} className={`${s.instaAvatar} ${s.ttAvatar}`} />
      <span className={s.ttUser}>
        @{username}
      </span>
      <div className={s.ttStats} aria-hidden>
        {["Following", "Followers", "Likes"].map((l) => (
          <span key={l}>
            <b />
            {l}
          </span>
        ))}
      </div>
      {showButtons ? (
        <div className={s.ttButtons} aria-hidden>
          <span>Follow</span>
          <span>Message</span>
          <Mark n={marks.buttons} />
        </div>
      ) : null}
      <p className={`${s.instaBio} ${s.ttBio}`}>
        {bio}
        <Mark n={marks.bio} />
      </p>
      <Link link={link} mark={marks.link} className={`${s.instaLink} ${s.ttLink}`} />
      <div className={s.ttTabs} aria-hidden>
        <i className={s.tabOn} />
        <i />
        <i />
      </div>
      <div className={s.ttGrid} aria-hidden>
        {Array.from({ length: 6 }, (_, i) => (
          <i key={i} />
        ))}
      </div>
    </div>
  );
}

export function XScreen({ username, name, bio, link, location, avatar, marks = {}, showButtons = true }: ProfileProps) {
  return (
    <div className={`${s.insta} ${s.xp}`}>
      <div className={s.xBanner} aria-hidden />
      <div className={s.xHead}>
        <Avatar avatar={avatar} mark={marks.photo} className={s.xAvatar} />
        {showButtons ? (
          <span className={s.xFollow} aria-hidden>
            Follow
            <Mark n={marks.buttons} />
          </span>
        ) : null}
      </div>
      <div className={s.instaInfo}>
        <span className={s.xName}>
          {name}
          <Mark n={marks.name} />
        </span>
        <span className={s.xHandle}>@{username}</span>
        <p className={`${s.instaBio} ${s.xBio}`}>
          {bio}
          <Mark n={marks.bio} />
        </p>
        <span className={s.xMeta}>
          {location ? (
            <span className={s.xLink} style={{ color: "inherit" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden>
                <path d="M12 21s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12Z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              {location}
            </span>
          ) : null}
          <Link link={link} mark={marks.link} className={s.xLink} />
        </span>
        <span className={s.xCounts} aria-hidden>
          <span>
            <b /> Following
          </span>
          <span>
            <b /> Followers
          </span>
        </span>
      </div>
      <div className={s.lineTabs} aria-hidden>
        <span className={s.tabOn}>Posts</span>
        <span>Replies</span>
        <span>Media</span>
      </div>
      <PostSkeleton className={s.postSkel} />
      <PostSkeleton className={s.postSkel} />
      <PostSkeleton className={s.postSkel} />
      <PostSkeleton className={s.postSkel} />
      <PostSkeleton className={s.postSkel} />
    </div>
  );
}

export function ThreadsScreen({ username, name, bio, link, avatar, marks = {}, showButtons = true }: ProfileProps) {
  return (
    <div className={`${s.insta} ${s.th}`}>
      <div className={s.instaTop} aria-hidden>
        <span className={s.instaBack} />
        <span />
        <span className={s.instaMenu}>
          <i />
          <i />
          <i />
        </span>
      </div>
      <div className={s.thHead}>
        <div className={s.thNames}>
          <span className={s.thName}>
            {name}
            <Mark n={marks.name} />
          </span>
          <span className={s.thHandle}>{username}</span>
        </div>
        <Avatar avatar={avatar} mark={marks.photo} className={s.thAvatar} />
      </div>
      <div className={s.instaInfo}>
        <p className={s.instaBio}>
          {bio}
          <Mark n={marks.bio} />
        </p>
        <span className={s.thMeta}>
          <span className={s.thFollowers} aria-hidden>
            <b /> followers
          </span>
          <Link link={link} mark={marks.link} className={s.thLink} />
        </span>
      </div>
      {showButtons ? (
        <div className={s.thButtons} aria-hidden>
          <span>Follow</span>
          <span>Mention</span>
          <Mark n={marks.buttons} />
        </div>
      ) : null}
      <div className={s.lineTabs} aria-hidden>
        <span className={s.tabOn}>Threads</span>
        <span>Replies</span>
        <span>Reposts</span>
      </div>
      <PostSkeleton className={s.postSkel} />
      <PostSkeleton className={s.postSkel} />
      <PostSkeleton className={s.postSkel} />
      <PostSkeleton className={s.postSkel} />
      <PostSkeleton className={s.postSkel} />
    </div>
  );
}

export function FacebookScreen({ name, category, bio, link, avatar, marks = {}, showButtons = true }: ProfileProps) {
  return (
    <div className={`${s.insta} ${s.fb}`}>
      <div className={s.fbCover} aria-hidden />
      <Avatar avatar={avatar} mark={marks.photo} className={s.fbAvatar} />
      <span className={s.fbName}>
        {name}
        <Mark n={marks.name} />
      </span>
      <span className={s.fbFollowers} aria-hidden>
        <b /> followers
      </span>
      {showButtons ? (
        <div className={s.fbButtons} aria-hidden>
          <span>Follow</span>
          <span>Message</span>
          <Mark n={marks.buttons} />
        </div>
      ) : null}
      <div className={s.lineTabs} aria-hidden>
        <span className={s.tabOn}>Posts</span>
        <span>About</span>
        <span>Photos</span>
      </div>
      <div className={s.fbIntro}>
        <span className={s.fbIntroTitle} aria-hidden>
          Intro
        </span>
        <p className={`${s.instaBio} ${s.fbBio}`}>
          {bio}
          <Mark n={marks.bio} />
        </p>
        {category ? (
          <span className={s.fbRow}>
            Page · {category}
            <Mark n={marks.category} />
          </span>
        ) : null}
        <Link link={link} mark={marks.link} className={s.fbRow} />
      </div>
      <div className={s.fbPost} aria-hidden>
        <PostSkeleton className={s.postSkel} />
        <i />
      </div>
    </div>
  );
}

/** Picks the right profile screen for a platform. */
export function ProfileScreen({ skin, ...props }: ProfileProps & { skin: ProfileSkin }) {
  if (skin === "tiktok") return <TikTokScreen {...props} />;
  if (skin === "x") return <XScreen {...props} />;
  if (skin === "threads") return <ThreadsScreen {...props} />;
  if (skin === "facebook") return <FacebookScreen {...props} />;
  return <InstaScreen {...props} />;
}
