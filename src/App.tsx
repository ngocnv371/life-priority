import React, { useCallback, useEffect, useMemo, useState } from "react";
import { DayBox } from "./interactive/DayBox";
import { Jar } from "./interactive/Jar";
import { VideoSection } from "./sections/VideoSection";

/* ========================================================================== *
 *  The deck.
 *
 *  Eight sections, alternating between a rendered Remotion scene and a live
 *  interactive puzzle. Every scene in `SCENES` also renders standalone through
 *  `npm run studio`.
 * ========================================================================== */

type Section =
  | {
      kind: "video";
      id: string;
      short: string;
      sceneId: string;
      caption: React.ReactNode;
    }
  | {
      kind: "custom";
      id: string;
      short: string;
      render: () => React.ReactNode;
    };

const SECTIONS: Section[] = [
  {
    kind: "video",
    id: "title",
    short: "Title",
    sceneId: "Title",
    caption: (
      <>
        Everything that follows rests on one uncomfortable piece of arithmetic:{" "}
        <strong>24 hours, in total, for everything.</strong>
      </>
    ),
  },
  {
    kind: "video",
    id: "framing",
    short: "Framing",
    sceneId: "Framing",
    caption: (
      <>
        Two thirds of the day is already spoken for. The lecture is about the
        remaining third — and about the order you spend it in.
      </>
    ),
  },
  {
    kind: "custom",
    id: "day",
    short: "The day",
    render: () => <DayBox />,
  },
  {
    kind: "video",
    id: "day-debrief",
    short: "Debrief",
    sceneId: "DayDebrief",
    caption: (
      <>
        Nothing in the first bar was <strong>decided</strong>. It was{" "}
        <strong>defaulted</strong>. That is the difference worth taking home.
      </>
    ),
  },
  {
    kind: "custom",
    id: "jar",
    short: "The jar",
    render: () => <Jar />,
  },
  {
    kind: "video",
    id: "jar-debrief",
    short: "Debrief",
    sceneId: "JarDebrief",
    caption: (
      <>
        Same jar, same items, same total volume. Only the order changed — and
        the order is what decided who lost.
      </>
    ),
  },
  {
    kind: "video",
    id: "horizon",
    short: "Horizon",
    sceneId: "Horizon",
    caption: (
      <>
        The day repeats. Over a decade, the unclaimed hours stop looking like a
        rounding error and start looking like a whole second life.
      </>
    ),
  },
  {
    kind: "video",
    id: "rules",
    short: "Rules",
    sceneId: "Rules",
    caption: (
      <>
        Three rules short enough to remember on a Monday morning — and specific
        enough to act on before the week starts.
      </>
    ),
  },
];

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

export const App: React.FC = () => {
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
        caption={section.caption}
        autoAdvance={autoAdvance}
        onFinished={() => go(1)}
      />
    );
    // `<main key={section.id}>` remounts on every section change, so revisiting
    // a scene always replays it from frame 0.
  }, [section, autoAdvance, go]);

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark" />
          <span>The Priority of Life</span>
        </div>

        <nav className="progress-rail" aria-label="Sections">
          {SECTIONS.map((s, i) => (
            <button
              key={s.id}
              className="progress-seg"
              data-state={i < index ? "done" : i === index ? "active" : "todo"}
              aria-label={`Go to ${s.short}`}
              aria-current={i === index ? "step" : undefined}
              title={s.short}
              onClick={() => setIndex(i)}
            >
              <i />
            </button>
          ))}
        </nav>

        <span className="section-counter">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </header>

      <main className="stage" key={section.id}>
        {content}
      </main>

      <footer className="hub">
        <div className="hub-group">
          <button
            className="btn"
            onClick={() => go(-1)}
            disabled={index === 0}
          >
            ← Back
          </button>
          <button
            className="btn"
            data-variant="solid"
            onClick={() => go(1)}
            disabled={index === total - 1}
          >
            Next →
          </button>
        </div>

        <div className="hub-group">
          <span className="hud-hint">
            <kbd>←</kbd> <kbd>→</kbd> navigate · <kbd>F</kbd> fullscreen
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
            Auto-advance
          </button>
        </div>
      </footer>
    </div>
  );
};
