import { SectionLabel } from "../ui";

const offers = [
  {
    name: "Evaluations",
    body: "Scored tests of your model's answers in local languages and contexts, with clear error reports.",
    who: "Native speakers, second-person reviewed",
    first: true,
  },
  {
    name: "Text data",
    body: "Local Q&A, translations, instructions and conversations, ready for training.",
    who: "Native speakers, writers, language students",
  },
  {
    name: "Expert feedback",
    body: "Professionals ranking and correcting model answers in medicine, law, engineering, agriculture and finance.",
    who: "Final-year students, graduates, professionals",
  },
  {
    name: "Voice data",
    body: "Recorded, transcribed speech across local languages and accents.",
    who: "Contributors on any phone, checked by reviewers",
  },
  {
    name: "Agent demonstrations",
    body: "Screen recordings of people completing real tasks on local apps and websites.",
    who: "Trained contributors, strict privacy rules",
  },
];

export function Offer() {
  return (
    <section id="offer" className="mx-auto max-w-7xl scroll-mt-10 px-4 py-24 sm:px-8 sm:py-32">
      <div data-reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <SectionLabel index="06">What we offer</SectionLabel>
          <h2 className="display mt-8 max-w-3xl text-[2.6rem] sm:text-6xl">
            Human data, <em>measured</em> from every angle.
          </h2>
        </div>
        <p className="max-w-sm text-[14px] leading-relaxed text-paper/55">
          Five kinds of data for AI teams, all made by paid, verified contributors, with a consent record on every item.
        </p>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {offers.map((o, i) => (
          <article
            key={o.name}
            data-reveal
            style={{ transitionDelay: `${(i % 3) * 90}ms` }}
            className={`spotlight group relative flex min-h-64 flex-col rounded-3xl border border-line bg-white/[0.025] p-7 transition-colors duration-500 hover:bg-white/[0.035] ${
              i < 2 ? "lg:col-span-3" : "lg:col-span-2"
            }`}
          >
            <div className="flex items-start justify-between">
              <span className="font-serif text-xl italic text-paper/40">0{i + 1}</span>
              {o.first && (
                <span className="rounded-full border border-white/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.18em] text-paper/70">
                  Launching first
                </span>
              )}
            </div>
            <h3 className="display mt-auto pt-12 text-3xl sm:text-[2.1rem]">{o.name}</h3>
            <p className="mt-3 text-[14px] leading-relaxed text-paper/60">{o.body}</p>
            <p className="mt-5 border-t border-line pt-4 text-[12px] text-paper/40">{o.who}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
