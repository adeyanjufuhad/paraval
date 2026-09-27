import { SectionLabel } from "../ui";

const pillars = [
  {
    for: "For AI companies",
    title: "Measure it. Fix it.",
    body: "Scored evaluations that show exactly where your model fails in a language or market, and consented, verified data to fix it.",
  },
  {
    for: "For contributors",
    title: "Earn from what you know.",
    body: "Your language, your field and your everyday knowledge are valuable. Get paid within 48 hours, and earn royalties when your work is reused.",
  },
  {
    for: "For the world",
    title: "AI that works for everyone.",
    body: "When models truly understand Yoruba, Hausa, Igbo and Pidgin, hundreds of millions more people get answers that actually help them.",
  },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-7xl scroll-mt-10 px-4 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div data-reveal>
          <SectionLabel index="01">What we do</SectionLabel>
          <h2 className="display mt-8 text-[2.8rem] sm:text-6xl lg:text-7xl">
            The human layer for <em>global</em> AI.
          </h2>
        </div>
        <div data-reveal className="lg:pt-16">
          <p className="text-xl leading-relaxed text-paper/85 sm:text-2xl sm:leading-relaxed">
            Paraval is a data and evaluation company. We recruit, verify and pay native speakers and domain experts to test AI models and create the training data
            they&apos;re missing.
          </p>
          <p className="mt-6 text-[15px] leading-relaxed text-paper/55">
            We start with Nigeria&apos;s languages and everyday life, where today&apos;s models are weakest and the next generation of users is growing fastest.
            Then we go everywhere else AI can&apos;t yet see.
          </p>
        </div>
      </div>

      <div className="mt-20 grid gap-5 md:grid-cols-3">
        {pillars.map((p, i) => (
          <div
            key={p.for}
            data-reveal
            style={{ transitionDelay: `${i * 110}ms` }}
            className="spotlight flex flex-col rounded-3xl border border-line bg-gradient-to-b from-white/[0.05] to-transparent p-7 sm:p-9"
          >
            <p className="eyebrow">{p.for}</p>
            <h3 className="display mt-14 text-3xl sm:text-4xl">{p.title}</h3>
            <p className="mt-4 text-[14px] leading-relaxed text-paper/55">{p.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
