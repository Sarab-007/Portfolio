"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
    ScrollTrigger.config({ ignoreMobileResize: true });
    registered = true;
  }

  return { gsap, ScrollTrigger };
}

export { gsap, ScrollTrigger, useGSAP };
