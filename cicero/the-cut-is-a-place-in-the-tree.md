# The cut is a place in the tree

**Status: Decided 2026-09-18, Executed 2026-09-18.** The entry was opened on the round's candidate and its frozen predictions, with the law's wording, the architecture's paragraph and the build held back (*What is not decided*, below, kept as written). All three followed the same day: *Ruling* records Egildo's amendment of the law, and *Verdict* the build.

## Context

Convened by a reading of six reports from one real venue against `src/`, on 2026-09-18. The findings are filed on the [checklist](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/css-paged-media-checklist.md)'s frontier and are cited rather than restated: *a wordless element between the last word before a cut and the first word after it is on no page*, *a block-in-inline list loses items at a cut*, *CSS counters count the clipped tails continuation clones carry*, and *the shell path builders count fixed siblings and `pathOf` does not*.

Read together they are one finding. A cut's address is a flat word position, and four times a real document has found a place a word cannot name. Each time a literal was seated beside the position to name it:

- `posBlock`, for a plate with no words and two pages of geometry ([*the flat position space*](the-flat-position-space.md), case 04);
- the shell's path with its two extents, for a box cut through its end gap or under the page edge;
- `resumePath`, for a wordless box standing just past a boundary ([*the cut resumes at the box*](the-cut-resumes-at-the-box.md), case 51);
- the forced break's boundary element, which the measure feed holds and the account never receives.

The [architecture](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/architecture.md)'s Ledger section named this pattern on 2026-08-04, in the account ruling: *"a shell took four fields and a carried flow took one, each because `pos` had come to mean the body and everything else had to ride alongside."* The pattern continued after it was named, which is the reason for a round rather than a fifth literal.

**The address is not missing; it is dropped.** The Stonehand's verdict is already a place in the tree: a kind, a box, a line index, a y. The Ledger entry already holds the box, as a live pointer. It is lost at two seams. The account must cross a `page.evaluate` boundary and a pointer cannot, so it keeps the block index and adds a path back for two classes only. And the forced-break branch writes the whole top-level block as the entry's box, so the element the break actually falls before is gone before the account is written.

**The texts agree with the tree.** The [tablet](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/engine-cicero/docs/design-tablet.md)'s Model calls the ledger *"one ordered, classed, path-addressed annotation"*; its law on resume points says a resume point *resolves to a path, never a bare offset into text*; its straddle corollary recovers the path from the deepest straddler. css-break-3's *Possible Break Points* defines every break point as a place between sibling boxes, between line boxes, or between a box's content edge and its children. None is defined as a word. The streamline round reworded the law on the premise that the path is derivable from the flat position through the index, and `positions.js`'s own header says where that fails: *the word space under-determines block seams wherever a block has no words*.

### Measured, 2026-09-18

Six small documents were put to the engine through the venue's own client (page 400×300px, 20px margins, 20px lines), on the round branch at `3c01c1e`, with a throwaway probe. The documents are the cases this entry owes; the numbers below are what those cases must reproduce.

| Document | What the account carried | What the pages showed |
| :-- | :-- | :-- |
| A wordless image closing a section, then a forced break | position 8, no path | the image on neither page |
| A page filling exactly at a paragraph's bottom, a block-in-inline list next | Class A at y 260, the paragraph's bottom; resume path `[4]`, the NEXT paragraph | the list, laid out at 260–360, on no page; three lists of eight lost this way |
| The same list straddling a cut | resume path `[3, 2]`, the third item | every item once |
| A monolith taller than a page, behind a nested fixed sibling | shell path `[2]`; the control without the fixed box, `[1]` | the image's last 140px and the paragraph after it on no page |
| A wordless image inside a carried float, wholly below the cut | carried `{ pos 4, block 0 }` | the image on no page; a control with a worded box in its place shows it on page two |
| A container whose only child is an inline list of block items, composed | identical to the native run | no fault |

The third row matters as much as the second: where a list item is addressed, it is addressed correctly, so the list's loss is not the address's. The fourth row turns a latent fault into an observed one. **The sixth is a prediction that failed**: the Compositor's `isComposable` reads direct children only and was expected to compose such a container as one paragraph, and the pages came back whole.

## Decision

The round's candidate is three propositions.

> **Paths order boxes; words order lines.** A cut's address is the path to the box the page resumes at, in source coordinates, and the path stops at a line stack. Inside a line stack the address is a word, and one day a word and a character. For a box divided geometrically it is a pixel extent.

