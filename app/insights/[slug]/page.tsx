import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { stegaClean } from "next-sanity";
import { buildMetadata } from "@/lib/seo";
import { H1_ACCENT_STYLE, HERO_H1_STYLE } from "@/app/HomeComponents/heading";
import { ArrowIcon, ChevronIcon, PlusIcon } from "@/app/HomeComponents/icons";
import CTA from "@/app/HomeComponents/CTA";
import { SITE_URL } from "@/sanity/env";
import { fetchPublished, sanityFetch } from "@/sanity/lib/fetch";
import { urlFor } from "@/sanity/lib/image";
import { POST_QUERY, POST_SLUGS_QUERY } from "@/sanity/lib/queries";
import type { Post } from "@/sanity/lib/types";
import { ArticleBody } from "../_components/ArticleBody";
import { JsonLd, breadcrumbList } from "../_components/JsonLd";
import { AuthorBox, Breadcrumbs, Byline, Eyebrow, PostCard } from "../_components/parts";
import { SanityImage } from "../_components/SanityImage";
import { MAX, PAD, absolute, authorPath, buildToc, categoryPath, paragraphs, pickRelated, postPath, type TocItem } from "../_components/utils";
import s from "../insights.module.css";

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

function Toc({ items }: { items: TocItem[] }) {
  return (
    <ul className={s.tocList}>
      {items.map((item) => (
        <li key={item.id} className={item.level === 3 ? s.tocSub : undefined}>
          <a href={`#${item.id}`}>{item.text}</a>
        </li>
      ))}
    </ul>
  );
}

