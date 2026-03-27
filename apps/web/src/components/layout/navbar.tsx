"use client";

import ThemeToggle from "./theme-toggle";
import { navConfig } from "@/src/config/navigation";
import { SECTIONS, scrollToId } from "@/src/lib/scroll";
import { useActiveSection } from "@/src/hooks/use-active-section";
import { motion, useMotionValueEvent, useScroll, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/src/config/site";
import { useState } from "react";

const items = Object.values(navConfig.sections);
const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const active = useActiveSection(SECTIONS);
  const { scrollY } = useScroll();

  const [hidden, setHidden]   = useState(false);
  const [scrolled, setScrolled] = useState(false);
  let lastY = 0;

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 20);
    lastY = y;
  });

  return (
    <motion.header
      className="sticky top-0 z-50 w-full"
      /* Slide down on initial load */
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EXPO_OUT, delay: 0.1 }}
    >
      {/* Smart hide / show on scroll */}
      <motion.div
        animate={{ y: hidden ? "-120%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.83, 0, 0.17, 1] }}
        className="mx-auto max-w-6xl px-4"
      >
        <motion.div
          animate={{
            backgroundColor: scrolled
              ? "rgba(var(--bg), 0.88)"
              : "rgba(var(--bg), 0.65)",
            boxShadow: scrolled
              ? "0 4px 24px -4px rgba(0,0,0,0.12)"
              : "0 1px 2px 0 rgba(0,0,0,0.05)",
          }}
          transition={{ duration: 0.35 }}
          className="mt-3 flex items-center justify-between rounded-2xl border border-zinc-200/60 px-3 py-2 backdrop-blur dark:border-zinc-800/60"
        >
          {/* Logo */}
          <motion.button
            onClick={() => scrollToId(navConfig.sections.home.id)}
            className="rounded-xl px-3 py-2 text-sm font-semibold tracking-tight hover:bg-zinc-100/70 dark:hover:bg-zinc-900/50"
            aria-label="Go to top"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            <span className="text-zinc-900 dark:text-zinc-100">{siteConfig.name}</span>
            <span className="ml-2 hidden text-zinc-500 dark:text-zinc-400 md:inline">
              • {siteConfig.role}
            </span>
          </motion.button>

          {/* Nav items */}
          <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
            {items.map((it, i) => {
              const isActive = active === it.id;
              return (
                <motion.button
                  key={it.id}
                  onClick={() => scrollToId(it.id)}
                  className="relative rounded-xl px-3 py-2 text-sm text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-50"
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: EXPO_OUT,
                    delay: 0.2 + i * 0.05,
                  }}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.96 }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-xl border border-zinc-200/70 bg-zinc-100/70 dark:border-zinc-800/70 dark:bg-zinc-900/50"
                      transition={{ type: "spring", stiffness: 520, damping: 36 }}
                    />
                  )}
                  <span className="relative z-10">{it.label}</span>

                  {/* Active dot indicator */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        className="absolute -bottom-0.5 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-indigo-500"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 28 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <motion.a
              href="/resume.pdf"
              className="hidden rounded-xl border border-zinc-200/70 bg-white/60 px-3 py-2 text-sm backdrop-blur-sm dark:border-zinc-800/70 dark:bg-zinc-950/40 md:inline"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: EXPO_OUT, delay: 0.4 }}
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              Resume
            </motion.a>
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: EXPO_OUT, delay: 0.45 }}
            >
              <ThemeToggle />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.header>
  );
}