> **The path is the wire form; identity is the working form.** The account carries the path because a pointer cannot cross a realm. Each realm resolves it against the SOURCE, and reaches a clone through the clone-to-source map. No index is ever followed on a clone.

> **Both ends of a fragment are cut by the address.** What lies outside the interval leaves by its position in the tree. *Wordless means already shown* survives only inside one line stack, where word order and line order are the same order.

The flat position stays, as a projection of the address. It is what *flow is forward* orders the Ledger by, what a named string's interval and a counter at the start of a page are read against, and what `pageOf` answers from. Order is the position first and the path second, which `pathAfter` already is.

The hard documents, each with the address it takes:

| Document | Address | Today | What the candidate does |
| :-- | :-- | :-- | :-- |
| A wordless run before a forced break | the path to the box carrying the break | a word; both ends drop the run | closes it, and the first fragment is cut with `truncateFrom`, as the measure feed already cuts |
| Two wordless boxes in a row | two paths at one word | `resumePath` and a tiebreak | what exists, made the rule |
| A plate spanning pages | before it, through it with an extent, after it | the `posBlock` literal | the literal becomes the path's first index |
| A shell behind a fixed sibling | resolved on the source, the clone reached by identity | an index one box off, content lost | closed by the second proposition |
| A composed block | the path stops at the paragraph, and hints are written only inside one | the driver avoids paths here because clone indices lie | safe by construction |
| A hyphenated continuation | the line stack's own coordinate widens from a word to a word and a character | a reserved slot nothing mints | fits |

Two documents do not yield to the address, and the entry says so rather than stretching it.

**A carried parallel flow strains it.** A float is divided by the main flow's geometry and never by a chosen candidate, and its resume is a word count summed across every paragraph inside it, which is words ordering boxes. The measured loss inside a float is this round's own fault in a second place. The law's plural, *one per flow*, says what the answer should be: the same address, once per flow. How a geometric slice mints one is open inside the round.

**The block-in-inline list is not about the address.** The Gauge's tree gives a box an `inline` flag and a list of direct block children, so block items inside an inline container are nobody's block children and the procession steps over them. Four walkers answer *what are this box's block children* today: the Gauge, the driver's `BLOCKISH` in three places, `isInlineBox`, and the Stonehand's sibling filters. The remedy is one walker that descends through an inline box. It rides this round because the same tree decides both.

**Refused: a fifth literal.** Carrying the forced break's element beside the position would close the first row in an afternoon. It is the field-per-round pattern itself, and the fixed-sibling row shows what three path builders reading one convention cost.

**Standing refusals, kept.** Teaching the consume passes geometry, refused in *the cut resumes at the box*: they run on detached clones with no layout to ask. A character-token position space, refused in *the flat position space*: hints pollute character counts, and the candidate keeps words where words are sound.

## What is not decided

- **The law's wording.** The tablet changes only in a design round with Egildo. The reading offered: the Model already says *path-addressed* and the law's headline already says *a path*, so what measurement contradicts is one clause of the 2026-08-19 gloss, *derivable from either through the position index*. Whether that is an amendment or a correction of a gloss is his to rule.
- **The architecture's paragraph** that the straddling chain is *derived by resolution rather than recovered and stored*. It follows the ruling.
- **The build.** Its own round, after the red instruments below exist and read red.
- **Parked behind this, named:** a fragment as an interval with two ends, which is what retires the clipped tails, the counter fault, the block-axis clip and Caster's tail compensation; and the late-arriving-truth rim.

## Predictions

Frozen on write, 2026-09-18.

1. **The forced-break case is red before any build**: the plate on neither Cicero column's pages, Chromium carrying it on page one. Hold: red for that reason. Break: green, or red for another reason.
2. **The list-at-the-seam case is red**: the list absent from both Cicero columns. What Chromium's print does with a block-in-inline list at a page boundary is NOT predicted; the case is what finds out, and a divergence there is a finding before it is a declaration.
3. **The fixed-sibling pin is red**: the shell built on the wrong element, as measured.
4. **The carried-float instrument is red**: the plate on no page.
5. **After the build, all four are green AND the account carries one path where it carried `posBlock`, `resumePath` and `shellPath`, and `driver.js` builds a path in one place.** Break: green with the literals still standing, which is a fifth patch wearing the round's name.
6. **Every standing battery record is unmoved.** The reason somebody can name: wherever the boxes at a cut have words, the path and the word name the same place, and the corpus draws no wordless box at a cut. Break: a tally moves, which is a finding about where the two addresses differ and not a number to edit.
7. **What the instruments cannot say.** A wordless box leaves no mark in the text layer, so a partition against Chromium is blind to exactly the box these cases are about. Each case therefore carries a plate whose one word reaches the text layer, case 51's device, and claims it by `startsAPage` or by the partition.
8. **Unpredicted in advance, recorded as such:** the report's duplicated list item did not reproduce on 2026-09-18. If a case reproduces it, that is an unpredicted wall.

