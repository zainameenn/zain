export function ImagePlaceholder({
  alt,
  aspect = "4/3",
  dark,
  radius = 12,
}: {
  alt: string;
  aspect?: string;
  dark?: boolean;
  radius?: number;
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      style={{
        aspectRatio: aspect,
        borderRadius: radius,
        border: `1px dashed ${dark ? "rgba(255,255,255,.25)" : "#CFC6B6"}`,
        background: dark ? "rgba(255,255,255,.04)" : "#F4F0E8",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: 16,
        textAlign: "center",
        color: dark ? "#8B877F" : "#9A9488",
        width: "100%",
        height: "100%",
      }}
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="8.5" cy="9.5" r="1.5" stroke="currentColor" strokeWidth="1.4" />
        <path d="M4 16l5-5 4 4 3-3 5 5" stroke="currentColor" strokeWidth="1.4" />
      </svg>
      <span style={{ fontSize: 11.5, lineHeight: 1.4, maxWidth: 260 }}>{alt}</span>
    </div>
  );
}
