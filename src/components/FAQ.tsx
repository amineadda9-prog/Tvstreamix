import { useId, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CONTACT } from "@/config/contact";
import { FAQ_ITEMS, MAIN_PLANS, SHORT_PLAN, getPlan, perMonth } from "@/data/content";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/utils/cn";

function FaqItem({
  q,
  a,
  open,
  onToggle,
  delay,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
  delay: number;
}) {
  const uid = useId();
  const buttonId = `${uid}-button`;
  const panelId = `${uid}-panel`;

  return (
    <Reveal delay={delay}>
      <div
        className={cn(
          "overflow-hidden rounded-2xl border transition-all duration-500",
          open
            ? "shadow-lift border-violet-300 bg-white"
            : "shadow-soft border-violet-100 bg-white hover:border-violet-200",
        )}
      >
        <h3>
          <button
            type="button"
            id={buttonId}
            aria-expanded={open}
            aria-controls={panelId}
            onClick={onToggle}
            className="flex w-full items-center justify-between gap-4 rounded-2xl px-5 py-5 text-start sm:px-6"
          >
            <span className="font-sans text-base font-semibold tracking-normal text-ink-900 sm:text-[1.05rem]">{q}</span>
            <span
              aria-hidden="true"
              className={cn(
                "relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-500",
                open ? "rotate-180 bg-violet-600" : "bg-violet-100",
              )}
            >
              <span className={cn("absolute h-0.5 w-3.5 rounded-full", open ? "bg-white" : "bg-violet-700")} />
              <span
                className={cn(
                  "absolute h-3.5 w-0.5 rounded-full transition-all duration-500",
                  open ? "scale-y-0 bg-white" : "scale-y-100 bg-violet-700",
                )}
              />
            </span>
          </button>
        </h3>
        <div
          id={panelId}
          role="region"
          aria-labelledby={buttonId}
          inert={!open}
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <p className="px-5 pb-6 text-[0.95rem] leading-relaxed text-ink-600 sm:px-6">{a}</p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export function FAQ() {
  const { t, eur } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Values some answers refer to (extra values are simply ignored).
  const [p3, p6, p12] = MAIN_PLANS;
  const vars = {
    p1: eur(SHORT_PLAN.price),
    plan3: t(p3.labelKey),
    pm3: eur(perMonth(p3)),
    plan6: t(p6.labelKey),
    pm6: eur(perMonth(p6)),
    plan12: t(getPlan("12m").labelKey),
    pm12: eur(perMonth(p12)),
  };

  return (
    <section id="faq" aria-labelledby="faq-title" className="relative bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="faq-title"
          eyebrow={t("faq.eyebrow")}
          title={
            <>
              {t("faq.title1")} <span className="text-gradient">{t("faq.title2")}</span>
            </>
          }
          description={
            <>
              {t("faq.descBefore")}{" "}
              <a
                href={`mailto:${CONTACT.email}`}
                dir="ltr"
                className="inline-block font-medium text-violet-700 underline underline-offset-4 hover:text-violet-900"
              >
                {CONTACT.email}
              </a>
              {t("faq.descAfter")}
            </>
          }
        />

        <div className="mt-12 space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem
              key={item.q}
              q={t(item.q)}
              a={t(item.a, vars)}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              delay={Math.min(i, 4) * 60}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
