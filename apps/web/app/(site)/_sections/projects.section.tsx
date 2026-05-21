"use client";

import { useRef } from "react";
import { ArrowUpRight, RadioTower } from "lucide-react";
import MagneticLink from "@/src/components/ui/magnetic-link";
import ProjectSignal from "@/src/components/visual/project-signal";
import { navConfig } from "@/src/config/navigation";
import { projects } from "@/features/projects";
import { registerGsap, useGSAP } from "@/src/lib/gsap";
import { usePrefersReducedMotion } from "@/src/hooks/use-prefers-reduced-motion";

export default function ProjectsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      const { gsap, ScrollTrigger } = registerGsap();

      const media = gsap.matchMedia();
      const ctx = gsap.context(() => {
        gsap.from(".project-copy", {
          y: 32,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
          },
        });

        media.add("(min-width: 768px)", () => {
          const stage = stageRef.current;
          const track = trackRef.current;
          if (!stage || !track) return undefined;

          const getDistance = () =>
            Math.max(0, track.scrollWidth - window.innerWidth + 32);

          const tween = gsap.to(track, {
            x: () => -getDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: () => `+=${getDistance() + window.innerHeight * 0.7}`,
              pin: true,
              scrub: 0.9,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          gsap.from(".project-panel", {
            y: 40,
            autoAlpha: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stage,
              start: "top 68%",
            },
          });

          return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
          };
        });
      }, rootRef);

      return () => {
        media.revert();
        ctx.revert();
        ScrollTrigger.refresh();
      };
    },
    { dependencies: [prefersReducedMotion], scope: rootRef },
  );

  return (
    <section
      id={navConfig.sections.projects.id}
      ref={rootRef}
      className="relative overflow-hidden py-24 md:min-h-screen md:py-0"
      aria-labelledby="projects-title"
    >
      <div className="section-shell project-copy pt-2 md:pt-24">
        <p className="scene-label">selected enterprise systems</p>
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <h2
            id="projects-title"
            className="text-balance text-4xl font-semibold leading-tight text-white md:text-6xl"
          >
            Case studies built as moving systems, not static screenshots.
          </h2>
          <p className="max-w-2xl text-base leading-8 text-[rgb(var(--muted))]">
            The work spans IoT building operations, healthcare parking, human
            capital workflows, and cloud integration. Each project is presented
            as a live signal because the real value was operational clarity.
          </p>
        </div>
      </div>

      <div
        ref={stageRef}
        className="project-stage mt-12 overflow-hidden md:mt-0 md:flex md:min-h-screen md:items-center"
      >
        <div
          ref={trackRef}
          className="flex flex-col gap-5 px-4 pb-8 md:w-max md:flex-row md:gap-6 md:px-[max(1rem,calc((100vw-1180px)/2))]"
        >
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="project-panel grid min-w-[calc(100vw-2rem)] gap-6 rounded-lg border border-white/10 bg-white/[0.035] p-5 md:min-h-[calc(100svh-9rem)] md:min-w-[min(1100px,84vw)] md:grid-cols-[0.92fr_1.08fr] md:p-8"
            >
            <div className="flex min-h-[520px] flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs uppercase text-[rgb(var(--muted))]">
                  <RadioTower
                    className="h-4 w-4 text-[rgb(var(--accent))]"
                    aria-hidden="true"
                  />
                  Scene {String(index + 1).padStart(2, "0")} /{" "}
                  {project.eyebrow}
                </div>
                <h3 className="mt-8 text-4xl font-semibold leading-tight text-white md:text-6xl">
                  {project.title}
                </h3>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/[0.66]">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="bg-black/[0.45] p-4">
                      <div className="text-2xl font-semibold text-white">
                        {metric.value}
                      </div>
                      <div className="mt-1 text-[11px] leading-4 text-white/[0.45]">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-white/[0.58]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-6">
              <ProjectSignal project={project} />

              <div className="grid gap-3">
                <p className="text-xs uppercase text-[rgb(var(--muted))]">
                  {project.role}
                </p>
                <ul className="grid gap-2">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm leading-6 text-white/[0.62]"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[rgb(var(--accent))]" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                {project.links?.demo ? (
                  <div className="pt-2">
                    <MagneticLink
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      icon={<ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
                      cursorLabel="launch"
                    >
                      Visit Project
                    </MagneticLink>
                  </div>
                ) : null}
              </div>
            </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
