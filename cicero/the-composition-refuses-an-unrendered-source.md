# The composition refuses an unrendered source

**Status: Decided 2026-09-15, Executed 2026-09-15.**

## Context

The checklist's design opens carry it, found in the wild on 2026-09-10 and narrowed by measurement on 2026-09-14: `compose-dom.js` reads a block's alignment, its `text-indent`, `hyphens`, `hyphenate-character`, `hyphenate-limit-chars` and `overflow-wrap` off `getComputedStyle(source)`. It is right to read the source, which sits in its real ancestor chain where a clone in the measure container does not. But a **detached** element answers empty strings, and a **slottable no slot is assigned to** — which is what every block is between the intake into `<beltype-root>` and `present()` — answers a full declaration with every inherited property at its initial value: `start`, `0px`, `manual`. The composition then sets the paragraph against those values and says nothing. Both clients compose before the intake, so no document reaches this today; what keeps it so is a comment saying the order is load-bearing.

The entry offered two settlements, a reading that cannot be wrong or a refusal. They were weighed on 2026-09-15 and the reading was refused, for two reasons found concrete. A snapshot of the five facts taken while the document is live is a second copy of the author's cascade, answered by the engine instead of the browser — the shape *page lengths are measured* refused when it asked why the engine resolved lengths at all. And it would have made the operator's unexplained 2026-09-10 failure unfindable: its mechanism is known and its trigger is not, and a snapshot composes through the next occurrence in silence.

## Decision

**A composition refuses, by name, a source that is in no flat tree.** Asking what the author's cascade said of an element the browser is not rendering is a question asked outside render-identical conditions (I5), and the engine's answer to such a question is a refusal a reader can see, as it is for an unstated line height. The check is a walk, not an inspection of values, because the case that actually occurs answers plausible values: an element is in the flat tree when it is connected and, climbing from it, every light child of a shadow host it passes has a slot assigned — a shadow root climbs to its host, an assigned child climbs through its slot. It runs where the reads are, on a cache miss, before the first of them; a cache hit reads no source and needs no check.

**Refused: a refusal on empty values.** It catches the detached element and misses the unassigned slottable, which is the one the intake produces.

## Consequences

`composeDocument` throws where it used to read initial values; `seam/client.js`'s and the essay's notes on the order stop being the only enforcement of it. The em already refused through `compose()`; the five other reads now refuse at the same place and for the same reason, one message for all. The checklist's entry closes. **What stays open**: the operator's 2026-09-10 failure has no reproduction and no trigger; if it recurs it now names itself.

## Predictions

Frozen on write.

1. **The pin in `packages/essay/test/compose.test.js` is red before the engine moves** — both an unassigned slottable and a detached copy of a justified paragraph compose without a word — **and green after**, both refused with a message naming *no flat tree*, while the rendered paragraph still composes and reads `justify`. BREAK if the unfixed engine already refuses either.
2. **No document is refused.** Both clients compose before the intake, so every case holds and the composed differentials, view gates and acceptance run exactly as recorded — 25 of 25, no tally moving. BREAK on any refusal in the battery, which would mean a real caller reads an unrendered source after all.
3. **No slower in any measurable way.** The walk is a handful of parent steps per composed element on a cache miss. Observed, not gated.

## Verdict

Built in two commits on the round's own branch: the pin authored red with this record, then the engine.

**1 — The pin is red before and green after. HELD.** Against the unfixed engine both an unassigned slottable and a detached copy composed without a word; on the fix both are refused with the message naming *no flat tree*, and the rendered paragraph composes and reads `justify`. **One reading the prediction did not expect**: the unassigned slottable read `justify` too, not `start` — the pin's paragraph declares its alignment on itself through a class, and a declared value survives there. What reverts to initial values is what an element inherits, which the checklist's entry had stated more widely than that; it is corrected there.

**2 — No document is refused. HELD, and it is the whole battery.** `npm run gates` closed **25 of 25 in 7.5 minutes**, every standing record reproduced — the composed differentials at 89/8/3 and 86/10/4, the composed view gate at 40 view-agree, every case holding — and the pin now names `round-the-unrendered-source@ad792cf`. No caller in the venue reads an unrendered source.

**3 — No slower. NOT MEASURED**, and the battery's 7.5 minutes against the previous round's 7.4 is noise rather than a reading.
