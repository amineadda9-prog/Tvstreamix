import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";
import { PaymentMethods } from "@/components/ui/PaymentMethods";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useOrder } from "@/context/OrderContext";
import { MAIN_PLANS, SHORT_PLAN, fullPrice, perMonth, saveAmount, savePct, type Plan } from "@/data/content";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/utils/cn";

function PlanCard({ plan, delay }: { plan: Plan; delay: number }) {
  const { openOrder } = useOrder();
  const { t, eur } = useI18n();
  const featured = !!plan.featured;
  const label = t(plan.labelKey);

  return (
    <Reveal delay={delay} className={cn("h-full", featured && "order-first md:order-none")}>
      <div
        className={cn(
          "group relative flex h-full flex-col rounded-3xl p-7 transition-all duration-500 ease-out hover:-translate-y-1.5 sm:p-8",
          featured
            ? "bg-gradient-to-b from-violet-600 to-violet-700 text-white shadow-brand md:scale-[1.04] md:py-10"
            : "shadow-soft hover:shadow-lift border border-violet-100 bg-white text-ink-900",
        )}
      >
        {featured && (
          <span className="shadow-soft absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1.5 text-xs font-bold tracking-wide whitespace-nowrap text-violet-700 uppercase">
            {t("pricing.best")}
          </span>
        )}

        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-bold sm:text-2xl">{label}</h3>
          <span
            className={cn(
              "rounded-full px-3 py-1 text-xs font-bold whitespace-nowrap",
              featured ? "bg-white/15 text-white" : "bg-violet-100 text-violet-700",
            )}
          >
            {t("pricing.save", { pct: savePct(plan) })}
          </span>
        </div>

        <div className="mt-8 flex items-end gap-3">
          <span className="font-display text-6xl font-extrabold tracking-tight tabular-nums">{eur(plan.price)}</span>
          <s className={cn("pb-2 text-base", featured ? "text-violet-200" : "text-ink-500")}>
            <span className="sr-only">{t("pricing.regular")} </span>
            {eur(fullPrice(plan))}
          </s>
        </div>

        <p className={cn("mt-2 text-sm", featured ? "text-violet-100" : "text-ink-600")}>
          {t("pricing.perMonth", { price: eur(perMonth(plan)) })}
        </p>
        <p className={cn("mt-1 text-sm font-semibold", featured ? "text-white" : "text-violet-700")}>
          {t("pricing.youSave", { amount: eur(saveAmount(plan)) })}
        </p>

        <Button
          size="lg"
          variant={featured ? "secondary" : "primary"}
          onClick={() => openOrder({ planId: plan.id })}
          className="mt-8 w-full"
        >
          {t("pricing.choose", { plan: label })}
        </Button>
      </div>
    </Reveal>
  );
}

export function Pricing() {
  const { openOrder } = useOrder();
  const { t, rich, eur } = useI18n();

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-title"
      className="relative overflow-hidden bg-gradient-to-b from-violet-50 via-lilac-100/70 to-violet-50 py-20 sm:py-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 h-[30rem] w-[50rem] -translate-x-1/2 rounded-full bg-violet-200/50 blur-[130px]" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="pricing-title"
          eyebrow={t("pricing.eyebrow")}
          title={
            <>
              {t("pricing.title1")} <span className="text-gradient">{t("pricing.title2")}</span>
            </>
          }
          description={t("pricing.desc")}
        />

        <div className="mt-14 grid gap-6 sm:mt-16 md:grid-cols-3 md:items-stretch md:gap-5 lg:gap-7">
          {MAIN_PLANS.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} delay={i * 100} />
          ))}
        </div>

        <Reveal delay={120}>
          <ul className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-ink-700">
            {(["pricing.f1", "pricing.f2", "pricing.f3", "pricing.f4"] as const).map((key) => (
              <li key={key} className="inline-flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-600 text-white">
                  <CheckIcon className="h-3 w-3" strokeWidth={3} />
                </span>
                {t(key)}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={160}>
          <div className="shadow-soft mx-auto mt-10 flex max-w-2xl flex-col items-center justify-between gap-4 rounded-2xl border border-violet-100 bg-white p-5 text-center sm:flex-row sm:p-6 sm:text-start">
            <div>
              <p className="font-display text-lg font-bold text-ink-900">{t("pricing.tryTitle")}</p>
              <p className="mt-1 text-sm text-ink-600">{rich("pricing.tryDesc", { price: eur(SHORT_PLAN.price) })}</p>
            </div>
            <Button variant="secondary" onClick={() => openOrder({ planId: SHORT_PLAN.id })}>
              {t("pricing.tryBtn", { price: eur(SHORT_PLAN.price) })}
            </Button>
          </div>
        </Reveal>

        {/* How to order + accepted payment */}
        <Reveal delay={180}>
          <div className="shadow-soft mx-auto mt-10 max-w-4xl rounded-3xl border border-violet-100 bg-white p-6 sm:p-8">
            <h3 className="text-center font-display text-lg font-bold text-ink-900">{t("how.title")}</h3>

            <ol className="mt-6 grid gap-5 sm:grid-cols-3">
              {(["how.s1", "how.s2", "how.s3"] as const).map((key, i) => (
                <li key={key} className="flex items-start gap-3 sm:flex-col sm:items-center sm:text-center">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-600 font-display text-sm font-extrabold text-white">
                    {i + 1}
                  </span>
                  <span className="pt-1.5 text-[0.95rem] font-medium text-ink-900 sm:pt-0">{t(key)}</span>
                </li>
              ))}
            </ol>

            <div className="my-6 h-px bg-gradient-to-r from-transparent via-violet-200 to-transparent" />

            <p className="text-center text-sm font-semibold text-ink-700">{t("pay.title")}</p>
            <PaymentMethods className="mt-4 justify-center" />
            <p className="mt-4 text-center text-xs text-ink-500">{t("pay.note")}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
