"use client";

import { useMemo, useRef } from "react";
import { Cpu, Database, Hammer, Languages } from "lucide-react";
import { navConfig } from "@/src/config/navigation";
import { siteConfig } from "@/src/config/site";
import { registerGsap, useGSAP } from "@/src/lib/gsap";
import { usePrefersReducedMotion } from "@/src/hooks/use-prefers-reduced-motion";

const skillGroups = [
  { title: "Languages", icon: Languages, items: siteConfig.skills.languages },
  { title: "Frameworks", icon: Cpu, items: siteConfig.skills.frameworks },
  { title: "Tools", icon: Hammer, items: siteConfig.skills.tools },
  { title: "Databases", icon: Database, items: siteConfig.skills.databases },
] as const;

export default function SkillsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const marqueeItems = useMemo(
    () =>
      [
        ...siteConfig.skills.languages,
        ...siteConfig.skills.frameworks,
        ...siteConfig.skills.tools,
        ...siteConfig.skills.databases,
      ].map((item) => item.name),
    [],
  );

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      const { gsap } = registerGsap();

      const ctx = gsap.context(() => {
        gsap.from(".skill-heading", {
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

        gsap.from(".skill-group", {
          y: 42,
          autoAlpha: 0,
          duration: 0.72,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".skill-grid",
            start: "top 78%",
          },
        });

        gsap.to(".skill-depth", {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }, rootRef);

      return () => ctx.revert();
    },
    { dependencies: [prefersReducedMotion], scope: rootRef },
  );

  return (
    <section
      id={navConfig.sections.skills.id}
      ref={rootRef}
      className="section-frame relative overflow-hidden py-28 md:py-36"
      aria-labelledby="skills-title"
    >
      <div className="skill-depth absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-[rgba(91,219,232,0.4)] to-transparent" />

      <div className="section-shell">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="skill-heading scene-label">technical range</p>
            <h2
              id="skills-title"
              className="skill-heading mt-6 text-balance text-4xl font-semibold leading-tight text-white md:text-6xl"
            >
              A full-stack toolkit tuned for resilient product systems.
            </h2>
          </div>
          <p className="skill-heading max-w-2xl text-base leading-8 text-[rgb(var(--muted))]">
            The stack is intentionally practical: modern UI frameworks, backend
            services, messaging, databases, CI/CD, Docker, and the daily craft
            needed to make complex systems usable.
          </p>
        </div>

        <div className="mt-12 overflow-hidden border-y border-white/10 py-4">
          <div className="marquee-track flex w-max gap-3">
            {[...marqueeItems, ...marqueeItems].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-semibold uppercase text-white/[0.58]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="skill-grid mt-12 grid gap-4 md:grid-cols-2">
          {skillGroups.map(({ title, icon: Icon, items }) => (
            <article
              key={title}
              className="skill-group rounded-lg border border-white/10 bg-white/[0.035] p-5 transition-[background-color,border-color,transform] duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.055]"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-[rgb(var(--accent))]">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-semibold text-white">{title}</h3>
                </div>
                <span className="text-xs text-[rgb(var(--muted))]">
                  {items.length} tools
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {items.map((item) => (
                  <div
                    key={item.name}
                    className="group flex min-h-14 items-center gap-3 rounded-lg border border-white/10 bg-black/20 p-3 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
                    title={item.name}
                  >
                    <img
                      src={item.icon}
                      alt=""
                      loading="lazy"
                      className="h-5 w-5 shrink-0 opacity-80 transition-opacity group-hover:opacity-100"
                    />
                    <span className="text-sm text-white/[0.68]">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
