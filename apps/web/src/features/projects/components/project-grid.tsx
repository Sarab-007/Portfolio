"use client";

import { projects } from "../data/projects.data";
import ProjectCard from "./project-card";
import { motion } from "framer-motion";

export default function ProjectGrid() {
  return (
    <motion.div
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: 0.1, delayChildren: 0.05 },
        },
      }}
    >
      {projects.map((p, i) => (
        <ProjectCard key={p.id} project={p} index={i} />
      ))}
    </motion.div>
  );
}