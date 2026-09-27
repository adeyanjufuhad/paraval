"use client";

import { useState } from "react";
import { SectionLabel } from "../ui";

type Score = [label: string, model: number, human: number];

// Illustrative examples of the failures Paraval measures, not real model transcripts.
const examples: {
  tab: string;
  language: string;
  topic: string;
  prompt: string;
  promptEn?: string;
  model: string;
  misses: string[];
  human: string;
  humanEn?: string;
  scores: Score[];
}[] = [
  {
    tab: "Pidgin",
    language: "Nigerian Pidgin",
    topic: "Everyday life · Electricity",
    prompt: "Abeg, dem don dey give me crazy estimated bill for light. Wetin I fit do?",
    promptEn: "Please, they keep giving me a huge estimated electricity bill. What can I do?",
    model:
      "It sounds like you're asking about an estimate for lighting. Costs depend on the number of bulbs and fixtures in your home. Consider switching to LED bulbs to save money.",
    misses: ["Read “light” as light bulbs, not electricity supply", "Missed estimated billing, a common complaint", "No local next steps"],
    human:
      "“Light” na electricity. Go your DisCo office, write complain about the estimated bill, and ask for meter. If dem no settle am, carry the matter go NERC customer complaints forum.",
    humanEn:
      "“Light” means electricity. Complain to your distribution company in writing and ask for a meter. If they don't resolve it, escalate to the NERC customer complaints forum.",
    scores: [
      ["Accuracy", 1, 5],
      ["Local context", 1, 5],
      ["Language", 2, 5],
    ],
  },
  {
    tab: "Yoruba",
    language: "Yoruba",
    topic: "Culture · Proverbs",
    prompt: "Kí ni ìtumọ̀ òwe yìí: “Àgbà kì í wà lọ́jà kí orí ọmọ tuntun wọ́”?",
    promptEn: "What does this proverb mean: “An elder is not in the market while a newborn's head tilts”?",
    model:
      "Translation: “An adult does not stay in the market and a new child's head is crooked.” This may refer to caring for babies in busy markets.",
    misses: ["Literal translation, meaning lost", "Replied in English, not Yoruba", "No cultural explanation"],
    human: "Òwe yìí túmọ̀ sí pé níbi tí àgbà bá wà, kò yẹ kí nǹkan bàjẹ́.",
    humanEn:
      "Where an elder is present, things should not go wrong. It's about responsibility: people with experience are expected to step in and set things right.",
    scores: [
      ["Accuracy", 1, 5],
      ["Local context", 1, 5],
      ["Language", 1, 5],
    ],
  },
  {
    tab: "Nigerian English",
    language: "English (Nigeria)",
    topic: "Finance · Cash",
    prompt: "How much should a POS agent charge me to withdraw ₦10,000?",
    model: "POS withdrawals are free at most terminals. Any fees would be set by your bank and are usually very small.",
    misses: ["Wrong: agents add their own charge", "No local price range", "Advice a local would never give"],
    human:
      "POS agents add their own service charge on top of any bank fee. For ₦10,000, many charge somewhere around ₦100 to ₦300, often more in rural areas or late at night. Agree on the charge before you pay.",
    scores: [
      ["Accuracy", 1, 5],
      ["Local context", 1, 5],
      ["Language", 4, 5],
    ],
  },
];

function Bars({ scores }: { scores: Score[] }) {
  return (
    <div className="space-y-3">
      {scores.map(([label, model, human]) => (
        <div key={label} className="grid grid-cols-[6.5rem_1fr] items-center gap-3 text-[12px]">
          <span className="text-paper/50">{label}</span>
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                <div className="h-full rounded-full bg-paper/30 transition-[width] duration-700" style={{ width: `${model * 20}%` }} />
              </div>
              <span className="w-7 text-right tabular-nums text-paper/40">{model}/5</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                <div className="h-full rounded-full bg-paper transition-[width] duration-700" style={{ width: `${human * 20}%` }} />
              </div>
              <span className="w-7 text-right tabular-nums text-paper">{human}/5</span>
            </div>
          </div>
        </div>
      ))}
      <div className="flex gap-5 pt-2 text-[11px] text-paper/45">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-4 rounded-full bg-paper/30" /> Typical model
        </span>
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-4 rounded-full bg-paper" /> Native speaker
        </span>
      </div>
    </div>
  );
}

export function Examples() {
  const [active, setActive] = useState(0);
  const ex = examples[active];

  return (
    <section id="examples" className="mx-auto max-w-7xl scroll-mt-10 px-4 py-24 sm:px-8 sm:py-32">
      <div data-reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
        <div>
          <SectionLabel index="03">See it for yourself</SectionLabel>
          <h2 className="display mt-8 max-w-3xl text-[2.6rem] sm:text-6xl">
            Same question. <em>Different</em> world.
          </h2>
        </div>
        <div role="tablist" aria-label="Examples" className="flex flex-wrap gap-2">
          {examples.map((e, i) => (
            <button
              key={e.tab}
              role="tab"
              type="button"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              className={`rounded-full border px-4 py-2 text-[13px] transition-colors ${
                active === i ? "border-paper bg-paper text-ink" : "border-white/12 text-paper/65 hover:border-white/30 hover:text-paper"
              }`}
            >
              {e.tab}
            </button>
          ))}
        </div>
      </div>

      <div data-reveal key={ex.tab} className="mt-12 overflow-hidden rounded-3xl border border-line">
        {/* The prompt */}
        <div className="border-b border-line bg-white/[0.03] p-6 sm:p-9">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] uppercase tracking-[0.18em] text-paper/45">
            <span className="text-paper/80">{ex.language}</span>
            <span>{ex.topic}</span>
          </div>
          <p className="display mt-5 text-3xl leading-tight sm:text-[2.6rem]">&ldquo;{ex.prompt}&rdquo;</p>
          {ex.promptEn && <p className="mt-3 text-[14px] text-paper/45">{ex.promptEn}</p>}
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr_0.8fr]">
          {/* A typical model answer */}
          <div className="border-b border-line p-6 sm:p-9 lg:border-b-0 lg:border-r">
            <p className="eyebrow">Typical model answer</p>
            <p className="mt-5 text-[15px] leading-relaxed text-paper/50 line-through decoration-white/20">{ex.model}</p>
            <ul className="mt-6 space-y-2">
              {ex.misses.map((m) => (
                <li key={m} className="flex gap-3 text-[13px] text-paper/60">
                  <span aria-hidden className="mt-[0.45rem] h-px w-3 shrink-0 bg-paper/50" />
                  {m}
                </li>
              ))}
            </ul>
          </div>

          {/* What a native speaker says */}
          <div className="border-b border-line p-6 sm:p-9 lg:border-b-0 lg:border-r">
            <p className="eyebrow flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-paper" /> Native speaker, reviewed
            </p>
            <p className="mt-5 text-[15px] leading-relaxed text-paper">{ex.human}</p>
            {ex.humanEn && <p className="mt-4 text-[13px] leading-relaxed text-paper/50">{ex.humanEn}</p>}
          </div>

          {/* The score */}
          <div className="p-6 sm:p-9">
            <p className="eyebrow mb-6">Paraval score</p>
            <Bars scores={ex.scores} />
          </div>
        </div>
      </div>
      <p className="mt-4 text-[11px] text-paper/30">
        Illustrative examples of the errors Paraval measures. Real, graded results will be published in the Paraval Benchmark.
      </p>
    </section>
  );
}
