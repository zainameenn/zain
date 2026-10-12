import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, studioUrl } from "../env";

// Public, token-free client: it can only ever read published documents.
// The CDN is off because Next.js caches the responses itself and revalidates them on publish.
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
  stega: { studioUrl },
});
