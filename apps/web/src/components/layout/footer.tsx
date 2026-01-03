import { siteConfig } from "@/src/config/site";
import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-200/60 py-10 text-sm text-zinc-500 dark:border-zinc-800/60 dark:text-zinc-400">
      <div className="mx-auto max-w-6xl px-4 flex flex-col items-center gap-4">
        {/* Social icons */}
        <div className="flex items-center gap-4">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="transition hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            <Github className="h-5 w-5" />
          </a>

          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="transition hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center">
          © {new Date().getFullYear()} {siteConfig.name}. Built with ❤️, caffeine ☕ and Next Js.
        </div>
      </div>
    </footer>
  );
}
