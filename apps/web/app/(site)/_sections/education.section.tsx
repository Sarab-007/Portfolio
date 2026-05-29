"use client";

import { useRef } from "react";
import { GraduationCap, Sparkles } from "lucide-react";
import { navConfig } from "@/src/config/navigation";
import { siteConfig } from "@/src/config/site";
import { registerGsap, useGSAP } from "@/src/lib/gsap";
import { usePrefersReducedMotion } from "@/src/hooks/use-prefers-reduced-motion";

export default function EducationSection() {
  const rootRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      const { gsap } = registerGsap();

      const ctx = gsap.context(() => {
        gsap.from(".education-reveal", {
          y: 30,
          autoAlpha: 0,
          duration: 0.72,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 74%",
          },
        });
      }, rootRef);

      return () => ctx.revert();
    },
    { dependencies: [prefersReducedMotion], scope: rootRef },
  );

  return (
    <section
      id={navConfig.sections.education.id}
      ref={rootRef}
      className="section-frame relative overflow-hidden py-24"
      aria-labelledby="education-title"
    >
      <div className="section-shell">
        <div className="grid gap-5 rounded-lg border border-white/10 bg-white/[0.035] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.16)] md:grid-cols-[0.78fr_1.22fr] md:p-8">
          <div>
            <p className="education-reveal scene-label">education</p>
            <h2
              id="education-title"
              className="education-reveal mt-6 text-4xl font-semibold leading-tight text-white md:text-5xl"
            >
              Formal foundation, practical obsession.
            </h2>
          </div>

          <div className="grid gap-5">
            {siteConfig.education.map((item) => (
              <article key={item.degree} className="education-reveal">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-white/10 bg-black text-[rgb(var(--accent))]">
                      <GraduationCap className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-2xl font-semibold text-white">
                        {item.degree}
                      </h3>
                      <p className="mt-2 text-sm text-white/[0.58]">
                        {item.institution} | {item.location}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-[rgb(var(--accent))]">
                    {item.period}
                  </span>
                </div>

                <ul className="mt-6 grid gap-3">
                  {item.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm leading-6 text-white/[0.64]"
                    >
                      <Sparkles
                        className="mt-0.5 h-4 w-4 shrink-0 text-[rgb(var(--cyan))]"
                        aria-hidden="true"
                      />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
