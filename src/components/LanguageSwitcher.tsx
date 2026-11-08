import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { CheckIcon, ChevronDownIcon, GlobeIcon } from "@/components/ui/Icons";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/utils/cn";

/**
 * Accessible language menu (button + menu of radio items).
 * Keyboard: Enter/Space opens, ↑ ↓ Home End move, Esc closes and returns focus.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, languages, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();
  const current = languages.find((l) => l.code === lang)!;

  // Close on outside click or Escape.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  // Move focus to the selected language when the menu opens.
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(() => {
      wrapRef.current?.querySelector<HTMLElement>('[role="menuitemradio"][aria-checked="true"]')?.focus();
    }, 30);
    return () => window.clearTimeout(id);
  }, [open]);

  const onMenuKeyDown = (e: KeyboardEvent<HTMLUListElement>) => {
    const items = Array.from(wrapRef.current?.querySelectorAll<HTMLElement>('[role="menuitemradio"]') ?? []);
    if (!items.length) return;
    const index = items.indexOf(document.activeElement as HTMLElement);
    let next: number;
    if (e.key === "ArrowDown") next = (index + 1) % items.length;
    else if (e.key === "ArrowUp") next = (index - 1 + items.length) % items.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = items.length - 1;
    else if (e.key === "Tab") {
      setOpen(false);
      return;
    } else return;
    e.preventDefault();
    items[next].focus();
  };

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${t("lang.label")}: ${current.native}`}
        onClick={() => setOpen((v) => !v)}
        className="shadow-soft inline-flex h-10 items-center gap-1.5 rounded-full border border-violet-200 bg-white px-3 text-sm font-semibold text-ink-900 transition hover:border-violet-300 hover:bg-violet-50"
      >
        <GlobeIcon className="h-4 w-4 text-violet-600" />
        <span>{current.short}</span>
        <ChevronDownIcon className={cn("h-3.5 w-3.5 text-ink-500 transition-transform duration-300", open && "rotate-180")} />
      </button>

      <ul
        id={menuId}
        role="menu"
        aria-label={t("lang.choose")}
        inert={!open}
        onKeyDown={onMenuKeyDown}
        className={cn(
          "shadow-lift absolute end-0 top-full z-50 mt-2 w-52 origin-top rounded-2xl border border-violet-100 bg-white p-1.5 transition-all duration-300 ease-out",
          open ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none -translate-y-1 scale-95 opacity-0",
        )}
      >
        {languages.map((l) => {
          const active = l.code === lang;
          return (
            <li key={l.code} role="none">
              <button
                type="button"
                role="menuitemradio"
                aria-checked={active}
                lang={l.code}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                  buttonRef.current?.focus();
                }}
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-start text-[0.95rem] font-medium transition",
                  active ? "bg-violet-100 text-violet-700" : "text-ink-700 hover:bg-violet-50",
                )}
              >
                <span>{l.native}</span>
                {active && <CheckIcon className="h-4 w-4" strokeWidth={2.6} />}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
