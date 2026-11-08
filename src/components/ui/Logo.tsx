import { cn } from "@/utils/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-9 w-9", className)} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="tv-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill="url(#tv-grad)" />
      <path
        d="M16 12.6v14.8a.9.9 0 0 0 1.37.77l12.2-7.4a.9.9 0 0 0 0-1.54l-12.2-7.4A.9.9 0 0 0 16 12.6Z"
        fill="#fff"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="font-display text-[1.15rem] font-extrabold tracking-tight text-ink-900">
        TV<span className="text-violet-600">STREAMIX</span>
      </span>
    </span>
  );
}
