"use client";

import { useCallback, useRef, useState } from "react";
import { ArrowUpRight, LockKeyhole, RadioTower } from "lucide-react";
import MagneticLink from "@/src/components/ui/magnetic-link";
import ProjectSignal from "@/src/components/visual/project-signal";
import { navConfig } from "@/src/config/navigation";
import { projects } from "@/features/projects";
import type { Project } from "@/features/projects/types/project.types";
import { registerGsap, useGSAP } from "@/src/lib/gsap";
import { usePrefersReducedMotion } from "@/src/hooks/use-prefers-reduced-motion";
import { cn } from "@/src/lib/cn";

const accentClasses = {
  amber: {
    rail: "bg-amber-300",
    text: "text-amber-200",
    border: "border-amber-300/35",
    glow: "shadow-[0_0_44px_rgba(245,158,11,0.13)]",
    wash: "from-amber-300/[0.12]",
  },
  cyan: {
    rail: "bg-cyan-300",
    text: "text-cyan-200",
    border: "border-cyan-300/35",
    glow: "shadow-[0_0_44px_rgba(34,211,238,0.12)]",
    wash: "from-cyan-300/[0.1]",
  },
  emerald: {
    rail: "bg-emerald-300",
    text: "text-emerald-200",
    border: "border-emerald-300/35",
    glow: "shadow-[0_0_44px_rgba(52,211,153,0.12)]",
    wash: "from-emerald-300/[0.1]",
  },
  rose: {
    rail: "bg-rose-300",
    text: "text-rose-200",
    border: "border-rose-300/35",
    glow: "shadow-[0_0_44px_rgba(251,113,133,0.1)]",
    wash: "from-rose-300/[0.1]",
  },
};

type ProjectCardProps = {
  index: number;
  project: Project;
};

