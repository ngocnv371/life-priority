import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Rich, useT, type DictKey } from "../../i18n";
import { blockColors, colors, font, springs } from "../../theme";
import type { SceneProps } from "../registry";
import { Backdrop, Kicker, Rule, Words, displayText } from "../shared";

/* ========================================================================== *
 *  Debriefs - the reveal that lands straight after each interactive puzzle.
 *  Both scenes re-draw what the audience just did, in miniature, so the
 *  mechanic and the meaning sit on screen at the same time.
 * ========================================================================== */

/* -------------------------------------------------------------------------- *
 *  24-hour day debrief
 * -------------------------------------------------------------------------- */

type DaySegment = { hours: number; color: string; labelKey?: DictKey };

const DayBar: React.FC<{
  segments: DaySegment[];
  appearAt: number;
  caption: string;
  accent?: boolean;
  t: (key: DictKey) => string;
}> = ({ segments, appearAt, caption, accent = false, t }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const total = segments.reduce((a, s) => a + s.hours, 0);

  const enter = spring({
    frame: Math.max(0, frame - appearAt),
    fps,
    config: springs.smooth,
  });

  let cursor = 0;

  return (
    <div
      style={{
        opacity: enter,
        transform: `translateY(${(1 - enter) * 24}px)`,
        display: "flex",
        flexDirection: "column",
        gap: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          height: 62,
          borderRadius: 12,
          overflow: "hidden",
          border: `1px solid ${accent ? colors.lineStrong : colors.line}`,
          background: "rgba(0,0,0,0.4)",
          boxShadow: accent ? "0 0 50px -12px rgba(255,149,0,0.6)" : "none",
        }}
      >
        {segments.map((s, i) => {
          const grow = spring({
            frame: Math.max(0, frame - (appearAt + 6 + i * 3)),
            fps,
            config: springs.snappy,
          });
          const left = cursor;
          cursor += s.hours;
          return (
            <div
              key={`${s.color}-${i}`}
              style={{
                position: "relative",
                width: `${(s.hours / total) * 100}%`,
                background: s.color,
                transform: `scaleY(${grow})`,
                borderLeft: i === 0 ? "none" : "1px solid rgba(0,0,0,0.55)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
              title={`${left}h`}
            >
              {s.hours >= 3 && s.labelKey ? (
                <span
                  style={{
                    fontFamily: font.mono,
                    fontSize: 13,
                    letterSpacing: "0.06em",
                    color: "rgba(11,7,5,0.8)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {t(s.labelKey)}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
      <div
        style={{
          fontFamily: font.mono,
          fontSize: 16,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: accent ? colors.amber300 : colors.textFaint,
        }}
      >
        {caption}
      </div>
    </div>
  );
};

export const DayDebriefScene: React.FC<SceneProps> = ({ lang }) => {
  const t = useT(lang);
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const visual = spring({
    frame: Math.max(0, frame - 96),
    fps,
    config: springs.smooth,
  });
  const kickerP = spring({
    frame: Math.max(0, frame - 118),
    fps,
    config: springs.smooth,
  });

  const exit = interpolate(
    frame,
    [durationInFrames - 16, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <Backdrop heat={0.45} origin="20% 90%" />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 28,
          padding: "0 8%",
          textAlign: "center",
        }}
      >
        <h2 style={displayText(72)}>
          <Words text={t("daydebrief.heading")} delay={4} stagger={5} />
        </h2>

        <div
          style={{
            width: "100%",
            maxWidth: 1280,
            display: "flex",
            flexDirection: "column",
            gap: 26,
            marginTop: 10,
            opacity: visual,
          }}
        >
          <DayBar
            t={t}
            appearAt={100}
            caption={t("daydebrief.capActual")}
            segments={[
              {
                hours: 8,
                color: blockColors.sleep,
                labelKey: "daydebrief.seg.sleep",
              },
              {
                hours: 8,
                color: blockColors.work,
                labelKey: "daydebrief.seg.work",
              },
              {
                hours: 2,
                color: blockColors.chores,
                labelKey: "daydebrief.seg.overhead",
              },
              {
                hours: 6,
                color: blockColors.feed,
                labelKey: "daydebrief.seg.feed",
              },
            ]}
          />

          <DayBar
            t={t}
            appearAt={200}
            accent
            caption={t("daydebrief.capAllocated")}
            segments={[
              {
                hours: 8,
                color: blockColors.sleep,
                labelKey: "daydebrief.seg.sleep",
              },
              {
                hours: 8,
                color: blockColors.work,
                labelKey: "daydebrief.seg.work",
              },
              {
                hours: 2,
                color: blockColors.chores,
                labelKey: "daydebrief.seg.overhead",
              },
              { hours: 1, color: blockColors.body, labelKey: "daydebrief.seg.move" },
              {
                hours: 2,
                color: blockColors.people,
                labelKey: "daydebrief.seg.people",
              },
              {
                hours: 2,
                color: blockColors.craft,
                labelKey: "daydebrief.seg.craft",
              },
              {
                hours: 1,
                color: blockColors.stillness,
                labelKey: "daydebrief.seg.still",
              },
            ]}
          />
        </div>

        <div
          style={{
            marginTop: 18,
            opacity: kickerP,
            transform: `translateY(${(1 - kickerP) * 18}px)`,
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <Kicker delay={118}>{t("daydebrief.kicker")}</Kicker>
          <div
            style={{
              fontFamily: font.body,
              fontSize: 30,
              color: colors.textDim,
            }}
          >
            <Rich
              text={t("daydebrief.punch")}
              accentStyle={{ color: colors.amber300, fontStyle: "normal" }}
              boldStyle={{ color: colors.bone, fontWeight: 700 }}
            />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* -------------------------------------------------------------------------- *
 *  Jar debrief
 * -------------------------------------------------------------------------- */

type JarLayer = {
  kind: "rock" | "pebble" | "sand";
  cost: number;
  at: number;
  label?: string;
};

const layerColors: Record<JarLayer["kind"], string> = {
  rock: blockColors.rock,
  pebble: blockColors.pebble,
  sand: blockColors.sand,
};

const MiniJar: React.FC<{
  layers: JarLayer[];
  appearAt: number;
  title: string;
  filledLabel: string;
  footnote: string;
  good: boolean;
}> = ({ layers, appearAt, title, filledLabel, footnote, good }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: Math.max(0, frame - appearAt),
    fps,
    config: springs.smooth,
  });

  // The perfect run fills the jar to exactly 100; the bad run stalls at 95.
  const filled = layers.reduce((sum, l) => sum + l.cost, 0);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", gap: 14, width: 300 }}
    >
      <div
        style={{
          fontFamily: font.mono,
          fontSize: 15,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: good ? colors.good : colors.bad,
        }}
      >
        {title}
      </div>

      <div
        style={{
          position: "relative",
          height: 470,
          display: "flex",
          flexDirection: "column-reverse",
          borderRadius: "10px 10px 26px 26px",
          border: `1.5px solid ${
            good ? "rgba(143,217,168,0.5)" : "rgba(255,138,107,0.5)"
          }`,
          background: "rgba(0,0,0,0.42)",
          overflow: "hidden",
          opacity: enter,
        }}
      >
        {layers.map((l, i) => {
          const p = spring({
            frame: Math.max(0, frame - l.at),
            fps,
            config: l.kind === "rock" ? springs.heavy : springs.snappy,
          });
          return (
            <div
              key={i}
              style={{
                height: `${l.cost}%`,
                background: layerColors[l.kind],
                borderTop: "1px solid rgba(0,0,0,0.4)",
                opacity: l.kind === "rock" ? 1 : 0.94,
                transform: `translateY(${(1 - p) * 70}px) scaleY(${
                  0.6 + p * 0.4
                })`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              {l.label ? (
                <span
                  style={{
                    fontFamily: font.mono,
                    fontSize: 12,
                    letterSpacing: "0.08em",
                    color: "rgba(11,7,5,0.72)",
                  }}
                >
                  {l.label}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontFamily: font.mono, fontSize: 15, color: colors.textDim }}>
          {filledLabel}{" "}
          <b style={{ color: good ? colors.good : colors.bad }}>{filled}/100</b>
        </div>
        <div
          style={{
            fontFamily: font.body,
            fontSize: 17,
            lineHeight: 1.45,
            color: colors.textDim,
          }}
        >
          <Rich
            text={footnote}
            accentStyle={{
              color: good ? colors.good : colors.bad,
              fontStyle: "normal",
            }}
          />
        </div>
      </div>
    </div>
  );
};

const pad = (
  n: number,
  at: number,
  kind: JarLayer["kind"],
  cost: number,
  label?: string,
) =>
  Array.from({ length: n }, (_, i) => ({
    kind,
    cost,
    at: at + i * 6,
    label: i === 0 ? label : undefined,
  }));

export const JarDebriefScene: React.FC<SceneProps> = ({ lang }) => {
  const t = useT(lang);
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const jars = spring({
    frame: Math.max(0, frame - 84),
    fps,
    config: springs.smooth,
  });
  const punch = spring({
    frame: Math.max(0, frame - 296),
    fps,
    config: springs.smooth,
  });

  const exit = interpolate(
    frame,
    [durationInFrames - 16, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <Backdrop heat={0.5} origin="50% 110%" />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 26,
          padding: "0 6%",
        }}
      >
        <h2 style={{ ...displayText(66), textAlign: "center" }}>
          <Words text={t("jardebrief.heading")} delay={2} stagger={4} />
        </h2>

        <div
          style={{
            display: "flex",
            gap: 96,
            alignItems: "flex-start",
            opacity: jars,
          }}
        >
          <MiniJar
            appearAt={96}
            title={t("jardebrief.sand")}
            good={false}
            filledLabel={t("jardebrief.filled")}
            footnote={t("jardebrief.footnoteSand")}
            layers={[
              ...pad(10, 110, "sand", 2),
              ...pad(5, 174, "pebble", 5),
              { kind: "rock", cost: 25, at: 206, label: t("jardebrief.layerRock") },
              { kind: "rock", cost: 25, at: 214, label: t("jardebrief.layerRock") },
            ]}
          />

          <MiniJar
            appearAt={96}
            title={t("jardebrief.rocks")}
            good
            filledLabel={t("jardebrief.filled")}
            footnote={t("jardebrief.footnoteRocks")}
            layers={[
              { kind: "rock", cost: 25, at: 110, label: t("jardebrief.layerRock") },
              { kind: "rock", cost: 25, at: 118, label: t("jardebrief.layerRock") },
              { kind: "rock", cost: 25, at: 126, label: t("jardebrief.layerRock") },
              ...pad(5, 136, "pebble", 3),
              ...pad(10, 172, "sand", 1),
            ]}
          />
        </div>

        <div
          style={{
            marginTop: 8,
            opacity: punch,
            transform: `translateY(${(1 - punch) * 24}px)`,
            display: "flex",
            alignItems: "center",
            gap: 22,
          }}
        >
          <Rule delay={296} width={70} thickness={3} />
          <div
            style={{
              fontFamily: font.display,
              fontSize: 32,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: colors.amber200,
            }}
          >
            {t("jardebrief.punch")}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
