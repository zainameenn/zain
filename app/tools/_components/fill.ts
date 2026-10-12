"use client";

import { useEffect, useRef } from "react";
import type { ToolInput } from "@/lib/tools/types";

/** "Use this example" buttons in the server rendered page talk to the tool through this window event. */
export const FILL_EVENT = "tools:fill";

export const requestFill = (input: ToolInput) => window.dispatchEvent(new CustomEvent(FILL_EVENT, { detail: input }));

/** Calls onFill with the example's values whenever a "Use this example" button is pressed. */
export function useFillListener(onFill: (input: ToolInput) => void) {
  const ref = useRef(onFill);
  useEffect(() => {
    ref.current = onFill;
  });
  useEffect(() => {
    const handler = (e: Event) => ref.current((e as CustomEvent<ToolInput>).detail);
    window.addEventListener(FILL_EVENT, handler);
    return () => window.removeEventListener(FILL_EVENT, handler);
  }, []);
}

/** Brings the form into view and focuses its first control after a fill. */
export function focusForm(form: HTMLElement | null) {
  if (!form) return;
  form.scrollIntoView({ behavior: "smooth", block: "start" });
  form.querySelector<HTMLElement>("input, select, textarea")?.focus({ preventScroll: true });
}
