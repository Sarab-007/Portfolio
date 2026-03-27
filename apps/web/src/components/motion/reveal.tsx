"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

const directionMap = {
  up:    { y: 24, x: 0 },
  down:  { y: -24, x: 0 },
  left:  { x: 24, y: 0 },
  right: { x: -24, y: 0 },
};

interface RevealProps {
  children: ReactNode;
  delay?: number;
  direction?: Direction;
  duration?: number;
  className?: string;
  once?: boolean;
}

export default function Reveal({
  children,
  delay = 0,
  direction = "up",
  duration = 0.5,
  className,
  once = true,
}: RevealProps) {
  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...directionMap[direction],
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // smoother than expo
      },
    },
  };

  return (
    <motion.div
      className={`transform-gpu will-change-transform ${className || ""}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-100px" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}