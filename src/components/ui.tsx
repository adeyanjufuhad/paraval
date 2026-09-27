import type { ComponentProps, ReactNode } from "react";

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" aria-hidden>
      <path d="M4 12 12 4M5.5 4H12v6.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-full text-[13px] font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-paper disabled:opacity-50";

export function PrimaryLink({ children, className = "", ...props }: ComponentProps<"a">) {
  return (
    <a {...props} className={`${base} bg-paper py-1.5 pl-5 pr-1.5 text-ink hover:bg-white ${className}`}>
      {children}
      <span className="grid h-7 w-7 place-items-center rounded-full bg-ink text-paper transition-transform duration-300 group-hover:rotate-45">
        <Arrow />
      </span>
    </a>
  );
}

export function GhostLink({ children, className = "", ...props }: ComponentProps<"a">) {
  return (
    <a
      {...props}
      className={`${base} border border-white/10 bg-white/[0.06] px-5 py-2.5 text-paper backdrop-blur-md hover:border-white/25 hover:bg-white/10 ${className}`}
    >
      {children}
    </a>
  );
}

export function SubmitButton({ children, pending }: { children: ReactNode; pending: boolean }) {
  return (
    <button type="submit" disabled={pending} className={`${base} w-full bg-paper py-1.5 pl-5 pr-1.5 text-ink hover:bg-white sm:w-auto`}>
      <span className="flex-1 text-left sm:flex-none">{pending ? "Sending…" : children}</span>
      <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-paper transition-transform duration-300 group-hover:rotate-45">
        {pending ? <span className="h-3 w-3 animate-spin rounded-full border border-paper border-t-transparent" /> : <Arrow />}
      </span>
    </button>
  );
}

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="eyebrow flex items-center gap-3">
      <span className="text-paper/70">({index})</span>
      <span className="h-px w-8 bg-white/20" />
      {children}
    </p>
  );
}
