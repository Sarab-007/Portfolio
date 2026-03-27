"use client";

import Container from "@/src/components/layout/container";
import { navConfig } from "@/src/config/navigation";
import { siteConfig } from "@/src/config/site";
import { motion } from "framer-motion";
import Reveal from "@/src/components/motion/reveal";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

function AnimatedParagraph({ text, delay = 0 }: { text: string; delay?: number }) {
  const lines = text.split(". "); // split into sentences (much lighter)

  return (
    <motion.div
      className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-300 space-y-2"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.12,
            delayChildren: delay,
          },
        },
      }}
    >
      {lines.map((line, i) => (
        <motion.p
          key={i}
          variants={{
            hidden: { opacity: 0, y: 16 },
            show: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
        >
          {line}.
        </motion.p>
      ))}
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <section id={navConfig.sections.about.id} className="pt-16 min-h-[60vh]">
      <Container>
        <Reveal>
          <div className="rounded-3xl border border-zinc-200/60 bg-white/60 p-8 backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-950/40">
            <div className="flex items-center gap-3 mb-1">
              <h2 className="text-xl font-semibold">Professional Summary</h2>
              <motion.div
                className="h-px flex-1 bg-gradient-to-r from-indigo-400/50 to-transparent"
                initial={{ scaleX: 0, transformOrigin: "left" }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EXPO_OUT, delay: 0.2 }}
              />
            </div>
            <AnimatedParagraph text={siteConfig.summaryLong} delay={0.15} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}