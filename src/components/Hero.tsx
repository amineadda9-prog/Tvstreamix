import type { CSSProperties } from "react";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/Icons";
import { SHORT_PLAN } from "@/data/content";
import { useI18n } from "@/i18n/I18nContext";

const enter = (delay: number) => ({ "--enter-delay": `${delay}ms` }) as CSSProperties;

export function Hero() {
  const { t, rich, eur } = useI18n();

  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 pb-14 sm:pt-40 sm:pb-20">
      {/* Soft lilac background with drifting colour */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-violet-100 via-lilac-50 to-white"
      >
        <div className="grid-bg absolute inset-0" />
        <div className="absolute -top-40 left-1/2 h-[32rem] w-[32rem] -translate-x-[95%] rounded-full bg-violet-300/50 blur-[110px] [animation:float-slow_20s_ease-in-out_infinite]" />
        <div className="absolute -top-28 left-1/2 h-[28rem] w-[28rem] rounded-full bg-fuchsia-200/60 blur-[110px] [animation:float-slow_26s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-40 left-1/2 h-[22rem] w-[36rem] -translate-x-1/2 rounded-full bg-indigo-200/40 blur-[110px]" />
      </div>

      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <a
          href="#library"
          style={enter(60)}
          className="enter shadow-soft group/pill inline-flex max-w-full items-center gap-2.5 rounded-full border border-violet-200 bg-white/80 px-4 py-2 text-sm font-medium text-ink-700 backdrop-blur transition hover:border-violet-300 hover:text-ink-900"
        >
          <span className="live-dot live-dot-brand shrink-0" />
          <span className="min-w-0">{t("hero.pill")}</span>
          <ArrowRightIcon className="h-4 w-4 shrink-0 text-violet-600" />
        </a>

        <h1
          style={enter(160)}
          className="enter mt-7 text-[2.6rem] leading-[1.04] font-extrabold text-balance text-ink-900 sm:text-6xl lg:text-[4.4rem]"
        >
          {t("hero.title1")}
          <br />
          <span className="text-gradient-animated">{t("hero.title2")}</span>
        </h1>

        <p
          style={enter(280)}
          className="enter mx-auto mt-6 max-w-2xl text-base leading-relaxed text-pretty text-ink-600 sm:text-xl"
        >
          {rich("hero.sub", { price: eur(SHORT_PLAN.price) })}
        </p>

        <div style={enter(400)} className="enter mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button size="lg" href="#pricing" className="w-full sm:w-auto">
            {t("hero.cta1")}
            <ArrowRightIcon className="h-5 w-5" />
          </Button>
          <Button size="lg" variant="secondary" href="#library" className="w-full sm:w-auto">
            {t("hero.cta2")}
          </Button>
        </div>

        <ul
          style={enter(520)}
          className="enter mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-ink-600"
        >
          {(["hero.b1", "hero.b2", "hero.b3"] as const).map((key) => (
            <li key={key} className="inline-flex items-center gap-1.5">
              <CheckIcon className="h-4 w-4 text-violet-600" strokeWidth={2.4} />
              {t(key)}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
