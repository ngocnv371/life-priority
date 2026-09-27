# The Priority of Life

An interactive lecture on choosing what gets your time — at the scale of a day,
and at the scale of a decade. Warm amber, near-black, and two puzzles the
audience actually plays.

Built as a static React app (Vite) with **[Remotion](https://remotion.dev)** for
the animated lecture segments, so the cinematic parts and the interactive parts
live in one codebase.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
```

Other scripts:

| Script | What it does |
| --- | --- |
| `npm run dev` | Vite dev server, hot reload |
| `npm run build` | Static build into `dist/` (relative paths — opens from disk or any host) |
| `npm run preview` | Serve the built output |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run studio` | Remotion Studio — scrub and tweak every scene on a timeline |
| `npm run render -- Title out/title.mp4` | Export a scene as MP4 |

For a lecture, run `npm run build` and open `dist/index.html`, or host `dist/`.
Press **F** for fullscreen, **←**/**→** to move between sections.

---

## The deck

Eight sections, alternating between a rendered scene and a live puzzle.

| # | Section | Kind | What happens |
| --- | --- | --- | --- |
| 1 | Title | Remotion | Title, rings, warm sweep |
| 2 | Framing | Remotion | The 24-hour arithmetic, four beats |
| 3 | **The 24 hour box** | Interactive | Fill a day; watch the feed eat what you don't claim |
| 4 | Debrief | Remotion | The same day, defaulted vs. decided |
| 5 | **Big rocks, pebbles, sand** | Interactive | Order decides whether everything fits |
| 6 | Debrief | Remotion | Two jars side by side, same items, different order |
| 7 | Horizon | Remotion | Day → week → year → decade, 29,200 unclaimed hours |
| 8 | Rules | Remotion | Three closing rules |

Toggle **Auto-advance** in the footer to let the animated sections play straight
through and hand control back automatically — useful for a hands-free run.

---

## How the two puzzles work

These are not vibes — both have real arithmetic, which is why they land.

### Puzzle 1 — the 24 hour box (`src/interactive/DayBox.tsx`)

The day is 24 hours. **18 are already spent** before the player arrives
(8 sleep, 8 work, 2 overhead). That leaves **6 contested hours**, and four
blocks that together total exactly 6:

| Block | Hours |
| --- | --- |
| Move | 1 |
| People | 2 |
| Craft | 2 |
| Stillness | 1 |

Whatever is not claimed is filled by **the feed** — the only cold colour in the
whole deck. Because the four blocks sum to exactly 6, a perfect day *is*
reachable. Any shortfall is therefore a decision, not arithmetic.

Interaction: drag a block onto the box, or just click it. Click a placed block to
take it back out; the feed instantly expands to fill the gap.

### Puzzle 2 — the jar (`src/interactive/Jar.tsx`)

3 rocks (25 each), 5 pebbles (5 each), 10 handfuls of sand (2 each). Nominal
volume **120** in a jar that holds **100**.

The rule that makes order matter:

> Fine material only gets cheaper once there are rocks in the jar for it to
> settle around.

```
cost = nominal × (hasRock ? COMPACTION[kind] : 1)

COMPACTION = { rock: 1, pebble: 0.6, sand: 0.5 }
```

- **Rocks first:** 75 + (5 × 3) + (10 × 1) = **100**. Everything fits, nothing left over.
- **Sand first:** 20 + 25 = 45 of fine material at full price. Rock, rock → 95.
  The **third rock no longer fits.**

Same jar, same items, same total volume. Only the order changed. That is the
whole lecture in one interaction.

Click-to-place rather than drag-and-drop is deliberate here: the *sequence* of
clicks is the lesson, so it should be explicit. There's also a
**"Show the classic mistake"** button that seeds the sand-first state.

---

## Editing the content

Almost everything you'd want to change is data, not layout.

| Want to change | File |
| --- | --- |
| Day blocks, hours, blurbs | `src/interactive/data.ts` → `LOCKED_BLOCKS`, `CHOICE_BLOCKS` |
| Jar items, capacities, compaction | `src/interactive/data.ts` → `JAR_ITEMS`, `JAR_CAPACITY`, `COMPACTION` |
| Palette, springs, fonts | `src/theme.ts` |
| Scene copy and timing | `src/remotion/scenes/*.tsx` |
| Section order, captions, nav | `src/App.tsx` → `SECTIONS` |
| Scene durations (single source of truth) | `src/remotion/registry.ts` → `SCENES` |

`SCENES` drives both the Remotion compositions and the app's `<Player>` embeds,
so a duration can never drift between the two.

---

## Remotion notes

- Every animation is driven by `useCurrentFrame()`. There are **no CSS
  transitions or animations inside compositions** — they don't render correctly.
  The app shell (`src/styles/global.css`) is free to use CSS; composition styles
  are inline and namespaced by virtue of being inline.
- Reusable motion primitives live in `src/remotion/shared.tsx`:
  `Backdrop`, `Kicker`, `Words`, `Beat`, `Rule`, `CountUp`.
- Word-by-word reveals use per-word transforms, never per-character opacity, so
  text stays crisp at projector scale.
- Scenes are written in seconds × `fps`, not hardcoded frame counts.
- Fonts are a system stack, so the deck works on a venue machine with no
  network. If you want a specific typeface, self-host it in `public/` and load
  it with `@remotion/fonts` so exports stay deterministic.

### Rendering a scene to video

```bash
npm run render -- Horizon out/horizon.mp4
```

Use this if a venue machine struggles with live rendering, or to share a single
segment. Composition ids match the scene ids in `registry.ts`.

---

## Known noise

The browser console logs two React warnings from inside Remotion:

```
Warning: `ref` is not a prop ...
Warning: Function components cannot be given refs ...
```

These come from Remotion's own `AbsoluteFill` internals on React 18 and are
harmless — rendering, seeking and playback are unaffected. They disappear if the
project is moved to React 19.

---

## Accessibility / fallbacks

- **Keyboard:** arrow keys, Home/End, **F** for fullscreen.
- **Click-to-place everywhere:** both puzzles are fully playable without
  dragging, which also makes them work with a presenter clicker.
- **`prefers-reduced-motion`** disables the decorative CSS animation in the app
  shell. Remotion playback is unaffected (it's seek-based, not CSS-based) — pause
  the animation and talk over a frame instead if you need a fully static slide.
