import { Github, Linkedin, Mail } from "lucide-react";
import { siteConfig } from "@/src/config/site";

const COPYRIGHT_YEAR = "2026";

const links = [
  { href: siteConfig.links.github, label: "GitHub", Icon: Github },
  { href: siteConfig.links.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: `mailto:${siteConfig.email}`, label: "Email", Icon: Mail },
] as const;

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10 text-sm text-white/[0.52]">
      <div className="section-shell flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-white">{siteConfig.name}</p>
          <p className="mt-1">{siteConfig.tagline}</p>
        </div>

        <div className="flex items-center gap-2">
          {links.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white"
              data-cursor={label.toLowerCase()}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
            </a>
          ))}
        </div>

        <p>
          (c) {COPYRIGHT_YEAR} {siteConfig.shortName}. Built with Next.js.
        </p>
      </div>
    </footer>
  );
}
