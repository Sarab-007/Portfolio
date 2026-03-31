"use client";

import ThemeToggle from "./theme-toggle";
import { navConfig } from "@/src/config/navigation";
import { SECTIONS, scrollToId } from "@/src/lib/scroll";
import { useActiveSection } from "@/src/hooks/use-active-section";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  AnimatePresence,
} from "framer-motion";
import { siteConfig } from "@/src/config/site";
import { useState, useCallback, useRef } from "react";
import { EXPO_OUT } from "@/src/lib/motion";

const NAV_ITEMS = Object.values(navConfig.sections);

export default function Navbar() {
  const active = useActiveSection(SECTIONS);
  const { scrollY } = useScroll();

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastYRef = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 20);
    lastYRef.current = y;
  });

  const handleNavClick = useCallback(
    (id: string) => {
      scrollToId(id);
      setMobileOpen(false);
    },
    [],
  );

  const toggleMobile = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  return (
    <motion.header
      className="sticky top-0 z-50 w-full"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EXPO_OUT, delay: 0.1 }}
    >
      <div className="mx-auto max-w-6xl px-4">
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
            onClick={() => handleNavClick(navConfig.sections.home.id)}
            className="rounded-xl px-3 py-2 text-sm font-semibold tracking-tight hover:bg-zinc-100/70 dark:hover:bg-zinc-900/50"
            aria-label="Go to top"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          >
            <span className="text-zinc-900 dark:text-zinc-100">
              {siteConfig.name}
            </span>
            <span className="ml-2 hidden text-zinc-500 dark:text-zinc-400 sm:inline">
              • {siteConfig.role}
            </span>
          </motion.button>

          {/* Desktop nav items */}
          <nav
            className="hidden items-center gap-1 md:flex"
            aria-label="Primary"
          >
            {NAV_ITEMS.map((it, i) => {
              const isActive = active === it.id;
              return (
                <motion.button
                  key={it.id}
                  onClick={() => handleNavClick(it.id)}
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
                      transition={{
                        type: "spring",
                        stiffness: 520,
                        damping: 36,
                      }}
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
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 28,
                        }}
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
              download
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

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={toggleMobile}
              className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200/70 bg-white/70 backdrop-blur-sm md:hidden dark:border-zinc-800/70 dark:bg-zinc-950/40"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <div className="flex w-5 flex-col items-center gap-[5px]">
                <motion.span
                  className="block h-[2px] w-full rounded-full bg-zinc-700 dark:bg-zinc-300"
                  animate={
                    mobileOpen
                      ? { rotate: 45, y: 7, width: "100%" }
                      : { rotate: 0, y: 0, width: "100%" }
                  }
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block h-[2px] w-full rounded-full bg-zinc-700 dark:bg-zinc-300"
                  animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.15 }}
                />
                <motion.span
                  className="block h-[2px] w-full rounded-full bg-zinc-700 dark:bg-zinc-300"
                  animate={
                    mobileOpen
                      ? { rotate: -45, y: -7, width: "100%" }
                      : { rotate: 0, y: 0, width: "100%" }
                  }
                  transition={{ duration: 0.2 }}
                />
              </div>
            </button>
          </div>
        </motion.div>

        {/* Mobile menu dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.nav
              className="mt-2 overflow-hidden rounded-2xl border border-zinc-200/60 bg-white/90 backdrop-blur-lg md:hidden dark:border-zinc-800/60 dark:bg-zinc-950/90"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: EXPO_OUT }}
              aria-label="Mobile navigation"
            >
              <div className="flex flex-col p-2">
                {NAV_ITEMS.map((it, i) => {
                  const isActive = active === it.id;
                  return (
                    <motion.button
                      key={it.id}
                      onClick={() => handleNavClick(it.id)}
                      className={`rounded-xl px-4 py-3 text-left text-sm transition-colors ${
                        isActive
                          ? "bg-zinc-100/70 font-medium text-zinc-900 dark:bg-zinc-800/50 dark:text-zinc-100"
                          : "text-zinc-600 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-zinc-900/30"
                      }`}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: i * 0.04,
                        duration: 0.3,
                        ease: EXPO_OUT,
                      }}
                    >
                      {it.label}
                      {isActive && (
                        <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-indigo-500" />
                      )}
                    </motion.button>
                  );
                })}

                {/* Mobile resume link */}
                <motion.a
                  href="/resume.pdf"
                  download
                  className="mt-1 rounded-xl border border-zinc-200/70 bg-white/60 px-4 py-3 text-center text-sm font-medium backdrop-blur-sm dark:border-zinc-800/70 dark:bg-zinc-950/40"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: NAV_ITEMS.length * 0.04,
                    duration: 0.3,
                    ease: EXPO_OUT,
                  }}
                >
                  Download Resume
                </motion.a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}