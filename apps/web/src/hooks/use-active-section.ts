// use-active-section.ts
"use client";

import { useEffect, useRef, useState } from "react";
import type { SectionId } from "@/src/config/navigation";

export function useActiveSection(ids: readonly SectionId[]) {
  const [active, setActive] = useState<SectionId>(ids[0] ?? "home");
  const ratiosRef = useRef<Map<SectionId, number>>(new Map());
  const activeRef = useRef<SectionId>(active);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    // Initialize ratios
    ratiosRef.current = new Map(ids.map((id) => [id, 0]));

    const pickActive = () => {
      // Always Home near top
      if (window.scrollY < 80) {
        if (activeRef.current !== "home") setActive("home");
        return;
      }

      // Pick highest ratio across ALL sections (from the map)
      let bestId: SectionId = activeRef.current;
      let bestRatio = -1;

      for (const id of ids) {
        const r = ratiosRef.current.get(id) ?? 0;
        if (r > bestRatio) {
          bestRatio = r;
          bestId = id;
        }
      }

      // Fallback if nothing intersecting (fast scroll / tiny sections)
      if (bestRatio <= 0) {
        // Choose the closest section whose top is above the "navbar line"
        const y = window.scrollY + 110; // navbar-ish line
        let closest: SectionId = "home";
        let closestDist = Number.POSITIVE_INFINITY;

        for (const el of els) {
          const top = el.offsetTop;
          const dist = Math.abs(top - y);
          if (dist < closestDist) {
            closestDist = dist;
            closest = el.id as SectionId;
          }
        }

        if (activeRef.current !== closest) setActive(closest);
        return;
      }

      if (activeRef.current !== bestId) setActive(bestId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const id = (e.target as HTMLElement).id as SectionId;
          ratiosRef.current.set(id, e.isIntersecting ? e.intersectionRatio : 0);
        }
        // Compute from all ratios (not just changed entries)
        pickActive();
      },
      {
        // More granular = better for short sections
        threshold: [0, 0.05, 0.1, 0.2, 0.35, 0.5, 0.65, 0.8],
        // Top margin accounts for sticky navbar, bottom encourages earlier switch
        rootMargin: "-20% 0px -55% 0px",
      }
    );

    els.forEach((el) => observer.observe(el));

    // Also update on scroll/resize (covers edge cases)
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(pickActive);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // Initial pick
    pickActive();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [ids]);

  return active;
}
