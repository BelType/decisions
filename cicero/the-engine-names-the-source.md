# The engine names the source

**Status: Decided 2026-09-21, Executed 2026-09-21.**

## Context

A survey of how far a position can be tracked — source file, rendered node, paginated page — found the chain sound at block granularity and broken at one joint: **the paginated document is not the rendered document wherever the engine presents a copy**, and nothing outside the engine could say whose copy an element is. A first fragment, a continuation, a composed block's fragment, a fixed box's per-page copy and a running element's are all `cloneNode(true)` products (C5), and the original stays adopted and unassigned (I6). [*The engine answers the page*](the-engine-answers-the-page.md) takes a SOURCE element for exactly that reason and says so; the reverse question had no door.

The printer had already paid for the absence. Caster's numbered record measured, before the map existed, that *a continuation clone carries no link back to its source*, and its Cicero adapter finds one by rule: the belt's `data-beltype-pos` stamp where a host asked for stamps, else the last element of the same tag on an earlier page, else a walk by position that must restate what `consumeLeadingWords` removes — and where none of them names the original, only half of its partition check is reachable. Every one of those rules is a second implementation of a fact `fragments.js` owns.

And the fact was already held. Since [*the cut is a place in the tree*](the-cut-is-a-place-in-the-tree.md), `word-space.js` keeps `SOURCE_OF` and `mapCloneToSource` fills it element by element for every first fragment and continuation, because the address is resolved on the source and the clone reached by identity. It was read by the driver and the Stonehand and published to nobody; and three of the presentation's own clone sites in `root.js` — the whole block presented through a fragment, the fixed box's copy, the running element's — never registered at all.

## Decision

**Cicero answers the source for a presented element. It exposes no map.** The verb is `sourceOf(element)`, seated on `<beltype-root>` beside `pageOf` and published to a host as `window.__beltypeCicero.sourceOf`. It returns the adopted original the element is a copy of, or `null`.

**Every clone the presentation makes is registered, at the moment it is made** — before the hints, before the fixed boxes are stripped, before anything is consumed, which is `mapCloneToSource`'s own precondition and the order `continuationClone` already keeps. The three unregistered sites in `root.js` now call it. Identity is what makes the answer hold at any depth: an element that survives consumption is the same object that was registered, and an element that does not survive is not there to be asked about.

**`null` names one thing: this element is not a copy of anything the author wrote.** An original answers `null` because it is the source. The engine's own marks — the slice shell around a painted monolith, the Compositor's breaks and fillers — answer `null` because no author declared them. An element outside the root answers `null`. None of these is a failure, and a consumer can tell them apart by what it is holding.

**Elements only.** A continuation's consumed characters are blanked and trimmed, so no offset inside a fragment's text node is an offset inside its source's, and a text node has no answer here. A character in a fragment is the Registration thread's question, deliberately not this entry's: block granularity was judged sufficient, and the reserved `(gi, char)` refinement stays unminted.

*Superseded 2026-10-13 ([*the engine names the source point*](the-engine-names-the-source-point.md)): a host that turned a point in a copy into the source's by pairing text nodes by order and aligning strings was off by one after the first hollow box, and the character level was ruled in, as two verbs in DOM terms (`sourcePoint`, `pointOn`) rather than the `(gi, char)` refinement this paragraph reserved. The paragraph stands as written for what it decided then; the prediction 3 below it is answered there.*

Refused: **publishing the map, or stamping a reference onto the clone** (an attribute, an expando). The first hands live DOM references across the seam, which the parked horizon of the engine leaving the realm would strand — the same argument that made `pageOf` a verb. The second writes an engine fact into the author's markup, where a stylesheet can match it and a printer would come to depend on its spelling. Refused: **leaving the printer's rules as the mechanism.** They are correct today and they are correct by restating `fragments.js`; the next change to what a continuation removes would break them silently in another package.

## Predictions, frozen on write

1. **Registration is invisible to layout.** The three new calls write a WeakMap and nothing else. Hold: every standing gate reproduces and no record moves. Break: any page count, divergence tally or positional gate changes.
2. **One predicate reads differently, and it should not matter.** `isFixedBox`, `isInlineBox` and `clonesDecoration` ask a registered clone's SOURCE. A fixed box's per-page copy used to be unregistered — asked about itself, it read `absolute`, since the dressing sheet re-homes it — and now reads `fixed` through its source. No caller asks a presented copy (the fixed boxes are collected once, at intake, before any copy exists), so this is expected to be unreachable. Break: a fixed box delivered twice, or not at all, anywhere in the battery.
3. **Expected to be unable to say:** whose text a text node is, and where in its source a character inside a fragment sits. Stated as a limit rather than discovered as one.

## Consequences

`src/root.js` gains three registrations and one method; `seam/client.js` publishes one more member on the handle it already sets, beside `pageOf` and for the same reason seated by `run()` rather than at load. `word-space.js` is unchanged — the map, its filler and its reader were already there. The architecture's paragraph sits beside *the engine answers the page*.

**Caster is deliberately not changed in this round.** Its adapter keeps pairing by rule, and the rules keep working; what it may do with the verb — and what `verifyPartitions` then still has to check — is its own round's question, recorded for it in `packages/caster/NOTE-the-engine-names-the-source.md`. Its record that a clone carries no link back is now history rather than fact, and that note says so.

The pin is `packages/essay/test/view.test.js`, with the presentation itself as the ground truth: over a corpus case in both modes and a document with a nested fixed box, every element under every presented fragment names an adopted original of its own tag, no engine mark names anything, a first fragment and the continuation that resumes it name ONE source, and every page's copy of a fixed box names the one unassigned box the author declared. It was made to fail before it was trusted: with the three registrations removed, the composed survey goes red.

## Verdict

**Prediction 1 held.** The whole battery ran against the committed source: 25 gates of 25 in 9.6 minutes, every standing record reproduced unmoved — native 163 agree, 18 legal-divergence, 7 theirs-illegal, 11 unclassified, 1 reference-invalid; the view gates 50, 40 and 30 view-agree — and the pin was re-recorded at `3e0c19e`.

**Prediction 2 held, by the same run**: `cases` and `probe-fixed` are green, which is every document in the venue that delivers a fixed box, the nested one included.

**What was too good to be true, and was checked.** The pin passed on its first run, so it was made to fail: with the three registrations removed from `root.js` the composed survey's assertion goes red, and restored it is green. The native survey does not fail under that mutation, and that is correct rather than weak — in the native mode every presented fragment is a first fragment or a continuation, which `fragments.js` has registered since 2026-09-18.

**A suspicion measured and dropped.** `root.js` stripped fixed boxes from a whole-block clone it had never registered, and an unregistered detached clone answers *not fixed* for every element — on paper, a nested fixed box delivered twice. Probed live on a section holding a rail: intake moves a nested fixed box out of its block into the root's light DOM, so by presentation no source block holds one and the branch is reached only for composed content. Unreachable, not fixed; the registration would have closed it as a side effect either way.

**Unpredicted:** nothing.
