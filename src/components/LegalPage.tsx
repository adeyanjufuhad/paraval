import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "./Logo";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-8 sm:py-14">
      <Link href="/" aria-label="Paraval home" className="text-paper">
        <Logo />
      </Link>
      <h1 className="display mt-16 text-5xl sm:text-6xl">{title}</h1>
      <p className="mt-4 text-[13px] text-paper/45">Last updated {updated}</p>
      <div className="mt-12 space-y-5 text-[15px] leading-relaxed text-paper/70 [&_a]:underline [&_a]:underline-offset-2 [&_h2]:pt-6 [&_h2]:text-lg [&_h2]:font-medium [&_h2]:text-paper [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-2">
        {children}
      </div>
      <Link href="/" className="mt-16 inline-block text-[13px] text-paper/60 hover:text-paper">
        ← Back to Paraval
      </Link>
    </div>
  );
}
