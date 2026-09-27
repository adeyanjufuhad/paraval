"use client";

import Lenis from "lenis";
import { useEffect, useState } from "react";

type Hud = { index: string; label: string; total: string } | null;

// Smooth, weighted scrolling (Lenis) plus the scroll-driven chrome:
// --sy (scroll px) and --sp (0–1 progress) on <html> for CSS effects,
// a progress rail with a travelling star, and a section readout.
export function ScrollFx() {
  const [hud, setHud] = useState<Hud>(null);

  useEffect(() => {
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Section readout: the last section label above the middle of the screen
    const labels = [...document.querySelectorAll<HTMLElement>("[data-hud]")];
    const total = String(labels.length - 1).padStart(2, "0");
    let current = "";
    const updateHud = () => {
      const mid = window.innerHeight / 2;
      let hit: HTMLElement | undefined;
      for (const l of labels) {
        if (l.getBoundingClientRect().top < mid) hit = l;
        else break;
      }
      const hud = hit?.dataset.hud ?? "";
      if (hud === current) return;
      current = hud;
      const [index, ...rest] = hud.split(" ");
      setHud(hud ? { index, label: rest.join(" "), total } : null);
    };

    const write = (y: number) => {
      const max = root.scrollHeight - window.innerHeight;
      root.style.setProperty("--sy", String(Math.round(y)));
      root.style.setProperty("--sp", String(max > 0 ? Math.min(1, y / max) : 0));
      root.toggleAttribute("data-scrolled", y > window.innerHeight * 0.6);
      updateHud();
    };

    let lenis: Lenis | null = null;
    const onNativeScroll = () => write(window.scrollY);
    if (reduce) {
      window.addEventListener("scroll", onNativeScroll, { passive: true });
    } else {
      lenis = new Lenis({ duration: 1.25, autoRaf: true });
      lenis.on("scroll", ({ scroll }: { scroll: number }) => write(scroll));
    }
    write(window.scrollY);

    // In-page links glide instead of jumping, and still update the hash
    // (the waitlist listens to it to pick the right tab).
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
      const hash = a.getAttribute("href")!;
      const target = hash === "#top" ? document.body : document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target as HTMLElement, { offset: -24 });
      else target.scrollIntoView();
      history.pushState(null, "", hash);
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    };
    document.addEventListener("click", onClick);

    return () => {
      lenis?.destroy();
      window.removeEventListener("scroll", onNativeScroll);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <>
      {/* Progress rail with a travelling star */}
      <div aria-hidden className="scroll-chrome pointer-events-none fixed right-5 top-1/2 z-40 hidden h-44 w-px -translate-y-1/2 bg-white/10 lg:block">
        <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-white/10 to-white/70" style={{ height: "calc(var(--sp, 0) * 100%)" }} />
        <div
          className="absolute left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_12px_3px_rgba(255,255,255,0.55)]"
          style={{ top: "calc(var(--sp, 0) * 100%)" }}
        />
      </div>

      {/* Section readout */}
      <div
        aria-hidden
        className="scroll-chrome pointer-events-none fixed bottom-6 right-12 z-40 hidden items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/55 lg:flex"
      >
        <span className="tabular-nums text-paper">{hud?.index ?? "00"}</span>
        <span className="h-px w-6 bg-white/30" />
        <span className="tabular-nums">{hud?.total}</span>
        <span className="ml-2 max-w-[14rem] truncate">{hud?.label}</span>
      </div>
    </>
  );
}
