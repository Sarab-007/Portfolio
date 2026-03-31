"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useCallback, type MouseEvent } from "react";
import type { Project } from "../types/project.types";
import { EXPO_OUT } from "@/src/lib/motion";

interface Props {
  project: Project;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: Props) {
  const { title, description, stack, highlights, image, links } = project;

  const ref = useRef<HTMLDivElement>(null);

  /* ── 3-D tilt ── */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 160, damping: 24 });
  const springY = useSpring(rawY, { stiffness: 160, damping: 24 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-5deg", "5deg"]);

  /* ── Spotlight ── */
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const onMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      rawX.set(px - 0.5);
      rawY.set(py - 0.5);
      setSpot({ x: px * 100, y: py * 100 });
    },
    [rawX, rawY],
  );

  const onMouseLeave = useCallback(() => {
    rawX.set(0);
    rawY.set(0);
    setHovered(false);
  }, [rawX, rawY]);

  const onMouseEnter = useCallback(() => setHovered(true), []);

  const demoHref = links?.demo;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={onMouseEnter}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: "900px",
      }}
      initial={{ opacity: 0, y: 36, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: EXPO_OUT, delay: index * 0.1 }}
      className="group relative"
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-zinc-200/60 bg-white/70 backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/35"
        whileHover={{
          boxShadow:
            "0 20px 60px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(99,102,241,0.12)",
          borderColor: "rgba(99,102,241,0.3)",
          transition: { duration: 0.3 },
        }}
      >
        {/* Reactive spotlight */}
        <div
          className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(260px circle at ${spot.x}% ${spot.y}%, rgba(99,102,241,0.07), transparent 70%)`,
          }}
        />

        {/* Optional image */}
        {image && (
          <div className="relative h-40 w-full overflow-hidden border-b border-zinc-200/60 dark:border-zinc-800/60">
            <motion.img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.5, ease: EXPO_OUT }}
            />
          </div>
        )}

        <div className="p-5">
          <h3 className="font-semibold text-zinc-900 dark:text-zinc-100">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-5 text-zinc-600 dark:text-zinc-300">
            {description}
          </p>

          {/* Tech stack tags */}
          {stack.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {stack.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-zinc-200/60 bg-zinc-100/60 px-2.5 py-0.5 text-[11px] font-medium text-zinc-600 dark:border-zinc-800/60 dark:bg-zinc-900/50 dark:text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* View project */}
          {demoHref && (
            <motion.a
              href={demoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-indigo-500"
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.1 + 0.3,
                duration: 0.4,
                ease: EXPO_OUT,
              }}
            >
              <span>View project</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                →
              </motion.span>
            </motion.a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}