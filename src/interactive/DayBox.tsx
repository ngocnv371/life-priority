import React, { useCallback, useMemo, useRef, useState } from "react";
import { blockColors, colors } from "../theme";
import {
  CHOICE_BLOCKS,
  CHOICE_HOURS,
  DAY_TOTAL,
  FIXED_HOURS,
  LOCKED_BLOCKS,
  type DayBlock,
} from "./data";

/* ========================================================================== *
 *  The 24 hour box.
 *
 *  A fixed base of 18 hours is already spent when the player arrives. Six hours
 *  are genuinely free, and four coloured blocks are competing for them. Anything
 *  the player does not claim is silently eaten by `the feed`.
 *
 *  Interaction: drag a block onto the box, or just click it. Click a placed
 *  block to take it back out.
 * ========================================================================== */

type DragState = {
  block: DayBlock;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
};

type Slot = {
  id: string;
  name: string;
  hours: number;
  color: string;
  kind: "locked" | "choice" | "feed";
};

export const DayBox: React.FC = () => {
  const [placed, setPlaced] = useState<string[]>([]);
  const [drag, setDrag] = useState<DragState | null>(null);
  const [overBox, setOverBox] = useState(false);

  const boxRef = useRef<HTMLDivElement | null>(null);
  const startPoint = useRef({ x: 0, y: 0 });
  const moved = useRef(false);

  const claimed =
    FIXED_HOURS +
    placed.reduce(
      (sum, id) => sum + (CHOICE_BLOCKS.find((b) => b.id === id)?.hours ?? 0),
      0,
    );
  const feedHours = DAY_TOTAL - claimed;

  const add = useCallback((id: string) => {
    setPlaced((current) => (current.includes(id) ? current : [...current, id]));
  }, []);

  const remove = useCallback((id: string) => {
    setPlaced((current) => current.filter((p) => p !== id));
  }, []);

  const remaining = DAY_TOTAL - claimed;
  const isBlocked = (b: DayBlock) => b.hours > remaining;

  /* ------------------------------------------------------------ slots -- */

  const slots = useMemo<Slot[]>(() => {
    const list: Slot[] = [
      ...LOCKED_BLOCKS.map<Slot>((b) => ({
        id: b.id,
        name: b.name,
        hours: b.hours,
        color: b.color,
        kind: "locked",
      })),
      ...placed.flatMap<Slot>((id) => {
        const b = CHOICE_BLOCKS.find((c) => c.id === id);
        return b
          ? [{ id: b.id, name: b.name, hours: b.hours, color: b.color, kind: "choice" }]
          : [];
      }),
    ];
    if (feedHours > 0) {
      list.push({
        id: "__feed",
        name: "the feed",
        hours: feedHours,
        color: blockColors.feed,
        kind: "feed",
      });
    }
    return list;
  }, [placed, feedHours]);

  /* ------------------------------------------------------------- drag -- */

  const overTarget = (x: number, y: number) => {
    const r = boxRef.current?.getBoundingClientRect();
    if (!r) return false;
    const pad = 30;
    return (
      x >= r.left - pad && x <= r.right + pad && y >= r.top - pad && y <= r.bottom + pad
    );
  };

  const beginDrag = (e: React.PointerEvent, block: DayBlock) => {
    // A placed block can always be picked up again, even if the day is full -
    // otherwise the only way out of a full day would be the reset button.
    if (isBlocked(block) && !placed.includes(block.id)) return;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    startPoint.current = { x: e.clientX, y: e.clientY };
    moved.current = false;
    setDrag({
      block,
      x: e.clientX,
      y: e.clientY,
      offsetX: e.clientX - r.left,
      offsetY: e.clientY - r.top,
    });
  };

  const moveDrag = (e: React.PointerEvent) => {
    if (!drag) return;
    if (
      Math.hypot(
        e.clientX - startPoint.current.x,
        e.clientY - startPoint.current.y,
      ) > 6
    ) {
      moved.current = true;
    }
    setDrag((d) => (d ? { ...d, x: e.clientX, y: e.clientY } : d));
    setOverBox(overTarget(e.clientX, e.clientY));
  };

  const endDrag = (e: React.PointerEvent) => {
    if (!drag) return;
    if (moved.current) {
      // A real drag only ever adds - you drop it somewhere or you don't.
      if (overTarget(e.clientX, e.clientY)) add(drag.block.id);
    } else if (placed.includes(drag.block.id)) {
      // A plain click on an already-placed block takes it back out.
      remove(drag.block.id);
    } else {
      // ...and a plain click on a free block drops it straight in, so the
      // whole puzzle is playable with a clicker from the back of the room.
      add(drag.block.id);
    }
    setDrag(null);
    setOverBox(false);
  };

  /* ---------------------------------------------------------- verdict -- */

  const verdict = useMemo(() => {
    if (feedHours === 0)
      return {
        tone: "good" as const,
        head: "Nothing leaked",
        body: `All ${CHOICE_HOURS} free hours were claimed by name. The day cost you exactly what you decided it would.`,
      };
    if (feedHours <= 2)
      return {
        tone: "warn" as const,
        head: `${feedHours}h went to the feed`,
        body: `Recoverable. But notice which block didn't get placed - the feed took that block's space, not somebody else's.`,
      };
    if (feedHours <= 4)
      return {
        tone: "warn" as const,
        head: `${feedHours}h went to the feed`,
        body: `Over half of your discretionary day was never assigned to anything. It got spent anyway.`,
      };
    return {
      tone: "bad" as const,
      head: `${feedHours}h went to the feed`,
      body: `You had ${CHOICE_HOURS} free hours and kept almost none of them. Nothing was refused - it was simply never claimed.`,
    };
  }, [feedHours]);

  return (
    <div className="puzzle-layout">
      {/* ------------------------------------------------ the puzzle -- */}
      <div className="puzzle-main">
        <div className="daybox">
          <div className="panel">
            <div className="panel-head">
              <h3 className="panel-title">Your blocks</h3>
              <span className="panel-note">{remaining}h free</span>
            </div>
            <div className="tray">
              {CHOICE_BLOCKS.map((b) => {
                const blocked = isBlocked(b);
                const isPlaced = placed.includes(b.id);
                return (
                  <div
                    key={b.id}
                    className="tray-item"
                    data-disabled={blocked && !isPlaced}
                    data-ghost={isPlaced}
                    style={{ color: b.color }}
                    title={
                      isPlaced
                        ? "Click to take it back out of the day"
                        : blocked
                          ? "No room left in the day"
                          : b.blurb
                    }
                    onPointerDown={(e) => beginDrag(e, b)}
                    onPointerMove={moveDrag}
                    onPointerUp={endDrag}
                    onPointerCancel={() => {
                      setDrag(null);
                      setOverBox(false);
                    }}
                  >
                    <span className="swatch" />
                    <span className="tray-label">
                      <span className="tray-name">{b.name}</span>
                      <span className="tray-sub">
                        {isPlaced ? "in the day — click to remove" : b.blurb}
                      </span>
                    </span>
                    <span className="tray-hours">{b.hours}h</span>
                  </div>
                );
              })}
            </div>

            <div className="panel-head" style={{ marginTop: 18 }}>
              <h3 className="panel-title">Already spent</h3>
              <span className="panel-note">fixed</span>
            </div>
            <div className="tray">
              {LOCKED_BLOCKS.map((b) => (
                <div
                  key={b.id}
                  className="tray-item"
                  data-disabled="true"
                  style={{ color: b.color }}
                  title={b.blurb}
                >
                  <span className="swatch" />
                  <span className="tray-label">
                    <span className="tray-name">{b.name}</span>
                    <span className="tray-sub">not negotiable today</span>
                  </span>
                  <span className="tray-hours">{b.hours}h</span>
                </div>
              ))}
            </div>
          </div>

          <div className="box-wrap">
            <div className="box-shell">
              <div className="box-ticks">
                {Array.from({ length: 13 }, (_, i) => (
                  <span key={i}>{24 - i * 2}h</span>
                ))}
              </div>
              <div
                ref={boxRef}
                className="box"
                data-over={overBox}
                data-capped={feedHours <= 0}
              >
                <div className="box-shadow-fill" />
                <div className="box-inner">
                  {slots.map((s) => (
                    <div
                      key={s.id}
                      className="slot"
                      data-kind={s.kind}
                      data-tiny={s.hours < 2}
                      data-locked={s.kind === "locked"}
                      data-removable={s.kind === "choice"}
                      style={{
                        flexGrow: s.hours,
                        background: s.kind === "feed" ? undefined : s.color,
                      }}
                      title={
                        s.kind === "choice"
                          ? `Remove ${s.name}`
                          : `${s.name} — ${s.hours}h`
                      }
                      onClick={() =>
                        s.kind === "choice" && remove(s.id)
                      }
                    >
                      <span className="slot-label">
                        {s.name} · {s.hours}h
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="box-caption">
              {claimed}h of {DAY_TOTAL}h assigned
            </div>
          </div>
        </div>

        {drag ? (
          <div
            className="drag-ghost"
            style={{
              left: drag.x - drag.offsetX,
              top: drag.y - drag.offsetY,
            }}
          >
            <span className="swatch" style={{ color: drag.block.color }} />
            <span className="tray-name">{drag.block.name}</span>
            <span className="tray-hours">{drag.block.hours}h</span>
          </div>
        ) : null}
      </div>

      {/* -------------------------------------------------- the brief -- */}
      <div className="puzzle-side">
        <div>
          <p className="eyebrow">Puzzle 01</p>
          <h2 className="section-title">
            The 24 hour <em>box</em>
          </h2>
          <p className="lede">
            Eighteen hours are already spent. The other{" "}
            <strong>{CHOICE_HOURS}</strong> are genuinely yours — and four blocks
            are competing for them. Drag a block into the day, or click it.
          </p>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h3 className="panel-title">Where the day went</h3>
          </div>
          <div className="meter">
            <Meter
              name="Fixed"
              value={FIXED_HOURS}
              color={colors.amber600}
              total={DAY_TOTAL}
            />
            <Meter
              name="Chosen"
              value={claimed - FIXED_HOURS}
              total={DAY_TOTAL}
              color={colors.amber300}
            />
            <Meter
              name="Unclaimed"
              value={feedHours}
              total={DAY_TOTAL}
              color={colors.feed}
            />
          </div>
        </div>

        <div className="verdict" data-tone={verdict.tone}>
          <div className="verdict-head">
            <span
              className="swatch"
              style={{ color: colors[verdict.tone === "good" ? "good" : verdict.tone === "warn" ? "warn" : "bad"] }}
            />
            {verdict.head}
          </div>
          <p>{verdict.body}</p>
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="btn" onClick={() => setPlaced([])}>
            Reset the day
          </button>
          <button
            className="btn"
            data-variant="ghost"
            onClick={() =>
              setPlaced(CHOICE_BLOCKS.slice(0, 1).map((b) => b.id))
            }
          >
            Show a leaky day
          </button>
        </div>
      </div>
    </div>
  );
};

const Meter: React.FC<{
  name: string;
  value: number;
  total: number;
  color: string;
}> = ({ name, value, total, color }) => (
  <div className="meter-row">
    <span className="meter-name">{name}</span>
    <span className="meter-bar">
      <i style={{ background: color, transform: `scaleX(${value / total})` }} />
    </span>
    <span className="meter-val">{value}h</span>
  </div>
);
