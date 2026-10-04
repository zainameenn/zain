import Image from "next/image";
import type { CSSProperties, ComponentProps } from "react";
import { IMAGE_META } from "./imageMeta";

type ImgProps = Omit<ComponentProps<"img">, "src" | "width" | "height" | "srcSet"> & { src: string; alt: string; width?: number; height?: number };

/** Drop-in for <img>: same styling, served through next/image with the file's real size and measured `sizes`. */
export function Img({ src, sizes, loading, width, height, ...rest }: ImgProps) {
  const meta = IMAGE_META[src];
  if (!meta) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} sizes={sizes} width={width} height={height} loading={loading ?? "lazy"} {...rest} />;
  }
  return <Image src={src} width={width ?? meta[0]} height={height ?? meta[1]} sizes={sizes ?? meta[2]} loading={loading ?? "lazy"} {...rest} />;
}

const scaleSizes = (sizes: string, scale: number) =>
  scale === 1 ? sizes : sizes.replace(/(\d+(?:\.\d+)?)(vw|px)(?=\s*(,|\)|$))/g, (_, n, u) => `${Math.ceil(Number(n) * scale)}${u}`);

type BgImageProps = {
  src: string;
  alt: string;
  /** Box styles that used to hold the CSS background (size, aspect ratio, radius, blend mode, background color). */
  style?: CSSProperties;
  className?: string;
  /** CSS background-position, as "x% y%". */
  position?: string;
  /** "contain", "cover", or a width percentage for "N% auto". */
  fit?: "contain" | "cover" | number;
  sizes?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
};

/** Replaces a role="img" box with a CSS background image. Renders a real image with identical position, scale and cropping. */
export function BgImage({ src, alt, style, className, position = "50% 50%", fit = "contain", sizes, loading = "lazy", fetchPriority }: BgImageProps) {
  const meta = IMAGE_META[src];
  const [x, y] = position.split(" ");
  const box: CSSProperties = { position: "relative", overflow: "hidden", ...style };
  if (typeof fit === "number") {
    // "N% auto": image is N% of the box width, natural height, placed like background-position.
    return (
      <div className={className} style={box}>
        <Image
          src={src}
          alt={alt}
          width={meta[0]}
          height={meta[1]}
          sizes={scaleSizes(sizes ?? meta[2], fit / 100)}
          loading={loading}
          fetchPriority={fetchPriority}
          style={{ position: "absolute", left: x, top: y, width: `${fit}%`, height: "auto", maxWidth: "none", transform: `translate(-${x}, -${y})` }}
        />
      </div>
    );
  }
  return (
    <div className={className} style={box}>
      <Image src={src} alt={alt} fill sizes={sizes ?? meta[2]} loading={loading} fetchPriority={fetchPriority} style={{ objectFit: fit, objectPosition: `${x} ${y}` }} />
    </div>
  );
}
