import Reveal from "@/src/components/motion/reveal";
import Container from "@/src/components/layout/container";
import { navConfig } from "@/src/config/navigation";
import { siteConfig } from "@/src/config/site";

export default function AboutSection() {
  return (
    <section id={navConfig.sections.about.id} className="pt-16 min-h-[60vh]">
      <Container>
        <Reveal>
          <div className="rounded-3xl border border-zinc-200/60 bg-white/55 p-8 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/40">
            <h2 className="text-xl font-semibold">Professional Summary</h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
              {siteConfig.summaryLong}
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
