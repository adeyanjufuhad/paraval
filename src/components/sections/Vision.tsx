import { SectionLabel } from "../ui";

const stops = [
  { when: "Now", where: "Nigeria", langs: "Yoruba · Hausa · Igbo · Pidgin", current: true },
  { when: "Next", where: "Ghana & Kenya", langs: "Twi · Swahili · and more" },
  { when: "Then", where: "Across Africa", langs: "2,000+ languages" },
  { when: "Later", where: "South & Southeast Asia", langs: "The next billions online" },
  { when: "Always", where: "Every language", langs: "Wherever AI can't yet see" },
];

// Concentric orbits growing outward: the network expanding from its first star
function Rings() {
  return (
    <svg viewBox="0 0 600 600" className="h-full w-full text-paper" aria-hidden>
      {[60, 120, 180, 240, 290].map((r, i) => (
        <circle key={r} cx="300" cy="300" r={r} fill="none" stroke="currentColor" strokeOpacity={0.5 - i * 0.09} strokeDasharray={i === 0 ? undefined : "2 6"} />
      ))}
      <circle cx="300" cy="300" r="26" fill="currentColor" fillOpacity="0.06" />
      <circle cx="300" cy="300" r="5" fill="currentColor" />
      {[
        [300 + 120 * Math.cos(-0.6), 300 + 120 * Math.sin(-0.6)],
        [300 + 180 * Math.cos(2.4), 300 + 180 * Math.sin(2.4)],
        [300 + 240 * Math.cos(0.9), 300 + 240 * Math.sin(0.9)],
        [300 + 290 * Math.cos(-2.2), 300 + 290 * Math.sin(-2.2)],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill="currentColor" fillOpacity={0.8 - i * 0.15} />
      ))}
    </svg>
  );
}

export function Vision() {
  return (
    <section id="vision" className="relative mx-auto max-w-7xl scroll-mt-10 overflow-hidden px-4 py-24 sm:px-8 sm:py-32">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <div data-reveal>
            <SectionLabel index="10">Where we&apos;re going</SectionLabel>
            <h2 className="display mt-8 text-[2.6rem] sm:text-6xl">
              From Nigeria to <em>every</em> language.
            </h2>
            <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-paper/60">
              A global network of millions of contributors, paid fairly and fast, earning again every time their work is reused. The default place AI companies
              go to make their models work for everyone.
            </p>
          </div>

          <ol data-reveal className="mt-12 border-t border-line">
            {stops.map((s) => (
              <li key={s.when} className="grid grid-cols-[5.5rem_1fr] items-baseline gap-4 border-b border-line py-5 sm:grid-cols-[7rem_1fr_auto]">
                <span className={`eyebrow ${s.current ? "text-paper" : ""}`}>
                  {s.current && <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-paper align-middle" />}
                  {s.when}
                </span>
                <span className="display text-2xl sm:text-3xl">{s.where}</span>
                <span className="col-start-2 text-[13px] text-paper/45 sm:col-start-3 sm:text-right">{s.langs}</span>
              </li>
            ))}
          </ol>
        </div>

        <div data-reveal className="relative mx-auto aspect-square w-full max-w-[34rem] opacity-80 motion-safe:animate-[spin_180s_linear_infinite]">
          <Rings />
        </div>
      </div>
    </section>
  );
}
