import type { DictKey } from "../i18n";
import { blockColors } from "../theme";

/* ========================================================================== *
 *  Puzzle data.
 *
 *  No display text lives here - only dictionary *keys*. That keeps every
 *  language in one place and makes a missing translation a compile error.
 * ========================================================================== */

export type Localised = {
  nameKey: DictKey;
  blurbKey: DictKey;
};

/* -------------------------------------------------------------------------- *
 *  PUZZLE 1 - the 24 hour box
 * -------------------------------------------------------------------------- */

export type DayBlock = Localised & {
  id: string;
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
    nameKey: "day.block.sleep.name",
    blurbKey: "day.block.sleep.blurb",
    hours: 8,
    color: blockColors.sleep,
  },
  {
    id: "work",
    nameKey: "day.block.work.name",
    blurbKey: "day.block.work.blurb",
    hours: 8,
    color: blockColors.work,
  },
  {
    id: "chores",
    nameKey: "day.block.chores.name",
    blurbKey: "day.block.chores.blurb",
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
    nameKey: "day.block.body.name",
    blurbKey: "day.block.body.blurb",
    hours: 1,
    color: blockColors.body,
  },
  {
    id: "people",
    nameKey: "day.block.people.name",
    blurbKey: "day.block.people.blurb",
    hours: 2,
    color: blockColors.people,
  },
  {
    id: "craft",
    nameKey: "day.block.craft.name",
    blurbKey: "day.block.craft.blurb",
    hours: 2,
    color: blockColors.craft,
  },
  {
    id: "stillness",
    nameKey: "day.block.stillness.name",
    blurbKey: "day.block.stillness.blurb",
    hours: 1,
    color: blockColors.stillness,
  },
];

export const CHOICE_HOURS = CHOICE_BLOCKS.reduce((a, b) => a + b.hours, 0);

export const blockById = (id: string): DayBlock | undefined =>
  [...LOCKED_BLOCKS, ...CHOICE_BLOCKS].find((b) => b.id === id);

/* -------------------------------------------------------------------------- *
 *  PUZZLE 2 - the jar
 * -------------------------------------------------------------------------- */

export type JarKind = "rock" | "pebble" | "sand";

export type JarItem = Localised & {
  id: string;
  kind: JarKind;
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
    nameKey: "jar.item.r1.name",
    blurbKey: "jar.item.r1.blurb",
    cost: 25,
    color: blockColors.rock,
  },
  {
    id: "r2",
    kind: "rock",
    nameKey: "jar.item.r2.name",
    blurbKey: "jar.item.r2.blurb",
    cost: 25,
    color: blockColors.rock,
  },
  {
    id: "r3",
    kind: "rock",
    nameKey: "jar.item.r3.name",
    blurbKey: "jar.item.r3.blurb",
    cost: 25,
    color: blockColors.rock,
  },
  {
    id: "p1",
    kind: "pebble",
    nameKey: "jar.item.p1.name",
    blurbKey: "jar.item.p1.blurb",
    cost: 5,
    color: blockColors.pebble,
  },
  {
    id: "s1",
    kind: "sand",
    nameKey: "jar.item.s1.name",
    blurbKey: "jar.item.s1.blurb",
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

export const JAR_LABELS: Record<JarKind, DictKey> = {
  rock: "jardebrief.layerRock",
  pebble: "jardebrief.layerPebble",
  sand: "jardebrief.layerSand",
};

/** Nominal volume of everything on the bench, before any compaction. */
export const JAR_NOMINAL = JAR_ITEMS.reduce(
  (sum, item) => sum + itemQuota(item) * item.cost,
  0,
);
