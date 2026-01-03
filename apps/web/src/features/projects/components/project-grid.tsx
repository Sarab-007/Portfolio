import { projects } from "../data/projects.data";
import ProjectCard from "./project-card";
import { Stagger } from "@/src/components/motion/stagger";

export default function ProjectGrid() {
  return (
    <Stagger>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </Stagger>
  );
}
