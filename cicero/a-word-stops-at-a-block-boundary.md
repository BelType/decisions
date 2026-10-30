# A word stops at a block boundary

**Status: Decided 2026-09-10, Executed 2026-09-10.**

## Context

Two findings from 2026-09-09 stood on the checklist's frontier, filed by the round that could not close them ([*the silent defects earn their cases*](the-silent-defects-earn-their-cases.md)). This round was convened to diagnose the larger of them. It falsified that one and confirmed the smaller.

**A page filled to its last line prints about half of itself** was the instrument. `packages/essay/lib/engines/read-print.js` takes every printed item whose baseline sits below `folioMaxYPt` — 56 points from the page foot, by default — out of the word stream and into the bottom margin band, because that is where a folio lives. The reproducer's page is 140 px, which is 104.88 pt, so the band covered more than half of it. The entry's own two measurements come back exactly: five lines at baselines 80, 65, 50, 35 and 20 pt keep the first two, losing `p0w010`–`p0w024`; six lines at 95, 80, 65, 50, 35 and 20 keep the first three, losing `p0w015`–`p0w029`. Read the same PDFs with `lib/extract.js`, which has no band, and **both engines print all forty-five words and divide them identically**. The entry's Chromium column carried all forty-five because Chromium was read through `extract.js` while Cicero was read through `read-print.js`: the asymmetry was two readers, and the sentence that should have given it away is the entry's own — *it agrees with Chromium about where the boundary falls, word for word*.

**A whitespace-free element seam can lose a word** is real, and now reproduces on demand. Band-free, on a sentinel grid of a thirty-word paragraph and a fifteen-word one with no whitespace between `</p>` and `<p>`: Cicero prints 30 + 14 = 44 of 45, Chromium 30 + 15 = 45. The same document with one newline at that seam prints 45 on both. An A5-shaped enlargement of it loses one word of 180 the same way. The mechanism is the one the frontier entry inferred: THE word space joins maximal non-whitespace runs over a block's *joined* text, so `p0w029` and `p1w000` are one word; `wordsBefore(<p>)` answers 30; consuming thirty words blanks both halves of the straddling thirtieth, and the second paragraph's first word is printed nowhere. C10 — content the build lost rather than failed to fit.

## Decision

**A word never spans a non-inline element boundary.** The tokenization keeps its rule across text-node and inline-element seams — `<em>foo</em>bar` stays one word, which is what the browser paints and what the corpus's totality gate has always compared against — and breaks it wherever a box that is not an inline box begins or ends, which is also what the browser paints.

The rule is one predicate, `isInlineBox`, in a new `src/word-space.js`, and it is applied in the three tokenizers that must never disagree:

- `positions.js` — `indexBlocks` and `wordsBeforeChar`, the source side;
- `fragments.js` — `joinedWords`, the clone side;
- `gauge.js` — `measureWords`, whose word order is what a Class B cut's `rel` counts into.

Fixing fewer than three would be worse than fixing none: the defect is not that the tokenization is wrong in isolation but that a cut is priced in one space and paid in another, and a partial fix moves the disagreement rather than removing it.

**The clone side cannot ask the question itself, so it is handed the answer.** A continuation clone is detached when it is consumed, and `getComputedStyle` on a detached element answers with an empty string — the file already says so, in `applyCarriedRemainder`'s own note. So `word-space.js` keeps a clone → source map, written in lockstep at clone time, before the Compositor's hints are applied and while child indices still correspond; the predicate reads the source's computed display through it. An element with no mapping — a `<br>` or a filler span the Compositor inserted — is treated as inline, which is what it is and what preserves today's behaviour exactly.

**Refused: a list of block-level tag names.** It needs no computed style and would have caught every seam so far recorded in real belt output — `</dd><dt>`, `</li><li>`, a directive's two paragraphs, the `@toc` nav. It is also wrong the moment an author writes `li { display: inline }`, which is how half the navigation bars on the web are built, and it would disagree with the Gauge, which reads computed display for the same question one file over. A second answer to a question already answered in this package is the drift the word space's own header warns about.

**Refused: splitting at every element boundary.** It needs no predicate at all and both sides would agree. It also redefines an inline seam, which the venue's totality gate compares against a generator that tokenizes by whitespace, and it would make `<em>foo</em>bar` two words where the page shows one.

**And the instrument gets a guard.** `readPrinted` refuses a folio band that would claim a third or more of the page's own height, naming the numbers. A reader silently calling half a page a margin box produced a red that cost a round; the band is a default, and a default that cannot be wrong out loud is exactly what this venue keeps finding at the bottom of a wasted measurement.

## Predictions, frozen on write