## Consequences

- Nothing under `src/` changes with this entry. The checklist's four entries are brought up to the measurement: the fixed-sibling fault moves from *never observed* to observed, the carried-float loss is filed, and the failed prediction about composition is recorded where the next reader would otherwise re-raise it.
- Owed, in order: the four red instruments; Egildo's ruling on the wording; the architecture's paragraph; the build, as its own round.
- What the streamline round bought stays bought: the index built once, every offset an O(1) lookup, ordering numeric, and the Ledger's laws testable without a browser.

## Ruling

**2026-09-18, Egildo: an amendment, inside the law.** Of the two readings *What is not decided* offered, he took the stronger and seated it in the law's own text rather than beside it as a corollary. The resume-point law now carries *paths order boxes; words order lines* in its body, the 2026-08-19 gloss is withdrawn, and only the first of the three propositions went to the tablet: that the path is the wire form and identity the working form is mechanism and belongs to the architecture, and that both ends of a fragment are cut by the address is a consequence and stays here.

The reason that decided it is this round's own evidence. The architecture named the pattern on 2026-08-04 and the pattern continued; the streamline round softened *a path* into *derivable from the position* and nothing in the tablet made that a decision. A rule that forbids something checkable — no box's place decided by counting words — is what a later patch can be refused against.

The four red cases were authored the same day, before this ruling and before any build: 53 *the plate before the forced break*, 54 *the list at the seam*, 55 *the shell behind the fixed box*, 56 *the plate inside the carried float*. The entry's wording calls the last two a pin and an instrument; all four are cases, on the venue's own criterion, and each README says so. What Chromium does with a block-in-inline list at a page boundary, which the second prediction declined to guess, is now known: every item once, the page opening at the list.

## Verdict

Built in four commits on the round's own branch, in the venue's order: the documents, the walker, the address, the carried flow. The complete battery ran after each of the last three; **the third one closed at 25 gates of 25, every standing record reproduced, pinned at `7f87da4`.** Every prediction is closed below with the number that closed it.

**1 — The forced-break case is red before any build. HELD.** `cases/53-the-plate-before-the-forced-break` failed on page one's ink (`no fill #5b6b7a at 15,45,270,45 — same colour on the page: [none]`) and on the partition against Chromium from page one, on both Cicero columns, and for the reason predicted: the plate on neither page. Green after stage two.

**2 — The list-at-the-seam case is red. HELD, and the thing it declined to predict is now known.** `cases/54-the-list-at-the-seam` failed on `startsAPage` (`"j0w000 j0w001 j0w002…" — found on no page start; page heads: 1:"a0w000…" 2:"c0w000…"`), on totality (`first diff at char 426`), and on the partition from page two. Chromium's own print carries every item exactly once and opens page two at `j0w000`, so the oracle has an opinion and this is a claim rather than a divergence. Green after stage one, alone.

**3 — The fixed-sibling pin is red. HELD.** `cases/55-the-shell-behind-the-fixed-box` failed on page three's ink, on `startsAPage` for the closing line, and on totality — an empty page three, exactly as measured. Green after stage two.

**4 — The carried-float instrument is red. HELD.** `cases/56-the-plate-inside-the-carried-float` failed on `startsAPage` (`"PLATE n2w000…" — found on no page start`) and on the partition from page two. Green after stage three.

**5 — All four green AND the account carries one path where it carried `posBlock`, `resumePath` and `shellPath`, and `driver.js` builds a path in one place. HELD, both halves.** All four cases hold on every column. The acceptance grep over `packages/*/src`, `packages/*/seam`, `packages/essay/lib`, `packages/essay/seeds` and `packages/essay/gates` returns one line, a comment in `driver.js` that names the four literals in order to say what replaced them. `driver.js` builds a path in exactly one expression, inside `cutTo`, which is also the one place a cut is minted.

