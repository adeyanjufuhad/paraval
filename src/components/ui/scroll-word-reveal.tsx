"use client";

// Based on Reading Text Reveal by waleedkibhen, from 21st.dev:
// https://21st.dev/@waleedkibhen/components/reading-text-reveal
// Adapted for Paraval: takes its text as props, *word* marks italic emphasis,
// no tall scroll spacer, and everything shows at once for reduced motion.

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function ScrollWordReveal({
  paragraphs,
  className = "",
  paragraphClassName = "",
}: {
  paragraphs: string[];
  className?: string;
  paragraphClassName?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(0);
  const reduceMotion = useReducedMotion();

  const words = paragraphs.map((p) => p.split(" "));
  const totalWords = words.reduce((n, w) => n + w.length, 0);

  useEffect(() => {
    if (reduceMotion) return;
    let rafId: number | null = null;
    let target = 0;
    let current = 0;

    // Ease the reveal toward the scroll position instead of jumping
    const smooth = () => {
      current += (target - current) * 0.12;
      if (Math.abs(target - current) > 0.001) {
        setRevealed(Math.floor(current * totalWords));
        rafId = requestAnimationFrame(smooth);
      } else {
        setRevealed(Math.floor(target * totalWords));
      }
    };

    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      // Words light up as they pass an "eye line" 62% down the screen
      const eyeLevel = window.innerHeight * 0.62;
      const progress = (eyeLevel - rect.top) / rect.height;
      target = Math.max(0, Math.min(1, progress));
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(smooth);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [totalWords, reduceMotion]);

  let index = 0;
  const shown = reduceMotion ? totalWords : revealed;

  return (
    <div ref={containerRef} className={className}>
      {words.map((paragraph, p) => (
        <p key={p} className={paragraphClassName}>
          {paragraph.map((raw, i) => {
            const lit = index++ < shown;
            const emphasis = raw.startsWith("*");
            const word = raw.replace(/\*/g, "");
            return (
              <span
                key={i}
                className={`transition-[opacity,color] duration-300 ease-out ${lit ? "text-paper opacity-100" : "text-paper opacity-[0.18]"} ${
                  emphasis ? "font-serif italic" : ""
                }`}
              >
                {word}{" "}
              </span>
            );
          })}
        </p>
      ))}
    </div>
  );
}
