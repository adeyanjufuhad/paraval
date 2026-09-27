"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";

// Three.js loads after the page is interactive, so text and forms never wait on it.
const OrbitScene = dynamic(() => import("./OrbitScene"), { ssr: false });

export function HeroCanvas() {
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  return (
    <div
      aria-hidden
      className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${ready ? "opacity-100" : "opacity-0"}`}
    >
      <OrbitScene onReady={onReady} />
    </div>
  );
}
