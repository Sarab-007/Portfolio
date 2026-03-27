// scroll.ts
import type { SectionId } from "@/src/config/navigation";
import { navConfig } from "@/src/config/navigation";

export const SECTIONS = Object.values(navConfig.sections).map(
  (s) => s.id
) as SectionId[];

export const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;

  window.scrollTo({
    top: el.offsetTop - 80,
    behavior: "smooth",
  });
};
