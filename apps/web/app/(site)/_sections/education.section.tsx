import Reveal from "@/src/components/motion/reveal";
import Container from "@/src/components/layout/container";
import { navConfig } from "@/src/config/navigation";
import { siteConfig } from "@/src/config/site";

export default function EducationSection() {
  return (
  <section id={navConfig.sections.education.id} className="pt-16 min-h-[60vh]">
      <Container>
        <Reveal>
          <div className="rounded-3xl border border-zinc-200/60 bg-white/55 p-8 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/40">
            <h2 className="text-xl font-semibold">Education</h2>

            <div className="mt-5 space-y-4">
              {siteConfig.education.map((e) => (
                <div
                  key={`${e.institution}-${e.degree}`}
                  className="rounded-2xl border border-zinc-200/60 bg-white/55 p-5 backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/35"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-medium">{e.degree}</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      {e.period}
                    </div>
                  </div>

                  <div className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
                    {e.institution} • {e.location}
                  </div>

                  {e.highlights?.length > 0 && (
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-zinc-600 dark:text-zinc-300">
                      {e.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
