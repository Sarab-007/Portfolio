export const navConfig = {
  sections: {
    home: { id: "home", label: "Home" },
    about: { id: "about", label: "Summary" },
    projects: { id: "projects", label: "Projects" },
    skills: { id: "skills", label: "Skills" },
    experience: { id: "experience", label: "Experience" },
    education: {id: "education", label: "Education"},
    contact: { id: "contact", label: "Contact" },
  },
} as const;

export type SectionId = (typeof navConfig.sections)[keyof typeof navConfig.sections]["id"];
