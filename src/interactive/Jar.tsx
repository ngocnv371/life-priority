import React, { useMemo, useState } from "react";
import { Rich, useI18n } from "../i18n";
import { colors } from "../theme";
import {
  COMPACTION,
  JAR_CAPACITY,
  JAR_COUNTS,
  JAR_ITEMS,
  JAR_LABELS,
  JAR_NOMINAL,
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
  const { t } = useI18n();

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
        // Only rocks are tall enough to carry a label on the jar.
        label: item.kind === "rock" ? t(item.nameKey) : "",
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
        head: t("jar.verdict.empty.head"),
        body: t("jar.verdict.empty.body"),
      };
    if (rocksIn === JAR_COUNTS.rock && leftOutside === 0)
      return {
        tone: "good" as const,
        head: t("jar.verdict.perfect.head"),
        body: t("jar.verdict.perfect.body", { capacity: JAR_CAPACITY }),
      };
    if (rocksIn === JAR_COUNTS.rock)
      return {
        tone: "warn" as const,
        head: t("jar.verdict.rocksOnly.head"),
        body: t("jar.verdict.rocksOnly.body", { leftOut: leftOutside }),
      };
    return {
      tone: "bad" as const,
      head: t("jar.verdict.missing.head", {
        n: JAR_COUNTS.rock - rocksIn,
      }),
      body: t("jar.verdict.missing.body"),
    };
  }, [placements.length, rocksIn, leftOutside, t]);

  const verdictColor = {
    good: colors.good,
    warn: colors.warn,
    bad: colors.bad,
  }[verdict.tone];

  return (
    <div className="puzzle-layout">
      {/* ------------------------------------------------- the puzzle -- */}
      <div className="puzzle-main">
        <div className="jar-layout">
          <div className="panel">
            <div className="panel-head">
              <h3 className="panel-title">{t("jar.onBench")}</h3>
              <span className="panel-note">{t("jar.clickToPlace")}</span>
            </div>

            <div className="tray">
              {JAR_ITEMS.map((item) => {
                const cost = unitCost(item, hasRock);
                const remaining = itemQuota(item) - countOf(item.id);
                const exhausted = remaining <= 0;
                const blocked = cost > free;
                // Stacks read as "Pebble", not "Pebble ×5".
                const name = t(item.nameKey).split(" ×")[0];

                return (
                  <div
                    key={item.id}
                    className="tray-item"
                    data-disabled={exhausted || blocked}
                    style={{ color: item.color }}
                    title={t(item.blurbKey)}
                    onClick={() => !exhausted && !blocked && place(item)}
                  >
                    <span className="swatch" />
                    <span className="tray-label">
                      <span className="tray-name">{name}</span>
                      <span className="tray-sub">
                        {exhausted
                          ? t("jar.allUsed")
                          : blocked
                            ? t("jar.noRoom")
                            : t("jar.remaining", { n: remaining, c: cost })}
                      </span>
                    </span>
                    <span className="tray-hours">
                      {item.kind === "rock"
                        ? cost
                        : t("jar.each", { c: cost })}
                    </span>
                  </div>
                );
              })}
            </div>

            <div
              className="badge"
              data-on={hasRock}
              style={{ marginTop: 16 }}
              title={t("jar.badge.tip")}
            >
              <span className="badge-dot" />
              {hasRock
                ? t("jar.badge.on", {
                    pebble: COMPACTION.pebble,
                    sand: COMPACTION.sand,
                  })
                : t("jar.badge.off")}
            </div>
          </div>

          <div className="jar-column">
            <div className="jar-lip" />
            <div className="jar">
              {placements.map((p) => {
                const kindLabel = p.label || t(JAR_LABELS[p.kind]);
                return (
                  <div
                    key={p.uid}
                    className="layer"
                    data-kind={p.kind}
                    style={{ height: `${p.cost}%` }}
                    title={`${kindLabel} · ${p.cost}`}
                  >
                    {p.cost >= 8 ? (
                      <span className="layer-text">{kindLabel}</span>
                    ) : null}
                  </div>
                );
              })}
            </div>
            <div className="jar-stats">
              <span>
                {t("jar.filled")} <b>{used}</b>/{JAR_CAPACITY}
              </span>
              <span>
                {t("jar.free")} <b>{free}</b>
              </span>
              <span>
                {t("jar.rocks")} <b>{rocksIn}</b>/{JAR_COUNTS.rock}
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
                <div className="spill-empty-note">{t("jar.spillEmpty")}</div>
              ) : null}
            </div>
            <div className="spill-amount">
              {t("jar.leftOut", { n: leftOutside })}
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h3 className="panel-title">{t("jar.orderTitle")}</h3>
            <span className="panel-note">
              {t("jar.placed", { n: placements.length })}
            </span>
          </div>
          <div className="order-strip">
            {placements.length === 0 ? (
              <span className="order-empty">{t("jar.orderEmpty")}</span>
            ) : (
              placements.map((p) => (
                <span key={p.uid} className="order-chip" data-kind={p.kind}>
                  {t(JAR_LABELS[p.kind])} · {p.cost}
                </span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* -------------------------------------------------- the brief -- */}
      <div className="puzzle-side">
        <div>
          <p className="eyebrow">{t("jar.puzzleLabel")}</p>
          <h2 className="section-title">
            {t("jar.titleA")} <em>{t("jar.titleB")}</em>
          </h2>
          <p className="lede">
            <Rich
              text={t("jar.lede", {
                nominal: JAR_NOMINAL,
                capacity: JAR_CAPACITY,
              })}
            />
          </p>
        </div>

        <div className="panel">
          <div className="panel-head">
            <h3 className="panel-title">{t("jar.pricingTitle")}</h3>
          </div>
          <ul className="rule-list">
            <li>
              <Rich text={t("jar.pricing1")} />
            </li>
            <li>
              <Rich text={t("jar.pricing2")} />
            </li>
            <li>
              <Rich text={t("jar.pricing3")} />
            </li>
          </ul>
        </div>

        <div className="verdict" data-tone={verdict.tone}>
          <div className="verdict-head">
            <span className="swatch" style={{ color: verdictColor }} />
            {verdict.head}
          </div>
          <p>{verdict.body}</p>
        </div>

        {rejected ? (
          <div className="verdict" data-tone="bad">
            <div className="verdict-head">{t("jar.reject.head")}</div>
            <p>{t("jar.reject.body")}</p>
          </div>
        ) : null}

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button className="btn" onClick={reset}>
            {t("jar.reset")}
          </button>
          <button
            className="btn"
            data-variant="ghost"
            onClick={() => {
              reset();
              // Pre-load the wrong order: sand first, then pebbles, at full price.
              const sand = JAR_ITEMS.find((i) => i.id === "s1")!;
              const pebble = JAR_ITEMS.find((i) => i.id === "p1")!;
              const seeded: Placement[] = [];
              const push = (item: JarItem) =>
                seeded.push({
                  uid: seeded.length + 1,
                  itemId: item.id,
                  kind: item.kind,
                  label: "",
                  cost: item.cost,
                });
              for (let i = 0; i < JAR_COUNTS.sand; i += 1) push(sand);
              for (let i = 0; i < JAR_COUNTS.pebble; i += 1) push(pebble);
              setPlacements(seeded);
            }}
          >
            {t("jar.seed")}
          </button>
        </div>
      </div>
    </div>
  );
};
