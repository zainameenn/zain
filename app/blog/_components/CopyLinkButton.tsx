"use client";

import { useState } from "react";
import s from "../blog.module.css";

/** Copies the article's address. Falls back to selecting it in a prompt if the clipboard isn't available. */
export function CopyLinkButton({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      className={s.shareButton}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch {
          window.prompt("Copy this link:", url);
        }
      }}
    >
      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 16 16" fill="none">
        <path d="M6.5 9.5l3-3M7 4.5l1-1a2.8 2.8 0 014 4l-1 1M9 11.5l-1 1a2.8 2.8 0 01-4-4l1-1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <span aria-live="polite">{copied ? "Link copied" : "Copy link"}</span>
    </button>
  );
}
