"use client";

import { useEffect } from "react";

// Fades [data-reveal] elements in as they scroll into view.
// The `js` class is added here, so without JS everything is simply visible.
export function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
