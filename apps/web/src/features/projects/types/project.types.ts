export type ProjectMetric = {
  value: string;
  label: string;
};

export type ProjectVisual = {
  signal: string;
  accent: "amber" | "cyan" | "emerald" | "rose";
};

export type Project = {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  role: string;
  period: string;
  stack: string[];
  highlights: string[];
  metrics: ProjectMetric[];
  visual: ProjectVisual;
  links?: {
    demo?: string;
    github?: string;
  };
};
