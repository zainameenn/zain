import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { dataset, projectId } from "../env";

const builder = createImageUrlBuilder({ projectId, dataset });

/** Image URL builder. Respects the crop and focal point set in the Studio. */
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format");
}
