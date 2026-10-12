"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import type { PreviewConfig } from "@/lib/tools/types";
import { countChars, graphemes } from "@/lib/tools/validate";
import s from "../tools.module.css";
import { ProfileMockup } from "./ProfileMockup";

// Live profile preview beside the results.
// Demo mode (before generating): cycles the illustrative profiles, typing each bio out.
// Live mode (after generating): shows the visitor's chosen bio; edits update it instantly.

const CYCLE_MS = 5000;
const TYPE_MS = 18;
const REDUCED = "(prefers-reduced-motion: reduce)";

function useReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(REDUCED);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
}

export type LiveBio = { text: string; name: string; key: number };

export function ProfilePreview({ config, live }: { config: PreviewConfig; live: LiveBio | null }) {
  const reduced = useReducedMotion();
  const [demoIndex, setDemoIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dark, setDark] = useState(false);
  const [typed, setTyped] = useState<{ key: string; n: number; done: boolean }>({ key: "", n: 0, done: true });

  const demo = config.demo[demoIndex % config.demo.length];
  const profile = live ? { username: config.live.username, name: live.name, text: live.text, link: config.live.link } : demo;
  const animKey = live ? `live-${live.key}` : `demo-${demoIndex}`;
  const chars = graphemes(profile.text);

  // Demo cycle: pauses on hover or focus, never runs with reduced motion or once the visitor has results.
  useEffect(() => {
    if (live || reduced || paused || config.demo.length < 2) return;
    const id = setInterval(() => setDemoIndex((i) => (i + 1) % config.demo.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [live, reduced, paused, config.demo.length]);

  // Typing: one character at a time for each new bio. Edits to the same bio show at once.
  useEffect(() => {
    if (reduced) return;
    const total = chars.length;
    const id = setInterval(() => {
      setTyped((t) => {
        const n = t.key === animKey ? t.n + 1 : 1;
        if (n >= total) clearInterval(id);
        return { key: animKey, n, done: n >= total };
      });
    }, TYPE_MS);
    return () => clearInterval(id);
    // Only restart when a different bio is shown, not on every edit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animKey, reduced]);

  const typing = !reduced && !(typed.key === animKey && typed.done);
  const n = typed.key === animKey ? typed.n : 0;
  const shown = typing ? chars.slice(0, n).join("") : profile.text;

  return (
    <div
      className={s.preview}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className={s.previewTop}>
        <span className={s.pill}>
          <span className={s.pulse} aria-hidden />
          {config.labels.pill}
        </span>
        <span className={s.counter}>
          {countChars(shown)} / {config.limit}
        </span>
      </div>
      <div className={s.phone}>
        <div key={animKey} className={s.fadeIn}>
          <ProfileMockup
            skin={config.skin}
            username={profile.username}
            name={profile.name}
            link={profile.link}
            theme={dark ? "dark" : "light"}
            text={
              <>
                {shown}
                {typing ? <span className={s.caret} /> : null}
              </>
            }
          />
        </div>
      </div>
      <p className={s.srOnly}>{profile.text}</p>
      {live ? (
        <button type="button" className={s.themeToggle} aria-pressed={dark} onClick={() => setDark((d) => !d)}>
          {config.labels.theme}
        </button>
      ) : (
        <p className={s.previewCaption}>{config.labels.caption}</p>
      )}
    </div>
  );
}
