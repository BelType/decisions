# Images are awaited at intake

**Status: Decided 2026-09-18, Executed 2026-09-18.** Reported as [beltype#39](https://github.com/egildo/beltype/issues/39); the implementation pin `packages/essay/test/intake.test.js` was written first and read red before the change.

## Context

The engine cuts pages against a layout in which images that have not finished loading are zero pixels tall, and then presents the real one. `src/measure.js`'s `awaitFonts` awaits `doc.fonts.ready` and nothing else; `src/driver.js`'s `paginate` calls it once before the first measure; an `<img>` carrying no `width`/`height` attributes has no intrinsic size until it loads. So every page shows its first stretch of real content and the next resumes where the collapsed layout ended, and the blocks in between — figures, headings, paragraphs, list items — are on no page, silently. The report's own arithmetic stands where it was recorded and is not restated here: a 21-page manual of 27 screenshots paginating to 14, and the per-cut *used*/*advanced* table that names the loss cut by cut. It also excludes device pixel ratio by measurement, which is worth keeping because the preview's own console banner points that way.

**The tablet has an answer for this, and it is not awaiting.** [design-tablet.md](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/design-tablet.md)'s model states the phenomenon whole: *"Late-arriving truth is one phenomenon. Fonts that load, images that size themselves, forward references whose targets do not yet exist: all are content whose geometry firms up after first measurement, and all share one machinery — void entries from the last entry before the changed box, rebuild forward."* It then divides the three by how each reaches that machinery: *"Fonts are simply awaited before the first measurement; images are measured at declared or placeholder sizes; forward references reserve their footprint (C9)."* [architecture.md](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/architecture.md) says the same in the driver's voice — one rim, one machinery, every signal the same act, `ledger.voidFrom(box)` and then the forward build resumes.

**The rim does not exist.** `src/ledger.js`'s `voidFrom` is implemented, unit-tested in `test/ledger.test.js`, and called by no production code — not in `src/`, not in `seam/`, not in the venue. `paginate` is a single forward pass, and `run()` is not re-entrant (its own entry on the checklist's design opens). So the tablet's sentence describes a division of labour the engine has one half of: fonts are awaited, and images are not measured at placeholder sizes and then corrected — they are measured at zero and left there.

That is what makes this a decision rather than a repair. An image measured early is only safe where a wrong measurement can be *undone*, and this engine has no way to undo one.

## Decision

**Until the rim exists, images are awaited at intake.** `src/measure.js` gains `awaitImages(doc)` beside `awaitFonts`: `Promise.allSettled` over a `load`/`error` wait for every member of `doc.images` that is not already `complete`, and `src/driver.js`'s `paginate` calls it next to `awaitFonts`, before the first measure. One call site covers every host, because the seam's bootstrap, the editing tools' `beltype:ready` call and the venue's own client all enter through `paginate`.

The reasoning is the whole of it: **a measurement the engine has no way to correct must not be taken early.** Where the rim exists, measuring an image at a placeholder size is cheap and right, because the load event voids the entries it invalidates and the build walks forward again. Where it does not, the same act is a cut adjudicated against a layout nobody will ever see, and C10's content loss is what it produces.

**A failed load settles at its error size.** The wait resolves on `error` as it resolves on `load`, because a broken image has a geometry too and the engine's business is that the geometry has stopped changing, not that it is the one the author wanted. `Promise.allSettled` is the spelling for the same reason: one image that never settles must not hold the others.

**Stated limit: a `loading="lazy"` image is not awaited.** Such an image may never load at all — the browser decides by viewport proximity, and the document the engine paginates may never be scrolled or even written to a screen (C5: the source document is never written). Waiting on one would be waiting on an event that is not coming. It is skipped, it is measured at whatever size it has, and the console says once how many were skipped, because a silent exception to a rule the rest of the document relies on is the venue's oldest scar.

**Refused: awaiting `decode()` as well as `load`.** The report suggests it, and the geometry does not need it — intrinsic size is known at `load`, and `decode()` waits on raster work that changes no rectangle. What it would buy is a first paint with no flash, which is the presentation's business and not adjudication's.

**Refused: treating this as the tablet's design and stopping.** It is not, and the record says so where a later reader will meet it: the tablet's division is fonts-await / images-placeholder / references-reserve, and this entry builds the first behaviour for the second kind because the machinery the second kind was designed around is unbuilt. Writing it up as *the same rule fonts already have* would retire a design open by renaming it.

**Refused: an author-side answer.** `width`/`height` attributes would reserve the box, but Markdown's image syntax cannot carry them, so that is advice to authors rather than a fix to the engine.

## Predictions

Frozen on write, before anything runs.

