import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Series,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, font, springs } from "../../theme";
import { Backdrop, Beat, CountUp, Kicker, Rule, Words, displayText } from "../shared";

/* ========================================================================== *
 *  Scene 1 - Title
 * ========================================================================== */

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const rotate = interpolate(frame, [0, durationInFrames], [0, 42], {
    extrapolateRight: "clamp",
  });
  const sweep = interpolate(frame, [0, durationInFrames], [0, 300], {
    extrapolateRight: "clamp",
  });
  const bloom = spring({ frame: frame - 4, fps, config: springs.smooth });
  const exit = interpolate(
    frame,
    [durationInFrames - 18, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill style={{ opacity: exit }}>
      <Backdrop heat={0.75} />

      {/* Concentric rings that turn almost imperceptibly. */}
      <AbsoluteFill
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <div
          style={{
            width: 1180,
            height: 1180,
            borderRadius: "50%",
            transform: `rotate(${rotate}deg) scale(${0.85 + bloom * 0.15})`,
            opacity: 0.55 * bloom,
            background:
              "repeating-conic-gradient(from 0deg, rgba(255,176,74,0.14) 0deg 1.1deg, transparent 1.1deg 11deg)",
            maskImage:
              "radial-gradient(circle, transparent 52%, #000 56%, #000 97%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(circle, transparent 52%, #000 56%, #000 97%, transparent 100%)",
          }}
        />
      </AbsoluteFill>

      {/* A single warm sweep of light crossing the frame. */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(104deg, transparent ${sweep - 30}%, rgba(255,179,71,0.09) ${
            sweep - 8
          }%, transparent ${sweep + 16}%)`,
        }}
      />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 30,
          padding: "0 7%",
          textAlign: "center",
        }}
      >
        <Kicker delay={6}>A lecture on order, leverage and attention</Kicker>

        <h1
          style={{
            ...displayText(132),
            textTransform: "uppercase",
            letterSpacing: "-0.045em",
            maxWidth: 1400,
            textShadow: "0 0 90px rgba(255,149,0,0.35)",
          }}
        >
          <Words text="The Priority of Life" delay={16} stagger={5} />
        </h1>

        <Rule delay={44} width={520} thickness={2} />

        <p
          style={{
            fontFamily: font.body,
            fontSize: 26,
            lineHeight: 1.5,
            color: colors.textDim,
            margin: 0,
            maxWidth: 900,
          }}
        >
          <Words
            text="Not a list of goals. A *container*, and a decision about what goes in first."
            delay={54}
            stagger={2}
          />
        </p>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ========================================================================== *
 *  Scene 2 - Framing: the arithmetic nobody escapes
 * ========================================================================== */

const Stat: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    style={{
      fontFamily: font.mono,
      fontSize: 30,
      letterSpacing: "0.14em",
      color: colors.amber300,
      padding: "10px 22px",
      border: `1px solid ${colors.line}`,
      borderRadius: 999,
      background: "rgba(255,176,74,0.06)",
    }}
  >
    {children}
  </div>
);

export const FramingScene: React.FC = () => (
  <AbsoluteFill>
    <Backdrop heat={0.5} origin="82% 18%" />

    <Series>
      {/* Beat 1 */}
      <Series.Sequence durationInFrames={78}>
        <Beat gap={22}>
          <Kicker>The inventory</Kicker>
          <h2 style={displayText(104)}>
            <Words text="You have *24 hours*." delay={8} stagger={5} />
          </h2>
        </Beat>
      </Series.Sequence>

      {/* Beat 2 */}
      <Series.Sequence durationInFrames={84}>
        <Beat gap={20}>
          <h2 style={displayText(84)}>
            <Words text="Not 24 hours for everything." delay={4} stagger={4} />
          </h2>
          <p
            style={{
              fontFamily: font.body,
              fontSize: 34,
              color: colors.textDim,
              margin: 0,
            }}
          >
            <Words
              text="24 hours. In total. For everything."
              delay={24}
              stagger={4}
            />
          </p>
        </Beat>
      </Series.Sequence>

      {/* Beat 3 */}
      <Series.Sequence durationInFrames={96}>
        <Beat gap={34}>
          <h2 style={displayText(76)}>
            <Words
              text="Sleep and work will ask for *two thirds*."
              delay={4}
              stagger={4}
            />
          </h2>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            <Stat>8h sleep</Stat>
            <Stat>8h work</Stat>
            <Stat>2h overhead</Stat>
            <Stat>6h left over</Stat>
          </div>
        </Beat>
      </Series.Sequence>

      {/* Beat 4 */}
      <Series.Sequence durationInFrames={102}>
        <Beat gap={26}>
          <Kicker delay={2}>Which collapses the whole problem</Kicker>
          <h2 style={displayText(80)}>
            <Words
              text="The only question is: *what comes first?*"
              delay={14}
              stagger={5}
            />
          </h2>
        </Beat>
      </Series.Sequence>
    </Series>
  </AbsoluteFill>
);

/* ========================================================================== *
 *  Scene 3 - Horizon: the same question at every scale
 * ========================================================================== */

type Period = {
  label: string;
  hours: number;
  unit: string;
};

const PERIODS: Period[] = [
  { label: "One day", hours: 24, unit: "hours" },
  { label: "One week", hours: 168, unit: "hours" },
  { label: "One year", hours: 8760, unit: "hours" },
  { label: "Ten years", hours: 87600, unit: "hours" },
];

const PeriodRow: React.FC<{
  period: Period;
  index: number;
  appearAt: number;
}> = ({ period, index, appearAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({
    frame: Math.max(0, frame - appearAt),
    fps,
    config: springs.smooth,
  });

  const segments = [
    { key: "sleep", color: colors.amber600, w: 1 / 3 },
    { key: "work", color: colors.amber500, w: 1 / 3 },
    { key: "free", color: colors.amber300, w: 1 / 3 },
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "190px 1fr 220px",
        alignItems: "center",
        gap: 26,
        opacity: enter,
        transform: `translateX(${(1 - enter) * -36}px)`,
      }}
    >
      <div
        style={{
          fontFamily: font.mono,
          fontSize: 20,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: index === 3 ? colors.amber200 : colors.textFaint,
        }}
      >
        {period.label}
      </div>

      <div
        style={{
          display: "flex",
          height: 40,
          borderRadius: 10,
          overflow: "hidden",
          border: `1px solid ${colors.line}`,
          background: "rgba(0,0,0,0.35)",
        }}
      >
        {segments.map((s, i) => {
          const grow = spring({
            frame: Math.max(0, frame - appearAt - 6 - i * 5),
            fps,
            config: springs.snappy,
          });
          return (
            <div
              key={s.key}
              style={{
                width: `${s.w * 100}%`,
                background: s.color,
                opacity: s.key === "free" ? 1 : 0.72,
                transform: `scaleX(${grow})`,
                transformOrigin: "left center",
                boxShadow:
                  s.key === "free"
                    ? "0 0 26px rgba(255,179,71,0.55) inset"
                    : "none",
              }}
            />
          );
        })}
      </div>

      <div
        style={{
          fontFamily: font.mono,
          fontSize: 22,
          textAlign: "right",
          color: colors.bone,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        <CountUp to={period.hours} delay={appearAt + 10} durationInFrames={45} />{" "}
        <span style={{ color: colors.textFaint, fontSize: 16 }}>
          {period.unit}
        </span>
      </div>
    </div>
  );
};

export const HorizonScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const head = spring({ frame: frame - 2, fps, config: springs.smooth });
  const callout = spring({
    frame: Math.max(0, frame - 300),
    fps,
    config: springs.smooth,
  });

  return (
    <AbsoluteFill>
      <Backdrop heat={0.4} origin="50% -20%" />

      <AbsoluteFill
        style={{
          padding: "70px 90px",
          flexDirection: "column",
          justifyContent: "center",
          gap: 34,
        }}
      >
        <div
          style={{
            opacity: head,
            transform: `translateY(${(1 - head) * 22}px)`,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <Kicker>The same question, at every scale</Kicker>
          <h2 style={displayText(62)}>
            Your life is this day, repeated.
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {PERIODS.map((p, i) => (
            <PeriodRow key={p.label} period={p} index={i} appearAt={40 + i * 48} />
          ))}
        </div>

        <div
          style={{
            opacity: callout,
            transform: `translateY(${(1 - callout) * 26}px)`,
            display: "flex",
            alignItems: "center",
            gap: 32,
            marginTop: 12,
            padding: "22px 28px",
            border: `1px solid ${colors.lineStrong}`,
            borderRadius: 18,
            background: "rgba(255,176,74,0.06)",
          }}
        >
          <div
            style={{
              fontFamily: font.display,
              fontSize: 74,
              fontWeight: 700,
              letterSpacing: "-0.04em",
              color: colors.amber300,
              fontVariantNumeric: "tabular-nums",
              lineHeight: 1,
            }}
          >
            29,200
          </div>
          <div
            style={{
              fontFamily: font.body,
              fontSize: 26,
              lineHeight: 1.45,
              color: colors.textDim,
            }}
          >
            unclaimed hours in ten years — if you only ever protect{" "}
            <b style={{ color: colors.bone }}>8 hours a day</b>. That is three
            and a third years of full days. The largest single resource you will
            ever own.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/* ========================================================================== *
 *  Scene 4 - Closing rules
 * ========================================================================== */

const RULES: { n: string; text: string; note: string }[] = [
  {
    n: "01",
    text: "Name the rocks first.",
    note: "Before the week starts, decide what cannot be moved. Write it down.",
  },
  {
    n: "02",
    text: "Pay for small things last.",
    note: "Fine material is cheap only when it fills the gaps big things leave.",
  },
  {
    n: "03",
    text: "Claim the time, or lose it.",
    note: "Whatever you leave unassigned, the feed will take. Quietly, and by default.",
  },
];

const RuleRow: React.FC<{ rule: (typeof RULES)[number]; appearAt: number }> = ({
  rule,
  appearAt,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({
    frame: Math.max(0, frame - appearAt),
    fps,
    config: springs.smooth,
  });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "96px 1fr",
        gap: 26,
        alignItems: "baseline",
        padding: "18px 0",
        borderBottom: `1px solid ${colors.line}`,
        opacity: p,
        transform: `translateY(${(1 - p) * 30}px)`,
      }}
    >
      <div
        style={{
          fontFamily: font.mono,
          fontSize: 26,
          letterSpacing: "0.1em",
          color: colors.amber500,
        }}
      >
        {rule.n}
      </div>
      <div>
        <div style={{ ...displayText(46), marginBottom: 6 }}>{rule.text}</div>
        <div
          style={{
            fontFamily: font.body,
            fontSize: 21,
            color: colors.textDim,
            lineHeight: 1.5,
          }}
        >
          {rule.note}
        </div>
      </div>
    </div>
  );
};

export const RulesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const head = spring({ frame: frame - 2, fps, config: springs.smooth });
  const end = spring({
    frame: Math.max(0, frame - 268),
    fps,
    config: springs.smooth,
  });

  return (
    <AbsoluteFill>
      <Backdrop heat={0.55} origin="50% 120%" />

      <AbsoluteFill
        style={{
          padding: "64px 110px",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            opacity: head,
            transform: `translateY(${(1 - head) * 20}px)`,
            marginBottom: 16,
          }}
        >
          <Kicker>Three rules that survive contact with a real week</Kicker>
        </div>

        {RULES.map((r, i) => (
          <RuleRow key={r.n} rule={r} appearAt={30 + i * 72} />
        ))}

        <div
          style={{
            marginTop: 40,
            opacity: end,
            transform: `translateY(${(1 - end) * 24}px)`,
            display: "flex",
            alignItems: "center",
            gap: 22,
          }}
        >
          <Rule delay={268} width={90} thickness={3} />
          <div
            style={{
              fontFamily: font.display,
              fontSize: 34,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: colors.amber200,
            }}
          >
            Priority is not a feeling. It is an order.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
