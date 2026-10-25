import { fetchPublished } from "@/sanity/lib/fetch";
import { SITEMAP_QUERY } from "@/sanity/lib/queries";
import { CASE_STUDIES, caseStudyPath } from "@/app/case-studies/_data";
import { ALL_TOOLS, TOOLS, toolPath } from "@/lib/tools/registry";
import { entryModified, publishedEntries } from "@/lib/changelog";
import { SITE_PAGES } from "@/lib/site-pages";
import LASTMOD from "@/lib/lastmod.json";

// Every public, indexable URL on the site with its real last modified date (or none when unknown).
// Shared by the XML sitemap and the human sitemap page, so the two can never disagree.

export const SITE = "https://www.zainameen.com";

export type SiteUrl = { path: string; name: string; group: string; lastmod?: string; priority: number };
export type BlogPost = { title: string; slug: string; date: string };

type SitemapContent = { posts: BlogPost[]; authors: { slug: string; _updatedAt: string }[] };

const lastmod = LASTMOD as Record<string, string>;
const day = (iso?: string | null) => (iso ? iso.slice(0, 10) : undefined);

/** Published blog content from Sanity. Drafts and noindex posts never appear. Empty if Sanity is unreachable. */
export async function blogContent(): Promise<SitemapContent> {
  try {
    return await fetchPublished<SitemapContent>(SITEMAP_QUERY);
  } catch (error) {
    console.error("Sitemap: could not load blog posts from Sanity.", error);
    return { posts: [], authors: [] };
  }
}

const TOOL_GROUP_NAMES: Record<string, string> = { Social: "Social media", LinkedIn: "LinkedIn", SEO: "SEO and planning", Ecommerce: "Ecommerce" };

/** Live tools only (the registry hides unpublished ones), grouped for display. */
export function toolUrls(): SiteUrl[] {
  return ALL_TOOLS.filter((t) => TOOLS[t.slug]).map((t) => ({ path: toolPath(t.slug), name: t.name, group: TOOL_GROUP_NAMES[t.group] ?? t.group, lastmod: lastmod["/tools/*"], priority: 0.6 }));
}

export async function siteUrls(): Promise<{ urls: SiteUrl[]; posts: BlogPost[] }> {
  const { posts, authors } = await blogContent();
  const changelog = publishedEntries();
  const dynamicDates: Record<string, string | undefined> = {
    "/blog": day(posts[0]?.date),
    "/changelog": changelog[0] ? entryModified(changelog[0]) : undefined,
  };

  const urls: SiteUrl[] = [
    ...SITE_PAGES.map((p) => ({ path: p.path, name: p.name, group: p.section, lastmod: dynamicDates[p.path] ?? lastmod[p.path], priority: p.priority })),
    ...CASE_STUDIES.map((c) => ({ path: caseStudyPath(c), name: c.name, group: "case-studies", lastmod: lastmod[caseStudyPath(c)], priority: 0.6 })),
    ...toolUrls(),
    ...posts.map((p) => ({ path: `/blog/${p.slug}`, name: p.title, group: "blog", lastmod: day(p.date), priority: 0.6 })),
    ...authors.map((a) => ({ path: `/blog/author/${a.slug}`, name: a.slug, group: "blog-author", lastmod: day(a._updatedAt), priority: 0.3 })),
    ...changelog.map((e) => ({ path: `/changelog/${e.slug}`, name: e.title, group: "changelog", lastmod: entryModified(e), priority: 0.4 })),
  ];
  return { urls, posts };
}
