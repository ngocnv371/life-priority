import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  I18nProvider,
  LANGS,
  LANG_LABELS,
  LANG_NAMES,
  useI18n,
  type DictKey,
} from "./i18n";
import { DayBox } from "./interactive/DayBox";
import { Jar } from "./interactive/Jar";
import { VideoSection } from "./sections/VideoSection";

/* ========================================================================== *
 *  The deck.
 *
 *  Eight sections, alternating between a rendered Remotion scene and a live
 *  interactive puzzle. Every scene in `SCENES` also renders standalone through
 *  `npm run studio`, in either language.
 * ========================================================================== */

type Section =
  | {
      kind: "video";
      id: string;
      shortKey: DictKey;
      sceneId: string;
      captionKey: DictKey;
    }
  | {
      kind: "custom";
      id: string;
      shortKey: DictKey;
      render: () => React.ReactNode;
    };

const SECTIONS: Section[] = [
  {
    kind: "video",
    id: "title",
    shortKey: "sec.title",
    sceneId: "Title",
    captionKey: "cap.title",
  },
  {
    kind: "video",
    id: "framing",
    shortKey: "sec.framing",
    sceneId: "Framing",
    captionKey: "cap.framing",
  },
  { kind: "custom", id: "day", shortKey: "sec.day", render: () => <DayBox /> },
  {
    kind: "video",
    id: "day-debrief",
    shortKey: "sec.dayDebrief",
    sceneId: "DayDebrief",
    captionKey: "cap.dayDebrief",
  },
  { kind: "custom", id: "jar", shortKey: "sec.jar", render: () => <Jar /> },
  {
    kind: "video",
    id: "jar-debrief",
    shortKey: "sec.jarDebrief",
    sceneId: "JarDebrief",
    captionKey: "cap.jarDebrief",
  },
  {
    kind: "video",
    id: "horizon",
    shortKey: "sec.horizon",
    sceneId: "Horizon",
    captionKey: "cap.horizon",
  },
  {
    kind: "video",
    id: "rules",
    shortKey: "sec.rules",
    sceneId: "Rules",
    captionKey: "cap.rules",
  },
];

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

const Deck: React.FC = () => {
  const { lang, setLang, t } = useI18n();

  const [index, setIndex] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);

  const total = SECTIONS.length;
  const section = SECTIONS[index];

  const go = useCallback(
    (delta: number) => setIndex((i) => clamp(i + delta, 0, total - 1)),
    [total],
  );

  /* --------------------------------------------------------- keyboard -- */

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Never hijack keys aimed at the video player's own controls.
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, select")) return;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
        case "PageDown":
          e.preventDefault();
          go(1);
          break;
        case "ArrowLeft":
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          go(-1);
          break;
        case "Home":
          e.preventDefault();
          setIndex(0);
          break;
        case "End":
          e.preventDefault();
          setIndex(total - 1);
          break;
        case "f":
        case "F":
          if (document.fullscreenElement) void document.exitFullscreen();
          else void document.documentElement.requestFullscreen();
          break;
        default:
          break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, total]);

  /* ---------------------------------------------------------- content -- */

  const content = useMemo(() => {
    if (section.kind === "custom") return section.render();
    return (
      <VideoSection
        sceneId={section.sceneId}
        lang={lang}
        caption={t(section.captionKey)}
        autoAdvance={autoAdvance}
        onFinished={() => go(1)}
      />
    );
    // `<main key={section.id}>` remounts on every section change, so revisiting
    // a scene always replays it from frame 0. Changing language does not
    // remount, so a running scene keeps its position.
  }, [section, autoAdvance, go, lang, t]);

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" />
          <span>{t("brand")}</span>
        </div>

        <nav className="progress-rail" aria-label={t("brand")}>
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              className="progress-seg"
              data-state={i < index ? "done" : i === index ? "active" : "todo"}
              aria-label={t(s.shortKey)}
              aria-current={i === index ? "step" : undefined}
              title={t(s.shortKey)}
              onClick={() => setIndex(i)}
            >
              <i />
            </button>
          ))}
        </nav>

        <div
          className="lang-switch"
          role="group"
          aria-label={t("hud.langLabel")}
        >
          {LANGS.map((l) => (
            <button
              key={l}
              className="lang-option"
              data-active={l === lang}
              aria-pressed={l === lang}
              title={LANG_NAMES[l]}
              onClick={() => setLang(l)}
            >
              {LANG_LABELS[l]}
            </button>
          ))}
        </div>

        <span className="section-counter">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </header>

      <main className="stage" key={section.id}>
        {content}
      </main>

      <footer className="hub">
        <div className="hub-group">
          <button className="btn" onClick={() => go(-1)} disabled={index === 0}>
            ← {t("hud.back")}
          </button>
          <button
            className="btn"
            data-variant="solid"
            onClick={() => go(1)}
            disabled={index === total - 1}
          >
            {t("hud.next")} →
          </button>
        </div>

        <div className="hub-group">
          <span className="hud-hint">
            <kbd>←</kbd> <kbd>→</kbd> {t("hud.navigate")} · <kbd>F</kbd>{" "}
            {t("hud.fullscreen")}
          </span>
          <button
            className="toggle"
            data-on={autoAdvance}
            role="switch"
            aria-checked={autoAdvance}
            onClick={() => setAutoAdvance((v) => !v)}
          >
            <span className="toggle-track">
              <i />
            </span>
            {t("hud.autoAdvance")}
          </button>
        </div>
      </footer>
    </div>
  );
};

export const App: React.FC = () => (
  <I18nProvider>
    <Deck />
  </I18nProvider>
);
