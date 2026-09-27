import React from "react";
import { Composition, Folder } from "remotion";
import {
  FRAMING_FPS,
  FRAMING_HEIGHT,
  FRAMING_WIDTH,
} from "./constants";
import { SCENES } from "./registry";

/**
 * Remotion root. Every scene in the lecture is a renderable composition, so the
 * animated sections can be exported as MP4s (e.g. to share the lecture, or to
 * play them back if a venue machine struggles with live rendering).
 */
export const RemotionRoot: React.FC = () => {
  return (
    <Folder name="life-priority">
      {SCENES.map((scene) => {
        const Component = scene.component;
        return (
          <Composition
            key={scene.id}
            id={scene.id}
            component={Component}
            durationInFrames={scene.durationInFrames}
            fps={FRAMING_FPS}
            width={FRAMING_WIDTH}
            height={FRAMING_HEIGHT}
            defaultProps={{ lang: "en" }}
          />
        );
      })}
    </Folder>
  );
};
