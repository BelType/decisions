# The ink stops at the fragmentainer

**Status: Decided 2026-09-15, Executed in part 2026-09-15.** The instrument's half is built; the engine's half is withdrawn on the measurement below and named as a design round.

## Context

`cases/43-the-ink-at-the-edge` was authored red on both Cicero columns and green on Chromium, against P34c's reading: *"Page one's background is 172.4pt tall against Chromium's 150 — it runs 22.5pt into the bottom margin: the fragment is clipped at the page box, not at the page area."*

**That diagnosis does not survive a reading of the operator stream, and the correction is this entry's first act.** Printed through the venue's own door and dumped operator by operator, page one of case 43 carries a clip path and then a fill inside it:

```
eoClip  rect 30,30 → 170,264      (CSS px, page space: the .flow element's own box)
fill    rect 30,70 → 170,338      #ffe0a0
```

The clip is at **264px, six pixels above the page area's bottom edge at 270** — the flow clips at the cut's own extent, exactly as `chase.js#setFlow` and the architecture say it does. The engine puts no ink in the bottom margin at all. What reports 172.4pt is `readPaint`, which keeps every painted path's bounding box and **knows nothing about clips**: it reports the path Chromium constructed, clamped to the page box, where the ink Chromium actually lays down is that path intersected with the clip. Chromium's own column reads correctly only because its fragment is a real box whose background path genuinely ends at the page area.

So there are two faults here, one in the instrument and one in the engine, and the second is a tenth the size of the first's account of it.

**The instrument.** An engine that presents originals under clips is what Cicero structurally is — pages are views, the document lives once, a straddler's tail is clipped rather than removed (I6, and the architecture's slot-versus-fragment reconciliation). A reader blind to clips can therefore make no true statement about Cicero's ink in any case, ever. It is not that case 43 reads wrong; it is that no paint claim about this engine can be adjudicated at all.

**The engine.** css-break-3 §5.3: *"When a box breaks, its content box extends to fill any remaining fragmentainer extent (leaving room for any margins/borders/padding applied by `box-decoration-break: clone`) before the content resumes on the next fragmentainer."* Chromium's fragment therefore paints to the page area's bottom edge; Cicero's ink stops at the cut, six pixels short. That six pixels is the whole of the real defect, and the checklist has carried §5.3 as *unmodelled and unverified on either engine* since the part-three read.

## Decision

**One — `readPaint` reads ink, not paths.** The reader tracks the clip the way it already tracks the CTM: a `constructPath` whose intent is not a paint, followed by `clip`/`eoClip`, narrows the current clip rectangle; `save`/`restore` push and pop it with the matrix; every painted path's bounding box is intersected with it before it is reported. A path wholly outside its clip reports nothing, which is what it draws. The docstring's *"clipped to the page box"* becomes *clipped to the clip*, and the page box stays as the outermost clip rather than as a special case.

Refused: **teaching the claims to allow a clipped reading.** A claim says where the ink is; if the reader cannot say, the claim is unfalsifiable, and a venue whose central scar is *a green run must be green for a reason somebody can name* does not answer a blind instrument by loosening what it is asked.

Refused: **a non-rectangular clip.** Only the bounding box of the clip path is kept, exactly as only the bounding box of a paint path is kept — the same stated limit, at the same resolution, and every clip either engine emits for a fragmentainer is a rectangle.

**Two — the flow clips at the fragmentainer's edge when the cut broke a box.** §5.3's extension is a fact about a box that BREAKS. When the page's closing cut leaves a box straddling — the next page resumes inside a block, or with a shell, or with a carried parallel flow — that box's ink lawfully fills the rest of the page area, and the clip moves from the cut's extent to the page area's bottom edge to let it. When the cut broke no box, nothing extends, and the clip stays exactly where it is: a Class A cut between two top-level blocks must keep clipping at the cut, because what lies below it on the measured page is the NEXT page's content and not a fragment's tail.

The extent is computed where the cut's facts are — in the driver, beside `usedPx` and `leadPx` — and rides the account as one more view literal. Never re-derived at present time: that is the 2026-08-04 account ruling, and `posBlock` is the standing example of why.

Refused: **clipping at the fragmentainer edge unconditionally.** It is cheaper by a line and wrong: the content between the cut and the page area's edge is real content on the next page, and a page whose cut fell a few pixels above the edge would show the top of a line it does not carry — and, worse, put its words in the print text layer, where totality would find them. Case 43 happens to survive that reading because its next line's glyph ink starts below the edge. Luck is not a reason.

**Three — what this does NOT model is named rather than blurred.** §5.3's second sentence, *"the extra block size contributed by fragmenting the box contributes progress towards any specified limits on the box's block size"*, is untouched: the box's own `height`/`max-height` see nothing of the extension. And the shell arithmetic is untouched — a Class C end-gap cut still continues at `bottom − cut`, where a box whose content box extended to the fragmentainer would continue at `bottom − edge`. Both stay on the checklist's §5.3 row, which moves from *unmodelled* to *the paint half built, the arithmetic half open* rather than to *built*.

## Predictions

Frozen on write.

