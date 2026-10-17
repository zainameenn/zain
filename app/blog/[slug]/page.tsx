import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { stegaClean } from "next-sanity";
import { buildMetadata } from "@/lib/seo";
import { H1_ACCENT_STYLE, HERO_H1_STYLE } from "@/app/HomeComponents/heading";
import { ArrowIcon, LinkedInIcon, PlusIcon } from "@/app/HomeComponents/icons";
import { SITE_URL } from "@/sanity/env";
import { fetchPublished, sanityFetch } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { POST_QUERY, POST_SLUGS_QUERY } from "@/sanity/lib/queries";
import type { Post } from "@/sanity/lib/types";
import { ArticleBody } from "../_components/ArticleBody";
import { ArticleOutline, ArticleProgress, type OutlineItem } from "../_components/ArticleNav";
import { CopyLinkButton } from "../_components/CopyLinkButton";
import { JsonLd, breadcrumbList } from "../_components/JsonLd";
import { AuthorBox, BlogCta, Byline, Eyebrow, PostCard } from "../_components/parts";
import { SanityImage } from "../_components/SanityImage";
import { MAX, PAD, absolute, authorPath, buildToc, categoryPath, paragraphs, pickRelated, postPath, type TocItem } from "../_components/utils";
import s from "../blog.module.css";

type Props = { params: Promise<{ slug: string }> };

const getPost = cache((slug: string) => sanityFetch<Post | null>(POST_QUERY, { slug }));

