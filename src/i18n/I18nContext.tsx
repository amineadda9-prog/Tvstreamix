import {
  Fragment,
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { LANGUAGES, dictionaries, type Dir, type Key, type Lang, type LanguageInfo } from "@/i18n";
import { SHORT_PLAN, getPlan } from "@/data/content";

type Vars = Record<string, string | number>;

type I18nValue = {
  lang: Lang;
  dir: Dir;
  languages: LanguageInfo[];
  setLang: (lang: Lang) => void;
  /** Plain-text translation with {placeholder} support. */
  t: (key: Key, vars?: Vars) => string;
  /** Like `t`, but turns **double-asterisk** text into <strong>. */
  rich: (key: Key, vars?: Vars) => ReactNode;
  /** Formats a number as euros using the active language's conventions. */
  eur: (amount: number) => string;
};

const STORAGE_KEY = "tvstreamix-lang";

const isLang = (value: unknown): value is Lang => LANGUAGES.some((l) => l.code === value);

/** URL (?lang=fr) → saved choice → browser language → English. */
function detectLang(): Lang {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get("lang")?.toLowerCase().slice(0, 2);
    if (isLang(fromUrl)) return fromUrl;
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(saved)) return saved;
  } catch {
    /* storage can be blocked — fall through */
  }
  const preferred = typeof navigator !== "undefined" ? (navigator.languages ?? [navigator.language]) : [];
  for (const tag of preferred) {
    const code = tag?.toLowerCase().slice(0, 2);
    if (isLang(code)) return code;
  }
  return "en";
}

const interpolate = (text: string, vars?: Vars) =>
  vars ? text.replace(/\{(\w+)\}/g, (match, name: string) => (name in vars ? String(vars[name]) : match)) : text;

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<I18nValue>(() => {
    const info = LANGUAGES.find((l) => l.code === lang)!;
    const dict = dictionaries[lang];
    const formatter = new Intl.NumberFormat(info.locale, {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    });

    const t = (key: Key, vars?: Vars) => interpolate(dict[key] ?? dictionaries.en[key], vars);
    const rich = (key: Key, vars?: Vars) =>
      t(key, vars)
        .split("**")
        .map((part, i) =>
          i % 2 ? (
            <strong key={i} className="font-semibold text-ink-900">
              {part}
            </strong>
          ) : (
            <Fragment key={i}>{part}</Fragment>
          ),
        );

    return { lang, dir: info.dir, languages: LANGUAGES, setLang, t, rich, eur: (n) => formatter.format(n) };
  }, [lang, setLang]);

  // Keep <html lang dir>, the page title and the meta description in sync.
  useLayoutEffect(() => {
    const root = document.documentElement;
    root.lang = value.lang;
    root.dir = value.dir;

    document.title = value.t("meta.title");
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = value.t("meta.description", {
      from: value.eur(SHORT_PLAN.price),
      yearPrice: value.eur(getPlan("12m").price),
    });
  }, [value]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within an I18nProvider");
  return ctx;
}
