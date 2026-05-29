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
        "relative h-[230px] overflow-hidden rounded-lg border bg-black/40 p-3 md:h-[250px]",
        accent.border,
        accent.shadow,
      )}
      aria-label={`${project.title} visual system preview`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:38px_38px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />

      <div className="relative z-10 grid h-full grid-rows-[auto_auto_minmax(0,1fr)_auto] gap-3">
        <div className="flex min-h-3 items-center justify-between gap-3 text-[9px] uppercase leading-none text-white/50">
          <span className="truncate">{project.visual.signal}</span>
          <span className="shrink-0">{project.period}</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {project.metrics.map((metric, index) => (
            <div
              key={`${project.id}-${metric.label}`}
              className="flex min-h-[58px] flex-col justify-center rounded-lg border border-white/10 bg-white/[0.04] p-2.5"
              style={{ animationDelay: `${index * 140}ms` }}
            >
              <div className={cn("text-lg font-semibold leading-none", accent.text)}>
                {metric.value}
              </div>
              <div className="mt-1.5 text-[9px] uppercase leading-3 text-white/[0.45]">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        <div className="relative min-h-0 overflow-hidden rounded-lg border border-white/10 bg-black/[0.35]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_50%,rgba(255,255,255,0.08),transparent_22%),radial-gradient(circle_at_76%_42%,rgba(255,255,255,0.06),transparent_18%)]" />
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
          {Array.from({ length: 5 }).map((_, index) => (
            <span
              key={`node-${index}`}
              className={cn(
                "project-signal-node absolute h-1.5 w-1.5 rounded-full",
                accent.bg,
              )}
              style={{
                left: `${18 + index * 16}%`,
                top: `${32 + ((index * 19) % 38)}%`,
                animationDelay: `${index * 180}ms`,
              }}
            />
          ))}
        </div>

        <div className="flex min-h-5 flex-wrap items-start gap-1.5">
          {project.stack.slice(0, 5).map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] leading-none text-white/60"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