**6 — Every standing battery record is unmoved. HELD, three complete runs.** `163/18/7/11/1`, `89/8/3`, `86/10/4`, `43/5/1/1`, `28/1/1`, `43/4/2/1`, and 50/40/30 view-agree, identical after stage one, after stage two and after stage three. The reason the prediction gave is the reason it held: wherever the boxes at a cut have words, the path and the word name the same place, and the corpus draws no wordless box at a cut. The dressing was the place to watch and it was written to be the same set of boxes either way — a Class B cut dresses the clone, the chain above the leaf, the leaf and the inline chain inside it, which is exactly what the resume by word dressed; a bare path adds the first-child chain below the box, which is exactly what `resumePath` dressed.

**7 — What the instruments cannot say. STANDS, and the two devices carried the round.** No partition against Chromium can see a box that leaves no mark in the text layer, and every one of these four documents therefore claims its plate by a word inside it — the SVG's own `PLATE`, case 51's device — or by `startsAPage` on the line beneath it. Case 53 additionally declares the plate's ink directly, which is the only claim its composed column has that reads the document's subject at all.

**8 — The duplicated list item. STANDS as unpredicted-and-absent.** It did not reproduce in the design round and it did not reproduce here, on any column, at any stage.

### What was too good to be true

**The premise that a path is only ever resolved against the source.** It is the second of the three propositions, it is what the whole design rests on, and it is false as stated: **the source is not one tree.** `root.append(...blocks, ...fixed)` at intake reparents a nested fixed box out of the block it was declared in, so the tree the driver builds a path against still holds that box and the tree the presentation resolves it against does not — while every clone either side reaches has had fixed boxes stripped. A raw path was therefore right in exactly one of the three trees. The symptom was precise and worth recording: with the plan's raw indices, case 55 came back with page one showing the plate's first 220px it should never have shown, page two's continuation missing the plate entirely, and page three's shell built on the paragraph after it — every one of them one box along, and each looking like a different defect. The fix is one filter in `positions.js`: **a path counts in-flow children**, which is also the sentence the engine already writes everywhere else about a box with zero footprint, and which resolves to the same number in all three trees. It is the plan's one departure and it is stated in its commit and on the checklist.

**And a second finding rides out of that one, filed rather than fixed.** [*A fixed box at any depth*](a-fixed-box-at-any-depth.md) records that the SOURCE is untouched throughout, which is C5. The intake's `append` touches it. Nothing observed depends on that today — a block holding a nested fixed box is presented as a stripped clone either way — so it is on the checklist and was not repaired in a round that was not about it.

**The carried flow needed more than the plan's rule, and the document said so.** The plan's carried address was *a line stack with lines above it gives path plus word, anything else a bare path before it*. Case 56's float opens with a paragraph declared 270px holding three words on one line, so every one of its lines is above the cut while the box itself crosses: the rule gives path plus word three, the continuation keeps a 270px box with its words blanked, and the plate lands 270px into a 260px page area — still on no page. What the geometry actually says there is an end-gap cut, so `carriedAddress` classifies by what the cut did to the box rather than by what kind of box it is, and the blank shell that follows is 30px — which is also the arrangement Chromium prints, its own cut at 260 leaving 10. The extra branch is four lines and it is the difference between the case passing and the case passing for the wrong reason.

**Nothing else surprised.** The walker went first and alone because it was the stage most able to move a standing number, and it moved none. The address stage rewrote two fragment writers, one driver and four readers and the fast suites caught every signature it broke on the first run.

### Deferred, with the record that names each

A fragment as an interval with two ends, which is what retires the clipped tails, the counter fault ([beltype#41](https://github.com/egildo/beltype/issues/41)), the block-axis clip and Caster's tail compensation — untouched here on purpose, and the checklist's counter entry now says the round met it and left it. The late-arriving-truth rim. The preserved margin after a forced break inside a block. The mixed-content line stack. A monolith straddling the cut INSIDE a float, which resumes whole rather than sliced, because C10's remedy is a painted shell and the tablet says a parallel flow's remainder must be live. And the treatment of `display: none` and `display: contents` in the one walker, which is stated in its own header rather than measured: this venue's corpus draws neither.
