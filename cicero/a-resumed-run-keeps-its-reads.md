# A resumed run keeps its reads

**Status: Decided 2026-10-22, Executed 2026-10-22.** Opened by Egildo on 2026-10-22 after a conversation about the grain of an edit: the pages are already slices and the resume already re-cuts only from the edited page, and what an edit still pays is run-level work the run reads whole before it cuts anything. The precedent is [*the forced-break index is kept across runs*](the-forced-break-index-is-kept-across-runs.md); this record applies it to the walks that precedent left.

## Context

[*The run resumes from an entry*](the-run-resumes-from-an-entry.md) measured, at build three, what a resumed edit on the manual still pays whole: about 470 ms of 690, named as the reads' site search, the counter walk, the forcing index and the document ops. The forcing index was given a memo on 2026-10-09 and reads through it since. The other walks are still taken whole on every call, resumed or not, over every top-level block of the document, before the first page is cut:

- **the position index** (`driver.js`, `indexBlocks`): every block's words counted and positioned, which every address and every cut is arithmetic over;
- **the document ops** (`document-state.js`, `documentOpsOf`): one walk over every element reading its computed `counter-reset`, `counter-increment`, `counter-set`, `string-set` and `position: running()`, the log the page's counters, named strings and running elements are replayed from;
- **the reads' site search** (`reads.js`, `findSites`, `findPageSites`): every `target-counter()`, `target-text()` and page-read site of the document, found by selector over the originals;
- **the `:has()` answers** (`has-words.js`, `answerHas`): the words written on the copies for every `:has()` the host rewrote.

Each is a function of the source and the sheets, and the source is never written (*the source document is never written*, C5). An edit replaces one top-level box, or one box inside one, with a new element object; every other box's answers stand. A memo keyed by the top-level box, forgotten for the boxes `patch` replaced, is the forcing memo's own shape, and its one door, `replaced`, is already called by `patchBox`.

## Decision

**A resumed run keeps every run-level read it took, per top-level box, and reads again only the boxes an edit replaced.** Four rulings.

1. **The unit is the top-level box.** Each of the four walks is taken per top-level block and its result kept beside the forcing memo, keyed by the block's element: its word count and positions relative to its own start, its document ops with positions relative to its own start, its sites, its `:has()` answers. The run's whole-document view of each is assembled from the per-box parts by the bases arithmetic the position index already does: a box's global positions are its base plus its own.
2. **One door forgets.** `patchBox` already tells the forcing memo which box it replaced; the same call forgets that box's entries in every memo. A box replaced any other way than `patchBox` is the host's to report, as the forcing memo's header already says. A changed condition (the conditions key: the sheets, the faces, the viewport) empties every memo, as it empties the forcing memo and the composition cache.
3. **The first run after load fills nothing**, for the forcing memo's own reason: its realm differs, the sources children of `body` and not of the root, and a `body > …` or `:first-child` selector answers otherwise there. The memos are filled from the first run on a presented frame and read from the second.
4. **The arithmetic is the same code.** `indexBlocks`, `documentOpsOf`, `findSites` and `answerHas` keep their logic and gain the per-box seam; absent a memo, every read is the browser's, exactly as before, so a fresh run and the essay's battery are untouched.

**Refused.** A diff smarter than the replaced box (the resume record's own refusal: the unit of an edit is the box the host replaced, and a box is read again whole). Recording reads dynamically and validating them on use (the forcing memo's refusal: validating a computed-style read costs the read). Keeping the per-page work of the pages the run cuts again (that is the resume itself, and the cut is measured, never kept). A memo for the first run after load.

## Predictions, frozen on write

Judged at the round's close in the Verdict. The round's first commit is the measurement before the fold, on the manual under the editing tools (`beltype edit docs/index.md --root .`) and on the essay's realistic document, one paragraph edited and resumed, the `cicero:index`, `cicero:document-ops`, `cicero:reads` and `cicero:has-words` measures read off the frame, in both modes.

