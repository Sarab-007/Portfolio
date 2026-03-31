export type Project = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  highlights: string[];
  image?: string;
  links?: {
    demo?: string;
    github?: string;
  };
};
