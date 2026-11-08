import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { SHORT_PLAN, getPlan } from "@/data/content";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/utils/cn";

/**
 * Small-screen helper: a compact bar that appears after the hero and steps
 * aside while the pricing section is on screen.
 */
export function StickyMobileCTA() {
  const { t, eur } = useI18n();
  const [pastHero, setPastHero] = useState(false);
  const [pricingVisible, setPricingVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = document.getElementById("pricing");
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => setPricingVisible(entries[entries.length - 1].isIntersecting),
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const visible = pastHero && !pricingVisible;

  return (
    <div
      inert={!visible}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] transition-all duration-500 ease-out md:hidden",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0",
      )}
    >
      <div className="shadow-lift mx-auto flex max-w-md items-center justify-between gap-3 rounded-full border border-violet-100 bg-white/90 py-2 ps-5 pe-2 backdrop-blur-xl">
        <p className="min-w-0 text-sm leading-tight">
          <span className="block truncate font-semibold text-ink-900">{t("sticky.title", { price: eur(SHORT_PLAN.price) })}</span>
          <span className="block truncate text-xs text-ink-600">{t("sticky.sub", { price: eur(getPlan("12m").price) })}</span>
        </p>
        <Button href="#pricing" className="h-11">
          {t("sticky.btn")}
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
