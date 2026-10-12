import type { ReactNode } from "react";
import type { PreviewSkin } from "@/lib/tools/types";
import s from "../tools.module.css";

// Phone style mockups, HTML and CSS only: no images, no real logos or icons. Decorative: always aria-hidden.
// One component, one layout per platform skin. The shared atoms (avatar, bio, tiles) keep every skin on the same system.

export function initials(name: string): string {
  const words = name.split(/[\s·.,_|&+-]+/).filter(Boolean);
  const first = (w: string | undefined) => Array.from(w ?? "")[0] ?? "";
  return (words.length > 1 ? first(words[0]) + first(words[1]) : Array.from(words[0] ?? "Y").slice(0, 2).join("")).toUpperCase();
}

type MockProps = {
  skin: PreviewSkin;
  username: string;
  name: string;
  /** Text or a node (e.g. the typing text with a caret). */
  text: ReactNode;
  link?: string;
  theme?: "light" | "dark";
  compact?: boolean;
};

const Avatar = ({ name, size }: { name: string; size?: "sm" | "lg" }) => (
  <span className={size === "lg" ? `${s.mockAvatar} ${s.mockAvatarLg}` : size === "sm" ? `${s.mockAvatar} ${s.mockAvatarSm}` : s.mockAvatar}>
    <span>{initials(name)}</span>
  </span>
);

const Tiles = ({ n, tall }: { n: number; tall?: boolean }) => (
  <div className={tall ? `${s.mockGrid} ${s.mockGridTall}` : s.mockGrid}>
    {Array.from({ length: n }, (_, i) => (
      <i key={i} />
    ))}
  </div>
);

/** Placeholder lines standing in for posts on text first platforms. */
const Lines = ({ n }: { n: number }) => (
  <div className={s.mockLines}>
    {Array.from({ length: n }, (_, i) => (
      <div key={i} className={s.mockLinePost}>
        <span className={s.mockDot} />
        <span>
          <i />
          <i />
        </span>
      </div>
    ))}
  </div>
);

export function ProfileMockup(props: MockProps) {
  const { skin, theme = "light", compact = false } = props;
  const cls = [s.mock, s[`skin_${skin}`], theme === "dark" ? s.mockDark : "", compact ? s.mockCompact : ""].filter(Boolean).join(" ");
  return (
    <div className={cls} aria-hidden>
      {skin === "instagram-post" ? <PostSkin {...props} /> : null}
      {skin === "instagram" ? <InstagramSkin {...props} /> : null}
      {skin === "tiktok" ? <TikTokSkin {...props} /> : null}
      {skin === "x" ? <XSkin {...props} /> : null}
      {skin === "threads" ? <ThreadsSkin {...props} /> : null}
      {skin === "facebook" ? <FacebookSkin {...props} /> : null}
    </div>
  );
}

function InstagramSkin({ username, name, text, link, compact }: MockProps) {
  return (
    <>
      <div className={s.mockTop}>
        <Avatar name={name || username} size={compact ? "sm" : undefined} />
        <div className={s.mockHead}>
          <span className={s.mockUser}>{username}</span>
          {compact ? null : (
            <span className={s.mockStats}>
              <span>
                <b>248</b>posts
              </span>
              <span>
                <b>12.4k</b>followers
              </span>
              <span>
                <b>310</b>following
              </span>
            </span>
          )}
        </div>
      </div>
      <div className={s.mockBody}>
        <span className={s.mockName}>{name}</span>
        <span className={compact ? s.mockBioCompact : s.mockBio}>{text}</span>
        {link ? <span className={s.mockLink}>🔗 {link}</span> : null}
      </div>
      {compact ? null : (
        <>
          <div className={s.mockButtons}>
            <span className={s.mockFollow}>Follow</span>
            <span className={s.mockMessage}>Message</span>
          </div>
          <div className={s.mockHighlights}>
            {["Start", "Reviews", "FAQ", "Menu", "News"].map((h) => (
              <span key={h}>
                <i />
                {h}
              </span>
            ))}
          </div>
          <Tiles n={9} />
        </>
      )}
    </>
  );
}

function TikTokSkin({ username, name, text, link, compact }: MockProps) {
  return (
    <>
      <div className={s.mockCenter}>
        <Avatar name={name || username} size={compact ? "sm" : "lg"} />
        <span className={s.mockUser}>@{username}</span>
        {compact ? null : (
          <span className={`${s.mockStats} ${s.mockStatsCenter}`}>
            <span>
              <b>182</b>Following
            </span>
            <span>
              <b>48.1k</b>Followers
            </span>
            <span>
              <b>1.2M</b>Likes
            </span>
          </span>
        )}
        {compact ? null : (
          <div className={s.mockButtons}>
            <span className={s.mockFollowAccent}>Follow</span>
            <span className={s.mockMessage}>Message</span>
          </div>
        )}
        <span className={compact ? s.mockBioCompact : `${s.mockBio} ${s.mockBioShort}`}>{text}</span>
        {link ? <span className={s.mockLink}>🔗 {link}</span> : null}
      </div>
      {compact ? null : <Tiles n={6} tall />}
    </>
  );
}

