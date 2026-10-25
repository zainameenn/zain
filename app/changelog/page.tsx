import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { H1_ACCENT_STYLE, HERO_H1_STYLE } from "@/app/HomeComponents/heading";
import { CHANGELOG_CATEGORIES, formatDate, publishedEntries } from "@/lib/changelog";
import { ChangelogList, type ListItem } from "./_components/ChangelogList";
import s from "./changelog.module.css";

export const metadata = {
  ...buildMetadata({
    title: "Changelog | Website Updates & Free Marketing Tools",
    description: "See the latest free marketing tools, new features, website improvements, fixes, and updates. Explore what's changed and how to use it.",
    path: "/changelog",
  }),
  alternates: { canonical: "/changelog", types: { "application/rss+xml": [{ url: "/changelog/rss.xml", title: "Zain Ul Abdin changelog" }] } },
};

export default function ChangelogPage() {
  const entries = publishedEntries();
  const items: ListItem[] = entries.map((e) => ({
    slug: e.slug,
    title: e.title,
    summary: e.summary,
    category: e.category,
    categoryLabel: CHANGELOG_CATEGORIES[e.category],
    date: e.publishedAt!,
    dateLabel: formatDate(e.publishedAt!),
    subject: e.subject,
    image: e.featuredImage,
    imageAlt: e.imageAlt,
  }));
  const categories = (Object.keys(CHANGELOG_CATEGORIES) as (keyof typeof CHANGELOG_CATEGORIES)[]).map((id) => ({ id, label: CHANGELOG_CATEGORIES[id] }));

  return (
    <main id="top" className={s.page}>
      <header className={s.hero}>
        <div className={s.eyebrow}>What&apos;s new</div>
        <h1 style={HERO_H1_STYLE} className={s.h1}>
          Changelog. <em style={H1_ACCENT_STYLE}>Everything new.</em>
        </h1>
        <p className={s.lede}>New tools, better features, interface improvements, and fixes across the website. Everything worth knowing, in one place.</p>
      </header>

      <ChangelogList items={items} categories={categories} />

      <section className={s.follow} aria-labelledby="follow-heading">
        <h2 id="follow-heading" className={s.followHeading}>
          Want to know what&apos;s changed?
        </h2>
        <p className={s.followText}>Follow new tool releases, improvements and important website updates.</p>
        <Link href="/changelog/rss.xml" className={s.rss}>
          <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden fill="currentColor">
            <circle cx="5" cy="19" r="2.2" />
            <path d="M3 10.5a10.5 10.5 0 0 1 10.5 10.5h-3A7.5 7.5 0 0 0 3 13.5zM3 4a17 17 0 0 1 17 17h-3A14 14 0 0 0 3 7z" />
          </svg>
          Subscribe with RSS
        </Link>
      </section>
    </main>
  );
}
