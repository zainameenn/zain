import Link from "next/link";
import { stegaClean } from "next-sanity";
import { ArrowIcon, LinkedInIcon } from "@/app/HomeComponents/icons";
import type { Author, PostCard as PostCardData, SanityImage as SanityImageValue } from "@/sanity/lib/types";
import { SanityImage } from "./SanityImage";
import { authorPath, categoryPath, formatDate, initials, paragraphs, postPath, readingMinutes } from "./utils";
import s from "../insights.module.css";

export function Eyebrow({ children, color = "#6F6B64" }: { children: React.ReactNode; color?: string }) {
  return <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color }}>{children}</div>;
}

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className={s.crumbs}>
        {items.map((item, i) => (
          <li key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8, minWidth: 0 }}>
            {i > 0 ? (
              <span aria-hidden="true" style={{ color: "#C4A47C" }}>
                /
              </span>
            ) : null}
            {item.href ? (
              <Link href={item.href}>{item.name}</Link>
            ) : (
              <span aria-current="page" style={{ color: "#1C1C1C" }}>
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function Avatar({ name, image, size }: { name: string; image?: SanityImageValue | null; size: number }) {
  const box: React.CSSProperties = { width: size, height: size, borderRadius: "50%", flex: "0 0 auto", overflow: "hidden" };
  if (image?.asset) {
    return (
      <span style={box}>
        <SanityImage image={image} alt={image.alt || `Photo of ${stegaClean(name)}`} aspect={1} sizes={`${size}px`} widths={[size, size * 2, size * 3]} style={{ borderRadius: "50%" }} />
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      style={{ ...box, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "#1C1C1C", color: "#F2EFEA", fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: size * 0.36, letterSpacing: "-0.02em" }}
    >
      {initials(name)}
    </span>
  );
}

function Meta({ post }: { post: PostCardData }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 8px", fontSize: 13.5, color: "#6F6B64" }}>
      {post.author ? <span>{post.author.name}</span> : null}
      {post.author ? <span aria-hidden="true">·</span> : null}
      <time dateTime={stegaClean(post.publishedAt)}>{formatDate(post.publishedAt)}</time>
      <span aria-hidden="true">·</span>
      <span>{readingMinutes(post.chars)} min read</span>
    </div>
  );
}

export function PostCard({ post, headingLevel = 3, priority }: { post: PostCardData; headingLevel?: 2 | 3; priority?: boolean }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  const category = post.categories?.[0];
  return (
    <article className={s.card}>
      {post.mainImage ? (
        <div className={s.cardMedia}>
          <SanityImage image={post.mainImage} aspect={16 / 10} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" widths={[400, 640, 800, 1080]} priority={priority} />
        </div>
      ) : null}
      <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 0 }}>
        {category ? (
          <Link href={categoryPath(category.slug)} className={s.cardCategory} style={{ alignSelf: "flex-start", fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#7D6039" }}>
            {category.title}
          </Link>
        ) : null}
        <Heading className={s.cardTitle}>
          <Link href={postPath(post.slug)}>{post.title}</Link>
        </Heading>
        <p style={{ margin: "10px 0 14px", fontSize: 15.5, lineHeight: 1.6, color: "#4E4C48", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{post.excerpt}</p>
        <Meta post={post} />
      </div>
    </article>
  );
}

export function FeaturedCard({ post }: { post: PostCardData }) {
  const category = post.categories?.[0];
  return (
    <article className={`${s.card} ${s.featured}`}>
      {post.mainImage ? (
        <div className={s.cardMedia} style={{ borderRadius: 24 }}>
          <SanityImage image={post.mainImage} aspect={16 / 10} sizes="(min-width: 1280px) 700px, (min-width: 900px) 56vw, 100vw" priority />
        </div>
      ) : null}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ display: "inline-flex", alignItems: "center", height: 26, padding: "0 10px", borderRadius: 999, background: "#1C1C1C", color: "#F2EFEA", fontSize: 11.5, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase" }}>Latest</span>
          {category ? (
            <Link href={categoryPath(category.slug)} className={s.cardCategory} style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#7D6039" }}>
              {category.title}
            </Link>
          ) : null}
        </div>
        <h2 className={s.cardTitle} style={{ marginTop: 14 }}>
          <Link href={postPath(post.slug)}>{post.title}</Link>
        </h2>
        <p style={{ margin: "14px 0 18px", fontSize: 17, lineHeight: 1.6, color: "#4E4C48" }}>{post.excerpt}</p>
        <Meta post={post} />
      </div>
    </article>
  );
}

/** Compact byline under the headline: photo, name, title, dates and reading time. */
export function Byline({ author, publishedAt, updatedAt, chars }: { author?: Author | null; publishedAt: string; updatedAt?: string | null; chars?: number | null }) {
  const showUpdated = updatedAt && formatDate(updatedAt) !== formatDate(publishedAt);
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px 24px", paddingTop: 20, borderTop: "1px solid #DDDAD3" }}>
      {author ? (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Avatar name={author.name} image={author.image} size={44} />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.35 }}>
            <span style={{ fontSize: 15, color: "#1C1C1C" }}>
              By{" "}
              <Link href={authorPath(author.slug)} rel="author" style={{ fontWeight: 600, borderBottom: "1px solid #CFCBC2" }}>
                {author.name}
              </Link>
            </span>
            {author.jobTitle ? <span style={{ fontSize: 13.5, color: "#6F6B64" }}>{author.jobTitle}</span> : null}
          </div>
        </div>
      ) : null}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 8px", fontSize: 13.5, color: "#5A5854" }}>
        <span>
          Published <time dateTime={stegaClean(publishedAt)}>{formatDate(publishedAt)}</time>
        </span>
        {showUpdated ? (
          <>
            <span aria-hidden="true">·</span>
            <span>
              Updated <time dateTime={stegaClean(updatedAt)}>{formatDate(updatedAt)}</time>
            </span>
          </>
        ) : null}
        <span aria-hidden="true">·</span>
        <span>{readingMinutes(chars)} min read</span>
      </div>
    </div>
  );
}

function SocialLinks({ author }: { author: Author }) {
  const links = [
    ...(author.website ? [{ label: "Website", url: author.website }] : []),
    ...(author.linkedin ? [{ label: "LinkedIn", url: author.linkedin }] : []),
    ...(author.socialLinks ?? []).map((l) => ({ label: l.label, url: l.url })),
  ];
  if (!links.length) return null;
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexWrap: "wrap", gap: 8 }}>
      {links.map((l) => {
        const external = !stegaClean(l.url).startsWith("https://www.zainameen.com") && !stegaClean(l.url).startsWith("https://zainameen.com");
        return (
          <li key={l.url}>
            <a
              href={stegaClean(l.url)}
              {...(external ? { target: "_blank", rel: "noopener me" } : {})}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, height: 36, padding: "0 14px", borderRadius: 999, border: "1px solid #D6CFC2", fontSize: 13.5, fontWeight: 500, color: "#1C1C1C" }}
            >
              {stegaClean(l.label).toLowerCase() === "linkedin" ? <LinkedInIcon size={14} /> : null}
              {l.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

/** The fuller author box at the end of each article. */
export function AuthorBox({ author }: { author: Author }) {
  return (
    <section aria-label="About the author" style={{ borderRadius: 24, background: "#F4F0E8", border: "1px solid #E2D8CA", padding: "clamp(24px,3vw,36px)" }}>
      <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#7D6039" }}>
        About the author
      </div>
      <div style={{ marginTop: 18, display: "flex", gap: 18, alignItems: "flex-start" }} className="max-sm:!flex-col">
        <Avatar name={author.name} image={author.image} size={72} />
        <div style={{ display: "flex", flexDirection: "column", gap: 12, minWidth: 0 }}>
          <div>
            <Link href={authorPath(author.slug)} style={{ fontFamily: "var(--nf-general-sans)", fontSize: 22, fontWeight: 600, letterSpacing: "-0.02em", color: "#1C1C1C" }}>
              {author.name}
            </Link>
            {author.jobTitle ? <div style={{ marginTop: 2, fontSize: 14.5, color: "#6F6B64" }}>{author.jobTitle}</div> : null}
          </div>
          {paragraphs(author.bio).map((p, i) => (
            <p key={i} style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: "#4E4C48" }}>
              {p}
            </p>
          ))}
          <SocialLinks author={author} />
          <Link href={authorPath(author.slug)} style={{ alignSelf: "flex-start", marginTop: 4, display: "inline-flex", alignItems: "center", gap: 10, fontSize: 15, fontWeight: 600, color: "#1C1C1C", borderBottom: "1.5px solid #1C1C1C", paddingBottom: 2 }}>
            More articles by {author.name.split(" ")[0]}
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
}

export { SocialLinks };
