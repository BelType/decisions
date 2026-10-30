# A word is on the page its flow puts it

**Status: Decided 2026-10-15, Executed 2026-10-15.** Taken in the round *the float answers its page* (branch `round/the-float-answers-its-page`), which closes [beltype#43](https://github.com/egildo/beltype/issues/43).

## Context

A float that crosses a page boundary continues on the next page, and for every word in the part that continues, everything that asked *which page is this on* answered the page before: `pageOf`, a named string's `first`, `last` and `start`, the counter a page starts with (checklist: *a word in a carried flow's remainder is answered a page early*; measured 2026-09-21, put as `packages/essay/cases/112-the-word-in-the-carried-float` and left red on 2026-10-15). The cause is that the flat word index was doing two jobs. It is DOCUMENT ORDER, and it was also read as PAGE MEMBERSHIP; in a single procession the two coincide, and beside a parallel flow they part, because a float's words stand before the paragraph beside it in the document and are displayed beside and after it. No single flat boundary can say so: a row of cell A (words 24–35) and B (36–47), with A's ninth word on page two and B's third on page one, asks a boundary `c` for `c ≤ 32` and `c > 38` at once. [*A parallel flow is a fragmentainer*](a-parallel-flow-is-a-fragmentainer.md) made the carried remainder's place a node of every entry's resume tree, and no reader asked it.

## Decision

**Order stays the flat index's; membership is answered by the carried flows' own places.** Each node an entry carries resumes its flow at `pos`, and its box's words from there to the box's end are the words it has still to show (`positions.js`' `remaindersOf`; the box is the node's `item` where it has one, its top-level block where it does not, and the index answers where a box ends, `indexBlocks`' `endOf`). **A page holds the words of its interval, and the remainders its opening cut carries in, less the remainders its closing cut carries out.** A page nothing flows onto carries no flow in its row while the cursor carries the same flows across it, so its end keeps what its start carried. Every reader of membership asks that one rule and nothing else:

- `pageContaining`, so `root.pageOf` (and the editing tools' follow and source jump through it) and every `target-counter(<url>, page)` read; `pageOf` answers `'not-yet'` for a word in a remainder the last cut carries, since no page has been cut for it.
- `namedStringsForPage`: an assignment is on the page its element is on; the entry value is the last assignment shown on a page before, in document order.
- `counterStateAt` for the counter a page starts with: an operation in a remainder carried onto the page is not yet in force there, though it stands before the page's first word. The replay itself still runs in document order, which is CSS's tree order for counters.
- The driver's `held`, which says whether an element is on the pages cut so far.

**Refused:** reordering the flat index into page order (the Ledger orders by it, and CSS's in-content counters are tree-order by specification — a figure at A's ninth word is numbered before one at B's third although it is displayed a page later, and Chromium agrees); a membership table built per page from the presentation's slots (it would answer only for presented pages and make the account's readers depend on the DOM).

## Consequences

- Case 112 holds in both modes, and `packages/essay/test/page-of-carried.test.js` pins `pageOf` over its rail: twelve words on page 0, eight on page 1, where all twenty answered page 0. Two DOM-free tests pin the arithmetic (`positions.test.js`, `document-state.test.js`). The battery ran whole on `d58d309`: 26 of 26 gates, every standing record unmoved (native 163/18/7/11/1, composed-v1 89/8/3, composed-v2 86/10/4, v3-native 43/5/1/1, v3-composed 28/1/1, v4 43/4/2/1, the view gates at 50, 40 and 30), and the pin re-recorded.
- `pageIntervals` takes the index's `endOf` as a third argument and refuses, as a programmer error, a flow below the top level without it.
- Left standing: GCPM's `start` reads an assignment as the page's first only where it stands at the interval's own first word, so a carried remainder's first element is never a page's `start`; the specification does not say which of two flows displayed side by side holds the page's first element. The differential compares cut positions, which are order, and is untouched; Caster's interval census asks `pageOf`, so it reads this rule now without a change of its own.
