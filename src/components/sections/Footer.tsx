import { site } from "@/lib/site";
import { Logo } from "../Logo";

export function Footer() {
  const socials = site.socials.filter((s) => s.href);
  return (
    <footer className="relative mt-12 overflow-hidden border-t border-line">
      <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-8">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div>
            <Logo className="text-paper" />
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed text-paper/50">
              Every language. Every viewpoint. The human layer for global AI, starting in Nigeria.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-[13px] sm:grid-cols-3">
            <div className="space-y-3">
              <p className="eyebrow">Paraval</p>
              <a href="#how" className="block text-paper/70 hover:text-paper">How it works</a>
              <a href="#benchmark" className="block text-paper/70 hover:text-paper">Benchmark</a>
              <a href="#join" className="block text-paper/70 hover:text-paper">Join the waitlist</a>
            </div>
            <div className="space-y-3">
              <p className="eyebrow">Legal</p>
              <a href="/privacy" className="block text-paper/70 hover:text-paper">Privacy policy</a>
              <a href="/terms" className="block text-paper/70 hover:text-paper">Terms</a>
            </div>
            {(site.contactEmail || socials.length > 0) && (
              <div className="space-y-3">
                <p className="eyebrow">Contact</p>
                {site.contactEmail && (
                  <a href={`mailto:${site.contactEmail}`} className="block text-paper/70 hover:text-paper">
                    {site.contactEmail}
                  </a>
                )}
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="block text-paper/70 hover:text-paper">
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Oversized wordmark, like the horizon under the orbit */}
        <p aria-hidden className="display pointer-events-none mt-16 select-none text-center text-[22vw] leading-[0.8] text-paper/[0.05] md:text-[17vw]">
          Paraval
        </p>

        <div className="mt-8 flex flex-col justify-between gap-2 border-t border-line pt-6 text-[12px] text-paper/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Paraval. Built in Nigeria.</p>
          <p>Measured from every angle.</p>
        </div>
      </div>
    </footer>
  );
}
