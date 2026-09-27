import { SectionLabel } from "../ui";

const reasons = [
  {
    title: "Human data is AI's fastest-growing supply chain.",
    body: "The companies that supply human data to AI labs are now valued in the tens of billions of dollars. None of them is built for the majority of the world.",
  },
  {
    title: "The next billion users are here.",
    body: "AI's growth now comes from Africa, South Asia and Southeast Asia, exactly where today's models still fail on language, culture and local systems.",
  },
  {
    title: "Consent is becoming non-negotiable.",
    body: "Copyright and data-protection pressure is making scraped data risky. Data with a clean consent trail is worth more every year.",
  },
  {
    title: "Built lean, from day one.",
    body: "Modern tools let a small team build infrastructure that once needed hundreds of people. We spend on contributors, not overhead.",
  },
];

export function WhyNow() {
  return (
    <section id="why-now" className="mx-auto max-w-7xl scroll-mt-10 px-4 py-24 sm:px-8 sm:py-32">
      <div data-reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <SectionLabel index="09">Why now</SectionLabel>
          <h2 className="display mt-8 max-w-3xl text-[2.6rem] sm:text-6xl">
            The window is <em>open.</em>
          </h2>
        </div>
        <p className="max-w-sm text-[14px] leading-relaxed text-paper/55">
          Four shifts are happening at once. Together, they make this the moment to build the human data layer for the rest of the world.
        </p>
      </div>

      <ol className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
        {reasons.map((r, i) => (
          <li key={r.title} data-reveal className="group bg-ink p-7 transition-colors duration-500 hover:bg-[#0b0b0b] sm:p-10">
            <span className="font-mono text-[11px] text-paper/40">0{i + 1}</span>
            <h3 className="display mt-8 max-w-md text-[1.9rem] leading-[1.1] sm:text-4xl">{r.title}</h3>
            <p className="mt-4 max-w-md text-[14px] leading-relaxed text-paper/55">{r.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
