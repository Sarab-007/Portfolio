"use client";

import Container from "@/src/components/layout/container";
import { navConfig } from "@/src/config/navigation";
import { siteConfig } from "@/src/config/site";
import { motion } from "framer-motion";
import Reveal from "@/src/components/motion/reveal";
import SectionHeader from "@/src/components/layout/section-header";

export default function AboutSection() {
  const sentences = siteConfig.summaryLong.split(". ");

  return (
    <section id={navConfig.sections.about.id} className="pt-16 min-h-[60vh]">
      <Container>
        <Reveal>
          <div className="rounded-3xl border border-zinc-200/60 bg-white/60 p-6 backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-950/40 md:p-8">
            <SectionHeader title="Professional Summary" />

            <motion.div
              className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-300 space-y-2"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: {},
                show: {
                  transition: { staggerChildren: 0.12, delayChildren: 0.15 },
                },
              }}
            >
              {sentences.map((line, i) => (
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
          </div>
        </Reveal>
      </Container>
    </section>
  );
}