"use client";
import type { Project } from "../types/project.types";
import { motion } from "framer-motion";
import { StaggerItem } from "@/src/components/motion/stagger";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <StaggerItem>
      <motion.article
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="group rounded-3xl border border-zinc-200/60 bg-white/55 p-6 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/40"
      >
        <h3 className="text-base font-semibold">{project.title}</h3>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">{project.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-zinc-200/70 bg-white/60 px-3 py-1 text-xs text-zinc-700 shadow-sm backdrop-blur dark:border-zinc-800/70 dark:bg-zinc-950/30 dark:text-zinc-200"
            >
              {s}
            </span>
          ))}
        </div>

        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>

        {project.links?.demo && (
          <div className="mt-5 text-sm">
            <a className="underline underline-offset-4 hover:opacity-80" href={project.links.demo}>
              View Project
            </a>
          </div>
        )}
      </motion.article>
    </StaggerItem>
  );
}
