import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { stegaClean } from "next-sanity";
import { buildMetadata } from "@/lib/seo";
import { H1_ACCENT_STYLE, HERO_H1_STYLE } from "@/app/HomeComponents/heading";
import { ArrowIcon } from "@/app/HomeComponents/icons";
import { SITE_URL } from "@/sanity/env";
import { sanityFetch } from "@/sanity/lib/fetch";
import { BLOG_PAGE_QUERY } from "@/sanity/lib/queries";
import type { BlogCategory, PostCard as PostCardData } from "@/sanity/lib/types";
import { JsonLd, breadcrumbList } from "./_components/JsonLd";
import { NewsletterForm } from "./_components/NewsletterForm";
import { Eyebrow, FeaturedCard, PostCard } from "./_components/parts";
import { MAX, PAD, absolute, postPath } from "./_components/utils";
import s from "./blog.module.css";

const PAGE_SIZE = 9;
const TITLE = "Growth Marketing Blog: SEO, Reddit & SaaS | Zain Ul Abdin";
const DESCRIPTION = "Practical guides on SEO, Reddit marketing, SaaS growth, social media, and content strategy. Real experiments, useful lessons, and no unnecessary fluff.";

type SearchParams = Promise<{ category?: string | string[]; q?: string | string[]; page?: string | string[] }>;
type BlogData = { featured: PostCardData | null; posts: PostCardData[]; total: number; publishedCount: number; categories: BlogCategory[] };

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

/** Reads ?category=, ?q= and ?page= safely. Anything unexpected falls back to the default. */
function parseParams(raw: Awaited<SearchParams>) {
  const category = /^[a-z0-9-]{1,80}$/.test(first(raw.category)) ? first(raw.category) : "";
  const q = first(raw.q).trim().slice(0, 80);
  const terms = (q.toLowerCase().match(/[\p{L}\p{N}]+/gu) ?? []).slice(0, 8).map((w) => `${w}*`);
  const page = Math.max(1, Math.min(1000, Number.parseInt(first(raw.page), 10) || 1));
  return { category, q: terms.length ? q : "", terms, page };
}

const getBlog = cache(async (category: string, q: string, termsKey: string, page: number) => {
  const filtering = Boolean(category || q);
  return sanityFetch<BlogData>(BLOG_PAGE_QUERY, {
    category,
    q,
    terms: termsKey ? termsKey.split(" ") : [],
    // Without filters the featured post sits above the grid, so it's left out of the grid.
    excludeFeatured: !filtering,
    start: (page - 1) * PAGE_SIZE,
    end: page * PAGE_SIZE,
  });
});

/** Builds a /blog link that keeps the current filters. */
function blogHref({ category, q, page }: { category?: string; q?: string; page?: number }, hash = "") {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (q) params.set("q", q);
  if (page && page > 1) params.set("page", String(page));
  const query = params.toString();
  return `/blog${query ? `?${query}` : ""}${hash}`;
}

export async function generateMetadata({ searchParams }: { searchParams: SearchParams }): Promise<Metadata> {
  const { category, q, terms, page } = parseParams(await searchParams);
  const data = await getBlog(category, q, terms.join(" "), page);
  const cat = data.categories.find((c) => stegaClean(c.slug) === category);
  const pageSuffix = page > 1 ? ` | Page ${page}` : "";
  // Category pages are real landing pages. Search results are not indexed.
  const path = blogHref({ category: cat ? category : undefined, page });
  if (cat) {
    const name = stegaClean(cat.title);
    return buildMetadata({
      title: `${name} Articles | Growth Marketing Blog | Zain${pageSuffix}`,
      description: stegaClean(cat.description)?.trim() || `${name} articles from the growth marketing blog: practical notes from real client work, with no unnecessary fluff.`,
      path,
      noindex: Boolean(q),
    });
  }
  return buildMetadata({ title: `${TITLE}${pageSuffix}`, description: DESCRIPTION, path, noindex: Boolean(q) });
}

function Pagination({ category, q, page, totalPages }: { category: string; q: string; page: number; totalPages: number }) {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1).filter((n) => n === 1 || n === totalPages || Math.abs(n - page) <= 1);
  return (
    <nav aria-label="Pagination" className={s.pagination}>
      <Link href={blogHref({ category, q, page: page - 1 }, "#articles")} className={`${s.pageLink} ${page === 1 ? s.pageDisabled : ""}`} aria-disabled={page === 1 || undefined} tabIndex={page === 1 ? -1 : undefined}>
        <ArrowIcon style={{ transform: "rotate(180deg)" }} />
        Newer
      </Link>
      {pages.map((n, i) => (
        <span key={n} style={{ display: "contents" }}>
          {i > 0 && n - pages[i - 1] > 1 ? <span aria-hidden="true" style={{ padding: "0 4px", color: "#6F6B64" }}>...</span> : null}
          <Link href={blogHref({ category, q, page: n }, "#articles")} className={`${s.pageLink} ${n === page ? s.pageCurrent : ""}`} aria-current={n === page ? "page" : undefined} aria-label={`Page ${n}`}>
            {n}
          </Link>
        </span>
      ))}
      <Link href={blogHref({ category, q, page: page + 1 }, "#articles")} className={`${s.pageLink} ${page === totalPages ? s.pageDisabled : ""}`} aria-disabled={page === totalPages || undefined} tabIndex={page === totalPages ? -1 : undefined}>
        Older
        <ArrowIcon />
      </Link>
    </nav>
  );
}

