import { FacebookIcon, InstagramIcon, WhatsAppIcon } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { CONTACT, links } from "@/config/contact";
import type { Key } from "@/i18n";
import { useI18n } from "@/i18n/I18nContext";

const LINKS: { labelKey: Key; href: string }[] = [
  { labelKey: "nav.library", href: "#library" },
  { labelKey: "nav.pricing", href: "#pricing" },
  { labelKey: "nav.faq", href: "#faq" },
  { labelKey: "footer.support", href: `mailto:${CONTACT.email}` },
  { labelKey: "footer.terms", href: "#" },
  { labelKey: "footer.privacy", href: "#" },
];

type Social = { name: string; href: string; Icon: typeof WhatsAppIcon };

export function Footer() {
  const { t } = useI18n();

  const socials = [
    CONTACT.whatsapp && { name: "WhatsApp", href: links.whatsapp(), Icon: WhatsAppIcon },
    CONTACT.facebook && { name: "Facebook", href: links.facebookPage(), Icon: FacebookIcon },
    CONTACT.instagram && { name: "Instagram", href: links.instagramPage(), Icon: InstagramIcon },
  ].filter(Boolean) as Social[];

  return (
    <footer className="relative border-t border-violet-100 bg-lilac-100/60 pt-12 pb-28 md:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 text-center md:flex-row md:justify-between md:text-start">
          <div className="max-w-sm">
            <a href="#top" aria-label={t("footer.back")} className="inline-flex rounded-full">
              <Logo />
            </a>
            <p className="mt-4 text-sm leading-relaxed text-ink-600">{t("footer.tagline")}</p>

            {socials.length > 0 && (
              <ul className="mt-5 flex items-center justify-center gap-2.5 md:justify-start">
                {socials.map(({ name, href, Icon }) => (
                  <li key={name}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="shadow-soft flex h-10 w-10 items-center justify-center rounded-full border border-violet-100 bg-white text-violet-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-300 hover:bg-violet-50"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <nav aria-label={t("footer.nav")}>
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 md:justify-end">
              {LINKS.map((l) => (
                <li key={l.labelKey}>
                  <a href={l.href} className="text-sm font-medium text-ink-600 transition-colors hover:text-violet-700">
                    {t(l.labelKey)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-violet-100 pt-8">
          <p className="text-center text-sm text-ink-600 md:text-start">
            {t("footer.copy", { year: new Date().getFullYear() })}
          </p>
          <p className="mt-4 max-w-4xl text-center text-xs leading-relaxed text-ink-500 md:text-start">
            {t("footer.disclaimer")}
          </p>
        </div>
      </div>
    </footer>
  );
}
