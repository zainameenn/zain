import { defineQuery } from "next-sanity";

// A post is public once it has a slug and its publication date has passed.
// Drafts never match: the public client only sees published documents.
// $isPreview is true only inside the Studio preview, so scheduled posts can be checked before their date.
const VISIBLE_POST = `_type == "post" && defined(slug.current) && ($isPreview || publishedAt <= now())`;

const IMAGE = `{asset, crop, hotspot, alt, caption, "lqip": asset->metadata.lqip, "dimensions": asset->metadata.dimensions}`;

const CARD = `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  updatedAt,
  "mainImage": mainImage${IMAGE},
  "author": author->{name, "slug": slug.current},
  "categories": categories[]->{title, "slug": slug.current},
  "chars": length(pt::text(body))
`;

// Featured slot: posts marked "featured" first (highest priority, then newest). With none marked, the newest post.
const FEATURED = `*[${VISIBLE_POST}] | order(coalesce(featured, false) desc, coalesce(featuredPriority, 0) desc, publishedAt desc)[0]`;

// Category filter ($category, "" for all) and search ($q, "" for none; $terms are the words with a trailing *).
const MATCHES = `${VISIBLE_POST}
  && ($category == "" || $category in categories[]->slug.current)
  && ($q == "" || (title + " " + coalesce(excerpt, "") + " " + coalesce(array::join(categories[]->title, " "), "") + " " + coalesce(pt::text(body), "")) match $terms)
  && !($excludeFeatured && _id == ${FEATURED}._id)`;

/** Everything the /blog page needs in one request. Only one page of cards is fetched ($start...$end). */
export const BLOG_PAGE_QUERY = defineQuery(`{
  "featured": select($excludeFeatured => ${FEATURED}{${CARD}}, null),
  "posts": *[${MATCHES}] | order(publishedAt desc)[$start...$end]{${CARD}},
  "total": count(*[${MATCHES}]),
  "publishedCount": count(*[${VISIBLE_POST}]),
  "categories": *[_type == "category" && defined(slug.current) && hidden != true && count(*[${VISIBLE_POST} && references(^._id)]) > 0]
    | order(coalesce(order, 999) asc, title asc){title, "slug": slug.current, description}
}`);

export const POST_SLUGS_QUERY = defineQuery(`*[${VISIBLE_POST}].slug.current`);

export const POST_QUERY = defineQuery(`
  *[${VISIBLE_POST} && slug.current == $slug][0]{
    ${CARD},
    headlineAccent,
    tags,
    seoTitle,
    seoDescription,
    canonicalUrl,
    noindex,
    "ogImage": ogImage{asset, crop, hotspot},
    "author": author->{
      name,
      "slug": slug.current,
      jobTitle,
      bio,
      website,
      linkedin,
      socialLinks,
      "image": image{asset, crop, hotspot, alt}
    },
    body[]{
      ...,
      _type == "image" => {..., "lqip": asset->metadata.lqip, "dimensions": asset->metadata.dimensions},
      markDefs[]{..., _type == "internalLink" => {"slug": reference->slug.current}}
    },
    faqs[]{_key, question, answer},
    cta,
    "relatedRefs": related[]._ref,
    "relatedPicked": *[${VISIBLE_POST} && _id in ^.related[]._ref]{${CARD}},
    "sameCategory": *[${VISIBLE_POST} && _id != ^._id && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(publishedAt desc)[0...6]{${CARD}, tags},
    "latest": *[${VISIBLE_POST} && _id != ^._id] | order(publishedAt desc)[0...3]{${CARD}}
  }
`);

export const AUTHOR_QUERY = defineQuery(`
  *[_type == "author" && slug.current == $slug][0]{
    name,
    "slug": slug.current,
    jobTitle,
    bio,
    website,
    linkedin,
    socialLinks,
    "image": image{asset, crop, hotspot, alt},
    "posts": *[${VISIBLE_POST} && author._ref == ^._id] | order(publishedAt desc){${CARD}}
  }
`);

export const AUTHOR_SLUGS_QUERY = defineQuery(`
  *[_type == "author" && defined(slug.current) && count(*[${VISIBLE_POST} && author._ref == ^._id]) > 0].slug.current
`);

export const SITEMAP_QUERY = defineQuery(`{
  "posts": *[${VISIBLE_POST} && noindex != true && !defined(canonicalUrl)] | order(publishedAt desc){title, "slug": slug.current, "date": coalesce(updatedAt, publishedAt, _updatedAt)},
  "categories": *[_type == "category" && defined(slug.current) && hidden != true && count(*[${VISIBLE_POST} && references(^._id)]) > 0]{"slug": slug.current, _updatedAt},
  "authors": *[_type == "author" && defined(slug.current) && count(*[${VISIBLE_POST} && author._ref == ^._id]) > 0]{"slug": slug.current, _updatedAt}
}`);
