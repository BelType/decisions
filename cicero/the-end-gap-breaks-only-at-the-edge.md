# The end gap breaks only at the edge

**Status: Decided 2026-09-27, Executed 2026-09-27.**

## Context

`beltype docs/index.md --engine cicero` refuses at its 162nd page with *the walk failed to advance at [13,15,0]*, in both modes. The checklist entry *BelType's own manual is refused* carries the arithmetic: a 36 px `h2` with the addendum's `break-after: avoid`, a block-end padding and a bottom border, followed by a 1 064 px table with `break-inside: avoid` on a 964 px page. On page 161 every cut inside the table violates its keep and the boundary after the heading violates the heading's, so two clean candidates remain, the Class A boundary before the section and a Class C cut in the heading's own end gap, 2 px above its border, and the make-up order takes the deeper. The heading stays at the page's foot. On page 162 the shell that continues wears its padding and border again, the Gauge reads a fresh end gap in it, the gap is again the only clean cut, and its address is the cursor's own.

Two cases reproduce it on the venue's 200×300 px page, both authored red on 2026-09-27 and merged unfixed. [`cases/65-the-end-gap-dodges-the-keep`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/essay/cases/65-the-end-gap-dodges-the-keep/README.md) is the dodge alone: a five-line paragraph, the heading (a 20 px line, 10 px of padding, a 4 px border, 34 px), then a six-row table that overruns the page by 14 px. The account reads *class C, y 130, at the heading, 4px remaining*; Chromium takes the boundary before the heading. [`cases/66-the-shell-offers-its-gap-again`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/essay/cases/66-the-shell-offers-its-gap-again/README.md) is the dodge and the refusal: the same heading before a fourteen-row table, 280 px on a 240 px page area; Chromium prints three pages, the heading atop page two over ten rows, and the engine refuses at `[1]`.

Two records stand behind the reading. [*The end gap takes no extension*](the-end-gap-takes-no-extension.md) put five documents to both engines and found that **Chromium never cuts in an end gap when it can retreat to a Class A boundary among a container's children**, and slices the gap only where it crosses the edge and nothing else remains; it also found that a blank shell is laid out at no less than the block-end padding and border it still wears, which is where case 66's fixed point comes from. [*The page asks the index*](the-page-asks-the-index.md) made the walk stop at the edge. [*A box is not its first child*](a-box-is-not-its-first-child.md) is this round's shape: a case merged red, then a fix that says what it moves.

## What the text says

Read from the committed snapshot, `packages/essay/book/spec/css-break-3.json`, before any code.

**§4.1 defines Class C narrowly.** *"Between the content edge of a block container box and the outer edges of its child content (margin edges of block-level children or line box edges for inline-level children) if there is a (non-zero) gap between them."* The content edge is the inner edge of the padding. So a Class C point lies inside a box's content box, in slack between its content edge and its children: a declared height taller than its content, say. A box's block-end padding lies outside its content edge, and so its border does. The heading in both cases has `height: auto`, so its content edge coincides with the bottom of its one line box, and **by the letter the heading offers no Class C point at all**. The possible break points around it are the Class A boundary before it and the Class A boundary after it.

The engine reads wider. The Gauge's `endGapOf` runs from the last content bottom to the padding-box bottom, so it counts the block-end padding, and a last child's bottom margin, as Class C territory. That reading predates this round and is the engine's standing one (the tablet's I3 speaks of *non-zero container-edge gaps*). Where the gap crosses the page edge it has differential support: on the three single-child documents of *the end gap takes no extension*, Chromium sliced the padding at the edge and the two engines partitioned identically. **The plan that convened this round said the cut the cases pin against is legal by the letter.** It is not quite that: by the letter it is not a possible break point, and the engine offers it only because the Gauge reads the padding as a gap.

**§4.4 does not name the point either way.** Rule 1 binds `break-before` and `break-after` to Class A points: *"A fragmented flow may break at a class A break point only if all the break-after and break-before values applicable to this break point allow it."* Rule 4 binds Class B and C points to `break-inside` on every ancestor. The relaxation drops rule 3, then rules 1, 2 and 4, only *"if the above doesn't provide enough break points to keep content from overflowing the fragmentainer"*, and then *"the UA may use the avoids that are in effect at those points to weigh the appropriateness of the new breakpoints; however, this specification does not suggest a precise algorithm."* Nothing in §4.4 obliges an engine to keep an end-gap point available above the edge.

