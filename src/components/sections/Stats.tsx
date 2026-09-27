"use client";

import { useEffect, useRef, useState } from "react";

// Public figures only. Sources are listed under the band.
const stats = [
  { value: 2000, suffix: "+", label: "languages spoken across Africa" },
  { value: 1.5, decimals: 1, prefix: "", suffix: "B", label: "people living in Africa today" },
  { value: 1, suffix: " in 4", label: "people on Earth will be African by 2050" },
  { value: 500, suffix: "+", label: "languages spoken in Nigeria alone" },
];

function CountUp({ value, decimals = 0, prefix = "", suffix = "" }: { value: number; decimals?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / 1600);
          const eased = 1 - Math.pow(1 - t, 4);
          setShown(value * eased);
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  const formatted = shown.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}

export function Stats() {
  return (
    <section aria-labelledby="stats-heading" className="mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32">
      <div data-reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <h2 id="stats-heading" className="display max-w-3xl text-[2.6rem] sm:text-6xl">
          The next billion AI users speak <em>these</em> languages.
        </h2>
        <p className="max-w-sm text-[14px] leading-relaxed text-paper/55">
          The world&apos;s fastest-growing population is also the one today&apos;s models understand least. Whoever measures it first, leads.
        </p>
      </div>

      <dl data-reveal className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col bg-ink p-6 sm:p-9">
            <dt className="order-2 mt-4 max-w-[12rem] text-[13px] leading-snug text-paper/55 sm:text-[14px]">{s.label}</dt>
            <dd className="display order-1 text-5xl text-paper sm:text-7xl">
              <CountUp {...s} />
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-[11px] text-paper/30">Sources: UN World Population Prospects; Ethnologue. Figures rounded.</p>
    </section>
  );
}
