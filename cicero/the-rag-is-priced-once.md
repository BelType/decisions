# The rag is priced once

**Status: Decided 2026-09-10, Executed 2026-09-10.**

## Context

Opened by the capability checklist's design open of the same day, which was itself the finding [*the eleventh line*](the-eleventh-line.md) left behind rather than repaired.

`compositor.js` computes a line's badness as `100 · r³` where `r = slack / (gaps × stretchUnit)` and `stretchUnit` is a multiple of the space width — half a space per gap when justifying, a whole space per gap otherwise. **The denominator is a count of gaps.** In justified setting that is right and is Knuth's own arithmetic: the gaps are what stretch, so a line's badness is how hard each of them has to work. In ragged setting nothing stretches at all. The slack is the rag at the line's end, and how many words happen to sit behind it is an accident of the words' lengths — yet a line ending 29.1px short behind 5 gaps is priced at badness 686 while the same 29.1px rag behind 11 gaps is priced at 64, ten times cheaper, because the ratio is cubed.

**This is the venue's normal path, not an edge.** Thirty-four of the thirty-five case documents leave `text-align` alone, which computes to `start`; only `cases/11-composition` justifies.

**And the book already states the law correctly.** Chapter sixteen's `lines-2` says a line's cost is *"how far the spacing it needs departs from the spacing it would prefer, measured against the space available to be stretched"*, and its prose says *"divide it by what the line's glue is willing to stretch"*. Both are the general statement. What the code implements is the special case where the glue is the interword spaces, applied to the case where it is not.

**The prior art says the same thing in TeX's own vocabulary.** A ragged edge is expressed as glue at the line's end — `\rightskip` — and badness comes from the line's *total* stretchability, one quantity, independent of word count. LaTeX's `\raggedright` sets it to `0pt plus 1fil`: infinite stretch, so every badness is zero, demerits collapse to a fixed charge per line, and minimising them becomes minimising line count — which greedy wrapping already achieves. `ragged2e`'s `\RaggedRight` replaces it with a finite `0pt plus 2em` precisely because the `1fil` rag is considered poor, and that finite value is what puts the optimisation back.

## Decision

**A ragged line's badness is priced once, against a tolerance of 2em.** `r = slack / (2 × fontSize)` for `left`, `right` and `center`; justified setting keeps `slack / (gaps × 0.5 × spaceWidth)` exactly as it is. One arithmetic per alignment, each the one its own glue asks for.

**2em is a judgement with a lineage, and it is recorded as a judgement.** It is `ragged2e`'s value, and it is the width at which a rag stops reading as a rag and starts reading as a hole. Nothing in this venue measures typographic quality, so no run here can prove it against 1.5em or 3em; what a run can say is whether the pages moved and whether the composed mode came closer to the browser's own wrapping. The number is on the tablet's side of the line and is stated here so that changing it is a decision rather than a tuning.

**The em is the block's own font size**, read where the other per-block facts are read, and passed to `compose()` beside the space width. Not a multiple of the space width: a space is a face's own choice and varies from a quarter of an em to a third, so pricing a rag in spaces would make the tolerance depend on the typeface rather than on the measure the reader sees.

**Refused: `0pt plus 1fil`.** It is simpler, it is what LaTeX ships, and it would make the two modes agree on ragged text everywhere — the whole cross-mode divergence would go to zero. It also flattens every badness to zero, which reduces total-fit to *avoid hyphens, avoid a one-word last line, otherwise wrap greedily*: the Compositor would stop deciding anything for thirty-four of thirty-five documents, and chapter sixteen's argument would be true of the code and invisible in the output. The trade has already voted on this — `ragged2e` exists because the `1fil` rag is bad.

**Refused: leaving it and declaring the divergence.** That is what `cases/08`, `11` and `27` do today, and it is honest only while the divergence is a *choice*. Once the price is known to be the justified model applied where nothing justifies, the divergence is an artefact and declaring it would be filing a defect as a feature.

**The tablet does not change.** It says scoring is deliberately approximate — aesthetic error only, never geometric — and is silent on the denominator, which is correct: this is the architecture's sentence, *badness per line is slack against the measure under the alignment's stretch model*, gaining the two models it has always implied.

## Predictions, frozen on write

