import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import {
  ArrowRightIcon,
  ChatIcon,
  ChevronDownIcon,
  FacebookIcon,
  InstagramIcon,
  LockIcon,
  MailIcon,
  WhatsAppIcon,
  XIcon,
} from "@/components/ui/Icons";
import { LogoMark } from "@/components/ui/Logo";
import { PaymentMethods } from "@/components/ui/PaymentMethods";
import { CONTACT, links } from "@/config/contact";
import type { OrderSelection } from "@/context/OrderContext";
import { ALL_PLANS, DEVICES, getPlan, type Device, type PlanId } from "@/data/content";
import { en } from "@/i18n/en";
import { useI18n } from "@/i18n/I18nContext";
import { ownerMessage, sendToOwner, type OrderRequest } from "@/lib/orderRequest";
import { cn } from "@/utils/cn";

type Props = {
  open: boolean;
  selection: OrderSelection;
  onClose: () => void;
};

type Tab = "message" | "form";
type Status = "idle" | "loading" | "sent" | "whatsapp";
type FieldErrors = Partial<Record<"whatsapp" | "email" | "device", string>>;

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const validEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
const validPhone = (v: string) => {
  const digits = v.replace(/\D/g, "");
  return /^\+?[\d\s().-]+$/.test(v.trim()) && digits.length >= 7 && digits.length <= 15;
};

const inputClass =
  "h-12 w-full rounded-xl border border-violet-200 bg-white text-base text-ink-900 transition placeholder:text-ink-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-200 focus:outline-none aria-[invalid=true]:border-red-500";

