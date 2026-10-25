import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { H1_ACCENT_STYLE, HERO_H1_STYLE } from "@/app/HomeComponents/heading";
import { SITE_PAGES } from "@/lib/site-pages";
import { CASE_STUDIES, caseStudyPath } from "@/app/case-studies/_data";
import { publishedEntries } from "@/lib/changelog";
import { blogContent, toolUrls } from "@/lib/sitemap-data";
import s from "../changelog/changelog.module.css";

// The human sitemap. Everything is read from the same sources as /sitemap.xml, so new tools,
// case studies, posts and changelog entries show up here without editing this file.

export const metadata = buildMetadata({
  title: "Sitemap | Zain Ul Abdin",
  description: "Find your way around the website. Browse services, case studies, articles, free tools and other useful pages.",
  path: "/sitemap",
});

// Refreshed every hour so new blog posts appear without a redeploy.
export const revalidate = 3600;

function LinkList({ links, flow }: { links: { path: string; name: string }[]; flow?: boolean }) {
  return (
    <ul className={flow ? `${s.mapList} ${s.mapFlow}` : s.mapList}>
      {links.map((l) => (
        <li key={l.path}>
          <Link href={l.path}>{l.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default async function SitemapPage() {
  const { posts } = await blogContent();
  const tools = toolUrls();
  const toolGroups = [...new Set(tools.map((t) => t.group))];
  const changelog = publishedEntries();
  const by = (section: string) => SITE_PAGES.filter((p) => p.section === section);

  return (
    <main id="top" className={s.page}>
      <header className={s.hero}>
        <h1 style={HERO_H1_STYLE} className={s.h1}>
          Sitemap. <em style={H1_ACCENT_STYLE}>Every page, in one place.</em>
        </h1>
        <p className={s.lede}>Find your way around the website. Browse services, case studies, articles, free tools and other useful pages.</p>
      </header>

      <div className={s.mapGrid}>
        <section className={s.mapSection} aria-labelledby="map-main">
          <h2 id="map-main" className={s.mapHeading}>
            Main Pages
          </h2>
          <LinkList links={[...by("main"), ...by("legal")]} />
        </section>
        <section className={s.mapSection} aria-labelledby="map-services">
          <h2 id="map-services" className={s.mapHeading}>
            Services
          </h2>
          <LinkList links={by("services")} />
        </section>
        <section className={s.mapSection} aria-labelledby="map-cases">
          <h2 id="map-cases" className={s.mapHeading}>
            Case Studies
          </h2>
          <LinkList links={[{ path: "/case-studies", name: "All case studies" }, ...CASE_STUDIES.map((c) => ({ path: caseStudyPath(c), name: c.name }))]} />
        </section>
        <section className={s.mapSection} aria-labelledby="map-resources">
          <h2 id="map-resources" className={s.mapHeading}>
            Resources
          </h2>
          <LinkList links={by("resources").filter((p) => p.path !== "/sitemap" && p.path !== "/case-studies")} />
        </section>

        <section className={`${s.mapSection} ${s.mapWide}`} aria-labelledby="map-tools">
          <h2 id="map-tools" className={s.mapHeading}>
            Free Tools <span style={{ fontWeight: 400, color: "#6F6B64" }}>({tools.length})</span>
          </h2>
          <div className={s.mapCols}>
            {toolGroups.map((g) => (
              <div key={g}>
                <h3 className={s.mapSub}>{g}</h3>
                <LinkList links={tools.filter((t) => t.group === g)} />
              </div>
            ))}
          </div>
        </section>

        {posts.length ? (
          <section className={`${s.mapSection} ${s.mapWide}`} aria-labelledby="map-blog">
            <h2 id="map-blog" className={s.mapHeading}>
              Blog <span style={{ fontWeight: 400, color: "#6F6B64" }}>({posts.length})</span>
            </h2>
            <LinkList flow links={posts.map((p) => ({ path: `/blog/${p.slug}`, name: p.title }))} />
          </section>
        ) : null}

        <section className={`${s.mapSection} ${s.mapWide}`} aria-labelledby="map-changelog">
          <h2 id="map-changelog" className={s.mapHeading}>
            Changelog
          </h2>
          <LinkList flow links={[{ path: "/changelog", name: "All updates" }, ...changelog.slice(0, 8).map((e) => ({ path: `/changelog/${e.slug}`, name: e.title }))]} />
        </section>
      </div>

      <p className={s.mapTech}>
        Technical: <a href="/sitemap.xml">XML Sitemap</a>
      </p>
    </main>
  );
}
