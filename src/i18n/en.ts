/**
 * English copy. This file is the **shape** of the dictionary: `vi.ts` is typed
 * as `Dict`, so TypeScript fails the build if a translation is ever missing.
 *
 * Markup convention, shared by `<Rich>` (blocks) and `<Words>` (word-by-word
 * reveals):
 *   *accent*  -> amber, the deck's highlight colour
 *   ~bold~    -> bold, inherits the surrounding colour
 * Placeholders use `{name}` and are filled by `t(key, params)`.
 */
export const en = {
  /* ------------------------------------------------------------- shell -- */
  "brand": "The Priority of Life",
  "hud.navigate": "navigate",
  "hud.fullscreen": "fullscreen",
  "hud.autoAdvance": "Auto-advance",
  "hud.back": "Back",
  "hud.next": "Next",
  "hud.langLabel": "Language",

  /* -------------------------------------------------- section metadata -- */
  "sec.title": "Title",
  "sec.framing": "Framing",
  "sec.day": "The day",
  "sec.dayDebrief": "Day debrief",
  "sec.jar": "The jar",
  "sec.jarDebrief": "Jar debrief",
  "sec.horizon": "Horizon",
  "sec.rules": "Rules",

  "cap.title":
    "Everything that follows rests on one uncomfortable piece of arithmetic: *24 hours, in total, for everything.*",
  "cap.framing":
    "Two thirds of the day is already spoken for. The lecture is about the remaining third — and about the order you spend it in.",
  "cap.dayDebrief":
    "Nothing in the first bar was *decided*. It was *defaulted*. That is the difference worth taking home.",
  "cap.jarDebrief":
    "Same jar, same items, same total volume. Only the order changed — and the order is what decided who lost.",
  "cap.horizon":
    "The day repeats. Over a decade, the unclaimed hours stop looking like a rounding error and start looking like a whole second life.",
  "cap.rules":
    "Three rules short enough to remember on a Monday morning — and specific enough to act on before the week starts.",

  /* ------------------------------------------------------------ title -- */
  "title.kicker": "A lecture on order, leverage and attention",
  "title.heading": "The Priority of Life",
  "title.sub":
    "Not a list of goals. A *container*, and a decision about what goes in first.",

  /* ---------------------------------------------------------- framing -- */
  "framing.kicker1": "The inventory",
  "framing.beat1": "You have *24 hours*.",
  "framing.beat2a": "Not 24 hours for everything.",
  "framing.beat2b": "24 hours. In total. For everything.",
  "framing.beat3": "Sleep and work will ask for *two thirds*.",
  "framing.stat.sleep": "8h sleep",
  "framing.stat.work": "8h work",
  "framing.stat.overhead": "2h overhead",
  "framing.stat.left": "6h left over",
  "framing.kicker2": "Which collapses the whole problem",
  "framing.beat4": "The only question is: *what comes first?*",

  /* ------------------------------------------------------ day debrief -- */
  "daydebrief.heading": "Your day is not a list. It is a *container*.",
  "daydebrief.capActual": "What most days actually are",
  "daydebrief.capAllocated": "What the same day is when you allocate it first",
  "daydebrief.seg.sleep": "sleep",
  "daydebrief.seg.work": "work",
  "daydebrief.seg.overhead": "overhead",
  "daydebrief.seg.feed": "the feed",
  "daydebrief.seg.move": "move",
  "daydebrief.seg.people": "people",
  "daydebrief.seg.craft": "craft",
  "daydebrief.seg.still": "still",
  "daydebrief.kicker": "The mechanic",
  "daydebrief.punch":
    "Nothing in the first bar was ~decided~. It was *defaulted*.",

  /* ------------------------------------------------------ jar debrief -- */
  "jardebrief.heading":
    "Same jar. Same 3 rocks, 5 pebbles, 10 handfuls of sand.",
  "jardebrief.sand": "Sand poured first",
  "jardebrief.rocks": "Rocks placed first",
  "jardebrief.footnoteSand":
    "45 units of fine material settled in first. Two rocks got in. The third *never fit*.",
  "jardebrief.footnoteRocks":
    "Rocks leave voids. Pebbles and sand settle into them at *half price*. Everything fits.",
  "jardebrief.filled": "jar filled",
  "jardebrief.punch": "You never lose the big things to big things.",
  "jardebrief.layerRock": "rock",
  "jardebrief.layerPebble": "pebble",
  "jardebrief.layerSand": "sand",

  /* ---------------------------------------------------------- horizon -- */
  "horizon.kicker": "The same question, at every scale",
  "horizon.heading": "Your life is this day, repeated.",
  "horizon.p1": "One day",
  "horizon.p2": "One week",
  "horizon.p3": "One year",
  "horizon.p4": "Ten years",
  "horizon.unit": "hours",
  "horizon.callout":
    "unclaimed hours in ten years — if you only ever protect ~8 hours a day~. That is three and a third years of full days. The largest single resource you will ever own.",

  /* ------------------------------------------------------------ rules -- */
  "rules.kicker": "Three rules that survive contact with a real week",
  "rules.r1.title": "Name the rocks first.",
  "rules.r1.note":
    "Before the week starts, decide what cannot be moved. Write it down.",
  "rules.r2.title": "Pay for small things last.",
  "rules.r2.note":
    "Fine material is cheap only when it fills the gaps big things leave.",
  "rules.r3.title": "Claim the time, or lose it.",
  "rules.r3.note":
    "Whatever you leave unassigned, the feed will take. Quietly, and by default.",
  "rules.punch": "Priority is not a feeling. It is an order.",

  /* ----------------------------------------------------- puzzle 1: day -- */
  "day.puzzleLabel": "Puzzle 01",
  "day.titleA": "The 24 hour",
  "day.titleB": "box",
  "day.lede":
    "Eighteen hours are already spent. The other *{hours}* are genuinely yours — and four blocks are competing for them. Drag a block into the day, or click it.",
  "day.yourBlocks": "Your blocks",
  "day.hFree": "{n}h free",
  "day.alreadySpent": "Already spent",
  "day.fixed": "fixed",
  "day.notNegotiable": "not negotiable today",
  "day.inDay": "in the day — click to remove",
  "day.whereWent": "Where the day went",
  "day.meterFixed": "Fixed",
  "day.meterChosen": "Chosen",
  "day.meterUnclaimed": "Unclaimed",
  "day.assigned": "{claimed}h of 24h assigned",
  "day.feed": "the feed",
  "day.tipBlocked": "No room left in the day",
  "day.tipRemove": "Click to take it back out of the day",

  "day.block.sleep.name": "Sleep",
  "day.block.sleep.blurb":
    "Eight hours. Your brain files the whole day while you're gone.",
  "day.block.work.name": "Work / School",
  "day.block.work.blurb":
    "The thing you're paid for, or the thing you're training for.",
  "day.block.chores.name": "Commute & chores",
  "day.block.chores.blurb":
    "The tax on having a body, a home and a postcode.",
  "day.block.body.name": "Move",
  "day.block.body.blurb":
    "One hour where your heart rate matters more than your inbox.",
  "day.block.people.name": "People",
  "day.block.people.blurb":
    "Two hours with the humans who would notice if you vanished.",
  "day.block.craft.name": "Craft",
  "day.block.craft.blurb":
    "Two hours on the thing only you can make. Usually unpaid.",
  "day.block.stillness.name": "Stillness",
  "day.block.stillness.blurb":
    "One hour, offline, doing nothing that produces a metric.",

  "day.verdict.perfect.head": "Nothing leaked",
  "day.verdict.perfect.body":
    "All {hours} free hours were claimed by name. The day cost you exactly what you decided it would.",
  "day.verdict.small.head": "{n}h went to the feed",
  "day.verdict.small.body":
    "Recoverable. But notice which block didn't get placed — the feed took that block's space, not somebody else's.",
  "day.verdict.half.head": "{n}h went to the feed",
  "day.verdict.half.body":
    "Over half of your discretionary day was never assigned to anything. It got spent anyway.",
  "day.verdict.lost.head": "{n}h went to the feed",
  "day.verdict.lost.body":
    "You had {hours} free hours and kept almost none of them. Nothing was refused — it was simply never claimed.",
  "day.reset": "Reset the day",
  "day.leaky": "Show a leaky day",

  /* ----------------------------------------------------- puzzle 2: jar -- */
  "jar.puzzleLabel": "Puzzle 02",
  "jar.titleA": "Big rocks, pebbles and",
  "jar.titleB": "sand",
  "jar.lede":
    "3 rocks. 5 pebbles. 10 handfuls of sand. Nominal volume *{nominal}* in a jar that holds *{capacity}*. It is solvable — but only in one kind of order.",
  "jar.onBench": "On the bench",
  "jar.clickToPlace": "click to place",
  "jar.each": "{c} ea",
  "jar.allUsed": "all used",
  "jar.noRoom": "no room left",
  "jar.remaining": "{n} left · costs {c}",

  "jar.item.r1.name": "Health",
  "jar.item.r1.blurb": "The body that carries every other plan you have.",
  "jar.item.r2.name": "People",
  "jar.item.r2.blurb": "The handful of relationships that are not optional.",
  "jar.item.r3.name": "Craft",
  "jar.item.r3.blurb": "The work you would still do if nobody paid you.",
  "jar.item.p1.name": "Pebble ×5",
  "jar.item.p1.blurb":
    "Email, meetings that could be notes, errands, admin, other people's urgencies.",
  "jar.item.s1.name": "Sand ×10",
  "jar.item.s1.blurb":
    "A scroll here, a notification there. Individually nothing.",

  "jar.badge.on": "Gap-fill active · pebble ×{pebble} · sand ×{sand}",
  "jar.badge.off": "No rocks in the jar · full price",
  "jar.badge.tip": "Fine material settles into the voids rocks leave behind.",

  "jar.filled": "filled",
  "jar.free": "free",
  "jar.rocks": "rocks",
  "jar.leftOut": "{n} units left outside",
  "jar.spillEmpty": "Everything is inside. Nothing left on the bench.",

  "jar.orderTitle": "Order you placed things",
  "jar.placed": "{n} placed",
  "jar.orderEmpty":
    "your sequence will appear here — order is the whole game",

  "jar.pricingTitle": "How the pricing works",
  "jar.pricing1": "A ~rock~ costs its full 25 wherever it lands.",
  "jar.pricing2":
    "~Pebbles and sand~ are cheaper once rocks have made gaps for them to settle into.",
  "jar.pricing3":
    "Pour the fine material ~first~ and you pay full price for it — and leave no voids behind for anything big.",

  "jar.verdict.empty.head": "Nothing in the jar yet",
  "jar.verdict.empty.body":
    "Start with whatever you would refuse to lose. Watch the price of the fine material change as you go.",
  "jar.verdict.perfect.head": "Full jar, nothing left over",
  "jar.verdict.perfect.body":
    "All three rocks, all five pebbles, all ten handfuls of sand — exactly {capacity} units. Same items, same jar: only the order changed.",
  "jar.verdict.rocksOnly.head": "The rocks fit. The detail didn't",
  "jar.verdict.rocksOnly.body":
    "{leftOut} units are still on the bench. Every rock survived, but the pebbles and sand got crowded out because they arrived last.",
  "jar.verdict.missing.head": "{n} rocks left outside",
  "jar.verdict.missing.body":
    "Rocks are the thing you cannot replace. Fine material poured first pays full price and leaves no voids — so the big things have nowhere to sit.",
  "jar.reject.head": "Doesn't fit",
  "jar.reject.body":
    "The jar is full. Whatever you want next, something already in there has to leave.",
  "jar.reset": "Empty the jar",
  "jar.seed": "Show the classic mistake",
} as const;

export type Dict = { [K in keyof typeof en]: string };
export type DictKey = keyof Dict;
