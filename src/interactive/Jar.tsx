import React, { useMemo, useState } from "react";
import { colors } from "../theme";
import {
  COMPACTION,
  JAR_CAPACITY,
  JAR_COUNTS,
  JAR_ITEMS,
  itemQuota,
  type JarItem,
  type JarKind,
  unitCost,
} from "./data";

/* ========================================================================== *
 *  The jar.
 *
 *  Three rocks (25 each), five pebbles (5 each) and ten handfuls of sand (2
 *  each). Nominal volume is 120 and the jar holds 100 - so the puzzle is only
 *  solvable if the fine material goes in *after* the rocks, where it can settle
 *  into the voids they leave behind.
 *
 *  Interaction is deliberately click-to-place rather than drag-and-drop, because
 *  the order of your clicks is the entire lesson.
 * ========================================================================== */

type Placement = {
  uid: number;
  itemId: string;
  kind: JarKind;
  label: string;
  /** Volume actually consumed, frozen at the moment it went in. */
  cost: number;
};

export const Jar: React.FC = () => {
  const [placements, setPlacements] = useState<Placement[]>([]);
  const [rejected, setRejected] = useState<string | null>(null);

  const hasRock = placements.some((p) => p.kind === "rock");
  const used = placements.reduce((sum, p) => sum + p.cost, 0);
  const free = JAR_CAPACITY - used;

  const countOf = (itemId: string) =>
    placements.filter((p) => p.itemId === itemId).length;

  const rocksIn = countOf("r1") + countOf("r2") + countOf("r3");

  /** Nominal volume still sitting on the bench, untouched. */
  const leftOutside = JAR_ITEMS.reduce((sum, item) => {
    const remaining = Math.max(0, itemQuota(item) - countOf(item.id));
    return sum + remaining * item.cost;
  }, 0);

  const place = (item: JarItem) => {
    const cost = unitCost(item, hasRock);

    // Both rocks and stacks have a finite number of units on the bench.
    if (countOf(item.id) >= itemQuota(item)) return;

    if (cost > free) {
      setRejected(item.id);
      window.setTimeout(() => setRejected(null), 900);
      return;
    }

    setPlacements((current) => [
      ...current,
      {
        uid: current.length + 1,
        itemId: item.id,
        kind: item.kind,
        label: item.kind === "rock" ? item.name : "",
        cost,
      },
    ]);
  };

  const reset = () => {
    setPlacements([]);
    setRejected(null);
  };

  const verdict = useMemo(() => {
    if (placements.length === 0)
      return {
        tone: "warn" as const,
        head: "Nothing in the jar yet",
        body: "Start with whatever you would refuse to lose. Watch the price of the fine material change as you go.",
      };
    if (rocksIn === JAR_COUNTS.rock && leftOutside === 0)
      return {
        tone: "good" as const,
        head: "Full jar, nothing left over",
        body: "All three rocks, all five pebbles, all ten handfuls of sand - exactly 100 units. Same items, same jar: only the order changed.",
      };
    if (rocksIn === JAR_COUNTS.rock)
      return {
        tone: "warn" as const,
        head: "The rocks fit. The detail didn't",
        body: `${leftOutside} units are still on the bench. Every rock survived, but the pebbles and sand got crowded out because they arrived last.`,
      };
    return {
      tone: "bad" as const,
      head: `${JAR_COUNTS.rock - rocksIn} rock${
        JAR_COUNTS.rock - rocksIn === 1 ? "" : "s"
      } left outside`,
      body: `${
        JAR_COUNTS.rock - rocksIn === 1 ? "A rock is" : "Rocks are"
      } the thing you cannot replace. Fine material poured first pays full price and leaves no voids - so the big things have nowhere to sit.`,
    };
  }, [placements.length, rocksIn, leftOutside]);

  return (
    <div className="puzzle-layout">
      {/* ------------------------------------------------- the puzzle -- */}
      <div className="puzzle-main">
        <div className="jar-layout">
          <div className="panel">
            <div className="panel-head">
              <h3 className="panel-title">On the bench</h3>
              <span className="panel-note">click to place</span>
            </div>

            <div className="tray">
              {JAR_ITEMS.map((item) => {
                const cost = unitCost(item, hasRock);
                const remaining = itemQuota(item) - countOf(item.id);
                const exhausted = remaining <= 0;
                const blocked = cost > free;

                return (
                  <div
                    key={item.id}
                    className="tray-item"
                    data-disabled={exhausted || blocked}
                    style={{ color: item.color }}
                    title={item.blurb}
                    onClick={() => !exhausted && !blocked && place(item)}
                  >
                    <span className="swatch" />
                    <span className="tray-label">
                      <span className="tray-name">
                        {item.kind === "rock"
                          ? item.name
                          : item.name.split(" ×")[0]}
                      </span>
                      <span className="tray-sub">
                        {exhausted
                          ? "all used"
                          : blocked
                            ? "no room left"
                            : `${remaining} left · costs ${cost}`}
                      </span>
                    </span>
                    <span className="tray-hours">
                      {item.kind === "rock"
                        ? `${cost}`
                        : `${cost} ea`}
                    </span>
                  </div>
                );
              })}
            </div>

            <div
              className="badge"
              data-on={hasRock}
              style={{ marginTop: 16 }}
              title="Fine material settles into the voids rocks leave behind."
            >
              <span className="badge-dot" />
              {hasRock
                ? `Gap-fill active · pebble ×${COMPACTION.pebble} · sand ×${COMPACTION.sand}`
                : "No rocks in the jar · full price"}
            </div>
          </div>

          <div className="jar-column">
            <div className="jar-lip" />
            <div className="jar">
              {placements.map((p) => (
                <div
                  key={p.uid}
                  className="layer"
                  data-kind={p.kind}
                  style={{ height: `${p.cost}%` }}
                  title={`${p.kind} · ${p.cost} units`}
                >
                  {p.cost >= 8 ? (
                    <span className="layer-text">{p.label || p.kind}</span>
                  ) : null}
                </div>
              ))}
            </div>
            <div className="jar-stats">
              <span>
                filled <b>{used}</b>/{JAR_CAPACITY}
              </span>
              <span>
                free <b>{free}</b>
              </span>
              <span>
                rocks <b>{rocksIn}</b>/{JAR_COUNTS.rock}
              </span>
            </div>
          </div>

          <div className="spill">
            <div className="spill-zone" data-empty={leftOutside === 0}>
              <div
                className="spill-fill"
                style={{ height: `${Math.min(100, leftOutside)}%` }}
              />
              {leftOutside === 0 ? (
                <div className="spill-empty-note">
                  Everything is inside.
                  <br />
                  Nothing left on the bench.
                </div>
              ) : null}
            </div>
            <div className="spill-amount">
              {leftOutside === 0
                ? "0 units left out"
                : `${leftOutside} units left outside`}
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h3 className="panel-title">Order you placed things</h3>
            <span className="panel-note">{placements.length} placed</span>
          </div>
          <div className="order-strip">
            {placements.length === 0 ? (
              <span className="order-empty">
                your sequence will appear here — order is the whole game
              </span>
            ) : (
              placements.map((p) => (
                <span key={p.uid} className="order-chip" data-kind={p.kind}>
                  {p.kind} · {p.cost}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* -------------------------------------------------- the brief -- */}
      <div className="puzzle-side">
        <div>
          <p className="eyebrow">Puzzle 02</p>
          <h2 className="section-title">
            Big rocks, pebbles
            <br />
            and <em>sand</em>
          </h2>
          <p className="lede">
            3 rocks. 5 pebbles. 10 handfuls of sand. Nominal volume{" "}
            <strong>120</strong> in a jar that holds <strong>100</strong>. It is
            solvable — but only in one kind of order.
          </p>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h3 className="panel-title">How the pricing works</h3>
          </div>
          <ul className="rule-list">
            <li>
              A <b>rock</b> costs its full 25 wherever it lands.
            </li>
            <li>
              <b>Pebbles and sand</b> are cheaper once rocks have made gaps for
              them to settle into.
            </li>
            <li>
              Pour the fine material <b>first</b> and you pay full price for it —
              and leave no voids behind for anything big.
            </li>
          </ul>
        </div>

        <div className="verdict" data-tone={verdict.tone}>
          <div className="verdict-head">
            <span
              className="swatch"
              style={{
                color:
                  verdict.tone === "good"
                    ? colors.good
                    : verdict.tone === "warn"
                      ? colors.warn
                      : colors.bad,
              }}
            />
            {verdict.head}
          </div>
          <p>{verdict.body}</p>
        </div>

        {rejected ? (
          <div className="verdict" data-tone="bad">
            <div className="verdict-head">Doesn't fit</div>
            <p>
              The jar is full. Whatever you want next, something already in there
              has to leave.
            </p>
          </div>
        ) : null}

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="btn" onClick={reset}>
            Empty the jar
          </button>
          <button
            className="btn"
            data-variant="ghost"
            onClick={() => {
              reset();
              // Pre-load the wrong order: sand first, then pebbles.
              const sand = JAR_ITEMS.find((i) => i.id === "s1")!;
              const pebble = JAR_ITEMS.find((i) => i.id === "p1")!;
              const seeded: Placement[] = [];
              for (let i = 0; i < JAR_COUNTS.sand; i += 1)
                seeded.push({
                  uid: seeded.length + 1,
                  itemId: sand.id,
                  kind: "sand",
                  label: "",
                  cost: sand.cost,
                });
              for (let i = 0; i < JAR_COUNTS.pebble; i += 1)
                seeded.push({
                  uid: seeded.length + 1,
                  itemId: pebble.id,
                  kind: "pebble",
                  label: "",
                  cost: pebble.cost,
                });
              setPlacements(seeded);
            }}
          >
            Show the classic mistake
          </button>
        </div>
      </div>
    </div>
  );
};