**§3.1 glosses the avoid values**: they *"indicate that content should be kept together"*. The cut in the heading's gap separates every word of the heading from the table, exactly as the forbidden boundary would.

**§4.5 leaves the choice open and demonstrates the answer.** *"CSS3 … does not define whether content breaks at a particular allowed break."* Its second worked example is the relevant one: orphans 10, widows 20, 8 lines of room, and a block of 9 lines or more *"must NOT be split (that would violate the orphans constraint), so it must move as a block to the next page"*. That is a retreat to the boundary before the block, not a dropped rule. Case 65 is that example one level up. The heading and its table cannot be kept together on page one, so the pair moves whole to the next page, retreating to the Class A boundary before the heading. Case 66 is the example's other half: the pair fits on no page, so on page two §4.4's relaxation arrives and the avoids are weighed.

**The text does not contradict the reading.** It is stricter than the plan's paraphrase, in the reading's favour: above the page edge, the point the cases pin against is at best a Class C point one border-width above the Class A point after the box, and by the letter not a point at all.

## Decision

**A box's end gap is a break point only where the box's end lies past the page edge.** The Stonehand offers the end-gap Class C candidate only when the box's border-box bottom lies below the limit. The cut then falls at `min(gap.bottom, limit)`, as it does today, and answers to ancestor `break-inside` alone, as it does today. An end gap that ends within the page offers nothing.

**Why this is the rule, and why it is not about keeps.** Where a box's end gap lies wholly above the limit, its point at the gap's bottom sits exactly one block-end border above the Class A boundary after the box, and the boundary is deeper. So whenever that boundary is clean it wins on content, and the gap's point is never chosen. It is chosen only when the boundary violates a keep, which is the dodge, and a dodge is all it ever buys: the words on either side of the two points are the same words. Where the gap crosses the edge the boundary after the box does not fit, and the gap's point is the one place the box can end on this page; that is the slice both engines take on the documents measured on 2026-09-15, and the Stonehand's standing note on the C-gap tie dissolving at the edge. Case 66's fixed point is the same reading a second time: a blank shell at a page's top lays out at its padding and border, its end lies within the page, and the cut its gap yielded was the address it came from. Offered nothing, it cannot yield one.

**The `gap.base <= limit` half is already written.** The branch's standing guard `y − gap.base > eps`, with `y = min(gap.bottom, limit)`, holds only where the gap's base lies above the limit. The new condition is one comparison beside it.

**Keeps are not touched.** The end-gap point still answers to `break-inside` alone, and I3's sentence saying so stands: where the point is offered, the box's end is past the edge and no pair is separated on this page that the boundary could have kept together. The branch's comment states the rule and cites this record; the start-gap branch's comment loses its last sentence, *the end gap stays pure*, which described a rule the end gap no longer needs. The start gap's code is untouched.

**Refused: the end gap answering to the keeps, as the start gap does** — the first seat the checklist entry named. It would make case 65 green, and it keeps offering a point that the letter does not name and that nothing ever chooses except to dodge. Answering to the keeps would also leave case 66's shell able to re-offer its gap wherever no keep binds it.

**Refused: a border-only shell that is spent, or offers no gap** — the second seat. It is a second mechanism for a shape the rule above already closes. A shell at a page's top ends within the page unless its own decoration is taller than the page area.

### The worked example

The page area is 140×240 px, twelve 20 px lines; orphans and widows are 1. The paragraph runs 0 to 100 px. The heading's line runs 100 to 120, its padding 120 to 130 and its border 130 to 134. The make-up order ranks by avoid violated, then orphans-and-widows shortfall, then depth.

**Case 65, page one**, limit 240:

