# Fragmentation comes first

**Status: Decided 2026-09-15, Executed 2026-09-15.**

## Context

css-break-3 §5.5: *"Fragmentation interacts with layout, and thus occurs before relative positioning, transforms, and any other graphical effects. Such effects are applied per fragment."*

The Gauge has two rulers and both are post-transform. `getBoundingClientRect()` returns the transformed border box and `Range.getClientRects()` returns transformed line rects, so a box the author turned four degrees was measured as its own rotated bounding box — which reaches lower than its lines do, because a rotated rectangle's corners fall outside the upright one. P34g measured the consequence and `cases/45-the-rotated-box` was authored red for it: Chromium divides the turned box after its eighth line, the untransformed arithmetic; Cicero divided it after its seventh. And a word was **LOST at the seam** — the printed stream read `Turned 7 of 12 Turd Turned 8`, a partial glyph run where the rotated line crossed the flow's clip at an angle. C10: losing content at the edge is never a lawful outcome.

**The order of work here departs from the cycle and it is recorded rather than tidied.** The neutralization was tried and measured before this entry was opened, so its first three predictions are not frozen on write and are not written as if they were. What is frozen below is what had not been run when the entry was written.

## Decision

**The measure context neutralizes transforms, exactly as it neutralizes break properties, and for the same stated reason.** `measure.js`'s neutralization sheet exists because the measure context's job is to answer what the LAYOUT is; a native break property would make the browser answer about fragmentation it is not performing, and a transform makes it answer about paint. `transform`, and with it `rotate`, `scale` and `translate` — the same three transformations spelled as independent properties — and `perspective`, the transform's own third dimension.

This is narrow by construction and that is the argument for the seat: a transform on a block box changes no layout, so neutralizing it moves no sibling, no line and no height. It changes exactly one thing, which is what the two rulers report, and that one thing is what §5.5 says must not decide a break.

**The presentation is untouched, and that is §5.5's second sentence honoured by doing nothing.** The author's transform applies to what each page presents — the original on the page a box begins, the continuation clone on the pages after — so each fragment is rotated with its own box, independently, which is what *applied per fragment* asks for.

**Refused: reading rects and inverting the transform.** It was the other candidate and it is worse on every axis. It needs the accumulated matrix of every ancestor, it needs a second answer to a question the browser already answers, and it puts a matrix inverse inside the Gauge — whose whole discipline is that it has *no state, no policy, and no decisions*. Neutralizing asks the browser for the untransformed geometry instead of computing it, which is the Oracle posture applied to exactly the question at hand.

**Not delivered, and named: §5.5's anti-clipping sentence.** *"In order to reduce dataloss when printing … a transformed fragment that spans pages should be sliced at the page breaks and print in its entirety rather than being clipped by its originating page."* The flow's clip is a rectangle in the page's own space, so a rotated box is still clipped by it, diagonally. Case 45 survives that because a line's glyph ink sits far enough inside its line box to absorb a four-degree skew at a 140-pixel measure — a real margin, measured at close, and not one the engine arranges. The sentence is a *should*, and it is on the checklist rather than in this decision.

**And the rotation ORIGIN is a divergence this does not close.** §5.5 wants each fragment rotated about its own centre; Cicero's first fragment is the whole box, so it rotates about the whole box's centre and its first word lands about two points from where Chromium's does. The case does not claim it, P34g records it, and closing it needs the first fragment constructed — the same wall this round met twice already.

## Predictions

Frozen on write; the case itself had already been run, and this entry says so above rather than pretending otherwise.

