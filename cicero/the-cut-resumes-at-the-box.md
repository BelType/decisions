# The cut resumes at the box

**Status: Decided 2026-09-14, Executed 2026-09-14.** Reported as [beltype#33](https://github.com/egildo/beltype/issues/33); case 51, *the picture below the cut*, was written first and read red before the fix.

## Context

A page resumes at a `{block, word}` pair in THE word space, and a straddling block's continuation consumes its leading words: the consumed characters blank out, and an element left wordless that stands entirely before the resume word is removed, so that a figure already shown on the page before does not survive as an empty box of its own height (`fragments.js`, `consumeLeadingWords`). That rule reads word order as a proxy for *was shown*.

The proxy fails at exactly one place, and `positions.js` had already named it: *the word space under-determines block seams wherever a block has no words*. A Class A cut before a figure resumes at the word after the boundary — the caption's first word. The plate stands before that word in the word space, has no words of its own, and was never shown, because it lies wholly below the cut. Both halves are individually right and together they lose the picture. The report measured it as a window: at three filler lengths of fourteen the figure's image was painted on no page and its caption opened the next page alone, and a bare markdown image failed one notch earlier by being sliced at the page edge and never resumed. The same document under `pagedjs` and `site` painted it whole. It was found on the printer's own specimen, whose file rightly carried three pictures for a document with four.

A figure that is itself a top-level block was never at risk: a cut before a block resumes that block whole, as its original. The fault needs the figure nested — which is what BelType's one wrapping `<section>` does to every document.

## Decision

**A cut that falls before a box carries that box as a literal beside the position, and the continuation resumes at the box.** For a Class A cut and for a Class C cut at a box's start edge, the driver records `resumePath` — the box's child-index path from its top-level block, in SOURCE coordinates, the same shape a shell already rides in — on `next` and on the account entry; `pageIntervals` carries it onto the interval's start; `present()` and the driver's own measure feed hand it to `continuationClone`. `mutateToContinuation` then consumes everything before the path whole at every level and leaves the box and everything after it in place, dressed exactly as the resume by word dressed them — the chain the cut passes through above the box, the box, and its first-child chain, every leading edge that adjoins the cut (§5.2). Dressing the box's chain any less was measured to move two seeds' cuts off Chromium's (native 71 and 173); whether a fresh box's own border should survive where its margin does not is a §5.2 reading this round leaves where it found it. A path of all zeros addresses the block's own start — nothing stands before the box — and is not carried either: the block then presents whole on the next page with its own leading edge, which is what a start-edge cut on a first child has always meant here and what Chromium's print agrees with (carrying `[0]` moved native seeds 71 and 173 off their cuts, by dressing as cut-through a block that was not). A resume by word is unchanged for every Class B cut, where the resume word is the fact.

This is the account ruling's own shape — the account is the Ledger plus view literals, and `posBlock` exists for the same reason at the block seam. Refused: teaching `consumeLeadingWords` geometry. It runs on a detached clone with no layout to ask, and the driver holds the geometry at the moment of the cut; a literal written there is exact where an inference later would be a second proxy. Also refused: expressing the resume as a painted shell with zero paint — the slice would carry the gap between the cut and the box's top as blank space below the box, and a shell says *the graphic continues* where this box simply moves.

Progress under C2 gains one clause: the same word with a later path is progress, because two wordless boxes in a row share one word position and the second is a different place.

## Consequences

- `src/driver.js`, `src/fragments.js`, `src/positions.js`, `src/root.js`; two DOM-free tests in `test/fragments.test.js`.
- `cases/51-the-picture-below-the-cut`: case 34's sentinel grid, a 60px SVG plate whose one word reaches the text layer, everything in one `<section>`. Red on both modes before the fix (page 2 opening with `cap000`, the partition against Chromium diverging on page 2 by the one word); holds after.
- Measured after the fix, the report's own acceptance: the filler length swept 0…35 words over the figure form and the bare-image form, 72 documents, the plate on exactly one page in every one, no page error.
- The printer's specimen, `packages/caster/fixtures/specimen`, should now present four pictures where Caster's S42 measured three; the acceptance suite there freezes no count, deliberately.
