"use client";

import type { StyleSettings } from "@/lib/tools/types";
import { STYLE_EVENT } from "./BioStudio";
import s from "./studio.module.css";

/** Sends a style card's settings to the generator above. Everything the visitor already typed stays as it is. */
export function StyleButton({ name, settings, dark }: { name: string; settings: StyleSettings; dark?: boolean }) {
  return (
    <button
      type="button"
      className={`${s.btn} ${dark ? s.btnLight : s.btnGhost} ${s.btnSm}`}
      aria-label={`Use the ${name} style in the generator`}
      onClick={() => window.dispatchEvent(new CustomEvent(STYLE_EVENT, { detail: settings }))}
    >
      Use this style
    </button>
  );
}
