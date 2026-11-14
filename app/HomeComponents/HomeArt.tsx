/**
 * Homepage section illustration (November 2026 SVG pack, public/assets/home). Renders at the SVG's own ratio:
 * width 100%, height auto, contained, never cropped, with the real size given so the browser reserves the space.
 * `mobile` swaps in an art-directed version at 640px and below.
 */
export function HomeArt({
  src,
  width,
  height,
  mobile,
  alt = "",
  eager,
  maxWidth,
  className,
}: {
  src: string;
  width: number;
  height: number;
  mobile?: { src: string; width: number; height: number };
  alt?: string;
  eager?: boolean;
  maxWidth: number;
  className?: string;
}) {
  const img = (
    // A local SVG: next/image would only add a round trip.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={eager ? "high" : undefined}
      style={{ display: "block", width: "100%", height: "auto", objectFit: "contain" }}
    />
  );
  return (
    <div className={className} style={{ minWidth: 0, width: "100%", maxWidth, margin: "0 auto" }}>
      {mobile ? (
        <picture>
          <source media="(max-width: 640px)" srcSet={mobile.src} width={mobile.width} height={mobile.height} />
          {img}
        </picture>
      ) : (
        img
      )}
    </div>
  );
}
