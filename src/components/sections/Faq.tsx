import { SectionLabel } from "../ui";

const faqs = [
  {
    q: "Is it free to join?",
    a: "Yes. Joining Paraval is free, and it always will be. You never pay to work with us.",
  },
  {
    q: "How do I get paid?",
    a: "Straight to your local bank account, within 48 hours of your work being accepted. When a dataset you helped make is licensed again, you also earn a royalty. We're starting with Nigerian banks and will add more countries as we grow.",
  },
  {
    q: "When does paid work start?",
    a: "We're building the Paraval Benchmark first with our founding contributors. People on the waitlist get first access to paid tasks as projects open, starting with those whose languages and fields match.",
  },
  {
    q: "Do I have to be a student?",
    a: "No. Students are where we're starting, but graduates and professionals are very welcome, especially in medicine, law, engineering, agriculture and finance.",
  },
  {
    q: "What data do you collect?",
    a: "For the waitlist, only what you type into the form. When paid work starts, we'll also verify your identity and bank account so we can pay you, and nothing more. The work you create is delivered to customers with your name and personal details removed.",
  },
  {
    q: "Who uses the data?",
    a: "AI companies, research groups and organizations building AI that works for everyone. Every item carries a record of your consent, and we never sell data for surveillance, scams or other harmful uses.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="mx-auto max-w-7xl scroll-mt-10 px-4 py-24 sm:px-8 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div data-reveal>
          <SectionLabel index="07">FAQ</SectionLabel>
          <h2 className="display mt-8 text-[2.6rem] sm:text-6xl">
            Questions, <em>answered.</em>
          </h2>
        </div>
        <div data-reveal className="border-t border-line">
          {faqs.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-[16px] transition-colors hover:text-white sm:text-lg">
                {f.q}
                <span className="relative h-3 w-3 shrink-0" aria-hidden>
                  <span className="absolute left-0 top-1/2 h-px w-3 bg-paper/70" />
                  <span className="absolute left-1/2 top-0 h-3 w-px bg-paper/70 transition-transform duration-300 group-open:rotate-90 group-open:opacity-0" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-paper/60">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
