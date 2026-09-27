"use client";

import GravityStars from "../ui/gravity-stars";
import { ScrollWordReveal } from "../ui/scroll-word-reveal";
import { SectionLabel } from "../ui";

// The story behind the name, told as you scroll. *word* = italic.
const paragraphs = [
  "Astronomers measure a star by looking at it from *two* places. They call it *parallax.*",
  "Today's AI sees the world from *one* place. English. Western. Desktop.",
  "Paraval gives it the other viewpoints: Yoruba, Hausa, Igbo, Pidgin, and the everyday life of more than 200 million people. Then we measure how well it *sees.*",
];

export function Manifesto() {
  return (
    <GravityStars
      className="border-y border-line"
      count={160}
      connectDistance={110}
      tint={0.12}
      glow={4.5}
      starSize={1.3}
      gravity={0.8}
      speed={0.7}
    >
      {/* Soft vignette so the text always wins over the stars */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_50%,rgba(5,5,5,0.75),transparent)]" />
      <section aria-label="Why we're called Paraval" className="relative mx-auto max-w-5xl px-4 py-28 sm:px-8 sm:py-44">
        <SectionLabel index="00">Why &ldquo;Paraval&rdquo;</SectionLabel>
        <ScrollWordReveal
          className="mt-10 space-y-8 sm:space-y-10"
          paragraphClassName="display text-[2.1rem] leading-[1.08] sm:text-5xl lg:text-[3.6rem]"
          paragraphs={paragraphs}
        />
        <p className="mt-12 text-[13px] text-paper/45">Parallax + evaluation = Paraval.</p>
      </section>
    </GravityStars>
  );
}
