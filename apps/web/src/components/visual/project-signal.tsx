import type { Project } from "@/features/projects/types/project.types";
import { cn } from "@/src/lib/cn";

type ProjectSignalProps = {
  project: Project;
};

const accentClasses = {
  amber: {
    border: "border-amber-300/35",
    text: "text-amber-200",
    bg: "bg-amber-300",
    shadow: "shadow-[0_0_28px_rgba(245,158,11,0.22)]",
  },
  cyan: {
    border: "border-cyan-300/35",
    text: "text-cyan-200",
    bg: "bg-cyan-300",
    shadow: "shadow-[0_0_28px_rgba(34,211,238,0.2)]",
  },
  emerald: {
    border: "border-emerald-300/35",
    text: "text-emerald-200",
    bg: "bg-emerald-300",
    shadow: "shadow-[0_0_28px_rgba(52,211,153,0.2)]",
  },
  rose: {
    border: "border-rose-300/35",
    text: "text-rose-200",
    bg: "bg-rose-300",
    shadow: "shadow-[0_0_28px_rgba(251,113,133,0.18)]",
  },
};

export default function ProjectSignal({ project }: ProjectSignalProps) {
  const accent = accentClasses[project.visual.accent];

  return (
    <div
      className={cn(
        "relative min-h-[280px] overflow-hidden rounded-lg border bg-black/40 p-4",
        accent.border,
        accent.shadow,
      )}
      aria-label={`${project.title} visual system preview`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:38px_38px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      <div className="relative z-10 flex items-center justify-between text-[10px] uppercase text-white/50">
        <span>{project.visual.signal}</span>
        <span>{project.period}</span>
      </div>

      <div className="relative z-10 mt-10 grid grid-cols-3 gap-3">
        {project.metrics.map((metric, index) => (
          <div
            key={`${project.id}-${metric.label}`}
            className="rounded-lg border border-white/10 bg-white/[0.04] p-3"
            style={{ animationDelay: `${index * 140}ms` }}
          >
            <div className={cn("text-xl font-semibold", accent.text)}>
              {metric.value}
            </div>
            <div className="mt-1 text-[10px] uppercase leading-4 text-white/[0.45]">
              {metric.label}
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 mt-8 h-24 overflow-hidden rounded-lg border border-white/10 bg-black/[0.35]">
        {Array.from({ length: 9 }).map((_, index) => (
          <span
            key={index}
            className={cn(
              "project-signal-line absolute left-4 h-px origin-left rounded-full opacity-60",
              accent.bg,
            )}
            style={{
              top: `${12 + index * 10}%`,
              width: `${36 + ((index * 17) % 48)}%`,
              animationDelay: `${index * 90}ms`,
            }}
          />
        ))}
        <span
          className={cn(
            "project-signal-scan absolute inset-y-0 left-0 w-16 opacity-40",
            accent.bg,
          )}
        />
      </div>

      <div className="relative z-10 mt-5 flex flex-wrap gap-2">
        {project.stack.slice(0, 5).map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] text-white/60"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
