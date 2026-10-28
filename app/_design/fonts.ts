import { Figtree, Lora } from "next/font/google";

// The editorial type system: Lora for display headings, Figtree for everything you read or click.
// Only the pages on the new design import these, so the rest of the site doesn't download them yet.
export const displayFont = Lora({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], display: "swap", variable: "--ed-display" });
export const bodyFont = Figtree({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap", variable: "--ed-body" });
