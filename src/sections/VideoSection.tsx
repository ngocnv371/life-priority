import React, { useEffect, useRef } from "react";
import { Player, type PlayerRef } from "@remotion/player";
import {
  FRAMING_FPS,
  FRAMING_HEIGHT,
  FRAMING_WIDTH,
} from "../remotion/constants";
import { sceneById } from "../remotion/registry";

/* ========================================================================== *
 *  Wraps a Remotion composition in an interactive <Player>.
 *
 *  The scene is a real, seekable video element: the presenter can scrub, pause
 *  and replay it. When `autoAdvance` is on we poll the playhead and hand control
 *  back to the deck as soon as the scene ends, so a talk can run hands-free.
 * ========================================================================== */

export const VideoSection: React.FC<{
  sceneId: string;
  caption: React.ReactNode;
  autoAdvance: boolean;
  onFinished: () => void;
}> = ({ sceneId, caption, autoAdvance, onFinished }) => {
  const scene = sceneById(sceneId);
  const player = useRef<PlayerRef>(null);

  // Keep the callback in a ref so the polling interval never restarts.
  const finished = useRef(onFinished);
  finished.current = onFinished;

  // Guard so a scene that ends near a frame boundary can only advance once.
  const fired = useRef(false);

  useEffect(() => {
    if (!autoAdvance) return;
    const timer = window.setInterval(() => {
      const p = player.current;
      if (!p || fired.current) return;
      // Deliberately not gated on isPlaying(): a finished non-looping Player
      // pauses itself, which is exactly the moment we want to hand back.
      if (p.getCurrentFrame() >= scene.durationInFrames - 2) {
        fired.current = true;
        finished.current();
      }
    }, 150);
    return () => window.clearInterval(timer);
  }, [autoAdvance, scene.durationInFrames]);

  return (
    <div className="video-stage">
      <div className="video-frame">
        <Player
          ref={player}
          component={scene.component}
          durationInFrames={scene.durationInFrames}
          fps={FRAMING_FPS}
          compositionWidth={FRAMING_WIDTH}
          compositionHeight={FRAMING_HEIGHT}
          autoPlay
          loop={false}
          controls
          acknowledgeRemotionLicense
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <p className="video-caption">{caption}</p>
    </div>
  );
};
