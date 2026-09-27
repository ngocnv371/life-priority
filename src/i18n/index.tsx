import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { en, type Dict, type DictKey } from "./en";
import { vi } from "./vi";

/* ========================================================================== *
 *  Tiny i18n layer.
 *
 *  Deliberately not a library: two languages, one flat dictionary, one hook.
 *  The important guarantee is in `en.ts`/`vi.ts` - `vi` is typed as `Dict`, so
 *  a missing translation is a compile error, not a blank line on stage.
 * ========================================================================== */

export type Lang = "en" | "vi";

export const LANGS: Lang[] = ["en", "vi"];

export const LANG_LABELS: Record<Lang, string> = { en: "EN", vi: "VI" };

export const LANG_NAMES: Record<Lang, string> = {
  en: "English",
  vi: "Tiếng Việt",
};

export const dict: Record<Lang, Dict> = { en, vi };

export type Params = Record<string, string | number>;

/** Fills `{placeholders}`. Unknown placeholders are left alone rather than blanked. */
export const fill = (template: string, params?: Params): string =>
  params
    ? template.replace(/\{(\w+)\}/g, (match, key: string) =>
        key in params ? String(params[key]) : match,
      )
    : template;

/** Marker pattern shared by `<Rich>`: `*accent*` and `~bold~`. */
const MARKERS = /(\*[^*\n]+\*|~[^~\n]+~)/g;

/* ------------------------------------------------------------------ rich -- */

/**
 * Renders a translated string, turning the `*accent*` and `~bold~` markers into
 * styled runs. Usable both in the app and inside Remotion compositions, so the
 * same dictionary line renders identically in a puzzle and in a video scene.
 */
export const Rich: React.FC<{
  text: string;
  params?: Params;
  className?: string;
  style?: React.CSSProperties;
  accentStyle?: React.CSSProperties;
  boldStyle?: React.CSSProperties;
}> = ({ text, params, className, style, accentStyle, boldStyle }) => {
  const parts = fill(text, params).split(MARKERS);

  return (
    <span className={className} style={style}>
      {parts.map((part, i) => {
        if (part.length > 2 && part.startsWith("*") && part.endsWith("*")) {
          return (
            <em key={i} className="rich-em" style={accentStyle}>
              {part.slice(1, -1)}
            </em>
          );
        }
        if (part.length > 2 && part.startsWith("~") && part.endsWith("~")) {
          return (
            <b key={i} className="rich-b" style={boldStyle}>
              {part.slice(1, -1)}
            </b>
          );
        }
        return <React.Fragment key={i}>{part}</React.Fragment>;
      })}
    </span>
  );
};

/* ---------------------------------------------------------------- hooks -- */

/**
 * A translator bound to an explicit language. Used by Remotion scenes, which
 * receive `lang` as a prop so they render identically in the app *and* in
 * Remotion Studio, where there is no React context to read from.
 */
export const useT = (lang: Lang) => {
  const d = dict[lang] ?? dict.en;
  return useCallback(
    (key: DictKey, params?: Params) => fill(d[key] ?? key, params),
    [d],
  );
};

/* ------------------------------------------------------------- provider -- */

const STORAGE_KEY = "life-priority.lang";

type CtxValue = { lang: Lang; setLang: (lang: Lang) => void };

const I18nContext = createContext<CtxValue>({ lang: "en", setLang: () => {} });

const detectLang = (): Lang => {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "vi") return saved;
    // Respect the browser, but only for a language we actually ship.
    if (window.navigator.language?.toLowerCase().startsWith("vi")) return "vi";
  } catch {
    /* private mode, or no storage - fall through to the default */
  }
  return "en";
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [lang, setLangState] = useState<Lang>(detectLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage is a nice-to-have, not a requirement */
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<CtxValue>(() => ({ lang, setLang }), [lang, setLang]);

  return (
    <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
  );
};

/** The app-facing hook: current language, a setter, and a bound translator. */
export const useI18n = () => {
  const { lang, setLang } = useContext(I18nContext);
  const t = useT(lang);
  return { lang, setLang, t };
};

export type { Dict, DictKey };
