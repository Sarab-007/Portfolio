"use client";

import ThemeToggle from "./theme-toggle";
import { navConfig } from "@/src/config/navigation";
import { SECTIONS, scrollToId } from "@/src/lib/scroll";
import { useActiveSection } from "@/src/hooks/use-active-section";
import { motion } from "framer-motion";
import { siteConfig } from "@/src/config/site";

const items = Object.values(navConfig.sections);

export default function Navbar() {
  const active = useActiveSection(SECTIONS);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mt-3 flex items-center justify-between rounded-2xl border border-zinc-200/60 bg-white/65 px-3 py-2 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/40">
          <button
            onClick={() => scrollToId(navConfig.sections.home.id)}
            className="rounded-xl px-3 py-2 text-sm font-semibold tracking-tight hover:bg-zinc-100/70 dark:hover:bg-zinc-900/50"
            aria-label="Go to top"
          >
            <span className="text-zinc-900 dark:text-zinc-100">{siteConfig.name}</span>
            <span className="ml-2 hidden text-zinc-500 dark:text-zinc-400 md:inline">• {siteConfig.role}</span>
          </button>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {items.map((it) => {
              const isActive = active === it.id;
              return (
                <button
                  key={it.id}
                  onClick={() => scrollToId(it.id)}
                  className="relative rounded-xl px-3 py-2 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl border border-zinc-200/70 bg-zinc-100/70 dark:border-zinc-800/70 dark:bg-zinc-900/50"
                      transition={{ type: "spring", stiffness: 520, damping: 36 }}
                    />
                  )}
                  <span className="relative z-10">{it.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="/resume.pdf"
              className="hidden rounded-xl border border-zinc-200/70 bg-white/60 px-3 py-2 text-sm shadow-sm backdrop-blur transition hover:bg-white dark:border-zinc-800/70 dark:bg-zinc-950/40 dark:hover:bg-zinc-950/60 md:inline"
            >
              Resume
            </a>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
