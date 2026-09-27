import { SectionLabel } from "../ui";

const points = [
  {
    title: "It misreads our languages",
    body: "Yoruba, Hausa, Igbo and Pidgin barely exist in training data, so answers come back wrong, stiff or flattened into English.",
  },
  {
    title: "It doesn't know everyday life",
    body: "NEPA bills, POS charges, local law, local medicine. The context that matters to more than 200 million people is missing.",
  },
  {
    title: "Nobody is measuring it",
    body: "Few trusted tests exist for how models perform here, so the companies building them can't see what they're getting wrong.",
  },
];

export function Problem() {
  return (
    <section id="problem" className="mx-auto max-w-7xl scroll-mt-10 px-4 py-24 sm:px-8 sm:py-36">
      <div data-reveal>
        <SectionLabel index="01">The problem</SectionLabel>
        <h2 className="display mt-8 max-w-4xl text-[2.6rem] sm:text-6xl">
          Where today&apos;s AI gets it <em>wrong.</em>
        </h2>
        <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-paper/60">
          Most of the world gets worse answers than English speakers, and nobody is keeping score.
        </p>
      </div>

      <ol data-reveal className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
        {points.map((p, i) => (
          <li key={p.title} className="bg-ink p-7 sm:p-9">
            <span className="font-serif text-2xl italic text-paper/40">0{i + 1}</span>
            <h3 className="mt-10 text-lg font-medium">{p.title}</h3>
            <p className="mt-3 text-[14px] leading-relaxed text-paper/55">{p.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
