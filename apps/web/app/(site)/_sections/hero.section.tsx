"use client";

import Container from "@/src/components/layout/container";
import { navConfig } from "@/src/config/navigation";
import { siteConfig } from "@/src/config/site";
import Image from "next/image";
import TypewriterRoles from "@/src/components/motion/typewriter-roles";
import { EXPO_OUT, fadeUpVariants, staggerContainer } from "@/src/lib/motion";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { useRef, useCallback, type MouseEvent } from "react";

/* ── Button variants ── */
const buttonVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, ease: EXPO_OUT, delay: 0.55 + i * 0.09 },
  }),
};

/* ── 3-D tilt card wrapper (disabled on touch devices) ── */
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springX = useSpring(rawX, { stiffness: 140, damping: 22 });
  const springY = useSpring(rawY, { stiffness: 140, damping: 22 });

  const rotateX = useTransform(springY, [-0.5, 0.5], ["3deg", "-3deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-6deg", "3deg"]);

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      rawX.set((e.clientX - rect.left) / rect.width - 0.5);
      rawY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [rawX, rawY],
  );

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
  }, [rawX, rawY]);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="perspective-[1000px]"
    >
      {children}
    </motion.div>
  );
}

/* ── Avatar with floating ring ── */
function AnimatedAvatar() {
  return (
    <div className="relative mx-auto w-full max-w-[220px] md:max-w-[300px]">
      {/* Pulsing glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          boxShadow: [
            "0 0 0 0px rgba(99,102,241,0.35)",
            "0 0 0 14px rgba(99,102,241,0)",
          ],
        }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
      />

      {/* Floating rotation ring */}
      <motion.div
        className="absolute -inset-4 rounded-full border border-dashed border-zinc-300/50 dark:border-zinc-700/50"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute -inset-8 hidden rounded-full border border-dashed border-zinc-200/40 dark:border-zinc-800/40 md:block"
        animate={{ rotate: -360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      />

      {/* Avatar image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px) saturate(1)" }}
        transition={{ duration: 1, delay: 0.5, ease: EXPO_OUT }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/avatar.png"
            alt={`${siteConfig.name} headshot`}
            width={1000}
            height={1000}
            priority
            className="relative h-auto w-full object-cover drop-shadow-xl"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}

/* ── Hero data ── */
const HERO_BUTTONS = [
  {
    href: `#${navConfig.sections.projects.id}`,
    label: "View Projects",
    primary: true,
  },
  { href: "/resume.pdf", label: "Download Resume", primary: false },
  {
    href: `#${navConfig.sections.contact.id}`,
    label: "Contact",
    primary: false,
  },
] as const;

const TYPEWRITER_ROLES = [
  "Creating Scalable Web Apps",
  "Building Intuitive Interfaces",
  "Turning Ideas into Code",
  "Crafting Seamless Experiences",
  "Optimizing Performance",
  "Solving Real-World Problems",
] as const;

export default function HeroSection() {
  return (
    <section
      id={navConfig.sections.home.id}
      className="pt-14 md:pt-20 min-h-[100dvh]"
    >
      <Container>
        <TiltCard>
          <motion.div
            className="grid items-center gap-8 rounded-3xl border border-zinc-200/60 bg-white/60 p-6 backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-950/40 md:grid-cols-[1.2fr_0.8fr] md:gap-10 md:p-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.9, ease: EXPO_OUT }}
          >
            {/* ── Left column ── */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              {/* Greeting badge */}
              <motion.div variants={fadeUpVariants}>
                <motion.span
                  className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200/70 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-500 backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-900/50 dark:text-zinc-400"
                  whileHover={{ scale: 1.04 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                >
                  <motion.span
                    className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  Available for work
                </motion.span>
              </motion.div>

              {/* Name */}
              <motion.h1
                variants={fadeUpVariants}
                className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl md:text-6xl"
              >
                Hi, I am{" "}
                <motion.span
                  className="relative inline-block"
                  whileHover={{ y: -1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                >
                  Sarab
                  {/* Underline swipe */}
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                    initial={{ scaleX: 0, transformOrigin: "left" }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.7, delay: 0.9, ease: EXPO_OUT }}
                  />
                </motion.span>
              </motion.h1>

              {/* Typewriter */}
              <motion.p
                variants={fadeUpVariants}
                className="mt-2 text-base md:text-lg text-zinc-600 dark:text-zinc-300"
              >
                <TypewriterRoles
                  roles={[...TYPEWRITER_ROLES]}
                  className="text-2xl font-bold text-red-600 sm:text-3xl"
                />
              </motion.p>

              {/* Summary */}
              <motion.p
                variants={fadeUpVariants}
                className="mt-5 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-300"
              >
                {siteConfig.summary}
              </motion.p>

              {/* CTA buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                {HERO_BUTTONS.map((btn, i) => (
                  <motion.a
                    key={btn.href}
                    href={btn.href}
                    custom={i}
                    variants={buttonVariants}
                    initial="hidden"
                    animate="show"
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    {...(btn.label === "Download Resume" ? { download: true } : {})}
                    className={
                      btn.primary
                        ? "rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white shadow-sm dark:bg-white dark:text-zinc-900"
                        : "rounded-2xl border border-zinc-200/70 bg-white/60 px-5 py-3 text-sm font-medium backdrop-blur-sm dark:border-zinc-800/70 dark:bg-zinc-950/40"
                    }
                  >
                    {btn.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* ── Right column — avatar ── */}
            <AnimatedAvatar />
          </motion.div>
        </TiltCard>
      </Container>
    </section>
  );
}