1. **The clip-aware reader alone does not make case 43 green.** Page one's background will read 145.5pt (the fill path intersected with the clip at 264px) against the claimed 150. HOLD on any reading between 145 and 146; BREAK on 150, which would mean the clip was already at the page area and the engine change is not needed at all.
2. **With both halves, case 43 goes green on both Cicero columns** — page one's background exactly 105×150pt at 22.5,52.5, no bottom border strip at 22.5,199.5, page two's background 105×55.5 with its bottom border and no top border. BREAK on any of the five.
3. **Chromium's column does not move.** Its own paths lie inside its own clips, so intersecting changes none of its numbers; P34a and P34b re-read identically. BREAK on any rectangle changing, which would mean the reader's clip tracking is wrong rather than newly honest.
4. **Case 43's partition and totality stay green** — the content clip moving from 234px to 240px must not put line ten's ink or its text on page one. BREAK on either, and the conditional clip is then not conditional enough.
5. **No other case moves.** Only 42 and 43 make paint claims, and the flow's clip extends only where a box straddles — which is most pages in most cases, so this prediction is the one most likely to break and the reason the neighbour set is run.
6. **The instrument cannot say whether the six pixels were ever visible to a reader.** No check in the venue compares effective ink to a reference image, and none is proposed: the paint reader compares rectangles, so a defect of a few pixels in a background is exactly the size this round found by dumping operators by hand. What is owed at close is the neighbour set's result, not an assurance.

## Consequences

**Written after the verdict, because the decision's second part did not survive it.**

The checklist's part-three §5.3 row and the design-opens index stop saying *unmodelled and unverified on either engine*. It is **verified on both and unbuilt**, with the arithmetic in the row: Chromium's fragment paints to the page area's bottom edge, Cicero's stops at the cut, and on case 43 that is six pixels. The row gains the delivery finding — that no clip can carry the extension, because the straddling box's ink and its overflow content are one subtree — and names the construction that can, as a **design open** rather than a repair.

`architecture.md`'s Chase section keeps its sentence about the clip being the cut's own extent, which is true, and gains the reason it cannot also be the fragmentainer's.

Next door, the probes README's P34c and P34d cells are corrected — a probe's table is the one place its finding may be edited — and gain the operator dump that corrects them, so the next reader meets the instrument's limit where the misreading was recorded. `lib/engines/read-print.js`'s `readPaint` reads ink rather than paths, and its own header carries why.

**What this owes.** `cases/43-the-ink-at-the-edge` stays red on one claim of five, on both Cicero columns, and its claim is right: the engine is six pixels short of §5.3 and the case says so. It is not weakened, and the number it fails by is now known rather than guessed.

## Verdict

**Prediction 1 held exactly, to a tenth of a point.** With the clip-aware reader alone, case 43's page one reads its background as **105×145.5pt** at 22.5,52.5 — the fill path intersected with the clip at 264px — against the claimed 150. So the instrument was wrong by 26.9pt and the engine by 4.5, and the entry's own arithmetic is what the run reproduced.

**Prediction 3 held.** Chromium's column is untouched: every one of case 43's and case 42's Chromium paint claims stays green, and P34a/P34b re-read identically. Intersecting a path with its own clip changes nothing for an engine whose fragments are real boxes, which is the whole point of the change.

**Predictions 2 and 4 held, and prediction 5 broke — which is why the engine's half is withdrawn.** With the flow clipping at the page area wherever the cut left a box straddling, case 43 went **green on all three columns**: page one's background exactly 105×150pt, no bottom border strip, page two's background and its bottom border, the partition and totality both still green. Then the neighbour set said what it cost. `04-the-edge`, `07-leading-margins`, `09-decorated-boxes` and `00-the-realistic-document` were green before the change and red after it, all four on the same check — *every word printed once, in order*. Case 07 prints **683 words of its 700**.

**The loss is the sliver, and it costs more than the sliver.** Between the cut and the page area's bottom edge stands the next page's first line. Extending the clip shows the top of it, which puts its glyphs in the print text layer — and then the venue's own reader, told where the margins are, files an item whose centre falls below the page area into the bottom margin band and takes it OUT of the word stream. So a sliver does not merely duplicate: it draws ink the page does not own and deletes words from the reading, and both happen at once. Case 43 survives the same treatment only because its next line's glyph ink begins four tenths of a pixel below the edge. That is luck, and *a green run must be green for a reason somebody can name*.

**So the decision's second part is wrong as written, and the finding is what replaces it.** §5.3's extension cannot be delivered by a clip at all, and the reason is structural rather than a matter of choosing a better extent: **the straddling box's ink and its own overflow content are the same subtree**, so any clip that admits the first admits the second. Three deliveries were tried on paper against case 43's claim and each fails for a stated reason — a clip at the page area shows the sliver (measured above); a *tail piece*, a blank decorated shell of the box placed below the flow, paints the right ink but as a SECOND path, where the claim is one rectangle of 150pt and the reader reports paths; and a per-page rule reaching the original cannot clip the box's children above the box's own padding edge, which is where `overflow` clips.

**What is left is the one thing that works, and it is a design round rather than a fix.** The first fragment of a straddling box would have to be CONSTRUCTED — a clone whose children are clipped at the cut by a wrapper and whose own border box is extended to the fragmentainer, exactly as `fragments.js` already builds the continuation at the other end. That reverses the architecture's straddler contract (*"the original straddling box is assigned to the Chase where it begins; the flow clips its tail"*), moves the reading copy of a straddling block from the original to a clone, and inserts a wrapper into the author's own tree, which changes `>` and `:nth-child` matching for that box's children — a new structural cost beyond the one the architecture already owns for clones. Every one of those is a shape the cycle puts in front of Egildo before it is built.

**What was too good to be true.** The round opened on a measured sentence — *the fragment is clipped at the page box, not at the page area* — and the whole of Fix 1 was scoped from it: find the clip, move it, done. The clip was never where that sentence said, and one dump of the operator list would have said so at any point in the six weeks the reader has existed. **The instrument had never been asked what it does with a clip**, and the venue's own scar list has the name for that: a check nobody asked what makes it fail. The engine's real error was six pixels; the reading of it was twenty-seven.

**And one thing was confirmed rather than assumed.** Only cases 42 and 43 make paint claims, so the reader's change is adjudicated by exactly two documents today — which also means the clip tracking has almost no cover. It is stated here rather than gated.
