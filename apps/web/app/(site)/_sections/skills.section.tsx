import Reveal from "@/src/components/motion/reveal";
import Container from "@/src/components/layout/container";
import { navConfig } from "@/src/config/navigation";
import { siteConfig } from "@/src/config/site";

function Group({
  title,
  items,
}: {
  title: string;
  items: readonly { name: string; icon: string }[];
}) {
  return (
    <div className="rounded-2xl border border-zinc-200/60 bg-white/55 p-5 backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/35">
      <div className="text-sm font-medium">{title}</div>

      <div className="mt-4 grid grid-cols-4 gap-4 sm:grid-cols-5 md:grid-cols-6">
        {items.map((item) => (
          <div
            key={item.name}
            title={item.name}
            className="group flex items-center justify-center rounded-xl
              border border-zinc-200/60 bg-white/60 p-3 shadow-sm backdrop-blur
              transition hover:scale-105 hover:shadow-md
              dark:border-zinc-800/60 dark:bg-zinc-950/30"
          >
            <img
              src={item.icon}
              alt={item.name}
              className="h-6 w-6 opacity-80 transition group-hover:opacity-100 dark:invert"
            />
          </div>
        ))}
      </div>
    </div>
  );
}


export default function SkillsSection() {
  return (
    <section id={navConfig.sections.skills.id} className="pt-16 min-h-[60vh]">
      <Container>
        <Reveal>
          <div className="rounded-3xl border border-zinc-200/60 bg-white/55 p-8 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/40">
            <h2 className="text-xl font-semibold">Skills</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Group title="Languages" items={siteConfig.skills.languages} />
              <Group title="Frameworks" items={siteConfig.skills.frameworks} />
              <Group title="Tools & Tech" items={siteConfig.skills.tools} />
              <Group title="Databases" items={siteConfig.skills.databases} />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
