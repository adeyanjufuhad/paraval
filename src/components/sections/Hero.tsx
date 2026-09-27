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
      <div className="absolute inset-0 -z-10 will-change-transform" style={{ transform: "translate3d(0, calc(var(--sy, 0) * 0.3px), 0)" }}>
        <HeroCanvas />
      </div>
      {/* Fade into the page below */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-ink" />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 pt-32 sm:px-8 sm:pt-40">
        <div
          className="mx-auto max-w-4xl text-center will-change-transform"
          style={{
            transform: "translate3d(0, calc(var(--sy, 0) * -0.18px), 0)",
            opacity: "max(0, calc(1 - var(--sy, 0) / 700))",
            filter: "blur(calc(var(--sy, 0) * 0.012px))",
          }}
        >
          <a
            href="#benchmark"
            className="group mb-8 inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[0.04] py-1.5 pl-1.5 pr-4 text-[12px] text-paper/75 backdrop-blur-md transition-colors hover:border-white/25 hover:text-paper"
          >
            <span className="rounded-full bg-paper px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-ink">Soon</span>
            <span className="sm:hidden">The Paraval Benchmark</span>
            <span className="hidden sm:inline">The Paraval Benchmark: how well does AI understand Nigeria?</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
          </a>
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
