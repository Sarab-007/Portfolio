"use client";

import Container from "@/src/components/layout/container";
import { navConfig } from "@/src/config/navigation";
import { siteConfig } from "@/src/config/site";
import { motion } from "framer-motion";
import Reveal from "@/src/components/motion/reveal";
import SectionHeader from "@/src/components/layout/section-header";
import { EXPO_OUT } from "@/src/lib/motion";

export default function ExperienceSection() {
  return (
    <section
      id={navConfig.sections.experience.id}
      className="pt-16 min-h-[60vh]"
    >
      <Container>
        <Reveal>
          <div className="rounded-3xl border border-zinc-200/60 bg-white/60 p-6 backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-950/40 md:p-8">
            <SectionHeader title="Experience" />

            <div className="space-y-4">
              {siteConfig.experience.map((e, i) => (
                <motion.div
                  key={`${e.company}-${e.title}`}
                  className="relative rounded-2xl border border-zinc-200/60 bg-white/60 p-5 backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/35"
                  initial={{ opacity: 0, x: -24, scale: 0.98 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.6,
                    ease: EXPO_OUT,
                    delay: i * 0.1,
                  }}
                  whileHover={{
                    x: 4,
                    boxShadow: "0 8px 32px -8px rgba(0,0,0,0.15)",
                    borderColor: "rgba(99,102,241,0.25)",
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 28,
                    },
                  }}
                >
                  {/* Left accent bar */}
                  <motion.div
                    className="absolute left-0 top-4 bottom-4 w-[2px] rounded-full bg-gradient-to-b from-indigo-500/60 to-purple-500/30"
                    initial={{ scaleY: 0, transformOrigin: "top" }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      ease: EXPO_OUT,
                      delay: i * 0.1 + 0.2,
                    }}
                  />

                  <div className="pl-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="font-medium">{e.title}</div>
                      <motion.div
                        className="rounded-full border border-zinc-200/60 bg-zinc-100/60 px-2 py-0.5 text-xs text-zinc-500 dark:border-zinc-800/60 dark:bg-zinc-900/50 dark:text-zinc-400"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: i * 0.1 + 0.3,
                          ease: [0.34, 1.56, 0.64, 1],
                        }}
                      >
                        {e.period}
                      </motion.div>
                    </div>

                    <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                      {e.company} • {e.location}
                    </div>

                    <motion.ul
                      className="mt-3 space-y-1 pl-4 text-sm text-zinc-600 dark:text-zinc-300"
                      initial="hidden"
                      whileInView="show"
                      viewport={{ once: true }}
                      variants={{
                        hidden: {},
                        show: {
                          transition: {
                            staggerChildren: 0.06,
                            delayChildren: i * 0.1 + 0.3,
                          },
                        },
                      }}
                    >
                      {e.highlights.map((h) => (
                        <motion.li
                          key={h}
                          className="relative pl-3 before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-indigo-400"
                          variants={{
                            hidden: { opacity: 0, x: -8 },
                            show: {
                              opacity: 1,
                              x: 0,
                              transition: { duration: 0.4, ease: EXPO_OUT },
                            },
                          }}
                        >
                          {h}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}