1. **The pin is red before the change.** `packages/essay/test/intake.test.js` paginates one document twice in one page — once with the image still in flight behind an 800 ms route, once after it has settled — and the two accounts disagree: the early run gives one page against three, and the cut positions differ. HOLD on any disagreement in page count; BREAK if the two accounts are already equal, which would mean the document does not put the question and the pin is checking nothing.
2. **The pin is green after the change**, page count and every cut position equal. BREAK on any residual difference, which would mean an image is reaching the measure unsettled by a path `doc.images` does not cover.
3. **Every standing battery record is unmoved.** The corpus writes no images at all and the cases that carry one serve it locally off the venue's own server, so `awaitImages` finds nothing pending and returns without awaiting anything. BREAK on any record moving; a moved number would mean the await changed a document's layout, which it must not — it changes *when* the layout is read, never what it is.
4. **The added wait is unmeasurable on the fast suites and visible on the pin alone.** The pin's early run should take about 800 ms longer after the change than before, which is the image route's own delay and nothing else. BREAK on the battery's benchmark moving, which is recorded as an observation and never gated but would be the first sign the await is being entered where nothing is pending.
5. **What this cannot say**, predicted as a limit rather than a result: no check here can show that the *editing tools'* race is closed, because the pin runs against the venue's own server and the reported fault arrived through a Service Worker. The pin proves `paginate`'s contract; that the hosts all enter through `paginate` is read off the code and stated, not measured.

## Consequences

- `src/measure.js` (`awaitImages`, exported beside `awaitFonts`, which stays exported because `packages/essay/test/` imports it), `src/driver.js` (`paginate`). Nothing else in `src/` moves, and no dependency is added.
- **The cost, plainly: first paint now waits for every non-lazy image in the document.** The tablet's design would not — measuring at placeholder sizes and correcting through the rim is what keeps the first pages fast on a picture-heavy document — so this is a real loss, taken knowingly in exchange for pages that carry all of their content.
- **What retires the stand-in is the rim being built**, and it is filed as a design open of its own on the checklist: `voidFrom` given a caller, a subscription at the engine's edge, and a forward build that resumes from the new last entry. That last part is re-entrancy, so it is the same build as the `run()` entry rather than a second one. When it lands, `awaitImages` goes and the tablet's sentence is true again as written.
- The tablet is untouched. It describes a design this engine has not finished building, which is a status fact, and status lives on the checklist.
- `docs/architecture.md`'s **Late-arriving truth** section gains one sentence marking that status in place, pointing here. Its design is not rewritten.

## Verdict

**Predictions 1, 2 and 3 held. Prediction 4 held on the pin and was not put to the benchmark. Prediction 5's limit stands exactly as stated.**

**Prediction 1 held, and the two honesty guards beside it held first**, which is what makes the red worth quoting. The settled reading began with no image in flight and printed three pages — four lines, a plate that cannot follow them, six more, over a 240 px page area — and the early reading began with one image in flight and printed one:

```
AssertionError: the cut count must not depend on whether the plate had arrived
1 !== 3
```

The guards are the point. Had the settled reading begun with an image still loading, both columns would have been the early one and the equality would have been vacuous; had the early reading begun with everything loaded, the pin would have been asserting nothing. Each is checked before the claim, and each fails in its own words.

**Prediction 2 held**: after `awaitImages`, three pages against three, and `deepEqual` on the cut list — every page resuming at the same word and the same block.

**Prediction 3 held.** The complete battery — 25 gates in 7.6 minutes, pinned at `9c5cf51` on `cicero/intake-and-inline-clip` — reproduced **every standing record**, with not one number moved: `native` at 163 agree / 18 legal-divergence / 7 theirs-illegal / 11 unclassified / 1 reference-invalid, `composed-v1` at 89/8/3, `composed-v2` at 86/10/4, `v3-native` at 43/5/1/1, `v3-composed` at 28/1/1, `v4` at 43/4/2/1, the three view gates at 50, 40 and 30 view-agree, and every case, probe and acceptance gate green. The reason it could not move is worth stating rather than assuming: the corpus generates no images at all, and the cases that carry one are served locally, so `awaitImages` finds nothing pending and returns without awaiting anything.

**Prediction 4 held where it could be read.** The pin's early run costs the route's own 800 ms and nothing else; the battery's total, 7.6 minutes over 25 gates, is in its ordinary range. The benchmark was not run — it must run alone and is recorded as an observation rather than gated — so the prediction's own break criterion was not exercised, which is recorded here rather than claimed.

**Prediction 5 stands, unchanged and unmet by design.** Nothing here shows that the editing tools' race is closed. The pin proves `paginate`'s contract; that the three hosts all enter through `paginate` is read off the code and stated.

**What was too good to be true — and this round has a real answer, from its other half.** Nothing about the intake work surprised. What surprised was the round's *other* decision, [*the clip is a block-axis fact*](the-clip-is-a-block-axis-fact.md), which was withdrawn before execution when the case written for it went red on the oracle's own column: Chromium's print clips document content at the page area exactly as this engine does, and the specification sections that entry argued from do not say otherwise. Both halves of this round rested on a sentence from a report. This half's held under measurement; the other half's did not, and the difference was one print of three coloured boxes that nobody had taken. **The lesson belongs here too**: the report's *used*/*advanced* table was the evidence for this entry's Context, and it was never independently reproduced — the pin measures the contract, not the reported document, and if that table had been wrong the way the clip premise was wrong, nothing in this round would have caught it.


**Amendment, 2026-10-13.** The rim this record says is unbuilt is built at the seam ([*late truth is an edit*](late-truth-is-an-edit.md)), on the resumable run and not on `voidFrom` (deleted). A picture that becomes pending after the first run is now heard and resumed from; the await at intake remains a stand-in for the first run only, and a `loading="lazy"` picture is no longer skipped but made eager there, the limit the Decision stated being a hole (a lazy image with no box never loads, and a parked original has no box).
