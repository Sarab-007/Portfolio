"use client";

import { useMemo, useRef } from "react";
import { Activity, Code2, Layers3 } from "lucide-react";
import { navConfig } from "@/src/config/navigation";
import { siteConfig } from "@/src/config/site";
import { registerGsap, useGSAP } from "@/src/lib/gsap";
import { usePrefersReducedMotion } from "@/src/hooks/use-prefers-reduced-motion";

const principles = [
  {
    icon: Layers3,
    title: "End-to-end ownership",
    text: "Architecture, APIs, responsive interfaces, delivery pipelines, and cross-functional collaboration.",
  },
  {
    icon: Activity,
    title: "Performance-first delivery",
    text: "Fast screens, smooth interactions, maintainable systems, and release habits that keep products stable.",
  },
  {
    icon: Code2,
    title: "Clean implementation",
    text: "Readable code, practical abstractions, and UI decisions that support the real business workflow.",
  },
];

export default function AboutSection() {
  const rootRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const sentences = useMemo(
    () =>
      siteConfig.summaryLong
        .split(". ")
        .map((sentence) =>
          sentence.endsWith(".") ? sentence : `${sentence}.`,
        ),
    [],
  );

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      const { gsap } = registerGsap();

      const ctx = gsap.context(() => {
        gsap.from(".about-line", {
          yPercent: 105,
          autoAlpha: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "expo.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 68%",
          },
        });

        gsap.from(".about-principle", {
          y: 34,
          autoAlpha: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".about-principles",
            start: "top 78%",
          },
        });
      }, rootRef);

      return () => ctx.revert();
    },
    { dependencies: [prefersReducedMotion], scope: rootRef },
  );

  return (
    <section
      id={navConfig.sections.about.id}
      ref={rootRef}
      className="relative overflow-hidden py-28 md:py-36"
      aria-labelledby="about-title"
    >
      <div className="section-shell grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
        <div>
          <p className="scene-label">professional summary</p>
          <h2
            id="about-title"
            className="mt-6 text-balance text-4xl font-semibold leading-tight text-white md:text-5xl"
          >
            Product-minded engineering for complex web platforms.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-7 text-[rgb(var(--muted))]">
            {siteConfig.profile.promise}
          </p>
        </div>

        <div>
          <div className="space-y-4 text-xl leading-9 text-white/[0.82] md:text-2xl md:leading-10">
            {sentences.map((sentence) => (
              <span key={sentence} className="reveal-mask">
                <span className="about-line block">{sentence}</span>
              </span>
            ))}
          </div>

          <div className="about-principles mt-12 grid gap-3 md:grid-cols-3">
            {principles.map(({ icon: Icon, title, text }) => (
              <article
                key={title}
                className="about-principle rounded-lg border border-white/10 bg-white/[0.04] p-5"
              >
                <Icon className="h-5 w-5 text-[rgb(var(--accent))]" />
                <h3 className="mt-5 text-sm font-semibold text-white">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-white/[0.56]">
                  {text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
