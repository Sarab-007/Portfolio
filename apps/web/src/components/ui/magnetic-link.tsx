import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/src/lib/cn";

type MagneticLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
  cursorLabel?: string;
};

const variantClass = {
  primary:
    "border-[rgba(243,188,84,0.55)] bg-[rgb(var(--accent))] text-[rgb(var(--accent-text))] shadow-[0_12px_32px_rgba(178,110,20,0.16)] hover:bg-[rgb(var(--accent-strong))]",
  secondary:
    "border-[rgba(var(--line),0.16)] bg-[rgba(var(--panel),0.42)] text-[rgb(var(--fg))] hover:border-[rgba(var(--line),0.28)] hover:bg-[rgba(var(--panel),0.62)]",
  ghost:
    "border-transparent bg-transparent text-[rgb(var(--muted))] hover:text-[rgb(var(--fg))]",
};

export default function MagneticLink({
  children,
  className,
  variant = "secondary",
  icon,
  cursorLabel: _cursorLabel,
  ...props
}: MagneticLinkProps) {
  return (
    <a
      className={cn(
        "group inline-flex h-11 items-center justify-center gap-2 rounded-full border px-5 text-sm font-semibold transition-[background-color,border-color,color,transform] duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(var(--accent))]",
        variantClass[variant],
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {icon ? (
        <span className="transition-transform duration-200 group-hover:translate-x-0.5">
          {icon}
        </span>
      ) : null}
    </a>
  );
}
