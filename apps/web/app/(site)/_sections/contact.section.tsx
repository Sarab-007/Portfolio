import Reveal from "@/src/components/motion/reveal";
import Container from "@/src/components/layout/container";
import { navConfig } from "@/src/config/navigation";
import { ContactForm } from "@/features/contact";
import { siteConfig } from "@/src/config/site";

export default function ContactSection() {
  return (
    <section id={navConfig.sections.contact.id} className="pt-16 pb-20 min-h-[50vh]">
      <Container>
        <Reveal>
          <div className="rounded-3xl border border-zinc-200/60 bg-white/55 p-8 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/40">
            <h2 className="text-xl font-semibold">Contact</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
