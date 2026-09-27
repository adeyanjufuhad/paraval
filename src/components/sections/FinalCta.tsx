import { LogoMark } from "../Logo";
import { GhostLink, PrimaryLink } from "../ui";

export function FinalCta() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
      <div data-reveal className="relative overflow-hidden rounded-[2rem] border border-line px-6 py-20 text-center sm:py-28">
        {/* Horizon glow and orbit, echoing the hero */}
        <div aria-hidden className="absolute inset-x-0 -bottom-1/2 h-full bg-[radial-gradient(50%_50%_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
        <svg aria-hidden viewBox="0 0 1200 400" className="absolute inset-x-0 bottom-0 w-full text-paper" preserveAspectRatio="none">
          <ellipse cx="600" cy="470" rx="640" ry="190" fill="none" stroke="currentColor" strokeOpacity="0.25" />
          <ellipse cx="600" cy="470" rx="520" ry="150" fill="none" stroke="currentColor" strokeOpacity="0.1" />
        </svg>

        <div className="relative">
          <LogoMark className="mx-auto h-10 w-10 text-paper" />
          <h2 className="display mx-auto mt-10 max-w-4xl text-[2.8rem] sm:text-7xl lg:text-[5.5rem]">
            Every language.
            <br />
            <em>Every viewpoint.</em>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-paper/60">
            Help build the AI the rest of the world deserves, and get paid for what only you know.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <PrimaryLink href="#contribute">Join as a contributor</PrimaryLink>
            <GhostLink href="#work-with-us">Work with us</GhostLink>
          </div>
        </div>
      </div>
    </section>
  );
}
