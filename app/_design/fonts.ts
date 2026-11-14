import localFont from "next/font/local";

// The site's type system: Lora for display headings, Figtree for everything you read or click.
// Served from the repository (latin variable fonts from Google Fonts, Nov 2026) instead of next/font/google, because
// fetching Google Fonts during the Vercel build failed several times and broke deploys.
export const displayFont = localFont({
  src: [
    { path: "./font-files/lora.woff2", weight: "400 600", style: "normal" },
    { path: "./font-files/lora-italic.woff2", weight: "400 600", style: "italic" },
  ],
  display: "swap",
  variable: "--ed-display",
  fallback: ["Georgia", "serif"],
});
export const bodyFont = localFont({
  src: [{ path: "./font-files/figtree.woff2", weight: "400 600", style: "normal" }],
  display: "swap",
  variable: "--ed-body",
  fallback: ["system-ui", "sans-serif"],
});