function Field({
  id,
  label,
  error,
  errorId,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  errorId: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink-900">
        {label}
      </label>
      {children}
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function OrderModal({ open, selection, onClose }: Props) {
  const { t, rich, eur, lang } = useI18n();
  const uid = useId();
  const titleId = `${uid}-title`;
  const descId = `${uid}-desc`;

  const dialogRef = useRef<HTMLDivElement>(null);
  const whatsappRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const deviceRef = useRef<HTMLSelectElement>(null);
  const tabRefs = useRef<Record<Tab, HTMLButtonElement | null>>({ message: null, form: null });

  const [tab, setTab] = useState<Tab>("message");
  const [planId, setPlanId] = useState<PlanId>("12m");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [deviceId, setDeviceId] = useState("");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [fallbackLink, setFallbackLink] = useState("");

  // Reset everything each time the dialog opens.
  useEffect(() => {
    if (!open) return;
    setTab("message");
    setPlanId(selection.planId ?? "12m");
    setWhatsapp("");
    setEmail("");
    setDeviceId("");
    setErrors({});
    setSubmitError("");
    setStatus("idle");
    setFallbackLink("");
  }, [open, selection.planId]);

  // Focus management, scroll lock, Escape + focus trap.
  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => dialogRef.current?.focus(), 60);

    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;

      if (e.shiftKey && (active === first || active === dialogRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  const plan = getPlan(planId);
  const planLabel = t(plan.labelKey);
  const planPrice = eur(plan.price);
  const deviceLabel = (d: Device) => (d.labelKey ? t(d.labelKey) : (d.label as string));

  /* ---------------- Option 1: message us ---------------- */
  const channels = [
    CONTACT.whatsapp && {
      id: "whatsapp",
      name: "WhatsApp Business",
      href: links.whatsapp(t("order.waText", { plan: planLabel, price: planPrice })),
      Icon: WhatsAppIcon,
      bg: "bg-[#25D366]",
    },
    CONTACT.facebook && {
      id: "facebook",
      name: "Facebook",
      href: links.messenger(),
      Icon: FacebookIcon,
      bg: "bg-[#1877F2]",
    },
    CONTACT.instagram && {
      id: "instagram",
      name: "Instagram",
      href: links.instagramDm(),
      Icon: InstagramIcon,
      bg: "bg-gradient-to-tr from-[#f9a43e] via-[#e1306c] to-[#6a45d6]",
    },
  ].filter(Boolean) as { id: string; name: string; href: string; Icon: typeof WhatsAppIcon; bg: string }[];

  /* ---------------- Option 2: leave your details ---------------- */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const next: FieldErrors = {};
    if (!validPhone(whatsapp)) next.whatsapp = t("order.errWhatsapp");
    if (!validEmail(email)) next.email = t("order.error");
    if (!deviceId) next.device = t("order.errDevice");
    setErrors(next);
    setSubmitError("");

    if (Object.keys(next).length > 0) {
      (next.whatsapp ? whatsappRef : next.email ? emailRef : deviceRef).current?.focus();
      return;
    }

    const device = DEVICES.find((d) => d.id === deviceId)!;
    const request: OrderRequest = {
      plan: en[plan.labelKey],
      price: `€${plan.price}`,
      whatsapp: whatsapp.trim(),
      email: email.trim(),
      device: device.labelKey ? en[device.labelKey] : (device.label as string),
      language: lang,
    };

    // No form service configured yet → hand the details over through WhatsApp
    // (pre-filled) so that no request is ever lost.
    if (!CONTACT.formEndpoint) {
      if (!CONTACT.whatsapp) {
        setSubmitError(t("order.sendError"));
        return;
      }
      const link = links.whatsapp(ownerMessage(request));
      window.open(link, "_blank", "noopener,noreferrer");
      setFallbackLink(link);
      setStatus("whatsapp");
      return;
    }

    setStatus("loading");
    try {
      await sendToOwner(request);
      setStatus("sent");
    } catch {
      setStatus("idle");
      setSubmitError(t("order.sendError"));
    }
  };

  const onTabKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const next: Tab = e.key === "Home" ? "message" : e.key === "End" ? "form" : tab === "message" ? "form" : "message";
    setTab(next);
    tabRefs.current[next]?.focus();
  };

  const finished = status === "sent" || status === "whatsapp";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-ink-950/45 p-4 backdrop-blur-sm sm:items-center"
      style={{ animation: "fade-in 0.3s ease both" }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        className="relative my-auto w-full max-w-lg overflow-hidden rounded-3xl border border-violet-100 bg-white p-6 shadow-[0_40px_100px_-20px_rgba(76,29,149,0.5)] outline-none sm:p-8"
        style={{ animation: "modal-in 0.55s cubic-bezier(0.16,1,0.3,1) both" }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 left-1/2 h-48 w-80 -translate-x-1/2 rounded-full bg-violet-200/70 blur-3xl"
        />

        <button
          type="button"
          onClick={onClose}
          aria-label={t("order.close")}
          className="absolute end-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-500 transition hover:bg-violet-100 hover:text-ink-900"
        >
          <XIcon className="h-5 w-5" />
        </button>

        {finished ? (
          /* ------------------------- Done ------------------------- */
          <div className="relative text-center" aria-live="polite">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-violet-100 ring-1 ring-violet-200">
              <svg
                viewBox="0 0 24 24"
                className="h-8 w-8 text-violet-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path className="draw-check" d="m5 12.5 4.5 4.5L19 7.5" />
              </svg>
            </div>
            <h2 id={titleId} className="mt-6 text-2xl font-bold text-ink-900">
              {status === "sent" ? t("order.successTitle") : t("order.almostTitle")}
            </h2>
            <p id={descId} className="mt-3 text-sm leading-relaxed text-ink-600">
              {status === "sent"
                ? rich("order.successBody", {
                    whatsapp: whatsapp.trim(),
                    email: email.trim(),
                    plan: planLabel,
                    price: planPrice,
                  })
                : t("order.successWa")}
            </p>
            {status === "whatsapp" && (
              <Button href={fallbackLink} target="_blank" rel="noopener noreferrer" size="lg" className="mt-7 w-full">
                <WhatsAppIcon className="h-5 w-5" />
                WhatsApp Business
              </Button>
            )}
            <Button
              onClick={onClose}
              size="lg"
              variant={status === "whatsapp" ? "ghost" : "primary"}
              className={cn("w-full", status === "whatsapp" ? "mt-2" : "mt-7")}
            >
              {t("order.done")}
            </Button>
          </div>
        ) : (
          <div className="relative">
            <LogoMark className="h-11 w-11" />
            <h2 id={titleId} className="mt-5 text-2xl font-bold text-ink-900 sm:text-[1.7rem]">
              {t("order.title")}
            </h2>
            <p id={descId} className="mt-2 text-sm leading-relaxed text-ink-600">
              {t("order.desc")}
            </p>

            {/* Plan */}
            <fieldset className="mt-5">
              <legend className="mb-2 text-sm font-medium text-ink-900">{t("order.yourPlan")}</legend>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {ALL_PLANS.map((p) => (
                  <label
                    key={p.id}
                    className="relative cursor-pointer rounded-2xl border border-violet-200 bg-white px-2 py-3 text-center transition hover:border-violet-300 has-[:checked]:border-violet-600 has-[:checked]:bg-violet-50 has-[:checked]:ring-2 has-[:checked]:ring-violet-200 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-violet-500"
                  >
                    <input
                      type="radio"
                      name="plan"
                      value={p.id}
                      checked={planId === p.id}
                      onChange={() => setPlanId(p.id)}
                      className="sr-only"
                    />
                    <span className="block text-[0.8rem] leading-tight font-semibold text-ink-900">{t(p.labelKey)}</span>
                    <span className="mt-1 block font-display text-lg font-extrabold text-violet-700">{eur(p.price)}</span>
                    {p.featured && (
                      <span className="absolute -top-2 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-2 py-0.5 text-[0.55rem] font-bold tracking-wide whitespace-nowrap text-white uppercase">
                        {t("order.best")}
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Option tabs */}
            <div
              role="tablist"
              aria-label={t("order.title")}
              onKeyDown={onTabKeyDown}
              className="mt-6 grid grid-cols-2 gap-1 rounded-full bg-violet-100 p-1"
            >
              {(
                [
                  { id: "message", label: t("order.tabMessage"), Icon: ChatIcon },
                  { id: "form", label: t("order.tabForm"), Icon: MailIcon },
                ] as const
              ).map(({ id, label, Icon }) => {
                const selected = tab === id;
                return (
                  <button
                    key={id}
                    ref={(el) => {
                      tabRefs.current[id] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`${uid}-tab-${id}`}
                    aria-selected={selected}
                    aria-controls={`${uid}-panel-${id}`}
                    tabIndex={selected ? 0 : -1}
                    onClick={() => setTab(id)}
                    className={cn(
                      "flex min-h-11 items-center justify-center gap-2 rounded-full px-3 py-2 text-center text-sm leading-tight font-semibold transition-all duration-300",
                      selected ? "bg-white text-violet-700 shadow-soft" : "text-ink-600 hover:text-ink-900",
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>

            {/* Option 1 — message us */}
            {tab === "message" && (
              <div
                role="tabpanel"
                id={`${uid}-panel-message`}
                aria-labelledby={`${uid}-tab-message`}
                className="mt-5"
                style={{ animation: "fade-up 0.5s var(--ease-out-expo) both" }}
              >
                <p className="text-sm leading-relaxed text-ink-600">{t("order.msgDesc")}</p>
                <ul className="mt-4 space-y-2.5">
                  {channels.map(({ id, name, href, Icon, bg }) => (
                    <li key={id}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/ch flex items-center gap-3.5 rounded-2xl border border-violet-200 bg-white p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300 hover:shadow-soft"
                      >
                        <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white", bg)}>
                          <Icon className="h-6 w-6" />
                        </span>
                        <span className="flex-1 font-semibold text-ink-900">{name}</span>
                        <ArrowRightIcon className="h-4 w-4 text-ink-300 transition group-hover/ch:text-violet-600" />
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-3.5 text-xs leading-relaxed text-ink-600">
                  {rich("order.msgNote", { plan: planLabel, price: planPrice })}
                </p>
              </div>
            )}

            {/* Option 2 — leave your details */}
            {tab === "form" && (
              <form
                role="tabpanel"
                id={`${uid}-panel-form`}
                aria-labelledby={`${uid}-tab-form`}
                onSubmit={handleSubmit}
                noValidate
                className="mt-5"
                style={{ animation: "fade-up 0.5s var(--ease-out-expo) both" }}
              >
                <p className="text-sm leading-relaxed text-ink-600">{t("order.formDesc")}</p>

                <div className="mt-4 space-y-4">
                  <Field id={`${uid}-wa`} errorId={`${uid}-wa-err`} label={t("order.whatsappNumber")} error={errors.whatsapp}>
                    <input
                      ref={whatsappRef}
                      id={`${uid}-wa`}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      dir="ltr"
                      placeholder="+44 7700 900123"
                      value={whatsapp}
                      onChange={(e) => {
                        setWhatsapp(e.target.value);
                        if (errors.whatsapp) setErrors((x) => ({ ...x, whatsapp: undefined }));
                      }}
                      aria-invalid={errors.whatsapp ? true : undefined}
                      aria-describedby={errors.whatsapp ? `${uid}-wa-err` : undefined}
                      className={cn(inputClass, "ps-4 pe-4 rtl:text-right")}
                    />
                  </Field>

                  <Field id={`${uid}-email`} errorId={`${uid}-email-err`} label={t("order.email")} error={errors.email}>
                    <input
                      ref={emailRef}
                      id={`${uid}-email`}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      dir="ltr"
                      placeholder={t("order.placeholder")}
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((x) => ({ ...x, email: undefined }));
                      }}
                      aria-invalid={errors.email ? true : undefined}
                      aria-describedby={errors.email ? `${uid}-email-err` : undefined}
                      className={cn(inputClass, "ps-4 pe-4 rtl:text-right")}
                    />
                  </Field>

                  <Field id={`${uid}-device`} errorId={`${uid}-device-err`} label={t("order.device")} error={errors.device}>
                    <div className="relative">
                      <select
                        ref={deviceRef}
                        id={`${uid}-device`}
                        value={deviceId}
                        onChange={(e) => {
                          setDeviceId(e.target.value);
                          if (errors.device) setErrors((x) => ({ ...x, device: undefined }));
                        }}
                        aria-invalid={errors.device ? true : undefined}
                        aria-describedby={errors.device ? `${uid}-device-err` : undefined}
                        className={cn(inputClass, "appearance-none ps-4 pe-11", !deviceId && "text-ink-500")}
                      >
                        <option value="" disabled>
                          {t("order.deviceChoose")}
                        </option>
                        {DEVICES.map((d) => (
                          <option key={d.id} value={d.id} className="text-ink-900">
                            {deviceLabel(d)}
                          </option>
                        ))}
                      </select>
                      <ChevronDownIcon className="pointer-events-none absolute end-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-500" />
                    </div>
                  </Field>
                </div>

                {submitError && (
                  <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    {submitError}
                  </p>
                )}

                <Button type="submit" size="lg" disabled={status === "loading"} className="mt-5 w-full">
                  {status === "loading" ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      {t("order.sending")}
                    </>
                  ) : (
                    <>
                      {t("order.send")}
                      <ArrowRightIcon className="h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>
            )}

            {/* Payment methods + privacy */}
            <div className="mt-6 border-t border-violet-100 pt-5">
              <p className="text-xs font-semibold text-ink-900">{t("pay.title")}</p>
              <PaymentMethods size="sm" className="mt-2.5" />
              <p className="mt-3 text-xs leading-relaxed text-ink-600">{t("pay.note")}</p>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-500">
                <LockIcon className="h-3.5 w-3.5 shrink-0" />
                {t("order.privacy")}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
