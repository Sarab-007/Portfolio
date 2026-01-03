// scroll.ts
import type { SectionId } from "@/src/config/navigation";
import { navConfig } from "@/src/config/navigation";

export const SECTIONS = Object.values(navConfig.sections).map(
  (s) => s.id
) as SectionId[];

export function scrollToId(id: SectionId) {
  const el = document.getElementById(id);
  if (!el) return;

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  // Let CSS handle the navbar offset via scroll-margin-top on sections
  el.scrollIntoView({
    behavior: prefersReduced ? "auto" : "smooth",
    block: "start",
  });

  // Optional: keep URL in sync (nice UX, doesn't jump)
  history.replaceState(null, "", id === "home" ? "#" : `#${id}`);
}
