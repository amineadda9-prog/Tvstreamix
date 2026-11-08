import { ar } from "./ar";
import { de } from "./de";
import { en, type Dict } from "./en";
import { es } from "./es";
import { fr } from "./fr";
import { it } from "./it";
import { pt } from "./pt";

export type { Dict, Key } from "./en";

export type Lang = "en" | "fr" | "es" | "ar" | "de" | "it" | "pt";
export type Dir = "ltr" | "rtl";

export type LanguageInfo = {
  code: Lang;
  /** Short label shown on the switcher button. */
  short: string;
  /** The language's own name. */
  native: string;
  dir: Dir;
  /** BCP-47 tag used for number / currency formatting. */
  locale: string;
};

/**
 * To add a language: create src/i18n/xx.ts (copy en.ts), then add it to this
 * list and to `dictionaries` below.
 */
export const LANGUAGES: LanguageInfo[] = [
  { code: "en", short: "EN", native: "English", dir: "ltr", locale: "en-IE" },
  { code: "fr", short: "FR", native: "Français", dir: "ltr", locale: "fr-FR" },
  { code: "es", short: "ES", native: "Español", dir: "ltr", locale: "es-ES" },
  { code: "ar", short: "AR", native: "العربية", dir: "rtl", locale: "ar-u-nu-latn" },
  { code: "de", short: "DE", native: "Deutsch", dir: "ltr", locale: "de-DE" },
  { code: "it", short: "IT", native: "Italiano", dir: "ltr", locale: "it-IT" },
  { code: "pt", short: "PT", native: "Português", dir: "ltr", locale: "pt-PT" },
];

export const dictionaries: Record<Lang, Dict> = { en, fr, es, ar, de, it, pt };