function ProjectCard({ index, project }: ProjectCardProps) {
  const accent = accentClasses[project.visual.accent];

  return (
    <article
      data-project-index={index}
      className={cn(
        "project-panel group relative grid min-w-[calc(100vw-2rem)] overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-4 transition-[background-color,border-color,box-shadow] duration-300 hover:border-white/20 hover:bg-white/[0.05] md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] md:gap-5 md:p-5 lg:absolute lg:inset-0 lg:h-full lg:min-w-0 lg:w-full lg:p-6 lg:[transform-style:preserve-3d]",
        accent.glow,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br via-transparent to-transparent opacity-70",
          accent.wash,
        )}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.08),transparent_26%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_38%)]" />
      <div className={cn("pointer-events-none absolute left-0 top-8 h-28 w-px", accent.rail)} />

      <div className="relative z-10 flex min-h-[430px] min-w-0 flex-col justify-between gap-5 lg:h-full lg:min-h-0">
        <div className="min-w-0">
          <div className="flex min-h-4 items-center gap-2.5 text-[11px] uppercase leading-none text-[rgb(var(--muted))]">
            <RadioTower
              className={cn("h-3.5 w-3.5 shrink-0", accent.text)}
              aria-hidden="true"
            />
            <span className="truncate">
              Scene {String(index + 1).padStart(2, "0")} / {project.eyebrow}
            </span>
          </div>

          <h3 className="mt-5 text-4xl font-semibold leading-tight text-white md:text-[2.45rem]">
            {project.title}
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/[0.66] lg:line-clamp-7">
            {project.description}
          </p>
        </div>

        <div className="grid gap-4">
          <div className="grid grid-cols-3 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex min-h-[76px] flex-col justify-center bg-black/[0.45] p-3"
              >
                <div className="text-xl font-semibold leading-none text-white">
                  {metric.value}
                </div>
                <div className="mt-2 text-[10px] leading-4 text-white/[0.45]">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex min-h-7 flex-wrap items-start gap-1.5">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[11px] leading-none text-white/[0.58]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative z-10 grid min-h-[430px] min-w-0 grid-rows-[auto_1fr] gap-4 lg:h-full lg:min-h-0">
        <div className="project-visual-shell">
          <ProjectSignal project={project} />
        </div>

        <div className="flex min-h-0 flex-col">
          <p className="text-[11px] uppercase leading-none text-[rgb(var(--muted))]">
            {project.role}
          </p>
          <ul className="mt-3 grid gap-1.5">
            {project.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex gap-2.5 text-[13px] leading-5 text-white/[0.62]"
              >
                <span className={cn("mt-2 h-1 w-1 shrink-0 rounded-full", accent.rail)} />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-4">
            {project.links?.demo ? (
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
            ) : (
              <div className="inline-flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-5 text-sm font-semibold text-white/[0.52]">
                <LockKeyhole className="h-4 w-4" aria-hidden="true" />
                Internal Build
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  const rootRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef(0);
  const stageStartRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();
  const activeProject = projects[activeIndex] ?? projects[0];
  const activeAccent = accentClasses[activeProject.visual.accent];

  const setGalleryIndex = useCallback((index: number) => {
    if (activeIndexRef.current === index) return;
    activeIndexRef.current = index;
    setActiveIndex(index);
  }, []);

  const handleSceneSelect = useCallback((index: number) => {
    const stage = stageRef.current;
    if (!stage) return;

    if (window.innerWidth < 1024) {
      const panel = stage.querySelector<HTMLElement>(
        `[data-project-index="${index}"]`,
      );

      if (!panel) return;

      window.scrollTo({
        top: panel.getBoundingClientRect().top + window.scrollY - 96,
        behavior: "smooth",
      });
      return;
    }

    const sceneDistance = window.innerHeight * 0.64;
    const stageStart =
      stageStartRef.current || stage.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: stageStart + sceneDistance * index,
      behavior: "smooth",
    });
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      const { gsap, ScrollTrigger } = registerGsap();

      const media = gsap.matchMedia();
      const ctx = gsap.context(() => {
        const syncGallery = (progress: number, forcedIndex?: number) => {
          if (progressRef.current) {
            gsap.set(progressRef.current, {
              scaleX: progress,
              transformOrigin: "left center",
            });
          }

          const nextIndex =
            forcedIndex ??
            Math.min(
              projects.length - 1,
              Math.max(0, Math.round(progress * (projects.length - 1))),
            );

          setGalleryIndex(nextIndex);
        };

        gsap.set(progressRef.current, {
          scaleX: 0,
          transformOrigin: "left center",
        });

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

        gsap.from(".project-gallery-rail", {
          y: 18,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 62%",
          },
        });

        media.add("(min-width: 1024px)", () => {
          const stage = stageRef.current;
          const track = trackRef.current;
          if (!stage || !track) return undefined;
          const panels = gsap.utils.toArray<HTMLElement>(".project-panel");
          const visuals = panels.map((panel) =>
            panel.querySelector(".project-visual-shell"),
          );
          const sceneDistance = () => window.innerHeight * 0.64;
          const totalDistance = () =>
            sceneDistance() * Math.max(1, panels.length - 1);

          gsap.set(track, { x: 0 });
          gsap.set(panels, {
            autoAlpha: 0,
            filter: "blur(8px)",
            rotateX: -8,
            scale: 0.92,
            transformOrigin: "center center",
            y: 92,
            zIndex: (index: number) => index + 1,
          });
          gsap.set(panels[0], {
            autoAlpha: 1,
            filter: "blur(0px)",
            rotateX: 0,
            scale: 1,
            y: 0,
          });
          gsap.set(visuals, { y: 0 });

          const timeline = gsap.timeline({
            defaults: { ease: "power2.out" },
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: () => `+=${totalDistance()}`,
              pin: true,
              scrub: 0.32,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onRefresh: (self) => {
                stageStartRef.current = self.start;
                syncGallery(self.progress);
              },
              onUpdate: (self) => syncGallery(self.progress),
            },
          });

          panels.forEach((panel, index) => {
            if (index === 0) return;
            const previousPanel = panels[index - 1];
            const previousVisual = visuals[index - 1];
            const visual = visuals[index];
            const position = index - 1;

            timeline
              .to(
                previousPanel,
                {
                  autoAlpha: 0.07,
                  filter: "blur(10px)",
                  rotateX: 8,
                  scale: 0.9,
                  y: -78,
                  duration: 0.48,
                },
                position,
              )
              .fromTo(
                panel,
                {
                  autoAlpha: 0,
                  filter: "blur(7px)",
                  rotateX: -10,
                  scale: 0.92,
                  y: 86,
                },
                {
                  autoAlpha: 1,
                  filter: "blur(0px)",
                  rotateX: 0,
                  scale: 1,
                  y: 0,
                  duration: 0.5,
                },
                position + 0.04,
              );

            if (previousVisual) {
              timeline.to(
                previousVisual,
                {
                  y: -12,
                  duration: 0.48,
                },
                position,
              );
            }

            if (visual) {
              timeline.fromTo(
                visual,
                { y: 14 },
                { y: 0, duration: 0.5 },
                position + 0.04,
              );
            }
          });

          timeline.to({}, { duration: 0.08 });

          gsap.from(".project-deck", {
            y: 24,
            autoAlpha: 0,
            duration: 0.48,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stage,
              start: "top 68%",
            },
          });

          return () => {
            timeline.scrollTrigger?.kill();
            timeline.kill();
          };
        });

        media.add("(max-width: 1023px)", () => {
          const stage = stageRef.current;
          if (!stage) return undefined;

          const progressTrigger = ScrollTrigger.create({
            trigger: stage,
            start: "top 78%",
            end: "bottom 28%",
            onUpdate: (self) => {
              if (progressRef.current) {
                gsap.set(progressRef.current, {
                  scaleX: self.progress,
                  transformOrigin: "left center",
                });
              }

              const nextIndex = Math.min(
                projects.length - 1,
                Math.max(0, Math.floor(self.progress * projects.length)),
              );
              setGalleryIndex(nextIndex);
            },
          });

          const reveal = gsap.from(".project-panel", {
            y: 24,
            autoAlpha: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: stage,
              start: "top 78%",
            },
          });

          return () => {
            progressTrigger.kill();
            reveal.scrollTrigger?.kill();
            reveal.kill();
          };
        });
      }, rootRef);

      return () => {
        media.revert();
        ctx.revert();
        ScrollTrigger.refresh();
      };
    },
    { dependencies: [prefersReducedMotion, setGalleryIndex], scope: rootRef },
  );

  return (
    <section
      id={navConfig.sections.projects.id}
      ref={rootRef}
      className="relative overflow-hidden py-24 md:min-h-screen md:py-0"
      aria-labelledby="projects-title"
    >
      <div className="pointer-events-none absolute inset-x-0 top-16 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-24 hidden h-32 bg-[linear-gradient(180deg,rgba(255,255,255,0.035),transparent)] md:block" />

      <div className="section-shell project-copy relative z-10 pt-2 md:pt-24">
        <p className="scene-label">selected enterprise systems</p>
        <div className="mt-6 grid gap-6 lg:grid-cols-[0.88fr_1.12fr]">
          <h2
            id="projects-title"
            className="text-balance text-4xl font-semibold leading-tight text-white md:text-6xl"
          >
            Case studies built as moving systems, not static screenshots.
          </h2>
          <p className="max-w-2xl text-base leading-8 text-[rgb(var(--muted))]">
            A kinetic project gallery for operational systems: each panel
            surfaces the product, the signal, and the engineering decisions
            behind the work without breaking the rhythm of the page.
          </p>
        </div>
      </div>

      <div className="project-gallery-rail section-shell relative z-10 mt-8 grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div>
          <div className="flex items-center justify-between gap-4 text-[11px] uppercase leading-none text-white/45">
            <span className={cn("truncate font-semibold", activeAccent.text)}>
              {activeProject.period}
            </span>
            <span>
              {String(activeIndex + 1).padStart(2, "0")} /{" "}
              {String(projects.length).padStart(2, "0")}
            </span>
          </div>
          <div className="mt-3 h-px overflow-hidden bg-white/10">
            <div
              ref={progressRef}
              className={cn("h-full w-full origin-left scale-x-0", activeAccent.rail)}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          {projects.map((project, index) => {
            const isActive = index === activeIndex;
            const accent = accentClasses[project.visual.accent];

            return (
              <button
                key={project.id}
                type="button"
                onClick={() => handleSceneSelect(index)}
                className={cn(
                  "h-8 rounded-full border px-3 text-[11px] font-semibold transition-[background-color,border-color,color,transform] duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(var(--accent))]",
                  isActive
                    ? cn("bg-white/10 text-white", accent.border)
                    : "border-white/10 bg-white/[0.035] text-white/45 hover:border-white/20 hover:text-white",
                )}
                aria-label={`Go to ${project.title}`}
                aria-current={isActive ? "true" : undefined}
              >
                {String(index + 1).padStart(2, "0")}
              </button>
            );
          })}
        </div>
      </div>

      <div
        ref={stageRef}
        className="project-stage mt-12 overflow-hidden lg:mt-0 lg:flex lg:min-h-screen lg:items-center lg:pb-8 lg:pt-20"
      >
        <div
          ref={trackRef}
          className="project-deck flex flex-col gap-5 px-4 pb-8 lg:relative lg:mx-auto lg:h-[min(610px,calc(100svh-8rem))] lg:w-[min(930px,calc(100vw-2rem))] lg:gap-0 lg:px-0 lg:pb-0 lg:[perspective:1400px]"
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} index={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
