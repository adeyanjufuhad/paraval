import { Logo } from "./Logo";

const links = [
  { href: "#about", label: "About" },
  { href: "#how", label: "How it works" },
  { href: "#offer", label: "For AI teams" },
  { href: "#benchmark", label: "Benchmark" },
  { href: "#vision", label: "Vision" },
];

export function Nav() {
  return (
    <header className="absolute inset-x-0 top-0 z-30">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-8">
        <a href="#top" aria-label="Paraval home" className="text-paper">
          <Logo />
        </a>
        <ul className="hidden items-center gap-8 text-[13px] text-paper/70 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="transition-colors hover:text-paper">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#join"
          className="rounded-full bg-paper px-4 py-2 text-[12px] font-medium text-ink transition-colors hover:bg-white"
        >
          Join waitlist
        </a>
      </nav>
    </header>
  );
}
