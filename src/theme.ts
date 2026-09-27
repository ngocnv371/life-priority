/**
 * Single source of truth for the lecture's palette and motion vocabulary.
 * Everything is warm: amber, ember and bone against a near-black brown.
 * The only cold colour in the whole deck is `feed` - the default that
 * quietly eats an unclaimed day.
 */

export const colors = {
  // Warm ramp, darkest -> lightest
  ink: "#0B0705",
  inkSoft: "#140C07",
  panel: "#1B110A",
  panelRaised: "#241609",
  line: "rgba(255, 176, 74, 0.16)",
  lineStrong: "rgba(255, 176, 74, 0.34)",

  ember: "#7A2E06",
  amber600: "#B8560A",
  amber500: "#E8760A",
  amber400: "#FF9500",
  amber300: "#FFB347",
  amber200: "#FFD28A",
  amber100: "#FFE9C2",
  bone: "#FFF7E8",

  // Text
  text: "#F7EBDD",
  textDim: "rgba(247, 235, 221, 0.62)",
  textFaint: "rgba(247, 235, 221, 0.34)",

  // The only cold colour: the unclaimed default
  feed: "#5B6875",
  feedDeep: "#333C46",

  // Semantic
  good: "#8FD9A8",
  warn: "#FFCF6B",
  bad: "#FF8A6B",
} as const;

/** Block identity colours, all within (or deliberately outside) the amber family. */
export const blockColors = {
  sleep: "#8A6A38",
  work: "#A8703A",
  chores: "#8C6242",
  body: "#FFB347",
  people: "#FF8A5B",
  craft: "#FFD166",
  stillness: "#C9A227",
  feed: "#5B6875",
  rock: "#D9741E",
  pebble: "#F0A63C",
  sand: "#FFD79A",
} as const;

/** Motion vocabulary - keep spring configs consistent across scenes and UI. */
export const springs = {
  /** Smooth, no bounce. Reveals and text. */
  smooth: { damping: 200 },
  /** Snappy, minimal bounce. UI elements, blocks landing. */
  snappy: { damping: 20, stiffness: 200 },
  /** Playful entrance. */
  bouncy: { damping: 8 },
  /** Heavy, slow, small bounce. Big rocks. */
  heavy: { damping: 15, stiffness: 80, mass: 2 },
} as const;

export const font = {
  display:
    '"Segoe UI Variable Display", "Segoe UI", Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  body: '"Segoe UI Variable Text", "Segoe UI", Inter, -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
  mono: '"Cascadia Mono", "Consolas", "SF Mono", ui-monospace, monospace',
} as const;