1. **No other case moves.** `cases/45-the-rotated-box` is the only document in the venue that declares a transform at all, so the neutralization sheet's new declarations match nothing anywhere else. BREAK on any neighbour moving, which would mean the sheet reaches further than its selector says.
2. **No seed moves.** The generator draws no transform, so the battery cannot see this either — the same structural blindness recorded twice already in this round.
3. **P34g re-reads with its partition corrected and its origins still apart.** Cicero should divide after the eighth line as Chromium does, and the two engines' first rotated word on page one should still sit about two points apart, because the origin is the whole box's and not the fragment's. BREAK if the origins agree, which would mean the first fragment is somehow already being rotated about its own centre.
4. **The diagonal clip has a margin and the margin is thin.** At four degrees and a 140-pixel measure the last line's ink should clear the clip by roughly two pixels and the next line's should miss it by about one. BREAK if either is negative, which would mean case 45 is green by accident rather than by a margin, and the anti-clipping sentence would then be owed as a repair rather than recorded as a *should*.

## Consequences

The checklist's part-three §5.5 row stops saying *transforms unexamined*: the fragmentation half is built and verified on both engines, the anti-clipping half is a recorded *should* with its margin measured, and the per-fragment rotation origin joins the design open the other two fixes left.

`architecture.md`'s rect-reading rules gain a fifth sentence — not a fifth rule, since this is not a wrinkle in how a rect is read but a statement about which geometry is read at all.

Next door, the probes README's P34g cell records the partition closing and the origin standing.

## Verdict

**`cases/45-the-rotated-box` is green on every column, and the lost word is gone.** Both Cicero columns divide the turned box after its eighth line — the untransformed arithmetic, `80 + 160 = 240` of 240 — page two opens with `Turned 9 of 12`, every word is printed once and in order, and Chromium's partition comparison agrees page for page and word for word. The stream that read `Turned 7 of 12 Turd Turned 8` reads `… Turned 7 of 12 Turned 8 of 12 | Turned 9 of 12 …`. **A C10 violation closed by five declarations in a neutralization sheet**, which is what it costs when the wrong question was being asked rather than the wrong answer given.

**Prediction 1 held.** The whole neighbour set — `42`, `43`, `44`, `04`, `07`, `08`, `09`, `24`, `32`, `21`, `14`, `00` — is unmoved: four failures, all of them the two §5.3/§5.4 page-one ink claims this round already accounted for, and no new one. Case 45 is the only document in the venue that declares a transform.

**Prediction 4 BROKE, and it is the most useful thing in this entry.** Measured on the presented page: the flow clips at **240.00**, line eight's ink bottom is **239.06** — clearing by 0.94, not the two pixels the arithmetic expected — and line nine's ink top is **238.01**, which is not a miss at all: it is **1.99 pixels INSIDE the clip**. So a sliver of the next line's ink does fall on page one.

**The case is green anyway, and the reason is Chromium's, not the engine's.** Page one's word stream stops at `Turned 8 of 12`, and its margin bands are empty — so the reader is not filing the sliver as furniture, which was the other candidate explanation and was checked. Chromium simply does not emit a glyph run that far outside its clip. It is not a rule that can be leaned on: the run that survives here is the same class of run that *was* emitted when [*the ink stops at the fragmentainer*](the-ink-stops-at-the-fragmentainer.md) moved the clip six pixels down, where four green cases went red on exactly this. Somewhere between two pixels of a line showing and six, Chromium starts printing the words. **Where, this venue does not know**, and case 45's greenness rests on being on the right side of it.

So §5.5's anti-clipping sentence is not merely undelivered, it is undelivered *visibly*: two pixels of the ninth line are painted on page one. That is what the checklist row now says, and it is the third thing this round found pointing at the same construction.

**Predictions 2 and 3 are carried to the close** — the corpus draws no transform, and P34g is re-read with the probe at the end of the round.

**What was too good to be true.** The fix was expected to be the hard one of the four — the brief's own language put the lost word at the seam and asked where the painted slice or the continuation consumed it. It was neither: nothing consumed the word, the cut was simply a line early, and the partial `Turd` was one rotated line straddling the clip diagonally. Reading `Turd` as *a word lost by the fragment writer* rather than as *a glyph run cut by a clip* would have sent a session into `fragments.js` for a day. The instrument said which it was in one reading of the printed stream, and it was there to be read in P34g's own cell all along.
