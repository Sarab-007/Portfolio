"use client";

import { siteConfig } from "@/src/config/site";
import { Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { EXPO_OUT } from "@/src/lib/motion";

const SOCIAL_LINKS = [
  { href: siteConfig.links.github, label: "GitHub", Icon: Github },
  { href: siteConfig.links.linkedin, label: "LinkedIn", Icon: Linkedin },
] as const;

export default function Footer() {
  return (
    <motion.footer
      className="mt-16 border-t border-zinc-200/60 py-10 text-sm text-zinc-500 dark:border-zinc-800/60 dark:text-zinc-400"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, ease: EXPO_OUT }}
    >
      <div className="mx-auto max-w-6xl px-4 flex flex-col items-center gap-4">
        {/* Animated gradient divider */}
        <motion.div
          className="h-px w-full max-w-xs rounded-full bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EXPO_OUT, delay: 0.2 }}
        />

        {/* Social icons — staggered */}
        <motion.div
          className="flex items-center gap-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.1, delayChildren: 0.15 },
            },
          }}
        >
          {SOCIAL_LINKS.map(({ href, label, Icon }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group relative flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200/60 bg-white/60 backdrop-blur transition dark:border-zinc-800/60 dark:bg-zinc-900/40"
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.5, ease: EXPO_OUT },
                },
              }}
              whileHover={{ y: -3, scale: 1.08 }}
              whileTap={{ scale: 0.93 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Icon className="h-4 w-4 transition group-hover:text-zinc-900 dark:group-hover:text-zinc-100" />

              {/* Tooltip */}
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-zinc-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100 dark:bg-zinc-100 dark:text-zinc-900">
                {label}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
        >
          © {new Date().getFullYear()}{" "}
          <motion.span
            className="font-medium text-zinc-700 dark:text-zinc-300"
            whileHover={{ color: "#6366f1" }}
            transition={{ duration: 0.2 }}
          >
            {siteConfig.name}
          </motion.span>
          . Built with{" "}
          <motion.span
            className="inline-block"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            ❤️
          </motion.span>
          , caffeine{" "}
          <motion.span
            className="inline-block"
            animate={{ y: [0, -2, 0], rotate: [0, -2, 2, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            ☕
          </motion.span>{" "}
          <motion.span className="inline-flex items-center gap-1">
            and
            <motion.img
              src="https://cdn.simpleicons.org/nextdotjs"
              alt="Next.js"
              className="h-4 w-4 dark:invert"
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.span>
        </motion.div>
      </div>
    </motion.footer>
  );
}
