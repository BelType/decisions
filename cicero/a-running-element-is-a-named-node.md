# A running element is a named node

**Status: Decided 2026-10-21, Executed 2026-10-21.** Convened by a fault found the same day in a real document; the case that draws it is `packages/essay/cases/118-the-running-element-mid-document`.

## Context

A running element written just before the third chapter of a book (`position: running(mark)`, read by `@page :right { @bottom-left { content: element(mark) } }`) showed on every right page from page three, before its own position in the document. The engine could not ask where it stood: the driver's `runningBoxes` handed the root one `Map<ident, Element>` for the whole document, first element of a name winning, and the root slotted that element into every page whose plan named it. A second element of the same name was never adopted at all, so it stayed in `body` and printed as a page of its own ahead of the root (case 118's red reading). The encoding wrote `element(mark, last)` as `element(mark)`: the keyword was dropped at the host.

## What the text says

- css-gcpm-3 §1.2.1: `running(<custom-ident>)` *"removes the element … from the normal flow, and makes it available to place in a page margin box using `element()`"*.
- css-gcpm-3 §1.2.3 gives `element()` the keywords `first`, `start`, `last` and `first-except`, with §1.1.2's meanings for `string()`: the first assignment on the page or else the entry value, the first assignment only where its element opens the page, the exit value, and `first` with nothing on the page that assigns. The entry value is the assignment in effect at the end of the previous page, and before any assignment it is empty.

## Decision

**A running element is a named string whose value is a node.** `position: running(name)` is a third kind of operation in the one log `document-state.js` replays, beside `counter-*` and `string-set`, assigned at the element's position: a top-level running element stands where the flow stood when it was written, the first word of the next top-level block. `element(name, which)` is answered per page by the same keyword arithmetic as `string(name, which)`, `namedStringsForPage` itself with the empty value a parameter (`''` for a string, `null` for an element), never a second implementation. The value is the element's address, plain data that crosses a `page.evaluate` boundary like every other condition, carried on the page's `closes` as `running` beside `strings`. Since the driver takes running elements out of the flow at the top level only, the address is the element's place in the run's list of running elements, in document order, and the root holds that list; a nested running element would want a `pathOf` path, and waits on its own case.

**The root slots a clone of the element the keyword names.** The string's door (a custom property on the host) and the element's door (a slot) stay apart, since a node is not a value. The page's chrome key carries `closes.running`, so a page a resumed presentation keeps re-slots when its answer moved.

**The encoding gains the keyword.** `element(mark)` and `element(mark, last)` encode and decode with `which` written out, `first` the default, on the precedent of `encodeString`; the host's rewrite passes the author's second argument through, and the capture's plan carries `{ element, which }`.

**`runningBoxes` keeps its one job**, taking every top-level running element out of the flow at zero footprint; it now returns all of them in document order, with the block each stands before, and the map goes. The site engine's rewrite with `pages: false` is untouched and leaves the running element visible as before.

**Refused**: a fix that filters the map by position, which is a second log beside the one the document state already keeps; and a keyword parsed but ignored, which is the fault in a new place.

## Predictions, frozen on write

Break-versus-hold decided here; judged at the round's close in the Verdict.

1. **Case 118 is red before the fold and green in both Cicero modes after it.** Break: any of its twenty box claims, or its page count, fails in either column after the fold.
2. **Case 41 holds unchanged**: one running element, `element(head)` with no keyword, both pages. Break: a box or the partition moves.
3. **Every standing record reproduces in the battery.** Break: any gate's tally moves.
4. **The manual (`docs/index.md`) and the specimen (`test/specimen.md`, which has a `.running-mark`) print the same running elements on the same pages before and after**, measured by one screen run each or by the conservation gate. Break: a page gains or loses a running element's copy.

## Consequences

- **Displaced**: the `Map<ident, Element>` the root was handed, `#runningPart`'s lookup by name, and the first-wins rule in `runningBoxes`.
- **Owed**: the operation in `documentOpsOf`, the per-page answer in the driver's string fill, the keyword in `gcpm-encoding.js`, the rewrite and the capture carrying it, the root reading `closes.running`; unit tests for the round trip and for the keyword arithmetic on a DOM-free log; the checklist row for `element()`.
- **Not owed here**: a running element nested in a block; `element()` in the flow.
- **Where the content lives**: the mechanism in `document-state.js`, `driver.js` and `root.js`, the names in `gcpm-encoding.js`, the status in the checklist, the story in the CHANGELOG under this date.

## Verdict

Executed 2026-10-21 on `round/a-running-element-is-a-named-node`, case first (`05334fe8`, red against `0c3fa41d`), the fold in `748da45c`. The battery: 26 of 26 gates, every standing record reproduced (native 163 agree, 18 legal-divergence, 7 theirs-illegal, 11 unclassified, 1 reference-invalid; composed-v1 89/8/3; composed-v2 86/10/4; v3 43/5/1/1 and 28/1/1; v4 43/4/2/1; the three view gates 50, 40 and 30 view-agree; acceptance in both modes, the cases, conservation, every probe gate, the browser-backed and DOM-free suites).

