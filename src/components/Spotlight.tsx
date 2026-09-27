"use client";

import { useEffect } from "react";

// One listener for every .spotlight card: feeds the pointer position into CSS.
export function Spotlight() {
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      const card = (e.target as Element | null)?.closest<HTMLElement>(".spotlight");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}