1. **The four walks together cost a resumed one-paragraph edit on the manual under 40 ms in either mode**, from whatever the first commit measured. Break: 40 ms or more.
2. **A resumed edit on the manual, the run's own time (the sum of its `cicero:` measures from the call to the presentation), is under 300 ms in the default mode and under 450 ms composed**, against the resume record's 560 to 610 and 650 to 720. Break: either bound.
3. **A resumed Ledger equals a fresh one.** `resume-converges` (both modes, every case, the fuzzed edits), `composition-resumes`, `resume-patch` and `resume-after-the-lists-dissolve` pass unchanged; the editing tools' `preview-resumes` passes.
4. **A fresh run is byte-equal and no slower**: the first run on a frame builds the same Ledger as before on every case, and its own `cicero:` measures do not grow by more than 5 ms on the manual. Break: a Ledger differs, or the first run grows by more.
5. **Every standing battery record reproduces**, and the editing-tools suite is green.
6. **A replaced box inside a chapter is read again alone**: on the manual, where every chapter is one top-level section, an edit to a paragraph replaces that paragraph's lowest box and the memos forget its top-level section, which is read again whole, measured as the one section's share of the four walks. Stated so the Verdict says what the unit costs in a document shaped like the manual.

## Measured before the fold

Taken 2026-10-22 on `c8807bed` plus one line: `cicero:reads` now opens before the site search (`findSites`, `findPageSites`), which it did not cover, so it holds the search, the reads' own position index, the counter walk `staticValues` takes and the delivery. Headless Chromium, the medians of seven resumed one-paragraph edits after the first one of each mode (the first fills the forcing memo), in milliseconds; the run is `run()`'s own `ms`, the call to the presentation. The manual is `beltype edit docs/index.md --root .` with the edits typed into `how-to.md` (pages 54 to 58 of 301); the realistic document is `00-the-realistic-document` through the venue server, a paragraph on page 3 or later patched as the editing tools patch it (12 pages).

| Document, mode | `index` | `document-ops` | `reads` | `has-words` | the four | the run |
| :--- | ---: | ---: | ---: | ---: | ---: | ---: |
| manual, default | 5.5 | 114.9 | 264.8 | 4.3 | 387.7 | 533 |
| manual, composed | 4.6 | 114.7 | 259.7 | 3.7 | 382.4 | 647 |
| realistic, default | 0.8 | 0.3 | none | 0.1 | 1.2 | 9 |
| realistic, composed | 0.6 | 0.3 | none | 0.0 | 0.9 | 17 |

The first run on the manual, for prediction 4: `index` 3.2, `document-ops` 152.3, `reads` 227.0, `has-words` 6.8. The realistic document declares no read, so its `reads` is not measured. The forcing index on the manual stands at 19.7 and 18.0 resumed, against 142.5 on the first run: its memo is in use there, so the sheets' reach is below 2.

**Found while measuring, and not this round's.** An edit in `architecture.md` resumes once and never again: every later call refuses with *the render conditions changed: the document wore 82 stylesheets and now wears 156*. The conditions key counts the `<style>` inside each inline SVG of the content (149 of the manual's 153 `<style>` elements stand in a source section's diagrams), and right after a run that patched a section holding diagrams half of them are not yet in the tree; they arrive after the presentation, so the next call reads a different key. `how-to.md` holds no diagram, which is why the measurements are taken there. The key is `seam/client.js`' `conditionsKey`, outside this round's door.

## Consequences

- **Displaced**: the four walks taken whole on every call; the resume record's sentence naming them as what a resumed edit still pays.
- **Owed**: the per-box seam in `positions.js`, `document-state.js`, `reads.js` and `has-words.js`; the memos beside the forcing memo, one door, one clearing; unit tests DOM-free where the walks are (the index's bases, the ops' positions, assembled from parts equal to the whole); the pins above; the resume record's Verdict gains one sentence pointing here; the checklist's resumable-run entry; the rim's and the client's headers if they name the cost; the CHANGELOG under this date.
- **Not owed here**: the per-page work; the presentation's cost; the composed mode's composition, which has its own cache.
- **Where the content lives**: the mechanism in `src/driver.js` and the four modules, the memo beside `src/forcing-memo.js`, the status in the checklist, the story in the CHANGELOG.

## Verdict

