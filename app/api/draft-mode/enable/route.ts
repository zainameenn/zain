import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client } from "@/sanity/lib/client";

// Called by the Studio's Presentation tool. It checks a one time secret that the Studio creates,
// using the server-only viewer token, then turns on draft mode for that browser only.
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: process.env.SANITY_API_READ_TOKEN }),
});