| Candidate | y | Before | After |
| :-- | --: | :-- | :-- |
| Class A before the heading | 100 | clean | clean |
| Class C in the heading's end gap | 130 | clean | not offered: the heading ends at 134, within the page |
| Class A before the table | 134 | violates the heading's `break-after: avoid` | the same |
| Class A between rows one to six | 154–234 | violate the table's `break-inside: avoid` (rule 2) | the same |
| Class A after row six | 254 | past the limit | past the limit |

Before, the order takes 130: the heading at the foot of page one, its border alone atop page two. After, 100 is the only clean candidate: the paragraph alone on page one, and the heading and its whole table on page two (0 to 154 px), where the document ends. **Two pages, the heading opening page two**, which is Chromium's print.

**Case 66, page one** is case 65's page one: the documents are identical down to the page area's foot. The cut falls at 100.

**Case 66, page two**, page start 0 at the heading's top, limit 240. The table runs 34 to 314.

| Candidate | y | After |
| :-- | --: | :-- |
| Class A before the heading | 0 | not past the page start |
| Class C in the heading's end gap | 30 | not offered: the heading ends at 34 |
| Class A before the table | 34 | violates the heading's keep |
| Class A after rows one to ten | 54–234 | violate the table's keep |
| Class A after row eleven | 254 | past the limit |

Nothing is clean, so §4.4's relaxation arrives and the make-up order weighs the avoids. Every candidate violates one avoid and none falls short of orphans or widows, so depth decides: 234, after the tenth row. The heading and rows `t00` to `t09` fill page two. Page three holds rows `t10` to `t13`, 80 px, and the document ends. **Three pages**, which is Chromium's print. Before, the heading's gap at 30 was the one clean candidate on page two, as it was on page one of the manual's page 161; no shell is made now, so no fixed point can arise.

## Predictions, frozen on write

1. **Cases 65 and 66 go green in all three columns.** Case 65: two pages in both modes, `h0w000` beginning page two, Chromium's partition identical. Case 66: three pages in both modes, no page error, `h0w000` beginning page two and `t10w00` page three, Chromium's partition identical. BREAK on any claim either case makes.
2. **BelType's own manual paginates to the end in both modes with no refusal.** `docs/index.md --engine cicero`, default and composed. Its page count is reported beside Paged.js's for the same document as information, not as a gate. BREAK on a refusal in either mode, at any page.
3. **Every other standing gate comes back unmoved; the `cases` gate goes green.** The moving shape is a gap-bearing box whose end lies within the page, whose Class C point is clean, and which stood deepest among the clean candidates. That needs every deeper point to violate a keep or be absent. Every standing document drawing a keep beside a padded, bordered or height-constrained box was read for it:
   - Case 00: `blockquote` has padding, but the boundary after it is clean and deeper. `figure`'s interior gaps sit under the figure's own keep. The `.monolith` carries its own keep.
   - Cases 03 and 05: `.wall` and `.outer` carry their own `break-inside: avoid`, so their gaps were never clean. The keep-with-next `h2` has no block-end padding, and `.brief` pads only its inline start.
   - Case 08: the monolith's padding and constrained height give a gap, and the boundary after it is clean.
   - Case 09: the `blockquote`s pad, and each is followed by a paragraph at a clean boundary.
   - Cases 24 and 26 to 33: the height-constrained blocks carry `break-inside: avoid` themselves. Case 26's `h1`, `h2` and `p.entry` have gaps followed by clean boundaries.
   - Case 25: the cells' gaps sit under the row's keep.
   - Cases 36 to 41: the `.leaf`s carry their own keep.
   - Case 48: the `.outer`'s gap crosses the edge and is still offered. `p.tall`'s gap, wholly within the page, already lost to it on depth.
   - Cases 62 and 64: no gap and no keep beside one.
   - The seeds: `h2.keep` has no padding. `.mono`'s and `.outer`'s gaps are always followed by a clean boundary in the body's procession. `.inner`, `.outer`'s only child, has no gap of its own.
   - The probes: P17's plates are taller than a page, so their gaps cross the edge. P22 draws no keep.

   So no document in the corpus draws the moving shape except 65 and 66. The differential gates, the view gates, both acceptance gates and every probe gate reproduce their records, and the `cases` gate, red since 65 and 66 were merged, goes green. BREAK on any record moving in any gate. A move toward Chromium on a keep-beside-a-gap shape would be the fix working, re-recorded with the reason; any other move stops the round.
