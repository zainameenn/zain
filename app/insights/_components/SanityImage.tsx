import type { CSSProperties } from "react";
import { stegaClean } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImage as SanityImageValue } from "@/sanity/lib/types";

type Props = {
  image: SanityImageValue;
  alt?: string;
  /** Width divided by height. Crops around the focal point set in the Studio. Omit to keep the image's own shape. */
  aspect?: number;
  sizes: string;
  widths?: number[];
  priority?: boolean;
  style?: CSSProperties;
  className?: string;
};

/**
 * Responsive image served straight from Sanity's image CDN (resized, cropped to the focal point,
 * converted to AVIF or WebP), with the blurred preview as a placeholder.
 */
export function SanityImage({ image, alt, aspect, sizes, widths = [400, 640, 800, 1080, 1440, 1920], priority, style, className }: Props) {
  if (!image?.asset) return null;
  const dims = image.dimensions;
  const crop = image.crop;
  // The shape after any crop applied in the Studio.
  const naturalAspect = dims ? (dims.width * (1 - (crop?.left ?? 0) - (crop?.right ?? 0))) / (dims.height * (1 - (crop?.top ?? 0) - (crop?.bottom ?? 0))) : 16 / 9;
  const ratio = aspect ?? naturalAspect;
  // Never upscale past the original.
  const maxW = dims?.width ?? Math.max(...widths);
  const usable = widths.filter((w) => w <= maxW);
  const list = usable.length ? usable : [Math.min(...widths)];

  const build = (w: number) => {
    const b = urlFor(image).width(w).quality(80);
    return aspect ? b.height(Math.round(w / aspect)).fit("crop").url() : b.fit("max").url();
  };
  const w0 = list[Math.min(list.length - 1, 2)];

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={build(w0)}
      srcSet={list.map((w) => `${build(w)} ${w}w`).join(", ")}
      sizes={sizes}
      width={w0}
      height={Math.round(w0 / ratio)}
      alt={stegaClean(alt ?? image.alt ?? "")}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={className}
      style={{
        display: "block",
        width: "100%",
        height: "auto",
        aspectRatio: `${ratio}`,
        objectFit: "cover",
        backgroundColor: "#E5E1D8",
        ...(image.lqip ? { backgroundImage: `url(${image.lqip})`, backgroundSize: "cover", backgroundPosition: "center" } : {}),
        ...style,
      }}
    />
  );
}
