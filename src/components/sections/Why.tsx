import { SectionLabel } from "../ui";

const reasons = [
  {
    stat: "48h",
    title: "Fast, reliable pay",
    body: "Paid to your local bank account within 48 hours of your work being accepted. Pay rates published openly.",
  },
  {
    stat: "∞",
    title: "Royalties, not one-off pay",
    body: "When a dataset you helped make is licensed again, you earn again.",
  },
  {
    stat: "1:1",
    title: "Consent on every item",
    body: "Every item records who made it, when, and what they agreed to. Clean data for AI teams, fair terms for contributors.",
  },
  {
    stat: "Local",
    title: "Local experts, verified",
    body: "A campus network of verified students, graduates and professionals, in every field and language we cover.",
  },
];

export function Why() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-8 sm:py-32">
      <div data-reveal>
        <SectionLabel index="05">Why Paraval</SectionLabel>
        <h2 className="display mt-8 max-w-3xl text-[2.6rem] sm:text-6xl">
          Built on <em>trust,</em> both ways.
        </h2>
      </div>
      <div data-reveal className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map((r) => (
          <div key={r.title} className="bg-ink p-7 sm:p-8">
            <p className="display text-5xl text-paper">{r.stat}</p>
            <h3 className="mt-10 text-[15px] font-medium">{r.title}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-paper/55">{r.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