4. **The fix is a condition in the end-gap branch of `adjudicate` and a comment.** Plus the deletion of the *stays pure* sentence from the start-gap comment. BREAK if anything else under `src/` changes; `fragments.js`, `gauge.js` and `driver.js` in particular stay untouched.
5. **What the instrument cannot say.** One shape changes under the rule and no document draws it: a gap-bearing box, wholly within the page, that is the last child of a container whose only block-end decoration crossing the edge is a border. The container then offers no gap of its own, the boundary after it does not fit, and the box's gap was the last point before the edge. After this round that point is gone and the cut retreats. Chromium was never asked about it, so the battery says nothing about it either way. Nor can the venue say whether Chromium's slice through padding at the edge is §4.4's last resort or its own reading of Class C; the three documents of 2026-09-15 agree with the engine and distinguish neither.

## Consequences

`architecture.md`'s Stonehand section says the end-gap Class C is offered only where the box's end lies past the page edge, cites this record, and says why the C-gap tie is the only place the point is ever chosen. The checklist entry *BelType's own manual is refused* closes with this record. Its part-one capability line and part-three §4.1 row say where the end-gap point is offered and why. The §4.1 row also records that the Gauge's gap is wider than §4.1's Class C, which after this round matters only at the edge. The book's §4.1 standing row says the same in its engine column. `.claude/NEEDED-FIXES.md`'s row goes; the runner row the case round filed stays.

**The tablet is untouched.** I3 keeps Class C in non-zero container-edge gaps and keeps an end-gap C answering to `break-inside` alone. This round narrows where the Stonehand offers one, which is a reading of the Stonehand's, not a law. Whether the Gauge's end gap should follow §4.1's letter, and stop counting padding and a child's margin, is a question for a design round with Egildo. After this round it would change a cut only where a gap crosses the edge, where the oracle already agrees with the engine.

**What stays as it was, stated so nobody reopens it.** A container of several breakable children whose end gap crosses the edge is still cut in the gap, where Chromium retreats to a boundary among the children. Those are the two diverging documents of 2026-09-15, and this round moves neither. And a block-end decoration taller than a page area is the one shape in which a shell at a page's top still meets its own gap past the edge. The shell is laid out at its full padding and border every time, so each page would show the same shell again. No document draws it, and this round does not examine it; it is filed on the checklist beside the entry this round closes.

## Verdict

Built in four commits on the round's own branch: this record with its predictions frozen, the engine, the pin, the documents. Every prediction is closed below with the number that closed it.

**Prediction 1 held.** `node cases/runner.js 65 66` after the change, where both were merged red: case 65 *ok [cicero] "h0w000…" begins a page — page 2*, the same in the composed mode, and *ok [chromium] page for page and word for word with cicero*, thirteen checks green; case 66 *ok [cicero] 3 pages, presented and printed — presented 3, printed 3*, the same composed, `h0w000` opening page two, and Chromium's partition identical, so `t10w00` opens page three on both engines. No page error in either mode.

**Prediction 2 held.** BelType's own manual on the CLI, `docs/index.md --engine cicero`, read by the benchmark's `--url` reader in a headless Chromium: **268 pages in 15.8 s** in the default mode and **266 pages in 103.3 s** composed, no refusal in either. Paged.js paginates the same document to **276 pages** in 8.5 s. The counts are information, not a claim: three engines taking different legal breaks over two hundred and seventy pages are expected to differ by a few pages, and nothing here says where. The composed run's time is recorded as measured and not examined.

**Prediction 3 held.** The complete battery ran once, alone, after `src/` was committed at `1179bbb`: **25 gates in 7.8 minutes, 25 ok**, every standing record reproduced, the pin re-recorded. The `cases` gate, red since cases 65 and 66 were merged, is green. Every tally reproduced its record: `native` 163/18/7/11/1, `composed-v1` 89/8/3, `composed-v2` 86/10/4, `v3-native` 43/5/1/1, `v3-composed` 28/1/1, `v4` 43/4/2/1, the three view gates at 50, 40 and 30, and both acceptance gates and every probe gate at their records. Nothing moved toward Chromium elsewhere, so nothing was re-recorded, and `gates/records.js` is untouched.

