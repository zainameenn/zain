import { draftMode } from "next/headers";
import type { QueryParams } from "next-sanity";
import { client } from "./client";

// Server-only secrets. Neither is prefixed NEXT_PUBLIC_, so Next.js never sends them to the browser.
const readToken = process.env.SANITY_API_READ_TOKEN;

// With the publish webhook set up (SANITY_REVALIDATE_SECRET), pages update the moment you publish,
// and the hourly refresh is only a safety net. Without it, pages refresh at most a minute after publishing.
const REVALIDATE_SECONDS = process.env.SANITY_REVALIDATE_SECRET ? 3600 : 60;

/** Every cached Sanity response shares this tag, so one publish refreshes all blog pages. */
export const SANITY_TAG = "sanity";

/** True while an editor previews drafts from the Studio. */
export async function isPreviewing() {
  return (await draftMode()).isEnabled && Boolean(readToken);
}

/**
 * Fetch for pages. Visitors get cached published content.
 * In draft mode (opened from the Studio's preview) it reads drafts with the server-only viewer token.
 */
export async function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T> {
  if (await isPreviewing()) {
    return client.fetch<T>(query, { ...params, isPreview: true }, {
      perspective: "drafts",
      token: readToken,
      useCdn: false,
      stega: true,
      cache: "no-store",
    });
  }
  return fetchPublished<T>(query, params);
}

/** Published content only. Safe outside a request (sitemap, generateStaticParams). */
export function fetchPublished<T>(query: string, params: QueryParams = {}): Promise<T> {
  return client.fetch<T>(query, { ...params, isPreview: false }, {
    stega: false,
    next: { revalidate: REVALIDATE_SECONDS, tags: [SANITY_TAG] },
  });
}
