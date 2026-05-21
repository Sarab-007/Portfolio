export const navConfig = {
  sections: {
    home: { id: "home", label: "Intro" },
    about: { id: "about", label: "Story" },
    projects: { id: "projects", label: "Work" },
    skills: { id: "skills", label: "Stack" },
    experience: { id: "experience", label: "Timeline" },
    education: { id: "education", label: "Degree" },
    contact: { id: "contact", label: "Contact" },
  },
} as const;

export type SectionId = (typeof navConfig.sections)[keyof typeof navConfig.sections]["id"];
