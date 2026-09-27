import type { FC } from "react";
import type { Lang } from "../i18n";
import { FRAMING_FPS, FRAMING_HEIGHT, FRAMING_WIDTH } from "./constants";
import { DayDebriefScene, JarDebriefScene } from "./scenes/Debriefs";
import { FramingScene, HorizonScene, RulesScene, TitleScene } from "./scenes/Lecture";

/**
 * Every scene is a pure function of the language, so the same composition can
 * be rendered in English or Vietnamese - in the app, in Remotion Studio, or
 * straight out to MP4.
 */
export type SceneProps = { lang: Lang };

export type SceneDef = {
  /** Stable id, also used as the Remotion composition id. */
  id: string;
  title: string;
  component: FC<SceneProps>;
  durationInFrames: number;
};

/**
 * One registry, two consumers: `Root.tsx` turns it into Remotion compositions
 * (for `npm run studio` / `npm run render`), and the lecture app turns it into
 * embeddable `<Player>` sections. Durations therefore can never drift apart.
 */
export const SCENES: SceneDef[] = [
  {
    id: "Title",
    title: "Title — The Priority of Life",
    component: TitleScene,
    durationInFrames: 180,
  },
  {
    id: "Framing",
    title: "Framing — the arithmetic nobody escapes",
    component: FramingScene,
    durationInFrames: 360,
  },
  {
    id: "DayDebrief",
    title: "Debrief — the day is a container",
    component: DayDebriefScene,
    durationInFrames: 360,
  },
  {
    id: "JarDebrief",
    title: "Debrief — order decides what fits",
    component: JarDebriefScene,
    durationInFrames: 420,
  },
  {
    id: "Horizon",
    title: "Horizon — the same question at every scale",
    component: HorizonScene,
    durationInFrames: 450,
  },
  {
    id: "Rules",
    title: "Closing — three rules",
    component: RulesScene,
    durationInFrames: 360,
  },
];

export const sceneById = (id: string): SceneDef => {
  const found = SCENES.find((s) => s.id === id);
  if (!found) throw new Error(`Unknown scene: ${id}`);
  return found;
};

export { FRAMING_FPS, FRAMING_HEIGHT, FRAMING_WIDTH };