**Prediction 4 held.** The change under `src/` is one condition in the end-gap branch of `adjudicate`, one comment paragraph above it, and the deletion of *the end gap stays pure* from the start-gap comment: three lines added and two removed, in `stonehand.js` alone.

**Prediction 5 stands as written.** No document in the corpus draws a gap-bearing box that is the last child of a container whose only decoration crossing the edge is a border, so the one shape the rule changes that nothing pinned is argued above and exercised by nothing.

### What was too good to be true

**The brief's paraphrase of the letter.** The plan that convened the round, and the case READMEs before it, said the cut the cases pin against is legal by the letter of §4.4 and that the cases therefore pin a reading beyond it. Reading §4.1 whole said otherwise: a Class C point lies inside the content edge, and a heading's padding does not, so by the letter the heading offered no break point at all. The engine offered one because its Gauge counts padding as a gap. That error was in the reading's favour, which is the kind that goes unchecked longest, and it had been carried through three documents. It took reading the one sentence that defines the class rather than the rules that bind it.

**And the two seats.** The checklist entry named two likely fixes, the end gap answering to the keeps and a border-only shell that is spent. Neither was needed. One condition about where the gap lies removed the dodge and the fixed point together, because the fixed point was the dodge happening to a shell.

## Amended 2026-10-11 — the point answers to the box's keeps

**The shape the decision missed.** A box whose CONTENT ends above the limit and whose block-end decoration alone crosses it: BelType's manual in the editing tools had a guide `h2` (`break-after: avoid`, a 6.8 px padding and a 2 px border) whose line fit page 8 and whose border-box ended 4.64 px past the foot. The decision's reasoning — that where the point is offered *no pair is separated on this page that the boundary could have kept together* — holds for the single-child documents it was measured on, where the gap crossing the edge was the box's only way to end on the page. It fails here: the cut separates every word of the heading from what it keeps, exactly as the forbidden Class A boundary after it would, while a clean boundary before the heading stands. The make-up order took the end gap's point because it was deeper, and the heading ended the page with its padding carried over. [`cases/104-the-heading-stranded-by-its-padding`](https://github.com/egildo/beltype/blob/42b348b547d269a217a7f193042fe216386a4650/packages/essay/cases/104-the-heading-stranded-by-its-padding/README.md): a ten-line paragraph, then the heading (line 200 to 220 px, padding 24 px, border 4 px) on a 240 px page area; Chromium's print takes the boundary before the heading, the engine left it at the foot, in both modes.

**The rule now.** The end-gap Class C point answers to the box's own `break-after: avoid` and to the next sibling's `break-before: avoid`, as the start gap's point has answered to the keeps of its pair, besides the ancestors' `break-inside`. The offer itself is unchanged: only where the box's end lies past the limit. Its guard `y − gap.base > eps` already puts the offered point below the box's content (a box whose content crosses the edge offers no end-gap point at all, only the Class B and Class A points that content has), so the keeps are asked exactly where the point separates the box from what follows. One condition added to the point's `violatesAvoid`, in `stonehand.js` alone.

**Refused again: offering the end gap only where the box's content end lies past the limit.** The second seat on the checklist. It would have closed case 104 and also removed the point where it is the single place a box ends on the page; seat one needed no such loss, and every standing record reproduced under it.

**What held.** Cases 65, 66 and 104 green in both modes, Chromium's partition identical; the complete battery, 26 gates of 26, every record unmoved (`native` 163/18/7/11/1, `composed-v1` 89/8/3, `composed-v2` 86/10/4, `v3-native` 43/5/1/1, `v3-composed` 28/1/1, `v4` 43/4/2/1, the views at 50, 40 and 30, both acceptance gates, `cases` and every probe). The decision's history above stands as written: its reading of §4.1 and its worked examples are untouched, and in both of its cases the heading's gap lay wholly within the page, so the point was never offered.

