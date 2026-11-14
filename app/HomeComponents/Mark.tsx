import type { ReactNode } from "react";

// A gentle hand drawn curve in the theme gold, drawn under the phrase (stretches to its width, repeats per line when it wraps).
const CURVE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 12' preserveAspectRatio='none'%3E%3Cpath d='M2 8 C 45 3, 95 3, 140 6 S 190 9, 198 4' fill='none' stroke='%23B38842' stroke-width='2.6' stroke-linecap='round'/%3E%3C/svg%3E")`;

/** Highlights the few phrases on the homepage that need attention: forest green, semibold, a curved gold underline. */
export function Mark({ children }: { children: ReactNode }) {
  return (
    <strong
      style={{
        color: "#174B3A",
        fontWeight: 600,
        backgroundImage: CURVE,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 100%",
        backgroundSize: "100% 0.42em",
        paddingBottom: "0.16em",
        WebkitBoxDecorationBreak: "clone",
        boxDecorationBreak: "clone",
      }}
    >
      {children}
    </strong>
  );
}
