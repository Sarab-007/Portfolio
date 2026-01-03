"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  roles: string[];
  className?: string;
  typeSpeedMs?: number;   // typing speed
  deleteSpeedMs?: number; // deleting speed
  holdMs?: number;        // pause when word fully typed
  startDelayMs?: number;  // delay before first type
};

export default function TypewriterRoles({
  roles,
  className,
  typeSpeedMs = 45,
  deleteSpeedMs = 35,
  holdMs = 900,
  startDelayMs = 300,
}: Props) {
  const safeRoles = useMemo(() => roles.filter(Boolean), [roles]);
  const [i, setI] = useState(0);
  const [txt, setTxt] = useState("");
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  useEffect(() => {
    if (!safeRoles.length) return;

    const full = safeRoles[i % safeRoles.length];

    let t: ReturnType<typeof setTimeout>;

    // initial delay (only when empty and typing)
    if (txt.length === 0 && phase === "typing" && startDelayMs > 0) {
      t = setTimeout(() => {
        setTxt(full.slice(0, 1));
      }, startDelayMs);
      return () => clearTimeout(t);
    }

    if (phase === "typing") {
      if (txt.length < full.length) {
        t = setTimeout(() => setTxt(full.slice(0, txt.length + 1)), typeSpeedMs);
      } else {
        t = setTimeout(() => setPhase("holding"), holdMs);
      }
    }

    if (phase === "holding") {
      t = setTimeout(() => setPhase("deleting"), 250);
    }

    if (phase === "deleting") {
      if (txt.length > 0) {
        t = setTimeout(() => setTxt(full.slice(0, txt.length - 1)), deleteSpeedMs);
      } else {
        setPhase("typing");
        setI((p) => (p + 1) % safeRoles.length);
      }
    }

    return () => clearTimeout(t);
  }, [safeRoles, i, txt, phase, typeSpeedMs, deleteSpeedMs, holdMs, startDelayMs]);

  return (
    <span className={className}>
      {txt}
      <span
        className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[2px] animate-pulse rounded bg-red-600 opacity-90"
        aria-hidden="true"
      />
    </span>
  );
}