Executed 2026-10-22, on the same harness as *Measured before the fold* and against the same edits. Written red first: `test/resumed-reads.test.js` in the engine (four DOM-free tests: the index assembled from per-box parts equals the index built whole, bases, positions and word counts; the document ops assembled from per-box logs equal the whole walk's log at global positions, with and without marks; a memo that forgets one box reads that box again and no other, counted through an injected `styleOf`; reach 1 and reach 2), failing on the missing `indexBlock` until the build.

| Document, mode | `index` | `document-ops` | `reads` | `has-words` | the four | the run |
| :--- | ---: | ---: | ---: | ---: | ---: | ---: |
| manual, default | 5.5 → 4.4 | 114.9 → 4.1 | 264.8 → 30.0 | 4.3 → 3.6 | 387.7 → 42.1 | 533 → 169 |
| manual, composed | 4.6 → 4.7 | 114.7 → 3.9 | 259.7 → 29.6 | 3.7 → 3.5 | 382.4 → 42.1 | 647 → 360 |
| realistic, default | 0.8 → 0.3 | 0.3 → 0.1 | none | 0.1 → 0.0 | 1.2 → 0.4 | 9 → 6 |
| realistic, composed | 0.6 → 0.3 | 0.3 → 0.1 | none | 0.0 → 0.0 | 0.9 → 0.3 | 17 → 16 |

1. **Broke, by two milliseconds**: the four walks are 42.1 ms in either mode, from 388 and 382. What remains is the edited section read again and two whole scans the record did not name: the reads' position index over that section, about 17 ms, most of it the style recalculation an edit leaves to whichever reader asks first; the site search's walk of the sheets' rules, taken twice (`findSites` and `findPageSites` each call `contentRules`), about 8; the counter walk over the section, 3.5; and `has-words`' 3.6, which is `hasArgumentsOf` scanning the sheets for a `:has()` the manual does not have. The driver's own `cicero:index` (4.4) spans the furniture faces' wait and not the walk, which since build two is the reads'.
2. **Held**: a resumed one-paragraph edit on the manual is 169 ms in the default mode (bound 300) and 360 composed (bound 450), seven edits each, all resumed.
3. **Held**: `resume-converges` in both modes (every case, the fuzzed edits), `composition-resumes`, `resume-patch`, `resume-after-the-lists-dissolve`, `resume-inside-the-replaced-box` in both modes and `has-words-edit` pass unchanged, and the editing tools' `preview-resumes` passes. Mutation-checked: with the driver's report of `dirtyAt` taken out (below), `resume-converges` fails in the default mode.
4. **Held**: on the first run, which is offered no memo, the walks read 389.3 ms on the manual before and 384.9 after (`index` 3.2 → 3.6, `document-ops` 152.3 → 151.4, `reads` 227.0 → 222.8, `has-words` 6.8 → 7.1), and the battery's acceptance, view and differential gates, which compare first runs, reproduce.
5. **Held**: 26 gates, 26 ok, 0 failed in 6.8 minutes, every standing record reproduced, the pin re-recorded at `7a0ecab`; the editing tools 105 of 105, the venue 203 of 203, the engine 350, the root 411, and `npm run check` green.
6. **Stated**: on the manual every edit in `how-to.md` replaces a paragraph inside that chapter's top-level section, and the memo's tally (`forcingMemo.tally`, per walk) reads one box of twenty-five again for the index and for each of the two counter walks, and keeps the other twenty-four; the site search asks one box again out of fifty lookups. That one section's share is most of what item 1 leaves: about 17 ms of index with the recalculation, 3.5 of counter walk, under a millisecond of document ops. A chapter is the unit, so an edit in a longer chapter pays more.

**What the record did not foresee.** A host may edit a box in place: the venue's pins change a text node and pass `resumeAt`, which replaces no element, so `patchBox`'s door never hears of it and a kept part of that box would stand stale. The driver now reports the boxes `dirtyAt` and `edited` name through the same door, `replaced`, before it settles the memo (`settledMemo`), which also moved the settling out of `paginateOnce` and in front of the `:has()` answers and the reads, the walks that come before the run. Second, the record named the reads' site search as the cost, and the site search is 8 ms; the 265 ms of `cicero:reads` were the reads' own position index (140) and counter walk (108), and the measure did not cover the search at all until the first commit widened it. Third, a `:has()` argument that opens with `+` or `~` makes a top-level box's own answer depend on the boxes after it, so that one answer is asked every run. Fourth, at reach 1 a replaced top-level box forgets every part, following the forcing memo's own widening. Fifth, the composed mode's presentation builds a whole position index of its own (`composeForPresentation`, called from `seam/client.js`), which this round did not fold. And the conditions key's inline-SVG styles, under *Measured before the fold*.