function XSkin({ username, name, text, link, compact }: MockProps) {
  return (
    <>
      {compact ? null : <div className={s.mockBanner} />}
      <div className={compact ? s.mockTop : s.mockOverlap}>
        <Avatar name={name || username} size={compact ? "sm" : undefined} />
        {compact ? (
          <div className={s.mockHead}>
            <span className={s.mockName}>{name}</span>
            <span className={s.mockMuted}>@{username}</span>
          </div>
        ) : (
          <span className={s.mockPill}>Follow</span>
        )}
      </div>
      <div className={s.mockBody}>
        {compact ? null : (
          <>
            <span className={s.mockNameLg}>{name}</span>
            <span className={s.mockMuted}>@{username}</span>
          </>
        )}
        <span className={compact ? s.mockBioCompact : `${s.mockBio} ${s.mockBioGap}`}>{text}</span>
        {compact ? null : (
          <span className={s.mockMetaRow}>
            <span>📍 Your city</span>
            {link ? <span className={s.mockLink}>🔗 {link}</span> : null}
          </span>
        )}
        {compact ? null : (
          <span className={s.mockMuted}>
            <b className={s.mockStrong}>412</b> Following &nbsp; <b className={s.mockStrong}>3,908</b> Followers
          </span>
        )}
      </div>
      {compact ? null : <Lines n={2} />}
    </>
  );
}

function ThreadsSkin({ username, name, text, link, compact }: MockProps) {
  return (
    <>
      <div className={s.mockSplit}>
        <div className={s.mockHead}>
          <span className={s.mockNameLg}>{name}</span>
          <span className={s.mockUser}>{username}</span>
        </div>
        <Avatar name={name || username} size={compact ? "sm" : undefined} />
      </div>
      <div className={s.mockBody}>
        <span className={compact ? s.mockBioCompact : s.mockBio}>{text}</span>
        {compact ? null : (
          <span className={s.mockMuted}>
            2,140 followers{link ? ` · ${link}` : ""}
          </span>
        )}
      </div>
      {compact ? null : (
        <>
          <div className={s.mockButtons}>
            <span className={s.mockFollow}>Follow</span>
            <span className={s.mockMessage}>Mention</span>
          </div>
          <div className={s.mockTabs}>
            <span>Threads</span>
            <span>Replies</span>
            <span>Reposts</span>
          </div>
          <Lines n={2} />
        </>
      )}
    </>
  );
}

function FacebookSkin({ username, name, text, link, compact }: MockProps) {
  return (
    <>
      {compact ? null : <div className={s.mockBanner} />}
      <div className={compact ? s.mockTop : s.mockOverlapLeft}>
        <Avatar name={name || username} size={compact ? "sm" : "lg"} />
        {compact ? <span className={s.mockName}>{name}</span> : null}
      </div>
      {compact ? null : (
        <div className={s.mockBody}>
          <span className={s.mockNameLg}>{name}</span>
          <span className={s.mockMuted}>1.8k followers</span>
        </div>
      )}
      {compact ? null : (
        <div className={s.mockButtons}>
          <span className={s.mockFollowAccent}>Follow</span>
          <span className={s.mockMessage}>Message</span>
        </div>
      )}
      <div className={s.mockIntro}>
        {compact ? null : <span className={s.mockStrong}>Intro</span>}
        <span className={compact ? s.mockBioCompact : `${s.mockBio} ${s.mockBioCenter}`}>{text}</span>
        {link && !compact ? <span className={s.mockLink}>🔗 {link}</span> : null}
      </div>
    </>
  );
}

/** A feed post: header, image placeholder, action row, then the caption under the username. */
function PostSkin({ username, name, text, compact }: MockProps) {
  return (
    <>
      <div className={s.mockTop}>
        <Avatar name={name || username} size="sm" />
        <span className={s.mockUser}>{username}</span>
      </div>
      <div className={compact ? `${s.mockImage} ${s.mockImageSm}` : s.mockImage} />
      {compact ? null : (
        <div className={s.mockActions}>
          <i />
          <i />
          <i />
          <i className={s.mockActionEnd} />
        </div>
      )}
      <div className={s.mockBody}>
        {compact ? null : <span className={s.mockStrong}>1,284 likes</span>}
        <span className={compact ? s.mockBioCompact : s.mockCaption}>
          <b className={s.mockStrong}>{username}</b> {text}
        </span>
      </div>
    </>
  );
}
