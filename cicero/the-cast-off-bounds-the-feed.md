# The Cast-off bounds the feed

**Status: Decided 2026-09-26, Executed 2026-09-26.** Ruled by Egildo in a design round against the tablet; opened on the ruling and its predictions frozen, the build following on the round's branch.

## Context

The tablet licenses one estimate, the bound on what is fed to the Gauge (*Measurement takes no shortcuts*), and until this round the bound was identity: `driver.js` held `const castOff = { bound: (items) => items }`, and every page laid out and reported the whole remaining document, O(pages × document). The checklist carried it twice — as an amendment owed, ruled on 2026-08-04 *designated, not built*, and as the standing performance lever on the frontier.

*[The page asks the index](the-page-asks-the-index.md)* removed the three other whole-document costs and left this one standing alone. Its after run (`packages/essay/RESULTS.md`, *The page asks the index, before and after*): on the BGD manual, 133 pages and one top-level block, layout and report are 14.2 ms of a 30 ms page and layout alone is 36.4 % of 4.05 s; on the synthetic book, 283 pages of top-level paragraphs, layout is 55.3 % of 20.1 s.

**Ruled 2026-09-26, Egildo: build the bound, from words the account already counts, with a pour-again check.** The tablet's paragraph changes with it: the licence stays, and the sentence describing the feed moves from *designated, not built* to what runs. **The fork not taken** was heights remembered per box — a bound in pixels read off earlier reports. Words need nothing remembered: the position index already counts them per box, and every account entry carries `pos`, a global word index.

## Decision

**The invariant.** Since *the walk stops at the edge*, the Stonehand's verdict on a feed depends on every box whose top lies at or above the limit; on the first in-flow box whose top lies below it, since the boundary before that box is the one candidate the walk keeps past the edge and the `beyond` fallback's; and on the box the edge crosses. So **a bounded feed is verdict-identical to the whole feed when it holds every box that can stand on the page and the first in-flow box that cannot.** That is checkable page by page: the verdict on the bounded feed equals the verdict on the whole feed.

**The premise, stated so it can be broken: block layout is forward** — putting away the boxes after a boundary moves no box before it. It fails inside a table (automatic layout reads every row for its column widths), a flex or grid container, a multicol container, a monolith, a parallel flow and a line stack (orphans and widows read the whole stack). So the bound cuts only at the start of an in-flow block box standing inside none of those, and where the place it wants lies inside one, it moves to the first box after the outermost such box. The list is `stonehand.js`'s `neverCutInside(el, style)`: `isMonolith`, which already holds multicol, `isOutOfFlow`, and a display that sizes a box's children against each other — the table family, flex and grid. A line stack needs no test, since a block box's start is never inside one, and a float is never the place, since one can stand between two lines of a paragraph.

**Why the Stonehand cannot name the same list whole.** It refuses the first two interiors through the same two predicates, which `neverCutInside` calls rather than restates. The third half differs because the two callers ask different questions: the Stonehand asks where a break may be *chosen* and reads a row off the report's geometry — a flex column is a sequence, and it cuts inside one — while the bound decides before anything is laid out, so it reads the display that *permits* a row, and adds the table, whose rows the Stonehand does cut between and whose layout still reads them all. The difference costs the bound a longer feed and never a verdict.

**The check, read from the report before anything is decided:** the feed holds the box the Stonehand's walk stops at — a box the walk reads, in the procession, not a float and not a row, whose top lies below the limit. It is the walk's own predicate, not a second spelling: `stonehand.js` gains `walkOf`, which holds what `adjudicate` already defined (the style cache, the monolith, parallel-flow and row predicates, and now `walks` and `standsBelow`), and `reachesBelowTheEdge` asks it of a report. Where the check fails — a bound counted in words stopped above the edge, because a table or a figure carries few words and many pixels — the feed is poured again with the bound doubled, until the check holds or the place runs off the document and the feed is whole. A whole feed needs no check. The check runs before the Stonehand is called, so a short feed never reaches it: that is what keeps the estimate a bound and not a decision.

**The number.** The words the last page that was not blank moved — its entry's `pos` less the one before it — times three, `CAST_OFF_FACTOR`, a knob this entry states and the benchmark can move. Page one has no page before it and is fed whole, as every page was. *[Amended 2026-10-11: page one is estimated from its own size, below.]* **One reading the ruling did not spell out, taken here and stated:** a page after one that moved no words — the slice of a monolith, a page a float filled while the main flow stood still — is fed whole too, since there is nothing to estimate from and doubling zero stays zero. The place is the first block boundary strictly after the cursor at or past `cursor.pos + words`, found on the forcing index's own list, which is already every in-flow box in walk order with its address and its subtree's end: the index records two more facts per box, the word position its start sits at (monotone in walk order, so a second binary search finds it) and the outermost box around it `neverCutInside` names. **The executor's choice: a question beside `find`, `boundAt(cursorCut, pos)`,** rather than exposing the list, so the list's invariants stay inside the closure that builds it.

