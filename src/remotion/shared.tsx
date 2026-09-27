import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, font, springs } from "../theme";

/* ========================================================================== *
 *  Shared, non-interactive building blocks for every Remotion scene.
 *
 *  All motion is driven by useCurrentFrame(). No CSS transitions, no CSS
 *  animations, no Tailwind animation classes - those do not render correctly.
 * ========================================================================== */

/** Warm ambient backdrop: gradients, a slow amber bloom, vignette and grain. */
export const Backdrop: React.FC<{
  /** 0 = calm, 1 = hot. Scales the bloom and pulse. */
  heat?: number;
  /** Where the bloom sits. */
  origin?: string;
}> = ({ heat = 0.5, origin = "18% 12%" }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Slow breathing bloom so nothing on screen is ever perfectly static.
  const pulse = 0.5 + 0.5 * Math.sin((frame / fps) * 0.55);
  const drift = interpolate(frame, [0, durationInFrames], [0, 26], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `radial-gradient(120% 105% at ${origin}, rgba(232,118,10,${
            0.14 + heat * 0.16 * pulse
          }) 0%, transparent 58%),
          radial-gradient(95% 80% at 96% 108%, rgba(122,46,6,${
            0.3 + heat * 0.18
          }) 0%, transparent 62%),
          linear-gradient(178deg, ${colors.ink} 0%, ${colors.inkSoft} 58%, ${
            colors.ink
          } 100%)`,
        }}
      />

      {/* Faint concentric rings - a quiet clock face nobody can read. */}
      <AbsoluteFill
        style={{
          transform: `translateY(${drift}px)`,
          opacity: 0.5,
          background: `repeating-radial-gradient(circle at ${origin}, transparent 0 118px, rgba(255,176,74,0.05) 118px 120px)`,
        }}
      />

      {/* Vignette */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(130% 120% at 50% 45%, transparent 42%, rgba(0,0,0,0.66) 100%)`,
        }}
      />

      {/* Grain */}
      <AbsoluteFill
        style={{
          opacity: 0.22,
          mixBlendMode: "overlay",
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='180' height='180' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />
    </AbsoluteFill>
  );
};

/** Small mono kicker line. Springs in, drifts up slightly. */
export const Kicker: React.FC<{
  children: React.ReactNode;
  delay?: number;
  color?: string;
}> = ({ children, delay = 0, color = colors.amber500 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const p = spring({
    frame: Math.max(0, frame - delay),
    fps,
    config: springs.smooth,
  });

  return (
    <div
      style={{
        fontFamily: font.mono,
        fontSize: 19,
        letterSpacing: "0.3em",
        textTransform: "uppercase",
        color,
        opacity: p,
        transform: `translateY(${(1 - p) * 14}px)`,
      }}
    >
      {children}
    </div>
  );
};

/**
 * Word-by-word reveal. Uses per-word transforms (not per-character opacity) so
 * the text stays crisp and legible at projector scale.
 */
export const Words: React.FC<{
  text: string;
  delay?: number;
  stagger?: number;
  style?: React.CSSProperties;
  /** Words wrapped in *asterisks* render in amber. */
}> = ({ text, delay = 0, stagger = 3, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  return (
    <span
      style={{
        display: "inline-flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "0.26em",
        ...style,
      }}
    >
      {words.map((word, i) => {
        // A word carrying a marker takes that style, and the markers are
        // stripped - so `*container*,` still reads as accent + punctuation.
        const accent = word.includes("*");
        const bold = !accent && word.includes("~");
        const clean = word.replace(/[*~]/g, "");
        const p = spring({
          frame: Math.max(0, frame - delay - i * stagger),
          fps,
          config: springs.smooth,
        });
        return (
          <span
            key={`${word}-${i}`}
            style={{
              display: "inline-block",
              opacity: p,
              transform: `translateY(${(1 - p) * 30}px)`,
              color: accent ? colors.amber300 : undefined,
              fontWeight: bold ? 700 : undefined,
            }}
          >
            {clean}
          </span>
        );
      })}
    </span>
  );
};

/** A line of text that fades in, holds, then fades out. Used for statements. */
export const Beat: React.FC<{
  children: React.ReactNode;
  /** Frames to hold before the exit begins (defaults to leaving 14 frames). */
  hold?: number;
  align?: React.CSSProperties["alignItems"];
  gap?: number;
}> = ({ children, hold, align = "center", gap = 26 }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const exitStart = hold ?? durationInFrames - 14;
  const out = interpolate(frame, [exitStart, exitStart + 14], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rise = interpolate(frame, [exitStart, exitStart + 14], [0, -26], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const enter = spring({ frame, fps, config: springs.smooth });

  return (
    <AbsoluteFill
      style={{
        alignItems: align,
        justifyContent: "center",
        flexDirection: "column",
        gap,
        padding: "0 9%",
        textAlign: "center",
        opacity: out,
        transform: `translateY(${rise}px) scale(${0.97 + enter * 0.03})`,
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

/** A hairline that wipes across the frame. */
export const Rule: React.FC<{
  delay?: number;
  width?: number | string;
  thickness?: number;
  color?: string;
  durationInFrames?: number;
}> = ({ delay = 0, width = "38%", thickness = 2, color = colors.amber400, durationInFrames = 34 }) => {
  const frame = useCurrentFrame();
  const grow = interpolate(frame, [delay, delay + durationInFrames], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width,
        height: thickness,
        borderRadius: 999,
        background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
        transform: `scaleX(${grow})`,
      }}
    />
  );
};

/** Counts a number up. Monospace so digits don't jitter the layout. */
export const CountUp: React.FC<{
  to: number;
  delay?: number;
  durationInFrames?: number;
  suffix?: string;
  style?: React.CSSProperties;
}> = ({ to, delay = 0, durationInFrames = 45, suffix = "", style }) => {
  const frame = useCurrentFrame();
  const v = interpolate(frame, [delay, delay + durationInFrames], [0, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <span style={{ fontVariantNumeric: "tabular-nums", ...style }}>
      {Math.round(v).toLocaleString("en-US")}
      {suffix}
    </span>
  );
};

/** Shared display-text style so every scene speaks with one voice. */
export const displayText = (size: number): React.CSSProperties => ({
  fontFamily: font.display,
  fontSize: size,
  fontWeight: 700,
  letterSpacing: "-0.03em",
  lineHeight: 1.04,
  color: colors.bone,
  margin: 0,
});