1. **The case is red before the fix, and red in one exact way.** Authored against the current `src/`, `cases/34-the-word-at-the-seam` prints 45 words on Chromium and 44 on Cicero, and the missing word is `p1w000`. HOLD only on that word and that count; any other loss BREAKS the diagnosis above.
2. **The fix turns it green with no other change to the case.** Cicero prints two pages carrying 30 and 15 words, the same partition Chromium prints, totality true.
3. **The fuzzed corpus does not move.** The generator writes whitespace between its blocks, so no seam in it fuses; every record in `gates/records.js` stands unchanged. Any moved gate number BREAKS this and means the corpus had fused seams the totality check was absorbing.
4. **No existing case changes its page count**, including the three whose suite failures were measured as pre-existing on 2026-09-09.
5. **`docs/index.md` under the seam still prints 136 pages.** Its `@toc` nav carries sixty-nine fused merges, so the word space moves under it; cuts are decided geometrically, so the page count should not. A changed count BREAKS this and means a fused word was deciding a cut, not merely being consumed by one.
6. **The reader's new guard fires on no case in the tree.** BREAK if any case declares a page shorter than 168 pt.
7. **The instrument cannot say whether the Gauge change is inert.** No suite in the venue measures a Class B cut inside a box that contains block children, so predictions 2–5 holding is consistent with the Gauge's segmentation being untested rather than correct. What is owed at close is a statement of which of the two it is.

## Consequences

The frontier loses two entries and gains one sentence: the half-page entry is rewritten as falsified, with the band arithmetic that killed it, and the seam entry closes into this record and its case. `.claude/NEEDED-FIXES.md` is an index and follows.

What this does not touch: the fused inline seam, which stays fused on purpose; the `run()` re-entrancy finding, which is a design question and stays on the frontier; and `08-the-monolith`'s composed-mode seventh page, which is unowned and stays owed.

## Verdict

**Prediction 1 held, exactly.** The case, authored against the pre-fix source, printed two pages of 224.88 × 127.38 pt on both Cicero modes with page two opening at `p1w001`, the stream first differing at character 185, and Chromium printing the same two pages divided at `p1w000`. Nothing else was lost.

**Prediction 2 held.** With the rule in the three tokenizers the case is green on `cicero`, `cicero-composed` and the comparison against Chromium, with no change to the document, the geometry or the declaration.

**Prediction 3 held.** Twenty-four of the twenty-five gates came back with their recorded tallies unmoved — 163 agree on the native corpus, 89 and 86 on the two composed eras, the three view gates, both acceptances and every probe suite. The corpus writes whitespace between its blocks, so it never had a fused seam to lose.

**Prediction 4 held.** The case family's only failures are the three that were measured as pre-existing on 2026-09-09: `08-the-monolith` presenting seven composed pages where the case declares six, and case 12's top band on two engines, where `letter-spacing` splits every glyph in the extracted text and the check is what is wrong.

**Prediction 5 broke on its number and held on its claim, and the number was mine.** It said the manual would still print 136 pages. It prints **139**, and it printed 139 against the pre-round source as well, measured through BelType's own dev server on both. The count did not move; the 136 was a figure quoted from 2026-09-03 that nobody had re-taken, which is this venue's own rule about numbers turned on the entry that stated it.

**Prediction 6 held.** The reader's new guard fired on no case in the tree.

**Prediction 7 was the valuable one, and its answer is the second: the Gauge's half is untested, not inert.** Instrumented over the whole case family, every box `measureWords` is ever asked about is a leaf text box — `P` and `H1`, nothing else — so its `breaks` list is empty on every call and the segmentation never runs. It is consistency insurance against a Class B cut priced on a box containing block children, and nothing in the venue constructs one: the corpus draws no carrier below the top level, and a case's mid-paragraph cut is taken on the paragraph. The fix is proven in two places of three, and the checklist now carries the survey that would prove the third.

**What was too good to be true.** That the previous round's largest finding was a defect at all. It was four paragraphs of careful discrimination — not the seam, not the units, not the measure, not fragmentation — every one of them correct, all of them reasoning about an engine while the instrument was eating the evidence. What should have stopped it is written in the entry itself: *Cicero agrees with Chromium about where the boundary falls, word for word*. An engine that loses half its own content does not agree with anything word for word. The reproduction was sound; only its reader was not, and the reader was ours.

**And one thing this round could not do.** The pin cannot be re-recorded: only a complete battery rewrites it, the `cases` gate cannot pass while those three pre-existing failures stand, so `gates/PIN.json` still names `d5209dc` on `editing-tools-cicero`. The numbers above were all taken by hand from the run that produced them; what is stale is the file that would let somebody else return to them.
