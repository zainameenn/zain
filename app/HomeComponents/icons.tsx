export function ArrowIcon({ size = 13, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" style={style}>
      <path d="M1 7H12.5M8 2.5L12.5 7L8 11.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function UpArrowIcon({ size = 13, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" style={style}>
      <path d="M7 1V12.5M2.5 8L7 12.5L11.5 8" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function ChevronIcon({ size = 11, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" style={style}>
      <path d="M2 4.5L6 8.5L10 4.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

export function PlusIcon({ size = 12, style }: { size?: number; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" style={style}>
      <path d="M6 1V11M1 6H11" stroke="#1C1C1C" strokeWidth="1.5" />
    </svg>
  );
}

export function MailIcon({ size = 15, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke={color} strokeWidth="1.4" />
      <path d="M2 4L8 9L14 4" stroke={color} strokeWidth="1.4" />
    </svg>
  );
}

export function CalendarIcon({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
      <rect x="1.5" y="2.5" width="13" height="12" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M1.5 6.5H14.5M5 1V4M11 1V4" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function LinkedInIcon({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.4c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21H9z" />
    </svg>
  );
}

/** The gold hand-drawn underline used beneath italic emphasis phrases across the site. */
export function Squiggle() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 300 24"
      preserveAspectRatio="none"
      style={{ position: "absolute", left: "-3%", bottom: "-0.14em", width: "106%", height: "0.3em", overflow: "visible", pointerEvents: "none" }}
    >
      <path d="M3 13 C 60 20, 150 21, 216 15 S 286 6, 297 4" stroke="#C6A47C" strokeWidth="2.6" strokeLinecap="round" vectorEffect="non-scaling-stroke" fill="none" />
    </svg>
  );
}

/** Italic Instrument Serif emphasis with the gold underline squiggle beneath it. */
export function Emphasis({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <span style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap" }}>
      <em style={{ fontFamily: "var(--nf-serif),serif", fontStyle: "italic", fontWeight: 400, letterSpacing: "-0.01em", fontSize: "inherit", ...style }}>{children}</em>
      <Squiggle />
    </span>
  );
}
