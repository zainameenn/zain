import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { JsonLd, breadcrumbList } from "@/app/blog/_components/JsonLd";
import { CHANGELOG_CATEGORIES, entryModified, formatDate, getEntry, neighbours, publishedEntries, relatedEntries } from "@/lib/changelog";
import { Markdown } from "../_components/Markdown";
import s from "../changelog.module.css";

const SITE = "https://www.zainameen.com";

// Only published entries get a page. Anything else (drafts, typos) is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return publishedEntries().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const e = getEntry((await params).slug);
  if (!e) return {};
  return buildMetadata({
    title: e.seoTitle ?? `${e.title} | Changelog`,
    description: e.seoDescription ?? e.summary,
    path: `/changelog/${e.slug}`,
    image: e.featuredImage ? { url: e.featuredImage, width: 1440, height: 900, alt: e.imageAlt ?? e.title } : undefined,
    article: { publishedTime: e.publishedAt!, modifiedTime: entryModified(e), authors: ["Zain Ul Abdin"], section: CHANGELOG_CATEGORIES[e.category] },
  });
}

export default async function ChangelogEntryPage({ params }: { params: Promise<{ slug: string }> }) {
  const e = getEntry((await params).slug);
  if (!e) notFound();
  const related = relatedEntries(e);
  const { newer, older } = neighbours(e);
  const url = `${SITE}/changelog/${e.slug}`;

  return (
    <main id="top" className={s.page}>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              headline: e.title,
              description: e.summary,
              url,
              mainEntityOfPage: url,
              datePublished: e.publishedAt,
              dateModified: entryModified(e),
              ...(e.featuredImage ? { image: `${SITE}${e.featuredImage}` } : {}),
              articleSection: CHANGELOG_CATEGORIES[e.category],
              author: { "@type": "Person", "@id": `${SITE}/#person`, name: "Zain Ul Abdin", url: `${SITE}/about` },
              publisher: { "@id": `${SITE}/#organization` },
            },
            breadcrumbList([
              { name: "Home", url: `${SITE}/` },
              { name: "Changelog", url: `${SITE}/changelog` },
              { name: e.title, url },
            ]),
          ],
        }}
      />

      <nav className={s.back} aria-label="Breadcrumb">
        <Link href="/changelog">
          <span aria-hidden>←</span> All updates
        </Link>
      </nav>

      <header className={s.entryHead}>
        <span className={s.badge}>{CHANGELOG_CATEGORIES[e.category]}</span>
        <h1 className={s.entryTitle}>{e.title}</h1>
        <p className={s.entryDates}>
          <time dateTime={e.publishedAt!}>{formatDate(e.publishedAt!)}</time>
          {e.updatedAt ? (
            <>
              {" · Updated "}
              <time dateTime={e.updatedAt}>{formatDate(e.updatedAt)}</time>
            </>
          ) : null}
        </p>
        <p className={s.lede}>{e.summary}</p>
      </header>

      {e.featuredImage ? (
        <figure className={s.shot}>
          <Image src={e.featuredImage} alt={e.imageAlt ?? ""} width={1440} height={900} sizes="(max-width: 960px) 100vw, 900px" priority />
          <figcaption>Screenshot from zainameen.com</figcaption>
        </figure>
      ) : null}

      <article className={s.entryBody}>
        <Markdown source={e.content} />
      </article>

      {e.relatedUrl ? (
        <div className={s.entryCta}>
          <Link href={e.relatedUrl} className={s.ctaBtn}>
            {e.relatedLabel ?? "Take a look"} <span aria-hidden>→</span>
          </Link>
        </div>
      ) : null}

      {related.length ? (
        <section className={s.related} aria-labelledby="related-heading">
          <h2 id="related-heading" className={s.relatedHeading}>
            Related updates
          </h2>
          <ul className={s.relatedList}>
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/changelog/${r.slug}`} className={s.relatedCard}>
                  <span className={s.badge}>{CHANGELOG_CATEGORIES[r.category]}</span>
                  <span className={s.relatedTitle}>{r.title}</span>
                  <time dateTime={r.publishedAt!} className={s.relatedDate}>
                    {formatDate(r.publishedAt!)}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <nav className={s.pager} aria-label="More updates">
        {older ? (
          <Link href={`/changelog/${older.slug}`} className={s.pagerLink}>
            <span className={s.pagerLabel}>← Previous update</span>
            <span className={s.pagerTitle}>{older.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {newer ? (
          <Link href={`/changelog/${newer.slug}`} className={`${s.pagerLink} ${s.pagerNext}`}>
            <span className={s.pagerLabel}>Next update →</span>
            <span className={s.pagerTitle}>{newer.title}</span>
          </Link>
        ) : null}
      </nav>
    </main>
  );
}
