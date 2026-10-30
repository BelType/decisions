# The page asks the index

**Status: Decided 2026-09-25, Executed 2026-09-26.**

## Context

*The run keeps time* put a clock on every phase of the run, and the investigation that read it found that four of the run's five per-page steps do their work on the whole document rather than on the page, and that one browser-level interaction multiplies two of them. The findings and their numbers are in `packages/essay/RESULTS.md` (*What four of the five per-page steps read*), each with an entry on the checklist's frontier: the grab walks the whole top-level block on every page whatever the cursor; the Stonehand measures every word below the page edge on every page; a live `Range` costs every text write in the document until a garbage collection releases it, and the engine minted one per measured box per page; and the fixed-box predicate is re-read from the source once per element per clone.

None of the four is a tablet question. Each is a mechanism doing more than the architecture already says it does, or a mechanism the architecture did not know it had. The Cast-off's bound — how much content to lay out ahead of the cut, I5's one licensed estimate — is the tablet question in the neighbourhood, and it is not this round's: it stays for a design round with Egildo, and after this round it governs the layout and the report, about 14 ms of the manual's page rather than the 150 it seemed to.

## Decision

Four fixes, each forbidden to change what a page contains. **No law, no corollary and no reading of a specification moves, so every standing number in the battery must come back unmoved, and that is the proof.** A number that moves is a defect in the fix, never a number to edit.

**One Range per document.** `word-space.js` gains `rangeOf(doc)`, a per-document `Range` held in a `WeakMap`, and every `createRange` in `src/` goes through it: the Gauge's `measureWords`, and `compose-dom.js`'s width provider, space measure, hyphen measure and applied-line check. Sharing is safe because every use sets both ends and reads before anything else can touch the range — each site was read for it, and none keeps a range alive across a call into another. It may not change a width, a rect or a line: the same boundary points are read through a different object.

**The grab's events are indexed once, at intake.** `findForcing` becomes a question to a list built by one walk over the untouched sources, beside `documentOpsOf` in `paginate` and on its precedent: one walk, the reads injected, testable over a plain object tree. The walk is the old one — the same order, the same refusals (no descent into an absolutely positioned box, which is not listed at all; a float's interior; a monolith's interior; a float's and a monolith's own commands still read) — and it records per box what the old walk read on every page: its address, minted once because the source is never written (C5); its effective page name; whether its `break-before` and `break-after` are forced and with what parity; and where its subtree ends. A page then asks three things of the list: the first event whose address is strictly after the cursor (a binary search, since a box's address never precedes the one before it in walk order); what the cursor's own containing boxes carry as a pending `break-after` into that event; and, if that event is not forcing, the next event that is — a named-page switch, a forced `break-before`, or a box a forced `break-after` closes in front of. It may not change which event is found, where, with what name or with what parity, for any cursor.

**The walk stops at the edge.** `adjudicate` enumerates candidates in document order as before, but an in-flow box whose top lies below the limit offers only its Class A boundary before it, which needs no line measure, and the enumeration stops there. Nothing that could be chosen is lost: every reading of that box and of everything after it lies below its top, so none can fit, and the one boundary the `beyond` fallback needs — the first past the limit, taken when nothing fits and nothing straddles — is the one kept. A float, an absolutely positioned box and a row are not where the walk stops, because their tops are not the procession's. `boxesBefore`, the backward iterator the architecture sketched for this, is deleted: the make-up order ranks every fitting candidate rather than taking the nearest, so a backward walk serves nothing. It may not change which candidate wins.

**A source's fixedness is read once per run.** `isFixedBox` caches its answer per source element in a `WeakMap`. The source is never written (C5), and a host calls `run()` once per frame, so nothing can change the answer within a run; the essay's client runs its judge and its view over one document, whose `position` values do not change between them. `isInlineBox` and `sourceStyle` are not cached: each is read far less often per clone, and a wider cache is a wider claim.

### The grab's pending parity, worked

The subtle part of the grab is the forced `break-after`, which the walk carries as `pending` and spends on the next box that starts after the cursor. The walk sets it in post-order, after a box's children, and only for a box whose end is after the cursor — asked of the ADDRESS: the box's address lies after the cursor's, or is a prefix of it. Read against the index, the boxes that can contribute a pending parity for a cursor are exactly those whose address is a prefix of the cursor's and whose subtree ends before the found box begins, combined in the order they close — deepest first where several close at once — so an outer container's parity replaces an inner one's (`combineParity`, *the later element wins*).

The first tree is the one the rule was written for. **A** `{ break-after: right }` holds **B** and **C** `{ break-after: left }`; **D** follows A.

| Cursor | The old walk | The index |
| :-- | :-- | :-- |
| A's start, `[0]` | D, parity right — C's left closes first, A's right replaces it | D, right |
| inside C, `[0, 1]` word 3 | D, parity right — the same two boxes contain the cursor | D, right |

The second tree is the one the rule's first draft did not describe. **A** `{ break-after: page }` holds **B** `{ break-after: left }`, **C** and **E**; **D** follows A.

| Cursor | The old walk | The index | What the specification wants |
| :-- | :-- | :-- | :-- |
| A's start, `[0]` | C, parity left — B's own break, spent where it falls | C, left | C, left |
| C's start, `[0, 1]` — the page that break began | **E, parity left** | E, left | D, no parity — A's `page` |
| inside E, `[0, 2]` word 4 | **D, parity left** | D, left | D, no parity |
| D's start, `[1]` | none | none | none |

