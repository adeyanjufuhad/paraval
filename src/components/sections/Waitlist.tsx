"use client";

import { useEffect, useState } from "react";
import { CompanyForm } from "../forms/CompanyForm";
import { ContributorForm } from "../forms/ContributorForm";
import GravityStars from "../ui/gravity-stars";
import { SectionLabel } from "../ui";

type Tab = "contributor" | "company";

const hashToTab: Record<string, Tab> = {
  "#contribute": "contributor",
  "#work-with-us": "company",
};

export function Waitlist() {
  const [tab, setTab] = useState<Tab>("contributor");

  // Hero and "How it works" buttons link to #contribute / #work-with-us
  useEffect(() => {
    const sync = () => {
      const t = hashToTab[window.location.hash];
      if (t) setTab(t);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  return (
    <GravityStars count={110} connectDistance={100} tint={0.1} glow={4} starSize={1.2} gravity={0.6} speed={0.5}>
    <section id="join" className="relative mx-auto max-w-7xl scroll-mt-6 px-4 py-24 sm:px-8 sm:py-32">
      {/* Anchor targets for the two entry points */}
      <span id="contribute" className="absolute top-0" aria-hidden />
      <span id="work-with-us" className="absolute top-0" aria-hidden />

      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div data-reveal>
          <SectionLabel index="06">Join the waitlist</SectionLabel>
          <h2 className="display mt-8 text-[2.8rem] sm:text-6xl lg:text-7xl">
            Be among <em>the first.</em>
          </h2>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-paper/60">
            {tab === "contributor"
              ? "Founding contributors get first access to paid tasks, credit on the Paraval Benchmark and a say in how we build."
              : "Tell us what you're building. We'll show you how your model performs in Nigerian languages and everyday contexts, and what it would take to fix it."}
          </p>
        </div>

        <div data-reveal className="spotlight rounded-3xl border border-line bg-ink/80 p-5 backdrop-blur-sm sm:p-8">
          <div role="tablist" aria-label="Who are you?" className="mb-8 grid grid-cols-2 gap-1 rounded-full border border-line bg-ink p-1">
            {(
              [
                ["contributor", "I want to contribute"],
                ["company", "I'm an AI team"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                role="tab"
                id={`tab-${value}`}
                aria-selected={tab === value}
                aria-controls={`panel-${value}`}
                onClick={() => setTab(value)}
                className={`rounded-full px-3 py-2.5 text-[13px] transition-colors duration-300 ${
                  tab === value ? "bg-paper text-ink" : "text-paper/60 hover:text-paper"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div role="tabpanel" id="panel-contributor" aria-labelledby="tab-contributor" hidden={tab !== "contributor"}>
            <ContributorForm />
          </div>
          <div role="tabpanel" id="panel-company" aria-labelledby="tab-company" hidden={tab !== "company"}>
            <CompanyForm />
          </div>
        </div>
      </div>
    </section>
    </GravityStars>
  );
}
