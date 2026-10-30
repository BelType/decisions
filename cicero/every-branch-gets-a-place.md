# Every branch gets a place

**Status: Decided 2026-09-21.** Opened on the day's rulings with the predictions frozen; the build follows in stages and the verdict is written at the close.

## Context

Egildo named it on 2026-09-21: fixing one detail at a time had made the work swing between issues like a pendulum. The cause was found the same day. Every fault of the month was one kind of fault — content that does not survive a cut — and the venue's check for it, the view gates' *the printed partition equals the Ledger's*, ran green throughout because `seeds/generate.js` draws no table, no flex, no grid and no float. Each breaking construct arrived with a stranger's document and earned one case and one fix.

So the round surveyed before it designed. [`packages/essay/probes/conservation.js`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/essay/probes/conservation.js) puts one document shape to both engines over seventeen containers, three kinds of content and three offsets. Native mode: same 32, lost 111, twice 1, moved 9 of 153; composed mode the same map with one class of the Compositor's own. The findings, their arithmetic and their causes are on the [checklist](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/css-paged-media-checklist.md), *content beside other content does not survive a cut* and *a word in a carried flow's remainder is answered a page early*; the issues are [beltype#44](https://github.com/egildo/beltype/issues/44) and [beltype#43](https://github.com/egildo/beltype/issues/43).

The [tablet](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/design-tablet.md) needed no amendment. The Flows already says *an entry carries a resume path for every flow straddling it … losing nothing* and *a table's cells are parallel flows in the ordinary §2.1 sense*, and closes on *what the engine does today is lose it*. [*A parallel flow contributes geometry and nothing else*](a-parallel-flow-contributes-geometry-and-nothing-else.md) built that for a top-level float; [*the cut is a place in the tree*](the-cut-is-a-place-in-the-tree.md) gave the cut one address and spoke of it in the singular where the law is plural. This entry is the build catching up with its law below the top level, joined to the round it interrupted — a fragment holding exactly its interval.

### Measured in Chromium, 2026-09-21

- **Each item is severed at its own last line that fits.** Two flex items, 120px of room: the item at 20px lines shows six, the item at 30px lines shows four.
- **An item with nothing left keeps its place.** A three-line item beside a twelve-line one: on page two the long item is still in the second column.
- **One item's own orphans move the whole row.** `orphans: 8` on one item, six lines of room: both items go to the next page.
- **A scope opened by a box hidden before the cut does not reach the next fragment**, and `counter-reset: list-item` on an `ol` is ignored; `counter-set: list-item` on the first shown item is not.

## Decision

**A fragment says what it is.** A piece of a divided box is marked `data-beltype-fragment="first|middle|last"` — never k of n, since the count is unknown while the flow runs forward and nothing needs it. The role is the interval's own two ends, per box: the start cut passes through it and the end cut does not, last; the end only, first; both, middle. The whole copies that wore the same bare mark — a fixed box per page, a running element, a composed block's clone — take `data-beltype-copy` instead, and `__beltype-first` retires. The top-level fragment names its source by block index. A reified pseudo-element is `data-beltype-pseudo="before|after|marker"`, written by Caster's `reify` and read by both packages.

**Outside the interval, a box is kept and not displayed**, in the measure feed and the presentation alike, so the author's structural selectors match on every page what they match in the source, and BelType's own `section:has(> h2.x)` holds on a continuation. *Refused: removal*, which is what the start cut does today. *Named upgrade, unbuilt*: hidden boxes kept as elements with their interiors emptied, if the pages-times-document tree ever measures badly.

**Counters are restated where hidden content precedes displayed content in tree order** — after a start cut and after an end cut. Every counter in scope whose scope opened inside the top-level block is restated on the first displayed child at the opener's level, merged with that child's own `counter-reset`, so the scope is exactly the remainder of the original; its value is the flat replay's, which is document order. An `ol` resumes by `counter-set: list-item` on its first shown item, the value from HTML's ordinal arithmetic. Operations on pseudo-elements stay the one stated limit.

**A row is recognised by two tests together.** The parent lays its children out side by side — flex, grid, a table row — which permits the question; the children's extents overlap on the block axis, which answers it. A row is a group of sibling boxes, not an element. The Gauge answers it, beside the procession. *Refused: `display` alone* (a flex column is a sequence) *and geometry alone* (a negative margin overlaps two ordinary blocks).

**The page edge cuts a row; the Stonehand never chooses a point inside one.** Through the row is an ordinary break, legal when the row does not forbid it and at least one item makes progress. **The items' own orphans and widows are left unread** — see the debt below.

**Through a row, every item gets a place.** An item the edge crosses takes its path and the words shown; an item wholly below takes a bare path; an item with nothing left takes its path and a zero remainder and is presented as an empty box that keeps its column — the one exception to `display: none`, its counters silenced like any box a cut passes through. The main path stops at the row's first item and never enters a branch. Places nest — a table inside a flex item — and the entry's list stays flat. The walk that addresses a carried float asks its question of the box itself as well as of its children, which is the bare-text float's whole fault.

**A pseudo-element belongs to one fragment.** `::before` and `::marker` to the first, `::after` to the last, withheld elsewhere by the dressing sheet over the role mark. A blank shell's `::before` generating again is what printed the survey's plate twice.

**Order and membership are two facts.** The flat word index is document order and keeps ordering the Ledger's entries. Which page a word is on is answered by its branch's own place. `pageOf`, a named string's four keywords, the page-start counter, the view gates and the census read membership.

**What the engine does not yet divide is a monolith.** Multicol, a line of inline-blocks and an absolutely positioned box beside the flow each lose words today and each is its own design. Until then they move whole or are sliced by the edge with the remainder painted — the specification's own remedy, which loses nothing — and the console names them. The survey's *moved* column keeps every such cell in sight.

**The clip lifts only after a float is an interval, with no exception built and no fallback.** Floats as intervals, then the block-axis clip to the page box, Chromium a declared divergence. Making a float's fragment an interval changes nothing about what constrains its interior.

### The debt, stated

**An item's own orphans and widows are unread, and Chromium reads them.** It moves the row where this engine severs it. That is reading constraints inside a parallel flow, which The Flows forbids and which is the engine's one outstanding amendment — *a parallel flow's interior constraints*. This round pays for conservation and not for placement: the cost is a *moved* cell, never a lost one, and it is owed to the design round that takes up the wall.

## What is not decided

- **The spent item's mark.** It shows nothing, so it is not first, middle or last. Egildo offered *spearhead*; the word is not settled.
- **A table whose first row is already shown.** `display: none` on the row changes the widths an automatic table computes. `visibility: collapse` is CSS 2.1's own tool for it; owed a measurement in Chromium, and a collapsed row still generates a box.
- **A grid with explicitly placed items** once its first row is hidden. Believed right; unmeasured.

## Ruling

**2026-09-21, Egildo: `spent`.** An item of a divided row with nothing left is `data-beltype-fragment="spent"`. *Spearhead* was weighed and declined for it — a spearhead is the point of an advance still going, and this is the box that has finished; the word fits a branch's own place better, and that already has its name. `spent` is the source's own word for a box wholly consumed, and needs no glossary.

## Predictions

1. **The survey, both modes: zero lost and zero twice** in every cell of a flex, grid or table container, a float nested in a block, and a top-level float of bare text. *Breaks if any such cell loses or doubles a token.*
2. ***Moved* appears only where an item carries its own orphans or widows, and in every cell the monolith rule catches.** *Breaks if a moved cell has neither cause.*
3. **The three sequential controls stay identical to Chromium in all 27 cells, both modes.**
4. **Every standing record of the battery is unmoved at every stage.** The generator draws none of these constructs, so a moved record is a regression in the procession and not a consequence of this work.
5. **Issue 44's reproduction prints 24 of 24; issue 43's marked word is answered page two by `pageOf`, by the named string and by the page-start counter; issue 41's first figure reads *Figura 1*.**
6. **The census — every block's fragments concatenating to its words exactly, every box displayed on a page — is red before the interval is built and green after**, over the corpus and over the survey's documents.

## Consequences

**Build order**, approved: the bare-text float, a case and then the fix; rows; the pseudo rule with the marks; membership; the interval and the counters; floats as intervals; the clip. **Caster is the next session's**: its five compensations and `verifyPartitions` wait on the marks this round lands, and are not touched here.

**Owed to the documents in the same round**: the architecture's The Flows and its fragment section; the checklist entries as each class closes; the survey promoted to a standing gate at the close, its record every cell at zero lost and zero twice. [.claude/NEEDED-FIXES.md](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/.claude/NEEDED-FIXES.md) is rewritten around this entry.

**Displaced**: *a fragment's source is always a top-level block*, true of everything before a row was cut, false of an item's continuation. The block index names a top-level fragment's source; whether a branch's fragment needs the path as an attribute is answered when a reader outside the engine needs it.
