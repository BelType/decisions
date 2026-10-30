# An unplaced original is parked, not unassigned

**Status: Decided 2026-09-21, Executed 2026-09-21.** Found by the battery's first run against Chromium 153, when `packages/browser-chromium` dropped puppeteer and the pinned build moved from 150.0.7871.24 to the one `playwright-core` names.

## Context

`<beltype-root>` adopts the document as its light DOM (I6) and assigns slots manually. A block a page shows is assigned to that page's slot; an ORIGINAL no page shows — a divided block's since *the first fragment is constructed*, every block's in the composed mode, a fixed box's, a running element's — stayed in the light DOM assigned to nothing, *"unassigned and unrendered, the canonical source"*. And the engine reads the author's declarations from it: `word-space.js`'s `sourceStyle`, and `clonesDecoration`, `isInlineBox`, `isFixedBox` and `blockChildrenOf` over it, all guarded by `isConnected` and nothing else, because *a detached clone has no computed style to ask* and its registered source was assumed to have one.

**CSSOM says otherwise, and Chromium 153 now agrees with it.** `getComputedStyle` returns no declarations for an element that is not in the flat tree, and a slottable no slot takes is not in it. Measured on a minimal document under both builds: 150 answers `block`, `4px`, `page`, `rgb(1, 2, 3)` for such an element, 153 answers four empty strings. Under 153 every one of those readings therefore went blank in silence — `clone` read as `slice`, so `cases/42` and `cases/47` lost exactly the 14 px of cloned border and padding at each cut; the composed mode lost its per-block properties, so `cases/06`, `16` and `19` printed words out of order and `20` lost the page context's colour — and the three *"[chromium] diverges"* failures beside them were comparisons against a Cicero that had moved, not a change in Chromium's print. Seven cases, eleven checks, one cause; all hold under 150, and the differentials, views, acceptances and probes reproduced every record unmoved.

This is the hazard [*the composition refuses an unrendered source*](the-composition-refuses-an-unrendered-source.md) closed for ONE reader, by refusal, six days earlier. That record measured that an unassigned slottable *"answers a full declaration with its inherited properties at their initial values"* — wrong answers that looked right. 153 replaces them with no answer at all, which is the better failure and reaches every reader at once.

## Decision

**Every light child is assigned to a parking slot first — `<slot data-beltype-park style="display: none">` in the root's shadow — at the top of `present()`; page slots then take what they place.** A manual assignment to a second slot removes the node from the first, so what stays parked is exactly the unplaced originals. Parked, an original is IN the flat tree under a box that renders nothing: no box, no ink, no rectangle, and a computed style that answers — inherited properties included, since it now inherits through the root's host like everything a page shows.

The alternative weighed was the one the earlier record already refused: a snapshot of the needed properties taken while the document is live. It is a second copy of the author's cascade, it has to know in advance which properties every future reader will want, and it goes stale the moment a host restyles. The slot keeps the ONE source of truth the engine already had and makes the premise every reader rests on true again, in ten lines.

## Consequences

- **"Unassigned" now means ON NO PAGE, and is spelled `assignedSlot` null OR the parking slot.** `compose-dom.js`'s `inFlatTree` needs no change — a parked original passes it and answers correctly, which is the refusal's condition met rather than evaded. Caster's Cicero adapter climbs `assignedSlot` to find a page and falls through the parking slot to its own map, unchanged; its composed-mode acceptance asserted `!el.assignedSlot` as a precondition and now asks the question it meant.
- Every narrated case holds under 153; the engine's suites, Caster's and the editing tools' are green.
- **The inherited properties of an unplaced original are RIGHT for the first time on any build.** No case had caught the wrong ones; none is claimed fixed beyond what the seven measure.
- *What Cicero should stamp* (Caster's DESIGN.md) asked for a clone→source link so pairing need not be by rule. This is not that, and does not retire it.
