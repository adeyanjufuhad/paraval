"use client";

import { useActionState } from "react";
import { joinBenchmarkUpdates, type FormState } from "@/app/actions";
import { Honeypot, keepInputOnSubmit } from "../forms/fields";
import { SectionLabel } from "../ui";

const models = ["GPT", "Claude", "Gemini", "Llama", "Mistral", "DeepSeek"];
const langs = ["Yoruba", "Hausa", "Igbo", "Pidgin", "Everyday life"];

// Orbit lines drawn behind the card, echoing the parallax mark
function Orbits() {
  return (
    <svg viewBox="0 0 800 800" className="pointer-events-none absolute -right-40 -top-40 h-[42rem] w-[42rem] text-paper opacity-[0.14] sm:-right-24" aria-hidden>
      {[380, 300, 220, 140].map((r, i) => (
        <ellipse key={r} cx="400" cy="400" rx={r} ry={r * 0.42} fill="none" stroke="currentColor" strokeWidth="1" transform={`rotate(${-18 + i * 6} 400 400)`} />
      ))}
      <circle cx="400" cy="400" r="3" fill="currentColor" />
      <circle cx="712" cy="332" r="2.5" fill="currentColor" />
      <circle cx="170" cy="470" r="2" fill="currentColor" />
    </svg>
  );
}

export function Benchmark() {
  const [state, action, pending] = useActionState<FormState, FormData>(joinBenchmarkUpdates, { status: "idle" });

  return (
    <section id="benchmark" className="mx-auto max-w-7xl scroll-mt-10 px-4 py-12 sm:px-8 sm:py-16">
      <div data-reveal className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-white/[0.07] via-white/[0.02] to-transparent p-7 sm:p-14">
        <Orbits />
        <div className="relative max-w-2xl">
          <SectionLabel index="04">The Paraval Benchmark · Coming soon</SectionLabel>
          <h2 className="display mt-8 text-[2.5rem] sm:text-6xl">
            How well do today&apos;s top AI models understand <em>Nigeria?</em>
          </h2>
          <p className="mt-6 max-w-lg text-[15px] leading-relaxed text-paper/60">
            An open test and leaderboard of leading models on Nigerian languages and everyday life, written and checked by native speakers.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-paper/45">
            <span className="text-paper/70">Models</span>
            {models.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-paper/45">
            <span className="text-paper/70">Tested on</span>
            {langs.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </div>

          {state.status === "success" ? (
            <p role="status" className="mt-10 text-[15px] text-paper">
              {state.already ? "You're already on the list." : "Done. You'll get the results before anyone else."}
            </p>
          ) : (
            <form onSubmit={keepInputOnSubmit(action)} noValidate className="relative mt-10 flex max-w-md flex-col gap-2 sm:flex-row sm:rounded-full sm:border sm:border-white/12 sm:bg-ink/60 sm:p-1.5 sm:backdrop-blur">
              <Honeypot />
              <label htmlFor="bench-email" className="sr-only">
                Email
              </label>
              <input
                id="bench-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                inputMode="email"
                placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-full border border-white/12 bg-ink/60 px-5 py-3 text-[15px] outline-none placeholder:text-paper/30 focus:border-white/40 sm:border-0 sm:bg-transparent sm:py-2"
              />
              <button
                type="submit"
                disabled={pending}
                className="rounded-full bg-paper px-5 py-3 text-[13px] font-medium text-ink transition-colors hover:bg-white disabled:opacity-60 sm:py-2.5"
              >
                {pending ? "Sending…" : "Get the results first"}
              </button>
              {state.status === "error" && (
                <p role="alert" className="text-[13px] text-red-300/90 sm:absolute sm:-bottom-7 sm:left-5">
                  {state.message}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
