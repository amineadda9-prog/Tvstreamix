import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { cn } from "@/utils/cn";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
  id?: string;
  className?: string;
};

export function SectionHeading({ eyebrow, title, description, id, className }: SectionHeadingProps) {
  return (
    <div className={cn("mx-auto max-w-3xl text-center", className)}>
      <Reveal>
        <span className="shadow-soft inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] text-violet-700 uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
          {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={80}>
        <h2 id={id} className="mt-5 text-[2rem] leading-[1.1] font-bold text-balance text-ink-900 sm:text-5xl sm:leading-[1.08]">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={160}>
          <p className="mt-5 text-base leading-relaxed text-pretty text-ink-600 sm:text-lg">{description}</p>
        </Reveal>
      )}
    </div>
  );
}
