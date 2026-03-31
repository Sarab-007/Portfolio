import type { Variants } from "framer-motion";

/** Expo-out easing — smooth deceleration curve used across all animations. */
export const EXPO_OUT = [0.16, 1, 0.3, 1] as const;

/** Standard reveal variant — fade + slide up. */
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EXPO_OUT },
  },
};

/** Container variant that staggers its children. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};
