"use client";

import Container from "@/src/components/layout/container";
import { navConfig } from "@/src/config/navigation";
import { siteConfig } from "@/src/config/site";
import { motion } from "framer-motion";
import Reveal from "@/src/components/motion/reveal";
import SectionHeader from "@/src/components/layout/section-header";
import { EXPO_OUT } from "@/src/lib/motion";

/* ── Single skill icon with tooltip ── */
function SkillIcon({
  item,
  index,
}: {
  item: { name: string; icon: string };
  index: number;
}) {
  return (
    <motion.div
      title={item.name}
      className="group relative flex items-center justify-center rounded-xl border border-zinc-200/60 bg-white/60 p-3 backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-950/30"
      variants={{
        hidden: { opacity: 0, y: 40 },
        show: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: {
            duration: 0.45,
            ease: [0.34, 1.56, 0.64, 1],
            delay: index * 0.035,
          },
        },
      }}
      whileHover={{
        scale: 1.18,
        y: -4,
        boxShadow: "0 8px 24px -4px rgba(99,102,241,0.25)",
        borderColor: "rgba(99,102,241,0.4)",
        transition: { type: "spring", stiffness: 500, damping: 22 },
      }}
      whileTap={{ scale: 0.92 }}
    >
      <img
        src={item.icon}
        alt={item.name}
        loading="lazy"
        className="h-6 w-6 opacity-80 transition group-hover:opacity-100 dark:invert"
      />

      {/* Tooltip */}
      <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-0.5 text-[10px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-zinc-100 dark:text-zinc-900">
        {item.name}
      </span>
    </motion.div>
  );
}

/* ── Skill group card ── */
function SkillGroup({
  title,
  items,
  delay = 0,
}: {
  title: string;
  items: readonly { name: string; icon: string }[];
  delay?: number;
}) {
  return (
    <motion.div
      className="rounded-2xl border border-zinc-200/60 bg-white/60 p-5 backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/35"
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, ease: EXPO_OUT, delay }}
      whileHover={{
        boxShadow: "0 12px 40px -8px rgba(0,0,0,0.12)",
        transition: { duration: 0.3 },
      }}
    >
      {/* Group title with animated left accent */}
      <div className="flex items-center gap-2">
        <motion.div
          className="h-3.5 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-purple-500"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: EXPO_OUT, delay: delay + 0.2 }}
        />
        <span className="text-sm font-medium">{title}</span>
      </div>

      {/* Icons grid — staggered */}
      <motion.div
        className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-40px" }}
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.02,
              delayChildren: delay + 0.15,
            },
          },
        }}
      >
        {items.map((item, i) => (
          <SkillIcon key={item.name} item={item} index={i} />
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ── Skills groups data ── */
const SKILL_GROUPS = [
  { title: "Languages", items: siteConfig.skills.languages, delay: 0 },
  { title: "Frameworks", items: siteConfig.skills.frameworks, delay: 0.06 },
  { title: "Tools & Tech", items: siteConfig.skills.tools, delay: 0.12 },
  { title: "Databases", items: siteConfig.skills.databases, delay: 0.18 },
] as const;

export default function SkillsSection() {
  return (
    <section id={navConfig.sections.skills.id} className="pt-16 min-h-[60vh]">
      <Container>
        <Reveal>
          <div className="rounded-3xl border border-zinc-200/60 bg-white/60 p-6 backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-950/40 md:p-8">
            <SectionHeader title="Skills" />

            <div className="grid gap-4 md:grid-cols-2">
              {SKILL_GROUPS.map((g) => (
                <SkillGroup key={g.title} {...g} />
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}