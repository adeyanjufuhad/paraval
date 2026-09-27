import { HeroCanvas } from "../hero/HeroCanvas";
import { GhostLink, PrimaryLink } from "../ui";

export function Hero() {
  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      {/* Fallback light while the 3D scene loads (or if WebGL is unavailable) */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-[radial-gradient(60%_55%_at_50%_85%,rgba(255,255,255,0.09),transparent_70%)]"
      />
      <div className="absolute inset-0 -z-10">
        <HeroCanvas />
      </div>
      {/* Fade into the page below */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-ink" />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pt-32 sm:px-8 sm:pt-40">
        <div className="mx-auto max-w-4xl text-center">
          <p className="eyebrow mb-6">Human data &amp; evaluation for global AI</p>
          <h1 className="display text-[3.1rem] sm:text-7xl lg:text-[6.5rem]">
            AI that <em>sees</em> the
            <br />
            whole <em>world.</em>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-paper/65 sm:text-base">
            We pay real people to test and teach AI in their own languages and contexts, starting with Nigeria.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PrimaryLink href="#contribute">Join as a contributor</PrimaryLink>
            <GhostLink href="#work-with-us">Work with us</GhostLink>
          </div>
        </div>

        <div className="mt-auto flex items-end justify-between gap-6 pb-8 pt-16 text-[12px] text-paper/55">
          <a href="#problem" className="hidden items-center gap-2 transition-colors hover:text-paper sm:flex">
            <span className="h-px w-6 bg-white/30" />
            Scroll down
          </a>
          <p className="ml-auto max-w-[17rem] text-right leading-relaxed">
            Starting with Yoruba, Hausa, Igbo and Pidgin. Paid within 48 hours. Consent on every item.
          </p>
        </div>
      </div>
    </section>
  );
}
