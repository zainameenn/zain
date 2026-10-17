import { Lora } from "next/font/google";

// Lora is only for small editorial accents on studio tool pages (step numbers, quoted lessons).
// Loaded here rather than in the root layout, so the rest of the site never downloads it.
export const lora = Lora({ subsets: ["latin"], weight: ["500"], style: ["normal", "italic"], display: "swap", variable: "--studio-lora" });