function SectionHeading({ id, eyebrow, title, sub }: { id: string; eyebrow?: string; title: React.ReactNode; sub?: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 id={id} style={{ margin: eyebrow ? "12px 0 0" : 0, fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(30px,3vw,42px)", lineHeight: 1.06, letterSpacing: "-0.035em" }}>
        {title}
      </h2>
      {sub ? <p style={{ margin: "12px 0 0", maxWidth: 640, fontSize: 17, lineHeight: 1.6, color: "#5A5854" }}>{sub}</p> : null}
    </div>
  );
}

function EmptyState({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: "clamp(40px,5vw,64px) 24px", borderRadius: 24, border: "1px dashed #D6CFC2", textAlign: "center" }}>
      <p style={{ margin: 0, fontFamily: "var(--nf-general-sans)", fontSize: "clamp(22px,2vw,26px)", fontWeight: 600, letterSpacing: "-0.02em", color: "#1C1C1C" }}>{title}</p>
      <div style={{ margin: "10px auto 0", maxWidth: 520, fontSize: 16.5, lineHeight: 1.6, color: "#5A5854" }}>{children}</div>
    </div>
  );
}

export default async function BlogPage({ searchParams }: { searchParams: SearchParams }) {
  const { category, q, terms, page } = parseParams(await searchParams);
  const data = await getBlog(category, q, terms.join(" "), page);
  const filtering = Boolean(category || q);
  const activeCategory = data.categories.find((c) => stegaClean(c.slug) === category);
  const totalPages = Math.max(1, Math.ceil(data.total / PAGE_SIZE));

  // Unknown categories and pages past the end are real 404s, not empty pages.
  if (data.publishedCount > 0 && ((category && !activeCategory) || page > totalPages)) notFound();

  const showFeatured = Boolean(data.featured && !filtering && page === 1);
  const hasPosts = data.publishedCount > 0;

  return (
    <main id="top" style={{ overflowX: "clip" }}>
      <JsonLd
        data={stegaClean({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Blog",
              "@id": `${SITE_URL}/blog`,
              url: `${SITE_URL}/blog`,
              name: "Growth Marketing Blog",
              description: DESCRIPTION,
              inLanguage: "en",
              publisher: { "@type": "Person", name: "Zain Ul Abdin", url: SITE_URL },
              blogPost: [...(showFeatured && data.featured ? [data.featured] : []), ...data.posts].map((p) => ({
                "@type": "BlogPosting",
                headline: p.title,
                url: absolute(postPath(p.slug)),
                datePublished: p.publishedAt,
              })),
            },
            breadcrumbList([
              { name: "Home", url: absolute("/") },
              { name: "Blog", url: absolute("/blog") },
            ]),
          ],
        })}
      />

      {/* HERO */}
      <section style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(56px,7vw,96px) ${PAD} 0`, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
        <Eyebrow>The blog / Ideas, lessons &amp; experiments</Eyebrow>
        <h1 style={{ ...HERO_H1_STYLE, maxWidth: 900, marginTop: 16 }}>
          Marketing advice <em style={H1_ACCENT_STYLE}>without the marketing headache.</em>
        </h1>
        <p style={{ margin: "24px auto 0", maxWidth: 640, fontSize: 18, lineHeight: 1.6, color: "#4E4C48" }}>
          Practical notes on SEO, Reddit, SaaS growth, and the things I&apos;ve learned by actually doing the work. What worked, what didn&apos;t, and what I&apos;d try next.
        </p>
      </section>

      {!hasPosts ? (
        <section style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(48px,5vw,72px) ${PAD} 0` }}>
          <EmptyState title="Nothing published yet.">I&apos;m working on a few useful breakdowns. Once they&apos;re ready, you&apos;ll find them here.</EmptyState>
        </section>
      ) : null}

      {/* FEATURED */}
      {showFeatured && data.featured ? (
        <section aria-label="Featured article" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(48px,5vw,72px) ${PAD} 0` }}>
          <FeaturedCard post={data.featured} />
        </section>
      ) : null}

      {hasPosts ? (
        <>
          {/* FILTERS AND SEARCH */}
          <section id="articles" aria-labelledby="find" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(64px,7vw,96px) ${PAD} 0`, scrollMarginTop: 96 }}>
            <div style={{ paddingTop: 32, borderTop: "1px solid #DDDAD3" }}>
              <SectionHeading id="find" title="Find something worth reading." />
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
                {data.categories.length ? (
                  <nav aria-label="Categories" style={{ flex: "1 1 520px", minWidth: 0 }}>
                    <ul className={s.filters}>
                      <li>
                        <Link href={blogHref({ q }, "#articles")} className={`${s.chip} ${!category ? s.chipActive : ""}`} aria-current={!category ? "page" : undefined}>
                          All posts
                        </Link>
                      </li>
                      {data.categories.map((c) => {
                        const slug = stegaClean(c.slug);
                        return (
                          <li key={slug}>
                            <Link href={blogHref({ category: slug, q }, "#articles")} className={`${s.chip} ${category === slug ? s.chipActive : ""}`} aria-current={category === slug ? "page" : undefined}>
                              {c.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </nav>
                ) : null}
                <form role="search" action="/blog#articles" method="get" style={{ position: "relative", flex: "1 1 280px", maxWidth: 400, display: "flex", gap: 8 }} className="max-md:!max-w-none">
                  {category ? <input type="hidden" name="category" value={category} /> : null}
                  <label htmlFor="blog-search" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
                    Search articles
                  </label>
                  <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ position: "absolute", left: 16, top: 16, color: "#6F6B64", pointerEvents: "none" }}>
                    <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M11 11L14.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <input id="blog-search" name="q" type="search" defaultValue={q} placeholder="Search articles..." className={s.search} />
                  <button type="submit" className={s.button} style={{ height: 48, flex: "0 0 auto" }}>
                    Search
                  </button>
                </form>
              </div>
            </div>
          </section>

          {/* ALL ARTICLES */}
          <section aria-labelledby="latest" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(48px,5vw,64px) ${PAD} 0` }}>
            <SectionHeading
              id="latest"
              title={q ? <>Results for &ldquo;{q}&rdquo;</> : activeCategory ? activeCategory.title : "Latest articles"}
              sub={
                filtering ? (
                  <>
                    {activeCategory?.description && !q ? <>{activeCategory.description} </> : null}
                    {data.total} {data.total === 1 ? "article" : "articles"}
                    {q && activeCategory ? <> in {activeCategory.title}</> : null}.{" "}
                    <Link href="/blog#articles" style={{ color: "#1C1C1C", borderBottom: "1px solid #CFCBC2", whiteSpace: "nowrap" }}>
                      Clear filters
                    </Link>
                  </>
                ) : (
                  "Useful ideas, actual experiments, and the occasional lesson learned the hard way."
                )
              }
            />
            {data.posts.length ? (
              <div className={s.grid}>
                {data.posts.map((p) => (
                  <PostCard key={p._id} post={p} />
                ))}
              </div>
            ) : filtering ? (
              <EmptyState title="Nothing matches that yet.">
                Try a shorter word or another category.{" "}
                <Link href="/blog#articles" style={{ color: "#1C1C1C", borderBottom: "1px solid #CFCBC2" }}>
                  See all articles
                </Link>
              </EmptyState>
            ) : (
              <p style={{ margin: 0, fontSize: 16.5, color: "#5A5854" }}>That&apos;s the only one so far. More are on the way.</p>
            )}
            <Pagination category={category} q={q} page={page} totalPages={totalPages} />
          </section>
        </>
      ) : null}

      {/* NEWSLETTER */}
      <section id="newsletter" style={{ maxWidth: MAX, margin: "0 auto", padding: `clamp(80px,8vw,112px) ${PAD} clamp(64px,7vw,96px)` }}>
        <div style={{ borderRadius: 28, background: "#1C1C1C", color: "#F2EFEA", padding: "clamp(44px,5vw,72px) clamp(24px,5vw,72px)", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <h2 style={{ margin: 0, fontFamily: "var(--nf-general-sans)", fontWeight: 600, fontSize: "clamp(32px,3.4vw,48px)", lineHeight: 1.06, letterSpacing: "-0.035em" }}>
            Useful marketing notes.
            <em style={{ display: "block", marginTop: 6, fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "1.08em", lineHeight: 1.05, color: "#D3AE82" }}>
              No 10x growth secrets.
            </em>
          </h2>
          <p style={{ margin: "20px auto 0", maxWidth: 560, fontSize: 17, lineHeight: 1.6, color: "#B7B2A8" }}>
            New articles, practical guides, and things I&apos;ve learned while working on actual projects. Sent when there&apos;s something worth sharing.
          </p>
          <NewsletterForm source="blog" />
          <p style={{ margin: "14px 0 0", fontSize: 13.5, lineHeight: 1.5, color: "#8B877F" }}>No daily motivational emails. Unsubscribe whenever you want.</p>
        </div>
      </section>
    </main>
  );
}
