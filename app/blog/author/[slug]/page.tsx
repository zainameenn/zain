import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { stegaClean } from "next-sanity";
import { buildMetadata } from "@/lib/seo";
import { H1_ACCENT_STYLE, HERO_H1_STYLE } from "@/app/HomeComponents/heading";
import { ArrowIcon } from "@/app/HomeComponents/icons";
import { SITE_URL } from "@/sanity/env";
import { fetchPublished, sanityFetch } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { AUTHOR_QUERY, AUTHOR_SLUGS_QUERY } from "@/sanity/lib/queries";
import type { AuthorWithPosts } from "@/sanity/lib/types";
import { JsonLd, breadcrumbList } from "../../_components/JsonLd";
import { Avatar, Breadcrumbs, Eyebrow, PostCard, SocialLinks } from "../../_components/parts";
import { MAX, PAD, absolute, authorPath, paragraphs } from "../../_components/utils";
import s from "../../blog.module.css";

type Props = { params: Promise<{ slug: string }> };

const getAuthor = cache((slug: string) => sanityFetch<AuthorWithPosts | null>(AUTHOR_QUERY, { slug }));

export async function generateStaticParams() {
  const slugs = await fetchPublished<string[]>(AUTHOR_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthor(slug);
  if (!author) return { title: "Author not found | Zain", robots: { index: false, follow: true } };
  const name = stegaClean(author.name);
  return buildMetadata({
    // Framed as an article archive so it doesn't compete with /about for searches of the name.
    title: `Articles by ${name} | Growth Marketing Blog`,
    description: `Growth marketing articles by ${name}${author.jobTitle ? `, ${stegaClean(author.jobTitle)}` : ""}. Practical insights on SEO, Reddit, social media and SaaS growth from real projects.`,
    path: authorPath(stegaClean(author.slug)),
    noindex: author.posts.length === 0,
  });
}

export default async function AuthorPage({ params }: Props) {
  const { slug } = await params;
  const author = await getAuthor(slug);
  if (!author) notFound();

  const pageUrl = absolute(authorPath(stegaClean(author.slug)));
  const isZain = stegaClean(author.name).toLowerCase().startsWith("zain");

  return (
    <main id="top" style={{ overflowX: "clip" }}>
      <JsonLd
        data={stegaClean({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ProfilePage",
              "@id": pageUrl,
              url: pageUrl,
              name: `Articles by ${author.name}`,
              mainEntity: {
                "@type": "Person",
                name: author.name,
                ...(author.jobTitle ? { jobTitle: author.jobTitle } : {}),
                ...(author.bio ? { description: paragraphs(author.bio)[0] } : {}),
                url: isZain ? SITE_URL : pageUrl,
                ...(author.image?.asset ? { image: urlFor(author.image).width(600).height(600).fit("crop").url() } : {}),
                sameAs: [author.linkedin, author.website, ...(author.socialLinks ?? []).map((l) => l.url)].filter(Boolean),
              },
            },
            breadcrumbList([
              { name: "Home", url: absolute("/") },
              { name: "Blog", url: absolute("/blog") },
              { name: author.name, url: pageUrl },
            ]),
          ],
        })}
      />
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(32px,4vw,56px) ${PAD} 0` }}>
        <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Blog", href: "/blog" }, { name: author.name }]} />
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "clamp(40px,5vw,72px) 0 clamp(48px,5vw,72px)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <Avatar name={author.name} image={author.image} size={112} />
          <h1 style={{ ...HERO_H1_STYLE, marginTop: 24 }}>
            Articles by <em style={H1_ACCENT_STYLE}>{author.name}.</em>
          </h1>
          {author.jobTitle ? <p style={{ margin: "14px 0 0", fontSize: 16, fontWeight: 500, color: "#7D6039" }}>{author.jobTitle}</p> : null}
          <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
            {paragraphs(author.bio).map((p, i) => (
              <p key={i} style={{ margin: 0, fontSize: 18, lineHeight: 1.6, color: "#4E4C48" }}>
                {p}
              </p>
            ))}
          </div>
          <div style={{ marginTop: 24, display: "flex", justifyContent: "center" }}>
            <SocialLinks author={author} />
          </div>
          {isZain ? (
            <Link href="/about" style={{ marginTop: 20, display: "inline-flex", alignItems: "center", gap: 10, height: 44, fontSize: 15, fontWeight: 600, color: "#1C1C1C", borderBottom: "1.5px solid #1C1C1C" }}>
              More about me
              <ArrowIcon />
            </Link>
          ) : null}
        </div>
      </section>
      <section aria-labelledby="author-posts" style={{ maxWidth: MAX, margin: "0 auto", padding: `0 ${PAD} clamp(64px,7vw,96px)` }}>
        <div style={{ marginBottom: 32, paddingTop: 32, borderTop: "1px solid #DDDAD3" }}>
          <Eyebrow>Published articles</Eyebrow>
          <h2 id="author-posts" style={{ margin: "12px 0 0", fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(28px,2.6vw,38px)", lineHeight: 1.08, letterSpacing: "-0.035em" }}>
            {author.posts.length} {author.posts.length === 1 ? "article" : "articles"}
          </h2>
        </div>
        {author.posts.length ? (
          <div className={s.grid}>
            {author.posts.map((p) => (
              <PostCard key={p._id} post={p} />
            ))}
          </div>
        ) : (
          <p style={{ margin: 0, fontSize: 16, color: "#5A5854" }}>No published articles yet.</p>
        )}
      </section>
    </main>
  );
}