1. **Case 118 red before and green in both modes after — HELD.** Red: every presented page showed *Alder* in all four boxes, the two pages before it included, and *Birch* was never adopted, so it printed as a page of its own ahead of the root: six printed, five presented. Green: pages one and two empty, page three *Alder* under `first`, `start` and `last` and nothing under `first-except`, page four *Alder* in all four, page five *Birch*, *Alder*, *Birch* and nothing.
2. **Case 41 holds unchanged — HELD**, and so do cases 39 and 40, run beside it.
3. **Every standing record reproduces — HELD**, the tallies above.
4. **The manual and the specimen print the same running elements on the same pages — HELD, the manual vacuously.** One screen run each, both modes, on the engine before the fold and after it, diffed: the specimen's mark on its chapter pages three to nine and on neither of its first two pages, identical; the manual, 301 pages, writes no running element (its one `running(` is inside a code fence in `how-to.md`), so it measured zero copies before and after and says nothing about the change.

**What the record did not predict.**

- **The second element of a name was never adopted.** The map kept the first, and intake took the map's values, so the second stayed in `body` and printed outside the root, a page of its own ahead of the pages. The record named first-wins as displaced; it did not see that first-wins also left an element in the document's flow on the print side. Adopting every running element closes it.
- **The address is a place in a list, not a `pathOf` path.** A top-level running element is not among the blocks, so a block path cannot name it; the run's list of running elements, which the root already held, is the space it lives in. A nested running element would want a path, and is not built.
- **A nested running element is unchanged**: it stays in the flow where it was written and is assigned nothing, as before the round, since `runningBoxes` reads the top level only and the log takes its running operations from that list, not from the walk.
- **The resumed run answers the pages it keeps.** The run takes the list back from the intake, the string fill runs over the whole account, and a kept page's chrome key carries `closes.running`. Measured on case 118 under the CLI: a resume at page four's paragraph rebuilt pages three and four, kept one, two and five, and every page's boxes read as the whole run's.

## Amended 2026-10-21

**Egildo's ruling, the same day: a running element leaves the flow at any depth, as a fixed box does.** Convened by the studio experiment, whose editor wraps every top-level block of a document in a `<section>` of its own. A running element written at the top of the file reached the engine one level down, and because `runningBoxes` read the top level only, it stayed in the flow. GCPM §1.2.1 says nothing about where the element was declared. The Decision text above stands. This paragraph removes its top-level limit, which the Decision named as the reason the address is a place in a list. That address still holds, the list now being every running element in document order at any depth.

**The mechanism is the fixed box's own, never a second one.** `word-space.js`' `isFixedBox` answers a running element too, so the word space (`indexBlocks`), the feed and the presentation (`stripFixedBoxes`, `holdsFixedBox`) and `blockChildrenOf` take it out at zero footprint wherever a nested fixed box is taken out. `fixedBoxes` leaves running elements to `runningBoxes`. `runningBoxes` walks every depth and records, at intake, the next in-flow element after each running element, because a host's intake moves the elements out of their places. The assignment is logged at the next in-flow element's position inside the block, or at the start of the next block where nothing follows. The case is `packages/essay/cases/119-the-running-element-inside-a-block`: case 118's claims, with each element nested inside a block that holds ordinary content around it.

5. **Case 119 red before and green in both modes after, every standing record reproduced — HELD.**
   - **Red** against `a0c49bbc`: both marks printed in the flow (page three opened with *Alder* above its heading), and every box was empty on every page. No extra page in the venue's runner, five printed for five presented: the studio's extra page is the shape a running element takes when it is not adopted at all, and here it was adopted as part of its block.
   - **Green** after `2fe2b9da`: case 118's readings, box for box, in both modes. Cases 118, 46, 41 and 39 hold.
   - **Battery**: 26 of 26 against `b07ffcb8`, the same tallies as above.
   - **Specimen**: its mark prints on the same pages, three to nine, before and after.

**What the amendment did not predict.**

- **`blockChildrenOf` had to skip a zero-footprint box.** The forcing index and the page-name walk read block children and asked the position index about each one. A nested fixed box had never reached the index, because its style answered `isAbsolutelyPositioned`, but a running element's position is static. The fix went into the one walker of block children rather than into the two callers.
- **The seam's intake moves a nested running element out of its block before the run**, as it moves a nested fixed box. So the place the flow resumes at must be read before the intake, not by asking the block whether it contains the element. The first version asked, and under the CLI it put *Birch* at its block's start.
- **A running element inside a block the page divides** was measured in a scratch document: one block divided over ten pages, *Cedar* written mid-block. It is assigned mid-page five (`first` and `last` Cedar, `start` and `first-except` empty), shown from there on, and no flow copy on any page holds it.
- **`gcpm-encoding.js` became reachable through `word-space.js`** in a program root `npm run check` runs with stricter settings. `parseReadFunction`'s `address` gained a `@type`, a comment-only change.
