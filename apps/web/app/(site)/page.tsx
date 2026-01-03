import HeroSection from "./_sections/hero.section";
import AboutSection from "./_sections/about.section";
import ProjectsSection from "./_sections/projects.section";
import SkillsSection from "./_sections/skills.section";
import ExperienceSection from "./_sections/experience.section";
import ContactSection from "./_sections/contact.section";
import EducationSection from "./_sections/education.section";

export default function Page() {
  return (
    <main className="mx-auto max-w-6xl px-4">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ContactSection />
    </main>
  );
}