The draft said *the cursor's ancestors*. The walk says *every box whose address is a prefix of the cursor's*, and B's address is A's: a bare path drops its trailing zeros, because before a first child is the same place as before its parent, so an address cannot tell a box from its first child. So on the page after B's forced break, the walk reads B's `break-after` again — the page it already began — and spends it a second time: a break between C and E nobody asked for, and a left parity demanded of D that only B, already spent, declared. All four answers were run against the old walk, copied with its reads injected, before this entry was committed.

**The index reproduces the walk exactly, second tree included**, because this round moves no number. A random differential over plain object trees — up to three blocks, four levels, forced values of all five kinds with parities, named pages, floats, absolutely positioned boxes and monoliths; cursors at every box as a bare path, with a word and with a pixel extent; every page name and both modes — found the index and the walk to answer identically on 4.5 million questions, asked of the index as committed; a mutant that closed boxes in the wrong order failed on its first tree. The second tree's reading reaches a page: `h1 { break-after: page }` followed by three paragraphs paginates to four pages under Cicero where css-break-3 gives two, one paragraph a page after the title. It is filed on the checklist as a defect owed a case, not fixed here: a fix waits for the case that tells it the number moved, and its place is the address's prefix test, not the index.

## Predictions, frozen on write

1. **Every standing gate comes back unmoved, and a complete run re-records the pin.** BREAK on any record that moves, in any gate, in either mode.
2. **The BGD manual on the CLI, default mode, paginates and presents in under 6 s** (24.1 s before; the benchmark's `--url`, second of two runs). BREAK at 6 s or more.
3. **The synthetic book's pagination falls under 25 s** (97.0 s before). BREAK at 25 s or more.
4. **`cicero:grab` falls under 1 ms per page after the first**, on the manual and on the book. BREAK where the mean over pages two onward is 1 ms or more on either.
5. **A manual run creates fewer than 100 ranges**, counted by the benchmark's new `createRange` column (about 80 000 before). BREAK at 100 or more.
6. **What the instrument cannot say.** The presentation is still one measure, `cicero:present`, with nothing inside it per page. So a regression inside it — a fix that made one page's fragment slower and another's faster — would show only as a total, and a total that fell would not say the fix was the reason. What is owed at close is the presentation's total in both modes and that sentence, not a claim about where inside it the time went.

## Consequences

The architecture says what the code does: the build loop's grab paragraph (the events indexed at intake, the page asking the index, the refusals unchanged), the Stonehand's first paragraph (the walk stops at the edge, the hedge about laziness removed), the Gauge's report sketch (`boxesBefore` gone; one Range per document, stated with the rect-reading rules), and one sentence under Testing pointing at the benchmark's range count. The four checklist entries close with this round. The tablet is untouched: *measurement takes no shortcuts* still holds, since every candidate that can be chosen is still measured and the estimate I5 licenses is not used, and C1 still holds, since the grab still consumes forcing and only reads it from an index.

## Verdict

**Prediction 1 held.** The complete battery ran once, after `src/` was committed: 25 gates in 9.2 minutes, 25 ok, every standing record reproduced, and the pin re-recorded against `1d5d852`. The benchmark adds a check the battery does not make: on the BGD manual in both modes and on the synthetic book, every page's verdict (class and kind), grab answer, report size and — on the book — feed size are identical before and after, page for page.

**Prediction 2 held, with room.** The manual on the CLI, default mode, runs **4.05 s** (25.1 s in the before run of the same day, 24.1 s in the measuring round's). Composed, 8.36 s from 50.9 s.

**Prediction 3 held.** The synthetic book paginates in **20.1 s**, from 95.6 s the same day (97.0 s in the measuring round).

**Prediction 4 held.** `cicero:grab` after the first page averages 0.011 ms on the manual and 0.010 ms on the book, 0.1 ms at the most on either. The walk it replaced is now one measure, `cicero:forcing-index`, 25.7 ms once on the manual — a mark this round adds beside *the run keeps time*'s, since without it the walk's time would have been in no measure at all.

**Prediction 5 held.** A manual run creates **one** range, in either mode, where the before runs created 80 649 and 85 350.

**Prediction 6 stands as written, and the numbers show why it had to be said.** `cicero:present` fell from 5.4 s to 1.3 s in the default mode and from 19.1 s to 2.2 s composed. The Range drag is the likeliest reason and the fixed-box reads the second, but the presentation is one measure, and nothing here can say which fix bought which part of the fall — or whether one page's fragment got slower while the rest got faster.

**What was too good to be true was the plan's own rule.** The draft said the boxes that carry a pending `break-after` into the next event are the cursor's ancestors. Writing the worked example and running it against the old walk said otherwise: the walk asks whether a box's ADDRESS is a prefix of the cursor's, and an address cannot tell a box from its first child, so a first child's `break-after` is spent again on every page inside its parent. On a page it is four pages where css-break-3 gives two for `h1 { break-after: page }` and three paragraphs — the shape of every BelType document with that rule, since the belt makes the `h1` a section's first child. The index keeps the reading, because a mechanism round moves no number; the checklist carries it as a defect owed a case. A prose rule stood for months over a mechanism that did something else, and it took an example with a spelled-out answer to show the difference.

**And the before numbers moved under their own feet.** The two composed runs before the fixes read 34.8 s and 50.9 s on one server, one document, one machine — the collector deciding the presentation's cost, as `packages/essay/RESULTS.md` records. After, 8.38 s and 8.36 s. What is left on the manual is layout and report, 14.2 ms of a 30 ms page, which is the Cast-off's bound and the tablet question it has always been.

