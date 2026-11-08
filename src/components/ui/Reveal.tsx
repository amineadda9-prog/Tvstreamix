import type { CSSProperties, ElementType, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/utils/cn";

type RevealProps = {
  children: ReactNode;
  /** Delay in ms — use for staggered entrances. */
  delay?: number;
  variant?: "up" | "scale" | "left" | "right";
  as?: ElementType;
  className?: string;
};

export function Reveal({ children, delay = 0, variant = "up", as: Tag = "div", className }: RevealProps) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <Tag
      ref={ref}
      className={cn("reveal", `reveal-${variant}`, inView && "is-visible", className)}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
