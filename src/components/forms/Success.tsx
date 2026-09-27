"use client";

import { useEffect, useRef } from "react";
import type { FormState } from "@/app/actions";
import { LogoMark } from "../Logo";

export function Success({
  firstName,
  already,
  body,
  shareText,
}: {
  firstName: string;
  already: boolean;
  body: string;
  shareText?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => ref.current?.focus(), []);
  const share = shareText
    ? `https://wa.me/?text=${encodeURIComponent(`${shareText} ${window.location.origin}`)}`
    : null;

  return (
    <div ref={ref} tabIndex={-1} role="status" className="flex flex-col items-center py-10 text-center outline-none">
      <LogoMark className="h-12 w-12 text-paper" />
      <h3 className="display mt-8 text-4xl sm:text-5xl">
        {already ? "You're already " : "You're on "}
        <em>{already ? "on the list." : "the list."}</em>
      </h3>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-paper/60">
        {firstName ? `Thanks, ${firstName}. ` : ""}
        {already ? "We already have your details and will be in touch soon." : body}
      </p>
      {share && (
        <a
          href={share}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 rounded-full border border-white/15 px-5 py-2.5 text-[13px] text-paper/85 transition-colors hover:border-white/40 hover:text-paper"
        >
          Share with a friend on WhatsApp
        </a>
      )}
    </div>
  );
}

export function FormNotice({ state }: { state: FormState }) {
  if (state.status !== "error") return null;
  return (
    <p role="alert" className="text-[13px] text-red-300/90 sm:col-span-2">
      {state.message}
    </p>
  );
}
