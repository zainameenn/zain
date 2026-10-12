// The project ID and dataset are public identifiers (they appear in every image URL), so they have safe defaults.
// Secrets (tokens) are never read here: see sanity/lib/fetch.ts, which only runs on the server.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "uziw3l77";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2025-02-19";

/** Where the embedded Studio lives on the site. */
export const studioUrl = "/studio";

export const SITE_URL = "https://www.zainameen.com";
