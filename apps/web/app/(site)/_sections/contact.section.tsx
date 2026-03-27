"use client";

import Container from "@/src/components/layout/container";
import { navConfig } from "@/src/config/navigation";
import { ContactForm } from "@/features/contact";
import { motion } from "framer-motion";

const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

export default function ContactSection() {
  return (
    <section id={navConfig.sections.contact.id} className="pt-16 pb-20 min-h-[50vh]">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: EXPO_OUT }}
        >
          <div className="rounded-3xl border border-zinc-200/60 bg-white/60 p-8 backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-950/40">
            <div className="flex items-center gap-3 mb-6">
              <h2 className="text-xl font-semibold">Contact</h2>
              <motion.div
                className="h-px flex-1 bg-gradient-to-r from-indigo-400/50 to-transparent"
                initial={{ scaleX: 0, transformOrigin: "left" }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EXPO_OUT, delay: 0.2 }}
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: EXPO_OUT, delay: 0.2 }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}