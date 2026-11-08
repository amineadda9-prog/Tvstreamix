import { useEffect, useRef, useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, MenuIcon, XIcon } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { NAV_LINKS } from "@/data/content";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/utils/cn";

export function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const targets = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[];
    if (!targets.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-42% 0px -52% 0px" },
    );
    targets.forEach((target) => io.observe(target));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const onResize = () => window.innerWidth >= 1024 && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "mx-auto transition-all duration-500 ease-out",
          solid ? "max-w-5xl px-3 pt-3 sm:px-4" : "max-w-7xl px-4 pt-5 sm:px-6 lg:px-8",
        )}
      >
        <nav
          aria-label={t("nav.aria")}
          className={cn(
            "flex items-center justify-between gap-2 px-3 py-2.5 transition-all duration-500 ease-out sm:px-4",
            solid
              ? "shadow-soft border border-violet-100 bg-white/85 backdrop-blur-xl"
              : "border border-transparent bg-transparent",
            menuOpen ? "rounded-3xl" : "rounded-full",
          )}
        >
          <a href="#top" aria-label={t("nav.home")} className="rounded-full ps-1">
            <Logo />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "inline-flex rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300",
                      isActive ? "bg-violet-100 text-violet-700" : "text-ink-600 hover:bg-violet-50 hover:text-ink-900",
                    )}
                  >
                    {t(link.labelKey)}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Button href="#pricing" className="hidden h-10 px-4 sm:inline-flex">
              {t("nav.viewPlans")}
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? t("nav.closeMenu") : t("nav.openMenu")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-violet-200 bg-white text-ink-900 transition hover:bg-violet-50 lg:hidden"
            >
              {menuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          inert={!menuOpen}
          className={cn(
            "grid transition-all duration-500 ease-out lg:hidden",
            menuOpen ? "mt-2 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <div className="shadow-lift rounded-3xl border border-violet-100 bg-white p-3">
              <ul className="space-y-1">
                {NAV_LINKS.map((link) => (
                  <li key={link.id}>
                    <a
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-2xl px-4 py-3.5 text-base font-medium transition",
                        active === link.id ? "bg-violet-100 text-violet-700" : "text-ink-700 hover:bg-violet-50",
                      )}
                    >
                      {t(link.labelKey)}
                      <ArrowRightIcon className="h-4 w-4 text-ink-300" />
                    </a>
                  </li>
                ))}
              </ul>
              <Button href="#pricing" onClick={() => setMenuOpen(false)} size="lg" className="mt-3 w-full">
                {t("nav.viewPlans")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