**One surgery, one more caller.** The forced branch's two moves — the whole item leaves at a bare block path, otherwise `truncateFrom` on the clone the feed's source → clone map names and `items.slice(0, k + 1)` — become `cutFeedAt`, and the Cast-off calls it too. Boxes after the place are put away, never removed; `buildFeed`'s whole clones and `fragments.js` are untouched. Against the grab: where a forced event was found and its cut is not after the place, the forcing already bounds the feed and cuts it exactly as before; otherwise the place cuts it, and the forced event lies past the fed content. `forcedNext` keeps its meaning on a bounded page — it is the same object — and the check makes two branches that read it unreachable from a bounded feed: `fits`, because a box of the procession lies below the limit, and a null verdict, because the walk stopped at a box inside the feed. Both are asserted in `driver.js` rather than trusted, and each names itself as the defect it would be.

The composed mode is untouched: `composeDocument` composes the region on the sources, cached by width, and `applyRecordsUnder` hints the whole clone before the cut, as the forced branch already relies on. `cicero:feed` gains `bound` (words, or null) and `pours` (this pour's ordinal, so a page's last feed measure carries its count); `cicero:layout`, `cicero:clone-images` and `cicero:report` are measured per pour.

### Worked, twice

The tree is the one `test/driver.test.js` asserts: a section **S** holding **P1** and **P2**, forty words each, a table **T** of three rows **R1**–**R3**, twenty words each, then **P3** and **P4**, forty each. Word positions: P1 0, P2 40, T and R1 80, R2 100, R3 120, P3 140, P4 180. The cursor stands at S's start, word 0.

| The last page moved | Bound | First box at or past it | The place |
| :-- | --: | :-- | :-- |
| 15 words | 45 | T, at 80 | T — its own start is outside every table |
| 30 words | 90 | R2, at 100 | P3 — R2 stands inside T, so the place moves past T's subtree |

The second row is the pour again as well, since doubling 45 is 90. Suppose the page's limit lies at 400 px, P1 and P2 are 100 px each and T is 300 px tall. Poured at 45 words, the feed holds P1 and P2 with T and everything after it put away; the last box ends at 200 px, nothing the walk reads stands below 400, the check fails, and the Stonehand never sees the feed. Poured at 90, it holds P1, P2 and T, which ends at 500 px, and P3, whose top at 500 px is below the limit: the check holds, and the walk reads P1, P2 and T's rows and stops at P3 — exactly the boxes it reads in the whole feed, which is why the verdict is the whole feed's.

## Predictions, frozen on write

These are the ruling's own, copied as ruled; the factor is three.

