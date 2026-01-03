import Reveal from "@/src/components/motion/reveal";
import Container from "@/src/components/layout/container";
import { siteConfig } from "@/src/config/site";
import { navConfig } from "@/src/config/navigation";
import Image from "next/image";
import TypewriterRoles from "@/src/components/motion/typewriter-roles";


export default function HeroSection() {
  return (
   <section id={navConfig.sections.home.id} className="pt-14 md:pt-20 min-h-screen">
      <Container>
        <Reveal>
          <div className="grid items-center gap-10 rounded-3xl border border-zinc-200/60 bg-white/55 p-8 shadow-sm backdrop-blur dark:border-zinc-800/60 dark:bg-zinc-950/40 md:grid-cols-[1.2fr_0.8fr] md:p-12">
            <div>
              {/* <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {siteConfig.location} • {siteConfig.availability}
              </p> */}
              <h1 className="mt-3 text-4xl font-semibold tracking-tight md:text-6xl">
                Hi , I am Sarab
              </h1>
           <p className="mt-2 text-base md:text-lg text-zinc-600 dark:text-zinc-300">
              <span className="text-zinc-500 dark:text-zinc-400">
                
              </span>

              <TypewriterRoles
                roles={[
                "Creating Scalable Web Apps",
                "Building Intuitive Interfaces",
                "Turning Ideas into Code",
                "Crafting Seamless Experiences",
                "Optimizing Performance",
                "Solving Real-World Problems",
              ]}
                className="text-3xl font-bold text-red-600"
              />
            </p>
              <p className="mt-5 max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                {siteConfig.summary}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={`#${navConfig.sections.projects.id}`}
                  className="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:opacity-90 dark:bg-white dark:text-zinc-900"
                >
                  View Projects
                </a>
                <a
                  href="/resume.pdf"
                  className="rounded-2xl border border-zinc-200/70 bg-white/60 px-5 py-3 text-sm font-medium shadow-sm backdrop-blur transition hover:bg-white dark:border-zinc-800/70 dark:bg-zinc-950/40 dark:hover:bg-zinc-950/60"
                >
                  Download Resume
                </a>
                <a
                  href={`#${navConfig.sections.contact.id}`}
                  className="rounded-2xl border border-zinc-200/70 bg-white/60 px-5 py-3 text-sm font-medium shadow-sm backdrop-blur transition hover:bg-white dark:border-zinc-800/70 dark:bg-zinc-950/40 dark:hover:bg-zinc-950/60"
                >
                  Contact
                </a>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[320px]">
                <Image
                  src="/avatar.png"
                  alt={`${siteConfig.name} headshot`}
                  width={1000}
                  height={1000}
                  priority
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
        </Reveal>
      </Container>
    </section>
  );
}
