import { blockColors } from "../theme";

/* ========================================================================== *
 *  PUZZLE 1 - the 24 hour box
 * ========================================================================== */

export type DayBlock = {
  id: string;
  name: string;
  blurb: string;
  hours: number;
  color: string;
};

export const DAY_TOTAL = 24;

/** Already spent before you wake up. Rendered pre-placed and not removable. */
export const FIXED_HOURS = 18;

/** The fixed base of every day, bottom of the box first. */
export const LOCKED_BLOCKS: DayBlock[] = [
  {
    id: "sleep",
    name: "Sleep",
    blurb: "Eight hours. Your brain files the whole day while you're gone.",
    hours: 8,
    color: blockColors.sleep,
  },
  {
    id: "work",
    name: "Work / School",
    blurb: "The thing you're paid for, or the thing you're training for.",
    hours: 8,
    color: blockColors.work,
  },
  {
    id: "chores",
    name: "Commute & chores",
    blurb: "The tax on having a body, a home and a postcode.",
    hours: 2,
    color: blockColors.chores,
  },
];

/**
 * The contested six hours. Together they fill the day exactly - so a perfect
 * day is reachable, and any shortfall is a decision rather than arithmetic.
 */
export const CHOICE_BLOCKS: DayBlock[] = [
  {
    id: "body",
    name: "Move",
    blurb: "One hour where your heart rate matters more than your inbox.",
    hours: 1,
    color: blockColors.body,
  },
  {
    id: "people",
    name: "People",
    blurb: "Two hours with the humans who would notice if you vanished.",
    hours: 2,
    color: blockColors.people,
  },
  {
    id: "craft",
    name: "Craft",
    blurb: "Two hours on the thing only you can make. Usually unpaid.",
    hours: 2,
    color: blockColors.craft,
  },
  {
    id: "stillness",
    name: "Stillness",
    blurb: "One hour, offline, doing nothing that produces a metric.",
    hours: 1,
    color: blockColors.stillness,
  },
];

export const CHOICE_HOURS = CHOICE_BLOCKS.reduce((a, b) => a + b.hours, 0);

export const blockById = (id: string): DayBlock | undefined =>
  [...LOCKED_BLOCKS, ...CHOICE_BLOCKS].find((b) => b.id === id);

/* ========================================================================== *
 *  PUZZLE 2 - the jar
 * ========================================================================== */

export type JarKind = "rock" | "pebble" | "sand";

export type JarItem = {
  id: string;
  kind: JarKind;
  name: string;
  blurb: string;
  /** Nominal volume, before compaction. */
  cost: number;
  color: string;
};

export const JAR_CAPACITY = 100;

/**
 * Fine material only gets cheaper once there are rocks in the jar for it to
 * settle around. This single multiplier is the whole lesson of the puzzle.
 */
export const COMPACTION: Record<JarKind, number> = {
  rock: 1,
  pebble: 0.6,
  sand: 0.5,
};

export const JAR_ITEMS: JarItem[] = [
  {
    id: "r1",
    kind: "rock",
    name: "Health",
    blurb: "The body that carries every other plan you have.",
    cost: 25,
    color: blockColors.rock,
  },
  {
    id: "r2",
    kind: "rock",
    name: "People",
    blurb: "The handful of relationships that are not optional.",
    cost: 25,
    color: blockColors.rock,
  },
  {
    id: "r3",
    kind: "rock",
    name: "Craft",
    blurb: "The work you would still do if nobody paid you.",
    cost: 25,
    color: blockColors.rock,
  },
  {
    id: "p1",
    kind: "pebble",
    name: "Pebble ×5",
    blurb: "Email, meetings that could be notes, errands, admin, other people's urgencies.",
    cost: 5,
    color: blockColors.pebble,
  },
  {
    id: "s1",
    kind: "sand",
    name: "Sand ×10",
    blurb: "A scroll here, a notification there. Individually nothing.",
    cost: 2,
    color: blockColors.sand,
  },
];

export const JAR_COUNTS: Record<JarKind, number> = {
  rock: 3,
  pebble: 5,
  sand: 10,
};

/**
 * How many of a single tray entry may be placed. Each named rock is unique
 * (Health, People, Craft); pebbles and sand come in stacks.
 */
export const itemQuota = (item: JarItem): number =>
  item.kind === "rock" ? 1 : JAR_COUNTS[item.kind];

/** What a unit actually costs right now, given the jar's current contents. */
export const unitCost = (item: JarItem, hasRock: boolean): number =>
  Math.round(item.cost * (hasRock ? COMPACTION[item.kind] : 1));

export const JAR_LABELS: Record<JarKind, string> = {
  rock: "Rock",
  pebble: "Pebble",
  sand: "Sand",
};
