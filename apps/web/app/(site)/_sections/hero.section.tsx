"use client";

import { useMemo, useRef } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, FileDown, Mail } from "lucide-react";
import MagneticLink from "@/src/components/ui/magnetic-link";
import { navConfig } from "@/src/config/navigation";
import { siteConfig } from "@/src/config/site";
import { registerGsap, useGSAP } from "@/src/lib/gsap";
import { usePrefersReducedMotion } from "@/src/hooks/use-prefers-reduced-motion";

export default function HeroSection() {
  const rootRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const headlineWords = useMemo(
    () => siteConfig.profile.headline.split(" "),
    [],
  );

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      const { gsap } = registerGsap();

      const ctx = gsap.context(() => {
        const isSmallScreen = window.matchMedia("(max-width: 767px)").matches;

        if (isSmallScreen) {
          gsap.from(".hero-kicker, .hero-copy, .hero-portrait, .hero-stat", {
            y: 14,
            autoAlpha: 0,
            duration: 0.42,
            stagger: 0.04,
            delay: 0.08,
            ease: "power3.out",
          });

          return;
        }

        const timeline = gsap.timeline({
          defaults: { ease: "power3.out" },
          delay: 0.08,
        });

        timeline
          .from(".hero-kicker", { y: 18, autoAlpha: 0, duration: 0.55 })
          .from(
            ".hero-word",
            {
              yPercent: 112,
              rotateX: -72,
              autoAlpha: 0,
              transformOrigin: "left bottom",
              duration: 0.82,
              stagger: 0.045,
              ease: "expo.out",
            },
            "-=0.18",
          )
          .from(
            ".hero-copy",
            { y: 24, autoAlpha: 0, duration: 0.72, stagger: 0.08 },
            "-=0.42",
          )
          .from(
            ".hero-portrait",
            { y: 42, rotate: -3, autoAlpha: 0, duration: 1.05 },
            "-=0.72",
          )
          .from(
            ".hero-stat",
            { y: 18, autoAlpha: 0, duration: 0.55, stagger: 0.08 },
            "-=0.56",
          );

        gsap.to(".hero-ambient", {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
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
      id={navConfig.sections.home.id}
      ref={rootRef}
      className="relative overflow-hidden px-4 pt-28 lg:min-h-[100svh]"
      aria-labelledby="hero-title"
    >
      <div className="hero-ambient absolute left-1/2 top-20 h-[560px] w-[70vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(243,188,84,0.12),transparent_62%)] blur-3xl" />

      <div className="section-shell relative grid items-center gap-10 pb-16 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-[0.98fr_1.02fr]">
        <div className="relative z-10 max-w-4xl">
          <p className="hero-kicker scene-label">{siteConfig.profile.eyebrow}</p>

          <h1
            id="hero-title"
            className="mt-6 max-w-5xl text-balance text-4xl font-semibold leading-[1.04] text-white sm:text-5xl md:text-6xl 2xl:text-7xl"
          >
            {headlineWords.map((word, index) => (
              <span key={`${word}-${index}`} className="reveal-mask inline-block">
                <span className="hero-word inline-block pr-3">{word}</span>
              </span>
            ))}
          </h1>

          <p className="hero-copy mt-7 max-w-2xl text-base leading-8 text-[rgb(var(--soft))] md:text-lg">
            {siteConfig.summary}
          </p>

          <div className="hero-copy mt-8 flex flex-wrap gap-3">
            <MagneticLink
              href={`#${navConfig.sections.projects.id}`}
              variant="primary"
              icon={<ArrowDown className="h-4 w-4" aria-hidden="true" />}
              cursorLabel="explore"
            >
              View Work
            </MagneticLink>
            <MagneticLink
              href="/resume.pdf"
              download
              variant="secondary"
              icon={<FileDown className="h-4 w-4" aria-hidden="true" />}
              cursorLabel="resume"
            >
              Resume
            </MagneticLink>
            <MagneticLink
              href={`mailto:${siteConfig.email}`}
              variant="ghost"
              icon={<Mail className="h-4 w-4" aria-hidden="true" />}
              cursorLabel="email"
            >
              Email
            </MagneticLink>
          </div>

          <div className="mt-12 grid max-w-3xl grid-cols-2 gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-4">
            {siteConfig.profile.stats.map((stat) => (
              <div key={stat.label} className="hero-stat bg-black/[0.45] p-4">
                <div className="text-2xl font-semibold text-white">
                  {stat.value}
                </div>
                <div className="mt-2 text-xs leading-5 text-white/[0.48]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-portrait relative min-h-[430px] sm:min-h-[520px] lg:min-h-[680px]">
          <div className="absolute inset-0 border border-white/10 bg-black/[0.24]" />
          <div className="absolute inset-6 border border-white/10" />
          <div className="absolute left-5 right-5 top-5 flex items-center justify-between text-[10px] uppercase text-white/[0.42]">
            <span>{siteConfig.role}</span>
            <span>{siteConfig.tagline}</span>
          </div>
          <div className="absolute inset-x-10 bottom-10 top-20 overflow-hidden rounded-lg border border-white/10 bg-[rgb(var(--panel))]/60">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:44px_44px]" />
            <div className="absolute inset-x-0 top-0 h-12 border-b border-white/10 bg-black/[0.35]" />
            <div className="absolute left-4 top-4 flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[rgb(var(--rose))]" />
              <span className="h-2 w-2 rounded-full bg-[rgb(var(--accent))]" />
              <span className="h-2 w-2 rounded-full bg-[rgb(var(--emerald))]" />
            </div>
            <Image
              src="/avatar.png"
              alt={`${siteConfig.name} portrait`}
              width={1000}
              height={1000}
              priority
              sizes="(min-width: 1024px) 44vw, 80vw"
              className="absolute bottom-0 left-1/2 h-[88%] w-auto -translate-x-1/2 object-contain drop-shadow-[0_34px_80px_rgba(0,0,0,0.55)]"
            />
            <div className="absolute bottom-6 left-6 right-6 rounded-lg border border-white/10 bg-black/70 p-4 backdrop-blur">
              <p className="text-xs uppercase text-[rgb(var(--accent))]">
                current signal
              </p>
              <p className="mt-2 text-sm leading-6 text-white/[0.72]">
                {siteConfig.profile.promise}
              </p>
            </div>
          </div>
          <div className="absolute right-0 top-24 hidden rounded-lg border border-white/10 bg-black/[0.55] p-4 text-xs text-white/[0.62] backdrop-blur md:block">
            <span className="block text-[rgb(var(--cyan))]">API</span>
            <span>Frontend + Backend sync</span>
          </div>
          <div className="absolute bottom-28 left-0 hidden rounded-lg border border-white/10 bg-black/[0.55] p-4 text-xs text-white/[0.62] backdrop-blur md:block">
            <span className="block text-[rgb(var(--accent))]">CI/CD</span>
            <span>Clean releases, less drama</span>
          </div>
        </div>
      </div>

      <a
        href={`#${navConfig.sections.about.id}`}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase text-white/[0.45] md:flex"
        data-cursor="scroll"
      >
        Scroll
        <ArrowDown className="h-3 w-3" aria-hidden="true" />
      </a>
    </section>
  );
}