1. **`cases/08-the-monolith`'s composed column returns to six pages**, the number the screen mode and Chromium's print both give. Its declaration moves back from the 7 recorded hours earlier. BREAK on any other number.
2. **The paragraph that started this composes in ten lines**, 186.7px, the height the browser wraps it to. BREAK if it is any other count — a ten-line chain of equal cost that is not the browser's is a hold, a different count is not.
3. **The cross-mode count improves and does not reach zero.** Eight blocks of 431 compose longer than the browser wraps them today and one composes shorter; predict **three or fewer longer**, and at least one block still differing in some direction — a zero would mean the model had become the browser's, which is what `1fil` was refused for. BREAK on 8 or more, and BREAK on 0.
4. **No corpus tally moves away from agreement.** The five composed gates — `composed-v1`, `composed-v2`, `v3-composed`, `view-composed`, `acceptance-composed` — may move, and every movement must be toward `agree`. A record that has to be rewritten downward BREAKS this and means the model is worse where it matters most.
5. **Justified setting is untouched.** `cases/11-composition`, the one document that justifies, prints exactly the numbers it prints today.
6. **The instrument cannot say whether 2em is right, and will not be asked to.** No check in this venue measures a rag; the battery can only report that pages did not move badly. If the tolerance were 1.5em or 3em, nothing here would notice unless a page boundary happened to fall differently — so a green run is evidence that the model is sound and no evidence at all that the number is. What is owed at close is that sentence, not a defence of 2em.

## Consequences

The checklist's design open closes. `cases/08-the-monolith`'s composed declaration and its README paragraph, both written hours earlier to record the eleventh line as lawful, are rewritten to record what it actually was. The cross-mode line-count survey stays open — it is the reading that would have caught this years earlier and still does not exist.

## Verdict

**Prediction 1 held.** `cases/08-the-monolith`'s composed column returns to six pages, the number the screen mode and Chromium's print both give.

**Prediction 2 held.** The 97-word paragraph that convened the previous round composes in ten lines, the height the browser wraps it to; it no longer appears in the cross-mode comparison at all.

**Prediction 3 broke on its number and held on its shape.** It said three or fewer blocks would compose longer than the browser wraps them, and not zero. Eight became **four**, with one still shorter — 07, 08 and 27 fixed, and what remains is `00`'s two container blocks, `11` (which justifies, and is untouched by construction) and `18`'s pair going one way each. The direction and the non-zero were right and the number was optimistic.

**Prediction 4 broke, and it is the one worth reading.** It said every movement in the composed corpus tallies must be toward `agree`. They all moved away: 89 → 77, 86 → 68, 28 → 26, with 32 seeds entering `unclassified`. **The records were re-recorded rather than the change reverted, and the reason is measured rather than argued**: over every ragged paragraph in all 35 case documents, 784 priced lines, the rag's mean is unmoved (7.55% → 7.43% of the measure) while its spread falls a fifth (sd 6.48% → 5.27%) and the worst rag anywhere halves (87.9% → 52.8%). Same average, no gaping line. What an `agree` tally counts for a composed run is how often the optimiser coincides with Chromium's greedy wrapping, and a stronger optimiser coincides less — which `cases/11-composition`'s own `why` has said since it was written. The bin was checked rather than trusted: all 32 carry the same wrap-divergence note, three adding that Chromium's own cut violates orphans/widows, and there is **no `ours-illegal` anywhere in the three ranges**.

**Prediction 5 held.** `cases/11-composition`, the one document that justifies, prints exactly what it printed before.

**Prediction 6 stands as written, and is now more than a caveat.** Nothing here measures a rag, so nothing here can say 2em is better than 1.5em or 3em; what the battery says is that the pages did not move badly and the rag statistics improved. The number is a judgement with a lineage.

**What was too good to be true — and it was mine, twice over.** The round's first attempt to answer *can the demonstration be re-armed* ran a search whose random generator multiplied past 2⁵³ and degenerated into a short cycle, so a claimed 1.5-million-draw search had examined a single paragraph — and a confident structural conclusion was drawn from it, in the same paragraph as the words *measured, not assumed*. Corrected with `Math.imul`, the same search examined 314,145 distinct paragraphs and returned the opposite answer. **The venue's own scar, turned on the venue's own instrument: a green search must be green for a reason somebody can name, and an instrument nobody checked is not evidence.**

**The other correction is the case's.** `cases/27-the-moved-boundary` declared three composed pages and explained them by *ten characters of slack across three word spaces* on greedy's fourth line. Greedy's four lines leave 1.5, 0.5, 3.5 and 4.5 characters; the hole never existed, and the sentence had been copied into chapter sixteen. What the extra line actually rested on was this decision's own defect, and the measurement is the sharpest single argument for the change: the old six-line arrangement carried **two 8.5-character holes** where the five-line one's worst is 4.5. The arrangement the defect bought was the worse-looking of the two.

**What the round opened rather than closed.** Re-arming that demonstration is parked behind a prior question, on the capability checklist: this engine **prices** a bad line and caps the price at 10,000, where TeX makes a line past its `\tolerance` **infeasible** — and infeasibility is what makes TeX spend a line. Measured: the corrected model takes an extra line in **0.4%** of 314,145 paragraphs, and no measure from 16.5 to 90.5 characters makes case 27's own paragraph take one. Chapter sixteen's `lines-1` reads open rather than divergent until an example exists, and the example is in that chapter's `wanted` list behind the tolerance question.

**The battery ran complete: 25 gates of 25, 5.8 minutes, every standing record reproduced**, and the pin names this branch's source.
