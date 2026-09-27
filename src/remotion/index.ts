import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";

/**
 * Entry point for the Remotion CLI:
 *   npm run studio     -> live preview + scrubbing
 *   npm run render     -> export an MP4
 *
 * The Vite app never loads this file; it imports scenes through `registry.ts`.
 */
registerRoot(RemotionRoot);
