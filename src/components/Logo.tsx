// The parallax mark: two points on Earth's orbit sight the same star.
// The two sight lines form a chevron that echoes the A in the wordmark.
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <ellipse cx="16" cy="24" rx="12" ry="3.6" stroke="currentColor" strokeOpacity="0.45" strokeWidth="1" />
      <path d="M8.5 25.6 16 5.5l7.5 20.1" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="8.5" cy="25.6" r="1.4" fill="currentColor" />
      <circle cx="23.5" cy="25.6" r="1.4" fill="currentColor" />
      <circle cx="16" cy="5" r="2.1" fill="currentColor" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-7 w-7" />
      <span className="text-[13px] font-medium tracking-[0.32em]">PARAVAL</span>
    </span>
  );
}
