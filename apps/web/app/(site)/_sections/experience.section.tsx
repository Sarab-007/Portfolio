import Reveal from "@/src/components/motion/reveal";
import Container from "@/src/components/layout/container";
import { navConfig } from "@/src/config/navigation";
import { siteConfig } from "@/src/config/site";

export default function ExperienceSection() {
  return (
  <section id={navConfig.sections.experience.id} className="pt-16 min-h-[60vh]">
      <Container>
        <Reveal>
          <div className="rounded-3xl border border-zinc-200/60 bg-white/55 p-8 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/40">
            <h2 className="text-xl font-semibold">Experience</h2>
            <div className="mt-5 space-y-4">
              {siteConfig.experience.map((e) => (
                <div
                  key={`${e.company}-${e.title}`}
                  className="rounded-2xl border border-zinc-200/60 bg-white/55 p-5 backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/35"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-medium">{e.title}</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">{e.period}</div>
                  </div>
                  <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                    {e.company} • {e.location}
                  </div>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
                    {e.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