1. **Every standing gate comes back unmoved, and a complete run re-records the pin.** BREAK on any record that moves.
2. **On the BGD manual (both modes) and the synthetic book, every page's verdict — class and kind — is identical before and after, page for page**, read from the benchmark's JSON. BREAK on one page.
3. **The manual on the CLI, default mode, paginates and presents in under 2.6 s** (4.05 s before; the benchmark's `--url`, second of two runs). BREAK at 2.6 s or more. **Composed, under 6.8 s** (8.36 before). BREAK at 6.8 s or more.
4. **The synthetic book paginates in under 10 s** (20.1 s before). BREAK at 10 s or more.
5. **`cicero:layout` averages under 2.5 ms a page on the manual after page one** (11 ms before), **and `cicero:report` under 1 ms** (3 ms before). BREAK on either.
6. **The pour-again fires on fewer than one page in twenty on the manual, and on no page of the book.** BREAK on either. The number the factor is tuned against: a miss says the knob is wrong, not the design.
7. **What the instrument cannot say.** The presentation is one measure and this round does not touch it; its total is reported in both modes and nothing is claimed about it.

## Consequences

The tablet's *Measurement takes no shortcuts* says what runs, by the ruling; the vocabulary's Cast-off already spoke in the present tense of the bound and now tells the truth. The architecture's build loop step 2, its Cast-off sketch — `bound(cursor, words): Place | null` — and its Declared holes say what runs. The checklist closes the amendment owed and the frontier entry, and re-reads *Speculative or parallel grabbing*, which waited on this bound. The battery is run once with `src/` committed; a gate that moves is a verdict the whole feed would not have given, a defect in the bound, and stops the round rather than moving a number.

## Verdict

Measured on the round's branch, Apple M1 Max, Chromium 153.0.8010.12, nothing else running; before on `ef35bda`, after at `070ac66`; each the second of two runs. The tables are in `packages/essay/RESULTS.md`, *The Cast-off bounds the feed, before and after*.

**Prediction 1 held.** The complete battery ran once, with `src/` committed: 25 gates in 7.7 minutes, 25 ok, every standing record reproduced, the pin re-recorded against `abe8bd3`.

**Prediction 2 held.** On the BGD manual in both modes and on the synthetic book, every page's class and kind — and every grab answer — is the same before and after, page for page, in the first run of each pair and in the second: 133, 133 and 283 pages, none different. The same held for four more runs of the manual taken with the factor moved to 6, 12, 24 and 48, which is the invariant holding across every place the bound named.

**Prediction 3 broke, both halves.** The manual on the CLI runs **2.78 s** in the default mode (4.10 s before; the ruling's 4.05) and **7.37 s** composed (8.33 s before). Layout and report fell as predicted; the feed rose, from 674 ms to 1 038 ms default and from 1 360 ms to 2 003 ms composed, and the presentation stayed at 1.3 s and 2.3 s.

**Prediction 4 held.** The synthetic book paginates in **4.7 s** (20.1 s before): layout 11.4 s → 0.37 s, report 3.8 s → 0.12 s, the feed unchanged at 3.8 s and now three quarters of what is left.

**Prediction 5 held.** After page one, `cicero:layout` averages **1.58 ms** a page on the manual (11.44 before) and `cicero:report` **0.33 ms** (3.03), every pour of a page counted; composed, 1.94 and 0.36.

**Prediction 6 broke on the manual and held on the book.** The pour again fired on **18 of 133 pages** of the manual, 45 extra pours, the same pages in both modes — one in seven, against a limit of one in twenty — and on no page of the book. The pages that poured follow pages of screenshots: page 11 followed a page that moved one word, and was poured at 3, 6, 12, 24 and 48 words.

**Prediction 7 stands as written.** The presentation is 1.31 s default (1.33 before) and 2.27 s composed (2.22 before), and nothing here is claimed about it.

**What was too good to be true was the price of a pour.** The ruling priced a pour as a layout, and a pour is a feed: `buildFeed` clones the whole remaining document before anything is cut — 5.8 ms a pour on the manual, 11 ms composed, where the composition's hints are applied to the whole clone first — so the 45 extra pours cost about a quarter of a second default and half a second composed, which is the whole of prediction 3's miss. And the parenthesis under prediction 6 — *a miss says the knob is wrong* — is only half true on this document. The factor was moved, the runs taken the same way and not committed:

| Factor | Pages poured again | Extra pours | Layout, ms a page after page one | Feed, ms | Run, s |
| --: | --: | --: | --: | --: | --: |
| 3 | 18 | 45 | 1.58 | 1 038 | 2.78 |
| 6 | 12 | 27 | 1.98 | 945 | 2.76 |
| 12 | 9 | 15 | 2.83 | 877 | 2.81 |
| 24 | 6 | 6 | 4.23 | 784 | 2.98 |
| 48 | 0 | 0 | 6.86 | 742 | 3.35 |

Prediction 6 holds at 24 and prediction 5 breaks there; no factor holds 3, 5 and 6 together, because on a manual of screenshots a page's words say little about the next page's pixels, and what a pour saves in layout it pays back in a whole clone. The factor stays three, as ruled. The floor under prediction 3 is the feed's whole clone, about 0.7 s over the run with no pour at all, beside the presentation's 1.3 s: that is the next lever, and it is filed on the checklist's frontier rather than taken, because it is the clone the 2026-09-21 rule keeps whole.

**Two things the round did that the ruling did not spell out**, stated so they can be ruled on. A page after one that moved no words is fed whole, since doubling zero stays zero; on the manual no page took that reading — the four later pages whose first pour was whole were near the end, where the place ran off the document. And `forcedNext` was kept as it was rather than made inert: the two branches the ruling expected unreachable are unreachable from a bounded feed, and are asserted in `driver.js`; neither fired in the battery or in any benchmark run.

**Amended 2026-10-08: the number is the mean page and its spread.** Three times the last page's words over-fed uniform text and under-fed a dense page after a light one. The number is now the mean words a non-blank page moved so far, plus two standard deviations, plus a floor of twenty words (`CAST_OFF_SPREADS`, `CAST_OFF_FLOOR`), and a page after one that moved no words is bounded by the pages before it rather than fed whole. Simulated over the page word counts of the BGD manual (122 pages), BelType's manual (273) and a plain 15 500-word text (42), it laid out 22–42% fewer words than the old rule, with 9, 11 and 2 re-pours against 14, 16 and 0 (a word-count stand-in for the pixel check, which under-counts the engine's real re-pours). Measured on the BGD manual in the editing tools: every one of 1 057 source elements lands on the same page as before, at its start, its middle and its end; the feeds held 35 797 words against 48 993, in 137 pours against 141. The rule still bounds and never decides: the check that pours a short feed again is unchanged.

**Amended 2026-10-11: page one is estimated from its own size, and the next page reads its bound off the tail (*first-load feeding*).** Ruled by Egildo, both steps, the constants as proposed. **Step 1:** before page one nothing is known about words per page, but the content box and the root's `font-size` and `line-height` (I5 already requires the last explicit) are, so `firstPageWords` returns lines that fit (content height over line height) times words in a line (content width over six characters of half an em) times two; null, the whole feed, where either is unusable. The three constants are named beside `CAST_OFF_SPREADS` (`CAST_OFF_CHARACTER_EM`, `CAST_OFF_WORD_CHARACTERS`, `CAST_OFF_FIRST_MARGIN`). It also answers wherever the account has no page that moved a word. **Step 2:** after an adjudicated cut the tail of the feed past it is laid out already, so the driver keeps that report and the cut's height, and the next page asks it for the first box its retreat walk would stop at on a page beginning there (`firstBelowTheEdge`, the check's own predicates, which `reachesBelowTheEdge` now asks whether there is one). The bound names the word after that box's first, plus `CAST_OFF_FLOOR`, so the place falls past it. Where the tail holds no such box, at another measure, after a forced cut, or in a resumed run's first page, the page asks the account as before. The law is untouched: every bound still passes `reachesBelowTheEdge` before the Stonehand reads it.

Measured 2026-10-11, Apple M1 Max, Chromium 153.0.8010.12, the CLI under `--engine cicero`, visible headless Chromium, the median of three five-run batches (`bench/stone-measure.mjs` for the time, `bench/feed-census.mjs` for the words, read off `cicero:feed`'s new `reach`, the words one pour covers). **Every page's text, hashed, is identical before and after on all three documents** (280, 123 and 43 pages).

| Document | | `paginate`, ms | Page one, words | Words over the run | Pours |
| :-- | :-- | --: | --: | --: | --: |
| BelType's manual | before | 2 700 | 1 426 | 190 776 | 305 |
| | step 1 | 2 650 | 978 | 190 328 | 305 |
| | step 2 | 2 560 | 978 | 177 049 | 305 |
| BGD manual | before | 490 | 16 | 37 861 | 137 |
| | step 1 | 480 | 16 | 37 861 | 137 |
| | step 2 | 457 | 16 | 33 183 | 134 |
| plain-long (16 848 words) | before | 134 | 16 848 | 51 923 | 58 |
| | step 1 | 118 | 1 013 | 36 088 | 58 |
| | step 2 | 115 | 1 013 | 33 232 | 55 |

**What the numbers say, against what the note expected.** The note expected page one to be fed some 88 000 words on the manual. It never was: both manuals open on a cover that ends in a forced break, and the grab already bounds a page-one feed there (1 426 and 16 words); step 1 only helps where the first page runs on, which is plain-long (16 848 to 1 013). The read-ahead lowers the words laid out by 7, 12 and 8 per cent, not by a third: a feed laid out to one page and a block past it leaves a tail too short to read the next bound from, so the page after a read-ahead page asks the account and is fed generously, and the two alternate — 11 of the 43 pages of plain-long were read ahead. The larger loss is the pour again, not the first pour: the account's bound lands on a block boundary a paragraph past the page's own, fails the check about one page in three on running text, and the doubling lays out twice what one more block needed (plain-long's pours of 911 to 1 040 words for a page of 390). Growing a failed pour to the next block instead of doubling was tried and left out: plain-long's words fell to 29 580 and the time by 8 per cent, the manual's and BGD's barely moved, and the pours rose, so it is a separate ruling. The time gained is 5 per cent on the manual, 7 on BGD and 14 on plain-long; the manual's `layout` is the large share (1 540 ms) and is paid for the page's own words.
