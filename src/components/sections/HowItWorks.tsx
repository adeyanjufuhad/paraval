import { SectionLabel } from "../ui";

const tracks = [
  {
    label: "For contributors",
    cta: { href: "#contribute", text: "Join as a contributor" },
    steps: [
      ["Sign up on your phone", "Tell us your languages and what you study or do. It takes two minutes."],
      ["Pass a short test", "One quick check per language or field unlocks paid work."],
      ["Test and teach AI", "Pick tasks from your queue. Each one shows the pay, the time it takes and clear instructions."],
      ["Get paid in 48 hours", "Straight to your local bank account, plus royalties when your data is licensed again."],
    ],
  },
  {
    label: "For AI teams",
    cta: { href: "#work-with-us", text: "Work with us" },
    steps: [
      ["Tell us what you need", "Languages, task type, volume and deadline."],
      ["We test and build", "Verified native speakers and domain experts do the work. A second person reviews every item."],
      ["Quality, checked", "Hidden gold questions, agreement checks, daily audits and AI-text detection."],
      ["You get verified results", "Scored evaluations and datasets, with a consent record attached to every item."],
    ],
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-7xl scroll-mt-10 px-4 py-24 sm:px-8 sm:py-32">
      <div data-reveal>
        <SectionLabel index="04">How it works</SectionLabel>
        <h2 className="display mt-8 max-w-3xl text-[2.6rem] sm:text-6xl">
          Two sides. <em>One loop.</em>
        </h2>
      </div>

      <div className="mt-16 grid gap-5 lg:grid-cols-2">
        {tracks.map((track, t) => (
          <div
            key={track.label}
            data-reveal
            style={{ transitionDelay: `${t * 120}ms` }}
            className="spotlight relative overflow-hidden rounded-3xl border border-line bg-gradient-to-b from-white/[0.045] to-white/[0.01] p-7 sm:p-10"
          >
            <p className="eyebrow">{track.label}</p>
            <ol className="mt-8 space-y-0">
              {track.steps.map(([title, body], i) => (
                <li key={title} className="relative grid grid-cols-[2.5rem_1fr] pb-8 last:pb-0">
                  {i < track.steps.length - 1 && (
                    <span aria-hidden className="absolute left-[0.6875rem] top-7 bottom-1 w-px bg-white/10" />
                  )}
                  <span className="grid h-[1.375rem] w-[1.375rem] place-items-center rounded-full border border-white/25 text-[10px] text-paper/80">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-[15px] font-medium">{title}</h3>
                    <p className="mt-1.5 text-[14px] leading-relaxed text-paper/55">{body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <a
              href={track.cta.href}
              className="mt-10 inline-flex items-center gap-2 text-[13px] text-paper/80 underline decoration-white/25 underline-offset-4 transition-colors hover:text-paper hover:decoration-white"
            >
              {track.cta.text} →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
