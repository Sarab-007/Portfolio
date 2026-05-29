"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FileDown, Menu, X } from "lucide-react";
import ThemeToggle from "./theme-toggle";
import { navConfig } from "@/src/config/navigation";
import { SECTIONS, scrollToId } from "@/src/lib/scroll";
import { siteConfig } from "@/src/config/site";
import { useActiveSection } from "@/src/hooks/use-active-section";
import { cn } from "@/src/lib/cn";
import { registerGsap, useGSAP } from "@/src/lib/gsap";

const NAV_ITEMS = Object.values(navConfig.sections);

export default function Navbar() {
  const active = useActiveSection(SECTIONS);
  const navRef = useRef<HTMLElement>(null);
  const [compact, setCompact] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useGSAP(
    () => {
      const { gsap } = registerGsap();
      if (!navRef.current) return;

      gsap.fromTo(
        navRef.current,
        { y: -28, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 0.52, delay: 0.08, ease: "power3.out" },
      );
    },
    { scope: navRef },
  );

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = useCallback((id: string) => {
    scrollToId(id);
    setMobileOpen(false);
  }, []);

  return (
    <header
      ref={navRef}
      className="fixed left-0 right-0 top-0 z-50 px-4 py-3 opacity-0"
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between rounded-lg border px-3 py-2 transition-all duration-300",
          compact
            ? "border-white/[0.12] bg-black/[0.55] shadow-[0_12px_42px_rgba(0,0,0,0.26)] backdrop-blur-xl"
            : "border-white/10 bg-black/[0.22] backdrop-blur-md",
        )}
      >
        <button
          type="button"
          onClick={() => handleNavClick(navConfig.sections.home.id)}
          className="group inline-flex items-center gap-3 rounded-md px-2 py-1.5 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(var(--accent))]"
          aria-label="Go to intro"
          data-cursor="home"
        >
          <span className="grid h-8 w-8 place-items-center rounded-md border border-white/[0.12] bg-white/[0.06] text-xs font-bold text-[rgb(var(--accent))]">
            <img src="/dark-avatar.svg" alt="" />
          </span>
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-semibold text-white">
              {siteConfig.name}
            </span>
            <span className="block text-[11px] text-white/[0.45]">
              {siteConfig.role}
            </span>
          </span>
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "relative rounded-full px-3 py-2 text-xs font-semibold text-white/[0.55] transition-colors duration-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(var(--accent))]",
                  isActive && "text-white",
                )}
                aria-current={isActive ? "page" : undefined}
                data-cursor={item.label}
              >
                <span
                  className={cn(
                    "absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-[rgb(var(--accent))] transition-transform duration-300",
                    isActive && "scale-x-100",
                  )}
                />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/resume.pdf"
            download
            className="hidden h-10 items-center gap-2 rounded-full border border-white/[0.12] bg-white/[0.06] px-3 text-xs font-semibold text-white/80 transition-colors hover:bg-white/[0.1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(var(--accent))] md:inline-flex"
            data-cursor="resume"
          >
            <FileDown className="h-4 w-4" aria-hidden="true" />
            Resume
          </a>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.12] bg-white/[0.06] text-white md:hidden"
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <X className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Menu className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <nav
          className="mx-auto mt-2 grid max-w-6xl gap-1 rounded-lg border border-white/[0.12] bg-black/[0.82] p-2 backdrop-blur-xl md:hidden"
          aria-label="Mobile navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = active === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "rounded-md px-4 py-3 text-left text-sm font-semibold transition-colors",
                  isActive
                    ? "bg-white/[0.08] text-white"
                    : "text-white/[0.58] hover:bg-white/[0.05] hover:text-white",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      ) : null}
    </header>
  );
}
