import type { ReactNode } from "react";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/utils/cn";

/**
 * Accepted payment methods as simple, consistent "acceptance marks".
 * These are lightweight drawn approximations — to use the official artwork,
 * swap the contents of any <Chip> for an <img> of the brand's logo file.
 */

type Size = "sm" | "md";

function Chip({ size, children }: { size: Size; children: ReactNode }) {
  return (
    <li
      dir="ltr"
      className={cn(
        "shadow-soft inline-flex items-center justify-center gap-1.5 rounded-xl border border-violet-100 bg-white leading-none whitespace-nowrap select-none",
        size === "sm" ? "h-8 px-2.5 text-[0.78rem]" : "h-11 px-4 text-[0.95rem]",
      )}
    >
      {children}
    </li>
  );
}

export function PaymentMethods({ size = "md", className }: { size?: Size; className?: string }) {
  const { t } = useI18n();

  return (
    <ul aria-label={t("pay.title")} className={cn("flex flex-wrap items-center gap-2", className)}>
      {/* PayPal */}
      <Chip size={size}>
        <span className="font-display text-[1.08em] font-extrabold tracking-tight italic">
          <span className="text-[#003087]">Pay</span>
          <span className="text-[#009cde]">Pal</span>
        </span>
      </Chip>

      {/* Tap Tap Send */}
      <Chip size={size}>
        <span
          aria-hidden="true"
          className="flex h-[1.55em] w-[1.55em] items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-violet-600"
        >
          <svg viewBox="0 0 24 24" className="h-[1em] w-[1em]" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round">
            <circle cx="12" cy="12" r="2.2" fill="#fff" stroke="none" />
            <path d="M7.5 7.5a6.4 6.4 0 0 0 0 9M16.5 7.5a6.4 6.4 0 0 1 0 9" />
          </svg>
        </span>
        <span className="font-bold tracking-tight text-ink-900">Tap Tap Send</span>
      </Chip>

      {/* Sendwave */}
      <Chip size={size}>
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-[1.35em] w-[1.35em]"
          fill="none"
          stroke="#10b981"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 14c2.5-5 5-5 7.5 0s5 5 7.5 0c1.2-2.2 2.2-3 4-4" />
        </svg>
        <span className="font-bold tracking-tight text-emerald-600">sendwave</span>
      </Chip>

      {/* Visa */}
      <Chip size={size}>
        <span className="font-display text-[1.15em] font-black tracking-tight text-[#1a1f71] italic">VISA</span>
      </Chip>

      {/* Mastercard */}
      <Chip size={size}>
        <svg aria-hidden="true" viewBox="0 0 32 20" className="h-[1.5em] w-auto">
          <circle cx="11" cy="10" r="9" fill="#EB001B" />
          <circle cx="21" cy="10" r="9" fill="#F79E1B" />
          <path d="M16 2.52A9 9 0 0 1 16 17.48A9 9 0 0 1 16 2.52Z" fill="#FF5F00" />
        </svg>
        <span className="sr-only">Mastercard</span>
      </Chip>
    </ul>
  );
}