function CustomCta({ heading, text, buttonLabel, buttonUrl }: { heading: string; text?: string; buttonLabel: string; buttonUrl: string }) {
  return (
    <section style={{ maxWidth: 1360, margin: "0 auto", padding: "clamp(80px,9vw,128px) clamp(20px,4vw,48px) clamp(24px,3vw,40px)" }}>
      <div style={{ borderRadius: 28, background: "#1C1C1C", color: "#F2EFEA", padding: "clamp(48px,6vw,88px) clamp(24px,5vw,72px)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <h2 style={{ margin: 0, maxWidth: 820, fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(32px,3.6vw,50px)", lineHeight: 1.06, letterSpacing: "-0.035em" }}>{heading}</h2>
        {text ? <p style={{ margin: "20px auto 0", maxWidth: 560, fontSize: 17, lineHeight: 1.6, color: "#B7B2A8" }}>{text}</p> : null}
        <a href={buttonUrl} style={{ marginTop: 32, display: "inline-flex", alignItems: "center", gap: 12, height: 60, padding: "0 26px", borderRadius: 12, background: "#F2EFEA", color: "#1C1C1C", fontSize: 16.5, fontWeight: 600 }}>
          {buttonLabel}
          <ArrowIcon size={15} />
        </a>
      </div>
    </section>
  );
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const toc = buildToc(post.body);
  const category = post.categories?.[0];
  const related = pickRelated(post, post.relatedPicked, post.relatedRefs, post.sameCategory, post.latest);
  const title = stegaClean(post.title);
  const accent = stegaClean(post.headlineAccent)?.trim();
  const hasAccent = Boolean(accent && title.trim().endsWith(accent));
  const pageUrl = absolute(postPath(stegaClean(post.slug)));
  const cta = post.cta ?? { mode: "default" as const };
  const ctaMode = stegaClean(cta.mode) ?? "default";

  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Insights", href: "/insights" },
    ...(category ? [{ name: category.title, href: categoryPath(category.slug) }] : []),
  ];

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
        isPartOf: { "@type": "Blog", name: "Growth Marketing Insights", url: absolute("/insights") },
        ...(category ? { articleSection: category.title } : {}),
        ...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
        inLanguage: "en",
      },
      breadcrumbList([...crumbs.map((c) => ({ name: c.name, url: absolute(c.href) })), { name: title, url: pageUrl }]),
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

  return (
    <main id="top" style={{ overflowX: "clip" }}>
      <JsonLd data={jsonLd} />
      <article>
        <div style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(32px,4vw,56px) ${PAD} 0` }}>
          {/* HEADER: lines up with the article text, beside the table of contents column on wide screens */}
          <div className={s.layout}>
            <div className={s.tocDesktop} aria-hidden="true" />
            <header style={{ minWidth: 0 }}>
              <Breadcrumbs items={crumbs} />
              {category ? (
                <div style={{ marginTop: 28 }}>
                  <Link href={categoryPath(category.slug)}>
                    <Eyebrow color="#7D6039">{category.title}</Eyebrow>
                  </Link>
                </div>
              ) : null}
              <h1 style={{ ...HERO_H1_STYLE, marginTop: 14, fontSize: "clamp(2rem, calc(1.7vw + 1.35rem), 3.25rem)" }}>
                {hasAccent ? (
                  <>
                    {title.trim().slice(0, title.trim().length - accent!.length)}
                    <em style={H1_ACCENT_STYLE}>{accent}</em>
                  </>
                ) : (
                  post.title
                )}
              </h1>
              <p style={{ margin: "20px 0 28px", fontSize: "clamp(18px,1.4vw,20px)", lineHeight: 1.6, color: "#4E4C48" }}>{post.excerpt}</p>
              <Byline author={post.author} publishedAt={post.publishedAt} updatedAt={post.updatedAt} chars={post.chars} />
              {post.mainImage?.asset ? (
                <figure style={{ margin: "32px 0 0", borderRadius: 20, overflow: "hidden" }}>
                  <SanityImage image={post.mainImage} aspect={16 / 9} sizes="(min-width: 800px) 760px, 100vw" widths={[480, 760, 1080, 1520]} priority />
                </figure>
              ) : null}
            </header>
          </div>

          {/* BODY with table of contents */}
          <div className={s.layout} style={{ marginTop: "clamp(40px,4vw,56px)" }}>
            <aside className={s.tocDesktop} aria-label="Table of contents">
              {toc.length > 1 ? (
                <>
                  <Eyebrow>On this page</Eyebrow>
                  <div style={{ marginTop: 14 }}>
                    <Toc items={toc} />
                  </div>
                </>
              ) : null}
            </aside>
            <div style={{ minWidth: 0 }}>
              {toc.length > 1 ? (
                <details className={s.tocMobile} style={{ marginBottom: 36 }}>
                  <summary>
                    On this page
                    <ChevronIcon size={12} style={{ transition: "transform 200ms" }} />
                  </summary>
                  <nav aria-label="Table of contents">
                    <Toc items={toc} />
                  </nav>
                </details>
              ) : null}

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

              {post.author ? (
                <div style={{ marginTop: 64 }}>
                  <AuthorBox author={post.author} />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </article>

      {ctaMode === "default" ? <CTA /> : null}
      {ctaMode === "custom" && cta.heading && cta.buttonLabel && cta.buttonUrl ? (
        <CustomCta heading={cta.heading} text={cta.text} buttonLabel={cta.buttonLabel} buttonUrl={stegaClean(cta.buttonUrl)} />
      ) : null}

      {related.length ? (
        <section aria-labelledby="related" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(72px,7vw,104px) ${PAD} 0` }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 32 }}>
            <div>
              <Eyebrow>Keep reading</Eyebrow>
              <h2 id="related" style={{ margin: "12px 0 0", fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(30px,3vw,42px)", lineHeight: 1.06, letterSpacing: "-0.035em" }}>
                Related articles
              </h2>
            </div>
          </div>
          <div className={s.grid}>
            {related.map((p) => (
              <PostCard key={p._id} post={p} />
            ))}
          </div>
        </section>
      ) : null}

      <div style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(48px,5vw,72px) ${PAD} clamp(64px,7vw,96px)`, display: "flex", justifyContent: "center" }}>
        <Link href="/insights" className={s.backLink}>
          <ArrowIcon />
          Back to all insights
        </Link>
      </div>
    </main>
  );
}