// Published articles are built ahead of time. New ones are built on their first visit, then cached.
export async function generateStaticParams() {
  const slugs = await fetchPublished<string[]>(POST_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Article not found | Zain", robots: { index: false, follow: true } };

  const title = stegaClean(post.seoTitle)?.trim() || `${stegaClean(post.title)} | Zain`;
  const description = stegaClean(post.seoDescription)?.trim() || stegaClean(post.excerpt);
  const shareImage = post.ogImage?.asset ? post.ogImage : post.mainImage;
  return buildMetadata({
    title,
    description,
    path: stegaClean(post.canonicalUrl) || postPath(stegaClean(post.slug)),
    noindex: Boolean(post.noindex),
    image: shareImage?.asset
      ? { url: urlFor(shareImage).width(1200).height(630).fit("crop").url(), width: 1200, height: 630, alt: stegaClean(post.mainImage?.alt) || stegaClean(post.title) }
      : undefined,
    article: {
      publishedTime: stegaClean(post.publishedAt),
      modifiedTime: stegaClean(post.updatedAt || post.publishedAt),
      authors: post.author ? [absolute(authorPath(stegaClean(post.author.slug)))] : undefined,
      section: stegaClean(post.categories?.[0]?.title),
      tags: stegaClean(post.tags) ?? undefined,
    },
  });
}

/** The outline lists main sections only (H2s), so it stays short enough to scan. */
const outlineFrom = (toc: TocItem[], hasFaqs: boolean): OutlineItem[] => [
  ...toc.filter((t) => t.level === 2).map((t) => ({ id: t.id, text: t.text })),
  ...(hasFaqs ? [{ id: "faq", text: "Frequently asked questions" }] : []),
];

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const toc = buildToc(post.body);
  const outline = outlineFrom(toc, Boolean(post.faqs?.length));
  // Short posts don't need an outline.
  const showToc = outline.length >= 3;
  const category = post.categories?.[0];
  const related = pickRelated(post, post.relatedPicked, post.relatedRefs, post.sameCategory, post.latest);
  const title = stegaClean(post.title);
  const accent = stegaClean(post.headlineAccent)?.trim();
  const hasAccent = Boolean(accent && title.trim().endsWith(accent));
  const pageUrl = absolute(postPath(stegaClean(post.slug)));
  const cta = post.cta ?? { mode: "default" as const };
  const ctaMode = stegaClean(cta.mode) ?? "default";

  const jsonLd = stegaClean({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${pageUrl}#article`,
        headline: title,
        description: post.seoDescription || post.excerpt,
        ...(post.mainImage?.asset
          ? {
              image: [16 / 9, 4 / 3, 1].map((r) => urlFor(post.mainImage!).width(1200).height(Math.round(1200 / r)).fit("crop").url()),
            }
          : {}),
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        ...(post.author
          ? {
              author: {
                "@type": "Person",
                name: post.author.name,
                url: absolute(authorPath(post.author.slug)),
                ...(post.author.jobTitle ? { jobTitle: post.author.jobTitle } : {}),
                sameAs: [post.author.linkedin, post.author.website, ...(post.author.socialLinks ?? []).map((l) => l.url)].filter(Boolean),
              },
            }
          : {}),
        publisher: { "@type": "Person", name: "Zain Ul Abdin", url: SITE_URL },
        mainEntityOfPage: { "@type": "WebPage", "@id": post.canonicalUrl || pageUrl },
        isPartOf: { "@type": "Blog", name: "Growth Marketing Blog", url: absolute("/blog") },
        ...(category ? { articleSection: category.title } : {}),
        ...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
        inLanguage: "en",
      },
      breadcrumbList([
        { name: "Home", url: absolute("/") },
        { name: "Blog", url: absolute("/blog") },
        { name: title, url: pageUrl },
      ]),
      ...(post.faqs?.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: post.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
            },
          ]
        : []),
    ],
  });

  const shareText = encodeURIComponent(title);
  const shareUrl = encodeURIComponent(pageUrl);

  return (
    <main id="top" style={{ overflowX: "clip" }}>
      <JsonLd data={jsonLd} />
      <ArticleProgress targetId="article-body" />
      <article>
        <div style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(24px,3vw,40px) ${PAD} 0` }}>
          {/* HERO: text beside the cover image on wide screens, stacked on phones. Without a cover, the text stands alone. */}
          <header className={post.mainImage?.asset ? s.hero : `${s.hero} ${s.heroText}`}>
            <div className={s.heroCopy}>
              <Link href="/blog" className={s.backLink} style={{ height: 36, fontSize: 14, borderBottomWidth: 1 }}>
                <ArrowIcon />
                Back to blog
              </Link>
              {category ? (
                <div className={s.heroCategory}>
                  <Link href={categoryPath(stegaClean(category.slug))}>
                    <Eyebrow color="#7D6039">{category.title}</Eyebrow>
                  </Link>
                </div>
              ) : null}
              <h1 className={s.heroTitle} style={{ ...HERO_H1_STYLE, fontSize: undefined }}>
                {hasAccent ? (
                  <>
                    {title.trim().slice(0, title.trim().length - accent!.length)}
                    <em style={H1_ACCENT_STYLE}>{accent}</em>
                  </>
                ) : (
                  post.title
                )}
              </h1>
              <p className={s.heroExcerpt}>{post.excerpt}</p>
              <Byline author={post.author} publishedAt={post.publishedAt} updatedAt={post.updatedAt} chars={post.chars} />
            </div>
            {post.mainImage?.asset ? (
              <figure className={s.heroMedia}>
                {/* Covers often carry text, so the whole image is shown in its own proportions, never cropped. */}
                <SanityImage image={post.mainImage} sizes="(min-width: 1024px) 520px, 100vw" widths={[480, 640, 760, 1040, 1520]} priority className={s.heroImg} />
                {post.mainImage.caption ? <figcaption>{post.mainImage.caption}</figcaption> : null}
              </figure>
            ) : null}
          </header>

          {/* BODY: outline beside the text on desktop, a compact sticky bar above it on smaller screens */}
          <div className={showToc ? s.layout : `${s.layout} ${s.layoutSolo}`}>
            {showToc ? <ArticleOutline items={outline} endId="article-end" /> : null}
            <div style={{ minWidth: 0 }} id="article-body">
              {post.body?.length ? <ArticleBody value={post.body} toc={toc} /> : null}

              {post.faqs?.length ? (
                <section aria-labelledby="faq" style={{ marginTop: 64 }}>
                  <h2 id="faq" style={{ margin: "0 0 20px", fontFamily: "var(--nf-general-sans)", fontSize: "clamp(26px,2.2vw,31px)", fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.2 }}>
                    Frequently asked questions
                  </h2>
                  <div className={s.faq}>
                    {post.faqs.map((f) => (
                      <details key={f._key}>
                        <summary>
                          <h3>{f.question}</h3>
                          <span className={s.faqIcon} aria-hidden="true">
                            <PlusIcon />
                          </span>
                        </summary>
                        <div className={s.faqAnswer}>
                          {paragraphs(f.answer).map((p, i) => (
                            <p key={i}>{p}</p>
                          ))}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              ) : null}

              {/* End of the reading range for the outline and the progress line. */}
              <div id="article-end" aria-hidden="true" />

              {/* ARTICLE FOOTER: categories and sharing */}
              <div style={{ marginTop: 56, paddingTop: 24, borderTop: "1px solid #DDDAD3", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
                {post.categories?.length ? (
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 14, color: "#6F6B64", marginRight: 4 }}>Filed under</span>
                    {post.categories.map((c) => (
                      <Link key={c.slug} href={categoryPath(stegaClean(c.slug))} className={s.chip}>
                        {c.title}
                      </Link>
                    ))}
                  </div>
                ) : null}
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
                  <CopyLinkButton url={pageUrl} />
                  <a className={s.shareButton} href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`} target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon size={14} />
                    Share
                    <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>on LinkedIn</span>
                  </a>
                  <a className={s.shareButton} href={`https://x.com/intent/post?url=${shareUrl}&text=${shareText}`} target="_blank" rel="noopener noreferrer">
                    Post on X
                  </a>
                </div>
              </div>

              {post.author ? (
                <div style={{ marginTop: 40 }}>
                  <AuthorBox author={post.author} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </article>

      {related.length ? (
        <section aria-labelledby="related" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(72px,7vw,104px) ${PAD} 0` }}>
          <div style={{ marginBottom: 32 }}>
            <Eyebrow>Keep reading</Eyebrow>
            <h2 id="related" style={{ margin: "12px 0 0", fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(30px,3vw,42px)", lineHeight: 1.06, letterSpacing: "-0.035em" }}>
              Related articles
            </h2>
          </div>
          <div className={s.grid}>
            {related.map((p) => (
              <PostCard key={p._id} post={p} />
            ))}
          </div>
        </section>
      ) : null}

      {ctaMode === "default" ? <BlogCta /> : null}
      {ctaMode === "custom" && cta.heading && cta.buttonLabel && cta.buttonUrl ? (
        <BlogCta heading={cta.heading} text={cta.text} buttonLabel={cta.buttonLabel} buttonUrl={stegaClean(cta.buttonUrl)} />
      ) : null}

      <div style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(48px,5vw,72px) ${PAD} clamp(64px,7vw,96px)`, display: "flex", justifyContent: "center" }}>
        <Link href="/blog" className={s.backLink}>
          <ArrowIcon />
          Back to the blog
        </Link>
      </div>
    </main>
  );
}
