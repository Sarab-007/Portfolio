"use client";

import { motion } from "framer-motion";
import { EXPO_OUT } from "@/src/lib/motion";

interface SectionHeaderProps {
  title: string;
}

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <motion.div
        className="h-px flex-1 bg-gradient-to-r from-indigo-400/50 to-transparent"
        initial={{ scaleX: 0, transformOrigin: "left" }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EXPO_OUT, delay: 0.2 }}
      />
    </div>
  );
}
