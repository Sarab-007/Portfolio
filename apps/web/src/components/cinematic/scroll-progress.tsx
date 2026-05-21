"use client";

import { useRef } from "react";
import { registerGsap, useGSAP } from "@/src/lib/gsap";
import { usePrefersReducedMotion } from "@/src/hooks/use-prefers-reduced-motion";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion || !barRef.current) return;

      const { gsap, ScrollTrigger } = registerGsap();

      gsap.set(barRef.current, { scaleY: 0, transformOrigin: "top center" });
      const tween = gsap.to(barRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.18,
        },
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
        ScrollTrigger.refresh();
      };
    },
    { dependencies: [prefersReducedMotion] },
  );

  return (
    <div
      className="pointer-events-none fixed left-4 top-1/2 z-50 hidden h-36 w-px -translate-y-1/2 overflow-hidden bg-white/10 lg:block"
      aria-hidden="true"
    >
      <div ref={barRef} className="h-full w-full bg-[rgb(var(--accent))]" />
    </div>
  );
}
