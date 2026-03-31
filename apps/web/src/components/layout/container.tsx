import { cn } from "@/src/lib/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export default function Container({ children, className }: ContainerProps) {
  return <div className={cn("w-full", className)}>{children}</div>;
}
