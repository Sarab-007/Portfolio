"use client";

import { useRef } from "react";
import { Linkedin, Mail, Phone } from "lucide-react";
import MagneticLink from "@/src/components/ui/magnetic-link";
import { ContactForm } from "@/features/contact";
import { navConfig } from "@/src/config/navigation";
import { siteConfig } from "@/src/config/site";
import { registerGsap, useGSAP } from "@/src/lib/gsap";
import { usePrefersReducedMotion } from "@/src/hooks/use-prefers-reduced-motion";

export default function ContactSection() {
  const rootRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (prefersReducedMotion) return;
      const { gsap } = registerGsap();

      const ctx = gsap.context(() => {
        gsap.from(".contact-reveal", {
          y: 34,
          autoAlpha: 0,
          duration: 0.78,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 70%",
          },
        });
      }, rootRef);

      return () => ctx.revert();
    },
    { dependencies: [prefersReducedMotion], scope: rootRef },
  );

  return (
    <section
      id={navConfig.sections.contact.id}
      ref={rootRef}
      className="section-frame relative overflow-hidden py-28 md:py-36"
      aria-labelledby="contact-title"
    >
      <div className="section-shell grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
        <div>
          <p className="contact-reveal scene-label">contact</p>
          <h2
            id="contact-title"
            className="contact-reveal mt-6 text-balance text-5xl font-semibold leading-tight text-white md:text-7xl"
          >
            Let us build the next useful system.
          </h2>
          <p className="contact-reveal mt-7 max-w-xl text-base leading-8 text-[rgb(var(--muted))]">
            Reach out for full-stack product work, frontend architecture,
            dashboard systems, integration platforms, or performance-focused UI
            rebuilds.
          </p>

          <div className="contact-reveal mt-8 flex flex-wrap gap-3">
            <MagneticLink
              href={`mailto:${siteConfig.email}`}
              variant="primary"
              icon={<Mail className="h-4 w-4" aria-hidden="true" />}
              cursorLabel="email"
            >
              Email Me
            </MagneticLink>
            <MagneticLink
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              variant="secondary"
              icon={<Linkedin className="h-4 w-4" aria-hidden="true" />}
              cursorLabel="linkedin"
            >
              LinkedIn
            </MagneticLink>
          </div>

          <div className="contact-reveal mt-10 grid gap-3 text-sm text-white/[0.62]">
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex items-center gap-3"
              data-cursor="email"
            >
              <Mail className="h-4 w-4 text-[rgb(var(--accent))]" />
              {siteConfig.email}
            </a>
            <a
              href={`tel:${siteConfig.phone.replaceAll(" ", "")}`}
              className="inline-flex items-center gap-3"
              data-cursor="call"
            >
              <Phone className="h-4 w-4 text-[rgb(var(--cyan))]" />
              {siteConfig.phone}
            </a>
          </div>
        </div>

        <div className="contact-reveal rounded-lg border border-white/10 bg-white/[0.035] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.16)] md:p-6">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
