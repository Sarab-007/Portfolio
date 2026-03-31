"use client";

import Container from "@/src/components/layout/container";
import { navConfig } from "@/src/config/navigation";
import { ContactForm } from "@/features/contact";
import { motion } from "framer-motion";
import SectionHeader from "@/src/components/layout/section-header";
import { EXPO_OUT } from "@/src/lib/motion";

export default function ContactSection() {
  return (
    <section
      id={navConfig.sections.contact.id}
      className="pt-16 pb-20 min-h-[50vh]"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.75, ease: EXPO_OUT }}
        >
          <div className="rounded-3xl border border-zinc-200/60 bg-white/60 p-6 backdrop-blur-sm dark:border-zinc-800/60 dark:bg-zinc-950/40 md:p-8">
            <SectionHeader title="Contact" />

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