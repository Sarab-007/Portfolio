import Reveal from "@/src/components/motion/reveal";
import Container from "@/src/components/layout/container";
import { navConfig } from "@/src/config/navigation";
import { ProjectGrid } from "@/features/projects";

export default function ProjectsSection() {
  return (
    <section id={navConfig.sections.projects.id} className="pt-16 min-h-[60vh]">
      <Container>
        <Reveal>
          <div className="text-center">
              <h2 className="text-xl font-semibold">Enterprise Projects</h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                Selected work across IoT platforms, enterprise web apps, and integrations.
              </p>
            </div>
        </Reveal>
        <div className="mt-6">
          <ProjectGrid />
        </div>
      </Container>
    </section>
  );
}
