"use client";

import { useRef } from "react";
import { BriefcaseBusiness, CheckCircle2 } from "lucide-react";
import { navConfig } from "@/src/config/navigation";
import { siteConfig } from "@/src/config/site";
import { registerGsap, useGSAP } from "@/src/lib/gsap";
import { usePrefersReducedMotion } from "@/src/hooks/use-prefers-reduced-motion";

export default function ExperienceSection() {
  const rootRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      const { gsap } = registerGsap();

      const ctx = gsap.context(() => {
        gsap.from(".experience-heading", {
          y: 28,
          autoAlpha: 0,
          duration: 0.72,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 72%",
          },
        });

        gsap.from(".timeline-line", {
          scaleY: 0,
          transformOrigin: "top center",
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".experience-list",
            start: "top 74%",
          },
        });

        gsap.from(".experience-item", {
          x: -32,
          autoAlpha: 0,
          duration: 0.76,
          stagger: 0.14,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".experience-list",
            start: "top 70%",
          },
        });
      }, rootRef);

      return () => ctx.revert();
    },
    { dependencies: [prefersReducedMotion], scope: rootRef },
  );

  return (
    <section
      id={navConfig.sections.experience.id}
      ref={rootRef}
      className="section-frame relative py-28 md:py-36"
      aria-labelledby="experience-title"
    >
      <div className="section-shell grid gap-12 lg:grid-cols-[0.78fr_1.22fr]">
        <div>
          <p className="experience-heading scene-label">career timeline</p>
          <h2
            id="experience-title"
            className="experience-heading mt-6 text-balance text-4xl font-semibold leading-tight text-white md:text-6xl"
          >
            Years of turning requirements into reliable shipped software.
          </h2>
          <p className="experience-heading mt-6 max-w-md text-sm leading-7 text-[rgb(var(--muted))]">
            The common thread is operational software: dashboards, workflows,
            integrations, and interfaces that real teams rely on every day.
          </p>
        </div>

        <div className="experience-list relative">
          <div className="timeline-line absolute bottom-0 left-5 top-0 w-px bg-gradient-to-b from-[rgb(var(--accent))] via-white/20 to-transparent" />

          <div className="grid gap-5">
            {siteConfig.experience.map((item) => (
              <article
                key={`${item.company}-${item.title}`}
                className="experience-item relative pl-14"
              >
                <div className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-black text-[rgb(var(--accent))]">
                  <BriefcaseBusiness className="h-5 w-5" aria-hidden="true" />
                </div>
                <div className="rounded-lg border border-white/10 bg-white/[0.035] p-5 transition-[background-color,border-color,transform] duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.055]">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-white/[0.58]">
                        {item.company} | {item.location}
                      </p>
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
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-[rgb(var(--emerald))]"
                          aria-hidden="true"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
